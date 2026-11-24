import { PSYCHOLOGY_TRIGGERS, HOOK_FORMULAS, PsychologyTrigger } from './psychology';

export interface AdBriefInput {
  brandName: string;
  category: 'D2C Consumer' | 'SaaS & Tech' | 'Local Business & Agency' | 'Creator & Course';
  targetAudience: string;
  coreProblem: string;
  uniqueMechanism: string;
  primaryTrigger: string;
  tone: 'Raw UGC Phone Style' | 'High-End Minimalist' | 'Aggressive Founder Teardown';
}

export interface AdHookOutput {
  id: number;
  archetype: string;
  hookScript: string;
  visualCue: string;
  onScreenText: string;
  audioSFX: string;
  estimatedRetentionBump: string;
}

export interface AdScriptBeat {
  timestamp: string;
  beatName: string;
  dialogue: string;
  visualDirection: string;
  psychologyNote: string;
}

export interface GeneratedAdBrief {
  id: string;
  title: string;
  generatedAt: string;
  input: AdBriefInput;
  psychologyProfile: PsychologyTrigger;
  creativeHypothesis: string;
  hooks: AdHookOutput[];
  scriptBeats: AdScriptBeat[];
  ctaOffer: {
    dialogue: string;
    onScreenOverlay: string;
    riskReversal: string;
  };
  editorChecklist: string[];
}

export function generateAdBrief(input: AdBriefInput): GeneratedAdBrief {
  const trigger = PSYCHOLOGY_TRIGGERS[input.primaryTrigger] || PSYCHOLOGY_TRIGGERS.lossAversion;
  const brand = input.brandName || 'Your Brand';
  const problem = input.coreProblem || 'the recurring daily bottleneck';
  const mechanism = input.uniqueMechanism || 'the proprietary 3-step formula';
  const audience = input.targetAudience || 'high-intent consumers';

  // Generate 3 unique hooks based on formulas
  const hooks: AdHookOutput[] = HOOK_FORMULAS.slice(0, 3).map((formula, idx) => {
    const formatted = formula.template(brand, problem, mechanism);
    const overlays = [
      `DO NOT BUY BEFORE WATCHING THIS ⚠️`,
      `Stop doing this with ${problem.slice(0, 25)}...`,
      `₹499 vs ₹5,000 test: exposed 📉`,
    ];

    return {
      id: idx + 1,
      archetype: formula.archetype,
      hookScript: formatted.hookText,
      visualCue: formatted.visualDirection,
      onScreenText: overlays[idx] || 'WAIT FOR THE RESULTS 👀',
      audioSFX: formatted.audioSFX,
      estimatedRetentionBump: idx === 0 ? '+42% at 3s' : idx === 1 ? '+38% at 3s' : '+47% at 3s',
    };
  });

  // Build the script beats
  const scriptBeats: AdScriptBeat[] = [
    {
      timestamp: '0:03 - 0:12',
      beatName: 'The Problem Agitation',
      dialogue: `Most people trying to solve ${problem} make one fatal mistake: they double down on generic methods that treat the symptom, not the root cause. If you're a ${audience}, you already know how exhausting that cycle is.`,
      visualDirection: 'Rapid 0.8s jump cuts of the user looking stressed or frustrated with the failed traditional alternative. Dark, desaturated color grading.',
      psychologyNote: 'Agitates the emotional pain threshold; triggers personal identification in the target audience.',
    },
    {
      timestamp: '0:12 - 0:24',
      beatName: 'The Paradigm Shift / Mechanism',
      dialogue: `That's exactly why ${brand} changed the game. Instead of relying on old-school tactics, it deploys ${mechanism}. Watch what happens when we put it under real-world conditions.`,
      visualDirection: 'Lighting instantly brightens to clean daylight. Macro extreme close-up of ${brand} in action. High-speed 120fps product texture / software execution shot.',
      psychologyNote: 'Presents the "Secret Mechanism"—the logical reason why this solution will succeed where past attempts failed.',
    },
    {
      timestamp: '0:24 - 0:42',
      beatName: 'Proof of Transformation',
      dialogue: `Within the first test run, you immediately notice the difference. No complicated setup, no wasted budget. Just raw, verifiable output that cuts your friction by at least 70%.`,
      visualDirection: 'Split screen comparison: "Without ' + brand + '" (slow, frustrating, red tint) vs "With ' + brand + '" (seamless, fast, clean glow). Quick testimonial quote cards flashing.',
      psychologyNote: 'Anchoring & Social Validation: makes the transformation visual and self-evident without sounding like a sleazy infomercial.',
    },
    {
      timestamp: '0:42 - 0:52',
      beatName: 'Frictionless Action & Offer',
      dialogue: `If you want to permanently fix ${problem} without risking a single rupee, grab ${brand} right now from the link below while the initial batch is still active.`,
      visualDirection: 'Creator points downwards with high energy. Clear UI mockup of the purchase or signup screen showing the limited incentive code.',
      psychologyNote: 'Direct, clear call-to-action backed by urgency and risk reversal.',
    }
  ];

  return {
    id: 'av-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    title: `${brand} × Performance Ad Matrix (${input.category})`,
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    input,
    psychologyProfile: trigger,
    creativeHypothesis: `For ${audience}, traditional ads trigger instant defensive fatigue. By leading with ${trigger.name} and contrasting the flawed status quo against "${mechanism}", we bypass standard ad blindness and maximize initial 3-second hold rate.`,
    hooks,
    scriptBeats,
    ctaOffer: {
      dialogue: `Tap the link below, apply code AVEON20 for the private pilot discount, and test it risk-free.`,
      onScreenOverlay: `TAP LINK BELOW • 100% MONEY-BACK GUARANTEE`,
      riskReversal: `Full 30-Day No-Questions-Asked Satisfaction Guarantee`,
    },
    editorChecklist: [
      'Cuts every 1.2 to 1.8 seconds max in first 10 seconds (high rhythm)',
      'Large high-contrast captions (Yellow/White on black bounding box)',
      'Subtle trending ambient lofi/synth track in background (ducked 18dB under speech)',
      'Sound design on every visual shift (whoosh, hit, pop, shutter)',
      'Export in 9:16 vertical ratio at 1080x1920 (Instagram Reels / TikTok / YouTube Shorts)',
    ]
  };
}
