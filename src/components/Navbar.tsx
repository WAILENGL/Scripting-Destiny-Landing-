import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenExplorer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExplorer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['interactive-blueprint', 'philosophy', 'how-it-works', 'elements', 'faq'];
      const scrollPos = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#08090E]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
          <span>Scripting Destiny</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => scrollToSection('philosophy')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'philosophy' ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'how-it-works' ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('interactive-blueprint')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'interactive-blueprint' ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Blueprint
          </button>
          <button
            onClick={() => scrollToSection('elements')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'elements' ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            The 5 Elements
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'faq' ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenExplorer}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg transition-all shadow-sm hover:shadow-amber-500/10 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Launch Blueprint</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B0D14] px-6 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('philosophy')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('interactive-blueprint')}
            className="block w-full text-left py-2 text-sm text-amber-300 hover:text-amber-200"
          >
            Interactive Blueprint
          </button>
          <button
            onClick={() => scrollToSection('elements')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            The 5 Elements
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm text-slate-300 hover:text-white"
          >
            FAQ
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExplorer();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg"
            >
              Launch Blueprint Explorer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
