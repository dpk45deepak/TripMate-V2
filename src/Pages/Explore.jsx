import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Calendar, Users, Search, Filter, X, Globe, Heart, Navigation, TrendingUp, Sparkles, Zap, Target, Grid3x3, List, Shield } from 'lucide-react';
import BACKEND_API from '../Services/Backend';

const colorPalettes = [
    'bg-linear-to-br from-blue-500 to-cyan-400',
    'bg-linear-to-br from-purple-500 to-pink-400',
    'bg-linear-to-br from-green-500 to-emerald-400',
    'bg-linear-to-br from-yellow-500 to-orange-400',
    'bg-linear-to-br from-red-500 to-pink-400',
    'bg-linear-to-br from-indigo-500 to-blue-400',
    'bg-linear-to-br from-teal-500 to-green-400',
    'bg-linear-to-br from-rose-500 to-pink-400',
    'bg-linear-to-br from-violet-500 to-purple-400',
    'bg-linear-to-br from-amber-500 to-yellow-400',
];

const desktopPatterns = [
    { width: 1, height: 2 },
    { width: 2, height: 3 },
    { width: 1, height: 2 },
    { width: 1, height: 2 },
    { width: 1, height: 1 },
    { width: 1, height: 1 },
    { width: 1, height: 1 },
];

const mobilePatterns = [
    { width: 1, height: 1 },
    { width: 1, height: 2 },
    { width: 1, height: 1 },
    { width: 1, height: 1 },
    { width: 1, height: 2 },
    { width: 1, height: 1 },
    { width: 1, height: 1 },
];

