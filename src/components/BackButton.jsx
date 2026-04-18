import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", to = null }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);        // go to specific route
    } else {
      navigate(-1);        // go to previous page
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
    >
      ← {label}
    </button>
  );
};

export default BackButton;