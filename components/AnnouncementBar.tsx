'use client';

import React, { useState, useEffect } from 'react';
import { Flame, X } from 'lucide-react';

export const AnnouncementBar: React.FC<{ onScrollToUploader: () => void }> = ({ onScrollToUploader }) => {
  const [dismissed, setDismissed] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(7);

  useEffect(() => {
    // Slowly decrement spots for urgency
    const timer = setInterval(() => {
      setSpotsLeft((prev) => (prev > 2 ? prev - 1 : prev));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div className="fixed top-0 w-full z-[60] bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white text-center py-2 px-4 shadow-lg shadow-pink-900/30">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
        <Flame size={14} className="shrink-0 animate-pulse" />
        <span className="truncate">
          <span className="font-bold">Limited:</span> Only {spotsLeft} spots left at this price today
        </span>
        <button
          onClick={onScrollToUploader}
          className="hidden sm:inline-flex ml-2 px-3 py-0.5 bg-white/20 hover:bg-white/30 rounded-full text-xs font-bold transition-colors whitespace-nowrap"
        >
          See My Result →
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-2 sm:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
