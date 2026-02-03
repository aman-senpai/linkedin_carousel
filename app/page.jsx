'use client';

import { useState, useEffect } from 'react';
import Slide from '@/components/Slide';
import { Download, Sparkles, Palette, Copy, Grid3X3, Settings2, Image as ImageIcon, Upload, X, Plus } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
import { TEMPLATES, getTemplateCategories } from '@/lib/templates';

const FONT_OPTIONS = [
    { name: 'Modern Bold', value: 'font-extrabold tracking-tight' },
    { name: 'Ultra Black', value: 'font-black uppercase tracking-tighter' },
    { name: 'Minimalist', value: 'font-light tracking-widest' },
    { name: 'Classic Serif', value: 'font-serif tracking-normal' },
    { name: 'Technical', value: 'font-mono font-bold' },
    { name: 'Playful Burst', value: 'font-black uppercase tracking-wider italic' },
];

const defaultPalette = {
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


const initialSlides = [
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

// Utility function to strip markdown formatting from text
const stripMarkdown = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        .replace(/~~(.+?)~~/g, '$1')
        .replace(/[*_]/g, '');
};

export default function Home() {
    const [slides, setSlides] = useState(initialSlides);
    const [palette, setPalette] = useState(defaultPalette);
    const [themeColor, setThemeColor] = useState('#3b82f6');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [topic, setTopic] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [useSearch, setUseSearch] = useState(false);
    const [useGeneratedPalette, setUseGeneratedPalette] = useState(false);
    const [savedPalette, setSavedPalette] = useState(defaultPalette);
    const [userImages, setUserImages] = useState([]);
    const [userProfileImage, setUserProfileImage] = useState('/profile.png');
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Derived colors from palette for convenience
    const colors = {
        primary: palette.primary || themeColor,
        secondary: palette.secondary || themeColor,
        accent: palette.accent || themeColor,
        dark: palette.dark || '#0f172a',
        light: palette.light || '#f8fafc',
        gradient: palette.gradient || { from: themeColor, to: themeColor, direction: 'to-br' }
    };

    const processFiles = (files) => {
        files.forEach(file => {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image`);
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const newImage = {
                    id: Math.random().toString(36).substr(2, 9),
                    url: event.target.result,
                    name: file.name
                };
                setUserImages(prev => [...prev, newImage]);
                toast.success('Image uploaded successfully');
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const applyImageToSlide = (imageUrl, slideIndex) => {
        const newSlides = [...slides];
        newSlides[slideIndex] = { ...newSlides[slideIndex], image: imageUrl };
        setSlides(newSlides);
        toast.success(`Image applied to slide ${slideIndex + 1}`);
    };

    const removeImageFromSlide = (slideIndex) => {
        const newSlides = [...slides];
        newSlides[slideIndex] = { ...newSlides[slideIndex], image: null };
        setSlides(newSlides);
        toast.info(`Image removed from slide ${slideIndex + 1}`);
    };

    const autoDistributeImages = () => {
        if (userImages.length === 0) return;

        const newSlides = [...slides];
        let imgIdx = 0;

        // Logical places for images: cover, some middle content slides
        newSlides.forEach((slide, idx) => {
            if (slide.type === 'cover' || slide.type === 'intro' || (idx > 0 && idx % 3 === 0)) {
                slide.image = userImages[imgIdx % userImages.length].url;
                imgIdx++;
            }
        });

        setSlides(newSlides);
        toast.success('Images auto-distributed across slides!');
    };

    const SLIDE_VARIANTS = {
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

    const cycleSlideVariant = (index) => {
        const newSlides = [...slides];
        const slide = newSlides[index];
        const variants = SLIDE_VARIANTS[slide.type] || ['classic'];
        const currentVariant = slide.variant || variants[0];
        const currentIndex = variants.indexOf(currentVariant);
        const nextIndex = (currentIndex + 1) % variants.length;

        newSlides[index] = { ...slide, variant: variants[nextIndex] };
        setSlides(newSlides);
        toast.success(`Layout changed to ${variants[nextIndex]}`);
    };

    const removeSlide = (index) => {
        const newSlides = [...slides];
        newSlides.splice(index, 1);
        setSlides(newSlides);
        toast.success('Slide removed');
    };

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (slides !== initialSlides) {
            const dataToSave = {
                slides,
                palette,
                themeColor,
                topic,
                postTitle,
                caption,
                useSearch,
                userImages,
                userProfileImage
            };
            localStorage.setItem('linkedin_carousel_data', JSON.stringify(dataToSave));
        }
    }, [slides, palette, themeColor, topic, postTitle, caption, useSearch, userImages, userProfileImage]);

    // Handle outside data injection for Puppeteer
    useEffect(() => {
        window.setCarouselData = (data, color) => {
            if (data.slides) setSlides(data.slides);
            if (data.postTitle) setPostTitle(data.postTitle);
            if (data.caption) setCaption(data.caption);
            if (data.palette) setPalette(data.palette);
            if (color) setThemeColor(color);
        };



        // Load from localStorage
        const savedData = localStorage.getItem('linkedin_carousel_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setSlides(parsed.slides || initialSlides);
                if (parsed.palette) setPalette(parsed.palette);
                if (parsed.themeColor) setThemeColor(parsed.themeColor);
                if (parsed.topic) setTopic(parsed.topic);
                if (parsed.postTitle) setPostTitle(parsed.postTitle);
                if (parsed.caption) setCaption(parsed.caption);
                if (parsed.useSearch !== undefined) setUseSearch(parsed.useSearch);
                if (parsed.userImages) setUserImages(parsed.userImages);
                if (parsed.userProfileImage) setUserProfileImage(parsed.userProfileImage);
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('export') === 'true') {
            document.body.classList.add('export-mode');
        }
    }, []);

    const generateFromAI = async () => {
        if (!topic) return toast.error('Please enter a topic first');
        console.log("Requesting AI generation for:", topic);
        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, useSearch })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to generate');
            }

            const data = await res.json();
            console.log("AI Data Received:", data);
            if (data.slides) {
                setSlides(data.slides);
                setPostTitle(data.postTitle || '');
                setCaption(data.caption || '');
                if (data.palette) {
                    setPalette(data.palette);
                    setThemeColor(data.palette.primary);
                } else if (data.themeColor) {
                    setThemeColor(data.themeColor);
                }
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            toast.error(`Failed to generate with AI: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const shuffleDesign = () => {
        const randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        setPalette({
            ...randomTemplate,
            templateId: randomTemplate.id,
            name: randomTemplate.name,
            filterCategory: palette.filterCategory
        });
        setThemeColor(randomTemplate.primary);
        toast.success(`Template: ${randomTemplate.name}`);
    };

    const downloadAll = async () => {
        setIsGenerating(true);
        setIsExporting(true);
        document.body.classList.add('export-mode');

        await new Promise(r => setTimeout(r, 500));

        try {
            const { PDFDocument } = await import('pdf-lib');
            const pdfDoc = await PDFDocument.create();

            for (let i = 0; i < slides.length; i++) {
                const element = document.getElementById(`slide-content-${i}`);
                if (element) {
                    // Use html-to-image with strict font disabling
                    const dataUrl = await toJpeg(element, {
                        width: 1200,
                        height: 1500,
                        pixelRatio: 1.5,
                        quality: 0.92,
                        backgroundColor: '#ffffff',
                        // CRITICAL: Disable all font embedding to prevent crashes
                        skipFonts: true,
                        fontEmbedCSS: '',
                        filter: (node) => {
                            // Exclude external stylesheets that might cause issues
                            if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
                                return false;
                            }
                            return true;
                        }
                    });

                    // Convert data URL to bytes
                    const imageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
                    const image = await pdfDoc.embedJpg(imageBytes);

                    // Add page with image dimensions
                    const page = pdfDoc.addPage([1200, 1500]);
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width: 1200,
                        height: 1500,
                    });
                }
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const safeTopic = ((topic || '').substring(0, 30).trim() || 'carousel').replace(/\s+/g, '_');
            const link = document.createElement('a');
            link.href = url;
            link.download = `${safeTopic}.pdf`;
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error(`Error generating PDF: ${error.message}`);
        } finally {
            document.body.classList.remove('export-mode');
            setIsExporting(false);
            setIsGenerating(false);
        }
    };

    // Helper function to get gradient CSS
    const getGradientCSS = (direction = 'to-br') => {
        const dirs = {
            'to-br': 'to bottom right',
            'to-r': 'to right',
            'to-b': 'to bottom',
            'to-tr': 'to top right'
        };
        return `linear-gradient(${dirs[direction] || 'to bottom right'}, ${colors.gradient.from}, ${colors.gradient.to})`;
    };

    // Decorative dots pattern
    const DotsPattern = ({ opacity = 0.1 }) => {
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

    const FloatingCircles = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: colors.primary }}></div>
            <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full blur-3xl opacity-50" style={{ background: colors.secondary }}></div>
            <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: colors.accent }}></div>
        </div>
    );

    // Get current template from palette
    const currentTemplate = TEMPLATES.find(t => t.id === palette.templateId) || TEMPLATES[0];

    // Template decorations - supports all 26 unique templates
    const TemplateDecorations = () => {
        const decorationType = currentTemplate?.decorationType || palette.template || 'floating-circles';

        switch (decorationType) {
            case 'floating-circles':
                return <FloatingCircles />;

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
                return <FloatingCircles />;

            default:
                return <FloatingCircles />;
        }
    };

    // Helper to get text weight based on template
    const getHeadingWeight = () => {
        // Use custom palette headingStyle if set
        if (palette.headingStyle) return palette.headingStyle;
        // Use template's headingStyle if available
        if (currentTemplate?.headingStyle) return currentTemplate.headingStyle;
        // Legacy fallback
        if (palette.template === 'bold') return 'font-black uppercase tracking-tighter';
        if (palette.template === 'minimal') return 'font-light tracking-widest';
        return 'font-extrabold tracking-tight';
    };

    const renderSlideContent = (slide, index) => {
        switch (slide.type) {
            case 'cover':
                const coverVariant = slide.variant || 'centered';
                const headingClass = getHeadingWeight();
                if (coverVariant === 'split') {
                    return (
                        <div className="h-full w-full flex text-white relative overflow-hidden" style={{ background: colors.dark }}>
                            <div className="absolute inset-0 opacity-40 z-0" style={{ background: getGradientCSS(), opacity: 0.3 }}></div>
                            <TemplateDecorations />
                            <div className="w-5/12 relative z-10 overflow-hidden h-full">
                                {slide.image ? (
                                    <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-2xl transform scale-110" style={{ backgroundImage: `url(${slide.image})` }}></div>
                                        <img src={slide.image} className="relative z-10 w-full h-full object-contain p-8" alt="slide asset" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col justify-center items-center" style={{ background: colors.primary }}>
                                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                                        <span className="text-2xl font-bold tracking-[0.3em] writing-vertical-lr transform rotate-180 relative z-10" style={{ writingMode: 'vertical-rl' }}>{slide.tagline}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
                                <h2
                                    className={`${headingClass} leading-[0.95] mb-8`}
                                    style={{ fontSize: slide.title?.length > 40 ? '60px' : slide.title?.length > 20 ? '75px' : '90px' }}
                                >
                                    {slide.title}
                                </h2>
                                <p className="text-5xl font-light text-slate-300 max-w-3xl mb-16">{slide.subtitle}</p>
                                <div className="flex items-center gap-6">
                                    <img src={userProfileImage} className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                                    <span className="text-3xl font-medium">{slide.author}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'minimal') {
                    return (
                        <div className="h-full w-full flex flex-col p-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
                            <TemplateDecorations />
                            {slide.image && (
                                <div className="flex-1 flex items-center justify-center relative z-10 min-h-0 mb-16">
                                    <img src={slide.image} className="h-full w-auto object-contain rounded-3xl shadow-2xl" alt="slide asset" />
                                </div>
                            )}
                            <div className="relative z-10 mt-auto">
                                <span className="text-2xl font-bold tracking-[0.2em] mb-4 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                                <h2 className={`${headingClass} leading-[1] mb-6`} style={{ fontSize: slide.title?.length > 40 ? '55px' : '80px' }}>{slide.title}</h2>
                                <p className="text-4xl font-light text-slate-400 max-w-4xl mb-16">{slide.subtitle}</p>
                                <div className="flex items-center gap-6">
                                    <img src={userProfileImage} className="w-16 h-16 rounded-full border-2 border-white/20" alt="profile" />
                                    <span className="text-2xl font-medium text-slate-300">{slide.author}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'bold') {
                    return (
                        <div className="h-full w-full flex flex-col justify-center p-24 relative overflow-hidden" style={{ background: colors.primary }}>
                            <div className="absolute inset-0 mix-blend-multiply opacity-50 bg-black"></div>
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="bg" />}
                            <div className="relative z-10 border-l-[20px] border-white pl-16">
                                <span className="text-4xl font-bold text-white tracking-[0.3em] mb-8 block uppercase">{slide.tagline}</span>
                                <h2 className="text-[110px] font-black text-white leading-[0.9] mb-12 uppercase tracking-tighter">{slide.title}</h2>
                                <p className="text-5xl font-medium text-white/80 max-w-4xl">{slide.subtitle}</p>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'card') {
                    return (
                        <div className="h-full w-full flex items-center justify-center p-16 relative overflow-hidden bg-slate-100">
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />}
                            <div className="w-full h-full bg-white rounded-[60px] shadow-2xl p-20 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-6" style={{ background: colors.primary }}></div>
                                <span className="text-2xl font-bold tracking-[0.2em] mb-8 block text-slate-400">{slide.tagline}</span>
                                <h2 className="text-[90px] font-black text-slate-900 leading-[0.95] mb-10">{slide.title}</h2>
                                <p className="text-5xl text-slate-500 max-w-3xl mb-16">{slide.subtitle}</p>
                                <div className="mt-auto flex items-center gap-6">
                                    <img src={userProfileImage} className="w-20 h-20 rounded-full bg-slate-100" alt="profile" />
                                    <span className="text-3xl font-bold text-slate-900">{slide.author}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'photo') {
                    return (
                        <div className="h-full w-full flex flex-col justify-end p-24 relative overflow-hidden bg-slate-900">
                            {slide.image ? (
                                <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="bg" />
                            ) : (
                                <div className="absolute inset-0 opacity-20" style={{ background: getGradientCSS() }}></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="relative z-10">
                                <div className="bg-white/10 backdrop-blur-md p-12 rounded-3xl border border-white/20">
                                    <h2 className="text-[80px] font-black text-white leading-none mb-8">{slide.title}</h2>
                                    <p className="text-4xl text-white/90">{slide.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'typographic') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-16 flex flex-col relative overflow-hidden">
                            <div className="flex-1 flex flex-col justify-center relative z-10">
                                <h2 className="text-[130px] font-black text-slate-900 leading-[0.85] tracking-tighter mb-12 mix-blend-multiply" style={{ color: colors.dark }}>
                                    {slide.title.split(' ').map((word, i) => (
                                        <span key={i} className={i % 2 === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : ''} style={i % 2 === 1 ? { backgroundImage: getGradientCSS() } : {}}>{word} <br /></span>
                                    ))}
                                </h2>
                            </div>
                            <div className="h-2 w-full mb-12" style={{ background: colors.primary }}></div>
                            <div className="flex justify-between items-end">
                                <p className="text-4xl font-bold text-slate-500 max-w-2xl">{slide.subtitle}</p>
                                <span className="text-2xl font-mono text-slate-400">{slide.author}</span>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'gradient') {
                    return (
                        <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 relative overflow-hidden text-white" style={{ background: getGradientCSS() }}>
                            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="bg" />}
                            <div className="relative z-10 border-4 border-white/30 p-20 rounded-[4rem]">
                                <span className="text-3xl font-bold tracking-[0.4em] mb-12 block">{slide.tagline}</span>
                                <h2 className="text-[90px] font-black leading-tight mb-12">{slide.title}</h2>
                                <p className="text-4xl font-medium opacity-90">{slide.subtitle}</p>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'boxed') {
                    return (
                        <div className="h-full w-full bg-white p-12 flex relative">
                            <div className="flex-1 border-8 border-slate-900 p-16 flex flex-col relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900 -mr-8 -mt-8 -z-10"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900 -ml-8 -mb-8 -z-10 opacity-10"></div>
                                <div className="mt-auto mb-auto">
                                    <span className="inline-block px-6 py-2 bg-slate-900 text-white text-2xl font-bold mb-8">{slide.tagline}</span>
                                    <h2 className="text-[100px] font-bold text-slate-900 leading-[0.9] mb-10">{slide.title}</h2>
                                    <div className="w-24 h-4 bg-slate-900 mb-10"></div>
                                    <p className="text-4xl text-slate-600 max-w-3xl">{slide.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    );
                } else if (coverVariant === 'stripe') {
                    return (
                        <div className="h-full w-full flex bg-white relative">
                            <div className="w-32 h-full" style={{ background: colors.primary }}></div>
                            <div className="flex-1 flex flex-col justify-center pl-20 pr-32">
                                <h2 className="text-[100px] font-black text-slate-900 leading-none mb-12 -ml-36 bg-white py-4 pr-12">{slide.title}</h2>
                                {slide.image && (
                                    <div className="h-64 w-full mb-12 rounded-3xl overflow-hidden relative">
                                        <img src={slide.image} className="w-full h-full object-cover" alt="asset" />
                                    </div>
                                )}
                                <p className="text-5xl text-slate-500 font-light">{slide.subtitle}</p>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="h-full w-full flex flex-col justify-center px-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
                        <div className="absolute inset-0 opacity-40 z-0" style={{
                            backgroundImage: `radial-gradient(at 0% 0%, ${colors.primary} 0, transparent 50%), radial-gradient(at 100% 0%, ${colors.secondary} 0, transparent 50%)`
                        }}></div>
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" alt="slide asset" />
                        )}
                        <DotsPattern opacity={0.05} />
                        <TemplateDecorations />
                        <div className="relative z-10">
                            <span className="text-3xl font-bold tracking-[0.2em] mb-6 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                            <h2
                                className={`${headingClass} leading-[0.95] mb-10`}
                                style={{ fontSize: slide.title?.length > 40 ? '70px' : slide.title?.length > 20 ? '85px' : '100px' }}
                            >
                                {slide.title}
                            </h2>
                            <p className="text-6xl font-light text-slate-300 max-w-4xl mx-auto">{slide.subtitle}</p>
                            <div className="mt-20 flex items-center gap-6 justify-center">
                                <img src={userProfileImage} className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                                <span className="text-3xl font-medium">{slide.author}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'intro':
                const introVariant = slide.variant || 'classic';
                if (introVariant === 'card') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-16 flex items-center justify-center relative">
                            <DotsPattern opacity={0.05} />
                            <div className="bg-white p-20 rounded-[60px] shadow-2xl w-full h-full flex flex-col justify-between relative overflow-hidden">
                                {slide.image && (
                                    <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />
                                )}
                                <div className="absolute top-0 left-0 w-full h-4" style={{ background: colors.primary }}></div>
                                <div>
                                    <h2 className="text-7xl font-bold mb-10 text-slate-900">{slide.heading}</h2>
                                    <div className="w-32 h-2 mb-10" style={{ background: colors.accent }}></div>
                                    <p className="text-5xl text-slate-600 leading-relaxed font-light">{slide.text}</p>
                                </div>
                                <div className="flex items-end gap-6 mt-12">
                                    <span className="text-[140px] font-black leading-none" style={{ color: colors.primary }}>{slide.stat}</span>
                                    <span className="text-3xl font-bold text-slate-400 uppercase tracking-widest mb-6 max-w-xs">{slide.statDesc}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative text-left">
                            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5" style={{ background: colors.primary }}></div>
                            <h2 className="text-8xl font-black text-slate-900 mb-16 relative z-10 leading-tight tracking-tighter">{slide.heading}</h2>
                            <p className="text-5xl text-slate-500 leading-relaxed max-w-4xl relative z-10 border-l-8 pl-12" style={{ borderColor: colors.accent }}>{slide.text}</p>
                            <div className="mt-24 flex items-center gap-8 relative z-10">
                                <div className="text-7xl font-bold" style={{ color: colors.secondary }}>{slide.stat}</div>
                                <div className="text-3xl text-slate-400 max-w-sm">{slide.statDesc}</div>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'split') {
                    return (
                        <div className="h-full w-full flex bg-slate-50 relative overflow-hidden">
                            <div className="w-1/2 h-full relative">
                                {slide.image ? (
                                    <img src={slide.image} className="absolute inset-0 w-full h-full object-cover" alt="bg" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center p-20" style={{ background: colors.primary }}>
                                        <h2 className="text-9xl font-black text-white leading-none tracking-tighter mix-blend-overlay opacity-50">{slide.stat}</h2>
                                    </div>
                                )}
                            </div>
                            <div className="w-1/2 h-full p-20 flex flex-col justify-center bg-white relative">
                                <h2 className="text-7xl font-bold text-slate-900 mb-12">{slide.heading}</h2>
                                <p className="text-4xl text-slate-500 leading-relaxed mb-16">{slide.text}</p>
                                <div className="border-t-4 pt-12" style={{ borderColor: colors.accent }}>
                                    <span className="text-6xl font-black block mb-4" style={{ color: colors.primary }}>{slide.stat}</span>
                                    <span className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{slide.statDesc}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'big-stat') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
                            <span className="text-[350px] font-black leading-[0.8] mb-12 relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-400">{slide.stat}</span>
                            <div className="relative z-10 bg-white p-12 rounded-3xl shadow-xl max-w-4xl -mt-24 border border-slate-200">
                                <h2 className="text-5xl font-bold text-slate-900 mb-6">{slide.heading}</h2>
                                <p className="text-3xl text-slate-500">{slide.text}</p>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'dark') {
                    return (
                        <div className="h-full w-full p-24 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                            <div className="absolute right-0 top-0 w-2/3 h-full opacity-20" style={{ background: getGradientCSS() }}></div>
                            <div className="relative z-10">
                                <div className="inline-block px-6 py-2 rounded-full mb-12 border border-white/20 text-white/80 font-mono text-2xl">01 // INTRODUCTION</div>
                                <h2 className="text-8xl font-black text-white mb-16 leading-tight max-w-4xl">{slide.heading}</h2>
                                <div className="flex gap-16">
                                    <div className="w-2 bg-gradient-to-b from-white to-transparent"></div>
                                    <p className="text-5xl font-light text-slate-300 leading-relaxed max-w-3xl">{slide.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'magazine') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                            <div className="flex-1 columns-1">
                                <h2 className="text-[100px] font-serif italic text-slate-900 mb-12 leading-[0.9]">{slide.heading}</h2>
                                <div className="text-4xl text-slate-600 leading-relaxed font-serif relative pl-32">
                                    <span className="absolute left-0 top-2 text-9xl font-black leading-[0.6] float-left mr-4 text-slate-200">{slide.text.charAt(0)}</span>
                                    {slide.text.slice(1)}
                                </div>
                            </div>
                            <div className="mt-auto border-t-2 border-slate-900 pt-8 flex justify-between items-center">
                                <span className="text-2xl font-bold tracking-widest uppercase">Analysis</span>
                                <span className="text-5xl font-bold" style={{ color: colors.primary }}>{slide.stat}</span>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'timeline') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex items-center relative overflow-hidden">
                            <div className="w-2 h-full bg-slate-200 absolute left-32"></div>
                            <div className="relative z-10 pl-32">
                                <div className="w-16 h-16 rounded-full border-8 border-slate-100 flex items-center justify-center -ml-[74px] mb-12" style={{ background: colors.primary }}></div>
                                <h2 className="text-8xl font-bold text-slate-900 mb-12">{slide.heading}</h2>
                                <div className="bg-white p-12 rounded-r-3xl border-l-8 shadow-sm max-w-4xl" style={{ borderColor: colors.accent }}>
                                    <p className="text-4xl text-slate-600 leading-relaxed">{slide.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                } else if (introVariant === 'chat') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-24 flex flex-col justify-center items-center relative overflow-hidden">
                            <div className="w-full max-w-4xl space-y-12">
                                <div className="bg-white p-10 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl shadow-sm self-start mr-24">
                                    <p className="text-4xl text-slate-600 font-medium">Topic: {slide.heading}</p>
                                </div>
                                <div className="bg-blue-600 p-10 rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl shadow-md self-end ml-24 text-white" style={{ background: colors.primary }}>
                                    <p className="text-4xl font-light leading-relaxed">{slide.text}</p>
                                </div>
                                {slide.stat && (
                                    <div className="flex justify-center mt-12">
                                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Key Stat: {slide.stat}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                } else if (introVariant === 'hero') {
                    return (
                        <div className="h-full w-full flex flex-col relative overflow-hidden bg-slate-900">
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="bg" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="mt-auto p-24 relative z-10">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-16 rounded-3xl">
                                    <h2 className="text-7xl font-bold text-white mb-8">{slide.heading}</h2>
                                    <div className="w-24 h-2 bg-white mb-8"></div>
                                    <p className="text-4xl text-white/90 leading-relaxed max-w-4xl">{slide.text}</p>
                                </div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="h-full w-full bg-white p-24 flex flex-col justify-between relative">
                        <DotsPattern opacity={0.03} />
                        <TemplateDecorations />
                        <div className="flex-1 flex gap-12 items-center relative z-10">
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="w-24 h-3 mb-10" style={{ background: colors.primary }}></div>
                                <h2 className={`text-8xl ${getHeadingWeight()} text-slate-900 mb-10 leading-tight`}>{stripMarkdown(slide.heading)}</h2>
                                <p className="text-5xl text-slate-600 leading-relaxed max-w-5xl">{stripMarkdown(slide.text)}</p>
                            </div>
                            {slide.image && (
                                <div className="w-2/5 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                                    <img src={slide.image} className="w-full h-full object-cover" alt="slide asset" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-10 p-12 rounded-3xl shrink-0 relative z-10" style={{ background: `${colors.primary}15` }}>
                            <span className="text-[120px] font-black leading-none" style={{ color: colors.primary }}>{slide.stat}</span>
                            <p className="text-4xl font-medium text-slate-700">{stripMarkdown(slide.statDesc)}</p>
                        </div>
                    </div>
                );

            case 'highlight':
                const highlightVariant = slide.variant || 'centered';
                if (highlightVariant === 'framed') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex items-center justify-center relative">
                            <div className="w-full h-full border-[16px] flex items-center justify-center p-20 text-center relative" style={{ borderColor: colors.primary }}>
                                {slide.image && (
                                    <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="bg" />
                                )}
                                <h2 className="text-8xl font-black text-slate-900 leading-tight uppercase tracking-tight relative z-10">{slide.message}</h2>
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-50" style={{ background: colors.accent }}></div>
                            </div>
                        </div>
                    );
                } else if (highlightVariant === 'heavy') {
                    return (
                        <div className="h-full w-full flex items-center justify-center text-center p-12 relative overflow-hidden" style={{ background: colors.dark }}>
                            {slide.image && (
                                <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="bg" />
                            )}
                            <h2 className="text-[140px] font-black text-white leading-[0.85] tracking-tighter mix-blend-overlay opacity-90">{slide.message}</h2>
                        </div>
                    );
                } else if (highlightVariant === 'gradient') {
                    return (
                        <div className="h-full w-full flex items-center justify-center text-center p-24 relative overflow-hidden text-white" style={{ background: getGradientCSS() }}>
                            <div className="absolute inset-0 bg-white/20 mix-blend-overlay backdrop-blur-3xl"></div>
                            <h2 className="text-[100px] font-black leading-tight relative z-10 drop-shadow-xl">{slide.message}</h2>
                        </div>
                    );
                } else if (highlightVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white flex items-center justify-center text-center p-32 relative overflow-hidden">
                            <h2 className="text-[90px] font-light text-slate-800 leading-tight tracking-tight">{slide.message}</h2>
                            <div className="absolute bottom-24 w-24 h-2" style={{ background: colors.primary }}></div>
                        </div>
                    );
                } else if (highlightVariant === 'bold') {
                    return (
                        <div className="h-full w-full flex items-center justify-center text-center p-12 relative overflow-hidden bg-white">
                            <div className="absolute inset-0 px-12 py-12">
                                <div className="w-full h-full border-[30px] border-slate-900 flex items-center justify-center p-12">
                                    <h2 className="text-[110px] font-black text-slate-900 leading-[0.85] uppercase tracking-tighter">{slide.message}</h2>
                                </div>
                            </div>
                        </div>
                    );
                } else if (highlightVariant === 'quote') {
                    return (
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden bg-slate-50">
                            <span className="text-[200px] font-serif leading-none opacity-10 absolute top-24 left-24" style={{ color: colors.primary }}>“</span>
                            <h2 className="text-[80px] font-serif italic text-slate-800 leading-tight relative z-10 max-w-4xl">{slide.message}</h2>
                            <span className="text-[200px] font-serif leading-none opacity-10 absolute bottom-24 right-24" style={{ color: colors.primary }}>”</span>
                        </div>
                    );
                } else if (highlightVariant === 'card') {
                    return (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center p-24 relative overflow-hidden">
                            <div className="bg-white p-24 rounded-[60px] shadow-2xl relative overflow-hidden w-full h-full flex items-center justify-center text-center">
                                <div className="absolute top-0 w-full h-8" style={{ background: colors.primary }}></div>
                                <h2 className="text-[85px] font-bold text-slate-900 leading-tight">{slide.message}</h2>
                            </div>
                        </div>
                    );
                } else if (highlightVariant === 'split') {
                    return (
                        <div className="h-full w-full flex bg-slate-900 relative overflow-hidden">
                            <div className="w-1/3 h-full relative" style={{ background: colors.primary }}></div>
                            <div className="w-2/3 h-full flex items-center justify-center p-20 pl-0 relative z-10">
                                <h2 className="text-[110px] font-black text-white leading-[0.85] -ml-32">{slide.message}</h2>
                            </div>
                        </div>
                    );
                } else if (highlightVariant === 'neon') {
                    return (
                        <div className="h-full w-full bg-slate-900 flex items-center justify-center text-center p-24 relative overflow-hidden">
                            <h2 className="text-[100px] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 leading-tight drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ backgroundImage: getGradientCSS() }}>
                                {slide.message}
                            </h2>
                        </div>
                    );
                }
                return (
                    <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 relative overflow-hidden">
                        <div className="absolute inset-0 z-0" style={{ background: colors.primary }}>
                            <div className="absolute inset-0 mix-blend-multiply opacity-50" style={{ background: colors.secondary }}></div>
                            {slide.image ? (
                                <img src={slide.image} className="w-full h-full object-cover opacity-40 mix-blend-multiply" alt="background" />
                            ) : (
                                <div className="absolute inset-0" style={{ background: getGradientCSS(), opacity: 0.5 }}></div>
                            )}
                        </div>
                        <TemplateDecorations />
                        <div className="relative z-10">
                            <h2 className={`text-[80px] ${getHeadingWeight()} text-white leading-tight mb-12 max-w-5xl mx-auto`}>{stripMarkdown(slide.message)}</h2>
                            {slide.accent && <p className="text-4xl text-white/80 font-medium">{stripMarkdown(slide.accent)}</p>}
                        </div>
                    </div >
                );

            case 'infographic':
                const infoVariant = slide.variant || 'classic';

                if (infoVariant === 'cards') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-24 flex flex-col justify-center">
                            <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {(slide.points || []).map((p, i) => (
                                    <div key={i} className="bg-white p-10 rounded-3xl shadow-sm flex items-start gap-8">
                                        <div className="text-4xl font-bold w-16 h-16 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: colors.secondary }}>{i + 1}</div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-800 mb-2">{stripMarkdown(p.t)}</h3>
                                            <p className="text-2xl text-slate-500 leading-snug">{stripMarkdown(p.d)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (infoVariant === 'steps') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center pl-32 relative overflow-hidden">
                            <div className="absolute left-16 top-0 bottom-0 w-1 bg-slate-100"></div>
                            <h2 className="text-7xl font-bold text-slate-900 mb-20">{slide.heading}</h2>
                            <div className="flex-1 flex flex-col justify-center space-y-16">
                                {(slide.points || []).map((p, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[84px] top-2 w-10 h-10 rounded-full border-4 border-white shadow-sm" style={{ background: colors.primary }}></div>
                                        <h3 className="text-4xl font-black text-slate-900 mb-4 flex items-center gap-4">
                                            <span style={{ color: colors.primary }}>Step {i + 1}:</span>
                                            {stripMarkdown(p.t)}
                                        </h3>
                                        <p className="text-3xl text-slate-500 max-w-4xl pl-4 border-l-4 border-slate-100">{stripMarkdown(p.d)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (infoVariant === 'grid') {
                    return (
                        <div className="h-full w-full bg-slate-900 p-24 flex flex-col relative" style={{ background: colors.dark }}>
                            <h2 className="text-7xl font-black text-white mb-16 text-center">{slide.heading}</h2>
                            <div className="grid grid-cols-2 gap-8">
                                {(slide.points || []).map((p, i) => (
                                    <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-sm">
                                        <div className="text-5xl font-black mb-6 opacity-30" style={{ color: colors.primary }}>0{i + 1}</div>
                                        <h3 className="text-3xl font-bold text-white mb-4">{stripMarkdown(p.t)}</h3>
                                        <p className="text-2xl text-white/60 leading-relaxed">{stripMarkdown(p.d)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                // Classic
                return (
                    <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative">
                        <DotsPattern opacity={0.02} />
                        <TemplateDecorations />
                        <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-16 relative z-10`}>{slide.heading}</h2>
                        <div className="flex-1 flex flex-col justify-center space-y-16 relative z-10">
                            {(slide.points || []).map((p, i) => (
                                <div key={i} className="flex gap-12 items-start">
                                    <div className="text-6xl font-bold w-32 h-32 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ background: colors.primary }}>{i + 1}</div>
                                    <div>
                                        <h3 className="text-5xl font-bold text-slate-800 mb-4">{stripMarkdown(p.t)}</h3>
                                        <p className="text-4xl text-slate-500 leading-snug max-w-4xl">{stripMarkdown(p.d)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'list':
                const listVariant = slide.variant || 'classic';
                const items = slide.items || slide.points || [];

                if (listVariant === 'cards') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative overflow-hidden">
                            <TemplateDecorations />
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
                        <TemplateDecorations />
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

            case 'list-icons':
                return (
                    <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative overflow-hidden">
                        <TemplateDecorations />
                        <DotsPattern opacity={0.03} />
                        <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-16 relative z-10`}>{slide.heading}</h2>
                        <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
                            {(slide.items || []).map((item, i) => {
                                const [label, ...descArr] = stripMarkdown(item.text).split(':');
                                const description = descArr.join(':').trim();

                                return (
                                    <div
                                        key={i}
                                        className="flex gap-10 items-center p-10 rounded-[32px] bg-white shadow-xl shadow-slate-200/50 border border-white hover:scale-[1.02] transition-all group"
                                    >
                                        <div
                                            className="w-32 h-32 shrink-0 rounded-2xl flex items-center justify-center text-5xl font-black shadow-lg shadow-blue-500/10"
                                            style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.primary}20)`, color: colors.primary }}
                                        >
                                            {item.icon || '→'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-5xl font-black text-slate-800 tracking-tightest group-hover:text-blue-600 transition-colors uppercase">
                                                    {item.icon && item.icon.length > 1 ? item.icon : label}
                                                </span>
                                                <div className="h-1 flex-1 bg-slate-100 rounded-full opacity-50"></div>
                                            </div>
                                            <p className="text-4xl text-slate-500 font-medium leading-snug">
                                                {description || (item.icon && item.icon.length > 1 ? label + ' ' + description : stripMarkdown(item.text))}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );

            case 'process-flow':
                return (
                    <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative overflow-hidden">
                        <TemplateDecorations />
                        <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-20 relative z-10`}>{slide.heading}</h2>
                        <div className="flex-1 flex flex-col justify-center relative">
                            {/* SVG Bezier Connector */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 600" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
                                        <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.8" />
                                        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M 150 200 C 300 200, 300 400, 450 400 C 600 400, 600 200, 750 200 C 900 200, 900 400, 1050 400"
                                    stroke="url(#curveGradient)"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray="1 25"
                                    className="animate-pulse"
                                />
                                <path
                                    d="M 150 200 C 300 200, 300 400, 450 400 C 600 400, 600 200, 750 200 C 900 200, 900 400, 1050 400"
                                    stroke={colors.primary}
                                    strokeWidth="4"
                                    fill="transparent"
                                    strokeOpacity="0.1"
                                />
                            </svg>

                            <div className="flex items-center justify-between relative h-[600px] px-10">
                                {(slide.steps || []).map((step, i) => {
                                    const yOffset = i % 2 === 0 ? '-100px' : '100px';
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center relative z-10 transition-all duration-500 hover:scale-110"
                                            style={{ transform: `translateY(${yOffset})`, width: '25%' }}
                                        >
                                            <div className="relative group mb-6">
                                                <div className="absolute -inset-4 bg-white rounded-full blur-xl opacity-40 group-hover:opacity-100 transition-opacity"></div>
                                                <div
                                                    className="w-24 h-24 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-[0_15px_35px_rgba(0,0,0,0.15)] relative z-10 border-4 border-white"
                                                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                                                >
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[28px] shadow-lg border border-white/50 w-full transform hover:-translate-y-1 transition-transform">
                                                <p className="text-2xl font-black text-slate-800 text-center leading-tight">{stripMarkdown(step)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'timeline':
                return (
                    <div className="h-full w-full bg-white p-24 flex flex-col relative">
                        <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                        <div className="flex-1 flex flex-col justify-center relative">
                            <div className="absolute left-24 top-0 bottom-0 w-2 rounded-full" style={{ background: `${colors.primary}30` }}></div>
                            <div className="space-y-16 pl-40">
                                {(slide.events || []).map((event, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[68px] top-4 w-8 h-8 rounded-full" style={{ background: colors.primary }}></div>
                                        <span className="text-4xl font-black block mb-2" style={{ color: colors.primary }}>{event.year}</span>
                                        <p className="text-4xl text-slate-600">{stripMarkdown(event.event)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'stats-grid':
                return (
                    <div className="h-full w-full p-24 flex flex-col relative" style={{ background: colors.dark }}>
                        <FloatingCircles />
                        <h2 className="text-7xl font-black text-white mb-16 relative z-10">{slide.heading}</h2>
                        <div className="flex-1 grid grid-cols-2 gap-10 relative z-10">
                            {(slide.stats || []).map((stat, i) => (
                                <div key={i} className="flex flex-col justify-center items-center p-12 rounded-3xl text-center" style={{ background: `${colors.primary}20` }}>
                                    <span className="text-[100px] font-black leading-none mb-4" style={{ color: colors.primary }}>{stat.value}</span>
                                    <p className="text-3xl text-white/80 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'chart':
                const chartVariant = slide.variant || (slide.style === 'horizontal' ? 'horizontal' : 'classic');
                if (chartVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative">
                            <h2 className="text-7xl font-bold text-slate-900 mb-20">{slide.heading}</h2>
                            <div className="flex-1 flex flex-col justify-center space-y-12">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-3xl font-medium text-slate-500">{slide.labels[i]}</span>
                                            <span className="text-4xl font-bold" style={{ color: colors.primary }}>{v}%</span>
                                        </div>
                                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden w-full">
                                            <div className="h-full rounded-full" style={{ width: `${v}%`, background: colors.primary }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (chartVariant === 'dark') {
                    return (
                        <div className="h-full w-full p-24 flex flex-col justify-center relative" style={{ background: colors.dark }}>
                            <h2 className="text-7xl font-black text-white mb-24">{slide.heading}</h2>
                            <div className="flex-1 flex items-end justify-between gap-12 px-4 border-b-2 border-white/10 pb-4">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                                        <div className="text-4xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity mb-2">{v}%</div>
                                        <div className="w-full rounded-t-lg transition-all relative" style={{ height: `${v * 6}px`, background: colors.primary }}>
                                            <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                                        </div>
                                        <div className="text-2xl font-bold text-slate-400 text-center mt-4 uppercase tracking-widest">{slide.labels[i]}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (chartVariant === 'horizontal') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col">
                            <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                            <div className="flex-1 flex flex-col justify-center space-y-10">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="flex items-center gap-8 group">
                                        <div className="w-48 text-3xl font-bold text-slate-500 text-right shrink-0">{slide.labels[i]}</div>
                                        <div className="flex-1 h-20 bg-white rounded-2xl overflow-hidden shadow-sm p-2 border border-slate-100">
                                            <div className="h-full rounded-xl transition-all flex items-center justify-end px-4" style={{ width: `${v}%`, background: colors.primary }}>
                                                <span className="text-3xl font-bold text-white">{v}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (chartVariant === 'donut') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col items-center justify-center relative">
                            <h2 className="text-7xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                            <div className="flex flex-wrap justify-center gap-12">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="relative w-64 h-64 rounded-full flex items-center justify-center"
                                            style={{
                                                background: `conic-gradient(${colors.primary} ${v}%, ${colors.secondary}00 ${v}%)`,
                                                border: `20px solid ${colors.secondary}20`
                                            }}>
                                            <span className="text-6xl font-bold text-slate-900">{v}%</span>
                                        </div>
                                        <span className="mt-8 text-3xl font-bold text-slate-500 text-center max-w-[200px]">{slide.labels[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (chartVariant === 'cards') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-20 flex flex-col justify-center">
                            <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                            <div className="grid grid-cols-2 gap-8">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="bg-white p-10 rounded-3xl shadow-lg flex items-center gap-8">
                                        <div className="w-32 h-32 rounded-full border-[12px] flex items-center justify-center text-4xl font-black" style={{ borderColor: colors.primary, color: colors.primary }}>
                                            {v}%
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-4xl font-bold text-slate-800 mb-2">{slide.labels[i]}</h3>
                                            <div className="w-full h-4 bg-slate-100 rounded-full mt-4">
                                                <div className="h-full rounded-full" style={{ width: `${v}%`, background: colors.secondary }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                // Classic Vertical Bar Chart
                return (
                    <div className="h-full w-full bg-white p-24 pb-32 flex flex-col">
                        <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 flex items-end justify-between gap-12 px-10 border-b-8 border-slate-100">
                                {(slide.chartData || []).map((v, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-8 group">
                                        <div className="text-4xl font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity transformation -translate-y-4">{v}%</div>
                                        <div className="w-full rounded-t-2xl transition-all duration-1000 shadow-lg relative overflow-hidden" style={{ height: `${v * 7}px`, background: colors.primary }}>
                                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/20 to-transparent"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between gap-12 px-10 pt-8">
                                {(slide.labels || []).map((label, i) => (
                                    <div key={i} className="flex-1 text-3xl font-bold text-slate-800 text-center">{label}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'big-number':
                const bnVariant = slide.variant || 'classic';
                if (bnVariant === 'framed') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex items-center justify-center relative">
                            <TemplateDecorations />
                            <div className="w-full h-full border-[12px] p-24 flex flex-col items-center justify-center text-center rounded-[60px] relative overflow-hidden" style={{ borderColor: colors.primary }}>
                                <div className="absolute inset-0 opacity-5" style={{ background: colors.primary }}></div>
                                <div className={`${getHeadingWeight()} leading-none mb-12`} style={{ color: colors.primary, fontSize: '280px' }}>{slide.number}</div>
                                <p className="text-5xl text-slate-700 max-w-4xl font-medium leading-relaxed mb-12">{slide.description}</p>
                                <span className="text-3xl uppercase tracking-widest font-bold" style={{ color: colors.secondary }}>{slide.source}</span>
                            </div>
                        </div>
                    );
                } else if (bnVariant === 'split') {
                    return (
                        <div className="h-full w-full bg-white flex relative overflow-hidden">
                            <div className="w-1/2 flex items-center justify-center p-16" style={{ background: colors.primary }}>
                                <div className={`${getHeadingWeight()} text-white leading-none text-center`} style={{ fontSize: '240px' }}>{slide.number}</div>
                            </div>
                            <div className="flex-1 p-24 flex flex-col justify-center bg-slate-50">
                                <p className="text-6xl text-slate-800 font-medium leading-tight mb-16">{slide.description}</p>
                                <div className="w-24 h-2 mb-12" style={{ background: colors.secondary }}></div>
                                <span className="text-3xl text-slate-500 uppercase tracking-widest">{slide.source}</span>
                            </div>
                        </div>
                    );
                } else if (bnVariant === 'card') {
                    return (
                        <div className="h-full w-full bg-slate-100 p-24 flex items-center justify-center relative overflow-hidden">
                            <div className="bg-white w-full max-w-5xl p-32 rounded-[80px] shadow-2xl flex flex-col items-center text-center">
                                <div className={`${getHeadingWeight()} leading-none mb-10`} style={{ color: colors.primary, fontSize: '300px' }}>{slide.number}</div>
                                <p className="text-5xl text-slate-600 font-medium leading-relaxed">{slide.description}</p>
                            </div>
                        </div>
                    );
                } else if (bnVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center items-start relative">
                            <span className="text-lg font-bold uppercase tracking-widest mb-28 pl-2" style={{ color: colors.secondary }}>{slide.source}</span>
                            <div className={`${getHeadingWeight()} leading-none mb-16`} style={{ color: colors.primary, fontSize: '280px' }}>{slide.number}</div>
                            <p className="text-5xl text-slate-800 font-light leading-snug max-w-4xl">{slide.description}</p>
                        </div>
                    );
                } else if (bnVariant === 'circle') {
                    return (
                        <div className="h-full w-full bg-white p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="w-[600px] h-[600px] rounded-full flex items-center justify-center shadow-2xl mb-16" style={{ background: colors.primary }}>
                                <div className={`${getHeadingWeight()} text-white leading-none`} style={{ fontSize: '180px' }}>{slide.number}</div>
                            </div>
                            <p className="text-5xl text-slate-800 max-w-4xl font-bold leading-tight">{slide.description}</p>
                        </div>
                    );
                } else if (bnVariant === 'gradient') {
                    return (
                        <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 text-white relative overflow-hidden" style={{ background: getGradientCSS() }}>
                            <div className="bg-white/10 backdrop-blur-md p-24 rounded-[60px] border border-white/20 w-full max-w-6xl">
                                <div className={`${getHeadingWeight()} leading-none mb-10 text-white`} style={{ fontSize: '260px', textShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>{slide.number}</div>
                                <p className="text-5xl font-medium leading-relaxed opacity-90">{slide.description}</p>
                            </div>
                        </div>
                    );
                } else if (bnVariant === 'bold') {
                    return (
                        <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center relative overflow-hidden">
                            <span className="absolute top-0 -left-12 text-[400px] font-black opacity-5 leading-none select-none" style={{ color: colors.primary }}>#</span>
                            <div className={`text-[320px] font-black leading-none mb-12 relative z-10 tracking-tighter`} style={{ color: colors.primary }}>{slide.number}</div>
                            <p className="text-6xl text-white font-bold max-w-5xl leading-tight relative z-10">{slide.description}</p>
                        </div>
                    );
                } else if (bnVariant === 'simple') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <p className="text-4xl text-slate-400 font-bold uppercase tracking-widest mb-12">{slide.source}</p>
                            <div className={`${getHeadingWeight()} leading-none mb-12`} style={{ color: colors.dark, fontSize: '250px' }}>{slide.number}</div>
                            <p className="text-5xl text-slate-600 max-w-5xl font-medium leading-relaxed">{slide.description}</p>
                        </div>
                    );
                }

                // Classic / Default
                return (
                    <div className="h-full w-full p-24 flex flex-col justify-center items-center text-center relative overflow-hidden" style={{ background: colors.dark }}>
                        <div className="absolute inset-0" style={{ background: getGradientCSS(), opacity: 0.2 }}></div>
                        <TemplateDecorations />
                        <div className="relative z-10 w-full px-10">
                            <div
                                className={`${getHeadingWeight()} mb-16 leading-none whitespace-nowrap`}
                                style={{
                                    color: colors.primary,
                                    fontSize: slide.number?.toString().length > 12 ? '80px' :
                                        slide.number?.toString().length > 9 ? '120px' :
                                            slide.number?.toString().length > 7 ? '180px' :
                                                slide.number?.toString().length > 5 ? '220px' : '280px'
                                }}
                            >
                                {slide.number}
                            </div>
                            <p className="text-5xl text-white max-w-4xl mx-auto font-medium leading-relaxed mb-16">{slide.description}</p>
                            <span className="text-3xl text-slate-500 uppercase tracking-widest">{slide.source}</span>
                        </div>
                    </div>
                );

            case 'chart-radial':
                const dashArray = 251.2;
                const dashOffset = dashArray - (dashArray * slide.percentage / 100);
                return (
                    <div className="h-full w-full bg-white p-24 flex flex-col items-center relative">
                        <DotsPattern opacity={0.02} />
                        <TemplateDecorations />
                        <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-12 text-center relative z-10`}>{slide.heading}</h2>
                        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
                            <div className="relative w-[450px] h-[450px] mb-12">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={colors.primary} strokeWidth="12" strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-8xl font-black text-slate-900">{slide.percentage}%</div>
                            </div>
                            <p className="text-5xl text-slate-500 text-center max-w-4xl mx-auto leading-relaxed">{slide.detail}</p>
                        </div>
                    </div>
                );

            case 'comparison':
                return (
                    <div className="h-full w-full bg-white flex relative">
                        <div className="flex-1 p-24 bg-slate-50 border-r-4 border-white">
                            <h3 className="text-6xl font-bold text-slate-400 mb-16">BEFORE</h3>
                            <div className="space-y-12">
                                {(slide.left || []).map((item, i) => <div key={i} className="text-5xl font-medium text-slate-400 line-through">✕ {stripMarkdown(item)}</div>)}
                            </div>
                        </div>
                        <div className="flex-1 p-24" style={{ background: `${colors.primary}10` }}>
                            <h3 className="text-6xl font-bold mb-16" style={{ color: colors.primary }}>AFTER</h3>
                            <div className="space-y-12">
                                {(slide.right || []).map((item, i) => <div key={i} className="text-5xl font-bold text-slate-800">✓ {stripMarkdown(item)}</div>)}
                            </div>
                        </div>
                    </div>
                );

            case 'quote':
                const quoteVariant = slide.variant || 'classic';
                if (quoteVariant === 'modern') {
                    return (
                        <div className="h-full w-full flex flex-col justify-center p-24 relative" style={{ background: colors.primary }}>
                            <div className="absolute inset-0 opacity-20 bg-black"></div>
                            <h2 className="text-7xl font-black text-white leading-snug mb-16 relative z-10 text-center tracking-tight">"{stripMarkdown(slide.quote)}"</h2>
                            <div className="flex flex-col items-center relative z-10">
                                <div className="w-40 h-1 bg-white mb-6"></div>
                                <span className="text-3xl font-bold text-white/80 uppercase tracking-widest">{stripMarkdown(slide.cite)}</span>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col items-start justify-center relative">
                            <div className="w-20 h-20 mb-12 rounded-full flex items-center justify-center" style={{ background: `${colors.primary}20`, color: colors.primary }}>
                                <span className="text-6xl font-serif">"</span>
                            </div>
                            <h2 className="text-6xl font-medium text-slate-800 leading-tight mb-12">{stripMarkdown(slide.quote)}</h2>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200">
                                    {/* citing avatar placeholder */}
                                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">{(slide.cite || 'A')[0]}</div>
                                </div>
                                <span className="text-2xl font-bold text-slate-500">{stripMarkdown(slide.cite)}</span>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'card') {
                    return (
                        <div className="h-full w-full bg-slate-50 flex items-center justify-center p-24 relative overflow-hidden">
                            <div className="max-w-4xl bg-white p-24 rounded-[60px] shadow-2xl relative">
                                <span className="absolute -top-10 -left-10 text-[200px] font-serif leading-none opacity-10" style={{ color: colors.primary }}>“</span>
                                <h2 className="text-6xl font-semibold text-slate-900 leading-tight mb-16 relative z-10">{stripMarkdown(slide.quote)}</h2>
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold">{(slide.cite || 'A')[0]}</div>
                                    <span className="text-3xl font-bold text-slate-500">{stripMarkdown(slide.cite)}</span>
                                </div>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'dark') {
                    return (
                        <div className="h-full w-full flex flex-col justify-center p-24 text-center relative overflow-hidden" style={{ background: colors.dark }}>
                            <h2 className="text-7xl font-light text-white leading-relaxed mb-16 opacity-90">“{stripMarkdown(slide.quote)}”</h2>
                            <div className="w-12 h-1 mx-auto bg-white/20 mb-12"></div>
                            <p className="text-3xl font-bold text-white tracking-widest uppercase">{stripMarkdown(slide.cite)}</p>
                        </div>
                    );
                } else if (quoteVariant === 'pattern') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                            <DotsPattern opacity={0.1} />
                            <div className="border-l-[16px] pl-16 py-8 relative z-10" style={{ borderColor: colors.primary }}>
                                <h2 className="text-7xl font-bold text-slate-900 leading-tight mb-10">{stripMarkdown(slide.quote)}</h2>
                                <p className="text-4xl text-slate-500 font-mono">- {stripMarkdown(slide.cite)}</p>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'bubble') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="bg-white p-20 rounded-[80px] rounded-bl-none shadow-xl mb-12 border border-slate-100 relative max-w-5xl">
                                <p className="text-6xl font-medium text-slate-800 leading-snug">{stripMarkdown(slide.quote)}</p>
                            </div>
                            <div className="flex items-center gap-8 self-start ml-24">
                                <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-lg"></div>
                                <span className="text-4xl font-bold text-slate-600">{stripMarkdown(slide.cite)}</span>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'photo') {
                    return (
                        <div className="h-full w-full flex flex-col justify-end p-24 relative overflow-hidden bg-slate-900">
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="bg" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="relative z-10">
                                <h2 className="text-7xl font-bold text-white leading-tight mb-12 drop-shadow-lg">"{stripMarkdown(slide.quote)}"</h2>
                                <p className="text-4xl text-white/90 font-medium">— {stripMarkdown(slide.cite)}</p>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'split') {
                    return (
                        <div className="h-full w-full flex bg-slate-50 relative overflow-hidden">
                            <div className="w-1/3 flex items-center justify-center relative overflow-hidden" style={{ background: colors.primary }}>
                                <span className="text-[300px] text-white font-serif opacity-30">”</span>
                            </div>
                            <div className="w-2/3 p-20 flex flex-col justify-center bg-white">
                                <h2 className="text-7xl font-bold text-slate-900 leading-tight mb-12">{stripMarkdown(slide.quote)}</h2>
                                <p className="text-4xl text-slate-500 font-medium">— {stripMarkdown(slide.cite)}</p>
                            </div>
                        </div>
                    );
                } else if (quoteVariant === 'bold') {
                    return (
                        <div className="h-full w-full p-16 flex items-center justify-center text-center relative overflow-hidden bg-white">
                            <div className="border-[20px] w-full h-full flex flex-col items-center justify-center p-20" style={{ borderColor: colors.dark }}>
                                <h2 className="text-[80px] font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-16">{stripMarkdown(slide.quote)}</h2>
                                <span className="bg-slate-900 text-white text-3xl font-bold px-6 py-2 uppercase">{stripMarkdown(slide.cite)}</span>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative">
                        <DotsPattern opacity={0.02} />
                        <div className="text-[250px] leading-none mb-[-80px] text-slate-200 font-serif relative z-10">"</div>
                        <h2 className="text-7xl font-medium italic text-slate-800 leading-tight mb-12 relative z-10">{stripMarkdown(slide.quote)}</h2>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-24 h-2" style={{ background: colors.primary }}></div>
                            <span className="text-4xl font-bold text-slate-500 uppercase tracking-widest">{stripMarkdown(slide.cite)}</span>
                        </div>
                    </div>
                );

            case 'testimonial':
                return (
                    <div className="h-full w-full p-24 flex flex-col justify-center relative" style={{ background: colors.dark }}>
                        <FloatingCircles />
                        <div className="relative z-10">
                            <div className="text-[180px] leading-none mb-[-60px] font-serif" style={{ color: `${colors.primary}40` }}>"</div>
                            <h2 className="text-6xl font-medium italic text-white leading-tight mb-16">{stripMarkdown(slide.quote)}</h2>
                            <div className="flex items-center gap-8">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white overflow-hidden shadow-xl" style={{ background: colors.primary }}>
                                    {slide.image ? (
                                        <img src={slide.image} className="w-full h-full object-cover" alt="avatar" />
                                    ) : (
                                        (slide.name || 'A')[0]
                                    )}
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-white">{stripMarkdown(slide.name)}</p>
                                    <p className="text-3xl text-slate-400">{stripMarkdown(slide.role)}{slide.company ? `, ${stripMarkdown(slide.company)}` : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'summary':
                const sumVariant = slide.variant || 'classic';

                if (sumVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-white p-24 flex flex-col justify-center relative overflow-hidden">
                            <h2 className="text-7xl font-bold text-slate-900 mb-20">{slide.heading}</h2>
                            <div className="flex-1 flex flex-col justify-center space-y-12 pl-8 border-l-4 border-slate-100">
                                {(slide.steps || []).map((s, i) => (
                                    <div key={i} className="text-5xl font-medium text-slate-700 leading-snug">
                                        {stripMarkdown(s)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (sumVariant === 'cards') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col justify-center relative overflow-hidden">
                            <h2 className="text-6xl font-black text-slate-900 mb-16 text-center">{slide.heading}</h2>
                            <div className="flex-1 grid grid-flow-row auto-rows-max gap-8 align-content-center">
                                {(slide.steps || []).map((s, i) => (
                                    <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-8">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ background: colors.secondary }}>{i + 1}</div>
                                        <div className="text-3xl font-bold text-slate-700">{stripMarkdown(s)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                } else if (sumVariant === 'checklist') {
                    return (
                        <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center relative overflow-hidden" style={{ background: colors.dark }}>
                            <h2 className="text-7xl font-black text-white mb-20">{slide.heading}</h2>
                            <div className="flex-1 flex flex-col justify-center space-y-12">
                                {(slide.steps || []).map((s, i) => (
                                    <div key={i} className="flex items-start gap-8">
                                        <div className="text-5xl text-emerald-400 font-bold">✓</div>
                                        <div className="text-5xl font-bold text-white leading-tight">{stripMarkdown(s)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                // Classic
                return (
                    <div className="h-full w-full bg-white p-24 flex flex-col relative overflow-hidden">
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="slide asset" />
                        )}
                        <DotsPattern opacity={0.02} />
                        <h2 className="text-8xl font-black text-slate-900 mb-16 relative z-10">{slide.heading}</h2>
                        <div className="flex-1 flex flex-col justify-center space-y-12 relative z-10">
                            {(slide.steps || []).map((s, i) => (
                                <div key={i} className="p-10 rounded-3xl border-4 border-slate-50 flex items-center gap-10 shadow-sm" style={{ background: `${colors.primary}05` }}>
                                    <div className="text-6xl font-bold" style={{ color: colors.primary }}>0{i + 1}</div>
                                    <div className="text-5xl font-bold text-slate-700 leading-tight">{stripMarkdown(s)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'cta':
                const ctaVariant = slide.variant || 'classic';
                if (ctaVariant === 'minimal') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center text-center relative">
                            {slide.image && (
                                <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-10" alt="bg" />
                            )}
                            <div className="w-24 h-24 mb-10 rounded-full flex items-center justify-center bg-white shadow-xl text-4xl">👋</div>
                            <h2 className="text-7xl font-bold text-slate-900 mb-8">{slide.title}</h2>
                            <p className="text-4xl text-slate-500 mb-16 max-w-2xl">{slide.subtitle}</p>
                            <button className="text-4xl px-16 py-6 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95" style={{ background: colors.primary }}>{slide.button}</button>
                            <div className="mt-16 text-3xl font-bold text-slate-400">@{slide.handle}</div>
                        </div>
                    );
                } else if (ctaVariant === 'split') {
                    return (
                        <div className="h-full w-full bg-white flex relative overflow-hidden">
                            <div className="w-1/2 h-full flex items-center justify-center relative overflow-hidden" style={{ background: colors.primary }}>
                                {slide.image ? (
                                    <img src={slide.image} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" alt="bg" />
                                ) : (
                                    <div className="text-[200px] opacity-20 text-white">➜</div>
                                )}
                            </div>
                            <div className="flex-1 p-16 flex flex-col justify-center">
                                <h2 className="text-7xl font-bold text-slate-900 mb-10">{slide.title}</h2>
                                <p className="text-4xl text-slate-500 mb-16">{slide.subtitle}</p>
                                <button className="text-3xl px-12 py-5 rounded-full font-bold text-white shadow-lg self-start" style={{ background: colors.dark }}>{slide.button}</button>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'social') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="bg-white p-24 rounded-[60px] shadow-2xl w-full max-w-4xl relative overflow-hidden">
                                <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-12 overflow-hidden border-4 border-white shadow-lg">
                                    <img src={userProfileImage} className="w-full h-full object-cover" alt="profile" />
                                </div>
                                <h2 className="text-6xl font-bold text-slate-900 mb-6">{slide.handle}</h2>
                                <p className="text-4xl text-slate-500 mb-12">Follow for more daily insights!</p>
                                <div className="flex gap-4 justify-center">
                                    {['Like', 'Comment', 'Share'].map(action => (
                                        <div key={action} className="px-8 py-4 bg-slate-100 rounded-xl text-2xl font-bold text-slate-600 border border-slate-200">{action}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'card') {
                    return (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center p-24 relative overflow-hidden">
                            <div className="bg-slate-900 w-full h-full rounded-[60px] p-24 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{ background: getGradientCSS() }}></div>
                                <h2 className="text-8xl font-black mb-12 relative z-10">{slide.title}</h2>
                                <div className="w-full h-1 bg-white/20 mb-12"></div>
                                <p className="text-4xl text-slate-300 mb-16 max-w-3xl">{slide.subtitle}</p>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'photo') {
                    return (
                        <div className="h-full w-full flex flex-col justify-end p-24 relative overflow-hidden bg-slate-900">
                            {slide.image && <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="bg" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            <div className="relative z-10 text-center">
                                <p className="text-4xl font-bold text-blue-400 mb-8 uppercase tracking-widest">Done?</p>
                                <h2 className="text-8xl font-black text-white leading-tight mb-16">{slide.title}</h2>
                                <button className="bg-white text-slate-900 text-4xl font-bold py-6 px-16 rounded-full">{slide.button}</button>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'bold') {
                    return (
                        <div className="h-full w-full bg-white p-12 flex relative overflow-hidden">
                            <div className="w-full h-full border-8 border-slate-900 p-20 flex flex-col justify-between" style={{ borderColor: colors.dark }}>
                                <h2 className="text-[120px] font-black text-slate-900 leading-[0.85] tracking-tighter uppercase">{slide.title}</h2>
                                <div className="flex justify-between items-end border-t-8 border-slate-900 pt-12">
                                    <p className="text-4xl font-bold text-slate-900">{slide.handle}</p>
                                    <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-5xl">➜</div>
                                </div>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'gradient') {
                    return (
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-24 relative overflow-hidden" style={{ background: getGradientCSS() }}>
                            <div className="bg-white/20 backdrop-blur-md p-20 rounded-[4rem] border border-white/30 text-white">
                                <h2 className="text-8xl font-bold mb-10">{slide.title}</h2>
                                <p className="text-4xl font-medium opacity-90 mb-16">{slide.subtitle}</p>
                                <button className="bg-white text-slate-900 text-4xl font-bold py-6 px-16 rounded-xl shadow-lg">{slide.button}</button>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'chat') {
                    return (
                        <div className="h-full w-full bg-slate-50 p-24 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="w-full max-w-3xl space-y-8">
                                <div className="bg-white p-8 rounded-2xl rounded-tl-none shadow-sm self-start mr-auto border border-slate-100">
                                    <p className="text-3xl text-slate-600">Did you find this helpful?</p>
                                </div>
                                <div className="bg-blue-600 p-8 rounded-2xl rounded-tr-none shadow-md self-end ml-auto text-white text-right" style={{ background: colors.primary }}>
                                    <p className="text-3xl font-medium">Yes! What should I do next?</p>
                                </div>
                                <div className="bg-white p-12 rounded-2xl rounded-tl-none shadow-lg border border-slate-100 text-center mt-8">
                                    <h2 className="text-5xl font-bold text-slate-900 mb-6">{slide.title}</h2>
                                    <p className="text-3xl text-slate-500 mb-10">{slide.subtitle}</p>
                                    <button className="bg-slate-900 text-white text-2xl font-bold py-4 px-12 rounded-full">{slide.button}</button>
                                </div>
                            </div>
                        </div>
                    );
                } else if (ctaVariant === 'buttons') {
                    return (
                        <div className="h-full w-full bg-slate-900 p-24 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <h2 className="text-7xl font-bold text-white mb-20">{slide.title}</h2>
                            <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                                <div className="bg-slate-800 p-10 rounded-2xl flex items-center justify-center gap-4 text-white text-3xl font-bold border border-slate-700">❤️ Like</div>
                                <div className="bg-slate-800 p-10 rounded-2xl flex items-center justify-center gap-4 text-white text-3xl font-bold border border-slate-700">💬 Comment</div>
                                <div className="bg-slate-800 p-10 rounded-2xl flex items-center justify-center gap-4 text-white text-3xl font-bold border border-slate-700">♻️ Repost</div>
                                <div className="bg-white text-slate-900 p-10 rounded-2xl flex items-center justify-center gap-4 text-3xl font-bold border border-white">➕ Follow</div>
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="h-full w-full flex flex-col items-center justify-center text-center text-white relative overflow-hidden" style={{ background: colors.dark }}>
                        <div className="absolute inset-0 opacity-40 z-0" style={{ background: getGradientCSS(), opacity: 0.3 }}></div>
                        {slide.image && (
                            <img src={slide.image} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="slide asset" />
                        )}
                        <TemplateDecorations />
                        <div className="relative z-10">
                            <h2
                                className={`${getHeadingWeight()} leading-tight mb-10`}
                                style={{ fontSize: slide.title?.length > 40 ? '75px' : slide.title?.length > 20 ? '90px' : '110px' }}
                            >
                                {slide.title}
                            </h2>
                            <p className="text-5xl text-slate-300 max-w-4xl mx-auto mb-16">{slide.subtitle}</p>
                            <button className="text-5xl px-20 py-8 rounded-full font-bold text-white mb-16 transition-transform active:scale-95 shadow-2xl" style={{ background: colors.primary }}>{slide.button}</button>
                            <div className="text-4xl font-medium text-slate-400">{slide.handle}</div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6 font-['Inter']">
            <div className="max-w-[1700px] mx-auto">
                {/* Header: Title + Action Buttons */}
                <header className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Carousel Designer</h1>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={generateFromAI}
                            disabled={isGenerating}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                            <Sparkles size={16} />
                            {isGenerating ? 'Generating...' : 'Generate AI'}
                        </button>
                        <button
                            onClick={shuffleDesign}
                            disabled={isGenerating}
                            className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                            <Palette size={16} />
                            Shuffle
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                        <button
                            onClick={downloadAll}
                            disabled={isGenerating}
                            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20 disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                            <Download size={16} />
                            PDF
                        </button>
                        <button
                            onClick={async () => {
                                setIsExporting(true);
                                const zip = new JSZip();
                                try {
                                    toast.info('Generating images for Instagram...');
                                    for (let i = 0; i < slides.length; i++) {
                                        const element = document.getElementById(`slide-content-${i}`);
                                        if (element) {
                                            const dataUrl = await toJpeg(element, {
                                                width: 1080,
                                                height: 1080,
                                                pixelRatio: 1.5,
                                                quality: 0.95,
                                                skipFonts: true
                                            });
                                            const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                                            zip.file(`slide-${i + 1}.jpg`, base64Data, { base64: true });
                                        }
                                    }
                                    const content = await zip.generateAsync({ type: "blob" });
                                    saveAs(content, "instagram-carousel.zip");
                                    toast.success('ZIP downloaded successfully!');
                                } catch (e) {
                                    console.error(e);
                                    toast.error('Failed to generate ZIP');
                                } finally {
                                    setIsExporting(false);
                                }
                            }}
                            disabled={isGenerating}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-purple-600/20 disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                            <Download size={16} />
                            Instagram Zip
                        </button>
                    </div>
                </header>

                {/* Main Content: Carousel + Sidebar */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Carousel Viewport */}
                    <div className="flex-1 overflow-hidden order-2 lg:order-1 w-full bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-10" id="carousel-viewport">
                        <div
                            className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
                            onScroll={(e) => {
                                const container = e.target;
                                const scrollLeft = container.scrollLeft;
                                const maxScroll = container.scrollWidth - container.offsetWidth;
                                if (maxScroll <= 0) return;

                                const scrollPercentage = scrollLeft / maxScroll;
                                const newIndex = Math.round(scrollPercentage * (slides.length - 1));

                                if (newIndex !== activeSlideIndex && newIndex >= 0 && newIndex < slides.length) {
                                    setActiveSlideIndex(newIndex);
                                }
                            }}
                        >
                            {slides.map((slide, i) => (
                                <Slide
                                    key={i}
                                    id={`slide-${i}`}
                                    className="bg-white"
                                    onDelete={() => removeSlide(i)}
                                    onRemoveImage={slide.image ? () => removeImageFromSlide(i) : undefined}
                                    onCycleLayout={SLIDE_VARIANTS[slide.type] ? () => cycleSlideVariant(i) : undefined}
                                >
                                    <div id={`slide-content-${i}`} className="w-[1200px] h-[1500px] relative overflow-hidden">
                                        {renderSlideContent(slide, i)}
                                    </div>
                                </Slide>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[400px] order-1 lg:order-2 shrink-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 custom-scrollbar space-y-5 no-export">
                        {/* Topic Input Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Topic / Content</label>
                            <textarea
                                placeholder="Enter a topic or paste content for AI to generate slides..."
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-medium resize-none text-sm"
                                value={topic}
                                rows="4"
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>

                        {/* Image Assets Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-emerald-600">
                                <ImageIcon size={18} />
                                Image Assets
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed mb-4">
                                Upload images to use in your slides. Click an image to apply it to the current slide.
                            </p>

                            <div
                                className={`grid grid-cols-4 gap-2 mb-4 p-2 rounded-xl transition-all ${isDragging ? 'bg-emerald-50/50 ring-2 ring-emerald-200 ring-dashed' : ''}`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                {userImages.map((img) => (
                                    <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-50 transition-all hover:ring-2 hover:ring-emerald-500">
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover cursor-pointer"
                                            onClick={() => applyImageToSlide(img.url, activeSlideIndex)}
                                            title="Click to apply to active slide"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 pointer-events-none">
                                            <span className="text-[8px] font-bold text-white uppercase">Apply</span>
                                        </div>
                                        <button
                                            onClick={() => setUserProfileImage(img.url)}
                                            className="absolute bottom-1 left-1 bg-white/90 text-emerald-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                            title="Set as profile picture"
                                        >
                                            <ImageIcon size={10} />
                                        </button>
                                        <button
                                            onClick={() => setUserImages(prev => prev.filter(i => i.id !== img.id))}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                                <label
                                    className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${isDragging
                                        ? 'border-emerald-500 bg-emerald-50 scale-105'
                                        : 'border-slate-200 text-slate-400 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600'
                                        }`}
                                >
                                    <Upload size={20} className="transition-transform group-hover:scale-110" />
                                    <span className="text-[10px] font-bold mt-1">Upload</span>
                                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                                </label>
                            </div>

                            <div className="flex gap-2 mb-2">
                                {userImages.length > 0 && (
                                    <button
                                        onClick={autoDistributeImages}
                                        className="flex-1 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Sparkles size={12} />
                                        Auto-Distribute
                                    </button>
                                )}
                                {userProfileImage !== '/profile.png' && (
                                    <button
                                        onClick={() => setUserProfileImage('/profile.png')}
                                        className="py-2 px-3 rounded-xl bg-slate-50 text-slate-600 text-[10px] font-bold hover:bg-slate-100 transition-colors"
                                    >
                                        Reset Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Smart Carousel Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-600">
                                <Sparkles size={18} />
                                Smart Carousel
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed mb-4">
                                AI generates unique color palettes, layouts, and styles for your topic.
                            </p>
                            <div className="flex gap-2 mb-4">
                                {[colors.primary, colors.secondary, colors.accent].map((c, i) => (
                                    <div key={i} className="w-8 h-8 rounded-lg border-2 border-white shadow-md" style={{ background: c }}></div>
                                ))}
                                <div className="flex-1 h-8 rounded-lg border-2 border-white shadow-md" style={{ background: getGradientCSS() }}></div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mood</label>
                                <select
                                    value={palette.mood || 'corporate'}
                                    onChange={(e) => setPalette({ ...palette, mood: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm"
                                >
                                    <option value="corporate">Corporate</option>
                                    <option value="creative">Creative</option>
                                    <option value="minimal">Minimal</option>
                                    <option value="bold">Bold</option>
                                    <option value="playful">Playful</option>
                                    <option value="elegant">Elegant</option>
                                    <option value="tech">Tech</option>
                                </select>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                            </svg>
                                            Google Search*
                                        </span>
                                        <span className="text-[10px] text-slate-400 mt-0.5 font-medium uppercase tracking-tight">Grounding for accuracy</span>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={useSearch}
                                            onChange={(e) => setUseSearch(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Theme Selector Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-purple-600">
                                <Grid3X3 size={18} />
                                Template Gallery
                            </h3>
                            <p className="text-slate-500 text-xs leading-relaxed mb-3">
                                {TEMPLATES.length} unique visual templates with distinct designs and effects.
                            </p>

                            <label className="flex items-center justify-between cursor-pointer group mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-700">Keep Generated Colors</span>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={useGeneratedPalette}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setUseGeneratedPalette(isChecked);
                                            if (isChecked) {
                                                setPalette(prev => ({
                                                    ...prev,
                                                    primary: savedPalette.primary,
                                                    secondary: savedPalette.secondary,
                                                    accent: savedPalette.accent,
                                                    dark: savedPalette.dark,
                                                    light: savedPalette.light,
                                                    gradient: savedPalette.gradient
                                                }));
                                            } else {
                                                if (palette.templateId) {
                                                    const t = TEMPLATES.find(temp => temp.id === palette.templateId);
                                                    if (t) {
                                                        setPalette(prev => ({
                                                            ...prev,
                                                            primary: t.primary,
                                                            secondary: t.secondary,
                                                            accent: t.accent,
                                                            dark: t.dark,
                                                            light: t.light,
                                                            gradient: t.gradient
                                                        }));
                                                        setThemeColor(t.primary);
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                                </div>
                            </label>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {getTemplateCategories().map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setPalette(prev => ({ ...prev, filterCategory: cat }))}
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${(palette.filterCategory || 'All') === cat
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Template Grid */}
                            <div className="max-h-80 overflow-y-auto space-y-2 px-1 pr-1.5 custom-scrollbar">
                                {TEMPLATES
                                    .filter(t => !palette.filterCategory || palette.filterCategory === 'All' || t.category === palette.filterCategory)
                                    .map((t, i) => (
                                        <button
                                            key={t.id}
                                            onClick={() => {
                                                if (useGeneratedPalette) {
                                                    setPalette(prev => ({
                                                        ...prev,
                                                        ...t,
                                                        primary: prev.primary,
                                                        secondary: prev.secondary,
                                                        accent: prev.accent,
                                                        dark: prev.dark,
                                                        light: prev.light,
                                                        gradient: prev.gradient,
                                                        templateId: t.id,
                                                        name: t.name,
                                                        filterCategory: palette.filterCategory
                                                    }));
                                                } else {
                                                    setPalette({
                                                        ...t,
                                                        templateId: t.id,
                                                        name: t.name,
                                                        filterCategory: palette.filterCategory
                                                    });
                                                    setThemeColor(t.primary);
                                                }
                                                toast.success(`Template: ${t.name}`);
                                            }}
                                            className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:scale-[1.01] ${palette.templateId === t.id
                                                ? 'border-2 border-purple-500 bg-purple-50'
                                                : 'hover:bg-slate-50 border-2 border-slate-100'
                                                }`}
                                        >
                                            {/* Template Preview */}
                                            <div
                                                className="w-12 h-12 rounded-lg shrink-0 shadow-md relative overflow-hidden"
                                                style={{ background: t.dark }}
                                            >
                                                <div
                                                    className="absolute inset-0 opacity-60"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${t.gradient.from}, ${t.gradient.to})`
                                                    }}
                                                />
                                                {/* Mini decoration preview */}
                                                {t.decorationType === 'comic-halftone' && (
                                                    <div className="absolute bottom-1 right-1 text-[8px] font-black" style={{ color: t.primary }}>POW!</div>
                                                )}
                                                {t.decorationType === 'neon-grid' && (
                                                    <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(${t.primary} 1px, transparent 1px), linear-gradient(90deg, ${t.primary} 1px, transparent 1px)`, backgroundSize: '8px 8px' }} />
                                                )}
                                                {t.decorationType === 'matrix-rain' && (
                                                    <div className="absolute top-1 left-1 text-[6px] font-mono" style={{ color: t.primary }}>010</div>
                                                )}
                                                {t.decorationType === 'stars' && (
                                                    <>
                                                        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white" />
                                                        <div className="absolute top-4 right-3 w-0.5 h-0.5 rounded-full bg-white" />
                                                        <div className="absolute bottom-3 left-4 w-0.5 h-0.5 rounded-full bg-white" />
                                                    </>
                                                )}
                                                {t.decorationType === 'sakura-petals' && (
                                                    <div className="absolute top-2 right-2 w-2 h-2 rotate-45" style={{ background: t.primary, borderRadius: '50% 0 50% 50%' }} />
                                                )}
                                                {t.decorationType === 'hero-rays' && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: t.accent }} />
                                                )}
                                                {t.decorationType === 'vaporwave-grid' && (
                                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full opacity-50" style={{ background: `linear-gradient(${t.primary}, ${t.secondary})` }} />
                                                )}
                                            </div>

                                            {/* Template Info */}
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-slate-800 truncate">{t.name}</span>
                                                </div>
                                                <span className="text-[10px] font-medium text-purple-500 bg-purple-50 px-1.5 py-0.5 rounded-full">{t.category}</span>
                                                <div className="flex gap-1 mt-1.5">
                                                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: t.primary }} />
                                                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: t.secondary }} />
                                                    <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: t.accent }} />
                                                </div>
                                            </div>

                                            {/* Selected Indicator */}
                                            {palette.templateId === t.id && (
                                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Design Customization Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-rose-500">
                                <Settings2 size={18} />
                                Customize Design
                            </h3>

                            <div className="space-y-6">
                                {/* Font Selection */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block font-['Inter']">Heading Font Style</label>
                                    <div className="relative">
                                        <select
                                            value={palette.headingStyle || currentTemplate?.headingStyle || 'font-extrabold tracking-tight'}
                                            onChange={(e) => setPalette(prev => ({ ...prev, headingStyle: e.target.value }))}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer text-sm"
                                        >
                                            {FONT_OPTIONS.map(font => (
                                                <option key={font.value} value={font.value}>{font.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Color Palette Customizer */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block font-['Inter']">Color Palette</label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[
                                            { label: 'Prime', key: 'primary' },
                                            { label: 'Sec', key: 'secondary' },
                                            { label: 'Acc', key: 'accent' },
                                            { label: 'Dark', key: 'dark' },
                                            { label: 'Light', key: 'light' }
                                        ].map((color) => (
                                            <div key={color.key} className="flex flex-col items-center gap-1">
                                                <div
                                                    className="w-full aspect-square rounded-lg border-2 border-slate-100 relative overflow-hidden group shadow-sm"
                                                    style={{ background: palette[color.key] || colors[color.key] }}
                                                >
                                                    <input
                                                        type="color"
                                                        value={palette[color.key] || colors[color.key]}
                                                        onChange={(e) => {
                                                            const newColor = e.target.value;
                                                            setPalette(prev => {
                                                                const updated = { ...prev, [color.key]: newColor };
                                                                // Update gradient if primary or secondary changes
                                                                if (color.key === 'primary' || color.key === 'secondary') {
                                                                    updated.gradient = {
                                                                        ...prev.gradient,
                                                                        from: color.key === 'primary' ? newColor : (prev.primary || colors.primary),
                                                                        to: color.key === 'secondary' ? newColor : (prev.secondary || colors.secondary)
                                                                    };
                                                                }
                                                                return updated;
                                                            });
                                                            setSavedPalette(prev => ({ ...prev, [color.key]: newColor }));
                                                            if (color.key === 'primary') setThemeColor(newColor);
                                                        }}
                                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-[2]"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                                                        <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{color.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Post Title Card */}
                        {
                            postTitle && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-lg text-slate-900">Post Title</h3>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(postTitle);
                                                toast.success('Post title copied!');
                                            }}
                                            className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
                                            title="Copy to clipboard"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-line text-sm">{postTitle}</p>
                                </div>
                            )
                        }

                        {/* Caption Card */}
                        {
                            caption && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-lg text-slate-900">Caption</h3>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(caption);
                                                toast.success('Caption copied!');
                                            }}
                                            className="p-2 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600"
                                            title="Copy to clipboard"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <p className="text-slate-500 whitespace-pre-line text-xs leading-relaxed">{caption}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div >
        </div >
    );
}
