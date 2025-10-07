import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plane, Globe, Palmtree, ArrowRight, MapPin, 
  Users, Star, Calendar, Search, Heart, Play, Sun, Ticket 
} from "lucide-react"; // Added Sun and Ticket for better iconography

// Floating animation component (No changes needed, it's perfect)
const Float = ({ children, yOffset = 10, duration = 2, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, yOffset, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

const EnhancedHeroSection = () => {
  const [activeTab, setActiveTab] = useState("destinations");

  const tripLocations = [
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1287&q=80",
      description: "The city of love, known for the Eiffel Tower, art, and cafes.",
      price: "Rs 1,20,000",
      rating: 4.8,
      days: 7,
      category: "city",
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1287&q=80",
      description: "A bustling city blending tradition with technology and anime culture.",
      price: "Rs 1,500,00",
      rating: 4.9,
      days: 10,
      category: "city",
    },
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1333&q=80",
      description: "Stunning white-washed buildings with blue domes overlooking the Aegean Sea.",
      price: "Rs 1,350,00",
      rating: 4.7,
      days: 6,
      category: "beach",
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1170&q=80",
      description: "A tropical paradise known for beaches, rice terraces, and temples.",
      price: "Rs 80,000",
      rating: 4.6,
      days: 8,
      category: "beach",
    },
    {
      name: "Machu Picchu, Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1176&q=80",
      description: "Ancient Incan citadel high in the Andes Mountains.",
      price: "Rs 1,650,00",
      rating: 4.9,
      days: 12,
      category: "adventure",
    },
    {
      name: "Safari, Kenya",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1168&q=80",
      description: "Experience wildlife in their natural habitat at Maasai Mara.",
      price: "Rs 4,20,200",
      rating: 4.8,
      days: 10,
      category: "adventure",
    },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* --------------------- HERO SECTION (Visual and Search Focus) --------------------- */}
      <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-gray-900">
        
        {/* Updated Background image with dark, subtle overlay for better text contrast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVa5MBQote_pJwVmFyL80cpOUNB_W9TUS7g&s')", // High quality, generic travel image
          }}
        >
          {/* Stronger overlay for contrast */}
          <div className="absolute inset-0 bg-black/50 backdrop-brightness-99" /> 
        </div>

        {/* Floating Icons - Enhanced visibility and colors */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <Float yOffset={15} duration={6} delay={0}>
            <div className="absolute top-12 left-1/4 text-7xl opacity-10 text-white/70">
              <Plane size={50} />
            </div>
          </Float>

          <Float yOffset={-12} duration={5} delay={1}>
            <div className="absolute top-20 right-20 text-7xl opacity-10 text-white/70">
              <Globe size={45} />
            </div>
          </Float>

          <Float yOffset={-10} duration={7} delay={0.3}>
            <div className="absolute bottom-40 left-16 text-7xl opacity-10 text-white/70">
              <Palmtree size={50} />
            </div>
          </Float>

          <Float yOffset={10} duration={5} delay={0.9}>
            <div className="absolute bottom-20 right-1/3 text-7xl opacity-10 text-white/70">
              <MapPin size={45} />
            </div>
          </Float>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-5xl px-4 z-10 relative pt-30 py-20">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight text-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r py-2 from-teal-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent mt-3">
              Unforgettable Adventure
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore breathtaking destinations, create unforgettable memories, and 
            experience the world like never before with our expertly curated trips.
          </motion.p>

          {/* Search Bar - Enhanced appearance with glassmorphism */}
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row bg-white rounded-xl p-3 shadow-xl">
              <div className="flex-1 flex items-center p-2">
                <MapPin className="text-teal-600 mr-3" size={24} />
                <input 
                  type="text" 
                  placeholder="Where to? (e.g., Bali, Paris)" 
                  className="w-full p-2 outline-none text-gray-800 placeholder-gray-500"
                />
              </div>
              <div className="flex-1 flex items-center p-2 border-t md:border-t-0 md:border-l border-gray-200">
                <Calendar className="text-teal-600 mr-3" size={24} />
                <input 
                  type="date" 
                  placeholder="When?" 
                  className="w-full p-2 outline-none text-gray-800 placeholder-gray-500"
                />
              </div>
              <div className="flex-1 flex items-center p-2 border-t md:border-t-0 md:border-l border-gray-200">
                <Users className="text-teal-600 mr-3" size={24} />
                <select className="w-full p-2 outline-none bg-white text-gray-800 appearance-none">
                  <option className="text-gray-500">Travelers</option>
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(20, 184, 166, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 hover:bg-teal-700 text-white py-4 px-8 rounded-xl font-semibold flex items-center justify-center mt-3 md:mt-0 md:ml-3 transition-all duration-300"
              >
                <Search size={20} className="mr-2" />
                Find My Trip
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --------------------- DESTINATIONS SECTION (Cards Focus) --------------------- */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Popular Destinations & Packages
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our best-selling tours and activities, handpicked for exceptional experiences.
            </motion.p>
          </div>

          {/* Tabs - Enhanced Styling */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-2 rounded-2xl shadow-inner">
              {[
                { key: "destinations", label: "Destinations", icon: Globe },
                { key: "tours", label: "Guided Tours", icon: Ticket },
                { key: "activities", label: "Local Activities", icon: Sun }
              ].map((tab) => (
                <button 
                  key={tab.key}
                  className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-semibold ${
                    activeTab === tab.key 
                      ? "bg-white shadow-lg text-teal-600" 
                      : "text-gray-600 hover:text-teal-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Grid - Enhanced Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-20">
            {tripLocations.map((trip, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
              >
                <div className="relative">
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Price Tag with Gradient */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-4 py-2 rounded-lg font-bold shadow-md">
                    {trip.price}
                  </div>
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-red-500/90 group transition-all">
                    <Heart size={20} className="text-red-500 group-hover:text-white transition-colors" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{trip.name}</h3>
                    <div className="flex items-center text-sm font-semibold text-yellow-500">
                      <Star size={16} className="fill-current mr-1" />
                      <span>{trip.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base mb-4 line-clamp-2">{trip.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex items-center text-teal-600 font-medium text-base">
                      <Calendar size={16} className="mr-1" />
                      <span>{trip.days} Days</span>
                    </div>
                    <button className="text-teal-600 font-bold flex items-center text-sm group transition-colors hover:text-teal-800">
                      View Details
                      <ArrowRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.button 
              className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-teal-700 transition-all duration-300 hover:shadow-xl flex items-center justify-center mx-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Destinations
              <ArrowRight size={20} className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* --------------------- STATS SECTION (Visual Impact) --------------------- */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-indigo-700 text-white shadow-inner">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border-r border-white/30 last:border-r-0 md:last:border-r-0"
            >
              <div className="text-5xl font-extrabold mb-1 tracking-wider">50K+</div>
              <p className="text-teal-200 font-light text-lg">Happy Travelers</p>
            </motion.div>
            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-r border-white/30 last:border-r-0 md:last:border-r-0"
            >
              <div className="text-5xl font-extrabold mb-1 tracking-wider">120+</div>
              <p className="text-teal-200 font-light text-lg">Destinations</p>
            </motion.div>
            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-r border-white/30 last:border-r-0 md:last:border-r-0"
            >
              <div className="text-5xl font-extrabold mb-1 tracking-wider">15K+</div>
              <p className="text-teal-200 font-light text-lg">Reviews</p>
            </motion.div>
            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:border-r-0"
            >
              <div className="text-5xl font-extrabold mb-1 tracking-wider">98%</div>
              <p className="text-teal-200 font-light text-lg">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHeroSection;