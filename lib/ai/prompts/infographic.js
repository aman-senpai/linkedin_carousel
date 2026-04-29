export const INFOGRAPHIC_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    theme: {
      type: "object",
      properties: {
        primary: { type: "string", description: "Primary brand hex color" },
        secondary: { type: "string", description: "Secondary brand hex color" },
        accent: { type: "string" },
        dark: { type: "string" },
        mode: { type: "string", enum: ["light", "dark", "glass"] }
      },
      required: ["primary", "secondary"]
    },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          color: { type: "string", description: "Primary hex color for this section" },
          bgColor: { type: "string", description: "Light pastel background hex" },
          layoutType: { type: "string", enum: ["grid", "horizontal", "staggered"] },
          nodes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                label: { type: "string" },
                icon: { type: "string", description: "Lucide icon name or Emoji" },
                description: { type: "string" }
              },
              required: ["id", "label"]
            }
          },
          connections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                from: { type: "string" },
                to: { type: "string" },
                label: { type: "string" },
                step: { type: "number" }
              },
              required: ["from", "to"]
            }
          }
        },
        required: ["id", "title", "color", "bgColor", "nodes"]
      }
    },
    caption: { type: "string" }
  },
  required: ["title", "theme", "sections", "caption"]
};

export const INFOGRAPHIC_SCHEMA_DESCRIPTION = `
You must return valid JSON matching this exact schema:
{
  "title": "string (2-5 word title)",
  "theme": {
    "primary": "hex color (e.g. #3b82f6)",
    "secondary": "hex color (e.g. #8b5cf6)",
    "accent": "hex color (e.g. #f59e0b)",
    "dark": "hex color (e.g. #0f172a)",
    "mode": "light" | "dark" | "glass"
  },
  "sections": [
    {
      "id": "string (e.g. section_1)",
      "title": "string (2-4 words)",
      "color": "hex color for this section",
      "bgColor": "light pastel background hex",
      "layoutType": "grid" | "horizontal" | "staggered",
      "nodes": [
        {
          "id": "string (e.g. node_1)",
          "label": "string (1-3 words max)",
          "icon": "Lucide icon name or Emoji",
          "description": "string (optional)"
        }
      ],
      "connections": [
        {
          "from": "node_1",
          "to": "node_2",
          "label": "string (optional)",
          "step": 1
        }
      ]
    }
  ],
  "caption": "LinkedIn post caption"
}`;

export function buildInfographicPrompt(topic) {
  return `
    As a Visual Storyteller and Infographic Designer, create a multi-section Bento-style infographic for the topic: "${topic}".

    BE VERSATILE: This is NOT just for CS/Tech. Use metaphors, relevant icons, and unique color palettes that match the mood of the topic.
    - If the topic is "Cooking", use kitchen icons and warm colors.
    - If the topic is "Business", use corporate blues/teals.
    - If the topic is "Philosophy", use deep purples and abstract icons.

    Schema Requirements:
    - theme: Generate a cohesive 3-color palette (primary, secondary, accent) and a mode.
    - sections: Group the story into 3 logical phases/categories.
      - layoutType: Choose the best arrangement for the nodes in that section.
      - nodes: Each node should have a label and a relevant Lucide icon name OR Emoji.
        Versatile icons to use: Heart, Star, Flame, Coffee, Briefcase, Camera, Music, Globe, Book, Pen, Lightbulb, etc.
      - connections: Describe the flow or relationships between nodes.

    RULES:
    - CONCISE TEXT: Node labels MUST be 1-3 words maximum to avoid cropping.
    - CONCISE TITLES: Section titles should be short (2-4 words).
    - Ensure node IDs stay consistent (e.g., node_1, node_2).
    - Step numbers in connections should represent a sequence.
    - The tone should be educational and engaging.
  `;
}
