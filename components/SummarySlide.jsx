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
