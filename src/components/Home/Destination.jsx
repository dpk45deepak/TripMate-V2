import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, MapPin, Star, Heart, Calendar, Users } from 'lucide-react';

const Destination = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  // Sample destination data
  const destinations = [
    {
      id: 1,
      title: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 1247,
      price: 899,
      duration: "7 days",
      category: "Beach"
    },
    {
      id: 2,
      title: "Kyoto, Japan",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 892,
      price: 1250,
      duration: "10 days",
      category: "Cultural"
    },
    {
      id: 3,
      title: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 1563,
      price: 1100,
      duration: "6 days",
      category: "Island"
    },
    {
      id: 4,
      title: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 734,
      price: 1500,
      duration: "8 days",
      category: "Mountain"
    },
    {
      id: 5,
      title: "Paris, France",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTswgN5j3WJ5vL8HNRofYiKIahlNReGxxiO4w&s",
      rating: 4.6,
      reviews: 2105,
      price: 950,
      duration: "5 days",
      category: "City"
    },
    {
      id: 6,
      title: "Maldives",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 987,
      price: 1800,
      duration: "7 days",
      category: "Luxury"
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4 rounded-xl py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="text-center space-y-8">
            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight"
            >
              Find Your Best
              <motion.span
                initial={{ backgroundPositionX: '0%' }}
                animate={{ backgroundPositionX: '100%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Destination
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              We have more than <span className="font-semibold text-blue-600">2000+ destinations</span> you can choose from around the world
            </motion.p>

            {/* Search Bar */}
            <motion.form
              variants={searchVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <motion.input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Destination"
                  className="w-full px-6 py-4 text-lg rounded-2xl border-0 shadow-xl shadow-blue-500/10 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  whileFocus={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={24} />
                </motion.button>
              </div>
            </motion.form>
          </div>

          {/* Destinations Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-300"
              >
                {/* Favorite Button */}
                <motion.button
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={20} 
                    className={favorites.has(destination.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                  />
                </motion.button>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {destination.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {destination.title}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-700">{destination.rating}</span>
                    </div>
                    <span className="text-gray-500">({destination.reviews} reviews)</span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} />
                      <span className="text-sm">2 Adults</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">₨{destination.price}</span>
                      <span className="text-gray-500 text-sm">/person</span>
                    </div>
                    <motion.button
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.button
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 right-10 w-6 h-6 bg-purple-400 rounded-full opacity-40"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-300 rounded-full opacity-50"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Destination;