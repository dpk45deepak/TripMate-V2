// src/components/maps/NearbyPlaces.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, DollarSign, Clock, Filter } from 'lucide-react';

const NearbyPlaces = ({ location = "Current Location" }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All', icon: '📍' },
        { id: 'restaurants', label: 'Restaurants', icon: '🍽️' },
        { id: 'hotels', label: 'Hotels', icon: '🏨' },
        { id: 'attractions', label: 'Attractions', icon: '🏛️' },
        { id: 'shops', label: 'Shopping', icon: '🛍️' },
        { id: 'transport', label: 'Transport', icon: '🚇' }
    ];

    const places = [
        {
            id: 1,
            name: 'Skyline Restaurant',
            category: 'restaurants',
            rating: 4.5,
            distance: '0.5 km',
            price: '$$',
            description: 'Fine dining with panoramic city views',
            tags: ['Fine Dining', 'View', 'Romantic']
        },
        {
            id: 2,
            name: 'Grand Plaza Hotel',
            category: 'hotels',
            rating: 4.8,
            distance: '1.2 km',
            price: '$$$',
            description: 'Luxury hotel with spa and pool',
            tags: ['Luxury', 'Spa', 'Pool']
        },
        {
            id: 3,
            name: 'City Museum',
            category: 'attractions',
            rating: 4.7,
            distance: '2.1 km',
            price: '$',
            description: 'Historical artifacts and art exhibits',
            tags: ['Museum', 'History', 'Art']
        },
        {
            id: 4,
            name: 'Central Market',
            category: 'shops',
            rating: 4.3,
            distance: '0.8 km',
            price: '$$',
            description: 'Local products and souvenirs',
            tags: ['Market', 'Local', 'Souvenirs']
        }
    ];

    const filteredPlaces = selectedCategory === 'all'
        ? places
        : places.filter(place => place.category === selectedCategory);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Nearby Places</h2>
                    <p className="text-gray-600 text-sm">Near {location}</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
                {categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`shrink-0 px-4 py-2 rounded-full transition-colors ${selectedCategory === category.id
                                ? 'bg-linear-to-r from-blue-500 to-purple-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Places List */}
            <div className="space-y-4">
                {filteredPlaces.map((place, idx) => (
                    <motion.div
                        key={place.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm cursor-pointer transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="font-semibold text-gray-900">{place.name}</h3>
                                    <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                                        <Star className="h-3 w-3 mr-1" />
                                        {place.rating}
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-3">{place.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {place.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>{place.distance}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        <span>{place.price}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>Open until 10 PM</span>
                                    </div>
                                </div>
                            </div>

                            <button className="ml-4 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                                View
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredPlaces.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                    <p>No places found in this category</p>
                </div>
            )}
        </div>
    );
};

export default NearbyPlaces;