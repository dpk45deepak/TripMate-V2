import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

// imported files 
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";

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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 80
            ? "backdrop-blur-md shadow-lg py-3"
            : "backdrop-blur-sm py-3"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href=""
            className="relative text-2xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent 
                      whitespace-nowrap overflow-hidden pr-2
                      [animation:typing_3s_steps(8,theme(colors.transparent))_forwards]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            TripMate
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden bg-transparent md:flex space-x-8 backdrop-blur-sm px-6 py-1 rounded-md">
            {["Home", "Trips", "Deals", "About", "Contact"].map((item, index) => (
              <motion.a
                key={index}
                href={`${item.toLowerCase()}`}
                className="font-medium transition-colors duration-300 relative py-1 group 
                bg-gradient-to-r from-teal-900 via-blue-500 to-indigo-600 bg-clip-text text-transparent
                hover:from-teal-900 hover:via-blue-600 hover:to-indigo-700"
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

            {/* 🔑 Sign In Button */}
            <Link to="/signin">
              <motion.button
                className="hidden md:flex border-2 border-teal-900 text-teal-900 px-6 py-2 rounded-full font-medium hover:bg-teal-600 text-white transition-all duration-300 items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={18} />
                Sign In
              </motion.button>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-teal-900"
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
              initial={{ y: -500 }} // start from above
              animate={{ y: 0 }}    // slide down into place
              exit={{ y: -300 }}    // exit upwards
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-2 right-4 h-auto w-2/3 rounded-xl bg-gradient-to-b from-white via-blue-50 to-indigo-100 shadow-xl"
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
                    href={`#${item.toLowerCase()}`}
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























            {/* Header
      <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Globe className="text-teal-600 mr-2" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
              AdventureQuest
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-teal-600 font-medium">Home</a>
            <a href="#destinations" className="text-gray-700 hover:text-teal-600 font-medium">Destinations</a>
            <a href="#deals" className="text-gray-700 hover:text-teal-600 font-medium">Deals</a>
            <a href="#testimonials" className="text-gray-700 hover:text-teal-600 font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
          </nav>
          
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 text-gray-700 font-medium">Login</button>
            <button className="px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors">
              Sign Up
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header> */}

      {/* Mobile Menu
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-white z-50 flex flex-col p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Globe className="text-teal-600 mr-2" size={28} />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                AdventureQuest
              </span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-center">
            <a href="#home" className="text-gray-700 text-xl py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#destinations" className="text-gray-700 text-xl py-2" onClick={() => setMobileMenuOpen(false)}>Destinations</a>
            <a href="#deals" className="text-gray-700 text-xl py-2" onClick={() => setMobileMenuOpen(false)}>Deals</a>
            <a href="#testimonials" className="text-gray-700 text-xl py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#contact" className="text-gray-700 text-xl py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
          
          <div className="mt-auto mb-8 flex flex-col space-y-4">
            <button className="px-4 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg">
              Login
            </button>
            <button className="px-4 py-3 bg-teal-600 text-white rounded-lg font-medium">
              Sign Up
            </button>
          </div>
        </motion.div>
      )} */}




      
    </>
  );
};

export default Header;
