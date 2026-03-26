import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const Vendors = () => {

  const [vendors, setVendors] = useState([]);

  useEffect(() => {

    API.get("vendors/")
      .then(res => setVendors(res.data));

  }, []);

  return (
    <AdminLayout>

      <h2>Vendors</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {vendors.map(v => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.email}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
};

export default Vendors;