import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Logo Mark */}
      <div className="relative w-10 h-10 flex-shrink-0">
        {/* Animated Background Glow - More prominent pink/rose gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 via-pink-500 to-fuchsia-600 rounded-xl rotate-6 opacity-50 blur-[3px] group-hover:rotate-12 group-hover:opacity-80 group-hover:blur-[5px] transition-all duration-500 ease-out"></div>
        
        {/* Icon Container */}
        <div className="relative h-full w-full bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl group-hover:border-pink-500/50 transition-colors duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transform group-hover:scale-110 transition-transform duration-500 ease-out">
            {/* Stylized Upper Lip Line */}
            <path d="M4 13C6.5 14.5 9 14.5 12 12.5C15 14.5 17.5 14.5 20 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Stylized Lower Lip Line */}
            <path d="M5 13C7.5 16 12 17.5 19 13" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:stroke-pink-400 transition-colors" />
            {/* Sparkle Accent - Subtle pulse on hover */}
            <path d="M18 5L18.5 6.5L20 7L18.5 7.5L18 9L17.5 7.5L16 7L17.5 6.5L18 5Z" fill="#F472B6" className="group-hover:animate-pulse" />
          </svg>
        </div>
      </div>
      
      {/* Logo Type */}
      <div className="flex flex-col justify-center">
        <span className="font-serif text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-100 group-hover:to-pink-300 transition-all duration-500 leading-none shadow-sm">
          LipFlip
        </span>
        <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 uppercase leading-tight mt-1 group-hover:from-pink-400 group-hover:to-rose-300 transition-all duration-500">
          BeforeAfter
        </span>
      </div>
    </div>
  );
};