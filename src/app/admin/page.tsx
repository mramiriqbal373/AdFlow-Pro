export default function AdminPanel() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Ads</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">5,430</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Active Ads</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">4,120</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Reported Issues</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">12</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">System Management</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded p-4 hover:border-blue-500 cursor-pointer transition-colors">
            <h3 className="font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-500 mt-1">Manage roles, ban users, or reset passwords.</p>
          </div>
          <div className="border border-gray-200 rounded p-4 hover:border-blue-500 cursor-pointer transition-colors">
            <h3 className="font-semibold text-gray-900">Category Management</h3>
            <p className="text-sm text-gray-500 mt-1">Add, edit, or remove ad categories.</p>
          </div>
          <div className="border border-gray-200 rounded p-4 hover:border-blue-500 cursor-pointer transition-colors">
            <h3 className="font-semibold text-gray-900">System Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Configure global application settings.</p>
          </div>
          <div className="border border-gray-200 rounded p-4 hover:border-blue-500 cursor-pointer transition-colors">
            <h3 className="font-semibold text-gray-900">Audit Logs</h3>
            <p className="text-sm text-gray-500 mt-1">View system activity and moderator actions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
