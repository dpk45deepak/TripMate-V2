// src/pages/TravelTools.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, CloudRain, Sun, Wind, Thermometer, Droplets,
    Umbrella, Navigation, Wifi, AlertCircle,
    Coffee, ShoppingBag, Train, Car, MapPin, Download
} from 'lucide-react';

const TravelTools = () => {
    const [location, setLocation] = useState('New York');
    const [weatherData, setWeatherData] = useState({
        temp: 72,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        precipitation: 10,
        uvIndex: 6,
        forecast: [
            { day: 'Today', high: 72, low: 60, condition: 'sunny', icon: '☀️' },
            { day: 'Tue', high: 68, low: 58, condition: 'partly-cloudy', icon: '⛅' },
            { day: 'Wed', high: 70, low: 59, condition: 'rainy', icon: '🌧️' },
            { day: 'Thu', high: 75, low: 62, condition: 'sunny', icon: '☀️' },
            { day: 'Fri', high: 78, low: 64, condition: 'sunny', icon: '☀️' }
        ]
    });

    const facilities = [
        { type: 'hotels', name: 'Hotels', count: 42, icon: '🏨', color: 'from-blue-500 to-cyan-500' },
        { type: 'restaurants', name: 'Restaurants', count: 156, icon: '🍽️', color: 'from-purple-500 to-pink-500' },
        { type: 'cafes', name: 'Cafés', count: 87, icon: '☕', color: 'from-amber-500 to-orange-500' },
        { type: 'hospitals', name: 'Medical', count: 8, icon: '🏥', color: 'from-red-500 to-rose-500' },
        { type: 'shopping', name: 'Shopping', count: 94, icon: '🛍️', color: 'from-green-500 to-emerald-500' },
        { type: 'transport', name: 'Transport', count: 23, icon: '🚇', color: 'from-indigo-500 to-purple-500' },
        { type: 'wifi', name: 'WiFi Spots', count: 56, icon: '📶', color: 'from-gray-600 to-gray-700' },
        { type: 'attractions', name: 'Attractions', count: 34, icon: '🏛️', color: 'from-amber-500 to-yellow-500' }
    ];

    const travelEssentials = [
        { item: 'Power Adapter', category: 'Electronics', essential: true, checked: false },
        { item: 'Travel Insurance', category: 'Documents', essential: true, checked: true },
        { item: 'Portable Charger', category: 'Electronics', essential: true, checked: false },
        { item: 'First Aid Kit', category: 'Health', essential: true, checked: false },
        { item: 'Local SIM Card', category: 'Communication', essential: false, checked: true },
        { item: 'Rain Jacket', category: 'Clothing', essential: false, checked: false },
        { item: 'Travel Pillow', category: 'Comfort', essential: false, checked: true },
        { item: 'Water Bottle', category: 'Essentials', essential: true, checked: true }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl">
                            <Navigation className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Travel Tools & Information
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Weather forecasts, nearby facilities, and essential travel information
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Weather & Facilities */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Current Weather */}
                        <div className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            <Sun size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold">{location}</h2>
                                            <p className="opacity-90">Current Weather</p>
                                        </div>
                                    </div>

                                    <div className="flex items-end mb-8">
                                        <div className="text-7xl font-bold">{weatherData.temp}°</div>
                                        <div className="ml-4 text-lg opacity-90">Fahrenheit</div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Thermometer size={18} />
                                                <span className="text-sm opacity-90">Feels like</span>
                                            </div>
                                            <p className="text-xl font-semibold">{weatherData.temp + 2}°</p>
                                        </div>

                                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Droplets size={18} />
                                                <span className="text-sm opacity-90">Humidity</span>
                                            </div>
                                            <p className="text-xl font-semibold">{weatherData.humidity}%</p>
                                        </div>

                                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Wind size={18} />
                                                <span className="text-sm opacity-90">Wind</span>
                                            </div>
                                            <p className="text-xl font-semibold">{weatherData.windSpeed} mph</p>
                                        </div>

                                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Umbrella size={18} />
                                                <span className="text-sm opacity-90">Precipitation</span>
                                            </div>
                                            <p className="text-xl font-semibold">{weatherData.precipitation}%</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 md:mt-0 text-center">
                                    <div className="text-8xl mb-4">☀️</div>
                                    <p className="text-2xl font-semibold">{weatherData.condition}</p>
                                    <p className="opacity-90 mt-1">UV Index: {weatherData.uvIndex} (High)</p>
                                </div>
                            </div>
                        </div>

                        {/* Forecast */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    5-Day Forecast
                                </h3>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    >
                                        <option>New York</option>
                                        <option>London</option>
                                        <option>Tokyo</option>
                                        <option>Paris</option>
                                        <option>Dubai</option>
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
                                        className={`group p-5 rounded-2xl text-center cursor-pointer transition-all duration-300 ${day.condition === 'rainy'
                                            ? 'bg-linear-to-b from-blue-50 to-cyan-50 hover:shadow-lg'
                                            : 'bg-linear-to-b from-amber-50 to-orange-50 hover:shadow-lg'
                                            }`}
                                    >
                                        <p className="font-semibold text-gray-900 text-lg">{day.day}</p>
                                        <div className="text-4xl my-4 group-hover:scale-110 transition-transform">
                                            {day.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xl font-bold text-gray-900">{day.high}°</p>
                                            <p className="text-gray-600 text-sm">Low: {day.low}°</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Nearby Facilities */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8">
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
                                    className="flex items-center space-x-2 px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg"
                                >
                                    <MapPin size={18} />
                                    <span className="font-medium">Open Map</span>
                                </motion.button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {facilities.map((facility, idx) => (
                                    <motion.div
                                        key={facility.type}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group p-5 bg-linear-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl cursor-pointer transition-all duration-300"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-3xl">{facility.icon}</span>
                                            <div className={`w-2 h-2 rounded-full bg-linear-to-r ${facility.color}`} />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-lg">{facility.name}</p>
                                        <p className="text-gray-500 text-sm mt-1">{facility.count} available</p>

                                        <div className={`mt-4 h-1 bg-linear-to-r ${facility.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Travel Essentials & Tips */}
                    <div className="space-y-8">

                        {/* Travel Essentials Checklist */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Packing Checklist
                                </h3>
                                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                    {travelEssentials.filter(item => item.checked).length}/{travelEssentials.length}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {travelEssentials.map((item, idx) => (
                                    <motion.div
                                        key={item.item}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group flex items-center justify-between p-4 bg-linear-to-r from-gray-50/50 to-white/50 rounded-2xl hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-2 rounded-lg ${item.essential
                                                ? 'bg-linear-to-r from-red-50 to-rose-50'
                                                : 'bg-linear-to-r from-gray-50 to-gray-100'
                                                }`}>
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() => { }}
                                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.item}</p>
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

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full mt-6 py-3.5 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg font-medium"
                            >
                                Save Checklist
                            </motion.button>
                        </div>

                        {/* Travel Tips */}
                        <div className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 border border-blue-100/50">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16" />

                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl">
                                        <AlertCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">💡 Travel Tips</h3>
                                        <p className="text-gray-600 text-sm">Important reminders</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        'Check visa requirements at least 3 months in advance',
                                        'Notify your bank about travel plans to avoid card blocks',
                                        'Download offline maps and translation apps',
                                        'Pack a basic first-aid kit with essential medications',
                                        'Keep digital copies of important documents'
                                    ].map((tip, idx) => (
                                        <div key={idx} className="flex items-start space-x-4 p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                                            <div className="h-7 w-7 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Emergency Contacts
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                                >
                                    <Download size={18} />
                                    <span className="font-medium">Save</span>
                                </motion.button>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { name: 'Local Police', number: '911', type: 'emergency' },
                                    { name: 'Medical Emergency', number: '911', type: 'emergency' },
                                    { name: 'Tourist Helpline', number: '1-800-555-HELP', type: 'assistance' },
                                    { name: 'U.S. Embassy', number: '+1-202-501-4444', type: 'embassy' },
                                    { name: 'Local Hospital', number: '+1-212-555-1234', type: 'medical' }
                                ].map((contact, idx) => (
                                    <div key={idx} className="p-4 bg-linear-to-r from-red-50/50 to-rose-50/50 rounded-2xl">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">{contact.name}</p>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${contact.type === 'emergency'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {contact.type}
                                                </span>
                                            </div>
                                            <a
                                                href={`tel:${contact.number}`}
                                                className="text-red-600 hover:text-red-700 font-semibold text-lg"
                                            >
                                                {contact.number}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelTools;