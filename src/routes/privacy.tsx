import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import astrolabe from "@/assets/bazi-astrolabe.jpg";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const TITLE = "Privacy & Birth Data Protection Policy — Scripting Destiny";
const DESC =
  "Comprehensive global privacy and birth data protection policy for Scripting Destiny, compliant with EU/UK GDPR, Singapore PDPA, and US/California (CCPA/CPRA) standards.";

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
        {/* Subtle decorative Astrolabe background */}
        <img
          src={astrolabe}
          alt=""
          width={1024}
          height={1024}
          className="astrolabe-watermark pointer-events-none fixed left-1/2 top-1/3 -z-10 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] opacity-15 dark:opacity-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]"
        />

        {/* Header Block */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-foreground mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-wood" />
            <span>{isZh ? "隐私政策" : "Privacy Policy"}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight">
            {isZh ? "隐私与生辰数据保护政策" : "Privacy & Birth Data Protection Policy"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isZh
              ? "适用于 Scripting Destiny 网站、真太阳时自动化命理报告、一对一私人邮件咨询、订阅候补通道及相关数字化服务。"
              : "Governing the Scripting Destiny platform, True Solar Time automated BaZi PDF reports, 1-on-1 private email consultations, waitlist registrations, and related digital services."}
          </p>
        </div>

        {/* Metadata Card (Clean & Discrete) */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-card/60 p-4 sm:p-5 backdrop-blur-sm grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "生效与更新日期" : "Effective & Last Updated"}
            </span>
            <span className="font-medium text-foreground">November 26, 2026</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "数据控制者 / 运营实体" : "Data Controller / Entity"}
            </span>
            <span className="font-medium text-foreground">Scripting Destiny</span>
          </div>
        </div>

        {/* Notice Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/90">

          {/* Section 1: Data Controller & Scope */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">01</span>
              {isZh ? "数据控制者与适用范围" : "Data Controller & Scope"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                This Privacy &amp; Birth Data Protection Policy (“Notice”) is issued by <strong>Scripting Destiny</strong> (“we”, “us”, or “our”), acting as the <strong>Data Controller</strong> under Regulation (EU) 2016/679 (the General Data Protection Regulation, or “GDPR”) and the UK Data Protection Act 2018. It governs personal and birth data processed through our website (<a href="https://scriptingdestiny.com" className="text-wood hover:underline">scriptingdestiny.com</a>), our Automated Digital Reports (Free Blueprint, Standard Reading, Full Reading), our 1-on-1 Private Email Consultations, our Substack publication, our waitlist forms, and associated digital products (collectively, the “Services”).
              </p>
              <p>
                We operate in full compliance with global privacy frameworks, notably the <strong>EU &amp; UK GDPR</strong>, the <strong>Personal Data Protection Act 2012 of Singapore (“PDPA”)</strong>, and United States federal and state privacy statutes, with special regard to the <strong>California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”)</strong>. This Policy should be read alongside our <Link to="/terms" className="text-wood hover:underline font-medium">Terms of Service</Link>.
              </p>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">02</span>
              {isZh ? "我们收集的信息" : "Information We Collect"}
            </h2>
            <p className="text-muted-foreground mb-4">
              In adherence to the GDPR principle of <em>data minimization</em> (Article 5(1)(c)), we collect only the information strictly necessary to compute your chart, generate your report, or deliver your consultation:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Birth Data &amp; Geographical Coordinates:</strong> To compute your BaZi chart and True Solar Time accurately, we collect your <strong>birth date</strong>, <strong>birth time</strong> (or a note indicating an unknown birth time), <strong>gender</strong>, <strong>birth city</strong>, and coarse city-level <strong>geographical coordinates (longitude and latitude resolved via Open-Meteo)</strong>. We do <strong>not</strong> collect real-time device GPS or precise street-level geolocation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Identity, Contact &amp; Intake Life Context Notes:</strong> Your <strong>name</strong>, <strong>email address</strong>, language/subscription preferences, and any <strong>voluntary life context notes</strong> or past life event milestones you provide at intake (or share in private email correspondence with Blake during a 1-on-1 Consultation).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Payment &amp; Transaction Metadata:</strong> All payment card processing is handled securely by <strong>Stripe</strong> (PCI-DSS Level 1 certified). <strong>Scripting Destiny never sees or stores full credit/debit card numbers or CVV codes.</strong> We receive limited transaction metadata from Stripe—such as billing name, billing email, country/postal code, order ID, amount paid, currency, payment status, and the last four (4) digits of the payment card—strictly for order fulfillment, 48-hour refund/correction handling, fraud prevention, and statutory tax compliance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Technical &amp; Network Metadata:</strong> Internet Protocol (IP) addresses, browser type, device specifications, operating system, and HTTP request headers transmitted automatically to maintain platform uptime, prevent payment fraud, and block automated spam.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Note on Special Category Data (GDPR Article 9):</strong> While birth coordinates are astronomical data, voluntary life context notes and metaphysical readings may touch on personal philosophical reflection. We do not solicit medical, racial, political, or religious records. To the extent any voluntarily submitted intake note is construed under applicable law as special-category or sensitive data, it is processed strictly based on your <strong>explicit request and affirmative consent</strong> (Art. 9(2)(a) GDPR) to deliver your reading or consultation.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: How Your Data Is Protected & AI Safeguards */}
          <section className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">03</span>
              {isZh ? "您的数据如何受到保护与零公共模型训练承诺" : "How Your Data Is Protected & Zero Public AI Training"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                We apply strict administrative, contractual, and technical safeguards (including TLS 1.3 encryption in transit and AES-256 encryption at rest) to protect your birth details and intake notes:
              </p>
              <ul className="space-y-2.5 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Zero Data Brokering:</strong> We <strong>never</strong> sell, rent, lease, or trade your birth details, email address, or voluntary life context notes to third-party data brokers, advertisers, or marketing exchanges.
                </li>
                <li>
                  <strong className="text-foreground">Zero Public AI Model Training:</strong> Synthesis requests sent to our underlying enterprise AI models to compose personalized PDF readings run exclusively under <strong>enterprise API agreements with strict zero-data-retention (ZDR) policies</strong>. Your personal chart data and intake life context notes are <strong>never retained by third-party AI vendors and never used to train public or third-party AI models</strong>.
                </li>
                <li>
                  <strong className="text-foreground">Payment Security (Stripe):</strong> All payments are processed directly via Stripe’s encrypted infrastructure; Scripting Destiny never sees, processes, or stores raw payment card numbers.
                </li>
                <li>
                  <strong className="text-foreground">Transactional Emailing (Brevo):</strong> Order confirmations, PDF report delivery emails, and waitlist verifications are delivered securely via Brevo (EU-headquartered, GDPR-compliant email processor).
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Legal Bases & Purposes */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">04</span>
              {isZh ? "处理目的与 GDPR / PDPA 法律依据" : "Purposes of Processing & Legal Bases (GDPR Art. 6 & 9)"}
            </h2>
            <p className="text-muted-foreground mb-4">
              Under Article 6 of the GDPR and Singapore PDPA, we process personal data only when an established legal basis applies:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-foreground font-semibold">
                    <th className="py-2.5 pr-4">Processing Purpose</th>
                    <th className="py-2.5 px-4">GDPR Legal Basis (EU/UK)</th>
                    <th className="py-2.5 pl-4">Singapore PDPA Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-muted-foreground">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Service Delivery: True Solar Time chart computation (via Open-Meteo city coordinates), automated PDF synthesis (zero-retention AI API), 1-on-1 email consultations, and 48-hour typographical re-renders</td>
                    <td className="py-3 px-4">
                      <strong>Performance of a Contract</strong> (Art. 6(1)(b)) &amp; <strong>Explicit Consent</strong> (Art. 9(2)(a))
                    </td>
                    <td className="py-3 pl-4">Provision of requested service / Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Order Fulfillment, Stripe Payment Processing, Refunds &amp; Tax/Accounting Compliance</td>
                    <td className="py-3 px-4">
                      <strong>Performance of a Contract</strong> (Art. 6(1)(b)) &amp; <strong>Legal Obligation</strong> (Art. 6(1)(c))
                    </td>
                    <td className="py-3 pl-4">Processing payment transactions &amp; statutory compliance (IRAS)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Transactional Emails, Waitlist Notifications &amp; Editorial Subscriptions (Brevo / Substack)</td>
                    <td className="py-3 px-4">
                      <strong>Performance of a Contract</strong> (transactional) / <strong>Freely Given Consent</strong> (Art. 6(1)(a), newsletters)
                    </td>
                    <td className="py-3 pl-4">Provision of service / Opt-in Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Customer Service, Typographical Data Corrections &amp; Helpdesk</td>
                    <td className="py-3 px-4">
                      <strong>Performance of a Contract</strong> (Art. 6(1)(b)) / <strong>Legitimate Interests</strong> (Art. 6(1)(f))
                    </td>
                    <td className="py-3 pl-4">Customer relationship &amp; query handling</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Cybersecurity, Payment Fraud Prevention, Bot Defense &amp; Rate Limiting</td>
                    <td className="py-3 px-4">
                      <strong>Legitimate Interests</strong> (Art. 6(1)(f)) — protecting systems and preventing fraud
                    </td>
                    <td className="py-3 pl-4">Compliance with law &amp; security operations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Internal De-Identified Research vs Public AI */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">05</span>
              {isZh ? "内部去标识化统计研究 (GDPR 第26条序言)" : "Internal De-Identified Statistical Research (Recital 26 GDPR)"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                While your personal chart data and intake life context notes are <strong>never</strong> shared with or used to train third-party or public AI models (Section 03), Scripting Destiny conducts internal mathematical and statistical pattern research to validate classical astrological cycle correlations.
              </p>
              <p>
                <strong className="text-foreground">Strict Exclusion of Personal &amp; Narrative Data:</strong> Prior to any internal statistical compilation, all personally identifiable information—including your name, email address, payment details, IP address, private intake life context notes, and 1-on-1 email dialogue—is strictly excluded or permanently stripped. Only irreversibly anonymized astronomical birth coordinates and non-identifying milestone years may be aggregated.
              </p>
              <p>
                <strong className="text-foreground">Legal Classification (GDPR Recital 26, PDPA &amp; CCPA):</strong> Under Recital 26 of the GDPR, Singapore PDPC Advisory Guidelines, and Cal. Civ. Code § 1798.140(m)/(v)(3), irreversibly de-identified information that cannot reasonably be linked to an identified or identifiable individual is no longer personal data. We maintain technical safeguards and commit not to attempt re-identification. Because anonymized aggregates are decoupled from your identity, individual historical points cannot be isolated or retroactively extracted once merged into aggregate statistical tables.
              </p>
            </div>
          </section>

          {/* Section 6: Third-Party Processors & API Providers */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">06</span>
              {isZh ? "第三方受托处理者与 API 服务商" : "Third-Party Processors & API Providers (GDPR Art. 13(1)(e))"}
            </h2>
            <p className="text-muted-foreground mb-3">
              We share data solely with vetted, contractually bound service providers necessary to operate our platform:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong className="text-foreground">Open-Meteo (Geocoding API):</strong> Receives only the birth city name (no personal identifiers, birth date, or email) to resolve coarse city-level longitude and latitude coordinates required for True Solar Time calculations.
              </li>
              <li>
                <strong className="text-foreground">Enterprise AI Synthesis Providers (Zero-Data-Retention APIs):</strong> Process chart synthesis requests transiently under enterprise zero-retention terms; inputs are neither retained nor used to train public models.
              </li>
              <li>
                <strong className="text-foreground">Stripe (Stripe, Inc. / Stripe Payments Europe / Stripe Payments Singapore):</strong> PCI-DSS Level 1 payment processor handling secure checkout, card authorization, fraud screening, refunds, and receipts.
              </li>
              <li>
                <strong className="text-foreground">Brevo (Sendinblue SAS, France):</strong> GDPR-compliant European transactional email and list management platform delivering your PDF reports, confirmations, and updates.
              </li>
              <li>
                <strong className="text-foreground">Substack Inc. (USA):</strong> Editorial publication platform for users who opt in to our essays.
              </li>
              <li>
                <strong className="text-foreground">Cloud Infrastructure &amp; Web Hosting:</strong> Encrypted serverless hosting, PDF rendering pipelines, and CDN security infrastructure.
              </li>
              <li>
                <strong className="text-foreground">Public Authorities &amp; Courts:</strong> Strictly where compelled by valid subpoenas, court orders, tax audits, or statutory obligations.
              </li>
            </ul>
          </section>

          {/* Section 7: International Transfers */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">07</span>
              {isZh ? "跨境数据传输与保护措施" : "International Transfers (GDPR Chapter V, Art. 44–49)"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Scripting Destiny is operated from Singapore, with subprocessors and cloud infrastructure (including Stripe, Brevo, Substack, Open-Meteo, and enterprise AI APIs) located in Singapore, the European Economic Area (EEA), and the United States.
              </p>
              <p>
                When transferring personal data originating in the EEA or UK to jurisdictions outside the EEA:
              </p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>We ensure transfers rely on European Commission <strong>Standard Contractual Clauses (SCCs)</strong> (Art. 46(2)(c) GDPR), equivalent UK International Data Transfer Addendums, or certified <strong>EU-U.S. Data Privacy Framework (DPF)</strong> protections where applicable.</li>
                <li>We require all processors to uphold security standards comparable to the GDPR and Singapore PDPA.</li>
                <li>Transfers strictly necessary to generate and deliver a report or consultation requested by you are additionally supported under Article 49(1)(b) GDPR.</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Data Retention */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">08</span>
              {isZh ? "数据留存期限与标准" : "Data Retention Criteria (GDPR Art. 13(2)(a))"}
            </h2>
            <p className="text-muted-foreground mb-3">
              We retain personal data only for as long as necessary for the operational, contractual, or statutory purposes for which it was collected:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Intake Records, Life Context Notes &amp; Generated PDF Reports:</strong> Retained for up to <strong>24 months</strong> to enable download access, honor our 48-hour free typographical correction policy, and complete 1-on-1 consultations—or <strong>permanently deleted earlier at any time upon your erasure request</strong> to <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a>.</li>
              <li><strong className="text-foreground">Transaction, Billing &amp; Tax Records:</strong> Minimal invoice metadata retained for <strong>five (5) to seven (7) years</strong> as legally required under Singapore IRAS accounting rules, EU VAT regulations, and U.S. tax laws.</li>
              <li><strong className="text-foreground">Waitlist &amp; Subscriber Records:</strong> Retained while subscribed until you withdraw consent or unsubscribe.</li>
              <li><strong className="text-foreground">Unsubscribe Suppression Lists:</strong> Retained in minimal hashed form solely to guarantee you are not inadvertently emailed again.</li>
              <li><strong className="text-foreground">Transient Security &amp; Server Logs:</strong> Automatically rotated and purged after 30 to 90 days.</li>
            </ul>
          </section>

          {/* Section 9: Right to Erasure & GDPR Data Subject Rights */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">09</span>
              {isZh ? "删除权与欧洲用户法定权利 (GDPR)" : "Right to Erasure & Your Rights Under GDPR (Articles 15–22)"}
            </h2>
            <p className="text-muted-foreground mb-4">
              <strong>Universal Right to Erasure:</strong> Regardless of your location, you may request the <strong>permanent deletion of your intake records, birth details, life context notes, and generated reports at any time</strong> by emailing <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a> (or <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>). Verified deletion requests are processed within 30 days (subject only to mandatory tax/invoice retention under applicable fiscal law).
            </p>
            <p className="text-muted-foreground mb-4">
              If you are located in the European Union or United Kingdom, you also possess the full suite of statutory rights under GDPR Chapter III:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-muted-foreground">
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Access (Art. 15):</strong>
                Obtain confirmation of whether we process your data and receive a copy of personal information held.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Rectification (Art. 16):</strong>
                Request correction of inaccurate or incomplete personal records at any time.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Erasure (Art. 17):</strong>
                Request permanent deletion of your intake records, notes, and reports (“Right to be Forgotten”), subject to Art. 17(3)(b) tax invoice obligations.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Restriction (Art. 18):</strong>
                Limit processing while disputing accuracy or asserting unlawful processing.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Portability (Art. 20):</strong>
                Receive your personal data in a structured, commonly used, and machine-readable format.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Object &amp; Withdraw Consent (Art. 21 &amp; 7(3)):</strong>
                Object at any time to processing based on legitimate interests or direct marketing, or withdraw consent without affecting prior lawful processing.
              </div>
            </div>
            <div className="mt-4 space-y-2 text-muted-foreground text-xs sm:text-sm">
              <p>
                <strong className="text-foreground">Automated Processing &amp; Profiling Notice (Art. 13(2)(f) &amp; Art. 22):</strong> While our engine automates True Solar Time BaZi calculations and uses zero-retention enterprise AI APIs to compose interpretive prose, outputs are strictly for personal contemplation and entertainment. We do <strong>not</strong> make automated decisions that produce legal, financial, employment, credit, or similarly significant effects.
              </p>
              <p>
                <strong className="text-foreground">Right to Lodge a Complaint (Art. 77):</strong> You may lodge a complaint with your local European Data Protection Authority (DPA) or the UK Information Commissioner’s Office (ICO).
              </p>
            </div>
          </section>

          {/* Section 10: Cookies & Children's Privacy */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg">10</span>
                {isZh ? "Cookie 与本地存储" : "Cookies & Local Storage"}
              </h2>
              <p className="text-muted-foreground text-sm">
                We do <strong>not</strong> deploy third-party cross-site advertising cookies or tracking pixels. We use only strictly functional client-side keys (<code>sd-lang</code>, <code>sd-theme</code>) and strictly necessary session/fraud-prevention cookies set by <strong>Stripe</strong> during payment checkout, which are exempt from advertising cookie consent mandates under the ePrivacy Directive.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg">11</span>
                {isZh ? "未成年人隐私保护" : "Children’s Privacy"}
              </h2>
              <p className="text-muted-foreground text-sm">
                Paid Automated Digital Reports and 1-on-1 Consultations are strictly restricted to individuals aged <strong>18 and older</strong>. Free web tools and waitlist features are intended for users aged <strong>16 and older</strong> (GDPR Art. 8 / COPPA). We do not knowingly collect data from children under 16 and will promptly delete any such submission upon discovery.
              </p>
            </div>
          </section>

          {/* Section 12: Singapore PDPA Specific Notice */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">12</span>
              {isZh ? "新加坡个人数据保护法 (PDPA) 专章" : "Singapore PDPA Statutory Provisions"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                For individuals in Singapore and processing governed by the Singapore <strong>Personal Data Protection Act 2012 (“PDPA”)</strong>:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Withdrawal of Consent &amp; Deletion:</strong> You may withdraw consent or request deletion of your intake records and reports at any time via <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a> or <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>. We process consent withdrawals within <strong>ten (10) business days</strong> of receipt.
                </li>
                <li>
                  <strong className="text-foreground">Access &amp; Correction Requests:</strong> We respond to formal access or correction requests within <strong>thirty (30) business days</strong>. A reasonable administrative fee may be assessed for complex manual access requests.
                </li>
                <li>
                  <strong className="text-foreground">Transfer Limitation Obligation (PDPA Section 26):</strong> We ensure that overseas subprocessors (including Stripe, Brevo, Substack, Open-Meteo, and enterprise AI APIs) provide a standard of protection comparable to the PDPA.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 13: California & US State Privacy Laws */}
          <section className="rounded-xl border border-accent/40 bg-card/75 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">13</span>
              {isZh ? "美国与加利福尼亚州消费者隐私专章 (CCPA / CPRA)" : "United States & California Privacy Notice (CCPA / CPRA)"}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This Section applies to California residents under the <strong>California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”, Cal. Civ. Code § 1798.100 et seq.)</strong>, and serves as our <strong>Notice at Collection</strong> (including mandatory category-level retention disclosures under § 1798.100(a)(3)).
              </p>

              {/* CCPA Categories Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 text-foreground font-semibold">
                      <th className="py-2 pr-3">CCPA Category (§ 1798.140)</th>
                      <th className="py-2 px-3">Examples Collected</th>
                      <th className="py-2 px-3">Retention Period</th>
                      <th className="py-2 pl-3">Sold / Shared?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">A. Identifiers</td>
                      <td className="py-2.5 px-3">Name, email address, IP address</td>
                      <td className="py-2.5 px-3">Up to 24 mos after order (or earlier upon erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">B. Personal Records (§ 1798.80)</td>
                      <td className="py-2.5 px-3">Name, email, gender, birth date/time (or unknown), intake life notes, Stripe billing metadata (no card numbers stored)</td>
                      <td className="py-2.5 px-3">5–7 yrs for tax invoices; up to 24 mos for intake/reports (or earlier upon erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">D. Commercial Information</td>
                      <td className="py-2.5 px-3">Purchased PDF reports &amp; 1-on-1 consultations, order IDs, refund/re-render history</td>
                      <td className="py-2.5 px-3">5–7 years (statutory tax &amp; accounting compliance)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">F. Internet / Electronic Activity</td>
                      <td className="py-2.5 px-3">Browser type, device headers, page interactions</td>
                      <td className="py-2.5 px-3">30–90 days (security &amp; fraud logs)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">G. Geolocation Data (Coarse Only)</td>
                      <td className="py-2.5 px-3">Birth city &amp; city-centroid longitude/latitude via Open-Meteo (NOT precise GPS within 1,850 ft)</td>
                      <td className="py-2.5 px-3">Up to 24 mos for report support (or earlier upon erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">K. Inferences</td>
                      <td className="py-2.5 px-3">Calculated Day Master &amp; BaZi profile archetype</td>
                      <td className="py-2.5 px-3">Up to 24 mos for report support (or earlier upon erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial Mandatory Affirmation: No Sale / No Sharing / SPI / GPC */}
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-xs sm:text-sm">
                <strong className="text-foreground block mb-1">Mandatory California Disclosures:</strong>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Zero Data Brokering (No Sale or Sharing):</strong> Scripting Destiny has <strong>not sold or shared</strong> (for cross-context behavioral advertising) personal information of consumers in the preceding 12 months, and does not sell or share information of consumers under 16 years of age.</li>
                  <li><strong>Sensitive Personal Information (SPI) &amp; Coarse Geolocation:</strong> Birth city longitude/latitude resolved via Open-Meteo is strictly coarse city-level astronomical data and does <strong>not</strong> constitute “precise geolocation” SPI under Cal. Civ. Code § 1798.140(w). Any potentially sensitive details voluntarily included in intake life context notes or billing metadata handled by Stripe are used exclusively to fulfill the requested reading/consultation, prevent fraud, or comply with law (Cal. Civ. Code § 1798.121 &amp; 11 CCR § 7027(m)), and never to infer characteristics for marketing or train public AI models.</li>
                  <li><strong>Global Privacy Control (GPC) Signals:</strong> We honor browser-based Global Privacy Control (GPC) opt-out signals in compliance with 11 CCR § 7025; because we never sell or share personal information, all visitors automatically receive opt-out level protection by default.</li>
                </ul>
              </div>

              {/* California Rights */}
              <div className="space-y-2 text-xs sm:text-sm">
                <strong className="text-foreground block text-sm">Your Rights as a California Consumer:</strong>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Right to Know / Access:</strong> Request the categories and specific pieces of personal information collected about you in the preceding 12 months, sources, and business purposes.</li>
                  <li><strong>Right to Delete:</strong> Request permanent deletion of your intake records, birth details, life context notes, and reports at any time via <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a> or <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>, subject only to statutory exceptions under Cal. Civ. Code § 1798.105(d) (such as retaining tax/invoice records or completing an active consultation).</li>
                  <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information held in our systems.</li>
                  <li><strong>Right to Non-Discrimination:</strong> We never discriminate against you, deny access, or alter pricing for exercising your statutory privacy rights.</li>
                  <li><strong>Response Timeline &amp; Authorized Agents:</strong> We respond to verifiable requests within <strong>45 calendar days</strong> (extendable by 45 days when reasonably necessary with notice). Authorized agents may submit requests with written proof of authorization and identity verification.</li>
                  <li><strong>California “Shine the Light” (Civil Code § 1798.83):</strong> We never disclose personal information to third parties for their own direct marketing purposes.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 14: Mobile App Store Compliance & In-App Account Deletion */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">14</span>
              {isZh ? "移动应用商店合规与账号注销机制" : "Mobile App Store Compliance & Account Deletion (Apple & Google Play)"}
            </h2>
            <div className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
              <p>
                In compliance with <strong>Apple App Store Review Guideline 5.1.1(v)</strong> and the <strong>Google Play Data Safety Policy</strong>, we maintain transparent protocols for our mobile applications:
              </p>
              <ul className="space-y-1.5 list-disc list-inside pl-2">
                <li><strong className="text-foreground">In-App Account &amp; Data Deletion:</strong> If you register an account in our mobile app, you may permanently delete your account, intake records, and reports directly within app settings (via “Account → Delete Account”) or by emailing <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a> or <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>. Deletion takes effect within thirty (30) days (subject to statutory billing/tax record retention).</li>
                <li><strong className="text-foreground">Device Hardware Permissions:</strong> The Scripting Destiny mobile app does not request access to your device microphone, camera, contacts/address book, photo library, or precise real-time GPS location.</li>
                <li><strong className="text-foreground">No Cross-App Tracking (IDFA):</strong> We do not track users across third-party apps or websites for targeted advertising, and we do not request or utilize Apple’s Identifier for Advertisers (IDFA) or Google Advertising ID (GAID) for cross-context behavioral marketing.</li>
              </ul>
            </div>
          </section>

          {/* Section 15: DPO Contact & Amendments */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">15</span>
              {isZh ? "联系方式、数据保护官与条款修订" : "Contact, Data Protection Officer & Policy Amendments"}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Erasure, Corrections &amp; Support:</strong> To request permanent deletion of your intake records and reports, or to report typographical birth errors within 48 hours of purchase, email <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a>.
              </p>
              <p>
                <strong className="text-foreground">Data Protection Officer (DPO):</strong> For formal statutory privacy inquiries under GDPR, Singapore PDPA, or CCPA/CPRA, you may also contact our designated Data Protection Officer representing Scripting Destiny at <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a> or via phone / voicemail at <span className="text-foreground font-medium">+1 (628) 238-4763</span>. We verify requestor identities prior to fulfilling disclosures or deletions to safeguard your data.
              </p>
              <p>
                <strong className="text-foreground">Amendments to This Policy:</strong> We may update this Policy periodically to reflect technical, operational, or legal developments. The latest revision date is displayed at the top of this page. Routine, non-material updates take effect immediately upon publication, and continued use of our Services constitutes acceptance within reasonable bounds under applicable law. For materially significant changes affecting how we process your personal data, we will provide appropriate advance notice (via email or platform banner) before the changes take effect.
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
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {isZh ? "服务条款" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
