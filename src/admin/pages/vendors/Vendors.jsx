import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Vendors = () => {

  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = () => {
    API.get("adminside/vendors/")
      .then(res => setVendors(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this vendor?")) {

      API.delete(`adminside/profile-delete/vendor/${id}/`)
        .then(() => {
          alert("Vendor deleted");
          fetchVendors();
        })
        .catch(err => console.log(err));

    }
  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">Vendors</h2>

        <table className="min-w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Specialization</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>

            {vendors.map((v) => (
              <tr key={v.id} className="text-center">

                <td className="p-2 border">{v.id}</td>
                <td className="p-2 border">{v.full_name}</td>
                <td className="p-2 border">{v.email}</td>
                <td className="p-2 border">{v.phone}</td>
                <td className="p-2 border">{v.specialization}</td>

                <td className="p-2 border">
                  <div className="flex justify-center gap-3">

                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/profile-view/vendor/${v.id}`)}
                    />

                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/profile-edit/vendor/${v.id}`)}
                    />

                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(v.id)}
                    />

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

export default Vendors;