import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Centralized Backend API file
import convertBackendToFrontend from "../../utils/BckndToFrntndData";
import icons from "./Icons.jsx";
import WeatherWidget from './WeatherWidget.jsx'
import CurrencyConverter from "./CurrencyConverter.jsx";
import QuickStats from './QuickStats.jsx';
import CategoryNavigation from './CategoryNavigation.jsx';
import DestinationCard from './DestinationCard.jsx';
import FilterBar from './FilterBar.jsx';
import FeaturedCarousel from './FeaturedCarousel.jsx';


// Enhanced List View
const ListView = ({
    onSelect,
    favorites,
    onToggleFavorite,
    domesticTrips,
    foreignTrips,
    loading,
    error,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [tripType, setTripType] = useState("All");
    const [activeCategory, setActiveCategory] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [activeFilters, setActiveFilters] = useState({
        season: "All",
        difficulty: "All",
        priceRange: "All",
    });

    // Convert backend data to frontend format
    const processedDomesticTrips = convertBackendToFrontend(
        domesticTrips,
        "domestic"
    );
    const processedForeignTrips = convertBackendToFrontend(
        foreignTrips,
        "foreign"
    );

    // Combine all destinations
    const allDestinations = [...processedDomesticTrips, ...processedForeignTrips];

    // Filter destinations based on search and filters
    const filteredDestinations = allDestinations.filter((destination) => {
        const matchesSearch =
            destination.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            destination.country?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            destination.details.location
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase());

        const matchesTripType =
            tripType === "All" ||
            (tripType === "Domestic" && destination.type === "domestic") ||
            (tripType === "Foreign" && destination.type === "foreign");

        const matchesSeason =
            activeFilters.season === "All" ||
            destination.details.season === activeFilters.season;

        const matchesDifficulty =
            activeFilters.difficulty === "All" ||
            destination.details.difficulty === activeFilters.difficulty;

        const matchesPrice =
            activeFilters.priceRange === "All" ||
            (activeFilters.priceRange === "0-10000" &&
                destination.details.price <= 10000) ||
            (activeFilters.priceRange === "10000-25000" &&
                destination.details.price > 10000 &&
                destination.details.price <= 25000) ||
            (activeFilters.priceRange === "25000-50000" &&
                destination.details.price > 25000 &&
                destination.details.price <= 50000) ||
            (activeFilters.priceRange === "50000+" &&
                destination.details.price > 50000);

        return (
            matchesSearch &&
            matchesTripType &&
            matchesSeason &&
            matchesDifficulty &&
            matchesPrice
        );
    });

    // Get featured destinations (first 3)
    const featuredDestinations = allDestinations.slice(0, 3);

    const handleFilterChange = (filterType, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    if (loading) {
        return (
            <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
                {/* Skeleton Loading */}
                <div className="space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-24 bg-gray-200 rounded-2xl animate-pulse"
                            ></div>
                        ))}
                    </div>
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-80 bg-gray-200 rounded-2xl animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        Unable to load trips
                    </h3>
                    <p className="text-gray-500">{error}</p>
                    <button
                        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto"
        >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-light">
                        Hello, <span className="font-bold text-indigo-600">Traveler!</span>{" "}
                        👋
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Discover your next adventure around the world
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <WeatherWidget location="Current" country="Location" compact />
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">Local Time</div>
                        <div className="font-semibold text-gray-800">
                            {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <QuickStats
                domesticCount={processedDomesticTrips.length}
                foreignCount={processedForeignTrips.length}
                totalCount={allDestinations.length}
            />

            {/* Featured Carousel */}
            {featuredDestinations.length > 0 && (
                <FeaturedCarousel
                    destinations={featuredDestinations}
                    onSelect={onSelect}
                    onToggleFavorite={onToggleFavorite}
                    favorites={favorites}
                />
            )}

            {/* Category Navigation */}
            <CategoryNavigation
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Search Bar */}
            <div className="relative">
                <icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search destinations, tours, locations, activities..."
                    className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Filter Bar */}
            <FilterBar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onTripTypeChange={setTripType}
                tripType={tripType}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredDestinations.length}
            />

            {/* Destinations Grid/List */}
            {filteredDestinations.length > 0 ? (
                <motion.div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                    }
                    layout
                >
                    {filteredDestinations.map((destination, index) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                            onSelect={onSelect}
                            layout={viewMode}
                            isFavorite={favorites.includes(destination.id)}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <icons.Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                        No destinations found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        We couldn't find any trips matching your criteria. Try adjusting
                        your search or filters.
                    </p>
                    <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
                        onClick={() => {
                            setSearchQuery("");
                            setActiveFilters({
                                season: "All",
                                difficulty: "All",
                                priceRange: "All",
                            });
                            setTripType("All");
                        }}
                    >
                        Clear All Filters
                    </button>
                </motion.div>
            )}

            {/* Load More Button */}
            {filteredDestinations.length > 0 && (
                <div className="text-center pt-8">
                    <button className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
                        Load More Destinations
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default ListView;