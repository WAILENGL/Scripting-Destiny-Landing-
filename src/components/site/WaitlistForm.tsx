import { useState, useRef, type FormEvent } from "react";
import { ArrowRight, Check, MailCheck, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { BREVO_CONFIG } from "@/config/newsletter";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [substackOptin, setSubstackOptin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
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
        formData.append("locale", "en");
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
        console.info(
          `[WaitlistForm] Submitted: ${email}, Substack opt-in: ${substackOptin}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      setDone(true);
    } catch {
      setError("Unable to join waitlist. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-5 text-primary-foreground animate-in fade-in duration-300">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-accent/20 p-2 text-accent shrink-0 mt-0.5">
            <MailCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-medium leading-snug">
              Check your inbox to confirm
            </h4>
            <p className="mt-1 text-xs sm:text-sm opacity-80 leading-relaxed">
              We just sent a confirmation link to{" "}
              <strong className="font-semibold underline decoration-accent/60 underline-offset-2">
                {email}
              </strong>
              . Click the button inside to lock in your spot.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2.5 py-0.5 font-medium opacity-90">
                <Check className="h-3 w-3 text-wood" /> Waitlist Early Access
              </span>
              {substackOptin && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2.5 py-0.5 font-medium opacity-90">
                  <Check className="h-3 w-3 text-wood" /> Substack Articles
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
            placeholder="you@email.com"
            aria-label="Email address"
            required
            disabled={isSubmitting}
            className="h-11 min-w-0 shrink-0 rounded-full sm:flex-1 border border-input bg-card px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Reserving...
              </>
            ) : (
              <>
                Join the waitlist <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Hidden inputs expected by Brevo */}
        <input type="hidden" name="email_address_check" value="" />
        <input type="hidden" name="locale" value="en" />
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
            id="substack-optin"
            checked={substackOptin}
            onCheckedChange={(checked) => setSubstackOptin(checked === true)}
            className="mt-0.5 border-primary-foreground/40 bg-transparent data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-foreground shadow-none"
          />
          <label
            htmlFor="substack-optin"
            className="text-xs sm:text-sm text-primary-foreground/85 leading-normal cursor-pointer select-none"
          >
            Also send me occasional articles on timing & life cycles{" "}
            <span className="opacity-60">(Substack)</span>
          </label>
        </div>

        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </form>
    </div>
  );
}
