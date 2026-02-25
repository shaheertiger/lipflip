import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-xl py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo/Copy Section */}
          <div className="space-y-4">
            <div className="text-white font-serif text-xl font-bold italic tracking-tight">LipFlip <span className="text-pink-500">BeforeAfter</span></div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-light">
              AI-powered aesthetic visualization. See your subtle results before you visit the clinic.
            </p>
          </div>

          {/* Resources/Blog Section */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog/how-long-does-it-take-for-lip-flip-to-work" className="text-slate-400 hover:text-pink-400 transition-colors inline-flex items-center gap-2">
                  Lip Flip Results Timeline
                  <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-[10px] text-pink-500 font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-pink-400 transition-colors">Virtual Visualizer</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-600 text-[10px] md:text-xs font-light tracking-wide uppercase">
            &copy; {new Date().getFullYear()} LipFlip BeforeAfter. All rights reserved.
          </div>
          <div className="flex gap-4">
            {/* Social or additional links can go here */}
          </div>
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