import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Zap, Ship, MessageCircle, Twitter, Instagram, Facebook, BookOpen, Star, StarHalf, Sun, Waves, Anchor, Bird } from 'lucide-react';

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


// Component for the sliding island content
const IslandCard = React.memo(({ island, isVisible }) => {
    // Variants for the vertical slide-in/slide-out animation
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
            // FIX: Replaced invalid cubic-bezier with 'easeInOut'
            transition={{ duration: 0.7, ease: "easeInOut" }} 
            className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-between"
        >
            {/* Image Section */}
            <div className="h-2/3 relative mb-4 rounded-xl shadow-2xl overflow-hidden">
                <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1000x800/007bff/ffffff?text=Image+Unavailable"; }}
                />
            </div>

            {/* Content Section */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white shadow-xl flex flex-col md:flex-row justify-between flex-grow">
                <div className="md:w-1/2 mb-4 md:mb-0">
                    <h3 className="text-3xl font-bold mb-1 text-teal-400">{island.name}</h3>
                    <p className="text-sm italic mb-4">{island.tagline}</p>
                    <p className="text-xs leading-relaxed text-gray-200">{island.description}</p>
                </div>

                <div className="md:w-1/2 md:pl-8">
                    <h4 className="text-lg font-semibold mb-2">Explore Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {island.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                                <feature.icon className="w-4 h-4 text-teal-300" />
                                <span className="text-gray-200">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <span className="text-sm text-gray-300 mr-2">Rating:</span>
                            <RatingStars rating={island.rating} />
                        </div>
                        <button className="flex items-center text-sm font-semibold px-4 py-2 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-lg shadow-teal-500/50">
                            Book Now <span className="ml-2">&rsaquo;</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
IslandCard.displayName = 'IslandCard';


// Main App Component
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroAnimating, setIsIntroAnimating] = useState(true);

  const activeIsland = islandsData[activeIndex];

  // Logic for Auto-Rotation (mimics the video's flow)
  useEffect(() => {
    if (isIntroAnimating) return; // Wait for intro to finish

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % islandsData.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [isIntroAnimating]);

  // Handle Intro Animation Finish
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroAnimating(false);
    }, 3000); // Intro screen duration

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
    // FIX: Replaced invalid cubic-bezier with 'easeOut'
    exit: { scale: 0.8, opacity: 0, y: -50, transition: { duration: 1, ease: "easeOut" } },
    appear: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
  }


  return (
    <div className='w-full p-2'>
      {/* Main Content Card (Simulates the video's outer box) */}
      <div className="relative w-full h-screen aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* --- Background Image/Video Simulation --- */}
        <div className="absolute inset-0 z-0">
          {/* Using a static image for the dynamic video background */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHzb3ASXhWVXTyVp3TuLh7VWVAna7qfVq9BGxws9-w0C5BRP5cmmM1aQP7lcV20ySLmA&usqp=CAU"
            alt="Tropical Beach Background"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>


        {/* --- Intro Splash Screen Animation (Mimics 0:00 - 0:03) --- */}
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
                className="text-7xl md:text-[10vw] font-extrabold text-white tracking-widest"
              >
                MEXICO
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>


        {/* --- Main Content Overlay (Mimics 0:03 - 0:09) --- */}
        <motion.div
            className={`absolute inset-0 p-8 flex transition-opacity duration-1000 ${isIntroAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Left Column - Hero Content & Socials */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between text-white z-10">
            {/* Nav and Logo */}
            <div className="flex justify-between items-start">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}} transition={{ delay: 1, duration: 0.5 }}>
                    <h2 className="text-xl font-bold">Mexico Island<span className="text-teal-400">.</span></h2>
                </motion.div>
                <motion.nav
                    className="space-x-6 hidden md:flex text-sm font-medium"
                    initial={{ y: -20, opacity: 0 }}
                    animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <a href="#" className="hover:text-teal-400 transition">Explore</a>
                    <a href="#" className="hover:text-teal-400 transition">About</a>
                    <a href="#" className="hover:text-teal-400 transition">Contact</a>
                </motion.nav>
            </div>

            {/* Hero Text */}
            <div className="my-auto">
              <motion.h1
                className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter"
                variants={textVariants}
                initial="hidden"
                animate={!isIntroAnimating ? "visible" : "hidden"}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Explore <br />
                Our Islands
              </motion.h1>

              <motion.p
                className="mt-4 max-w-md text-sm text-gray-200"
                variants={textVariants}
                initial="hidden"
                animate={!isIntroAnimating ? "visible" : "hidden"}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                Snorkeling in tropical waters, climbing ancient pyramids, and exploring the hidden world of cenotes are just a few samples of what Mexico has to offer.
              </motion.p>

              <motion.button
                className="mt-8 flex items-center text-lg font-semibold px-8 py-3 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-xl shadow-teal-500/50"
                initial={{ opacity: 0, y: 20 }}
                animate={!isIntroAnimating ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Book Now
              </motion.button>
            </div>

            {/* Social Icons (Bottom Left) */}
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ x: -20, opacity: 0 }}
              animate={!isIntroAnimating ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 hover:text-teal-400 transition" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-teal-400 transition" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="w-5 h-5 hover:text-teal-400 transition" /></a>
              <a href="#" aria-label="Message"><MessageCircle className="w-5 h-5 hover:text-teal-400 transition" /></a>
            </motion.div>
          </div>

          {/* Right Column - Sliding Content (Main Animation) */}
          <div className="w-full lg:w-1/2 p-4 md:p-8 z-20">
            <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                    <IslandCard key={activeIsland.id} island={activeIsland} isVisible={!isIntroAnimating} />
                </AnimatePresence>
                {/* Navigation Dots (Optional, for manual control) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-3 p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
                    {islandsData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === activeIndex ? 'bg-teal-400 w-5 h-5' : 'bg-gray-400 opacity-50 hover:opacity-100'
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

export default App;
