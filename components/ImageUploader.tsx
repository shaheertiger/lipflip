import React, { useCallback } from 'react';
import { Lock } from 'lucide-react';

// Custom Aesthetic Heart Icon
const AestheticHeartIcon = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.0001 21.0847L10.6978 19.9575C5.35242 15.3414 2.1001 12.5186 2.1001 9.0744C2.1001 6.25735 4.3013 4.1001 7.1001 4.1001C8.67936 4.1001 10.1978 4.81986 11.2001 5.9686C12.2024 4.81986 13.7208 4.1001 15.3001 4.1001C18.0989 4.1001 20.3001 6.25735 20.3001 9.0744C20.3001 12.5186 17.0478 15.3414 11.7024 19.9575L12.0001 21.0847Z" stroke="url(#upload-heart-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="url(#upload-heart-gradient)" fillOpacity="0.05"/>
    <path d="M16 8L18 6M18 6L20 4M18 6L16 4M18 6L20 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <defs>
      <linearGradient id="upload-heart-gradient" x1="2.1001" y1="4.1001" x2="20.3001" y2="21.0847" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="0.5" stopColor="#E879F9" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
    </defs>
  </svg>
)

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, disabled }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  }, [disabled, onImageSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  }, [onImageSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative group overflow-hidden border border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-500 ease-out ${
        disabled 
          ? 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed' 
          : 'border-white/20 hover:border-pink-500/50 hover:bg-white/[0.02] cursor-pointer hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.1)]'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
      />
      
      <div className="flex flex-col items-center justify-center space-y-6 relative z-0">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-pink-500/10 to-purple-500/10 border border-white/10 shadow-xl flex items-center justify-center transition-transform duration-500 ${!disabled && 'group-hover:scale-110 group-hover:border-pink-500/30'}`}>
           <AestheticHeartIcon className={`transition-all duration-300 scale-90 md:scale-100 ${!disabled && 'group-hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]'}`} />
        </div>
        
        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-serif text-white tracking-wide">
            Drop your selfie here
          </p>
          <p className="text-sm text-slate-400 font-light tracking-wide max-w-xs mx-auto">
            or click to browse your library.<br/>
            <span className="text-pink-400/70 text-xs mt-1 block">✨ Best lighting = Best results</span>
          </p>
        </div>

        {/* Privacy Badge */}
        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 mt-2">
          <Lock size={12} className="text-emerald-400" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300">Secure & Private Upload</span>
        </div>
      </div>
    </div>
  );
};