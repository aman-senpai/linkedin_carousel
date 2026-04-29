import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const SummarySlide = ({ slide, colors, palette, headingWeight, socialHandle, postTitle }) => {
    const summaryVariant = slide.variant || 'classic';
    const isDark = ['split'].includes(summaryVariant);

    const renderContent = () => {
        if (summaryVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                    <h2 className="text-6xl font-light text-slate-400 mb-20 uppercase tracking-[0.2em]">{stripMarkdown(slide.heading)}</h2>
                    <div className="space-y-16">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-2xl font-bold uppercase tracking-widest" style={{ color: colors.primary }}>Point {i + 1}</span>
                                <p className="text-5xl font-bold text-slate-900 leading-tight">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'cards') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex flex-col justify-center gap-8">
                    <h2 className="text-7xl font-bold text-slate-900 mb-8">{stripMarkdown(slide.heading)}</h2>
                    <div className="grid grid-cols-1 gap-6 flex-1 min-h-0">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-10">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shrink-0 shadow-lg" style={{ background: colors.primary }}>0{i + 1}</div>
                                <p className="text-4xl font-bold text-slate-700 leading-tight">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'split') {
            return (
                <div className="h-full w-full flex bg-slate-900 overflow-hidden text-white" style={{ background: colors.dark }}>
                    <div className="w-1/3 h-full p-20 flex flex-col justify-center text-center relative" style={{ background: getGradientCSS(colors) }}>
                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay backdrop-blur-3xl"></div>
                        <div className="relative z-10 p-8 border-4 border-white/30 rounded-[4rem]">
                            <h2 className="text-8xl font-black leading-tight uppercase tracking-tighter drop-shadow-2xl">{stripMarkdown(slide.heading)}</h2>
                        </div>
                    </div>
                    <div className="w-2/3 h-full p-24 flex flex-col justify-center space-y-20 bg-white">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="flex gap-10 items-start">
                                <span className="text-8xl font-black opacity-10" style={{ color: colors.primary }}>{i + 1}</span>
                                <p className="text-5xl font-bold text-slate-800 leading-tight pt-4">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'list') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                    <h2 className="text-[120px] font-black text-slate-900 opacity-5 absolute top-10 left-10 leading-none">SUMMARY</h2>
                    <h2 className="text-8xl font-black text-slate-900 mb-20 relative z-10">{stripMarkdown(slide.heading)}</h2>
                    <div className="space-y-12 relative z-10">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="flex items-center gap-12 group">
                                <div className="w-12 h-12 rotate-45 shrink-0 transition-transform group-hover:scale-125" style={{ background: colors.primary }}></div>
                                <p className="text-5xl font-medium text-slate-600 border-b-2 border-slate-100 pb-4 flex-1">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'timeline') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center relative overflow-hidden">
                    <h2 className="text-6xl font-bold text-slate-900 mb-24">{stripMarkdown(slide.heading)}</h2>
                    <div className="w-full h-4 bg-slate-200 rounded-full relative mb-12">
                        <div className="absolute top-0 left-0 h-full rounded-full" style={{ width: '100%', background: colors.primary }}></div>
                        <div className="flex justify-between w-full absolute top-[-30px]">
                            {(slide.steps || slide.points || []).map((_, i) => (
                                <div key={i} className="w-16 h-16 rounded-full border-8 border-white shadow-lg" style={{ background: colors.secondary }}></div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-12 w-full mt-12">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="text-center">
                                <span className="text-2xl font-bold text-slate-400 uppercase mb-4 block">Key {i + 1}</span>
                                <p className="text-4xl font-bold text-slate-800 leading-tight">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'grid') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                    <h2 className="text-7xl font-black text-slate-900 mb-16">{stripMarkdown(slide.heading)}</h2>
                    <div className="flex-1 grid grid-cols-2 gap-8 min-h-0 content-center">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="relative bg-slate-50 rounded-3xl p-10 flex flex-col justify-center overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transition-all group-hover:opacity-40 group-hover:scale-110" style={{ background: colors.primary }}></div>
                                <span className="text-8xl font-black leading-none mb-4" style={{ color: colors.primary, opacity: 0.15 }}>{String(i + 1).padStart(2, '0')}</span>
                                <p className="text-3xl font-bold text-slate-800 leading-snug relative z-10">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (summaryVariant === 'photo') {
            return (
                <div className="h-full w-full flex bg-white overflow-hidden">
                    <div className="w-2/5 h-full relative flex items-center justify-center overflow-hidden p-12" style={{ background: getGradientCSS(colors) }}>
                        <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,1) 20px, rgba(255,255,255,1) 21px)' }}></div>
                        <div className="relative z-10 text-center p-12">
                            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center">
                                <span className="text-7xl text-white/80">✦</span>
                            </div>
                            <p className="text-white/60 text-2xl font-mono uppercase tracking-[0.3em]">Key Insights</p>
                        </div>
                    </div>
                    <div className="w-3/5 h-full p-20 flex flex-col justify-center">
                        <h2 className="text-6xl font-bold text-slate-900 mb-14">{stripMarkdown(slide.heading)}</h2>
                        <div className="space-y-8">
                            {(slide.steps || slide.points || []).map((step, i) => (
                                <div key={i} className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0 mt-1 transition-transform group-hover:scale-110 group-hover:-rotate-3" style={{ background: colors.primary }}>{i + 1}</div>
                                    <p className="text-3xl font-medium text-slate-700 leading-snug">{stripMarkdown(step)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (summaryVariant === 'bold') {
            return (
                <div className="h-full w-full flex flex-col relative overflow-hidden text-white" style={{ background: colors.dark }}>
                    <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: colors.primary }}></div>
                    <div className="relative z-10 flex-1 flex flex-col p-24">
                        <h2 className="text-6xl font-black uppercase tracking-[0.15em] mb-16 opacity-60">{stripMarkdown(slide.heading)}</h2>
                        <div className="flex-1 grid grid-cols-1 gap-6 content-center">
                            {(slide.steps || slide.points || []).map((step, i) => (
                                <div key={i} className="flex items-center gap-10 bg-white/5 backdrop-blur-sm rounded-2xl px-10 py-8 border-l-[14px] transition-all hover:bg-white/10" style={{ borderLeftColor: colors.primary }}>
                                    <span className="text-7xl font-black leading-none min-w-[80px]" style={{ color: colors.primary }}>{(i + 1).toString().padStart(2, '0')}</span>
                                    <p className="text-4xl font-bold leading-tight">{stripMarkdown(step)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (summaryVariant === 'checklist') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] rounded-bl-full" style={{ background: colors.primary }}></div>
                    <h2 className="text-7xl font-black text-slate-900 mb-16 relative z-10">{stripMarkdown(slide.heading)}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
                        {(slide.steps || slide.points || []).map((step, i) => (
                            <div key={i} className="flex items-center gap-8 bg-white rounded-3xl px-12 py-8 shadow-sm border border-slate-200 transition-all hover:shadow-md hover:-translate-y-0.5">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-inner" style={{ background: colors.primary }}>
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="text-4xl font-semibold text-slate-800 leading-snug">{stripMarkdown(step)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className={`text-8xl ${headingWeight} text-slate-900 mb-16 relative z-10`}>{stripMarkdown(slide.heading)}</h2>
                <div className="flex-1 flex flex-col justify-center space-y-12 relative z-10">
                    {(slide.steps || slide.points || []).map((step, i) => (
                        <div key={i} className="flex gap-10 items-center">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black text-white shrink-0 shadow-xl" style={{ border: `4px solid ${colors.secondary}`, background: colors.primary }}>✓</div>
                            <p className="text-5xl font-bold text-slate-700 leading-tight">{stripMarkdown(step)}</p>
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

export default SummarySlide;
