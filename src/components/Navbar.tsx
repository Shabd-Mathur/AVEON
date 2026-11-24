import React from 'react';
import { Sparkles, CreditCard } from 'lucide-react';

interface NavbarProps {
  onScrollToStudio: () => void;
  onScrollToPillars: () => void;
  onScrollToPricing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToStudio, onScrollToPillars, onScrollToPricing }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#09090b]/80 border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 p-[1px] shadow-lg shadow-purple-500/20">
            <div className="h-full w-full bg-[#09090b] rounded-[7px] flex items-center justify-center">
              <span className="font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-sm">
                AV
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-white text-lg flex items-center gap-1.5 font-sans">
              AVEON
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400 font-medium">
          <button 
            onClick={onScrollToStudio} 
            className="hover:text-white transition-colors duration-150 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Ad Studio (Live)</span>
          </button>
          <button 
            onClick={onScrollToPillars} 
            className="hover:text-white transition-colors duration-150"
          >
            The 5 Pillars
          </button>
          <a 
            href="#portal" 
            className="hover:text-white transition-colors duration-150 text-indigo-400 hover:text-indigo-300"
          >
            Partner Portal
          </a>
        </nav>

        {/* Action Button: Pricing */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            onClick={onScrollToPricing}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            <span>Pricing</span>
          </a>
        </div>
      </div>
    </header>
  );
};
