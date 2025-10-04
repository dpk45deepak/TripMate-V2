import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, MapPin, Users, Hotel, ArrowRight } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const cardHoverVariants = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  hover: { 
    scale: 1.05,
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1 }
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
      duration: 0.6
    }
  })
};

// Custom Hook for InView Detection
function useAnimatedInView(threshold = 0.3) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '-50px 0px'
  });
  return [ref, inView];
}

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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNj1sfV1xkv05mg5aa3THujVeaQvOP6SMgg&s",
      price: "$1,200"
    },
    {
      id: 2,
      name: "SC. Mindanao",
      location: "Philippines",
      rating: 4.8,
      reviews: 8,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOGVgK5DXm2PHmmGDz6VVoBu39iuB17-wbQ&s",
      price: "$980"
    }
  ];

  const stats = [
    { icon: MapPin, value: "50+", label: "Destinations" },
    { icon: Users, value: "200+", label: "Tourists" },
    { icon: Hotel, value: "100+", label: "Hotels" }
  ];

  const features = [
    { 
      icon: "✓", 
      title: "Best Price Guarantee", 
      text: "Find a lower price? We'll match it.",
      delay: 0
    },
    { 
      icon: "24/7", 
      title: "24/7 Support", 
      text: "Round-the-clock customer service.",
      delay: 0.1
    },
    { 
      icon: "✈️", 
      title: "Easy Booking", 
      text: "Simple, fast, and secure reservations.",
      delay: 0.2
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Destination Cards */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {destinations.map((destination, index) => (
                <motion.div 
                  key={destination.id}
                  variants={itemVariants}
                  custom={index}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={destination.image} 
                      alt={destination.name}
                      variants={imageHoverVariants}
                      className="w-full h-48 object-cover"
                    />
                    {/* Price Badge */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                    >
                      <span className="font-bold text-cyan-600">{destination.price}</span>
                    </motion.div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.2 }}
                      className="flex items-start justify-between mb-2"
                    >
                      <h3 className="font-bold text-xl text-gray-900">{destination.name}</h3>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className="text-gray-600 mb-3 flex items-center gap-1"
                    >
                      <MapPin className="w-4 h-4 text-cyan-600" />
                      {destination.location}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.2 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-amber-700">{destination.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({destination.reviews} reviews)</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Best of the Week */}
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
                Let's invest your money wisely and experience the breathtaking beauty of Bali to 
                the fullest. Create unforgettable memories in the island of gods.
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
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(to right, #0891b2, #0369a1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3"
            >
              <motion.span
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: -2 }}
              >
                Explore New Places
              </motion.span>
              <motion.div
                initial={false}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
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
              <p className="text-sm text-gray-500">Trusted by 10,000+ travelers worldwide</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div 
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 cursor-pointer"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 200 }
                }}
                className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-cyan-600 font-bold text-xl">{feature.icon}</span>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}