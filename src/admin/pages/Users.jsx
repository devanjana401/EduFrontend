import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API from "../../services/api";

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    API.get("users/")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <AdminLayout>

      <h2>Users</h2>

      <table border="1" width="100%">

        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>

          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
};

export default Users;