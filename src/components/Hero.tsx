import React from 'react';
import { Sparkles, ArrowRight, Flame, Target, TrendingUp, Smartphone } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { TiltCard } from './TiltCard';

interface HeroProps {
  onExploreStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreStudio }) => {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* 3D Interactive Three.js Polyhedron & Particle Scene */}
      <ThreeCanvas />

      {/* Ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-blue-500/10 blur-[140px] -z-20 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 blur-[90px] -z-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-xs font-mono text-purple-300 shadow-lg shadow-purple-500/10 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>AUTONOMOUS MEDIA-TECH MACHINE</span>
        </div>

        {/* Main Title - Always in one straight line */}
        <div className="overflow-x-auto py-2 no-scrollbar">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans whitespace-nowrap drop-shadow-sm">
            Storytelling <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">×</span> AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">×</span> Distribution
          </h1>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed font-normal">
          Legacy agencies charge heavy retainers and take weeks to write mediocre ad scripts. 
          <span className="text-zinc-200 font-medium"> AVEON </span> combines cognitive psychology, viral retention mechanics, and agentic workflows to ship scroll-stopping creative briefs in seconds.
        </p>

        {/* CTA Button with 3D glow */}
        <div className="flex items-center justify-center mb-16">
          <button
            onClick={onExploreStudio}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Test the Live Ad Engine</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3D Tilt Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          <TiltCard className="rounded-xl">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-purple-500/40 transition-all h-full">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Pattern Interrupt</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">3-Sec Rule</div>
              <p className="text-[11px] text-zinc-500 mt-1">Scroll-stopping psychological hooks</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-xl">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-indigo-500/40 transition-all h-full">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Production Speed</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">10x Velocity</div>
              <p className="text-[11px] text-zinc-500 mt-1">Instant storyboard & script iteration</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-xl">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-blue-500/40 transition-all h-full">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Acquisition Cost</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">-35% CAC</div>
              <p className="text-[11px] text-zinc-500 mt-1">Engineered to drive lower CPM & high hold</p>
            </div>
          </TiltCard>

          <TiltCard className="rounded-xl">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all h-full">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Smartphone className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Format Native</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono">9:16 Matrix</div>
              <p className="text-[11px] text-zinc-500 mt-1">Built for Reels, Shorts & Meta Ad sets</p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
