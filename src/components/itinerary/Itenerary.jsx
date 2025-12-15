import { useState } from 'react';
import { format } from 'date-fns';
import { Map, Calendar, Clock, Star, Loader, Navigation, Sparkles } from 'lucide-react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Itinerary = () => {
    const [formData, setFormData] = useState({
        city: '',
        startDate: '',
        endDate: '',
        preferences: [],
    });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeDay, setActiveDay] = useState(0);

    const preferencesOptions = [
        { value: 'culture', label: 'Culture', icon: '🏛️' },
        { value: 'food', label: 'Food', icon: '🍕' },
        { value: 'nature', label: 'Nature', icon: '🌳' },
        { value: 'adventure', label: 'Adventure', icon: '⛰️' },
        { value: 'history', label: 'History', icon: '📜' },
        { value: 'shopping', label: 'Shopping', icon: '🛍️' }
    ];

    const handleCheckboxChange = (option) => {
        setFormData((prev) => {
            if (prev.preferences.includes(option)) {
                return { ...prev, preferences: prev.preferences.filter((p) => p !== option) };
            } else {
                return { ...prev, preferences: [...prev.preferences, option] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/itinerary/generate', formData);
            setItinerary(res.data);
            setActiveDay(0);
        } catch (error) {
            console.error('Error generating itinerary:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pb-12 pt-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 sm:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Travel Planner</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4">
                        Smart Itinerary Generator
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Plan your perfect trip with personalized AI suggestions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                    {/* Input Form */}
                    <div className="xl:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-3xl p-6 sticky top-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl shadow-lg">
                                    <Navigation className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Trip Details</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Destination
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Paris, Tokyo"
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Interests
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {preferencesOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleCheckboxChange(option.value)}
                                                className={`p-3 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1 ${formData.preferences.includes(option.value)
                                                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md transform scale-95'
                                                    : 'border-gray-200 bg-white/50 text-gray-600 hover:border-primary-300 hover:bg-white'
                                                    }`}
                                            >
                                                <span className="text-lg">{option.icon}</span>
                                                <span className="text-xs font-medium capitalize">{option.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Planning Trip...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Itinerary
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Itinerary Display */}
                    <div className="xl:col-span-3">
                        <AnimatePresence mode="wait">
                            {itinerary ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Trip Header */}
                                    <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 text-white p-8 rounded-3xl shadow-xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <h2 className="text-3xl font-bold mb-2">
                                                    Trip to {itinerary.destination}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-4 text-primary-100">
                                                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {format(new Date(itinerary.startDate), 'MMM d')} - {format(new Date(itinerary.endDate), 'MMM d, yyyy')}
                                                    </span>
                                                    <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                                        <Star className="w-4 h-4" />
                                                        {itinerary.preferences.length > 0
                                                            ? itinerary.preferences.map(pref =>
                                                                preferencesOptions.find(o => o.value === pref)?.label || pref
                                                            ).join(', ')
                                                            : 'General Interest'
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
                                                <span className="text-2xl font-bold">{itinerary.days.length}</span>
                                                <span className="text-sm font-medium ml-2 opacity-80">Days</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Days Navigation - Mobile */}
                                    <div className="xl:hidden">
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {itinerary.days.map((day, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveDay(index)}
                                                    className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${activeDay === index
                                                        ? 'bg-primary-600 text-white shadow-lg'
                                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                                                        }`}
                                                >
                                                    Day {day.dayNumber}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                                        {/* Days Sidebar - Desktop */}
                                        <div className="hidden xl:block xl:col-span-1">
                                            <div className="glass rounded-3xl p-4 sticky top-24">
                                                <h3 className="font-bold text-gray-800 mb-4 px-2">Itinerary Days</h3>
                                                <div className="space-y-2">
                                                    {itinerary.days.map((day, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setActiveDay(index)}
                                                            className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${activeDay === index
                                                                ? 'bg-gradient-to-r from-primary-500 to-indigo-600 text-white shadow-lg'
                                                                : 'text-gray-600 hover:bg-white/50 hover:shadow-sm'
                                                                }`}
                                                        >
                                                            <div className="font-bold">Day {day.dayNumber}</div>
                                                            <div className={`text-sm ${activeDay === index ? 'text-primary-100' : 'text-gray-500'}`}>
                                                                {format(new Date(day.date), 'MMM d')}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activities */}
                                        <div className="xl:col-span-3">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeDay}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="glass rounded-3xl overflow-hidden"
                                                >
                                                    <div className="bg-white/50 px-8 py-6 border-b border-white/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                                        <h3 className="font-bold text-2xl text-gray-800">
                                                            Day {itinerary.days[activeDay].dayNumber}
                                                        </h3>
                                                        <span className="text-primary-600 font-medium bg-primary-50 px-4 py-1 rounded-full">
                                                            {format(new Date(itinerary.days[activeDay].date), 'EEEE, MMMM d, yyyy')}
                                                        </span>
                                                    </div>

                                                    <motion.div
                                                        variants={containerVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className="p-8 space-y-8"
                                                    >
                                                        {itinerary.days[activeDay].activities.length > 0 ? (
                                                            itinerary.days[activeDay].activities.map((activity, actIndex) => (
                                                                <motion.div
                                                                    key={actIndex}
                                                                    variants={itemVariants}
                                                                    className="relative pl-8 sm:pl-0 group"
                                                                >
                                                                    {/* Timeline Line */}
                                                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 sm:left-[100px] group-last:bottom-auto group-last:h-full"></div>

                                                                    <div className="flex flex-col sm:flex-row gap-6">
                                                                        {/* Time */}
                                                                        <div className="flex-shrink-0 w-24 pt-1">
                                                                            <div className="text-sm font-bold text-primary-600 bg-primary-50 inline-block px-2 py-1 rounded-lg">
                                                                                {activity.startTime}
                                                                            </div>
                                                                        </div>

                                                                        {/* Content */}
                                                                        <div className="flex-grow relative">
                                                                            {/* Timeline Dot */}
                                                                            <div className="absolute -left-[41px] sm:-left-[33px] top-3 w-4 h-4 rounded-full border-2 border-white bg-primary-500 shadow-md group-hover:scale-125 transition-transform duration-300 z-10"></div>

                                                                            <div className="bg-white/60 hover:bg-white p-5 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                                                                                <h4 className="font-bold text-lg text-gray-800 mb-2">{activity.name}</h4>
                                                                                <p className="text-gray-600 leading-relaxed">{activity.notes}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            ))
                                                        ) : (
                                                            <div className="text-center py-16">
                                                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                                    <Map className="w-10 h-10 text-gray-400" />
                                                                </div>
                                                                <p className="text-gray-500 text-xl font-medium">No activities planned</p>
                                                                <p className="text-gray-400 mt-2">Enjoy your free time!</p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full min-h-[500px] glass rounded-3xl flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 animate-pulse-slow">
                                        <Map className="w-16 h-16 text-primary-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Plan?</h3>
                                    <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                                        Enter your destination, dates, and interests on the left to generate a personalized AI itinerary for your dream trip.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;