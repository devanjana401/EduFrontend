import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaVideo, FaBook, FaUserGraduate, FaChartBar, FaUser } from "react-icons/fa";

const VendorSidebar = () => {
  return (

    <div className="w-56 h-screen bg-gray-900 text-white p-5 flex flex-col">

      <h2 className="text-xl font-bold mb-6">
        Vendor Panel
      </h2>

      <ul className="space-y-3">

        <li>
          <Link
            to="/vendor"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/vendor/create-course"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaBook />
            Create Course
          </Link>
        </li>

        <li>
          <Link
            to="/vendor/courses"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaBook />
            My Courses
          </Link>
        </li>

        {/* <li>
          <Link
            to="/vendor/upload-video"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaVideo />
            Upload Video
          </Link>
        </li> */}

        {/* <li>
          <Link
            to="/vendor/videos"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaVideo />
            My Videos
          </Link>
        </li> */}

        <li>
          <Link
            to="/vendor/purchases"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaUserGraduate />
            Students
          </Link>
        </li>

        <li>
          <Link
            to="/vendor/profile"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaUser />
            Profile
          </Link>
        </li>

      </ul>

      <div className="mt-auto pt-6">

        <Link
          to="/"
          className="bg-red-500 px-3 py-2 rounded text-sm block text-center"
        >
          Logout
        </Link>

      </div>

    </div>

  );
};

export default VendorSidebar;