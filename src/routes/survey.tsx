import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Loader2, Languages } from "lucide-react";
import logo from "@/assets/logo.png";
import astrolabe from "@/assets/bazi-astrolabe.jpg";
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

// Default English form
const TALLY_FORM_ID_EN = "Ge6Deo";
// Mandarin form ID (configurable via VITE_TALLY_FORM_ID_ZH or url query ?zhForm=...)
const ENV_TALLY_FORM_ID_ZH = (import.meta.env.VITE_TALLY_FORM_ID_ZH as string) || "4aB4Zd";

export const Route = createFileRoute("/survey")({
  validateSearch: (search: Record<string, unknown>): { zhForm?: string; form?: string } => ({
    zhForm: typeof search.zhForm === "string" ? search.zhForm : undefined,
    form: typeof search.form === "string" ? search.form : undefined,
  }),
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
 * Maps answer label keywords (English & Mandarin) → READING_PREFERENCE attribute in Brevo
 */
const READING_PREF_MAP: { keywords: string[]; value: string }[] = [
  {
    keywords: [
      "straight",
      "precision",
      "reassurance",
      "raw read",
      "直言",
      "直言不讳",
      "精准",
      "传统",
      "古典",
    ],
    value: "precision",
  },
  {
    keywords: [
      "growth edge",
      "application",
      "context",
      "growth",
      "成长",
      "成长点",
      "破局",
      "应对",
      "实操",
      "策略",
    ],
    value: "application",
  },
  {
    keywords: ["both", "classical reading", "work with it", "两者", "两者兼得", "兼得"],
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

async function upsertBrevoContact({
  email,
  openToChat,
  wantsTrial,
  readingPreference,
  surveyLanguage,
  birthInfo,
}: {
  email: string;
  openToChat: boolean;
  wantsTrial: boolean;
  readingPreference: string | null;
  surveyLanguage: string;
  birthInfo?: string | null;
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
      updateEnabled: true,
      listIds: [BREVO_CONFIG.listIdSurveyContacts],
      attributes: {
        OPEN_TO_CHAT: openToChat,
        WANTS_TRIAL: wantsTrial,
        SURVEY_SOURCE: "tally-life-clarity",
        SURVEY_LANGUAGE: surveyLanguage,
        ...(readingPreference ? { READING_PREFERENCE: readingPreference } : {}),
        ...(birthInfo ? { BIRTH_INFO: birthInfo } : {}),
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
    return v === "true" || v === "yes" || v === "1" || v === "是" || v === "对";
  }
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

// ── Component ─────────────────────────────────────────────────────────────────

function SurveyPage() {
  const { zhForm, form } = Route.useSearch();
  const { t, setLang, isZh } = useLanguage();
  const [brevoState, setBrevoState] = useState<BrevoState>("idle");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const customZhId = zhForm || ENV_TALLY_FORM_ID_ZH;
  const hasSeparateZhForm = Boolean(customZhId && customZhId !== TALLY_FORM_ID_EN);
  const activeFormId = form || (isZh && hasSeparateZhForm ? customZhId : TALLY_FORM_ID_EN);

  // Note: transparentBackground=1 is essential for blending into dark & light modes
  const tallyEmbedUrl = `https://tally.so/embed/${activeFormId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  // Initialize Tally embeds via official script
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
  }, [activeFormId]);

  // Listen for Tally form submission via postMessage
  useEffect(() => {
    const handler = async (e: MessageEvent) => {
      let data: { event?: string; payload?: TallySubmitPayload } | null = null;

      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }

      if (!data || data.event !== "Tally.FormSubmitted") return;

      const payload = data.payload;
      if (!payload) return;

      const fields = payload.fields ?? [];

      // Email field detection (English or Chinese)
      const emailField = findField(
        fields,
        (f) =>
          f.type === "INPUT_EMAIL" ||
          f.label?.toLowerCase().includes("email") ||
          f.label?.includes("邮箱"),
      );
      const email = typeof emailField?.value === "string" ? emailField.value.trim() : "";

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return;
      }

      // Check for consultation/chat interest (English or Chinese)
      const openToChat = Boolean(
        findField(
          fields,
          (f) =>
            fieldValueTruthy(f.value) &&
            (f.label?.toLowerCase().includes("chat") ||
              f.label?.toLowerCase().includes("conversation") ||
              f.label?.toLowerCase().includes("contact") ||
              f.label?.includes("一对一") ||
              f.label?.includes("咨询") ||
              f.label?.includes("深度交流")),
        ),
      );

      // Check for launch notification / trial interest (English or Chinese)
      const wantsTrial = Boolean(
        findField(
          fields,
          (f) =>
            fieldValueTruthy(f.value) &&
            (f.label?.toLowerCase().includes("trial") ||
              f.label?.toLowerCase().includes("launch") ||
              f.label?.toLowerCase().includes("notif") ||
              f.label?.toLowerCase().includes("early access") ||
              f.label?.includes("免费") ||
              f.label?.includes("报告") ||
              f.label?.includes("席位") ||
              f.label?.includes("上线")),
        ),
      );

      // Detect reading preference
      let readingPreference: string | null = null;
      const prefField = findField(
        fields,
        (f) =>
          f.label?.toLowerCase().includes("challenging") ||
          f.label?.toLowerCase().includes("prefer to work with") ||
          f.label?.includes("挑战性信息") ||
          f.label?.includes("面对命盘"),
      );
      if (prefField) {
        const selected = (
          Array.isArray(prefField.value) ? prefField.value.join(" ") : String(prefField.value ?? "")
        ).toLowerCase();

        for (const { keywords, value } of READING_PREF_MAP) {
          if (keywords.some((kw) => selected.includes(kw.toLowerCase()))) {
            readingPreference = value;
            break;
          }
        }
      }

      // Detect optional birth details
      const birthField = findField(
        fields,
        (f) =>
          f.label?.toLowerCase().includes("birth details") ||
          f.label?.toLowerCase().includes("birth date") ||
          f.label?.includes("出生信息") ||
          f.label?.includes("出生")
      );
      const birthInfo = typeof birthField?.value === "string" ? birthField.value.trim() : null;

      setBrevoState("saving");
      try {
        await upsertBrevoContact({
          email,
          openToChat,
          wantsTrial,
          readingPreference,
          surveyLanguage: isZh ? "zh" : "en",
          birthInfo,
        });
        setBrevoState("saved");
      } catch (err) {
        console.error("[Survey] Brevo upsert failed:", err);
        setBrevoState("error");
      }
    };

    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, [isZh]);

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
          src={astrolabe}
          alt=""
          width={1024}
          height={1024}
          className="astrolabe-watermark pointer-events-none absolute -top-16 right-[-8%] -z-10 w-[320px] sm:w-[480px] 2xl:w-[650px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]"
        />

        <div className="text-center mb-6 sm:mb-8">
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

        {/* Survey Language Switcher Pill Banner */}
        <div className="mx-auto max-w-md mb-6 flex items-center justify-between gap-3 rounded-full border border-accent/25 bg-card/75 p-1.5 px-3.5 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Languages className="h-3.5 w-3.5 text-accent shrink-0" />
            <span>{t.survey.langPrompt}:</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                !isZh
                  ? "bg-accent text-accent-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                isZh
                  ? "bg-accent text-accent-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              中文 (Mandarin)
            </button>
          </div>
        </div>

        {/* Notice when Chinese is selected but custom form ID not yet connected */}
        {isZh && !hasSeparateZhForm && (
          <div className="mx-auto max-w-2xl mb-6 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-center text-xs sm:text-sm text-foreground/90 backdrop-blur-sm animate-in fade-in duration-300">
            <p className="font-semibold text-accent">ℹ️ 中文问卷创建指引 (Mandarin Form Setup)</p>
            <p className="mt-1 text-muted-foreground leading-relaxed">
              目前展示的是英文原版问卷。我们已为您准备好
              <strong>100%校对完成的中文问卷题目与选项</strong>，在 Tally
              复制表单并粘贴后，即可在此无缝加载您的中文版！
            </p>
          </div>
        )}

        {/* Survey Embed Container: dark:bg-[#1a1917] matches Tally dark theme perfectly */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-card/90 dark:bg-[#1a1917] p-2 sm:p-6 2xl:p-8 shadow-[0_20px_50px_-20px_oklch(0.2_0.01_60/0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl ring-1 ring-accent/10 transition-all">
          <iframe
            key={activeFormId}
            ref={iframeRef}
            data-tally-src={tallyEmbedUrl}
            loading="lazy"
            width="100%"
            height={750}
            title={t.survey.headline}
            allowTransparency={true}
            style={{
              backgroundColor: "transparent",
              colorScheme: "dark",
            }}
            className="w-full border-0 min-h-[750px] transition-all bg-transparent"
          />
        </div>

        {/* Brevo save status */}
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
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {t.footer.termsOfService}
            </Link>
            <span>{t.footer.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
