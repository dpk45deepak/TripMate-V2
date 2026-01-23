// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, MapPin, Calendar, Users, Star, ChevronRight,
    Clock, DollarSign, TrendingUp, Sparkles, Globe, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PreviousItinerariesSection from '../components/itinerary/PreviousItineraries';
import WeatherWidget from '../components/weather/WeatherWidget';
import AISuggestions from '../components/ai/AISuggestions';
import ChatAssistant from '../components/ai/ChatAssistant';

const Dashboard = () => {
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [assistant, setAssistant] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setItineraries([
                {
                    id: 1,
                    title: 'Bali Adventure',
                    location: 'Bali, Indonesia',
                    duration: '7 days',
                    budget: 2500,
                    dates: 'Dec 15-22, 2024',
                    travelers: 2,
                    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
                    tags: ['Adventure', 'Beach', 'Culture'],
                    progress: 75,
                    color: 'from-blue-500 to-cyan-500'
                },
                {
                    id: 2,
                    title: 'European Tour',
                    location: 'Paris, Rome, Barcelona',
                    duration: '14 days',
                    budget: 4500,
                    dates: 'Mar 10-24, 2024',
                    travelers: 4,
                    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800',
                    tags: ['Culture', 'Food', 'History'],
                    progress: 30,
                    color: 'from-teal-500 to-pink-500'
                },
                {
                    id: 3,
                    title: 'Japan Spring',
                    location: 'Tokyo, Kyoto, Osaka',
                    duration: '10 days',
                    budget: 3200,
                    dates: 'Apr 5-15, 2024',
                    travelers: 2,
                    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800',
                    tags: ['Cherry Blossoms', 'Food', 'Temples'],
                    progress: 10,
                    color: 'from-rose-500 to-orange-500'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAssistant(prev => !prev)}
                className="fixed bottom-6 right-6 z-50
                group flex items-center gap-2 px-4 py-3 rounded-full
                bg-white/70 backdrop-blur-lg border border-purple-300
                text-blue-700 font-semibold shadow-xl hover:shadow-2xl
                transition-all duration-300"
            >
                <Sparkles className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
                <span>AI Assistant</span>
            </motion.button>

            {/* Chat Assistant */}
            {assistant && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <ChatAssistant onClose={() => setAssistant(false)} />
                </motion.div>
            )}
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-teal-500/5 to-pink-500/5" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:w-2/3"
                        >
                            <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-full mb-6">
                                <Sparkles size={18} />
                                <span className="font-medium">AI-Powered</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Plan Your Next{' '}
                                <span className="bg-linear-to-r from-blue-600 via-teal-600 to-pink-600 bg-clip-text text-transparent">
                                    Adventure
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 mt-6 max-w-2xl">
                                Create personalized itineraries, track budgets, and discover hidden gems with AI-powered travel planning.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/itinerary/create')}
                                    className="group relative overflow-hidden flex items-center space-x-4 px-8 py-4 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Plus size={22} className="relative z-10" />
                                    <span className="relative z-10 font-semibold text-lg">Create New Trip</span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/explore')}
                                    className="group flex items-center space-x-4 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200/50 rounded-2xl hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                                >
                                    <Sparkles size={22} className="text-teal-500" />
                                    <span className="font-semibold text-lg">Discover Trips</span>
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Weather & Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="lg:w-3/4"
                        >
                            <WeatherWidget />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            icon: MapPin,
                            label: 'Destinations',
                            value: '12',
                            change: '+2',
                            color: 'from-blue-500 to-cyan-500',
                            bg: 'bg-blue-50'
                        },
                        {
                            icon: Calendar,
                            label: 'Upcoming Trips',
                            value: '3',
                            change: '+1',
                            color: 'from-teal-500 to-pink-500',
                            bg: 'bg-teal-50'
                        },
                        {
                            icon: Users,
                            label: 'Travel Buddies',
                            value: '8',
                            change: '+3',
                            color: 'from-green-500 to-emerald-500',
                            bg: 'bg-green-50'
                        },
                        {
                            icon: DollarSign,
                            label: 'Total Budget',
                            value: '$10.2k',
                            change: '+$1.5k',
                            color: 'from-amber-500 to-orange-500',
                            bg: 'bg-amber-50'
                        }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-gray-200/50 hover:shadow-xl hover:border-gray-300/50 transition-all duration-300"
                        >
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

                            <div className={`p-3 w-14 h-14 bg-linear-to-br ${stat.color} rounded-xl inline-flex items-center justify-center mb-4`}>
                                <stat.icon className="h-7 w-7 text-white" />
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                                </div>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Itinerary Section */}
                <div className='m-1'>
                <PreviousItinerariesSection />
                </div>

                {/* AI Suggestions Section */}
                <div className="my-16">
                    <AISuggestions />
                </div>

                {/* Trending Destinations */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Trending Now
                            </h2>
                            <p className="text-gray-600 mt-1">Popular destinations travelers love</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium"
                        >
                            <span>Explore All</span>
                            <ChevronRight size={16} />
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: 'Bali',
                                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                                count: '1.2k trips',
                                color: 'from-blue-500/90 to-cyan-500/90'
                            },
                            {
                                name: 'Tokyo',
                                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                                count: '890 trips',
                                color: 'from-teal-500/90 to-pink-500/90'
                            },
                            {
                                name: 'Paris',
                                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
                                count: '1.5k trips',
                                color: 'from-rose-500/90 to-orange-500/90'
                            },
                            {
                                name: 'New York',
                                image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
                                count: '2.1k trips',
                                color: 'from-emerald-500/90 to-green-500/90'
                            }
                        ].map((dest, idx) => (
                            <motion.div
                                key={dest.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-square"
                                onClick={() => navigate(`/suggestions?destination=${dest.name}`)}
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold">{dest.name}</h3>
                                        <Heart className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <p className="text-sm opacity-90">{dest.count}</p>

                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileHover={{ width: '40%' }}
                                        className="h-1 bg-linear-to-r from-white/80 to-white/20 rounded-full mt-3"
                                    />
                                </div>

                                <div className={`absolute top-4 right-4 px-3 py-1.5 bg-linear-to-r ${dest.color} backdrop-blur-sm rounded-full text-white text-sm font-medium`}>
                                    Trending
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Inspiration Section */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50/50 via-white/50 to-teal-50/50 border border-gray-200/50 p-8">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-blue-500/10 to-teal-500/10 rounded-full -translate-y-48 translate-x-48" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-2/3">
                            <h3 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
                                Need Travel Inspiration?
                            </h3>
                            <p className="text-gray-600 text-lg mb-6 max-w-2xl">
                                Let our AI create a custom itinerary based on your interests, budget, and travel style.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/itinerary/create')}
                                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                                >
                                    Try AI Planner
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/explore')}
                                    className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 rounded-xl font-semibold hover:border-blue-400 hover:shadow-lg transition-all"
                                >
                                    Browse Destinations
                                </motion.button>
                            </div>
                        </div>

                        <div className="lg:w-1/3 flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 bg-linear-to-br from-blue-500/20 to-teal-500/20 rounded-3xl rotate-12" />
                                <div className="absolute inset-0 w-48 h-48 bg-linear-to-br from-blue-500/10 to-teal-500/10 rounded-3xl -rotate-12" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe className="h-24 w-24 text-blue-500/30" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    };

export default Dashboard;