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
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition">
              <IoBookSharp className="text-2xl" />
            </div>
            <span className="font-bold text-3xl text-slate-800">EduConnect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-600  transition">Home</Link>
            <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Profile / Auth */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-slate-600 hover:text-blue-600"
                >
                  <FaUserCircle size={28} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border py-2">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium truncate">{email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 hover:text-blue-600 px-4 py-2">
                  Log in
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-xl">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={24} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-4 py-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-blue-600">Home</Link>
            <Link to="/courses" className="block py-2 hover:text-blue-600">Courses</Link>
            <Link to="/about" className="block py-2 hover:text-blue-600">About</Link>
            <Link to="/contact" className="block py-2 hover:text-blue-600">Contact</Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="w-full mt-3 bg-red-100 text-red-600 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block text-center border py-2 rounded">
                  Log in
                </Link>
                <Link to="/signup" className="block text-center bg-blue-600 text-white py-2 rounded">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;