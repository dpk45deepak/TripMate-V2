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
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage
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

    // Safely process and validate trips data
    const processTrips = (trips, type) => {
        if (!trips || !Array.isArray(trips)) {
            console.error(`Invalid ${type} trips data:`, trips);
            return [];
        }
        
        try {
            const processedTrips = convertBackendToFrontend(trips, type);
            if (!Array.isArray(processedTrips)) {
                console.error(`Unexpected format after processing ${type} trips:`, processedTrips);
                return [];
            }
            return processedTrips;
        } catch (error) {
            console.error(`Error processing ${type} trips:`, error);
            return [];
        }
    };

    // Process trips with error handling
    const processedDomesticTrips = processTrips(domesticTrips, "domestic");
    const processedForeignTrips = processTrips(foreignTrips, "foreign");

    // Combine all destinations with validation
    const allDestinations = [
        ...(Array.isArray(processedDomesticTrips) ? processedDomesticTrips : []),
        ...(Array.isArray(processedForeignTrips) ? processedForeignTrips : [])
    ].filter(Boolean);  // Remove any null/undefined entries

    // Safe access to destination properties
    const getDestinationProperty = (destination, path, defaultValue = '') => {
        try {
            return path.split('.').reduce((obj, key) => 
                (obj && obj[key] !== undefined) ? obj[key] : defaultValue, destination);
        } catch (error) {
            return defaultValue;
        }
    };
    
    // Filter destinations based on search and filters with safe property access
    const filteredDestinations = allDestinations.filter((destination) => {
        if (!destination || typeof destination !== 'object') return false;
        
        const title = String(getDestinationProperty(destination, 'title', '')).toLowerCase();
        const country = String(getDestinationProperty(destination, 'country', '')).toLowerCase();
        const location = String(getDestinationProperty(destination, 'details.location', '')).toLowerCase();
        const searchTerm = String(searchQuery || '').toLowerCase();
        
        const matchesSearch = 
            title.includes(searchTerm) ||
            country.includes(searchTerm) ||
            location.includes(searchTerm);

        const destType = String(getDestinationProperty(destination, 'type', '')).toLowerCase();
        const matchesTripType =
            tripType === "All" ||
            (tripType === "Domestic" && destType === "domestic") ||
            (tripType === "Foreign" && destType === "foreign");

        const season = getDestinationProperty(destination, 'details.season', '');
        const matchesSeason =
            activeFilters.season === "All" ||
            season === activeFilters.season;

        const difficulty = getDestinationProperty(destination, 'details.difficulty', '');
        const matchesDifficulty =
            activeFilters.difficulty === "All" ||
            difficulty === activeFilters.difficulty;

        const price = Number(getDestinationProperty(destination, 'details.price', 0));
        const matchesPrice =
            activeFilters.priceRange === "All" ||
            (activeFilters.priceRange === "0-10000" && price <= 10000) ||
            (activeFilters.priceRange === "10000-25000" && price > 10000 && price <= 25000) ||
            (activeFilters.priceRange === "25000-50000" && price > 25000 && price <= 50000) ||
            (activeFilters.priceRange === "50000+" && price > 50000);

        return matchesSearch && matchesTripType && matchesSeason && matchesDifficulty && matchesPrice;
    });

    // Shuffle function to randomize array
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Shuffle the filtered destinations
    const shuffledDestinations = shuffleArray(filteredDestinations);

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedDestinations = shuffledDestinations.slice(startIndex, endIndex);

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
            {paginatedDestinations.length > 0 ? (
                <motion.div
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                    }
                    layout
                >
                    {paginatedDestinations.map((destination, index) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
                    >
                        &laquo;
                    </button>
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &lsaquo;
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`px-4 py-2 rounded-md border ${currentPage === pageNum 
                                    ? 'bg-indigo-600 text-white border-indigo-600' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    
                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &rsaquo;
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
                    >
                        &raquo;
                    </button>

                    <span className="ml-4 text-sm text-gray-600 hidden md:block">
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
            )}
        </motion.div>
    );
};

export default ListView;