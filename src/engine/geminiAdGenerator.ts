import { AdBriefInput, GeneratedAdBrief } from './adGenerator';
import { PSYCHOLOGY_TRIGGERS } from './psychology';

export async function generateAdWithGemini(
  input: AdBriefInput,
  apiKey?: string
): Promise<GeneratedAdBrief> {
  const activeKey =
    apiKey ||
    (typeof window !== 'undefined' && localStorage.getItem('aveon_gemini_key')) ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!activeKey) {
    throw new Error('Please configure your Gemini API Key in the AI Settings.');
  }

  const trigger = PSYCHOLOGY_TRIGGERS[input.primaryTrigger] || PSYCHOLOGY_TRIGGERS.lossAversion;

  const prompt = `You are the Executive Creative Director and Lead Performance Copywriter at AVEON, an elite AI-native media-tech studio. You craft high-retention video ad scripts for Indian D2C brands, creators, and performance marketing agencies.

Your goal: Produce an undeniable, ready-to-shoot creative brief that will stop thumbs in the first 3 seconds and convert high-intent buyers.

BRAND PARAMETERS:
- Brand Name: "${input.brandName}"
- Category: "${input.category}"
- Target Audience: "${input.targetAudience}"
- Daily Pain Point: "${input.coreProblem}"
- Unique Mechanism ("Secret Sauce"): "${input.uniqueMechanism}"
- Psychological Trigger: "${trigger.name}" (${trigger.description})
- Creative Tone: "${input.tone}"

STRICT NEGATIVE CONSTRAINTS (NEVER VIOLATE):
- BANNED CLICHÉS: "game-changer", "revolutionary", "dive into", "unleash", "tapestry", "seamlessly", "elevate", "delve", "look no further", "meet [Brand]".
- BANNED LAZY OPENINGS: NEVER start with "Are you tired of...", "Imagine if...", "What if I told you...", or "In today's fast-paced world...".
- The first 3 seconds must start IN MEDIAS RES (mid-action: throwing a failed product, tearing a receipt, sweating through a commute, eye-roll to front camera).

GOLD-STANDARD FEW-SHOT BENCHMARK:
Study this caliber of performance copy before generating:
- Hook 1: "I spent ₹7,500 on this designer bottle just to smell like absolutely nothing by my 11 AM Bandra meeting."
- Visual 1: "Front-camera raw handheld UGC; creator aggressively wipes sweat off neck and tosses a high-end clear bottle straight into a street dustbin."
- Overlay 1: "₹7,500 DOWN THE DRAIN 🗑️"
- Hook 2: "You're not paying for perfume—you are literally paying ₹500 per spray for 80% diluted alcohol that vanishes in 38-degree heat."
- Agitation Beat: "Most imported scents are formulated for 18°C European weather, not the intense humidity here. You douse yourself before leaving home, but two hours into your workday, the synthetic alcohol bonds snap in the heat."
- Mechanism Beat: "Aura Royale completely cut out standard alcohol dilution. They use Triple-Concentration French Oil Cold Extraction. Because the oil isn't heat-damaged during processing, heavy fragrance molecules physically cling to shirt fibers instead of evaporating."

OUTPUT FORMAT:
Respond ONLY with valid JSON in a \`\`\`json markdown codeblock:
\`\`\`json
{
  "title": "${input.brandName} × 3s Retention Ad Matrix",
  "creativeHypothesis": "2-sentence strategic breakdown of why this specific psychological angle and mechanism will beat standard ad fatigue for this audience.",
  "hooks": [
    {
      "id": 1,
      "archetype": "The Radical Skeptic (Disarming Ad Fatigue)",
      "hookScript": "Exact spoken words for first 3 seconds. Raw, conversational, punchy.",
      "visualCue": "Exact camera movement, actor expression, and physical action.",
      "onScreenText": "BOLD 3-5 word high-contrast text overlay.",
      "audioSFX": "Specific sound design cue (e.g. record stop + deep sub-bass drop).",
      "estimatedRetentionBump": "+46% 3s hold"
    },
    {
      "id": 2,
      "archetype": "The Flawed Industry Math (Exposing The Lie)",
      "hookScript": "Second spoken hook words exposing the hidden waste or cost.",
      "visualCue": "Second visual direction with physical contrast.",
      "onScreenText": "Second text overlay.",
      "audioSFX": "Second sound cue.",
      "estimatedRetentionBump": "+41% 3s hold"
    },
    {
      "id": 3,
      "archetype": "The Hostile Stress Test (Undeniable Proof)",
      "hookScript": "Third spoken hook words setting up a real-world hostile test.",
      "visualCue": "Third visual direction with stopwatch or time-lapse.",
      "onScreenText": "Third text overlay.",
      "audioSFX": "Third sound cue.",
      "estimatedRetentionBump": "+49% 3s hold"
    }
  ],
  "scriptBeats": [
    {
      "timestamp": "0:03 - 0:12",
      "beatName": "The Problem Agitation",
      "dialogue": "Visceral spoken dialogue agitating the exact daily annoyance.",
      "visualDirection": "Rapid jump-cuts showing real frustration with old alternatives.",
      "psychologyNote": "Why this emotionally validates the audience."
    },
    {
      "timestamp": "0:12 - 0:25",
      "beatName": "The Paradigm Shift / Mechanism",
      "dialogue": "Spoken dialogue breaking down the unique mechanism logically.",
      "visualDirection": "Macro 120fps texture shot showing product execution.",
      "psychologyNote": "The logical justification that disarms skepticism."
    },
    {
      "timestamp": "0:25 - 0:42",
      "beatName": "Proof of Transformation",
      "dialogue": "Verifiable proof and contrast comparison dialogue.",
      "visualDirection": "Split screen comparison: Without Brand vs With Brand.",
      "psychologyNote": "Social proof and contrast anchoring."
    },
    {
      "timestamp": "0:42 - 0:60",
      "beatName": "Frictionless Action & Offer",
      "dialogue": "Clear, direct call to action with incentive code.",
      "visualDirection": "Creator gesturing down with UI promo overlay flashing.",
      "psychologyNote": "Risk reversal and urgency."
    }
  ],
  "ctaOffer": {
    "dialogue": "Final spoken offer line with discount code.",
    "onScreenOverlay": "PROMO CODE / OFFER OVERLAY TEXT",
    "riskReversal": "Risk reversal guarantee description."
  },
  "editorChecklist": [
    "Cuts every 1.2 to 1.5 seconds max in first 10 seconds",
    "High-contrast captions (Yellow/White on black bounding box)",
    "Ducked background ambient synth track (-18dB under speech)",
    "Sub-bass hit on hook transition",
    "Export in 9:16 vertical ratio (1080x1920)"
  ]
}
\`\`\``;

  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash:generateContent?key=${activeKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${activeKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${activeKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${activeKey}`
  ];

  let lastError: any = null;

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Empty response from Gemini');
      }

      // Robust JSON extraction from markdown code block or braces
      const match = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/\{[\s\S]*\}/);
      const jsonStr = match ? (match[1] || match[0]) : rawText;
      const parsed = JSON.parse(jsonStr.trim());

      const generatedBrief: GeneratedAdBrief = {
        id: 'av-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        title: parsed.title || `${input.brandName} × Performance Ad Matrix`,
        generatedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        input,
        psychologyProfile: trigger,
        creativeHypothesis: parsed.creativeHypothesis || 'Engineered to break pattern fatigue and maximize hold rate.',
        hooks: parsed.hooks || [],
        scriptBeats: parsed.scriptBeats || [],
        ctaOffer: parsed.ctaOffer || {
          dialogue: 'Claim the private pilot link below.',
          onScreenOverlay: 'TAP LINK BELOW',
          riskReversal: '30-Day Satisfaction Guarantee',
        },
        editorChecklist: parsed.editorChecklist || [
          'Fast cuts under 1.5 seconds in opening',
          'Bold 9:16 high-contrast captions',
          'Ducked background synth track',
        ],
      };

      return generatedBrief;
    } catch (err: any) {
      lastError = err;
      console.warn(`Endpoint attempt failed:`, err.message);
    }
  }

  throw lastError || new Error('Failed to generate with Gemini AI');
}
