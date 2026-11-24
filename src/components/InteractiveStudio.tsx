import React, { useState } from 'react';
import { generateAdBrief, GeneratedAdBrief, AdBriefInput } from '../engine/adGenerator';
import { PSYCHOLOGY_TRIGGERS } from '../engine/psychology';
import { BriefCard } from './BriefCard';
import { Sparkles, Sliders, Play, RefreshCw, Wand2, Lightbulb } from 'lucide-react';

export const InteractiveStudio: React.FC = () => {
  const PRESETS: { label: string; description: string; data: AdBriefInput }[] = [
    {
      label: 'D2C Luxury Fragrance',
      description: 'Long-lasting luxury perfume targeting festive and evening wear',
      data: {
        brandName: 'Aura Royale Perfumes',
        category: 'D2C Consumer',
        targetAudience: 'Young professionals & event attendees (18-32)',
        coreProblem: 'Expensive designer perfumes fading within 2 hours in warm humidity',
        uniqueMechanism: 'Triple-Concentration French Oil Cold Extraction (16-Hour Stay)',
        primaryTrigger: 'lossAversion',
        tone: 'Raw UGC Phone Style'
      }
    },
    {
      label: 'AI Automation Agency',
      description: 'B2B enterprise pipeline automating customer lead capture',
      data: {
        brandName: 'AVEON Automations',
        category: 'Local Business & Agency',
        targetAudience: 'Business owners and high-volume retail merchants',
        coreProblem: 'Paying high monthly payroll to staff who miss following up on warm leads',
        uniqueMechanism: '24/7 Autonomous AI agent that qualifies and books leads instantly',
        primaryTrigger: 'usVsThem',
        tone: 'Aggressive Founder Teardown'
      }
    },
    {
      label: 'Gen Z Acne Patch (Skincare)',
      description: 'Quick-fix micro-dart patches for immediate skin recovery',
      data: {
        brandName: 'ClearStrike Skin',
        category: 'D2C Consumer',
        targetAudience: 'Gen Z and students facing unexpected breakout anxiety',
        coreProblem: 'Waking up with a prominent pimple hours before a major event',
        uniqueMechanism: 'Self-dissolving Salicylic & Tea Tree Micro-Darts',
        primaryTrigger: 'relatableSkeptic',
        tone: 'Raw UGC Phone Style'
      }
    }
  ];

  const emptyForm: AdBriefInput = {
    brandName: '',
    category: 'D2C Consumer',
    targetAudience: '',
    coreProblem: '',
    uniqueMechanism: '',
    primaryTrigger: 'lossAversion',
    tone: 'Raw UGC Phone Style'
  };

  const [formData, setFormData] = useState<AdBriefInput>(emptyForm);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentBrief, setCurrentBrief] = useState<GeneratedAdBrief | null>(null);

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setFormData(preset.data);
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentBrief(generateAdBrief(preset.data));
      setIsGenerating(false);
    }, 400);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setCurrentBrief(generateAdBrief(formData));
      setIsGenerating(false);
    }, 500);
  };

  return (
    <section id="studio" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AVEON ADS LIVE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Creative Brief Studio
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Test the engine live. Input any client parameters or choose a quick preset to generate 3 scroll-stopping hooks, a 60-second shoot script, and video director cues.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-zinc-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>QUICK PRESETS (CLICK TO AUTO-FILL & TEST):</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  formData.brandName === preset.data.brandName
                    ? 'bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-900/20'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                <div className="text-xs font-bold text-white mb-1 flex items-center justify-between">
                  {preset.label}
                  {formData.brandName === preset.data.brandName && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      LOADED
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-400 line-clamp-1">
                  {preset.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Creative Parameters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => { setFormData(emptyForm); setCurrentBrief(null); }}
                className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Clear Form
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Brand or Product Name
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                  placeholder="e.g. Aura Royale"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  >
                    <option value="D2C Consumer">D2C Consumer</option>
                    <option value="SaaS & Tech">SaaS & Tech</option>
                    <option value="Local Business & Agency">Local / Agency</option>
                    <option value="Creator & Course">Creator & Course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                    Creative Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  >
                    <option value="Raw UGC Phone Style">Raw UGC Phone</option>
                    <option value="High-End Minimalist">Minimalist</option>
                    <option value="Aggressive Founder Teardown">Founder Teardown</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-sans"
                  placeholder="e.g. Young professionals, founders, college students"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Core Pain Point to Attack
                </label>
                <textarea
                  rows={2}
                  value={formData.coreProblem}
                  onChange={(e) => setFormData({ ...formData, coreProblem: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-sans"
                  placeholder="What is the recurring daily frustration or wasted expense?"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Unique Mechanism (The "Secret Sauce")
                </label>
                <input
                  type="text"
                  value={formData.uniqueMechanism}
                  onChange={(e) => setFormData({ ...formData, uniqueMechanism: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-all font-sans"
                  placeholder="e.g. Cold extraction formula, autonomous AI router"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                  Core Psychological Trigger
                </label>
                <select
                  value={formData.primaryTrigger}
                  onChange={(e) => setFormData({ ...formData, primaryTrigger: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                >
                  {Object.entries(PSYCHOLOGY_TRIGGERS).map(([key, trig]) => (
                    <option key={key} value={key}>
                      {trig.name} ({trig.tag})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing Ad Psychology...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-purple-200" />
                    <span>Generate Creative Brief</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Viewer (7 cols) */}
          <div className="lg:col-span-7">
            {currentBrief ? (
              <BriefCard brief={currentBrief} />
            ) : (
              <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm min-h-[420px] flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">Ad Studio Ready</h4>
                <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
                  Fill in the parameters on the left or select a preset above to generate 3 scroll-stopping hooks, a 60-second shoot script, and editor cues.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  <span>ENGINE ONLINE • READY FOR INPUT</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
