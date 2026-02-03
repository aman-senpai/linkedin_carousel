import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const StatsGridSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    return (
        <div className="w-full h-full relative group/slide">
            <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className="text-6xl font-black text-white mb-16 relative z-10 text-center uppercase tracking-tighter">{stripMarkdown(slide.heading)}</h2>
                <div className="grid grid-cols-2 gap-10 relative z-10 h-full max-h-[800px]">
                    {(slide.stats || []).map((stat, i) => {
                        const val = stripMarkdown(stat.v || stat.value || "");
                        const fontSize = val.length > 8 ? 'text-6xl' : val.length > 6 ? 'text-7xl' : val.length > 4 ? 'text-8xl' : 'text-[120px]';

                        return (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-[60px] p-12 flex flex-col items-center justify-center text-center backdrop-blur-3xl group hover:-translate-y-4 transition-transform duration-500 overflow-hidden">
                                <div className={`${fontSize} font-black leading-none mb-6 drop-shadow-2xl transition-all duration-300`} style={{ color: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                    {val}
                                </div>
                                <div className="text-3xl font-bold text-white/50 uppercase tracking-widest">
                                    {stripMarkdown(stat.l || stat.label || "")}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="dark" />
        </div>
    );
};

export default StatsGridSlide;
