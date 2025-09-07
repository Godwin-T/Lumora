import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const SignupForm = ({
  onSignup,
  onCancel,
  onSwitchToLogin,
  error,
  setError,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      await onSignup({ name, email, password });
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
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-400">Sign up to unlock premium features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
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
                placeholder="Create a password"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-500 text-slate-900 rounded-lg hover:bg-emerald-400 disabled:bg-slate-600 disabled:text-gray-400 font-medium transition-all"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
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
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Sign in instead
            </button>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-700">
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Why Join Lumora?
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Access personalized tax advice
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Save your chat history and sessions
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Upload documents for analysis
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Get premium priority support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
