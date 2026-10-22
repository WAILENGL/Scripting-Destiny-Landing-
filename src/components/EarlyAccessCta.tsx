import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Github, Sparkles } from 'lucide-react';

export const EarlyAccessCta: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-[#090A10] border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle ambient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Early Access & Community</span>
        </div>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
          style={{ textWrap: 'balance' }}
        >
          Master Your Operating System. Script Your Own Outcomes.
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Get notified when full team compatibility audits, advanced annual cycle tracking, and API endpoints launch. Free for early community strategists.
        </p>

        {submitted ? (
          <div className="max-w-md mx-auto p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">You&apos;re On the Early Access List</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We&apos;ve reserved your priority spot for upcoming releases and deep structural guides. No spam, ever.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/WAILENGL/Scripting-Destiny-MVP.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 hover:text-amber-200 underline"
              >
                <span>Meanwhile, explore the MVP repository on GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#141924] border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-all shadow-md hover:shadow-amber-500/10 whitespace-nowrap shrink-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {error && <p className="text-xs text-rose-400 font-mono text-left">{error}</p>}

            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero spam · Unsubscribe anytime</span>
              </span>
              <a
                href="https://github.com/WAILENGL/Scripting-Destiny-MVP.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub MVP</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
