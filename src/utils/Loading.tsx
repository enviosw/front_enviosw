// components/Loader.tsx
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12 w-full">
      <div className="relative w-12 h-12">
        {/* Anillo exterior */}
        <div className="absolute inset-0 rounded-full border-4 border-[#EDE8E3]" />
        {/* Anillo animado */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#E8622A] animate-spin" />
        {/* Punto central */}
        <div className="absolute inset-3 rounded-full bg-[#E8622A]/20" />
      </div>
    </div>
  );
};

export default Loading;
