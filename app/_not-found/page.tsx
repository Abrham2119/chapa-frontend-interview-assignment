'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="card w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
        <Link href="/">
    Return to Home
        </Link>
      </div>
    </div>
  );
}