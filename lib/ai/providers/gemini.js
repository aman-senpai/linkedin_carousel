import { GoogleGenerativeAI } from "@google/generative-ai";

export const provider = {
  id: "gemini",
  name: "Google Gemini",
  models: [
    { id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview", supportsSearch: true },
    { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", supportsSearch: true },
  ],
  defaultModel: "gemini-3-flash-preview",
  supportsGrounding: true,
  supportsStructuredOutput: true,

  async generateText({ model, prompt, systemPrompt, useSearch, jsonMode, jsonSchema }) {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey || apiKey.length < 10) {
      throw new Error("GOOGLE_GEMINI_API_KEY is missing or invalid in .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const tools = useSearch ? [{ googleSearch: {} }] : [];

    const generationConfig = {};
    if (jsonSchema) {
      generationConfig.responseMimeType = "application/json";
      generationConfig.responseSchema = jsonSchema;
    } else if (jsonMode) {
      generationConfig.responseMimeType = "application/json";
    }

    const geminiModel = genAI.getGenerativeModel({
      model,
      tools,
      ...(Object.keys(generationConfig).length > 0 && { generationConfig }),
    });

    // Gemini SDK doesn't natively separate system prompt; prepend if provided
    const fullPrompt = systemPrompt
      ? `[System Instructions]\n${systemPrompt}\n\n[User Content]\n${prompt}`
      : prompt;

    const result = await geminiModel.generateContent(fullPrompt);
    const response = await result.response;
    return { text: response.text() };
  },
};
