import type { Metadata } from 'next';
import { ThankYouRedirect } from './ThankYouRedirect';

export const metadata: Metadata = {
  title: 'Thank You for Your Purchase | Lip Flip Before and After Visualizer',
  description:
    'Your lip flip before and after visualization is being generated. Thank you for your purchase!',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative text-center space-y-8 max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
          <svg
            className="w-10 h-10 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-white">
          Payment Successful!
        </h1>

        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          Thank you for your purchase. Redirecting you to your result...
        </p>

        <ThankYouRedirect />

        <p className="text-xs text-slate-500">
          A receipt has been sent to your email by Stripe.
        </p>
      </div>
    </div>
  );
}
