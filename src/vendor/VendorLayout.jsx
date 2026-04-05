import React from "react";
import VendorSidebar from "./components/VendorSidebar";

const VendorLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>

      <VendorSidebar />

      <div style={{ flex: 1 }}>

        <div style={{ padding: "20px" }}>
          {children}
        </div>

      </div>

    </div>
  );
};

export default VendorLayout;