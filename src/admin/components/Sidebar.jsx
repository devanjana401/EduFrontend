import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Vendors", path: "/admin/vendors" },
    { name: "Vendor Requests", path: "/admin/vendor-requests" },
    { name: "Categories", path: "/admin/categories" },

    // course sections
    { name: "Pending Courses", path: "/admin/courses" }, 
    { name: "Approved Courses", path: "/admin/approved-courses" }, 
  ];

  return (
    <div className="w-56 min-h-screen bg-gray-800 text-white p-5">
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
    </div>
  );
};

export default Sidebar;