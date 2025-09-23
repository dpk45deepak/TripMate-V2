import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// CSS
import '../components/Home/Home.css'

// Pages
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import SearchBox from "../components/Home/SearchBox";
import Highlights from "../components/Home/Highlights";
import Destination from "../components/Home/Destination";
import Footer from "../components/Home/Footer";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
    <div className="font-sans bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 relative mx-1 md:mx-10">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative mb-20 rounded-xl">
        <Hero />

        {/* SearchBox positioned inside Hero for responsive layout */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className={`absolute left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-6 ${
            isMobile ? "-bottom-40" : "-bottom-6 md:-bottom-36"
          }`}
          >
          <div className="max-w-4xl mx-auto">
            <SearchBox />
          </div>
        </motion.div>
      </div>

      {/* Other Sections */}
      <motion.div
      className="hidden md:flex"
      >
      <Highlights />
      </motion.div>
      <div className="pt-20 md:pt-0">
      <Destination />
      </div>
    </div>
    <Footer />
    </>
  );
}
