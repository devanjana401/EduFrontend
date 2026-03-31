import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Navbar.css";
import { IoBookSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa"; // profile icon

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* right */}
        <div className="nav-left">
          <Link to="/" className="logo">
            <IoBookSharp size={36} style={{marginRight:"8px"}} />
            <h2>EduConnect</h2>
          </Link>
        </div>

        {/* left */}
        <div className="nav-right">
          <Link to="/">Home</Link>

          {token ? (
            <div className="profile-container">
              <FaUserCircle
                size={32}
                className="profile-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <span className="user-email">{email}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;