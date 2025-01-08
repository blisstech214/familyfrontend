
import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll event to add shadow on scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsScrolledDown(currentScrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolledDown ? "shadow-lg bg-white" : "bg-colorBg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          Family Connect
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center font-semibold gap-10 text-gray-700">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="sectionC"
            smooth={true}
            duration={500}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
          >
            Gallery
          </ScrollLink>
          <ScrollLink
            to="sectionD"
            smooth={true}
            duration={500}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
          >
            Events
          </ScrollLink>
          <ScrollLink
            to="sectionK"
            smooth={true}
            duration={500}
            className="hover:text-blue-500 transition duration-300 cursor-pointer"
          >
            Contact
          </ScrollLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? (
            <AiOutlineClose className="h-6 w-6" />
          ) : (
            <AiOutlineMenu className="h-6 w-6" />
          )}
        </button>

        {/* Login and Signup Buttons */}
        <div className="hidden md:flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 text-sm lg:text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Log in
          </a>
          <a
            href="/reg"
            className="px-4 py-2 text-sm lg:text-base font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg p-5">
          <ul className="flex flex-col space-y-4 text-base font-medium">
            <li>
              <ScrollLink
                to="home"
                smooth={true}
                duration={500}
                className="hover:text-blue-500 transition duration-300 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="sectionC"
                smooth={true}
                duration={500}
                className="hover:text-blue-500 transition duration-300 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="sectionD"
                smooth={true}
                duration={500}
                className="hover:text-blue-500 transition duration-300 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Events
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="sectionK"
                smooth={true}
                duration={500}
                className="hover:text-blue-500 transition duration-300 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </ScrollLink>
            </li>
          </ul>
          <div className="mt-5 flex flex-col space-y-4">
            <a
              href="/login"
              className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Log in
            </a>
            <a
              href="/reg"
              className="w-full text-center px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
