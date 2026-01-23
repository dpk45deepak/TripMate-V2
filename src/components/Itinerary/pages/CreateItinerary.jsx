// src/pages/CreateItinerary.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, MapPin, Calendar, Users, DollarSign,
    Hotel, Utensils, Compass, Star, Check, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateItinerary = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        title: '',
        destination: '',
        tripType: 'leisure',

        // Step 2: Dates & Travelers
        startDate: '',
        endDate: '',
        travelers: 1,
        travelersAge: ['adult'],

        // Step 3: Budget
        budget: 5000,
        currency: 'USD',
        budgetBreakdown: {
            flights: 30,
            accommodation: 35,
            food: 20,
            activities: 15
        },

        // Step 4: Preferences
        interests: [],
        accommodationType: 'hotel',
        foodPreferences: [],
        pace: 'moderate',

        // Step 5: Activities
        mustSee: [],
        activities: []
    });

    const tripTypes = [
        { id: 'leisure', label: 'Leisure & Relaxation', icon: '🏖️', color: 'from-blue-400 to-cyan-400' },
        { id: 'adventure', label: 'Adventure', icon: '🧗', color: 'from-emerald-400 to-green-500' },
        { id: 'cultural', label: 'Cultural', icon: '🏛️', color: 'from-amber-400 to-orange-500' },
        { id: 'food', label: 'Food & Wine', icon: '🍷', color: 'from-rose-400 to-pink-500' },
        { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', color: 'from-teal-400 to-indigo-500' },
        { id: 'honeymoon', label: 'Honeymoon', icon: '💝', color: 'from-pink-400 to-rose-500' }
    ];

    const interests = [
        { name: 'Beaches', icon: '🏖️' },
        { name: 'Mountains', icon: '⛰️' },
        { name: 'Cities', icon: '🏙️' },
        { name: 'Historical Sites', icon: '🏛️' },
        { name: 'Museums', icon: '🖼️' },
        { name: 'Shopping', icon: '🛍️' },
        { name: 'Nightlife', icon: '🌃' },
        { name: 'Hiking', icon: '🥾' },
        { name: 'Wildlife', icon: '🦁' },
        { name: 'Photography', icon: '📸' },
        { name: 'Local Food', icon: '🍜' },
        { name: 'Luxury', icon: '✨' }
    ];

    const steps = [
        { number: 1, title: 'Basic Info', description: 'Tell us about your trip' },
        { number: 2, title: 'Dates & Travelers', description: 'When and who\'s going' },
        { number: 3, title: 'Budget Planning', description: 'Set your budget' },
        { number: 4, title: 'Preferences', description: 'Your travel style' },
        { number: 5, title: 'Final Details', description: 'Last touches' }
    ];

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Let's Start Planning!
                            </h2>
                            <p className="text-gray-600">Create your perfect trip in just a few steps</p>
                        </div>

                        {/* Trip Title */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Trip Name
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="E.g., Bali Adventure 2024"
                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                            />
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Where are you going?
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    placeholder="Search destination..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Trip Type */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                What type of trip?
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {tripTypes.map(type => (
                                    <motion.button
                                        key={type.id}
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormData({ ...formData, tripType: type.id })}
                                        className={`relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${formData.tripType === type.id
                                            ? 'border-transparent bg-linear-to-br ' + type.color + ' text-white shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                            }`}
                                    >
                                        {formData.tripType === type.id && (
                                            <motion.div
                                                className="absolute inset-0 bg-white/10"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            />
                                        )}
                                        <div className="relative z-10">
                                            <div className="text-3xl mb-3">{type.icon}</div>
                                            <p className="text-sm font-semibold text-left">{type.label}</p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                When & Who?
                            </h2>
                            <p className="text-gray-600">Tell us about your travel dates and group</p>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Start Date
                                </label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    End Date
                                </label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Travelers */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Number of Travelers
                            </label>
                            <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50/50 to-teal-50/50 rounded-2xl border border-gray-200/50">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setFormData({ ...formData, travelers: Math.max(1, formData.travelers - 1) })}
                                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                                >
                                    <span className="text-xl font-bold text-gray-700">-</span>
                                </motion.button>

                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-linear-to-r from-blue-500 to-teal-500 rounded-xl">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                            {formData.travelers}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            traveler{formData.travelers > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setFormData({ ...formData, travelers: formData.travelers + 1 })}
                                    className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                                >
                                    <span className="text-xl font-bold text-gray-700">+</span>
                                </motion.button>
                            </div>
                        </div>

                        {/* Travelers Age Groups */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Traveler Age Groups
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {['Adults (18-64)', 'Seniors (65+)', 'Teens (13-17)', 'Children (4-12)', 'Infants (0-3)'].map(age => (
                                    <motion.button
                                        key={age}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            const ages = [...formData.travelersAge];
                                            const index = ages.indexOf(age);
                                            if (index > -1) {
                                                ages.splice(index, 1);
                                            } else {
                                                ages.push(age);
                                            }
                                            setFormData({ ...formData, travelersAge: ages });
                                        }}
                                        className={`px-5 py-3 rounded-xl border transition-all duration-200 ${formData.travelersAge.includes(age)
                                            ? 'bg-linear-to-r from-blue-500 to-teal-500 text-white shadow-md'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-sm'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{age}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Budget Planning
                            </h2>
                            <p className="text-gray-600">Set your budget and allocate funds</p>
                        </div>

                        {/* Total Budget */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Total Budget
                                    </label>
                                    <div className="text-3xl font-bold bg-linear-to-r from-blue-600 via-teal-600 to-pink-600 bg-clip-text text-transparent">
                                        ${formData.budget.toLocaleString()}
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="500"
                                        max="20000"
                                        step="100"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-linear-to-r from-blue-200 via-teal-200 to-pink-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-blue-600 [&::-webkit-slider-thumb]:to-teal-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mt-3">
                                    <span>$500</span>
                                    <span className="font-medium">$10,000</span>
                                    <span>$20,000</span>
                                </div>
                            </div>
                        </div>

                        {/* Budget Breakdown */}
                        <div className="space-y-6">
                            <h3 className="font-semibold text-gray-900 text-lg">Budget Breakdown</h3>
                            <div className="space-y-6">
                                {[
                                    { key: 'flights', label: 'Flights', icon: '✈️', color: 'from-cyan-500 to-blue-500' },
                                    { key: 'accommodation', label: 'Accommodation', icon: '🏨', color: 'from-teal-500 to-pink-500' },
                                    { key: 'food', label: 'Food & Dining', icon: '🍽️', color: 'from-amber-500 to-orange-500' },
                                    { key: 'activities', label: 'Activities', icon: '🎯', color: 'from-green-500 to-emerald-500' }
                                ].map(item => (
                                    <div key={item.key} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="font-medium text-gray-700">{item.label}</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">
                                                ${Math.round(formData.budget * formData.budgetBreakdown[item.key] / 100).toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={formData.budgetBreakdown[item.key]}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    budgetBreakdown: {
                                                        ...formData.budgetBreakdown,
                                                        [item.key]: parseInt(e.target.value)
                                                    }
                                                })}
                                                className={`flex-1 h-2 bg-linear-to-r ${item.color} rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300`}
                                            />
                                            <span className="w-12 text-center font-medium text-gray-700">
                                                {formData.budgetBreakdown[item.key]}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Your Preferences
                            </h2>
                            <p className="text-gray-600">Customize your travel experience</p>
                        </div>

                        {/* Interests */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                What are you interested in?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {interests.map(interest => (
                                    <motion.button
                                        key={interest.name}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            const current = [...formData.interests];
                                            const index = current.indexOf(interest.name);
                                            if (index > -1) {
                                                current.splice(index, 1);
                                            } else {
                                                current.push(interest.name);
                                            }
                                            setFormData({ ...formData, interests: current });
                                        }}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${formData.interests.includes(interest.name)
                                            ? 'border-blue-500 bg-linear-to-br from-blue-50 to-blue-100 shadow-sm'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl mb-2">{interest.icon}</span>
                                        <span className="text-sm font-medium text-gray-700">{interest.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Accommodation */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Accommodation Preference
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Hotel', 'Vacation Rental', 'Hostel', 'Luxury Resort', 'Boutique Hotel', 'Camping'].map(type => (
                                    <motion.button
                                        key={type}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFormData({ ...formData, accommodationType: type.toLowerCase() })}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${formData.accommodationType === type.toLowerCase()
                                            ? 'border-teal-500 bg-linear-to-br from-teal-50 to-teal-100 shadow-sm'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="font-medium text-gray-700">{type}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Trip Pace */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Trip Pace
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { id: 'relaxed', label: 'Relaxed', desc: 'Take it easy, enjoy slowly', icon: '😌' },
                                    { id: 'moderate', label: 'Moderate', desc: 'Balanced pace, see main sights', icon: '🚶' },
                                    { id: 'fast', label: 'Fast-paced', desc: 'Pack it all in, maximize time', icon: '🏃' }
                                ].map(pace => (
                                    <motion.button
                                        key={pace.id}
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormData({ ...formData, pace: pace.id })}
                                        className={`p-5 rounded-2xl border-2 transition-all duration-300 ${formData.pace === pace.id
                                            ? 'border-blue-500 bg-linear-to-br from-blue-50 to-blue-100 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <span className="text-3xl">{pace.icon}</span>
                                            <div className="text-left">
                                                <p className="font-semibold text-gray-900">{pace.label}</p>
                                                <p className="text-sm text-gray-500 mt-1">{pace.desc}</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Final Details
                            </h2>
                            <p className="text-gray-600">Add must-see attractions and review your trip</p>
                        </div>

                        {/* Must-See Attractions */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                                Must-see attractions (optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Add attractions separated by commas..."
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                            const mustSee = [...formData.mustSee, e.target.value.trim()];
                                            setFormData({ ...formData, mustSee });
                                            e.target.value = '';
                                        }
                                    }}
                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
                                />
                            </div>
                            {formData.mustSee.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {formData.mustSee.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="group px-4 py-2 bg-linear-to-r from-blue-500 to-teal-500 rounded-full flex items-center space-x-2"
                                        >
                                            <span className="text-white text-sm font-medium">{item}</span>
                                            <button
                                                onClick={() => {
                                                    const mustSee = [...formData.mustSee];
                                                    mustSee.splice(idx, 1);
                                                    setFormData({ ...formData, mustSee });
                                                }}
                                                className="text-white/80 hover:text-white transition-colors"
                                            >
                                                ×
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 via-white to-teal-50 border border-gray-200/50 p-8">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/10 to-teal-500/10 rounded-full -translate-y-32 translate-x-32" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
                                    Trip Summary
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg">
                                                <MapPin className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Destination</p>
                                                <p className="font-semibold text-gray-900">{formData.destination || 'Not set'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-linear-to-r from-teal-500 to-pink-500 rounded-lg">
                                                <Calendar className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Duration</p>
                                                <p className="font-semibold text-gray-900">
                                                    {formData.startDate && formData.endDate
                                                        ? `${formData.startDate} to ${formData.endDate}`
                                                        : 'Not set'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-lg">
                                                <Users className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Travelers</p>
                                                <p className="font-semibold text-gray-900">{formData.travelers} person(s)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-lg">
                                                <DollarSign className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Budget</p>
                                                <p className="font-semibold text-gray-900">${formData.budget.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {formData.interests.length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                                        <p className="text-sm text-gray-500 mb-3">Selected Interests</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.interests.map((interest, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        console.log('Submitting trip data:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/itinerary');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-teal-50/30">
            {/* Enhanced Progress Bar */}
            <div className="sticky top-0 z-50">
                <div className="h-2 bg-linear-to-r from-gray-100 to-gray-200">
                    <motion.div
                        className="h-full bg-linear-to-r from-blue-500 via-teal-500 to-pink-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step - 1) * 25}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <button
                        onClick={() => step === 1 ? navigate('/itinerary') : setStep(step - 1)}
                        className="group flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <div className="p-2 bg-white rounded-xl border border-gray-200 group-hover:border-blue-400 group-hover:shadow-sm transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="text-center">
                        <motion.h1
                            key={step}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                        >
                            {steps[step - 1].title}
                        </motion.h1>
                        <p className="text-gray-600 mt-2">{steps[step - 1].description}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="hidden md:flex items-center space-x-2">
                            {steps.map((s) => (
                                <div
                                    key={s.number}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${step >= s.number ? 'bg-blue-500' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium">
                            Step {step} of {steps.length}
                        </span>
                    </div>
                </div>

                {/* Form Content */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-500/5 border border-white/50 overflow-hidden"
                >
                    <div className="p-8 md:p-10">
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200/50">
                            {step > 1 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStep(step - 1)}
                                    className="flex items-center space-x-3 px-6 py-3.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200"
                                >
                                    <ArrowLeft size={18} />
                                    <span className="font-medium">Previous</span>
                                </motion.button>
                            )}

                            <div className="ml-auto">
                                {step < steps.length ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setStep(step + 1)}
                                        className="group flex items-center space-x-3 px-8 py-3.5 bg-linear-to-r from-blue-500 to-teal-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 font-semibold">Continue</span>
                                        <ChevronRight size={18} className="relative z-10" />
                                        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSubmit}
                                        className="group flex items-center space-x-3 px-8 py-3.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >
                                        <Check size={20} className="relative z-10" />
                                        <span className="relative z-10 font-semibold">Create Trip</span>
                                        <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tips Section */}
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-linear-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100/50"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h4>
                                <p className="text-gray-600 text-sm">
                                    Be specific with your destination for better AI suggestions. If planning multiple cities,
                                    you can add them later in the itinerary editor. Use the trip type selection to get
                                    personalized activity recommendations.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CreateItinerary;