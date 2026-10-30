import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Compass, BookOpen } from "lucide-react";
import logo from "@/assets/logo.png";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke } from "@/components/site/Ink";

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
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
      {/* Top Header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-6">
        <Link to="/" aria-label="Scripting Destiny home" className="block">
          <img src={logo} alt="Scripting Destiny" className="h-10 w-auto sm:h-12" />
        </Link>
        <Link
          to="/"
          className="rounded-full border border-foreground/30 px-4 py-1.5 text-xs sm:text-sm font-medium transition hover:bg-foreground hover:text-background"
        >
          Back to home
        </Link>
      </header>

      {/* Main Confirmation Content */}
      <main className="relative mx-auto my-auto w-full max-w-2xl px-5 py-12 sm:px-6 text-center">
        {/* Subtle decorative Enso background */}
        <img
          src={enso}
          alt=""
          width={700}
          height={700}
          style={{ filter: "grayscale(1) invert(1) contrast(1.6) brightness(0.9)" }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[460px] opacity-30 mix-blend-screen [mask-image:radial-gradient(circle,black_35%,transparent_70%)]"
        />

        <div className="rounded-3xl border border-foreground/15 bg-card/85 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
          {/* Eyebrow */}
          <p className="eyebrow text-accent">Waitlist Confirmed</p>

          {/* Headline */}
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            You're officially on the list.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
            Your email is verified. When the full app opens, you will be among the first to receive access — with full 10-year cycle tracking and timing guides free for early members.
          </p>

          {/* Status Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 border border-foreground/10 px-3.5 py-1 text-foreground">
              <Check className="h-3.5 w-3.5 text-wood" /> Early Access Reserved
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 border border-foreground/10 px-3.5 py-1 text-foreground">
              <Check className="h-3.5 w-3.5 text-wood" /> Substack Articles Included
            </span>
          </div>

          <div className="my-8 border-t border-border" />

          {/* What to do next */}
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            While you wait for early access
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/#try"
              className="gold-surface inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
            >
              <Compass className="h-4 w-4" /> Explore your free chart
            </a>
            <a
              href="https://blog.scriptingdestiny.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full border border-foreground/25 bg-transparent px-6 text-sm font-medium text-foreground transition hover:bg-foreground/10"
            >
              <BookOpen className="h-4 w-4" /> Read our Substack <ArrowRight className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <InkStroke className="mx-auto max-w-6xl px-5 sm:px-6" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Scripting Destiny</span>
          <span>Know your nature. Time your moves.</span>
        </div>
      </footer>
    </div>
  );
}
