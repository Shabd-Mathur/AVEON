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

  const prompt = `You are the Executive Creative Director and Lead Performance Copywriter at AVEON, an elite AI-native media-tech studio.

Generate an innovative, highly original, scroll-stopping Creative Video Ad Brief based on the following specifications:
- Brand Name: "${input.brandName}"
- Category: "${input.category}"
- Target Audience: "${input.targetAudience}"
- Daily Pain Point: "${input.coreProblem}"
- Unique Mechanism: "${input.uniqueMechanism}"
- Psychological Trigger: "${trigger.name}"
- Tone: "${input.tone}"

CREATIVE RULES:
1. NO corporate buzzwords ("game-changer", "revolutionary", "dive into", "unleash", "meet X").
2. Write 3 distinct, unpredictable, scroll-stopping pattern interrupts for the first 3 seconds (raw human conviction, not an infomercial).
3. Be hyper-specific about visual directions (exact phone angles, actions, lighting, and pacing cuts).
4. Dialogue must be punchy, visceral, and conversational.

Output ONLY valid JSON inside a \`\`\`json markdown codeblock with this exact structure:
\`\`\`json
{
  "title": "${input.brandName} × 3s Retention Ad Matrix",
  "creativeHypothesis": "2-sentence breakdown of why this specific angle converts for this audience.",
  "hooks": [
    {
      "id": 1,
      "archetype": "The Radical Skeptic",
      "hookScript": "exact spoken line for first 3 seconds",
      "visualCue": "camera angle and actor action",
      "onScreenText": "BOLD 3-word text overlay",
      "audioSFX": "sound effect name",
      "estimatedRetentionBump": "+45%"
    },
    {
      "id": 2,
      "archetype": "The Flawed Industry Math",
      "hookScript": "second exact spoken line",
      "visualCue": "action",
      "onScreenText": "text overlay",
      "audioSFX": "sound effect",
      "estimatedRetentionBump": "+40%"
    },
    {
      "id": 3,
      "archetype": "The 24h Stress Test",
      "hookScript": "third exact spoken line",
      "visualCue": "action",
      "onScreenText": "text overlay",
      "audioSFX": "sound effect",
      "estimatedRetentionBump": "+48%"
    }
  ],
  "scriptBeats": [
    {
      "timestamp": "0:03 - 0:12",
      "beatName": "The Problem Agitation",
      "dialogue": "Spoken line agitating problem.",
      "visualDirection": "Visual action.",
      "psychologyNote": "Why this triggers audience."
    },
    {
      "timestamp": "0:12 - 0:25",
      "beatName": "The Mechanism Demo",
      "dialogue": "Spoken line revealing mechanism.",
      "visualDirection": "Visual action.",
      "psychologyNote": "Logical justification."
    },
    {
      "timestamp": "0:25 - 0:42",
      "beatName": "Proof of Transformation",
      "dialogue": "Proof dialogue.",
      "visualDirection": "Visual proof comparison.",
      "psychologyNote": "Social proof."
    },
    {
      "timestamp": "0:42 - 0:60",
      "beatName": "Frictionless CTA",
      "dialogue": "Call to action dialogue.",
      "visualDirection": "Action pointing to link.",
      "psychologyNote": "Urgency and risk reversal."
    }
  ],
  "ctaOffer": {
    "dialogue": "Final spoken offer line.",
    "onScreenOverlay": "PROMO CODE TEXT",
    "riskReversal": "Risk reversal guarantee description."
  },
  "editorChecklist": ["Fast 1.2s cuts in opening", "High-contrast bold captions", "Audio ducking under speech"]
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
