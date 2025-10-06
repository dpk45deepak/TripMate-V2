import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Zap, Ship, MessageCircle, Twitter, Instagram, Facebook, BookOpen, Star, StarHalf, Sun, Waves, Anchor, Bird, Menu, X } from 'lucide-react';

// --- MOCK DATA ---
const islandsData = [
  {
    id: 1,
    name: "Isla Mujeres",
    tagline: "Paradise Found: The Island of Women",
    description: "Snorkeling in tropical waters, climbing a pyramid, and exploring the breathtaking cliffside views at Punta Sur are just a few samples of what Isla Mujeres has to offer. Experience the tranquil, turquoise Caribbean waters.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThiEJyvqU9vUaSQhrOGibPL11a0yZBWes-9pygw1LgEtekO00guKBSUa0alY8LpFD6Btc&usqp=CAU",
    rating: 5,
    features: [
      { icon: Sun, label: 'Beach Life' },
      { icon: Waves, label: 'Snorkeling' },
      { icon: Anchor, label: 'Yachting' },
      { icon: Ship, label: 'Ferry Access' },
    ]
  },
  {
    id: 2,
    name: "Isla Holbox",
    tagline: "The Bohemian Gateway: A True Escape",
    description: "Located off the north coast of the Yucatán Peninsula, Holbox is car-free and famous for its unpaved roads and vibrant street art. It is best known for being a seasonal home to the majestic whale sharks.",
    image: "https://i.ytimg.com/vi/UByINB69_xo/maxresdefault.jpg",
    rating: 4.5,
    features: [
      { icon: Bird, label: 'Flamingos' },
      { icon: Ship, label: 'Whale Sharks' },
      { icon: Zap, label: 'Bioluminescence' },
      { icon: Map, label: 'Nature Reserve' },
    ]
  },
  {
    id: 3,
    name: "Cozumel",
    tagline: "Diver's Dream: World-Class Reefs",
    description: "Cozumel is a large, predominantly flat island off the eastern coast of Mexico's Yucatán Peninsula, renowned for its incredible coral reefs and crystal-clear visibility, making it a global hub for scuba diving.",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/689520918.jpg?k=b3c606100a5c03a35c8f446d226f3ca9537fdda9d07aa18983f6a8bc383375b4&o=&hp=1",
    rating: 5,
    features: [
      { icon: Waves, label: 'Scuba Dive' },
      { icon: Anchor, label: 'Cruising' },
      { icon: Sun, label: 'Great Weather' },
      { icon: Ship, label: 'Port City' },
    ]
  }
];

// --- COMPONENTS ---

// Helper component for Star Rating
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex space-x-0.5">
      {Array(fullStars).fill(0).map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />)}
      {hasHalfStar && <StarHalf key="half" className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />}
      {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-500 stroke-gray-500" />)}
    </div>
  );
};

// Mobile Navigation Component
const MobileNav = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-teal-600/95 backdrop-blur-md lg:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white p-2"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
            <a href="home" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Go Back</a>
            <a href="profile" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Profile</a>
            <a href="itinerary" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Itinerary</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Component for the sliding island content
