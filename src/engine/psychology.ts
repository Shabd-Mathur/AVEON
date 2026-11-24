export interface PsychologyTrigger {
  id: string;
  name: string;
  tag: string;
  description: string;
  whyItConverts: string;
}

export const PSYCHOLOGY_TRIGGERS: Record<string, PsychologyTrigger> = {
  lossAversion: {
    id: 'lossAversion',
    name: 'Loss Aversion & Regret Prevention',
    tag: 'Fear of Bad Buys',
    description: 'Human psychology fears losing 2x more than winning. Highlights the hidden cost of staying with current solutions.',
    whyItConverts: 'Stops the scroll by making the viewer feel they are actively losing money, time, or skin health every day they delay.',
  },
  curiosityGap: {
    id: 'curiosityGap',
    name: 'Information Gap & Cognitive Dissonance',
    tag: 'Open Loop',
    description: 'Creates a sharp contrast between what the viewer expects and what is actually true, forcing them to watch until the loop is closed.',
    whyItConverts: 'Retention rate increases 35-50% in the first 8 seconds because the brain physically craves closure.',
  },
  usVsThem: {
    id: 'usVsThem',
    name: 'Us vs. The Industry Giants',
    tag: 'Tribal Identity',
    description: 'Positions the user and the brand against overpriced, slow legacy incumbents who exploit consumer ignorance.',
    whyItConverts: 'Instantly builds high-trust affinity by validating the customer\'s past frustrations as not their fault.',
  },
  relatableSkeptic: {
    id: 'relatableSkeptic',
    name: 'The Honest Skeptic Teardown',
    tag: 'Radical Transparency',
    description: 'The presenter starts by doubting the product or admitting they thought it was total marketing hype, then proves themselves wrong.',
    whyItConverts: 'Disarms ad fatigue immediately. When you admit initial skepticism, viewers drop their guard.',
  },
  statusSignaling: {
    id: 'statusSignaling',
    name: 'Elite Status & Frictionless Ease',
    tag: 'High Status',
    description: 'Shows that smart, high-performing individuals already upgraded to this method while everyone else is still doing it the hard way.',
    whyItConverts: 'Appeals to aspirational desire and social standing rather than just utility.',
  }
};

export interface HookFormula {
  archetype: string;
  pacingSeconds: string;
  template: (brand: string, pain: string, mechanism: string) => {
    hookText: string;
    visualDirection: string;
    audioSFX: string;
  };
}

export const HOOK_FORMULAS: HookFormula[] = [
  {
    archetype: 'The Harsh Reality Check (Stop Doing X)',
    pacingSeconds: '0:00 - 0:03',
    template: (brand, pain, mechanism) => ({
      hookText: `If you are still struggling with ${pain}, stop scrolling—you're doing it completely backwards.`,
      visualDirection: 'Hand slaps camera down or quick zoom into frantic expression holding the failed old alternative. Sharp motion blur.',
      audioSFX: 'Sub-bass drop + vinyl stop scratch',
    })
  },
  {
    archetype: 'The Radical Skeptic (I thought this was cap)',
    pacingSeconds: '0:00 - 0:03',
    template: (brand, pain, mechanism) => ({
      hookText: `I genuinely thought ${brand} was pure Instagram marketing fluff... until I tested it against ${pain}.`,
      visualDirection: 'Eye roll directly into front-facing camera, throwing package onto desk casually. Zero polished lighting—raw UGC phone look.',
      audioSFX: 'Muffled whoosh + organic room ambiance',
    })
  },
  {
    archetype: 'The Hidden Industry Flaw (Exposing the Lie)',
    pacingSeconds: '0:00 - 0:03',
    template: (brand, pain, mechanism) => ({
      hookText: `Legacy brands charge you 5x more just to hide the fact that they don't solve ${pain}. Here's the actual math.`,
      visualDirection: 'Fast split screen: Left side shows generic overpriced product with red "X", Right side zooms into the ${mechanism}. Text pop: "THE 5X TAX".',
      audioSFX: 'Digital glitch + register ding',
    })
  },
  {
    archetype: 'The 24-Hour Stress Test',
    pacingSeconds: '0:00 - 0:03',
    template: (brand, pain, mechanism) => ({
      hookText: `Can ${brand} actually eliminate ${pain} in literally 48 hours? Let's find out live.`,
      visualDirection: 'Digital stopwatch overlay counting down fast from 48:00:00 with rapid day-to-night time-lapse cuts.',
      audioSFX: 'Fast clock ticking + bass riser',
    })
  }
];
