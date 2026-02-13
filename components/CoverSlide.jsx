import { getGradientCSS } from '@/lib/utils';
import TemplateDecorations, { DotsPattern } from './TemplateDecorations';

const CoverSlide = ({ slide, colors, palette, userProfileImage, headingClass, postTitle, socialHandle }) => {
    const displayTitle = postTitle || slide.title;
    const displayAuthor = socialHandle || slide.author;
    const coverVariant = slide.variant || 'centered';

    const renderVariant = () => {
        switch (coverVariant) {
            case 'split':
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
            case 'minimal':
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
            case 'bold':
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
            case 'card':
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
            case 'photo':
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
            case 'typographic':
                return (
                    <div className="h-full w-full bg-slate-50 p-16 flex flex-col relative overflow-hidden">
                        {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply" alt="bg" />}
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
            case 'gradient':
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
            case 'boxed':
                return (
                    <div className="h-full w-full bg-white p-12 flex relative overflow-hidden">
                        {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />}
                        <div className="flex-1 border-8 border-slate-900 p-16 flex flex-col relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900 -mr-8 -mt-8 -z-10"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900 -ml-8 -mb-8 -z-10 opacity-10"></div>
                            <div className="mt-auto mb-auto relative z-10">
                                <span className="inline-block px-6 py-2 bg-slate-900 text-white text-2xl font-bold mb-8">{slide.tagline}</span>
                                <h2 className="text-[100px] font-bold text-slate-900 leading-[0.9] mb-10">{displayTitle}</h2>
                                <div className="w-24 h-4 bg-slate-900 mb-10"></div>
                                <p className="text-4xl text-slate-600 max-w-3xl">{slide.subtitle}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'stripe':
                return (
                    <div className="h-full w-full flex bg-white relative">
                        <div className="w-32 h-full" style={{ background: colors.primary }}></div>
                        <div className="flex-1 flex flex-col justify-center pl-20 pr-32 relative">
                            {slide.image && (
                                <div className="absolute top-12 right-12 w-48 h-48 opacity-20">
                                    <img src={slide.image} className="w-full h-full object-cover rounded-full" alt="asset-mini" />
                                </div>
                            )}
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

            case 'modern-split':
                return (
                    <div className="h-full w-full flex bg-white overflow-hidden relative text-slate-900">
                        <div className="w-1/2 h-full relative">
                            <img src={slide.image || userProfileImage} className="w-full h-full object-cover" alt="cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-center p-20 relative z-10">
                            <span className="text-2xl font-bold tracking-widest mb-6" style={{ color: colors.primary }}>{slide.tagline}</span>
                            <h2 className="text-8xl font-black leading-none mb-8 uppercase tracking-tighter">{displayTitle}</h2>
                            <div className="w-20 h-2 mb-8" style={{ background: colors.secondary }}></div>
                            <p className="text-4xl text-slate-500 font-medium leading-tight mb-12">{slide.subtitle}</p>
                            <div className="flex items-center gap-4">
                                <img src={userProfileImage} className="w-16 h-16 rounded-full" alt="author" />
                                <span className="text-2xl font-bold text-slate-700">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'magazine':
                return (
                    <div className="h-full w-full bg-slate-50 p-12 relative overflow-hidden text-slate-900">
                        <div className="w-full h-full border-[12px] border-slate-900 p-16 flex flex-col">
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-2xl font-black tracking-tighter uppercase border-b-4 border-slate-900 pb-2">Issue #01</span>
                                <span className="text-2xl font-bold uppercase">{slide.tagline}</span>
                            </div>
                            <h2 className="text-[140px] font-serif italic leading-[0.8] mb-12 tracking-tighter">{displayTitle}</h2>
                            <div className="flex-1 flex gap-12 min-h-0">
                                <div className="w-1/3">
                                    <p className="text-3xl text-slate-600 font-serif leading-relaxed">{slide.subtitle}</p>
                                </div>
                                <div className="flex-1 rounded-2xl overflow-hidden relative shadow-2xl">
                                    <img src={slide.image || userProfileImage} className="w-full h-full object-cover" alt="cover" />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t-2 border-slate-900 flex justify-between items-end">
                                <span className="text-2xl font-mono uppercase font-bold">{displayAuthor}</span>
                                <span className="text-xl font-bold opacity-50">LinkedIn Exclusive</span>
                            </div>
                        </div>
                    </div>
                );

            case 'editorial':
                return (
                    <div className="h-full w-full bg-white flex flex-col p-24 relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 -mr-24 skew-x-12 opacity-50"></div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 mb-16">
                                <div className="h-px bg-slate-900 w-24"></div>
                                <span className="text-2xl font-bold tracking-[0.3em] text-slate-400">{slide.tagline}</span>
                            </div>
                            <h2 className="text-[110px] font-black leading-[0.9] mb-12">{displayTitle}</h2>
                            <div className="flex-1 flex items-center justify-between gap-16 min-h-0">
                                <p className="text-5xl font-light text-slate-500 max-w-2xl leading-snug">{slide.subtitle}</p>
                                <div className="w-2/5 aspect-square rounded-full border-[16px] border-slate-100 overflow-hidden shadow-2xl shrink-0">
                                    <img src={slide.image || userProfileImage} className="w-full h-full object-cover" alt="asset" />
                                </div>
                            </div>
                            <div className="mt-auto flex items-center gap-8">
                                <img src={userProfileImage} className="w-24 h-24 rounded-full p-2 border-2 border-slate-200" alt="profile" />
                                <div>
                                    <p className="text-3xl font-black text-slate-900 leading-none mb-2">{displayAuthor}</p>
                                    <p className="text-xl text-slate-400 font-bold uppercase tracking-widest">Thought Leader</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'asymmetric':
                return (
                    <div className="h-full w-full bg-slate-900 text-white flex p-12 gap-12 relative overflow-hidden">
                        <TemplateDecorations colors={colors} palette={palette} />
                        <div className="w-1/3 flex flex-col justify-between py-12">
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-full" style={{ background: colors.primary }}></div>
                                <span className="text-xl font-mono opacity-50 rotate-90 origin-left mt-24 translate-x-4 whitespace-nowrap uppercase tracking-[0.5em]">{slide.tagline}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-black">{displayAuthor}</span>
                                <div className="w-full h-1" style={{ background: colors.secondary }}></div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-8 pr-12 relative z-10">
                            <h2 className="text-[100px] font-black leading-[0.9] tracking-tighter uppercase">{displayTitle}</h2>
                            <p className="text-4xl font-light text-slate-400 max-w-2xl">{slide.subtitle}</p>
                            {slide.image && (
                                <div className="mt-8 border-t border-white/20 pt-12 flex gap-8">
                                    <img src={slide.image} className="w-64 h-64 object-cover rounded-3xl" alt="mini" />
                                    <div className="flex-1 flex flex-col justify-center">
                                        <p className="text-2xl font-bold opacity-50 mb-4 uppercase">Featured insight</p>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-2/3" style={{ background: colors.primary }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'overlay-text':
                return (
                    <div className="h-full w-full relative bg-slate-900 text-white overflow-hidden">
                        <img src={slide.image || userProfileImage} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="bg" />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
                        <div className="relative z-10 h-full p-24 flex flex-col justify-center">
                            <span className="text-2xl font-bold tracking-[0.4em] mb-12 px-6 py-2 border-l-8 border-white whitespace-nowrap w-fit" style={{ borderColor: colors.primary }}>{slide.tagline}</span>
                            <h2 className="text-[120px] font-black leading-[0.85] mb-12 drop-shadow-2xl uppercase tracking-tighter">{displayTitle}</h2>
                            <div className="flex items-center gap-12">
                                <div className="w-32 h-2 rounded-full" style={{ background: colors.primary }}></div>
                                <p className="text-5xl font-medium text-white shadow-black drop-shadow-lg">{slide.subtitle}</p>
                            </div>
                            <div className="mt-auto flex items-center gap-8 bg-white/10 backdrop-blur-xl p-8 rounded-full border border-white/20 w-fit">
                                <img src={userProfileImage} className="w-16 h-16 rounded-full border-2 border-white/40" alt="p" />
                                <span className="text-2xl font-bold pr-8">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'bordered-photo':
                return (
                    <div className="h-full w-full bg-white p-12 relative text-slate-900">
                        <div className="w-full h-full border-[30px] border-slate-50 flex flex-col items-center justify-center p-20 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5" style={{ background: getGradientCSS(colors) }}></div>
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <span className="text-2xl font-black text-slate-300 tracking-[0.5em] mb-12 uppercase">{slide.tagline}</span>
                                <h2 className="text-[90px] font-black leading-none mb-12 tracking-tight uppercase">{displayTitle}</h2>
                                {slide.image && (
                                    <div className="w-[500px] h-[350px] rounded-3xl overflow-hidden shadow-2xl mb-12 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                        <img src={slide.image} className="w-full h-full object-cover scale-110" alt="asset" />
                                    </div>
                                )}
                                <p className="text-4xl font-light text-slate-500 max-w-3xl leading-snug">{slide.subtitle}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'hero-image':
                return (
                    <div className="h-full w-full bg-white flex flex-col relative overflow-hidden text-slate-900">
                        <div className="h-[45%] w-full relative">
                            <img src={slide.image || userProfileImage} className="w-full h-full object-cover" alt="hero" />
                            <div className="absolute -bottom-1 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-24 pb-12">
                            <span className="text-2xl font-black tracking-widest mb-4 inline-block px-4 py-1 text-white bg-slate-900" style={{ background: colors.dark }}>{slide.tagline}</span>
                            <h2 className="text-[100px] font-black leading-[0.9] mb-8 tracking-tighter uppercase">{displayTitle}</h2>
                            <p className="text-5xl font-light text-slate-500 leading-tight max-w-4xl">{slide.subtitle}</p>
                            <div className="mt-12 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <img src={userProfileImage} className="w-16 h-16 rounded-full" alt="p" />
                                    <span className="text-2xl font-bold text-slate-800">{displayAuthor}</span>
                                </div>
                                <div className="w-32 h-32 rounded-full border-8 border-slate-50 flex items-center justify-center font-black text-slate-100 text-6xl">#01</div>
                            </div>
                        </div>
                    </div>
                );

            case 'glassmorphism':
                return (
                    <div className="h-full w-full relative flex items-center justify-center p-20 overflow-hidden" style={{ background: colors.dark }}>
                        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 animate-pulse" style={{ background: colors.primary }}></div>
                        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse delay-1000" style={{ background: colors.secondary }}></div>
                        <div className="w-full h-full bg-white/5 backdrop-blur-2xl rounded-[60px] border border-white/10 p-24 relative z-10 flex flex-col">
                            {slide.image && (
                                <img src={slide.image} className="absolute top-12 right-24 w-64 h-64 object-contain opacity-40 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" alt="glass-asset" />
                            )}
                            <span className="text-2xl font-bold tracking-[0.3em] text-white/40 mb-12 uppercase">{slide.tagline}</span>
                            <h2 className="text-[110px] font-black text-white leading-tight mb-12 uppercase">{displayTitle}</h2>
                            <p className="text-4xl text-white/70 max-w-3xl font-light leading-relaxed mb-16">{slide.subtitle}</p>
                            <div className="mt-auto flex items-center gap-8">
                                <div className="p-1 rounded-full bg-gradient-to-tr from-white/40 to-white/10">
                                    <img src={userProfileImage} className="w-20 h-20 rounded-full" alt="author" />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{displayAuthor}</p>
                                    <p className="text-xl text-white/40 font-bold tracking-widest uppercase">Expert Perspective</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'geometric':
                return (
                    <div className="h-full w-full bg-white relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 right-0 w-[60%] h-full bg-slate-900 origin-bottom flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
                            <img src={slide.image || userProfileImage} className="w-full h-full object-cover mix-blend-overlay rotate-12 scale-150" alt="geo-bg" />
                        </div>
                        <div className="relative z-10 h-full p-24 flex flex-col justify-center">
                            <div className="w-2/3">
                                <span className="inline-block border-b-[8px] border-slate-900 text-4xl font-black mb-12 pb-4 tracking-tighter" style={{ borderColor: colors.primary }}>{slide.tagline}</span>
                                <h2 className="text-[130px] font-black leading-[0.8] mb-12 tracking-tighter uppercase">{displayTitle}</h2>
                                <p className="text-5xl font-bold text-slate-500 max-w-xl leading-tight border-l-8 pl-10" style={{ borderColor: colors.secondary }}>{slide.subtitle}</p>
                            </div>
                            <div className="mt-20 flex items-center gap-6">
                                <div className="w-24 h-24 rounded-2xl rotate-45 flex items-center justify-center overflow-hidden shadow-xl">
                                    <img src={userProfileImage} className="w-[140%] h-[140%] object-cover -rotate-45" alt="p" />
                                </div>
                                <span className="text-3xl font-black uppercase tracking-widest">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'diagonal':
                return (
                    <div className="h-full w-full bg-white relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 left-0 w-full h-[60%] bg-slate-900 -skew-y-12 -mt-40 shadow-2xl overflow-hidden">
                            <img src={slide.image || userProfileImage} className="w-full h-full object-cover skew-y-12 scale-110 opacity-60" alt="diag-bg" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end p-24 items-center text-center">
                            <span className="text-3xl font-black text-white mb-12 tracking-[0.4em] drop-shadow-lg uppercase">{slide.tagline}</span>
                            <h2 className="text-[100px] font-black leading-[0.9] mb-8 drop-shadow-sm uppercase">{displayTitle}</h2>
                            <p className="text-4xl font-medium text-slate-500 max-w-4xl mb-12">{slide.subtitle}</p>
                            <div className="flex flex-col items-center gap-4 border-t-4 border-slate-100 pt-12 w-full max-w-2xl">
                                <img src={userProfileImage} className="w-20 h-20 rounded-full p-1 ring-4 ring-slate-100" alt="p" />
                                <span className="text-3xl font-bold text-slate-800 tracking-tighter">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'rounded-card':
                return (
                    <div className="h-full w-full bg-slate-100 p-24 flex items-center justify-center relative overflow-hidden text-slate-900">
                        <div className="absolute inset-0 mix-blend-multiply opacity-5" style={{ background: getGradientCSS(colors) }}></div>
                        <div className="bg-white p-20 rounded-[80px] shadow-2xl relative overflow-hidden w-full h-full flex flex-col">
                            <div className="h-[40%] rounded-[60px] overflow-hidden relative mb-12 shadow-inner">
                                <img src={slide.image || userProfileImage} className="w-full h-full object-cover" alt="asset" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center px-8">
                                <span className="text-2xl font-black uppercase tracking-widest mb-4" style={{ color: colors.primary }}>{slide.tagline}</span>
                                <h2 className="text-[80px] font-black leading-[0.9] mb-8 uppercase tracking-tighter">{displayTitle}</h2>
                                <p className="text-4xl text-slate-500 font-medium mb-12">{slide.subtitle}</p>
                                <div className="mt-auto flex items-center gap-6">
                                    <img src={userProfileImage} className="w-16 h-16 rounded-full border-2 border-slate-100" alt="p" />
                                    <span className="text-2xl font-bold">{displayAuthor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'minimal-vertical':
                return (
                    <div className="h-full w-full bg-white flex relative overflow-hidden text-slate-900">
                        <div className="w-[15%] h-full flex flex-col items-center justify-center border-r-2 border-slate-100 gap-24">
                            <span className="text-2xl font-black uppercase tracking-[0.5em] rotate-180" style={{ writingMode: 'vertical-rl' }}>{slide.tagline}</span>
                            <div className="w-1 h-32 bg-slate-900" style={{ background: colors.primary }}></div>
                        </div>
                        <div className="flex-1 p-24 flex flex-col justify-center">
                            <h2 className="text-[120px] font-black leading-[0.8] mb-12 tracking-tighter uppercase">{displayTitle}</h2>
                            <div className="flex gap-12 items-start">
                                <div className="flex-1">
                                    <p className="text-5xl font-light text-slate-500 leading-snug mb-12">{slide.subtitle}</p>
                                    <div className="flex items-center gap-6">
                                        <img src={userProfileImage} className="w-20 h-20 rounded-full" alt="p" />
                                        <span className="text-3xl font-black uppercase">{displayAuthor}</span>
                                    </div>
                                </div>
                                {slide.image && (
                                    <div className="w-1/3 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl rotate-3">
                                        <img src={slide.image} className="w-full h-full object-cover" alt="asset" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'neon':
                return (
                    <div className="h-full w-full bg-slate-950 flex flex-col justify-center p-24 relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" style={{ background: colors.primary }}></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" style={{ background: colors.secondary }}></div>
                        <div className="relative z-10">
                            <span className="text-3xl font-black tracking-widest mb-8 block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase" style={{ backgroundImage: getGradientCSS(colors) }}>{slide.tagline}</span>
                            <h2 className="text-[140px] font-black leading-none mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase tracking-tighter">{displayTitle}</h2>
                            <div className="flex gap-12 items-center">
                                <div className="h-px flex-1 bg-white/20"></div>
                                <p className="text-5xl font-medium text-white/70 italic">{slide.subtitle}</p>
                            </div>
                            <div className="mt-20 flex items-center gap-8">
                                <div className="p-1 rounded-full bg-white/20 backdrop-blur-xl">
                                    <img src={userProfileImage} className="w-20 h-20 rounded-full" alt="p" />
                                </div>
                                <span className="text-3xl font-bold tracking-tight">{displayAuthor}</span>
                            </div>
                        </div>
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen" alt="neon-bg" />
                        )}
                    </div>
                );

            case 'retro':
                return (
                    <div className="h-full w-full bg-[#fdf6e3] p-12 relative overflow-hidden text-[#2d2d2d]">
                        <div className="w-full h-full border-[10px] border-[#2d2d2d] p-16 flex flex-col relative">
                            <div className="absolute top-4 right-4 text-4xl font-black opacity-20">1990</div>
                            <h2 className="text-[120px] font-black leading-none mb-12 uppercase" style={{ textShadow: `8px 8px 0px ${colors.primary}` }}>{displayTitle}</h2>
                            <div className="flex-1 flex gap-12 items-center">
                                {slide.image && (
                                    <div className="w-1/2 h-full border-8 border-[#2d2d2d] shadow-[15px_15px_0px_#2d2d2d] overflow-hidden grayscale contrast-125">
                                        <img src={slide.image} className="w-full h-full object-cover" alt="asset" />
                                    </div>
                                )}
                                <div className="flex-1 flex flex-col justify-center">
                                    <span className="text-3xl font-black bg-[#2d2d2d] text-[#fdf6e3] px-6 py-2 mb-8 w-fit">{slide.tagline}</span>
                                    <p className="text-5xl font-bold leading-tight">{slide.subtitle}</p>
                                </div>
                            </div>
                            <div className="mt-12 flex items-center justify-between border-t-8 border-[#2d2d2d] pt-8">
                                <span className="text-3xl font-black uppercase tracking-widest">{displayAuthor}</span>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                                    <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'brutalist':
                return (
                    <div className="h-full w-full bg-white p-4 relative overflow-hidden text-slate-900">
                        <div className="w-full h-full bg-[#f0f0f0] p-16 flex flex-col border-[20px] border-slate-900">
                            <h2 className="text-[160px] font-black leading-[0.75] mb-12 uppercase tracking-tighter break-all">{displayTitle}</h2>
                            <div className="flex-1 flex items-end justify-between gap-12 min-h-0">
                                <div className="max-w-2xl border-l-[30px] border-slate-900 pl-12 pb-12">
                                    <span className="text-4xl font-bold uppercase mb-8 block">{slide.tagline}</span>
                                    <p className="text-6xl font-black leading-none uppercase">{slide.subtitle}</p>
                                </div>
                                {slide.image && (
                                    <div className="w-2/5 h-full bg-slate-900 p-4 shadow-[30px_30px_0px_rgba(0,0,0,1)]">
                                        <img src={slide.image} className="w-full h-full object-cover contrast-150 grayscale" alt="asset" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-auto flex justify-between items-end border-t-[10px] border-slate-900 pt-8">
                                <span className="text-5xl font-black uppercase italic">{displayAuthor}</span>
                                <span className="text-3xl font-bold">2026©</span>
                            </div>
                        </div>
                    </div>
                );

            case 'clean-white':
                return (
                    <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-center text-center relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 w-full h-2" style={{ background: colors.primary }}></div>
                        <span className="text-2xl font-bold tracking-[0.4em] mb-8 text-slate-300 uppercase">{slide.tagline}</span>
                        <h2 className="text-[100px] font-black leading-none mb-12 tracking-tight uppercase">{displayTitle}</h2>
                        <div className="w-24 h-1 bg-slate-900 mb-12"></div>
                        <p className="text-5xl font-light text-slate-500 max-w-4xl mb-16 leading-relaxed">{slide.subtitle}</p>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1">
                                <img src={userProfileImage} className="w-full h-full rounded-full" alt="p" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-widest">{displayAuthor}</span>
                        </div>
                    </div>
                );

            case 'dark-aesthetic':
                return (
                    <div className="h-full w-full bg-black flex flex-col justify-between p-24 relative overflow-hidden text-white">
                        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-slate-900 rounded-full blur-[200px] opacity-30"></div>
                        <div className="flex justify-between items-start">
                            <span className="text-2xl font-mono text-white/30 tracking-[0.3em] uppercase">{slide.tagline}</span>
                            <span className="text-8xl font-black text-white/10">01</span>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-[120px] font-black leading-[0.85] mb-8 tracking-tighter uppercase">{displayTitle}</h2>
                            <div className="h-2 w-32 bg-white mb-12" style={{ background: colors.secondary }}></div>
                            <p className="text-5xl font-medium text-white/60 max-w-3xl leading-snug italic">{slide.subtitle}</p>
                        </div>
                        <div className="mt-20 flex items-center gap-8 justify-between">
                            <div className="flex items-center gap-6">
                                <img src={userProfileImage} className="w-20 h-20 rounded-full grayscale border border-white/20" alt="p" />
                                <span className="text-3xl font-bold tracking-tight uppercase">{displayAuthor}</span>
                            </div>
                            <div className="text-white/20 font-mono tracking-widest uppercase text-xl">Perspective // 2026</div>
                        </div>
                    </div>
                );

            case 'gradient-mesh':
                return (
                    <div className="h-full w-full relative overflow-hidden text-white">
                        <div className="absolute inset-0 z-0" style={{
                            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                            filter: 'blur(60px)',
                            opacity: 0.8
                        }}></div>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl"></div>
                        <div className="relative z-10 h-full p-24 flex flex-col justify-center items-center text-center">
                            <span className="text-3xl font-black mb-12 tracking-[0.5em] px-8 py-2 bg-white/10 rounded-full border border-white/20 uppercase">{slide.tagline}</span>
                            <h2 className="text-[110px] font-black leading-[0.9] mb-12 drop-shadow-2xl uppercase tracking-tighter">{displayTitle}</h2>
                            <p className="text-5xl font-medium text-white/90 max-w-4xl leading-tight mb-16">{slide.subtitle}</p>
                            <div className="flex flex-col items-center gap-6">
                                <img src={userProfileImage} className="w-24 h-24 rounded-full border-4 border-white shadow-2xl" alt="p" />
                                <span className="text-3xl font-black uppercase tracking-widest bg-black/40 px-6 py-2 rounded-lg">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'floating-elements':
                return (
                    <div className="h-full w-full bg-slate-50 flex p-24 relative overflow-hidden text-slate-900">
                        <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-3xl rotate-12 blur-3xl opacity-20" style={{ background: colors.primary }}></div>
                        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 rounded-full -rotate-12 blur-[100px] opacity-20" style={{ background: colors.secondary }}></div>

                        <div className="flex-1 flex flex-col justify-center relative z-10">
                            <span className="text-2xl font-black text-slate-400 mb-8 uppercase tracking-widest">{slide.tagline}</span>
                            <h2 className="text-[120px] font-black leading-[0.8] mb-12 uppercase tracking-tighter drop-shadow-sm">{displayTitle}</h2>
                            <p className="text-5xl font-light text-slate-500 max-w-3xl leading-snug">{slide.subtitle}</p>
                        </div>

                        <div className="w-1/3 flex flex-col justify-end items-end relative z-10">
                            {slide.image && (
                                <div className="w-full aspect-square rounded-[4rem] overflow-hidden shadow-2xl mb-12 border-[20px] border-white transform hover:scale-105 transition-transform duration-500">
                                    <img src={slide.image} className="w-full h-full object-cover" alt="asset" />
                                </div>
                            )}
                            <div className="flex items-center gap-6 bg-white p-6 rounded-full shadow-xl border border-slate-100">
                                <img src={userProfileImage} className="w-16 h-16 rounded-full" alt="author" />
                                <span className="text-2xl font-black uppercase pr-6">{displayAuthor}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'artistic-splatter':
                return (
                    <div className="h-full w-full bg-white relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full blur-[100px]" style={{ background: colors.primary }}></div>
                            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[80px]" style={{ background: colors.secondary }}></div>
                        </div>
                        <div className="h-full w-full p-24 flex flex-col justify-center items-center text-center relative z-10">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="h-px w-20 bg-slate-300"></div>
                                <span className="text-3xl font-black italic tracking-widest text-slate-400 uppercase">{slide.tagline}</span>
                                <div className="h-px w-20 bg-slate-300"></div>
                            </div>
                            <h2 className="text-[140px] font-black leading-none mb-12 tracking-tighter uppercase relative">
                                <span className="absolute -inset-2 blur-2xl opacity-20 block text-transparent bg-clip-text" style={{ backgroundImage: getGradientCSS(colors) }}>{displayTitle}</span>
                                <span className="relative">{displayTitle}</span>
                            </h2>
                            <p className="text-6xl font-serif italic text-slate-500 max-w-5xl leading-tight mb-20">{slide.subtitle}</p>
                            <div className="flex items-center gap-8">
                                <div className="w-24 h-24 rounded-full p-2 border-4 border-slate-900 overflow-hidden shadow-2xl">
                                    <img src={userProfileImage} className="w-full h-full object-cover rounded-full" alt="p" />
                                </div>
                                <div className="text-left">
                                    <p className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{displayAuthor}</p>
                                    <p className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em]">Creator & Visionary</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'centered':
            default:
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
                        <div className="relative z-10 text-center">
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
        }
    };

    return (
        <div className="w-full h-full relative group/slide">
            {renderVariant()}
        </div>
    );
};


export default CoverSlide;
