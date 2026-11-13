import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Mail, Phone, Globe, Lock, Database, UserCheck, FileText, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";
import astrolabe from "@/assets/bazi-astrolabe.jpg";
import { InkStroke } from "@/components/site/Ink";
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
              ? "适用于 Scripting Destiny 网站、四柱八字排盘工具、订阅候补通道及相关数字化服务。"
              : "Governing the Scripting Destiny platform, BaZi charting tools, waitlist registrations, and related digital services."}
          </p>
        </div>

        {/* Metadata Card (Clean & Discrete) */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-card/60 p-4 sm:p-5 backdrop-blur-sm grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "生效与更新日期" : "Effective & Last Updated"}
            </span>
            <span className="font-medium text-foreground">November 13, 2026</span>
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
                This Privacy Policy and Data Protection Notice (“Notice”) is issued by <strong>Scripting Destiny</strong> (“we”, “us”, or “our”), acting as the <strong>Data Controller</strong> under Regulation (EU) 2016/679 (the General Data Protection Regulation, or “GDPR”) and the UK Data Protection Act 2018. It governs personal data processed through our website (<a href="https://scriptingdestiny.com" className="text-wood hover:underline">scriptingdestiny.com</a>), our Substack publication, our waitlist forms, our BaZi calculation engine, and associated digital products (collectively, the “Services”).
              </p>
              <p>
                We are committed to operating in full compliance with global privacy frameworks, notably the <strong>EU & UK GDPR</strong>, the <strong>Personal Data Protection Act 2012 of Singapore (“PDPA”)</strong>, and United States federal and state privacy statutes, with special regard to the <strong>California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”)</strong>.
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
                  <strong className="text-foreground">Subscriber & Waitlist Identifiers:</strong> Your email address, subscription preferences, locale selection (English or Chinese), and records of communication when contacting our support or joining our waitlist.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">BaZi Astrological Coordinates:</strong> Numerical coordinates required to calculate metaphysical Four Pillars charts and Day Master archetypes: exact date of birth, time of birth, gender, and country/city of birth. You may also voluntarily submit significant life event milestone years to calibrate and validate calculation precision.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Technical & Network Metadata:</strong> Internet Protocol (IP) addresses, browser type, device specifications, operating system, and HTTP request headers transmitted automatically to maintain platform uptime, prevent brute-force attacks, and detect spam bots.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="text-foreground">Note on Special Category Data (GDPR Article 9):</strong> While birth details are astronomical coordinates, interpretations in traditional metaphysics may touch on philosophical self-reflection. We do not solicit health, racial, political, or religious data. To the extent any input is construed under local law as relating to personal beliefs, we process such data exclusively based on your <strong>explicit request and affirmative consent</strong> (Art. 9(2)(a) GDPR) to receive chart readings.
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
                    <td className="py-3 pr-4 font-medium text-foreground">Service Delivery: Calculating Day Master archetypes, 5-element balances, and rendering requested charts</td>
                    <td className="py-3 px-4">
                      <strong>Performance of a Contract</strong> (Art. 6(1)(b)) & <strong>Explicit Consent</strong> (Art. 9(2)(a))
                    </td>
                    <td className="py-3 pl-4">Provision of requested service / Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Waitlist Notifications & Editorial Subscriptions (Substack / Brevo)</td>
                    <td className="py-3 px-4">
                      <strong>Freely Given Consent</strong> (Art. 6(1)(a))
                    </td>
                    <td className="py-3 pl-4">Opt-in Consent</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Customer Service & Helpdesk Correspondence</td>
                    <td className="py-3 px-4">
                      <strong>Legitimate Interests</strong> (Art. 6(1)(f)) — managing user communications
                    </td>
                    <td className="py-3 pl-4">Customer relationship & query handling</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Cybersecurity, Bot Defense, & Rate Limiting</td>
                    <td className="py-3 px-4">
                      <strong>Legitimate Interests</strong> (Art. 6(1)(f)) — safeguarding infrastructure against attacks
                    </td>
                    <td className="py-3 pl-4">Compliance with law & security operations</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Statutory Compliance & Legal Obligations</td>
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
                <strong className="text-foreground">De-Identification Standard:</strong> All personally identifiable information (including name, email address, IP address, and unique user identifiers) is irreversibly detached and deleted prior to any research analysis.
              </p>
              <p>
                <strong className="text-foreground">Exemption under GDPR Recital 26 & Singapore PDPA:</strong> Under Recital 26 of the GDPR and Singapore PDPC Advisory Guidelines, the principles of data protection do not apply to anonymous information, namely information that does not relate to an identified or identifiable natural person. Once data is rendered irreversibly anonymous, it is no longer personal data.
              </p>
              <p>
                <strong className="text-foreground">Algorithmic Integration & Technical Notice:</strong> Fully anonymized charting points and event coordinates may be aggregated into statistical machine learning datasets or computational reference tables. Because this data is completely severed from your real-world identity, it is technically impossible to identify, isolate, retrieve, or selectively extract an individual record once merged into trained statistical models.
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
                <strong className="text-foreground">Brevo (Sendinblue SAS, France):</strong> GDPR-compliant European email marketing and transactional platform handling waitlist registration queues and double opt-in confirmations.
              </li>
              <li>
                <strong className="text-foreground">Substack Inc. (USA):</strong> Publication platform facilitating newsletter dispatch for users opting in to editorial essays.
              </li>
              <li>
                <strong className="text-foreground">Cloud Infrastructure & Web Hosting:</strong> Serverless edge hosting and Content Delivery Network (CDN) providers with built-in TLS encryption and firewall security.
              </li>
              <li>
                <strong className="text-foreground">Public Authorities & Courts:</strong> Strictly where compelled by valid subpoenas, court orders, or statutory obligations.
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
                Scripting Destiny is operated from Singapore, with technical infrastructure and subprocessors located in the United States and the European Economic Area (EEA).
              </p>
              <p>
                When transferring personal data originating in the European Economic Area or the UK to jurisdictions outside the EEA:
              </p>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>We ensure the transfer relies on <strong>Standard Contractual Clauses (SCCs)</strong> adopted by the European Commission (Art. 46(2)(c) GDPR) or equivalent UK Addendums.</li>
                <li>We require recipient processors to maintain security safeguards comparable to the GDPR.</li>
                <li>Where applicable, transfers necessary for the performance of a contract or requested service are conducted pursuant to Article 49(1)(b) GDPR.</li>
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
              We retain personal data only for as long as necessary to satisfy the purposes for which it was obtained:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong className="text-foreground">Waitlist & Subscriber Records:</strong> Retained for the duration of the early access campaign until service rollout, or until you exercise your right to withdraw consent / unsubscribe.</li>
              <li><strong className="text-foreground">Unsubscribe Suppression Lists:</strong> Retained indefinitely in hashed or minimized form solely to prevent inadvertent re-contacting.</li>
              <li><strong className="text-foreground">Transient Security & Server Logs:</strong> Retained for standard operational cycles (typically 30 to 90 days) before automatic deletion.</li>
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
                Request deletion of your personal data (“Right to be Forgotten”) where grounds apply.
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
                <strong className="text-foreground">Automated Decision-Making & Profiling (Art. 22):</strong> Our BaZi calculations generate interpretive archetypes for self-reflection and entertainment. We do <strong>not</strong> subject users to automated decision-making that produces legal effects or similarly significantly affects you.
              </p>
              <p>
                <strong className="text-foreground">Right to Lodge a Complaint (Art. 77):</strong> You have the right to lodge a complaint with your local European Data Protection Authority (DPA) in your EU member state of habitual residence or workplace.
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
                Our landing page does <strong>not</strong> employ invasive third-party cross-site tracking cookies or marketing pixels.
              </p>
              <p>
                We utilize minimal, strictly functional client-side storage keys (such as <code>sd-lang</code> to remember your language preference and <code>sd-theme</code> for dark/light mode preference). Under the ePrivacy Directive and GDPR, strictly necessary functional preferences that do not track users across domains are exempt from cookie banner mandates.
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
              Our Services are designed for individuals aged 16 and older (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect, solicit, or maintain personal information from children under 16 without parental authorization. If we become aware that personal data from a child has been submitted, we will promptly delete it.
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
                  <strong className="text-foreground">Withdrawal of Consent:</strong> You may withdraw consent at any time. We will process your withdrawal notice within <strong>ten (10) business days</strong> of receipt.
                </li>
                <li>
                  <strong className="text-foreground">Access & Correction Requests:</strong> We respond to formal access or correction requests within <strong>thirty (30) business days</strong>. A reasonable administrative fee may be assessed for complex physical or manual access requests.
                </li>
                <li>
                  <strong className="text-foreground">Transfer Limitation Obligation:</strong> We ensure that overseas recipients of personal data provide a standard of protection comparable to the PDPA.
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
                This Section applies solely to California residents under the <strong>California Consumer Privacy Act of 2018 as amended by the California Privacy Rights Act of 2020 (“CCPA/CPRA”)</strong>, and serves as our <strong>Notice at Collection</strong>.
              </p>

              {/* CCPA Categories Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 text-foreground font-semibold">
                      <th className="py-2 pr-3">CCPA Category (§ 1798.140)</th>
                      <th className="py-2 px-3">Examples Collected</th>
                      <th className="py-2 pl-3">Sold or Shared?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">A. Identifiers</td>
                      <td className="py-2.5 px-3">Email address, IP address</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">B. Personal Records (Cal. Civ. Code § 1798.80)</td>
                      <td className="py-2.5 px-3">Email, gender, birth date/time</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">F. Internet / Electronic Activity</td>
                      <td className="py-2.5 px-3">Browser type, page interactions</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">G. Geolocation Data</td>
                      <td className="py-2.5 px-3">City/Country of birth (coarse only)</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-3 font-medium text-foreground">K. Inferences</td>
                      <td className="py-2.5 px-3">Calculated Day Master profile archetype</td>
                      <td className="py-2.5 pl-3 text-wood font-semibold">NO</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Crucial Mandatory Affirmation: No Sale / No Sharing */}
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-xs sm:text-sm">
                <strong className="text-foreground block mb-1">Mandatory California Disclosures:</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>No Sale or Sharing:</strong> Scripting Destiny has <strong>not sold or shared</strong> (for cross-context behavioral advertising) personal information of consumers in the preceding 12 months, and does not sell or share information of consumers under 16 years of age.</li>
                  <li><strong>Sensitive Personal Information (SPI):</strong> We do not collect or process Sensitive Personal Information for purposes other than performing requested services (Cal. Civ. Code § 1798.121). Therefore, no “Limit the Use of My Sensitive Personal Information” link is required.</li>
                </ul>
              </div>

              {/* California Rights */}
              <div className="space-y-2 text-xs sm:text-sm">
                <strong className="text-foreground block text-sm">Your Rights as a California Consumer:</strong>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Right to Know / Access:</strong> You may request the categories and specific pieces of personal information collected about you in the preceding 12 months.</li>
                  <li><strong>Right to Delete:</strong> You may request the deletion of personal information we have collected from you, subject to statutory exceptions.</li>
                  <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will never discriminate against you, deny access, or charge varying prices for exercising any of your statutory rights.</li>
                  <li><strong>Authorized Agents:</strong> You may designate an authorized agent to submit requests on your behalf, subject to written proof of authorization and identity verification.</li>
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
                <li><strong className="text-foreground">In-App Account Deletion:</strong> If you register an account in our mobile app, you may permanently delete your account and all associated identifiable records directly within the app settings (via “Account → Delete Account”) or by emailing <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>. Deletion takes effect within thirty (30) days.</li>
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
              To exercise any statutory privacy rights under GDPR, Singapore PDPA, or CCPA/CPRA (such as requests to access, rectify, delete, or withdraw consent), you may contact our designated Data Protection Officer (DPO) representing Scripting Destiny. Inquiries may be directed by email to <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a> or by phone / voicemail at <span className="text-foreground font-medium">+1 (628) 238-4763</span>. We verify requestor identities prior to processing disclosures to prevent unauthorized access.
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
