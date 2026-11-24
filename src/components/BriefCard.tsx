import React, { useState } from 'react';
import { GeneratedAdBrief } from '../engine/adGenerator';
import { Copy, Check, Eye, Film, Brain, Scissors, Download, Share2 } from 'lucide-react';

interface BriefCardProps {
  brief: GeneratedAdBrief;
}

export const BriefCard: React.FC<BriefCardProps> = ({ brief }) => {
  const [activeTab, setActiveTab] = useState<'hooks' | 'script' | 'psychology' | 'editor'>('hooks');
  const [copied, setCopied] = useState(false);

  const copyBriefMarkdown = () => {
    let md = `# AVEON Creative Ad Brief: ${brief.title}\n`;
    md += `**Date:** ${brief.generatedAt} | **Category:** ${brief.input.category}\n`;
    md += `**Target Audience:** ${brief.input.targetAudience}\n`;
    md += `**Core Problem:** ${brief.input.coreProblem}\n`;
    md += `**Unique Mechanism:** ${brief.input.uniqueMechanism}\n\n`;
    md += `## 1. Creative Strategy & Psychology\n${brief.creativeHypothesis}\n\n`;
    md += `## 2. Tested Hook Variations (0:00 - 0:03)\n`;
    brief.hooks.forEach((h) => {
      md += `### Hook ${h.id}: ${h.archetype} (${h.estimatedRetentionBump})\n`;
      md += `- **Spoken:** "${h.hookScript}"\n`;
      md += `- **Visual:** ${h.visualCue}\n`;
      md += `- **Text Overlay:** ${h.onScreenText}\n`;
      md += `- **Audio/SFX:** ${h.audioSFX}\n\n`;
    });
    md += `## 3. Full Storyboard & Script (60s)\n`;
    brief.scriptBeats.forEach((b) => {
      md += `### [${b.timestamp}] ${b.beatName}\n`;
      md += `**Dialogue:** "${b.dialogue}"\n`;
      md += `**Visual Direction:** ${b.visualDirection}\n`;
      md += `**Psychology Trigger:** ${b.psychologyNote}\n\n`;
    });
    md += `## 4. Call-To-Action\n`;
    md += `**Dialogue:** "${brief.ctaOffer.dialogue}"\n`;
    md += `**On-Screen Overlay:** ${brief.ctaOffer.onScreenOverlay}\n`;
    md += `**Risk Reversal:** ${brief.ctaOffer.riskReversal}\n\n`;
    md += `## 5. Editor Guidelines\n`;
    brief.editorChecklist.forEach((c) => {
      md += `- [ ] ${c}\n`;
    });

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Header bar */}
      <div className="p-5 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
              ID: {brief.id}
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Generated: {brief.generatedAt}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              • {brief.input.tone}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {brief.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Targeting: <span className="text-zinc-200 font-medium">{brief.input.targetAudience}</span>
          </p>
        </div>

        {/* Action Button: Copy Markdown */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyBriefMarkdown}
            className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium border border-zinc-700 flex items-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Brief Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Full Brief (.md)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-[#0d0d12] px-4 overflow-x-auto text-xs font-mono">
        <button
          onClick={() => setActiveTab('hooks')}
          className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'hooks'
              ? 'border-purple-500 text-white bg-purple-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Eye className="w-4 h-4 text-purple-400" />
          3-Second Hooks ({brief.hooks.length})
        </button>

        <button
          onClick={() => setActiveTab('script')}
          className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'script'
              ? 'border-indigo-500 text-white bg-indigo-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Film className="w-4 h-4 text-indigo-400" />
          60s Shoot Script ({brief.scriptBeats.length} Beats)
        </button>

        <button
          onClick={() => setActiveTab('psychology')}
          className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'psychology'
              ? 'border-blue-500 text-white bg-blue-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Brain className="w-4 h-4 text-blue-400" />
          Psychology Profile
        </button>

        <button
          onClick={() => setActiveTab('editor')}
          className={`py-3 px-4 border-b-2 font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'editor'
              ? 'border-emerald-500 text-white bg-emerald-500/5'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Scissors className="w-4 h-4 text-emerald-400" />
          Editor Checklist
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5 sm:p-6">
        {activeTab === 'hooks' && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-center justify-between">
              <span>Test these 3 pattern interrupts against each other with ₹500 split ad sets.</span>
              <span className="font-mono text-[11px] text-purple-300">Expected 3s Hold Rate: 40%+</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {brief.hooks.map((hook) => (
                <div
                  key={hook.id}
                  className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/90 relative group hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                      Option {hook.id}: {hook.archetype}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {hook.estimatedRetentionBump}
                    </span>
                  </div>

                  <div className="my-2.5 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-sm font-medium text-white font-sans">
                    "{hook.hookScript}"
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mt-3 pt-3 border-t border-zinc-800/80 font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Visual Cue:</span>
                      <span className="text-zinc-300">{hook.visualCue}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">On-Screen Text:</span>
                      <span className="text-amber-300 font-semibold">{hook.onScreenText}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px] uppercase">Audio SFX:</span>
                      <span className="text-blue-300">{hook.audioSFX}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'script' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {brief.scriptBeats.map((beat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {beat.timestamp}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {beat.beatName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                      Beat #{idx + 1}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-100 font-normal leading-relaxed my-2 pl-3 border-l-2 border-indigo-500/40">
                    "{beat.dialogue}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mt-3 pt-2 border-t border-zinc-800/60">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block">Visual Direction:</span>
                      <span className="text-zinc-300">{beat.visualDirection}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase block">Psychology Target:</span>
                      <span className="text-purple-300">{beat.psychologyNote}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/30">
              <div className="text-xs font-mono uppercase text-purple-300 font-semibold mb-1">
                Frictionless CTA & Offer Box (0:45 - 0:60)
              </div>
              <div className="text-sm text-white font-medium mb-2">
                "{brief.ctaOffer.dialogue}"
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-300">
                  Overlay: {brief.ctaOffer.onScreenOverlay}
                </span>
                <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-emerald-300">
                  Guarantee: {brief.ctaOffer.riskReversal}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'psychology' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  Trigger: {brief.psychologyProfile.name}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  [{brief.psychologyProfile.tag}]
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {brief.psychologyProfile.description}
              </p>
              
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs">
                <span className="text-zinc-400 font-mono block uppercase text-[10px] mb-1">
                  Why This Specific Angle Converts:
                </span>
                <span className="text-zinc-200">
                  {brief.psychologyProfile.whyItConverts}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Creative Strategic Hypothesis
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {brief.creativeHypothesis}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-3">
            <p className="text-xs text-zinc-400 font-mono mb-2">
              Standard operating procedure for video editors cutting this asset:
            </p>
            {brief.editorChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300"
              >
                <div className="h-4 w-4 rounded border border-purple-500/50 bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] text-purple-300 font-bold">{idx + 1}</span>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
