import React, { useState, useEffect, useCallback } from 'react';
import { X, RefreshCw, Layers, Zap, ExternalLink, Play, Search, Settings, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const YoutubeBrowser = ({ isOpen, onClose, onSelectVideo }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all'); // all, videos, shorts
    const [domainFilter, setDomainFilter] = useState('all');
    const [domains, setDomains] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchVideos = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/youtube/videos');
            const data = await response.json();
            if (data.videos) {
                setVideos(data.videos);
                const uniqueDomains = Array.from(new Set(data.videos.map(v => v.domain)));
                setDomains(uniqueDomains);
            }
        } catch (error) {
            toast.error('Failed to fetch videos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchVideos();
        }
    }, [isOpen, fetchVideos]);

    const filteredVideos = videos.filter(v => {
        const matchesType = typeFilter === 'all' || (typeFilter === 'shorts' ? v.isShort : !v.isShort);
        const matchesDomain = domainFilter === 'all' || v.domain === domainFilter;
        const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.channelName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesDomain && matchesSearch;
    });

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Layers size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">YouTube Browser</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Browse content from your curated channels</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                placeholder="Search videos or channels..."
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-red-500/20 outline-none text-slate-900 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={fetchVideos}
                            disabled={isLoading}
                            className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all disabled:opacity-50"
                        >
                            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-wrap gap-4 items-center shrink-0">
                    <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        {['all', 'videos', 'shorts'].map(f => (
                            <button
                                key={f}
                                onClick={() => setTypeFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${typeFilter === f ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center overflow-x-auto no-scrollbar pb-1 max-w-full">
                        <button
                            onClick={() => setDomainFilter('all')}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${domainFilter === 'all' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'}`}
                        >
                            All Domains
                        </button>
                        {domains.map(d => (
                            <button
                                key={d}
                                onClick={() => setDomainFilter(d)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${domainFilter === d ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Video Grid */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/50">
                    {isLoading && videos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                            <Loader2 size={40} className="animate-spin text-red-500" />
                            <p className="font-bold">Fetching latest content...</p>
                        </div>
                    ) : filteredVideos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                            <Layers size={40} className="opacity-20" />
                            <p className="font-bold">No matches found for your criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredVideos.map((video) => (
                                <div key={video.id} className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden flex flex-col hover:border-red-500/50 transition-all hover:shadow-xl hover:-translate-y-1">
                                    <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
                                        <img
                                            src={video.thumbnail}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={video.title}
                                            loading="lazy"
                                        />
                                        {video.isShort && (
                                            <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-xl">
                                                <Zap size={10} fill="currentColor" /> SHORTS
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                            <a
                                                href={video.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                                title="View Source"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[9px] font-black rounded uppercase tracking-wider">
                                                {video.domain}
                                            </span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold truncate">
                                                {video.channelName}
                                            </span>
                                        </div>

                                        <h3 className="text-xs font-bold leading-tight line-clamp-2 text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                                            {video.title}
                                        </h3>

                                        <div className="mt-auto pt-3 border-t border-slate-50 dark:border-slate-700 flex flex-col gap-2">
                                            <div className="flex justify-between items-center text-[9px] text-slate-400 font-medium">
                                                <span>{new Date(video.pubDate).toLocaleDateString()}</span>
                                            </div>
                                            <button
                                                onClick={() => onSelectVideo(video)}
                                                className="w-full py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white shadow-sm"
                                            >
                                                <Play size={12} fill="currentColor" /> USE CONTENT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YoutubeBrowser;
