import { stripMarkdown, getGradientCSS } from '@/lib/utils';
import TemplateDecorations from './TemplateDecorations';
import SlideFooter from './SlideFooter';

const TestimonialSlide = ({ slide, colors, palette, socialHandle, postTitle }) => {
    const testimonialVariant = slide.variant || 'classic';
    const isDark = ['photo'].includes(testimonialVariant);

    const renderContent = () => {
        if (testimonialVariant === 'cards') {
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
                    <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto w-full">
                        {[(slide.testimonials || [])[0]].map((t, i) => (
                            <div key={i} className="bg-white p-12 rounded-[40px] shadow-xl relative border border-slate-100 italic">
                                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg" style={{ background: colors.primary }}>“</div>
                                <p className="text-4xl text-slate-600 leading-relaxed mb-10">{stripMarkdown(t?.text || slide.text)}</p>
                                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-50">
                                    <img src={t?.image || '/profile.png'} className="w-20 h-20 rounded-full border-4 border-slate-50" alt="avatar" />
                                    <div>
                                        <p className="text-3xl font-black text-slate-900">{stripMarkdown(t?.author || slide.author)}</p>
                                        <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">{stripMarkdown(t?.role || slide.role)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (testimonialVariant === 'minimal') {
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="w-32 h-2 mb-16" style={{ background: colors.primary }}></div>
                    <p className="text-5xl font-serif italic text-slate-700 leading-tight mb-20 max-w-4xl">“{stripMarkdown(slide.text)}”</p>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-4xl font-bold text-slate-900">{stripMarkdown(slide.author)}</p>
                        <p className="text-xl text-slate-400 uppercase tracking-[0.2em]">{stripMarkdown(slide.role)}</p>
                    </div>
                </div>
            );
        } else if (testimonialVariant === 'photo') {
            return (
                <div className="h-full w-full flex bg-slate-900 overflow-hidden relative">
                    <div className="w-1/2 h-full relative">
                        <img src={slide.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200'} className="absolute inset-0 w-full h-full object-cover" alt="testimonial" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900"></div>
                    </div>
                    <div className="w-1/2 h-full p-20 flex flex-col justify-center relative z-10">
                        <div className="text-8xl font-black text-white/10 mb-[-40px]">TRUST</div>
                        <p className="text-4xl font-light text-white leading-relaxed mb-12 italic border-l-4 pl-8" style={{ borderColor: colors.primary }}>“{stripMarkdown(slide.text)}”</p>
                        <div>
                            <p className="text-4xl font-bold text-white mb-2">{stripMarkdown(slide.author)}</p>
                            <p className="text-xl text-slate-400 uppercase font-bold tracking-widest">{stripMarkdown(slide.role)}</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Classic
        return (
            <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <TemplateDecorations colors={colors} palette={palette} />
                <div className="relative z-10 w-full max-w-5xl">
                    <div className="flex justify-center mb-12">
                        {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} className="w-10 h-10 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                    </div>
                    <p className="text-6xl font-bold text-slate-800 leading-tight mb-16 italic">“{stripMarkdown(slide.text)}”</p>
                    <div className="flex items-center justify-center gap-8">
                        <img src={slide.image || '/profile.png'} className="w-24 h-24 rounded-full border-8 shadow-2xl" style={{ borderColor: colors.primary }} alt="avatar" />
                        <div className="text-left">
                            <p className="text-4xl font-black text-slate-900 uppercase tracking-tight">{stripMarkdown(slide.author)}</p>
                            <p className="text-2xl font-bold text-slate-400">{stripMarkdown(slide.role)}</p>
                        </div>
                    </div>
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

export default TestimonialSlide;
