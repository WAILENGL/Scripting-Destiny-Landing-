import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setDone(true);
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
      <div className={`flex gap-2 ${compact ? "flex-row" : "flex-col sm:flex-row"}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="h-11 flex-1 rounded-full border border-input bg-card px-5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
        >
          Join the waitlist <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  );
}
