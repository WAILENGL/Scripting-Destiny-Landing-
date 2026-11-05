import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke } from "@/components/site/Ink";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { BREVO_CONFIG } from "@/config/newsletter";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const TITLE = "Life Clarity & Timing Inquiry — Scripting Destiny";
const DESC =
  "Share your perspective on life clarity, personal crossroads, and timing to help shape the Scripting Destiny experience.";

const TALLY_FORM_ID = "Ge6Deo";

export const Route = createFileRoute("/survey")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: SurveyPage,
});

// ── Constants ─────────────────────────────────────────────────────────────────

/**
 * Q: "How do you prefer to work with challenging information about yourself?"
 * Maps answer label keywords → READING_PREFERENCE attribute value saved to Brevo.
 */
const READING_PREF_MAP: { keywords: string[]; value: string }[] = [
  {
    // "Give it to me straight — I'd rather have precision than reassurance"
    keywords: ["straight", "precision", "reassurance", "raw read"],
    value: "precision",
  },
  {
    // "Help me find the growth edge in it — context and application matter more than the raw read"
    keywords: ["growth edge", "application", "context", "growth"],
    value: "application",
  },
  {
    // "I want both the classical reading and how to work with it"
    keywords: ["both", "classical reading", "work with it"],
    value: "both",
  },
];

// ── Types ──────────────────────────────────────────────────────────────────────

interface TallyField {
  key: string;
  label: string;
  type: string;
  value: unknown;
}

interface TallySubmitPayload {
  formId: string;
  fields: TallyField[];
}

type BrevoState = "idle" | "saving" | "saved" | "error";

// ── Brevo upsert ──────────────────────────────────────────────────────────────

/**
 * Adds (or updates) a contact in Brevo list 3 with their survey opt-in flags.
 * Called client-side — Brevo CORS-allowlists scriptingdestiny.com.
 */
async function upsertBrevoContact({
  email,
  openToChat,
  wantsTrial,
  readingPreference,
}: {
  email: string;
  openToChat: boolean;
  wantsTrial: boolean;
  readingPreference: string | null;
}): Promise<void> {
  const apiKey = BREVO_CONFIG.surveyApiKey;
  if (!apiKey) {
    console.warn("[Survey] VITE_BREVO_SURVEY_API_KEY not set — skipping Brevo upsert.");
    return;
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      updateEnabled: true, // upsert — safe if they already exist
      listIds: [BREVO_CONFIG.listIdSurveyContacts],
      attributes: {
        OPEN_TO_CHAT: openToChat,
        WANTS_TRIAL: wantsTrial,
        SURVEY_SOURCE: "tally-life-clarity",
        ...(readingPreference ? { READING_PREFERENCE: readingPreference } : {}),
      },
    }),
  });

  if (!res.ok && res.status !== 204) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

// ── Tally field helpers ───────────────────────────────────────────────────────

function findField(fields: TallyField[], matchFn: (f: TallyField) => boolean) {
  return fields.find(matchFn);
}

function fieldValueTruthy(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const v = value.toLowerCase().trim();
    return v === "true" || v === "yes" || v === "1";
  }
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

// ── Component ─────────────────────────────────────────────────────────────────

