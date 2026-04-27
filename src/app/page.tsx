import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <main className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to <span className="text-blue-600">AdFlow Pro</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          The next-generation marketplace to discover and post premium advertisements. 
          Fast, reliable, and easy to use.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/ads" 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
          >
            Explore Ads
          </Link>
          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            Post an Ad
          </Link>
        </div>
      </main>
    </div>
  );
}
