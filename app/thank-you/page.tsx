import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

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
    <>
      <Script id="gtag-thank-you-conversion" strategy="afterInteractive">
        {`gtag('event', 'page_view', { 'send_to': 'AW-11410655364' });`}
      </Script>
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
          Thank you for your purchase. Your AI-powered lip flip before and after
          visualization is being generated now.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.7)] transition-all hover:-translate-y-0.5"
        >
          View Your Result
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="text-xs text-slate-500">
          A receipt has been sent to your email by Stripe.
        </p>
      </div>
    </div>
    </>
  );
}
