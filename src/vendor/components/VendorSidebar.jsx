import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaUserGraduate, FaUser } from "react-icons/fa";
import API from "../../services/api";

const VendorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout clicked");

    const refresh = localStorage.getItem("refresh");

    try {
      if (refresh) {
        await API.post("account/logout/", { refresh });
      }
    } catch (error) {
      console.log("Logout API error:", error?.response || error);
    }

    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="w-56 bg-gray-900 text-white p-5 flex flex-col min-h-full">

      <h2 className="text-xl font-bold mb-6">
        Vendor Panel
      </h2>

      <ul className="space-y-3">

        <li>
          <Link to="/vendor" className="flex items-center gap-2 hover:text-blue-400">
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/vendor/create-course" className="flex items-center gap-2 hover:text-blue-400">
            <FaBook />
            Create Course
          </Link>
        </li>

        <li>
          <Link to="/vendor/courses" className="flex items-center gap-2 hover:text-blue-400">
            <FaBook />
            My Courses
          </Link>
        </li>

        <li>
          <Link to="/vendor/purchases" className="flex items-center gap-2 hover:text-blue-400">
            <FaUserGraduate />
            Students
          </Link>
        </li>

        <li>
          <Link to="/vendor/profile" className="flex items-center gap-2 hover:text-blue-400">
            <FaUser />
            Profile
          </Link>
        </li>

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

export default VendorSidebar;