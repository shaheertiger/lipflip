import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-4xl font-serif text-white">404</h2>
        <p className="text-slate-400 text-sm">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full text-sm font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
