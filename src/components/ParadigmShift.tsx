import React from 'react';
import { Check, X } from 'lucide-react';

export const ParadigmShift: React.FC = () => {
  const comparisons = [
    {
      feature: 'Core Philosophy',
      traditional: 'Fatalistic determinism — your fate is written and you must appease celestial gods.',
      scriptingDestiny: 'High-agency engineering — natal coordinates are your hardware architecture; you write the software.',
    },
    {
      feature: 'Approach to Time',
      traditional: 'Binary luck scoring (Good Luck vs Bad Luck) creating anxiety and superstition.',
      scriptingDestiny: 'Contextual seasonality — recognizing whether a decade favors capital accumulation, skill acquisition, or consolidation.',
    },
    {
      feature: 'Language & Jargon',
      traditional: 'Archaic terminology, cryptic poetry, and deliberate gatekeeping.',
      scriptingDestiny: 'Clean structural mental models, clear archetypes, and actionable decision frameworks.',
    },
    {
      feature: 'Practical Utility',
      traditional: 'Passive fortune-telling that leaves you waiting for things to happen.',
      scriptingDestiny: 'Strategic planning tool for career pivots, co-founder chemistry, and product timing.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 md:py-28 bg-[#08090E] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>The Paradigm Shift</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Why Scripting Destiny</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            Destiny Is Not a Sentence. It Is Code You Learn to Read.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            For millennia, BaZi was obscured behind layers of superstition, fear, and mystique. Scripting Destiny strips away the noise to uncover an elegant coordinate system for human energetics and timing.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Traditional Card */}
          <div className="p-8 bg-[#0D1017] border border-slate-800/80 rounded-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800/80">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
                The Old World
              </div>
              <h3 className="text-xl font-bold text-slate-200">
                Superstitious Fortune-Telling
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fatalistic predictions designed around fear, helplessness, and dependency.
              </p>
            </div>

            <ul className="space-y-4">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-400">
                  <div className="p-1 rounded bg-rose-500/10 text-rose-400 mt-0.5 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-slate-300 font-semibold mb-0.5">{item.feature}</strong>
                    <span>{item.traditional}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Scripting Destiny Card */}
          <div className="p-8 bg-[#0F1420] border border-amber-500/30 rounded-2xl space-y-6 shadow-xl shadow-amber-500/5">
            <div className="pb-4 border-b border-amber-500/20">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                The Modern Standard
              </div>
              <h3 className="text-xl font-bold text-white">
                Scripting Destiny
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Secular structural intelligence for high-agency decision-making and self-authorship.
              </p>
            </div>

            <ul className="space-y-4">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                  <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold mb-0.5">{item.feature}</strong>
                    <span>{item.scriptingDestiny}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pull Quote Box */}
        <div className="p-8 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent border border-slate-800 rounded-2xl max-w-4xl">
          <blockquote className="text-lg sm:text-xl text-slate-200 font-medium italic mb-3">
            &ldquo;When a boat builder understands the tidal rhythms and wind currents, they don&apos;t curse the waves—they trim their sails. BaZi is the nautical chart of your personal energy.&rdquo;
          </blockquote>
          <div className="text-xs font-mono text-amber-400/90">
            Scripting Destiny Foundational Principle
          </div>
        </div>
      </div>
    </section>
  );
};