function SurveyPage() {
  const { t } = useLanguage();
  const [brevoState, setBrevoState] = useState<BrevoState>("idle");
  const listenerRef = useRef<((e: MessageEvent) => void) | null>(null);

  // Load Tally embed script
  useEffect(() => {
    const tallyScriptSrc = "https://tally.so/widgets/embed.js";

    const loadEmbeds = () => {
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      } else {
        const iframes = document.querySelectorAll<HTMLIFrameElement>(
          "iframe[data-tally-src]:not([src])",
        );
        iframes.forEach((iframe) => {
          if (iframe.dataset.tallySrc) {
            iframe.src = iframe.dataset.tallySrc;
          }
        });
      }
    };

    if (typeof window.Tally !== "undefined") {
      loadEmbeds();
    } else if (!document.querySelector(`script[src="${tallyScriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = tallyScriptSrc;
      script.onload = loadEmbeds;
      script.onerror = loadEmbeds;
      document.body.appendChild(script);
    } else {
      loadEmbeds();
    }
  }, []);

  // Listen for Tally form submission via postMessage
  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      let data: { event?: string; payload?: TallySubmitPayload } | null = null;

      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return; // not our message
      }

      if (!data || data.event !== "Tally.FormSubmitted") return;

      const payload = data.payload;
      if (!payload || payload.formId !== TALLY_FORM_ID) return;

      const fields = payload.fields ?? [];

      // ── Find the email field (Q10 email, type INPUT_EMAIL) ──
      const emailField = findField(
        fields,
        (f) => f.type === "INPUT_EMAIL" || f.label?.toLowerCase().includes("email"),
      );
      const email = typeof emailField?.value === "string" ? emailField.value.trim() : "";

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // No valid email supplied on Q10 — nothing to save
        return;
      }

      // ── Detect opt-in checkboxes by label keywords ──
      const openToChat = Boolean(
        findField(
          fields,
          (f) =>
            fieldValueTruthy(f.value) &&
            (f.label?.toLowerCase().includes("chat") ||
              f.label?.toLowerCase().includes("conversation") ||
              f.label?.toLowerCase().includes("contact")),
        ),
      );

      const wantsTrial = Boolean(
        findField(
          fields,
          (f) =>
            fieldValueTruthy(f.value) &&
            (f.label?.toLowerCase().includes("trial") ||
              f.label?.toLowerCase().includes("launch") ||
              f.label?.toLowerCase().includes("notif") ||
              f.label?.toLowerCase().includes("early access")),
        ),
      );

      // ── Detect reading preference from the multiple-choice question ──
      // Matches "How do you prefer to work with challenging information about yourself?"
      let readingPreference: string | null = null;
      const prefField = findField(
        fields,
        (f) =>
          f.label?.toLowerCase().includes("challenging") ||
          f.label?.toLowerCase().includes("prefer to work with"),
      );
      if (prefField) {
        const selected = (
          Array.isArray(prefField.value) ? prefField.value.join(" ") : String(prefField.value ?? "")
        ).toLowerCase();

        for (const { keywords, value } of READING_PREF_MAP) {
          if (keywords.some((kw) => selected.includes(kw))) {
            readingPreference = value;
            break;
          }
        }
      }

      setBrevoState("saving");
      try {
        await upsertBrevoContact({ email, openToChat, wantsTrial, readingPreference });
        setBrevoState("saved");
      } catch (err) {
        console.error("[Survey] Brevo upsert failed:", err);
        setBrevoState("error");
      }
    };

    window.addEventListener("message", handler);
    listenerRef.current = handler;

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground selection:bg-accent/30">
      {/* Top Header */}
      <header className="site-container flex items-center justify-between py-5 sm:py-6">
        <Link
          to="/"
          aria-label="Scripting Destiny home"
          className="block transition-opacity hover:opacity-90"
        >
          <img
            src={logo}
            alt="Scripting Destiny"
            className="brand-logo h-9 w-auto sm:h-11 2xl:h-13 transition-all"
          />
        </Link>
        <div className="flex items-center gap-2.5 sm:gap-3 2xl:gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-3.5 py-1.5 2xl:px-5 2xl:py-2 text-xs sm:text-sm 2xl:text-base font-medium transition hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t.survey.backHome}</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative mx-auto my-6 w-full max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl px-4 sm:px-6 2xl:px-8">
        {/* Ambient Gold Radial Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[550px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-3xl" />

        {/* Ambient Enso Watermark */}
        <img
          src={enso}
          alt=""
          width={800}
          height={800}
          className="enso-watermark pointer-events-none absolute -top-16 right-[-8%] -z-10 w-[320px] max-w-none [mask-image:radial-gradient(circle,black_40%,transparent_70%)] sm:w-[480px] 2xl:w-[650px]"
        />

        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>{t.survey.communityBadge}</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl 2xl:text-6xl font-light tracking-tight text-foreground leading-tight">
            {t.survey.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl 2xl:max-w-2xl text-sm sm:text-base 2xl:text-lg leading-relaxed text-muted-foreground">
            {t.survey.description}
          </p>
        </div>

        {/* Survey Embed Container */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-card/85 p-2 sm:p-6 2xl:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl ring-1 ring-accent/10 transition-all">
          <iframe
            data-tally-src="https://tally.so/embed/Ge6Deo?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height={750}
            title={t.survey.headline}
            className="w-full border-0 min-h-[750px] transition-all"
          />
        </div>

        {/* Brevo save status — only shown when an email is captured */}
        {brevoState === "saving" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-200">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {t.survey.saving}
          </div>
        )}
        {brevoState === "saved" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-wood" />
            {t.survey.saved}
          </div>
        )}
        {brevoState === "error" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-destructive animate-in fade-in duration-200">
            <AlertCircle className="h-3.5 w-3.5" />
            {t.survey.error}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full mt-12">
        <InkStroke className="site-container" />
        <div className="site-container flex items-center justify-between py-6 text-xs 2xl:text-sm text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span>{t.footer.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
