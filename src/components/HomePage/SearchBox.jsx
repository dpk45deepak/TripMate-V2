import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const tabs = [
    { id: "Location", icon: MapPin, color: "text-blue-600", bgColor: "bg-blue-50" },
    { id: "Holiday", icon: Sparkles, color: "text-amber-600", bgColor: "bg-amber-50" },
    { id: "Flight", icon: Plane, color: "text-emerald-600", bgColor: "bg-emerald-50" },
    { id: "Bus & Train", icon: Bus, color: "text-purple-600", bgColor: "bg-purple-50" },
  ];

  const [activeTab, setActiveTab] = useState("Location");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [checkInDate, setCheckInDate] = useState(getDefaultDate(0));
  const [checkOutDate, setCheckOutDate] = useState(getDefaultDate(2));
  const [destination, setDestination] = useState("Goa, India");
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const guestDropdownRef = useRef(null);

  // Helper function to get default dates
  function getDefaultDate(daysFromNow = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

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

  // Handle click outside guest dropdown
  const handleClickOutside = useCallback((event) => {
    if (
      guestDropdownRef.current &&
      !guestDropdownRef.current.contains(event.target)
    ) {
      setIsGuestDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Handle guest count changes
  const handleGuestChange = (type, operation) => {
    setGuests((prev) => {
      const currentValue = prev[type];
      let newValue;

      if (operation === "increase") {
        newValue = currentValue + 1;
        // Set reasonable maximum limits
        if (type === "adults" && newValue > 10) return prev;
        if (type === "children" && newValue > 6) return prev;
        if (type === "rooms" && newValue > 8) return prev;
      } else {
        // Set minimum limits
        const min = type === "adults" ? 1 : type === "rooms" ? 1 : 0;
        newValue = Math.max(min, currentValue - 1);
      }

      return { ...prev, [type]: newValue };
    });
  };

  // Get guest summary text
  const getGuestSummary = () => {
    const { adults, children, rooms } = guests;
    const totalGuests = adults + children;

    if (isMobile) {
      return `${totalGuests}`;
    }

    let summary = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}`;
    if (activeTab === "Hotel") {
      summary += `, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
    }
    return summary;
  };

  // Handle search submission - UPDATED to include filter parameter
  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    // Always include the filter parameter based on activeTab
    searchParams.append("filter", getFilterFromTab(activeTab));

    // Include destination if provided
    if (destination && destination.trim()) {
      searchParams.append("destination", destination.trim());
    }

    // Include dates
    searchParams.append("checkInDate", checkInDate);
    searchParams.append("checkOutDate", checkOutDate);

    // Include guest information
    searchParams.append("adults", guests.adults);
    searchParams.append("children", guests.children);
    searchParams.append("rooms", guests.rooms);

    // Navigate to final page with all parameters
    navigate(`/final?${searchParams.toString()}`);
  };

  // Helper function to convert tab to filter value
  const getFilterFromTab = (tab) => {
    switch (tab) {
      case "Location":
        // For Location tab, use destination-based filtering
        if (destination.toLowerCase().includes("india")) {
          return "domestic";
        } else if (destination.toLowerCase().includes("bali") ||
          destination.toLowerCase().includes("paris") ||
          destination.toLowerCase().includes("tokyo") ||
          destination.toLowerCase().includes("dubai")) {
          return "foreign";
        }
        return "all";
      case "Holiday":
        return "holiday";
      case "Flight":
        return "flight";
      case "Bus & Train":
        return "transport";
      default:
        return "all";
    }
  };

  // Handle tab switching with proper state reset
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsGuestDropdownOpen(false);
    setIsMobileMenuOpen(false); // FIX: Close mobile menu when tab is selected

    // Reset guest configuration based on tab type
    if (tabId !== "Hotel") {
      setGuests(prev => ({
        adults: Math.max(1, prev.adults),
        children: prev.children,
        rooms: 1
      }));
    } else {
      // For hotel, ensure minimum configuration
      setGuests(prev => ({
        adults: Math.max(1, prev.adults),
        children: prev.children,
        rooms: Math.max(1, prev.rooms)
      }));
    }
  };

  // Quick destination selection - UPDATED to set destination and filter
  const handleQuickDestination = (city) => {
    setDestination(`${city}`);

    // Automatically set appropriate filter based on destination
    const lowerCity = city.toLowerCase();
    let filterType = "all";

    if (lowerCity === "goa" || lowerCity === "mumbai" || lowerCity === "delhi") {
      filterType = "domestic";
    } else if (lowerCity === "bali" || lowerCity === "paris" ||
      lowerCity === "tokyo" || lowerCity === "dubai" ||
      lowerCity === "london" || lowerCity === "new york") {
      filterType = "foreign";
    }

    // Update active tab based on destination type
    if (filterType === "domestic" || filterType === "foreign") {
      setActiveTab("Location");
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Don't render until we know screen size
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

  // Mobile view
  if (isMobile) {
    return (
      <div className="w-full mx-auto px-4 md:p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="px-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200"
        >
          {/* Mobile Header - FIXED: Now shows the actual active tab */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  setIsGuestDropdownOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                <span className="font-medium text-sm">
                  {activeTab} {/* FIX: Directly use activeTab state */}
                </span>
              </button>
              <button
                onClick={handleSearch}
                className="bg-blue-600 p-2 rounded-lg text-white"
              >
                <Search size={16} />
              </button>
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
                    const isActive = activeTab === tab.id; // FIX: Check if this tab is active

                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)} // FIX: Use the handler directly
                        className={`flex items-center justify-center space-x-2 p-3 rounded-lg text-sm font-medium transition-all ${isActive
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
                  min={getDefaultDate(0)}
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
                  min={checkInDate}
                  className="bg-transparent outline-none flex-1 text-sm text-gray-900"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative" ref={guestDropdownRef}>
              <button
                onClick={() => {
                  setIsGuestDropdownOpen(!isGuestDropdownOpen);
                  setIsMobileMenuOpen(false);
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
                      {["adults", "children", ...(activeTab === "Hotel" ? ["rooms"] : [])].map(
                        (type) => (
                          <div
                            key={type}
                            className="flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium text-gray-900 text-sm capitalize">
                                {type === "children" ? "Children (0-17)" : type}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleGuestChange(type, "decrease")}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                  type === "adults"
                                    ? guests[type] <= 1
                                    : type === "rooms"
                                      ? guests[type] <= 1
                                      : guests[type] <= 0
                                }
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

            {/* Quick Suggestions with filter indicators */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs text-gray-500">Popular:</span>
              {[
                { city: "Goa", filter: "domestic" },
                { city: "Mumbai", filter: "domestic" },
                { city: "Bali", filter: "foreign" },
                { city: "Paris", filter: "foreign" },
                { city: "Tokyo", filter: "foreign" },
                { city: "Dubai", filter: "foreign" }
              ].map((item) => (
                <button
                  key={item.city}
                  onClick={() => handleQuickDestination(item.city)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${item.filter === "domestic"
                      ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                      : "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
                    }`}
                >
                  {item.city}
                </button>
              ))}
            </div>

            {/* Filter Info */}
            <div className="text-xs text-gray-500 mt-2 px-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Domestic
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mx-2 ml-3 mr-1"></span>
              International
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
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all flex-1 min-w-30 text-center text-sm font-medium ${isActive
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
              min={getDefaultDate(0)}
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
              min={checkInDate}
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
                  {["adults", "children", ...(activeTab === "Hotel" ? ["rooms"] : [])].map(
                    (type) => (
                      <div
                        key={type}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm capitalize">
                            {type === "children" ? "Children (0-17)" : type}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleGuestChange(type, "decrease")}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              type === "adults"
                                ? guests[type] <= 1
                                : type === "rooms"
                                  ? guests[type] <= 1
                                  : guests[type] <= 0
                            }
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
            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-3 rounded-lg text-white font-medium shadow-lg flex items-center justify-center text-sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </motion.button>
        </div>
      </div>

      {/* Quick Suggestions with filter indicators */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">Popular:</span>
        {[
          { city: "Goa", filter: "domestic" },
          { city: "Mumbai", filter: "domestic" },
          { city: "Delhi", filter: "domestic" },
          { city: "Bali", filter: "foreign" },
          { city: "Paris", filter: "foreign" },
          { city: "Tokyo", filter: "foreign" },
          { city: "Dubai", filter: "foreign" },
          { city: "London", filter: "foreign" },
          { city: "New York", filter: "foreign" }
        ].map((item, i) => (
          <motion.button
            key={item.city}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleQuickDestination(item.city)}
            className={`text-xs px-2 py-1 rounded transition-colors ${item.filter === "domestic"
                ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                : "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
              }`}
          >
            {item.city}
          </motion.button>
        ))}
      </div>

      {/* Filter Info */}
      <div className="mt-3 text-xs text-gray-500 flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
        Domestic destinations
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mx-2 ml-4 mr-1"></span>
        International destinations
        <span className="ml-auto text-blue-600 font-medium">
          Current filter will be applied: {getFilterFromTab(activeTab)}
        </span>
      </div>
    </motion.div>
  );
}