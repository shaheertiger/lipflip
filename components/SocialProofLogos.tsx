import React from 'react';

export const SocialProofLogos: React.FC = () => {
  return (
    <div className="w-full border-y border-white/5 bg-white/[0.01] backdrop-blur-[2px] py-10 mb-12 md:mb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-8">
          Technology featured in
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale">
          {/* Stylized text logos that look like authoritative publications */}
          <span className="font-serif text-xl md:text-3xl font-bold tracking-tighter text-white">
            AESTHETICA
          </span>
          <span className="font-sans text-lg md:text-2xl font-black tracking-widest text-white uppercase">
            GLOW<span className="font-light">EDIT</span>
          </span>
          <span className="font-serif text-lg md:text-2xl italic font-medium text-white">
            The Derma Journal
          </span>
          <span className="font-sans text-base md:text-xl font-bold tracking-tight text-white uppercase border-2 border-white px-2 py-1">
            MEDI-LUXE
          </span>
          <span className="font-serif text-lg md:text-2xl font-bold text-white">
            Beauty<span className="font-light italic text-pink-200">Insider</span>
          </span>
        </div>
      </div>
    </div>
  );
};