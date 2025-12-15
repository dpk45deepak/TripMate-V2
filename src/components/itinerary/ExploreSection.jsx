import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HeartIcon,
    MapPinIcon,
    CalendarIcon,
    UsersIcon,
    StarIcon
} from "@heroicons/react/24/outline";
import {
    HeartIcon as HeartSolid,
    StarIcon as StarSolid
} from "@heroicons/react/24/solid";

export default function ExploreSection({ searchQuery, favorites, toggleFavorite }) {
    const [filter, setFilter] = useState("all");

    const trendingDestinations = [
        {
            id: 1,
            title: "Queenstown, New Zealand",
            img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            rating: 4.8,
            price: "$1,200",
            description: "Adventure capital of the world",
            location: "New Zealand",
            days: "5 days",
            travelers: "2-4 people",
            isTrending: true,
            category: "adventure"
        },
        {
            id: 2,
            title: "Cape Town, South Africa",
            img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
            rating: 4.7,
            price: "$980",
            description: "Table Mountain and coastal beauty",
            location: "South Africa",
            days: "7 days",
            travelers: "2-6 people",
            isTrending: true,
            category: "beach"
        },
        {
            id: 3,
            title: "Santorini, Greece",
            img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80",
            rating: 4.9,
            price: "$1,500",
            description: "Stunning sunsets and white architecture",
            location: "Greece",
            days: "4 days",
            travelers: "2 people",
            isTrending: false,
            category: "romantic"
        },
        {
            id: 4,
            title: "Kyoto, Japan",
            img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            rating: 4.8,
            price: "$1,350",
            description: "Ancient temples and cherry blossoms",
            location: "Japan",
            days: "6 days",
            travelers: "1-3 people",
            isTrending: true,
            category: "cultural"
        },
        {
            id: 5,
            title: "Swiss Alps, Switzerland",
            img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            rating: 4.9,
            price: "$2,100",
            description: "Majestic mountains and alpine lakes",
            location: "Switzerland",
            days: "8 days",
            travelers: "2-4 people",
            isTrending: false,
            category: "mountain"
        },
        {
            id: 6,
            title: "Bali, Indonesia",
            img: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
            rating: 4.6,
            price: "$850",
            description: "Tropical paradise with rich culture",
            location: "Indonesia",
            days: "7 days",
            travelers: "2-5 people",
            isTrending: true,
            category: "beach"
        }
    ];

    const categories = [
        { id: "all", label: "All Destinations" },
        { id: "trending", label: "Trending" },
        { id: "beach", label: "Beach" },
        { id: "mountain", label: "Mountain" },
        { id: "cultural", label: "Cultural" },
        { id: "adventure", label: "Adventure" },
        { id: "romantic", label: "Romantic" },
    ];

    const filteredDestinations = trendingDestinations.filter(destination => {
        const matchesSearch =
            destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "trending" && destination.isTrending) ||
            destination.category === filter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Promo Banner */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            >
                <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                    alt="Travel Adventure"
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-2">Adventure Awaits</h3>
                        <p className="text-white/80">Discover breathtaking destinations worldwide</p>
                        <button className="mt-3 px-4 py-2 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition">
                            Explore Now
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">Explore Destinations</h3>
                        <p className="text-gray-600">Discover your next adventure</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {filteredDestinations.length} destinations
                    </span>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === category.id
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Destinations Grid */}
                <AnimatePresence>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                        {filteredDestinations.length > 0 ? (
                            filteredDestinations.map((destination, i) => (
                                <motion.div
                                    key={destination.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 cursor-pointer group"
                                >
                                    <div className="relative">
                                        <img
                                            src={destination.img}
                                            alt={destination.title}
                                            className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        {destination.isTrending && (
                                            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                TRENDING
                                            </div>
                                        )}
                                        <button
                                            onClick={() => toggleFavorite(destination.id)}
                                            className="absolute top-3 right-3 p-2 bg-white/90 rounded-xl hover:bg-white transition shadow-lg"
                                        >
                                            {favorites.has(destination.id) ? (
                                                <HeartSolid className="w-5 h-5 text-red-500" />
                                            ) : (
                                                <HeartIcon className="w-5 h-5 text-gray-600" />
                                            )}
                                        </button>
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                            <StarSolid className="w-4 h-4 text-yellow-400" />
                                            <span>{destination.rating}</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-gray-800 mb-2 text-lg">{destination.title}</h4>
                                        <p className="text-sm text-gray-600 mb-3">{destination.description}</p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <MapPinIcon className="w-4 h-4" />
                                                <span>{destination.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>{destination.days}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <UsersIcon className="w-4 h-4" />
                                                <span>{destination.travelers}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg text-blue-600">{destination.price}</span>
                                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition">
                                                Explore
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-12 text-gray-500"
                            >
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <MapPinIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-lg font-semibold mb-2">No destinations found</p>
                                <p>Try adjusting your search or filter criteria</p>
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}