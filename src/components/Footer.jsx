import React from "react";
import { IoBookSharp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../css/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">


      <div className="footer-container">

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Our Vision</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Teachers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>+91 7034165867</li>
            <li>educonnect@gmail.com</li>
            <li>Kozhikode, India</li>
          </ul>
        </div>

        <div className="footer-section logo-section">
          <Link to="/" className="footer-logo">
            <IoBookSharp size={30} />
            <h2>EduConnect</h2>
          </Link>

          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 EduConnect. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;