
import { generateCarouselData } from "./lib/gemini.js";

async function run() {
  const topic = "The Future of AI Video: From Sora to Real-time Generation";
  console.log("Generating carousel for:", topic);
  try {
    const data = await generateCarouselData(topic, true);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Generation failed:", error);
  }
}

run();
