import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';

const ComparisonSlide = ({ slide, colors, palette }) => {
    return (
        <div className="h-full w-full flex bg-white relative overflow-hidden">
            <TemplateDecorations colors={colors} palette={palette} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-8 bg-white flex items-center justify-center text-5xl font-black z-20 shadow-xl" style={{ borderColor: colors.accent, color: colors.dark }}>VS</div>
            <div className="w-1/2 h-full p-16 flex flex-col justify-center relative overflow-hidden" style={{ background: `${colors.primary}10` }}>
                <h3 className="text-5xl font-black text-slate-800 mb-12 uppercase tracking-tighter">The Old Way</h3>
                <div className="space-y-8">
                    {(slide.left || []).map((item, i) => (
                        <div key={i} className="flex items-center gap-6">
                            <div className="w-8 h-8 rounded-full bg-red-400/20 text-red-500 flex items-center justify-center text-xl font-black">✕</div>
                            <p className="text-3xl font-medium text-slate-500">{stripMarkdown(item)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/2 h-full p-16 flex flex-col justify-center relative overflow-hidden" style={{ background: `${colors.secondary}10` }}>
                <h3 className="text-5xl font-black text-slate-800 mb-12 uppercase tracking-tighter">The New Way</h3>
                <div className="space-y-8">
                    {(slide.right || []).map((item, i) => (
                        <div key={i} className="flex items-center gap-6">
                            <div className="w-8 h-8 rounded-full bg-emerald-400/20 text-emerald-500 flex items-center justify-center text-xl font-black">✓</div>
                            <p className="text-3xl font-black text-slate-700">{stripMarkdown(item)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComparisonSlide;
