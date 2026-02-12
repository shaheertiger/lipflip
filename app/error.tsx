'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-2xl font-serif text-white">Something went wrong</h2>
        <p className="text-slate-400 text-sm">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
