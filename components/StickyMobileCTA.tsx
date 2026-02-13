'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export const StickyMobileCTA: React.FC<{ onScrollToUploader: () => void }> = ({ onScrollToUploader }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 p-3 animate-slide-up">
      <div className="flex items-center gap-3">
        <button
          onClick={onScrollToUploader}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-bold text-sm shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)]"
        >
          Visualize My Lip Flip
          <ArrowRight size={16} />
        </button>
        <div className="flex items-center gap-1 text-[9px] text-slate-400 shrink-0">
          <Shield size={10} className="text-emerald-400" />
          <span>100%<br/>Private</span>
        </div>
      </div>
    </div>
  );
};
