import { provider as gemini } from "./providers/gemini";
import { provider as deepseek } from "./providers/deepseek";

const registry = { gemini, deepseek };

export function getProvider(id) {
  if (id && registry[id]) {
    return registry[id];
  }
  return registry.gemini;
}
