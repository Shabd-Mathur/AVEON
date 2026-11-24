import React from 'react';
import { Terminal, Cpu, Database, Cloud, Zap, ShieldCheck } from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3">
            TECHNICAL MOAT
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Dual-Tier Compute Architecture
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            How a solo founder in a college room runs enterprise-scale creative operations without massive cloud API bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cloud Tier */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                Tier 1: Cloud Reasoning
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Google Antigravity + Pro Models
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Handles multi-step autonomous agent execution, deep script polish, client architecture synthesis, and background browser verification.
            </p>
            <div className="pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-500 space-y-1">
              <div>• Parallel agent swarms</div>
              <div>• Scheduled cron background tasks</div>
              <div>• Zero token waste on boilerplate</div>
            </div>
          </div>

          {/* Local Tier */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                Tier 2: Local Hardware
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              HP Omen 15 (RTX 5060 8GB VRAM)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Runs quantized 7B/14B models (Ollama, LM Studio, vLLM) locally for free, infinite bulk work: scraping transcripts, tagging ad hooks, and draft variations.
            </p>
            <div className="pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-500 space-y-1">
              <div>• 0 API cost for high-volume batch runs</div>
              <div>• 100% private data persistence</div>
              <div>• Instant local inference latency</div>
            </div>
          </div>

          {/* Knowledge Core */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                Tier 3: Strategic IP
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Notion Second Brain Sync
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Systematic ingestion of proven viral mechanics, psychology principles, and title/thumbnail formulas from daily top-tier creator study.
            </p>
            <div className="pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-500 space-y-1">
              <div>• Psychology Library database</div>
              <div>• Viral Hook & Title Vault</div>
              <div>• MrBeast / Airrack retention models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
