import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const VendorRequest = () => {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    API.get("account/vendor-request/")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  };

  const approveVendor = (id) => {

    if (window.confirm("Approve this vendor?")) {

      API.post(`adminside/approve-vendor/${id}/`)
        .then((res) => {
          alert(res.data.message);
          fetchRequests();
        })
        .catch((err) => console.log(err));

    }

  };

  const deleteRequest = (id) => {

    if (window.confirm("Delete this request?")) {

      API.delete(`adminside/vendor-request-delete/${id}/`)
        .then(() => {
          alert("Request deleted");
          fetchRequests();
        })
        .catch((err) => console.log(err));

    }

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

            {requests.map((r) => (
              <tr key={r.id} className="text-center">

                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.email}</td>

                <td className="p-2 border">
                  {r.status === "approved"
                    ? <span className="text-green-600">Approved</span>
                    : <span className="text-yellow-600">Pending</span>
                  }
                </td>

                <td className="p-2 border">

                  <div className="flex justify-center gap-3">

                    {/* VIEW */}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/profile-view/vendor/${r.vendor}`)
                      }
                    />

                    {/* EDIT */}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/admin/profile-edit/vendor/${r.vendor}`)
                      }
                    />

                    {/* DELETE */}
                    <FaTrash
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteRequest(r.id)}
                    />

                    {/* APPROVE */}
                    {r.status !== "approved" && (
                      <FaCheck
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => approveVendor(r.id)}
                      />
                    )}

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default VendorRequest;