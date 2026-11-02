import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke } from "@/components/site/Ink";

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

function SurveyPage() {
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
      <main className="relative mx-auto my-6 w-full max-w-4xl px-4 sm:px-6">
        {/* Subtle decorative Enso background */}
        <img
          src={enso}
          alt=""
          width={800}
          height={800}
          style={{ filter: "grayscale(1) invert(1) contrast(1.6) brightness(0.9)" }}
          className="pointer-events-none absolute left-1/2 top-40 -z-10 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] opacity-25 mix-blend-screen [mask-image:radial-gradient(circle,black_35%,transparent_70%)]"
        />

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
