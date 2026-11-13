import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Scale, ShieldAlert, Sparkles, BookOpen, Smartphone, ShieldCheck, Mail, Phone, Globe, FileText, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.png";
import astrolabe from "@/assets/bazi-astrolabe.jpg";
import { InkStroke } from "@/components/site/Ink";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const TITLE = "Terms of Service & End User Agreement — Scripting Destiny";
const DESC =
  "Official Terms of Service, End User License Agreement (EULA), and Data Use Terms for Scripting Destiny across web and mobile platforms.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
            <Scale className="h-3.5 w-3.5 text-wood" />
            <span>{isZh ? "服务条款" : "Terms of Service"}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground leading-tight">
            {isZh ? "服务条款与用户协议" : "Terms of Service & End User Agreement"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isZh
              ? "适用于 Scripting Destiny 网站、四柱八字测算引擎、早期候补名单及数字化服务。"
              : "Governing access to the Scripting Destiny website, BaZi computational engine, waitlist services, and related digital products."}
          </p>
        </div>

        {/* Metadata Card */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-card/60 p-4 sm:p-5 backdrop-blur-sm grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "生效与更新日期" : "Effective & Last Updated"}
            </span>
            <span className="font-medium text-foreground">November 13, 2026</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-semibold">
              {isZh ? "服务提供方" : "Service Provider / Entity"}
            </span>
            <span className="font-medium text-foreground">Scripting Destiny</span>
          </div>
        </div>

        {/* Terms Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-foreground/90">

          {/* Section 1: Agreement to Terms */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">01</span>
              {isZh ? "条款效力与服务范围" : "Agreement to Terms & Overview"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                These Terms of Service (“Terms”, or “Agreement”) constitute a legally binding agreement made between you (“User”, “you”, or “your”) and <strong>Scripting Destiny</strong> (“we”, “us”, or “our”). These Terms govern your access to and use of <a href="https://scriptingdestiny.com" className="text-wood hover:underline">scriptingdestiny.com</a>, our mobile applications made available through third-party distribution channels (including the Apple App Store and Google Play Store), our email newsletters, our waitlist, and any associated interactive tools (collectively, the “Services”).
              </p>
              <p>
                BY ACCESSING OUR WEBSITE, REGISTERING FOR OUR WAITLIST, DOWNLOADING OUR MOBILE APPLICATION, OR GENERATING A BAZI CHART, YOU EXPRESSLY ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY ALL OF THESE TERMS. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST DISCONTINUE USE IMMEDIATELY.
              </p>
            </div>
          </section>

          {/* Section 2: Eligibility */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">02</span>
              {isZh ? "使用资格与年龄要求" : "Eligibility & User Representations"}
            </h2>
            <p className="text-muted-foreground mb-3">
              By accessing or using our Services, you represent and warrant that:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>You are at least 16 years of age (or the legal age of digital majority in your jurisdiction, such as 18 where required to enter binding contracts).</li>
              <li>You have the legal capacity to enter into these binding Terms under the laws of your place of residence.</li>
              <li>You are not located in a country that is subject to a U.S. or international government embargo, or designated as a terrorist-supporting country, and you are not listed on any prohibited or restricted party lists.</li>
              <li>All information voluntarily submitted by you (including birth data and contact details) is truthful, accurate, and voluntarily provided.</li>
            </ul>
          </section>

          {/* Section 3: Metaphysical & Entertainment Disclaimer (Critical) */}
          <section className="rounded-xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-5 w-5 text-wood shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg mr-2">03</span>
                {isZh ? "命理玄学、咨询与娱乐免责声明 (重要)" : "Metaphysical, Educational & Entertainment Disclaimer (Important)"}
              </h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p className="font-medium text-foreground">
                PLEASE READ THIS SECTION CAREFULLY. IT GOVERNS THE NATURE AND SCOPE OF ALL BAZI READINGS AND TIMING GUIDANCE.
              </p>
              <p>
                <strong>1. Nature of the Service:</strong> Scripting Destiny offers interpretive profiles based on classical Chinese Four Pillars of Destiny (BaZi), astronomical alignments, five-element archetypes, and temporal cycle analysis. All charts, archetype designations, cycle descriptions, and compatibility metrics generated by our software are provided solely for <strong>educational, introspection, personal reflection, and entertainment purposes</strong>.
              </p>
              <p>
                <strong>2. Not Professional Advice:</strong> OUR SERVICES DO NOT CONSTITUTE, AND MUST NEVER BE TREATED AS, PROFESSIONAL MEDICAL, PSYCHIATRIC, PSYCHOLOGICAL, LEGAL, FINANCIAL, TAX, OR INVESTMENT ADVICE. Scripting Destiny is not a licensed medical provider, psychiatric clinic, legal counsel, or registered financial investment advisor.
              </p>
              <p>
                <strong>3. Assumption of Decision-Making Responsibility:</strong> You expressly acknowledge that any life, career, personal, or financial choices you make following your consultation of our charts or reports are undertaken entirely at your own independent discretion, volition, and risk. You agree that Scripting Destiny shall bear zero liability for any real-world decisions, actions, or outcomes undertaken by you or any third party.
              </p>
            </div>
          </section>

          {/* Section 4: Data Collection & Future Data Uses (Crucial User Requirement) */}
          <section className="rounded-xl border border-accent/30 bg-card/60 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">04</span>
              {isZh ? "数据收集、科研授权与模型训练许可" : "Data Collection, Anonymized Research & Model Training License"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                To provide chart calculations, our tools process information submitted by you, including your birth coordinates (date, time, location of birth, and gender) as well as significant past life events voluntarily shared for chart calibration and accuracy validation.
              </p>
              <p>
                <strong className="text-foreground">License Grant for De-Identified Research & Algorithmic Training:</strong> By submitting birth coordinates or milestone event data to Scripting Destiny, you hereby grant Scripting Destiny a <strong>perpetual, irrevocable, worldwide, fully paid-up, royalty-free, transferable, and sublicensable license</strong> to strip all direct and indirect personally identifiable markers (PII) from such data and to compile, aggregate, analyze, and incorporate such de-identified data into:
              </p>
              <ul className="space-y-1.5 list-disc list-inside pl-2">
                <li>Statistical calibration models and computational BaZi pattern-recognition systems.</li>
                <li>Algorithmic training datasets and machine learning models developed by Scripting Destiny.</li>
                <li>Academic, statistical, and educational reference archives.</li>
              </ul>
              <p>
                <strong className="text-foreground">Irreversibility Acknowledgment:</strong> You acknowledge that once your submitted birth data and milestone events have been processed through our de-identification pipeline and integrated into aggregated machine learning weights, statistical tables, or trained algorithmic systems, such data is completely decoupled from your identity and ceases to constitute personal data under GDPR Recital 26 and the Singapore PDPA. Consequently, it is technically impossible to isolate, retrieve, or selectively excise individual historical records once trained into aggregated computational models.
              </p>
              <p>
                <strong className="text-foreground">Privacy Commitment:</strong> We reaffirm that identifiable personal data (such as your email address and name) will <strong>never</strong> be sold, rented, or traded to third-party data brokers or marketing exchanges. All processing of personal data is governed strictly by our <Link to="/privacy" className="text-wood hover:underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">05</span>
              {isZh ? "知识产权与使用许可" : "Intellectual Property Rights & Limited License"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Unless otherwise indicated, the Services—including all source code, software, algorithms, mathematical models, databases, interface designs, audio, video, text, artwork, and trademarks (the “Content”)—are the exclusive property of Scripting Destiny and are protected by copyright, trademark, and other intellectual property laws in Singapore, the United States, and internationally.
              </p>
              <p>
                Subject to your ongoing compliance with these Terms, Scripting Destiny grants you a limited, non-exclusive, non-transferable, revocable license to access the Services and download or print a single copy of any generated personal report solely for your personal, non-commercial use.
              </p>
            </div>
          </section>

          {/* Section 6: Mobile App Store Provisions & Apple EULA Rider */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-5 w-5 text-wood shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                <span className="text-accent font-sans font-semibold text-base sm:text-lg mr-2">06</span>
                {isZh ? "移动应用商店附加条款与 Apple EULA 附录" : "Mobile Application Terms & Apple App Store EULA Rider"}
              </h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                If you access or download our mobile application through the Apple App Store or Google Play Store, you acknowledge and agree that these Terms incorporate the following mandatory platform provisions:
              </p>
              <div className="space-y-2 text-xs sm:text-sm pl-2 border-l-2 border-accent/40 my-3">
                <p>
                  <strong>a. Acknowledgment:</strong> This Agreement is concluded between you and Scripting Destiny only, and not with Apple Inc. (“Apple”) or Google LLC (“Google”). Scripting Destiny, not Apple or Google, is solely responsible for the mobile application and its content.
                </p>
                <p>
                  <strong>b. Scope of License:</strong> The license granted to you for the application is limited to a non-transferable license to use the app on any Apple-branded or Android-compatible device that you own or control, as permitted by the Usage Rules set forth in the applicable App Store Terms of Service.
                </p>
                <p>
                  <strong>c. Maintenance and Support:</strong> Scripting Destiny is solely responsible for providing any maintenance and support services with respect to the app. You acknowledge that neither Apple nor Google has any obligation whatsoever to furnish any maintenance or support services.
                </p>
                <p>
                  <strong>d. Warranty:</strong> Scripting Destiny is solely responsible for any product warranties, whether express or implied by law. In the event of any failure of the mobile app to conform to any applicable warranty, you may notify Apple, and Apple may refund the purchase price paid (if any); to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever.
                </p>
                <p>
                  <strong>e. Product Claims:</strong> Scripting Destiny, not Apple, is responsible for addressing any claims by you or any third party relating to the mobile app, including product liability claims, consumer protection claims, and regulatory compliance.
                </p>
                <p>
                  <strong>f. Intellectual Property Rights:</strong> In the event of any third-party claim that the app or your possession and use of the app infringes a third party’s intellectual property rights, Scripting Destiny, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such claim.
                </p>
                <p>
                  <strong>g. Third-Party Beneficiary:</strong> You acknowledge and agree that Apple and Apple’s subsidiaries, as well as Google, are third-party beneficiaries of these Terms, and that upon your acceptance, Apple and Google will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: In-App Purchases, Billing & EU Cancellation */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">07</span>
              {isZh ? "应用内购买、付费报告与欧盟消费者撤回权" : "Digital Purchases, Billing & EU Consumer Withdrawal Rights"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong>1. Digital Goods & Subscriptions:</strong> Certain premium features, personalized 10-year cycle reports, and deep-dive readings may be offered as paid digital deliverables or recurring subscriptions. If purchased through the Apple App Store or Google Play Store, billing is managed directly by the platform according to its terms.
              </p>
              <p>
                <strong>2. EU / UK Consumer Right of Withdrawal:</strong> Under Directive 2011/83/EU on Consumer Rights, consumers in the EU/UK ordinarily possess a 14-day statutory right to withdraw from distance contracts. However, for digital content delivered immediately online:
              </p>
              <p className="bg-card/70 border border-border p-3.5 rounded-lg text-xs sm:text-sm">
                <em>“BY PURCHASING AND REQUESTING IMMEDIATE GENERATION OF A DIGITAL BAZI REPORT OR DIGITALLY DELIVERED CONTENT, YOU EXPRESSLY CONSENT TO THE IMMEDIATE COMMENCEMENT OF PERFORMANCE AND EXPRESSLY ACKNOWLEDGE THAT YOU THEREBY LOSE YOUR STATUTORY 14-DAY RIGHT OF WITHDRAWAL ONCE DIGITAL TRANSMISSION HAS BEGUN.”</em>
              </p>
            </div>
          </section>

          {/* Section 8: Prohibited Conduct */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">08</span>
              {isZh ? "禁止行为与合规守则" : "Prohibited Conduct & Acceptable Use"}
            </h2>
            <p className="text-muted-foreground mb-3">You agree not to:</p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Systematically scrape, crawl, data-mine, harvest, or extract algorithmic calculations or text from our platform using automated bots or headless browsers.</li>
              <li>Decompile, reverse-engineer, disassemble, or derive the mathematical source algorithms underlying our BaZi calculations.</li>
              <li>Submit fraudulent, automated, or malicious spam inputs through our forms or waitlist endpoints.</li>
              <li>Circumvent, disable, or interfere with security-related features, rate-limiters, or web application firewalls.</li>
              <li>Resell, commercialize, or re-license generated reports to third parties without prior written consent from Scripting Destiny.</li>
            </ul>
          </section>

          {/* Section 9: Disclaimer of Warranties */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">09</span>
              {isZh ? "保证免责声明 (AS IS)" : "Disclaimer of Warranties (AS-IS)"}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, THE SERVICES AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. SCRIPTING DESTINY EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE CALCULATIONS WILL BE ERROR-FREE, CONTINUOUS, UNINTERRUPTED, OR WILL MEET YOUR SUBJECTIVE EXPECTATIONS.
            </p>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">10</span>
              {isZh ? "责任限制与法定权利保留" : "Limitation of Liability & Statutory Protections"}
            </h2>
            <div className="space-y-3 text-muted-foreground text-xs sm:text-sm leading-relaxed">
              <p>
                IN NO EVENT SHALL SCRIPTING DESTINY, ITS FOUNDERS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFIT, LOSS OF REVENUE, LOSS OF DATA, OR EMOTIONAL DISTRESS) ARISING FROM YOUR USE OF THE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER SHALL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID BY YOU TO SCRIPTING DESTINY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR SGD $100 (ONE HUNDRED SINGAPORE DOLLARS), WHICHEVER IS LESS.
              </p>
              <p>
                <strong className="text-foreground">Statutory Consumer Carve-Outs:</strong> Nothing in these Terms shall exclude or limit liability that cannot be excluded or limited under applicable law, including liability under the Singapore Unfair Contract Terms Act (UCTA) for death or personal injury resulting from negligence, or non-waivable statutory consumer guarantees under European Union law.
              </p>
              <p>
                <strong className="text-foreground">California Civil Code § 1542 Waiver:</strong> If you are a California resident, you waive California Civil Code § 1542, which says: <em>“A general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.”</em>
              </p>
            </div>
          </section>

          {/* Section 11: Dispute Resolution & Governing Law */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">11</span>
              {isZh ? "争议解决、管辖法律与集体诉讼放弃" : "Governing Law, Dispute Resolution & Class Action Waiver"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong>1. Governing Law:</strong> These Terms and your use of the Services shall be governed by and construed in accordance with the <strong>laws of the Republic of Singapore</strong>, without regard to conflict of law principles.
              </p>
              <p>
                <strong>2. Informal Resolution:</strong> Before initiating formal legal proceedings, you and Scripting Destiny agree to attempt to resolve any dispute, claim, or controversy informally for at least thirty (30) days by contacting our support desk.
              </p>
              <p>
                <strong>3. Jurisdiction (Singapore):</strong> If informal resolution is unsuccessful, any dispute shall be submitted to the exclusive jurisdiction of the state and high courts of Singapore, unless international consumer law mandates home-jurisdiction filing.
              </p>
              <p>
                <strong>4. U.S. Arbitration & Class Action Waiver:</strong> FOR RESIDENTS OF THE UNITED STATES, ANY DISPUTE ARISING FROM THESE TERMS SHALL BE RESOLVED THROUGH BINDING INDIVIDUAL ARBITRATION RATHER THAN IN COURT. YOU AND SCRIPTING DESTINY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </p>
              <p>
                <strong>5. European Consumer Platform:</strong> Consumers resident in the European Union may access the European Commission’s Online Dispute Resolution (ODR) platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-wood hover:underline">ec.europa.eu/consumers/odr</a>.
              </p>
            </div>
          </section>

          {/* Section 12: Account Termination & Deletion */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">12</span>
              {isZh ? "账号注销、终止与数据删除" : "Account Termination & In-App Deletion"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                In compliance with <strong>Apple App Store Review Guideline 5.1.1(v)</strong> and the <strong>Google Play Data Safety Policy</strong>, users who register for accounts or waitlist access may request account closure and personal data deletion at any time:
              </p>
              <ul className="space-y-1.5 list-disc list-inside pl-2">
                <li>Via any in-app “Delete My Account” interface in our mobile applications.</li>
                <li>By submitting a written erasure request to <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a>.</li>
              </ul>
              <p>
                Upon receipt of a verified deletion request, all identifiable user data, authentication credentials, and email records will be permanently purged within thirty (30) days, subject to Section 4 regarding irreversible de-identified computational models.
              </p>
            </div>
          </section>

          {/* Section 13: Amendments to Terms */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">13</span>
              {isZh ? "条款修改与未来更新" : "Modifications to Terms & Future Updates"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Non-material changes become effective immediately upon posting to this URL. For material modifications that substantially alter user rights or obligations, we will provide reasonable advance notice (e.g., via email or an in-app prompt). Your continued use of the Services following posted amendments represents your acknowledgment, acceptance, and deemed agreement to the revised Terms.
            </p>
          </section>

          {/* Section 14: Contact Information */}
          <section className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-3 flex items-center gap-2">
              <span className="text-accent font-sans font-semibold text-base sm:text-lg">14</span>
              {isZh ? "联系方式与法律问询" : "Contact Information & Inquiries"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions or concerns regarding these Terms of Service or our End User License Agreement, please reach out to our team at <a href="mailto:admin@scriptingdestiny.com" className="text-foreground hover:underline font-medium">admin@scriptingdestiny.com</a> or via phone / voicemail at <span className="text-foreground font-medium">+1 (628) 238-4763</span>.
            </p>
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
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {isZh ? "隐私政策" : "Privacy Policy"}
            </Link>
            <Link to="/terms" className="text-foreground font-medium underline underline-offset-4">
              {isZh ? "服务条款" : "Terms of Service"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
