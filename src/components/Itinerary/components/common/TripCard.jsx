// src/components/common/TripCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star } from 'lucide-react';

const TripCard = ({ trip }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {trip.aiPowered && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                        AI Suggestion
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{trip.title}</h3>
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="font-semibold">{trip.rating}</span>
                        <span className="text-gray-400 text-sm">({trip.reviews})</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>

                {/* Details */}
                <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{trip.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{trip.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{trip.travelers}</span>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {trip.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div>
                        <p className="text-sm text-gray-500">Budget Range</p>
                        <p className="text-lg font-bold text-gray-900">{trip.budget}</p>
                    </div>
                    <button className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default TripCard;