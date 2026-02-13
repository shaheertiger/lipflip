'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ThankYouRedirect() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="space-y-4">
      <p className="text-slate-500 text-sm">
        Redirecting in {countdown}...
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.7)] transition-all hover:-translate-y-0.5"
      >
        View Your Result
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
    </div>
  );
}
