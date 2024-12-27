'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // For detecting the current route

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold text-yellow-500 hover:text-yellow-600 cursor-pointer transition duration-300">
          KARNI INTERIORS
        </h1>

        {/* Navigation Links for Larger Screens */}
        <nav className="hidden md:flex md:space-x-8 items-center">
          {[
            { name: 'HOME', href: '/' },
            { name: 'ABOUT US', href: '/about' },
            { name: 'PORTFOLIO', href: '/portfolio' },
            { name: 'CONTACT', href: '/contact' },
            { name: 'GALLERY', href: '/gallery' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-serif font-bold ${
                pathname === link.href
                  ? 'text-yellow-500'
                  : 'text-black hover:text-yellow-500'
              } transition duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden block text-gray-700 focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? 'M6 18L18 6M6 6l12 12' // X icon
                  : 'M4 6h16M4 12h16M4 18h16' // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Fullscreen Menu for Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8">
          {[
            { name: 'HOME', href: '/' },
            { name: 'ABOUT US', href: '/about' },
            { name: 'PORTFOLIO', href: '/portfolio' },
            { name: 'CONTACT', href: '/contact' },
            { name: 'GALLERY', href: '/gallery' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className={`text-2xl font-serif font-bold ${
                pathname === link.href
                  ? 'text-yellow-500'
                  : 'text-black hover:text-yellow-500'
              } transition duration-300`}
            >
              {link.name}
            </Link>
          ))}

          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="text-gray-700 focus:outline-none mt-8"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;