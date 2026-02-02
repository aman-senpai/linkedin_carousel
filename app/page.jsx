'use client';

import { useState, useEffect } from 'react';
import Slide from '@/components/Slide';
import { Download, Sparkles, Palette } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

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

const PREDEFINED_PALETTES = [
  {
    name: 'Corporate Blue',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    dark: '#0f172a',
    light: '#f8fafc',
    gradient: { from: '#3b82f6', to: '#1e40af', direction: 'to-br' },
    template: 'modern'
  },
  {
    name: 'Sunset Vibes',
    primary: '#f43f5e',
    secondary: '#8b5cf6',
    accent: '#fbbf24',
    dark: '#4c0519',
    light: '#fff1f2',
    gradient: { from: '#f43f5e', to: '#8b5cf6', direction: 'to-bl' },
    template: 'geometric'
  },
  {
    name: 'Forest Fresh',
    primary: '#10b981',
    secondary: '#064e3b',
    accent: '#34d399',
    dark: '#022c22',
    light: '#ecfdf5',
    gradient: { from: '#10b981', to: '#064e3b', direction: 'to-b' },
    template: 'minimal'
  },
  {
    name: 'Deep Purple',
    primary: '#8b5cf6',
    secondary: '#4c1d95',
    accent: '#c084fc',
    dark: '#2e1065',
    light: '#f5f3ff',
    gradient: { from: '#8b5cf6', to: '#4c1d95', direction: 'to-tr' },
    template: 'bold'
  },
  {
    name: 'Dark Mode',
    primary: '#38bdf8',
    secondary: '#0ea5e9',
    accent: '#7dd3fc',
    dark: '#000000',
    light: '#1e293b',
    gradient: { from: '#0ea5e9', to: '#38bdf8', direction: 'to-r' },
    template: 'minimal'
  },
  {
    name: 'Berry Blast',
    primary: '#ec4899',
    secondary: '#be185d',
    accent: '#fbcfe8',
    dark: '#831843',
    light: '#fdf2f8',
    gradient: { from: '#ec4899', to: '#be185d', direction: 'to-br' },
    template: 'modern'
  }
];

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

  // Derived colors from palette for convenience
  const colors = {
    primary: palette.primary || themeColor,
    secondary: palette.secondary || themeColor,
    accent: palette.accent || themeColor,
    dark: palette.dark || '#0f172a',
    light: palette.light || '#f8fafc',
    gradient: palette.gradient || { from: themeColor, to: themeColor, direction: 'to-br' }
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
        caption
      };
      localStorage.setItem('linkedin_carousel_data', JSON.stringify(dataToSave));
    }
  }, [slides, palette, themeColor, topic, postTitle, caption]);

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
            body: JSON.stringify({ topic })
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
    const randomPalette = PREDEFINED_PALETTES[Math.floor(Math.random() * PREDEFINED_PALETTES.length)];
    setPalette(randomPalette);
    setThemeColor(randomPalette.primary);
    toast.success(`Theme switched to ${randomPalette.name}`);
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

  // Template decorations
  const TemplateDecorations = () => {
    switch(palette.template) {
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
        return null;
    }
  };

  // Helper to get text weight based on template
  const getHeadingWeight = () => {
    if (palette.template === 'bold') return 'font-black uppercase tracking-tighter';
    if (palette.template === 'minimal') return 'font-light tracking-widest';
    return 'font-extrabold tracking-tight';
  };

  const renderSlideContent = (slide, index) => {
    switch(slide.type) {
        case 'cover':
            const coverVariant = slide.variant || 'centered';
            const headingClass = getHeadingWeight();
            if (coverVariant === 'split') {
              return (
                <div className="h-full w-full flex text-white relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute inset-0" style={{ background: getGradientCSS(), opacity: 0.3 }}></div>
                    <TemplateDecorations />
                    <div className="w-1/3 flex flex-col justify-center items-center relative z-10" style={{ background: colors.primary }}>
                      <span className="text-2xl font-bold tracking-[0.3em] writing-vertical-lr transform rotate-180" style={{ writingMode: 'vertical-rl' }}>{slide.tagline}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-20 relative z-10">
                        <h2 className={`text-[90px] ${headingClass} leading-[0.95] mb-8`}>{slide.title}</h2>
                        <p className="text-5xl font-light text-slate-300 max-w-3xl mb-16">{slide.subtitle}</p>
                        <div className="flex items-center gap-6">
                            <img src="/profile.png" className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                            <span className="text-3xl font-medium">{slide.author}</span>
                        </div>
                    </div>
                </div>
              );
            } else if (coverVariant === 'minimal') {
              return (
                <div className="h-full w-full flex flex-col justify-end p-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
                    <TemplateDecorations />
                    <div className="relative z-10">
                        <span className="text-2xl font-bold tracking-[0.2em] mb-4 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                        <h2 className={`text-[80px] ${headingClass} leading-[1] mb-6`}>{slide.title}</h2>
                        <p className="text-4xl font-light text-slate-400 max-w-4xl mb-16">{slide.subtitle}</p>
                        <div className="flex items-center gap-6">
                            <img src="/profile.png" className="w-16 h-16 rounded-full border-2 border-white/20" alt="profile" />
                            <span className="text-2xl font-medium text-slate-300">{slide.author}</span>
                        </div>
                    </div>
                </div>
              );
            }
            return (
                <div className="h-full w-full flex flex-col justify-center px-24 text-white relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute inset-0 opacity-40" style={{ 
                        backgroundImage: `radial-gradient(at 0% 0%, ${colors.primary} 0, transparent 50%), radial-gradient(at 100% 0%, ${colors.secondary} 0, transparent 50%)`
                    }}></div>
                    <DotsPattern opacity={0.05} />
                    <TemplateDecorations />
                    <div className="relative z-10">
                        <span className="text-3xl font-bold tracking-[0.2em] mb-6 block" style={{ color: colors.primary }}>{slide.tagline}</span>
                        <h2 className={`text-[100px] ${headingClass} leading-[0.95] mb-10`}>{slide.title}</h2>
                        <p className="text-6xl font-light text-slate-300 max-w-4xl mx-auto">{slide.subtitle}</p>
                        <div className="mt-20 flex items-center gap-6 justify-center">
                            <img src="/profile.png" className="w-20 h-20 rounded-full border-4 border-white/20" alt="profile" />
                            <span className="text-3xl font-medium">{slide.author}</span>
                        </div>
                    </div>
                </div>
            );

        case 'intro':
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col justify-between relative">
                    <DotsPattern opacity={0.03} />
                    <TemplateDecorations />
                    <div className="flex-1 flex flex-col justify-center relative z-10">
                        <div className="w-24 h-3 mb-10" style={{ background: colors.primary }}></div>
                        <h2 className={`text-8xl ${getHeadingWeight()} text-slate-900 mb-10 leading-tight`}>{stripMarkdown(slide.heading)}</h2>
                        <p className="text-5xl text-slate-600 leading-relaxed max-w-5xl">{stripMarkdown(slide.text)}</p>
                    </div>
                    <div className="flex items-center gap-10 p-12 rounded-3xl shrink-0 relative z-10" style={{ background: `${colors.primary}15` }}>
                        <span className="text-[120px] font-black leading-none" style={{ color: colors.primary }}>{slide.stat}</span>
                        <p className="text-4xl font-medium text-slate-700">{stripMarkdown(slide.statDesc)}</p>
                    </div>
                </div>
            );

        case 'highlight':
            return (
                <div className="h-full w-full flex flex-col justify-center items-center text-center p-24 relative overflow-hidden" style={{ background: getGradientCSS() }}>
                    <TemplateDecorations />
                    <div className="relative z-10">
                        <h2 className={`text-[80px] ${getHeadingWeight()} text-white leading-tight mb-12 max-w-5xl mx-auto`}>{stripMarkdown(slide.message)}</h2>
                        {slide.accent && <p className="text-4xl text-white/80 font-medium">{stripMarkdown(slide.accent)}</p>}
                    </div>
                </div>
            );

        case 'infographic':
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative">
                    <DotsPattern opacity={0.02} />
                    <TemplateDecorations />
                    <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-16 relative z-10`}>{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-16 relative z-10">
                        {(slide.points || []).map((p, i) => (
                            <div key={i} className="flex gap-12 items-start">
                                <div className="text-6xl font-bold w-32 h-32 rounded-2xl flex items-center justify-center text-white shrink-0" style={{ background: colors.primary }}>{i+1}</div>
                                <div>
                                    <h3 className="text-5xl font-bold text-slate-800 mb-4">{stripMarkdown(p.t)}</h3>
                                    <p className="text-4xl text-slate-500 leading-snug">{stripMarkdown(p.d)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'list-icons':
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative">
                    <TemplateDecorations />
                    <h2 className={`text-7xl ${getHeadingWeight()} text-slate-900 mb-16`}>{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-10">
                        {(slide.items || []).map((item, i) => (
                            <div key={i} className="flex gap-8 items-center p-8 rounded-2xl" style={{ background: `${colors.primary}08` }}>
                                <span className="text-6xl">{item.icon || '→'}</span>
                                <span className="text-4xl font-medium text-slate-700">{stripMarkdown(item.text)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'process-flow':
            return (
                <div className="h-full w-full bg-slate-50 p-24 flex flex-col relative">
                    <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2" style={{ background: `${colors.primary}30` }}></div>
                            {(slide.steps || []).map((step, i) => (
                                <div key={i} className="flex flex-col items-center relative z-10">
                                    <div className="w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-lg" style={{ background: colors.primary }}>
                                        {i + 1}
                                    </div>
                                    <p className="text-3xl font-bold text-slate-700 text-center max-w-[200px]">{stripMarkdown(step)}</p>
                                </div>
                            ))}
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
            const isHorizontal = slide.style === 'horizontal';
            if (isHorizontal) {
              return (
                <div className="h-full w-full bg-white p-24 flex flex-col">
                    <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-10">
                        {(slide.chartData || []).map((v, i) => (
                            <div key={i} className="flex items-center gap-8">
                                <div className="w-48 text-3xl font-bold text-slate-700 text-right shrink-0">{slide.labels[i]}</div>
                                <div className="flex-1 h-16 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${v}%`, background: colors.primary }}></div>
                                </div>
                                <div className="text-3xl font-bold w-24" style={{ color: colors.primary }}>{v}%</div>
                            </div>
                        ))}
                    </div>
                </div>
              );
            }
            return (
                <div className="h-full w-full bg-white p-24 pb-32 flex flex-col">
                    <h2 className="text-7xl font-black text-slate-900 mb-16">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 flex items-end justify-between gap-12 px-10 border-b-8 border-slate-100">
                            {(slide.chartData || []).map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-8">
                                    <div className="text-4xl font-bold text-slate-400">{v}%</div>
                                    <div className="w-full rounded-t-2xl transition-all duration-1000" style={{ height: `${v * 7}px`, background: colors.primary }}></div>
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
            return (
                <div className="h-full w-full p-24 flex flex-col justify-center items-center text-center relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute inset-0" style={{ background: getGradientCSS(), opacity: 0.2 }}></div>
                    <TemplateDecorations />
                    <div className="relative z-10">
                        <div className={`text-[280px] ${getHeadingWeight()} mb-16 leading-none`} style={{ color: colors.primary }}>{slide.number}</div>
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
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12"/>
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke={colors.primary} strokeWidth="12" strokeDasharray={dashArray} strokeDashoffset={dashOffset}/>
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
                            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.primary }}>
                                {(slide.name || 'A')[0]}
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
            return (
                <div className="h-full w-full bg-white p-24 flex flex-col relative">
                    <DotsPattern opacity={0.02} />
                    <h2 className="text-8xl font-black text-slate-900 mb-16 relative z-10">{slide.heading}</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-12 relative z-10">
                        {(slide.steps || []).map((s, i) => (
                            <div key={i} className="p-10 rounded-3xl border-4 border-slate-50 flex items-center gap-10 shadow-sm" style={{ background: `${colors.primary}05` }}>
                                <div className="text-6xl font-bold" style={{ color: colors.primary }}>0{i+1}</div>
                                <div className="text-5xl font-bold text-slate-700 leading-tight">{stripMarkdown(s)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'cta':
            return (
                <div className="h-full w-full flex flex-col items-center justify-center text-center text-white relative overflow-hidden" style={{ background: colors.dark }}>
                    <div className="absolute inset-0" style={{ background: getGradientCSS(), opacity: 0.3 }}></div>
                    <TemplateDecorations />
                    <div className="relative z-10">
                        <h2 className={`text-[110px] ${getHeadingWeight()} leading-tight mb-10`}>{slide.title}</h2>
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
    <div className="min-h-screen bg-[#f3f4f6] text-slate-900 p-4 md:p-8 font-['Inter']">
       <div className="max-w-7xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">LinkedIn Carousel Designer</h1>
                <p className="text-slate-500 text-lg mt-1">1200 x 1500 px (4:5 Portrait Optimized)</p>
             </div>
             <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <textarea 
                       placeholder="Enter Topic or paste content (any length)..." 
                       className="w-full bg-white border-2 border-slate-200 rounded-xl px-5 py-3 focus:outline-none focus:border-blue-500 transition-all font-medium resize-none min-h-[52px] max-h-40 overflow-y-auto"
                       value={topic}
                       rows="1"
                       onChange={(e) => {
                         setTopic(e.target.value);
                         e.target.style.height = 'auto';
                         e.target.style.height = e.target.scrollHeight + 'px';
                       }}
                    />
                   <Sparkles className="absolute right-4 top-3.5 text-slate-400" size={20} />
                </div>
                <button 
                   onClick={generateFromAI}
                   disabled={isGenerating}
                   className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-600/10 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                   {isGenerating ? 'AI Thinking...' : 'Generate with AI'}
                </button>
                <button 
                   onClick={shuffleDesign}
                   disabled={isGenerating}
                   className="bg-white text-slate-700 border-2 border-slate-200 px-6 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                   <Palette size={20} />
                   Shuffle
                </button>
                <button 
                   onClick={downloadAll}
                   disabled={isGenerating}
                   className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-900/10 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                   {isGenerating ? 'Exporting...' : 'PDF'}
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
                                    height: 1350,
                                    pixelRatio: 1.5,
                                    quality: 0.95,
                                    skipFonts: true
                                });
                                // Remove data:image/jpeg;base64, prefix
                                const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                                zip.file(`slide-${i + 1}.jpg`, base64Data, {base64: true});
                            }
                        }
                        const content = await zip.generateAsync({type: "blob"});
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
                   className="bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/10 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                   <Download size={20} />
                   Images
                </button>
             </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-12">
             <div className="flex-1 overflow-hidden" id="carousel-viewport">
                <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth">
                   {slides.map((slide, i) => (
                      <Slide key={i} id={`slide-${i}`} className="bg-white" onDelete={() => removeSlide(i)}>
                         <div id={`slide-content-${i}`} className="w-[1200px] h-[1500px] relative overflow-hidden">
                            {renderSlideContent(slide, i)}
                         </div>
                      </Slide>
                   ))}
                </div>
             </div>

             <div className="w-full lg:w-96 space-y-8 no-export">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-blue-600">
                        <Sparkles size={20} />
                        Smart Carousel
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Our AI system dynamically generates color palettes, slide layouts, and visual styles tailored to your topic. Each generation is unique!
                    </p>
                    <div className="flex gap-2 mb-4">
                      {[colors.primary, colors.secondary, colors.accent].map((c, i) => (
                        <div key={i} className="w-10 h-10 rounded-lg border-2 border-white shadow-md" style={{ background: c }}></div>
                      ))}
                      <div className="flex-1 h-10 rounded-lg border-2 border-white shadow-md" style={{ background: getGradientCSS() }}></div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mood</label>
                        <select 
                            value={palette.mood || 'corporate'} 
                            onChange={(e) => setPalette({...palette, mood: e.target.value})}
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
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
                </div>

                {postTitle && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                      <h3 className="font-bold text-xl mb-4 text-slate-900">LinkedIn Post Title</h3>
                      <p className="text-slate-600 whitespace-pre-line">{postTitle}</p>
                  </div>
                )}

                {caption && (
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                      <h3 className="font-bold text-xl mb-4 text-slate-900">Caption</h3>
                      <p className="text-slate-600 whitespace-pre-line text-sm">{caption}</p>
                  </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );
}
