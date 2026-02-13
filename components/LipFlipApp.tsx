'use client';

import React, { useState, useRef } from 'react';
import { RotateCcw, AlertCircle, Camera, Wand2, Download, ArrowRight, Sparkles, Heart, Activity, CheckCircle2, Shield, Clock } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { ComparisonSlider } from './ComparisonSlider';
import { Logo } from './Logo';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { TrustSection } from './TrustSection';
import { Footer } from './Footer';
import { SocialProofLogos } from './SocialProofLogos';
import { StatsSection } from './StatsSection';
import { FAQ } from './FAQ';
import { PaymentModal } from './PaymentModal';
import { AnnouncementBar } from './AnnouncementBar';
import { StickyMobileCTA } from './StickyMobileCTA';
import { ActivityToast } from './ActivityToast';
import { ExitIntentPopup } from './ExitIntentPopup';
import { ComparisonTable } from './ComparisonTable';
import { MidPageCTA } from './MidPageCTA';
import { ProcessingStatus, ImageState } from '../types';
import { generateLipFlip, fileToBase64 } from '../services/geminiService';
import { generateCacheKey, getCachedResult, saveToCache } from '../services/cacheService';

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] animate-blob mix-blend-screen" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-screen" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
    <style>{`
      @keyframes scan {
        0% { top: 0%; opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }
    `}</style>
  </div>
);

const ScanningOverlay = ({ step }: { step: string }) => (
  <div className="absolute inset-0 z-20 overflow-hidden rounded-3xl pointer-events-none select-none">
    <div className="absolute inset-0 bg-emerald-500/5" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    <div
      className="absolute left-0 w-full h-1 bg-emerald-400/80 shadow-[0_0_25px_rgba(52,211,153,0.6)] animate-[scan_2s_ease-in-out_infinite]"
      style={{ top: '0%' }}
    />
    <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-emerald-400/50 rounded-tl-lg" />
    <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-emerald-400/50 rounded-tr-lg" />
    <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-lg" />
    <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-emerald-400/50 rounded-br-lg" />
    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
      <div className="bg-black/60 backdrop-blur-md border border-emerald-500/30 px-6 py-2 rounded-full flex items-center gap-3 shadow-xl max-w-[90%] mx-auto">
        <Activity size={16} className="text-emerald-400 animate-pulse shrink-0" />
        <span className="text-emerald-50 font-mono text-xs md:text-sm tracking-wide truncate">{step}</span>
      </div>
    </div>
  </div>
);

