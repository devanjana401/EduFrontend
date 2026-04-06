import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const VendorProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: 0,
    bio: "",
    certificate: null,
    id_proof: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`adminside/vendor/${id}/`)
      .then((res) => {
        setVendor({
          ...res.data,
          certificate: null,
          id_proof: null,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setVendor({
      ...vendor,
      [name]: files
        ? files[0]
        : name === "experience_years"
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(vendor).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    API.put(`adminside/vendor-update/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("Vendor updated successfully");
        navigate("/admin/vendors");
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert("Failed to update vendor");
      });
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="p-10 text-center text-lg font-semibold">
          Loading...
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Edit Vendor
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

            <input
              type="text"
              name="full_name"
              value={vendor.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="email"
              name="email"
              value={vendor.email}
              onChange={handleChange}
              placeholder="Email"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="phone"
              value={vendor.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="specialization"
              value={vendor.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="number"
              name="experience_years"
              value={vendor.experience_years}
              onChange={handleChange}
              placeholder="Experience Years"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              min={0}
              required
            />

            <textarea
              name="bio"
              value={vendor.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows={3}
              className="border rounded-lg p-3 col-span-2 focus:ring-2 focus:ring-blue-400"
            />

            {/* Certificate */}
            <div className="col-span-2">
              <label className="font-medium text-gray-700">Certificate</label>

              {vendor.certificate_url && (
                <div className="mb-2">
                  <a
                    href={vendor.certificate_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Uploaded Certificate
                  </a>
                </div>
              )}

              <input
                type="file"
                name="certificate"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
            </div>

            {/* ID Proof */}
            <div className="col-span-2">
              <label className="font-medium text-gray-700">ID Proof</label>

              {vendor.id_proof_url && (
                <div className="mb-2">
                  <a
                    href={vendor.id_proof_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Uploaded ID Proof
                  </a>
                </div>
              )}

              <input
                type="file"
                name="id_proof"
                onChange={handleChange}
                className="border rounded-lg p-3 w-full"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Update Vendor
            </button>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorProfileEdit;