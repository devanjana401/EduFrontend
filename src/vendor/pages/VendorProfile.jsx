import React, { useEffect, useState } from "react";
import API from "../../services/api";
import VendorLayout from "../components/VendorLayout";
import Popup from "../../components/Popup";
import BackButton from "../../components/BackButton";

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    API.get("vendorside/profile/")
      .then((res) => setVendor(res.data))
      .catch((err) => console.log(err.response?.data || err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setVendor((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (vendor.full_name) formData.append("full_name", vendor.full_name);
    if (vendor.phone) formData.append("phone", vendor.phone);
    if (vendor.specialization)
      formData.append("specialization", vendor.specialization);
    if (vendor.experience_years !== undefined)
      formData.append("experience_years", vendor.experience_years);
    if (vendor.bio) formData.append("bio", vendor.bio);

    if (vendor.certificate instanceof File) {
      formData.append("certificate", vendor.certificate);
    }

    if (vendor.id_proof instanceof File) {
      formData.append("id_proof", vendor.id_proof);
    }

    API.put("vendorside/profile/update/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        showPopup("Profile updated successfully", "success");
        setEditMode(false);   // back to view mode
        fetchProfile();       // refresh data
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        showPopup(err.response?.data?.error || "Error updating profile", "error");
      });
  };

  if (!vendor) {
    return (
      <VendorLayout>
        <div className="p-10 text-center">Loading...</div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="flex justify-start md:items-start items-center mt-4 ml-4 md:w-[40px] w-[60px]">
        <BackButton/>
      </div>
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-slate-100 relative">

          <Popup
            message={popupMessage}
            type={popupType}
            isOpen={popupOpen}
            onClose={closePopup}
            autoClose={3000}
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">My Profile</h2>

            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md ${
                editMode ? "bg-slate-200 hover:bg-slate-300 text-slate-700" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* profile view */}
          {!editMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Name</p>
                <p className="font-medium text-slate-900">{vendor.full_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Email</p>
                <p className="font-medium text-slate-900">{vendor.email}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Phone</p>
                <p className="font-medium text-slate-900">{vendor.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Experience</p>
                <p className="font-medium text-slate-900">{vendor.experience_years} Years</p>
              </div>

              <div className="space-y-1 md:col-span-2">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Specialization</p>
                <p className="font-medium text-slate-900">{vendor.specialization}</p>
              </div>

              <div className="space-y-1 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Bio</p>
                <p className="leading-relaxed">{vendor.bio}</p>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                <p className="font-semibold text-slate-700">Certificate</p>
                <a
                  href={vendor.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-white px-3 py-1 rounded-lg border border-blue-200 shadow-sm"
                >
                  View Document
                </a>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                <p className="font-semibold text-slate-700">ID Proof</p>
                <a
                  href={vendor.id_proof_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-white px-3 py-1 rounded-lg border border-blue-200 shadow-sm"
                >
                  View Document
                </a>
              </div>

            </div>
          )}

          {/* profile edit */}
          {editMode && (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Full Name</label>
                <input
                  name="full_name"
                  value={vendor.full_name || ""}
                  onChange={handleChange}
                  className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Phone</label>
                <input
                  name="phone"
                  value={vendor.phone || ""}
                  onChange={handleChange}
                  className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Phone"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Specialization</label>
                <input
                  name="specialization"
                  value={vendor.specialization || ""}
                  onChange={handleChange}
                  className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Specialization"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Experience Years</label>
                <input
                  type="number"
                  name="experience_years"
                  value={vendor.experience_years || 0}
                  onChange={handleChange}
                  className="border border-slate-200 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Experience Years"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Bio</label>
                <textarea
                  name="bio"
                  value={vendor.bio || ""}
                  onChange={handleChange}
                  className="border border-slate-200 p-3 rounded-xl w-full min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Bio"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Certificate Update</label>
                <input
                  type="file"
                  name="certificate"
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">ID Proof Update</label>
                <input
                  type="file"
                  name="id_proof"
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 text-sm"
                />
              </div>

              <button
                type="submit"
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 mt-4"
              >
                Save Changes
              </button>

            </form>
          )}

        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorProfile;