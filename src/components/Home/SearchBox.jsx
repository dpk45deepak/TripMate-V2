import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  Search,
  Plane,
  Bus,
  Hotel,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBox() {
  const tabs = [
    { id: "Hotel", icon: Hotel, color: "text-blue-600", bgColor: "bg-blue-50" },
    { id: "Flight", icon: Plane, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { id: "Bus & Train", icon: Bus, color: "text-purple-600", bgColor: "bg-purple-50" },
    { id: "Holiday", icon: Sparkles, color: "text-amber-600", bgColor: "bg-amber-50" },
  ];

  const [activeTab, setActiveTab] = useState("Hotel");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Corrected initial state: adults should be at least 1 in most scenarios. Changed from 2.
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [checkInDate, setCheckInDate] = useState("2023-10-23");
  const [checkOutDate, setCheckOutDate] = useState("2023-10-25");
  const [destination, setDestination] = useState("Bali, Indonesia");
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const guestDropdownRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    setIsMounted(true);

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Corrected: Moved handleClickOutside inside useEffect or use useCallback to ensure it uses the latest state/ref.
  // Using useCallback for optimization is good practice here.
  const handleClickOutside = useCallback((event) => {
    if (
      guestDropdownRef.current &&
      !guestDropdownRef.current.contains(event.target)
    ) {
      setIsGuestDropdownOpen(false);
    }
  }, []); // Dependencies are not needed as handleClickOutside only uses guestDropdownRef.current and setIsGuestDropdownOpen

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]); // Added handleClickOutside to dependency array

  // Fixed: Ensure minimum guest count is 1 for adults, 1 for rooms (for Hotel only).
  const handleGuestChange = (type, operation) => {
    setGuests((prev) => {
      let newValue;
      if (operation === "increase") {
        newValue = prev[type] + 1;
      } else {
        // Adults must be at least 1. Children/Rooms can be 0 (except rooms minimum 1 when shown)
        const min = type === "adults" ? 1 : type === "rooms" && activeTab === "Hotel" ? 1 : 0;
        newValue = Math.max(min, prev[type] - 1);
      }
      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  const getGuestSummary = () => {
    const { adults, children, rooms } = guests;
    const totalGuests = adults + children;
    let summary = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}`;
    // Fixed: Only include 'rooms' in summary for 'Hotel' tab.
    if (activeTab === "Hotel") summary += `, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
    return isMobile ? `${totalGuests}` : summary;
  };

  const handleSearch = () => {
    console.log("Searching:", {
      activeTab,
      destination,
      checkInDate,
      checkOutDate,
      guests,
    });
    alert(`Searching for ${destination} from ${checkInDate} to ${checkOutDate} for ${guests.adults + guests.children} guests`);
  };

  // Handle tab click with proper state update
  // Fixed:
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Fixed: Reset guest rooms when switching to non-hotel tabs.
    // Also ensures guest dropdown closes if the active tab changes.
    setIsGuestDropdownOpen(false);
    if (tabId !== "Hotel") {
      setGuests(prev => ({ ...prev, rooms: 1 })); // Set rooms to 1 (minimal) or other minimal state
    } else {
      // Ensure adults is at least 1 when switching to Hotel.
      setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults) }));
    }
  };

  // Don't render anything until we know the screen size
  if (!isMounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Mobile simplified view
  if (isMobile) {
    return (
      <div className="w-full mx-auto px-4 md:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200"
        >
          {/* Mobile Header with Active Tab Display */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsGuestDropdownOpen(false); // Close guest dropdown when opening menu
                }}
                className="flex items-center space-x-2 text-gray-700"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                <span className="font-medium text-sm">
                  {tabs.find(tab => tab.id === activeTab)?.id}
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 p-2 rounded-lg text-white"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Selection Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-b border-gray-100"
              >
                <div className="grid grid-cols-2 gap-2 p-3">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          handleTabClick(tab.id);
                          setIsMobileMenuOpen(false);
                          setIsGuestDropdownOpen(false); // Added: Ensure guest dropdown closes
                        }}
                        className={`flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? `${tab.bgColor} ${tab.color} border-2 border-current`
                            : "text-gray-600 bg-gray-50 border-2 border-transparent"
                          }`}
                      >
                        <IconComponent size={16} />
                        <span>{tab.id}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Search Form */}
          <div className="p-3 space-y-3">
            {/* Destination */}
            <div className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200">
              <MapPin className="text-blue-600 w-4 h-4 mr-2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Check-in */}
              <div className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200">
                <Calendar className="text-blue-600 w-4 h-4 mr-2" />
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-gray-900"
                />
              </div>

              {/* Check-out */}
              <div className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200">
                <Calendar className="text-blue-600 w-4 h-4 mr-2" />
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-gray-900"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative" ref={guestDropdownRef}>
              <button
                onClick={() => {
                  setIsGuestDropdownOpen(!isGuestDropdownOpen);
                  setIsMobileMenuOpen(false); // Added: Ensure mobile menu closes when opening guest dropdown
                }}
                className="w-full flex items-center justify-between bg-gray-50 px-3 py-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center">
                  <Users className="text-blue-600 w-4 h-4 mr-2" />
                  <span className="text-sm text-gray-900">{getGuestSummary()}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${isGuestDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <AnimatePresence>
                {isGuestDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-20"
                  >
                    <div className="space-y-3">
                      {/* Fixed logic for room display based on activeTab */}
                      {["adults", "children", ...(activeTab === "Hotel" ? ["rooms"] : [])].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium text-gray-900 text-sm capitalize">
                                {type}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleGuestChange(type, "decrease")}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                // Fixed: Minimum adult count is 1, minimum room count is 1 for Hotel.
                                disabled={type === "adults" ? guests[type] <= 1 : type === "rooms" ? guests[type] <= 1 : guests[type] <= 0}
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-medium text-sm">
                                {guests[type]}
                              </span>
                              <button
                                onClick={() => handleGuestChange(type, "increase")}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-gray-500">Popular:</span>
              {["Bangkok", "Paris", "Tokyo", "Dubai"].map((city) => (
                <button
                  key={city}
                  onClick={() => setDestination(`${city}`)}
                  className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Desktop view
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100"
    >
      {/* Tabs - Fixed with proper click handling */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTabClick(tab.id)} // Uses the improved handleTabClick
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all flex-1 min-w-[120px] text-center text-sm font-medium ${isActive
                  ? "bg-white shadow-md border-2 border-current"
                  : "text-gray-600 hover:text-gray-900 border-2 border-transparent"
                } ${isActive ? tab.color : ""}`}
            >
              <IconComponent
                className={`w-4 h-4 ${isActive ? tab.color : "text-gray-400"}`}
              />
              <span>{tab.id}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Search Form */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 items-end">
        {/* Destination */}
        <div className="lg:col-span-3">
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200"
          >
            <MapPin className="text-blue-600 w-4 h-4 mr-2" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              className="bg-transparent outline-none flex-1 text-sm text-gray-900 placeholder-gray-500"
            />
          </motion.div>
        </div>

        {/* Check-in */}
        <div className="lg:col-span-2">
          <div className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200">
            <Calendar className="text-blue-600 w-4 h-4 mr-2" />
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-gray-900"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="lg:col-span-2">
          <div className="flex items-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200">
            <Calendar className="text-blue-600 w-4 h-4 mr-2" />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-gray-900"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="lg:col-span-2 relative" ref={guestDropdownRef}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="w-full flex items-center justify-between bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Users className="text-blue-600 w-4 h-4 mr-2" />
              <span className="text-sm text-gray-900">{getGuestSummary()}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${isGuestDropdownOpen ? "rotate-180" : ""
                }`}
            />
          </motion.button>

          <AnimatePresence>
            {isGuestDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10"
              >
                <div className="space-y-3">
                  {/* Fixed logic for room display based on activeTab */}
                  {["adults", "children", ...(activeTab === "Hotel" ? ["rooms"] : [])].map(
                    (type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm capitalize">
                            {type}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleGuestChange(type, "decrease")}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            // Fixed: Minimum adult count is 1, minimum room count is 1 for Hotel.
                            disabled={type === "adults" ? guests[type] <= 1 : type === "rooms" ? guests[type] <= 1 : guests[type] <= 0}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium text-sm">
                            {guests[type]}
                          </span>
                          <button
                            onClick={() => handleGuestChange(type, "increase")}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-3 rounded-lg text-white font-medium shadow-lg flex items-center justify-center text-sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </motion.button>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">Popular:</span>
        {["Bangkok", "Paris", "Tokyo", "Dubai", "London", "New York"].map((city, i) => (
          <motion.button
            key={city}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setDestination(`${city}`)}
            className="text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
          >
            {city}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}