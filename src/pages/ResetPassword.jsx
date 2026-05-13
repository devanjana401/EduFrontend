import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const ResetPassword = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP + New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const navigate = useNavigate();

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  // Step 1: Send OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("account/request-otp/", { email });
      showPopup(res.data.message, "success");
      setStep(2);
    } catch (err) {
      showPopup(err.response?.data?.error || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Reset Password
  const handleVerifyAndReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("account/verify-reset-password/", {
        email,
        otp,
        new_password: newPassword,
      });
      showPopup(res.data.message, "success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      showPopup(err.response?.data?.error || "Invalid OTP or request", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full blur-2xl opacity-30"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full blur-2xl opacity-30"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white">
          <Popup message={popupMessage} type={popupType} isOpen={popupOpen} onClose={closePopup} autoClose={3000} />

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Reset Password</h2>
            <p className="text-sm text-slate-500">
              {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP sent to your email and your new password"}
            </p>
          </div>

          <form onSubmit={step === 1 ? handleRequestOTP : handleVerifyAndReset} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={step === 2}
                className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${step === 2 ? 'bg-slate-200' : 'bg-slate-50 focus:ring-2 focus:ring-blue-500'}`}
                placeholder="you@example.com"
              />
            </div>

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Enter OTP</label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="6-digit code"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Processing..." : step === 1 ? "Send OTP" : "Reset Password"}
            </button>
            
            {step === 2 && (
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Change Email
              </button>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
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