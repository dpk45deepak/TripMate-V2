import { useState } from "react";
import { motion } from "framer-motion";
import {
    Star, MapPin, Heart, Navigation,
    ChevronLeft, Globe, Clock, DollarSign,
    Shield, Plane, Hotel, Utensils, Camera, BookOpen,
    Download, Share2, Printer, MessageSquare,
    TrendingUp, Compass, Sun, Wind, Thermometer, CloudRain, Briefcase, Luggage, Wifi, Bell, Phone, Mail,
    CheckCircle, AlertCircle, Info,
    CreditCard, Users as UsersIcon
} from "lucide-react";
import PhotoGallery from './PhotoGallery.jsx';


// Weather component for destination
const WeatherWidget = ({ weather }) => {
    if (!weather) return null;

    return (
        <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Current Weather</h3>
                <div className="flex items-center gap-2">
                    {weather.temperature > 25 ? (
                        <Sun className="w-5 h-5 text-amber-500" />
                    ) : (
                        <CloudRain className="w-5 h-5 text-blue-500" />
                    )}
                    <span className="text-xl font-bold">{weather.temperature}°C</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">Wind</p>
                        <p className="font-medium">{weather.windSpeed} km/h</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Thermometer className="w-4 h-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">Humidity</p>
                        <p className="font-medium">{weather.humidity}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <CloudRain className="w-4 h-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">Precipitation</p>
                        <p className="font-medium">{weather.precipitation}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Sun className="w-4 h-4 text-gray-500" />
                    <div>
                        <p className="text-sm text-gray-500">UV Index</p>
                        <p className="font-medium">{weather.uvIndex}</p>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center">
                {weather.condition} • Feels like {weather.feelsLike}°C
            </p>
        </div>
    );
};

// Day itinerary component
const DayItinerary = ({ day, activities }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Day {day}</h3>
                    <p className="text-gray-600">Full day itinerary</p>
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                    8:00 AM - 10:00 PM
                </div>
            </div>

            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${getActivityColor(activity.type)}`} />
                            {index < activities.length - 1 && (
                                <div className="w-0.5 h-full bg-gray-200" />
                            )}
                        </div>

                        <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-gray-900">{activity.title}</h4>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                    {activity.time}
                                </span>
                            </div>

                            <p className="text-gray-600 mb-3">{activity.description}</p>

                            {activity.details && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{activity.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{activity.cost}</span>
                                        </div>
                                        {activity.location && (
                                            <div className="col-span-2 flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm text-gray-700">{activity.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Trip essentials component
const TripEssentials = ({ essentials }) => {
    const categories = {
        documents: { icon: Briefcase, color: 'blue' },
        clothing: { icon: Luggage, color: 'purple' },
        electronics: { icon: Wifi, color: 'green' },
        health: { icon: Shield, color: 'red' },
        money: { icon: CreditCard, color: 'amber' },
        misc: { icon: Bell, color: 'indigo' }
    };

    return (
        <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 md:w-120">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Essentials</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(essentials).map(([category, items]) => {
                    const { icon: Icon, color } = categories[category] || { icon: Briefcase, color: 'gray' };
                    return (
                        <div key={category} className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 bg-${color}-50 rounded-lg`}>
                                    <Icon className={`w-5 h-5 text-${color}-600`} />
                                </div>
                                <h4 className="font-bold text-gray-900 capitalize">{category}</h4>
                            </div>

                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Budget breakdown component
