import { NextResponse } from "next/server";
import { getProvider } from "@/lib/ai/provider-registry";
import { buildCarouselPrompt, MOOD_OPTIONS, TEMPLATE_OPTIONS } from "@/lib/ai/prompts/carousel";

export async function POST(request) {
  try {
    const { topic, useSearch, provider: providerId, model } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const provider = getProvider(providerId);
    const modelId = model || provider.defaultModel;

    const mood = MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)];
    const template = TEMPLATE_OPTIONS[Math.floor(Math.random() * TEMPLATE_OPTIONS.length)];

    const prompt = buildCarouselPrompt(topic, useSearch, mood, template);

    console.log(`>>> Generating carousel with ${provider.id}/${modelId} for: ${topic}`);
    const result = await provider.generateText({
      model: modelId,
      prompt,
      useSearch: !!useSearch,
      jsonMode: true,
    });

    let data;
    try {
      data = JSON.parse(result.text);
    } catch (e) {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Failed to parse JSON from AI response.");
      data = JSON.parse(jsonMatch[0]);
    }

    if (data.palette && !data.themeColor) {
      data.themeColor = data.palette.primary;
    }

    console.log(
      `>>> Generated: Mood=${data.palette?.mood}, Template=${data.palette?.templateId}, Color=${data.palette?.primary}`,
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(">>> Backend Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
