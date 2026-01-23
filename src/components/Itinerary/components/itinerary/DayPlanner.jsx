// src/components/itinerary/DayPlanner.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, ChevronUp, Calendar, Clock, DollarSign } from 'lucide-react';

const DayPlanner = ({ day, activities, onAddActivity, onUpdateActivity }) => {
    const [expanded, setExpanded] = useState(true);
    const [newActivity, setNewActivity] = useState({
        title: '',
        time: '09:00',
        duration: '2 hours',
        type: 'sightseeing',
        cost: 0
    });

    const timeSlots = [
        { label: 'Morning', time: '09:00 - 12:00' },
        { label: 'Afternoon', time: '13:00 - 17:00' },
        { label: 'Evening', time: '18:00 - 22:00' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
            {/* Header */}
            <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Day {day.number}</h3>
                        <p className="text-gray-500">{day.date} • {day.location}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Daily Budget</p>
                        <p className="text-lg font-bold text-gray-900">${day.budget}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                    >
                        {/* Time Slots */}
                        {timeSlots.map((slot, slotIndex) => {
                            const slotActivities = activities.filter(a => a.timeSlot === slot.label.toLowerCase());

                            return (
                                <div key={slot.label} className="p-6 border-b border-gray-100 last:border-b-0">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`px-4 py-1.5 rounded-full font-medium ${slotIndex === 0 ? 'bg-amber-100 text-amber-800' :
                                                    slotIndex === 1 ? 'bg-blue-100 text-blue-800' :
                                                        'bg-purple-100 text-purple-800'
                                                }`}>
                                                {slot.label}
                                            </div>
                                            <span className="text-gray-500">{slot.time}</span>
                                        </div>

                                        <button
                                            onClick={() => {
                                                const activity = {
                                                    ...newActivity,
                                                    timeSlot: slot.label.toLowerCase(),
                                                    id: Date.now()
                                                };
                                                onAddActivity(activity);
                                            }}
                                            className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700"
                                        >
                                            <Plus size={16} />
                                            <span>Add Activity</span>
                                        </button>
                                    </div>

                                    {/* Activities */}
                                    {slotActivities.length > 0 ? (
                                        <div className="space-y-3">
                                            {slotActivities.map((activity, idx) => (
                                                <motion.div
                                                    key={activity.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                            <div className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                <span>{activity.time}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <DollarSign className="h-4 w-4 mr-1" />
                                                                <span>${activity.cost}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 text-sm mt-2">{activity.description}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                            <p>No activities planned for {slot.label.toLowerCase()}</p>
                                            <p className="text-sm mt-1">Click "Add Activity" to get started</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Add Activity Form */}
                        <div className="p-6 bg-linear-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-4">Add New Activity</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Activity title"
                                    value={newActivity.title}
                                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={newActivity.type}
                                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="sightseeing">Sightseeing</option>
                                    <option value="food">Food & Dining</option>
                                    <option value="adventure">Adventure</option>
                                    <option value="relaxation">Relaxation</option>
                                    <option value="transport">Transport</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Cost ($)"
                                    value={newActivity.cost}
                                    onChange={(e) => setNewActivity({ ...newActivity, cost: parseInt(e.target.value) })}
                                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DayPlanner;