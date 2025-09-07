import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  onLogin,
  onCancel,
  onSwitchToSignup,
  error,
  setError,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await onLogin({ username, password });
    } finally {
      setIsLoading(false);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        {error && (
          <div className="bg-red-600 text-white text-center py-2 px-4 rounded mb-4">
            {error}
          </div>
        )}
        <div className="text-center mb-3">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">Login to access your premium features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-500 bg-slate-700 border-slate-600 rounded focus:ring-emerald-400 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Forgot password?
            </a>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-500 text-slate-900 rounded-lg hover:bg-emerald-400 disabled:bg-slate-600 disabled:text-gray-400 font-medium transition-all"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
          >
            Continue as Guest
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
