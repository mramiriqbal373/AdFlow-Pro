export default function ModeratorPanel() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Moderator Panel</h1>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pending Approvals</h2>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">3 Pending</span>
        </div>
        
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-900">Premium Laptop Sale #{i}</h3>
                <p className="text-sm text-gray-500 mt-1">Submitted by user_123 • 2 hours ago</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium">
                  Review
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium">
                  Approve
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
