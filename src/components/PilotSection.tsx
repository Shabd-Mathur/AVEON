import React, { useState } from 'react';
import { ShieldCheck, Check, Send, Building2 } from 'lucide-react';

export const PilotSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [agencyContact, setAgencyContact] = useState({
    agencyName: '',
    contactPerson: '',
    clientNiche: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="portal" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: The Offer */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B PARTNER PORTAL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Enterprise Creative Pilot Sprint
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              Designed for high-growth D2C brands and performance marketing agencies looking to 10x creative output, reduce testing fatigue, and lower blended acquisition costs.
            </p>

            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs sm:text-sm text-zinc-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>15 Tested Ad Briefs in 48 Hours:</strong> Stop waiting weeks for copywriters to draft concepts for your performance campaigns.</span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs sm:text-sm text-zinc-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tested Psychological Retention:</strong> 3 distinct 3-second hook variations per brief to systematically eliminate ad fatigue and high CPCs.</span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs sm:text-sm text-zinc-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero-Risk Pilot Terms:</strong> 14-day validation sprint to test our creative hold rates and turnaround against your current baseline.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
              <span>PILOT CAPACITY: SELECT PARTNERS ONLY</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">PRIORITY INTAKE ACTIVE</span>
            </div>
          </div>

          {/* Right Column: Quick Intake Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-1">
              Initiate Pilot Brief Intake
            </h3>
            <p className="text-xs text-zinc-400 mb-6 font-mono">
              AVEON Partner Portal
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white mb-1">Pilot Brief Dispatched</h4>
                <p className="text-xs text-emerald-300">
                  AVEON team will review your parameters and synthesize initial sample creative briefs within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Partner / Brand Name
                  </label>
                  <input
                    type="text"
                    value={agencyContact.agencyName}
                    onChange={(e) => setAgencyContact({ ...agencyContact, agencyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Apex Media or Brand Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Lead Partner Contact
                  </label>
                  <input
                    type="text"
                    value={agencyContact.contactPerson}
                    onChange={(e) => setAgencyContact({ ...agencyContact, contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Founder or Head of Marketing"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Target Brand / Niche
                  </label>
                  <input
                    type="text"
                    value={agencyContact.clientNiche}
                    onChange={(e) => setAgencyContact({ ...agencyContact, clientNiche: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. D2C Skincare, Fashion, B2B SaaS"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">
                    Campaign Notes & Goals
                  </label>
                  <textarea
                    rows={2}
                    value={agencyContact.notes}
                    onChange={(e) => setAgencyContact({ ...agencyContact, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-purple-500"
                    placeholder="What goals, target CPC, or ad fatigue issues are you solving?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Pilot Intake</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
