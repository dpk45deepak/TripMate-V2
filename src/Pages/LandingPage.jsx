import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Shield,
  Umbrella,
  Compass,
  Star,
  CheckCircle,
  Map,
  Globe,
  Plane,
  Heart
} from "lucide-react";

// Components
import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";
import SearchBox from "../components/HomePage/SearchBox";
import Testimonials from "../components/LandingPage/Testimonials";

// CSS
import '../components/HomePage/Home.css';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

export const testimonialData = [
  {
    name: "Ashish Kumar",
    role: "Travel Blogger",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content: "Exploring these destinations was an incredible experience. The planning was seamless and the guides were fantastic!",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    role: "Photographer",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    content: "I loved every moment of the city tours. The cultural experiences were enriching and memorable.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    role: "Adventure Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "The adventure activities were thrilling and safe. Perfect for adrenaline seekers like me!",
    rating: 4,
  },
  {
    name: "Priya Reddy",
    role: "Digital Nomad",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    content: "I was amazed by the mix of nature and culture. Every place had a unique story to tell.",
    rating: 5,
  },
  {
    name: "Arjun Singh",
    role: "Explorer",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    content: "The service and hospitality were top-notch. Truly an unforgettable travel experience.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "Travel Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    content: "From scenic landscapes to vibrant cities, every destination was breathtaking and well-planned.",
    rating: 4,
  }
];

// Floating Animation Component
const FloatingIcon = ({ children, yOffset = 15, duration = 4, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, yOffset, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
      repeatType: "reverse"
    }}
  >
    {children}
  </motion.div>
);

// Enhanced Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: delay * 0.2 }}
      className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-white/20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-teal-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
        <div className="w-full h-full bg-white rounded-3xl" />
      </div>

      <div className="relative z-10">
        <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>
    </motion.div>
  );
};

