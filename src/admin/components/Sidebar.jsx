import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Vendors", path: "/admin/vendors" },
    { name: "Vendor Requests", path: "/admin/vendor-requests" },
    { name: "Categories", path: "/admin/categories" },
    { name: "Course Approval", path: "/admin/courses" }, // optional
  ];

  return (
    <div className="w-56 h-screen bg-gray-800 text-white p-5">
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="block text-white hover:text-blue-400 transition-colors"
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