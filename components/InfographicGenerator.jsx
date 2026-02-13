import React, { useState, useMemo, useRef } from "react";
import {
    Download,
    Zap,
    LayoutGrid,
    Palette as PaletteIcon,
    Type,
    AtSign,
    Check,
    Copy,
    Loader2,
    Sparkles,
} from "lucide-react";

import { toast } from "sonner";
import InfographicCanvas from "./InfographicCanvas";
import { FONT_OPTIONS } from "@/lib/constants";

const palettes = [
    {
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        dark: "#0f172a",
        mood: "Corporate",
    },
    {
        primary: "#059669",
        secondary: "#10b981",
        accent: "#fbbf24",
        dark: "#064e3b",
        mood: "Nature",
    },
    {
        primary: "#e11d48",
        secondary: "#f43f5e",
        accent: "#fcd34d",
        dark: "#4c0519",
        mood: "Action",
    },
    {
        primary: "#2563eb",
        secondary: "#3b82f6",
        accent: "#60a5fa",
        dark: "#1e3a8a",
        mood: "Tech",
    },
    {
        primary: "#7c3aed",
        secondary: "#8b5cf6",
        accent: "#c4b5fd",
        dark: "#2e1065",
        mood: "Creative",
    },
];

export default function InfographicGenerator({
    topic,
    setTopic,
    infographicData,
    handleGenerate,
    isGenerating,
    palette,
    setPalette,
    activeFont,
    setActiveFont,
    postTitle,
    setPostTitle,
    socialHandle,
    setSocialHandle,
    caption,
    setCaption,
}) {
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [copiedCaption, setCopiedCaption] = useState(false);
    const [exportKey, setExportKey] = useState(0);
    const canvasRef = useRef(null);

    const handleDownloadPng = async () => {
        if (!canvasRef.current) return;
        setIsExporting(true);
        try {
            const { toPng } = await import("html-to-image");
            const dataUrl = await toPng(canvasRef.current, {
                width: 1200,
                height: 1500,
                pixelRatio: 2,
                backgroundColor: "#ffffff",
            });
            const link = document.createElement("a");
            link.download = `infographic-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            toast.success("PNG exported successfully!");
        } catch (err) {
            toast.error("Failed to export PNG");
        } finally {
            setIsExporting(false);
        }
    };

    const [layoutMode, setLayoutMode] = useState("horizontal");

    const handleDownloadGif = async () => {
        if (!canvasRef.current) return;

        setIsExporting(true);
        setExportProgress(0);

        // Trigger animation replay
        setExportKey((prev) => prev + 1);
        await new Promise((r) => setTimeout(r, 500));

        try {
            const { toPng } = await import("html-to-image");
            const GIF = (await import("gif.js")).default;
            const element = canvasRef.current;
            const width = 800;
            const height = element.scrollHeight;

            const gif = new GIF({
                workers: 2,
                quality: 10,
                width: width,
                height: height,
                workerScript: "/gif.worker.js",
                background:
                    themedData?.theme?.mode === "dark"
                        ? themedData.theme.dark
                        : "#ffffff",
            });

            // Capture frames
            const FRAMES = 20;
            for (let i = 0; i < FRAMES; i++) {
                const dataUrl = await toPng(element, {
                    width: width,
                    height: height,
                    pixelRatio: 1,
                    cacheBust: true,
                    style: {
                        transform: "none",
                        margin: 0,
                        width: "800px",
                        height: `${height}px`,
                    },
                });

                const img = new Image();
                img.src = dataUrl;
                await new Promise((resolve) => (img.onload = resolve));

                gif.addFrame(img, { delay: 150 });
                setExportProgress(Math.round(((i + 1) / FRAMES) * 100));

                // Wait a bit for potential animations to progress
                await new Promise((r) => setTimeout(r, 100));
            }

            gif.on("finished", (blob) => {
                setIsExporting(false);
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.download = `${postTitle || "infographic"}.gif`;
                link.href = url;
                link.click();
                toast.success("GIF downloaded successfully!");
            });

            gif.render();
        } catch (err) {
            console.error("GIF generation failed:", err);
            toast.error("Failed to generate GIF.");
            setIsExporting(false);
        }
    };

    const copyCaption = () => {
        navigator.clipboard.writeText(caption);
        setCopiedCaption(true);
        setTimeout(() => setCopiedCaption(false), 2000);
        toast.success("Caption copied to clipboard!");
    };

    const themedData = useMemo(() => {
        if (!infographicData) return null;
        return {
            ...infographicData,
            title: postTitle || infographicData.title,
            theme: {
                ...infographicData.theme,
                primary: palette.primary,
                secondary: palette.secondary,
                accent: palette.accent || "#f59e0b",
                dark: palette.dark || "#0f172a",
                mode: palette.mode || "light",
            },
            socialHandle: socialHandle,
        };
    }, [infographicData, palette, postTitle, socialHandle]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start h-full">
            {/* Canvas Preview - LEFT */}
            <div className="flex-1 order-1 w-full min-w-0 flex flex-col items-center">
                {infographicData ? (
                    <div className="w-full max-w-[840px] rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <InfographicCanvas
                            key={exportKey}
                            ref={canvasRef}
                            data={themedData}
                            fontClass={activeFont}
                            layoutMode={layoutMode}
                        />
                    </div>
                ) : (
                    <div className="w-full max-w-[840px] aspect-[4/5] bg-white dark:bg-slate-900 rounded-[40px] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-6 text-slate-400 dark:text-slate-600 transition-all">
                        <div className="w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                            <LayoutGrid size={40} className="text-slate-300" />
                        </div>
                        <div className="text-center px-8">
                            <p className="text-xl font-black text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-tight">
                                Visual Engine Ready
                            </p>
                            <p className="text-sm text-slate-300 dark:text-slate-500 max-w-sm font-medium">
                                Describe your concept and watch it transform
                                into a premium Bento-style architectural
                                diagram.
                            </p>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                {infographicData && !isExporting && (
                    <div className="mt-8 flex gap-4 no-export animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={handleDownloadGif}
                            className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-3xl font-black text-sm hover:scale-[1.05] active:scale-[0.98] transition-all shadow-2xl flex items-center gap-3"
                        >
                            <Zap size={20} fill="currentColor" />
                            DOWNLOAD ANIMATED GIF
                        </button>
                        <button
                            onClick={handleDownloadPng}
                            className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded-3xl font-black text-sm hover:bg-slate-50 transition-all border border-slate-100 dark:border-slate-700 shadow-xl active:scale-[0.98] flex items-center gap-2"
                        >
                            <Download size={20} />
                            PNG SNAPSHOT
                        </button>
                    </div>
                )}

                {isExporting && (
                    <div className="mt-8 w-full max-w-sm bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl animate-pulse">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                Architectural Rendering...
                            </span>
                            <span className="text-xs font-black text-blue-600">
                                {exportProgress}%
                            </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${exportProgress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Specialized Infographic Sidebar - RIGHT */}
            <div className="w-full lg:w-[400px] shrink-0 order-2 space-y-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 custom-scrollbar no-export">
                {/* 1. Content Input */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-6 bg-violet-600 rounded-full" />
                        <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                            Blueprint Prompt
                        </label>
                    </div>
                    <textarea
                        placeholder="e.g. How a modern API Gateway works, 3 stages of data processing..."
                        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-900 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-500/50 transition-all font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-300 min-h-[120px]"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="group relative w-full mt-4 flex items-center justify-center gap-2.5 px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-violet-200 dark:shadow-violet-900/50 active:scale-95 disabled:opacity-50 overflow-hidden"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Sparkles
                                    size={18}
                                    className="text-violet-200 group-hover:text-white transition-colors"
                                />
                                <span>AI Generate</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Layout Style */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block text-center">
                        Layout Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {["horizontal", "staggered", "grid"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setLayoutMode(mode)}
                                className={`px-4 py-3 rounded-2xl border-2 text-[10px] font-black uppercase transition-all ${
                                    layoutMode === mode
                                        ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                        : "border-slate-50 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:border-slate-200"
                                }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Brand Identity */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block text-center">
                        Color Palette
                    </label>
                    <div className="grid grid-cols-5 gap-3 mb-6">
                        {palettes.map((p, i) => (
                            <button
                                key={i}
                                className={`w-full aspect-square rounded-2xl transition-all p-1.5 ${palette.primary === p.primary ? "ring-4 ring-blue-500/20 scale-110 shadow-lg" : "hover:scale-105 opacity-60 hover:opacity-100"}`}
                                style={{
                                    background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                                }}
                                onClick={() => setPalette(p)}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-50 dark:border-slate-800">
                            <PaletteIcon size={16} className="text-slate-400" />
                            <input
                                type="color"
                                value={palette.primary}
                                onChange={(e) =>
                                    setPalette({
                                        ...palette,
                                        primary: e.target.value,
                                    })
                                }
                                className="w-full h-8 cursor-pointer rounded bg-transparent font-bold text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Typography */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block text-center">
                        Typography
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {FONT_OPTIONS.slice(0, 4).map((f) => (
                            <button
                                key={f.name}
                                onClick={() => setActiveFont(f.value)}
                                className={`px-4 py-3 rounded-2xl border-2 text-[10px] font-black uppercase transition-all ${
                                    activeFont === f.value
                                        ? "border-blue-500 bg-blue-50/50 text-blue-700"
                                        : "border-slate-50 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:border-slate-200"
                                }`}
                            >
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. Metadata */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block text-center">
                        Global Metadata
                    </label>

                    <div className="relative">
                        <Type
                            className="absolute left-4 top-4 text-slate-400"
                            size={16}
                        />
                        <input
                            placeholder="Main Title"
                            className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-all font-black text-xs text-slate-900 dark:text-white"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <AtSign
                            className="absolute left-4 top-4 text-slate-400"
                            size={16}
                        />
                        <input
                            placeholder="Social Handle"
                            className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-all font-black text-xs text-slate-900 dark:text-white"
                            value={socialHandle}
                            onChange={(e) => setSocialHandle(e.target.value)}
                        />
                    </div>

                    {caption && (
                        <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    Story Copy
                                </span>
                                <button
                                    onClick={copyCaption}
                                    className="text-[10px] font-black text-blue-600 flex items-center gap-1"
                                >
                                    {copiedCaption ? (
                                        <Check size={10} />
                                    ) : (
                                        <Copy size={10} />
                                    )}
                                    {copiedCaption ? "COPIED" : "COPY"}
                                </button>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-3 font-medium leading-relaxed">
                                {caption}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
