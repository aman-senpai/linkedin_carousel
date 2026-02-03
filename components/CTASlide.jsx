import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';

const CTASlide = ({ slide, colors, palette, headingWeight, userProfileImage, userImages, socialHandle }) => {
    const displayHandle = socialHandle || slide.handle;
    const ctaVariant = slide.variant || 'classic';

    if (ctaVariant === 'minimal') {
        return (
            <div className="h-full w-full bg-white flex flex-col items-center justify-center text-center p-24 relative overflow-hidden">
                <div className="w-40 h-1 bg-slate-200 mb-20"></div>
                <h2 className="text-[100px] font-black text-slate-900 leading-none mb-12 tracking-tighter uppercase">{stripMarkdown(slide.title)}</h2>
                <p className="text-5xl text-slate-500 font-light max-w-4xl mb-24">{stripMarkdown(slide.subtitle)}</p>
                <button className="px-16 py-8 rounded-full text-4xl font-black text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 flex items-center gap-6" style={{ background: colors.primary }}>
                    {stripMarkdown(slide.button)}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        );
    } else if (ctaVariant === 'split') {
        return (
            <div className="h-full w-full flex bg-slate-50 relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="w-1/2 h-full flex flex-col justify-center p-24 bg-white relative z-10 shadow-2xl">
                    <h2 className="text-8xl font-black text-slate-900 leading-tight mb-10 tracking-tighter uppercase">{stripMarkdown(slide.title)}</h2>
                    <p className="text-4xl text-slate-500 mb-16 leading-relaxed">{stripMarkdown(slide.subtitle)}</p>
                </div>
                <div className="w-1/2 h-full flex flex-col justify-center items-center text-center p-16 relative" style={{ background: colors.primary }}>
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                    <img src={userProfileImage} className="w-48 h-48 rounded-[60px] border-[12px] border-white/30 shadow-2xl mb-12 rotate-3" alt="pfp" />
                    <button className="px-12 py-6 bg-white rounded-3xl text-3xl font-black shadow-2xl mb-8" style={{ color: colors.primary }}>
                        {stripMarkdown(slide.button)}
                    </button>
                    <p className="text-3xl font-black text-white/80 uppercase tracking-widest">{displayHandle}</p>
                </div>
            </div>
        );
    } else if (ctaVariant === 'social') {
        return (
            <div className="h-full w-full bg-slate-100 flex items-center justify-center p-24 relative overflow-hidden">
                <div className="bg-white rounded-[80px] p-24 shadow-2xl w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden border-8 border-white">
                    <img src={userProfileImage} className="w-40 h-40 rounded-full mb-12 border-8 shadow-xl" style={{ borderColor: colors.primary }} alt="pfp" />
                    <h2 className="text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{stripMarkdown(slide.title)}</h2>
                    <p className="text-4xl text-slate-500 mb-20">{stripMarkdown(slide.subtitle)}</p>
                    <div className="flex flex-col gap-6 w-full max-w-2xl">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
                            <span className="text-3xl font-black text-slate-800 uppercase tracking-widest">{stripMarkdown(slide.button)}</span>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: colors.primary }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (ctaVariant === 'card') {
        return (
            <div className="h-full w-full bg-slate-50 p-12 flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full bg-white rounded-[4rem] p-24 border-8 flex flex-col items-center justify-center text-center relative overflow-hidden" style={{ borderColor: `${colors.primary}10` }}>
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-5 rotate-12" style={{ background: colors.primary }}></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5 rotate-45" style={{ background: colors.secondary }}></div>
                    <h2 className="text-[110px] font-black text-slate-900 leading-none mb-10 tracking-tighter mix-blend-multiply drop-shadow-sm">{stripMarkdown(slide.title)}</h2>
                    <p className="text-5xl text-slate-400 mb-20 font-medium max-w-4xl italic tracking-tight italic leading-snug">{stripMarkdown(slide.subtitle)}</p>
                    <button className="px-20 py-10 rounded-[3rem] text-4xl font-black text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform" style={{ background: getGradientCSS(colors) }}>
                        {stripMarkdown(slide.button)}
                    </button>
                    <div className="mt-16 text-3xl font-black text-slate-300 uppercase tracking-[0.3em] font-mono">{displayHandle}</div>
                </div>
            </div>
        );
    } else if (ctaVariant === 'photo') {
        return (
            <div className="h-full w-full flex flex-col relative bg-slate-900 overflow-hidden">
                <div className="h-1/2 w-full relative">
                    <img src={userImages[0] || 'https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=1200'} className="absolute inset-0 w-full h-full object-cover" alt="bg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div className="h-1/2 w-full flex flex-col items-center text-center p-20 -mt-20 relative z-10">
                    <img src={userProfileImage} className="w-48 h-48 rounded-[60px] border-[12px] border-slate-900 shadow-2xl mb-12 rotate-[-3deg]" alt="pfp" />
                    <h2 className="text-8xl font-black text-white leading-tight mb-8 drop-shadow-2xl">{stripMarkdown(slide.title)}</h2>
                    <p className="text-4xl text-slate-400 mb-16">{stripMarkdown(slide.subtitle)}</p>
                    <button className="px-16 py-8 rounded-full text-3xl font-black text-white mb-2 shadow-2xl" style={{ background: colors.primary }}>
                        {stripMarkdown(slide.button)}
                    </button>
                </div>
            </div>
        );
    } else if (ctaVariant === 'bold') {
        return (
            <div className="h-full w-full p-24 flex flex-col justify-center relative overflow-hidden text-white" style={{ background: colors.dark }}>
                <div className="absolute right-0 top-0 w-3/4 h-full skew-x-[-20deg] opacity-20" style={{ background: colors.primary }}></div>
                <div className="relative z-10">
                    <h2 className="text-[130px] font-black leading-[0.8] mb-12 uppercase tracking-tighter drop-shadow-2xl">{stripMarkdown(slide.title)}</h2>
                    <div className="flex gap-16 items-start">
                        <div className="w-4 bg-white self-stretch"></div>
                        <div className="flex-1">
                            <p className="text-6xl font-black mb-16 leading-tight text-slate-100">{stripMarkdown(slide.subtitle)}</p>
                            <button className="px-16 py-8 bg-white rounded-none text-4xl font-black uppercase text-slate-900 hover:bg-slate-200 transition-colors shadow-none skew-x-[-12deg]">
                                <span className="inline-block skew-x-[12deg]">{stripMarkdown(slide.button)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (ctaVariant === 'gradient') {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden" style={{ background: getGradientCSS(colors) }}>
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="bg-white/20 backdrop-blur-3xl p-24 rounded-[5rem] border-4 border-white/40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative z-10 max-w-5xl">
                    <h2 className="text-[100px] font-black text-white leading-[0.9] mb-12 uppercase tracking-tight">{stripMarkdown(slide.title)}</h2>
                    <p className="text-5xl text-white/90 mb-20 font-medium italic">{stripMarkdown(slide.subtitle)}</p>
                    <button className="px-24 py-10 bg-white rounded-full text-5xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-transform" style={{ color: colors.primary }}>
                        {stripMarkdown(slide.button)}
                    </button>
                </div>
            </div>
        );
    } else if (ctaVariant === 'chat') {
        return (
            <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
                <div className="max-w-4xl space-y-12">
                    <div className="bg-white p-10 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-sm self-start mr-24">
                        <p className="text-4xl text-slate-400 font-bold uppercase tracking-widest mb-4">Your Question</p>
                        <p className="text-5xl font-bold text-slate-900 leading-tight italic tracking-tight">{stripMarkdown(slide.title)}</p>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl shadow-2xl ml-24 text-white relative" style={{ background: colors.primary }}>
                        <p className="text-4xl text-white/70 font-bold mb-4 uppercase tracking-widest">My Solution</p>
                        <img src={userProfileImage} className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 -right-10 shadow-2xl" alt="pfp" />
                        <p className="text-4xl font-light leading-relaxed mb-10">{stripMarkdown(slide.subtitle)}</p>
                        <button className="px-10 py-5 bg-white rounded-2xl text-3xl font-black" style={{ color: colors.primary }}>
                            {stripMarkdown(slide.button)}
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (ctaVariant === 'buttons') {
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="px-8 py-3 bg-slate-100 rounded-full text-2xl font-bold text-slate-400 uppercase tracking-widest mb-16">Call To Action</div>
                <h2 className="text-9xl font-black text-slate-900 leading-[0.85] mb-12 uppercase tracking-tighter">{stripMarkdown(slide.title)}</h2>
                <div className="w-full flex justify-center gap-12 mt-12">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl" style={{ background: colors.primary }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </div>
                        <span className="text-3xl font-black text-slate-900 uppercase">Follow</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl" style={{ background: colors.secondary }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        </div>
                        <span className="text-3xl font-black text-slate-900 uppercase">Like</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl" style={{ background: colors.accent }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <span className="text-3xl font-black text-slate-900 uppercase">Share</span>
                    </div>
                </div>
            </div>
        );
    }

    // Classic
    return (
        <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center items-center text-center relative overflow-hidden" style={{ background: colors.dark }}>
            <TemplateDecorations colors={colors} palette={palette} />
            <div className="absolute inset-0 opacity-20" style={{ background: getGradientCSS(colors) }}></div>
            <div className="relative z-10 w-full flex flex-col items-center justify-center">
                <img src={userProfileImage} className="w-48 h-48 rounded-full mb-12 border-8 border-white/20 shadow-2xl" alt="pfp" />
                <h2 className={`text-9xl ${headingWeight} text-white mb-10 leading-none drop-shadow-2xl`}>{stripMarkdown(slide.title)}</h2>
                <div className="w-32 h-3 bg-white mb-12 shadow-lg" style={{ background: colors.accent }}></div>
                <p className="text-5xl text-white/80 max-w-4xl mb-24 font-light leading-relaxed">{stripMarkdown(slide.subtitle)}</p>
                <button className="px-24 py-10 rounded-[3rem] text-5xl font-black text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-10" style={{ background: colors.primary }}>
                    {stripMarkdown(slide.button)}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <div className="mt-20 text-4xl font-black text-white/50 uppercase tracking-[0.4em] font-mono">{displayHandle}</div>
            </div>
        </div>
    );
};

export default CTASlide;
