import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Navbar.css"
import { IoBookSharp } from "react-icons/io5"

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-container">
        <Link to="/" className="logo">
          <IoBookSharp size={28} style={{marginRight:"8px"}} />
          <h2>EduConnect</h2>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>

      </div>

    </nav>
  )
}

export default Navbar