// 26 Unique Visual Templates for LinkedIn Carousel
// Each template has its own distinct visual style, decorations, and layout modifications

export const TEMPLATES = [
    // 1. Modern Corporate
    {
        id: 'modern',
        name: 'Modern Corporate',
        category: 'Business',
        description: 'Clean, professional design with floating gradients',
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#60a5fa',
        dark: '#0f172a',
        light: '#f8fafc',
        gradient: { from: '#3b82f6', to: '#1e40af', direction: 'to-br' },
        decorationType: 'floating-circles',
        headingStyle: 'font-extrabold tracking-tight',
        cardStyle: 'rounded-3xl shadow-xl',
        accentShape: 'circle'
    },
    // 2. Marvel Comics
    {
        id: 'marvel',
        name: 'Marvel',
        category: 'Comics',
        description: 'Bold comic-book style with halftone effects',
        primary: '#ED1D24',
        secondary: '#FFD700',
        accent: '#B22222',
        dark: '#1a1a2e',
        light: '#fff5f5',
        gradient: { from: '#ED1D24', to: '#FFD700', direction: 'to-br' },
        decorationType: 'comic-halftone',
        headingStyle: 'font-black uppercase tracking-wider',
        cardStyle: 'border-8 border-black shadow-[8px_8px_0_0_#000]',
        accentShape: 'burst'
    },
    // 3. DC Universe
    {
        id: 'dc',
        name: 'DC Universe',
        category: 'Comics',
        description: 'Heroic design with dramatic lighting',
        primary: '#0476F5',
        secondary: '#C8102E',
        accent: '#FFD700',
        dark: '#0a1628',
        light: '#f0f7ff',
        gradient: { from: '#0476F5', to: '#C8102E', direction: 'to-r' },
        decorationType: 'hero-rays',
        headingStyle: 'font-black uppercase tracking-wide',
        cardStyle: 'border-4 border-yellow-400 rounded-lg',
        accentShape: 'shield'
    },
    // 4. Gotham Dark
    {
        id: 'gotham',
        name: 'Gotham Dark',
        category: 'Comics',
        description: 'Dark noir style with dramatic shadows',
        primary: '#FFC107',
        secondary: '#212121',
        accent: '#424242',
        dark: '#0d0d0d',
        light: '#2d2d2d',
        gradient: { from: '#212121', to: '#FFC107', direction: 'to-tr' },
        decorationType: 'noir-shadows',
        headingStyle: 'font-bold italic tracking-tight',
        cardStyle: 'rounded-none border-l-8',
        accentShape: 'bat'
    },
    // 5. Spider-Verse
    {
        id: 'spiderverse',
        name: 'Spider-Verse',
        category: 'Comics',
        description: 'Glitchy, multi-dimensional comic style',
        primary: '#E23636',
        secondary: '#2196F3',
        accent: '#FF4081',
        dark: '#1a0a2e',
        light: '#fff0f3',
        gradient: { from: '#E23636', to: '#2196F3', direction: 'to-bl' },
        decorationType: 'glitch-layers',
        headingStyle: 'font-black tracking-tighter',
        cardStyle: 'rounded-2xl border-4 border-dashed',
        accentShape: 'web'
    },
    // 6. Wakanda
    {
        id: 'wakanda',
        name: 'Wakanda',
        category: 'Comics',
        description: 'Afrofuturistic tribal tech design',
        primary: '#9C27B0',
        secondary: '#212121',
        accent: '#7B1FA2',
        dark: '#0f0a1a',
        light: '#f3e5f5',
        gradient: { from: '#9C27B0', to: '#212121', direction: 'to-b' },
        decorationType: 'tribal-tech',
        headingStyle: 'font-bold tracking-widest uppercase',
        cardStyle: 'rounded-xl border-2',
        accentShape: 'diamond'
    },
    // 7. Asgard
    {
        id: 'asgard',
        name: 'Asgard',
        category: 'Fantasy',
        description: 'Norse mythology with golden accents',
        primary: '#00BCD4',
        secondary: '#FFD700',
        accent: '#E91E63',
        dark: '#0a1a2a',
        light: '#e0f7fa',
        gradient: { from: '#00BCD4', to: '#FFD700', direction: 'to-r' },
        decorationType: 'norse-runes',
        headingStyle: 'font-bold tracking-wide',
        cardStyle: 'rounded-lg border-4 border-double',
        accentShape: 'thunder'
    },
    // 8. Cyberpunk
    {
        id: 'cyberpunk',
        name: 'Cyberpunk 2077',
        category: 'Futuristic',
        description: 'Neon-lit dystopian future',
        primary: '#00FFFF',
        secondary: '#FF00FF',
        accent: '#FFFF00',
        dark: '#0a0a0f',
        light: '#1a1a2e',
        gradient: { from: '#FF00FF', to: '#00FFFF', direction: 'to-r' },
        decorationType: 'neon-grid',
        headingStyle: 'font-black uppercase tracking-[0.2em]',
        cardStyle: 'border-2 border-cyan-400 rounded-none',
        accentShape: 'hexagon'
    },
    // 9. Synthwave
    {
        id: 'synthwave',
        name: 'Synthwave',
        category: 'Retro',
        description: '80s retro-futuristic vibes',
        primary: '#FF6EC7',
        secondary: '#7B68EE',
        accent: '#00CED1',
        dark: '#1a0a2e',
        light: '#2d1b4e',
        gradient: { from: '#FF6EC7', to: '#7B68EE', direction: 'to-br' },
        decorationType: 'retro-sun',
        headingStyle: 'font-bold italic',
        cardStyle: 'rounded-xl border-b-4',
        accentShape: 'sun'
    },
    // 10. Ocean Deep
    {
        id: 'ocean',
        name: 'Ocean Deep',
        category: 'Nature',
        description: 'Calm underwater aesthetics',
        primary: '#006994',
        secondary: '#00CED1',
        accent: '#20B2AA',
        dark: '#001f3f',
        light: '#e6f7ff',
        gradient: { from: '#006994', to: '#00CED1', direction: 'to-b' },
        decorationType: 'wave-pattern',
        headingStyle: 'font-light tracking-widest',
        cardStyle: 'rounded-3xl',
        accentShape: 'wave'
    },
    // 11. Sunset Beach
    {
        id: 'sunset',
        name: 'Sunset Beach',
        category: 'Nature',
        description: 'Warm golden hour colors',
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD93D',
        dark: '#2d1810',
        light: '#fff8f0',
        gradient: { from: '#FF6B35', to: '#FFD93D', direction: 'to-tr' },
        decorationType: 'sun-rays',
        headingStyle: 'font-semibold tracking-wide',
        cardStyle: 'rounded-2xl shadow-lg',
        accentShape: 'circle'
    },
    // 12. Midnight Galaxy
    {
        id: 'galaxy',
        name: 'Midnight Galaxy',
        category: 'Space',
        description: 'Cosmic space exploration',
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#f093fb',
        dark: '#0c0c1e',
        light: '#1e1e3f',
        gradient: { from: '#667eea', to: '#764ba2', direction: 'to-br' },
        decorationType: 'stars',
        headingStyle: 'font-light tracking-[0.15em]',
        cardStyle: 'rounded-full overflow-hidden',
        accentShape: 'star'
    },
    // 13. Neon Tokyo
    {
        id: 'tokyo',
        name: 'Neon Tokyo',
        category: 'Urban',
        description: 'Japanese neon city lights',
        primary: '#FF2D95',
        secondary: '#00F5FF',
        accent: '#9D00FF',
        dark: '#0f0f23',
        light: '#1f1f3f',
        gradient: { from: '#FF2D95', to: '#00F5FF', direction: 'to-r' },
        decorationType: 'kanji-overlay',
        headingStyle: 'font-black tracking-tight',
        cardStyle: 'rounded-lg border-l-4',
        accentShape: 'rectangle'
    },
    // 14. Forest Mystic
    {
        id: 'forest',
        name: 'Forest Mystic',
        category: 'Nature',
        description: 'Enchanted forest vibes',
        primary: '#2ECC71',
        secondary: '#1ABC9C',
        accent: '#27AE60',
        dark: '#0a1f0a',
        light: '#e8f8f0',
        gradient: { from: '#2ECC71', to: '#1ABC9C', direction: 'to-bl' },
        decorationType: 'leaf-pattern',
        headingStyle: 'font-medium tracking-wide',
        cardStyle: 'rounded-3xl border-2 border-green-200',
        accentShape: 'leaf'
    },
    // 15. Golden Hour
    {
        id: 'golden',
        name: 'Golden Hour',
        category: 'Luxury',
        description: 'Premium gold aesthetics',
        primary: '#D4AF37',
        secondary: '#B8860B',
        accent: '#FFD700',
        dark: '#1a1507',
        light: '#fffbe6',
        gradient: { from: '#D4AF37', to: '#FFD700', direction: 'to-tr' },
        decorationType: 'gold-particles',
        headingStyle: 'font-light tracking-[0.2em] uppercase',
        cardStyle: 'rounded-xl border-2 border-yellow-400',
        accentShape: 'diamond'
    },
    // 16. Arctic Frost
    {
        id: 'arctic',
        name: 'Arctic Frost',
        category: 'Nature',
        description: 'Cool icy minimalism',
        primary: '#74b9ff',
        secondary: '#0984e3',
        accent: '#a29bfe',
        dark: '#0a1929',
        light: '#f5f9ff',
        gradient: { from: '#74b9ff', to: '#a29bfe', direction: 'to-r' },
        decorationType: 'frost-crystals',
        headingStyle: 'font-thin tracking-widest',
        cardStyle: 'rounded-2xl backdrop-blur-sm',
        accentShape: 'snowflake'
    },
    // 17. Volcanic Fire
    {
        id: 'volcanic',
        name: 'Volcanic Fire',
        category: 'Intense',
        description: 'Explosive fiery energy',
        primary: '#FF4500',
        secondary: '#DC143C',
        accent: '#FF6347',
        dark: '#1a0500',
        light: '#fff0e6',
        gradient: { from: '#FF4500', to: '#DC143C', direction: 'to-b' },
        decorationType: 'fire-embers',
        headingStyle: 'font-black uppercase',
        cardStyle: 'rounded-lg border-4 border-orange-500',
        accentShape: 'flame'
    },
    // 18. Cherry Blossom
    {
        id: 'sakura',
        name: 'Cherry Blossom',
        category: 'Elegant',
        description: 'Delicate Japanese spring',
        primary: '#FFB7C5',
        secondary: '#FF69B4',
        accent: '#FFC0CB',
        dark: '#2d1f24',
        light: '#fff5f7',
        gradient: { from: '#FFB7C5', to: '#FF69B4', direction: 'to-br' },
        decorationType: 'sakura-petals',
        headingStyle: 'font-light tracking-wide',
        cardStyle: 'rounded-3xl shadow-pink-200',
        accentShape: 'flower'
    },
    // 19. Electric Storm
    {
        id: 'storm',
        name: 'Electric Storm',
        category: 'Intense',
        description: 'Powerful electrical energy',
        primary: '#9B59B6',
        secondary: '#3498DB',
        accent: '#F1C40F',
        dark: '#1a1025',
        light: '#f5f0ff',
        gradient: { from: '#9B59B6', to: '#3498DB', direction: 'to-bl' },
        decorationType: 'lightning-bolts',
        headingStyle: 'font-bold tracking-tight',
        cardStyle: 'rounded-xl border-2 border-purple-400',
        accentShape: 'bolt'
    },
    // 20. Vintage Sepia
    {
        id: 'vintage',
        name: 'Vintage Sepia',
        category: 'Classic',
        description: 'Old-world classic charm',
        primary: '#8B4513',
        secondary: '#A0522D',
        accent: '#D2691E',
        dark: '#1f1408',
        light: '#faf0e6',
        gradient: { from: '#8B4513', to: '#D2691E', direction: 'to-r' },
        decorationType: 'vintage-texture',
        headingStyle: 'font-serif tracking-normal',
        cardStyle: 'rounded-none border-8 border-double',
        accentShape: 'frame'
    },
    // 21. Holographic
    {
        id: 'holographic',
        name: 'Holographic',
        category: 'Futuristic',
        description: 'Iridescent rainbow effects',
        primary: '#E040FB',
        secondary: '#00E5FF',
        accent: '#76FF03',
        dark: '#0a0a1f',
        light: '#f0f0ff',
        gradient: { from: '#E040FB', to: '#00E5FF', direction: 'to-tr' },
        decorationType: 'hologram-lines',
        headingStyle: 'font-bold tracking-wide',
        cardStyle: 'rounded-2xl border-2',
        accentShape: 'prism'
    },
    // 22. Minimal Zen
    {
        id: 'zen',
        name: 'Minimal Zen',
        category: 'Minimal',
        description: 'Clean, peaceful simplicity',
        primary: '#6b7280',
        secondary: '#9ca3af',
        accent: '#4b5563',
        dark: '#111827',
        light: '#f9fafb',
        gradient: { from: '#6b7280', to: '#9ca3af', direction: 'to-b' },
        decorationType: 'single-line',
        headingStyle: 'font-extralight tracking-[0.3em]',
        cardStyle: 'rounded-none border-b',
        accentShape: 'line'
    },
    // 23. Brutalist
    {
        id: 'brutalist',
        name: 'Brutalist',
        category: 'Bold',
        description: 'Raw, unpolished power',
        primary: '#000000',
        secondary: '#ffffff',
        accent: '#ff0000',
        dark: '#000000',
        light: '#ffffff',
        gradient: { from: '#000000', to: '#333333', direction: 'to-b' },
        decorationType: 'harsh-lines',
        headingStyle: 'font-black uppercase tracking-tighter',
        cardStyle: 'border-8 border-black',
        accentShape: 'square'
    },
    // 24. Pastel Dream
    {
        id: 'pastel',
        name: 'Pastel Dream',
        category: 'Soft',
        description: 'Soft, dreamy aesthetics',
        primary: '#a78bfa',
        secondary: '#f9a8d4',
        accent: '#6ee7b7',
        dark: '#312e81',
        light: '#faf5ff',
        gradient: { from: '#a78bfa', to: '#f9a8d4', direction: 'to-br' },
        decorationType: 'soft-blobs',
        headingStyle: 'font-medium tracking-wide',
        cardStyle: 'rounded-3xl shadow-lg',
        accentShape: 'blob'
    },
    // 25. Matrix
    {
        id: 'matrix',
        name: 'Matrix',
        category: 'Tech',
        description: 'Digital rain code',
        primary: '#00ff41',
        secondary: '#008f11',
        accent: '#00ff41',
        dark: '#000000',
        light: '#001100',
        gradient: { from: '#00ff41', to: '#008f11', direction: 'to-b' },
        decorationType: 'matrix-rain',
        headingStyle: 'font-mono font-bold',
        cardStyle: 'border-2 border-green-500 rounded-none',
        accentShape: 'code'
    },
    // 26. Vaporwave
    {
        id: 'vaporwave',
        name: 'Vaporwave',
        category: 'Retro',
        description: '90s aesthetic nostalgia',
        primary: '#ff71ce',
        secondary: '#01cdfe',
        accent: '#05ffa1',
        dark: '#1a0033',
        light: '#2d004d',
        gradient: { from: '#ff71ce', to: '#01cdfe', direction: 'to-bl' },
        decorationType: 'vaporwave-grid',
        headingStyle: 'font-bold italic tracking-wide',
        cardStyle: 'rounded-xl border-4',
        accentShape: 'palm'
    }
];

