import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-blue-950 text-white sticky top-0 z-50">

      <div className="max-w-7xl h-20 mx-auto px-4 py-3 flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center text-4xl font-bold">
          <IoBookSharp className="mr-2 text-5xl" />
          EduConnect
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex gap-8 text-2xl">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/courses" className="hover:text-gray-200">Courses</Link>
          <Link to="/about" className="hover:text-gray-200">About Us</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
        </div>

        {/* profile */}
        <div className="hidden md:flex items-center relative">

          {token ? (
            <>
              <FaUserCircle
                size={30}
                className="cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 top-10 bg-white text-black rounded shadow-lg p-4 w-60 z-50 text-center">

                  <p className="text-sm break-all mb-3">{email}</p>

                  <button
                    onClick={handleLogout}
                    className="bg-blue-800 text-white px-3 py-1 text-sm rounded hover:bg-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-200 text-2xl">
              Login
            </Link>
          )}

        </div>

        {/* hamburger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </div>

      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-950 px-6 pb-6 z-50">

          <div className="flex flex-col gap-4 text-lg items-center">

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            {token ? (
              <>
                <p className="text-sm break-all">{email}</p>

                <button
                  onClick={handleLogout}
                  className="bg-blue-700 py-1 px-4 rounded hover:bg-red-500 w-fit"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;