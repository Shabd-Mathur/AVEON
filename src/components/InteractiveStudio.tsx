import React, { useState } from 'react';
import { generateAdBrief, GeneratedAdBrief, AdBriefInput } from '../engine/adGenerator';
import { generateAdWithGemini } from '../engine/geminiAdGenerator';
import { PSYCHOLOGY_TRIGGERS } from '../engine/psychology';
import { BriefCard } from './BriefCard';
import { Sparkles, Sliders, Play, RefreshCw, Wand2, Lightbulb, Cpu, Key, Check } from 'lucide-react';

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
  const [aiModelStatus, setAiModelStatus] = useState<string>('Gemini 3.5 Flash Active');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('aveon_gemini_key') || '' : ''));
  const [keySaved, setKeySaved] = useState(false);

  const saveKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aveon_gemini_key', customKey.trim());
      setKeySaved(true);
      setTimeout(() => {
        setKeySaved(false);
        setShowKeyModal(false);
      }, 1500);
    }
  };

  const handlePresetSelect = async (preset: typeof PRESETS[0]) => {
    setFormData(preset.data);
    setIsGenerating(true);
    setAiModelStatus('Synthesizing with Gemini 3.5 Flash...');
    try {
      const brief = await generateAdWithGemini(preset.data, customKey || undefined);
      setCurrentBrief(brief);
      setAiModelStatus('Gemini 3.5 Flash Active');
    } catch (err) {
      console.warn('Gemini generation fallback:', err);
      setCurrentBrief(generateAdBrief(preset.data));
      setAiModelStatus('Algorithmic Fallback Active');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setAiModelStatus('Synthesizing with Gemini 3.5 Flash...');
    try {
      const brief = await generateAdWithGemini(formData, customKey || undefined);
      setCurrentBrief(brief);
      setAiModelStatus('Gemini 3.5 Flash Active');
    } catch (err) {
      console.warn('Gemini generation fallback:', err);
      setCurrentBrief(generateAdBrief(formData));
      setAiModelStatus('Algorithmic Fallback Active');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="studio" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>AI ENGINE: GOOGLE GEMINI 3.5 FLASH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Creative Brief Studio
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Connected to Google Gemini 3.5 Flash. Generates bespoke, scroll-stopping 3-second hooks, 60-second shoot scripts, and video director cues for any brand in seconds.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>TEST WITH 1-CLICK PRESETS (GENERATES LIVE VIA GEMINI):</span>
            </div>

            <button
              onClick={() => setShowKeyModal(!showKeyModal)}
              className="text-[11px] font-mono text-zinc-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800"
            >
              <Key className="w-3 h-3 text-purple-400" />
              <span>AI Model Key</span>
            </button>
          </div>

          {/* Key Modal */}
          {showKeyModal && (
            <div className="mb-6 p-4 rounded-xl bg-zinc-900/90 border border-purple-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                  <Key className="w-3.5 h-3.5 text-purple-400" />
                  Google Gemini API Configuration
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">STORED IN BROWSER</span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3">
                Pre-configured with your active Gemini 3.5 Flash key. You can update it or leave it as default.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="AQ.Ab8RN6IC8malfqW_edT_P0g..."
                  className="flex-grow px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={saveKey}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all"
                >
                  {keySaved ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{keySaved ? 'Saved!' : 'Save Key'}</span>
                </button>
              </div>
            </div>
          )}

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
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Gemini 3.5 Flash Generating Creative Brief...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-purple-200" />
                    <span>Generate with Gemini 3.5 Flash</span>
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
                <h4 className="text-base font-bold text-white mb-2">Live AI Studio Ready</h4>
                <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
                  Fill in the parameters on the left or select a preset above. Powered by Google Gemini 3.5 Flash to generate 100% bespoke, scroll-stopping hooks and shoot scripts.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>GEMINI 3.5 FLASH • ENGINE ONLINE</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