// Template decoration components
export const getTemplateDecorations = (template, colors) => {
    const decorations = {
        'floating-circles': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl" style="background: ${colors.primary}"></div>
                <div class="absolute top-1/2 -right-20 w-60 h-60 rounded-full blur-3xl opacity-50" style="background: ${colors.secondary}"></div>
                <div class="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style="background: ${colors.accent}"></div>
            </div>
        `,
        'comic-halftone': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, ${colors.primary} 1px, transparent 1px); background-size: 8px 8px;"></div>
                <div class="absolute top-0 left-0 w-40 h-40 rotate-12" style="background: ${colors.accent}; clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"></div>
                <div class="absolute bottom-10 right-10 text-[200px] font-black opacity-10 leading-none" style="color: ${colors.primary}">POW!</div>
            </div>
        `,
        'hero-rays': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-20" style="background: repeating-conic-gradient(from 0deg, ${colors.primary} 0deg 10deg, transparent 10deg 20deg);"></div>
                <div class="absolute top-0 left-0 right-0 h-2" style="background: ${colors.accent}"></div>
                <div class="absolute bottom-0 left-0 right-0 h-2" style="background: ${colors.accent}"></div>
            </div>
        `,
        'noir-shadows': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0" style="background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.8) 100%);"></div>
                <div class="absolute top-0 right-0 w-1/3 h-full opacity-30" style="background: repeating-linear-gradient(90deg, transparent, transparent 20px, ${colors.primary} 20px, ${colors.primary} 22px);"></div>
            </div>
        `,
        'glitch-layers': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-30" style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, ${colors.primary}20 2px, ${colors.primary}20 4px);"></div>
                <div class="absolute top-20 -left-10 w-full h-4 opacity-50" style="background: ${colors.secondary}; transform: skewY(-2deg);"></div>
                <div class="absolute bottom-40 -right-10 w-full h-4 opacity-50" style="background: ${colors.accent}; transform: skewY(2deg);"></div>
            </div>
        `,
        'tribal-tech': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 left-0 w-full h-20 opacity-20" style="background: repeating-linear-gradient(90deg, ${colors.primary} 0px, ${colors.primary} 20px, transparent 20px, transparent 40px);"></div>
                <div class="absolute bottom-0 left-0 w-full h-20 opacity-20" style="background: repeating-linear-gradient(90deg, transparent 0px, transparent 20px, ${colors.primary} 20px, ${colors.primary} 40px);"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[40px] rounded-full opacity-5" style="border-color: ${colors.primary};"></div>
            </div>
        `,
        'norse-runes': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-10" style="background-image: url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L30 50 M20 20 L40 40 M40 20 L20 40' stroke='${encodeURIComponent(colors.accent)}' stroke-width='2' fill='none'/%3E%3C/svg%3E\");"></div>
                <div class="absolute top-0 left-0 right-0 h-4" style="background: linear-gradient(90deg, ${colors.accent}, ${colors.primary}, ${colors.accent});"></div>
            </div>
        `,
        'neon-grid': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-20" style="background: linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px); background-size: 50px 50px;"></div>
                <div class="absolute bottom-0 left-0 right-0 h-40 opacity-60" style="background: linear-gradient(to top, ${colors.dark}, transparent);"></div>
                <div class="absolute top-10 left-10 w-4 h-40" style="background: ${colors.primary}; box-shadow: 0 0 20px ${colors.primary};"></div>
                <div class="absolute top-10 right-10 w-4 h-40" style="background: ${colors.secondary}; box-shadow: 0 0 20px ${colors.secondary};"></div>
            </div>
        `,
        'retro-sun': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-40" style="background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});"></div>
                <div class="absolute bottom-0 left-0 right-0 h-1/2 opacity-30" style="background: repeating-linear-gradient(to bottom, transparent 0px, transparent 8px, ${colors.dark} 8px, ${colors.dark} 16px);"></div>
            </div>
        `,
        'wave-pattern': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <svg class="absolute bottom-0 w-full h-64" viewBox="0 0 1200 200" preserveAspectRatio="none">
                    <path d="M0,100 C150,150 350,50 600,100 C850,150 1050,50 1200,100 L1200,200 L0,200 Z" fill="${colors.primary}"/>
                    <path d="M0,120 C150,170 350,70 600,120 C850,170 1050,70 1200,120 L1200,200 L0,200 Z" fill="${colors.secondary}" opacity="0.5"/>
                </svg>
            </div>
        `,
        'sun-rays': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute -top-40 -right-40 w-96 h-96 opacity-30" style="background: radial-gradient(circle, ${colors.accent} 0%, transparent 70%);"></div>
                <div class="absolute top-0 right-0 w-1/2 h-full opacity-10" style="background: repeating-conic-gradient(from 45deg, ${colors.primary} 0deg 15deg, transparent 15deg 30deg);"></div>
            </div>
        `,
        'stars': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(2px 2px at 20px 30px, ${colors.accent}, transparent), radial-gradient(2px 2px at 40px 70px, ${colors.primary}, transparent), radial-gradient(1px 1px at 90px 40px, white, transparent), radial-gradient(2px 2px at 130px 80px, ${colors.accent}, transparent), radial-gradient(1px 1px at 160px 120px, white, transparent); background-size: 200px 200px;"></div>
                <div class="absolute top-20 left-20 w-40 h-40 rounded-full opacity-20 blur-2xl" style="background: ${colors.primary};"></div>
            </div>
        `,
        'kanji-overlay': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-10 right-10 text-[300px] font-black opacity-5 leading-none" style="color: ${colors.primary};">東京</div>
                <div class="absolute bottom-0 left-0 w-2 h-full" style="background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});"></div>
                <div class="absolute bottom-0 right-0 w-2 h-full" style="background: linear-gradient(to bottom, ${colors.secondary}, ${colors.primary});"></div>
            </div>
        `,
        'leaf-pattern': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
                <div class="absolute top-10 right-10 w-32 h-32 rotate-45 rounded-full" style="background: ${colors.primary}; border-radius: 0 50% 50% 50%;"></div>
                <div class="absolute bottom-20 left-20 w-24 h-24 -rotate-12 rounded-full" style="background: ${colors.secondary}; border-radius: 0 50% 50% 50%;"></div>
                <div class="absolute top-1/2 left-10 w-16 h-16 rotate-90 rounded-full" style="background: ${colors.accent}; border-radius: 0 50% 50% 50%;"></div>
            </div>
        `,
        'gold-particles': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 80%, ${colors.accent} 0px, transparent 2px), radial-gradient(circle at 80% 20%, ${colors.primary} 0px, transparent 2px), radial-gradient(circle at 40% 40%, ${colors.accent} 0px, transparent 1px), radial-gradient(circle at 60% 60%, ${colors.primary} 0px, transparent 1px); background-size: 100px 100px;"></div>
                <div class="absolute top-0 left-0 right-0 h-1" style="background: linear-gradient(90deg, transparent, ${colors.accent}, transparent);"></div>
            </div>
        `,
        'frost-crystals': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 30% 20%, ${colors.primary} 0%, transparent 30%), radial-gradient(circle at 70% 80%, ${colors.secondary} 0%, transparent 30%);"></div>
                <div class="absolute top-0 left-0 w-full h-full opacity-5" style="background-image: url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M75 25 L25 75' stroke='white' stroke-width='1' fill='none'/%3E%3C/svg%3E\");"></div>
            </div>
        `,
        'fire-embers': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute bottom-0 left-0 right-0 h-1/2 opacity-40" style="background: linear-gradient(to top, ${colors.primary}, transparent);"></div>
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 80%, ${colors.accent} 0px, transparent 4px), radial-gradient(circle at 80% 60%, ${colors.primary} 0px, transparent 3px), radial-gradient(circle at 50% 90%, ${colors.secondary} 0px, transparent 5px); background-size: 150px 150px; animation: float 3s ease-in-out infinite;"></div>
            </div>
        `,
        'sakura-petals': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div class="absolute top-20 right-20 w-8 h-8 rotate-45" style="background: ${colors.primary}; border-radius: 50% 0 50% 50%;"></div>
                <div class="absolute top-40 right-40 w-6 h-6 rotate-12" style="background: ${colors.secondary}; border-radius: 50% 0 50% 50%;"></div>
                <div class="absolute bottom-40 left-20 w-10 h-10 -rotate-30" style="background: ${colors.accent}; border-radius: 50% 0 50% 50%;"></div>
                <div class="absolute top-60 left-40 w-5 h-5 rotate-60" style="background: ${colors.primary}; border-radius: 50% 0 50% 50%;"></div>
            </div>
        `,
        'lightning-bolts': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 left-1/4 w-1 h-full opacity-20" style="background: linear-gradient(to bottom, transparent, ${colors.accent}, transparent);"></div>
                <div class="absolute top-0 right-1/3 w-1 h-full opacity-15" style="background: linear-gradient(to bottom, transparent, ${colors.primary}, transparent);"></div>
                <div class="absolute top-10 left-10 w-20 h-20 opacity-10" style="background: ${colors.accent}; clip-path: polygon(50% 0%, 100% 50%, 70% 50%, 100% 100%, 30% 60%, 60% 60%, 10% 30%);"></div>
            </div>
        `,
        'vintage-texture': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-10" style="background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\");"></div>
                <div class="absolute inset-8 border-4 opacity-20" style="border-color: ${colors.primary};"></div>
            </div>
        `,
        'hologram-lines': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-20" style="background: repeating-linear-gradient(0deg, transparent, transparent 4px, ${colors.primary}40 4px, ${colors.primary}40 5px);"></div>
                <div class="absolute top-0 left-0 right-0 h-full opacity-30" style="background: linear-gradient(135deg, ${colors.primary}40 0%, transparent 50%, ${colors.secondary}40 100%);"></div>
            </div>
        `,
        'single-line': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-1/2 left-20 right-20 h-px opacity-20" style="background: ${colors.primary};"></div>
            </div>
        `,
        'harsh-lines': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 left-0 w-1/3 h-full" style="background: ${colors.primary}; opacity: 0.1;"></div>
                <div class="absolute top-20 left-0 right-0 h-4" style="background: ${colors.accent};"></div>
                <div class="absolute bottom-20 left-0 right-0 h-4" style="background: ${colors.accent};"></div>
            </div>
        `,
        'soft-blobs': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div class="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl" style="background: ${colors.primary};"></div>
                <div class="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl" style="background: ${colors.secondary};"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl" style="background: ${colors.accent};"></div>
            </div>
        `,
        'matrix-rain': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute inset-0 opacity-20" style="background: repeating-linear-gradient(180deg, transparent 0px, transparent 20px, ${colors.primary}40 20px, ${colors.primary}40 21px); background-size: 20px 100px;"></div>
                <div class="absolute top-0 left-0 right-0 h-40 opacity-50" style="background: linear-gradient(to bottom, ${colors.dark}, transparent);"></div>
                <div class="absolute inset-0 opacity-10 font-mono text-xs leading-tight overflow-hidden" style="color: ${colors.primary};">01001000 01100101 01101100 01101100 01101111</div>
            </div>
        `,
        'vaporwave-grid': `
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute bottom-0 left-0 right-0 h-1/2 opacity-30" style="background: linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px); background-size: 40px 40px; transform: perspective(500px) rotateX(60deg); transform-origin: bottom;"></div>
                <div class="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-40" style="background: linear-gradient(to bottom, ${colors.primary}, ${colors.secondary});"></div>
            </div>
        `
    };

    return decorations[template.decorationType] || decorations['floating-circles'];
};

// Get categories for filtering
export const getTemplateCategories = () => {
    const categories = [...new Set(TEMPLATES.map(t => t.category))];
    return ['All', ...categories];
};

// Get template by ID
export const getTemplateById = (id) => {
    return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
};
