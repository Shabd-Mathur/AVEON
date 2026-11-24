import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveStudio } from './components/InteractiveStudio';
import { PillarsSection } from './components/PillarsSection';
import { PricingSection } from './components/PricingSection';
import { PilotSection } from './components/PilotSection';
import { Footer } from './components/Footer';

export function App() {
  const scrollToStudio = () => {
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPillars = () => {
    document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar 
        onScrollToStudio={scrollToStudio} 
        onScrollToPillars={scrollToPillars} 
        onScrollToPricing={scrollToPricing}
      />

      <main className="flex-grow">
        <Hero onExploreStudio={scrollToStudio} />
        <InteractiveStudio />
        <PillarsSection />
        <PricingSection onSelectPlan={() => document.getElementById('portal')?.scrollIntoView({ behavior: 'smooth' })} />
        <PilotSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
