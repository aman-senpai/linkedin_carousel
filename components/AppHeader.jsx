import React from 'react';
import { Download, Instagram, Shuffle, Sparkles, Loader2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const AppHeader = ({
    isExporting,
    isGenerating,
    handleShuffleDesign,
    handleGenerateWithAI,
    downloadAll,
    exportInstagram
}) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 mb-8 sticky top-6 z-[100] no-export transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                    <Sparkles className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Awesome Carousel</h1>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">LinkedIn & Instagram Post Designer</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <ThemeToggle />

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

                <button
                    onClick={handleShuffleDesign}
                    disabled={isGenerating || isExporting}
                    className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200/50 dark:border-slate-700/50 active:scale-95 disabled:opacity-50"
                >
                    <Shuffle size={18} />
                    <span>Shuffle Design</span>
                </button>

                <button
                    onClick={handleGenerateWithAI}
                    disabled={isGenerating || isExporting}
                    className="group relative flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-xl shadow-slate-200 dark:shadow-blue-900/50 hover:shadow-blue-200 dark:hover:shadow-blue-900/70 active:scale-95 disabled:opacity-50 overflow-hidden"
                >
                    {isGenerating ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <Sparkles size={18} className="text-blue-400 group-hover:text-white transition-colors" />
                            <span>AI Generate</span>
                        </>
                    )}
                </button>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

                <div className="flex gap-2">
                    <button
                        onClick={downloadAll}
                        disabled={isExporting}
                        className="flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-blue-950 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        <span>PDF</span>
                    </button>

                    <button
                        onClick={exportInstagram}
                        disabled={isExporting}
                        className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-emerald-950 active:scale-95 disabled:opacity-50"
                    >
                        <Instagram size={18} />
                        <span className="hidden sm:inline">Instagram</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
