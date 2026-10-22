import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06070B] border-t border-slate-900 py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-850">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Scripting Destiny</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Bridging 2,500 years of classical Chinese metaphysics with modern systems architecture. Transforming BaZi into an analytical life navigation and timing framework.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/WAILENGL/Scripting-Destiny-MVP.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>WAILENGL / Scripting-Destiny-MVP</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Framework
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#philosophy" className="hover:text-slate-200 transition-colors">
                  Philosophy & Paradigm
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-slate-200 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#interactive-blueprint" className="hover:text-slate-200 transition-colors">
                  Live BaZi Calculator
                </a>
              </li>
              <li>
                <a href="#elements" className="hover:text-slate-200 transition-colors">
                  The Five Elements
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Open Source */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono">
              Project & Resources
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/WAILENGL/Scripting-Destiny-MVP.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors flex items-center gap-1"
                >
                  <span>MVP Repository</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-200 transition-colors">
                  FAQ & Methodology
                </a>
              </li>
              <li>
                <a href="#interactive-blueprint" className="hover:text-slate-200 transition-colors">
                  Gan-Zhi Ephemeris
                </a>
              </li>
              <li>
                <span className="text-slate-600">API Documentation (Coming Soon)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {currentYear} Scripting Destiny. All rights reserved. Grounded in classical astronomical calculations.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with precision & high agency</span>
            <span>Secular & Analytical</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
