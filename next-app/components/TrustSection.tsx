import React from 'react';
import { Shield, Lock, Activity } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/5 border-b border-white/5 my-12">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400 mb-2 border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
          <Lock size={24} />
        </div>
        <h3 className="text-white font-serif text-lg tracking-wide">100% Private</h3>
        <p className="text-slate-400 text-sm font-light max-w-xs leading-relaxed">
          Your photos are processed instantly in memory and deleted immediately. We never store or share your personal data.
        </p>
      </div>
      
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 mb-2 border border-blue-500/20 shadow-[0_0_15px_rgba(96,165,250,0.1)]">
          <Activity size={24} />
        </div>
        <h3 className="text-white font-serif text-lg tracking-wide">Clinically Accurate</h3>
        <p className="text-slate-400 text-sm font-light max-w-xs leading-relaxed">
          Our AI model is calibrated with input from aesthetic professionals to ensure results are realistic and achievable.
        </p>
      </div>

      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 mb-2 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <Shield size={24} />
        </div>
        <h3 className="text-white font-serif text-lg tracking-wide">Safe Exploration</h3>
        <p className="text-slate-400 text-sm font-light max-w-xs leading-relaxed">
          Explore your aesthetic goals without pressure. No appointments, no sales calls, just pure visualization.
        </p>
      </div>
    </div>
  );
};