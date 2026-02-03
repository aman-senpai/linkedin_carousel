import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations, { DotsPattern } from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const InfographicSlide = ({ slide, colors, palette, headingWeight, socialHandle, postTitle }) => {
    const infoVariant = slide.variant || 'classic';
    const isDark = ['grid'].includes(infoVariant);

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
