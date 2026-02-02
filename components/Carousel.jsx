'use client';

const Carousel = ({ children }) => {
  return (
    <div className="flex gap-8 overflow-x-auto p-8 bg-gray-50 min-h-screen items-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <div className="flex gap-8">
            {children}
        </div>
    </div>
  );
};

export default Carousel;
