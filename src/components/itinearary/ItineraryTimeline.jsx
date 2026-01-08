// src/components/ItineraryTimeline.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    ChevronDown,
    ChevronUp,
    Clock,
    MapPin,
    DollarSign,
    GripVertical,
    Edit2,
    Trash2
} from 'lucide-react';
import ActivityCard from './common/ActivityCard';

const ItineraryTimeline = ({ itinerary, onUpdateItinerary }) => {
    const [expandedDays, setExpandedDays] = useState([1]);
    const [draggingActivity, setDraggingActivity] = useState(null);

    const toggleDay = (day) => {
        setExpandedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const addActivity = (day, timeSlot) => {
        const newActivity = {
            id: Date.now(),
            title: "New Activity",
            type: "sightseeing",
            time: "2 hours",
            cost: 50,
            location: "To be determined"
        };

        const updatedItinerary = itinerary.map(d =>
            d.day === day
                ? { ...d, [timeSlot]: [...d[timeSlot], newActivity] }
                : d
        );

        onUpdateItinerary(updatedItinerary);
    };

    const addDay = () => {
        const newDay = {
            day: itinerary.length + 1,
            morning: [],
            afternoon: [],
            evening: []
        };
        onUpdateItinerary([...itinerary, newDay]);
    };

    return (
        <div className="space-y-6">
            {/* Trip Title Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">Bali Adventure Trip</h2>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <MapPin size={18} />
                                <span>Bali, Indonesia</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={18} />
                                <span>Dec 15 - Dec 25, 2024 • 10 days</span>
                            </div>
                        </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors">
                        Edit Trip
                    </button>
                </div>
            </motion.div>

            {/* Day-wise Timeline */}
            <div className="space-y-4">
                {itinerary.map((dayData) => (
                    <motion.div
                        key={dayData.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                        {/* Day Header */}
                        <div
                            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                            onClick={() => toggleDay(dayData.day)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                        {dayData.day}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">Day {dayData.day}</h3>
                                    <p className="text-gray-500">December {15 + dayData.day - 1}, 2024</p>
                                </div>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-gray-100">
                                {expandedDays.includes(dayData.day) ?
                                    <ChevronUp size={24} /> :
                                    <ChevronDown size={24} />
                                }
                            </button>
                        </div>

                        {/* Day Content */}
                        <AnimatePresence>
                            {expandedDays.includes(dayData.day) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-100"
                                >
                                    {/* Time Slots */}
                                    {['morning', 'afternoon', 'evening'].map((timeSlot) => (
                                        <div key={timeSlot} className="p-6 border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`px-4 py-1.5 rounded-full capitalize ${timeSlot === 'morning' ? 'bg-amber-100 text-amber-800' :
                                                            timeSlot === 'afternoon' ? 'bg-orange-100 text-orange-800' :
                                                                'bg-indigo-100 text-indigo-800'
                                                        }`}>
                                                        {timeSlot}
                                                    </div>
                                                    <span className="text-gray-500">
                                                        {timeSlot === 'morning' ? '9 AM - 12 PM' :
                                                            timeSlot === 'afternoon' ? '1 PM - 5 PM' :
                                                                '6 PM - 10 PM'}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => addActivity(dayData.day, timeSlot)}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 transition-colors"
                                                >
                                                    <Plus size={18} />
                                                    <span>Add Activity</span>
                                                </button>
                                            </div>

                                            {/* Activities Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {dayData[timeSlot].map((activity) => (
                                                    <ActivityCard
                                                        key={activity.id}
                                                        activity={activity}
                                                        onDragStart={() => setDraggingActivity(activity)}
                                                        onDragEnd={() => setDraggingActivity(null)}
                                                    />
                                                ))}
                                                {dayData[timeSlot].length === 0 && (
                                                    <div className="col-span-full text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                                        <Plus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                        <p>No activities planned</p>
                                                        <p className="text-sm">Add your first activity</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}

                {/* Add Day Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addDay}
                    className="w-full py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center space-x-3 text-gray-600 hover:text-gray-900 transition-all"
                >
                    <Plus size={24} />
                    <span className="text-lg font-medium">Add New Day</span>
                </motion.button>
            </div>
        </div>
    );
};

export default ItineraryTimeline;