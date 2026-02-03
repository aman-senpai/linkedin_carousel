import { stripMarkdown } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const ListSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    const listVariant = slide.variant || 'classic';
    const items = slide.items || slide.points || [];
    const isDark = ['grid'].includes(listVariant);

    const renderContent = () => {
        if (listVariant === 'cards') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative overflow-hidden">
                    <TemplateDecorations colors={colors} palette={palette} />
                    <h2 className="text-7xl font-black text-slate-900 mb-16 relative z-10">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
                        {items.map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 transition-transform hover:scale-[1.02]">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-md" style={{ background: colors.primary }}>{i + 1}</div>
                                <div className="text-3xl font-medium text-slate-700">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'numbered') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                    <h2 className="text-7xl font-bold text-slate-900 mb-20">{slide.heading}</h2>
                    <div className="flex flex-col gap-10">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-10">
                                <span className="text-8xl font-black opacity-20" style={{ color: colors.primary }}>0{i + 1}</span>
                                <p className="text-4xl font-bold text-slate-800">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'checklist') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
                    <div className="bg-white p-16 rounded-[40px] shadow-xl relative border border-slate-100">
                        <h2 className="text-6xl font-bold text-slate-900 mb-12 border-b-4 pb-6" style={{ borderColor: colors.accent }}>{slide.heading}</h2>
                        <div className="space-y-8">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl" style={{ background: colors.secondary }}>✓</div>
                                    <p className="text-3xl font-medium text-slate-600">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (listVariant === 'timeline') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                    <h2 className="text-7xl font-bold text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="relative pl-12 border-l-4" style={{ borderColor: colors.primary }}>
                        {items.map((item, i) => (
                            <div key={i} className="mb-12 last:mb-0 relative">
                                <div className="absolute -left-[58px] top-2 w-8 h-8 rounded-full border-4 border-white shadow-sm" style={{ background: colors.primary }}></div>
                                <p className="text-4xl font-medium text-slate-700">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'grid') {
            return (
                <div className="h-full w-full bg-slate-900 p-24 flex flex-col relative overflow-hidden">
                    <h2 className="text-7xl font-bold text-white mb-16">{slide.heading}</h2>
                    <div className="grid grid-cols-2 gap-8">
                        {items.map((item, i) => (
                            <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                                <div className="text-sm font-bold opacity-50 mb-2 uppercase tracking-widest text-white">Point {i + 1}</div>
                                <p className="text-3xl font-bold text-white leading-snug">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'steps') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                    <h2 className="text-7xl font-bold text-slate-900 mb-16 text-center">{slide.heading}</h2>
                    <div className="flex flex-col gap-6">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-6">
                                <div className="px-6 py-2 rounded-full text-2xl font-black text-white" style={{ background: i % 2 === 0 ? colors.primary : colors.secondary }}>STEP {i + 1}</div>
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <p className="text-3xl font-bold text-slate-800 shrink-0 max-w-xl text-right">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'bubbles') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center relative overflow-hidden">
                    <h2 className="text-7xl font-bold text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        {items.map((item, i) => (
                            <div key={i} className="px-10 py-6 rounded-[40px] shadow-sm border border-slate-100 bg-white hover:-translate-y-1 transition-transform">
                                <p className="text-3xl font-bold text-slate-700">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'notebook') {
            return (
                <div className="h-full w-full bg-yellow-50 p-24 flex flex-col relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '100% 4rem' }}>
                    <div className="absolute left-24 top-0 bottom-0 w-1 bg-red-300"></div>
                    <h2 className="text-7xl font-serif text-slate-900 mb-16 pl-12 italic">{slide.heading}</h2>
                    <div className="space-y-[2rem] pl-12 mt-2">
                        {items.map((item, i) => (
                            <p key={i} className="text-4xl font-handwriting text-slate-800 leading-[4rem] font-serif">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                        ))}
                    </div>
                </div>
            );
        } else if (listVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden text-center">
                    <h2 className="text-6xl font-light text-slate-400 mb-20 uppercase tracking-[0.2em]">{slide.heading}</h2>
                    <div className="space-y-8">
                        {items.map((item, i) => (
                            <p key={i} className="text-5xl font-bold text-slate-900">{typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}</p>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <h2 className="text-7xl font-bold text-slate-900 mb-16 relative z-10">{slide.heading}</h2>
                <ul className="space-y-8 relative z-10 pl-8">
                    {items.map((item, i) => (
                        <li key={i} className="text-4xl text-slate-600 list-disc marker:text-blue-500 font-medium leading-relaxed">
                            {typeof item === 'string' ? stripMarkdown(item) : stripMarkdown(item.text || item.t)}
                        </li>
                    ))}
                </ul>
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

export default ListSlide;
