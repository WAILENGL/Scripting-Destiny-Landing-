import { useState, useRef, type FormEvent } from "react";
import { ArrowRight, Check, MailCheck, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { BREVO_CONFIG } from "@/config/newsletter";
import { useLanguage } from "@/hooks/useLanguage";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [substackOptin, setSubstackOptin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { t, lang } = useLanguage();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(t.waitlist.errorEmail);
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const endpoint = BREVO_CONFIG.formActionUrl;

      if (endpoint) {
        const formData = new FormData();
        formData.append("EMAIL", email.trim());
        formData.append("email_address_check", "");
        formData.append("locale", lang === "zh" ? "zh" : "en");
        if (substackOptin) {
          formData.append("SUBSTACK_OPTIN", "1");
        }

        try {
          // Attempt direct fetch first (no-cors ensures request fires without CORS errors)
          await fetch(endpoint, {
            method: "POST",
            body: formData,
            mode: "no-cors",
          });
        } catch {
          // Fallback to submitting via hidden iframe if fetch is blocked
          if (formRef.current) {
            formRef.current.submit();
          }
        }
      } else {
        console.info(`[WaitlistForm] Submitted: ${email}, Substack opt-in: ${substackOptin}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setDone(true);
    } catch {
      setError(t.waitlist.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (done) {
    if (compact) {
      return (
        <div className="rounded-xl border border-border/80 bg-card/60 p-5 text-foreground animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-accent/20 p-2 text-accent shrink-0 mt-0.5">
              <MailCheck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium leading-snug text-foreground">
                {t.waitlist.inboxConfirmTitle}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {t.waitlist.inboxConfirmDescPre}{" "}
                <strong className="font-semibold text-foreground underline decoration-accent/60 underline-offset-2">
                  {email}
                </strong>
                . {t.waitlist.inboxConfirmDescPost}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-0.5 font-medium text-foreground border border-border/50">
                  <Check className="h-3 w-3 text-wood" /> {t.waitlist.badgeEarlyAccess}
                </span>
                {substackOptin && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-0.5 font-medium text-foreground border border-border/50">
                    <Check className="h-3 w-3 text-wood" /> {t.waitlist.badgeSubstack}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-accent/30 bg-card/90 p-5 text-foreground shadow-sm animate-in fade-in duration-300">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-accent/20 p-2 text-accent shrink-0 mt-0.5">
            <MailCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium leading-snug text-foreground">
              {t.waitlist.inboxConfirmTitle}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t.waitlist.inboxConfirmDescPre}{" "}
              <strong className="font-semibold text-foreground underline decoration-accent/60 underline-offset-2">
                {email}
              </strong>
              . {t.waitlist.inboxConfirmDescPost}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 font-medium text-foreground border border-border/50">
                <Check className="h-3 w-3 text-wood" /> {t.waitlist.badgeEarlyAccess}
              </span>
              {substackOptin && (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 font-medium text-foreground border border-border/50">
                  <Check className="h-3 w-3 text-wood" /> {t.waitlist.badgeSubstack}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hidden iframe fallback for zero-reload background POST */}
      <iframe
        name="brevo-hidden-frame"
        id="brevo-hidden-frame"
        style={{ display: "none" }}
        title="Brevo Submission Target"
      />

      <form
        ref={formRef}
        onSubmit={submit}
        action={BREVO_CONFIG.formActionUrl || undefined}
        method={BREVO_CONFIG.formActionUrl ? "POST" : undefined}
        target={BREVO_CONFIG.formActionUrl ? "brevo-hidden-frame" : undefined}
        className="w-full"
      >
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="email"
            name="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.waitlist.inputPlaceholder}
            aria-label="Email address"
            required
            disabled={isSubmitting}
            className="h-11 min-w-0 shrink-0 rounded-full sm:flex-1 border border-input bg-card px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {t.waitlist.submittingBtn}
              </>
            ) : (
              <>
                {t.waitlist.submitBtn} <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Hidden inputs expected by Brevo */}
        <input type="hidden" name="email_address_check" value="" />
        <input type="hidden" name="locale" value={lang === "zh" ? "zh" : "en"} />
        <input
          type="checkbox"
          name="SUBSTACK_OPTIN"
          value="1"
          checked={substackOptin}
          readOnly
          className="sr-only"
          tabIndex={-1}
        />

        {/* Dual opt-in Substack checkbox */}
        <div className="mt-3.5 flex items-start gap-2.5">
          <Checkbox
            id={compact ? "substack-optin-compact" : "substack-optin"}
            checked={substackOptin}
            onCheckedChange={(checked) => setSubstackOptin(checked === true)}
            className="mt-0.5 border-input data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-foreground shadow-none"
          />
          <label
            htmlFor={compact ? "substack-optin-compact" : "substack-optin"}
            className="text-xs sm:text-sm text-foreground/90 leading-normal cursor-pointer select-none"
          >
            {t.waitlist.substackOptin}{" "}
            <span className="text-muted-foreground">{t.waitlist.substackTag}</span>
          </label>
        </div>

        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </form>
    </div>
  );
}
