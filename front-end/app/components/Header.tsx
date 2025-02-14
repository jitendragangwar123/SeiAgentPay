"use client";
import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useTheme();
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-10 flex justify-between items-center px-4 py-2 md:px-10 md:py-2 bg-gradient-to-b from-gray-100 to-teal-300 dark:from-gray-800 dark:to-teal-600">
        <div className="flex items-center gap-4">
          <Link href="/" legacyBehavior>
            <a>
              <Image src="/logo.png" alt="logo" width={80} height={40} className="border border-transparent" />
            </a>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link href="/" legacyBehavior>
            <a className="text-blue-900 dark:text-white text-base md:text-lg lg:text-xl hover:underline">Home</a>
          </Link>
          <Link href="/faucets" legacyBehavior>
            <a className="text-blue-900 dark:text-white text-base md:text-lg lg:text-xl hover:underline">Faucet</a>
          </Link>
          <Link href="/bills-dashboard" legacyBehavior>
            <a className="text-blue-900 dark:text-white text-base md:text-lg lg:text-xl hover:underline">Dashboard</a>
          </Link>
        </nav>
        <div className="hidden md:flex ml-6">
          <w3m-button />
        </div>
        <div className="md:hidden">
          <button
            title="Toggle Menu"
            onClick={toggleMenu}
            className="flex flex-col gap-1.5"
          >
            <div
              className={`w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${theme === "dark" ? "bg-white" : "bg-black"
                } ${openMenu ? "rotate-45 translate-y-1.5" : "rotate-0"}`}
            ></div>
            <div
              className={`w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${theme === "dark" ? "bg-white" : "bg-black"
                } ${openMenu ? "opacity-0" : "opacity-100"}`}
            ></div>
            <div
              className={`w-6 h-0.5 rounded transition-all duration-300 ease-in-out ${theme === "dark" ? "bg-white" : "bg-black"
                } ${openMenu ? "-rotate-45 -translate-y-1.5" : "rotate-0"}`}
            ></div>
          </button>
        </div>
        <div
          className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ${openMenu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
            } md:hidden`}
        >
          <nav className="flex flex-col items-center gap-4 py-4">
            <Link href="/" legacyBehavior>
              <a className="text-blue-900 dark:text-white text-lg hover:underline" onClick={toggleMenu}>
                Home
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-blue-900 dark:text-white text-lg hover:underline" onClick={toggleMenu}>
                Faucet
              </a>
            </Link>
            <Link href="/landing-page" legacyBehavior>
              <a className="text-blue-900 dark:text-white text-lg hover:underline" onClick={toggleMenu}>
                Dashboard
              </a>
            </Link>
            <w3m-button />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
