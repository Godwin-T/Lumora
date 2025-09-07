import {
  MessageCircle,
  Settings,
  User,
  Plus,
  LogOut,
  X,
  Menu,
} from "lucide-react";

const Header = ({
  user,
  currentView,
  setCurrentView,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onCreateNewSession,
  canCreateNew,
}) => {
  const navItems = [
    !user ? { id: "chat", label: "Chat", icon: MessageCircle } : null,
    ...(user?.isPremium
      ? [{ id: "dashboard", label: "Dashboard", icon: User }]
      : []),
    ...(user ? [{ id: "settings", label: "Settings", icon: Settings }] : []),
  ].filter(Boolean);

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left Section: Logo */}
        <div className="flex items-center justify-center">
          <button
            onClick={onCreateNewSession}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-slate-900" />
            </div>
            <h1 className="text-xl font-bold text-emerald-400">Lumora</h1>
          </button>
        </div>

        {/* Right Section: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                currentView === item.id
                  ? "bg-emerald-500 text-slate-900"
                  : "text-gray-300 hover:text-emerald-400 hover:bg-slate-700"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}

          {canCreateNew && (
            <button
              onClick={onCreateNewSession}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-100 text-slate-900 rounded-full hover:bg-emerald-500 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">{user.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView("login")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                currentView === "login"
                  ? "bg-emerald-500 text-slate-900"
                  : "text-gray-300 hover:text-emerald-400 hover:bg-slate-700"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-emerald-400 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-all ${
                  currentView === item.id
                    ? "bg-emerald-500 text-slate-900"
                    : "text-gray-300 hover:text-emerald-400 hover:bg-slate-700"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}

            {canCreateNew && (
              <button
                onClick={() => {
                  onCreateNewSession();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 bg-emerald-100 text-slate-900 rounded-lg hover:bg-emerald-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
              </button>
            )}

            <div className="pt-4 border-t border-slate-700">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-sm text-gray-400">
                    Logged in as {user.name}
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCurrentView("login");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg 
                    ${
                      currentView === "login"
                        ? "bg-emerald-500 text-slate-900"
                        : "text-gray-300 hover:text-emerald-400 hover:bg-slate-700"
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
