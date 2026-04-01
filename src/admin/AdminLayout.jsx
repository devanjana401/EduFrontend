import React from "react";
import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>
        

        <div style={{ padding: "20px" }}>
          {children}
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;