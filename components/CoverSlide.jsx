import { getGradientCSS } from '@/lib/utils';
import TemplateDecorations, { DotsPattern } from './TemplateDecorations';

const CoverSlide = ({ slide, colors, palette, userProfileImage, headingClass, postTitle, socialHandle }) => {
    const displayTitle = postTitle || slide.title;
    const displayAuthor = socialHandle || slide.author;
    const coverVariant = slide.variant || 'centered';

    if (coverVariant === 'split') {
        return (
            <div className="h-full w-full flex text-white relative overflow-hidden" style={{ background: colors.dark }}>
                <div className="absolute inset-0 opacity-40 z-0" style={{ background: getGradientCSS(colors), opacity: 0.3 }}></div>
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="w-5/12 relative z-10 overflow-hidden h-full">
                    {slide.image ? (
                        <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl transform scale-110" style={{ backgroundImage: `url(${slide.image})` }}></div>
                            <img src={slide.image} className="relative z-10 w-full h-full object-contain p-8" alt="slide asset" />
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center" style={{ background: colors.primary }}>
                            <div className="absolute inset-0 bg-black/20 z-0"></div>
                            <span className="text-2xl font-bold tracking-[0.3em] writing-vertical-lr transform rotate-180 relative z-10" style={{ writingMode: 'vertical-rl' }}>{slide.tagline}</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
                    <h2
                        className={`${headingClass} leading-[0.95] mb-8`}
                        style={{ fontSize: displayTitle?.length > 40 ? '60px' : displayTitle?.length > 20 ? '75px' : '90px' }}
                    >
                        {displayTitle}
                    </h2>
                    <p className="text-5xl font-light text-slate-300 max-w-3xl mb-16">{slide.subtitle}</p>
                    <div className="flex items-center gap-6">
                        <img src={userProfileImage} className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                        <span className="text-3xl font-medium">{displayAuthor}</span>
                    </div>
                </div>
            </div>
        );
    } else if (coverVariant === 'minimal') {
        return (
            <div className="h-full w-full flex flex-col p-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
                <TemplateDecorations colors={colors} palette={palette} />
                {slide.image && (
                    <div className="flex-1 flex items-center justify-center relative z-10 min-h-0 mb-16">
                        <img src={slide.image} className="h-full w-auto object-contain rounded-3xl shadow-2xl" alt="slide asset" />
                    </div>
                )}
                <div className="relative z-10 mt-auto">
                    <span className="text-2xl font-bold tracking-[0.2em] mb-4 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                    <h2 className={`${headingClass} leading-[1] mb-6`} style={{ fontSize: displayTitle?.length > 40 ? '55px' : '80px' }}>{displayTitle}</h2>
                    <p className="text-4xl font-light text-slate-400 max-w-4xl mb-16">{slide.subtitle}</p>
                    <div className="flex items-center gap-6">
                        <img src={userProfileImage} className="w-16 h-16 rounded-full border-2 border-white/20" alt="profile" />
                        <span className="text-2xl font-medium text-slate-300">{displayAuthor}</span>
                    </div>
                </div>
            </div>
        );
    } else if (coverVariant === 'bold') {
        return (
            <div className="h-full w-full flex flex-col justify-center p-24 relative overflow-hidden" style={{ background: colors.primary }}>
                <div className="absolute inset-0 mix-blend-multiply opacity-50 bg-black"></div>
                {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="bg" />}
                <div className="relative z-10 border-l-[20px] border-white pl-16">
                    <span className="text-4xl font-bold text-white tracking-[0.3em] mb-8 block uppercase">{slide.tagline}</span>
                    <h2 className="text-[110px] font-black text-white leading-[0.9] mb-12 uppercase tracking-tighter">{displayTitle}</h2>
                    <p className="text-5xl font-medium text-white/80 max-w-4xl">{slide.subtitle}</p>
                </div>
            </div>
        );
    } else if (coverVariant === 'card') {
        return (
            <div className="h-full w-full flex items-center justify-center p-16 relative overflow-hidden bg-slate-100">
                {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />}
                <div className="w-full h-full bg-white rounded-[60px] shadow-2xl p-20 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-6" style={{ background: colors.primary }}></div>
                    <span className="text-2xl font-bold tracking-[0.2em] mb-8 block text-slate-400">{slide.tagline}</span>
                    <h2 className="text-[90px] font-black text-slate-900 leading-[0.95] mb-10">{displayTitle}</h2>
                    <p className="text-5xl text-slate-500 max-w-3xl mb-16">{slide.subtitle}</p>
                    <div className="mt-auto flex items-center gap-6">
                        <img src={userProfileImage} className="w-20 h-20 rounded-full bg-slate-100" alt="profile" />
                        <span className="text-3xl font-bold text-slate-900">{displayAuthor}</span>
                    </div>
                </div>
            </div>
        );
    } else if (coverVariant === 'photo') {
        return (
            <div className="h-full w-full flex flex-col justify-end p-24 relative overflow-hidden bg-slate-900">
                {slide.image ? (
                    <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="bg" />
                ) : (
                    <div className="absolute inset-0 opacity-20" style={{ background: getGradientCSS(colors) }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20">
                        <h2 className="text-[80px] font-black text-white leading-none mb-8">{displayTitle}</h2>
                        <p className="text-4xl text-white/90">{slide.subtitle}</p>
                    </div>
                </div>
            </div>
        );
    } else if (coverVariant === 'typographic') {
        return (
            <div className="h-full w-full bg-slate-50 p-16 flex flex-col relative overflow-hidden">
                <div className="flex-1 flex flex-col justify-center relative z-10">
                    <h2 className="text-[130px] font-black text-slate-900 leading-[0.85] tracking-tighter mb-12 mix-blend-multiply" style={{ color: colors.dark }}>
                        {displayTitle.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : ''} style={i % 2 === 1 ? { backgroundImage: getGradientCSS(colors) } : {}}>{word} <br /></span>
                        ))}
                    </h2>
                </div>
                <div className="h-2 w-full mb-12" style={{ background: colors.primary }}></div>
                <div className="flex justify-between items-end">
                    <p className="text-4xl font-bold text-slate-500 max-w-2xl">{slide.subtitle}</p>
                    <span className="text-2xl font-mono text-slate-400">{displayAuthor}</span>
                </div>
            </div>
        );
    } else if (coverVariant === 'gradient') {
        return (
            <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 relative overflow-hidden text-white" style={{ background: getGradientCSS(colors) }}>
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="bg" />}
                <div className="relative z-10 border-4 border-white/30 p-20 rounded-[4rem]">
                    <span className="text-3xl font-bold tracking-[0.4em] mb-12 block">{slide.tagline}</span>
                    <h2 className="text-[90px] font-black leading-tight mb-12">{displayTitle}</h2>
                    <p className="text-4xl font-medium opacity-90">{slide.subtitle}</p>
                </div>
            </div>
        );
    } else if (coverVariant === 'boxed') {
        return (
            <div className="h-full w-full bg-white p-12 flex relative">
                <div className="flex-1 border-8 border-slate-900 p-16 flex flex-col relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900 -mr-8 -mt-8 -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900 -ml-8 -mb-8 -z-10 opacity-10"></div>
                    <div className="mt-auto mb-auto">
                        <span className="inline-block px-6 py-2 bg-slate-900 text-white text-2xl font-bold mb-8">{slide.tagline}</span>
                        <h2 className="text-[100px] font-bold text-slate-900 leading-[0.9] mb-10">{displayTitle}</h2>
                        <div className="w-24 h-4 bg-slate-900 mb-10"></div>
                        <p className="text-4xl text-slate-600 max-w-3xl">{slide.subtitle}</p>
                    </div>
                </div>
            </div>
        );
    } else if (coverVariant === 'stripe') {
        return (
            <div className="h-full w-full flex bg-white relative">
                <div className="w-32 h-full" style={{ background: colors.primary }}></div>
                <div className="flex-1 flex flex-col justify-center pl-20 pr-32">
                    <h2 className="text-[100px] font-black text-slate-900 leading-none mb-12 -ml-36 bg-white py-4 pr-12">{displayTitle}</h2>
                    {slide.image && (
                        <div className="h-64 w-full mb-12 rounded-3xl overflow-hidden relative">
                            <img src={slide.image} className="w-full h-full object-cover" alt="asset" />
                        </div>
                    )}
                    <p className="text-5xl text-slate-500 font-light">{slide.subtitle}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="h-full w-full flex flex-col justify-center px-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
            <div className="absolute inset-0 opacity-40 z-0" style={{
                backgroundImage: `radial-gradient(at 0% 0%, ${colors.primary} 0, transparent 50%), radial-gradient(at 100% 0%, ${colors.secondary} 0, transparent 50%)`
            }}></div>
            {slide.image && (
                <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" alt="slide asset" />
            )}
            <DotsPattern colors={colors} palette={palette} opacity={0.05} />
            <TemplateDecorations colors={colors} palette={palette} />
            <div className="relative z-10">
                <span className="text-3xl font-bold tracking-[0.2em] mb-6 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                <h2
                    className={`${headingClass} leading-[0.95] mb-10`}
                    style={{ fontSize: displayTitle?.length > 40 ? '70px' : displayTitle?.length > 20 ? '85px' : '100px' }}
                >
                    {displayTitle}
                </h2>
                <p className="text-6xl font-light text-slate-300 max-w-4xl mx-auto">{slide.subtitle}</p>
                <div className="mt-20 flex items-center gap-6 justify-center">
                    <img src={userProfileImage} className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                    <span className="text-3xl font-medium">{displayAuthor}</span>
                </div>
            </div>
        </div>
    );
};

export default CoverSlide;
