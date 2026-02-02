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
const TEMPLATE_OPTIONS = ["classic", "bold", "minimal", "modern", "geometric"];

export async function generateCarouselData(topic) {
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

  // Stable and widely available model
  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
  });

  const prompt = `
    Create a highly engaging, visually distinctive LinkedIn carousel based on the following content source:
    
    CONTENT SOURCE:
    "${topic}"
    
    DESIGN STRATEGY:
    - MOOD: "${suggestedMood}"
    - TEMPLATE STYLE: "${suggestedTemplate}"
    
    TEMPLATE STYLE DEFINITIONS:
    - "classic": Professional, well-structured, standard headers and cards.
    - "bold": Massive typography, heavy color blocks, high contrast, aggressive borders.
    - "minimal": Elegant whitespace, thin lines, subtle gradients, sophisticated typography.
    - "modern": Glassmorphism hints, organic shapes, fluid transitions, tech-forward.
    - "geometric": Sharp angles, grid-based layouts, overlapping shapes, structured chaos.

    CRITICAL: EVERY CAROUSEL MUST BE UNIQUE! 
    - Pick a color palette that matches the topic industry AND the chosen template style.
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
        "template": "${suggestedTemplate}"
      },
      "slides": [
        // Flexible slide count, must start with 'cover' and end with 'cta'
        // Aim for comprehensive coverage (8-15 slides)
      ],
      "postTitle": "A professional 2-3 line heading for LinkedIn with 2-5 hashtags. NO EMOJIS. Minimal and human-like.",
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