// Enhanced Destination Card Component
const DestinationCard = ({ image, title, location, rating, price, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            duration: 0.8, 
            delay: delay * 0.2,
            ease: [0.16, 1, 0.3, 1] 
          }
        }
      }}
      className="group relative overflow-hidden rounded-3xl h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-16 aspect-h-12 w-full overflow-hidden rounded-3xl bg-gray-100 relative">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: isHovered ? 1.2 : 1.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Price Tag */}
        <motion.div 
          className="absolute top-4 left-4 bg-linear-to-r from-teal-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay * 0.2 + 0.3 }}
        >
          {price}
        </motion.div>

        {/* Wishlist Button */}
        <motion.button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-2xl hover:bg-red-500 transition-all duration-300 group/wishlist"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={20} 
            className={`transition-colors ${
              isWishlisted 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600 group-hover/wishlist:text-white"
            }`} 
          />
        </motion.button>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay * 0.2 + 0.4 }}
          >
            <div className="flex items-center mb-3">
              <MapPin className="w-5 h-5 text-white mr-2" />
              <span className="text-white/90 font-medium">{location}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-white/90 font-medium">{rating}.0</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Explore
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced CTA Button Component
const CtaButton = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  return (
    <motion.button
      whileHover={{ 
        y: -4,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden group ${
        variant === 'primary' 
          ? 'bg-linear-to-r from-teal-500 to-indigo-600 text-white hover:from-teal-600 hover:to-indigo-700' 
          : 'border-2 border-teal-500 text-teal-600 hover:bg-teal-50'
      } ${className}`}
      {...props}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
      
      <span className="relative flex items-center justify-center">
        {children}
        {Icon && <Icon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </span>
    </motion.button>
  );
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.4 });
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const isDestinationsInView = useInView(destinationsRef, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Enhanced Destinations Data
  const destinations = [
    {
      id: 1,
      title: "Bali, Indonesia",
      location: "Indonesia",
      rating: 4.8,
      price: "₹45,999",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
    },
    {
      id: 2,
      title: "Santorini, Greece",
      location: "Greece",
      rating: 4.9,
      price: "₹78,499",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
    },
    {
      id: 3,
      title: "Queensland",
      location: "Australia",
      rating: 4.7,
      price: "₹92,999",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Paris, France",
      location: "France",
      rating: 4.9,
      price: "₹65,999",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
    }
  ];

  // Enhanced Features Data
  const features = [
    {
      icon: Compass,
      title: "Personalized Itineraries",
      description: "Get custom travel plans tailored to your preferences and interests with AI-powered recommendations."
    },
    {
      icon: Map,
      title: "Local Insights",
      description: "Discover hidden gems and local favorites recommended by our global network of travel experts."
    },
    {
      icon: Umbrella,
      title: "All-Inclusive Packages",
      description: "Enjoy hassle-free travel with our comprehensive all-inclusive vacation packages and deals."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our priority with 24/7 support, secure bookings, and travel insurance options."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="grow">
        {/* Enhanced Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-blue-900 to-indigo-900"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{
                backgroundImage: "url('https://www.followmeaway.com/wp-content/uploads/2024/04/best-beach-towns-in-Europe-Palma2-1000x533.jpg')"
              }}
            />
            <div className="absolute inset-0 bg-linear-to-br from-blue-100/80 via-purple-100/10 to-indigo-100/40" />
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingIcon yOffset={20} duration={6} delay={0}>
              <div className="absolute top-20 left-10 text-6xl opacity-20 text-blue-800">
                <Plane size={40} />
              </div>
            </FloatingIcon>
            <FloatingIcon yOffset={-15} duration={5} delay={1}>
              <div className="absolute top-40 right-20 text-6xl opacity-20 text-teal-400">
                <Globe size={35} />
              </div>
            </FloatingIcon>
            <FloatingIcon yOffset={25} duration={7} delay={0.5}>
              <div className="absolute bottom-40 left-20 text-6xl opacity-20 text-orange-400">
                <MapPin size={40} />
              </div>
            </FloatingIcon>
          </div>

          <motion.div 
            className="container mx-auto px-4 relative z-10 top-16"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div 
              className="max-w-6xl mx-auto text-center"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold text-blue-100 bg-white/10 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  World's Leading Travel Platform
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
              >
                Discover{' '}
                <motion.span 
                  className="bg-linear-to-r from-teal-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
                  initial={{ backgroundPosition: '0% 50%' }}
                  animate={{ backgroundPosition: '100% 50%' }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  Your World
                </motion.span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Find and book unique experiences at the best prices. Your perfect trip starts here with personalized recommendations and expert guidance.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="max-w-4xl mx-auto mb-12"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <SearchBox />
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.6
                    }
                  }
                }}
              >
                {['Beach Paradise', 'Mountain Trek', 'City Escape', 'Cultural Journey'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    variants={fadeInUp}
                    className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:shadow-lg transition-all cursor-pointer group"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    #{tag}
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/70"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Features Section */}
        <section 
          ref={featuresRef}
          className="py-24 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              animate={isFeaturesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="text-center mb-20"
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-block mb-6"
              >
                <span className="inline-flex items-center px-6 py-3 text-base font-semibold text-teal-700 bg-teal-100 rounded-2xl border border-teal-200">
                  Why Choose Traviro
                </span>
              </motion.div>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Travel Smarter,{' '}
                <span className="bg-linear-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Experience travel like never before with our innovative platform designed for modern explorers who value convenience, safety, and authentic experiences.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24"
              initial="hidden"
              animate={isFeaturesInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={index}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { value: '50K+', label: 'Happy Travelers', suffix: 'and counting' },
                { value: '500+', label: 'Destinations', suffix: 'worldwide' },
                { value: '24/7', label: 'Support', suffix: 'always here for you' },
                { value: '98%', label: 'Satisfaction', suffix: 'rated excellent' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold bg-linear-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.suffix}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Destinations Section */}
        <section 
          ref={destinationsRef}
          className="py-auto bg-linear-to-br from-white via-blue-50 to-indigo-50"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center px-6 py-3 text-base font-semibold text-indigo-700 bg-indigo-100 rounded-2xl border border-indigo-200">
                  Trending Now
                </span>
              </motion.div>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Discover <span className="text-transparent bg-linear-to-r from-teal-600 to-indigo-600 bg-clip-text">Dream</span> Destinations
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Explore our most sought-after travel destinations, carefully curated for unforgettable experiences and lasting memories.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16"
              initial="hidden"
              animate={isDestinationsInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                >
                  <DestinationCard
                    image={destination.image}
                    title={destination.title}
                    location={destination.location}
                    rating={destination.rating}
                    price={destination.price}
                    delay={index}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link to="/explore">
                <CtaButton icon={ArrowRight} className="px-12 py-5 text-lg">
                  Explore All Destinations
                </CtaButton>
              </Link>
              
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {['Tropical Beaches', 'Mountain Retreats', 'City Breaks', 'Adventure Sports', 'Luxury Resorts', 'Cultural Tours'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    variants={fadeInUp}
                    className="inline-flex items-center px-6 py-3 rounded-2xl text-base font-medium bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:shadow-xl transition-all cursor-pointer group hover:border-teal-200"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    #{tag}
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-24 bg-linear-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-flex items-center px-6 py-3 text-base font-semibold text-purple-100 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Traveler Stories
                </span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                What Our <span className="bg-linear-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Travelers</span> Say
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Don't just take our word for it. Here's what our global community has to say about their unforgettable experiences.
              </motion.p>
            </motion.div>

            <Testimonials testimonials={testimonialData} />
            
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/testimonials">
                <CtaButton 
                  variant="secondary" 
                  className="border-white text-white hover:bg-white/10 px-10 py-4"
                >
                  Read More Stories
                </CtaButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative py-28 bg-linear-to-br from-teal-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10"></div>
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-soft-light filter blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-soft-light filter blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <span className="inline-flex items-center px-6 py-3 rounded-2xl text-base font-semibold text-blue-100 bg-white/20 backdrop-blur-sm border border-white/30">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Limited Time Offer
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              >
                Ready for Your Next{' '}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-amber-400">
                  Adventure?
                </span>
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-blue-100 leading-relaxed"
              >
                Join thousands of travelers discovering amazing places around the world.
                Let's make your dream trip a reality with exclusive deals and personalized service.
              </motion.p>
              
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row justify-center gap-6 mb-12"
              >
                <Link to="/signup" className="flex-1 max-w-xs mx-auto">
                  <CtaButton className="w-full py-5 text-lg bg-linear-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900">
                    Get Started Free
                  </CtaButton>
                </Link>
                <Link to="/explore" className="flex-1 max-w-xs mx-auto">
                  <CtaButton 
                    variant="secondary" 
                    className="w-full py-5 text-lg border-white text-white hover:bg-white/10"
                  >
                    Explore Deals
                  </CtaButton>
                </Link>
              </motion.div>

              <motion.div 
                className="flex flex-wrap justify-center gap-8"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                {[
                  { text: "No credit card required", icon: CheckCircle },
                  { text: "Cancel anytime", icon: CheckCircle },
                  { text: "24/7 Customer Support", icon: CheckCircle },
                  { text: "Best Price Guarantee", icon: CheckCircle }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-blue-100/90"
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className="w-5 h-5 mr-2 text-green-300" />
                    <span className="text-lg font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Global Animation Styles */}
      <style jsx="true" global="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
            transform: scale(1.02);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-linear(to bottom, #0d9488, #3b82f6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-linear(to bottom, #0f766e, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;