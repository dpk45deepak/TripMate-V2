import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Star, Heart, } from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      scale: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      scale: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const DestinationCarousel = ({ destinations = [] }) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Handle next/previous slide navigation
  const navigate = useCallback(
    (newDirection) => {
      setCurrentIndex(([currentIndex]) => {
        const nextIndex = (currentIndex + newDirection + destinations.length) % destinations.length;
        return [nextIndex, newDirection];
      });
      setAutoPlay(false);
      // Re-enable autoplay after a delay
      setTimeout(() => setAutoPlay(true), 8000);
    },
    [destinations.length]
  );

  // Auto-rotation effect
  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const interval = setInterval(() => {
      navigate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, isHovered, navigate]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        navigate(1);
      } else if (e.key === 'ArrowLeft') {
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Handle swipe gestures
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      navigate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      navigate(-1);
    }
  };

  if (!destinations || destinations.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl">
        <p className="text-gray-400">No destinations available</p>
      </div>
    );
  }

  const currentDestination = destinations[currentIndex];

  return (
    <div 
      className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-50"
      onMouseEnter={() => {
        setIsHovered(true);
        setAutoPlay(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setAutoPlay(true);
      }}
    >
      {/* Navigation Arrows */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous destination"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={() => navigate(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next destination"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              {/* Destination Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={currentDestination.image || 'https://placehold.co/800x500/4CAF50/ffffff?text=No+Image'}
                  alt={currentDestination.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>

              {/* Destination Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-md"
                >
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-teal-300" />
                    <span className="text-sm font-medium text-teal-100">
                      {currentDestination.location || 'Unknown Location'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{currentDestination.title}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">
                        {currentDestination.rating ? currentDestination.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                    {currentDestination.price && (
                      <span className="text-sm font-medium">
                        Rs. {currentDestination.price.toLocaleString()}
                        <span className="text-xs opacity-80"> / night</span>
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-100 line-clamp-2 mb-4">
                    {currentDestination.description || 'No description available.'}
                  </p>
                  
                  <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-full transition-colors flex items-center">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              </div>

              {/* Favorite Button */}
              <button 
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Add to favorites"
              >
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const direction = index > currentIndex ? 1 : -1;
              setCurrentIndex([index, direction]);
              setAutoPlay(false);
              setTimeout(() => setAutoPlay(true), 8000);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-teal-400 w-6' : 'bg-white/60 hover:bg-white'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationCarousel;
