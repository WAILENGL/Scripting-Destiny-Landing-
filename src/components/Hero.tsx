import React, { useState } from 'react';
import { ArrowRight, Compass, Cpu, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onManifestoClick: () => void;
}

interface SpecimenData {
  id: string;
  name: string;
  tag: string;
  pillars: { pillar: string; stem: string; branch: string; role: string; highlight?: boolean }[];
  dmName: string;
  dmArchetype: string;
  dmDesc: string;
  luckWave: string;
}

const SPECIMENS: SpecimenData[] = [
  {
    id: 'bing',
    name: 'Bing Fire',
    tag: 'The Luminary',
    dmName: 'Bing Fire (丙火)',
    dmArchetype: 'The Radiant Sun',
    dmDesc: 'High public visibility, strategic illumination, and macro vision. Highest leverage unlocked when paired with clear metal execution.',
    luckWave: 'Age 32–42 · Direct Wealth Cycle',
    pillars: [
      { pillar: 'Hour', stem: '壬 (Ren)', branch: '寅 (Tiger)', role: 'Vision' },
      { pillar: 'Day', stem: '丙 (Bing)', branch: '午 (Horse)', role: 'Core Self', highlight: true },
      { pillar: 'Month', stem: '庚 (Geng)', branch: '申 (Monkey)', role: 'Career' },
      { pillar: 'Year', stem: '甲 (Jia)', branch: '辰 (Dragon)', role: 'Heritage' },
    ],
  },
  {
    id: 'jia',
    name: 'Jia Wood',
    tag: 'The Pioneer',
    dmName: 'Jia Wood (甲木)',
    dmArchetype: 'The Towering Oak',
    dmDesc: 'Deep-rooted foundations, organic ecosystem architecture, and upright leadership. Thrives when allowed to break new ground.',
    luckWave: 'Age 28–38 · Indirect Resource Cycle',
    pillars: [
      { pillar: 'Hour', stem: '甲 (Jia)', branch: '午 (Horse)', role: 'Vision' },
      { pillar: 'Day', stem: '甲 (Jia)', branch: '寅 (Tiger)', role: 'Core Self', highlight: true },
      { pillar: 'Month', stem: '丙 (Bing)', branch: '子 (Rat)', role: 'Career' },
      { pillar: 'Year', stem: '戊 (Wu)', branch: '辰 (Dragon)', role: 'Heritage' },
    ],
  },
  {
    id: 'gui',
    name: 'Gui Water',
    tag: 'The Strategist',
    dmName: 'Gui Water (癸水)',
    dmArchetype: 'The Strategic Cloud',
    dmDesc: 'Subtle second-order observer, trend anticipation, and quiet mastery. Reads implicit currents before markets shift.',
    luckWave: 'Age 35–45 · Direct Officer Cycle',
    pillars: [
      { pillar: 'Hour', stem: '丁 (Ding)', branch: '巳 (Snake)', role: 'Vision' },
      { pillar: 'Day', stem: '癸 (Gui)', branch: '亥 (Pig)', role: 'Core Self', highlight: true },
      { pillar: 'Month', stem: '辛 (Xin)', branch: '酉 (Rooster)', role: 'Career' },
      { pillar: 'Year', stem: '癸 (Gui)', branch: '丑 (Ox)', role: 'Heritage' },
    ],
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onManifestoClick }) => {
  const [activeSpecimen, setActiveSpecimen] = useState<SpecimenData>(SPECIMENS[0]);

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Kicker - clean unboxed metadata with bullet separator */}
        <div className="flex items-center gap-2 text-xs font-mono text-amber-300/90 tracking-wide uppercase mb-6">
          <span>Chinese Metaphysics</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Systems Architecture</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Life Strategy</span>
        </div>

        {/* 2-Column Split: Headline & Value Prop on Left, Minimalist Astrolabe on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Decode Your Destiny Operating System.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Scripting Destiny translates 2,500 years of BaZi (Four Pillars of Destiny) into a clean, algorithmic framework for personal strategy, life timing, and self-authorship.
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-normal max-w-xl">
              No superstitious fortune-telling. No fatalistic predictions. Discover your inherent Day Master archetype, 10-year luck waves, and structural elemental balance through pure mathematical clarity.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-all shadow-md hover:shadow-amber-500/10 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Calculate Your Chart</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onManifestoClick}
                className="px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Read The Philosophy
              </button>
            </div>

            {/* Grounding note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400/90 shrink-0" />
              <span>Independent MVP based on astronomical solar algorithms. 100% secular.</span>
            </div>
          </div>

          {/* Right Column: Interactive Live Specimen Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md p-6 bg-[#0E121B] border border-slate-800 rounded-2xl shadow-2xl space-y-4">
              {/* Card Header & Specimen Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Four Pillars Matrix</span>
                </div>
                <div className="flex items-center gap-1">
                  {SPECIMENS.map((sp) => (
                    <button
                      key={sp.id}
                      onClick={() => setActiveSpecimen(sp)}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                        activeSpecimen.id === sp.id
                          ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {sp.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimalist Graphic: The Celestial Pillars Chart */}
              <div className="grid grid-cols-4 gap-2">
                {activeSpecimen.pillars.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center transition-all ${
                      item.highlight
                        ? 'bg-amber-500/10 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                        : 'bg-[#141924] border border-slate-800/80'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      {item.pillar}
                    </div>
                    <div className={`text-base font-bold font-mono ${item.highlight ? 'text-amber-300' : 'text-slate-100'}`}>
                      {item.stem.split(' ')[0]}
                    </div>
                    <div className="text-xs text-slate-300 font-mono mt-0.5">
                      {item.branch.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-2 truncate">
                      {item.role}
                    </div>
                  </div>
                ))}
              </div>

              {/* Day Master Specimen Panel */}
              <div className="p-4 bg-[#141924] border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Active Day Master</span>
                  <span className="text-xs font-mono text-amber-400 font-semibold">{activeSpecimen.dmName}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeSpecimen.dmDesc}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/60">
                  <span>Decadal Wave</span>
                  <span className="text-emerald-400">{activeSpecimen.luckWave}</span>
                </div>
              </div>

              {/* Action Button inside specimen */}
              <button
                onClick={onExploreClick}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <span>Launch Full Chart Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Trust Strip below Hero Split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>2,500-Year Heritage</span>
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              Formalized
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Based on classical Gan-Zhi astrological mathematics codified since antiquity.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>10-Year Luck Waves</span>
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              Da Yun Cycles
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Forecasting macro life chapters to time major career pivots and risk horizons.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Astronomical Math</span>
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              True Solar Time
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Real planetary ephemeris calculations without arbitrary superstition or guesswork.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Analytical Framework</span>
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              Zero Superstition
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Designed as a personal strategy operating system for builders and rational thinkers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
