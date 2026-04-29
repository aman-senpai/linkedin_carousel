import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations, { DotsPattern } from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const InfographicSlide = ({ slide, colors, palette, headingWeight, socialHandle, postTitle }) => {
    const infoVariant = slide.variant || 'classic';
    const isDark = ['grid', 'pyramid', 'funnel', 'timeline'].includes(infoVariant);

    const renderContent = () => {
        if (infoVariant === 'cards') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex flex-col justify-center">
                    <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm flex items-start gap-8">
                                <div className="text-4xl font-bold w-16 h-16 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: colors.secondary }}>{i + 1}</div>
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-2">{stripMarkdown(p.t)}</h3>
                                    <p className="text-2xl text-slate-500 leading-snug">{stripMarkdown(p.d)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (infoVariant === 'steps') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center pl-32 relative overflow-hidden">
                    <div className="absolute left-16 top-0 bottom-0 w-1 bg-slate-100"></div>
                    <h2 className="text-7xl font-bold text-slate-900 mb-20">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-16">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[84px] top-2 w-10 h-10 rounded-full border-4 border-white shadow-sm" style={{ background: colors.primary }}></div>
                                <h3 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                    <span style={{ color: colors.primary }}>Step {i + 1}:</span>
                                    {stripMarkdown(p.t)}
                                </h3>
                                <p className="text-3xl text-slate-500 max-w-4xl pl-4 border-l-4 border-slate-100">{stripMarkdown(p.d)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (infoVariant === 'grid') {
            return (
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col relative" style={{ background: colors.dark }}>
                    <h2 className="text-7xl font-black text-white mb-16 text-center">{slide.heading}</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                                <div className="text-5xl font-black mb-6 opacity-30" style={{ color: colors.primary }}>0{i + 1}</div>
                                <h3 className="text-3xl font-bold text-white mb-4">{stripMarkdown(p.t)}</h3>
                                <p className="text-2xl text-white/60 leading-relaxed">{stripMarkdown(p.d)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (infoVariant === 'timeline') {
            return (
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute left-[120px] top-0 bottom-0 w-1 bg-white/10"></div>
                    <h2 className="text-6xl font-black text-white mb-16 relative z-10">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-12 relative z-10">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="flex items-start gap-10 relative">
                                <div className="absolute left-[104px] top-6 w-8 h-8 rounded-full border-4 border-slate-900" style={{ background: colors.primary }}></div>
                                <div className="w-[108px] text-right pr-8">
                                    <span className="text-2xl font-mono text-white/30 uppercase">Phase {i + 1}</span>
                                </div>
                                <div className="flex-1 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 ml-4">
                                    <h3 className="text-3xl font-bold text-white mb-2">{stripMarkdown(p.t)}</h3>
                                    <p className="text-xl text-white/60 leading-relaxed">{stripMarkdown(p.d)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (infoVariant === 'list') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                    <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="flex items-center gap-8 group border-b border-slate-100 pb-6">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 transition-all group-hover:scale-110" style={{ background: colors.primary + '15', color: colors.primary }}>
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-bold text-slate-800">{stripMarkdown(p.t)}</h3>
                                    <p className="text-xl text-slate-500 leading-snug">{stripMarkdown(p.d)}</p>
                                </div>
                                <svg className="w-6 h-6 text-slate-300 group-hover:text-slate-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (infoVariant === 'cycle') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center relative overflow-hidden">
                    <h2 className="text-6xl font-black text-slate-900 mb-20 text-center">{slide.heading}</h2>
                    <div className="relative w-[700px] h-[700px] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[3px] border-dashed opacity-20" style={{ borderColor: colors.primary }}></div>
                        <div className="absolute inset-16 rounded-full border-[2px] border-dashed opacity-10" style={{ borderColor: colors.secondary }}></div>
                        {(slide.points || []).map((p, i) => {
                            const angle = (i * 360) / (slide.points || []).length - 90;
                            const rad = (angle * Math.PI) / 180;
                            const radius = 280;
                            const x = Math.cos(rad) * radius;
                            const y = Math.sin(rad) * radius;
                            return (
                                <div key={i} className="absolute bg-white rounded-2xl shadow-lg border border-slate-100 p-4 w-48 text-center transition-all hover:scale-110 hover:shadow-xl hover:z-10" style={{ transform: `translate(${x}px, ${y}px)` }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2" style={{ background: colors.primary }}>{i + 1}</div>
                                    <p className="text-sm font-bold text-slate-800 leading-tight">{stripMarkdown(p.t)}</p>
                                </div>
                            );
                        })}
                        <div className="w-32 h-32 rounded-full bg-white shadow-2xl border-8 flex items-center justify-center z-20" style={{ borderColor: colors.primary + '30' }}>
                            <svg className="w-12 h-12" style={{ color: colors.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        } else if (infoVariant === 'pyramid') {
            return (
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <h2 className="text-6xl font-black text-white mb-16 text-center">{slide.heading}</h2>
                    <div className="flex flex-col items-center gap-3 max-w-3xl w-full">
                        {(slide.points || []).map((p, i) => {
                            const widthPercent = 100 - (i * 12);
                            return (
                                <div key={i} className="flex items-center gap-4 justify-center transition-all hover:scale-105" style={{ width: `${widthPercent}%` }}>
                                    <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: colors.primary }}>Level {i + 1}</span>
                                        <h3 className="text-2xl font-bold text-white mb-1">{stripMarkdown(p.t)}</h3>
                                        <p className="text-sm text-white/50">{stripMarkdown(p.d)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (infoVariant === 'funnel') {
            return (
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <h2 className="text-5xl font-black text-white mb-16 text-center uppercase tracking-[0.15em]">{slide.heading}</h2>
                    <div className="relative w-full max-w-3xl flex flex-col items-center gap-2">
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] opacity-10" style={{ background: colors.primary }}></div>
                        {(slide.points || []).map((p, i) => {
                            const widthPercent = 30 + (i * 23);
                            const opacity = 1 - (i * 0.15);
                            return (
                                <div key={i} className="relative p-6 rounded-2xl border border-white/10 text-center transition-all hover:scale-105 hover:z-10" style={{ width: `${widthPercent}%`, background: `rgba(255,255,255,${0.03 + (i * 0.02)})`, opacity }}>
                                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: colors.primary }}>{i + 1}</span>
                                    <h3 className="text-2xl font-bold text-white">{stripMarkdown(p.t)}</h3>
                                    <p className="text-sm text-white/40 mt-1">{stripMarkdown(p.d)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else if (infoVariant === 'comparison') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                    <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                    <div className="flex-1 flex items-stretch gap-8 min-h-0">
                        {(slide.points || []).slice(0, 2).map((p, i) => {
                            const isPro = i === 0;
                            const bg = isPro ? 'bg-slate-50' : 'bg-white';
                            const border = isPro ? colors.primary : colors.secondary;
                            return (
                                <div key={i} className={`flex-1 ${bg} rounded-4xl p-10 flex flex-col border-2 relative overflow-hidden`} style={{ borderColor: border + '30' }}>
                                    <div className={`text-sm font-bold uppercase tracking-[0.2em] mb-8 text-center py-2 rounded-full`} style={{ background: border + '20', color: border }}>
                                        {isPro ? 'Option A' : 'Option B'}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center space-y-5">
                                        {(p?.items || p?.points || []).map((item, j) => (
                                            <div key={j} className="flex items-start gap-4">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${isPro ? 'text-white' : 'text-white'}`} style={{ background: border }}>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <p className="text-2xl font-medium text-slate-700 leading-snug">{stripMarkdown(item)}</p>
                                            </div>
                                        ))}
                                        {(!p?.items && !p?.points) && (
                                            <div className="text-center">
                                                <p className="text-5xl font-bold mb-4" style={{ color: border }}>{stripMarkdown(p.t)}</p>
                                                <p className="text-2xl text-slate-500">{stripMarkdown(p.d)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        // Classic
        return (
            <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative">
                <DotsPattern colors={colors} palette={palette} opacity={0.02} />
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className={`text-7xl ${headingWeight} text-slate-900 mb-16 relative z-10`}>{slide.heading}</h2>
                <div className="flex-1 flex flex-col justify-center space-y-16 relative z-10">
                    {(slide.points || []).map((p, i) => (
                        <div key={i} className="flex gap-12 items-start">
                            <div className="text-6xl font-bold w-32 h-32 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ background: colors.primary }}>{i + 1}</div>
                            <div>
                                <h3 className="text-5xl font-bold text-slate-800 mb-4">{stripMarkdown(p.t)}</h3>
                                <p className="text-4xl text-slate-500 leading-snug max-w-4xl">{stripMarkdown(p.d)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full relative group/slide">
            {renderContent()}
            <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode={isDark ? 'dark' : 'light'} />
        </div>
    );
};

export default InfographicSlide;
