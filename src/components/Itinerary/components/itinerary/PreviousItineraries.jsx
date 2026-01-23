// src/components/itinerary/PastItineraries.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, MapPin, Users, DollarSign, Star,
    Heart, MessageCircle, ChevronRight, Clock,
    Sparkles, TrendingUp, Award, Globe, Share2,
    MoreVertical, Edit3, Download, Trash2,
    Plane, Hotel, Utensils, Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PreviousItinerariesSection = ({ itineraries = [] }) => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [favorites, setFavorites] = useState({});
    const [expandedCard, setExpandedCard] = useState(null);
    const [menuOpen, setMenuOpen] = useState(null);

    // Default itineraries if none provided
    const defaultItineraries = [
        {
            id: 1,
            title: "Bali Adventure",
            location: "Bali, Indonesia",
            duration: "7 days",
            budget: 2500,
            dates: "Dec 15-22, 2023",
            travelers: 2,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800",
            tags: ["Adventure", "Beach", "Culture"],
            status: "completed",
            rating: 4.9,
            memories: 24,
            highlights: ["Uluwatu Temple", "Mount Batur", "Rice Terraces"],
            color: "from-blue-500 to-cyan-500",
            activities: ["Surfing", "Temple Visits", "Hiking"],
            accommodations: ["Beach Resort", "Villa"],
            meals: ["Local Cuisine", "Seafood"],
            insights: "Perfect blend of adventure and relaxation"
        },
        {
            id: 2,
            title: "Japan Spring",
            location: "Tokyo, Kyoto, Osaka",
            duration: "10 days",
            budget: 3200,
            dates: "Apr 5-15, 2023",
            travelers: 2,
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800",
            tags: ["Cherry Blossoms", "Food", "Temples"],
            status: "completed",
            rating: 4.8,
            memories: 18,
            highlights: ["Fuji Views", "Sushi Tour", "Ancient Temples"],
            color: "from-purple-500 to-pink-500",
            activities: ["Sakura Viewing", "Temple Tours", "Shopping"],
            accommodations: ["Ryokan", "Modern Hotel"],
            meals: ["Sushi", "Ramen", "Kaiseki"],
            insights: "Magical cherry blossom season experience"
        },
        {
            id: 3,
            title: "European Tour",
            location: "Paris, Rome, Barcelona",
            duration: "14 days",
            budget: 4500,
            dates: "Mar 10-24, 2023",
            travelers: 4,
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800",
            tags: ["Culture", "Food", "History"],
            status: "completed",
            rating: 4.7,
            memories: 32,
            highlights: ["Eiffel Tower", "Colosseum", "Sagrada Familia"],
            color: "from-amber-500 to-orange-500",
            activities: ["Museum Tours", "Wine Tasting", "City Exploration"],
            accommodations: ["Boutique Hotels", "Airbnb"],
            meals: ["French Cuisine", "Italian Pasta", "Tapas"],
            insights: "Cultural immersion across three beautiful countries"
        }
    ];

    const displayedItineraries = itineraries.length > 0 ? itineraries : defaultItineraries;

    const filters = [
        { id: 'all', label: 'All Trips', count: displayedItineraries.length, icon: Globe },
        { id: 'favorites', label: 'Favorites', count: displayedItineraries.filter(t => t.rating >= 4.8).length, icon: Heart },
        { id: 'recent', label: 'Recent', count: 2, icon: Clock },
        { id: 'budget', label: 'Budget', count: displayedItineraries.filter(t => t.budget < 3000).length, icon: DollarSign },
        { id: 'adventure', label: 'Adventure', count: displayedItineraries.filter(t => t.tags.includes('Adventure')).length, icon: TrendingUp }
    ];

    const filteredItineraries = activeFilter === 'all'
        ? displayedItineraries
        : activeFilter === 'favorites'
            ? displayedItineraries.filter(t => favorites[t.id] || t.rating >= 4.8)
            : activeFilter === 'recent'
                ? displayedItineraries.slice(0, 2)
                : activeFilter === 'budget'
                    ? displayedItineraries.filter(t => t.budget < 3000)
                    : displayedItineraries.filter(t => t.tags.includes('Adventure'));

    const handleFavorite = (id, e) => {
        e.stopPropagation();
        setFavorites(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleShare = (trip, e) => {
        e.stopPropagation();
        // In a real app, this would trigger share functionality
        alert(`Sharing "${trip.title}" itinerary!`);
    };

    const toggleCardExpand = (id, e) => {
        e.stopPropagation();
        setExpandedCard(expandedCard === id ? null : id);
    };

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setMenuOpen(menuOpen === id ? null : id);
    };

    const CardMenu = ({ trip }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-12 right-4 z-50 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-2">
                {[
                    { icon: Edit3, label: 'Edit Trip', color: 'text-blue-600' },
                    { icon: Download, label: 'Export PDF', color: 'text-green-600' },
                    { icon: Share2, label: 'Share', color: 'text-purple-600' },
                    { icon: Trash2, label: 'Delete', color: 'text-red-600' }
                ].map((item, idx) => (
                    <button
                        key={idx}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50/80 rounded-xl transition-colors"
                    >
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8">
            {/* Enhanced Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center space-x-3 mb-3">
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg"
                        >
                            <Award className="h-7 w-7 text-white" />
                        </motion.div>
                        <div>
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Travel Chronicles
                            </h2>
                            <p className="text-gray-600 mt-1">Relive your completed trips and beautiful memories</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filters */}
                <div className="flex flex-wrap gap-3">
                    {filters.map(filter => {
                        const Icon = filter.icon;
                        return (
                            <motion.button
                                key={filter.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`group flex items-center space-x-3 px-5 py-3 rounded-2xl transition-all duration-300 backdrop-blur-sm ${activeFilter === filter.id
                                    ? `bg-linear-to-r ${filter.id === 'favorites' ? 'from-rose-500 to-pink-500' :
                                        filter.id === 'recent' ? 'from-blue-500 to-cyan-500' :
                                            filter.id === 'budget' ? 'from-green-500 to-emerald-500' :
                                                filter.id === 'adventure' ? 'from-amber-500 to-orange-500' :
                                                    'from-indigo-500 to-purple-500'} text-white shadow-lg`
                                    : 'bg-white/80 border border-gray-200/50 text-gray-700 hover:bg-white hover:border-blue-300 hover:shadow-lg'
                                    }`}
                            >
                                <Icon className={`h-4 w-4 ${activeFilter === filter.id ? 'text-white' : 'text-gray-500'}`} />
                                <span className="font-medium">{filter.label}</span>
                                <span className={`text-sm px-2.5 py-1 rounded-full ${activeFilter === filter.id
                                    ? 'bg-white/20'
                                    : 'bg-gray-100'
                                    }`}>
                                    {filter.count}
                                </span>
                            </motion.button>
                        );
                    })}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/itinerary/memories')}
                        className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full 
             bg-white/60 backdrop-blur-lg border border-blue-200 
             shadow-md hover:shadow-2xl transition-all duration-300"
                    >
                        <span className="text-blue-600 font-semibold">View All Memories</span>

                        <span className="flex items-center justify-center w-8 h-8 rounded-full 
                   bg-linear-to-r from-blue-500 to-purple-500 
                   text-white transform group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Enhanced Itineraries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredItineraries.map((trip, idx) => {
                        const isFavorite = favorites[trip.id];
                        const isExpanded = expandedCard === trip.id;
                        const isMenuOpen = menuOpen === trip.id;

                        return (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -5 }}
                                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 cursor-pointer"
                                onClick={() => navigate(`/memories/${trip.id}`)}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-linear-to-br ${trip.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />

                                {/* Enhanced Status Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="px-4 py-2 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2"
                                    >
                                        <div className="h-2 w-2 bg-white rounded-full animate-pulse" />
                                        <span>Completed</span>
                                    </motion.div>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
                                    {/* Rating Badge */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="flex items-center space-x-1 px-3 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30"
                                    >
                                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        <span className="text-white text-sm font-bold">{trip.rating}</span>
                                    </motion.div>

                                    {/* Favorite Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => handleFavorite(trip.id, e)}
                                        className="p-2.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                                    >
                                        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                                    </motion.button>

                                    {/* Share Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => handleShare(trip, e)}
                                        className="p-2.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                                    >
                                        <Share2 className="h-5 w-5 text-white" />
                                    </motion.button>

                                    {/* More Options */}
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => toggleMenu(trip.id, e)}
                                            className="p-2.5 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                                        >
                                            <MoreVertical className="h-5 w-5 text-white" />
                                        </motion.button>
                                        <AnimatePresence>
                                            {isMenuOpen && <CardMenu trip={trip} />}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Enhanced Trip Image */}
                                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                                    <img
                                        src={trip.image}
                                        alt={trip.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{trip.title}</h3>
                                        <div className="flex items-center space-x-2">
                                            <MapPin className="h-4 w-4 text-white/90" />
                                            <span className="text-white/90 text-sm">{trip.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Trip Content */}
                                <div className="p-6">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-4 gap-3 mb-6">
                                        {[
                                            { icon: Calendar, label: trip.dates.split(' ')[0], sub: 'Start' },
                                            { icon: Clock, label: trip.duration, sub: 'Days' },
                                            { icon: Users, label: trip.travelers, sub: 'People' },
                                            { icon: DollarSign, label: `$${trip.budget.toLocaleString()}`, sub: 'Budget' }
                                        ].map((stat, idx) => (
                                            <div key={idx} className="text-center">
                                                <div className="p-2 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl mb-2">
                                                    <stat.icon className="h-4 w-4 text-gray-600 mx-auto" />
                                                </div>
                                                <p className="text-sm font-bold text-gray-900">{stat.label}</p>
                                                <p className="text-xs text-gray-500">{stat.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                                <Sparkles className="h-4 w-4 text-amber-500" />
                                                <span>Highlights</span>
                                            </p>
                                            <button
                                                onClick={(e) => toggleCardExpand(trip.id, e)}
                                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                {isExpanded ? 'Show less' : 'Show more'}
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {trip.highlights.slice(0, isExpanded ? 5 : 2).map((highlight, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="px-3 py-2 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 text-xs font-semibold rounded-xl border border-blue-200/50"
                                                >
                                                    {highlight}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="grid grid-cols-3 gap-4 mb-4">
                                                    <div className="text-center">
                                                        <Plane className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                                                        <p className="text-xs text-gray-600">Activities</p>
                                                        <p className="text-sm font-medium">{trip.activities?.length || 3}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <Hotel className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                                                        <p className="text-xs text-gray-600">Stays</p>
                                                        <p className="text-sm font-medium">{trip.accommodations?.length || 2}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <Utensils className="h-4 w-4 text-green-500 mx-auto mb-1" />
                                                        <p className="text-xs text-gray-600">Cuisines</p>
                                                        <p className="text-sm font-medium">{trip.meals?.length || 3}</p>
                                                    </div>
                                                </div>
                                                {trip.insights && (
                                                    <div className="p-4 bg-linear-to-r from-gray-50 to-gray-100/50 rounded-xl mb-4">
                                                        <p className="text-sm text-gray-700 italic">"{trip.insights}"</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Tags & Footer */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                                        <div className="flex flex-wrap gap-2">
                                            {trip.tags.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-medium rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 text-gray-600">
                                                <Camera className="h-4 w-4 text-purple-500" />
                                                <span className="text-sm font-semibold">{trip.memories}</span>
                                            </div>
                                            <motion.div
                                                whileHover={{ x: 5 }}
                                                className="flex items-center space-x-1 text-blue-600"
                                            >
                                                <span className="text-sm font-medium">View</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Hover Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}

                </AnimatePresence>
            </div>

            {/* Enhanced Stats Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-linear-to-br from-blue-50 via-white to-purple-50 rounded-3xl border border-blue-100/50 p-8 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Travel Summary</h3>
                        <p className="text-gray-600">Your journey in numbers</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium shadow-lg"
                    >
                        View Insights
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        {
                            label: 'Total Trips',
                            value: displayedItineraries.length,
                            icon: Globe,
                            color: 'from-blue-500 to-cyan-500',
                            change: '+12%'
                        },
                        {
                            label: 'Countries',
                            value: '8',
                            icon: MapPin,
                            color: 'from-purple-500 to-pink-500',
                            change: '+2'
                        },
                        {
                            label: 'Memories',
                            value: displayedItineraries.reduce((sum, t) => sum + t.memories, 0),
                            icon: Sparkles,
                            color: 'from-amber-500 to-orange-500',
                            change: '+24'
                        },
                        {
                            label: 'Avg Rating',
                            value: (displayedItineraries.reduce((sum, t) => sum + t.rating, 0) / displayedItineraries.length).toFixed(1),
                            icon: Star,
                            color: 'from-green-500 to-emerald-500',
                            change: '↑ 0.2'
                        }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:shadow-xl hover:border-blue-200 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 bg-linear-to-br ${stat.color} rounded-xl shadow-lg`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-gray-600">{stat.label}</p>

                            {/* Hover effect line */}
                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-medium text-gray-900">Travel Goal Progress</span>
                        <span className="text-sm font-semibold text-blue-600">65%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">12 of 20 countries visited this year</p>
                </div>
            </motion.div>
        </div>
    );
};

export default PreviousItinerariesSection;