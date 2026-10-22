import React, { useState } from 'react';
import { ElementType } from '../types/bazi';
import { TreePine, Flame, Mountain, Shield, Droplets } from 'lucide-react';

interface ElementInfo {
  type: ElementType;
  hanzi: string;
  icon: typeof TreePine;
  tagline: string;
  color: string;
  borderColor: string;
  textColor: string;
  keywords: string[];
  generating: string;
  controlling: string;
  strategicDomain: string;
  inBalance: string;
  excess: string;
}

export const FiveElementsExploration: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<ElementType>('Wood');

  const elementsData: Record<ElementType, ElementInfo> = {
    Wood: {
      type: 'Wood',
      hanzi: '木 (Mù)',
      icon: TreePine,
      tagline: 'Growth, Architecture & Principles',
      color: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      keywords: ['Pioneering', 'Long-Range Vision', 'Integrity', 'Benevolence'],
      generating: 'Feeds Fire (fuels passion and visibility)',
      controlling: 'Plows Earth (breaks up stagnation, forces adaptation)',
      strategicDomain: 'Venture incubation, architectural design, early-stage research, and foundational community building.',
      inBalance: 'Resolute, morally courageous, capable of building generational structures with high endurance.',
      excess: 'Stubbornness, inability to bend or pivot, excessive idealism at the expense of commercial reality.',
    },
    Fire: {
      type: 'Fire',
      hanzi: '火 (Huǒ)',
      icon: Flame,
      tagline: 'Visibility, Passion & Illumination',
      color: 'bg-amber-500/10',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      keywords: ['Charisma', 'Broadcast', 'Inspiration', 'Clarity'],
      generating: 'Creates Earth (ash fertilizes soil)',
      controlling: 'Melts Metal (tempers rigid rules, accelerates change)',
      strategicDomain: 'Public markets, media, branding, consumer tech, keynote leadership, and viral storytelling.',
      inBalance: 'Radiant warmth, transparent communication, inspiring collective action effortlessly.',
      excess: 'Burnout, volatility, chasing spectacle over substance, erratic emotional spikes.',
    },
    Earth: {
      type: 'Earth',
      hanzi: '土 (Tǔ)',
      icon: Mountain,
      tagline: 'Stability, Trust & Platforms',
      color: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/40',
      textColor: 'text-amber-300',
      keywords: ['Gravitas', 'Reliability', 'Custodianship', 'Nurturing'],
      generating: 'Bears Metal (ore crystallizes in earth)',
      controlling: 'Dams Water (channels chaotic momentum into useful reservoirs)',
      strategicDomain: 'Institutional trust, real estate, cloud infrastructure, treasury management, and ecosystem stewardship.',
      inBalance: 'Centering gravity, deeply dependable, patient, building immense enterprise value slowly.',
      excess: 'Inertia, hesitation to adopt innovation, hoarding, excessive conservatism.',
    },
    Metal: {
      type: 'Metal',
      hanzi: '金 (Jīn)',
      icon: Shield,
      tagline: 'Precision, Execution & Quality',
      color: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/40',
      textColor: 'text-cyan-300',
      keywords: ['Discipline', 'Refinement', 'Decisiveness', 'Justice'],
      generating: 'Condenses Water (cool metal forms morning dew)',
      controlling: 'Chops Wood (prunes overgrown initiatives, enforces focus)',
      strategicDomain: 'High-frequency systems, surgical execution, quantitative finance, luxury goods, and strict operations.',
      inBalance: 'Sharp discernment, ruthless efficiency, high standards of craftsmanship, zero fluff.',
      excess: 'Cold cynicism, hyper-critical perfectionism leading to delayed launches, emotional detachment.',
    },
    Water: {
      type: 'Water',
      hanzi: '水 (Shuǐ)',
      icon: Droplets,
      tagline: 'Wisdom, Flow & Momentum',
      color: 'bg-blue-500/10',
      borderColor: 'border-blue-500/40',
      textColor: 'text-blue-400',
      keywords: ['Intuition', 'Fluidity', 'Strategy', 'Intelligence'],
      generating: 'Nourishes Wood (water sustains organic life)',
      controlling: 'Extinguishes Fire (dampens hysteria, forces rational calibration)',
      strategicDomain: 'Global trade, macro asset allocation, intelligence, psychology, cryptography, and agile diplomacy.',
      inBalance: 'Profound strategic depth, seamless adaptation around obstacles, high emotional intelligence.',
      excess: 'Aimless drifting, pervasive skepticism, lack of concrete boundaries or commitments.',
    },
  };

  const current = elementsData[selectedElement];
  const Icon = current.icon;

  return (
    <section id="elements" className="py-20 md:py-28 bg-[#08090E] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>Elemental Equilibrium</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Wu Xing Dynamics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            The Five Elemental Dynamics
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            In BaZi, the five elements are not physical objects—they are energetic vectors. Understanding how your natal chart balances these five currents gives you clarity on where your effort compounds.
          </p>
        </div>

        {/* 5-Element Interactive Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {(['Wood', 'Fire', 'Earth', 'Metal', 'Water'] as ElementType[]).map((elem) => {
            const data = elementsData[elem];
            const ElemIcon = data.icon;
            const isSelected = selectedElement === elem;
            return (
              <button
                key={elem}
                onClick={() => setSelectedElement(elem)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? `${data.color} ${data.borderColor} shadow-lg shadow-black/40`
                    : 'bg-[#0E121B] border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-bold font-mono text-white">
                    {data.hanzi.split(' ')[0]}
                  </span>
                  <ElemIcon className={`w-4 h-4 ${isSelected ? data.textColor : 'text-slate-500'}`} />
                </div>
                <div className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {elem}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {data.tagline.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Element Deep-Dive Card */}
        <div className={`p-8 bg-[#0E121B] border ${current.borderColor} rounded-2xl shadow-xl space-y-6 transition-all`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${current.color} ${current.textColor} border ${current.borderColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{current.type}</span>
                  <span className="text-sm font-mono font-normal text-slate-400">{current.hanzi}</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {current.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {current.keywords.map((kw, i) => (
                <span key={i} className="text-xs font-mono px-2.5 py-1 rounded bg-[#141924] border border-slate-800 text-slate-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-[#141924] border border-slate-800/80 rounded-xl space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Strategic Application
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {current.strategicDomain}
              </p>
            </div>

            <div className="p-4 bg-[#141924] border border-slate-800/80 rounded-xl space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Elemental Relationships
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-slate-500 font-mono">Generating: </span>
                  <span>{current.generating}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono">Controlling: </span>
                  <span>{current.controlling}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#141924] border border-slate-800/80 rounded-xl space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Equilibrium vs Excess
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  <span className="text-emerald-400 font-mono">Optimized: </span>
                  <span>{current.inBalance}</span>
                </div>
                <div>
                  <span className="text-amber-400 font-mono">Overheated: </span>
                  <span>{current.excess}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
