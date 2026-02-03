import { NextResponse } from "next/server";
import { generateCarouselData } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { topic, useSearch } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    console.log(">>> Generation request received for topic:", topic, "with search:", useSearch);
    const data = await generateCarouselData(topic, useSearch);
    console.log(">>> Successfully generated data for:", topic);

    return NextResponse.json(data);
  } catch (error) {
    console.error(">>> Backend Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
