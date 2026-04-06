import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const VendorRequestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience_years: 0,
    bio: "",
    status: "pending",
    certificate: null,
    id_proof: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`adminside/vendor-request/${id}/`)
      .then((res) => {
        setRequest({ ...res.data, certificate: null, id_proof: null });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setRequest({
      ...request,
      [name]: files ? files[0] : name === "experience_years" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(request).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    API.put(`adminside/vendor-request-update/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        alert("Vendor request updated successfully");
        navigate("/admin/vendor-requests");
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert("Failed to update vendor request");
      });
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Vendor Request</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96 space-y-3">
          <input type="text" name="full_name" value={request.full_name} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full" required />
          <input type="email" name="email" value={request.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" required />
          <input type="text" name="phone" value={request.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" required />
          <input type="text" name="specialization" value={request.specialization} onChange={handleChange} placeholder="Specialization" className="border p-2 w-full" required />
          <input type="number" name="experience_years" value={request.experience_years} onChange={handleChange} placeholder="Experience Years" className="border p-2 w-full" min={0} required />
          <textarea name="bio" value={request.bio} onChange={handleChange} placeholder="Bio" className="border p-2 w-full" rows={3} />

          <div>
            <label className="block mb-1">Certificate</label>
            {request.certificate ? (
              <span>{request.certificate.name}</span>
            ) : request.certificate_url ? (
              <a href={request.certificate_url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">View uploaded certificate</a>
            ) : null}
            <input type="file" name="certificate" onChange={handleChange} className="border p-2 w-full mt-1" />
          </div>

          <div>
            <label className="block mb-1">ID Proof</label>
            {request.id_proof ? (
              <span>{request.id_proof.name}</span>
            ) : request.id_proof_url ? (
              <a href={request.id_proof_url} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">View uploaded ID proof</a>
            ) : null}
            <input type="file" name="id_proof" onChange={handleChange} className="border p-2 w-full mt-1" />
          </div>

          <select name="status" value={request.status} onChange={handleChange} className="border p-2 w-full" required>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Update Vendor Request</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default VendorRequestEdit;