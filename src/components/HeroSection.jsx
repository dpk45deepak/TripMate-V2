import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plane, Globe, Palmtree, ArrowRight, MapPin, 
  Users, Star, Calendar, Clock, Search, Menu, X,
  Mountain, Umbrella, Castle, Camera, Heart
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1287&q=80",
      text: "The trip to Bali was absolutely magical! Everything was perfectly organized.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1287&q=80",
      text: "Our Japan adventure exceeded all expectations. Will definitely book again!",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1170&q=80",
      text: "The cultural immersion in Peru was a life-changing experience. Highly recommend!",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWiUtpeOVpfsqmOWXDZlKJJAsF4Fo3q1cTFg&s')",
          }}
        />
        <div className="absolute inset-0 z-0"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden z-0 ">
          <Float yOffset={15} duration={6} delay={0}>
            <div className="absolute top-12 left-1/4 text-7xl opacity-30 text-blue-200">
              <Plane size={80} />
            </div>
          </Float>

          <Float yOffset={-12} duration={5} delay={1}>
            <div className="absolute top-20 right-20 text-7xl opacity-40 text-indigo-300">
              <Globe size={70} />
            </div>
          </Float>

          <Float yOffset={-10} duration={7} delay={0.3}>
            <div className="absolute bottom-40 left-16 text-7xl opacity-30 text-teal-300">
              <Palmtree size={75} />
            </div>
          </Float>

          <Float yOffset={10} duration={5} delay={0.9}>
            <div className="absolute bottom-20 right-1/3 text-7xl opacity-35 text-white">
              <MapPin size={70} />
            </div>
          </Float>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl px-4 z-10 relative">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
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
            className="text-xl md:text-2xl text-white mb-8"
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
                  type="text" 
                  placeholder="When?" 
                  className="w-full p-2 outline-none"
                />
              </div>
              <div className="flex-1 flex items-center p-2 border-t md:border-t-0 md:border-l border-gray-200">
                <Users className="text-gray-400 mr-2" size={20} />
                <input 
                  type="text" 
                  placeholder="Travelers" 
                  className="w-full p-2 outline-none"
                />
              </div>
              <button className="bg-teal-600 text-white p-3 rounded-lg flex items-center justify-center mt-2 md:mt-0 md:ml-2">
                <Search size={20} className="mr-1" />
                Search
              </button>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center gap-2 mx-auto sm:mx-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Exploring
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-900 transform hover:-translate-y-2 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              Watch Video
            </motion.button>
          </motion.div>

          {/* Travelers avatars */}
          <motion.div
            className="mt-4 md:mt-16 flex items-center justify-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 mx-auto w-fit shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Float yOffset={5} duration={3}>
              <div className="flex -space-x-3 overflow-hidden">
                {tripLocations.slice(0, 4).map((trip, index) => (
                  <motion.img
                    key={index}
                    className="inline-block h-8 w-8 md:h-14 md:w-14 rounded-full ring-2 ring-white object-cover hover:scale-110 transition-transform duration-300"
                    src={trip.image}
                    alt="Trip"
                    initial={{ x: -20 * index, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </Float>
            <span className="text-lg font-medium text-white">
              1.2K+ happy travelers
            </span>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
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
                className={`px-4 py-2 rounded-xl ${activeTab === "destinations" ? "bg-white shadow-md" : ""}`}
                onClick={() => setActiveTab("destinations")}
              >
                Destinations
              </button>
              <button 
                className={`px-4 py-2 rounded-xl ${activeTab === "tours" ? "bg-white shadow-md" : ""}`}
                onClick={() => setActiveTab("tours")}
              >
                Tours
              </button>
              <button 
                className={`px-4 py-2 rounded-xl ${activeTab === "activities" ? "bg-white shadow-md" : ""}`}
                onClick={() => setActiveTab("activities")}
              >
                Activities
              </button>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tripLocations.map((trip, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                    className="w-full h-56 object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-teal-600 font-semibold">{trip.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700">{trip.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{trip.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-1" />
                      <span>{trip.days} days</span>
                    </div>
                    <button className="text-teal-600 font-medium flex items-center">
                      Explore
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition-colors duration-300">
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section
      <section id="testimonials" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Travelers Say
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hear from travelers who have experienced our adventures firsthand
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <span className="font-medium text-gray-800">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default EnhancedHeroSection;