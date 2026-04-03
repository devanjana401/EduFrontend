import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const VendorRequest = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    API.get("account/vendor-request/")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveVendor = (id) => {

    API.post(`adminside/approve-vendor/${id}/`)
      .then((res) => {
        alert(res.data.message);
        fetchRequests();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">Vendor Requests</h2>

        <table className="min-w-full border border-gray-300">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>

            {requests.length > 0 ? (
              requests.map((r) => (
                <tr key={r.id} className="text-center">

                  <td className="p-2 border">{r.id}</td>
                  <td className="p-2 border">{r.email}</td>

                  <td className="p-2 border">
                    {r.status === "approved" ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-2 border">

                    {r.status !== "approved" ? (
                      <button
                        onClick={() => approveVendor(r.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    )}

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No Vendor Requests
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default VendorRequest;