import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaDribbble,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:py-2 w-full font-semibold text-center bg-gradient-to-b from-gray-100 to-teal-300 dark:from-gray-800 dark:to-teal-600">
      
      {/* Logo */}
      <div className="mb-4 md:mb-0">
        <a href="/">
          <Image
            className="border border-transparent"
            src="/logo.png"
            alt="logo"
            width={80}
            height={40}
          />
        </a>
      </div>

      {/* Copyright Text */}
      <div className="text-sm md:text-base text-gray-900 dark:text-white mb-4 md:mb-0">
        © 2025-2026 SeiAgentPay™. All Rights Reserved.
      </div>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-4 md:gap-6">
        <a href="https://x.com" target="_blank" rel="noreferrer">
          <FaTwitter className="text-lg md:text-xl cursor-pointer text-white hover:text-blue-600 transition duration-300" />
        </a>
        <a href="https://dribbble.com" target="_blank" rel="noreferrer">
          <FaDribbble className="text-lg md:text-xl cursor-pointer text-white hover:text-blue-600 transition duration-300" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook className="text-lg md:text-xl cursor-pointer text-white hover:text-blue-600 transition duration-300" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram className="text-lg md:text-xl cursor-pointer text-white hover:text-purple-600 transition duration-300" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedin className="text-lg md:text-xl cursor-pointer text-white hover:text-blue-600 transition duration-300" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube className="text-lg md:text-xl cursor-pointer text-white hover:text-red-600 transition duration-300" />
        </a>
      </div>
      
    </div>
  );
}

export default Footer;
