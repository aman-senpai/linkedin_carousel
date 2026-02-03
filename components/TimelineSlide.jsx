import { stripMarkdown } from '@/lib/utils';

const TimelineSlide = ({ slide, colors }) => {
    return (
        <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
            <h2 className="text-7xl font-bold text-slate-900 mb-20 text-center">{stripMarkdown(slide.heading)}</h2>
            <div className="relative pl-32 border-l-8 ml-12" style={{ borderColor: colors.primary }}>
                {(slide.events || []).map((event, i) => (
                    <div key={i} className="mb-20 last:mb-0 relative">
                        <div className="absolute -left-[76px] top-4 w-12 h-12 rounded-full border-8 border-slate-50 shadow-xl" style={{ background: colors.secondary }}></div>
                        <div className="text-5xl font-black mb-4" style={{ color: colors.primary }}>{stripMarkdown(event.year || event.t)}</div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 max-w-4xl">
                            <p className="text-4xl font-medium text-slate-700 leading-relaxed">{stripMarkdown(event.text || event.d)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimelineSlide;
