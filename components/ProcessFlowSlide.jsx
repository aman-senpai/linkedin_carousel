import { stripMarkdown } from '@/lib/utils';

const ProcessFlowSlide = ({ slide, colors }) => {
    const variant = slide.variant || 'classic';
    const steps = slide.steps || [];

    if (variant === 'cards') {
        return (
            <div className="h-full w-full bg-gradient-to-br from-slate-50 to-white p-20 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="grid grid-cols-2 gap-8 relative z-10 max-w-5xl mx-auto w-full">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-white rounded-[32px] p-10 shadow-lg border border-slate-100 flex flex-col hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-16 h-16 rounded-[16px] flex items-center justify-center text-3xl font-black text-white" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                    {i + 1}
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800">{stripMarkdown(step.t || step)}</h3>
                            </div>
                            <p className="text-2xl text-slate-500 leading-relaxed">{stripMarkdown(step.d || "")}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'timeline') {
        return (
            <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative mx-auto w-full max-w-4xl">
                    <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full" style={{ background: colors.primary }}></div>
                    {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-12 mb-16 last:mb-0 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                <div className={`bg-slate-50 rounded-[24px] p-8 border border-slate-100 inline-block max-w-md ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-2">{stripMarkdown(step.t || step)}</h3>
                                    <p className="text-2xl text-slate-500">{stripMarkdown(step.d || "")}</p>
                                </div>
                            </div>
                            <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-xl" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                {i + 1}
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'dark') {
        return (
            <div className="h-full w-full p-20 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                <h2 className="text-6xl font-black text-white mb-16">{stripMarkdown(slide.heading)}</h2>
                <div className="flex flex-col gap-8 relative max-w-4xl">
                    <div className="absolute left-[76px] top-10 bottom-10 w-1 bg-white/10"></div>
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-10 relative">
                            <div className="w-[140px] h-[140px] rounded-[40px] flex items-center justify-center text-5xl font-black text-white shrink-0 z-10 shadow-2xl border border-white/10 backdrop-blur-xl" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                {i + 1}
                            </div>
                            <div className="p-8 bg-white/[0.04] border border-white/[0.06] rounded-[32px] flex-1 backdrop-blur-xl">
                                <h3 className="text-3xl font-bold text-white mb-1">{stripMarkdown(step.t || step)}</h3>
                                <p className="text-2xl text-white/40 leading-snug">{stripMarkdown(step.d || "")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'grid') {
        return (
            <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-5xl font-black text-slate-900 mb-14 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="grid grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto w-full">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-slate-50 rounded-[24px] p-8 flex flex-col items-center text-center border border-slate-100">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white mb-6 shadow-lg" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                {i + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">{stripMarkdown(step.t || step)}</h3>
                            <p className="text-xl text-slate-500 leading-snug">{stripMarkdown(step.d || "")}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'split') {
        return (
            <div className="h-full w-full flex relative overflow-hidden">
                <div className="w-1/2 h-full p-20 flex flex-col justify-center" style={{ background: colors.primary }}>
                    <h2 className="text-6xl font-black text-white leading-tight">{stripMarkdown(slide.heading)}</h2>
                    <div className="mt-8 w-24 h-2 bg-white/30 rounded-full"></div>
                    <p className="text-3xl text-white/60 mt-8 font-medium">{steps.length} key steps to success</p>
                </div>
                <div className="w-1/2 h-full bg-white p-16 flex flex-col justify-center gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-6 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                            <div className="w-14 h-14 rounded-[12px] flex items-center justify-center text-2xl font-black text-white shrink-0" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800">{stripMarkdown(step.t || step)}</h3>
                                <p className="text-xl text-slate-500">{stripMarkdown(step.d || "")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        // classic - default layout
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-7xl font-black text-slate-900 mb-20">{stripMarkdown(slide.heading)}</h2>
                <div className="flex flex-col gap-16 relative">
                    <div className="absolute left-[76px] top-10 bottom-10 w-2 bg-slate-100"></div>
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-12 relative">
                            <div className="w-[160px] h-[160px] rounded-[60px] flex items-center justify-center text-6xl font-black text-white shrink-0 shadow-2xl z-10" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>{i + 1}</div>
                            <div className="p-10 bg-slate-50 rounded-[40px] flex-1 border border-slate-100 shadow-sm">
                                <h3 className="text-4xl font-bold text-slate-800 mb-2">{stripMarkdown(step.t || step)}</h3>
                                <p className="text-3xl text-slate-500 leading-snug">{stripMarkdown(step.d || "")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default ProcessFlowSlide;
