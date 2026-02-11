import React from 'react';

// Custom Modern SVG Icons
const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15" stroke="url(#hiw-upload-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3V15M12 3L16 7M12 3L8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="hiw-upload-gradient" x1="3" y1="21" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
  </svg>
);

const MagicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M16 4L19 7L10 16L7 13L16 4Z" stroke="url(#hiw-magic-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11L15 14" stroke="url(#hiw-magic-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    <path d="M6 19L7 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V2.01M19 2V2.01M22 5V5.01M22 9V9.01" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 15V15.01M2 19V19.01M5 22V22.01M9 22V22.01" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="hiw-magic-gradient" x1="7" y1="16" x2="19" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
  </svg>
);

const ResultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path d="M12 2.5L14.5 9.5L21.5 12L14.5 14.5L12 21.5L9.5 14.5L2.5 12L9.5 9.5L12 2.5Z" fill="url(#hiw-result-gradient)" fillOpacity="0.1" stroke="url(#hiw-result-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="6" r="1.5" fill="white" />
    <circle cx="6" cy="18" r="1" fill="white" opacity="0.6" />
    <defs>
      <linearGradient id="hiw-result-gradient" x1="2.5" y1="2.5" x2="21.5" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  </svg>
);

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UploadIcon />,
      title: "1. Upload a Selfie",
      desc: "Choose a clear photo with good lighting. No filters works best!"
    },
    {
      icon: <MagicIcon />,
      title: "2. Let AI Work Magic",
      desc: "Our engine visualizes a gentle, natural flip in seconds."
    },
    {
      icon: <ResultIcon />,
      title: "3. Meet the New You",
      desc: "See the result instantly. Love it? Save it for your injector."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto px-2">
      {steps.map((step, index) => (
        <div 
          key={index} 
          className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-pink-500/20 transition-all duration-300 group backdrop-blur-md"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-pink-300 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-300">
            {step.icon}
          </div>
          <h3 className="text-lg font-serif text-white mb-2">{step.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed font-light">{step.desc}</p>
          
          {/* Connector Line for Desktop */}
          {index !== steps.length - 1 && (
            <div className="hidden md:block absolute top-12 -right-3 w-6 border-t border-dashed border-white/10 text-white/10">
              <span className="absolute -top-1.5 -right-1 text-xs">→</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};