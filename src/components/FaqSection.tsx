import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What exactly is BaZi (Four Pillars of Destiny)?',
      a: 'BaZi (literally "Eight Characters") is an ancient Chinese metaphysical system that maps the solar planetary alignment at the moment of your birth into four pairs of Heavenly Stems and Earthly Branches: the Year, Month, Day, and Hour pillars. Rather than vague personality traits, it offers a structural blueprint of your natural cognitive strengths, energetic constitution, and life timing cycles.',
    },
    {
      q: 'How is Scripting Destiny different from superstitious fortune-telling?',
      a: 'Traditional fortune-telling relies on fatalistic fear, vague prophecies, and superstitious remedies (like buying lucky charms or avoiding arbitrary dates). Scripting Destiny approaches BaZi with an engineer’s mindset: treating your natal chart as your baseline hardware architecture, and the 10-year luck waves (Da Yun) as seasonal road conditions. It is 100% secular, analytical, and focused on high-agency strategic decisions.',
    },
    {
      q: 'Do I need to understand Chinese or metaphysical jargon?',
      a: 'Not at all. While the underlying engine calculates the authentic classical Chinese characters and stems, our interface translates every concept into modern structural English (e.g., The Pioneer, The Illuminator, The Architect) and clear business/life domains (Output, Wealth, Power, Resource, Companion).',
    },
    {
      q: 'Is this deterministic? Does it mean my future is already decided?',
      a: 'No. The foundational philosophy of Scripting Destiny is that your chart determines your starting coordinates and cyclical currents—not your ultimate destination. Just as a software compiler has defined rules but allows you to build any software you desire, understanding your BaZi blueprint allows you to make deliberate, optimized choices rather than sleepwalking through default tendencies.',
    },
    {
      q: 'Why does birth time and solar calculation matter?',
      a: 'The Earth is constantly rotating through 12 celestial sectors every 24 hours. A standard clock time is an arbitrary societal construct, whereas BaZi requires True Solar Time (the sun’s actual position relative to your birthplace longitude). Scripting Destiny uses astronomical algorithms to calculate your Hour pillar with exact celestial fidelity.',
    },
    {
      q: 'Where can I access the open-source MVP tool and source code?',
      a: 'Scripting Destiny was developed transparently as an open-source MVP. You can view the code, run local calculations, and contribute on GitHub at https://github.com/WAILENGL/Scripting-Destiny-MVP.git.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#08090E] border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
            <span>Clarifications</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Everything you need to know about Scripting Destiny, classical BaZi calculations, and how to use the framework.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0E121B] border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <span className="text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded bg-[#141924] text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
