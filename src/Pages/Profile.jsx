import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  LayoutDashboard, Ticket, Star, MessageSquare, Wallet, Settings,
  LogOut, Search, ChevronDown, MapPin, Filter, Menu, X, ChevronRight,
  Sun, Cloud, Bell, Sparkles, User, Plus, Moon, HelpCircle, Mail,
  CreditCard, Shield, Globe, Calendar
} from 'lucide-react';

// Components
import NotificationDropdown from '../components/NotificationDropdown';
// import FilterPanel from '../components/FilterPanel';

// Context
import AuthContext from "../Context/AuthContext";
import BACKEND_API from "../Services/Backend";

// Constants & Config
const DASHBOARD_CONFIG = {
  NAV_ITEMS: [
    { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { key: 'ticket', name: 'Ticket', icon: Ticket },
    { key: 'favorite', name: 'Favorite', icon: Star },
    { key: 'history', name: 'History', icon: MessageSquare },
    { key: 'transaction', name: 'Transaction', icon: Wallet },
    { key: 'setting', name: 'Setting', icon: Settings },
  ],
  
  SCHEDULE_ITEMS: [
    { id: 20, title: 'Crooked Forest', date: '20 May - 23 May', weather: Cloud },
    { id: 21, title: 'Fem Waterfall', date: '22 May - 25 May', weather: Sun },
    { id: 22, title: 'Night Camping', date: '24 May - 28 May', weather: Cloud },
  ],

  INITIAL_FILTERS: {
    type: 'all',
    minRating: 0,
    maxPrice: 50000,
    sortBy: 'rating',
  },

  ANIMATION: {
    CONTAINER_VARIANTS: {
      hidden: { opacity: 0, scale: 0.98 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      },
    },
    
    ITEM_VARIANTS: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    
    SIDEBAR_VARIANTS: {
      hidden: { x: '-100%', opacity: 0 },
      visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        } 
      },
    },
  }
};

// Custom Hooks
const useDestinations = (userId) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await BACKEND_API.Recommend.GetRecommendation(userId);
      setDestinations(response.data?.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { destinations, loading, refetch: fetchRecommendations };
};

const useFilters = (initialFilters = DASHBOARD_CONFIG.INITIAL_FILTERS) => {
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = useCallback(() => {
    setFilters(DASHBOARD_CONFIG.INITIAL_FILTERS);
  }, []);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    filters,
    showFilters,
    setFilters,
    setShowFilters,
    resetFilters,
    updateFilter,
  };
};

