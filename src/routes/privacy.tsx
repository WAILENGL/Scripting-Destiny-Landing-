import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Mail, Phone, Globe, Lock, Database, UserCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import enso from "@/assets/ink-enso.jpg";
import { InkStroke } from "@/components/site/Ink";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const TITLE = "Privacy Policy & Data Protection Notice — Scripting Destiny";
const DESC =
  "Global privacy policy and data protection notice for Scripting Destiny, covering Singapore PDPA, GDPR, and US State Privacy frameworks.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { isZh } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground selection:bg-accent/20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/85 border-b border-border/30">
        <div className="site-container flex items-center justify-between py-3.5 sm:py-4">
          <Link to="/" aria-label="Scripting Destiny home" className="block">
            <img
              src={logo}
              alt="Scripting Destiny"
              className="brand-logo h-8 w-auto sm:h-10 transition-all"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs sm:text-sm font-medium transition hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isZh ? "返回首页" : "Back to Home"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Document */}
      <main className="relative flex-1 w-full max-w-4xl mx-auto px-5 py-10 sm:py-16">
        {/* Subtle decorative Enso background */}
        <img
          src={enso}
          alt=""
          width={700}
          height={700}
          className="enso-watermark pointer-events-none fixed left-1/2 top-1/3 -z-10 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] opacity-15 dark:opacity-10 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]"
        />

        {/* Header Block */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-foreground mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-wood" />
            <span>{isZh ? "法定合规与全球隐私声明" : "Global Privacy & Data Protection Notice"}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight">
            {isZh ? "隐私政策与数据保护声明" : "Privacy Policy & Data Protection Notice"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isZh
              ? "适用于 Scripting Destiny 网站、四柱八字排盘工具、订阅候补通道及相关数字化服务。"
              : "Governing the Scripting Destiny platform, BaZi charting tools, waitlist registrations, and related digital services."}
          </p>

          {/* Quick Regulatory Badges */}
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs text-muted-foreground">
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              🇸🇬 Singapore PDPA 2012
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              🇪🇺 EU / UK GDPR
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              🇺🇸 US State Privacy (CCPA / CPRA)
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              🔒 TLS 1.3 & AES-256
            </span>
          </div>
        </div>

        {/* Metadata Card (Clean & Discrete) */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-card/60 p-4 sm:p-5 backdrop-blur-sm grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "生效与更新日期" : "Effective / Last Updated"}
            </span>
            <span className="font-medium text-foreground">November 7, 2026</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "运营实体" : "Operating Entity"}
            </span>
            <span className="font-medium text-foreground">Scripting Destiny</span>
          </div>
        </div>

        {/* Notice Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/90">
          {/* Section 1 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">01</span>
              {isZh ? "介绍与管辖范围" : "Introduction & Scope"}
            </h2>
            <p className="text-muted-foreground mb-3">
              Scripting Destiny (“we”, “us”, or “our”) is dedicated to protecting your personal information and respecting your right to privacy. This Privacy Policy and Data Protection Notice (“Notice”) establishes how we collect, use, store, disclose, and safeguard personal data gathered through our website (
              <a href="https://scriptingdestiny.com" className="text-wood hover:underline">scriptingdestiny.com</a>
              ), our Substack publication, our waitlist forms, our BaZi charting tools, and related digital services (collectively, the “Services”).
            </p>
            <p className="text-muted-foreground">
              This Notice is formulated in accordance with the <strong>Personal Data Protection Act 2012 of Singapore (“PDPA”)</strong>, while respecting global data protection principles including the <strong>European Union & UK General Data Protection Regulation (“GDPR”)</strong> and relevant <strong>United States state privacy frameworks (including California CCPA / CPRA)</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">02</span>
              {isZh ? "我们收集的个人数据" : "Personal Data We Collect"}
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information you voluntarily provide to us when using our platform:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Subscriber & Waitlist Information:</strong> Your email address, subscription choices, locale preferences, and communication records when you submit queries or join our early access waitlist.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">BaZi Charting & Calibration Data:</strong> Astrological coordinates necessary to calculate metaphysical Four Pillars charts and Day Master archetypes: exact birth date, birth time, gender, and country/city of birth. You may also voluntarily submit significant life event years to calibrate or validate calculation accuracy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Automated Technical Information:</strong> IP addresses, browser specifications, device attributes, and basic traffic metrics collected by our cloud infrastructure (e.g., Cloudflare, Brevo, and Substack) to ensure web performance and cybersecurity.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">03</span>
              {isZh ? "处理目的与法律依据" : "Purposes of Processing & Legal Bases"}
            </h2>
            <p className="text-muted-foreground mb-4">
              We process personal data transparently under defined lawful bases:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-foreground font-semibold">
                    <th className="py-2.5 pr-4">Processing Purpose</th>
                    <th className="py-2.5 px-4">Global / GDPR Basis</th>
                    <th className="py-2.5 pl-4">Singapore PDPA Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Service Delivery (Chart calculation & report rendering)</td>
                    <td className="py-3 px-4">Contractual necessity / Consent</td>
                    <td className="py-3 pl-4">Provision of requested service</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Waitlist & Publications (Launch updates & Substack articles)</td>
                    <td className="py-3 px-4">Explicit opt-in consent</td>
                    <td className="py-3 pl-4">Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Customer Support & Relations (Inquiries, feedback & helpdesk)</td>
                    <td className="py-3 px-4">Legitimate interests</td>
                    <td className="py-3 pl-4">Managing customer relationship</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Algorithmic Training & Research (De-identified chart analysis)</td>
                    <td className="py-3 px-4">Legitimate interests (anonymized)</td>
                    <td className="py-3 pl-4">Business improvement / Research</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Cybersecurity & Compliance (Bot defense, rate limiting, legal demands)</td>
                    <td className="py-3 px-4">Legal obligation / Security interest</td>
                    <td className="py-3 pl-4">Compliance with law</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">04</span>
              {isZh ? "匿名化科研与模型训练" : "Anonymized Research & Machine Learning Training"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Scripting Destiny is actively modernizing classical metaphysics through algorithmic modeling and statistical pattern analysis. To accomplish this, we systematically de-identify and anonymize birth charting coordinates and submitted life events.
              </p>
              <p>
                <strong className="text-foreground">Irreversible Anonymization:</strong> Prior to any research ingestion, all identifying markers (including name, email address, IP address, and direct identifiers) are permanently removed.
              </p>
              <p>
                <strong className="text-foreground">Exemption from Personal Data Rules:</strong> Under Singapore PDPA Advisory Guidelines, EU GDPR Recital 26, and US state privacy regulations, data that has been irreversibly de-identified such that an individual is no longer identifiable ceases to be classified as personal data.
              </p>
              <p>
                <strong className="text-foreground">Algorithmic Ingestion Notice:</strong> Anonymized, aggregated data may be retained indefinitely and utilized for training mathematical models and research archives. Because this data is irreversibly unlinked from your real-world identity, it is technically impossible to identify, isolate, retrieve, or selectively excise individual records once ingested into trained models.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">05</span>
              {isZh ? "数据披露与第三方服务商" : "Sharing and Disclosure of Personal Data"}
            </h2>
            <p className="text-muted-foreground mb-3">
              We do <strong>not</strong> sell, rent, or trade your personal data to third-party data brokers or advertising exchanges. Disclosures are made strictly to:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong className="text-foreground">Brevo:</strong> Our email marketing, transactional dispatch, and waitlist management infrastructure.
              </li>
              <li>
                <strong className="text-foreground">Substack:</strong> Our publication platform for editorial articles and subscriber delivery.
              </li>
              <li>
                <strong className="text-foreground">Hosting Infrastructure:</strong> Cloud networks maintaining encrypted web hosting, DNS resolution, and security.
              </li>
              <li>
                <strong className="text-foreground">Statutory Authorities:</strong> Where compelled by valid judicial orders, law enforcement, or regulatory requirements.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">06</span>
              {isZh ? "跨境数据传输" : "Cross-Border Data Transfers"}
            </h2>
            <p className="text-muted-foreground">
              Scripting Destiny is operated from Singapore, with technical service providers located globally, including in the United States and the European Economic Area. By accessing our platform and submitting information, you acknowledge the transfer, processing, and storage of your personal data internationally. We ensure all cross-border transmissions adhere to Singapore PDPA comparable-protection requirements and standard contractual safeguards (such as European Standard Contractual Clauses).
            </p>
          </section>

          {/* Section 7 & 8 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg">07</span>
                {isZh ? "安全防护措施" : "Security Safeguards"}
              </h2>
              <p className="text-muted-foreground text-sm">
                We employ administrative and technical controls including data minimization, HTTPS/TLS 1.3 transit encryption, AES-256 cloud encryption at rest, regular software patching, and authenticated access barriers restricted strictly to authorized administrators.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg">08</span>
                {isZh ? "数据留存期限" : "Data Retention"}
              </h2>
              <p className="text-muted-foreground text-sm">
                Identifiable personal information is retained only as long as necessary to provide Services, maintain your waitlist spot, or satisfy statutory obligations. Upon withdrawal of consent or account closure, identifiable data is purged or converted to non-reversible suppression records to honor your opt-out.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">09</span>
              {isZh ? "您的法定隐私权利" : "Your Legal Rights"}
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground text-base mb-1">
                  🇸🇬 Singapore PDPA Rights:
                </h3>
                <p>
                  You have the right to withdraw consent at any time (processed within <strong>10 business days</strong>). You may also request access to your personal data or submit corrections (addressed within <strong>30 business days</strong>; standard administrative fees may apply for complex copies).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-1">
                  🇪🇺 EU / UK GDPR Rights:
                </h3>
                <p>
                  You are entitled to the rights of access, rectification, erasure (“Right to be Forgotten”), restriction of processing, objection, data portability, and the right to lodge a complaint with your supervisory authority.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-1">
                  🇺🇸 United States State Privacy Rights (e.g. California CCPA / CPRA):
                </h3>
                <p>
                  You possess the right to know what personal categories are collected, request deletion, and experience zero discrimination for exercising your privacy rights. Scripting Destiny does not sell personal data.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">10</span>
              {isZh ? "数据保护官与联系方式" : "Data Protection Officer & Inquiries"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions, feedback, or wish to exercise any of your statutory privacy rights (including consent withdrawal or access/correction requests), you may contact our designated Data Protection Officer (DPO) representing Scripting Destiny. Inquiries may be directed by email to <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a> or via phone/WhatsApp message at <span className="text-foreground font-medium">+1 (628) 238-4763</span>. Standard verification checks may be conducted before processing requests concerning personal data.
            </p>
          </section>

          {/* Section 11 */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">11</span>
              {isZh ? "条款修订与默示同意" : "Changes to This Notice & Deemed Acceptance"}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We reserve the right to review, update, or amend this Privacy Policy from time to time without prior notice to reflect operational enhancements, new technical integrations, or statutory regulatory developments.
              </p>
              <p>
                You can verify when this policy was most recently modified by referencing the “Last Updated” date at the top of this page. For routine or non-material updates, changes take effect immediately upon publication. Within reasonable bounds under applicable law, your continued access, use of our Services, or participation in our waitlist following any posted modifications constitutes your acknowledgment, acceptance, and deemed consent to the updated terms.
              </p>
              <p>
                Where any revision involves a materially significant change to how your personal data is collected, disclosed, or processed in a way not reasonably contemplated at the time of initial collection, we will provide appropriate advance notice (such as an email notification to registered addresses or an announcement banner on the platform) before such changes become effective.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border/30 bg-background/90 py-8 text-xs text-muted-foreground">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Scripting Destiny. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-foreground transition-colors">
              {isZh ? "首页" : "Home"}
            </Link>
            <Link to="/survey" className="hover:text-foreground transition-colors">
              {isZh ? "调研问卷" : "Survey"}
            </Link>
            <Link to="/privacy" className="text-foreground font-medium underline underline-offset-4">
              {isZh ? "隐私政策" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
