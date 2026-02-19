import React, { useState } from 'react';
import { Upload, X, User, Image as ImageIcon, Wand2, Type, AtSign, Palette, Palette as PaletteIcon, Layout, ChevronRight, Loader2, Globe, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { FONT_OPTIONS } from '@/lib/constants';
import { TEMPLATES } from '@/lib/templates';
import YoutubeBrowser from './YoutubeBrowser';
import EditChannelsModal from './modals/EditChannelsModal';

const EditorSidebar = ({
    topic,
    setTopic,
    userImages,
    handleImageUpload,
    handleRemoveImage,
    applyImageToSlide,
    userProfileImage,
    handleProfileImageUpload,
    autoDistributeImages,
    palette,
    setPalette,
    palettes,
    handleGeneratePalette,
    postTitle,
    setPostTitle,
    postCaption,
    setPostCaption,
    socialHandle,
    setSocialHandle,
    activeFont,
    setActiveFont,
    isGenerating,
    isExporting,
    isDragging,
    handleDrop,
    handleDragOver,
    handleDragLeave
}) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // YouTube Fetcher State
    const [ytVideos, setYtVideos] = useState([]);
    const [isFetchingTranscript, setIsFetchingTranscript] = useState(null);

    // Browser/Manage State
    const [isBrowserOpen, setIsBrowserOpen] = useState(false);
    const [isManageOpen, setIsManageOpen] = useState(false);

    // Body scroll lock
    React.useEffect(() => {
        if (isBrowserOpen || isManageOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isBrowserOpen, isManageOpen]);


    const handleSelectVideo = async (video) => {
        setIsBrowserOpen(false);
        setIsFetchingTranscript(video.id);
        try {
            const response = await fetch(`/api/youtube/transcript?videoId=${video.id}`);
            const data = await response.json();
            if (data.transcript) {
                setTopic(`Video Title: ${video.title}\n\nTranscript: ${data.transcript}`);
                toast.success('Content loaded into editor!');
            } else {
                setTopic(`Video Title: ${video.title}\n\nVideo URL: ${video.link}`);
                toast.warning('Transcript not available, title and link loaded.');
            }
        } catch (error) {
            setTopic(`Video Title: ${video.title}\n\nVideo URL: ${video.link}`);
            toast.error('Error fetching transcript');
        } finally {
            setIsFetchingTranscript(null);
        }
    };

    return (
        <div className="w-full lg:w-[400px] order-1 lg:order-2 shrink-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto pr-2 custom-scrollbar space-y-5 no-export">
            {/* YouTube Content Fetcher */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">YouTube Integration</label>
                    <div className="ml-auto flex gap-1">
                        <button
                            onClick={() => setIsManageOpen(true)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            title="Manage Channels"
                        >
                            <Settings size={14} />
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <button
                        onClick={() => setIsBrowserOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-red-500/20"
                    >
                        <Globe size={16} fill="currentColor" />
                        BROWSE CHANNELS
                    </button>
                </div>
            </div>

            {/* Topic Input Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 block">Topic / Content</label>
                <textarea
                    placeholder="Enter a topic or paste content for AI to generate slides..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-medium resize-none text-sm text-slate-900 dark:text-white"
                    value={topic}
                    rows="4"
                    onChange={(e) => setTopic(e.target.value)}
                />
            </div>

            {/* Image Assets Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Image Assets</label>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full">{userImages.length}/10 Images</span>
                </div>

                <div
                    className={`grid grid-cols-4 gap-2 mb-4 p-2 rounded-xl transition-all ${isDragging ? 'bg-emerald-50/50 ring-2 ring-emerald-200 ring-dashed' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {userImages.map((img) => (
                        <div key={img.id} className="relative aspect-square group">
                            <img src={img.data} className="w-full h-full object-cover rounded-lg shadow-sm" alt="asset" />
                            <button
                                onClick={() => handleRemoveImage(img.id)}
                                className="absolute -top-1.5 -right-1.5 bg-white text-red-500 rounded-full shadow-md p-1 opacity-0 group-hover:opacity-100 transition-all z-10 border border-slate-100"
                            >
                                <X size={12} strokeWidth={3} />
                            </button>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-lg flex items-center justify-center gap-1">
                                <button
                                    onClick={() => applyImageToSlide(img.data)}
                                    className="p-1.5 bg-white text-blue-600 rounded-md shadow-lg"
                                    title="Apply to slide"
                                >
                                    <ImageIcon size={14} />
                                </button>
                                <button
                                    onClick={() => handleProfileImageUpload({ target: { files: [null], _directData: img.data } })}
                                    className="p-1.5 bg-white text-emerald-600 rounded-md shadow-lg"
                                    title="Set as profile"
                                >
                                    <User size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {userImages.length < 10 && (
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
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={autoDistributeImages}
                        disabled={userImages.length === 0}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all disabled:opacity-50"
                    >
                        <Wand2 size={14} />
                        Auto-Distribute
                    </button>
                    <label className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer">
                        <User size={14} />
                        Profile Pic
                        <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
                    </label>
                </div>
            </div>

            {/* Design System Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Palette</label>
                </div>

                <div className="grid grid-cols-5 gap-3 mb-6">
                    {palettes.map((p, i) => (
                        <button
                            key={i}
                            className={`w-full aspect-square rounded-xl transition-all p-1.5 ${palette.primary === p.primary && palette.secondary === p.secondary ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : 'hover:scale-110'}`}
                            style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})` }}
                            onClick={() => setPalette({ ...palette, ...p })}
                        />
                    ))}
                    <button
                        onClick={handleGeneratePalette}
                        disabled={isGenerating}
                        className={`w-full aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all ${isGenerating ? 'animate-pulse' : ''}`}
                        title="Generate AI Palette"
                    >
                        <Wand2 size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 bg-white dark:bg-slate-700 shadow-sm shrink-0">
                                <PaletteIcon size={14} />
                            </div>
                            <input
                                type="color"
                                value={palette.primary}
                                onChange={(e) => setPalette({ ...palette, primary: e.target.value })}
                                className="w-full h-8 cursor-pointer rounded bg-transparent font-medium text-xs flex-1"
                            />
                        </div>
                        {palette.templateId && (
                            <button
                                onClick={() => {
                                    const t = TEMPLATES.find(temp => temp.id === palette.templateId);
                                    if (t) setPalette({ ...palette, ...t });
                                }}
                                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                            >
                                Reset Theme
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Visual Template</label>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {['All', ...new Set(TEMPLATES.map(t => t.category))].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {TEMPLATES.filter(t => selectedCategory === 'All' || t.category === selectedCategory).map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setPalette({
                                ...palette,
                                ...t,
                                templateId: t.id,
                                template: t.decorationType
                            })}
                            className={`group flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${palette.templateId === t.id
                                ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-500 shadow-sm shadow-blue-100 dark:shadow-none'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-xl shadow-inner shrink-0 overflow-hidden relative border border-white/20"
                                    style={{ background: `linear-gradient(${t.gradient.direction}, ${t.primary}, ${t.secondary})` }}
                                >
                                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                                </div>
                                <div className="text-left">
                                    <p className={`text-sm font-bold ${palette.templateId === t.id ? 'text-blue-900 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>{t.name}</p>
                                    <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase">{t.category}</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className={palette.templateId === t.id ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Settings */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 block">Post Settings</label>

                <div className="space-y-4">
                    <div className="relative">
                        <Type className="absolute left-3 top-3.5 text-slate-400" size={16} />
                        <input
                            placeholder="Post Title"
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm text-slate-900 dark:text-white"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <AtSign className="absolute left-3 top-3.5 text-slate-400" size={16} />
                        <input
                            placeholder="Social Handle"
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm text-slate-900 dark:text-white"
                            value={socialHandle}
                            onChange={(e) => setSocialHandle(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute left-3 top-3.5 text-slate-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <textarea
                            placeholder="Post Caption"
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-medium text-sm text-slate-900 dark:text-white resize-none"
                            value={postCaption}
                            rows="3"
                            onChange={(e) => setPostCaption(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 block">Typography</label>
                    <div className="grid grid-cols-2 gap-2">
                        {FONT_OPTIONS.map((f) => (
                            <button
                                key={f.name}
                                onClick={() => setActiveFont(f.value)}
                                className={`px-3 py-2.5 rounded-xl border-2 text-[10px] font-bold transition-all ${activeFont === f.value
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                    : 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                                    }`}
                            >
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <YoutubeBrowser
                isOpen={isBrowserOpen}
                onClose={() => setIsBrowserOpen(false)}
                onSelectVideo={handleSelectVideo}
            />

            <EditChannelsModal
                isOpen={isManageOpen}
                onClose={() => setIsManageOpen(false)}
            />
        </div>
    );
};

export default EditorSidebar;
