import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        AdFlow Pro
      </Link>
      <div>
        <Link href="/login" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Login
        </Link>
      </div>
    </nav>
  );
}
