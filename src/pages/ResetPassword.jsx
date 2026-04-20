import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await API.post("account/reset-password/", {
        email,
        new_password: newPassword
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* background */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full blur-2xl opacity-30"></div>

      <div className="max-w-md w-full relative z-10">

        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white">

          {/* header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-slate-500">
              Enter your email and new password
            </p>
          </div>

          {/* error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-4 border border-red-100">
              {error}
            </div>
          )}

          {/* success */}
          {message && (
            <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm mb-4 border border-green-100">
              {message}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleReset} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

          {/* back to login */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Sign in
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;