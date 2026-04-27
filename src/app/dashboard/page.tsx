import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          + Create New Ad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Ads</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Active Ads</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pending Review</h3>
          <p className="text-3xl font-bold text-amber-500 mt-2">4</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Ads</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">Your recent ads will appear here.</p>
        </div>
      </div>
    </div>
  );
}
