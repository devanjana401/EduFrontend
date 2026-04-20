import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Popup from "../components/Popup";

const VendorSignup = () => {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    bio: "",
    experience_years: "",
    specialization: ""
  });

  const [certificate, setCertificate] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === "certificate") setCertificate(e.target.files[0]);
    if (type === "id_proof") setIdProof(e.target.files[0]);
  };

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (certificate) data.append("certificate", certificate);
    if (idProof) data.append("id_proof", idProof);

    try {
      await API.post("account/vendor-request/", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      showPopup("Request submitted successfully! Redirecting...", "success");

      setTimeout(() => navigate("/login"), 2500);

    } catch (err) {
      showPopup(err.response?.data?.message || "Failed to submit request", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative">

      {/* header bg */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900 to-slate-50 z-0"></div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* header */}
        <div className="text-center mb-10 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Become an Instructor
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto">
            Share your knowledge with thousands of students worldwide.
          </p>
        </div>

        {/* card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">

            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* personal */}
              <div className="space-y-5">

                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                  Personal Details
                </h3>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

              </div>

              {/* professional */}
              <div className="space-y-5">

                <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                  Professional Details
                </h3>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Experience (Years)
                  </label>
                  <input
                    name="experience_years"
                    value={formData.experience_years}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Specialization
                  </label>
                  <input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

              </div>

            </div>

            {/* uploading files */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Certificate
                </label>
                <label className="p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer hover:border-blue-500 block">
                  📄
                  <div className="text-blue-600 font-semibold mt-2">
                    {certificate ? certificate.name : "Upload Certificate"}
                  </div>
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, "certificate")}
                  />
                </label>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  ID Proof
                </label>
                <label className="p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer hover:border-blue-500 block">
                  🪪
                  <div className="text-blue-600 font-semibold mt-2">
                    {idProof ? idProof.name : "Upload ID Proof"}
                  </div>
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, "id_proof")}
                  />
                </label>
              </div>

            </div>

            {/* footer */}
            <div className="flex items-center justify-between border-t pt-6">

              <Link
                to="/login"
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                ← Back to Sign in
              </Link>

              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3.5 text-white font-semibold rounded-xl shadow-lg transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
                }`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default VendorSignup;