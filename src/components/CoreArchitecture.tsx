import React from 'react';
import { Sun, Fingerprint, Layers, TrendingUp } from 'lucide-react';

export const CoreArchitecture: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Solar Gan-Zhi Algorithm',
      tagline: 'Astronomical Precision vs Calendar Assumptions',
      icon: Sun,
      description:
        'Standard horoscopes rely on arbitrary calendar dates. Scripting Destiny calculates the exact True Solar Time based on planetary longitude and solar terms (Jie Qi), transforming birth coordinates into four structural pillars: Year, Month, Day, and Hour.',
      highlight: 'Precision Ephemeris Engine',
    },
    {
      num: '02',
      title: 'The Day Master Archetype',
      tagline: 'Your Core Intrinsic Processing Unit',
      icon: Fingerprint,
      description:
        'The Heavenly Stem of your Day Pillar is your Day Master—the central coordinate of your consciousness. Whether you are Jia Yang Wood (the upright pioneer) or Gui Yin Water (the strategic cloud), it reveals your innate strengths and natural frictions.',
      highlight: '10 Archetypal Polarities',
    },
    {
      num: '03',
      title: 'Ten Gods (Shi Shen) Dynamics',
      tagline: 'Mapping Your Energy Economy',
      icon: Layers,
      description:
        'Every pillar in your chart interacts with your Day Master through Five Relational Pillars: Output (creative creation), Wealth (tangible execution), Power (leadership & discipline), Resource (learning & intuition), and Companion (allies & competitors).',
      highlight: 'Systemic Energetic Balance',
    },
    {
      num: '04',
      title: 'Da Yun 10-Year Luck Waves',
      tagline: 'Timing Macro Leaps & Consolidation Seasons',
      icon: TrendingUp,
      description:
        'Your chart is your vehicle; the 10-year luck cycle is the terrain you navigate. Understanding which elemental wave is active lets you know whether this decade calls for aggressive capital allocation, heads-down technical mastery, or platform consolidation.',
      highlight: 'Decadal Strategic Roadmapping',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#090A10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>System Architecture</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            Four Layers of Structural Intelligence
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Scripting Destiny breaks Chinese Metaphysics into an intuitive, modular stack. Each layer builds upon the next to provide an actionable strategy for your life decisions.
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#0E121B] border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold font-mono text-amber-400/90">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#141924] border border-slate-800 text-slate-300">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-4">
                    {step.tagline}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Engine Spec</span>
                  <span className="text-amber-300/90">{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
