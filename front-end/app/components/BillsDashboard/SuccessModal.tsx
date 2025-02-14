"use client";
import React from "react";

interface SuccessModalProps {
  amount: string;
  stablecoin: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ amount, stablecoin, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-lg z-50 animate-fadeIn p-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md text-white border border-gray-700 relative animate-scaleUp">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition text-xl sm:text-2xl focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-400 text-center mb-3 sm:mb-4 animate-zoomIn">
          Payment Successful!
        </h2>
        <p className="text-gray-300 text-center text-base sm:text-lg animate-fadeIn">
          Your payment of <span className="text-teal-300 font-bold">{amount} {stablecoin}</span> has been processed successfully.
        </p>

        <button
          className="mt-5 sm:mt-6 w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-bold py-2 sm:py-3 px-4 rounded-2xl transition-all shadow-lg animate-slideUp hover:scale-105 active:scale-95 focus:outline-none"
          onClick={onClose}
        >
          🎉 Celebrate & Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
