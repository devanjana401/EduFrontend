import React, { useState } from "react";
import VendorSidebar from "./VendorSidebar";
import { FaBars } from "react-icons/fa";

const VendorLayout = ({ children }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <div>

      {/* mobile topbar */}

      <div className="md:hidden bg-gray-900 text-white h-12 flex items-center justify-center relative">

        <div
          className="absolute left-4 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={18} />
        </div>

        <h1 className="text-sm font-semibold">
          Vendor Panel
        </h1>

      </div>


      <div className="flex">

        {/* desktop sidebar */}

        <div className="hidden md:block">
          <VendorSidebar />
        </div>


        {/* mobile sidebar */}

        {menuOpen && (
          <div className="md:hidden absolute z-50">
            <VendorSidebar />
          </div>
        )}


        {/* main content */}

        <div className="flex-1 p-5 bg-gray-100 min-h-screen">
          {children}
        </div>

      </div>

    </div>

  );
};

export default VendorLayout;