import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for transparent navbar on home page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${
                scrolled || !isHomePage ? "text-blue-600" : "text-white"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 7v6m0 0l-3-3m3 3l3-3"
              />
            </svg>
            <span
              className={`ml-2 text-xl font-bold ${
                scrolled || !isHomePage ? "text-gray-900" : "text-white"
              }`}
            >
              TourExplorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? scrolled || !isHomePage
                      ? "text-blue-600"
                      : "text-white font-bold"
                    : scrolled || !isHomePage
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tours"
              className={({ isActive }) =>
                `${
                  isActive
                    ? scrolled || !isHomePage
                      ? "text-blue-600"
                      : "text-white font-bold"
                    : scrolled || !isHomePage
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`
              }
            >
              Tours
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive
                    ? scrolled || !isHomePage
                      ? "text-blue-600"
                      : "text-white font-bold"
                    : scrolled || !isHomePage
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive
                    ? scrolled || !isHomePage
                      ? "text-blue-600"
                      : "text-white font-bold"
                    : scrolled || !isHomePage
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                scrolled || !isHomePage
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-200"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className={`ml-4 px-4 py-2 rounded-md transition-colors duration-300 ${
                scrolled || !isHomePage
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled || !isHomePage
                  ? "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-blue-700"
              } transition-colors duration-300`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            Tours
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
