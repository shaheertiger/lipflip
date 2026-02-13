'use client';

import React, { useState, useEffect } from 'react';
import { X, Gift, ArrowRight, Star, Clock } from 'lucide-react';

export const ExitIntentPopup: React.FC<{ onScrollToUploader: () => void }> = ({ onScrollToUploader }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !dismissed) {
        setVisible(true);
      }
    };

    // Also trigger on back-button intent (mobile: scroll up fast)
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      scrollVelocity = lastScrollY - window.scrollY;
      lastScrollY = window.scrollY;
      if (scrollVelocity > 80 && window.scrollY < 200 && !dismissed) {
        setVisible(true);
      }
    };

    // Delay adding listeners to avoid triggering on page load
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 10000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  const handleCTA = () => {
    handleDismiss();
    onScrollToUploader();
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleDismiss} />
      <div className="relative w-full max-w-md bg-[#0F1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Top gradient */}
        <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500" />

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-8 text-center space-y-5">
          <div className="inline-flex p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full border border-pink-500/20">
            <Gift size={32} className="text-pink-400" />
          </div>

          <h3 className="text-2xl font-serif text-white">
            Wait — your first visualization is <span className="text-pink-400">free!</span>
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            See exactly what a lip flip would look like on <strong className="text-white">your face</strong> before committing to anything. No credit card required.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              4.9/5 rating
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-emerald-400" />
              Takes 10 seconds
            </span>
          </div>

          <button
            onClick={handleCTA}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.7)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Try It Free Now
            <ArrowRight size={18} />
          </button>

          <p className="text-[10px] text-slate-600">
            No signup needed. Your photos stay private.
          </p>
        </div>
      </div>
    </div>
  );
};
