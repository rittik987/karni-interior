"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation"; // To get the current path

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = (href: string) =>
    `relative text-black after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 ${
      pathname === href ? "after:w-full" : "hover:after:w-full"
    }`;

  return (
    <header className="bg-white p-4 pr-8 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left Side - Logo */}
        <div className="text-black ml-10 font-bold text-2xl">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Right Side - Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-black">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About Us
          </Link>
          <Link href="/portfolio" className={getLinkClass("/portfolio")}>
            Portfolio
          </Link>
          <Link href="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link href="/contact" className={getLinkClass("/contact")}>
            Contact Us
          </Link>
        </nav>
        <div></div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden text-black" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {/* Mobile Menu - This will show when the hamburger is clicked */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full bg-blue-600 md:hidden p-4 space-y-4 flex flex-col items-center`}
      >
        <Link href="/" className={getLinkClass("/")} onClick={toggleMenu}>
          Home
        </Link>
        <Link href="/about" className={getLinkClass("/about")} onClick={toggleMenu}>
          About Us
        </Link>
        <Link href="/portfolio" className={getLinkClass("/portfolio")} onClick={toggleMenu}>
          Portfolio
        </Link>
        <Link href="/services" className={getLinkClass("/services")} onClick={toggleMenu}>
          Services
        </Link>
        <Link href="/contact" className={getLinkClass("/contact")} onClick={toggleMenu}>
          Contact Us
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
