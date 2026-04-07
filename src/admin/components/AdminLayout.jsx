import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

const AdminLayout = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>

      {/* mobile topbar */}
      <div className="md:hidden bg-gray-800 text-white h-12 flex items-center justify-center relative">

        {/* hamburger */}
        <div
          className="absolute left-4 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={18} />
        </div>

        {/* centered title */}
        <h1 className="font-semibold text-sm">
          Admin Panel
        </h1>

      </div>

      <div style={{ display: "flex" }}>

        {/* laptop sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* mobile sidebar */}
        {menuOpen && (
          <div className="md:hidden">
            <Sidebar />
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ padding: "20px" }}>
            {children}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;