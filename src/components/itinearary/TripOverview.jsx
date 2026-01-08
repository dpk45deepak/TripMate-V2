// src/components/TripOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    MapPin,
    DollarSign,
    TrendingUp,
    Sparkles,
    Clock,
    PlusCircle,
    Cloud,
    Users,
    Wallet
} from 'lucide-react';
import StatCard from './common/StatCard';

const TripOverview = ({ stats, suggestions, budget, onBudgetChange }) => {
    const activityTags = [
        { label: 'Sightseeing', color: 'bg-blue-100 text-blue-800', icon: MapPin },
        { label: 'Adventure', color: 'bg-green-100 text-green-800', icon: TrendingUp },
        { label: 'Relax', color: 'bg-purple-100 text-purple-800', icon: Cloud },
        { label: 'Food', color: 'bg-amber-100 text-amber-800', icon: '🍽️' },
        { label: 'Family', color: 'bg-pink-100 text-pink-800', icon: Users },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    icon={Calendar}
                    label="Total Days"
                    value={stats.totalDays}
                    color="from-cyan-500 to-blue-500"
                    change="+2"
                />
                <StatCard
                    icon={MapPin}
                    label="Activities"
                    value={stats.totalActivities}
                    color="from-green-500 to-emerald-500"
                    change="+3"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Budget"
                    value={`$${budget}`}
                    color="from-purple-500 to-pink-500"
                    change="+$500"
                />
            </div>

            {/* Budget Slider */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Budget Control</h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${budget}
                    </span>
                </div>

                <div className="space-y-4">
                    <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="100"
                        value={budget}
                        onChange={(e) => onBudgetChange(parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-pink-600"
                    />

                    <div className="flex justify-between text-sm text-gray-500">
                        <span>$1,000</span>
                        <span>$5,000</span>
                        <span>$10,000</span>
                    </div>
                </div>
            </div>

            {/* Activity Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Preferences</h3>
                <div className="flex flex-wrap gap-3">
                    {activityTags.map((tag, index) => (
                        <motion.div
                            key={tag.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`px-4 py-2 rounded-full flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform ${tag.color}`}
                        >
                            {typeof tag.icon === 'string' ? (
                                <span>{tag.icon}</span>
                            ) : (
                                <tag.icon size={16} />
                            )}
                            <span className="font-medium">{tag.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-cyan-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
                            <p className="text-sm text-gray-600">Personalized for your trip</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                        New
                    </span>
                </div>

                <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                        <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <Clock size={14} />
                                            <span>{suggestion.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <DollarSign size={14} />
                                            <span>${suggestion.cost}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MapPin size={14} />
                                            <span>{suggestion.location}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{suggestion.description}</p>
                                </div>
                                <button className="ml-4 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                                    <PlusCircle size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TripOverview;