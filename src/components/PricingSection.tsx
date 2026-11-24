import React from 'react';
import { Check, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { TiltCard } from './TiltCard';

interface PricingSectionProps {
  onSelectPlan?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Starter Sprint',
      badge: 'Launch Tier',
      originalPrice: '₹3,499',
      discountPrice: '₹1,999',
      discountBadge: '43% OFF',
      period: 'per month',
      description: 'Ideal for individual creators and emerging brands testing their first batch of scroll-stopping ad hooks.',
      features: [
        '8 Ready-to-Shoot Creative Briefs/Mo',
        '3 Pattern-Interrupt Hooks per Concept (24 total hooks)',
        'Full 60s Shoot Scripts with spoken dialogue',
        'Visual Direction & B-Roll Shot Notes',
        'Standard Editor SOP & SFX Cue Checklist',
        '48-Hour Delivery via Notion or PDF'
      ],
      buttonText: 'Get Starter Sprint',
      highlighted: false,
      ctaHref: '#portal'
    },
    {
      name: 'Growth Engine',
      badge: 'Recommended',
      originalPrice: '₹9,999',
      discountPrice: '₹5,999',
      discountBadge: '40% OFF',
      period: 'per month',
      description: 'High-velocity creative testing engine for scaling D2C brands and performance agencies running weekly ad sets.',
      features: [
        '25 Ready-to-Shoot Creative Briefs/Mo (~6 briefs/week)',
        '3 Scroll-Stopping Hooks per Brief (75 tested hooks)',
        'Psychology Matrix (Loss Aversion, Skeptic, Us vs Them)',
        'Full 60s Shoot Scripts + On-Screen Text Overlays',
        'Editor Sound SFX & Pacing Cut Timestamps',
        '24-Hour Priority Delivery via WhatsApp / Notion',
        '1 Round of Creative Revisions per batch'
      ],
      buttonText: 'Scale Growth Engine',
      highlighted: true,
      ctaHref: '#portal'
    },
    {
      name: 'Scale Engine',
      badge: 'High Velocity',
      originalPrice: '₹24,999',
      discountPrice: '₹14,999',
      discountBadge: '40% OFF',
      period: 'per month',
      description: 'High-volume creative strategy for aggressive advertisers and agencies demanding rapid, daily hook iteration.',
      features: [
        '50 Ready-to-Shoot Creative Briefs/Mo (High-Volume Testing)',
        '3-5 Tested Hooks per Concept (150+ hook variations)',
        'Competitor Ad Outlier Teardowns in Your Niche',
        'Full 60s Storyboards with Exact Editing Cue Sheets',
        '24-Hour Express Turnaround',
        'Direct 1-on-1 WhatsApp Strategy Line with Shabd',
        'Bi-Weekly Creative Review & Iteration Sync'
      ],
      buttonText: 'Deploy Scale Engine',
      highlighted: false,
      ctaHref: '#portal'
    }
  ];

  return (
    <section id="pricing" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Predictable Creative Pricing
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Stop overpaying slow agencies ₹50,000+ for weak scripts. Get battle-tested, high-retention video briefs at unfair speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
          {plans.map((plan, idx) => (
            <TiltCard key={idx} className="rounded-2xl h-full flex flex-col" maxTilt={8}>
              <div
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative h-full ${
                  plan.highlighted
                    ? 'bg-zinc-900/90 border-2 border-purple-500/70 shadow-2xl shadow-purple-950/50'
                    : 'bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* Clean, Non-Clipped Top Tag for Highlighted Plan */}
                  {plan.highlighted && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                      <span>RECOMMENDED CHOICE</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {plan.badge}
                    </span>
                  </div>

                  {/* Price Display with Strikethrough & Discount Tag */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-base text-zinc-500 line-through font-mono">
                        {plan.originalPrice}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Tag className="w-3 h-3" />
                        {plan.discountBadge}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                        {plan.discountPrice}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        / {plan.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="pt-4 border-t border-zinc-800/80 mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-3">
                      Deliverable Outputs:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs text-zinc-300 flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={plan.ctaHref}
                  onClick={onSelectPlan}
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all mt-6 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
