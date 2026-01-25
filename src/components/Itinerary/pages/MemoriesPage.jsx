// src/pages/MemoriesPage.jsx
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, MessageCircle, MapPin, Calendar, Users,
    ChevronLeft, ChevronRight, Share2, Download, Star,
    Image as ImageIcon, Video, Music, BookOpen, Sparkles,
    Filter, Search, Grid, List, Play, X, Camera,
    Globe, Award, TrendingUp, Clock, Bookmark,
    MoreVertical, Edit, Trash2, Share, Eye, Loader2
} from 'lucide-react';
import { AddMemoryForm } from '../components/itinerary/AddMemoriesForm';

// BACKEND_API
import { BACKEND_API } from '../../../Services/Backend';
import AuthContext from '../../../Context/AuthContext';

const MemoriesPage = () => {
    // Auth Context
    const { user, updateUser } = useContext(AuthContext);

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trips, setTrips] = useState([
        { id: 'all', name: 'All Trips', count: 0 }
    ]);
    const [memoryTypes, setMemoryTypes] = useState([
        { id: 'all', label: 'All Memories', icon: Sparkles, count: 0 },
        { id: 'photo', label: 'Photos', icon: ImageIcon, count: 0 },
        { id: 'food', label: 'Food', icon: Music, count: 0 },
        { id: 'adventure', label: 'Adventures', icon: BookOpen, count: 0 },
        { id: 'culture', label: 'Culture', icon: Globe, count: 0 },
        { id: 'social', label: 'Social', icon: Users, count: 0 }
    ]);

    // Statistics state
    const [stats, setStats] = useState({
        totalMemories: 0,
        totalLikes: 0,
        totalComments: 0,
        totalTrips: 0,
        favoriteType: 'All Memories'
    });

    // Sort options
    const sortOptions = [
        { id: 'newest', label: 'Newest First' },
        { id: 'oldest', label: 'Oldest First' },
        { id: 'popular', label: 'Most Popular' },
        { id: 'likes', label: 'Most Likes' },
        { id: 'comments', label: 'Most Comments' }
    ];

    // Fetch memories from backend
    const fetchMemories = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Build query params for backend
            const params = {
                page: currentPage + 1,
                limit: viewMode === 'grid' ? 9 : 6,
                sort: sortBy,
                search: searchQuery,
                type: activeFilter !== 'all' ? activeFilter : undefined,
                tripId: selectedTrip !== 'all' ? selectedTrip : undefined,
                userId: user?.id
            };

            // Remove undefined params
            Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

            const response = await BACKEND_API.Memories.GetAll(params);

            if (response.status === 200 || response.status === 201) {
                const memoriesData = response.data.data || response.data || [];
                setMemories(memoriesData);

                // Update stats
                updateStats(memoriesData);

                // Update memory type counts
                updateMemoryTypeCounts(memoriesData);

                // Extract trips from memories
                extractTripsFromMemories(memoriesData);
            } else {
                throw new Error('Failed to fetch memories');
            }
        } catch (error) {
            console.error("Failed to fetch memories", error);
            setError('Failed to load memories. Please try again.');

            // Fallback to mock data only in development
            if (process.env.NODE_ENV === 'development') {
                console.warn('Using mock data as fallback');
                const defaultMemories = getDefaultMemories();
                setMemories(defaultMemories);
                updateStats(defaultMemories);
                updateMemoryTypeCounts(defaultMemories);
                extractTripsFromMemories(defaultMemories);
            }
        } finally {
            setLoading(false);
        }
    }, [currentPage, viewMode, sortBy, searchQuery, activeFilter, selectedTrip, user]);

    // Update statistics
    const updateStats = (memoriesList) => {
        const totalMemories = memoriesList.length;
        const totalLikes = memoriesList.reduce((sum, m) => sum + (m.likes || 0), 0);
        const totalComments = memoriesList.reduce((sum, m) => sum + (m.comments || 0), 0);

        // Count unique trips
        const uniqueTrips = [...new Set(memoriesList.filter(m => m.tripId).map(m => m.tripId))].length;

        // Find favorite type
        const typeCounts = {};
        memoriesList.forEach(memory => {
            const type = memory.type || 'unknown';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        const favoriteType = Object.keys(typeCounts).reduce((a, b) =>
            typeCounts[a] > typeCounts[b] ? a : b, 'All Memories'
        );

        setStats({
            totalMemories,
            totalLikes,
            totalComments,
            totalTrips: uniqueTrips,
            favoriteType: favoriteType.charAt(0).toUpperCase() + favoriteType.slice(1)
        });
    };

    // Update memory type counts
    const updateMemoryTypeCounts = (memoriesList) => {
        const updatedTypes = memoryTypes.map(type => ({
            ...type,
            count: type.id === 'all'
                ? memoriesList.length
                : memoriesList.filter(m => m.type === type.id).length
        }));
        setMemoryTypes(updatedTypes);
    };

    // Extract trips from memories
    const extractTripsFromMemories = (memoriesList) => {
        const tripCounts = {};
        memoriesList.forEach(memory => {
            if (memory.tripId && memory.tripName) {
                if (!tripCounts[memory.tripId]) {
                    tripCounts[memory.tripId] = {
                        id: memory.tripId,
                        name: memory.tripName,
                        count: 0
                    };
                }
                tripCounts[memory.tripId].count++;
            }
        });

        const tripOptions = Object.values(tripCounts);
        setTrips([
            { id: 'all', name: 'All Trips', count: memoriesList.length },
            ...tripOptions
        ]);
    };

    // Get default memories for fallback
    const getDefaultMemories = () => {
        return [
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
            }
        ];
    };

    // Initial fetch
    useEffect(() => {
        fetchMemories();
    }, [fetchMemories]);

    // Filter and sort logic
    const filteredMemories = useMemo(() => {
        return memories.filter(memory => {
            const matchesSearch = searchQuery === '' ||
                memory.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                memory.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesType = activeFilter === 'all' || memory.type === activeFilter;
            const matchesTrip = selectedTrip === 'all' || memory.tripId === selectedTrip;

            return matchesSearch && matchesType && matchesTrip;
        });
    }, [memories, searchQuery, activeFilter, selectedTrip]);

    const sortedMemories = useMemo(() => {
        return [...filteredMemories].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
                case 'oldest':
                    return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
                case 'popular':
                    return ((b.likes || 0) + (b.comments || 0) * 2 + (b.shares || 0) * 3) -
                        ((a.likes || 0) + (a.comments || 0) * 2 + (a.shares || 0) * 3);
                case 'likes':
                    return (b.likes || 0) - (a.likes || 0);
                case 'comments':
                    return (b.comments || 0) - (a.comments || 0);
                default:
                    return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
            }
        });
    }, [filteredMemories, sortBy]);

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
    const handleLike = async (memoryId) => {
        try {
            // Validate memoryId
            if (!memoryId) {
                console.error('Invalid memoryId:', memoryId);
                alert('Memory ID is missing. Please try again.');
                return;
            }

            // Optimistic update
            setMemories(prev => prev.map(memory =>
                (memory._id || memory.id) === memoryId
                    ? {
                        ...memory,
                        likes: memory.isLiked ? (memory.likes || 0) - 1 : (memory.likes || 0) + 1,
                        isLiked: !memory.isLiked
                    }
                    : memory
            ));

            // Call backend
            console.log('Attempting to toggle like for memory:', memoryId);
            console.log('API Base URL:', import.meta.env.VITE_BACKEND_URL);
            const res = await BACKEND_API.Memories.ToggleLike(memoryId);
            console.log("like : ", res)
        } catch (error) {
            console.error('Failed to toggle like:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                config: error.config?.url,
                status: error.response?.status,
                data: error.response?.data
            });
            // Revert optimistic update
            setMemories(prev => prev.map(memory =>
                (memory._id || memory.id) === memoryId
                    ? {
                        ...memory,
                        likes: memory.isLiked ? (memory.likes || 0) + 1 : (memory.likes || 0) - 1,
                        isLiked: !memory.isLiked
                    }
                    : memory
            ));

            // Show error to user
            alert('Failed to update like. Please try again.');
        }
    };

    const handleSave = async (memoryId) => {
        try {
            // Optimistic update
            setMemories(prev => prev.map(memory =>
                (memory._id || memory.id) === memoryId
                    ? {
                        ...memory,
                        saves: memory.isSaved ? (memory.saves || 0) - 1 : (memory.saves || 0) + 1,
                        isSaved: !memory.isSaved
                    }
                    : memory
            ));

            // Call backend
            await BACKEND_API.Memories.ToggleSave(memoryId);
        } catch (error) {
            console.error('Failed to toggle save:', error);
            // Revert optimistic update
            setMemories(prev => prev.map(memory =>
                (memory._id || memory.id) === memoryId
                    ? {
                        ...memory,
                        saves: memory.isSaved ? (memory.saves || 0) + 1 : (memory.saves || 0) - 1,
                        isSaved: !memory.isSaved
                    }
                    : memory
            ));

            // Show error to user
            alert('Failed to update save. Please try again.');
        }
    };

    const handleAddMemory = async (newMemory) => {
        try {
            // Prepare memory data for backend
            const memoryData = {
                ...newMemory,
                userId: user?.id,
                userName: user?.name || 'You',
                createdAt: new Date().toISOString(),
                likes: 0,
                comments: 0,
                shares: 0,
                saves: 0,
                isLiked: false,
                isSaved: false
            };

            // Call backend API
            const response = await BACKEND_API.Memories.Create(memoryData);

            if (response.status === 201 || response.status === 200) {
                const createdMemory = response.data.data || response.data;

                // Update local state with the new memory
                setMemories(prev => [createdMemory, ...prev]);
                setShowAddForm(false);

                // Show success message
                alert('Memory created successfully!');
            } else {
                throw new Error('Failed to create memory');
            }
        } catch (error) {
            console.error('Error creating memory:', error);
            alert(`Failed to create memory: ${error.message}`);
        }
    };

    const handleDeleteMemory = async (memoryId) => {
        if (!window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
            return;
        }

        try {
            // Optimistic update
            const memoryToDelete = memories.find(m => (m._id || m.id) === memoryId);
            setMemories(prev => prev.filter(memory => (memory._id || memory.id) !== memoryId));

            if ((selectedMemory?._id || selectedMemory?.id) === memoryId) {
                setSelectedMemory(null);
            }

            // Call backend
            await BACKEND_API.Memories.Delete(memoryId);

            // Update stats
            if (memoryToDelete) {
                const updatedStats = {
                    totalMemories: stats.totalMemories - 1,
                    totalLikes: stats.totalLikes - (memoryToDelete.likes || 0),
                    totalComments: stats.totalComments - (memoryToDelete.comments || 0),
                    totalTrips: stats.totalTrips, // This might need recalculation
                    favoriteType: stats.favoriteType
                };
                setStats(updatedStats);
            }
        } catch (error) {
            console.error('Failed to delete memory:', error);
            alert('Failed to delete memory. Please try again.');

            // Re-fetch memories to restore state
            fetchMemories();
        }
    };

    const handleShareMemory = async (memory) => {
        try {
            const shareData = {
                title: memory.title,
                text: memory.description,
                url: `${window.location.origin}/memories/${memory.id}`,
            };

            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            }

            // Update share count
            setMemories(prev => prev.map(m =>
                m.id === memory.id
                    ? { ...m, shares: (m.shares || 0) + 1 }
                    : m
            ));
        } catch (error) {
            console.error('Error sharing memory:', error);
            if (error.name !== 'AbortError') {
                alert('Failed to share memory. Please try again.');
            }
        }
    };

    // Handle search with debounce
    const handleSearch = useCallback((value) => {
        setSearchQuery(value);
        setCurrentPage(0); // Reset to first page on new search
    }, []);

    // Reset all filters
    const handleResetFilters = () => {
        setActiveFilter('all');
        setSelectedTrip('all');
        setSearchQuery('');
        setSortBy('newest');
        setCurrentPage(0);
    };

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading memories...</p>
            </div>
        </div>
    );

    // Error display component
    const ErrorDisplay = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-red-700 mb-2">{error}</h3>
                <button
                    onClick={fetchMemories}
                    className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-teal-50/20">
            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* Error State */}
            {error && !loading && <ErrorDisplay />}

            {/* Main Content - Only show when not loading and no error */}
            {!loading && !error && (
                <>
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
                                    onChange={(e) => handleSearch(e.target.value)}
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

                                {/* Reset Filters */}
                                {(activeFilter !== 'all' || selectedTrip !== 'all' || searchQuery || sortBy !== 'newest') && (
                                    <button
                                        onClick={handleResetFilters}
                                        className="px-4 py-2.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                )}

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
                                            key={memory.id || idx}
                                            memory={memory}
                                            idx={idx}
                                            viewMode={viewMode}
                                            onLike={handleLike}
                                            onSave={handleSave}
                                            onSelect={setSelectedMemory}
                                            onDelete={handleDeleteMemory}
                                            onShare={handleShareMemory}
                                            user={user}
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
                                            key={memory.id || idx}
                                            memory={memory}
                                            idx={idx}
                                            viewMode={viewMode}
                                            onLike={handleLike}
                                            onSave={handleSave}
                                            onSelect={setSelectedMemory}
                                            onDelete={handleDeleteMemory}
                                            onShare={handleShareMemory}
                                            user={user}
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
                        {paginatedMemories.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <div className="p-6 bg-linear-to-r from-gray-100 to-gray-200 rounded-3xl inline-block mb-6">
                                    <ImageIcon className="h-16 w-16 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No memories found</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    {searchQuery ? `No memories match "${searchQuery}". Try a different search or filter.` : 'Start by adding your first travel memory!'}
                                </p>
                                <div className="flex justify-center gap-4">
                                    {(searchQuery || activeFilter !== 'all' || selectedTrip !== 'all') && (
                                        <button
                                            onClick={handleResetFilters}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowAddForm(true)}
                                        className="px-8 py-3.5 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-xl hover:shadow-xl font-semibold"
                                    >
                                        Add Your First Memory
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add Memory Form Modal */}
                    <AnimatePresence>
                        {showAddForm && (
                            <AddMemoryForm
                                onClose={() => setShowAddForm(false)}
                                onSubmit={handleAddMemory}
                                user={user}
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
                                onDelete={handleDeleteMemory}
                                onShare={handleShareMemory}
                                user={user}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

// Enhanced Memory Card Component
const MemoryCard = ({ memory, idx, viewMode, onLike, onSave, onSelect, onDelete, onShare, user }) => {
    const [showActions, setShowActions] = useState(false);

    // Check if current user owns this memory
    const isOwner = user?.id === memory.userId || !memory.userId;

    // Handle delete
    const handleDelete = (e) => {
        e.stopPropagation();
        if (onDelete && window.confirm('Are you sure you want to delete this memory?')) {
            onDelete(memory.id);
        }
    };

    // Handle share
    const handleShare = (e) => {
        e.stopPropagation();
        if (onShare) {
            onShare(memory);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get safe image URL
    const getSafeImageUrl = (images) => {
        if (!images || images.length === 0) {
            return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200';
        }
        return images[0];
    };

    if (viewMode === 'list') {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500 cursor-pointer"
                onClick={() => onSelect && onSelect(memory)}
            >
                <div className="flex">
                    {/* Image */}
                    <div className="w-48 h-48 relative overflow-hidden rounded-l-3xl">
                        <img
                            src={getSafeImageUrl(memory.images)}
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                            <span className="text-white text-sm font-medium capitalize">{memory.type || 'memory'}</span>
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLike && onLike(memory.id);
                                    }}
                                    className={`p-2 rounded-xl transition-colors ${memory.isLiked
                                        ? 'text-rose-500 bg-rose-50'
                                        : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                                        }`}
                                >
                                    <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSave && onSave(memory.id);
                                    }}
                                    className={`p-2 rounded-xl transition-colors ${memory.isSaved
                                        ? 'text-blue-500 bg-blue-50'
                                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                                        }`}
                                >
                                    <Bookmark size={20} fill={memory.isSaved ? 'currentColor' : 'none'} />
                                </button>
                                {isOwner && (
                                    <button
                                        onClick={handleDelete}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{memory.location || 'Unknown location'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">{formatDate(memory.date || memory.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {(memory.travelers?.length || 1)} traveler{(memory.travelers?.length !== 1) ? 's' : ''}
                                </span>
                            </div>
                        </div>

                        {/* Tags */}
                        {memory.tags && memory.tags.length > 0 && (
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
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Heart size={16} />
                                    <span className="text-sm font-medium">{memory.likes || 0}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MessageCircle size={16} />
                                    <span className="text-sm font-medium">{memory.comments || 0}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Share size={16} />
                                    <span className="text-sm font-medium">{memory.shares || 0}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => onSelect && onSelect(memory)}
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
            onClick={() => onSelect && onSelect(memory)}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${memory.color || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            {/* Memory Image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
                <img
                    src={getSafeImageUrl(memory.images)}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Type Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-white text-sm font-medium capitalize">{memory.type || 'memory'}</span>
                </div>

                {/* Multiple Images Indicator */}
                {((memory.images && memory.images.length > 1) || (memory.videos && memory.videos.length > 0)) && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">
                            {memory.images?.length > 1 && `+${memory.images.length - 1}`}
                            {memory.videos?.length > 0 && ' 🎬'}
                        </span>
                    </div>
                )}

                {/* Trip Badge */}
                {memory.tripName && (
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">{memory.tripName}</span>
                    </div>
                )}

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
                                    onLike && onLike(memory._id || memory.id);
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
                                    onSave && onSave(memory._id || memory.id);
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
                                    onSelect && onSelect(memory);
                                }}
                                className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/30"
                            >
                                <Eye size={20} />
                            </motion.button>
                            {isOwner && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(e);
                                    }}
                                    className="p-3 bg-white/20 text-white rounded-xl hover:bg-red-500/80"
                                >
                                    <Trash2 size={20} />
                                </motion.button>
                            )}
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
                            <span>{memory.location || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{formatDate(memory.date || memory.createdAt)}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users size={14} />
                        <span>{memory.travelers?.length || 1}</span>
                    </div>
                </div>

                {/* Tags */}
                {memory.tags && memory.tags.length > 0 && (
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
                )}

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                            <Heart size={16} />
                            <span className="text-sm font-medium">{memory.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                            <MessageCircle size={16} />
                            <span className="text-sm font-medium">{memory.comments || 0}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onSelect && onSelect(memory)}
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
const MemoryDetailModal = ({ memory, onClose, onLike, onSave, onDelete, onShare, user }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Check if current user owns this memory
    const isOwner = user?.id === memory.userId || !memory.userId;

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get safe images array
    const getSafeImages = () => {
        if (!memory.images || memory.images.length === 0) {
            return ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200'];
        }
        return memory.images;
    };

    const images = getSafeImages();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            if (onDelete) {
                await onDelete(memory._id || memory.id);
            }
            onClose();
        } catch (error) {
            console.error('Failed to delete memory:', error);
            alert('Failed to delete memory. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(images[currentImageIndex]);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${memory.title.replace(/\s+/g, '_')}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Failed to download image:', error);
            alert('Failed to download image. Please try again.');
        }
    };

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
                className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden bg-white rounded-3xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors"
                    disabled={isDeleting}
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
                    {/* Image/Media Section */}
                    <div className="relative bg-black overflow-hidden">
                        <img
                            src={images[currentImageIndex]}
                            alt={memory.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Image Dots */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {images.map((_, idx) => (
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
                    <div className="overflow-y-auto p-8 flex flex-col">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-teal-500 text-white text-sm font-medium rounded-full">
                                        {memory.type || 'memory'}
                                    </span>
                                    {memory.tripName && (
                                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                            {memory.tripName}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">{memory.title}</h2>
                                <p className="text-gray-600 mt-2">{memory.description}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => onLike && onLike(memory._id || memory.id)}
                                    className={`p-3 rounded-xl ${memory.isLiked
                                        ? 'text-rose-500 bg-rose-50'
                                        : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                                        }`}
                                >
                                    <Heart size={20} fill={memory.isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={() => onSave && onSave(memory._id || memory.id)}
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
                                        <p className="font-medium">{memory.location || 'Unknown'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="h-5 w-5 text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formatDate(memory.date || memory.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Users className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Travelers</p>
                                        <p className="font-medium">{memory.travelers?.join(', ') || 'You'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <Sparkles className="h-5 w-5 text-amber-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Mood</p>
                                        <p className="font-medium capitalize">{memory.mood || 'happy'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {memory.tags && memory.tags.length > 0 && (
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
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.likes || 0}</p>
                                <p className="text-sm text-gray-500">Likes</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.comments || 0}</p>
                                <p className="text-sm text-gray-500">Comments</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.shares || 0}</p>
                                <p className="text-sm text-gray-500">Shares</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-2xl">
                                <p className="text-2xl font-bold text-gray-900">{memory.saves || 0}</p>
                                <p className="text-sm text-gray-500">Saves</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => onShare && onShare(memory)}
                                className="flex-1 py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={18} />
                                Share Memory
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Download size={18} />
                                Download
                            </button>
                            {isOwner && (
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 py-3 border border-red-300 text-red-700 font-semibold rounded-xl hover:border-red-400 hover:bg-red-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={18} />
                                            Delete
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MemoriesPage;