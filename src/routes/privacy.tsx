import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import astrolabe from "@/assets/bazi-astrolabe.jpg";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const TITLE = "Privacy Policy & Data Protection Notice — Scripting Destiny";
const DESC =
  "Comprehensive global privacy policy for Scripting Destiny, structured for EU/UK GDPR compliance, Singapore PDPA, and US/California (CCPA/CPRA) standards.";

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
            {isZh ? "隐私政策与数据保护声明" : "Privacy Policy & Data Protection Notice"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isZh
              ? "适用于 Scripting Destiny 网站、真太阳时自动化命理报告、一对一私人邮件咨询、订阅候补通道及相关数字化服务。"
              : "Governing the Scripting Destiny platform, automated BaZi PDF reports, 1-on-1 private email consultations, waitlist registrations, and related digital services."}
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
                This Privacy Policy and Data Protection Notice (“Notice”) is issued by <strong>Scripting Destiny</strong> (“we”, “us”, or “our”), acting as the <strong>Data Controller</strong> under Regulation (EU) 2016/679 (the General Data Protection Regulation, or “GDPR”) and the UK Data Protection Act 2018. It governs personal data processed through our website (<a href="https://scriptingdestiny.com" className="text-wood hover:underline">scriptingdestiny.com</a>), our Automated Digital Reports (Free Blueprint, Standard Reading, Full Reading), our 1-on-1 Private Email Consultations, our Substack publication, our waitlist forms, and associated digital products (collectively, the “Services”).
              </p>
              <p>
                We are committed to operating in full compliance with global privacy frameworks, notably the <strong>EU &amp; UK GDPR</strong>, the <strong>Personal Data Protection Act 2012 of Singapore (“PDPA”)</strong>, and United States federal and state privacy statutes, with special regard to the <strong>California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”)</strong>.
              </p>
            </div>
          </section>

          {/* Section 2: Categories of Personal Data */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">02</span>
              {isZh ? "我们处理的个人数据类别" : "Categories of Personal Data We Process"}
            </h2>
            <p className="text-muted-foreground mb-4">
              In adherence to the GDPR principle of <em>data minimization</em> (Article 5(1)(c)), we collect only personal data strictly necessary to fulfill our services:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Customer, Subscriber &amp; Waitlist Identifiers:</strong> Your name, email address, subscription preferences, locale selection (English or Chinese), and records of communication when purchasing a report, requesting a 48-hour typographical correction, contacting support, or joining our waitlist.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">BaZi Astrological Coordinates:</strong> Numerical coordinates required to calculate True Solar Time metaphysical Four Pillars charts, PDF reports, and Day Master archetypes: exact date of birth, time of birth, gender, and country/city of birth. You may also voluntarily submit significant life event milestone years to calibrate and validate calculation precision.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Payment &amp; Transaction Information:</strong> When you purchase a paid PDF report or 1-on-1 Consultation, payment card details are collected and processed directly by <strong>Stripe</strong> (PCI-DSS Level 1 certified). Scripting Destiny does <strong>not</strong> store full credit/debit card numbers or CVV codes on our servers. We receive limited transaction records from Stripe—such as billing name, billing email, country/postal code, transaction ID, amount paid, currency, payment status, and the last four (4) digits of the payment card—for order delivery, refund verification, fraud prevention, and statutory tax recordkeeping.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">1-on-1 Consultation Correspondence:</strong> Questions, reflections, and personal context voluntarily shared via email with Blake during a 1-on-1 Private Email Consultation. Such private narrative correspondence is held in strict confidence and used exclusively to deliver your consultation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Technical &amp; Network Metadata:</strong> Internet Protocol (IP) addresses, browser type, device specifications, operating system, and HTTP request headers transmitted automatically to maintain platform uptime, prevent payment fraud, and detect spam bots.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Note on Special Category Data (GDPR Article 9):</strong> While birth details are astronomical coordinates, metaphysical interpretations and private consultation discussions may touch on personal philosophical reflection. We do not solicit medical, racial, political, or religious data. To the extent any voluntarily provided input is construed under local law as relating to personal beliefs or sensitive context, we process such data exclusively based on your <strong>explicit request and affirmative consent</strong> (Art. 9(2)(a) GDPR) to deliver your reading or consultation.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Legal Bases & Purposes */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">03</span>
              {isZh ? "处理目的与 GDPR 法律依据" : "Purposes of Processing & Legal Bases (GDPR Art. 6 & 9)"}
            </h2>
            <p className="text-muted-foreground mb-4">
              Under Article 6 of the GDPR, we only process personal data when we have a recognized legal basis:
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
                    <td className="py-3 pr-4 font-medium text-foreground">Service Delivery: True Solar Time chart calculations, automated PDF reports (Free Blueprint, Standard Reading, Full Reading), 1-on-1 email consultations, and 48-hour typographical re-renders</td>
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
                    <td className="py-3 pr-4 font-medium text-foreground">Waitlist Notifications &amp; Editorial Subscriptions (Substack / Brevo)</td>
                    <td className="py-3 px-4">
                      <strong>Freely Given Consent</strong> (Art. 6(1)(a))
                    </td>
                    <td className="py-3 pl-4">Opt-in Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Customer Service &amp; Helpdesk Correspondence</td>
                    <td className="py-3 px-4">
                      <strong>Legitimate Interests</strong> (Art. 6(1)(f)) — managing user communications
                    </td>
                    <td className="py-3 pl-4">Customer relationship &amp; query handling</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Cybersecurity, Payment Fraud Prevention, Bot Defense &amp; Rate Limiting</td>
                    <td className="py-3 px-4">
                      <strong>Legitimate Interests</strong> (Art. 6(1)(f)) — safeguarding infrastructure and preventing fraud
                    </td>
                    <td className="py-3 pl-4">Compliance with law &amp; security operations</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Statutory Compliance &amp; Legal Obligations</td>
                    <td className="py-3 px-4">
                      <strong>Legal Obligation</strong> (Art. 6(1)(c))
                    </td>
                    <td className="py-3 pl-4">Statutory compliance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Anonymized Research & AI Datasets */}
          <section className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">04</span>
              {isZh ? "匿名化科研、算法模型与数据安全" : "Anonymized Research, Computational Modeling, & Recital 26 GDPR"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Scripting Destiny conducts mathematical and statistical pattern research to evaluate astrological cycle correlations. To facilitate this research while protecting individual privacy, we maintain a strict de-identification pipeline:
              </p>
              <p>
                <strong className="text-foreground">De-Identification Standard &amp; Consultation Privacy:</strong> All personally identifiable information (including name, email address, payment details, IP address, unique user identifiers, and private free-form email narratives from 1-on-1 consultations) is strictly excluded or irreversibly detached prior to any research analysis. Only structured, anonymized birth coordinates and non-identifying milestone event years are used.
              </p>
              <p>
                <strong className="text-foreground">Exemption under GDPR Recital 26, Singapore PDPA &amp; CCPA:</strong> Under Recital 26 of the GDPR, Singapore PDPC Advisory Guidelines, and Cal. Civ. Code § 1798.140(m)/(v)(3), the principles of data protection do not apply to irreversibly anonymized or de-identified information that cannot reasonably be linked to an identified or identifiable natural person. We maintain technical safeguards and commit not to attempt re-identification of de-identified datasets.
              </p>
              <p>
                <strong className="text-foreground">Algorithmic Integration &amp; Technical Notice:</strong> Fully anonymized charting points and event coordinates may be aggregated into statistical machine learning datasets or computational reference tables. Because this data is completely severed from your real-world identity, it is technically impossible to identify, isolate, retrieve, or selectively extract an individual record once merged into trained statistical models.
              </p>
            </div>
          </section>

          {/* Section 5: Recipients & Data Processors */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">05</span>
              {isZh ? "第三方受托处理者与数据共享" : "Third-Party Processors & Data Sharing (GDPR Art. 13(1)(e))"}
            </h2>
            <p className="text-muted-foreground mb-3">
              We do <strong>not</strong> sell, rent, lease, or trade personal data to third-party data brokers, marketers, or data exchanges. We share personal data solely with contractually bound Data Processors:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong className="text-foreground">Stripe (Stripe, Inc. / Stripe Payments Europe / Stripe Payments Singapore):</strong> PCI-DSS Level 1 payment processor handling secure checkout, card authorization, fraud detection, refunds, and billing receipts.
              </li>
              <li>
                <strong className="text-foreground">Brevo (Sendinblue SAS, France):</strong> GDPR-compliant European email marketing and transactional platform handling report delivery emails, waitlist registration queues, and double opt-in confirmations.
              </li>
              <li>
                <strong className="text-foreground">Substack Inc. (USA):</strong> Publication platform facilitating newsletter dispatch for users opting in to editorial essays.
              </li>
              <li>
                <strong className="text-foreground">Cloud Infrastructure &amp; Web Hosting:</strong> Serverless edge hosting, PDF generation pipelines, and Content Delivery Network (CDN) providers with built-in TLS encryption and firewall security.
              </li>
              <li>
                <strong className="text-foreground">Public Authorities &amp; Courts:</strong> Strictly where compelled by valid subpoenas, court orders, tax audits, or statutory obligations.
              </li>
            </ul>
          </section>

          {/* Section 6: International Transfers */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">06</span>
              {isZh ? "跨境数据传输与保护措施" : "International Transfers (GDPR Chapter V, Art. 44–49)"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Scripting Destiny is operated from Singapore, with technical infrastructure and subprocessors (including Stripe, Brevo, and Substack) located in Singapore, the United States, and the European Economic Area (EEA).
              </p>
              <p>
                When transferring personal data originating in the European Economic Area or the UK to jurisdictions outside the EEA:
              </p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>We ensure the transfer relies on <strong>Standard Contractual Clauses (SCCs)</strong> adopted by the European Commission (Art. 46(2)(c) GDPR), equivalent UK International Data Transfer Addendums, or the EU-U.S. Data Privacy Framework (DPF) where certified by our subprocessors.</li>
                <li>We require recipient processors to maintain security safeguards comparable to the GDPR and Singapore PDPA.</li>
                <li>Where applicable, transfers necessary for the performance of a contract or requested report/consultation are conducted pursuant to Article 49(1)(b) GDPR.</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Data Retention */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">07</span>
              {isZh ? "数据留存期限与标准" : "Data Retention Criteria (GDPR Art. 13(2)(a))"}
            </h2>
            <p className="text-muted-foreground mb-3">
              We retain personal data only for as long as necessary to satisfy the operational, contractual, or statutory purposes for which it was obtained:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Transaction, Billing &amp; Tax Records:</strong> Retained for <strong>five (5) to seven (7) years</strong> following the transaction date as required by Singapore IRAS statutory accounting rules, EU VAT regulations, and U.S. tax/audit requirements.</li>
              <li><strong className="text-foreground">Purchased PDF Reports &amp; 1-on-1 Consultation Correspondence:</strong> Retained for the duration needed to deliver your report, honor the 48-hour free typographical correction window, complete your 7-day email dialogue, and provide post-delivery support (typically up to 24 months after completion), or deleted earlier upon a verified erasure request.</li>
              <li><strong className="text-foreground">Waitlist &amp; Subscriber Records:</strong> Retained for the duration of the early access campaign or active newsletter subscription, or until you exercise your right to withdraw consent / unsubscribe.</li>
              <li><strong className="text-foreground">Unsubscribe Suppression Lists:</strong> Retained indefinitely in hashed or minimized form solely to prevent inadvertent re-contacting.</li>
              <li><strong className="text-foreground">Transient Security &amp; Server Logs:</strong> Retained for standard operational cycles (typically 30 to 90 days) before automatic deletion.</li>
            </ul>
          </section>

          {/* Section 8: GDPR Data Subject Rights */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">08</span>
              {isZh ? "欧洲用户专享权利 (GDPR 权利体系)" : "Your Rights Under the GDPR (Articles 15–22)"}
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are located in the European Union or United Kingdom, you possess comprehensive statutory rights:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-muted-foreground">
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Access (Art. 15):</strong>
                Obtain confirmation of whether we process your data and receive a copy of personal information held.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Rectification (Art. 16):</strong>
                Request correction of inaccurate or incomplete personal records.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Erasure (Art. 17):</strong>
                Request deletion of your personal data (“Right to be Forgotten”) where grounds apply (subject to mandatory tax/invoice retention under Art. 17(3)(b)).
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Restriction (Art. 18):</strong>
                Limit processing under circumstances such as disputing accuracy or unlawful processing.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Portability (Art. 20):</strong>
                Receive your personal data in a structured, commonly used, and machine-readable format.
              </div>
              <div className="rounded-lg border border-border/60 bg-card/60 p-3.5">
                <strong className="text-foreground block mb-1">Right to Object (Art. 21):</strong>
                Object at any time to processing based on legitimate interests or direct marketing.
              </div>
            </div>
            <div className="mt-4 space-y-2 text-muted-foreground text-xs sm:text-sm">
              <p>
                <strong className="text-foreground">Automated Decision-Making &amp; Profiling (Art. 22):</strong> Our BaZi calculations generate interpretive archetypes and PDF analyses for personal insight and entertainment. We do <strong>not</strong> subject users to automated decision-making that produces legal effects or similarly significantly affects you.
              </p>
              <p>
                <strong className="text-foreground">Right to Lodge a Complaint (Art. 77):</strong> You have the right to lodge a complaint with your local European Data Protection Authority (DPA) in your EU member state of habitual residence or workplace, or the UK Information Commissioner’s Office (ICO).
              </p>
            </div>
          </section>

          {/* Section 9: Cookies & Tracking */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">09</span>
              {isZh ? "Cookie 与本地存储声明" : "Cookies & Local Storage (ePrivacy Directive)"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Our website does <strong>not</strong> employ invasive third-party cross-site tracking cookies or behavioral advertising pixels.
              </p>
              <p>
                We utilize minimal, strictly functional client-side storage keys (such as <code>sd-lang</code> for language preference and <code>sd-theme</code> for dark/light mode) and strictly necessary session/fraud-prevention cookies deployed by <strong>Stripe</strong> during payment checkout. Under the ePrivacy Directive and GDPR, strictly necessary functional and payment-security mechanisms are exempt from advertising cookie consent mandates.
              </p>
            </div>
          </section>

          {/* Section 10: Children's Privacy */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">10</span>
              {isZh ? "未成年人隐私保护" : "Children’s Privacy (GDPR Art. 8 & COPPA)"}
            </h2>
            <p className="text-muted-foreground">
              Paid Automated Digital Reports and 1-on-1 Private Email Consultations are strictly limited to individuals aged <strong>18 and older</strong>. Free web tools and waitlist features are intended for individuals aged <strong>16 and older</strong> (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect, solicit, or maintain personal information from children under 16 without verified parental authorization. If we become aware that personal data from an underage individual has been submitted, we will promptly delete it.
            </p>
          </section>

          {/* Section 11: Singapore PDPA Specific Notice */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">11</span>
              {isZh ? "新加坡个人数据保护法 (PDPA) 专章" : "Singapore PDPA Statutory Provisions"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                For individuals in Singapore and processing governed by the Singapore <strong>Personal Data Protection Act 2012 (“PDPA”)</strong>:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-foreground">Withdrawal of Consent:</strong> You may withdraw consent at any time. We will process your withdrawal notice within <strong>ten (10) business days</strong> of receipt (noting that withdrawing consent during an active 1-on-1 consultation may prevent us from completing the consultation).
                </li>
                <li>
                  <strong className="text-foreground">Access &amp; Correction Requests:</strong> We respond to formal access or correction requests within <strong>thirty (30) business days</strong>. A reasonable administrative fee may be assessed for complex physical or manual access requests.
                </li>
                <li>
                  <strong className="text-foreground">Transfer Limitation Obligation (PDPA Section 26):</strong> We ensure that overseas recipients of personal data (including Stripe, Brevo, and Substack) provide a standard of protection comparable to the PDPA.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 12: California & US State Privacy Laws */}
          <section className="rounded-xl border border-accent/40 bg-card/75 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">12</span>
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
                      <td className="py-2.5 px-3">Active account/order + 24 mos (or until erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">B. Personal Records (§ 1798.80)</td>
                      <td className="py-2.5 px-3">Name, email, gender, birth date/time, Stripe billing metadata (no full card stored)</td>
                      <td className="py-2.5 px-3">5–7 yrs for tax/billing records; up to 24 mos for reports</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">D. Commercial Information</td>
                      <td className="py-2.5 px-3">Purchased PDF reports &amp; 1-on-1 consultations, order IDs, refund/re-render records</td>
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
                      <td className="py-2.5 pr-3 font-medium text-foreground">G. Geolocation Data</td>
                      <td className="py-2.5 px-3">City/Country of birth (coarse only; no real-time GPS)</td>
                      <td className="py-2.5 px-3">Up to 24 mos for report support (or until erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">K. Inferences</td>
                      <td className="py-2.5 px-3">Calculated Day Master &amp; BaZi profile archetype</td>
                      <td className="py-2.5 px-3">Up to 24 mos for report support (or until erasure)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial Mandatory Affirmation: No Sale / No Sharing / SPI / GPC */}
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-xs sm:text-sm">
                <strong className="text-foreground block mb-1">Mandatory California Disclosures:</strong>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>No Sale or Sharing:</strong> Scripting Destiny has <strong>not sold or shared</strong> (for cross-context behavioral advertising) personal information of consumers in the preceding 12 months, and does not sell or share information of consumers under 16 years of age.</li>
                  <li><strong>Sensitive Personal Information (SPI):</strong> We do not collect or use Sensitive Personal Information (including billing details handled by Stripe or private consultation emails) for purposes other than performing the requested services, preventing fraud, or complying with law (Cal. Civ. Code § 1798.121 &amp; 11 CCR § 7027(m)). We do not use SPI to infer characteristics for marketing.</li>
                  <li><strong>Opt-Out Preference Signals / Global Privacy Control (GPC):</strong> We recognize and honor browser-based Global Privacy Control (GPC) signals in compliance with 11 CCR § 7025; because we do not sell or share personal information for behavioral advertising, all visitors automatically receive opt-out level privacy by default.</li>
                </ul>
              </div>

              {/* California Rights */}
              <div className="space-y-2 text-xs sm:text-sm">
                <strong className="text-foreground block text-sm">Your Rights as a California Consumer:</strong>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Right to Know / Access:</strong> You may request the categories and specific pieces of personal information collected about you in the preceding 12 months, plus the categories of sources and business purposes.</li>
                  <li><strong>Right to Delete:</strong> You may request deletion of personal information we collected from you, subject to statutory exceptions under Cal. Civ. Code § 1798.105(d) (such as completing an active consultation, detecting fraud, or retaining required tax/invoice records).</li>
                  <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information held in our systems.</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will never discriminate against you, deny access, or charge varying prices for exercising any of your statutory rights.</li>
                  <li><strong>Response Timeline &amp; Authorized Agents:</strong> We respond to verifiable consumer requests within <strong>45 calendar days</strong> (extendable by an additional 45 days when reasonably necessary with notice). You may designate an authorized agent to submit requests on your behalf, subject to written proof of authorization and identity verification.</li>
                  <li><strong>California “Shine the Light” (Civil Code § 1798.83):</strong> We do not share personal information with third parties for their own direct marketing purposes.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 13: Mobile App Store Compliance & In-App Account Deletion */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">13</span>
              {isZh ? "移动应用商店合规与账号注销机制" : "Mobile App Store Compliance & Account Deletion (Apple & Google Play)"}
            </h2>
            <div className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
              <p>
                In compliance with <strong>Apple App Store Review Guideline 5.1.1(v)</strong> and the <strong>Google Play Data Safety Policy</strong>, we maintain transparent protocols for our mobile applications:
              </p>
              <ul className="space-y-1.5 list-disc list-inside pl-2">
                <li><strong className="text-foreground">In-App Account Deletion:</strong> If you register an account in our mobile app, you may permanently delete your account and all associated identifiable records directly within the app settings (via “Account → Delete Account”) or by emailing <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>. Deletion takes effect within thirty (30) days (subject to statutory billing/tax record retention).</li>
                <li><strong className="text-foreground">Device Hardware Permissions:</strong> The Scripting Destiny mobile app does not request access to your device microphone, camera, contacts/address book, photo library, or precise real-time GPS location.</li>
                <li><strong className="text-foreground">No Cross-App Tracking (IDFA):</strong> We do not track users across third-party apps or websites for targeted advertising, and we do not request or utilize Apple’s Identifier for Advertisers (IDFA) or Google Advertising ID (GAID) for cross-context behavioral marketing.</li>
              </ul>
            </div>
          </section>

          {/* Section 14: DPO Contact */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">14</span>
              {isZh ? "数据保护官与权利行使途径" : "Data Protection Officer & Privacy Inquiries"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              For order support or 48-hour typographical birth data corrections, please contact <a href="mailto:support@scriptingdestiny.com" className="text-foreground hover:underline font-medium">support@scriptingdestiny.com</a>. To exercise any statutory privacy rights under GDPR, Singapore PDPA, or CCPA/CPRA (such as requests to access, rectify, delete, or withdraw consent), you may contact our designated Data Protection Officer (DPO) representing Scripting Destiny by email at <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a> or by phone / voicemail at <span className="text-foreground font-medium">+1 (628) 238-4763</span>. We verify requestor identities prior to processing disclosures to prevent unauthorized access.
            </p>
          </section>

          {/* Section 15: Amendments & Deemed Acceptance */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">15</span>
              {isZh ? "条款修订与默示同意" : "Amendments to This Notice & Deemed Acceptance"}
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We reserve the right to review, update, or amend this Privacy Policy from time to time to reflect technological enhancements, operational changes, or evolving statutory requirements across our international operating regions.
              </p>
              <p>
                The date of the most recent revision will always be displayed under “Effective & Last Updated” at the top of this document. For routine or non-material updates, changes take effect immediately upon publication. Within reasonable bounds under applicable law, your continued access, use of our Services, or participation in our waitlist following any posted modifications constitutes your acknowledgment, acceptance, and deemed consent to the updated terms.
              </p>
              <p>
                Where any revision involves a materially significant change to how your personal data is collected, disclosed, or processed in a way not reasonably contemplated at the time of initial collection, we will provide appropriate advance notice (such as an email notification to registered addresses or an announcement banner on the platform) prior to the effective date of such changes.
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
