import React, { useState, useMemo } from 'react';
import { calculateBaZi } from '../lib/baziCalculator';
import { PRESET_PERSONAS } from '../lib/baziConstants';
import { Copy, Check, Sparkles, ExternalLink, RefreshCw, Calendar, Clock, User } from 'lucide-react';

export const InteractiveBlueprint: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [birthTime, setBirthTime] = useState('12:00');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'pillars' | 'elements' | 'luck'>('pillars');

  // Calculate live chart
  const chart = useMemo(() => {
    return calculateBaZi(birthDate, birthTime, gender);
  }, [birthDate, birthTime, gender]);

  const handlePresetSelect = (date: string, time: string) => {
    setBirthDate(date);
    setBirthTime(time);
  };

  const handleCopySummary = () => {
    const summary = `Scripting Destiny Chart
Birth Date: ${chart.birthDate} ${chart.birthTime}
Day Master: ${chart.dayMaster.pinyin} (${chart.dayMaster.hanzi}) ${chart.dayMaster.title} [${chart.dayMaster.element} ${chart.dayMaster.polarity}]
Four Pillars:
- Year: ${chart.year.stem.pinyin} ${chart.year.branch.pinyin} (${chart.year.stem.hanzi}${chart.year.branch.hanzi}) - ${chart.year.tenGod}
- Month: ${chart.month.stem.pinyin} ${chart.month.branch.pinyin} (${chart.month.stem.hanzi}${chart.month.branch.hanzi}) - ${chart.month.tenGod}
- Day: ${chart.day.stem.pinyin} ${chart.day.branch.pinyin} (${chart.day.stem.hanzi}${chart.day.branch.hanzi}) - Day Master
- Hour: ${chart.hour.stem.pinyin} ${chart.hour.branch.pinyin} (${chart.hour.stem.hanzi}${chart.hour.branch.hanzi}) - ${chart.hour.tenGod}
Element Balance: Wood: ${chart.elementBalance.Wood}%, Fire: ${chart.elementBalance.Fire}%, Earth: ${chart.elementBalance.Earth}%, Metal: ${chart.elementBalance.Metal}%, Water: ${chart.elementBalance.Water}%
Decoded via Scripting Destiny (https://github.com/WAILENGL/Scripting-Destiny-MVP.git)`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="interactive-blueprint" className="py-20 md:py-28 bg-[#090A10] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>Live Interactive Demo</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Real Ephemeris Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            Decode Any Natal Matrix in Real Time
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Test the Scripting Destiny calculation engine directly. Enter your birth coordinates or choose a preset archetype below to see the Four Pillars, Day Master dynamics, and elemental distribution.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mb-8">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Quick Persona Presets:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {PRESET_PERSONAS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.birthDate, preset.birthTime)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all text-left cursor-pointer ${
                  birthDate === preset.birthDate
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-200 shadow-sm'
                    : 'bg-[#0E121B] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-slate-200">{preset.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">{preset.role}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Control & Input Panel */}
        <div className="p-6 bg-[#0E121B] border border-slate-800 rounded-2xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Solar Birth Date</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#141924] border border-slate-700 rounded-lg text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Birth Time (Local)</span>
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#141924] border border-slate-700 rounded-lg text-sm text-slate-100 font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Da Yun Polarity</span>
              </label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#141924] border border-slate-700 rounded-lg">
                <button
                  type="button"
                  onClick={() => setGender('M')}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    gender === 'M' ? 'bg-amber-300 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('F')}
                  className={`py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    gender === 'F' ? 'bg-amber-300 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copy structured summary to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Blueprint'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  const y = now.getFullYear();
                  const m = String(now.getMonth() + 1).padStart(2, '0');
                  const d = String(now.getDate()).padStart(2, '0');
                  const hh = String(now.getHours()).padStart(2, '0');
                  const mm = String(now.getMinutes()).padStart(2, '0');
                  setBirthDate(`${y}-${m}-${d}`);
                  setBirthTime(`${hh}:${mm}`);
                }}
                className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs transition-colors cursor-pointer"
                title="Use current date & time"
              >
                Now
              </button>

              <button
                type="button"
                onClick={() => {
                  setBirthDate('1990-01-01');
                  setBirthTime('12:00');
                  setGender('M');
                }}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 rounded-lg text-xs transition-colors cursor-pointer"
                title="Reset to default"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#0E121B] border border-slate-800 rounded-lg max-w-md mb-6">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'pillars' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Four Pillars
          </button>
          <button
            onClick={() => setActiveTab('elements')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'elements' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5 Elements Balance
          </button>
          <button
            onClick={() => setActiveTab('luck')}
            className={`flex-1 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'luck' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            10-Year Luck Waves
          </button>
        </div>

        {/* Content Tab 1: Four Pillars Grid */}
        {activeTab === 'pillars' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { pillar: chart.hour, isDm: false },
                { pillar: chart.day, isDm: true },
                { pillar: chart.month, isDm: false },
                { pillar: chart.year, isDm: false },
              ].map(({ pillar, isDm }, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-xl border transition-all ${
                    isDm
                      ? 'bg-[#141A28] border-amber-500/50 shadow-md shadow-amber-500/5'
                      : 'bg-[#0E121B] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        {pillar.name}
                      </span>
                      {isDm && (
                        <span className="ml-2 text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          Core Self
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[120px]">
                      {pillar.tenGod.split(' ')[0]}
                    </span>
                  </div>

                  {/* Heavenly Stem */}
                  <div className="p-3 bg-[#131824] border border-slate-800/60 rounded-lg mb-2">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Heavenly Stem
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <div className="text-2xl font-bold font-mono text-white">
                        {pillar.stem.hanzi}
                        <span className="text-sm font-normal text-slate-400 ml-1.5">
                          {pillar.stem.pinyin}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${pillar.stem.elementColor}`}>
                        {pillar.stem.element} ({pillar.stem.polarity})
                      </span>
                    </div>
                  </div>

                  {/* Earthly Branch */}
                  <div className="p-3 bg-[#131824] border border-slate-800/60 rounded-lg mb-3">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Earthly Branch
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <div className="text-2xl font-bold font-mono text-slate-200">
                        {pillar.branch.hanzi}
                        <span className="text-sm font-normal text-slate-400 ml-1.5">
                          {pillar.branch.pinyin}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {pillar.branch.animal} · {pillar.branch.element}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 leading-snug">
                    <div className="font-medium text-slate-300 mb-0.5">{pillar.label}</div>
                    {pillar.significance}
                  </div>
                </div>
              ))}
            </div>

            {/* Day Master Detail Banner */}
            <div className="p-6 bg-[#0E121B] border border-amber-500/30 rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Your Day Master Archetype</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {chart.dayMaster.hanzi} {chart.dayMaster.pinyin} — {chart.dayMaster.title} ({chart.dayMaster.archetype})
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {chart.dayMaster.description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                    <span className="text-slate-500">Core Traits:</span>
                    {chart.dayMaster.keywords.map((kw, i) => (
                      <span key={i} className="text-slate-300 bg-slate-800/70 px-2 py-0.5 rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 p-4 bg-[#141924] border border-slate-800 rounded-xl space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Strategic Operating Advice
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {chart.dayMaster.strategicAdvice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab 2: Five Elements Balance */}
        {activeTab === 'elements' && (
          <div className="p-6 bg-[#0E121B] border border-slate-800 rounded-2xl space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Five Elemental Composition (Wu Xing)
              </h3>
              <p className="text-xs text-slate-400">
                Calculated by weighting Heavenly Stems, Earthly Branches, and seasonal root hidden stems. Balance reveals energetic abundance versus scarcity.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { elem: 'Wood', pct: chart.elementBalance.Wood, color: 'bg-emerald-500', text: 'text-emerald-400', role: 'Growth, Architecture, Expansion' },
                { elem: 'Fire', pct: chart.elementBalance.Fire, color: 'bg-amber-500', text: 'text-amber-400', role: 'Visibility, Charisma, Communication' },
                { elem: 'Earth', pct: chart.elementBalance.Earth, color: 'bg-yellow-600', text: 'text-amber-300', role: 'Stability, Real Estate, Platforms' },
                { elem: 'Metal', pct: chart.elementBalance.Metal, color: 'bg-cyan-400', text: 'text-cyan-300', role: 'Execution, Discipline, Precision' },
                { elem: 'Water', pct: chart.elementBalance.Water, color: 'bg-blue-500', text: 'text-blue-400', role: 'Wisdom, Liquidity, Adaptability' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-semibold ${item.text}`}>{item.elem}</span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">{item.role}</span>
                    <span className="text-white font-bold tabular-nums">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${Math.max(item.pct, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#141924] border border-slate-800 rounded-xl text-xs text-slate-300">
              <span className="font-semibold text-amber-300">Analytical Reading: </span>
              {chart.strategicSummary}
            </div>
          </div>
        )}

        {/* Content Tab 3: 10-Year Luck Waves */}
        {activeTab === 'luck' && (
          <div className="p-6 bg-[#0E121B] border border-slate-800 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                10-Year Major Luck Cycles (Da Yun)
              </h3>
              <p className="text-xs text-slate-400">
                In classical BaZi, your natal chart is your vehicle, while the Da Yun luck pillars represent the road conditions you travel every 10 years.
              </p>
            </div>

            {chart.luckCycles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chart.luckCycles.map((cycle, i) => (
                  <div key={i} className="p-4 bg-[#141924] border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400">
                        Age {cycle.startAge} · {cycle.startYear}
                      </span>
                      <span className="text-xs font-mono font-bold text-white">
                        {cycle.stem.hanzi}{cycle.branch.hanzi} ({cycle.stem.pinyin} {cycle.branch.pinyin})
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {cycle.phaseTheme}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                      Element: {cycle.stem.element} · {cycle.branch.element}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                Calculating extended Da Yun cycles for selected timeline...
              </div>
            )}
          </div>
        )}

        {/* Grounding Link to reference repo */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0E121B] border border-slate-800/80 rounded-xl text-xs text-slate-400">
          <div>
            Need programmatic calculation access or want to explore the source code?
          </div>
          <a
            href="https://github.com/WAILENGL/Scripting-Destiny-MVP.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors cursor-pointer"
          >
            <span>View Reference MVP Repo on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