// Sub-Components
const DashboardHeader = ({ 
  searchTerm, 
  onSearchChange, 
  onToggleSidebar, 
  userInitial,
  userDisplayName 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setShowProfileDropdown(false);
  }, [logout]);

  return (
    <motion.div
      variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}
      className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white sticky top-0 border-b border-gray-100 shadow-sm lg:shadow-none z-20"
    >
      {/* Left Section */}
      <div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
        <button
          onClick={onToggleSidebar}
          className="p-2 lg:hidden bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-2xl md:hidden font-extrabold bg-gradient-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <div className="hidden lg:flex items-center space-x-2 ml-2">
          <div className="flex flex-col">
            <span className="text-sm lg:text-2sm font-black bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              TripMate
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
              Travel Smart
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:flex-1 sm:max-w-2xl order-3 sm:order-2 mt-2 sm:mt-0">
        <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search destinations, schedules..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-3 pl-11 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 sm:hidden">
          <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border border-gray-300">⌘</kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 order-2 sm:order-3 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center space-x-2">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-xl transition-all relative ${
                showNotifications ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className={`w-5 h-5 ${showNotifications ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </motion.button>
            <NotificationDropdown 
              isOpen={showNotifications} 
              onClose={() => setShowNotifications(false)} 
            />
          </div>

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden xs:flex items-center space-x-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all"
            aria-label="Add New"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </motion.button>
        </div>

        {/* Profile Dropdown */}
        <ProfileDropdown 
          ref={profileRef}
          isOpen={showProfileDropdown}
          onToggle={setShowProfileDropdown}
          userInitial={userInitial}
          userDisplayName={userDisplayName}
          onLogout={handleLogout}
        />
      </div>
    </motion.div>
  );
};

const ProfileDropdown = React.forwardRef(({ 
  isOpen, 
  onToggle, 
  userInitial, 
  userDisplayName, 
  onLogout 
}, ref) => {
  return (
    <div className="relative" ref={ref}>
      <div
        className={`flex items-center space-x-2 cursor-pointer p-1.5 rounded-xl transition-all active:scale-95 ${
          isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'
        }`}
        onClick={() => onToggle(!isOpen)}
      >
        <div className="relative">
          <img
            src={`https://placehold.co/40x40/008080/ffffff?text=${userInitial}`}
            alt="User"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        <div className="hidden xs:block min-w-0 flex-1">
          <p className="font-semibold text-gray-800 text-sm truncate max-w-[80px] sm:max-w-[100px]">
            {userDisplayName}
          </p>
          <p className="text-xs text-gray-500 truncate">Traveler</p>
        </div>

        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-400 hidden sm:block`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://placehold.co/40x40/008080/ffffff?text=${userInitial}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-900">{userDisplayName}</p>
                  <p className="text-xs text-gray-500">Traveler</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <DropdownItem href="/profile" icon={User} text="Your Profile" />
              <DropdownItem href="/settings" icon={Settings} text="Settings" />
              <DropdownItem href="/billing" icon={CreditCard} text="Billing" />
              <DropdownItem href="/help" icon={HelpCircle} text="Help & Support" />
            </div>

            <div className="border-t border-gray-100"></div>

            <div className="py-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const DropdownItem = ({ href, icon: Icon, text }) => (
  <a href={href} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
    <Icon className="w-4 h-4 mr-3 text-gray-500" />
    {text}
  </a>
);

const NavLink = ({ name, icon: Icon, linkKey, currentActive, onClick }) => {
  const active = linkKey === currentActive;
  
  return (
    <motion.div
      variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}
      whileHover={{ x: active ? 0 : 5 }}
      onClick={() => onClick(linkKey)}
      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200
        ${active 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-700'}`}>
        {name}
      </span>
    </motion.div>
  );
};

