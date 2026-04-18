import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = ({ label = "Back", to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    
  <button 
      onClick={handleClick}
      style={{borderRadius : '140px'}}
      className="inline-block px-1 py-1 text-xs text-white bg-blue-600 rounded-full hover:bg-blue-700 transition "
    >
      <IoArrowBackOutline size={"22"}/>
    </button>
  );
};

export default BackButton;