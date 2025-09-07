export default function Settings({ user }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-400 mb-8">
          Account Settings
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              readOnly
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
            <div>
              <h3 className="font-semibold text-emerald-400">
                Premium Account
              </h3>
              <p className="text-sm text-gray-400">
                Access to advanced features and chat history
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-500 text-slate-900 rounded-full text-sm font-medium">
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
