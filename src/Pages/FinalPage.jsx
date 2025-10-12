import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Centralised Backend API file
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

// Weather Widget Component
const WeatherWidget = ({ location, country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using OpenWeatherMap API - you'll need to replace with your API key
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location},${country}&appid=${apiKey}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          // Group by day and take first 5 days
          const dailyData = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
          setWeatherData(dailyData);
        } else {
          throw new Error('Weather data not available');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback mock data
        setWeatherData(generateMockWeather());
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, country]);

  const generateMockWeather = () => {
    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Clear'];
    const temperatures = [18, 22, 25, 20, 23];
    
    return Array.from({ length: 5 }, (_, i) => ({
      dt: Date.now() / 1000 + i * 86400,
      main: { temp: temperatures[i] },
      weather: [{ main: weatherConditions[i], description: weatherConditions[i].toLowerCase() }],
      dt_txt: new Date(Date.now() + i * 86400000).toISOString()
    }));
  };

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'cloudy':
      case 'partly cloudy':
        return '⛅';
      case 'rainy':
        return '🌧️';
      default:
        return '🌤️';
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">5-Day Weather Forecast</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-20 text-center animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-indigo-800 mb-4">5-Day Weather Forecast</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {weatherData?.map((day, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-20 text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-sm font-semibold text-gray-600 mb-2">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-2xl mb-2">{getWeatherIcon(day.weather[0]?.main)}</div>
            <div className="text-lg font-bold text-gray-800">{Math.round(day.main.temp)}°C</div>
            <div className="text-xs text-gray-500 capitalize mt-1">{day.weather[0]?.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Currency Converter Component
const CurrencyConverter = ({ basePrice, country, location }) => {
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);

  // Currency mapping for different countries
  const countryCurrencyMap = {
    'NORWAY': 'NOK',
    'AUSTRIA': 'EUR',
    'BELGIUM': 'EUR', 
    'SWITZERLAND': 'CHF',
    'ITALY': 'EUR',
    'INDIA': 'INR',
    'USA': 'USD',
    'UK': 'GBP',
    'JAPAN': 'JPY',
    'AUSTRALIA': 'AUD',
    'CANADA': 'CAD'
  };

  useEffect(() => {
    const currency = countryCurrencyMap[country] || 'USD';
    setTargetCurrency(currency);
    convertCurrency(basePrice, currency);
  }, [basePrice, country]);

  const convertCurrency = async (amount, toCurrency) => {
    setLoading(true);
    try {
      // Using a free currency API - you might want to use a more reliable one
      const response = await fetch(`https://api.exchangerate.host/latest?base=INR&symbols=${toCurrency}`);
      const data = await response.json();
      
      if (data.success) {
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        setConvertedPrice((amount * rate).toFixed(2));
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      console.error('Error converting currency:', error);
      // Fallback rates
      const fallbackRates = {
        'USD': 0.012, 'EUR': 0.011, 'GBP': 0.0095, 
        'NOK': 0.13, 'CHF': 0.011, 'JPY': 1.8, 
        'AUD': 0.018, 'CAD': 0.016
      };
      const rate = fallbackRates[toCurrency] || 0.012;
      setExchangeRate(rate);
      setConvertedPrice((amount * rate).toFixed(2));
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹',
      'NOK': 'kr', 'CHF': 'CHF', 'JPY': '¥', 
      'AUD': 'A$', 'CAD': 'C$'
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-teal-100 p-4 rounded-2xl border border-green-200">
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        <icons.IndianRupee className="w-4 h-4 mr-2 text-green-600" />
        Currency Conversion
      </h4>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-green-200 rounded mb-2"></div>
          <div className="h-4 bg-green-200 rounded"></div>
        </div>
      ) : convertedPrice && exchangeRate ? (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Indian Rupee:</span>
            <span className="font-bold text-gray-800">₹{basePrice?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{targetCurrency}:</span>
            <span className="font-bold text-green-700">
              {getCurrencySymbol(targetCurrency)}{convertedPrice}
            </span>
          </div>
          <div className="text-xs text-gray-500 text-right">
            1 INR = {exchangeRate.toFixed(4)} {targetCurrency}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Conversion unavailable</div>
      )}
    </div>
  );
};

// Enhanced Card Component
const DestinationCard = ({ destination, onSelect, large = false, isFavorite, onToggleFavorite }) => {
  const { flag, country, title, image, details } = destination;
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const content = large ? (
    <div className="flex flex-col h-full relative group">
      <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse flex items-center justify-center">
            <icons.Star className="w-8 h-8 text-indigo-300" />
          </div>
        )}
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Favorite Button */}
        <motion.button
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(destination.id);
          }}
        >
          <icons.Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} 
          />
        </motion.button>
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-white/90 mb-1">{flag} {country}</p>
              <h2 className="text-xl font-bold text-white leading-tight">{title}</h2>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
              <icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-white text-sm font-semibold">{details.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <icons.Users className="w-4 h-4 mr-1 text-teal-500" />
            <span>{details.people} people</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <icons.MapPin className="w-4 h-4 mr-1 text-teal-500" />
            <span>{details.distance}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <icons.Calendar className="w-4 h-4 mr-1 text-teal-500" />
              <span>{details.dates}</span>
            </div>
            <div className="text-lg font-bold text-teal-600">₹{details.price?.toLocaleString()}</div>
          </div>
          <motion.div
            className="w-10 h-10 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -3px rgba(52, 211, 153, 0.4)" }}
            whileTap={{ scale: 0.9 }}
          >
            <icons.ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-shrink-0 w-64 md:w-80 h-32 bg-white rounded-xl shadow-md overflow-hidden flex cursor-pointer group relative">
      <div className="w-1/3 h-full overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-full bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse flex items-center justify-center">
            <icons.Star className="w-6 h-6 text-indigo-300" />
          </div>
        )}
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div className='flex items-center justify-between'>
          <p className="text-xs font-semibold text-indigo-500">{flag} {country}</p>
          <div className="flex items-center">
            <icons.Star className='w-3 h-3 text-yellow-400 fill-yellow-400 mr-1'/>
            <span className="text-xs font-semibold text-gray-600">{details.rating}</span>
          </div>
        </div>
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-700 transition-colors">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 flex items-center">
            <icons.Calendar className="w-3 h-3 mr-1 text-teal-400" /> 
            {details.dates?.split(' - ')[0]}...
          </p>
          <span className="text-sm font-bold text-teal-600">₹{details.price?.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Favorite Button for small cards */}
      <motion.button
        className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(destination.id);
        }}
      >
        <icons.Heart 
          className={`w-3 h-3 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} 
        />
      </motion.button>
    </div>
  );

  return (
    <motion.div
      className={large ? "col-span-1" : ""}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(destination)}
      layoutId={`card-${destination.id}`}
    >
      {content}
    </motion.div>
  );
};

// Filter Component
const FilterBar = ({ activeFilters, onFilterChange, resultsCount, tripType, onTripTypeChange }) => {
  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center">
          <icons.Filter className="w-5 h-5 text-indigo-500 mr-2" />
          <span className="font-semibold text-gray-700">Filters</span>
          {resultsCount && (
            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
              {resultsCount} results
            </span>
          )}
        </div>
        
        {/* Trip Type Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Trip Type:</span>
          <div className="flex flex-wrap gap-2">
            {['All', 'Domestic', 'Foreign'].map(type => (
              <button
                key={type}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  tripType === type 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onTripTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Season Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Season:</span>
          <div className="flex flex-wrap gap-2">
            {['All', 'Spring', 'Summer', 'Autumn', 'Winter'].map(season => (
              <button
                key={season}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  activeFilters.season === season 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onFilterChange('season', season)}
              >
                {season}
              </button>
            ))}
          </div>
        </div>
        
        {/* Difficulty Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Difficulty:</span>
          <div className="flex flex-wrap gap-2">
            {['All', 'Easy', 'Moderate', 'Challenging'].map(difficulty => (
              <button
                key={difficulty}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  activeFilters.difficulty === difficulty 
                    ? 'bg-teal-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onFilterChange('difficulty', difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced List View
const ListView = ({ onSelect, favorites, onToggleFavorite, domesticTrips, foreignTrips, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tripType, setTripType] = useState('All');
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
    
    return matchesSearch && matchesTripType && matchesSeason && matchesDifficulty;
  });
  
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value === 'All' ? 'All' : value
    }));
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light">Loading trips...</h1>
            <p className="text-gray-500 mt-1">Please wait while we fetch your adventures</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
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
      {/* Header and Weather */}
      <div className="flex justify-between items-center text-gray-900">
        <div className="flex flex-col">
          <h1 className="text-3xl font-light">Hello, <span className="font-bold text-indigo-600">Traveler!</span> 👋</h1>
          <p className="text-gray-500 mt-1">Discover your next adventure</p>
        </div>
        <motion.div 
          className="flex items-center p-3 rounded-xl bg-white shadow-md text-teal-600 font-semibold"
          whileHover={{ scale: 1.05 }}
        >
          <icons.Sun className="w-5 h-5 mr-2" />
          <span className="text-sm">Weather: 19°C • Sunny</span>
        </motion.div>
      </div>

      {/* Trip Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Domestic Trips</p>
              <p className="text-2xl font-bold text-blue-600">{processedDomesticTrips.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <icons.MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Foreign Trips</p>
              <p className="text-2xl font-bold text-green-600">{processedForeignTrips.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <icons.ArrowRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-purple-600">{allDestinations.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <icons.Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destination Title */}
      <div className="space-y-1">
        <p className="text-lg font-light text-gray-500">Must-See Adventure</p>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
          Global Destinations
        </h2>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations, tours, locations..."
          className="w-full p-4 pl-12 bg-white border border-indigo-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Bar */}
      <FilterBar 
        activeFilters={activeFilters} 
        onFilterChange={handleFilterChange}
        onTripTypeChange={handleTripTypeChange}
        tripType={tripType}
        resultsCount={filteredDestinations.length}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Featured Card */}
        {filteredDestinations.length > 0 && (
          <div className="lg:col-span-2">
            <DestinationCard 
              destination={filteredDestinations[0]} 
              onSelect={onSelect} 
              large 
              isFavorite={favorites.includes(filteredDestinations[0].id)}
              onToggleFavorite={onToggleFavorite}
            />
          </div>
        )}
        
        {/* Sidebar/Extra Content */}
        <motion.div
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center lg:col-span-1 min-h-[200px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          <icons.Star className="w-10 h-10 text-yellow-400 fill-yellow-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Your Next Adventure Awaits</h3>
          <p className="text-indigo-200 text-sm">Explore curated trips hand-picked by our experts.</p>
          <motion.button
            className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-full font-semibold text-sm shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Deals
          </motion.button>
        </motion.div>
      </div>
      
      {/* Horizontal Scroll Cards */}
      {filteredDestinations.length > 1 && (
        <>
          <h3 className="text-2xl font-bold text-indigo-900 pt-4">Other Popular Trips</h3>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {filteredDestinations.slice(1).map(destination => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
                onSelect={onSelect}
                isFavorite={favorites.includes(destination.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </>
      )}

      {/* No Results State */}
      {filteredDestinations.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <icons.Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No destinations found</h3>
          <p className="text-gray-500">Try adjusting your search or filters to find more options.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

// Enhanced Detail View
const DetailView = ({ destination, onBack, favorites, onToggleFavorite }) => {
  if (!destination) return null;
  const d = destination.details;
  const [currentImage, setCurrentImage] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const images = [
    destination.image,
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ];

  const IconText = ({ icon: Icon, text, subtext }) => (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-2 bg-teal-50 rounded-lg">
        <Icon className="w-5 h-5 text-teal-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-900">{text}</p>
        {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto pb-10"
      layoutId={`card-${destination.id}`}
    >
      {/* Hero Image Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-b-3xl shadow-2xl">
        <motion.img 
          key={currentImage}
          src={images[currentImage]} 
          alt={destination.title} 
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImage === index ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        
        {/* Overlay Header */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center">
          <motion.button
            onClick={onBack}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-indigo-600 hover:bg-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <icons.ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-gray-600 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleFavorite(destination.id)}
            >
              <icons.Heart 
                className={`w-6 h-6 ${favorites.includes(destination.id) ? 'fill-red-500 stroke-red-500' : ''}`} 
              />
            </motion.button>
          </div>
        </div>

        {/* Bottom Overlay Info Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md rounded-t-3xl shadow-xl border-t border-indigo-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-lg font-semibold text-gray-500">{destination.flag} {destination.country}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 leading-tight mt-1">
                {destination.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                <icons.Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-bold text-gray-900">{d.rating}</span>
                <span className="text-gray-500 ml-1">({d.reviews})</span>
              </div>
            </div>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-indigo-100">
            <IconText icon={icons.Calendar} text={d.dates} subtext="Duration" />
            <IconText icon={icons.MapPin} text={d.distance} subtext="Distance" />
            <IconText icon={icons.Users} text={`${d.people} people`} subtext="Group Size" />
            <IconText icon={icons.IndianRupee} text={`₹${d.price?.toLocaleString()}`} subtext="Per person" />
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
        
        {/* Left Column: Description and Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weather Widget */}
          <WeatherWidget location={d.location} country={destination.country} />
          
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">The Journey</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {d.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Trip Highlights</h3>
                <ul className="space-y-2">
                  {d.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <icons.Check className="w-4 h-4 text-teal-500 mr-2" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {d.included?.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <icons.Check className="w-4 h-4 text-teal-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {d.amenities?.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-4 bg-indigo-50 rounded-lg shadow-sm border border-indigo-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <icons.Check className="w-5 h-5 text-teal-600 mr-3" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1 space-y-6">
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
                className="w-16 h-16 rounded-lg object-cover shadow-md"
              />
              <div>
                <h4 className="font-bold text-lg text-gray-900">{d.hotel}</h4>
                <p className="text-sm text-gray-500 flex items-center">
                  <icons.Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
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
      </div>

      {/* Booking Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-indigo-900 mb-2">Book Your Adventure</h3>
              <p className="text-gray-600 mb-6">Complete your booking for {destination.title}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Dates</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option>Select dates</option>
                    <option>May 10 - May 17, 2024</option>
                    <option>Jun 14 - Jun 21, 2024</option>
                    <option>Jul 12 - Jul 19, 2024</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
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
              
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setShowBookingModal(false)}
              >
                <icons.ArrowLeft className="w-6 h-6 transform rotate-180" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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