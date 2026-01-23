// src/components/itinerary/ItineraryCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign, ChevronRight, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItineraryCard = ({ itinerary, showMenu = true }) => {
    const navigate = useNavigate();

    const getProgressColor = (progress) => {
        if (progress >= 75) return 'from-green-500 to-emerald-500';
        if (progress >= 50) return 'from-blue-500 to-cyan-500';
        if (progress >= 25) return 'from-amber-500 to-orange-500';
        return 'from-gray-400 to-gray-500';
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/itinerary/${itinerary.id}`)}
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={itinerary?.image}
                    alt={itinerary?.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                    <motion.div
                        className={`h-full bg-linear-to-r ${getProgressColor(itinerary?.progress || 0)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${itinerary?.progress || 0}%` }}
                        transition={{ duration: 1 }}
                    />
                </div>

            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{itinerary?.title}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{itinerary?.location}</span>
                        </div>
                    </div>

                    {showMenu && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Handle menu click
                            }}
                            className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <div>
                            <p className="text-sm font-medium">{itinerary?.duration}</p>
                            <p className="text-xs text-gray-500">{itinerary?.dates}</p>
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <div>
                            <p className="text-sm font-medium">{itinerary?.travelers} traveler{itinerary?.travelers > 1 ? 's' : ''}</p>
                            <p className="text-xs text-gray-500">{itinerary?.type}</p>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {itinerary?.tags?.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                        <span className="font-bold text-gray-900">${itinerary?.budget}</span>
                        <span className="text-gray-500 text-sm ml-1">budget</span>
                    </div>

                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                        <span className="text-sm font-medium">View Details</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ItineraryCard;