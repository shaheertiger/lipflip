import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 py-6 max-w-5xl mx-auto border-b border-white/5 mb-16 md:mb-20 px-4">
        <div className="text-center group cursor-default">
            <div className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-pink-200 transition-colors">50k+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Lips Flipped</div>
        </div>
        <div className="text-center group cursor-default">
            <div className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-pink-200 transition-colors">4.9</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Avg. Rating</div>
        </div>
        <div className="text-center group cursor-default">
            <div className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-emerald-200 transition-colors">100%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Private & Secure</div>
        </div>
         <div className="text-center group cursor-default">
            <div className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-purple-200 transition-colors">24/7</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Instant Access</div>
        </div>
    </div>
  )
}