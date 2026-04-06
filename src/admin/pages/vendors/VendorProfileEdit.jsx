import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const VendorProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState({
    full_name: "",
    phone: "",
    specialization: "",
    experience_years: "",
    bio: ""
  });

  useEffect(() => {
    API.get(`adminside/vendor/${id}/`)
      .then((res) => {
        setVendor({
          full_name: res.data.full_name || "",
          phone: res.data.phone || "",
          specialization: res.data.specialization || "",
          experience_years: res.data.experience_years || "",
          bio: res.data.bio || ""
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.put(`adminside/vendor-update/${id}/`, vendor)
      .then(() => {
        alert("Vendor updated successfully");
        navigate("/admin/vendors");
      })
      .catch((err) => console.log(err.response?.data));
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Vendor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            value={vendor.full_name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="phone"
            value={vendor.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="specialization"
            value={vendor.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="experience_years"
            value={vendor.experience_years}
            onChange={handleChange}
            placeholder="Experience"
            className="border p-2 w-full"
          />

          <textarea
            name="bio"
            value={vendor.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="border p-2 w-full"
          />

          <button type="submit" className="bg-black text-white px-4 py-2">
            Update Vendor
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default VendorProfileEdit;