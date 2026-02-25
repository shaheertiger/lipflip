'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';

export const StickyMobileCTA: React.FC<{ onScrollToUploader: () => void; hasUploadedImage?: boolean }> = ({ onScrollToUploader, hasUploadedImage }) => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        rafRef.current = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible || hasUploadedImage) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/98 border-t border-white/10 p-3 animate-slide-up">
      <div className="flex items-center gap-3">
        <button
          onClick={onScrollToUploader}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-bold text-sm shadow-[0_0_30px_-5px_rgba(236,72,153,0.4)] touch-action-manipulation"
          style={{ touchAction: 'manipulation' }}
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
