import { TEMPLATES } from '@/lib/templates';

export const DotsPattern = ({ colors, palette, opacity = 0.1 }) => {
    if (palette.template === 'minimal') return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
            <svg className="w-full h-full">
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill={colors.primary} />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
        </div>
    );
};

export const FloatingCircles = ({ colors }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.primary }}></div>
        <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full blur-3xl opacity-50" style={{ background: colors.secondary }}></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: colors.accent }}></div>
    </div>
);

const TemplateDecorations = ({ colors, palette }) => {
    const currentTemplate = TEMPLATES.find(t => t.id === palette.templateId) || TEMPLATES[0];
    const decorationType = currentTemplate?.decorationType || palette.template || 'floating-circles';

    switch (decorationType) {
        case 'floating-circles':
            return <FloatingCircles colors={colors} />;

        case 'comic-halftone':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`, backgroundSize: '8px 8px' }}></div>
                    <div className="absolute top-0 left-0 w-40 h-40 rotate-12" style={{ background: colors.accent, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                    <div className="absolute bottom-10 right-10 text-[200px] font-black opacity-10 leading-none" style={{ color: colors.primary }}>POW!</div>
                    <div className="absolute top-1/2 left-10 text-[100px] font-black opacity-5 -rotate-12" style={{ color: colors.secondary }}>BOOM!</div>
                </div>
            );

        case 'hero-rays':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-15" style={{ background: `repeating-conic-gradient(from 0deg at 50% 120%, ${colors.primary} 0deg 5deg, transparent 5deg 15deg)` }}></div>
                    <div className="absolute top-0 left-0 right-0 h-3" style={{ background: colors.accent }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: colors.accent }}></div>
                    <div className="absolute top-10 right-10 w-32 h-32 opacity-20" style={{ background: colors.secondary, clipPath: 'polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)' }}></div>
                </div>
            );

        case 'noir-shadows':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.7) 100%)' }}></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-20" style={{ background: `repeating-linear-gradient(90deg, transparent, transparent 20px, ${colors.primary} 20px, ${colors.primary} 22px)` }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-40 opacity-50" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                </div>
            );

        case 'glitch-layers':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-20" style={{ background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.primary}40 2px, ${colors.primary}40 4px)` }}></div>
                    <div className="absolute top-20 -left-10 w-full h-6 opacity-40" style={{ background: colors.secondary, transform: 'skewY(-2deg)' }}></div>
                    <div className="absolute top-32 -right-10 w-full h-4 opacity-30" style={{ background: colors.accent, transform: 'skewY(3deg)' }}></div>
                    <div className="absolute bottom-40 -left-10 w-full h-5 opacity-35" style={{ background: colors.primary, transform: 'skewY(-1deg)' }}></div>
                    <div className="absolute inset-0 opacity-5" style={{ background: `repeating-linear-gradient(90deg, ${colors.primary}, ${colors.primary} 1px, transparent 1px, transparent 3px)` }}></div>
                </div>
            );

        case 'tribal-tech':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-24 opacity-15" style={{ background: `repeating-linear-gradient(90deg, ${colors.primary} 0px, ${colors.primary} 20px, transparent 20px, transparent 40px)` }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-24 opacity-15" style={{ background: `repeating-linear-gradient(90deg, transparent 0px, transparent 20px, ${colors.primary} 20px, ${colors.primary} 40px)` }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[30px] rounded-full opacity-5" style={{ borderColor: colors.primary }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[20px] rounded-full opacity-5" style={{ borderColor: colors.secondary }}></div>
                    <div className="absolute top-20 left-20 w-20 h-20 opacity-20" style={{ background: colors.accent, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                </div>
            );

        case 'norse-runes':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-6" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.accent})` }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.accent})` }}></div>
                    <div className="absolute top-1/4 left-10 text-[150px] opacity-5 font-bold" style={{ color: colors.accent }}>ᚠᚢᚦ</div>
                    <div className="absolute bottom-1/4 right-10 text-[150px] opacity-5 font-bold" style={{ color: colors.primary }}>ᚨᚱᚲ</div>
                    <div className="absolute top-10 right-10 w-24 h-24 border-4 opacity-20 rotate-45" style={{ borderColor: colors.accent }}></div>
                </div>
            );

        case 'neon-grid':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-15" style={{ background: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-48 opacity-70" style={{ background: `linear-gradient(to top, ${colors.dark}, transparent)` }}></div>
                    <div className="absolute top-10 left-10 w-3 h-48" style={{ background: colors.primary, boxShadow: `0 0 30px ${colors.primary}, 0 0 60px ${colors.primary}` }}></div>
                    <div className="absolute top-10 right-10 w-3 h-48" style={{ background: colors.secondary, boxShadow: `0 0 30px ${colors.secondary}, 0 0 60px ${colors.secondary}` }}></div>
                    <div className="absolute bottom-10 left-1/4 right-1/4 h-3" style={{ background: colors.accent, boxShadow: `0 0 20px ${colors.accent}` }}></div>
                </div>
            );

        case 'retro-sun':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40" style={{ background: `repeating-linear-gradient(to bottom, transparent 0px, transparent 6px, ${colors.dark} 6px, ${colors.dark} 12px)` }}></div>
                    <div className="absolute top-10 left-10 right-10 h-1 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}></div>
                </div>
            );

        case 'wave-pattern':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
                    <svg className="absolute bottom-0 w-full h-80" viewBox="0 0 1200 200" preserveAspectRatio="none">
                        <path d="M0,100 C150,150 350,50 600,100 C850,150 1050,50 1200,100 L1200,200 L0,200 Z" fill={colors.primary} />
                        <path d="M0,130 C150,180 350,80 600,130 C850,180 1050,80 1200,130 L1200,200 L0,200 Z" fill={colors.secondary} opacity="0.5" />
                    </svg>
                    <div className="absolute top-20 right-20 w-40 h-40 rounded-full opacity-20 blur-2xl" style={{ background: colors.accent }}></div>
                </div>
            );

        case 'sun-rays':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-30" style={{ background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)` }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: `repeating-conic-gradient(from 45deg at 100% 0%, ${colors.primary} 0deg 10deg, transparent 10deg 20deg)` }}></div>
                </div>
            );

        case 'stars':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(2px 2px at 20px 30px, ${colors.accent}, transparent), radial-gradient(2px 2px at 40px 70px, ${colors.primary}, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(2px 2px at 130px 80px, ${colors.accent}, transparent), radial-gradient(1px 1px at 160px 120px, white, transparent), radial-gradient(3px 3px at 200px 60px, ${colors.secondary}, transparent)`, backgroundSize: '200px 200px' }}></div>
                    <div className="absolute top-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl" style={{ background: colors.primary }}></div>
                    <div className="absolute bottom-40 right-40 w-40 h-40 rounded-full opacity-20 blur-2xl" style={{ background: colors.secondary }}></div>
                </div>
            );

        case 'kanji-overlay':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 right-10 text-[350px] font-black opacity-5 leading-none" style={{ color: colors.primary }}>東京</div>
                    <div className="absolute bottom-10 left-10 text-[100px] font-bold opacity-10" style={{ color: colors.secondary }}>ネオン</div>
                    <div className="absolute bottom-0 left-0 w-3 h-full" style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}></div>
                    <div className="absolute bottom-0 right-0 w-3 h-full" style={{ background: `linear-gradient(to bottom, ${colors.secondary}, ${colors.primary})` }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 opacity-10 rotate-45" style={{ borderColor: colors.accent }}></div>
                </div>
            );

        case 'leaf-pattern':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-10 right-10 w-40 h-40 rotate-45" style={{ background: colors.primary, borderRadius: '0 50% 50% 50%' }}></div>
                    <div className="absolute bottom-20 left-20 w-32 h-32 -rotate-12" style={{ background: colors.secondary, borderRadius: '0 50% 50% 50%' }}></div>
                    <div className="absolute top-1/2 left-10 w-20 h-20 rotate-90" style={{ background: colors.accent, borderRadius: '0 50% 50% 50%' }}></div>
                    <div className="absolute top-40 right-1/3 w-24 h-24 rotate-180" style={{ background: colors.primary, borderRadius: '0 50% 50% 50%', opacity: 0.5 }}></div>
                </div>
            );

        case 'gold-particles':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.accent} 0px, transparent 3px), radial-gradient(circle at 80% 20%, ${colors.primary} 0px, transparent 3px), radial-gradient(circle at 40% 40%, ${colors.accent} 0px, transparent 2px), radial-gradient(circle at 60% 60%, ${colors.primary} 0px, transparent 2px), radial-gradient(circle at 10% 30%, ${colors.secondary} 0px, transparent 2px)`, backgroundSize: '120px 120px' }}></div>
                    <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}></div>
                    <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}></div>
                </div>
            );

        case 'frost-crystals':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-15" style={{ background: `radial-gradient(circle at 30% 20%, ${colors.primary} 0%, transparent 40%), radial-gradient(circle at 70% 80%, ${colors.secondary} 0%, transparent 40%)` }}></div>
                    <div className="absolute top-20 left-20 w-32 h-32 opacity-10" style={{ border: `2px solid ${colors.primary}`, transform: 'rotate(45deg)' }}></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 opacity-10" style={{ border: `2px solid ${colors.secondary}`, transform: 'rotate(30deg)' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-5" style={{ border: `3px solid ${colors.accent}`, transform: 'rotate(60deg)' }}></div>
                </div>
            );

        case 'fire-embers':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-50" style={{ background: `linear-gradient(to top, ${colors.primary}60, transparent)` }}></div>
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.accent} 0px, transparent 5px), radial-gradient(circle at 80% 60%, ${colors.primary} 0px, transparent 4px), radial-gradient(circle at 50% 90%, ${colors.secondary} 0px, transparent 6px), radial-gradient(circle at 30% 70%, ${colors.accent} 0px, transparent 3px)`, backgroundSize: '180px 180px' }}></div>
                    <div className="absolute bottom-0 left-1/4 w-20 h-40 opacity-40 blur-sm" style={{ background: `linear-gradient(to top, ${colors.primary}, transparent)`, borderRadius: '50% 50% 0 0' }}></div>
                    <div className="absolute bottom-0 right-1/3 w-16 h-32 opacity-30 blur-sm" style={{ background: `linear-gradient(to top, ${colors.secondary}, transparent)`, borderRadius: '50% 50% 0 0' }}></div>
                </div>
            );

        case 'sakura-petals':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
                    <div className="absolute top-20 right-20 w-12 h-12 rotate-45" style={{ background: colors.primary, borderRadius: '50% 0 50% 50%' }}></div>
                    <div className="absolute top-40 right-60 w-8 h-8 rotate-12" style={{ background: colors.secondary, borderRadius: '50% 0 50% 50%' }}></div>
                    <div className="absolute bottom-40 left-20 w-14 h-14 -rotate-30" style={{ background: colors.accent, borderRadius: '50% 0 50% 50%' }}></div>
                    <div className="absolute top-60 left-40 w-6 h-6 rotate-60" style={{ background: colors.primary, borderRadius: '50% 0 50% 50%' }}></div>
                    <div className="absolute bottom-20 right-40 w-10 h-10 -rotate-15" style={{ background: colors.secondary, borderRadius: '50% 0 50% 50%' }}></div>
                    <div className="absolute top-1/3 left-1/3 w-8 h-8 rotate-90" style={{ background: colors.accent, borderRadius: '50% 0 50% 50%', opacity: 0.5 }}></div>
                </div>
            );

        case 'lightning-bolts':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-2 h-full opacity-15" style={{ background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)` }}></div>
                    <div className="absolute top-0 right-1/3 w-1 h-full opacity-10" style={{ background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` }}></div>
                    <div className="absolute top-10 left-10 w-28 h-28 opacity-15" style={{ background: colors.accent, clipPath: 'polygon(50% 0%, 100% 50%, 70% 50%, 100% 100%, 30% 55%, 55% 55%, 10% 25%)' }}></div>
                    <div className="absolute bottom-20 right-20 w-20 h-20 opacity-10" style={{ background: colors.primary, clipPath: 'polygon(50% 0%, 100% 50%, 70% 50%, 100% 100%, 30% 55%, 55% 55%, 10% 25%)' }}></div>
                </div>
            );

        case 'vintage-texture':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
                    <div className="absolute inset-12 border-8 border-double opacity-15" style={{ borderColor: colors.primary }}></div>
                    <div className="absolute top-6 left-6 right-6 h-1 opacity-20" style={{ background: colors.secondary }}></div>
                    <div className="absolute bottom-6 left-6 right-6 h-1 opacity-20" style={{ background: colors.secondary }}></div>
                </div>
            );

        case 'hologram-lines':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-15" style={{ background: `repeating-linear-gradient(0deg, transparent, transparent 4px, ${colors.primary}50 4px, ${colors.primary}50 5px)` }}></div>
                    <div className="absolute top-0 left-0 right-0 h-full opacity-25" style={{ background: `linear-gradient(135deg, ${colors.primary}40 0%, transparent 50%, ${colors.secondary}40 100%)` }}></div>
                    <div className="absolute top-20 left-20 w-60 h-60 rounded-full opacity-10 blur-xl" style={{ background: `linear-gradient(${colors.primary}, ${colors.secondary})` }}></div>
                </div>
            );

        case 'single-line':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-24 right-24 h-px opacity-25" style={{ background: colors.primary }}></div>
                </div>
            );

        case 'harsh-lines':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-1/3 h-full opacity-5" style={{ background: colors.primary }}></div>
                    <div className="absolute top-24 left-0 right-0 h-6" style={{ background: colors.accent }}></div>
                    <div className="absolute bottom-24 left-0 right-0 h-6" style={{ background: colors.accent }}></div>
                    <div className="absolute top-0 right-20 w-20 h-full opacity-10" style={{ background: colors.secondary }}></div>
                </div>
            );

        case 'soft-blobs':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: colors.primary }}></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: colors.secondary }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl" style={{ background: colors.accent }}></div>
                </div>
            );

        case 'matrix-rain':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-10" style={{ background: `repeating-linear-gradient(180deg, transparent 0px, transparent 20px, ${colors.primary}60 20px, ${colors.primary}60 21px)`, backgroundSize: '25px 100px' }}></div>
                    <div className="absolute top-0 left-0 right-0 h-60 opacity-60" style={{ background: `linear-gradient(to bottom, ${colors.dark}, transparent)` }}></div>
                    <div className="absolute top-10 left-10 text-2xl font-mono opacity-20 leading-tight" style={{ color: colors.primary }}>01001000 01100101</div>
                    <div className="absolute bottom-10 right-10 text-lg font-mono opacity-15" style={{ color: colors.primary }}>SYSTEM ONLINE</div>
                </div>
            );

        case 'vaporwave-grid':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-25" style={{ background: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`, backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom' }}></div>
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-35" style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}></div>
                    <div className="absolute top-10 left-10 text-6xl opacity-10">🌴</div>
                    <div className="absolute top-20 right-20 text-4xl opacity-10">🌴</div>
                </div>
            );

        // Legacy template support
        case 'geometric':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: `linear-gradient(45deg, transparent 50%, ${colors.primary} 50%)` }}></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 border-[40px] opacity-10 rounded-full" style={{ borderColor: colors.secondary }}></div>
                </div>
            );
        case 'bold':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-40 h-40 opacity-20" style={{ background: colors.primary }}></div>
                    <div className="absolute bottom-10 right-10 w-80 h-10 opacity-20" style={{ background: colors.secondary }}></div>
                </div>
            );
        case 'minimal':
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-24 left-24 right-24 h-1 opacity-20" style={{ background: colors.primary }}></div>
                    <div className="absolute bottom-24 left-24 right-24 h-1 opacity-20" style={{ background: colors.secondary }}></div>
                </div>
            );
        case 'modern':
            return <FloatingCircles colors={colors} />;

        default:
            return <FloatingCircles colors={colors} />;
    }
};

export default TemplateDecorations;
