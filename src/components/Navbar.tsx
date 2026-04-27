import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-white border-b border-gray-200 text-gray-800 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold text-blue-600">
          AdFlow Pro
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/ads" className="hover:text-blue-600">Explore Ads</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/moderator" className="hover:text-blue-600">Moderator</Link>
          <Link href="/admin" className="hover:text-blue-600">Admin</Link>
        </div>
      </div>
      <div>
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Login
        </Link>
      </div>
    </nav>
  );
}
