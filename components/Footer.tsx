import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-xl py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-sm font-light">
          &copy; {new Date().getFullYear()} LipFlip BeforeAfter. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center mt-8 px-6 border-t border-white/5 pt-8">
        <p className="text-xs text-slate-600 leading-relaxed font-light">
          <span className="font-medium text-slate-500">Disclaimer:</span> This application uses artificial intelligence to simulate aesthetic procedures. 
          Results are for visualization purposes only and may not reflect actual medical results. 
          Individual anatomy varies. Always consult with a licensed medical professional for medical advice.
        </p>
      </div>
    </footer>
  );
};