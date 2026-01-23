// src/components/itinerary/ActivityTimeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, DollarSign, Edit2, GripVertical } from 'lucide-react';

const ActivityTimeline = ({ activities, onEdit, onReorder }) => {
    const getActivityColor = (type) => {
        const colors = {
            sightseeing: 'bg-blue-100 text-blue-800',
            food: 'bg-amber-100 text-amber-800',
            adventure: 'bg-green-100 text-green-800',
            relaxation: 'bg-purple-100 text-purple-800',
            transport: 'bg-gray-100 text-gray-800'
        };
        return colors[type] || colors.sightseeing;
    };

    return (
        <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-200 via-purple-200 to-pink-200" />

            <div className="space-y-8">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start"
                    >
                        {/* Timeline dot */}
                        <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                {activity.time.split(':')[0]}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="ml-6 flex-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                                            {activity.type}
                                        </span>
                                        <button
                                            className="p-1 hover:bg-gray-100 rounded-lg cursor-move"
                                            draggable
                                            onDragStart={() => onReorder?.(activity)}
                                        >
                                            <GripVertical className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => onEdit?.(activity)}
                                        className="p-1 hover:bg-gray-100 rounded-lg"
                                    >
                                        <Edit2 className="h-4 w-4 text-gray-400" />
                                    </button>
                                </div>

                                <h4 className="font-semibold text-gray-900 text-lg mb-2">{activity.title}</h4>
                                <p className="text-gray-600 mb-4">{activity.description}</p>

                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>{activity.duration}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{activity.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        <span>${activity.cost}</span>
                                    </div>
                                </div>

                                {activity.notes && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-sm text-blue-700">{activity.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ActivityTimeline;