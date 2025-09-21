import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plane, Globe, Palmtree, ArrowRight, MapPin, 
  Users, Star, Calendar, Search, Heart, Play
} from "lucide-react";

// Floating animation component
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("destinations");

  const tripLocations = [
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1287&q=80",
      description: "The city of love, known for the Eiffel Tower, art, and cafes.",
      price: "$1,200",
      rating: 4.8,
      days: 7,
    },
    {
      name: "Tokyo, Japan",
      image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1287&q=80",
      description: "A bustling city blending tradition with technology and anime culture.",
      price: "$1,500",
      rating: 4.9,
      days: 10,
    },
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1333&q=80",
      description: "Stunning white-washed buildings with blue domes overlooking the Aegean Sea.",
      price: "$1,350",
      rating: 4.7,
      days: 6,
    },
    {
      name: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=1170&q=80",
      description: "A tropical paradise known for beaches, rice terraces, and temples.",
      price: "$980",
      rating: 4.6,
      days: 8,
    },
    {
      name: "Machu Picchu, Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1176&q=80",
      description: "Ancient Incan citadel high in the Andes Mountains.",
      price: "$1,650",
      rating: 4.9,
      days: 12,
    },
    {
      name: "Safari, Kenya",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1168&q=80",
      description: "Experience wildlife in their natural habitat at Maasai Mara.",
      price: "$2,200",
      rating: 4.8,
      days: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-indigo-900/50 z-0"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <Float yOffset={15} duration={6} delay={0}>
            <div className="absolute top-12 left-1/4 text-7xl opacity-30 text-blue-200">
              <Plane size={40} />
            </div>
          </Float>

          <Float yOffset={-12} duration={5} delay={1}>
            <div className="absolute top-20 right-20 text-7xl opacity-40 text-indigo-300">
              <Globe size={35} />
            </div>
          </Float>

          <Float yOffset={-10} duration={7} delay={0.3}>
            <div className="absolute bottom-40 left-16 text-7xl opacity-30 text-teal-300">
              <Palmtree size={40} />
            </div>
          </Float>

          <Float yOffset={10} duration={5} delay={0.9}>
            <div className="absolute bottom-20 right-1/3 text-7xl opacity-35 text-white">
              <MapPin size={35} />
            </div>
          </Float>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl px-4 z-10 relative mt-16">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent mt-2">
              Adventure
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore breathtaking destinations, create unforgettable memories, and
            experience the world like never before.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row bg-white rounded-xl p-2 shadow-lg">
              <div className="flex-1 flex items-center p-2">
                <MapPin className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Where to?" 
                  className="w-full p-2 outline-none"
                />
              </div>
              <div className="flex-1 flex items-center p-2 border-t md:border-t-0 md:border-l border-gray-200">
                <Calendar className="text-gray-400 mr-2" size={20} />
                <input 
                  type="date" 
                  placeholder="When?" 
                  className="w-full p-2 outline-none"
                />
              </div>
              <div className="flex-1 flex items-center p-2 border-t md:border-t-0 md:border-l border-gray-200">
                <Users className="text-gray-400 mr-2" size={20} />
                <select className="w-full p-2 outline-none bg-white">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3 Travelers</option>
                  <option>4+ Travelers</option>
                </select>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-lg flex items-center justify-center mt-2 md:mt-0 md:ml-2 transition-colors">
                <Search size={20} className="mr-1" />
                Search
              </button>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-white hover:text-indigo-900 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} fill="currentColor" />
              Watch Video
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Popular Destinations
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our most popular travel destinations that travelers love visiting
            </motion.p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              <button 
                className={`px-4 py-2 rounded-xl transition-colors ${activeTab === "destinations" ? "bg-white shadow-md text-teal-600 font-medium" : "text-gray-600"}`}
                onClick={() => setActiveTab("destinations")}
              >
                Destinations
              </button>
              <button 
                className={`px-4 py-2 rounded-xl transition-colors ${activeTab === "tours" ? "bg-white shadow-md text-teal-600 font-medium" : "text-gray-600"}`}
                onClick={() => setActiveTab("tours")}
              >
                Tours
              </button>
              <button 
                className={`px-4 py-2 rounded-xl transition-colors ${activeTab === "activities" ? "bg-white shadow-md text-teal-600 font-medium" : "text-gray-600"}`}
                onClick={() => setActiveTab("activities")}
              >
                Activities
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripLocations.map((trip, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={trip.image} 
                    alt={trip.name} 
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Heart size={18} className="text-gray-600" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-teal-600 font-semibold text-sm">{trip.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{trip.name}</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700 text-sm">{trip.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <span>{trip.days} days</span>
                    </div>
                    <button className="text-teal-600 font-medium flex items-center text-sm hover:text-teal-700 transition-colors">
                      Explore
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-full font-medium hover:bg-teal-600 hover:text-white transition-colors duration-300">
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-teal-100">Happy Travelers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">120+</div>
              <p className="text-teal-100">Destinations</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">15K+</div>
              <p className="text-teal-100">Reviews</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-teal-100">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHeroSection;