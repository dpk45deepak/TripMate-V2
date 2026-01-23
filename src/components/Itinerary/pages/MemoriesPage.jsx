// src/pages/MemoriesPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, MessageCircle, MapPin, Calendar, Users,
    ChevronLeft, ChevronRight, Share2, Download, Star,
    Image as ImageIcon, Video, Music, BookOpen, Sparkles,
    Filter, Search, Grid, List, Play, X, Camera,
    Globe, Award, TrendingUp, Clock, Bookmark,
    MoreVertical, Edit, Trash2, Share, Eye
} from 'lucide-react';
import { AddMemoryForm } from '../components/itinerary/AddMemoriesForm';

const MemoriesPage = () => {
    // State management
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedTrip, setSelectedTrip] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [memories, setMemories] = useState([]);

    // Mock data - in real app, fetch from backend
    const defaultMemories = [
        {
            id: 1,
            title: "Sunset at Uluwatu Temple",
            description: "Watched the most beautiful sunset with traditional Kecak dance performance. The colors were absolutely breathtaking!",
            location: "Uluwatu, Bali",
            date: "Dec 16, 2024",
            travelers: ["You", "Sarah", "Mike"],
            images: [
                "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200",
                "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=800"
            ],
            videos: [],
            tags: ["Sunset", "Culture", "Beach", "Temple", "Bali"],
            likes: 142,
            comments: 28,
            shares: 15,
            saves: 42,
            type: "photo",
            color: "from-blue-500 to-cyan-500",
            tripId: "bali-2024",
            tripName: "Bali Adventure 2024",
            mood: "peaceful",
            privacy: "public",
            createdAt: "2024-12-16T18:30:00Z",
            isLiked: true,
            isSaved: true
        },
        {
            id: 2,
            title: "Street Food Tour in Tokyo",
            description: "Tried 15 different street foods in Shibuya. Ramen was incredible! The Tsukiji fish market experience was unforgettable.",
            location: "Tokyo, Japan",
            date: "Apr 7, 2024",
            travelers: ["You", "Mike", "Emma", "David"],
            images: [
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200"
            ],
            videos: ["https://example.com/video1.mp4"],
            tags: ["Food", "Nightlife", "City", "Japan", "Ramen"],
            likes: 289,
            comments: 45,
            shares: 32,
            saves: 89,
            type: "food",
            color: "from-teal-500 to-pink-500",
            tripId: "japan-2024",
            tripName: "Japan Cherry Blossom",
            mood: "excited",
            privacy: "friends",
            createdAt: "2024-04-07T14:20:00Z",
            isLiked: false,
            isSaved: true
        },
        {
            id: 3,
            title: "Hiking Mount Batur at Sunrise",
            description: "Early morning hike to catch the sunrise from the volcano summit. Worth every step of the 2am wakeup!",
            location: "Mount Batur, Bali",
            date: "Dec 18, 2024",
            travelers: ["You", "Guide", "Group"],
            images: [
                "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800"
            ],
            videos: [],
            tags: ["Adventure", "Sunrise", "Nature", "Hiking", "Volcano"],
            likes: 256,
            comments: 63,
            shares: 28,
            saves: 156,
            type: "adventure",
            color: "from-green-500 to-emerald-500",
            tripId: "bali-2024",
            tripName: "Bali Adventure 2024",
            mood: "adventurous",
            privacy: "public",
            createdAt: "2024-12-18T06:15:00Z",
            isLiked: true,
            isSaved: false
        },
        {
            id: 4,
            title: "Traditional Tea Ceremony in Kyoto",
            description: "Participated in a traditional Japanese tea ceremony. The attention to detail and tranquility was amazing.",
            location: "Kyoto, Japan",
            date: "Apr 9, 2024",
            travelers: ["You", "Emma"],
            images: [
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200"
            ],
            videos: ["https://example.com/tea-ceremony.mp4"],
            tags: ["Culture", "Traditional", "Tea", "Kyoto", "Japan"],
            likes: 187,
            comments: 34,
            shares: 19,
            saves: 92,
            type: "culture",
            color: "from-amber-500 to-orange-500",
            tripId: "japan-2024",
            tripName: "Japan Cherry Blossom",
            mood: "peaceful",
            privacy: "private",
            createdAt: "2024-04-09T11:00:00Z",
            isLiked: true,
            isSaved: true
        },
        {
            id: 5,
            title: "Beach Bonfire in Seminyak",
            description: "Spent the evening with friends around a bonfire on Seminyak Beach. Perfect end to an amazing day!",
            location: "Seminyak Beach, Bali",
            date: "Dec 20, 2024",
            travelers: ["You", "Sarah", "Mike", "Lisa", "John"],
            images: [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200"
            ],
            videos: [],
            tags: ["Beach", "Friends", "Bonfire", "Sunset", "Relaxation"],
            likes: 98,
            comments: 18,
            shares: 12,
            saves: 45,
            type: "social",
            color: "from-rose-500 to-pink-500",
            tripId: "bali-2024",
            tripName: "Bali Adventure 2024",
            mood: "happy",
            privacy: "friends",
            createdAt: "2024-12-20T20:45:00Z",
            isLiked: false,
            isSaved: false
        },
        {
            id: 6,
            title: "Sushi Making Class in Tokyo",
            description: "Learned to make authentic sushi from a master chef. Way harder than it looks but incredibly fun!",
            location: "Tokyo, Japan",
            date: "Apr 8, 2024",
            travelers: ["You", "David"],
            images: [
                "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200"
            ],
            videos: ["https://example.com/sushi-class.mp4"],
            tags: ["Food", "Cooking", "Learning", "Sushi", "Experience"],
            likes: 124,
            comments: 27,
            shares: 16,
            saves: 67,
            type: "food",
            color: "from-indigo-500 to-teal-500",
            tripId: "japan-2024",
            tripName: "Japan Cherry Blossom",
            mood: "excited",
            privacy: "public",
            createdAt: "2024-04-08T16:30:00Z",
            isLiked: true,
            isSaved: true
        }
    ];

    // Available trips for filtering
    const trips = [
        { id: 'all', name: 'All Trips', count: defaultMemories.length },
        { id: 'bali-2024', name: 'Bali Adventure 2024', count: defaultMemories.filter(m => m.tripId === 'bali-2024').length },
        { id: 'japan-2024', name: 'Japan Cherry Blossom', count: defaultMemories.filter(m => m.tripId === 'japan-2024').length },
        { id: 'europe-2023', name: 'Europe Tour 2023', count: 0 }
    ];

    // Memory types
    const memoryTypes = [
        { id: 'all', label: 'All Memories', icon: Sparkles, count: defaultMemories.length },
        { id: 'photo', label: 'Photos', icon: ImageIcon, count: defaultMemories.filter(m => m.type === 'photo').length },
        { id: 'food', label: 'Food', icon: Music, count: defaultMemories.filter(m => m.type === 'food').length },
        { id: 'adventure', label: 'Adventures', icon: BookOpen, count: defaultMemories.filter(m => m.type === 'adventure').length },
        { id: 'culture', label: 'Culture', icon: Globe, count: defaultMemories.filter(m => m.type === 'culture').length },
        { id: 'social', label: 'Social', icon: Users, count: defaultMemories.filter(m => m.type === 'social').length }
    ];

    // Sort options
    const sortOptions = [
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'popular', label: 'Most Popular' },
        { id: 'likes', label: 'Most Likes' },
        { id: 'comments', label: 'Most Comments' }
    ];

    // Initialize memories
    useEffect(() => {
        setMemories(defaultMemories);
    }, []);

    // Filter and sort logic
    const filteredMemories = memories.filter(memory => {
        const matchesSearch = searchQuery === '' ||
            memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = activeFilter === 'all' || memory.type === activeFilter;
        const matchesTrip = selectedTrip === 'all' || memory.tripId === selectedTrip;

        return matchesSearch && matchesType && matchesTrip;
    });

    const sortedMemories = [...filteredMemories].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'popular':
                return (b.likes + b.comments * 2 + b.shares * 3) - (a.likes + a.comments * 2 + a.shares * 3);
            case 'likes':
                return b.likes - a.likes;
            case 'comments':
                return b.comments - a.comments;
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });

    // Pagination
    const itemsPerPage = viewMode === 'grid' ? 9 : 6;
    const totalPages = Math.ceil(sortedMemories.length / itemsPerPage);
    const paginatedMemories = sortedMemories.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Handlers
    const handlePrevPage = () => setCurrentPage(prev => Math.max(0, prev - 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));

    const handleLike = (memoryId) => {
        setMemories(prev => prev.map(memory =>
            memory.id === memoryId
                ? {
                    ...memory,
                    likes: memory.isLiked ? memory.likes - 1 : memory.likes + 1,
                    isLiked: !memory.isLiked
                }
                : memory
        ));
    };

    const handleSave = (memoryId) => {
        setMemories(prev => prev.map(memory =>
            memory.id === memoryId
                ? {
                    ...memory,
                    saves: memory.isSaved ? memory.saves - 1 : memory.saves + 1,
                    isSaved: !memory.isSaved
                }
                : memory
        ));
    };

    const handleAddMemory = (newMemory) => {
        const memoryWithId = {
            ...newMemory,
            id: Date.now(),
            likes: 0,
            comments: 0,
            shares: 0,
            saves: 0,
            isLiked: false,
            isSaved: false,
            createdAt: new Date().toISOString()
        };
        setMemories(prev => [memoryWithId, ...prev]);
        setShowAddForm(false);
    };

    // Statistics
    const stats = {
        totalMemories: memories.length,
        totalLikes: memories.reduce((sum, m) => sum + m.likes, 0),
        totalComments: memories.reduce((sum, m) => sum + m.comments, 0),
        totalTrips: [...new Set(memories.map(m => m.tripId))].length,
        favoriteType: memoryTypes.slice(1).reduce((max, type) =>
            type.count > max.count ? type : max
        ).label
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-teal-50/20">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-linear-to-r from-blue-500/10 via-teal-500/10 to-pink-500/10">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-teal-500 text-white px-5 py-2.5 rounded-full mb-6">
                            <Sparkles size={20} />
                            <span className="font-semibold">Travel Memories</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Your Travel{' '}
                            <span className="bg-linear-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                                Memories
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Relive your favorite moments, share stories, and preserve memories from all your adventures
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        {
                            label: 'Total Memories',
                            value: stats.totalMemories,
                            icon: Camera,
                            color: 'from-blue-500 to-cyan-500',
                            change: '+12'
                        },
                        {
                            label: 'Total Likes',
                            value: stats.totalLikes.toLocaleString(),
                            icon: Heart,
                            color: 'from-rose-500 to-pink-500',
                            change: '+156'
                        },
                        {
                            label: 'Comments',
                            value: stats.totalComments.toLocaleString(),
                            icon: MessageCircle,
                            color: 'from-teal-500 to-indigo-500',
                            change: '+24'
                        },
                        {
                            label: 'Trips Covered',
                            value: stats.totalTrips,
                            icon: Globe,
                            color: 'from-green-500 to-emerald-500',
                            change: '+2'
                        }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-gray-300/50 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 bg-linear-to-br ${stat.color} rounded-2xl`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>

                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-gray-600 text-sm">{stat.label}</p>

                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${stat.color} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                        </motion.div>
                    ))}
                </div>

                {/* Controls Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg">
                    {/* Search */}
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search memories by title, description, or tags..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Controls Group */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-white shadow-sm'
                                    : 'hover:bg-gray-200'
                                    }`}
                            >
                                <Grid size={20} className={viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-white shadow-sm'
                                    : 'hover:bg-gray-200'
                                    }`}
                            >
                                <List size={20} className={viewMode === 'list' ? 'text-blue-600' : 'text-gray-600'} />
                            </button>
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            {sortOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Trip Filter */}
                        <select
                            value={selectedTrip}
                            onChange={(e) => setSelectedTrip(e.target.value)}
                            className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            {trips.map(trip => (
                                <option key={trip.id} value={trip.id}>
                                    {trip.name} ({trip.count})
                                </option>
                            ))}
                        </select>

                        {/* Add Memory Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddForm(true)}
                            className="group flex items-center space-x-3 px-6 py-3 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Camera size={20} className="relative z-10" />
                            <span className="relative z-10 font-semibold">Add Memory</span>
                        </motion.button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {memoryTypes.map(type => (
                        <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setActiveFilter(type.id);
                                setCurrentPage(0);
                            }}
                            className={`group flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${activeFilter === type.id
                                ? `bg-linear-to-r ${type.id === 'photo' ? 'from-blue-500 to-cyan-500' :
                                    type.id === 'food' ? 'from-teal-500 to-pink-500' :
                                        type.id === 'adventure' ? 'from-green-500 to-emerald-500' :
                                            type.id === 'culture' ? 'from-amber-500 to-orange-500' :
                                                type.id === 'social' ? 'from-rose-500 to-pink-500' :
                                                    'from-indigo-500 to-teal-500'} text-white shadow-lg`
                                : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:border-gray-300 hover:shadow-md'
                                }`}
                        >
                            <type.icon size={18} />
                            <span className="font-medium">{type.label}</span>
                            <span className={`text-sm px-2 py-0.5 rounded-full ${activeFilter === type.id
                                ? 'bg-white/20'
                                : 'bg-gray-100'
                                }`}>
                                {type.count}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Memories Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <AnimatePresence>
                            {paginatedMemories.map((memory, idx) => (
                                <MemoryCard
                                    key={memory.id}
                                    memory={memory}
                                    idx={idx}
                                    viewMode={viewMode}
                                    onLike={handleLike}
                                    onSave={handleSave}
                                    onSelect={setSelectedMemory}
                                />
                            ))}

                            {/* Add Memory Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => setShowAddForm(true)}
                                className="group relative overflow-hidden bg-linear-to-br from-gray-50/50 to-gray-100/50 border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:shadow-2xl transition-all duration-500 min-h-100"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-teal-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 text-center">
                                    <div className="p-5 bg-linear-to-r from-blue-500 to-teal-500 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 inline-block">
                                        <Sparkles className="h-12 w-12 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        Add New Memory
                                    </h3>
                                    <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                                        Preserve special moments from your travels
                                    </p>

                                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-blue-500 to-teal-500 text-white rounded-lg">
                                        <Camera size={18} />
                                        <span className="font-medium">Upload Now</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="space-y-6 mb-12">
                        <AnimatePresence>
                            {paginatedMemories.map((memory, idx) => (
                                <MemoryCard
                                    key={memory.id}
                                    memory={memory}
                                    idx={idx}
                                    viewMode={viewMode}
                                    onLike={handleLike}
                                    onSave={handleSave}
                                    onSelect={setSelectedMemory}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-4 pt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 hover:shadow-md transition-all"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>

                        <div className="flex items-center space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => i).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === page
                                        ? 'bg-linear-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                                        : 'bg-white/50 border border-gray-200/50 text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {page + 1}
                                </button>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-400 hover:shadow-md transition-all"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                )}

                {/* No Results */}
                {paginatedMemories.length === 0 && (
                    <div className="text-center py-16">
                        <div className="p-6 bg-linear-to-r from-gray-100 to-gray-200 rounded-3xl inline-block mb-6">
                            <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No memories found</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            {searchQuery ? `No memories match "${searchQuery}". Try a different search or filter.` : 'Start by adding your first travel memory!'}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddForm(true)}
                            className="px-8 py-3.5 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-xl hover:shadow-xl font-semibold"
                        >
                            Add Your First Memory
                        </motion.button>
                    </div>
                )}
            </div>

            {/* Add Memory Form Modal */}
            <AnimatePresence
            className="w-full"
            >
                {showAddForm && (
                    <AddMemoryForm
                        onClose={() => setShowAddForm(false)}
                        onSubmit={handleAddMemory}
                    />
                )}
            </AnimatePresence>

            {/* Memory Detail Modal */}
            <AnimatePresence>
                {selectedMemory && (
                    <MemoryDetailModal
                        memory={selectedMemory}
                        onClose={() => setSelectedMemory(null)}
                        onLike={handleLike}
                        onSave={handleSave}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Enhanced Memory Card Component
const MemoryCard = ({ memory, idx, viewMode, onLike, onSave, onSelect }) => {
    const [showActions, setShowActions] = useState(false);

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500"
            >
                <div className="flex">
                    {/* Image */}
                    <div className="w-48 h-48 relative overflow-hidden rounded-l-3xl">
                        <img
                            src={memory.images[0]}
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-white text-sm font-medium capitalize">{memory.type}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {memory.title}
                                </h3>
                                <p className="text-gray-600 mt-2 line-clamp-2">{memory.description}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => onLike(memory.id)}
                                    className={`p-2 rounded-xl transition-colors ${memory.isLiked
                                        ? 'text-rose-500 bg-rose-50'
                                        : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                                        }`}
                                >
                                    <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={() => onSave(memory.id)}
                                    className={`p-2 rounded-xl transition-colors ${memory.isSaved
                                        ? 'text-blue-500 bg-blue-50'
                                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                                        }`}
                                >
                                    <Bookmark size={20} fill={memory.isSaved ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{memory.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{memory.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{memory.travelers.length} travelers</span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {memory.tags.slice(0, 4).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-linear-to-r from-gray-50 to-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {memory.tags.length > 4 && (
                                <span className="px-3 py-1 bg-linear-to-r from-blue-50 to-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                    +{memory.tags.length - 4} more
                                </span>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Heart size={16} />
                                    <span className="text-sm font-medium">{memory.likes}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MessageCircle size={16} />
                                    <span className="text-sm font-medium">{memory.comments}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Share size={16} />
                                    <span className="text-sm font-medium">{memory.shares}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onSelect(memory)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                View Details →
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid View
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 cursor-pointer hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${memory.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Memory Image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <img
                    src={memory.images[0]}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Type Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium capitalize">{memory.type}</span>
                </div>

                {/* Multiple Images Indicator */}
                {(memory.images.length > 1 || memory.videos.length > 0) && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">
                            {memory.images.length > 1 && `+${memory.images.length - 1}`}
                            {memory.videos.length > 0 && ' 🎬'}
                        </span>
                    </div>
                )}

                {/* Trip Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium">{memory.tripName}</span>
                </div>

                {/* Hover Actions */}
                <AnimatePresence>
                    {showActions && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center space-x-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onLike(memory.id);
                                }}
                                className={`p-3 rounded-xl ${memory.isLiked
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSave(memory.id);
                                }}
                                className={`p-3 rounded-xl ${memory.isSaved
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                <Bookmark size={20} fill={memory.isSaved ? 'currentColor' : 'none'} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(memory);
                                }}
                                className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30"
                            >
                                <Eye size={20} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Memory Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {memory.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {memory.description}
                        </p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowActions(!showActions);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600"
                        >
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Location & Date */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{memory.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{memory.date}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{memory.travelers.length}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {memory.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-linear-to-r from-gray-50 to-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                    {memory.tags.length > 3 && (
                        <span className="px-3 py-1 bg-linear-to-r from-blue-50 to-blue-100 text-blue-600 text-xs font-medium rounded-full">
                            +{memory.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                            <Heart size={16} />
                            <span className="text-sm font-medium">{memory.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                            <MessageCircle size={16} />
                            <span className="text-sm font-medium">{memory.comments}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onSelect(memory)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Memory Detail Modal Component
const MemoryDetailModal = ({ memory, onClose, onLike, onSave }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden bg-white rounded-3xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Image/Media Section */}
                    <div className="relative bg-black">
                        <img
                            src={memory.images[currentImageIndex]}
                            alt={memory.title}
                            className="w-full h-[60vh] lg:h-full object-cover"
                        />

                        {/* Image Navigation */}
                        {memory.images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? memory.images.length - 1 : prev - 1)}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev === memory.images.length - 1 ? 0 : prev + 1)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Image Dots */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {memory.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-2 h-2 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="overflow-y-auto p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-teal-500 text-white text-sm font-medium rounded-full">
                                        {memory.type}
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                        {memory.tripName}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">{memory.title}</h2>
                                <p className="text-gray-600 mt-2">{memory.description}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => onLike(memory.id)}
                                    className={`p-3 rounded-xl ${memory.isLiked
                                        ? 'text-rose-500 bg-rose-50'
                                        : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                                        }`}
                                >
                                    <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={() => onSave(memory.id)}
                                    className={`p-3 rounded-xl ${memory.isSaved
                                        ? 'text-blue-500 bg-blue-50'
                                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                                        }`}
                                >
                                    <Bookmark size={20} fill={memory.isSaved ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{memory.location}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{memory.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Travelers</p>
                                        <p className="font-medium">{memory.travelers.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Sparkles className="h-5 w-5 text-amber-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mood</p>
                                        <p className="font-medium capitalize">{memory.mood}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {memory.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 font-medium rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.likes}</p>
                                <p className="text-sm text-gray-500">Likes</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.comments}</p>
                                <p className="text-sm text-gray-500">Comments</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.shares}</p>
                                <p className="text-sm text-gray-500">Shares</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.saves}</p>
                                <p className="text-sm text-gray-500">Saves</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button className="flex-1 py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                                Share Memory
                            </button>
                            <button className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemoriesPage;