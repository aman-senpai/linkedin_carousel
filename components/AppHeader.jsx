import React from "react";
import {
    Download,
    Instagram,
    Shuffle,
    Sparkles,
    Loader2,
    LayoutGrid,
    Zap,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const AppHeader = ({
    isExporting,
    isGenerating,
    handleShuffleDesign,
    handleGenerateWithAI,
    downloadAll,
    exportInstagram,
    activeTab,
    setActiveTab,
}) => {
    return (
        <header className="flex flex-col md:grid md:grid-cols-3 items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-3 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 sticky top-6 z-[100] no-export transition-colors duration-300">
            {/* Left Section: Logo & Brand */}
            <div className="flex items-center gap-4 md:justify-self-start">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                    <Sparkles className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                        Awesome Carousel
                    </h1>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                        LinkedIn & Instagram Post Designer
                    </p>
                </div>
            </div>

            {/* Center Section: Tab Switcher */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 md:justify-self-center">
                <button
                    onClick={() => setActiveTab("carousel")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs transition-all ${
                        activeTab === "carousel"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                >
                    <LayoutGrid size={14} />
                    <span>Carousel</span>
                </button>
                <button
                    onClick={() => setActiveTab("infographic")}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-xs transition-all ${
                        activeTab === "infographic"
                            ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/30"
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                >
                    <Zap size={14} />
                    <span>Infographic GIF</span>
                </button>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center justify-end gap-2 md:justify-self-end whitespace-nowrap">
                <ThemeToggle />

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

                {activeTab === "carousel" && (
                    <button
                        onClick={handleShuffleDesign}
                        disabled={isGenerating || isExporting}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200/50 dark:border-slate-700/50 active:scale-95 disabled:opacity-50"
                    >
                        <Shuffle size={16} />
                        <span className="hidden lg:inline">Shuffle</span>
                    </button>
                )}

                <button
                    onClick={handleGenerateWithAI}
                    disabled={isGenerating || isExporting}
                    className={`group relative flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95 disabled:opacity-50 overflow-hidden ${
                        activeTab === "infographic"
                            ? "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200 dark:shadow-violet-900/50"
                            : "bg-slate-900 dark:bg-blue-600 text-white hover:bg-blue-600 shadow-slate-200 dark:shadow-blue-900/50"
                    }`}
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
                                className={`${activeTab === "infographic" ? "text-violet-200" : "text-blue-400"} group-hover:text-white transition-colors`}
                            />
                            <span>AI Generate</span>
                        </>
                    )}
                </button>

                {activeTab === "carousel" && (
                    <>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>
                        <div className="flex gap-1.5">
                            <button
                                onClick={downloadAll}
                                disabled={isExporting}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-100 dark:shadow-blue-950 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isExporting ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Download size={16} />
                                )}
                                <span className="hidden lg:inline">PDF</span>
                            </button>

                            <button
                                onClick={exportInstagram}
                                disabled={isExporting}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 dark:shadow-emerald-950 active:scale-95 disabled:opacity-50"
                            >
                                <Instagram size={16} />
                                <span className="hidden lg:inline">Insta</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default AppHeader;
