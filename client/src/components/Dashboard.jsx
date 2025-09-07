import { MessageCircle, Plus, Clock, FileText } from "lucide-react";
import FileUpload from "./FileUpload";

const Dashboard = ({
  user,
  chatSessions,
  onSelectSession,
  onCreateNewSession,
  onDeleteSession,
}) => {
  const handleFileSelect = (file) => {
    const fileMessage = {
      id: Date.now(),
      text: `Uploaded: ${file.name}`,
      file: file,
      isBot: false,
      timestamp: Date.now(),
    };
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-0">
      {/* Header */}
      <div className="mb-4 md:mb-8">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-400">
          Manage your conversations and access your personalized tax assistance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Conversations</p>
              <p className="text-2xl font-bold text-emerald-400">
                {chatSessions.length}
              </p>
            </div>
            <MessageCircle className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-emerald-400">
                {
                  chatSessions.filter((s) => {
                    const thisMonth = new Date();
                    thisMonth.setDate(1);
                    return s.timestamp >= thisMonth;
                  }).length
                }
              </p>
            </div>
            <Clock className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Account Type</p>
              <p className="text-2xl font-bold text-emerald-400">Premium</p>
            </div>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-slate-900 font-bold">P</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-4 md:mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onCreateNewSession}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 p-4 rounded-xl flex items-center space-x-3 transition-all cursor-pointer group"
          >
            <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Start New Chat</span>
          </button>

          <FileUpload
            onFileSelect={handleFileSelect}
            variant="button"
            label="Upload Document"
          />

          {/* <button className="bg-slate-800 hover:bg-slate-700 text-gray-200 p-4 rounded-xl flex items-center space-x-3 transition-all border border-slate-700 group">
            <MessageCircle className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Tax Calculator</span>
          </button> */}
        </div>
      </div>

      {/* Recent Conversations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Recent Conversations
        </h2>
        <div className="grid gap-4">
          {chatSessions.length > 0 ? (
            chatSessions.map((session) => (
              <div
                key={session.id}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-6 text-left transition-all group flex justify-between items-start"
              >
                <button
                  onClick={() => onSelectSession(session)}
                  className="flex-1 text-left"
                >
                  <h3 className="font-semibold text-gray-200 mb-2 group-hover:text-emerald-400 transition-colors">
                    {session.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(session.timestamp)}
                    <span className="mx-2">•</span>
                    <span>{session.messages.length} messages</span>
                  </div>
                </button>

                <button
                  onClick={() => onDeleteSession(session.id)}
                  className="ml-4 text-red-50 hover:text-red-100 cursor-pointer  bg-red-500 rounded-lg flex items-center justify-center w-6 h-6"
                  title="Delete conversation"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
              <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No conversations yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start your first conversation to get personalized tax advice
              </p>
              <button
                onClick={onCreateNewSession}
                className="px-6 py-3 bg-emerald-500 text-slate-900 rounded-lg hover:bg-emerald-400 transition-all cursor-pointer font-medium"
              >
                Start First Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
