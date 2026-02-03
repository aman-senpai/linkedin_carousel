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
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `
    Create a highly engaging, visually distinctive LinkedIn carousel based on the following content source.
    
    CONTENT SOURCE:
    "${topic}"
    
    DESIGN STRATEGY:
    - MOOD: "${suggestedMood}"
    - TEMPLATE STYLE: "${suggestedTemplate}"
    ${useSearch ? '- SEARCH GROUNDING: Enabled. Use Google Search to fetch the latest, most accurate data, statistics, and facts for this topic. Cite sources if possible in the slides.' : ''}
    
    TEMPLATE CATEGORIES & VIBES:
    - COMICS: "marvel", "dc", "gotham", "spiderverse", "wakanda"
    - FUTURISTIC/TECH: "cyberpunk", "holographic", "matrix", "vaporwave"
    - NATURE: "ocean", "sunset", "forest", "sakura", "arctic", "volcanic"
    - LUXURY/CLASSIC: "golden", "vintage", "zen"
    - MODERN/BOLD: "modern", "brutalist", "pastel", "storm", "galaxy", "tokyo"

    CRITICAL: EVERY CAROUSEL MUST BE UNIQUE! 
    - Pick a template from the categories above that matches the topic industry.
    - Pick a color palette that fits the chosen template style.
    - Randomize slide type combinations (don't use the same sequence every time).
    - Vary layouts within each slide type.
    - OPTIMIZE SLIDE COUNT: Use between 8-15 slides depending on the depth of the topic.
    
    REQUIRED SLIDE STRUCTURE:
    Each slide in the "slides" array MUST be an object containing a "type" property and the specific fields for that type.

    AVAILABLE SLIDE TYPES (and their required fields):
    
    OPENERS:
    - { type: "cover", title, subtitle, tagline, author, variant: "centered"|"split"|"minimal" }
    
    CONTEXT:
    - { type: "intro", heading, text, stat, statDesc }
    - { type: "highlight", message, accent }
    
    DATA:
    - { type: "chart", heading, chartData: [4 values], labels: [4 labels], style: "bars"|"horizontal" }
    - { type: "chart-radial", heading, percentage, detail }
    - { type: "big-number", number, description, source }
    - { type: "stats-grid", heading, stats: [{ value, label }, ...] (2-4 items) }
    
    EXPLANATION:
    - { type: "infographic", heading, points: [{ t, d }, ...] (3 items) }
    - { type: "list-icons", heading, items: [{ icon, text }, ...] (4-5 items) }
    - { type: "process-flow", heading, steps: [4 steps] }
    - { type: "timeline", heading, events: [{ year, event }, ...] (3-4 items) }
    
    PROOF:
    - { type: "comparison", heading, left: [3 items], right: [3 items] }
    - { type: "quote", quote, cite, role }
    - { type: "testimonial", quote, name, role, company }
    
    CLOSERS:
    - { type: "summary", heading, steps: [3 key takeaways] }
    - { type: "cta", title, subtitle, button, handle: "@aman-senpai" }
    
    COLOR PALETTE REQUIREMENTS:
    Generate a harmonious 6-color palette (primary, secondary, accent, dark, light, text).
    
    Return ONLY a valid JSON object matching this structure:
    {
      "palette": {
        "primary": "#hex", "secondary": "#hex", "accent": "#hex", 
        "dark": "#hex", "light": "#hex", "text": "#hex", "textMuted": "#hex",
        "gradient": { "from": "#hex", "to": "#hex", "direction": "to-br" },
        "mood": "${suggestedMood}",
        "templateId": "${suggestedTemplate}"
      },
      "slides": [
        { "type": "cover", "title": "...", ... },
        { "type": "intro", "heading": "...", ... },
        ...
      ],
      "postTitle": "A professional 2-3 line heading...",
      "postCaption": "Human-like LinkedIn post caption..."
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    // Fallback if JSON mode fails or adds markdown blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to parse JSON from Gemini response.");
    data = JSON.parse(jsonMatch[0]);
  }

  // Backwards compatibility
  if (data.palette && !data.themeColor) {
    data.themeColor = data.palette.primary;
  }

  console.log(
    `>>> Generated: Mood=${data.palette?.mood}, Template=${data.palette?.templateId}, Color=${data.palette?.primary}`,
  );

  return data;
}
