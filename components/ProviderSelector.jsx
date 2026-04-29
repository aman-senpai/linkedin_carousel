import { PROVIDER_METADATA, getProviderMetadata } from "@/lib/ai/provider-metadata";

export default function ProviderSelector({ provider, setProvider, model, setModel }) {
  const currentProvider = getProviderMetadata(provider);

  const handleProviderChange = (e) => {
    const newProviderId = e.target.value;
    const newProvider = getProviderMetadata(newProviderId);
    setProvider(newProviderId);
    setModel(newProvider.defaultModel);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={provider}
        onChange={handleProviderChange}
        className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
        aria-label="AI Provider"
      >
        {PROVIDER_METADATA.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
        aria-label="AI Model"
      >
        {currentProvider.models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
