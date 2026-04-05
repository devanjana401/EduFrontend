import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const UserProfileEdit = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    role: ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    API.get(`adminside/profile/user/${id}/`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    API.put(`adminside/profile-update/user/${id}/`, user)
      .then(() => {
        alert("User updated successfully");
        navigate("/admin/users");
      })
      .catch(err => console.log(err));
  };

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">Edit User</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-6 rounded w-96"
        >

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Role</label>

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="1">Admin</option>
              <option value="2">Vendor</option>
              <option value="3">User</option>
            </select>

          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => navigate(`/admin/profile-edit/vendor/${user.id}`)}
          >
            Update User
          </button>
          

        </form>

      </div>

    </AdminLayout>
  );
};

export default UserProfileEdit;