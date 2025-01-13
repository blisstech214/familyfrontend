import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <footer className="w-full py-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-800">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="flex flex-col space-y-5 md:w-1/3">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              FamilyConnect Directory
            </h1>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Connecting families through a comprehensive contact directory for
              seamless communication.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-gray-600" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} className="text-gray-600" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition duration-300"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="text-gray-600"
                />
              </a>
            </div>
            <div className="text-gray-600 text-sm md:text-lg mt-4">
              © {new Date().getFullYear()} FamilyConnect. All Rights Reserved.
            </div>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col md:flex-row md:space-x-8 md:w-1/3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h2>
              <div className="flex flex-col font-medium text-gray-800 space-y-2 mt-2">
                <Link
                  to="home"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="sectionC"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Gallery
                </Link>
                <Link
                  to="sectionD"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Events
                </Link>
                <Link
                  to="sectionK"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Policies</h2>
              <div className="flex flex-col font-medium text-gray-800 space-y-2 mt-2">
                <Link
                  to="help"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Help Center
                </Link>
                <Link
                  to="terms"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Terms of Service
                </Link>
                <Link
                  to="legal"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Legal
                </Link>
                <Link
                  to="privacy"
                  smooth={true}
                  duration={500}
                  className="hover:underline cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Call-to-Actions */}
          <div className="space-y-4 flex flex-col md:w-1/3">
            <NavLink
              to="/reg"
              className="w-full md:w-auto text-center cursor-pointer p-3 px-5 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg"
            >
              Join the community
            </NavLink>
            <NavLink
              to="/login"
              className="w-full md:w-auto p-3 px-5 cursor-pointer text-center text-lg font-semibold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-700 hover:text-white shadow-lg"
            >
              Explore Families
            </NavLink>
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hidden mt-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl p-2 rounded-full text-gray-700 bg-gray-200"
          >
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
          {isMenuOpen && (
            <div className="mt-4 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Links
                </h2>
                <div className="flex flex-col font-medium text-gray-800 space-y-2 mt-2">
                  <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Home
                  </Link>
                  <Link
                    to="sectionC"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="sectionD"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Events
                  </Link>
                  <Link
                    to="sectionK"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Policies
                </h2>
                <div className="flex flex-col font-medium text-gray-800 space-y-2 mt-2">
                  <Link
                    to="help"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Help Center
                  </Link>
                  <Link
                    to="terms"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="legal"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Legal
                  </Link>
                  <Link
                    to="privacy"
                    smooth={true}
                    duration={500}
                    className="hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
