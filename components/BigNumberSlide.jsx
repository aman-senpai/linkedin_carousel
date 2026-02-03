import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const BigNumberSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    const bigVariant = slide.variant || 'classic';
    const isDark = ['split', 'dark', 'gradient', 'bold'].includes(bigVariant);

    const renderContent = () => {
        if (bigVariant === 'framed') {
            return (
                <div className="h-full w-full bg-white p-24 flex items-center justify-center relative">
                    <div className="w-full h-full border-[12px] p-24 flex flex-col items-center justify-center text-center relative" style={{ borderColor: colors.primary }}>
                        <div className="absolute top-0 right-0 w-48 h-48 -mr-12 -mt-12 bg-slate-900 -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 -ml-12 -mb-12 bg-slate-100 -z-10"></div>
                        <h2 className="text-[250px] font-black leading-none mb-12 tracking-tighter" style={{ color: colors.primary }}>{slide.number}</h2>
                        <p className="text-5xl font-bold text-slate-800 leading-tight max-w-3xl mb-12">{slide.description}</p>
                        <div className="h-2 w-32" style={{ background: colors.accent }}></div>
                    </div>
                </div>
            );
        } else if (bigVariant === 'split') {
            return (
                <div className="h-full w-full flex bg-slate-900 relative overflow-hidden text-white" style={{ background: colors.dark }}>
                    <div className="w-1/2 h-full flex flex-col justify-center p-24" style={{ background: colors.primary }}>
                        <h2 className="text-[140px] font-black leading-none mb-12 drop-shadow-2xl">{slide.number}</h2>
                        <div className="h-2 w-24 bg-white"></div>
                    </div>
                    <div className="w-1/2 h-full flex items-center justify-center p-20 text-center">
                        <p className="text-5xl font-light leading-relaxed text-slate-300">{slide.description}</p>
                    </div>
                </div>
            );
        } else if (bigVariant === 'card') {
            return (
                <div className="h-full w-full bg-slate-100 p-24 flex items-center justify-center relative overflow-hidden">
                    <div className="bg-white p-24 rounded-[80px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center w-full h-full border-8 border-white">
                        <div className="absolute top-0 w-full h-24 opacity-10" style={{ background: colors.primary }}></div>
                        <h2 className="text-[180px] font-black mb-10 leading-none" style={{ color: colors.primary }}>{slide.number}</h2>
                        <p className="text-5xl font-medium text-slate-600 leading-snug max-w-3xl">{slide.description}</p>
                    </div>
                </div>
            );
        } else if (bigVariant === 'dark') {
            return (
                <div className="h-full w-full p-24 flex flex-col justify-center relative overflow-hidden text-white" style={{ background: colors.dark }}>
                    <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl" style={{ background: colors.primary }}></div>
                    <div className="relative z-10">
                        <span className="text-10xl font-black block leading-none mb-16 tracking-tighter" style={{ fontSize: '240px', color: colors.primary }}>{slide.number}</span>
                        <div className="flex gap-12 items-start">
                            <div className="w-3 h-40 shrink-0" style={{ background: colors.accent }}></div>
                            <div>
                                <p className="text-6xl font-bold leading-tight mb-8">{slide.description}</p>
                                <span className="text-3xl text-slate-400 font-mono italic opacity-60 uppercase tracking-[0.2em]">{slide.source}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (bigVariant === 'circle') {
            return (
                <div className="h-full w-full bg-white p-24 flex items-center justify-center relative overflow-hidden">
                    <div className="w-[800px] h-[800px] rounded-full flex flex-col items-center justify-center text-center border-[40px] relative transition-transform hover:scale-105 duration-700" style={{ borderColor: `${colors.primary}15` }}>
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white border-8 flex items-center justify-center rounded-3xl rotate-12 shadow-xl" style={{ borderColor: colors.primary }}>
                            <span className="text-7xl font-black" style={{ color: colors.primary }}>!</span>
                        </div>
                        <h2 className="text-[180px] font-black leading-none mb-10 tracking-tighter" style={{ color: colors.primary }}>{slide.number}</h2>
                        <p className="text-4xl font-bold text-slate-800 leading-tight max-w-md">{slide.description}</p>
                    </div>
                </div>
            );
        } else if (bigVariant === 'gradient') {
            return (
                <div className="h-full w-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden text-white" style={{ background: getGradientCSS(colors) }}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <h2 className="text-[250px] font-black leading-none mb-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">{slide.number}</h2>
                        <div className="bg-white/20 backdrop-blur-md p-10 rounded-3xl border border-white/30 max-w-3xl">
                            <p className="text-5xl font-bold leading-tight">{slide.description}</p>
                        </div>
                    </div>
                </div>
            );
        } else if (bigVariant === 'bold') {
            return (
                <div className="h-full w-full bg-slate-900 flex flex-col justify-end p-24 relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute top-10 left-10 text-[400px] font-black opacity-10 leading-none pointer-events-none" style={{ color: colors.secondary }}>{slide.number}</div>
                    <div className="relative z-10">
                        <h2 className="text-[180px] font-black text-white leading-[0.8] mb-12">{slide.number}</h2>
                        <p className="text-6xl font-bold text-white max-w-4xl border-l-[16px] pl-10 leading-tight" style={{ borderColor: colors.primary }}>{slide.description}</p>
                    </div>
                </div>
            );
        } else if (bigVariant === 'simple') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="w-1/3 h-px bg-slate-200 mb-20"></div>
                    <h2 className="text-[220px] font-bold text-slate-900 mb-12 tracking-tight">{slide.number}</h2>
                    <p className="text-4xl text-slate-500 max-w-2xl font-light italic">{slide.description}</p>
                    <div className="w-1/3 h-px bg-slate-200 mt-20"></div>
                </div>
            );
        }

        // Classic
        return (
            <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="relative z-10">
                    <h2 className="text-[250px] font-black leading-none mb-10 tracking-tighter" style={{ color: colors.primary }}>{slide.number}</h2>
                    <div className="w-24 h-4 mx-auto mb-12" style={{ background: colors.accent }}></div>
                    <p className="text-6xl font-black text-slate-900 leading-tight max-w-5xl mx-auto mb-8">{slide.description}</p>
                    <p className="text-3xl text-slate-400 font-bold uppercase tracking-widest">{slide.source}</p>
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

export default BigNumberSlide;
