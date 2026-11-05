import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, BookOpen } from "lucide-react";
import logo from "@/assets/logo.png";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke } from "@/components/site/Ink";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const TITLE = "Confirmation Successful — Scripting Destiny";
const DESC = "Your place on the Scripting Destiny early access waitlist is confirmed.";

export const Route = createFileRoute("/confirmed")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ConfirmedPage,
});

function ConfirmedPage() {
  const { t, isZh } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
      {/* Top Header */}
      <header className="site-container flex items-center justify-between py-5 sm:py-6">
        <Link to="/" aria-label="Scripting Destiny home" className="block">
          <img
            src={logo}
            alt="Scripting Destiny"
            className="brand-logo h-9 w-auto sm:h-11 2xl:h-13 transition-all"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            to="/"
            className="rounded-full border border-foreground/30 px-3.5 py-1.5 2xl:px-5 2xl:py-2 text-xs sm:text-sm 2xl:text-base font-medium transition hover:bg-foreground hover:text-background"
          >
            {t.confirmed.backHome}
          </Link>
        </div>
      </header>

      {/* Main Confirmation Content */}
      <main className="relative mx-auto my-auto w-full max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl px-5 py-12 sm:px-6 2xl:py-16 text-center">
        {/* Subtle decorative Enso background */}
        <img
          src={enso}
          alt=""
          width={700}
          height={700}
          className="enso-watermark pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[460px] 2xl:max-w-[650px] [mask-image:radial-gradient(circle,black_35%,transparent_70%)]"
        />

        <div className="rounded-3xl border border-border/80 dark:border-foreground/15 bg-card/90 p-8 sm:p-12 2xl:p-16 shadow-xl dark:shadow-2xl backdrop-blur-sm">
          {/* Eyebrow */}
          <p className="eyebrow text-accent">{t.confirmed.badge}</p>

          {/* Headline */}
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            {t.confirmed.headline}
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t.confirmed.description}
          </p>

          {/* Status Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 border border-foreground/10 px-3.5 py-1 text-foreground">
              <Check className="h-3.5 w-3.5 text-wood" /> {t.confirmed.reservedBadge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 border border-foreground/10 px-3.5 py-1 text-foreground">
              <Check className="h-3.5 w-3.5 text-wood" /> {t.confirmed.priorityBadge}
            </span>
          </div>

          <div className="my-8 border-t border-border" />

          {/* What to do next */}
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {isZh ? "候补期间您可以体验" : "While you wait for early access"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/#try"
              className="gold-surface inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
            >
              <Compass className="h-4 w-4" /> {isZh ? "探索免费排盘" : "Explore your free chart"}
            </a>
            <a
              href="https://blog.scriptingdestiny.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full border border-foreground/25 bg-transparent px-6 text-sm font-medium text-foreground transition hover:bg-foreground/10"
            >
              <BookOpen className="h-4 w-4" /> {isZh ? "阅读官方精选专栏" : "Read our Substack"}{" "}
              <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60">
            <p className="text-xs text-muted-foreground mb-2.5">{t.confirmed.inquiryDesc}</p>
            <Link
              to="/survey"
              className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
            >
              {t.confirmed.inquiryBtn} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <InkStroke className="site-container" />
        <div className="site-container flex items-center justify-between py-6 text-xs 2xl:text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Scripting Destiny</span>
          <Link to="/survey" className="hover:text-foreground transition-colors">
            {t.confirmed.surveyFooter}
          </Link>
        </div>
      </footer>
    </div>
  );
}
