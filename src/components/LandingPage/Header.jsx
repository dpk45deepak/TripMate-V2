import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, LogIn, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`w-full max-w-6xl flex justify-between items-center rounded-2xl transition-all duration-300 mt-2 shadow-xl ${
            scrollY > 80
              ? "backdrop-blur-md shadow-lg py-2 bg-gray-100"
              : "backdrop-blur-sm py-2 bg-white"
          } px-6`}
        >
          {/* Logo */}
                      <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                TripMate
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
                Travel Smart
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "Trips", "Deals", "About", "Contact"].map((item, index) => (
              <motion.a
                key={index}
                // href={`/${item.toLowerCase()}`}
                href="/signin"
                className="font-medium relative py-1 group bg-gradient-to-r from-teal-900 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              className="hidden md:flex bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={18} />
              Search
            </motion.button>

            {/* Sign In */}
            <Link to="/signin">
              <motion.button
                className="hidden md:flex border-2 border-teal-600 text-teal-600 px-6 py-2 rounded-full font-medium hover:bg-teal-600 hover:text-white transition-all duration-300 items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={18} />
                Sign In
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-teal-700"
              onClick={() => setMobileMenuOpen(true)}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={28} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 500 }}
              animate={{ y: 10 }}
              exit={{ y: 300 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-1 right-8 w-4/5 rounded-xl bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex justify-end">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={26} />
                </motion.button>
              </div>
              <nav className="flex flex-col space-y-6 p-8">
                {["Home", "Trips", "Deals", "About", "Contact"].map((item, index) => (
                  <motion.a
                    key={index}
                    // href={`/${item.toLowerCase()}`}
                    href="/signin"
                    className="text-lg font-semibold text-indigo-700 hover:text-blue-600"
                    whileHover={{ x: 5 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}

                {/* Mobile Auth Button */}
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-semibold hover:shadow-lg"
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
