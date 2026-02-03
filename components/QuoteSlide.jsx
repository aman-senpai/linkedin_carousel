import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const QuoteSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    const quoteVariant = slide.variant || 'classic';
    const isDark = ['dark', 'photo'].includes(quoteVariant);

    const renderContent = () => {
        if (quoteVariant === 'modern') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-5 rotate-12" style={{ background: colors.primary }}></div>
                    <div className="bg-white p-24 rounded-[60px] shadow-2xl relative overflow-hidden flex flex-col justify-center w-full h-full border-8 border-white">
                        <div className="text-[200px] font-black absolute top-0 right-8 opacity-5 leading-none" style={{ color: colors.primary }}>”</div>
                        <p className="text-6xl font-bold text-slate-900 leading-[1.3] relative z-10 italic mb-12">“{stripMarkdown(slide.quote)}”</p>
                        <div className="flex items-center gap-6 mt-12 relative z-10">
                            <div className="w-16 h-1 bg-slate-900"></div>
                            <span className="text-4xl font-black text-slate-800 uppercase tracking-widest">{stripMarkdown(slide.cite)}</span>
                        </div>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="w-24 h-2 mb-20" style={{ background: colors.accent }}></div>
                    <p className="text-[80px] font-serif italic text-slate-800 leading-tight mb-16 max-w-4xl tracking-tight">“{stripMarkdown(slide.quote)}”</p>
                    <div className="text-4xl text-slate-400 font-bold uppercase tracking-[0.3em]">— {stripMarkdown(slide.cite)} —</div>
                </div>
            );
        } else if (quoteVariant === 'card') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex items-center justify-center relative overflow-hidden">
                    <div className="bg-white p-20 rounded-[40px] shadow-xl border border-slate-100 flex flex-col justify-between h-auto max-h-full">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mb-12" style={{ background: colors.primary }}>“</div>
                        <p className="text-5xl font-medium text-slate-700 leading-relaxed mb-16">{stripMarkdown(slide.quote)}</p>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                                {slide.image && <img src={slide.image} className="w-full h-full object-cover" alt="avatar" />}
                            </div>
                            <span className="text-3xl font-bold text-slate-900">{stripMarkdown(slide.cite)}</span>
                        </div>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'dark') {
            return (
                <div className="h-full w-full p-24 flex flex-col justify-center relative overflow-hidden text-white" style={{ background: colors.dark }}>
                    <div className="absolute right-0 top-0 w-2/3 h-full opacity-10" style={{ background: getGradientCSS(colors) }}></div>
                    <span className="text-[300px] font-black leading-none opacity-20 absolute top-0 left-0" style={{ color: colors.primary }}>“</span>
                    <p className="text-[75px] font-black leading-tight mb-20 relative z-10 drop-shadow-2xl">{stripMarkdown(slide.quote)}</p>
                    <div className="flex items-center gap-8 relative z-10 border-l-[12px] pl-8" style={{ borderColor: colors.accent }}>
                        <span className="text-5xl font-bold tracking-tight">{stripMarkdown(slide.cite)}</span>
                        <span className="text-2xl text-slate-400 font-mono italic">/ Author</span>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'pattern') {
            return (
                <div className="h-full w-full flex items-center justify-center p-24 relative overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle, ${colors.primary} 5px, transparent 5px)`, backgroundSize: '40px 40px' }}></div>
                    <div className="w-full h-full border-[20px] border-slate-900 flex flex-col justify-center p-20 text-center relative bg-white/80 backdrop-blur-sm shadow-2xl">
                        <p className="text-6xl font-black text-slate-900 mb-12 uppercase tracking-tighter leading-[0.9]">{stripMarkdown(slide.quote)}</p>
                        <p className="text-4xl font-bold text-slate-500 bg-slate-900 text-white px-8 py-2 self-center">{stripMarkdown(slide.cite)}</p>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'bubble') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="bg-white p-20 rounded-[80px_80px_80px_0] shadow-2xl relative mb-12">
                        <p className="text-5xl font-medium text-slate-700 leading-relaxed italic">“{stripMarkdown(slide.quote)}”</p>
                    </div>
                    <div className="flex items-center gap-8 self-start ml-12">
                        <img src={slide.image || '/profile.png'} className="w-24 h-24 rounded-full border-4 border-white shadow-xl" alt="avatar" />
                        <div>
                            <p className="text-4xl font-black text-slate-900 leading-none mb-2">{stripMarkdown(slide.cite)}</p>
                            <p className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Thought Leader</p>
                        </div>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'bold') {
            return (
                <div className="h-full w-full flex flex-col justify-center p-12 bg-white relative overflow-hidden">
                    <div className="p-16 h-full border-[1.5rem] border-slate-900 flex flex-col justify-center">
                        <h2 className="text-[140px] font-black text-slate-900 opacity-10 absolute top-20 right-20 pointer-events-none">QUOTE</h2>
                        <p className="text-[90px] font-black text-slate-900 leading-[0.8] mb-16 tracking-tighter uppercase">{stripMarkdown(slide.quote)}</p>
                        <p className="text-5xl font-bold text-blue-600 bg-slate-900 text-white p-8 self-end" style={{ background: colors.primary }}>{stripMarkdown(slide.cite)}</p>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'photo') {
            return (
                <div className="h-full w-full flex flex-col relative bg-slate-900 overflow-hidden">
                    <img src={slide.image || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200'} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="bg" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="mt-auto p-24 relative z-10 flex flex-col items-center text-center">
                        <div className="w-20 h-2 bg-white mb-10 rounded-full"></div>
                        <p className="text-6xl font-black text-white leading-tight mb-12 italic tracking-tight drop-shadow-2xl">“{stripMarkdown(slide.quote)}”</p>
                        <p className="text-4xl font-bold text-white/80 uppercase tracking-[0.2em]">{stripMarkdown(slide.cite)}</p>
                    </div>
                </div>
            );
        } else if (quoteVariant === 'split') {
            return (
                <div className="h-full w-full flex bg-slate-50 relative overflow-hidden">
                    <div className="w-1/2 h-full p-24 flex flex-col justify-center bg-white shadow-2xl relative z-10">
                        <h2 className="text-4xl font-black text-slate-300 uppercase tracking-widest mb-16">The Insight</h2>
                        <p className="text-[85px] font-black text-slate-900 leading-[0.85]">{stripMarkdown(slide.quote)}</p>
                    </div>
                    <div className="w-1/2 h-full flex flex-col justify-center items-center text-center p-20" style={{ background: colors.primary }}>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-white shadow-2xl mb-12">
                            {slide.image && <img src={slide.image} className="w-full h-full object-cover" alt="avatar" />}
                        </div>
                        <p className="text-[120px] text-white opacity-20 font-black leading-none absolute top-10 right-10">”</p>
                        <p className="text-5xl font-black text-white mb-4 tracking-tight">{stripMarkdown(slide.cite)}</p>
                        <p className="text-2xl text-white/70 font-bold uppercase tracking-[0.3em]">Author & Creator</p>
                    </div>
                </div>
            );
        }

        // Classic
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="relative z-10">
                    <div className="text-[250px] font-serif leading-none mix-blend-multiply opacity-5 mb-[-120px]" style={{ color: colors.primary }}>“</div>
                    <p className="text-7xl font-black text-slate-800 leading-tight mb-12 max-w-5xl mx-auto italic drop-shadow-sm">“{stripMarkdown(slide.quote)}”</p>
                    <div className="w-24 h-2 mx-auto bg-slate-900 mb-12" style={{ background: colors.primary }}></div>
                    <p className="text-4xl font-black text-slate-900 uppercase tracking-[0.2em]">{stripMarkdown(slide.cite)}</p>
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

export default QuoteSlide;