const Sidebar = ({ isOpen, onClose, activeNav, onNavClick, onLogout }) => {
  return (
    <AnimatePresence>
      {(isOpen || window.innerWidth >= 1024) && (
        <motion.div
          key="sidebar"
          variants={DASHBOARD_CONFIG.ANIMATION.SIDEBAR_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`
            fixed lg:relative top-0 left-0 h-full w-64 
            bg-white z-40 p-6 shadow-xl lg:shadow-none 
            overflow-y-auto flex flex-col justify-between
            ${isOpen ? 'block' : 'hidden'} lg:block
          `}
        >
          <div>
            <SidebarHeader onClose={onClose} />
            <Navigation activeNav={activeNav} onNavClick={onNavClick} />
            <DiscountBanner />
          </div>

          <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mt-12 pt-4 border-t border-gray-200">
            <NavLink
              name="Log out"
              icon={LogOut}
              linkKey="logout"
              currentActive={activeNav}
              onClick={onLogout}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SidebarHeader = ({ onClose }) => (
  <div className="flex justify-between items-center mb-10">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          TripMate
        </span>
        <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
          Travel Smart
        </span>
      </div>
    </div>
    <button 
      onClick={onClose} 
      className="lg:hidden p-1 rounded-full text-gray-700 hover:bg-gray-100"
      aria-label="Close Sidebar"
    >
      <X className="w-6 h-6" />
    </button>
  </div>
);

const Navigation = ({ activeNav, onNavClick }) => (
  <nav className="space-y-2">
    {DASHBOARD_CONFIG.NAV_ITEMS.map((item) => (
      <button
        key={item.key}
        onClick={() => onNavClick(item.key)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full text-left transition-all duration-200 
          ${activeNav === item.key
            ? "bg-emerald-600 text-white shadow"
            : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.name}</span>
      </button>
    ))}
  </nav>
);

const DiscountBanner = () => (
  <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mt-8 p-4 bg-emerald-100 rounded-xl overflow-hidden relative">
    <div className="absolute inset-0 bg-emerald-200 opacity-20 transform -skew-y-3"></div>
    <div className="relative z-10">
      <h4 className="text-xl font-extrabold text-emerald-700">50% DISCOUNT</h4>
      <p className="text-xs text-emerald-600 mt-1">
        Get a discount on certain days and don't miss it.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-3 flex items-center justify-center p-2 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/50"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  </motion.div>
);

const CalendarDisplay = () => {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, null,
  ];
  const specialDates = [15, 20, 21, 23, 24, 29, 30];

  return (
    <motion.div
      variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-4 sm:p-5 md:p-6 rounded-2xl shadow-md bg-gray-100 w-full max-w-sm mx-auto mb-3"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          May 2025
        </h3>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-3 text-[10px] sm:text-xs text-center select-none">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="font-semibold text-gray-600 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}

        {dates.map((date, index) => {
          const isToday = date === 31;
          const isSpecial = specialDates.includes(date);

          return (
            <div
              key={index}
              className={`flex items-center justify-center aspect-square rounded-full transition-all duration-300 
              ${
                !date
                  ? "text-transparent pointer-events-none"
                  : isToday
                  ? "bg-teal-500 text-white font-semibold shadow-md"
                  : isSpecial
                  ? "border border-teal-400 text-gray-800 font-medium bg-white"
                  : "text-gray-700 hover:bg-white cursor-pointer"
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const ScheduleItem = ({ title, date, weather: WeatherIcon }) => (
  <motion.div 
    variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} 
    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer mb-2"
  >
    <div className="flex items-center">
      <div className="p-2 mr-3 rounded-full bg-gray-200">
        <WeatherIcon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 hidden sm:block"></div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  </motion.div>
);

const FeatureCard = React.memo(({
  name: title,
  region: location,
  rating,
  image_url: image,
  average_cost_per_day,
  best_time_to_visit,
  country,
  type,
  safety_rating,
  visa_requirements,
  onClick,
}) => (
  <motion.div
    variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    className="relative h-[26rem] rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col justify-end p-5 transition-all duration-300 ease-in-out hover:shadow-2xl"
  >
    <div className="absolute inset-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
    </div>

    <div className="relative z-10 text-white space-y-2">
      <h3 className="text-xl font-bold">{title}</h3>
      <FeatureDetail icon={MapPin} text={`${location}, ${country}`} color="teal" />
      <FeatureDetail icon={Globe} text={type} color="indigo" />
      <FeatureDetail icon={Star} text={`${rating} / 10`} color="yellow" isRating />
      <FeatureDetail icon={Shield} text={`Safety: ${safety_rating}/10`} color="green" />
      <FeatureDetail icon={Wallet} text={`Avg Cost: ${average_cost_per_day?.toLocaleString()} INR`} color="orange" />
      <FeatureDetail icon={Calendar} text={`Best Time: ${best_time_to_visit?.join(", ")}`} color="pink" />
      <FeatureDetail icon={Globe} text={visa_requirements} color="blue" />
    </div>
  </motion.div>
));

const FeatureDetail = ({ icon: Icon, text, color, isRating = false }) => (
  <div className="flex items-center space-x-2 text-sm">
    <Icon className={`w-4 h-4 text-${color}-300 ${isRating ? 'fill-yellow-300' : ''}`} />
    <span>{text}</span>
  </div>
);

const DestinationItem = React.memo(({ 
  title, 
  location, 
  rating = 0, 
  price = 0, 
  image, 
  type,
  country,
  safety_rating,
  best_time_to_visit = [],
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image || 'https://placehold.co/400x300/4CAF50/ffffff?text=No+Image'} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy" 
        />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-800 flex items-center">
          <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
          {country || 'Global'}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
            <Star className="w-3 h-3 fill-emerald-500 text-emerald-500 mr-1" />
            {rating?.toFixed(1) || 'N/A'}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          <span className="line-clamp-1">{location || 'Location not specified'}</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">Rs. {price?.toLocaleString() || 'N/A'}</span>
              <span className="text-xs"> / night</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Shield className="w-3 h-3 mr-1 text-green-500" />
              {safety_rating?.toFixed(1) || 'N/A'}
            </div>
          </div>
          
          {best_time_to_visit?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="w-3 h-3 mr-1 text-blue-500" />
              Best: {best_time_to_visit.join(', ')}
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
              {type || 'Destination'}
            </span>
            <button 
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              View Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const DestinationsGrid = ({ destinations, loading, searchTerm, filters, onFiltersChange, onDestinationSelect }) => {
  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = searchTerm === '' || 
        dest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filters.type === 'all' || dest.type === filters.type;
      const matchesRating = (dest.rating || 0) >= filters.minRating;
      const matchesPrice = (dest.average_cost_per_day || 0) <= filters.maxPrice;
      
      return matchesSearch && matchesType && matchesRating && matchesPrice;
    }).sort((a, b) => {
      switch(filters.sortBy) {
        case 'price':
          return (a.average_cost_per_day || 0) - (b.average_cost_per_day || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'safety':
          return (b.safety_rating || 0) - (a.safety_rating || 0);
        default:
          return 0;
      }
    });
  }, [destinations, searchTerm, filters]);

  if (loading) {
    return <LoadingState />;
  }

  if (filteredDestinations.length === 0) {
    return <EmptyState searchTerm={searchTerm} filters={filters} onReset={() => onFiltersChange(DASHBOARD_CONFIG.INITIAL_FILTERS)} />;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={DASHBOARD_CONFIG.ANIMATION.CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {filteredDestinations
        .sort(() => Math.random() - 0.5)
        .slice(0,4)
        .map((dest) => (
          <div key={dest._id || dest.id} onClick={() => onDestinationSelect(dest)}>
            <DestinationItem 
              title={dest.title || dest.name || 'Unnamed Destination'}
              location={dest.location || dest.region || 'Location not specified'}
              rating={dest.rating}
              price={dest.average_cost_per_day || dest.price}
              image={dest.image || dest.image_url}
              type={dest.type}
              country={dest.country}
              safety_rating={dest.safety_rating}
              best_time_to_visit={dest.best_time_to_visit}
              onClick={() => onDestinationSelect(dest)}
            />
          </div>
        ))}
    </motion.div>
  );
};

const LoadingState = () => (
  <motion.div 
    variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} 
    className="flex justify-center items-center py-16"
  >
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
      <p className="text-gray-600">Loading destinations...</p>
    </div>
  </motion.div>
);

const EmptyState = ({ searchTerm, filters, onReset }) => {
  const hasActiveFilters = searchTerm || filters.type !== 'all' || filters.minRating > 0 || filters.maxPrice < 100000;
  
  return (
    <div className="col-span-full py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
        <Search className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {hasActiveFilters ? 'No matching destinations found' : 'No destinations available'}
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        {hasActiveFilters 
          ? `We couldn't find any destinations matching your criteria. Try adjusting your search or filters.`
          : 'There are currently no destinations available. Please check back later.'}
      </p>
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

const FilterSection = ({ filters, showFilters, onFiltersChange, onToggleFilters, destinationTypes }) => {
  return (
    <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Best Destinations</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <FilterToggleButton 
            isActive={showFilters}
            onToggle={onToggleFilters}
          />
          
          <SortSelect 
            value={filters.sortBy}
            onChange={(value) => onFiltersChange({ ...filters, sortBy: value })}
          />
        </div>
      </div>
      
      <FilterPanel 
        showFilters={showFilters}
        filters={filters}
        destinationTypes={destinationTypes}
        onFiltersChange={onFiltersChange}
      />
    </motion.div>
  );
};

const FilterToggleButton = ({ isActive, onToggle }) => (
  <button 
    onClick={onToggle}
    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
  >
    <Filter className="w-4 h-4" />
    <span>Filters</span>
    <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
  </button>
);

const SortSelect = ({ value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    >
      <option value="rating">Sort by: Rating</option>
      <option value="price">Sort by: Price</option>
      <option value="safety">Sort by: Safety</option>
    </select>
    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
  </div>
);

const FilterPanel = ({ showFilters = true, filters, destinationTypes, onFiltersChange, isModal = false, onClose }) => {
  const panelContent = (
    <div className="bg-gray-50 rounded-xl p-4 overflow-hidden">
      {isModal && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter Destinations</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            {destinationTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Rating: {filters.minRating}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => onFiltersChange({ ...filters, minRating: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: Rs. {filters.maxPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={filters.maxPrice}
            onChange={(e) => onFiltersChange({ ...filters, maxPrice: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1K</span>
            <span>100K+</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => onFiltersChange(DASHBOARD_CONFIG.INITIAL_FILTERS)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Reset Filters
        </button>
        {isModal && (
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return panelContent;
  }

  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
          animate={{ opacity: 1, height: 'auto', marginBottom: '1rem' }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          {panelContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RightPanel = ({ searchTerm }) => {
  const filteredSchedule = useMemo(() => 
    DASHBOARD_CONFIG.SCHEDULE_ITEMS.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  return (
    <div className="col-span-1 p-4 lg:p-6 xl:p-8 border-t lg:border-t-0 lg:border-l border-gray-100 overflow-y-auto">
      <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mt-4 lg:mt-0">
        <p className="text-sm text-gray-400 text-right">...</p>
      </motion.div>

      <CalendarDisplay />

      <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">My Schedule</h3>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={DASHBOARD_CONFIG.ANIMATION.CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map((item) => (
            <ScheduleItem key={item.id} {...item} />
          ))
        ) : (
          <p className="text-gray-500 mt-2 text-sm">
            No schedules match "{searchTerm}"
          </p>
        )}
      </motion.div>

      <PromotionalBanner />
    </div>
  );
};

const PromotionalBanner = () => (
  <motion.div 
    variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} 
    className="mt-8 bg-gray-900 rounded-xl shadow-lg p-6 text-white text-center relative overflow-hidden"
  >
    <img 
      src="https://placehold.co/100x100/4CAF50/ffffff?text=Traveler" 
      alt="Traveler" 
      className="absolute top-0 right-0 h-full w-1/3 object-cover opacity-30" 
      loading="lazy" 
    />
    <div className="relative z-10">
      <h3 className="text-2xl font-bold">Let's Explore the beauty</h3>
      <p className="text-sm mt-2 text-gray-300">Get special offers & news</p>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#38A169" }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-2 bg-emerald-500 rounded-full font-semibold shadow-md shadow-emerald-500/50"
      >
        Join now
      </motion.button>
    </div>
  </motion.div>
);

// Main Component
export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [filterPanels, setFilterPanels] = useState([]);

  const { destinations, loading } = useDestinations(user?.id);
  const { filters, showFilters, setFilters, setShowFilters, resetFilters } = useFilters();

  
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);
  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setSelectedDestination(null);
    setShowDetailView(false);
  }, []);

  const handleDestinationSelect = useCallback((destination) => {
    setSelectedDestination(destination);
    setShowDetailView(true);
  }, []);

  const destinationTypes = useMemo(() => {
    const types = new Set();
    destinations.forEach(dest => {
      if (dest.type) types.add(dest.type);
    });
    return ['all', ...Array.from(types)];
  }, [destinations]);

  const handleNavLinkClick = useCallback((key) => {
    setActiveNav(key);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const openFilterPanel = useCallback(() => {
    const newPanelId = Date.now().toString();
    setFilterPanels(prev => [...prev, newPanelId]);
  }, []);

  const closeFilterPanel = useCallback((panelId) => {
    setFilterPanels(prev => prev.filter(id => id !== panelId));
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, [setFilters]);

  const handleItemClick = useCallback((key) => {
    switch (key) {
      case "favorite":
        openFilterPanel();
        break;
      case "setting":
        navigate("/settings");
        break;
      case "ticket":
        alert("Ticket functionality will be available soon");
        break;
      case "transaction":
        alert("Transaction functionality will be available soon");
        break;
      case "history":
        alert("History functionality will be available soon");
        break;
      case "logout":
        logout();
        break;
      default:
        handleNavLinkClick(key);
    }
  }, [openFilterPanel, navigate, logout, handleNavLinkClick]);

  const getUserDisplayName = useCallback(() => {
    if (user?.username) return user.username;
    if (user?.email?.includes('.')) return user.email.split('.')[0];
    return user?.email?.split('@')[0] || 'User';
  }, [user]);

  const getIconLetter = useCallback(() => 
    getUserDisplayName()[0].toUpperCase(), [getUserDisplayName]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        className="mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative"
        variants={DASHBOARD_CONFIG.ANIMATION.CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:grid lg:grid-cols-[250px_1fr_300px] h-full min-h-screen">
          {/* Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            activeNav={activeNav}
            onNavClick={handleItemClick}
            onLogout={logout}
          />

          {/* Main Dashboard Content */}
          <div className="col-span-1 flex flex-col overflow-y-auto">
            <DashboardHeader
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onToggleSidebar={toggleSidebar}
              userInitial={getIconLetter()}
              userDisplayName={getUserDisplayName()}
            />

            <div className="p-4 sm:p-6 lg:p-8 flex-grow">
              <WelcomeSection userName={getUserDisplayName()} />
              
              {destinations.length > 0 && (
                <FeaturedDestinations 
                  destinations={destinations.slice(0,3)} 
                  onDestinationSelect={handleDestinationSelect}
                />
              )}

              <FilterSection 
                filters={filters}
                showFilters={showFilters}
                onFiltersChange={setFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                destinationTypes={destinationTypes}
              />

              <DestinationsGrid 
                destinations={destinations}
                loading={loading}
                searchTerm={searchTerm}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onDestinationSelect={handleDestinationSelect}
              />
            </div>
          </div>

          {/* Right Panel */}
          <RightPanel searchTerm={searchTerm} />
        </div>
      </motion.div>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {showDetailView && selectedDestination && (
          <DetailModal 
            item={selectedDestination}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
      
      <ModalOverlays 
        selectedItem={selectedItem}
        onCloseModal={closeModal}
        filterPanels={filterPanels}
        onCloseFilterPanel={closeFilterPanel}
      />
    </div>
  );
}

const WelcomeSection = ({ userName }) => (
  <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS} className="mb-8 mt-4">
    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent py-2">
      Hello, {userName}
    </h1>
    <p className="text-gray-500 text-sm p-2">Welcome back and explore the world</p>
  </motion.div>
);

const FeaturedDestinations = ({ destinations, onDestinationSelect }) => (
  <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
    {destinations.map((card) => (
      <FeatureCard
        key={card._id}
        {...card}
        onClick={() => onDestinationSelect(card)}
      />
    ))}
  </motion.div>
);

const ModalOverlays = ({ selectedItem, onCloseModal, filterPanels, onCloseFilterPanel }) => {
  const { filters, setFilters } = useFilters();
  const { destinations } = useDestinations();
  
  const destinationTypes = useMemo(() => {
    const types = new Set();
    destinations.forEach(dest => {
      if (dest.type) types.add(dest.type);
    });
    return ['all', ...Array.from(types)];
  }, [destinations]);

  return (
    <>
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={onCloseModal} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {filterPanels.map((panelId) => (
          <motion.div
            key={panelId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterPanel
                isModal={true}
                showFilters={true}
                filters={filters}
                destinationTypes={destinationTypes}
                onFiltersChange={setFilters}
                onClose={() => onCloseFilterPanel(panelId)}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

const DetailModal = ({ item, onClose }) => {
  if (!item) return null;

  // Fallback to default values if properties are missing
  const {
    title = 'Unnamed Destination',
    location = 'Location not specified',
    rating = 0,
    price = 0,
    image_url = 'https://placehold.co/600x400/4CAF50/ffffff?text=No+Image',
    type = 'Destination',
    country = 'Unknown',
    safety_rating = 0,
    best_time_to_visit = [],
    description = 'No description available for this destination.'
  } = item;

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.8 }}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="relative h-48 md:h-64 w-full">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <div className="flex items-center mt-1 text-white/90">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}, {country}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* Rating and Price */}
          <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b">
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Starting from</div>
              <div className="text-2xl font-bold text-emerald-600">
                Rs. {price?.toLocaleString() || 'N/A'}
                <span className="text-sm font-normal text-gray-500"> / night</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About {title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Safety</div>
                <div className="font-medium">{safety_rating?.toFixed(1) || 'N/A'}/5.0</div>
              </div>
            </div>
            
            {best_time_to_visit?.length > 0 && (
              <div className="flex items-center">
                <div className="p-2 bg-green-50 rounded-lg mr-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Best Time to Visit</div>
                  <div className="font-medium">{best_time_to_visit.join(', ')}</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg mr-3">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="font-medium">{location}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-lg mr-3">
                <Globe className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Country</div>
                <div className="font-medium">{country}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 p-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition"
            >
              Book Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 p-3 bg-white border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition"
            >
              Save for Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

