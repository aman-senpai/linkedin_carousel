import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const StatsGridSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    const variant = slide.variant || 'classic';
    const stats = slide.stats || [];

    if (variant === 'grid') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-5xl font-black text-slate-800 mb-14 relative z-10 text-center uppercase tracking-tight">{stripMarkdown(slide.heading)}</h2>
                    <div className="grid grid-cols-4 gap-6 relative z-10">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            return (
                                <div key={i} className="bg-slate-50 rounded-[32px] p-8 flex flex-col items-center justify-center text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-5xl font-black leading-none mb-4" style={{ color: colors.primary }}>
                                        {val}
                                    </div>
                                    <div className="text-lg font-semibold text-slate-500 uppercase tracking-wider">
                                        {stripMarkdown(stat.l || stat.label || "")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="light" />
            </div>
        );
    } else if (variant === 'cards') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-gradient-to-br from-slate-50 to-white p-20 flex flex-col justify-center relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-5xl font-black text-slate-800 mb-14 relative z-10">{stripMarkdown(slide.heading)}</h2>
                    <div className="flex flex-col gap-5 relative z-10">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            return (
                                <div key={i} className="flex items-center gap-8 bg-white rounded-[24px] p-6 shadow-md border-l-8" style={{ borderLeftColor: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                    <div className="w-20 h-20 rounded-[16px] flex items-center justify-center text-3xl font-black text-white shrink-0" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-5xl font-black leading-none" style={{ color: colors.dark }}>{val}</div>
                                        <div className="text-xl font-medium text-slate-400 uppercase tracking-wider mt-1">{stripMarkdown(stat.l || stat.label || "")}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="light" />
            </div>
        );
    } else if (variant === 'bars') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-5xl font-black text-slate-800 mb-14 relative z-10">{stripMarkdown(slide.heading)}</h2>
                    <div className="flex items-end justify-center gap-8 relative z-10 flex-1 max-h-[600px] px-10">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            const barHeight = 30 + (i + 1) * (60 / stats.length);
                            return (
                                <div key={i} className="flex flex-col items-center gap-4 flex-1 h-full justify-end">
                                    <div className="text-3xl font-black" style={{ color: colors.primary }}>{val}</div>
                                    <div className="w-full rounded-t-[16px] transition-all duration-500 hover:opacity-80 relative" style={{ height: `${barHeight}%`, background: `linear-gradient(180deg, ${colors.primary}, ${colors.secondary})` }}></div>
                                    <div className="text-lg font-semibold text-slate-400 uppercase tracking-wider text-center">{stripMarkdown(stat.l || stat.label || "")}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="light" />
            </div>
        );
    } else if (variant === 'donut') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-white p-20 flex flex-col justify-center relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-5xl font-black text-slate-800 mb-14 relative z-10 text-center">{stripMarkdown(slide.heading)}</h2>
                    <div className="flex items-center justify-center gap-12 relative z-10 flex-wrap">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            const pct = Math.min(100, (i + 1) * (100 / stats.length));
                            const r = 80;
                            const c = 2 * Math.PI * r;
                            const off = c * (1 - pct / 100);
                            return (
                                <div key={i} className="flex flex-col items-center gap-4">
                                    <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90 absolute inset-0">
                                            <circle cx="110" cy="110" r={r} fill="none" stroke="#f1f5f9" strokeWidth="20" />
                                            <circle cx="110" cy="110" r={r} fill="none" stroke={i % 2 === 0 ? colors.primary : colors.secondary} strokeWidth="20" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
                                        </svg>
                                        <span className="text-4xl font-black relative z-10" style={{ color: i % 2 === 0 ? colors.primary : colors.secondary }}>{val}</span>
                                    </div>
                                    <span className="text-xl font-semibold text-slate-500 uppercase tracking-wider">{stripMarkdown(stat.l || stat.label || "")}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="light" />
            </div>
        );
    } else if (variant === 'split') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full flex relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <div className="w-1/2 h-full p-20 flex flex-col justify-center relative z-10" style={{ background: colors.primary }}>
                        <h2 className="text-6xl font-black text-white leading-tight max-w-lg">{stripMarkdown(slide.heading)}</h2>
                    </div>
                    <div className="w-1/2 h-full p-16 flex flex-col justify-center gap-8 bg-white relative z-10">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            return (
                                <div key={i} className="flex items-center gap-6 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                    <div className="text-4xl font-black shrink-0" style={{ color: colors.primary }}>{val}</div>
                                    <div className="text-xl font-semibold text-slate-500">{stripMarkdown(stat.l || stat.label || "")}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <SlideFooter socialHandle={socialHandle} postTitle={postTitle} mode="light" />
            </div>
        );
    } else if (variant === 'dark') {
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-20 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-5xl font-black text-white mb-14 relative z-10 text-center uppercase tracking-tight">{stripMarkdown(slide.heading)}</h2>
                    <div className="grid grid-cols-3 gap-6 relative z-10">
                        {stats.map((stat, i) => {
                            const val = stripMarkdown(stat.v || stat.value || "");
                            return (
                                <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-[24px] p-10 flex flex-col items-center justify-center text-center backdrop-blur-xl">
                                    <div className="text-5xl font-black leading-none mb-3" style={{ color: i % 2 === 0 ? colors.primary : colors.secondary }}>
                                        {val}
                                    </div>
                                    <div className="text-lg font-semibold text-white/30 uppercase tracking-widest">
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
    } else {
        // classic - default layout
        return (
            <div className="w-full h-full relative group/slide">
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-6xl font-black text-white mb-16 relative z-10 text-center uppercase tracking-tighter">{stripMarkdown(slide.heading)}</h2>
                    <div className="grid grid-cols-2 gap-10 relative z-10 h-full max-h-[800px]">
                        {stats.map((stat, i) => {
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
    }
};

export default StatsGridSlide;
