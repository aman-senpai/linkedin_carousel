import { stripMarkdown } from '@/lib/utils';

const ChartRadialSlide = ({ slide, colors }) => {
    return (
        <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-7xl font-bold text-slate-900 mb-20 text-center">{stripMarkdown(slide.heading)}</h2>
            <div className="relative w-[700px] h-[700px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                    <circle cx="350" cy="350" r="300" fill="none" stroke="#f1f5f9" strokeWidth="60" />
                    <circle cx="350" cy="350" r="300" fill="none" stroke={colors.primary} strokeWidth="60" strokeDasharray={2 * Math.PI * 300} strokeDashoffset={2 * Math.PI * 300 * (1 - (slide.percentage || 75) / 100)} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[180px] font-black leading-none" style={{ color: colors.primary }}>{slide.percentage}%</span>
                </div>
            </div>
            <p className="text-4xl font-bold text-slate-500 mt-16 max-w-2xl text-center">{stripMarkdown(slide.detail)}</p>
        </div>
    );
};

export default ChartRadialSlide;
