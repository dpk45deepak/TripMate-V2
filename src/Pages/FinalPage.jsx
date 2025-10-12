import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Centralized Backend API file
import BACKEND_API from '../Services/Backend';

// Enhanced Icons with better organization
const icons = {
  Menu: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>,
  ArrowLeft: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Search: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Sun: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Calendar: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>,
  MapPin: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Star: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  DollarSign: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  ArrowRight: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Heart: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Users: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Filter: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Cloud: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
  IndianRupee: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h12"/><path d="M6 16h12"/><path d="M6 8h12"/><path d="M15 6v12"/><path d="M9 6v12"/></svg>
};

// Helper function to convert backend data to frontend format
const convertBackendToFrontend = (backendData, type) => {
  if (!backendData) return [];
  
  return backendData.map(trip => {
    // Generate dynamic dates based on current date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (trip.days || 7));
    
    const formattedDates = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
    // Get country flag based on location
    const getFlagEmoji = (countryCode) => {
      const flagEmojis = {
        'NORWAY': '🇳🇴',
        'AUSTRIA': '🇦🇹',
        'INDIA': '🇮🇳',
        'USA': '🇺🇸',
        'UK': '🇬🇧',
        'JAPAN': '🇯🇵',
        'AUSTRALIA': '🇦🇺',
        'CANADA': '🇨🇦'
      };
      return flagEmojis[countryCode] || '🏳️';
    };

    // Generate mock images based on location
    const getMockImage = (location, name) => {
      const imageMap = {
        'NORWAY': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'AUSTRIA': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'INDIA': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'HIMALAYAS': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'GOA': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      };
      
      return imageMap[location] || imageMap[name] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    };

    return {
      id: trip._id || trip.id || Math.random().toString(36).substr(2, 9),
      country: trip.location || 'Unknown',
      flag: type === 'domestic' ? '🇮🇳' : getFlagEmoji(trip.location),
      title: trip.name || 'Adventure Trip',
      image: trip.image || getMockImage(trip.location, trip.name),
      type: type,
      details: {
        location: trip.location || 'Unknown Location',
        altitude: `${Math.floor(Math.random() * 4000) + 1000}m`,
        rating: trip.rating || (Math.random() * 1 + 4).toFixed(1),
        reviews: Math.floor(Math.random() * 1000) + 100,
        price: trip.budget || Math.floor(Math.random() * 50000) + 10000,
        description: `Experience the beauty of ${trip.location}. ${trip.activityLevel ? `This ${trip.activityLevel.toLowerCase()} level trip` : 'This amazing trip'} is perfect for ${trip.health === 'good' ? 'all ages' : 'moderate fitness levels'}. Best visited during ${trip.bestSeason || 'spring and autumn'}.`,
        amenities: ['Guided Tours', 'Accommodation', 'Meals', trip.transport || 'Transport'],
        hotel: `${trip.location} ${type === 'domestic' ? 'Heritage' : 'Premium'} Resort`,
        duration: `${trip.days || 7} days`,
        distance: `${Math.floor(Math.random() * 50) + 10} km`,
        dates: formattedDates,
        people: Math.floor(Math.random() * 15) + 8,
        difficulty: trip.activityLevel?.charAt(0).toUpperCase() + trip.activityLevel?.slice(1) || 'Moderate',
        season: trip.bestSeason?.charAt(0).toUpperCase() + trip.bestSeason?.slice(1) || 'All Year',
        highlights: [
          `${trip.location} Main Attraction`,
          'Local Culture Experience',
          'Scenic Views',
          'Adventure Activities'
        ],
        included: ['Accommodation', 'Meals', 'Expert Guides', 'Equipment Rental']
      }
    };
  });
};


// Enhanced Weather Widget Component
const WeatherWidget = ({ location, country, compact = false }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... (keep your existing weather effect)
  }, [location, country]);

  if (compact) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <icons.Cloud className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Weather</span>
          </div>
          {loading ? (
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          ) : weatherData ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-800">{Math.round(weatherData[0]?.main.temp)}°C</span>
              <span className="ml-1 text-sm text-gray-600 capitalize">{weatherData[0]?.weather[0]?.description}</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // ... (keep your existing full weather widget)
};

