import { GoogleGenerativeAI } from "@google/generative-ai";

async function testGemini() {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_GEMINI_API_KEY not found in environment.");
    return;
  }
  console.log("Testing with key:", apiKey.substring(0, 10) + "...");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  try {
    const result = await model.generateContent("Hello!");
    const response = await result.response;
    console.log("Success! Response:", response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testGemini();
