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
    throw new Error('NO_API_KEY_FOUND');
  }

  const trigger = PSYCHOLOGY_TRIGGERS[input.primaryTrigger] || PSYCHOLOGY_TRIGGERS.lossAversion;

  const prompt = `You are the Executive Creative Director and Lead Performance Copywriter at AVEON, an elite AI-native media-tech studio.

Generate an innovative, highly original, scroll-stopping Creative Video Ad Brief based on the following brand specifications:
- Brand/Product Name: "${input.brandName}"
- Category: "${input.category}"
- Target Audience: "${input.targetAudience}"
- Core Daily Pain Point: "${input.coreProblem}"
- Unique Mechanism ("Secret Sauce"): "${input.uniqueMechanism}"
- Psychological Trigger: "${trigger.name}" (${trigger.description})
- Creative Tone: "${input.tone}"

STRICT CREATIVE GUIDELINES:
1. ZERO CLICHÉS: Banned words: "game-changer", "revolutionary", "dive into", "unleash", "tapestry", "meet X".
2. HOOKS (0:00 - 0:03): Write 3 distinct, unpredictable, scroll-stopping pattern interrupts. They must feel like a real human speaking with raw conviction (like a friend or skeptic), NOT an infomercial.
3. VISUAL DIRECTION: Be hyper-specific about shot types (e.g. "handheld phone camera, eye-level, sudden zoom-in", "split screen with high contrast color grade", "120fps macro shot showing product texture").
4. DIALOGUE: Visceral, punchy, conversational, and tailored to the audience (incorporate natural phrasing).
5. STRUCTURE: Exactly 4 sequential script beats covering:
   - 0:03 - 0:12: Problem Agitation (make the frustration tactile)
   - 0:12 - 0:25: The Paradigm Shift & Unique Mechanism Demo (show why traditional methods fail)
   - 0:25 - 0:42: Proof of Transformation (tangible, verifiable results)
   - 0:42 - 0:60: Frictionless Offer & Call to Action (clear risk-reversal)

Respond ONLY with valid JSON in this exact structure:
{
  "title": "${input.brandName} × Performance Ad Matrix",
  "creativeHypothesis": "Concise 2-sentence breakdown of why this specific psychological angle and mechanism will beat standard ad fatigue for this audience.",
  "hooks": [
    {
      "id": 1,
      "archetype": "Archetype Name (e.g. The Radical Skeptic, The Flawed Industry Math, The 24h Stress Test)",
      "hookScript": "The exact spoken words for the first 3 seconds.",
      "visualCue": "Exact camera movement, actor expression, and physical action.",
      "onScreenText": "BOLD 3-5 word high-contrast text overlay.",
      "audioSFX": "Specific sound design cue (e.g. record stop + deep sub bass drop).",
      "estimatedRetentionBump": "+45% hold rate"
    },
    {
      "id": 2,
      "archetype": "Second Archetype Name",
      "hookScript": "Second spoken hook words.",
      "visualCue": "Second visual direction.",
      "onScreenText": "Second text overlay.",
      "audioSFX": "Second sound cue.",
      "estimatedRetentionBump": "+38% hold rate"
    },
    {
      "id": 3,
      "archetype": "Third Archetype Name",
      "hookScript": "Third spoken hook words.",
      "visualCue": "Third visual direction.",
      "onScreenText": "Third text overlay.",
      "audioSFX": "Third sound cue.",
      "estimatedRetentionBump": "+49% hold rate"
    }
  ],
  "scriptBeats": [
    {
      "timestamp": "0:03 - 0:12",
      "beatName": "The Problem Agitation",
      "dialogue": "Spoken line agitating the problem.",
      "visualDirection": "Detailed camera and action direction.",
      "psychologyNote": "Why this triggers the target audience emotionally."
    },
    {
      "timestamp": "0:12 - 0:25",
      "beatName": "The Paradigm Shift / Mechanism",
      "dialogue": "Spoken line revealing the unique mechanism.",
      "visualDirection": "Product or software execution in action.",
      "psychologyNote": "Logical justification breaking past skepticism."
    },
    {
      "timestamp": "0:25 - 0:42",
      "beatName": "Proof of Transformation",
      "dialogue": "Verifiable proof line.",
      "visualDirection": "Visual proof comparison.",
      "psychologyNote": "Social proof and contrast anchoring."
    },
    {
      "timestamp": "0:42 - 0:60",
      "beatName": "Frictionless Action & Offer",
      "dialogue": "Call to action line.",
      "visualDirection": "Action pointing to link with offer overlay.",
      "psychologyNote": "Urgency and risk reversal."
    }
  ],
  "ctaOffer": {
    "dialogue": "Final spoken offer dialogue.",
    "onScreenOverlay": "PROMO CODE / OFFER OVERLAY TEXT",
    "riskReversal": "Risk reversal guarantee description."
  },
  "editorChecklist": [
    "Pacing cut requirement 1",
    "Caption typography guideline 2",
    "Audio mixing and background ducking rule 3",
    "Visual asset and sound effect cue 4",
    "Aspect ratio and color grade specification 5"
  ]
}`;

  const models = ['gemini-3.5-flash-lite', 'gemini-3.8-flash'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.85,
            topP: 0.95,
          },
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

      // Parse JSON from text
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

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
        creativeHypothesis: parsed.creativeHypothesis,
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
      console.warn(`Failed with model ${model}:`, err.message);
    }
  }

  throw lastError || new Error('Failed to generate with Gemini AI');
}
