import { GoogleGenerativeAI } from "@google/generative-ai";

// System randomization options
const MOOD_OPTIONS = [
  "corporate",
  "creative",
  "minimal",
  "bold",
  "playful",
  "elegant",
  "tech",
];
const TEMPLATE_OPTIONS = [
  "modern", "marvel", "dc", "gotham", "spiderverse", "wakanda", "asgard",
  "cyberpunk", "synthwave", "ocean", "sunset", "galaxy", "tokyo",
  "forest", "golden", "arctic", "volcanic", "sakura", "storm",
  "vintage", "holographic", "zen", "brutalist", "pastel", "matrix", "vaporwave"
];

export async function generateCarouselData(topic, useSearch = false) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey || apiKey.length < 10) {
    throw new Error(
      "GOOGLE_GEMINI_API_KEY is missing or invalid in .env file.",
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Random system preferences for variety
  const suggestedMood =
    MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)];
  const suggestedTemplate =
    TEMPLATE_OPTIONS[Math.floor(Math.random() * TEMPLATE_OPTIONS.length)];

  // Grounding configuration
  const tools = useSearch ? [{ googleSearch: {} }] : [];

  // Use Gemini 3 Flash Preview
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    tools,
  });

  const prompt = `
    Create a highly engaging, visually distinctive LinkedIn carousel based on the following content source:
    
    CONTENT SOURCE:
    "${topic}"
    
    DESIGN STRATEGY:
    - MOOD: "${suggestedMood}"
    - TEMPLATE STYLE: "${suggestedTemplate}"
    ${useSearch ? '- SEARCH GROUNDING: Enabled. Use Google Search to fetch the latest, most accurate data, statistics, and facts for this topic. Cite sources if possible in the slides.' : ''}
    
    TEMPLATE CATEGORIES & VIBES:
    - COMICS: "marvel", "dc", "gotham", "spiderverse", "wakanda" (Bold, colorful, dramatic, halftone/glitch effects)
    - FUTURISTIC/TECH: "cyberpunk", "holographic", "matrix", "vaporwave" (Neon, digital, lines, glowing effects)
    - NATURE: "ocean", "sunset", "forest", "sakura", "arctic", "volcanic" (Organic, flowy, environmental patterns)
    - LUXURY/CLASSIC: "golden", "vintage", "zen" (Premium, textured, clean, sophisticated)
    - MODERN/BOLD: "modern", "brutalist", "pastel", "storm", "galaxy", "tokyo" (High energy, gradients, unique layouts)

    CRITICAL: EVERY CAROUSEL MUST BE UNIQUE! 
    - Pick a template from the categories above that matches the topic industry.
    - Pick a color palette that fits the chosen template style.
    - Randomize slide type combinations (don't use the same sequence every time).
    - Vary layouts within each slide type.
    - OPTIMIZE SLIDE COUNT: Use between 8-15 slides depending on the depth of the topic.
    
    AVAILABLE SLIDE TYPES:
    
    OPENERS:
    - "cover": { title, subtitle, tagline, author, variant: "centered"|"split"|"minimal" }
    
    CONTEXT:
    - "intro": { heading, text, stat, statDesc }
    - "highlight": { message, accent }
    
    DATA:
    - "chart": { heading, chartData: [4 values], labels: [4 labels], style: "bars"|"horizontal" }
    - "chart-radial": { heading, percentage, detail }
    - "big-number": { number, description, source }
    - "stats-grid": { heading, stats: [{ value, label }, ...] (2-4 items) }
    
    EXPLANATION:
    - "infographic": { heading, points: [{ t, d }, ...] (3 items) }
    - "list-icons": { heading, items: [{ icon, text }, ...] (4-5 items) }
    - "process-flow": { heading, steps: [4 steps] }
    - "timeline": { heading, events: [{ year, event }, ...] (3-4 items) }
    
    PROOF:
    - "comparison": { heading, left: [3], right: [3] }
    - "quote": { quote, cite, role }
    - "testimonial": { quote, name, role, company }
    
    CLOSERS:
    - "summary": { heading, steps: [3 key takeaways] }
    - "cta": { title, subtitle, button, handle: "@aman-senpai" }
    
    COLOR PALETTE REQUIREMENTS:
    Generate a harmonious 6-color palette (primary, secondary, accent, dark, light, text).
    
    Return ONLY a valid JSON object:
    {
      "palette": {
        "primary": "#hex", "secondary": "#hex", "accent": "#hex", 
        "dark": "#hex", "light": "#hex", "text": "#hex", "textMuted": "#hex",
        "gradient": { "from": "#hex", "to": "#hex", "direction": "to-br" },
        "mood": "${suggestedMood}",
        "templateId": "${suggestedTemplate}"
      },
      "slides": [
        // Flexible slide count
      ],
      "postTitle": "A professional 2-3 line heading...",
      "caption": "Human-like LinkedIn post caption..."
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse JSON from Gemini response.");

  const data = JSON.parse(jsonMatch[0]);

  // Backwards compatibility
  if (data.palette && !data.themeColor) {
    data.themeColor = data.palette.primary;
  }

  console.log(
    `>>> Generated: Mood=${data.palette?.mood}, Template=${data.palette?.template}, Color=${data.palette?.primary}`,
  );

  return data;
}
