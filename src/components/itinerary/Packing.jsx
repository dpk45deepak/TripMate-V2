import { useState, useEffect } from 'react';
import { Briefcase, CheckSquare, Sun, CloudRain, Thermometer, Calendar, MapPin, Activity, Loader2, Sparkles, Package, Check } from 'lucide-react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

const Packing = () => {
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        tripType: 'vacation',
        activities: [],
    });
    const [packingList, setPackingList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [tripDuration, setTripDuration] = useState(0);

    const activitiesOptions = [
        { id: 'beach', label: 'Beach', icon: '🏖️' },
        { id: 'trekking', label: 'Trekking', icon: '🥾' },
        { id: 'snow', label: 'Snow', icon: '⛷️' },
        { id: 'party', label: 'Nightlife', icon: '🎉' },
        { id: 'camping', label: 'Camping', icon: '🏕️' },
        { id: 'city', label: 'City Tour', icon: '🏛️' },
        { id: 'dining', label: 'Fine Dining', icon: '🍽️' },
        { id: 'shopping', label: 'Shopping', icon: '🛍️' }
    ];

    const tripTypes = [
        { id: 'vacation', label: 'Vacation', emoji: '🌴' },
        { id: 'business', label: 'Business', emoji: '💼' },
        { id: 'honeymoon', label: 'Honeymoon', emoji: '💖' },
        { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
        { id: 'backpacking', label: 'Backpacking', emoji: '🎒' }
    ];

    useEffect(() => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            setTripDuration(duration > 0 ? duration : 0);
        }
    }, [formData.startDate, formData.endDate]);

    const handleCheckboxChange = (optionId) => {
        setFormData((prev) => {
            if (prev.activities.includes(optionId)) {
                return { ...prev, activities: prev.activities.filter((a) => a !== optionId) };
            } else {
                return { ...prev, activities: [...prev.activities, optionId] };
            }
        });
    };

    const handleItemCheck = (category, itemIndex) => {
        const key = `${category}-${itemIndex}`;
        setCheckedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/packing/list', {
                ...formData,
                duration: tripDuration
            });
            setPackingList(res.data);
            setCheckedItems({});
        } catch (error) {
            console.error('Error generating packing list:', error);
            alert('Failed to generate packing list. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getProgress = () => {
        if (!packingList) return 0;
        const totalItems = Object.values(packingList).flat().length;
        const checkedCount = Object.values(checkedItems).filter(Boolean).length;
        return Math.round((checkedCount / totalItems) * 100);
    };

    const progress = getProgress();

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    {...fadeInUp}
                    className="text-center mb-8 lg:mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-primary-500/10 border border-teal-200/50 rounded-full px-4 py-2 mb-4">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span className="text-sm font-medium text-teal-700">AI-Powered Packing</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4">
                        Smart Packing Assistant
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        Let AI create the perfect packing list based on your destination, weather, and activities
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-3xl shadow-xl border border-white/20 p-6 sticky top-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gradient-to-br from-teal-500 to-primary-600 rounded-xl shadow-lg">
                                    <Package className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Trip Details</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Destination */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-teal-600" />
                                        Destination
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Where are you going?"
                                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 outline-none"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                </div>

                                {/* Date Range */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-teal-600" />
                                        Travel Dates
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm outline-none"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-3 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm outline-none"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                    {tripDuration > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 inline-flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-lg"
                                        >
                                            <span className="text-sm text-teal-700 font-semibold">
                                                {tripDuration} day{tripDuration > 1 ? 's' : ''} trip
                                            </span>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Trip Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Trip Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {tripTypes.map((type) => (
                                            <motion.button
                                                key={type.id}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFormData({ ...formData, tripType: type.id })}
                                                className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${formData.tripType === type.id
                                                    ? 'bg-gradient-to-br from-primary-500 to-teal-600 text-white border-primary-500 shadow-lg'
                                                    : 'bg-white/50 text-gray-600 border-gray-200 hover:border-teal-300 hover:bg-white'
                                                    }`}
                                            >
                                                <span className="text-lg mr-1">{type.emoji}</span>
                                                <div className="text-xs">{type.label}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Activities */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-teal-600" />
                                        Planned Activities
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {activitiesOptions.map((activity) => (
                                            <motion.button
                                                key={activity.id}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleCheckboxChange(activity.id)}
                                                className={`p-2.5 rounded-xl border transition-all duration-200 text-xs font-medium ${formData.activities.includes(activity.id)
                                                    ? 'bg-gradient-to-br from-teal-500 to-primary-600 text-white border-teal-500 shadow-md'
                                                    : 'bg-white/50 text-gray-600 border-gray-200 hover:border-teal-300 hover:bg-white'
                                                    }`}
                                            >
                                                <span className="text-base mr-1">{activity.icon}</span>
                                                <div>{activity.label}</div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating List...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Generate Packing List
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {packingList ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Progress Bar */}
                                    {progress > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="glass rounded-2xl shadow-lg border border-white/20 p-6"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${progress === 100 ? 'bg-green-100' : 'bg-teal-100'}`}>
                                                        {progress === 100 ? (
                                                            <Check className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <CheckSquare className="w-5 h-5 text-teal-600" />
                                                        )}
                                                    </div>
                                                    <span className="font-semibold text-gray-700">Packing Progress</span>
                                                </div>
                                                <span className={`text-2xl font-bold ${progress === 100 ? 'text-green-600' : 'text-teal-600'}`}>
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    className={`h-4 rounded-full ${progress === 100
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                                        : 'bg-gradient-to-r from-teal-500 to-primary-600'
                                                        }`}
                                                />
                                            </div>
                                            {progress === 100 && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-green-600 font-medium text-sm mt-3"
                                                >
                                                    🎉 All packed! Have a great trip!
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Weather Card */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gradient-to-br from-primary-500 via-teal-500 to-primary-600 text-white rounded-2xl shadow-xl p-6 lg:p-8 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-bold text-xl mb-1">Weather Forecast</h3>
                                                    <p className="text-blue-100 text-sm">
                                                        Based on historical data for {formData.destination}
                                                    </p>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: [0, 10, -10, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                >
                                                    <Sun className="w-12 h-12 text-yellow-300" />
                                                </motion.div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                                                    <Thermometer className="w-5 h-5 mx-auto mb-2" />
                                                    <div className="text-xs text-blue-100">Temperature</div>
                                                    <div className="font-bold text-lg">15-25°C</div>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                                                    <CloudRain className="w-5 h-5 mx-auto mb-2" />
                                                    <div className="text-xs text-blue-100">Rain Chance</div>
                                                    <div className="font-bold text-lg">20%</div>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                                                    <Activity className="w-5 h-5 mx-auto mb-2" />
                                                    <div className="text-xs text-blue-100">Humidity</div>
                                                    <div className="font-bold text-lg">65%</div>
                                                </div>
                                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                                                    <Sun className="w-5 h-5 mx-auto mb-2" />
                                                    <div className="text-xs text-blue-100">UV Index</div>
                                                    <div className="font-bold text-lg">Moderate</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Packing List Grid */}
                                    <motion.div
                                        variants={staggerContainer}
                                        initial="initial"
                                        animate="animate"
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    >
                                        <CategoryCard
                                            title="Clothing"
                                            items={packingList.clothing}
                                            checkedItems={checkedItems}
                                            onItemCheck={handleItemCheck}
                                            icon="👕"
                                            gradient="from-purple-500 to-pink-500"
                                        />
                                        <CategoryCard
                                            title="Essentials"
                                            items={packingList.essentials}
                                            checkedItems={checkedItems}
                                            onItemCheck={handleItemCheck}
                                            icon="🎒"
                                            gradient="from-blue-500 to-cyan-500"
                                        />
                                        <CategoryCard
                                            title="Documents"
                                            items={packingList.documents}
                                            checkedItems={checkedItems}
                                            onItemCheck={handleItemCheck}
                                            icon="📄"
                                            gradient="from-orange-500 to-red-500"
                                        />
                                        <CategoryCard
                                            title="Activity Gear"
                                            items={packingList.activitySpecific}
                                            checkedItems={checkedItems}
                                            onItemCheck={handleItemCheck}
                                            icon="⚽"
                                            gradient="from-green-500 to-teal-500"
                                        />
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                                        >
                                            Save List
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-teal-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-medium"
                                        >
                                            Print List
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center min-h-[500px] glass rounded-3xl border-2 border-dashed border-gray-300 text-gray-400 p-12"
                                >
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="relative mb-6"
                                    >
                                        <Briefcase className="w-24 h-24 text-gray-300" />
                                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-teal-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-600 mb-3">No Packing List Yet</h3>
                                    <p className="text-gray-500 text-center max-w-sm mb-6">
                                        Fill in your trip details to generate a personalized AI-powered packing list
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

const CategoryCard = ({ title, items, checkedItems, onItemCheck, icon, gradient }) => {
    if (!items || items.length === 0) return null;

    const checkedCount = items.filter((_, idx) => checkedItems[`${title}-${idx}`]).length;
    const progress = Math.round((checkedCount / items.length) * 100);

    return (
        <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className="glass p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500">{items.length} items</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-bold ${progress === 100 ? 'text-green-600' : 'text-gray-700'}`}>
                        {checkedCount}/{items.length}
                    </div>
                    <div className="text-xs text-gray-500">{progress}%</div>
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-2 rounded-full bg-gradient-to-r ${gradient}`}
                />
            </div>

            <ul className="space-y-3">
                {items.map((item, idx) => {
                    const key = `${title}-${idx}`;
                    const isChecked = checkedItems[key] || false;
                    return (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group ${isChecked
                                ? 'bg-green-50 border-2 border-green-300'
                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                }`}
                            onClick={() => onItemCheck(title, idx)}
                        >
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isChecked
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 group-hover:border-gray-400'
                                }`}>
                                {isChecked && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className={`flex-1 transition-all duration-200 ${isChecked ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'
                                }`}>
                                {item}
                            </span>
                        </motion.li>
                    );
                })}
            </ul>
        </motion.div>
    );
};

export default Packing;