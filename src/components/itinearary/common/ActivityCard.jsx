// src/components/common/ActivityCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, GripVertical, Edit2, Trash2 } from 'lucide-react';

const ActivityCard = ({ activity, onDragStart, onDragEnd }) => {
    const typeColors = {
        sightseeing: 'bg-blue-100 text-blue-800',
        adventure: 'bg-green-100 text-green-800',
        food: 'bg-amber-100 text-amber-800',
        relaxation: 'bg-purple-100 text-purple-800',
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[activity.type]}`}>
                            {activity.type}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded-lg">
                            <GripVertical size={16} className="text-gray-400" />
                        </button>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{activity.title}</h4>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <MapPin size={14} />
                            <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock size={14} />
                            <span>{activity.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <DollarSign size={14} />
                            <span>${activity.cost}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                    <Edit2 size={16} />
                    <span>Edit</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-rose-600 hover:text-rose-700">
                    <Trash2 size={16} />
                    <span>Remove</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ActivityCard;