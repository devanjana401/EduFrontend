import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import API from "../../../services/api";

const VendorProfileView = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    API.get(`adminside/vendor/${id}/`)
      .then((res) => setVendor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!vendor)
    return (
      <AdminLayout>
        <div className="p-10 text-center text-lg font-semibold">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-8 flex justify-center">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Vendor Profile
          </h2>

          <div className="grid grid-cols-2 gap-5 text-gray-700">

            <p><strong>Name:</strong> {vendor.full_name}</p>
            <p><strong>Email:</strong> {vendor.email}</p>

            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Experience:</strong> {vendor.experience_years} Years</p>

            <p><strong>Specialization:</strong> {vendor.specialization}</p>

            <p className="col-span-2">
              <strong>Bio:</strong> {vendor.bio}
            </p>

            {vendor.certificate_url && (
              <p>
                <strong>Certificate:</strong>{" "}
                <a
                  href={vendor.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Certificate
                </a>
              </p>
            )}

            {vendor.id_proof_url && (
              <p>
                <strong>ID Proof:</strong>{" "}
                <a
                  href={vendor.id_proof_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View ID Proof
                </a>
              </p>
            )}

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default VendorProfileView;