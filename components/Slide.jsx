'use client';

const Slide = ({ children, id, className = "", onDelete }) => {
  const isExportMode = typeof document !== 'undefined' && document.body.classList.contains('export-mode');

  return (
    <div className="snap-center">
      <div 
        className={`${isExportMode ? '' : 'rounded-[32px] overflow-hidden shadow-2xl group'} relative bg-white`}
        style={isExportMode ? {
          width: '1200px',
          height: '1500px'
        } : { 
          width: '400px', 
          height: '500px',
        }}
      >
        <div
          id={id}
          className={`absolute top-0 left-0 w-[1200px] h-[1500px] flex flex-col text-slate-900 origin-top-left ${className}`}
          style={isExportMode ? {} : { 
            transform: `scale(${400/1200})`,
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
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50 hover:bg-red-600"
            title="Remove slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide;