const IslandCard = React.memo(({ island, isVisible }) => {
    const cardVariants = {
        initial: { y: "100%", opacity: 0 },
        in: { y: "0%", opacity: 1 },
        out: { y: "-100%", opacity: 0 },
    };

    if (!isVisible) return null;

    return (
        <motion.div
            key={island.id}
            variants={cardVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
        >
            {/* Image Section */}
            <div className="h-1/2 sm:h-2/3 relative mb-4 rounded-xl shadow-2xl overflow-hidden">
                <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x800/007bff/ffffff?text=Image+Unavailable"; }}
                />
            </div>

            {/* Content Section */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl text-white shadow-xl flex flex-col lg:flex-row justify-between flex-grow">
                <div className="lg:w-1/2 mb-4 lg:mb-0">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-teal-400">{island.name}</h3>
                    <p className="text-sm italic mb-3 sm:mb-4 text-gray-200">{island.tagline}</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-200">{island.description}</p>
                </div>

                <div className="lg:w-1/2 lg:pl-6 xl:pl-8">
                    <h4 className="text-lg font-semibold mb-2">Explore Features</h4>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                        {island.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                                <feature.icon className="w-4 h-4 text-teal-300 flex-shrink-0" />
                                <span className="text-gray-200 text-xs sm:text-sm">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                        <div className="flex items-center">
                            <span className="text-sm text-gray-300 mr-2">Rating:</span>
                            <RatingStars rating={island.rating} />
                        </div>
                        <button className="flex items-center justify-center text-sm font-semibold px-4 py-2 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-lg shadow-teal-500/50 w-full xs:w-auto">
                            Book Now <span className="ml-2">&rsaquo;</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
IslandCard.displayName = 'IslandCard';

// Main Explore Component
const Explore = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroAnimating, setIsIntroAnimating] = useState(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const activeIsland = islandsData[activeIndex];

  // Logic for Auto-Rotation
  useEffect(() => {
    if (isIntroAnimating || isMobileNavOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % islandsData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isIntroAnimating, isMobileNavOpen]);

  // Handle Intro Animation Finish
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroAnimating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Variant for the text on the left hero side
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Variant for the main intro text
  const introVariants = {
    hidden: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: -50, transition: { duration: 1, ease: "easeOut" } },
    appear: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <div className='w-full min-h-screen p-2 sm:p-4 bg-gray-100'>
      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      
      {/* Main Content Card */}
      <div className="relative w-full max-w-7xl mx-auto h-[90vh] min-h-[600px] max-h-[1200px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHzb3ASXhWVXTyVp3TuLh7VWVAna7qfVq9BGxws9-w0C5BRP5cmmM1aQP7lcV20ySLmA&usqp=CAU"
            alt="Tropical Beach Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Intro Splash Screen Animation */}
        <AnimatePresence>
          {isIntroAnimating && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-50 bg-teal-500/80 backdrop-blur-sm"
              variants={introVariants}
              initial="appear"
              exit="exit"
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl sm:text-7xl md:text-[10vw] font-extrabold text-white tracking-widest text-center px-4"
              >
                MEXICO
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Overlay */}
        <motion.div
          className={`absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row transition-opacity duration-1000 ${isIntroAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Left Column - Hero Content & Socials */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between text-white z-10 pb-4 lg:pb-0">
            {/* Nav and Logo */}
            <div className="flex justify-between items-start">
              <motion.div 
                initial={{ y: -20, opacity: 0 }} 
                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}} 
                transition={{ delay: 1, duration: 0.5 }}
              >
                <h2 className="text-xl font-bold">Mexico Island<span className="text-teal-400">.</span></h2>
              </motion.div>
              
              {/* Desktop Navigation */}
              <motion.nav
                className="space-x-6 hidden lg:flex text-sm font-medium"
                initial={{ y: -20, opacity: 0 }}
                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <a href="/home" className="hover:text-teal-400 transition">Go Back</a>
                <a href="/itinerary" className="hover:text-teal-400 transition">Itinerary</a>
                <a href="/profile" className="hover:text-teal-400 transition">Profile</a>
              </motion.nav>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ y: -20, opacity: 0 }}
                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="lg:hidden text-white p-2"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Hero Text */}
            <div className="my-auto pt-4 lg:pt-0">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tighter"
                variants={textVariants}
                initial="hidden"
                animate={!isIntroAnimating ? "visible" : "hidden"}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Explore <br />
                Our Islands
              </motion.h1>

              <motion.p
                className="mt-4 max-w-md text-sm sm:text-base text-gray-200"
                variants={textVariants}
                initial="hidden"
                animate={!isIntroAnimating ? "visible" : "hidden"}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                Snorkeling in tropical waters, climbing ancient pyramids, and exploring the hidden world of cenotes are just a few samples of what Mexico has to offer.
              </motion.p>

              <motion.button
                className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-xl shadow-teal-500/50 w-full lg:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={!isIntroAnimating ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Book Now
              </motion.button>
            </div>

            {/* Social Icons */}
            <motion.div
              className="flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 mt-6 lg:mt-0"
              initial={{ x: -20, opacity: 0 }}
              animate={!isIntroAnimating ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <a href="#" aria-label="Facebook" className="hover:text-teal-400 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-teal-400 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-teal-400 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Message" className="hover:text-teal-400 transition"><MessageCircle className="w-5 h-5" /></a>
            </motion.div>
          </div>

          {/* Right Column - Sliding Content */}
          <div className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-4 xl:pl-8 z-20 flex-1 min-h-0">
            <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-0">
              <AnimatePresence mode="wait">
                <IslandCard key={activeIsland.id} island={activeIsland} isVisible={!isIntroAnimating} />
              </AnimatePresence>
              
              {/* Navigation Dots */}
              <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 sm:space-y-3 p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
                {islandsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-teal-400 w-3 h-3 sm:w-5 sm:h-5' : 'bg-gray-400 opacity-50 hover:opacity-100'
                    }`}
                    aria-label={`Go to ${islandsData[index].name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;