const useTrips = (userId) => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTrips = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await BACKEND_API.Recommend.GetRecommendation(userId);

            if (response?.data) {
                if (Array.isArray(response.data)) {
                    setTrips(response.data);
                } else if (response.data.recommendations && Array.isArray(response.data.recommendations)) {
                    setTrips(response.data.recommendations);
                } else if (response.data.destinations && Array.isArray(response.data.destinations)) {
                    setTrips(response.data.destinations);
                } else {
                    setTrips([]);
                }
            } else {
                setTrips([]);
            }
        } catch (error) {
            setError(error.message || 'Failed to load trip recommendations');
            setTrips([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    return { trips, loading, error, refetch: fetchTrips };
};

const TripCard = ({ trip, index, isMobile, pattern, isFavorite, onFavoriteToggle, onClick }) => {
    const color = colorPalettes[index % colorPalettes.length];
    const isLarge = !isMobile && pattern.width === 2;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{
                scale: 1.03,
                y: -4,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ${isMobile ? 'aspect-square' : isLarge ? 'col-span-2 row-span-3' : pattern.height === 2 ? 'row-span-2' : 'row-span-1'
                }`}
            onClick={onClick}
        >
            <div className="absolute inset-0">
                <img
                    src={trip.image_url || 'https://placehold.co/600x400/4CAF50/ffffff?text=Trip+Image'}
                    alt={trip.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${color} opacity-60 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative h-full p-4 flex flex-col justify-end">
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                            {trip.type || 'Destination'}
                        </span>
                        {isLarge && !isMobile && (
                            <span className="px-2 py-1 bg-linear-to-r from-yellow-500 to-amber-400 backdrop-blur-md rounded-full text-xs font-semibold text-white flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Featured
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {!isMobile && (
                            <div className="px-2 py-1 bg-black/30 backdrop-blur-md rounded text-xs font-bold text-white">
                                {pattern.width}×{pattern.height}
                            </div>
                        )}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => onFavoriteToggle(trip._id || trip.id, e)}
                            className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition"
                        >
                            <Heart
                                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
                            />
                        </motion.button>
                    </div>
                </div>

                {!isMobile && (
                    <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full">
                        <span className="text-xs text-white font-medium">
                            {(index % desktopPatterns.length) + 1}/{desktopPatterns.length}
                        </span>
                    </div>
                )}

                <div className="relative z-10 space-y-2">
                    <div>
                        <h3 className={`font-bold text-white mb-1 ${isMobile ? 'text-sm' : isLarge ? 'text-xl' : 'text-lg'} line-clamp-2`}>
                            {trip.name}
                        </h3>
                        <div className="flex items-center gap-1 text-white/90">
                            <MapPin className="w-3 shrink-0" />
                            <span className="text-xs line-clamp-1">
                                {trip.region}, {trip.country}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Shield className="w-3 h-3 text-white/90" />
                                <span className="text-xs text-white/90">Safety</span>
                            </div>
                            <SafetyRating rating={trip.safety_rating || 0} size="sm" />
                        </div>

                        <div className="text-right">
                            <div className={`font-bold text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                {formatCost(trip.average_cost_per_day, trip.currency)}/day
                            </div>
                            {!isMobile && (
                                <div className="text-xs text-white/70">
                                    avg. per day
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent flex items-center justify-center"
                >
                    <div className="text-center p-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md rounded-full mb-3">
                            <Navigation className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-white font-bold text-base mb-1">
                            View Details
                        </div>
                        <div className="text-white/80 text-xs">
                            Click to explore
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const ListTripCard = ({ trip, index, isFavorite, onFavoriteToggle, onClick }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        onClick={onClick}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group overflow-hidden border border-white/50"
    >
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 xl:w-72 shrink-0">
                <div className="relative h-56 lg:h-full rounded-xl overflow-hidden">
                    <img
                        src={trip.image_url || 'https://placehold.co/600x400/4CAF50/ffffff?text=Trip+Image'}
                        alt={trip.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={(e) => onFavoriteToggle(trip._id || trip.id, e)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
                        >
                            <Heart
                                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1.5 bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                {trip.type || 'Destination'}
                            </span>
                            <SafetyRating rating={trip.safety_rating || 0} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {trip.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.region}, {trip.country}</span>
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-blue-500 to-cyan-400 px-5 py-3 rounded-xl shadow-lg">
                        <div className="text-white font-bold text-xl">
                            {formatCost(trip.average_cost_per_day || 0, trip.currency)}
                            <span className="text-white/80 text-sm font-normal ml-1">/day</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{trip.description}</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Best Time</p>
                            <p className="text-sm font-medium text-gray-900">
                                {(trip.best_time_to_visit || []).slice(0, 2).join(', ')}
                                {(trip.best_time_to_visit || []).length > 2 && '...'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Shield className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Safety Rating</p>
                            <p className="text-sm font-medium text-gray-900">
                                {(trip.safety_rating || 0).toFixed(1)}/5
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Visa</p>
                            <p className="text-sm font-medium text-gray-900">
                                {trip.visa_requirements?.includes('required') ? 'Required' : 'Check'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <span className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                            View Details
                            <Navigation className="w-4 h-4 ml-2" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const SafetyRating = ({ rating, size = "md" }) => {
    const safeRating = rating || 0;
    const starSize = size === "sm" ? "w-3 h-3" : "w-5 h-5";

    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`${starSize} ${i < Math.floor(safeRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                />
            ))}
            <span className={`${size === "sm" ? 'text-xs ml-1' : 'ml-2 font-medium'} text-white/90`}>
                {safeRating.toFixed(1)}
            </span>
        </div>
    );
};

const formatCost = (cost, currency) => {
    if (!cost) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(cost);
};

const ScrollableTripDetailsModal = ({ trip, onClose }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const renderStars = (rating) => {
        const safeRating = rating || 0;
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(safeRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
                <span className="ml-2 font-medium text-gray-900">{safeRating.toFixed(1)}/5</span>
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/50"
            >
                <div className="relative">
                    <div className="relative h-64 md:h-72">
                        <img
                            src={trip.image_url || 'https://placehold.co/600x400/4CAF50/ffffff?text=Trip+Image'}
                            alt={trip.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                        <div className="absolute top-6 right-6 flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                            >
                                <X className="w-5 h-5 text-white" />
                            </motion.button>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                                    {trip.type || 'Destination'}
                                </span>
                                <div className="flex items-center gap-2 text-white">
                                    {renderStars(trip.safety_rating || 0)}
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{trip.name}</h2>
                            <div className="flex items-center gap-2 text-white/90">
                                <MapPin className="w-5 h-5" />
                                <span className="text-base md:text-lg">{trip.region}, {trip.country}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <div className="p-2 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg">
                                            <Globe className="w-5 h-5 text-blue-600" />
                                        </div>
                                        About This Destination
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{trip.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <div className="p-2 bg-linear-to-br from-green-100 to-green-50 rounded-lg">
                                            <Calendar className="w-5 h-5 text-green-600" />
                                        </div>
                                        Best Time to Visit
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {(trip.best_time_to_visit || []).map((month) => (
                                            <span
                                                key={month}
                                                className="px-4 py-2 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 rounded-lg font-medium border border-green-100 hover:border-green-300 transition"
                                            >
                                                {month}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                        <div className="p-2 bg-linear-to-br from-purple-100 to-purple-50 rounded-lg">
                                            <Users className="w-5 h-5 text-purple-600" />
                                        </div>
                                        Visa Requirements
                                    </h3>
                                    <div className="bg-linear-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                                        <p className="text-gray-700 leading-relaxed">{trip.visa_requirements || 'Please check with the local embassy for visa requirements.'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Details</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">Average Cost Per Day</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatCost(trip.average_cost_per_day || 0, trip.currency)}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Inclusive of accommodation and activities</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Country</p>
                                                <p className="font-medium text-gray-900 flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-blue-500" />
                                                    {trip.country}
                                                </p>
                                            </div>

                                            <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Region</p>
                                                <p className="font-medium text-gray-900">{trip.region}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-sm text-gray-500 mb-3">Safety Rating</p>
                                            <div className="flex items-center gap-2">
                                                {renderStars(trip.safety_rating || 0)}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Based on recent traveler reviews</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-linear-to-r from-blue-500 to-cyan-400 text-white font-bold py-4 rounded-xl hover:shadow-xl transition-all shadow-lg shadow-blue-500/30"
                                    >
                                        Plan This Trip
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-white border-2 border-blue-500 text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-colors"
                                    >
                                        Save for Later
                                    </motion.button>

                                    <button
                                        onClick={onClose}
                                        className="w-full text-gray-600 hover:text-gray-900 font-medium py-4 rounded-xl hover:bg-gray-50 transition"
                                    >
                                        Back to Recommendations
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function TripRecommendationPage() {
    const userId = 'current-user-id';
    const { trips, loading, error } = useTrips(userId);

    const [selectedTrip, setSelectedTrip] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: 'all',
        minRating: 0,
        maxPrice: 50000,
        sortBy: 'rating',
    });
    const [favorites, setFavorites] = useState(new Set());

    const getPatternForIndex = (index, isMobile = false) => {
        const patterns = isMobile ? mobilePatterns : desktopPatterns;
        return patterns[index % patterns.length];
    };

    const toggleFavorite = (tripId, e) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(tripId)) {
                newFavorites.delete(tripId);
            } else {
                newFavorites.add(tripId);
            }
            return newFavorites;
        });
    };

    const filteredTrips = useMemo(() => {
        return trips.filter(trip => {
            const matchesSearch = searchTerm === '' ||
                trip.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trip.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = filters.type === 'all' || trip.type === filters.type;
            const matchesRating = (trip.safety_rating || 0) >= filters.minRating;
            const matchesPrice = (trip.average_cost_per_day || 0) <= filters.maxPrice;

            return matchesSearch && matchesType && matchesRating && matchesPrice;
        }).sort((a, b) => {
            switch (filters.sortBy) {
                case 'price_asc':
                    return (a.average_cost_per_day || 0) - (b.average_cost_per_day || 0);
                case 'price_desc':
                    return (b.average_cost_per_day || 0) - (a.average_cost_per_day || 0);
                case 'rating':
                    return (b.safety_rating || 0) - (a.safety_rating || 0);
                case 'name':
                    return (a.name || '').localeCompare(b.name || '');
                default:
                    return 0;
            }
        });
    }, [trips, searchTerm, filters]);

    const resetFilters = () => {
        setFilters({
            type: 'all',
            minRating: 0,
            maxPrice: 50000,
            sortBy: 'rating',
        });
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-blue-50/30">
                <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md border border-white/50">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-red-100 to-red-50 rounded-2xl mb-6">
                        <X className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Trips</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all shadow-md shadow-blue-500/30"
                    >
                        Try Again
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-400 rounded-xl shadow-lg">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-900 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Discover Your Next Adventure
                                </h1>
                            </div>
                            <p className="text-gray-600 text-lg max-w-2xl">
                                Personalized trip recommendations tailored just for you. Explore the world with confidence.
                            </p>
                        </div>

                        <div className="flex sm:flex-row items-center gap-4">
                            <div className="flex sm:flex-row items-center gap-4">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative bg-white/90 backdrop-blur-md rounded-xl px-5 py-3 border border-white/50 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-linear-to-br from-blue-100 to-blue-50 rounded-lg">
                                                <Target className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm md:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    {trips.length}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-500">Recommended Trips</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex bg-white/90 backdrop-blur-md rounded-xl px-2 py-4 md:p-1 border border-white/50 shadow-lg">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setViewMode('grid')}
                                        className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <Grid3x3 className={`w-4 h-4 ${viewMode === 'grid' ? 'text-white' : 'text-gray-500'}`} />
                                        <span className="font-medium hidden sm:inline">Grid</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setViewMode('list')}
                                        className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        <List className={`w-4 h-4 ${viewMode === 'list' ? 'text-white' : 'text-gray-500'}`} />
                                        <span className="font-medium hidden sm:inline">List</span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                <div className="relative">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => {
                                const pattern = getPatternForIndex(i, typeof window !== 'undefined' && window.innerWidth < 640);
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/30 shadow-lg"
                                        style={{
                                            gridColumn: `span ${pattern.width}`,
                                            gridRow: `span ${pattern.height}`,
                                            minHeight: `${pattern.height * 120}px`,
                                        }}
                                    >
                                        <div className="h-full bg-linear-to-br from-gray-100 to-gray-200 animate-pulse">
                                            <div className="h-48 bg-gray-300"></div>
                                            <div className="p-6 space-y-4">
                                                <div className="h-4 bg-gray-300 rounded"></div>
                                                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                                <div className="flex justify-between items-center">
                                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            {viewMode === 'grid' && (
                                <div className="relative">
                                    <motion.div
                                        layout
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <AnimatePresence>
                                            {filteredTrips.map((trip, index) => {
                                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                                                const pattern = getPatternForIndex(index, isMobile);
                                                const isFavorite = favorites.has(trip._id || trip.id);

                                                return (
                                                    <TripCard
                                                        key={trip._id || trip.id}
                                                        trip={trip}
                                                        index={index}
                                                        isMobile={isMobile}
                                                        pattern={pattern}
                                                        isFavorite={isFavorite}
                                                        onFavoriteToggle={toggleFavorite}
                                                        onClick={() => setSelectedTrip(trip)}
                                                    />
                                                );
                                            })}
                                        </AnimatePresence>
                                    </motion.div>

                                    {filteredTrips.length === 0 && !loading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-center py-16"
                                        >
                                            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl mb-6">
                                                <Search className="w-12 h-12 text-blue-500" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                No matching trips found
                                            </h3>
                                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                                Try adjusting your search or filters to find what you're looking for.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={resetFilters}
                                                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow shadow-md"
                                                >
                                                    Clear All Filters
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSearchTerm('')}
                                                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition"
                                                >
                                                    Clear Search
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {viewMode === 'list' && (
                                <motion.div
                                    layout
                                    className="space-y-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {filteredTrips.map((trip, index) => (
                                        <ListTripCard
                                            key={trip._id || trip.id}
                                            trip={trip}
                                            index={index}
                                            isFavorite={favorites.has(trip._id || trip.id)}
                                            onFavoriteToggle={toggleFavorite}
                                            onClick={() => setSelectedTrip(trip)}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </>
                    )}
                </div>

                <AnimatePresence>
                    {selectedTrip && (
                        <ScrollableTripDetailsModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
                    )}
                </AnimatePresence>

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 pt-8 border-t border-gray-100"
                >
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center gap-3 mb-6">
                            <div className="w-3 h-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-linear-to-r from-purple-500 to-pink-400 rounded-full animate-pulse delay-150"></div>
                            <div className="w-3 h-3 bg-linear-to-r from-green-500 to-emerald-400 rounded-full animate-pulse delay-300"></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                            Showing <span className="font-bold text-gray-900">{filteredTrips.length}</span> personalized trip recommendations
                        </p>
                        <p className="text-xs text-gray-500">
                            All information is based on the latest travel data • Updated regularly • Powered by AI Recommendations
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-6">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                Real-time updates
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Safety verified
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                AI-powered
                            </span>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}