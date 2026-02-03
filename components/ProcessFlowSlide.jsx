import { stripMarkdown } from '@/lib/utils';

const ProcessFlowSlide = ({ slide, colors }) => {
    return (
        <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
            <h2 className="text-7xl font-black text-slate-900 mb-20">{stripMarkdown(slide.heading)}</h2>
            <div className="flex flex-col gap-16 relative">
                <div className="absolute left-[76px] top-10 bottom-10 w-2 bg-slate-100"></div>
                {(slide.steps || []).map((step, i) => (
                    <div key={i} className="flex items-center gap-12 relative">
                        <div className="w-[160px] h-[160px] rounded-[60px] flex items-center justify-center text-6xl font-black text-white shrink-0 shadow-2xl z-10" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>{i + 1}</div>
                        <div className="p-10 bg-slate-50 rounded-[40px] flex-1 border border-slate-100 shadow-sm">
                            <h3 className="text-4xl font-bold text-slate-800 mb-2">{stripMarkdown(step.t || step)}</h3>
                            <p className="text-3xl text-slate-500 leading-snug">{stripMarkdown(step.d || "")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessFlowSlide;
