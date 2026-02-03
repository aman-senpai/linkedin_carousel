'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Plus, GripVertical } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { toast } from 'sonner';

// Components
import Slide from '@/components/Slide';
import AppHeader from '@/components/AppHeader';
import EditorSidebar from '@/components/EditorSidebar';
import SlideRenderer from '@/components/SlideRenderer';

// Utils & Constants
import { FONT_OPTIONS, defaultPalette, initialSlides, SLIDE_VARIANTS } from '@/lib/constants';
import { stripMarkdown } from '@/lib/utils';
import { TEMPLATES } from '@/lib/templates';

const palettes = [
    { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#f59e0b', dark: '#0f172a', mood: 'Corporate' },
    { primary: '#059669', secondary: '#10b981', accent: '#fbbf24', dark: '#064e3b', mood: 'Nature' },
    { primary: '#e11d48', secondary: '#f43f5e', accent: '#fcd34d', dark: '#4c0519', mood: 'Action' },
    { primary: '#2563eb', secondary: '#3b82f6', accent: '#60a5fa', dark: '#1e3a8a', mood: 'Tech' },
    { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#c4b5fd', dark: '#2e1065', mood: 'Creative' }
];

export default function Home() {
    // State
    const [slides, setSlides] = useState(initialSlides);
    const [palette, setPalette] = useState(palettes[0]);
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [activeFont, setActiveFont] = useState(FONT_OPTIONS[0].value);
    const [postTitle, setPostTitle] = useState('New Carousel');
    const [postCaption, setPostCaption] = useState('Check out this amazing carousel! 🚀');
    const [socialHandle, setSocialHandle] = useState('@aman-senpai');
    const [userImages, setUserImages] = useState([]);
    const [userProfileImage, setUserProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200');
    const [isDragging, setIsDragging] = useState(false);

    const scrollContainerRef = useRef(null);

    // Initial Load
    useEffect(() => {
        const savedData = localStorage.getItem('linkedin_carousel_data');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed.slides) setSlides(parsed.slides);
                if (parsed.palette) setPalette(parsed.palette);
                if (parsed.topic) setTopic(parsed.topic);
                if (parsed.postTitle) setPostTitle(parsed.postTitle);
                if (parsed.postCaption) setPostCaption(parsed.postCaption);
                if (parsed.socialHandle) setSocialHandle(parsed.socialHandle);
                if (parsed.activeFont) setActiveFont(parsed.activeFont);
                if (parsed.userImages) setUserImages(parsed.userImages);
                if (parsed.userProfileImage) setUserProfileImage(parsed.userProfileImage);
            } catch (e) {
                console.error("Failed to load saved data", e);
            }
        }
    }, []);

    // Auto-save
    useEffect(() => {
        const data = {
            slides,
            palette,
            topic,
            postTitle,
            postCaption,
            socialHandle,
            activeFont,
            userImages,
            userProfileImage
        };
        localStorage.setItem('linkedin_carousel_data', JSON.stringify(data));
    }, [slides, palette, topic, postTitle, postCaption, socialHandle, activeFont, userImages, userProfileImage]);

    // Handle Puppeteer communication
    useEffect(() => {
        window.injectCarouselData = (data) => {
            if (data.slides) setSlides(data.slides);
            if (data.palette) setPalette(data.palette);
            if (data.topic) setTopic(data.topic);
            if (data.postTitle) setPostTitle(data.postTitle);
            if (data.postCaption) setPostCaption(data.postCaption);
            if (data.socialHandle) setSocialHandle(data.socialHandle);
            if (data.userImages) setUserImages(data.userImages);
            if (data.userProfileImage) setUserProfileImage(data.userProfileImage);
            return true;
        };
    }, []);

    // Scroll Listener to update active slide index
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const index = Math.round(container.scrollLeft / (container.offsetWidth * 0.85)); // 0.85 matches w-[85vw]
            if (index !== activeSlideIndex) {
                setActiveSlideIndex(index);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeSlideIndex]);

    // Actions
    const handleGenerateWithAI = async () => {
        if (!topic) {
            toast.error("Please enter a topic first!");
            return;
        }

        setIsGenerating(true);
        toast.info("Generating your carousel with AI...");

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });

            if (!response.ok) throw new Error("AI Generation failed");

            const data = await response.json();
            if (data.slides) setSlides(data.slides);
            if (data.palette) setPalette({ ...palette, ...data.palette });
            if (data.postTitle) setPostTitle(data.postTitle);
            if (data.postCaption) setPostCaption(data.postCaption);

            toast.success("Carousel generated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate carousel. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShuffleDesign = () => {
        const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
        const randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
        const randomFont = FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)].value;

        setPalette({
            ...palette,
            ...randomPalette,
            templateId: randomTemplate.id,
            template: randomTemplate.decorationType
        });
        setActiveFont(randomFont);
        toast.success("Design shuffled! ✨");
    };

    const handleGeneratePalette = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, mode: 'palette_only' }),
            });
            const data = await response.json();
            if (data.palette) setPalette({ ...palette, ...data.palette });
            toast.success("New palette generated!");
        } catch (e) {
            toast.error("Failed to generate palette");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImages(prev => [...prev, { id: Date.now() + Math.random(), data: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleProfileImageUpload = (e) => {
        if (e.target._directData) {
            setUserProfileImage(e.target._directData);
            toast.success("Profile image updated!");
            return;
        }
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserProfileImage(reader.result);
                toast.success("Profile image updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (id) => {
        setUserImages(prev => prev.filter(img => img.id !== id));
    };

    const applyImageToSlide = (imageData, slideIdx = activeSlideIndex) => {
        const newSlides = [...slides];
        newSlides[slideIdx] = { ...newSlides[slideIdx], image: imageData };
        setSlides(newSlides);
        toast.success("Image applied to slide!");
    };

    const autoDistributeImages = () => {
        if (userImages.length === 0) return;
        const newSlides = [...slides];
        let imgIdx = 0;
        newSlides.forEach((slide, idx) => {
            if (imgIdx < userImages.length) {
                newSlides[idx] = { ...slide, image: userImages[imgIdx].data };
                imgIdx++;
            }
        });
        setSlides(newSlides);
        toast.success("Images distributed across slides!");
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

    const deleteSlide = (index) => {
        if (slides.length <= 1) return;
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
        if (activeSlideIndex >= newSlides.length) setActiveSlideIndex(newSlides.length - 1);
    };

    const duplicateSlide = (index) => {
        const newSlides = [...slides];
        newSlides.splice(index + 1, 0, { ...slides[index] });
        setSlides(newSlides);
    };

    const downloadAll = async () => {
        setIsExporting(true);
        document.body.classList.add('export-mode');

        try {
            const { PDFDocument } = await import('pdf-lib');
            const pdfDoc = await PDFDocument.create();

            for (let i = 0; i < slides.length; i++) {
                const element = document.getElementById(`slide-content-${i}`);
                if (element) {
                    const dataUrl = await toJpeg(element, {
                        width: 1200,
                        height: 1500,
                        pixelRatio: 1.5,
                        quality: 1,
                        backgroundColor: '#ffffff',
                        skipFonts: true,
                        fontEmbedCSS: ''
                    });
                    const imageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
                    const image = await pdfDoc.embedJpg(imageBytes);
                    const page = pdfDoc.addPage([1200, 1500]);
                    page.drawImage(image, { x: 0, y: 0, width: 1200, height: 1500 });
                }
            }

            const pdfBytes = await pdfDoc.save();
            saveAs(new Blob([pdfBytes]), "carousel.pdf");
            toast.success("PDF Downloaded!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to export PDF");
        } finally {
            setIsExporting(false);
            document.body.classList.remove('export-mode');
        }
    };

    const exportInstagram = async () => {
        setIsExporting(true);
        document.body.classList.add('export-mode');
        const zip = new JSZip();

        try {
            for (let i = 0; i < slides.length; i++) {
                const element = document.getElementById(`slide-content-${i}`);
                if (element) {
                    const dataUrl = await toJpeg(element, {
                        width: 1200, // Match native slide width
                        height: 1500, // Match native slide height
                        pixelRatio: 1, // sufficient resolution (will be 1200x1500)
                        backgroundColor: '#ffffff',
                        quality: 0.95,
                        skipFonts: true
                    });
                    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                    zip.file(`slide-${i + 1}.jpg`, base64Data, { base64: true });
                }
            }
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "instagram-carousel.zip");
            toast.success("ZIP Downloaded!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to export ZIP");
        } finally {
            setIsExporting(false);
            document.body.classList.remove('export-mode');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleImageUpload({ target: { files: e.dataTransfer.files } });
    };

    const colors = {
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent || '#f59e0b',
        dark: palette.dark || '#0f172a',
        light: palette.light || '#f8fafc',
        text: palette.text || '#1e293b',
        textMuted: palette.textMuted || '#64748b',
        gradient: palette.gradient || { from: palette.primary, to: palette.secondary, direction: 'to-br' }
    };

    return (
        <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 p-6 lg:p-12 font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
            <div className="max-w-[1700px] mx-auto">
                <AppHeader
                    isExporting={isExporting}
                    isGenerating={isGenerating}
                    handleShuffleDesign={handleShuffleDesign}
                    handleGenerateWithAI={handleGenerateWithAI}
                    downloadAll={downloadAll}
                    exportInstagram={exportInstagram}
                />

                <div className="flex flex-col lg:flex-row gap-12 items-start h-full">
                    <div className="flex-1 w-full order-2 lg:order-1 min-w-0">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
                        >
                            {slides.map((slide, i) => (
                                <Slide
                                    key={i}
                                    id={`slide-${i}`}
                                    onDelete={() => deleteSlide(i)}
                                    onCycleLayout={() => cycleSlideVariant(i)}
                                    onRemoveImage={() => applyImageToSlide(null, i)}
                                >
                                    <div id={`slide-content-${i}`} className="w-full h-full relative overflow-hidden">
                                        <SlideRenderer
                                            slide={slide}
                                            index={i}
                                            colors={colors}
                                            palette={palette}
                                            userProfileImage={userProfileImage}
                                            userImages={userImages.map(img => img.data)}
                                            headingClass={activeFont}
                                            headingWeight="font-black"
                                            postTitle={postTitle}
                                            postCaption={postCaption}
                                            socialHandle={socialHandle}
                                        />
                                    </div>
                                </Slide>
                            ))}
                            {/* Add Slide Button */}
                            <button
                                onClick={() => duplicateSlide(slides.length - 1)}
                                className="snap-center shrink-0 w-[85vw] md:w-[480px] aspect-[4/5] bg-white dark:bg-slate-900 rounded-[32px] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 dark:text-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all no-export"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                    <Plus size={32} />
                                </div>
                                <span className="font-bold">Add New Slide</span>
                            </button>
                        </div>

                        {/* Slide Indicator */}
                        <div className="flex justify-center gap-2 mt-4 no-export">
                            {slides.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeSlideIndex === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200 dark:bg-slate-800'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <EditorSidebar
                        topic={topic}
                        setTopic={setTopic}
                        userImages={userImages}
                        handleImageUpload={handleImageUpload}
                        handleRemoveImage={handleRemoveImage}
                        applyImageToSlide={applyImageToSlide}
                        userProfileImage={userProfileImage}
                        handleProfileImageUpload={handleProfileImageUpload}
                        autoDistributeImages={autoDistributeImages}
                        palette={palette}
                        setPalette={setPalette}
                        palettes={palettes}
                        handleGeneratePalette={handleGeneratePalette}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postCaption={postCaption}
                        setPostCaption={setPostCaption}
                        socialHandle={socialHandle}
                        setSocialHandle={setSocialHandle}
                        activeFont={activeFont}
                        setActiveFont={setActiveFont}
                        isGenerating={isGenerating}
                        isExporting={isExporting}
                        isDragging={isDragging}
                        handleDrop={handleDrop}
                        handleDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        handleDragLeave={() => setIsDragging(false)}
                    />
                </div>
            </div>
        </main>
    );
}
