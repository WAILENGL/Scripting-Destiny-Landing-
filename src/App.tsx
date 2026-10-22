import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveBlueprint } from './components/InteractiveBlueprint';
import { ParadigmShift } from './components/ParadigmShift';
import { CoreArchitecture } from './components/CoreArchitecture';
import { FiveElementsExploration } from './components/FiveElementsExploration';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { EarlyAccessCta } from './components/EarlyAccessCta';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToBlueprint = () => {
    const el = document.getElementById('interactive-blueprint');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-slate-100 flex flex-col">
      <Navbar onOpenExplorer={scrollToBlueprint} />
      <main className="flex-grow">
        <Hero onExploreClick={scrollToBlueprint} onManifestoClick={scrollToPhilosophy} />
        <InteractiveBlueprint />
        <ParadigmShift />
        <CoreArchitecture />
        <FiveElementsExploration />
        <Testimonials />
        <FaqSection />
        <EarlyAccessCta />
      </main>
      <Footer />
    </div>
  );
}
