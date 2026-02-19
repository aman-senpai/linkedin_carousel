import React, { useState, useEffect } from 'react';
import { X, Rss, Trash2, Plus, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EditChannelsModal = ({ isOpen, onClose, onSuccess }) => {
    const [channels, setChannels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadChannels();
        }
    }, [isOpen]);

    const loadChannels = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/youtube/channels');
            const data = await response.json();
            setChannels(data.channels || []);
        } catch (error) {
            toast.error('Failed to load channels');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/youtube/channels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(channels)
            });
            if (response.ok) {
                toast.success('Channels updated successfully');
                onSuccess?.();
                onClose();
            } else {
                toast.error('Failed to save channels');
            }
        } catch (error) {
            toast.error('Error saving channels');
        } finally {
            setIsSaving(false);
        }
    };

    const addChannel = () => {
        setChannels([...channels, { name: '', channel_id: '', domain: 'Tech' }]);
    };

    const removeChannel = (index) => {
        setChannels(channels.filter((_, i) => i !== index));
    };

    const updateChannel = (index, field, value) => {
        const newChannels = [...channels];
        newChannels[index][field] = value;
        setChannels(newChannels);
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Rss size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Manage Channels</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Add or edit YouTube channel IDs for the feed.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <X size={18} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        <>
                            {channels.map((channel, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group relative">
                                    <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={channel.name}
                                                    onChange={(e) => updateChannel(index, 'name', e.target.value)}
                                                    placeholder="e.g. Varun Mayya"
                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1">Domain</label>
                                                <input
                                                    type="text"
                                                    value={channel.domain}
                                                    onChange={(e) => updateChannel(index, 'domain', e.target.value)}
                                                    placeholder="e.g. AI & Tech"
                                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1">Channel ID (UC...)</label>
                                            <input
                                                type="text"
                                                value={channel.channel_id}
                                                onChange={(e) => updateChannel(index, 'channel_id', e.target.value)}
                                                placeholder="e.g. UCv75sKQatcyV0Zthp6zSg_g"
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeChannel(index)}
                                        className="sm:self-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                        title="Remove Channel"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addChannel}
                                className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2 group"
                            >
                                <Plus size={20} className="group-hover:scale-125 transition-transform" />
                                <span className="text-xs font-bold">Add New Channel</span>
                            </button>
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isLoading}
                        className="flex-[2] py-3 px-4 rounded-2xl font-black text-xs bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSaving ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                        ) : (
                            <><Save size={16} /> Save Changes</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditChannelsModal;
