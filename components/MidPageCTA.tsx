import React from 'react';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

export const MidPageCTA: React.FC<{ onScrollToUploader: () => void }> = ({ onScrollToUploader }) => {
  return (
    <div className="relative my-16 py-14 px-6 rounded-3xl overflow-hidden border border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-purple-600/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

      <div className="relative text-center space-y-6 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
          <Users size={12} className="text-pink-400" />
          Join 50,000+ women who already visualized
        </div>

        <h3 className="text-2xl md:text-3xl font-serif text-white leading-snug">
          Still scrolling? <br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400">See your result in seconds.</span>
        </h3>

        <p className="text-slate-400 text-sm font-light max-w-md mx-auto">
          Upload a selfie and let our AI show you exactly what a lip flip looks like on your face. No commitment, no signup.
        </p>

        <button
          onClick={onScrollToUploader}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.6)] transition-all hover:-translate-y-0.5"
        >
          <Sparkles size={18} />
          Visualize Now — Only $0.99
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
