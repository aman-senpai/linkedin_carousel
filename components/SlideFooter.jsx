import React from 'react';

const SlideFooter = ({ socialHandle, postTitle, mode = 'light', color }) => {
    if (!socialHandle && !postTitle) return null;

    // Determine colors based on mode
    // mode 'dark' = dark background, so text should be white/light
    // mode 'light' = light background, so text should be dark

    // We use high opacity for legibility but small size/position to be unobtrusive
    const textColor = color
        ? color
        : (mode === 'dark' ? 'text-white/60' : 'text-slate-900/40');

    const borderColor = mode === 'dark' ? 'border-white/20' : 'border-slate-900/10';

    return (
        <div className={`absolute bottom-6 left-8 right-8 z-30 flex justify-between items-end pointer-events-none transition-colors duration-300 ${textColor}`}>
            <div className="flex items-center gap-2">
                <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{socialHandle}</span>
            </div>
            {postTitle && (
                <div className={`hidden sm:block font-medium text-[10px] uppercase tracking-widest pl-4 border-l ${borderColor}`}>
                    {postTitle}
                </div>
            )}
        </div>
    );
};

export default SlideFooter;
