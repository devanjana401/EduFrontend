import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const UserProfileView = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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

  if (!user) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-6">User Profile</h2>

        <div className="bg-white shadow p-6 rounded w-96">

          <p className="mb-2">
            <strong>ID:</strong> {user.id}
          </p>

          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mb-2">
            <strong>Role:</strong> 
            {user.role === 1
              ? " Admin"
              : user.role === 2
              ? " Vendor"
              : " User"}
          </p>

          <p className="mb-4">
            <strong>Status:</strong>
            {user.is_active ? (
              <span className="text-green-600 ml-2">Active</span>
            ) : (
              <span className="text-red-600 ml-2">Blocked</span>
            )}
          </p>

        </div>

      </div>

    </AdminLayout>
  );
};

export default UserProfileView;