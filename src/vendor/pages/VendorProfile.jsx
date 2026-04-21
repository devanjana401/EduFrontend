import React, { useEffect, useState } from "react";
import API from "../../services/api";
import VendorLayout from "../components/VendorLayout";

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
        alert("Profile updated successfully");
        setEditMode(false);   // back to view mode
        fetchProfile();       // refresh data
      })
      .catch((err) => console.log(err.response?.data || err));
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Profile</h2>

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* profile view */}
        {!editMode && (
          <div className="grid grid-cols-2 gap-5 text-gray-700">

            <p><strong>Name:</strong> {vendor.full_name}</p>
            <p><strong>Email:</strong> {vendor.email}</p>

            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Experience:</strong> {vendor.experience_years} Years</p>

            <p><strong>Specialization:</strong> {vendor.specialization}</p>

            <p className="col-span-2">
              <strong>Bio:</strong> {vendor.bio}
            </p>

            <p>
              <strong>Certificate:</strong>{" "}
              <a
                href={vendor.certificate_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            </p>

            <p>
              <strong>ID Proof:</strong>{" "}
              <a
                href={vendor.id_proof_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View
              </a>
            </p>

          </div>
        )}

        {/* profile edit */}
        {editMode && (
          <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-5">

            <input
              name="full_name"
              value={vendor.full_name || ""}
              onChange={handleChange}
              className="border p-3 rounded"
              placeholder="Full Name"
            />

            <input
              name="phone"
              value={vendor.phone || ""}
              onChange={handleChange}
              className="border p-3 rounded"
              placeholder="Phone"
            />

            <input
              name="specialization"
              value={vendor.specialization || ""}
              onChange={handleChange}
              className="border p-3 rounded"
              placeholder="Specialization"
            />

            <input
              type="number"
              name="experience_years"
              value={vendor.experience_years || 0}
              onChange={handleChange}
              className="border p-3 rounded"
              placeholder="Experience Years"
            />

            <textarea
              name="bio"
              value={vendor.bio || ""}
              onChange={handleChange}
              className="border p-3 rounded col-span-2"
              placeholder="Bio"
            />

            <div className="col-span-2">
              <label>Certificate</label>
              <input
                type="file"
                name="certificate"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="col-span-2">
              <label>ID Proof</label>
              <input
                type="file"
                name="id_proof"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 bg-green-600 text-white py-3 rounded"
            >
              Save Changes
            </button>

          </form>
        )}

      </div>
    </VendorLayout>
  );
};

export default VendorProfile;