'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Lock, ShieldCheck, Zap } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Inner checkout form that uses Stripe hooks
function CheckoutForm({ clientSecret, onSuccess }: { clientSecret: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    } else {
      // Payment succeeded — trigger subscription creation (fire-and-forget)
      const paymentIntentId = clientSecret.split('_secret_')[0];
      fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId }),
      }).catch(() => {
        // Webhook will handle it as fallback
      });

      setIsProcessing(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Details</label>
        <div className="bg-white rounded-xl p-4">
          <PaymentElement
            options={{
              layout: 'tabs',
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 rounded-xl font-bold shadow-lg transition-all bg-white hover:bg-slate-100 text-black flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Zap size={18} className="fill-black" />
            Pay $0.99 & Reveal
          </>
        )}
      </button>
    </form>
  );
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async () => {
    setLoadingIntent(true);
    setIntentError(null);
    setClientSecret(null);
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 99 }), // $0.99 = 99 cents
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment.');
      }
      setClientSecret(data.clientSecret);
    } catch (err: unknown) {
      setIntentError(err instanceof Error ? err.message : 'Failed to initialize payment.');
    } finally {
      setLoadingIntent(false);
    }
  }, []);

  // Create intent when modal opens
  useEffect(() => {
    if (isOpen) {
      setClientSecret(null);
      setIntentError(null);
      createPaymentIntent();
    }
  }, [isOpen, createPaymentIntent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#0F1115] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-400">
              <Lock size={16} />
            </div>
            <span className="font-semibold text-white tracking-wide">Secure Checkout</span>
          </div>
          <button
            onClick={onClose}
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
              <p className="text-sm text-slate-400">Professional AI Visualization</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">$0.99</span>
            </div>
          </div>

          {/* Stripe Payment Form */}
          {loadingIntent && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-slate-400 text-sm">Initializing secure payment...</span>
            </div>
          )}

          {intentError && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-center">
              {intentError}
            </div>
          )}

          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#ec4899',
                    colorBackground: '#1a1a2e',
                    colorText: '#ffffff',
                    colorDanger: '#f87171',
                    borderRadius: '12px',
                    fontFamily: 'system-ui, sans-serif',
                  },
                },
              }}
            >
              <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
            </Elements>
          )}

          {/* Billing disclaimer + footer */}
          <div className="space-y-4 pt-2 pb-2">
            <div className="flex items-start gap-2">
              <input type="checkbox" defaultChecked className="mt-0.5 accent-pink-500 shrink-0" />
              <p className="text-[10px] text-slate-500 leading-normal">
                By paying, you agree to a one-time charge of $0.99. After 7 days, your access converts to $0.99/week. Cancel anytime.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck size={12} />
                <span>256-bit SSL Secure</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
