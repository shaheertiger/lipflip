import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, ShieldCheck, Zap, Clock, Sparkles } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CONVINCING_MESSAGES = [
  "🔥 High demand: Only 2 spots left at this price",
  "⭐ 98% of users found this helpful",
  "💎 Medical-grade aesthetic projection",
  "🔒 100% Private & Secure Processing",
  "💸 Save $600+ on consultation fees",
  "✨ Instant reveal - No waiting"
];

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsDiscounted(false);
      setTimeLeft(30);
      setIsProcessing(false);
      setMessageIndex(0);
    }
  }, [isOpen]);

  // Timer & Text Rotation logic
  useEffect(() => {
    let timer: any;
    let messageTimer: any;

    if (isOpen && isDiscounted && timeLeft > 0) {
      // Countdown timer
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      
      // Text rotation timer (every 2.5 seconds)
      messageTimer = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % CONVINCING_MESSAGES.length);
      }, 2500);

    } else if (timeLeft === 0) {
      // Timer expired
    }
    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [isOpen, isDiscounted, timeLeft]);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCloseAttempt = () => {
    if (!isDiscounted) {
      // First attempt to close triggers discount
      setIsDiscounted(true);
    } else {
      // Second attempt actually closes
      onClose();
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate Stripe processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess();
  };

  if (!isOpen) return null;

  const currentPrice = isDiscounted ? 0.49 : 0.99;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleCloseAttempt}
      />

      {/* Modal Content */}
      <div className={`
        relative w-full max-w-md bg-[#0F1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]
        ${isDiscounted ? 'animate-pulse-border border-pink-500/30' : ''}
      `}>
        {/* Discount Banner */}
        {isDiscounted && (
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-center shrink-0">
            <div className="flex items-center justify-center gap-2 text-white font-bold animate-pulse text-sm">
              <Clock size={16} />
              <span>WAIT! Special Offer Ends in {formatTime(timeLeft)}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400">
              <Lock size={16} />
            </div>
            <span className="font-semibold text-white tracking-wide">Secure Checkout</span>
          </div>
          <button 
            onClick={handleCloseAttempt}
            className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Product Summary */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-white font-medium text-lg">Lip Flip Analysis</h3>
              <p className={`text-sm transition-all duration-300 ${isDiscounted ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
                {isDiscounted ? (
                  <span className="flex items-center gap-1.5 animate-fade-in">
                    <Sparkles size={12} />
                    {CONVINCING_MESSAGES[messageIndex]}
                  </span>
                ) : (
                  "Professional AI Visualization"
                )}
              </p>
            </div>
            <div className="text-right">
              {isDiscounted && (
                <span className="block text-slate-500 text-sm line-through decoration-red-500 decoration-2">
                  $0.99
                </span>
              )}
              <span className={`text-2xl font-bold ${isDiscounted ? 'text-pink-400' : 'text-white'}`}>
                ${currentPrice}
              </span>
            </div>
          </div>

          {/* Fake Stripe Elements */}
          <form onSubmit={handlePay} className="space-y-4">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Details</label>
              
              <div className="relative">
                <div className="absolute inset-0 bg-white/[0.03] rounded-xl border border-white/10 pointer-events-none" />
                <div className="relative flex flex-col divide-y divide-white/10">
                  <div className="flex items-center px-4">
                    <CreditCard size={20} className="text-slate-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Card number"
                      className="w-full bg-transparent border-none p-4 text-white placeholder-slate-600 focus:ring-0 text-base md:text-sm"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      inputMode="numeric"
                    />
                  </div>
                  <div className="flex divide-x divide-white/10">
                    <input 
                      type="text" 
                      placeholder="MM / YY"
                      className="w-1/2 bg-transparent border-none p-4 text-white placeholder-slate-600 focus:ring-0 text-base md:text-sm"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="CVC"
                      className="w-1/2 bg-transparent border-none p-4 text-white placeholder-slate-600 focus:ring-0 text-base md:text-sm"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                      inputMode="numeric"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`
                w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all
                ${isDiscounted 
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-pink-500/20' 
                  : 'bg-white hover:bg-slate-100 text-black'
                }
                flex items-center justify-center gap-2 text-lg
              `}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap size={18} className={isDiscounted ? 'fill-white' : 'fill-black'} />
                  Pay ${currentPrice} & Reveal
                </>
              )}
            </button>
          </form>

          {/* Subscription Disclaimer */}
          <div className="space-y-4 pt-2 pb-2">
            <div className="flex items-start gap-2">
               <input type="checkbox" defaultChecked className="mt-1 accent-pink-500 shrink-0" required />
               <p className="text-[10px] text-slate-500 leading-normal text-justify">
                 <strong>Billing Terms:</strong> By clicking "Pay", you agree to a one-time charge of <strong>${currentPrice}</strong> for today's visualization. You also agree to a <strong>recurring weekly subscription of $3.99</strong> for unlimited access to the Aesthetic AI Engine, which will automatically begin 7 days from today. You can cancel anytime in your settings.
               </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck size={12} />
                <span>256-bit SSL Secure</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span>Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};