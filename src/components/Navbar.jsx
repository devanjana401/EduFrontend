import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBookSharp, IoSearchOutline } from "react-icons/io5";
import { FaUserCircle, FaBars } from "react-icons/fa";
import API from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Fetch courses for search suggestions
    const fetchCourses = async () => {
      try {
        const res = await API.get("userside/public-courses/");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses for search", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = courses.filter((course) =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // show up to 5 suggestions
    }
  }, [searchQuery, courses]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (courseId) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(`/course/${courseId}`);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition">
              <IoBookSharp className="text-2xl" />
            </div>
            <span className="font-bold text-2xl lg:text-3xl text-slate-800 hidden sm:block">EduConnect</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8 relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            </form>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50">
                <ul className="divide-y divide-slate-100">
                  {suggestions.map((course) => (
                    <li key={course.id}>
                      <button
                        onClick={() => handleSuggestionClick(course.id)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center gap-3"
                      >
                        <div className="h-10 w-10 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                          {course.coverphoto ? (
                            <img src={`https://educonnectapi.anjanasasi.online${course.coverphoto}`} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <IoBookSharp className="h-full w-full p-2 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{course.coursename}</p>
                          <p className="text-xs text-slate-500 truncate">{course.headline || "Course"}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                  <li className="px-4 py-2 bg-slate-50 text-center">
                    <button 
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      See all results for "{searchQuery}"
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 font-medium text-slate-600 flex-shrink-0">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/courses" className="hover:text-blue-600 transition">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>

          {/* Profile / Auth */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-4">
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
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-slate-600 hover:text-blue-600 px-3 py-2 whitespace-nowrap">
                  Log in
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2.5 rounded-xl whitespace-nowrap">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FaBars size={24} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-4 py-4 space-y-3">
            
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            </form>

            <Link to="/" className="block py-2 hover:text-blue-600 font-medium border-b border-slate-50">Home</Link>
            <Link to="/courses" className="block py-2 hover:text-blue-600 font-medium border-b border-slate-50">Courses</Link>
            <Link to="/about" className="block py-2 hover:text-blue-600 font-medium border-b border-slate-50">About</Link>
            <Link to="/contact" className="block py-2 hover:text-blue-600 font-medium border-b border-slate-50">Contact</Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="w-full mt-3 bg-red-50 text-red-600 py-3 rounded-xl font-semibold"
              >
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link to="/login" className="block text-center border border-slate-200 py-2.5 rounded-xl font-semibold">
                  Log in
                </Link>
                <Link to="/signup" className="block text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;