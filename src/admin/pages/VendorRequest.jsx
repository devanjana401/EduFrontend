import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const VendorRequests = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    API.get("vendor-request/")
      .then(res => setRequests(res.data));

  }, []);

  const approveVendor = (id) => {

    API.post(`vendor-approve/${id}/`)
      .then(() => alert("Vendor Approved"));

  };

  return (
    <AdminLayout>

      <h2>Vendor Requests</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {requests.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.email}</td>
              <td>{r.status}</td>

              <td>
                <button onClick={() => approveVendor(r.id)}>
                  Approve
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
};

export default VendorRequests;