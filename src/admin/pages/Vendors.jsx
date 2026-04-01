import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const Vendors = () => {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    API.get("adminside/vendors/")
      .then(res => setVendors(res.data))
      .catch(err => console.log(err));

  }, []);

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
            </tr>
          </thead>

          <tbody>

            {vendors.map(v => (
              <tr key={v.id} className="text-center">

                <td className="p-2 border">{v.id}</td>
                <td className="p-2 border">{v.full_name}</td>
                <td className="p-2 border">{v.user?.email}</td>
                <td className="p-2 border">{v.phone}</td>
                <td className="p-2 border">{v.specialization}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default Vendors;