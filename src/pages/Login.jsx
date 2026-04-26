import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("account/login/", { email, password });

      const { access, role, email: userEmail } = res.data;

      localStorage.setItem("token", access);
      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);

      if (role === 1) navigate("/admin");
      else if (role === 2) navigate("/vendor");
      else navigate("/");

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Invalid credentials";

      if (errorMsg.toLowerCase().includes("invalid")) {
        setError("No account found. Please sign up.");
        setTimeout(() => navigate("/signup"), 1500);
      } else {
        setError(errorMsg);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* decorative background elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full relative">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/50">

          {/* header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500">
              Please sign in to your account
            </p>
          </div>

          {/* error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-start gap-3">
              {error}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700 placeholder-slate-400"
                placeholder="you@example.com"
              />
            </div>

            {/* password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 block">
                  Password
                </label>

                <Link
                  to="/reset-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-slate-700"
                placeholder="••••••••"
              />
            </div>

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 transform ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-blue-500/30"
              }`}
            >
              {loading ? "Signing in..." : "Sign in to account"}
            </button>

          </form>

          {/* footer */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;