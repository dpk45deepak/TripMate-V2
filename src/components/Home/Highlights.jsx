import React, { useState, useRef,  useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, MapPin, Users, Hotel, ArrowRight } from "lucide-react";
import { Clock, Shield, Globe } from 'lucide-react';


// Scroll Animated Section Component
const ScrollAnimatedSection = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
    return (
      <ScrollAnimatedSection className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-4`}>
          <feature.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm">{feature.description}</p>
      </ScrollAnimatedSection>
    );
  };


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
};

const statsVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: i * 0.1,
      duration: 0.6,
    },
  }),
};

// Additional content data
const featuresData = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our top priority. All our partners are vetted and certified.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Expert Guides",
      description: "Learn from local experts who know the hidden gems and best spots.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "We offer experiences in over 50 countries worldwide.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your travel needs.",
      color: "from-purple-500 to-pink-500"
    }
  ];

// Custom Hook for InView Detection
function useAnimatedInView(threshold = 0.3) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: "-50px 0px",
  });
  return [ref, inView];
}

// Utility: random grid size
const getRandomSize = () => {
  const colSpans = ["col-span-1", "col-span-2"];
  const rowSpans = ["row-span-1", "row-span-2"];
  const col = colSpans[Math.floor(Math.random() * colSpans.length)];
  const row = rowSpans[Math.floor(Math.random() * rowSpans.length)];
  return `${col} ${row}`;
};

export default function Highlights() {
  const [sectionRef, sectionInView] = useAnimatedInView(0.2);
  const [statsRef, statsInView] = useAnimatedInView(0.5);

  const destinations = [
    {
      id: 1,
      name: "Thousand Islands",
      location: "Ontario, Canada",
      rating: 5.0,
      reviews: 12,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNj1sfV1xkv05mg5aa3THujVeaQvOP6SMgg&s",
      price: "₨1,200",
    },
    {
      id: 2,
      name: "Queenstown",
      location: "New Zealand",
      rating: 4.8,
      reviews: 8,
      image:
        "https://c4.wallpaperflare.com/wallpaper/498/721/291/queenstown-new-zealand-lake-wakatipu-bay-mountains-city-wallpaper-preview.jpg",
      price: "₨980",
    },
    {
      id: 3,
      name: "Cape Town Adventure",
      location: "Cape Town, South Africa",
      rating: 4.9,
      reviews: 64,
      image:
        "https://cdn.craft.cloud/101e4579-0e19-46b6-95c6-7eb27e4afc41/assets/uploads/Guides/cape-town-frommers.jpg",
      price: "₨2,200",
    },
    {
      id: 4,
      name: "Maldives Paradise",
      location: "Maldives, Indian Ocean",
      rating: 5.0,
      reviews: 102,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJj_ZPo2dkO9rcGA9BM1f1r5Jecpz2h-tHfg&s",
      price: "₨3,500",
    },
  ];

  const stats = [
    { icon: MapPin, value: "50+", label: "Destinations" },
    { icon: Users, value: "200+", label: "Tourists" },
    { icon: Hotel, value: "100+", label: "Hotels" },
  ];

  const features = [
    {
      icon: "✓",
      title: "Best Price Guarantee",
      text: "Find a lower price? We'll match it.",
      delay: 0,
    },
    {
      icon: "24/7",
      title: "24/7 Support",
      text: "Round-the-clock customer service.",
      delay: 0.1,
    },
    {
      icon: "✈️",
      title: "Easy Booking",
      text: "Simple, fast, and secure reservations.",
      delay: 0.2,
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={containerVariants}
      // Removed 'custom-scrollbar overflow-y-scroll' from section as it's not needed here
      className="py-26 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
    >
      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto">
        {/* Parent container: removed h-1/2, items-start keeps content aligned top */}
        <div className="grid lg:grid-cols-3 gap-12 items-start"> 
          {/* Destination Cards */}
          <div 
            className="lg:col-span-2 **h-full** pr-2" // 👈 Changed h-screen/h-[45%] and removed overflow-y-auto/pr-2 (scrollbar padding)
          >
            <div className="grid md:grid-cols-2 **auto-rows-fr** gap-6 **h-full**"> {/* 👈 Added h-full and auto-rows-fr for equal height cards if possible */}
              {destinations.map((destination, index) => {
                // To prevent issues with h-full/auto-rows-fr trying to fit too much,
                // we'll only use 4 cards and remove the random sizing.
                // The random sizing combined with h-full and auto-rows-fr causes issues
                // in grid layouts when trying to exactly match heights.
                // We will use a fixed layout for clean presentation.
                const fixedSize = "col-span-1 row-span-1"; 
                return (
                  <motion.div
                    key={destination.id}
                    variants={itemVariants}
                    custom={index}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer ${fixedSize} h-full`} // 👈 Use h-full on cards
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-full">
                      <motion.img
                        src={destination.image}
                        alt={destination.name}
                        variants={imageHoverVariants}
                        className="w-full h-full object-cover"
                      />
                      {/* Price Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                      >
                        <span className="font-bold text-cyan-600">
                          {destination.price}
                        </span>
                      </motion.div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="font-bold text-lg text-white">
                        {destination.name}
                      </h3>
                      <p className="text-gray-200 text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        {destination.location}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-white text-sm">
                          {destination.rating}
                        </span>
                        <span className="text-gray-300 text-xs">
                          ({destination.reviews})
                        </span>
                      </div>
                      <p className="mt-2 text-cyan-300 font-semibold">
                        {destination.price}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Best of the Week - This element sets the height */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="mb-6"
            >
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-4"
              >
                ✨ Best of this Week
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Discover Paradise in Bali
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 leading-relaxed"
              >
                Let's invest your money wisely and experience the breathtaking
                beauty of Bali to the fullest. Create unforgettable memories in
                the island of gods.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate={statsInView ? "visible" : "hidden"}
                    variants={statsVariants}
                    className="text-center p-3 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50"
                  >
                    <IconComponent className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(to right, #0891b2, #0369a1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3"
            >
              <motion.span initial={false} animate={{ x: 0 }} whileHover={{ x: -2 }}>
                Explore New Places
              </motion.span>
              <motion.div initial={false} animate={{ x: 0 }} whileHover={{ x: 4 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-500">
                Trusted by 10,000+ travelers worldwide
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollAnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-teal-500">Us</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide exceptional travel experiences with attention to every detail, ensuring your journey is unforgettable.
          </p>
        </ScrollAnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
      </div>
    </motion.section>
  );
}