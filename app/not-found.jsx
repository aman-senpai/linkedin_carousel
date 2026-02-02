import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-4xl font-black text-gray-900 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 font-bold"
      >
        Return Home
      </Link>
    </div>
  );
}
