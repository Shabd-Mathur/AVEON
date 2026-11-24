import React from 'react';
import { Cpu, Megaphone, Video, Sparkles, Network, ArrowUpRight } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      id: 'labs',
      name: 'AVEON Labs',
      role: 'Core Leverage Engine',
      status: 'Active (v0.1)',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-600',
      borderGlow: 'hover:border-purple-500/50',
      description: 'Proprietary agent workflows, Antigravity background tasks, and local model offloading for maximum compute efficiency.',
      deliverables: ['Autonomous Competitor Scrapers', 'Local LLM Scripting Agents', 'Notion Knowledge Base Sync']
    },
    {
      id: 'ads',
      name: 'AVEON Ads',
      role: 'Initial Cash-Flow Wedge',
      status: 'Active Pilot',
      icon: Megaphone,
      color: 'from-blue-500 to-indigo-600',
      borderGlow: 'hover:border-blue-500/50',
      description: 'High-converting ad creative, scroll-stopping hooks, and psychology-backed video storyboards tailored for D2C brands & performance agencies.',
      deliverables: ['3-Second Pattern Interrupts', 'Full 60s Shoot Scripts', 'Editor Shot-Lists & Audio SFX']
    },
    {
      id: 'media',
      name: 'AVEON Media',
      role: 'Owned Inbound Funnel',
      status: 'In Production',
      icon: Video,
      color: 'from-cyan-500 to-blue-600',
      borderGlow: 'hover:border-cyan-500/50',
      description: 'Owned distribution channels (Shabd + Shabd AI). Top-of-funnel organic attention, build-in-public authority, and B2B client acquisition.',
      deliverables: ['Hindi/Hinglish Challenge Formats', 'Build-In-Public Tech Breakdowns', 'Organic Inbound Pipeline']
    },
    {
      id: 'originals',
      name: 'AVEON Originals',
      role: 'Long-Term IP',
      status: 'Roadmap (Phase 2)',
      icon: Sparkles,
      color: 'from-fuchsia-500 to-pink-600',
      borderGlow: 'hover:border-fuchsia-500/50',
      description: 'High-production narrative storytelling formats, recurring digital episodic series, and defensible creator entertainment IP.',
      deliverables: ['Documentary Formats', 'High-Stakes Reality Challenges', 'Owned Content Brands']
    },
    {
      id: 'network',
      name: 'AVEON Creator Network',
      role: 'Scalable Distribution',
      status: 'Roadmap (Phase 3)',
      icon: Network,
      color: 'from-emerald-500 to-teal-600',
      borderGlow: 'hover:border-emerald-500/50',
      description: 'Decentralized campus clipping and distribution network starting at Tier-1 engineering colleges.',
      deliverables: ['Automated Clipping Engine', 'Campus Affiliate Distribution', 'Micro-Influencer Syndication']
    }
  ];

  return (
    <section id="pillars" className="py-20 border-t border-zinc-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
            VERTICAL INTEGRATION
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The Five Pillars of AVEON
          </h3>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Unlike traditional media holding companies with 100+ payroll bloat, each pillar operates as an autonomous, software-orchestrated unit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <TiltCard key={pillar.id} className="rounded-2xl" maxTilt={10}>
                <div
                  className={`group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 transition-all duration-300 ${pillar.borderGlow} hover:bg-zinc-900/70 hover:shadow-xl h-full flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${pillar.color} text-white shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {pillar.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                      {pillar.name}
                      <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-all" />
                    </h4>
                    <div className="text-xs font-mono text-purple-400/90 mb-3 font-medium">
                      {pillar.role}
                    </div>

                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                      Key Outputs
                    </div>
                    <ul className="space-y-1.5">
                      {pillar.deliverables.map((item, idx) => (
                        <li key={idx} className="text-xs text-zinc-300 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-purple-400"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