const LipFlipApp: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState>({ file: null, previewUrl: null });
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [isCachedResult, setIsCachedResult] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [scanStep, setScanStep] = useState<string | null>(null);

  const uploaderRef = useRef<HTMLDivElement>(null);

  const scrollToUploader = () => {
    uploaderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleImageSelect = (file: File) => {
    setProcessedImage(null);
    setStatus(ProcessingStatus.IDLE);
    setScanStep(null);
    setError(null);
    setIsCachedResult(false);
    const objectUrl = URL.createObjectURL(file);
    setOriginalImage({ file, previewUrl: objectUrl });
    setTimeout(() => {
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 100);
  };

  const initiateGeneration = async () => {
     setStatus(ProcessingStatus.PROCESSING);
     const steps = [
       "Scanning facial geometry...",
       "Mapping vermilion border...",
       "Analyzing muscle structure...",
       "Projecting tissue relaxation...",
       "Rendering preview..."
     ];
     for (const step of steps) {
       setScanStep(step);
       await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
     }
     setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    executeGeneration();
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    setStatus(ProcessingStatus.IDLE);
    setScanStep(null);
  };

  const executeGeneration = async () => {
    if (!originalImage.file && !originalImage.previewUrl) return;
    try {
      setStatus(ProcessingStatus.PROCESSING);
      setScanStep("Finalizing high-res output...");
      setError(null);
      setIsCachedResult(false);

      let cacheKey = "";
      if (originalImage.file) {
        cacheKey = generateCacheKey(originalImage.file);
        const cachedData = await getCachedResult(cacheKey);
        if (cachedData) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setProcessedImage(`data:image/jpeg;base64,${cachedData}`);
          setStatus(ProcessingStatus.COMPLETE);
          setIsCachedResult(true);
          setScanStep(null);
          return;
        }
      }

      let base64Data = "";
      let mimeType = "image/jpeg";
      if (originalImage.file) {
        base64Data = await fileToBase64(originalImage.file);
        mimeType = originalImage.file.type;
      } else {
        throw new Error("Please upload a valid image file.");
      }

      const generatedImageBase64 = await generateLipFlip(base64Data, mimeType);
      if (cacheKey) {
        await saveToCache(cacheKey, generatedImageBase64);
      }

      setProcessedImage(`data:image/jpeg;base64,${generatedImageBase64}`);
      setStatus(ProcessingStatus.COMPLETE);
      setScanStep(null);
    } catch (err: unknown) {
      console.error(err);
      setStatus(ProcessingStatus.ERROR);
      setScanStep(null);
      setError(err instanceof Error ? err.message : "Something went wrong during the transformation.");
    }
  };

  const handleReset = () => {
    setOriginalImage({ file: null, previewUrl: null });
    setProcessedImage(null);
    setStatus(ProcessingStatus.IDLE);
    setScanStep(null);
    setError(null);
    setIsCachedResult(false);
  };

  return (
    <div className="relative min-h-screen text-slate-200 font-sans flex flex-col overflow-x-hidden">
      <BackgroundEffects />

      <PaymentModal
        isOpen={showPayment}
        onClose={handlePaymentClose}
        onSuccess={handlePaymentSuccess}
      />

      {/* CRO: Urgency Announcement Bar */}
      <AnnouncementBar onScrollToUploader={scrollToUploader} />

      {/* CRO: Live Activity Social Proof Toasts */}
      <ActivityToast />

      {/* CRO: Exit Intent Popup */}
      <ExitIntentPopup onScrollToUploader={scrollToUploader} />

      {/* CRO: Sticky Mobile Bottom CTA */}
      <StickyMobileCTA onScrollToUploader={scrollToUploader} hasUploadedImage={!!originalImage.previewUrl} />

      {/* Navbar - pushed down by announcement bar */}
      <nav className="fixed top-8 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div onClick={() => window.location.reload()} className="scale-90 md:scale-100 origin-left cursor-pointer">
            <Logo />
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <span className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-400">
              <Sparkles size={14} className="text-pink-500" />
              <span>Aesthetic AI Engine</span>
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>243 active now</span>
            </div>
            <button
              onClick={scrollToUploader}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-[0_0_20px_-5px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.6)] transition-all"
            >
              See Your Result
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-10 flex-grow w-full" role="main">

        {/* Enhanced Hero Section */}
        {!processedImage && (
          <header className="text-center mb-12 md:mb-16 space-y-6 md:space-y-8 animate-fade-in relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/10 backdrop-blur-sm text-[10px] md:text-xs font-semibold tracking-wider uppercase text-pink-300 mb-2 md:mb-4 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform cursor-default">
              <Heart size={12} className="fill-pink-500 text-pink-500 animate-pulse"/>
              #1 Lip Flip Before and After Visualizer
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] md:leading-[1.1]">
              See your lip flip <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-pink-500">
                before you commit.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed px-2">
              Upload a selfie and see <span className="text-white font-medium">exactly what a lip flip looks like on your face</span> — powered by AI trained on real cosmetic outcomes.
              <span className="hidden sm:inline"> No appointment. No commitment. Results in seconds.</span>
            </p>

            {/* Inline Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-xs text-slate-400 px-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>100% Private</span>
              </span>
              <span className="hidden sm:block w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-blue-400" />
                <span>Clinically Calibrated</span>
              </span>
              <span className="hidden sm:block w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-purple-400" />
                <span>Results in 10 Seconds</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-2">
              <button
                onClick={scrollToUploader}
                className="w-full sm:w-auto group relative px-10 py-5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-bold text-lg tracking-wide shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.7)] transition-all hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Visualize My Lip Flip — $0.99
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium px-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span>243 people using it now</span>
              </div>
            </div>

            {/* Risk Reversal Copy */}
            <p className="text-xs text-slate-500 font-light pt-2">
              No signup required · Your photos are never stored
            </p>
          </header>
        )}

        {/* Core Interaction Area */}
        <div className="max-w-4xl mx-auto transition-all duration-700 ease-in-out">

          {/* 1. Upload State */}
          {!originalImage.previewUrl && (
            <div className="animate-fade-in space-y-12 md:space-y-16">
              <SocialProofLogos />

              <HowItWorks />

              <div ref={uploaderRef} className="scroll-mt-32 md:scroll-mt-40">
                  <div className="glass-panel p-2 rounded-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10 relative">
                     <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-30 pointer-events-none" />
                     <ImageUploader onImageSelect={handleImageSelect} />
                  </div>
                  <div className="text-center mt-6 text-slate-500 text-xs md:text-sm font-light px-4">
                     <span className="opacity-75">Supported formats: JPG, PNG, WEBP. Max file size: 10MB.</span>
                  </div>
              </div>

              <StatsSection />

              {/* CRO: Mid-Page CTA to capture scrollers */}
              <MidPageCTA onScrollToUploader={scrollToUploader} />

              <TrustSection />

              {/* CRO: Comparison Table - value differentiation */}
              <ComparisonTable onScrollToUploader={scrollToUploader} />

              <Testimonials />

              <FAQ />
            </div>
          )}

          {/* 2. Preview & Generate State */}
          {originalImage.previewUrl && !processedImage && (
            <div className="flex flex-col items-center animate-fade-in py-6 md:py-10">
              <div className="relative group w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-8 md:mb-10 bg-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalImage.previewUrl}
                  alt="Your uploaded selfie for lip flip before and after visualization"
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
                />
                {status === ProcessingStatus.PROCESSING && scanStep && (
                  <ScanningOverlay step={scanStep} />
                )}
                {status !== ProcessingStatus.PROCESSING && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <p className="text-white/90 font-serif text-xl tracking-wide">Ready for your reveal?</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col w-full max-w-sm gap-4 px-4 md:px-0">
                <button
                  onClick={initiateGeneration}
                  disabled={status === ProcessingStatus.PROCESSING}
                  className={`
                    relative overflow-hidden w-full h-14 rounded-full font-medium text-white tracking-wide text-lg
                    transition-all duration-300 transform active:scale-95 shadow-[0_0_40px_-10px_rgba(190,24,93,0.3)]
                    ${status === ProcessingStatus.PROCESSING ? 'cursor-not-allowed opacity-90' : 'hover:shadow-[0_0_60px_-15px_rgba(190,24,93,0.5)]'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 animate-gradient-x" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3">
                    {status === ProcessingStatus.PROCESSING ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} className="fill-white/20" />
                        <span>Reveal My Lip Flip</span>
                      </>
                    )}
                  </div>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full h-12 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Use a different selfie
                </button>
              </div>
              {error && (
                <div className="mt-8 flex items-center gap-3 text-red-300 bg-red-900/10 px-5 py-4 rounded-xl border border-red-500/20 backdrop-blur-md mx-4 md:mx-0">
                  <AlertCircle size={18} className="shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* 3. Result State (The Reveal) */}
          {originalImage.previewUrl && processedImage && (
            <div className="space-y-8 md:space-y-10 animate-fade-in pt-4 md:pt-6">
               <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-6 border-b border-white/5">
                  <div className="space-y-2 w-full md:w-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-white">Your Lip Flip Before &amp; After</h2>
                    <p className="text-pink-200/80 font-light flex items-center gap-2 text-lg">
                      <Sparkles size={16} className="text-pink-500" />
                      Subtle. Natural. You.
                    </p>
                  </div>
                  <div className="flex gap-3 w-full md:w-auto">
                     <button
                      onClick={handleReset}
                      className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-medium transition-colors border border-white/10 flex items-center justify-center gap-2"
                    >
                      <Camera size={16} />
                      <span className="hidden sm:inline">Try Another</span>
                      <span className="sm:hidden">Reset</span>
                    </button>
                    <a
                      href={processedImage}
                      download="lip-flip-before-after-result.jpg"
                      className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                    >
                      <Download size={16} />
                      <span className="hidden sm:inline">Save Photo</span>
                      <span className="sm:hidden">Save</span>
                    </a>
                  </div>
               </div>

              {isCachedResult && (
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-fit text-xs text-emerald-300 animate-fade-in">
                    <Sparkles size={12} />
                    <span>Restored from history</span>
                 </div>
              )}

               <div className="relative">
                 <ComparisonSlider
                   beforeImage={originalImage.previewUrl}
                   afterImage={processedImage}
                   labelBefore="Before"
                   labelAfter="After Lip Flip"
                 />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-pink-500/20 blur-[60px] pointer-events-none" />
               </div>

               <div className="glass-panel p-6 md:p-8 rounded-2xl border-l-2 border-l-pink-500 mt-12">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-pink-500/10 text-pink-400 shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white mb-2">Aesthetic Analysis</h3>
                      <p className="text-slate-300 text-sm leading-relaxed font-light">
                        Our AI has visualized a subtle relaxation of the orbicularis oris muscle (the &apos;lip flip&apos; effect).
                        Notice how the upper vermilion border is gently rolled outward, creating a fuller appearance
                        without the projection associated with fillers. This mimics a natural, hydrated lift.
                      </p>
                    </div>
                  </div>
               </div>

               {/* Post-Result CTA */}
               <div className="mt-20 text-center space-y-6 py-12 border-t border-white/5">
                  <h3 className="text-2xl font-serif text-white">Loving the result?</h3>
                  <p className="text-slate-400 max-w-lg mx-auto px-4">
                    Save your lip flip before and after photo and show it to a licensed aesthetic injector.
                    Visual aids help you get exactly the subtle result you want.
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-pink-400 hover:text-pink-300 font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
                  >
                    <RotateCcw size={16} />
                    Visualize another angle
                  </button>
               </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LipFlipApp;
