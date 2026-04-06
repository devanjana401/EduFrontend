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
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Vendor Request Details</h2>
        <div className="bg-white p-6 rounded shadow w-96 space-y-2">
          <p><strong>ID:</strong> {request.id}</p>
          <p><strong>Name:</strong> {request.full_name}</p>
          <p><strong>Email:</strong> {request.email}</p>
          <p><strong>Phone:</strong> {request.phone}</p>
          <p><strong>Bio:</strong> {request.bio}</p>
          <p><strong>Specialization:</strong> {request.specialization}</p>
          <p><strong>Experience:</strong> {request.experience_years}</p>
          <p><strong>Status:</strong> {request.status}</p>

          {request.certificate_url && (
            <p>
              <strong>Certificate:</strong>{" "}
              <a href={request.certificate_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Certificate</a>
            </p>
          )}

          {request.id_proof_url && (
            <p>
              <strong>ID Proof:</strong>{" "}
              <a href={request.id_proof_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View ID Proof</a>
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorRequestView;