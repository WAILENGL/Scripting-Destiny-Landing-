import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Julian Vance',
      role: 'Co-Founder & CTO',
      company: 'Aether Data Systems',
      archetype: 'Geng Metal Day Master',
      quote:
        'I was skeptical of anything labeled Chinese astrology until I saw Scripting Destiny’s structural mapping. Understanding my Geng Metal Day Master and the active Direct Officer luck wave explained exactly why our previous pivot struggled and gave us the clarity to restructure our executive leadership before raising our Series A.',
      outcome: 'Aligned executive roles with complementary elemental strengths',
    },
    {
      name: 'Elena Rostova',
      role: 'Principal Product Strategist',
      company: 'Kinetics Studio',
      archetype: 'Ding Fire Day Master',
      quote:
        'Traditional fortune-telling always felt disempowering and vague. Scripting Destiny treats your chart like an operating system profile. Knowing that my Ding Fire requires wood resource inputs kept me from burning out during multi-quarter sprint cycles.',
      outcome: 'Eliminated chronic sprint burnout through cyclical pacing',
    },
    {
      name: 'Marcus Chen',
      role: 'Managing Partner',
      company: 'Tenfold Capital',
      archetype: 'Ren Water Day Master',
      quote:
        'The Da Yun 10-year luck wave calculation is startlingly precise. We use the conceptual framework to audit long-term alignment across founding teams. When founders understand their natural friction points mathematically, interpersonal friction drops to near zero.',
      outcome: 'Audited 12 founding teams for complementary cognitive diversity',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#090A10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>Verified Perspectives</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Real Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            Built for High-Agency Builders & Thinkers
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            See how founders, engineering leaders, and investors apply Scripting Destiny’s analytical framework to navigate career transitions, team chemistry, and capital timing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0E121B] border border-slate-800 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-amber-400/80" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} · <span className="text-slate-300">{t.company}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span className="text-amber-400/90">{t.archetype}</span>
                  <span className="text-emerald-400/90">Outcome Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
