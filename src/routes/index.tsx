import { createFileRoute } from "@tanstack/react-router";
import { ChartTry } from "@/components/site/ChartTry";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import enso from "@/assets/ink-enso.jpg";

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

const VOICES = [
  { q: "It explained why our last pivot struggled — and gave us the clarity to restructure leadership before our Series A.", n: "Julian Vance", r: "Co-founder & CTO" },
  { q: "Fortune-telling always felt vague. This treats your chart like a profile you can actually use. No more sprint burnout.", n: "Elena Rostova", r: "Product strategist" },
  { q: "We use it to understand how founding teams complement each other. The friction drops when people understand it.", n: "Marcus Chen", r: "Managing partner" },
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
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="font-serif text-xl">
          Scripting <em className="text-accent">Destiny</em>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#elements" className="hover:text-foreground">Elements</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <a href="#try" className="rounded-full border border-foreground px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background">
          Try it free
        </a>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16">
          <img src={enso} alt="" width={1024} height={1024} className="pointer-events-none absolute -right-40 -top-24 -z-10 w-[640px] opacity-40 mix-blend-multiply max-lg:hidden" />
          <div>
            <p className="eyebrow">Modern BaZi · Chinese astrology, made practical</p>
            <h1 className="mt-5 font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Know your nature.
              <br />
              <em className="text-accent">Time your moves.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Enter your birth date and get your personal profile in seconds — your strengths, your element balance, and the
              life seasons that shape when to act.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">No sign-up · Secular · Based on 2,500 years of classical astronomy</p>
          </div>
          <div id="try" className="scroll-mt-8">
            <ChartTry />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="rule-top">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-light">A personal operating manual, written at birth.</h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n}>
                  <span className="font-serif text-sm text-accent">{s.n}</span>
                  <h3 className="mt-2 font-serif text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elements */}
        <section id="elements" className="bg-secondary">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="eyebrow">The five elements</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-light">Everyone carries all five — in different measure.</h2>
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-5">
              {ELEMENTS.map((e) => (
                <div key={e.k} className="bg-card p-6">
                  <span className={`font-serif text-5xl ${e.c}`}>{e.zh}</span>
                  <h3 className="mt-4 font-semibold">{e.k}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voices */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow">From early users</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {VOICES.map((v) => (
              <figure key={v.n}>
                <blockquote className="font-serif text-xl leading-snug">“{v.q}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{v.n}</span> <span className="text-muted-foreground">· {v.r}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ + waitlist */}
        <section id="faq" className="rule-top">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-2">
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
            <div className="rounded-2xl bg-primary p-10 text-primary-foreground">
              <h2 className="font-serif text-4xl font-light leading-tight">
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

      <footer className="rule-top">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Scripting Destiny</span>
          <a href="https://github.com/WAILENGL/Scripting-Destiny-MVP" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Open-source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
