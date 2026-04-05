import React, { useEffect, useState } from "react";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    API.get("adminside/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const blockUser = (id) => {
    API.post(`adminside/block-user/${id}/`)
      .then(() => {

        setUsers(users.map(user =>
          user.id === id ? { ...user, is_active: false } : user
        ));

      })
      .catch(err => console.log(err));
  };

  const unblockUser = (id) => {
    API.post(`adminside/unblock-user/${id}/`)
      .then(() => {

        setUsers(users.map(user =>
          user.id === id ? { ...user, is_active: true } : user
        ));

      })
      .catch(err => console.log(err));
  };

  const deleteUser = (id) => {

    if (window.confirm("Delete this user?")) {

      API.delete(`adminside/profile-delete/user/${id}/`)
        .then(() => {
          alert("User deleted");
          fetchUsers();
        })
        .catch(err => console.log(err));

    }

  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">Users</h2>

        <table className="min-w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user.id} className="text-center">

                <td className="p-2 border">{user.id}</td>

                <td className="p-2 border">{user.email}</td>

                <td className="p-2 border">
                  {user.role === 1
                    ? "Admin"
                    : user.role === 2
                    ? "Vendor"
                    : "User"}
                </td>

                <td className="p-2 border">
                  {user.is_active ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  )}
                </td>

                <td className="p-2 border">

                  <div className="flex justify-center gap-3">

                    {/* VIEW */}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/profile-view/user/${user.id}`)}
                    />

                    {/* EDIT */}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/profile-edit/user/${user.id}`)}
                    />

                    {/* DELETE */}
                    <FaTrash
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteUser(user.id)}
                    />

                    {/* BLOCK / UNBLOCK */}
                    {user.is_active ? (
                      <button
                        onClick={() => blockUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-1 py-0.5 rounded text-xs"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => unblockUser(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Unblock
                      </button>
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

export default Users;