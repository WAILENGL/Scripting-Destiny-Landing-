import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { InkStroke } from "@/components/site/Ink";
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
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-6">
        <Link
          to="/"
          aria-label="Scripting Destiny home"
          className="block transition-opacity hover:opacity-90"
        >
          <img src={logo} alt="Scripting Destiny" className="h-10 w-auto sm:h-12" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-4 py-1.5 text-xs sm:text-sm font-medium transition hover:border-foreground hover:bg-foreground hover:text-background"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </header>

      {/* Main Container */}
      <main className="mx-auto my-6 w-full max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Community Inquiry</span>
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            Scripting Destiny: Life Clarity & Timing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            We are designing tools to help people decipher their innate nature and make timely,
            aligned life decisions. Your answers directly shape what we build next.
          </p>
        </div>

        {/* Survey Embed Container */}
        <div className="rounded-3xl border border-foreground/15 bg-card/75 p-3 sm:p-8 shadow-2xl backdrop-blur-md">
          <iframe
            data-tally-src="https://tally.so/embed/Ge6Deo?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height={700}
            title="Scripting Destiny: Life Clarity & Timing Inquiry"
            className="w-full border-0 min-h-[700px] transition-all"
          />
        </div>

        {/* Brevo save status — only shown when an email is captured */}
        {brevoState === "saving" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-200">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Saving your contact preferences…
          </div>
        )}
        {brevoState === "saved" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-wood" />
            Your preferences have been saved. We'll be in touch!
          </div>
        )}
        {brevoState === "error" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-destructive animate-in fade-in duration-200">
            <AlertCircle className="h-3.5 w-3.5" />
            Couldn't save your contact details — please email us directly if you'd like to be
            reached.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full mt-12">
        <InkStroke className="mx-auto max-w-6xl px-5 sm:px-6" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Scripting Destiny</span>
          <span>Know your nature. Time your moves.</span>
        </div>
      </footer>
    </div>
  );
}
