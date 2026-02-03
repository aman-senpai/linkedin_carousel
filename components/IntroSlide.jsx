import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations, { DotsPattern } from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const IntroSlide = ({ slide, colors, palette, headingWeight, userProfileImage, socialHandle, postTitle }) => {
    const introVariant = slide.variant || 'classic';
    const isDark = ['dark', 'hero'].includes(introVariant);

    const renderContent = () => {
        if (introVariant === 'card') {
            return (
                <div className="h-full w-full bg-slate-100 p-16 flex items-center justify-center relative">
                    <DotsPattern colors={colors} palette={palette} opacity={0.05} />
                    <div className="bg-white p-20 rounded-[60px] shadow-2xl w-full h-full flex flex-col justify-between relative overflow-hidden">
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />
                        )}
                        <div className="absolute top-0 left-0 w-full h-4" style={{ background: colors.primary }}></div>
                        <div>
                            <h2 className="text-7xl font-bold mb-10 text-slate-900">{slide.heading}</h2>
                            <div className="w-32 h-2 mb-10" style={{ background: colors.accent }}></div>
                            <p className="text-5xl text-slate-600 leading-relaxed font-light">{slide.text}</p>
                        </div>
                        <div className="flex items-end gap-6 mt-12">
                            <span className="text-[140px] font-black leading-none" style={{ color: colors.primary }}>{slide.stat}</span>
                            <span className="text-3xl font-bold text-slate-400 uppercase tracking-widest mb-6 max-w-xs">{slide.statDesc}</span>
                        </div>
                    </div>
                </div>
            );
        } else if (introVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative text-left">
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-5" style={{ background: colors.primary }}></div>
                    <h2 className="text-8xl font-black text-slate-900 mb-16 relative z-10 leading-tight tracking-tighter">{slide.heading}</h2>
                    <p className="text-5xl text-slate-500 leading-relaxed max-w-4xl relative z-10 border-l-8 pl-12" style={{ borderColor: colors.accent }}>{slide.text}</p>
                    <div className="mt-24 flex items-center gap-8 relative z-10">
                        <div className="text-7xl font-bold" style={{ color: colors.secondary }}>{slide.stat}</div>
                        <div className="text-3xl text-slate-400 max-w-sm">{slide.statDesc}</div>
                    </div>
                </div>
            );
        } else if (introVariant === 'split') {
            return (
                <div className="h-full w-full flex bg-slate-50 relative overflow-hidden">
                    <div className="w-1/2 h-full relative">
                        {slide.image ? (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover" alt="bg" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-20" style={{ background: colors.primary }}>
                                <h2 className="text-9xl font-black text-white leading-none tracking-tighter mix-blend-overlay opacity-50">{slide.stat}</h2>
                            </div>
                        )}
                    </div>
                    <div className="w-1/2 h-full p-20 flex flex-col justify-center bg-white relative">
                        <h2 className="text-7xl font-bold text-slate-900 mb-12">{slide.heading}</h2>
                        <p className="text-4xl text-slate-500 leading-relaxed mb-16">{slide.text}</p>
                        <div className="border-t-4 pt-12" style={{ borderColor: colors.accent }}>
                            <span className="text-6xl font-black block mb-4" style={{ color: colors.primary }}>{slide.stat}</span>
                            <span className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{slide.statDesc}</span>
                        </div>
                    </div>
                </div>
            );
        } else if (introVariant === 'big-stat') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
                    <span className="text-[350px] font-black leading-[0.8] mb-12 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400">{slide.stat}</span>
                    <div className="relative z-10 bg-white p-12 rounded-3xl shadow-xl max-w-4xl -mt-24 border border-slate-200">
                        <h2 className="text-5xl font-bold text-slate-900 mb-6">{slide.heading}</h2>
                        <p className="text-3xl text-slate-500">{slide.text}</p>
                    </div>
                </div>
            );
        } else if (introVariant === 'dark') {
            return (
                <div className="h-full w-full p-24 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute right-0 top-0 w-2/3 h-full opacity-20" style={{ background: getGradientCSS(colors) }}></div>
                    <div className="relative z-10">
                        <div className="inline-block px-6 py-2 rounded-full mb-12 border border-white/20 text-white/80 font-mono text-2xl">01 // INTRODUCTION</div>
                        <h2 className="text-8xl font-black text-white mb-16 leading-tight max-w-4xl">{slide.heading}</h2>
                        <div className="flex gap-16">
                            <div className="w-2 bg-gradient-to-b from-white to-transparent"></div>
                            <p className="text-5xl font-light text-slate-300 leading-relaxed max-w-3xl">{slide.text}</p>
                        </div>
                    </div>
                </div>
            );
        } else if (introVariant === 'magazine') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                    <div className="flex-1 columns-1">
                        <h2 className="text-[100px] font-serif italic text-slate-900 mb-12 leading-[0.9]">{slide.heading}</h2>
                        <div className="text-4xl text-slate-600 leading-relaxed font-serif relative pl-32">
                            <span className="absolute left-0 top-2 text-9xl font-black leading-[0.6] float-left mr-4 text-slate-200">{slide.text.charAt(0)}</span>
                            {slide.text.slice(1)}
                        </div>
                    </div>
                    <div className="mt-auto border-t-2 border-slate-900 pt-8 flex justify-between items-center">
                        <span className="text-2xl font-bold tracking-widest uppercase">Analysis</span>
                        <span className="text-5xl font-bold" style={{ color: colors.primary }}>{slide.stat}</span>
                    </div>
                </div>
            );
        } else if (introVariant === 'timeline') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex items-center relative overflow-hidden">
                    <div className="w-2 h-full bg-slate-200 absolute left-32"></div>
                    <div className="relative z-10 pl-32">
                        <div className="w-16 h-16 rounded-full border-8 border-slate-100 flex items-center justify-center -ml-[74px] mb-12" style={{ background: colors.primary }}></div>
                        <h2 className="text-8xl font-bold text-slate-900 mb-12">{slide.heading}</h2>
                        <div className="bg-white p-12 rounded-r-3xl border-l-8 shadow-sm max-w-4xl" style={{ borderColor: colors.accent }}>
                            <p className="text-4xl text-slate-600 leading-relaxed">{slide.text}</p>
                        </div>
                    </div>
                </div>
            );
        } else if (introVariant === 'chat') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="w-full max-w-4xl space-y-12">
                        <div className="bg-white p-10 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-sm self-start mr-24">
                            <p className="text-4xl text-slate-600 font-medium">Topic: {slide.heading}</p>
                        </div>
                        <div className="bg-blue-600 p-10 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl shadow-md self-end ml-24 text-white" style={{ background: colors.primary }}>
                            <p className="text-4xl font-light leading-relaxed">{slide.text}</p>
                        </div>
                        {slide.stat && (
                            <div className="flex justify-center mt-12">
                                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Key Stat: {slide.stat}</div>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else if (introVariant === 'hero') {
            return (
                <div className="h-full w-full flex flex-col relative overflow-hidden bg-slate-900">
                    {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="bg" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="mt-auto p-24 relative z-10">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-16 rounded-3xl">
                            <h2 className="text-7xl font-bold text-white mb-8">{slide.heading}</h2>
                            <div className="w-24 h-2 bg-white mb-8"></div>
                            <p className="text-4xl text-white/90 leading-relaxed max-w-4xl">{slide.text}</p>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-between relative">
                <DotsPattern colors={colors} palette={palette} opacity={0.03} />
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="flex-1 flex gap-12 items-center relative z-10">
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="w-24 h-3 mb-10" style={{ background: colors.primary }}></div>
                        <h2 className={`text-8xl ${headingWeight} text-slate-900 mb-10 leading-tight`}>{stripMarkdown(slide.heading)}</h2>
                        <p className="text-5xl text-slate-600 leading-relaxed max-w-5xl">{stripMarkdown(slide.text)}</p>
                    </div>
                    {slide.image && (
                        <div className="w-2/5 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                            <img src={slide.image} className="w-full h-full object-cover" alt="slide asset" />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-10 p-12 rounded-3xl shrink-0 relative z-10" style={{ background: `${colors.primary}15` }}>
                    <span className="text-[120px] font-black leading-none" style={{ color: colors.primary }}>{slide.stat}</span>
                    <p className="text-4xl font-medium text-slate-700">{stripMarkdown(slide.statDesc)}</p>
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

export default IntroSlide;
