import React from 'react';
import { ArrowUp, Youtube, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-900 bg-[#070709] text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-purple-400 text-[10px]">
            AV
          </div>
          <div>
            <span className="font-bold text-white tracking-wider font-mono">AVEON</span>
            <span className="text-zinc-600 mx-2">|</span>
            <span className="text-zinc-400">Storytelling × AI × Distribution</span>
          </div>
        </div>

        {/* Founder & Social Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <span className="text-zinc-300">
            Founder: <span className="text-white font-medium">Shabd Mathur</span>
          </span>
          
          <span className="text-zinc-700 hidden sm:inline">•</span>

          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@theshabdmathur"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors px-2 py-1 rounded bg-zinc-900/60 border border-zinc-800"
            >
              <Youtube className="w-3.5 h-3.5 text-red-400" />
              <span>YouTube</span>
            </a>

            <a
              href="https://www.instagram.com/shabd_mathur/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-pink-400 transition-colors px-2 py-1 rounded bg-zinc-900/60 border border-zinc-800"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
          </div>

          <span className="text-zinc-700 hidden sm:inline">•</span>

          <button
            onClick={scrollToTop}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
