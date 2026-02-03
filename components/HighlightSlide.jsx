import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const HighlightSlide = ({ slide, colors, palette, headingWeight, socialHandle, postTitle }) => {
    const highlightVariant = slide.variant || 'centered';
    const isDark = ['heavy', 'gradient', 'split', 'neon', 'centered'].includes(highlightVariant);

    const renderContent = () => {
        if (highlightVariant === 'framed') {
            return (
                <div className="h-full w-full bg-white p-24 flex items-center justify-center relative">
                    <div className="w-full h-full border-[16px] flex items-center justify-center p-20 text-center relative" style={{ borderColor: colors.primary }}>
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="bg" />
                        )}
                        <h2 className="text-8xl font-black text-slate-900 leading-tight uppercase tracking-tight relative z-10">{slide.message}</h2>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-50" style={{ background: colors.accent }}></div>
                    </div>
                </div>
            );
        } else if (highlightVariant === 'heavy') {
            return (
                <div className="h-full w-full flex items-center justify-center text-center p-12 relative overflow-hidden" style={{ background: colors.dark }}>
                    {slide.image && (
                        <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="bg" />
                    )}
                    <h2 className="text-[140px] font-black text-white leading-[0.85] tracking-tighter mix-blend-overlay opacity-90">{slide.message}</h2>
                </div>
            );
        } else if (highlightVariant === 'gradient') {
            return (
                <div className="h-full w-full flex items-center justify-center text-center p-24 relative overflow-hidden text-white" style={{ background: getGradientCSS(colors) }}>
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay backdrop-blur-3xl"></div>
                    <h2 className="text-[100px] font-black leading-tight relative z-10 drop-shadow-xl">{slide.message}</h2>
                </div>
            );
        } else if (highlightVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white flex items-center justify-center text-center p-32 relative overflow-hidden">
                    <h2 className="text-[90px] font-light text-slate-800 leading-tight tracking-tight">{slide.message}</h2>
                    <div className="absolute bottom-24 w-24 h-2" style={{ background: colors.primary }}></div>
                </div>
            );
        } else if (highlightVariant === 'bold') {
            return (
                <div className="h-full w-full flex items-center justify-center text-center p-12 relative overflow-hidden bg-white">
                    <div className="absolute inset-0 px-12 py-12">
                        <div className="w-full h-full border-[30px] border-slate-900 flex items-center justify-center p-12">
                            <h2 className="text-[110px] font-black text-slate-900 leading-[0.85] uppercase tracking-tighter">{slide.message}</h2>
                        </div>
                    </div>
                </div>
            );
        } else if (highlightVariant === 'quote') {
            return (
                <div className="h-full w-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden bg-slate-50">
                    <span className="text-[200px] font-serif leading-none opacity-10 absolute top-24 left-24" style={{ color: colors.primary }}>“</span>
                    <h2 className="text-[80px] font-serif italic text-slate-800 leading-tight relative z-10 max-w-4xl">{slide.message}</h2>
                    <span className="text-[200px] font-serif leading-none opacity-10 absolute bottom-24 right-24" style={{ color: colors.primary }}>”</span>
                </div>
            );
        } else if (highlightVariant === 'card') {
            return (
                <div className="h-full w-full bg-slate-100 flex items-center justify-center p-24 relative overflow-hidden">
                    <div className="bg-white p-24 rounded-[60px] shadow-2xl relative overflow-hidden w-full h-full flex items-center justify-center text-center">
                        <div className="absolute top-0 w-full h-8" style={{ background: colors.primary }}></div>
                        <h2 className="text-[85px] font-bold text-slate-900 leading-tight">{slide.message}</h2>
                    </div>
                </div>
            );
        } else if (highlightVariant === 'split') {
            return (
                <div className="h-full w-full flex bg-slate-900 relative overflow-hidden">
                    <div className="w-1/3 h-full relative" style={{ background: colors.primary }}></div>
                    <div className="w-2/3 h-full flex items-center justify-center p-20 pl-0 relative z-10">
                        <h2 className="text-[110px] font-black text-white leading-[0.85] -ml-32">{slide.message}</h2>
                    </div>
                </div>
            );
        } else if (highlightVariant === 'neon') {
            return (
                <div className="h-full w-full bg-slate-900 flex items-center justify-center text-center p-24 relative overflow-hidden">
                    <h2 className="text-[100px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-tight drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ backgroundImage: getGradientCSS(colors) }}>
                        {slide.message}
                    </h2>
                </div>
            );
        }
        return (
            <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0" style={{ background: colors.primary }}>
                    <div className="absolute inset-0 mix-blend-multiply opacity-50" style={{ background: colors.secondary }}></div>
                    {slide.image ? (
                        <img src={slide.image} className="w-full h-full object-cover opacity-40 mix-blend-multiply" alt="background" />
                    ) : (
                        <div className="absolute inset-0" style={{ background: getGradientCSS(colors), opacity: 0.5 }}></div>
                    )}
                </div>
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="relative z-10">
                    <h2 className={`text-[80px] ${headingWeight} text-white leading-tight mb-12 max-w-5xl mx-auto`}>{stripMarkdown(slide.message)}</h2>
                    {slide.accent && <p className="text-4xl text-white/80 font-medium">{stripMarkdown(slide.accent)}</p>}
                </div>
            </div >
        );
    };

    return (
        <div className="w-full h-full relative group/slide">
            {renderContent()}
            <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode={isDark ? 'dark' : 'light'} />
        </div>
    );
};

export default HighlightSlide;
