// src/pages/TravelToolsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, CloudRain, Sun, Wind, Thermometer, Droplets,
    Umbrella, Navigation, Wifi, AlertCircle, Compass,
    Coffee, ShoppingBag, Train, Car, MapPin, Download,
    Target, Route, Clock, DollarSign, Search, Plane,
    Hotel, Utensils, Mountain, Fuel, PlusCircle,
    Bell, Shield, AlertTriangle, Phone, Heart, Star,
    Calendar, Users, Globe, TrendingUp, ChevronDown
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color) => L.divIcon({
    html: `
        <div class="relative">
            <div class="w-10 h-10 bg-linear-to-br ${color} rounded-full border-3 border-white shadow-xl flex items-center justify-center">
                <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
        </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const TravelToolsPage = () => {
    // State management
    const [location, setLocation] = useState('New York');
    const [destination, setDestination] = useState('');
    const [activeTab, setActiveTab] = useState('weather');
    const [route, setRoute] = useState(null);
    const [travelMode, setTravelMode] = useState('driving');
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [cost, setCost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState([40.7128, -74.0060]); // New York
    const [showRouteForm, setShowRouteForm] = useState(false);
    const mapRef = useRef(null);

    // Weather Data
    const [weatherData, setWeatherData] = useState({
        temp: 72,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        precipitation: 10,
        uvIndex: 6,
        airQuality: 'Good',
        sunrise: '6:45 AM',
        sunset: '7:30 PM',
        forecast: [
            { day: 'Today', high: 72, low: 60, condition: 'sunny', icon: '☀️', rain: '0%' },
            { day: 'Tue', high: 68, low: 58, condition: 'partly-cloudy', icon: '⛅', rain: '10%' },
            { day: 'Wed', high: 70, low: 59, condition: 'rainy', icon: '🌧️', rain: '80%' },
            { day: 'Thu', high: 75, low: 62, condition: 'sunny', icon: '☀️', rain: '5%' },
            { day: 'Fri', high: 78, low: 64, condition: 'sunny', icon: '☀️', rain: '0%' }
        ]
    });

    // Travel Essentials
    const [travelEssentials, setTravelEssentials] = useState([
        { id: 1, item: 'Power Adapter', category: 'Electronics', essential: true, checked: true },
        { id: 2, item: 'Travel Insurance', category: 'Documents', essential: true, checked: true },
        { id: 3, item: 'Portable Charger', category: 'Electronics', essential: true, checked: false },
        { id: 4, item: 'First Aid Kit', category: 'Health', essential: true, checked: false },
        { id: 5, item: 'Local SIM Card', category: 'Communication', essential: false, checked: true },
        { id: 6, item: 'Rain Jacket', category: 'Clothing', essential: false, checked: false },
        { id: 7, item: 'Travel Pillow', category: 'Comfort', essential: false, checked: true },
        { id: 8, item: 'Water Bottle', category: 'Essentials', essential: true, checked: true },
        { id: 9, item: 'Passport & Visa', category: 'Documents', essential: true, checked: true },
        { id: 10, item: 'Medications', category: 'Health', essential: true, checked: false },
        { id: 11, item: 'Sunscreen', category: 'Health', essential: true, checked: true },
        { id: 12, item: 'Travel Guide', category: 'Information', essential: false, checked: true }
    ]);

    // Facilities Data
    const facilities = [
        { type: 'hotels', name: 'Hotels', count: 42, icon: '🏨', color: 'from-blue-500 to-cyan-500', rating: 4.3 },
        { type: 'restaurants', name: 'Restaurants', count: 156, icon: '🍽️', color: 'from-purple-500 to-pink-500', rating: 4.5 },
        { type: 'cafes', name: 'Cafés', count: 87, icon: '☕', color: 'from-amber-500 to-orange-500', rating: 4.2 },
        { type: 'hospitals', name: 'Medical', count: 8, icon: '🏥', color: 'from-red-500 to-rose-500', rating: 4.7 },
        { type: 'shopping', name: 'Shopping', count: 94, icon: '🛍️', color: 'from-green-500 to-emerald-500', rating: 4.4 },
        { type: 'transport', name: 'Transport', count: 23, icon: '🚇', color: 'from-indigo-500 to-purple-500', rating: 4.1 },
        { type: 'wifi', name: 'WiFi Spots', count: 56, icon: '📶', color: 'from-gray-600 to-gray-700', rating: 4.0 },
        { type: 'attractions', name: 'Attractions', count: 34, icon: '🏛️', color: 'from-amber-500 to-yellow-500', rating: 4.6 }
    ];

    // Travel Modes
    const travelModes = [
        { id: 'driving', label: 'Car', icon: Car, rate: 0.3, color: 'from-blue-500 to-cyan-500', description: 'Fast & flexible' },
        { id: 'transit', label: 'Public Transit', icon: Train, rate: 0.1, color: 'from-purple-500 to-pink-500', description: 'Economical' },
        { id: 'flying', label: 'Flight', icon: Plane, rate: 0.5, color: 'from-amber-500 to-orange-500', description: 'Long distances' },
        { id: 'walking', label: 'Walking', icon: '🚶', rate: 0, color: 'from-green-500 to-emerald-500', description: 'Healthy & free' }
    ];

    // Emergency Contacts
    const emergencyContacts = [
        { name: 'Local Police', number: '911', type: 'emergency', icon: Shield },
        { name: 'Medical Emergency', number: '911', type: 'emergency', icon: AlertTriangle },
        { name: 'Tourist Helpline', number: '1-800-555-HELP', type: 'assistance', icon: Phone },
        { name: 'U.S. Embassy', number: '+1-202-501-4444', type: 'embassy', icon: Globe },
        { name: 'Local Hospital', number: '+1-212-555-1234', type: 'medical', icon: Hotel },
        { name: 'Roadside Assistance', number: '1-800-222-4357', type: 'transport', icon: Car }
    ];

    // Travel Tips
    const travelTips = [
        { id: 1, title: 'Visa Requirements', description: 'Check visa requirements at least 3 months in advance', icon: '📋', priority: 'high' },
        { id: 2, title: 'Bank Notification', description: 'Notify your bank about travel plans to avoid card blocks', icon: '🏦', priority: 'high' },
        { id: 3, title: 'Offline Maps', description: 'Download offline maps and translation apps', icon: '🗺️', priority: 'medium' },
        { id: 4, title: 'First Aid Kit', description: 'Pack a basic first-aid kit with essential medications', icon: '🩹', priority: 'high' },
        { id: 5, title: 'Digital Copies', description: 'Keep digital copies of important documents', icon: '📄', priority: 'medium' },
        { id: 6, title: 'Local Currency', description: 'Carry some local currency upon arrival', icon: '💵', priority: 'medium' }
    ];

    // Nearby Places
    const nearbyPlaces = [
        { type: 'hotels', name: 'Hotels', count: 42, icon: Hotel, color: 'from-blue-500 to-blue-600' },
        { type: 'restaurants', name: 'Restaurants', count: 156, icon: Utensils, color: 'from-green-500 to-emerald-600' },
        { type: 'attractions', name: 'Attractions', count: 34, icon: Mountain, color: 'from-purple-500 to-pink-600' },
        { type: 'gas', name: 'Gas Stations', count: 18, icon: Fuel, color: 'from-amber-500 to-orange-600' },
        { type: 'parking', name: 'Parking', count: 32, icon: '🅿️', color: 'from-indigo-500 to-purple-600' },
        { type: 'pharmacy', name: 'Pharmacies', count: 24, icon: '💊', color: 'from-rose-500 to-pink-600' }
    ];

    // Quick Suggestions
    const quickSuggestions = [
        { name: 'Times Square', distance: '1.2 km', time: '5 min', icon: '🎭', type: 'attraction' },
        { name: 'Central Park', distance: '3.5 km', time: '12 min', icon: '🌳', type: 'park' },
        { name: 'Empire State', distance: '2.1 km', time: '8 min', icon: '🏙️', type: 'attraction' },
        { name: 'JFK Airport', distance: '25 km', time: '35 min', icon: '✈️', type: 'airport' }
    ];

    useEffect(() => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(loc);
                },
                () => console.log('Location access denied')
            );
        }
    }, []);

    const calculateRoute = async () => {
        if (!destination.trim()) return;

        setLoading(true);

        // Simulate API call to calculate route
        setTimeout(() => {
            const mockRoute = {
                distance: 153.2,
                duration: 2.5,
                cost: calculateCost(153.2, travelMode),
                polyline: [
                    userLocation,
                    [userLocation[0] + 0.5, userLocation[1] + 1],
                    [userLocation[0] + 1, userLocation[1] + 1.5]
                ],
                steps: [
                    { instruction: 'Head north on Main St', distance: '0.2 km', duration: '2 min' },
                    { instruction: 'Turn right onto Highway 1', distance: '120 km', duration: '1.5 hours' },
                    { instruction: 'Take exit 42 toward Destination', distance: '32 km', duration: '30 min' },
                    { instruction: 'Arrive at destination', distance: '0.8 km', duration: '3 min' }
                ]
            };

            setRoute(mockRoute);
            setDistance(mockRoute.distance);
            setDuration(mockRoute.duration);
            setCost(mockRoute.cost);
            setLoading(false);
            setShowRouteForm(false);
        }, 1500);
    };

    const calculateCost = (distance, mode) => {
        const rates = {
            driving: { perKm: 0.3, base: 5 },
            transit: { perKm: 0.1, base: 2 },
            flying: { perKm: 0.5, base: 50 },
            walking: { perKm: 0, base: 0 }
        };
        const rate = rates[mode] || rates.driving;
        return (distance * rate.perKm + rate.base).toFixed(2);
    };

    const focusOnUserLocation = () => {
        if (mapRef.current) {
            mapRef.current.setView(userLocation, 13);
        }
    };

    const toggleEssentialItem = (id) => {
        setTravelEssentials(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const tabs = [
        { id: 'weather', label: 'Weather', icon: Sun, color: 'from-blue-500 to-cyan-500' },
        { id: 'route', label: 'Route Planner', icon: Route, color: 'from-purple-500 to-pink-500' },
        { id: 'essentials', label: 'Packing', icon: ShoppingBag, color: 'from-amber-500 to-orange-500' },
        { id: 'facilities', label: 'Facilities', icon: MapPin, color: 'from-green-500 to-emerald-500' },
        { id: 'emergency', label: 'Emergency', icon: AlertTriangle, color: 'from-red-500 to-rose-500' },
        { id: 'tips', label: 'Travel Tips', icon: AlertCircle, color: 'from-indigo-500 to-purple-500' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-purple-500 text-white px-5 py-2.5 rounded-full mb-6">
                            <Compass size={20} />
                            <span className="font-semibold">Smart Travel Tools</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Your Complete{' '}
                            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Travel Companion
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need for a smooth journey - weather forecasts, route planning, packing lists, and emergency information
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto pb-4 mb-8">
                    <div className="flex space-x-2">
                        {tabs.map(tab => (
                            <motion.button
                                key={tab.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group flex items-center space-x-3 px-6 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === tab.id
                                    ? `bg-linear-to-r ${tab.color} text-white shadow-lg`
                                    : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:border-gray-300 hover:shadow-md'
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span className="font-semibold whitespace-nowrap">{tab.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Weather Tab */}
                {activeTab === 'weather' && (
                    <div className="space-y-8">
                        {/* Current Weather Card */}
                        <div className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 translate-y-32" />

                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="md:w-2/3">
                                        <div className="flex items-center space-x-4 mb-6">
                                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                                <Sun size={32} />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold">{location}</h2>
                                                <p className="opacity-90">Current Weather • Updated just now</p>
                                            </div>
                                        </div>

                                        <div className="flex items-end mb-8">
                                            <div className="text-8xl font-bold">{weatherData.temp}°</div>
                                            <div className="ml-6">
                                                <p className="text-2xl opacity-90 mb-2">Feels like {weatherData.temp + 2}°</p>
                                                <p className="text-xl opacity-80">{weatherData.condition}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { icon: Thermometer, label: 'Humidity', value: `${weatherData.humidity}%` },
                                                { icon: Wind, label: 'Wind Speed', value: `${weatherData.windSpeed} mph` },
                                                { icon: Droplets, label: 'Precipitation', value: `${weatherData.precipitation}%` },
                                                { icon: Umbrella, label: 'UV Index', value: `${weatherData.uvIndex} (High)` }
                                            ].map((stat, idx) => (
                                                <div key={idx} className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <stat.icon size={20} />
                                                        <span className="text-sm opacity-90">{stat.label}</span>
                                                    </div>
                                                    <p className="text-xl font-semibold">{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 md:mt-0 md:w-1/3 text-center">
                                        <div className="text-9xl mb-6">☀️</div>
                                        <div className="space-y-3">
                                            <p className="text-2xl font-semibold">Sunrise: {weatherData.sunrise}</p>
                                            <p className="text-2xl font-semibold">Sunset: {weatherData.sunset}</p>
                                            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                                                <p className="text-lg">Air Quality: {weatherData.airQuality}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Forecast */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        5-Day Forecast
                                    </h3>
                                    <p className="text-gray-600 mt-1">Detailed weather outlook for your destination</p>
                                </div>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="pl-12 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        <option>New York</option>
                                        <option>London</option>
                                        <option>Tokyo</option>
                                        <option>Paris</option>
                                        <option>Dubai</option>
                                        <option>Sydney</option>
                                        <option>Singapore</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {weatherData.forecast.map((day, idx) => (
                                    <motion.div
                                        key={day.day}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`group p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 ${day.condition === 'rainy'
                                            ? 'bg-linear-to-b from-blue-50 to-cyan-50 hover:shadow-lg'
                                            : 'bg-linear-to-b from-amber-50 to-orange-50 hover:shadow-lg'
                                            }`}
                                    >
                                        <p className="font-semibold text-gray-900 text-lg mb-2">{day.day}</p>
                                        <div className="text-5xl my-4 group-hover:scale-110 transition-transform">
                                            {day.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xl font-bold text-gray-900">{day.high}°</p>
                                            <p className="text-gray-600 text-sm">Low: {day.low}°</p>
                                            <div className="flex items-center justify-center space-x-1 text-sm text-blue-600">
                                                <CloudRain size={14} />
                                                <span>{day.rain}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Route Planner Tab */}
                {activeTab === 'route' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Panel - Controls */}
                        <div className="space-y-8">
                            {/* Route Form */}
                            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                                <div className="absolute -right-4 -top-4 w-32 h-32 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full" />

                                <div className="relative z-10">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="p-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl">
                                            <Route className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                            Plan Your Route
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                                <Target className="h-4 w-4 text-blue-500" />
                                                <span>Starting Point</span>
                                            </label>
                                            <div className="relative group">
                                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value="Your Current Location"
                                                    readOnly
                                                    className="w-full pl-12 pr-4 py-3.5 bg-linear-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-purple-500" />
                                                <span>Destination</span>
                                            </label>
                                            <div className="relative group">
                                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={destination}
                                                    onChange={(e) => setDestination(e.target.value)}
                                                    placeholder="Enter city, address, or landmark..."
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={calculateRoute}
                                            disabled={loading || !destination.trim()}
                                            className="group relative w-full py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative z-10 font-semibold text-lg">
                                                {loading ? (
                                                    <span className="flex items-center justify-center space-x-2">
                                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        <span>Calculating Route...</span>
                                                    </span>
                                                ) : 'Calculate Route'}
                                            </span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Modes */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
                                        <Navigation className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Travel Mode</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {travelModes.map(mode => (
                                        <motion.button
                                            key={mode.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setTravelMode(mode.id)}
                                            className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${travelMode === mode.id
                                                ? `border-transparent bg-linear-to-br ${mode.color} text-white shadow-lg`
                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                                }`}
                                        >
                                            {travelMode === mode.id && (
                                                <motion.div
                                                    className="absolute inset-0 bg-white/10"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                />
                                            )}
                                            <div className="relative z-10">
                                                {typeof mode.icon === 'string' ? (
                                                    <span className="text-3xl block mb-3">{mode.icon}</span>
                                                ) : (
                                                    <mode.icon className={`h-8 w-8 mx-auto mb-3 ${travelMode === mode.id ? 'text-white' : 'text-gray-600'}`} />
                                                )}
                                                <p className="font-semibold text-center">{mode.label}</p>
                                                <p className={`text-xs mt-1 text-center ${travelMode === mode.id ? 'text-white/90' : 'text-gray-500'}`}>
                                                    {mode.description}
                                                </p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Route Results */}
                            {route && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8"
                                >
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="p-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl">
                                            <Route className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Route Details</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { icon: Route, label: 'Distance', value: `${distance} km`, color: 'from-blue-500 to-cyan-500' },
                                            { icon: Clock, label: 'Duration', value: `${duration} hours`, color: 'from-purple-500 to-pink-500' },
                                            { icon: DollarSign, label: 'Estimated Cost', value: `$${cost}`, color: 'from-green-500 to-emerald-500' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-gray-100/50 rounded-2xl">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`p-3 bg-linear-to-r ${item.color} rounded-xl`}>
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <span className="font-medium text-gray-700">{item.label}</span>
                                                </div>
                                                <span className="text-lg font-bold text-gray-900">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-6 py-3.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg font-semibold"
                                    >
                                        <PlusCircle className="inline-block mr-2 h-5 w-5" />
                                        Add to Itinerary
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Panel - Map */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Map Container */}
                            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50">
                                <div className="absolute top-4 right-4 z-1000 flex flex-col space-y-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={focusOnUserLocation}
                                        className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl"
                                    >
                                        <Target className="h-5 w-5 text-gray-700" />
                                    </motion.button>
                                </div>

                                <div className="h-125 rounded-3xl overflow-hidden">
                                    <MapContainer
                                        center={userLocation}
                                        zoom={12}
                                        style={{ height: '100%', width: '100%' }}
                                        ref={mapRef}
                                        className="rounded-3xl"
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />

                                        <Marker
                                            position={userLocation}
                                            icon={createCustomIcon('from-blue-500 to-cyan-500')}
                                        >
                                            <Popup className="rounded-xl">
                                                <div className="p-3">
                                                    <p className="font-semibold text-gray-900">Your Location</p>
                                                    <p className="text-sm text-gray-600">GPS coordinates</p>
                                                </div>
                                            </Popup>
                                        </Marker>

                                        {route && route.polyline && (
                                            <Polyline
                                                positions={route.polyline}
                                                pathOptions={{
                                                    color: '#3b82f6',
                                                    weight: 4,
                                                    opacity: 0.8,
                                                    lineCap: 'round',
                                                    lineJoin: 'round'
                                                }}
                                            />
                                        )}
                                    </MapContainer>
                                </div>
                            </div>

                            {/* Nearby Places */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Nearby Points of Interest</h3>
                                            <p className="text-gray-600 text-sm">Discover places around your route</p>
                                        </div>
                                    </div>

                                    <select className="px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20">
                                        <option>Within 5 km</option>
                                        <option>Within 10 km</option>
                                        <option>Within 20 km</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {nearbyPlaces.map((place, idx) => (
                                        <motion.div
                                            key={place.type}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group p-5 bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-xl cursor-pointer transition-all duration-300"
                                        >
                                            <div className="flex items-center space-x-4">
                                                {typeof place.icon === 'string' ? (
                                                    <span className="text-3xl">{place.icon}</span>
                                                ) : (
                                                    <div className={`p-3 bg-linear-to-r ${place.color} rounded-xl`}>
                                                        <place.icon className="h-6 w-6 text-white" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-900">{place.name}</p>
                                                    <p className="text-gray-500 text-sm mt-1">{place.count} nearby</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Packing Essentials Tab */}
                {activeTab === 'essentials' && (
                    <div className="space-y-8">
                        {/* Packing Checklist */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Smart Packing Checklist
                                    </h3>
                                    <p className="text-gray-600 mt-1">Don't forget anything important for your trip</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold">
                                        {travelEssentials.filter(item => item.checked).length}/{travelEssentials.length} Packed
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md"
                                    >
                                        <Download size={20} />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {travelEssentials.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${item.checked
                                            ? 'bg-linear-to-r from-green-50 to-emerald-50 border-green-200'
                                            : 'bg-linear-to-r from-gray-50 to-white/50 border-gray-200 hover:border-gray-300'
                                            }`}
                                        onClick={() => toggleEssentialItem(item.id)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-lg ${item.essential
                                                ? 'bg-linear-to-r from-red-100 to-rose-100'
                                                : 'bg-linear-to-r from-gray-100 to-gray-200'
                                                }`}>
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() => toggleEssentialItem(item.id)}
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <p className={`font-medium ${item.checked ? 'text-gray-700' : 'text-gray-900'}`}>
                                                    {item.item}
                                                </p>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>
                                        </div>

                                        {item.essential && (
                                            <span className="px-3 py-1 text-xs font-medium bg-linear-to-r from-red-100 to-rose-100 text-red-700 rounded-full">
                                                Essential
                                            </span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200/50">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl">
                                        <p className="text-3xl font-bold text-blue-600">
                                            {travelEssentials.filter(item => item.essential && item.checked).length}
                                        </p>
                                        <p className="text-sm text-gray-600">Essentials Packed</p>
                                    </div>
                                    <div className="text-center p-4 bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl">
                                        <p className="text-3xl font-bold text-green-600">
                                            {travelEssentials.filter(item => item.checked).length}
                                        </p>
                                        <p className="text-sm text-gray-600">Total Items</p>
                                    </div>
                                    <div className="text-center p-4 bg-linear-to-br from-amber-50 to-orange-100 rounded-2xl">
                                        <p className="text-3xl font-bold text-amber-600">
                                            {Math.round((travelEssentials.filter(item => item.checked).length / travelEssentials.length) * 100)}%
                                        </p>
                                        <p className="text-sm text-gray-600">Completion</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Packing Tips */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-blue-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl">
                                        <AlertCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Packing Pro Tips</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        'Roll clothes instead of folding to save space',
                                        'Use packing cubes to organize items',
                                        'Pack heavier items at the bottom of your bag',
                                        'Keep essentials in your carry-on',
                                        'Use travel-sized toiletries',
                                        'Leave room for souvenirs'
                                    ].map((tip, idx) => (
                                        <div key={idx} className="flex items-start space-x-4 p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                                            <div className="h-7 w-7 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-amber-50 via-white to-orange-50 rounded-3xl border border-amber-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
                                        <Bell className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Last-Minute Checklist</h3>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        'Charge all electronic devices',
                                        'Print boarding passes & hotel confirmations',
                                        'Set up travel notifications with your bank',
                                        'Download offline maps & entertainment',
                                        'Check passport & visa requirements',
                                        'Confirm flight times & terminal information'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <div className="h-6 w-6 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                                                ✓
                                            </div>
                                            <p className="text-gray-700">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Facilities Tab */}
                {activeTab === 'facilities' && (
                    <div className="space-y-8">
                        {/* Facilities Grid */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Nearby Facilities
                                    </h3>
                                    <p className="text-gray-600 mt-1">Find essential services around your location</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-3 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg"
                                >
                                    <MapPin size={20} />
                                    <span className="font-semibold">Open in Maps</span>
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {facilities.map((facility, idx) => (
                                    <motion.div
                                        key={facility.type}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative overflow-hidden p-6 bg-linear-to-br from-gray-50 to-white rounded-3xl border border-gray-200/50 hover:shadow-2xl cursor-pointer transition-all duration-500"
                                    >
                                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-4xl">{facility.icon}</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                    <span className="text-sm font-semibold text-gray-700">{facility.rating}</span>
                                                </div>
                                            </div>

                                            <p className="font-bold text-gray-900 text-xl mb-2">{facility.name}</p>
                                            <p className="text-gray-500 text-sm mb-4">{facility.count} available</p>

                                            <div className={`h-2 bg-linear-to-r ${facility.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Suggestions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-blue-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl">
                                        <Compass className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Quick Suggestions</h3>
                                        <p className="text-gray-600 text-sm">Popular places near you</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {quickSuggestions.map((place, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group w-full flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <span className="text-3xl">{place.icon}</span>
                                                <div className="text-left">
                                                    <p className="font-semibold text-gray-900">{place.name}</p>
                                                    <p className="text-sm text-gray-500 capitalize">{place.type}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-gray-900">{place.distance}</p>
                                                <p className="text-sm text-gray-500">{place.time}</p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-green-50 via-white to-emerald-50 rounded-3xl border border-green-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Popular Facilities</h3>
                                        <p className="text-gray-600 text-sm">Most visited places</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { name: 'Central Park Cafe', type: 'Cafe', rating: 4.8, visitors: '2.4k' },
                                        { name: 'Times Square Hotel', type: 'Hotel', rating: 4.5, visitors: '3.1k' },
                                        { name: 'Metropolitan Museum', type: 'Attraction', rating: 4.9, visitors: '5.7k' },
                                        { name: 'Grand Central Market', type: 'Shopping', rating: 4.4, visitors: '4.2k' }
                                    ].map((place, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                                            <div>
                                                <p className="font-medium text-gray-900">{place.name}</p>
                                                <p className="text-sm text-gray-500">{place.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                                    <span className="text-sm font-semibold">{place.rating}</span>
                                                </div>
                                                <p className="text-xs text-gray-500">{place.visitors} visitors</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Emergency Tab */}
                {activeTab === 'emergency' && (
                    <div className="space-y-8">
                        {/* Emergency Contacts */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Emergency Contacts
                                    </h3>
                                    <p className="text-gray-600 mt-1">Important numbers for your safety</p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-3 px-6 py-3 bg-linear-to-r from-red-500 to-rose-500 text-white rounded-xl hover:shadow-lg"
                                >
                                    <Download size={20} />
                                    <span className="font-semibold">Save All</span>
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {emergencyContacts.map((contact, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group p-6 bg-linear-to-r from-red-50/50 to-rose-50/50 rounded-3xl border border-red-100/50 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="p-3 bg-linear-to-r from-red-500 to-rose-500 rounded-xl">
                                                <contact.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{contact.name}</p>
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${contact.type === 'emergency'
                                                    ? 'bg-red-100 text-red-700'
                                                    : contact.type === 'medical'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {contact.type}
                                                </span>
                                            </div>
                                        </div>

                                        <a
                                            href={`tel:${contact.number}`}
                                            className="block text-center py-3 bg-linear-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-md transition-all"
                                        >
                                            Call {contact.number}
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-linear-to-br from-red-50 via-white to-rose-50 rounded-3xl border border-red-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-red-500 to-rose-500 rounded-xl">
                                        <AlertTriangle className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Emergency Procedures</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        'Stay calm and assess the situation',
                                        'Call emergency services immediately',
                                        'Provide clear location information',
                                        'Follow instructions from authorities',
                                        'Keep important documents accessible',
                                        'Have a meeting point for your group'
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex items-start space-x-4 p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                                            <div className="h-7 w-7 bg-linear-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-amber-50 via-white to-orange-50 rounded-3xl border border-amber-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="p-3 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Safety Tips</h3>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        'Keep copies of important documents',
                                        'Share your itinerary with someone',
                                        'Know local emergency numbers',
                                        'Carry a basic first-aid kit',
                                        'Stay aware of your surroundings',
                                        'Use registered transportation services'
                                    ].map((tip, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <div className="h-6 w-6 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                                                ✓
                                            </div>
                                            <p className="text-gray-700">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Travel Tips Tab */}
                {activeTab === 'tips' && (
                    <div className="space-y-8">
                        {/* Travel Tips Grid */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="p-3 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl">
                                    <AlertCircle className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Essential Travel Tips
                                    </h3>
                                    <p className="text-gray-600 mt-1">Smart advice for a smooth journey</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {travelTips.map(tip => (
                                    <motion.div
                                        key={tip.id}
                                        whileHover={{ y: -5 }}
                                        className={`group p-6 rounded-2xl border transition-all duration-300 ${tip.priority === 'high'
                                            ? 'bg-linear-to-br from-red-50 to-rose-50 border-red-100'
                                            : 'bg-linear-to-br from-blue-50 to-purple-50 border-blue-100'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-4 mb-4">
                                            <span className="text-3xl">{tip.icon}</span>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${tip.priority === 'high'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {tip.priority === 'high' ? 'High Priority' : 'Recommended'}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-gray-900 text-lg mb-2">{tip.title}</h4>
                                        <p className="text-gray-600 text-sm">{tip.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Resources */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-blue-100/50 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Resources</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: 'Visa Requirements', description: 'Check entry requirements for your destination', link: 'Learn More' },
                                        { title: 'Travel Insurance', description: 'Compare and purchase travel insurance', link: 'Get Quote' },
                                        { title: 'Currency Converter', description: 'Real-time exchange rates calculator', link: 'Convert' },
                                        { title: 'Language Guide', description: 'Essential phrases for your destination', link: 'Download' }
                                    ].map((resource, idx) => (
                                        <div key={idx} className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                                            <h4 className="font-bold text-gray-900 mb-2">{resource.title}</h4>
                                            <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                {resource.link} →
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-green-50 via-white to-emerald-50 rounded-3xl border border-green-100/50 p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <Heart className="h-6 w-6 text-green-500" />
                                    <h3 className="text-xl font-bold text-gray-900">Health & Wellness</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        'Stay hydrated during flights',
                                        'Get travel vaccinations if needed',
                                        'Pack necessary medications',
                                        'Protect against sun exposure',
                                        'Practice good hygiene',
                                        'Get adequate rest'
                                    ].map((tip, idx) => (
                                        <div key={idx} className="flex items-center space-x-3">
                                            <div className="h-6 w-6 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                                                ✓
                                            </div>
                                            <p className="text-gray-700">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelToolsPage;