import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}
    >
      <h3>Admin</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>

        <li>
          <Link to="/admin/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/users" style={{ color: "white" }}>
            Users
          </Link>
        </li>

        <li>
          <Link to="/admin/vendors" style={{ color: "white" }}>
            Vendors
          </Link>
        </li>

        <li>
          <Link to="/admin/vendor-requests" style={{ color: "white" }}>
            Vendor Requests
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;