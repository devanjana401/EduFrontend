import React, { useEffect } from "react";

const Popup = ({
  message,
  type = "success",
  isOpen,
  onClose,
  autoClose = 3000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: "border-green-500",
    error: "border-red-500",
    info: "border-blue-500",
  };

  const icons = {
    success: "✔",
    error: "✖",
    info: "ℹ",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* popup */}
      <div
        className={`
          relative z-10
          bg-white/10 backdrop-blur-lg
          border-l-4 ${typeStyles[type]}
          rounded-2xl
          shadow-2xl
          p-6
          w-[90%] max-w-sm
          animate-[fadeInScale_0.3s_ease]
        `}
      >
        <div className="flex items-start gap-4">
          
          {/* icon */}
          <div className="text-xl">
            {icons[type]}
          </div>

          {/* message */}
          <div className="flex-1">
            <p className="text-white text-sm font-medium leading-relaxed">
              {message}
            </p>
          </div>

          {/* close button */}
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-lg transition"
          >
            ✕
          </button>
        </div>
      </div>

      {/* animation */}
      <style>
        {`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(10px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Popup;