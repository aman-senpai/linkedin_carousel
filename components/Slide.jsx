'use client';

import { useRef, useEffect, useState } from 'react';

const Slide = ({ children, id, className = "", onDelete, onRemoveImage, onCycleLayout }) => {
  const [isExportMode, setIsExportMode] = useState(false);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Determine export mode on client side only
    const checkExportMode = () => {
      const isExport = document.body.classList.contains('export-mode');
      setIsExportMode(isExport);
      return isExport;
    }

    const mode = checkExportMode();

    if (mode || !containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setScale(width / 1200);
      }
    };

    // Initial calculation
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="snap-center shrink-0 w-[85vw] md:w-[480px]">
      <div
        ref={containerRef}
        className={`${isExportMode ? '' : 'rounded-[32px] overflow-hidden shadow-2xl group'} relative bg-white`}
        style={isExportMode ? {
          width: '1200px',
          height: '1500px'
        } : {
          width: '100%',
          aspectRatio: '4/5',
        }}
      >
        <div
          id={id}
          className={`absolute top-0 left-0 w-[1200px] h-[1500px] flex flex-col text-slate-900 origin-top-left ${className}`}
          style={isExportMode ? {} : {
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
        {onDelete && !isExportMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-lg z-50 hover:bg-red-600 focus:opacity-100"
            title="Remove slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
          </button>
        )}
        {onRemoveImage && !isExportMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveImage();
            }}
            className="absolute top-3 right-14 bg-orange-500 text-white p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-lg z-50 hover:bg-orange-600 focus:opacity-100"
            title="Remove image from slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /><line x1="4" y1="4" x2="20" y2="20" /></svg>
          </button>
        )}
        {onCycleLayout && !isExportMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCycleLayout();
            }}
            className="absolute top-3 left-3 bg-emerald-500 text-white p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity shadow-lg z-50 hover:bg-emerald-600 focus:opacity-100"
            title="Change Layout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide;

