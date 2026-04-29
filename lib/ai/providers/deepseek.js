export const provider = {
  id: "deepseek",
  name: "DeepSeek",
  models: [
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsThinking: true },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsThinking: true },
  ],
  defaultModel: "deepseek-v4-flash",
  supportsGrounding: false,
  supportsStructuredOutput: false,

  async generateText({ model, prompt, systemPrompt, useSearch, jsonMode, _jsonSchema }) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("DEEPSEEK_API_KEY is missing or invalid in .env file.");
    }

    if (useSearch) {
      console.warn("[DeepSeek] Google Search grounding is not supported. The model will respond from training data.");
    }

    if (_jsonSchema) {
      console.warn("[DeepSeek] Structured output schema is not supported; using JSON mode fallback.");
    }

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: prompt });

    const body = {
      model,
      messages,
      max_tokens: 8192,
      temperature: 0.7,
    };

    if (jsonMode) {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `DeepSeek API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("DeepSeek returned an empty response.");
    }

    return {
      text,
      finishReason: data.choices?.[0]?.finish_reason,
    };
  },
};
