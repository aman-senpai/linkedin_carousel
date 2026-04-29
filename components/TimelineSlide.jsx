import { stripMarkdown } from '@/lib/utils';

const TimelineSlide = ({ slide, colors }) => {
    const variant = slide.variant || 'classic';
    const events = slide.events || [];

    if (variant === 'cards') {
        return (
            <div className="h-full w-full bg-slate-50 p-20 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-6xl font-black text-slate-900 mb-14 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
                    {events.map((event, i) => (
                        <div key={i} className="bg-white rounded-[24px] p-8 shadow-md border border-slate-100 flex items-center gap-8 hover:shadow-lg transition-shadow">
                            <div className="w-28 h-28 rounded-[16px] flex items-center justify-center shrink-0" style={{ background: `${colors.primary}15` }}>
                                <span className="text-3xl font-black" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</span>
                            </div>
                            <div className="w-2 h-16 rounded-full shrink-0" style={{ background: colors.secondary }}></div>
                            <p className="text-2xl font-medium text-slate-700 leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'minimal') {
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-5xl font-bold text-slate-900 mb-16 text-center tracking-tight">{stripMarkdown(slide.heading)}</h2>
                <div className="max-w-3xl mx-auto w-full">
                    {events.map((event, i) => (
                        <div key={i} className="flex items-baseline gap-8 py-6 border-b border-slate-100 last:border-0">
                            <span className="text-2xl font-bold shrink-0" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</span>
                            <span className="text-2xl text-slate-400 font-light">—</span>
                            <p className="text-2xl text-slate-600 leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'dark') {
        return (
            <div className="h-full w-full p-20 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                <h2 className="text-6xl font-bold text-white mb-16 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative pl-24 ml-8 max-w-4xl mx-auto w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>
                    {events.map((event, i) => (
                        <div key={i} className="mb-16 last:mb-0 relative">
                            <div className="absolute -left-[68px] top-3 w-10 h-10 rounded-full border-4 flex items-center justify-center" style={{ borderColor: colors.primary, background: colors.dark }}>
                                <div className="w-3 h-3 rounded-full" style={{ background: colors.primary }}></div>
                            </div>
                            <div className="text-4xl font-black mb-3" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</div>
                            <div className="bg-white/[0.04] border border-white/[0.06] rounded-[16px] p-8 backdrop-blur-xl max-w-3xl">
                                <p className="text-2xl font-medium text-white/60 leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'split') {
        return (
            <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-6xl font-black text-slate-900 mb-14 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative max-w-5xl mx-auto w-full">
                    <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 rounded-full" style={{ background: colors.primary }}></div>
                    {events.map((event, i) => (
                        <div key={i} className={`flex items-center mb-16 last:mb-0 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`flex-1 ${i % 2 === 0 ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                                <div className={`inline-block max-w-md ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                                    <div className="text-4xl font-black mb-2" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</div>
                                    <p className="text-2xl text-slate-600 leading-relaxed bg-slate-50 rounded-[16px] p-6 border border-slate-100">{stripMarkdown(event.text || event.d)}</p>
                                </div>
                            </div>
                            <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-xl border-4 border-white" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else if (variant === 'bold') {
        return (
            <div className="h-full w-full p-20 flex flex-col justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <h2 className="text-6xl font-black text-white mb-14 text-center drop-shadow-lg">{stripMarkdown(slide.heading)}</h2>
                <div className="relative pl-24 ml-8 max-w-4xl mx-auto w-full">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/20 rounded-full"></div>
                    {events.map((event, i) => (
                        <div key={i} className="mb-14 last:mb-0 relative">
                            <div className="absolute -left-[72px] top-2 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl">
                                <span className="text-xl font-black" style={{ color: i % 2 === 0 ? colors.primary : colors.secondary }}>{i + 1}</span>
                            </div>
                            <div className="ml-4">
                                <span className="text-4xl font-black text-white drop-shadow-lg inline-block mb-2">{stripMarkdown(event.year || event.t)}</span>
                                <div className="bg-white/10 backdrop-blur-xl rounded-[16px] p-8 border border-white/20">
                                    <p className="text-2xl font-bold text-white leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        // classic - default layout
        return (
            <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
                <h2 className="text-7xl font-bold text-slate-900 mb-20 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative pl-32 border-l-8 ml-12" style={{ borderColor: colors.primary }}>
                    {events.map((event, i) => (
                        <div key={i} className="mb-20 last:mb-0 relative">
                            <div className="absolute -left-[76px] top-4 w-12 h-12 rounded-full border-8 border-slate-50 shadow-xl" style={{ background: colors.secondary }}></div>
                            <div className="text-5xl font-black mb-4" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</div>
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 max-w-4xl">
                                <p className="text-4xl font-medium text-slate-700 leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default TimelineSlide;
