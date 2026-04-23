import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Vendors", path: "/admin/vendors" },
    { name: "Vendor Requests", path: "/admin/vendor-requests" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Pending Courses", path: "/admin/courses" },
    { name: "Approved Courses", path: "/admin/approved-courses" },
    { name: "Purchased Users", path: "/admin/purchases" },
  ];

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");

    try {
      if (refresh) {
        await API.post("account/logout/", { refresh });
      }
    } catch (error) {
      console.log("Logout error:", error?.response || error);
    }

    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="w-56 bg-gray-800 text-white p-5 flex flex-col min-h-full">

      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-2 py-1 rounded transition-colors ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "hover:text-blue-400"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-2 rounded text-sm w-full"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;