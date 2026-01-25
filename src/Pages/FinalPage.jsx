import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Heart,
  ChevronLeft, ChevronRight, Globe, Calendar,
  Shield, Sun, Filter, TrendingUp,
  Mountain, Castle, Waves, Leaf,
  Snowflake, Umbrella, Users, Utensils, Search
} from "lucide-react";
import BACKEND_API from "../Services/Backend";
import DestinationDetails from "../components/FinalPage/DestinationDetails";

const FinalPage = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const urlFilter = searchParams.get('filter') || 'all';
  const urlDestination = searchParams.get('destination') || '';

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState(urlFilter);
  const [searchQuery, setSearchQuery] = useState(decodeURIComponent(urlDestination).replace(/%2C\+/g, ', ').replace(/\+/g, ' '));
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const itemsPerPage = 9;

  // Sort destinations function
  const sortDestinations = useCallback((destinations, sortMethod) => {
    const sorted = [...destinations];
    switch (sortMethod) {
      case 'price-low':
        return sorted.sort((a, b) =>
          (a.average_cost_per_day || a.price || a.cost || 0) -
          (b.average_cost_per_day || b.price || b.cost || 0)
        );
      case 'price-high':
        return sorted.sort((a, b) =>
          (b.average_cost_per_day || b.price || b.cost || 0) -
          (a.average_cost_per_day || a.price || a.cost || 0)
        );
      case 'rating':
        return sorted.sort((a, b) =>
          (b.safety_rating || b.rating || b.review_score || 0) -
          (a.safety_rating || a.rating || a.review_score || 0)
        );
      case 'popular':
      default:
        return sorted.sort((a, b) =>
          (b.popularity || b.visitors || 0) -
          (a.popularity || a.visitors || 0)
        );
    }
  }, []);

  // Check if destination is domestic (India)
  const isDomesticDestination = useCallback((destination) => {
    const country = String(destination.country || '').toLowerCase();
    return country === 'india' || country.includes('india');
  }, []);

  // Filter destinations based on search query
  const filterBySearchQuery = useCallback((destinations, query) => {
    if (!query || query.trim() === '') return destinations;

    const searchTerm = query.toLowerCase().trim();
    return destinations.filter(dest => {
      const name = dest.name?.toLowerCase() || '';
      const region = dest.region?.toLowerCase() || '';
      const city = dest.city?.toLowerCase() || '';
      const country = dest.country?.toLowerCase() || '';
      const description = dest.description?.toLowerCase() || '';

      // Check if any field contains the search term
      return name.includes(searchTerm) ||
        region.includes(searchTerm) ||
        city.includes(searchTerm) ||
        country.includes(searchTerm) ||
        description.includes(searchTerm);
    });
  }, []);

  // Apply all filters and sorting
  const applyAllFilters = useCallback((destinations) => {
    let filtered = [...destinations];
    console.log(filtered)

    // Apply main filter (domestic/foreign/all)
    if (activeFilter === 'domestic') {
      filtered = filtered.filter(dest => isDomesticDestination(dest));
    } else if (activeFilter === 'foreign') {
      filtered = filtered.filter(dest => !isDomesticDestination(dest));
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filterBySearchQuery(filtered, searchQuery);
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(dest => {
        const destType = dest.type?.toLowerCase();
        const destTags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];

        return selectedCategories.some(category => {
          const categoryLower = category.toLowerCase();
          return destType?.includes(categoryLower) ||
            destTags.includes(categoryLower) ||
            (categoryLower === 'beach' && destType === 'beaches') ||
            (categoryLower === 'mountain' && (destType === 'naturebeauty' || destTags.includes('mountain'))) ||
            (categoryLower === 'cultural' && destType === 'historicalandcultural') ||
            (categoryLower === 'adventure' && destType === 'adventure');
        });
      });
    }

    // Apply price range filter
    filtered = filtered.filter(dest => {
      const price = dest.average_cost_per_day || dest.price || dest.cost || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    filtered = sortDestinations(filtered, sortBy);

    // Update filtered destinations
    setFilteredDestinations(filtered);

    // Recalculate total pages based on the final filtered data
    const totalItems = filtered.length;
    const calculatedPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    setTotalPages(calculatedPages);

    // Reset to page 1 when filters change
    setCurrentPage(1);

    return filtered;
  }, [activeFilter, searchQuery, selectedCategories, priceRange, sortBy, itemsPerPage, sortDestinations, isDomesticDestination, filterBySearchQuery]);

  // Fetch all destinations from backend
  const fetchAllDestinations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let allDestinations = [];

      // First, try to get all destinations from a single endpoint if available
      if (BACKEND_API.Destinations.GetDestinations) {
        const response = await BACKEND_API.Destinations.GetDestinations();
        if (response?.data?.success) {
          allDestinations = response.data.data || [];
        }
      }
      // If single endpoint not available, fetch from all collections
      else {
        const collectionTypes = ['beaches', 'adventure', 'city', 'naturebeauty', 'historicalandcultural'];
        const allPromises = collectionTypes.map(type =>
          BACKEND_API.Destinations.getDestinationsByFilter?.(type) ||
          Promise.reject(new Error(`No API for ${type}`))
        );

        const allResponses = await Promise.allSettled(allPromises);
        allDestinations = allResponses
          .filter(result => result.status === 'fulfilled')
          .flatMap(result => {
            const res = result.value;
            return res?.data?.data || [];
          });
      }

      // Store all destinations
      setAllDestinations(allDestinations);

      // Apply initial filters
      applyAllFilters(allDestinations);

    } catch (err) {
      console.error("Error fetching destinations:", err);
      setError("Failed to load destinations. Please try again later.");
      setAllDestinations([]);
      setFilteredDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [applyAllFilters]);

  // Handle filter change
  const handleFilterChange = (filter) => {
    // Update URL with new filter
    const params = new URLSearchParams(searchParams);

    if (filter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }

    // Keep destination parameter if it exists
    if (searchQuery.trim()) {
      params.set('destination', searchQuery.replace(/, /g, '%2C+').replace(/ /g, '+'));
    }

    // Update URL without page reload
    window.history.pushState({}, '', `?${params.toString()}`);

    // Update local state
    setActiveFilter(filter);

    // Apply filters
    applyAllFilters(allDestinations);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Update URL with search query
    const params = new URLSearchParams(searchParams);

    // Update filter parameter
    if (activeFilter !== 'all') {
      params.set('filter', activeFilter);
    } else {
      params.delete('filter');
    }

    // Update destination parameter
    if (query.trim() === '') {
      params.delete('destination');
    } else {
      params.set('destination', query.replace(/, /g, '%2C+').replace(/ /g, '+'));
    }

    window.history.pushState({}, '', `?${params.toString()}`);

    // Apply filters with search query
    applyAllFilters(allDestinations);
  };

  const clearSearch = () => {
    setSearchQuery('');

    // Remove destination from URL
    const params = new URLSearchParams(searchParams);
    params.delete('destination');

    // Keep filter parameter if it exists
    if (activeFilter !== 'all') {
      params.set('filter', activeFilter);
    }

    window.history.pushState({}, '', `?${params.toString()}`);

    // Apply filters without search query
    applyAllFilters(allDestinations);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSelectedCategories([]);
    setPriceRange([0, 5000]);

    // Clear URL parameters
    const params = new URLSearchParams();
    window.history.pushState({}, '', window.location.pathname);

    // Apply default filters
    applyAllFilters(allDestinations);
  };

  useEffect(() => {
    fetchAllDestinations();
  }, [fetchAllDestinations]);

  useEffect(() => {
    if (allDestinations.length > 0) {
      applyAllFilters(allDestinations);
    }
  }, [sortBy, selectedCategories, priceRange, allDestinations, applyAllFilters]);

  const handleSelect = (destination) => {
    setSelectedDestination(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedDestination(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (destinationId) => {
    setFavorites(prev =>
      prev.includes(destinationId)
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get paginated destinations for current page
  const getPaginatedDestinations = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDestinations.slice(startIndex, endIndex);
  };

  // Count domestic and foreign trips
  const domesticCount = allDestinations.filter(dest => isDomesticDestination(dest)).length;
  const foreignCount = allDestinations.length - domesticCount;

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'beach': return <Waves size={14} />;
      case 'mountain': return <Mountain size={14} />;
      case 'cultural': return <Castle size={14} />;
      case 'adventure': return <TrendingUp size={14} />;
      case 'food': return <Utensils size={14} />;
      case 'wellness': return <Leaf size={14} />;
      case 'summer': return <Sun size={14} />;
      case 'winter': return <Snowflake size={14} />;
      case 'monsoon': return <Umbrella size={14} />;
      default: return <Globe size={14} />;
    }
  };

  if (selectedDestination) {
    return (
      <DestinationDetails
        destination={selectedDestination}
        onBack={handleBack}
        onToggleFavorite={(id) => handleToggleFavorite(id)}
        isFavorite={favorites.includes(selectedDestination._id || selectedDestination.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white rounded-2xl">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 
                    bg-linear-to-r from-transparent via-slate-200/40 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-0">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight
                      bg-linear-to-r from-teal-500 via-sky-500 to-indigo-600
                      bg-clip-text text-transparent">
                {searchQuery
                  ? `Destinations matching "${searchQuery}"`
                  : activeFilter === 'all'
                    ? 'Discover Your Perfect Trip'
                    : activeFilter === 'domestic'
                      ? 'Explore Incredible India'
                      : activeFilter === 'foreign'
                        ? 'International Adventures'
                        : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Destinations`}
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                {searchQuery
                  ? `Found ${filteredDestinations.length} destinations matching your search`
                  : activeFilter === 'all'
                    ? 'Browse through our curated collection of amazing destinations around the world.'
                    : activeFilter === 'domestic'
                      ? 'Discover the rich culture, heritage, and natural beauty of India.'
                      : activeFilter === 'foreign'
                        ? 'Explore exotic locations and create unforgettable memories.'
                        : `Experience the best ${activeFilter} destinations`}
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations by name, region, or country..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent shadow-sm text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                )}
              </div>
            </motion.div>

            {/* Active Filters Indicator */}
            {(activeFilter !== 'all' || searchQuery.trim()) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 
                     bg-slate-100 border border-slate-200 
                     rounded-full mb-6"
              >
                <span className="text-sm font-medium text-slate-700">
                  Active Filters:
                  {activeFilter !== 'all' && (
                    <span className="font-bold capitalize ml-1">{activeFilter}</span>
                  )}
                  {searchQuery.trim() && activeFilter !== 'all' && ', '}
                  {searchQuery.trim() && (
                    <span className="font-bold ml-1">"{searchQuery}"</span>
                  )}
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium ml-2"
                >
                  Clear All
                </button>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 mt-8 mb-2"
            >
              {[
                { label: 'Total Destinations', value: allDestinations.length },
                { label: 'In India', value: domesticCount },
                { label: 'International', value: foreignCount },
                { label: 'Currently Showing', value: filteredDestinations.length },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="min-w-35 bg-white border border-slate-200
                       rounded-xl px-6 py-4 shadow-sm"
                >
                  <div className="text-3xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-600 rounded-sm"></div>
                  ))}
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-600 rounded-sm h-0.5"></div>
                  ))}
                </div>
              </button>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${showFilters
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Filter size={16} />
              Filters
              {selectedCategories.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedCategories.length}
                </span>
              )}
            </button>
          </div>

          {/* Results Info */}
          <div className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span>-
            <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredDestinations.length)}</span> of
            <span className="font-bold text-gray-900"> {filteredDestinations.length}</span> results
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === 'all'
              ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
          >
            <Globe size={16} />
            All Trips ({allDestinations.length})
          </button>
          <button
            onClick={() => handleFilterChange('domestic')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === 'domestic'
              ? 'bg-linear-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
          >
            <MapPin size={16} />
            Domestic ({domesticCount})
          </button>
          <button
            onClick={() => handleFilterChange('foreign')}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${activeFilter === 'foreign'
              ? 'bg-linear-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-200'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
          >
            <Globe size={16} />
            International ({foreignCount})
          </button>

          {/* Additional Filters */}
          <div className="relative group">
            <button className="px-5 py-2.5 rounded-xl font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center gap-2">
              <Filter size={16} />
              More Filters
              <span className="ml-1">▼</span>
            </button>
            <div className="absolute hidden group-hover:block z-20 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200">
              <button
                onClick={() => handleFilterChange('beach')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-xl"
              >
                <Waves size={16} className="text-blue-500" />
                <span>🏖️ Beach Destinations</span>
              </button>
              <button
                onClick={() => handleFilterChange('mountain')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50"
              >
                <Mountain size={16} className="text-green-500" />
                <span>⛰️ Mountain Escapes</span>
              </button>
              <button
                onClick={() => handleFilterChange('cultural')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50"
              >
                <Castle size={16} className="text-yellow-500" />
                <span>🏛️ Cultural Heritage</span>
              </button>
              <button
                onClick={() => handleFilterChange('adventure')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-xl"
              >
                <TrendingUp size={16} className="text-red-500" />
                <span>🚀 Adventure Sports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}+</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Beach', 'Mountain', 'Cultural', 'Adventure', 'Food', 'Wellness'].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          );
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${selectedCategories.includes(category)
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                      >
                        {getCategoryIcon(category)}
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Best Time to Visit */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Best Time to Visit</h3>
                  <div className="space-y-2">
                    {['Summer', 'Winter', 'Monsoon', 'All Year'].map((season) => (
                      <button
                        key={season}
                        onClick={() => {
                          const newFilter = season.toLowerCase();
                          handleFilterChange(newFilter === 'all year' ? 'all' : newFilter);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 w-full text-left"
                      >
                        {season === 'Summer' && <Sun size={14} className="text-orange-500" />}
                        {season === 'Winter' && <Snowflake size={14} className="text-blue-500" />}
                        {season === 'Monsoon' && <Umbrella size={14} className="text-purple-500" />}
                        {season === 'All Year' && <Leaf size={14} className="text-green-500" />}
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button
              onClick={() => fetchAllDestinations()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try changing your filters or search criteria</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Destinations
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getPaginatedDestinations().map((destination, index) => (
              <DestinationCard
                key={destination._id || destination.id || index}
                destination={destination}
                onSelect={handleSelect}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(destination._id || destination.id)}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {getPaginatedDestinations().map((destination, index) => (
              <DestinationListCard
                key={destination._id || destination.id || index}
                destination={destination}
                onSelect={handleSelect}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(destination._id || destination.id)}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && filteredDestinations.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              Page {currentPage} of {totalPages} • Showing {filteredDestinations.length} destinations
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
              >
                ← Previous
              </button>

              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
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
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === pageNum
                        ? 'bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 text-gray-400">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10 h-10 rounded-lg font-medium transition bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Star className="text-blue-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Curated Experiences</h3>
            <p className="text-gray-600">Handpicked destinations with verified reviews and quality checks.</p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Flexible Booking</h3>
            <p className="text-gray-600">Easy cancellations and date changes on most bookings.</p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-purple-600" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our travel experts are always here to help you plan your trip.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Destination Card Component
const DestinationCard = ({ destination, onSelect, onToggleFavorite, isFavorite, delay = 0 }) => {
  const isDomestic = String(destination.country).toLowerCase() === 'india';
  const price = destination.average_cost_per_day || destination.price || destination.cost || Math.floor(Math.random() * 5000) + 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden cursor-pointer"
      onClick={() => onSelect(destination)}
    >
      {/* Badge */}
      <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${isDomestic
        ? 'bg-green-500/90 text-white'
        : 'bg-blue-500/90 text-white'
        }`}>
        {isDomestic ? '🇮🇳 Domestic' : '🌍 International'}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(destination._id || destination.id);
        }}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
      >
        <Heart
          size={20}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src={destination.image_url || destination.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{destination.name}</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
              <MapPin size={14} />
              <span>{destination.region || destination.city}, {destination.country}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-gray-900">{destination.safety_rating || '4.5'}</span>
            <span className="text-gray-500 text-xs">/10</span>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.type && (
            <span
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center gap-1"
            >
              {destination.type}
            </span>
          )}
          {destination.best_time_to_visit && destination.best_time_to_visit.slice(0, 1).map((time, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center gap-1"
            >
              <Calendar size={10} />
              {time}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description || 'Experience the beauty and culture of this amazing destination.'}
        </p>

        {/* Price & Duration */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{price}
            </div>
            <div className="text-gray-500 text-sm">per day</div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Best: {destination.best_time_to_visit?.[0] || 'All year'}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield size={12} />
            <span>Safety: {destination.safety_rating || 'N/A'}/10</span>
          </div>
          <div className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
            View Details <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Destination List View Card
const DestinationListCard = ({ destination, onSelect, onToggleFavorite, isFavorite, delay = 0 }) => {
  const isDomestic = String(destination.country).toLowerCase() === 'india';
  const price = destination.average_cost_per_day || destination.price || destination.cost || Math.floor(Math.random() * 5000) + 1000;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ x: 4 }}
      className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden cursor-pointer"
      onClick={() => onSelect(destination)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-64 h-56 md:h-auto relative">
          <img
            src={destination.image_url || destination.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-10">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${isDomestic
              ? 'bg-green-500/90 text-white'
              : 'bg-blue-500/90 text-white'
              }`}>
              {isDomestic ? '🇮🇳 Domestic' : '🌍 International'}
            </div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(destination._id || destination.id);
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart
                size={20}
                className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-xl mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={16} />
                    <span>{destination.region || destination.city}, {destination.country}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-xl">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900 text-lg">{destination.safety_rating || '4.5'}</span>
                  <span className="text-gray-500">/10</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {destination.description || 'Experience the beauty and culture of this amazing destination.'}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} className="text-blue-500" />
                  <span>Best: {destination.best_time_to_visit?.[0] || 'All year'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield size={16} className="text-green-500" />
                  <span>Safety: {destination.safety_rating || 'N/A'}/10</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Globe size={16} className="text-orange-500" />
                  <span>Type: {destination.type || 'Destination'}</span>
                </div>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col items-end justify-between">
              <div className="text-right mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{price}
                </div>
                <div className="text-gray-500">per day</div>
              </div>

              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center gap-2">
                View Details <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinalPage;