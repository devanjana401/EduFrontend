import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const VendorRequests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    API.get("adminside/vendor-request/")
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  };

  const approveVendor = (id) => {

    API.post(`adminside/vendor-approve/${id}/`)
      .then(() => {
        alert("Vendor Approved");
        fetchRequests();
      })
      .catch(err => console.log(err));

  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">Vendor Requests</h2>

        <table className="min-w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>

            {requests.map(r => (
              <tr key={r.id} className="text-center">

                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.email}</td>
                <td className="p-2 border">{r.status}</td>

                <td className="p-2 border">

                  {r.status !== "approved" && (
                    <button
                      onClick={() => approveVendor(r.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default VendorRequests;