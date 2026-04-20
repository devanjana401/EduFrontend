import React from "react";
import { IoBookSharp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* logo & social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 text-white group w-fit">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
                <IoBookSharp className="text-2xl" />
              </div>
              <span className="font-bold text-2xl tracking-tight">EduConnect</span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering learners worldwide with accessible, high-quality education and expert-led courses.
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/courses" className="hover:text-blue-400 transition">Courses</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* about */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">📞</span>
                <span>+91 7034165867</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✉️</span>
                <span>educonnect@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">📍</span>
                <span>Kozhikode, Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} EduConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/cookies" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;