// Enhanced Currency Converter Component
const CurrencyConverter = ({ basePrice, country, location, compact = false }) => {
  // ... (keep your existing currency converter logic)

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-3 rounded-xl border border-green-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Price</span>
          {loading ? (
            <div className="h-4 w-20 bg-green-200 rounded animate-pulse"></div>
          ) : convertedPrice ? (
            <div className="text-right">
              <div className="font-bold text-green-700">
                {getCurrencySymbol(targetCurrency)}{convertedPrice}
              </div>
              <div className="text-xs text-gray-500">₹{basePrice?.toLocaleString()}</div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">₹{basePrice?.toLocaleString()}</div>
          )}
        </div>
      </div>
    );
  }

  // ... (keep your existing full currency converter)
};

// Enhanced Quick Stats Component
const QuickStats = ({ domesticCount, foreignCount, totalCount }) => {
  return (
    <motion.div 
      className="grid grid-cols-3 gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Domestic</p>
            <p className="text-2xl font-bold">{domesticCount}</p>
          </div>
          <div className="w-10 h-10 bg-blue-400/30 rounded-full flex items-center justify-center">
            <icons.MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Foreign</p>
            <p className="text-2xl font-bold">{foreignCount}</p>
          </div>
          <div className="w-10 h-10 bg-green-400/30 rounded-full flex items-center justify-center">
            <icons.ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total</p>
            <p className="text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="w-10 h-10 bg-purple-400/30 rounded-full flex items-center justify-center">
            <icons.Star className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Category Navigation
const CategoryNavigation = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Trips', icon: icons.Star, count: 0 },
    { id: 'domestic', name: 'Domestic', icon: icons.MapPin, count: 0 },
    { id: 'foreign', name: 'Foreign', icon: icons.ArrowRight, count: 0 },
    { id: 'featured', name: 'Featured', icon: icons.Heart, count: 0 },
    { id: 'trending', name: 'Trending', icon: icons.Users, count: 0 },
  ];

  return (
    <div className="flex overflow-x-auto space-x-3 pb-4 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category.id)}
        >
          <category.icon className="w-4 h-4" />
          <span className="font-medium">{category.name}</span>
          {category.count > 0 && (
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {category.count}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

// Enhanced Destination Card with Grid Layout
const DestinationCard = ({ destination, onSelect, layout = 'grid', isFavorite, onToggleFavorite }) => {
  const { flag, country, title, image, details } = destination;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (layout === 'list') {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(destination)}
      >
        <div className="flex h-32">
          <div className="w-1/3 relative overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse" />
            )}
            <img 
              src={image} 
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
            />
            <div className="absolute top-2 left-2">
              <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                {flag} {country}
              </div>
            </div>
          </div>
          
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {title}
                </h3>
                <motion.button
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(destination.id);
                  }}
                >
                  <icons.Heart 
                    className={`w-4 h-4 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} 
                  />
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <div className="flex items-center">
                  <icons.Calendar className="w-3 h-3 mr-1 text-teal-500" />
                  {details.duration}
                </div>
                <div className="flex items-center">
                  <icons.Users className="w-3 h-3 mr-1 text-blue-500" />
                  {details.people} people
                </div>
                <div className="flex items-center">
                  <icons.Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                  {details.rating}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-teal-600">₹{details.price?.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{details.dates.split(' - ')[0]}</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid layout (default)
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
      whileHover={{ 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(destination)}
      layoutId={`card-${destination.id}`}
    >
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse flex items-center justify-center">
            <icons.Star className="w-8 h-8 text-indigo-300" />
          </div>
        )}
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {flag} {country}
          </div>
          <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {details.difficulty}
          </div>
        </div>
        
        {/* Favorite button */}
        <motion.button
          className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(destination.id);
          }}
        >
          <icons.Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} 
          />
        </motion.button>
        
        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <icons.Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-white text-sm font-bold">{details.rating}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-white/90 text-sm">
            <div className="flex items-center">
              <icons.MapPin className="w-3 h-3 mr-1" />
              {details.distance}
            </div>
            <div className="font-bold text-white">₹{details.price?.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <icons.Calendar className="w-4 h-4 mr-1 text-teal-500" />
            <span>{details.dates}</span>
          </div>
          <div className="flex items-center">
            <icons.Users className="w-4 h-4 mr-1 text-blue-500" />
            <span>{details.people}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {details.amenities?.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                {amenity}
              </span>
            ))}
            {details.amenities?.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                +{details.amenities.length - 3}
              </span>
            )}
          </div>
          
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(52, 211, 153, 0.5)" }}
          >
            <icons.ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Filter Bar with more options
const FilterBar = ({ activeFilters, onFilterChange, resultsCount, tripType, onTripTypeChange, viewMode, onViewModeChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <icons.Filter className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="font-semibold text-gray-700">Filters</span>
            {resultsCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                {resultsCount} results
              </span>
            )}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onViewModeChange('grid')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onViewModeChange('list')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Trip Type Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={tripType}
              onChange={(e) => onTripTypeChange(e.target.value)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="Domestic">Domestic</option>
              <option value="Foreign">Foreign</option>
            </select>
          </div>
          
          {/* Season Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={activeFilters.season}
              onChange={(e) => onFilterChange('season', e.target.value)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Seasons</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
            </select>
          </div>
          
          {/* Difficulty Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={activeFilters.difficulty}
              onChange={(e) => onFilterChange('difficulty', e.target.value)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div className="flex items-center space-x-2">
            <select
              value={activeFilters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Any Price</option>
              <option value="0-10000">Under ₹10k</option>
              <option value="10000-25000">₹10k - ₹25k</option>
              <option value="25000-50000">₹25k - ₹50k</option>
              <option value="50000+">Over ₹50k</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Featured Destinations Carousel
const FeaturedCarousel = ({ destinations, onSelect, onToggleFavorite, favorites }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!destinations.length) return null;

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden">
      <div className="relative h-80 md:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={destinations[currentSlide].image} 
              alt={destinations[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
                    {destinations[currentSlide].flag} {destinations[currentSlide].country}
                  </span>
                  <span className="bg-teal-500 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {destinations[currentSlide].title}
                </h2>
                
                <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                  {destinations[currentSlide].details.description}
                </p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <icons.Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-semibold">{destinations[currentSlide].details.rating}</span>
                    <span className="text-gray-300 ml-1">({destinations[currentSlide].details.reviews})</span>
                  </div>
                  <div className="flex items-center">
                    <icons.Calendar className="w-5 h-5 mr-1 text-gray-300" />
                    <span>{destinations[currentSlide].details.duration}</span>
                  </div>
                  <div className="text-xl font-bold text-teal-300">
                    ₹{destinations[currentSlide].details.price?.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(destinations[currentSlide])}
                  >
                    Explore Now
                  </motion.button>
                  
                  <motion.button
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFavorite(destinations[currentSlide].id)}
                  >
                    <icons.Heart 
                      className={`w-5 h-5 ${favorites.includes(destinations[currentSlide].id) ? 'fill-red-500 stroke-red-500' : ''}`} 
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? destinations.length - 1 : prev - 1))}
      >
        <icons.ArrowLeft className="w-5 h-5" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        onClick={() => setCurrentSlide((prev) => (prev === destinations.length - 1 ? 0 : prev + 1))}
      >
        <icons.ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Enhanced List View
const ListView = ({ onSelect, favorites, onToggleFavorite, domesticTrips, foreignTrips, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tripType, setTripType] = useState('All');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    season: 'All',
    difficulty: 'All',
    priceRange: 'All'
  });

  // Convert backend data to frontend format
  const processedDomesticTrips = convertBackendToFrontend(domesticTrips, 'domestic');
  const processedForeignTrips = convertBackendToFrontend(foreignTrips, 'foreign');

  // Combine all destinations
  const allDestinations = [
    ...processedDomesticTrips,
    ...processedForeignTrips
  ];

  // Filter destinations based on search and filters
  const filteredDestinations = allDestinations.filter(destination => {
    const matchesSearch = destination.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                         destination.country?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
                         destination.details.location?.toLowerCase().includes(searchQuery?.toLowerCase());
    
    const matchesTripType = tripType === 'All' || 
                          (tripType === 'Domestic' && destination.type === 'domestic') ||
                          (tripType === 'Foreign' && destination.type === 'foreign');
    
    const matchesSeason = activeFilters.season === 'All' || 
                         destination.details.season === activeFilters.season;
    
    const matchesDifficulty = activeFilters.difficulty === 'All' || 
                            destination.details.difficulty === activeFilters.difficulty;
    
    const matchesPrice = activeFilters.priceRange === 'All' || 
                        (activeFilters.priceRange === '0-10000' && destination.details.price <= 10000) ||
                        (activeFilters.priceRange === '10000-25000' && destination.details.price > 10000 && destination.details.price <= 25000) ||
                        (activeFilters.priceRange === '25000-50000' && destination.details.price > 25000 && destination.details.price <= 50000) ||
                        (activeFilters.priceRange === '50000+' && destination.details.price > 50000);
    
    return matchesSearch && matchesTripType && matchesSeason && matchesDifficulty && matchesPrice;
  });

  // Get featured destinations (first 3)
  const featuredDestinations = allDestinations.slice(0, 3);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Skeleton Loading */}
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Unable to load trips</h3>
          <p className="text-gray-500">{error}</p>
          <button 
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-light">
            Hello, <span className="font-bold text-indigo-600">Traveler!</span> 👋
          </h1>
          <p className="text-gray-500 text-lg">Discover your next adventure around the world</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <WeatherWidget location="Current" country="Location" compact />
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Local Time</div>
            <div className="font-semibold text-gray-800">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats 
        domesticCount={processedDomesticTrips.length}
        foreignCount={processedForeignTrips.length}
        totalCount={allDestinations.length}
      />

      {/* Featured Carousel */}
      {featuredDestinations.length > 0 && (
        <FeaturedCarousel 
          destinations={featuredDestinations}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      )}

      {/* Category Navigation */}
      <CategoryNavigation 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Search Bar */}
      <div className="relative">
        <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations, tours, locations, activities..."
          className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <FilterBar 
        activeFilters={activeFilters} 
        onFilterChange={handleFilterChange}
        onTripTypeChange={setTripType}
        tripType={tripType}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultsCount={filteredDestinations.length}
      />

      {/* Destinations Grid/List */}
      {filteredDestinations.length > 0 ? (
        <motion.div 
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }
          layout
        >
          {filteredDestinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={onSelect}
              layout={viewMode}
              isFavorite={favorites.includes(destination.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <icons.Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-700 mb-3">No destinations found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            We couldn't find any trips matching your criteria. Try adjusting your search or filters.
          </p>
          <button
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
            onClick={() => {
              setSearchQuery('');
              setActiveFilters({ season: 'All', difficulty: 'All', priceRange: 'All' });
              setTripType('All');
            }}
          >
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* Load More Button */}
      {filteredDestinations.length > 0 && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
            Load More Destinations
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Enhanced Detail View (keep your existing DetailView but add these improvements)
// Add these sections to your existing DetailView:

// 1. Add a compact header for mobile
// 2. Add image gallery with thumbnails
// 3. Add a sticky booking widget
// 4. Add a map integration section
// 5. Add customer reviews section
// 6. Add similar trips recommendations

// Keep the rest of your existing DetailView component, but consider adding:
// Enhanced Detail View Component
const DetailView = ({ destination, onBack, favorites, onToggleFavorite, similarTrips = [], onSelect }) => {
  if (!destination) return null;
  
  const d = destination.details;
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookingSticky, setIsBookingSticky] = useState(false);

  // Enhanced images array with more variety
  const images = [
    destination.image,
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely breathtaking experience! The guides were knowledgeable and the scenery was beyond expectations.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 month ago",
      comment: "Great adventure with amazing views. The accommodation was comfortable and food was delicious.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    }
  ];

  // Sticky booking widget effect
  useEffect(() => {
    const handleScroll = () => {
      const bookingWidget = document.getElementById('booking-widget');
      if (bookingWidget) {
        const rect = bookingWidget.getBoundingClientRect();
        setIsBookingSticky(rect.top <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced IconText component
  const IconText = ({ icon: Icon, text, subtext, color = "teal" }) => (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`p-3 bg-${color}-50 rounded-lg`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 text-lg">{text}</p>
        {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  // Review Stars Component
  const ReviewStars = ({ rating }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <icons.Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  // Navigation Tabs Component
  const DetailTabs = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="flex overflow-x-auto border-b border-gray-200">
        {['overview', 'itinerary', 'reviews', 'location', 'photos'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed text-lg">{d.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Trip Highlights</h3>
                <ul className="space-y-3">
                  {d.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">What's Included</h3>
                <ul className="space-y-3">
                  {d.included?.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center mt-2">
                  <ReviewStars rating={d.rating} />
                  <span className="ml-2 text-gray-600">{d.rating} out of 5</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{d.reviews} reviews</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                Write a Review
              </button>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <ReviewStars rating={review.rating} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'location' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Location & Map</h3>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <icons.MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map of {d.location}</p>
                <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                  View Full Map
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Getting There</h4>
                <p className="text-sm text-gray-600">Nearest airport: {d.location} International Airport</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
                <p className="text-sm text-gray-600">{d.season} season</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'photos' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${destination.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Sticky Booking Widget Component
  const StickyBookingWidget = () => (
    <motion.div
      id="booking-widget"
      className={`bg-white rounded-2xl shadow-2xl border border-gray-200 ${
        isBookingSticky ? 'fixed top-4 z-40 w-[380px]' : 'relative'
      }`}
      initial={isBookingSticky ? { scale: 0.95, opacity: 0 } : false}
      animate={isBookingSticky ? { scale: 1, opacity: 1 } : false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Book This Trip</h3>
            <p className="text-2xl font-extrabold text-teal-600 mt-1">₹{d.price?.toLocaleString()}</p>
            <p className="text-sm text-gray-500">per person</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-bold text-gray-900">{d.rating}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Next available:</span>
            <span className="font-medium text-gray-900">{d.dates}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-gray-900">{d.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Group size:</span>
            <span className="font-medium text-gray-900">{d.people} people</span>
          </div>
        </div>
        
        <motion.button
          className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowBookingModal(true)}
        >
          Book Now
          <icons.ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
        
        <p className="text-xs text-center text-gray-400 mt-3">
          Free cancellation up to 30 days before travel
        </p>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
      layoutId={`card-${destination.id}`}
    >
      {/* Compact Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onBack}
          >
            <icons.ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 truncate max-w-xs text-center">
            {destination.title}
          </h1>
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => onToggleFavorite(destination.id)}
          >
            <icons.Heart 
              className={`w-6 h-6 ${favorites.includes(destination.id) ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.img 
          key={currentImage}
          src={images[currentImage]} 
          alt={destination.title} 
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Desktop Header */}
        <div className="absolute top-0 left-0 w-full p-6 hidden lg:flex justify-between items-center">
          <motion.button
            onClick={onBack}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all group"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <icons.ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-600 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleFavorite(destination.id)}
            >
              <icons.Heart 
                className={`w-6 h-6 ${favorites.includes(destination.id) ? 'fill-red-500 stroke-red-500' : ''}`} 
              />
            </motion.button>
            <motion.button
              className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-600 hover:text-blue-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <icons.ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImage === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        {/* Image Thumbnails */}
        <div className="absolute bottom-6 right-6 hidden lg:flex space-x-2">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImage === index 
                  ? 'border-white scale-110' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {destination.flag} {destination.country}
              </span>
              <span className="bg-teal-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {d.difficulty}
              </span>
              <span className="bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {d.duration}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {destination.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center">
                <icons.Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="font-bold">{d.rating}</span>
                <span className="text-white/80 ml-1">({d.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <icons.MapPin className="w-5 h-5 mr-2 text-white/80" />
                <span>{d.location}</span>
              </div>
              <div className="flex items-center">
                <icons.Users className="w-5 h-5 mr-2 text-white/80" />
                <span>{d.people} people max</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <IconText icon={icons.Calendar} text={d.dates} subtext="Travel Dates" color="blue" />
              <IconText icon={icons.MapPin} text={d.distance} subtext="Distance" color="green" />
              <IconText icon={icons.Users} text={`${d.people} people`} subtext="Group Size" color="purple" />
              <IconText icon={icons.IndianRupee} text={`₹${d.price?.toLocaleString()}`} subtext="Per person" color="teal" />
            </motion.div>

            {/* Weather Widget */}
            <WeatherWidget location={d.location} country={destination.country} />

            {/* Tabbed Content */}
            <DetailTabs />

            {/* Amenities Section */}
            <motion.section 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-indigo-800 mb-6">Amenities & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {d.amenities?.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <icons.Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Similar Trips Section */}
            {similarTrips.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">Similar Adventures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarTrips.slice(0, 4).map(trip => (
                    <DestinationCard
                      key={trip.id}
                      destination={trip}
                      onSelect={onSelect}
                      layout="list"
                      isFavorite={favorites.includes(trip.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className={`${isBookingSticky ? 'lg:h-0 lg:overflow-hidden' : 'space-y-6'}`}>
              {/* Currency Converter */}
              <CurrencyConverter 
                basePrice={d.price} 
                country={destination.country}
                location={d.location}
              />

              {/* Hotel Card */}
              <motion.div 
                className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-indigo-800 mb-4">Accommodation</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt={d.hotel} 
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{d.hotel}</h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {d.rating} ({d.reviews} reviews)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per person</span>
                    <span className="text-2xl font-extrabold text-teal-600">₹{d.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Taxes & fees</span>
                    <span>Included</span>
                  </div>
                </div>
              </motion.div>

              {/* Trip Details Card */}
              <motion.div 
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Difficulty</span>
                    <span className="font-semibold">{d.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Season</span>
                    <span className="font-semibold">{d.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Altitude</span>
                    <span className="font-semibold">{d.altitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trip Type</span>
                    <span className="font-semibold">{destination.type === 'domestic' ? 'Domestic' : 'Foreign'}</span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center transition-all hover:shadow-xl hover:shadow-teal-300/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowBookingModal(true)}
              >
                Book Your Trip Now
                <icons.ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>

              <p className="text-xs text-center text-gray-400">Secure payment via Google Pay, Apple Pay, and major cards.</p>
            </div>

            {/* Sticky Booking Widget */}
            <div className="hidden lg:block">
              <StickyBookingWidget />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-indigo-900">Book Your Adventure</h3>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowBookingModal(false)}
                >
                  <icons.ArrowLeft className="w-6 h-6 transform rotate-180" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">Complete your booking for {destination.title}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                    <option>Select dates</option>
                    <option>May 10 - May 17, 2024</option>
                    <option>Jun 14 - Jun 21, 2024</option>
                    <option>Jul 12 - Jul 19, 2024</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10"
                    defaultValue="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-teal-600">₹{d.price?.toLocaleString()}</span>
                  </div>
                  
                  <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                    Continue to Payment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main App component (keep your existing App component)
// The enhanced version includes all the new components and improvements

// Main App component
const App = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [domesticTrips, setDomesticTrips] = useState([]);
  const [foreignTrips, setForeignTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔁 Function to fetch both trip preferences
  const getTripPreferences = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [domesticRes, foreignRes] = await Promise.all([
        BACKEND_API.getDomesticPreferences(),
        BACKEND_API.getForeignPreferences(),
      ]);
      
      // Handle both array responses and object responses with data property
      const domesticData = Array.isArray(domesticRes) ? domesticRes : (domesticRes?.data || []);
      const foreignData = Array.isArray(foreignRes) ? foreignRes : (foreignRes?.data || []);
      
      setDomesticTrips(domesticData);
      setForeignTrips(foreignData);
      
      // If no data is available, show a message
      if (domesticData.length === 0 && foreignData.length === 0) {
        setError("No trip data available. Please check back later.");
      }
    } catch (err) {
      console.error("Error fetching trip preferences:", err);
      setError("Failed to fetch trip preferences. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fetch when component loads
  useEffect(() => {
    getTripPreferences();
  }, []);

  const handleSelect = (destination) => {
    setSelectedDestination(destination);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedDestination(null);
    window.scrollTo(0, 0);
  };

  const handleToggleFavorite = (destinationId) => {
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 font-sans antialiased p-4">
      <AnimatePresence mode="wait">
        {selectedDestination ? (
          <DetailView 
            key="detail" 
            destination={selectedDestination} 
            onBack={handleBack}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <ListView 
            key="list" 
            onSelect={handleSelect}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            domesticTrips={domesticTrips}
            foreignTrips={foreignTrips}
            loading={loading}
            error={error}
          />
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;