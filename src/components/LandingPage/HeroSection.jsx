import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, Globe, Palmtree, ArrowRight, MapPin, 
  Users, Star, Calendar, Heart, Play, Sun, Ticket,
  Shield, Award, Clock
} from "lucide-react";

// Floating animation component
const FloatingIcon = ({ children, yOffset = 10, duration = 2, delay = 0 }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, yOffset, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
      repeatType: "reverse",
    }}
  >
    {children}
  </motion.div>
);

// Tab hook
const useTabNavigation = (initialTab = "destinations") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabs = useMemo(() => [
    { key: "destinations", label: "Destinations", icon: Globe },
    { key: "tours", label: "Guided Tours", icon: Ticket },
    { key: "activities", label: "Local Activities", icon: Sun },
  ], []);
  return { activeTab, setActiveTab, tabs };
};

// Search hook
const useSearch = () => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    date: "",
    travelers: "",
  });
  const handleSearchChange = useCallback((field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  }, []);
  const handleSearchSubmit = useCallback(() => {
    console.log("Search submitted:", searchParams);
  }, [searchParams]);
  return { searchParams, handleSearchChange, handleSearchSubmit };
};

// Stats component
const StatItem = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-wider bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
      {value}
    </div>
    <p className="text-teal-200 font-light text-lg">{label}</p>
  </motion.div>
);

// Destination card component
const DestinationCard = ({ trip, index, onWishlistToggle }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(trip.id);
  }, [isWishlisted, trip.id, onWishlistToggle]);

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={trip.image} 
          alt={`${trip.name} - ${trip.description}`}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-3 py-2 rounded-lg font-bold shadow-lg">
          {trip.price}
        </div>
        
        <button 
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-red-500 hover:scale-110 transition-all duration-200 group/wishlist"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-colors ${
              isWishlisted 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600 group-hover/wishlist:text-white"
            }`} 
          />
        </button>

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
          <Star size={14} className="inline fill-yellow-400 text-yellow-400 mr-1" />
          {trip.rating}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 pr-2">{trip.name}</h3>
          {trip.featured && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-base mb-4 line-clamp-2 leading-relaxed">
          {trip.description}
        </p>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center text-teal-600 font-medium text-sm">
            <Clock size={16} className="mr-1" />
            <span>{trip.days} Days</span>
          </div>
          <button className="text-teal-600 font-semibold flex items-center text-sm group/btn transition-all hover:text-teal-800">
            View Details
            <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Hero Section with customizable background
const EnhancedHeroSection = ({ bgImageUrl }) => {
  const { activeTab, setActiveTab, tabs } = useTabNavigation();
  const { searchParams, handleSearchChange, handleSearchSubmit } = useSearch();

  const tripLocations = useMemo(() => [
    // Example trips
    {
      id: "1",
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1287&q=80",
      description: "The city of love, known for the Eiffel Tower, art, and cafes.",
      price: "₹1,20,000",
      rating: 4.8,
      days: 7,
      category: "city",
      featured: true
    },
    // Add more trips here
  ], []);

  const handleWishlistToggle = useCallback((tripId) => {
    console.log("Wishlist toggled for trip:", tripId);
  }, []);

  const floatingIcons = useMemo(() => [
    { Icon: Plane, position: "top-12 left-1/4", yOffset: 15, duration: 6, delay: 0 },
    { Icon: Globe, position: "top-20 right-20", yOffset: -12, duration: 5, delay: 1 },
    { Icon: Palmtree, position: "bottom-40 left-16", yOffset: -10, duration: 7, delay: 0.3 },
    { Icon: MapPin, position: "bottom-20 right-1/3", yOffset: 10, duration: 5, delay: 0.9 },
  ], []);

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
        {/* Customizable background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgImageUrl || "https://www.followmeaway.com/wp-content/uploads/2024/04/best-beach-towns-in-Europe-Palma2-1000x533.jpg"}')` }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden z-1 pointer-events-none">
          {floatingIcons.map(({ Icon, position, yOffset, duration, delay }, index) => (
            <FloatingIcon key={index} yOffset={yOffset} duration={duration} delay={delay}>
              <div className={`absolute ${position} text-6xl opacity-15 text-white/80`}>
                <Icon size={40} />
              </div>
            </FloatingIcon>
          ))}
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-6xl px-4 z-10 relative py-20">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent mt-2 md:mt-3">
              Unforgettable Adventure
            </span>
          </motion.h1>
          {/* Add your search bar and trust indicators here */}
        </div>
      </section>

      {/* Other sections like Destinations & Stats go here */}
    </div>
  );
};

export default EnhancedHeroSection;
