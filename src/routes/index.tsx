import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ChartTry } from "@/components/site/ChartTry";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke, Reveal } from "@/components/site/Ink";
import logo from "@/assets/logo.png";

const TITLE = "Scripting Destiny — Know your nature. Time your moves.";
const DESC =
  "Enter your birth date and discover your BaZi Day Master: your natural strengths, element balance and the 10-year cycles that shape your best timing.";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { confirmed?: string } => ({
    confirmed: typeof search.confirmed === "string" ? search.confirmed : undefined,
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
  component: Index,
});

const ELEMENT_COLORS: Record<string, string> = {
  Wood: "text-wood",
  Fire: "text-fire",
  Earth: "text-earth",
  Metal: "text-metal",
  Water: "text-water",
  木: "text-wood",
  火: "text-fire",
  土: "text-earth",
  金: "text-metal",
  水: "text-water",
};

function Index() {
  const { confirmed } = Route.useSearch();
  const { t, isZh } = useLanguage();

  return (
    <div className="min-h-screen">
      {confirmed && (
        <div className="bg-card/95 border-b border-accent/40 px-4 py-3 text-center text-xs sm:text-sm text-foreground flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <Check className="h-4 w-4 text-wood shrink-0" />
          <span>
            <strong>{isZh ? "预约已确认！" : "You're confirmed!"}</strong>{" "}
            {isZh
              ? "您在早期体验候补名单上的席位已成功锁定。"
              : "Your spot on the early access waitlist is secured."}
          </span>
        </div>
      )}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/85 border-b border-border/30 transition-colors duration-300">
        <div className="site-container flex items-center justify-between py-3.5 sm:py-4 2xl:py-5">
          <a href="#top" aria-label="Scripting Destiny home" className="block">
            <img
              src={logo}
              alt="Scripting Destiny"
              className="brand-logo h-9 w-auto sm:h-11 2xl:h-13 transition-all"
            />
          </a>
          <nav className="hidden gap-8 2xl:gap-12 3xl:gap-16 text-sm 2xl:text-base text-muted-foreground md:flex">
            <a href="#how" className="hover:text-foreground transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#elements" className="hover:text-foreground transition-colors">
              {t.nav.elements}
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              {t.nav.faq}
            </a>
            <a
              href="https://blog.scriptingdestiny.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t.nav.blog}
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#try"
              className="rounded-full border border-foreground/40 px-3.5 py-1.5 2xl:px-5 2xl:py-2 text-xs sm:text-sm 2xl:text-base font-medium transition hover:bg-foreground hover:text-background shadow-sm"
            >
              {t.nav.tryItFree}
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="overflow-x-clip">
        {/* Hero */}
        <section className="relative site-container pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pt-12 2xl:pb-28 2xl:pt-16">
          <img
            src={enso}
            alt=""
            width={1024}
            height={1024}
            className="enso-watermark ink-in pointer-events-none absolute -right-8 top-0 -z-10 w-[86vw] max-w-[340px] [mask-image:radial-gradient(circle,black_40%,transparent_68%)] sm:-right-24 sm:top-10 sm:w-[620px] sm:max-w-none 2xl:w-[850px] 3xl:w-[1050px] 2xl:-right-24 2xl:-top-16 3xl:-right-32 3xl:-top-24 transition-all"
          />
          <p className="eyebrow rise 2xl:text-sm">{t.hero.eyebrow}</p>
          <h1 className="mt-4 2xl:mt-6 font-serif font-light leading-[0.92] tracking-[-0.03em] text-[17vw] sm:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] 2xl:text-[10rem] 3xl:text-[11.5rem]">
            <span className="rise block" style={{ animationDelay: "120ms" }}>
              {t.hero.title1}
            </span>
            <span className="rise block" style={{ animationDelay: "240ms" }}>
              {t.hero.title2}
            </span>
            <em className="rise block gold" style={{ animationDelay: "400ms" }}>
              {t.hero.title3}
            </em>
          </h1>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[1fr_1.1fr] 2xl:grid-cols-[1fr_1.15fr] 3xl:grid-cols-[1fr_1.2fr] 2xl:gap-16 3xl:gap-24 lg:items-start">
            <div className="rise" style={{ animationDelay: "600ms" }}>
              <p className="max-w-md 2xl:max-w-xl 3xl:max-w-2xl text-lg 2xl:text-xl 3xl:text-2xl leading-relaxed text-muted-foreground">
                {t.hero.description}
              </p>
              <div className="mt-8 2xl:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#waitlist"
                  className="gold-surface inline-flex h-12 2xl:h-14 items-center gap-2 rounded-full bg-accent px-7 2xl:px-9 text-sm 2xl:text-base font-semibold text-accent-foreground transition hover:brightness-110"
                >
                  {t.hero.ctaApp} <ArrowRight className="h-4 w-4 2xl:h-5 2xl:w-5" />
                </a>
                <a
                  href="#try"
                  className="text-sm 2xl:text-base text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
                >
                  {t.hero.ctaChart}
                </a>
              </div>
              <p className="mt-6 2xl:mt-8 text-sm 2xl:text-base text-muted-foreground">
                {t.hero.subtext}
              </p>
            </div>
            <div id="try" className="rise min-w-0 scroll-mt-8" style={{ animationDelay: "750ms" }}>
              <ChartTry />
            </div>
          </div>
        </section>

        {/* How it works */}
        <InkStroke className="site-container" />
        <section id="how">
          <div className="site-container py-16 sm:py-24 2xl:py-32">
            <p className="eyebrow 2xl:text-sm">{t.steps.eyebrow}</p>
            <h2 className="mt-3 max-w-xl 2xl:max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl 2xl:text-6xl 3xl:text-7xl">
              {t.steps.heading}
            </h2>
            <div className="mt-12 2xl:mt-16 grid gap-10 2xl:gap-16 3xl:gap-24 md:grid-cols-3">
              {t.steps.items.map((s, i) => (
                <Reveal key={s.n} delay={i * 120}>
                  <span className="font-serif text-5xl 2xl:text-6xl 3xl:text-7xl font-light italic text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl 2xl:text-3xl">{s.t}</h3>
                  <p className="mt-3 text-sm 2xl:text-base 3xl:text-lg leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Elements */}
        <section id="elements" className="bg-secondary">
          <div className="site-container py-16 sm:py-24 2xl:py-32">
            <p className="eyebrow 2xl:text-sm">{t.elements.eyebrow}</p>
            <h2 className="mt-3 max-w-xl 2xl:max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl 2xl:text-6xl 3xl:text-7xl">
              {t.elements.heading}
            </h2>
            <div className="mt-12 2xl:mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl 2xl:rounded-3xl border border-border bg-border sm:grid-cols-5">
              {t.elements.items.map((e) => (
                <div
                  key={e.k}
                  className="bg-card p-6 2xl:p-10 3xl:p-12 last:col-span-2 sm:last:col-span-1"
                >
                  <span
                    className={`font-serif text-5xl 2xl:text-6xl 3xl:text-7xl ${ELEMENT_COLORS[e.zh] || "text-foreground"}`}
                  >
                    {e.zh}
                  </span>
                  <h3 className="mt-4 2xl:mt-6 font-semibold 2xl:text-xl">{e.k}</h3>
                  <p className="mt-1 text-sm 2xl:text-base text-muted-foreground">{e.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why this exists */}
        <section className="site-container py-16 sm:py-24 2xl:py-32">
          <p className="eyebrow 2xl:text-sm">{t.purpose.eyebrow}</p>
          <h2 className="mt-3 max-w-xl 2xl:max-w-3xl font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl 2xl:text-6xl 3xl:text-7xl">
            {t.purpose.heading}
          </h2>
          <div className="mt-12 2xl:mt-16 grid gap-10 2xl:gap-16 3xl:gap-24 md:grid-cols-3">
            {t.purpose.items.map((p, i) => (
              <Reveal key={p.k} delay={i * 120}>
                <div className="rule-top pt-6 2xl:pt-8">
                  <span className="text-xs 2xl:text-sm uppercase tracking-[0.18em] text-accent">
                    {p.k}
                  </span>
                  <p className="mt-4 font-serif text-xl 2xl:text-2xl 3xl:text-3xl leading-snug">
                    {p.q}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ + waitlist */}
        <InkStroke className="site-container" />
        <section id="faq">
          <div className="site-container grid gap-16 2xl:gap-24 3xl:gap-32 py-16 sm:py-24 2xl:py-32 lg:grid-cols-2 2xl:grid-cols-[1.05fr_1fr] items-start">
            <div>
              <p className="eyebrow 2xl:text-sm">{t.faq.eyebrow}</p>
              <Accordion type="single" collapsible className="mt-6 2xl:mt-8">
                {t.faq.items.map((f) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger className="font-serif text-lg 2xl:text-xl 3xl:text-2xl hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground 2xl:text-base 3xl:text-lg">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div
              id="waitlist"
              className="scroll-mt-8 rounded-2xl 2xl:rounded-3xl border border-accent/30 bg-card p-8 sm:p-10 2xl:p-14 3xl:p-16 text-foreground shadow-xl ring-1 ring-accent/15 transition-all relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl 2xl:text-6xl 3xl:text-7xl leading-tight">
                {t.waitlist.heading} <em className="gold">{t.waitlist.headingItalic}</em>
              </h2>
              <p className="mb-8 2xl:mb-10 mt-4 2xl:text-lg 3xl:text-xl text-muted-foreground">
                {t.waitlist.description}
              </p>
              <div className="[&_input[type=email]]:border-input [&_input[type=email]]:bg-background [&_input[type=email]]:text-foreground [&_button[type=submit]]:bg-accent [&_button[type=submit]]:text-accent-foreground [&_button[type=submit]:hover]:brightness-110 [&_p]:text-foreground">
                <WaitlistForm />
              </div>
              <a
                href="#try"
                className="mt-6 2xl:mt-8 inline-block text-sm 2xl:text-base text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                {t.waitlist.orTryChart}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <InkStroke className="site-container" />
        <div className="site-container flex flex-wrap items-center justify-between gap-4 py-8 2xl:py-12 text-xs 2xl:text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <div className="flex items-center gap-3 sm:gap-6 2xl:gap-8">
            <LanguageToggle />
            <ThemeToggle />
            <Link to="/survey" className="hover:text-foreground transition-colors">
              {t.footer.surveyLink}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
