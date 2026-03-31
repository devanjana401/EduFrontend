import React, { useEffect, useState } from "react";
import "../css/ScreenButton.css";
import { FaWhatsapp } from "react-icons/fa";


const ScreenButton = () => {

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (

    <div className="screen-buttons">

      {/* WhatsApp button */}

      <a
        href="https://wa.me/+917034165867"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp />

      </a>

      {/* scroll top button */}

      {showTop && (
        <button className="top-btn" onClick={scrollTop}>
          ↑
        </button>
      )}

    </div>

  );
};

export default ScreenButton;