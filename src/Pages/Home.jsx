import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// CSS
import '../components/Home/Home.css';

// Pages
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import SearchBox from "../components/Home/SearchBox";
import Highlights from "../components/Home/Highlights";
import WorldMap from '../components/Home/WorldMap';
import Services from '../components/Home/Services';
import Destination from "../components/Home/Destination";
import Pricing from '../components/Pricing';
import Footer from "../components/Home/Footer";

// Custom Hook for InView Detection (Reused from Highlights component concept)
function useAnimatedInView(threshold = 0.3) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true, // Only animate once
    rootMargin: "-50px 0px", // Start animation slightly before it's fully in view
  });
  return [ref, inView];
}

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      duration: 1.0,
      when: "beforeChildren"
    },
  },
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Apply useAnimatedInView to each main section
  const [highlightsRef, highlightsInView] = useAnimatedInView(0.1);
  const [servicesRef, servicesInView] = useAnimatedInView(0.1);
  const [destinationRef, destinationInView] = useAnimatedInView(0.1);


  // Check screen size on mount and resize (existing logic)
  useEffect(() => {
    const checkScreenSize = () => {
      // Use 768px for md breakpoint
      setIsMobile(window.innerWidth < 768); 
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Text animation variants (used for SearchBox)
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
      
      {/* Hero Section (No scrolling animation needed, it's the first view) */}
      <div className="relative mb-20 rounded-xl">
        <Hero />

        {/* SearchBox: Uses initial/animate on mount */}
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

      {/* Highlights Section: Scroll Animation */}
      <motion.div
        ref={highlightsRef}
        variants={sectionVariants}
        initial="hidden"
        animate={highlightsInView ? "visible" : "hidden"}
      >
        <Highlights />
        <WorldMap />
      </motion.div>

      {/* Destination Section: Scroll Animation */}
      <motion.div
        ref={destinationRef}
        variants={sectionVariants}
        initial="hidden"
        animate={destinationInView ? "visible" : "hidden"}
        className="pt-20 md:pt-0"
      >
        <Destination />
      </motion.div>

      {/* Services Section: Scroll Animation */}
      <motion.div
        ref={servicesRef}
        variants={sectionVariants}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
      >
        <Services />
        <Pricing />
      </motion.div>

    </div>
    <Footer />
    </>
  );
}