import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ChartTry } from "@/components/site/ChartTry";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke, Reveal } from "@/components/site/Ink";
import logo from "@/assets/logo.png";

const TITLE = "Scripting Destiny — Know your nature. Time your moves.";
const DESC =
  "Enter your birth date and discover your BaZi Day Master: your natural strengths, element balance and the 10-year cycles that shape your best timing.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const STEPS = [
  { n: "01", t: "Enter your birth date", d: "Your birth moment maps to four pillars of classical Chinese astronomy — calculated precisely, no guesswork." },
  { n: "02", t: "Meet your Day Master", d: "One of ten archetypes that describes how you naturally think, lead and recharge — in plain English." },
  { n: "03", t: "Time your decisions", d: "See which 10-year season you're in, so you know when to build, when to push and when to rest." },
];

const ELEMENTS = [
  { k: "Wood", zh: "木", c: "text-wood", d: "Growth, vision, starting things" },
  { k: "Fire", zh: "火", c: "text-fire", d: "Visibility, energy, influence" },
  { k: "Earth", zh: "土", c: "text-earth", d: "Stability, trust, holding space" },
  { k: "Metal", zh: "金", c: "text-metal", d: "Precision, standards, decisions" },
  { k: "Water", zh: "水", c: "text-water", d: "Insight, strategy, adaptability" },
];

const PURPOSE = [
  { k: "Cycles", q: "Life moves in seasons. BaZi maps them, so you can tell a winter from a harvest — and stop pushing against the one you're actually in." },
  { k: "Understanding", q: "It gives language to what you already sense: how you think, lead and recharge — until knowing yourself stops being vague." },
  { k: "Alignment", q: "Introspection with a map. Look closely enough at your own nature and the choices get quieter — less friction, more alignment." },
];

const FAQ = [
  { q: "What is BaZi?", a: "BaZi (“Eight Characters”) is a classical Chinese system that turns the moment of your birth into four pairs of characters — the Four Pillars. It describes your natural strengths and the timing cycles of your life." },
  { q: "Is this fortune-telling?", a: "No. Scripting Destiny is secular and practical. Your chart is a starting point, not a verdict — it helps you make deliberate choices instead of running on default." },
  { q: "Do I need to know Chinese or astrology?", a: "Not at all. Every concept is translated into everyday language like The Pioneer or The Strategist." },
  { q: "Why does birth time matter?", a: "It sets your Hour Pillar — your long-range vision and legacy. If you don't know it, leave the default; your Day Master stays the same." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6">
        <a href="#top" aria-label="Scripting Destiny home" className="block">
          <img src={logo} alt="Scripting Destiny" className="h-10 w-auto sm:h-12" />
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#elements" className="hover:text-foreground">Elements</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="https://blog.scriptingdestiny.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Blog</a>
        </nav>
        <a href="#try" className="rounded-full border border-foreground/40 px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background">
          Try it free
        </a>
      </header>

      <main id="top" className="overflow-x-clip">
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-6 lg:pt-14">
          <img src={enso} alt="" width={1024} height={1024} style={{ filter: "grayscale(1) invert(1) contrast(1.6) brightness(0.9)" }} className="ink-in pointer-events-none absolute -right-8 top-0 -z-10 w-[86vw] max-w-[340px] opacity-55 mix-blend-screen [mask-image:radial-gradient(circle,black_40%,transparent_68%)] sm:-right-24 sm:top-10 sm:w-[620px] sm:max-w-none sm:opacity-40 lg:-right-40 lg:-top-20" />
          <p className="eyebrow rise">Modern BaZi · Chinese astrology, made practical</p>
          <h1 className="mt-6 font-serif font-light leading-[0.92] tracking-[-0.03em] text-[17vw] sm:text-8xl lg:text-[9.5rem]">
            <span className="rise block" style={{ animationDelay: "120ms" }}>Know your</span>
            <span className="rise block" style={{ animationDelay: "240ms" }}>nature.</span>
            <em className="rise block gold" style={{ animationDelay: "400ms" }}>Time your moves.</em>
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div className="rise" style={{ animationDelay: "600ms" }}>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Enter your birth date and get your personal profile in seconds — your strengths, your element balance, and
                the life seasons that shape when to act.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#waitlist"
                  className="gold-surface inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                >
                  Get the full app <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#try" className="text-sm text-muted-foreground underline underline-offset-4 transition hover:text-foreground">
                  or see your chart first
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">The free chart needs no sign-up · Secular · 2,500 years of classical astronomy</p>
            </div>
            <div id="try" className="rise min-w-0 scroll-mt-8" style={{ animationDelay: "750ms" }}>
              <ChartTry />
            </div>
          </div>
        </section>

        {/* How it works */}
        <InkStroke className="mx-auto max-w-6xl px-5 sm:px-6" />
        <section id="how">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">A personal operating manual, written at birth.</h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <span className="font-serif text-5xl font-light italic text-accent">{s.n}</span>
                  <h3 className="mt-2 font-serif text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Elements */}
        <section id="elements" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
            <p className="eyebrow">The five elements</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">Every chart is a unique balance — shaped by what is present, and what is missing.</h2>
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-5">
              {ELEMENTS.map((e) => (
                <div key={e.k} className="bg-card p-6 last:col-span-2 sm:last:col-span-1">
                  <span className={`font-serif text-5xl ${e.c}`}>{e.zh}</span>
                  <h3 className="mt-4 font-semibold">{e.k}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this exists */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <p className="eyebrow">Why this exists</p>
          <h2 className="mt-3 max-w-xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl">Built on three convictions.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {PURPOSE.map((p, i) => (
              <Reveal key={p.k} delay={i * 120}>
                <div className="rule-top pt-6">
                  <span className="text-xs uppercase tracking-[0.18em] text-accent">{p.k}</span>
                  <p className="mt-4 font-serif text-xl leading-snug">{p.q}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ + waitlist */}
        <InkStroke className="mx-auto max-w-6xl px-5 sm:px-6" />
        <section id="faq">
          <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Questions</p>
              <Accordion type="single" collapsible className="mt-6">
                {FAQ.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="font-serif text-lg hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div id="waitlist" className="scroll-mt-8 rounded-2xl bg-primary p-10 text-primary-foreground">
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl leading-tight">
                The full app is <em>coming soon.</em>
              </h2>
              <p className="mb-8 mt-4 opacity-75">
                10-year cycle tracking, yearly timing guides and team compatibility. Free for early members.
              </p>
              <div className="[&_input]:border-primary-foreground/30 [&_input]:bg-transparent [&_input]:text-primary-foreground [&_button]:bg-accent [&_button:hover]:bg-primary-foreground [&_button:hover]:text-primary [&_p]:text-primary-foreground">
                <WaitlistForm />
              </div>
              <a href="#try" className="mt-6 inline-block text-sm underline underline-offset-4 opacity-75 hover:opacity-100">
                Or try your free chart first →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <InkStroke className="mx-auto max-w-6xl px-5 sm:px-6" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Scripting Destiny</span>
        </div>
      </footer>
    </div>
  );
}
