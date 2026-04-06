import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../AdminLayout";
import API from "../../../services/api";

const UserProfileView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`adminside/user/${id}/`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!user)
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="bg-white shadow p-6 rounded w-96">
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {user.role === 1 ? "Admin" : user.role === 2 ? "Vendor" : "User"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {user.is_active ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-red-600">Blocked</span>
            )}
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserProfileView;