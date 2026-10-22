import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const BREVO_ENDPOINT =
  "https://29f00198.sibforms.com/serve/MUIFAEi1N_8Of1975CSJl4xxtXo0w2P6785AstYTZLw0DmAalx7-3OzLj6KfFuTvXjTJHw1o2y9BK1LqyXQ3j5w9YuGbMZTr206ccmcgHQz6IHlw0vShChDG5M4BO3P2fHdapRlLdh6XS_W-XmGsclFE-5yF7TsBlOtaDXDY3063fvJndqTaJvhad-6vN7xGAC0ZNtk9HTmtyE8PJA==";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("EMAIL", email.trim());
      formData.append("email_address_check", "");
      formData.append("locale", "en");

      const response = await fetch(BREVO_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      const data = await response.json();
      if (data && data.success === false) {
        setError(data.message || "Subscription could not be saved. Please try again.");
        return;
      }

      setDone(true);
    } catch (err) {
      setError("Unable to join waitlist. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-foreground">
        <Check className="h-4 w-4 text-wood" /> You're on the list. We'll write when the full app opens.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          disabled={loading}
          required
          className="h-11 min-w-0 shrink-0 rounded-full sm:flex-1 border border-input bg-card px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Joining...</span>
            </>
          ) : (
            <>
              <span>Join the waitlist</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  );
}
