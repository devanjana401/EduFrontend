import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const VendorRequestView = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    API.get(`adminside/vendor-request/${id}/`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!request)
    return (
      <AdminLayout>
        <div className="p-10 text-center text-lg font-semibold">Loading...</div>
      </AdminLayout>
    );

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <AdminLayout>
      <div className="p-8 flex justify-center">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Vendor Request Details
          </h2>

          <div className="grid grid-cols-2 gap-5 text-gray-700">

            <p><strong>ID:</strong> {request.id}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[request.status]}`}>
                {request.status}
              </span>
            </p>

            <p><strong>Name:</strong> {request.full_name}</p>
            <p><strong>Email:</strong> {request.email}</p>

            <p><strong>Phone:</strong> {request.phone}</p>
            <p><strong>Experience:</strong> {request.experience_years} Years</p>

            <p><strong>Specialization:</strong> {request.specialization}</p>

            <p className="col-span-2">
              <strong>Bio:</strong> {request.bio}
            </p>

            {request.certificate_url && (
              <p>
                <strong>Certificate:</strong>{" "}
                <a
                  href={request.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Certificate
                </a>
              </p>
            )}

            {request.id_proof_url && (
              <p>
                <strong>ID Proof:</strong>{" "}
                <a
                  href={request.id_proof_url}
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

export default VendorRequestView;