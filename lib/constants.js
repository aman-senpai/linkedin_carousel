export const FONT_OPTIONS = [
    { name: 'Modern Bold', value: 'font-extrabold tracking-tight' },
    { name: 'Ultra Black', value: 'font-black uppercase tracking-tighter' },
    { name: 'Minimalist', value: 'font-light tracking-widest' },
    { name: 'Classic Serif', value: 'font-serif tracking-normal' },
    { name: 'Technical', value: 'font-mono font-bold' },
    { name: 'Playful Burst', value: 'font-black uppercase tracking-wider italic' },
];

export const defaultPalette = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    dark: '#0f172a',
    light: '#f8fafc',
    text: '#1e293b',
    textMuted: '#64748b',
    gradient: { from: '#3b82f6', to: '#8b5cf6', direction: 'to-br' },
    mood: 'corporate',
    template: 'modern'
};

export const initialSlides = [
    {
        type: 'cover',
        title: "The Silent Shift:",
        subtitle: "How Generative AI is Rewriting the Economy in 2025",
        tagline: "A DATA-DRIVEN ANALYSIS",
        author: "@aman-senpai",
        variant: "centered"
    },
    {
        type: 'intro',
        heading: "The Honeymoon is Over",
        text: "2023 was for testing. 2024 was for scaling. In 2025, AI isn't a feature anymore—it's the operating system of the modern enterprise.",
        stat: "84%",
        statDesc: "of companies now report AI as a 'critical' infrastructure component."
    },
    {
        type: 'infographic',
        heading: "The Three Pillars of Evolution",
        points: [
            { t: "Agentic Workflows", d: "AI that doesn't just suggest, but executes complex tasks." },
            { t: "Edge Intelligence", d: "Local LLMs running on devices with zero latency." },
            { t: "Human-Centric Design", d: "The shift from 'AI First' back to 'User First'." }
        ]
    },
    {
        type: 'chart',
        heading: "Productivity Gains by Sector",
        chartData: [82, 65, 45, 30],
        labels: ["Software", "Finance", "Healthcare", "Manufacturing"],
        style: "bars"
    },
    {
        type: 'big-number',
        number: "$4.4T",
        description: "The estimated annual value added to the global economy by Generative AI by the end of this year.",
        source: "Source: McKinsey Global Institute"
    },
    {
        type: 'chart-radial',
        heading: "Adoption Velocity",
        percentage: 72,
        detail: "Fortune 500 companies have integrated at least one custom-trained LLM into their core operations."
    },
    {
        type: 'comparison',
        heading: "Old Way vs. New Way",
        left: ["Manual Data Entry", "Siloed Knowledge", "Static Reports"],
        right: ["Automated Synthesis", "Connected Intelligence", "Real-time Insights"]
    },
    {
        type: 'quote',
        quote: "The biggest risk with AI today isn't that it will replace us, but that we will fail to evolve alongside it.",
        cite: "Chief Technology Officer, Global Enterprise"
    },
    {
        type: 'summary',
        heading: "Key Takeaways",
        steps: [
            "Focus on Agentic workflows.",
            "Audit your proprietary data.",
            "Invest in human upskilling."
        ]
    },
    {
        type: 'cta',
        title: "Ready for the Shift?",
        subtitle: "Download my full 2025 AI Strategy Guide in the featured section of my profile.",
        button: "Follow for more insights",
        handle: "@aman-senpai"
    }
];

export const SLIDE_VARIANTS = {
    cover: ['centered', 'split', 'minimal', 'bold', 'card', 'photo', 'typographic', 'gradient', 'boxed', 'stripe'],
    intro: ['classic', 'minimal', 'card', 'split', 'big-stat', 'dark', 'magazine', 'timeline', 'chat', 'hero'],
    list: ['classic', 'cards', 'numbered', 'checklist', 'timeline', 'grid', 'steps', 'bubbles', 'notebook', 'minimal'],
    quote: ['classic', 'modern', 'minimal', 'card', 'dark', 'pattern', 'bubble', 'photo', 'split', 'bold'],
    cta: ['classic', 'split', 'minimal', 'social', 'card', 'photo', 'bold', 'gradient', 'chat', 'buttons'],
    highlight: ['centered', 'heavy', 'framed', 'gradient', 'minimal', 'bold', 'quote', 'card', 'split', 'neon'],
    stats: ['grid', 'big-number', 'chart', 'radial', 'donut', 'bars', 'trend', 'cards', 'split', 'dark'],
    chart: ['classic', 'horizontal', 'minimal', 'dark', 'cards', 'donut', 'area', 'line', 'split'],
    'big-number': ['classic', 'framed', 'split', 'card', 'minimal', 'dark', 'circle', 'gradient', 'bold', 'simple'],
    'infographic': ['classic', 'cards', 'steps', 'timeline', 'grid', 'list', 'cycle', 'pyramid', 'funnel', 'comparison'],
    summary: ['classic', 'minimal', 'split', 'list', 'cards', 'timeline', 'grid', 'photo', 'bold', 'checklist'],
    testimonial: ['classic', 'cards', 'minimal', 'photo', 'split', 'grid', 'bubble', 'dark', 'bold', 'logo']
};
