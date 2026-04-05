import React from "react";
import { Link } from "react-router-dom";

const VendorSidebar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <h2 style={{ marginBottom: "25px", fontWeight: "bold" }}>
        Vendor Panel
      </h2>

      <ul style={{ listStyle: "none", padding: 0, lineHeight: "40px" }}>

        <li>
          <Link to="/vendor" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/vendor/upload-video" style={{ color: "white", textDecoration: "none" }}>
            Upload Video
          </Link>
        </li>

        <li>
          <Link to="/vendor/videos" style={{ color: "white", textDecoration: "none" }}>
            My Videos
          </Link>
        </li>

        <li>
          <Link to="/vendor/students" style={{ color: "white", textDecoration: "none" }}>
            Students
          </Link>
        </li>

        <li>
          <Link to="/vendor/analytics" style={{ color: "white", textDecoration: "none" }}>
            Analytics
          </Link>
        </li>

        <li>
          <Link to="/vendor/profile" style={{ color: "white", textDecoration: "none" }}>
            Profile
          </Link>
        </li>

      </ul>

      <div style={{ marginTop: "auto" }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            background: "#ef4444",
            padding: "8px 12px",
            display: "inline-block",
            borderRadius: "4px"
          }}
        >
          Logout
        </Link>
      </div>

    </div>
  );
};

export default VendorSidebar;