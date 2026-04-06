import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const VendorProfileView = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    API.get(`adminside/vendor/${id}/`)
      .then((res) => setVendor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!vendor) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Vendor Profile</h2>

        <div className="border p-4 rounded space-y-2">
          <p>
            <strong>Name:</strong> {vendor.full_name}
          </p>
          <p>
            <strong>Email:</strong> {vendor.email}
          </p>
          <p>
            <strong>Phone:</strong> {vendor.phone}
          </p>
          <p>
            <strong>Specialization:</strong> {vendor.specialization}
          </p>
          <p>
            <strong>Experience:</strong> {vendor.experience_years}
          </p>
          <p>
            <strong>Bio:</strong> {vendor.bio}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorProfileView;