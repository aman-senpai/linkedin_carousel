import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai/provider-registry";
import {
  buildInfographicPrompt,
  INFOGRAPHIC_SCHEMA,
  INFOGRAPHIC_SCHEMA_DESCRIPTION,
} from "@/lib/ai/prompts/infographic";

export async function POST(request) {
  try {
    const { topic, provider: providerId, model } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const provider = getProvider(providerId);
    const modelId = model || provider.defaultModel;
    const prompt = buildInfographicPrompt(topic);

    console.log(`>>> Generating infographic with ${provider.id}/${modelId} for: ${topic}`);

    let result;
    if (provider.supportsStructuredOutput) {
      result = await provider.generateText({
        model: modelId,
        prompt,
        jsonMode: true,
        jsonSchema: INFOGRAPHIC_SCHEMA,
      });
    } else {
      result = await provider.generateText({
        model: modelId,
        prompt,
        systemPrompt: INFOGRAPHIC_SCHEMA_DESCRIPTION,
        jsonMode: true,
      });
    }

    let data;
    try {
      data = JSON.parse(result.text);
    } catch (e) {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse JSON from AI response.");
      data = JSON.parse(jsonMatch[0]);
    }

    if (Array.isArray(data)) {
      data = data[0];
    }

    if (!data.title || !data.theme || !data.sections) {
      throw new Error("Response missing required fields: title, theme, sections");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(">>> Infographic Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