const BudgetBreakdown = ({ budget }) => {
    const total = Object.values(budget).reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Budget Breakdown</h3>
                <div className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-400 text-white rounded-lg font-bold">
                    Total: ${total.toLocaleString()}
                </div>
            </div>

            <div className="space-y-4">
                {Object.entries(budget).map(([category, data]) => {
                    const percentage = (data.amount / total) * 100;
                    return (
                        <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        {data.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 capitalize">{category}</p>
                                        <p className="text-sm text-gray-500">{data.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">${data.amount.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">{percentage.toFixed(1)}% of total</p>
                                </div>
                            </div>

                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Emergency contacts component
const EmergencyContacts = ({ contacts }) => {
    return (
        <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-100 md:w-120">
            <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contacts.map((contact, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 ${contact.bgColor} rounded-lg`}>
                                {contact.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{contact.name}</h4>
                                <p className="text-sm text-gray-600">{contact.type}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <a
                                href={`tel:${contact.phone}`}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <Phone className="w-4 h-4" />
                                {contact.phone}
                            </a>

                            {contact.email && (
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                                >
                                    <Mail className="w-4 h-4" />
                                    {contact.email}
                                </a>
                            )}

                            {contact.address && (
                                <div className="flex items-center gap-2 text-gray-700">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{contact.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// Helper function for activity colors
const getActivityColor = (type) => {
    const colors = {
        sightseeing: 'bg-blue-500',
        food: 'bg-amber-500',
        transport: 'bg-purple-500',
        accommodation: 'bg-green-500',
        shopping: 'bg-pink-500',
        leisure: 'bg-cyan-500'
    };
    return colors[type] || 'bg-gray-500';
};



// Enhanced Destination Details Component
const DestinationDetails = ({ destination, onBack, onToggleFavorite, isFavorite }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - Replace with actual data from destination
  const itinerary = [
    {
      day: 1,
      activities: [
        {
          time: '8:00 AM - 9:00 AM',
          title: 'Arrival & Check-in',
          type: 'accommodation',
          description: 'Arrive at airport and transfer to hotel',
          duration: '1 hour',
          cost: 'Included',
          location: destination.airport || 'Airport'
        },
        {
          time: '10:00 AM - 1:00 PM',
          title: 'City Tour',
          type: 'sightseeing',
          description: 'Explore the main attractions of the city',
          duration: '3 hours',
          cost: '$50',
          location: 'City Center'
        }
      ]
    }
  ];

  const essentials = {
    documents: ['Passport', 'Visa', 'Travel Insurance', 'Flight Tickets'],
    clothing: ['Comfortable shoes', 'Rain jacket', 'Swimwear', 'Formal attire'],
    electronics: ['Power adapter', 'Camera', 'Power bank', 'Earphones'],
    health: ['Prescription medicines', 'First aid kit', 'Sunscreen', 'Mosquito repellent'],
    money: ['Credit cards', 'Local currency', 'Travel wallet', 'Emergency cash'],
    misc: ['Water bottle', 'Snacks', 'Guidebook', 'Travel pillow']
  };

  const budget = {
    flights: {
      amount: 800,
      description: 'Round trip flights',
      icon: <Plane className="w-5 h-5 text-blue-600" />
    },
    accommodation: {
      amount: 1200,
      description: '7 nights hotel stay',
      icon: <Hotel className="w-5 h-5 text-green-600" />
    },
    food: {
      amount: 400,
      description: 'Daily meals & drinks',
      icon: <Utensils className="w-5 h-5 text-amber-600" />
    },
    activities: {
      amount: 300,
      description: 'Tours & attractions',
      icon: <Camera className="w-5 h-5 text-purple-600" />
    },
    transport: {
      amount: 200,
      description: 'Local transportation',
      icon: <Navigation className="w-5 h-5 text-red-600" />
    },
    misc: {
      amount: 100,
      description: 'Shopping & souvenirs',
      icon: <CreditCard className="w-5 h-5 text-indigo-600" />
    }
  };

  const emergencyContacts = [
    {
      name: 'Local Police',
      type: 'Emergency Service',
      phone: '911',
      address: 'Nearest police station',
      bgColor: 'bg-blue-100',
      icon: <Shield className="w-5 h-5 text-blue-600" />
    },
    {
      name: 'Hospital',
      type: 'Medical Emergency',
      phone: '+1234567890',
      address: destination.hospital || 'Main Hospital',
      bgColor: 'bg-red-100',
      icon: <AlertCircle className="w-5 h-5 text-red-600" />
    },
    {
      name: 'Tour Guide',
      type: 'Local Guide',
      phone: '+0987654321',
      email: 'guide@example.com',
      bgColor: 'bg-green-100',
      icon: <UsersIcon className="w-5 h-5 text-green-600" />
    },
    {
      name: 'Embassy',
      type: 'Diplomatic Service',
      phone: '+1122334455',
      address: 'Capital City',
      bgColor: 'bg-purple-100',
      icon: <Globe className="w-5 h-5 text-purple-600" />
    }
  ];
  const initialPhotos = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQBaUFQKYxbmb3-ibki9C0pF9mYGno6whyQ&s",
      title: "TripMate",
      description: "A Trip Recommendation System that can help you to find your best trip."
    },
    ...(destination?.image_url
      ? [{
        url: destination.image_url,
        title: destination.name,
        description: "Main attraction"
      }]
      : [])
  ];


  const weather = {
    temperature: 28,
    condition: 'Sunny',
    windSpeed: 12,
    humidity: 65,
    precipitation: 10,
    uvIndex: 8,
    feelsLike: 30
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-gray-50 active:scale-95 border-2 border-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-teal-500 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="bg-linear-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                Back to Destinations
              </span>
            </button>


            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleFavorite(destination._id || destination.id)}
                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-96">
          <img
            src={destination.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
                      {destination.type || 'Destination'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{destination.safety_rating || 4.5}/5</span>
                    </div>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                    {/* <span className="bg-linear-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"> */}
                      {destination.name}
                    {/* </span> */}
                  </h1>
                  <div className="flex items-center gap-2 text-xl">
                    <MapPin className="w-6 h-6" />
                    <span>{destination.region}, {destination.country}</span>
                  </div>
                </div>

                <div className="bg-linear-to-r from-teal-600 to-blue-600 backdrop-blur-md rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white">
                      ${destination.average_cost_per_day || 150}
                      <span className="text-white/80 text-lg ml-1">/day</span>
                    </div>
                    <p className="text-white/90">Average cost per person</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">7</div>
                      <div className="text-white/80 text-sm">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">8</div>
                      <div className="text-white/80 text-sm">Nights</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">6</div>
                      <div className="text-white/80 text-sm">Cities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {['overview', 'itinerary', 'guide', 'photos', 'budget', 'essentials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === tab
                    ? 'bg-linear-to-r from-blue-500 to-cyan-400 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <Download className="w-5 h-5" />
            Download Itinerary
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <Share2 className="w-5 h-5" />
            Share Trip
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <Printer className="w-5 h-5" />
            Print Guide
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <MessageSquare className="w-5 h-5" />
            Ask Questions
          </motion.button>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">About {destination.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {destination.description || 'Discover the perfect blend of adventure, culture, and relaxation in this amazing destination. Experience breathtaking landscapes, rich history, and vibrant local culture.'}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Breathtaking natural beauty</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Rich cultural heritage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Delicious local cuisine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Adventure activities</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Best For</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Couples', 'Families', 'Solo Travelers', 'Adventure Seekers', 'Food Lovers'].map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <WeatherWidget weather={weather} />

                <PhotoGallery
                  initialPhotos={initialPhotos}
                  query={`${destination.name.trim()}+${destination.country ? '+' + destination.country : ''}+landmarks+attractions`}
                />
              </div>

              <div className="space-y-6">
                <TripEssentials essentials={essentials} />

                <EmergencyContacts contacts={emergencyContacts} />
              </div>
            </div>
          )}

          {/* Itinerary Tab */}
          {activeTab === 'itinerary' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">7-Day Itinerary</h2>
                    <p className="text-gray-600">Detailed day-by-day schedule</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {itinerary.map((day) => (
                    <DayItinerary key={day.day} day={day.day} activities={day.activities} />
                  ))}
                </div>
              </div>

              <BudgetBreakdown budget={budget} />
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === 'guide' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Complete Travel Guide</h2>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Local Culture & Etiquette</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">Greeting Customs</p>
                              <p className="text-gray-600">Always greet with a smile and slight bow when meeting locals.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">Dress Code</p>
                              <p className="text-gray-600">Modest clothing is recommended when visiting religious sites.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">Tipping</p>
                              <p className="text-gray-600">Tipping is appreciated but not mandatory in most places.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Transportation Guide</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-3">Public Transport</h4>
                          <p className="text-gray-600 mb-4">Metro, buses, and trains are efficient and affordable.</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Operates: 5 AM - 11 PM</span>
                          </div>
                        </div>

                        <div className="bg-linear-to-br from-teal-500 to-blue-500 p-6 rounded-xl">
                          <h4 className="font-bold text-gray-900 mb-3">Taxi & Ride-sharing</h4>
                          <p className="text-gray-600 mb-4">Available 24/7, use apps for better rates.</p>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4" />
                            <span>Average cost: $10-20 per ride</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Local Cuisine</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                          <Utensils className="w-6 h-6 text-amber-600" />
                          <div>
                            <p className="font-bold text-gray-900">Must-Try Dishes</p>
                            <p className="text-gray-600">Local specialties include traditional stews, street food, and desserts.</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <TripEssentials essentials={essentials} />

                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pro Tips</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Best Time to Visit</p>
                        <p className="text-gray-600">{destination.best_time_to_visit?.join(', ') || 'November to March'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Money Saving Tips</p>
                        <p className="text-gray-600">Use public transport, eat at local restaurants, book in advance.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Compass className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Navigation</p>
                        <p className="text-gray-600">Download offline maps and learn basic local phrases.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Photos Tab */}
          {activeTab === 'photos' && (
            <div>
              <PhotoGallery
                initialPhotos={initialPhotos}
                query={`${destination.name.trim()}+${destination.country ? '+' + destination.country : ''}+landmarks+attractions`}
              />
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === 'budget' && (
            <div className="space-y-8">
              <BudgetBreakdown budget={budget} />

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Money-Saving Tips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Travel Off-Peak', desc: 'Save up to 30% on flights and accommodation' },
                    { title: 'Local Transport', desc: 'Use public transport instead of taxis' },
                    { title: 'Street Food', desc: 'Try local street food for authentic cheap meals' },
                    { title: 'Free Activities', desc: 'Many museums and parks offer free entry days' },
                    { title: 'Advance Booking', desc: 'Book tours and activities online for discounts' },
                    { title: 'Travel Insurance', desc: 'Get comprehensive insurance to avoid unexpected costs' }
                  ].map((tip, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{index + 1}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600">{tip.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Essentials Tab */}
          {activeTab === 'essentials' && (
            <div className="space-y-8">
              <TripEssentials essentials={essentials} />

              <EmergencyContacts contacts={emergencyContacts} />

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Health & Safety</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl">
                    <Shield className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Safety Precautions</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Keep copies of important documents</li>
                        <li>• Use hotel safes for valuables</li>
                        <li>• Be aware of common scams in tourist areas</li>
                        <li>• Emergency number: 911</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Health Requirements</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Recommended vaccinations: Hepatitis A, Typhoid</li>
                        <li>• Drink bottled water only</li>
                        <li>• Carry basic first aid kit</li>
                        <li>• Travel insurance is mandatory</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-linear-to-r from-blue-600 to-cyan-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Adventure?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Book your trip to {destination.name} today and get ready for an unforgettable experience!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Download Complete Guide
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;