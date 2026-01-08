// src/components/TripCustomizationPanel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sun,
    CloudRain,
    Users,
    DollarSign,
    Calendar,
    Coffee,
    MapPin,
    Camera,
    Utensils,
    Moon
} from 'lucide-react';

const TripCustomizationPanel = ({
    selectedActivities,
    onActivitiesChange,
    budget,
    onBudgetChange,
    tripDuration
}) => {
    const [duration, setDuration] = useState(tripDuration || 7);
    const [aiChips, setAiChips] = useState(['weather-based', 'budget-based']);

    const activityTypes = [
        { id: 'sightseeing', label: 'Sightseeing', icon: Camera, color: 'bg-blue-100 text-blue-800' },
        { id: 'adventure', label: 'Adventure', icon: MapPin, color: 'bg-green-100 text-green-800' },
        { id: 'food', label: 'Food', icon: Utensils, color: 'bg-amber-100 text-amber-800' },
        { id: 'relaxation', label: 'Relaxation', icon: Coffee, color: 'bg-purple-100 text-purple-800' },
        { id: 'nightlife', label: 'Nightlife', icon: Moon, color: 'bg-indigo-100 text-indigo-800' },
    ];

    const aiRecommendationChips = [
        { id: 'weather-based', label: '🌤️ Weather-based', color: 'bg-sky-100 text-sky-800' },
        { id: 'budget-based', label: '💰 Budget-based', color: 'bg-emerald-100 text-emerald-800' },
        { id: 'crowd-based', label: '👥 Crowd-based', color: 'bg-orange-100 text-orange-800' },
        { id: 'local-based', label: '🏮 Local secrets', color: 'bg-rose-100 text-rose-800' },
    ];

    const budgetBreakdown = [
        { category: 'Travel', amount: budget * 0.3, color: 'bg-cyan-500' },
        { category: 'Hotel', amount: budget * 0.35, color: 'bg-blue-500' },
        { category: 'Food', amount: budget * 0.2, color: 'bg-amber-500' },
        { category: 'Activities', amount: budget * 0.15, color: 'bg-purple-500' },
    ];

    const total = budgetBreakdown.reduce((sum, item) => sum + item.amount, 0);

    const toggleActivity = (activityId) => {
        const newActivities = selectedActivities.includes(activityId)
            ? selectedActivities.filter(id => id !== activityId)
            : [...selectedActivities, activityId];
        onActivitiesChange(newActivities);
    };

    const toggleAiChip = (chipId) => {
        setAiChips(prev =>
            prev.includes(chipId)
                ? prev.filter(id => id !== chipId)
                : [...prev, chipId]
        );
    };

    return (
        <div className="space-y-6">
            {/* Trip Duration Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-linear-to-r from-amber-500 to-orange-500 rounded-lg">
                            <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Trip Duration</h3>
                            <p className="text-sm text-gray-600">Select your travel days</p>
                        </div>
                    </div>
                    <span className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {duration} days
                    </span>
                </div>

                <div className="space-y-4">
                    <input
                        type="range"
                        min="3"
                        max="21"
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full h-2 bg-linear-to-r from-amber-200 via-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-linear-to-r [&::-webkit-slider-thumb]:from-amber-600 [&::-webkit-slider-thumb]:to-orange-600"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>3 days</span>
                        <span>Week (7 days)</span>
                        <span>21 days</span>
                    </div>
                </div>
            </div>

            {/* Activity Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Select Activities</h3>
                <div className="grid grid-cols-2 gap-4">
                    {activityTypes.map((activity) => {
                        const isSelected = selectedActivities.includes(activity.id);
                        return (
                            <motion.button
                                key={activity.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleActivity(activity.id)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-cyan-500 bg-linear-to-br from-cyan-50 to-blue-50'
                                        : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`p-3 rounded-lg mb-3 ${activity.color}`}>
                                    <activity.icon size={24} />
                                </div>
                                <span className="font-medium text-gray-900">{activity.label}</span>
                                {isSelected && (
                                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* AI Recommendations Chips */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
                        <p className="text-sm text-gray-600">Smart filters for better suggestions</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {aiRecommendationChips.map((chip) => {
                        const isActive = aiChips.includes(chip.id);
                        return (
                            <motion.button
                                key={chip.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleAiChip(chip.id)}
                                className={`px-4 py-2.5 rounded-full border transition-all ${isActive
                                        ? `${chip.color} border-transparent`
                                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="font-medium">{chip.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Budget Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-linear-to-r from-emerald-500 to-green-500 rounded-lg">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Budget Breakdown</h3>
                            <p className="text-sm text-gray-600">Total: ${total.toFixed(0)}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {budgetBreakdown.map((item, index) => (
                        <div key={item.category} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">{item.category}</span>
                                <span className="font-semibold text-gray-900">${item.amount.toFixed(0)}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(item.amount / total) * 100}%` }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`h-full ${item.color} rounded-full`}
                                />
                            </div>
                        </div>
                    ))}

                    {/* Summary Card */}
                    <div className="mt-6 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-emerald-700">Remaining Budget</p>
                                <p className="text-2xl font-bold text-emerald-900">
                                    ${(budget - total).toFixed(0)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-emerald-700">Daily Average</p>
                                <p className="text-xl font-bold text-emerald-900">
                                    ${(budget / duration).toFixed(0)}/day
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCustomizationPanel;