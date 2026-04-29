import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';

const ComparisonSlide = ({ slide, colors, palette }) => {
    const variant = slide.variant || 'classic';
    const leftItems = slide.left || [];
    const rightItems = slide.right || [];

    if (variant === 'cards') {
        return (
            <div className="h-full w-full bg-gradient-to-br from-slate-50 to-white p-20 flex flex-col justify-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className="text-5xl font-black text-slate-800 mb-12 relative z-10 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="flex gap-8 relative z-10 flex-1 max-h-[700px]">
                    <div className="flex-1 bg-white rounded-[32px] p-10 shadow-xl border border-red-100 flex flex-col">
                        <h3 className="text-4xl font-black text-red-500 mb-8 text-center uppercase tracking-tight">Before</h3>
                        <div className="flex flex-col gap-5 flex-1">
                            {leftItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-5 bg-red-50/50 rounded-[16px] p-5">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-2xl font-black shrink-0">✕</div>
                                    <p className="text-2xl font-medium text-slate-500">{stripMarkdown(item)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-[32px] p-10 shadow-xl border border-emerald-100 flex flex-col">
                        <h3 className="text-4xl font-black text-emerald-500 mb-8 text-center uppercase tracking-tight">After</h3>
                        <div className="flex flex-col gap-5 flex-1">
                            {rightItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-5 bg-emerald-50/50 rounded-[16px] p-5">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center text-2xl font-black shrink-0">✓</div>
                                    <p className="text-2xl font-black text-slate-700">{stripMarkdown(item)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (variant === 'split') {
        return (
            <div className="h-full w-full flex relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="w-1/2 h-full p-20 flex flex-col justify-center relative" style={{ background: `${colors.primary}15` }}>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: colors.primary }}></div>
                    <h3 className="text-5xl font-black text-slate-800 mb-10 uppercase tracking-tight">Old Way</h3>
                    <div className="space-y-7">
                        {leftItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-[12px] bg-red-400/20 text-red-500 flex items-center justify-center text-2xl font-black shrink-0">✕</div>
                                <p className="text-3xl font-medium text-slate-500 line-through decoration-red-300/50">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 h-full p-20 flex flex-col justify-center relative" style={{ background: `${colors.secondary}15` }}>
                    <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: colors.secondary }}></div>
                    <h3 className="text-5xl font-black text-slate-800 mb-10 uppercase tracking-tight">New Way</h3>
                    <div className="space-y-7">
                        {rightItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-[12px] bg-emerald-400/20 text-emerald-500 flex items-center justify-center text-2xl font-black shrink-0">✓</div>
                                <p className="text-3xl font-black text-slate-700">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else if (variant === 'dark') {
        return (
            <div className="h-full w-full flex relative overflow-hidden" style={{ background: colors.dark }}>
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl font-black z-20 border border-white/20" style={{ color: colors.primary }}>VS</div>
                <div className="w-1/2 h-full p-20 flex flex-col justify-center relative">
                    <h3 className="text-4xl font-black text-white/60 mb-10 uppercase tracking-tight">Before</h3>
                    <div className="space-y-6">
                        {leftItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-[8px] bg-red-500/20 text-red-400 flex items-center justify-center text-xl font-black shrink-0">✕</div>
                                <p className="text-2xl font-medium text-white/40">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 h-full p-20 flex flex-col justify-center relative">
                    <h3 className="text-4xl font-black text-white/80 mb-10 uppercase tracking-tight">After</h3>
                    <div className="space-y-6">
                        {rightItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-[8px] bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-black shrink-0">✓</div>
                                <p className="text-2xl font-bold text-white/70">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else if (variant === 'minimal') {
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className="text-5xl font-light text-slate-800 mb-16 relative z-10 text-center tracking-tight">{stripMarkdown(slide.heading)}</h2>
                <div className="flex gap-16 relative z-10">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-red-400 uppercase tracking-[0.2em] mb-10 text-center">The Old Way</h3>
                        <div className="space-y-6">
                            {leftItems.map((item, i) => (
                                <div key={i} className="text-center py-4 border-t border-slate-100">
                                    <p className="text-2xl text-slate-400 font-medium">{stripMarkdown(item)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-px bg-slate-200 self-stretch"></div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-[0.2em] mb-10 text-center">The New Way</h3>
                        <div className="space-y-6">
                            {rightItems.map((item, i) => (
                                <div key={i} className="text-center py-4 border-t border-slate-100">
                                    <p className="text-2xl text-slate-700 font-bold">{stripMarkdown(item)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (variant === 'grid') {
        return (
            <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className="text-5xl font-black text-slate-800 mb-12 relative z-10 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="grid grid-cols-2 gap-6 relative z-10">
                    {leftItems.map((item, i) => (
                        <div key={`l-${i}`} className="bg-red-50/50 rounded-[24px] p-8 flex items-center gap-5 border border-red-100">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-400 flex items-center justify-center text-xl font-black shrink-0">✕</div>
                            <p className="text-2xl font-medium text-slate-500">{stripMarkdown(item)}</p>
                        </div>
                    ))}
                    {rightItems.map((item, i) => (
                        <div key={`r-${i}`} className="bg-emerald-50/50 rounded-[24px] p-8 flex items-center gap-5 border border-emerald-100">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center text-xl font-black shrink-0">✓</div>
                            <p className="text-2xl font-black text-slate-700">{stripMarkdown(item)}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        // classic - default layout
        return (
            <div className="h-full w-full flex bg-white relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-8 bg-white flex items-center justify-center text-5xl font-black z-20 shadow-xl" style={{ borderColor: colors.accent, color: colors.dark }}>VS</div>
                <div className="w-1/2 h-full p-16 flex flex-col justify-center relative overflow-hidden" style={{ background: `${colors.primary}10` }}>
                    <h3 className="text-5xl font-black text-slate-800 mb-12 uppercase tracking-tighter">The Old Way</h3>
                    <div className="space-y-8">
                        {leftItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-8 h-8 rounded-full bg-red-400/20 text-red-500 flex items-center justify-center text-xl font-black">✕</div>
                                <p className="text-3xl font-medium text-slate-500">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-1/2 h-full p-16 flex flex-col justify-center relative overflow-hidden" style={{ background: `${colors.secondary}10` }}>
                    <h3 className="text-5xl font-black text-slate-800 mb-12 uppercase tracking-tighter">The New Way</h3>
                    <div className="space-y-8">
                        {rightItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-500 flex items-center justify-center text-xl font-black">✓</div>
                                <p className="text-3xl font-black text-slate-700">{stripMarkdown(item)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default ComparisonSlide;
