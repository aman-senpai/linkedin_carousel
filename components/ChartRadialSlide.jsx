import { stripMarkdown } from '@/lib/utils';

const ChartRadialSlide = ({ slide, colors }) => {
    const variant = slide.variant || 'classic';
    const percentage = slide.percentage || 75;

    if (variant === 'card') {
        return (
            <div className="h-full w-full bg-slate-50 p-24 flex items-center justify-center relative overflow-hidden">
                <div className="bg-white rounded-[60px] shadow-2xl p-16 flex flex-col items-center max-w-3xl w-full">
                    <h2 className="text-5xl font-bold text-slate-900 mb-12 text-center">{stripMarkdown(slide.heading)}</h2>
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="250" cy="250" r="210" fill="none" stroke="#f1f5f9" strokeWidth="40" />
                            <circle cx="250" cy="250" r="210" fill="none" stroke={colors.primary} strokeWidth="40" strokeDasharray={2 * Math.PI * 210} strokeDashoffset={2 * Math.PI * 210 * (1 - percentage / 100)} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[120px] font-black leading-none" style={{ color: colors.primary }}>{percentage}%</span>
                        </div>
                    </div>
                    <p className="text-3xl font-medium text-slate-500 mt-10 text-center leading-relaxed">{stripMarkdown(slide.detail)}</p>
                </div>
            </div>
        );
    } else if (variant === 'gradient') {
        return (
            <div className="h-full w-full p-24 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` }}>
                <h2 className="text-6xl font-black text-slate-900 mb-16 text-center leading-tight">{stripMarkdown(slide.heading)}</h2>
                <div className="relative w-[650px] h-[650px] flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <defs>
                            <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={colors.primary} />
                                <stop offset="100%" stopColor={colors.secondary} />
                            </linearGradient>
                        </defs>
                        <circle cx="325" cy="325" r="275" fill="none" stroke="#e2e8f0" strokeWidth="50" />
                        <circle cx="325" cy="325" r="275" fill="none" stroke="url(#gradientStroke)" strokeWidth="50" strokeDasharray={2 * Math.PI * 275} strokeDashoffset={2 * Math.PI * 275 * (1 - percentage / 100)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[160px] font-black leading-none" style={{ color: colors.primary }}>{percentage}%</span>
                        <span className="text-4xl font-bold text-slate-400 mt-4 uppercase tracking-widest">Score</span>
                    </div>
                </div>
                <p className="text-3xl font-semibold text-slate-600 mt-12 max-w-2xl text-center">{stripMarkdown(slide.detail)}</p>
            </div>
        );
    } else if (variant === 'dark') {
        return (
            <div className="h-full w-full p-24 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                <h2 className="text-6xl font-bold text-white mb-16 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="50" />
                        <circle cx="300" cy="300" r="250" fill="none" stroke={colors.primary} strokeWidth="50" strokeDasharray={2 * Math.PI * 250} strokeDashoffset={2 * Math.PI * 250 * (1 - percentage / 100)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[140px] font-black leading-none text-white">{percentage}%</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-white/50 mt-14 max-w-2xl text-center">{stripMarkdown(slide.detail)}</p>
            </div>
        );
    } else if (variant === 'split') {
        return (
            <div className="h-full w-full flex relative overflow-hidden">
                <div className="w-1/2 h-full p-20 flex flex-col justify-center" style={{ background: colors.primary }}>
                    <h2 className="text-6xl font-black text-white leading-tight mb-8">{stripMarkdown(slide.heading)}</h2>
                    <p className="text-3xl font-medium text-white/70 leading-relaxed">{stripMarkdown(slide.detail)}</p>
                </div>
                <div className="w-1/2 h-full bg-white p-20 flex items-center justify-center">
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="250" cy="250" r="210" fill="none" stroke="#f1f5f9" strokeWidth="40" />
                            <circle cx="250" cy="250" r="210" fill="none" stroke={colors.primary} strokeWidth="40" strokeDasharray={2 * Math.PI * 210} strokeDashoffset={2 * Math.PI * 210 * (1 - percentage / 100)} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[120px] font-black leading-none" style={{ color: colors.primary }}>{percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (variant === 'minimal') {
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex items-center gap-16 max-w-5xl w-full">
                    <div className="flex-1">
                        <h2 className="text-5xl font-black text-slate-900 mb-8 leading-tight">{stripMarkdown(slide.heading)}</h2>
                        <div className="w-24 h-2 rounded-full mb-8" style={{ background: colors.primary }}></div>
                        <p className="text-2xl text-slate-500 leading-relaxed">{stripMarkdown(slide.detail)}</p>
                    </div>
                    <div className="relative w-[400px] h-[400px] flex items-center justify-center shrink-0">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="200" cy="200" r="170" fill="none" stroke="#f1f5f9" strokeWidth="30" />
                            <circle cx="200" cy="200" r="170" fill="none" stroke={colors.primary} strokeWidth="30" strokeDasharray={2 * Math.PI * 170} strokeDashoffset={2 * Math.PI * 170 * (1 - percentage / 100)} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl font-black" style={{ color: colors.primary }}>{percentage}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // classic - default layout
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center relative overflow-hidden">
                <h2 className="text-7xl font-bold text-slate-900 mb-20 text-center">{stripMarkdown(slide.heading)}</h2>
                <div className="relative w-[700px] h-[700px] flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="350" cy="350" r="300" fill="none" stroke="#f1f5f9" strokeWidth="60" />
                        <circle cx="350" cy="350" r="300" fill="none" stroke={colors.primary} strokeWidth="60" strokeDasharray={2 * Math.PI * 300} strokeDashoffset={2 * Math.PI * 300 * (1 - percentage / 100)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[180px] font-black leading-none" style={{ color: colors.primary }}>{percentage}%</span>
                    </div>
                </div>
                <p className="text-4xl font-bold text-slate-500 mt-16 max-w-2xl text-center">{stripMarkdown(slide.detail)}</p>
            </div>
        );
    }
};

export default ChartRadialSlide;
