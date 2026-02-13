import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      throw new Error("GOOGLE_GEMINI_API_KEY is missing or invalid in .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
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
        }
      },
    });

    const prompt = `
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

    console.log(">>> Versatile ByteGen Bento request for:", topic);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        data = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON from Gemini response.");
      }
    }

    if (Array.isArray(data)) {
      data = data[0];
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(">>> ByteGen Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
