// Client-safe provider/model metadata. No SDK imports — safe to import in UI components.
export const PROVIDER_METADATA = [
  {
    id: "gemini",
    name: "Google Gemini",
    models: [
      { id: "gemini-3-flash-preview", name: "Gemini 3 Flash", supportsSearch: true },
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", supportsSearch: true },
    ],
    defaultModel: "gemini-3-flash-preview",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    models: [
      { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", supportsThinking: true },
      { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsThinking: true },
    ],
    defaultModel: "deepseek-v4-flash",
  },
];

export function getProviderMetadata(id) {
  return PROVIDER_METADATA.find((p) => p.id === id) || PROVIDER_METADATA[0];
}
