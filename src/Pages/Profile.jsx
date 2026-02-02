import React, { useState, useEffect, useContext, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  LayoutDashboard, Ticket, Star, MessageSquare, Wallet, Settings,
  LogOut, Search, ChevronDown, MapPin, Filter, Menu, X, ChevronRight,
  Sun, Cloud, Bell, Sparkles, User, Plus, Moon, HelpCircle, Mail,
  CreditCard, Shield, Globe, Calendar, Heart, ChevronLeft, Tag, FileText,
  Clock,
} from 'lucide-react';

// Components
import NotificationDropdown from '../components/common/NotificationDropdown';
import FilterPanel from '../components/common/FilterPanel';

// Context
import AuthContext from "../Context/AuthContext";
import BACKEND_API from "../Services/Backend";

// Constants & Config
const DASHBOARD_CONFIG = {
  NAV_ITEMS: [
    { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { key: 'wishlist', name: 'Wishlist', icon: Heart },
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
  const [error, setError] = useState(null);

  const fetchRecommendations = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await BACKEND_API.Recommend.GetRecommendation(userId);

      if (response && response.data) {
        // Check if the response has the expected data structure
        if (Array.isArray(response.data)) {
          setDestinations(response.data);
        } else if (response.data.recommendations && Array.isArray(response.data.recommendations)) {
          setDestinations(response.data.recommendations);
        } else {
          setDestinations([]);
        }
      } else {
        setDestinations([]);
      }
    } catch (error) {
      setError(error.message || 'Failed to load recommendations');
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { destinations, loading, error, refetch: fetchRecommendations };
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
      <div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 sm:max-w-50">
        <button
          onClick={onToggleSidebar}
          className="p-2 lg:hidden bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-2xl  font-extrabold bg-linear-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
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
              className={`p-2 rounded-xl transition-all relative ${showNotifications ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'
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
        className={`flex items-center space-x-2 cursor-pointer p-1.5 rounded-xl transition-all active:scale-95 ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'
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
          <p className="font-semibold text-gray-800 text-sm truncate max-w-20 sm:max-w-25">
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

const Sidebar = ({ isOpen, onClose, activeNav, onNavClick, onLogout, openFilterPanel }) => {
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
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-lg w-full text-left transition-all duration-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
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
        <div className="w-10 h-10 bg-linear-to-br from-teal-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl lg:text-2xl font-black bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
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
        onClick={() => onNavClick(item.key)} // This will call handleItemClick
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [specialDates, setSpecialDates] = useState([]);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate random special dates for demonstration
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate 5-8 random special dates
    const specials = [];
    const count = Math.floor(Math.random() * 4) + 5;

    for (let i = 0; i < count; i++) {
      specials.push(Math.floor(Math.random() * daysInMonth) + 1);
    }

    // Ensure today is always marked if it exists in the current month
    const today = new Date();
    if (today.getMonth() === month && today.getFullYear() === year) {
      if (!specials.includes(today.getDate())) {
        specials.push(today.getDate());
      }
    }

    setSpecialDates([...new Set(specials)].sort((a, b) => a - b));
  }, [currentDate]);

  // Generate calendar days
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get number of days in previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        isSpecial: false
      });
    }

    // Current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = today.getDate() === i &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      const isSpecial = specialDates.includes(i);

      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        isSpecial
      });
    }

    // Next month's leading days (to fill 42 slots - 6 weeks)
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        isSpecial: false
      });
    }

    setCalendarDays(days);
  }, [currentDate, specialDates]);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      console.log(`Date clicked: ${day.date}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-4 sm:p-5 md:p-6 rounded-2xl shadow-md bg-gray-50 w-full max-w-sm mx-auto mb-3"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </motion.button>

          <h3 className="text-sm sm:text-base font-semibold text-gray-800 mx-2">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigateMonth(1)}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToToday}
          className="px-2 py-1 text-[10px] sm:text-xs font-medium rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
        >
          Today
        </motion.button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2 text-[10px] sm:text-xs text-center">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="font-semibold text-gray-600 uppercase tracking-wide py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((day, index) => (
          <motion.div
            key={index}
            whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
            whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
            onClick={() => handleDateClick(day)}
            className={`
              flex items-center justify-center aspect-square rounded-full
              transition-all duration-200 text-xs sm:text-sm
              ${!day.isCurrentMonth
                ? "text-transparent pointer-events-none"
                : day.isToday
                  ? "bg-teal-500 text-white font-semibold shadow-sm"
                  : day.isSpecial
                    ? "border border-teal-300 text-gray-800 font-medium bg-white hover:bg-gray-50 cursor-pointer"
                    : "text-gray-700 hover:bg-white cursor-pointer"
              }
            `}
          >
            {day.date}
          </motion.div>
        ))}
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

const DestinationsGrid = ({ destinations, loading, searchTerm, onDestinationSelect }) => {
  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = searchTerm === '' ||
        dest.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [destinations, searchTerm]);

  if (loading) {
    return <LoadingState />;
  }

  if (filteredDestinations.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
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
        .slice(0, 4)
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

const EmptyState = ({ searchTerm }) => {
  const hasSearchTerm = searchTerm.trim() !== '';

  return (
    <div className="col-span-full py-12 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full mb-4">
        <Search className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {hasSearchTerm ? 'No matching destinations found' : 'No destinations available'}
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        {hasSearchTerm
          ? `We couldn't find any destinations matching "${searchTerm}". Try adjusting your search.`
          : 'There are currently no destinations available. Please check back later.'}
      </p>
    </div>
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

    </div>
  );
};

// Main Component
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
  const [filterPanels, setFilterPanels] = useState([]); // This state already exists

  const { destinations, loading } = useDestinations(user?._id || user?.id);

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

  const handleNavLinkClick = useCallback((key) => {
    setActiveNav(key);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Function to open FilterPanel
  const openFilterPanel = useCallback(() => {
    const newPanelId = Date.now().toString();
    setFilterPanels(prev => [...prev, newPanelId]);
    console.log("Opening FilterPanel from sidebar...");
  }, []);

  // Function to close specific FilterPanel
  const closeFilterPanel = useCallback((panelId) => {
    setFilterPanels(prev => prev.filter(id => id !== panelId));
  }, []);

  const handleItemClick = useCallback((key) => {
    switch (key) {
      case "favorite":
        openFilterPanel(); // This will open the FilterPanel
        break;
      case "setting":
        navigate("/settings");
        break;
      case "wishlist":
        navigate("/profile/wishlist");
        break;
      case "transaction":
        navigate("/profile/transaction");
        break;
      case "history":
        navigate("/profile/history");
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
    <div className="min-h-screen bg-gray-100 relative">
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
            openFilterPanel={openFilterPanel} // Add this
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

            <div className="p-4 sm:p-6 lg:p-8 grow">
              <WelcomeSection userName={getUserDisplayName()} />

              <DestinationsGrid
                destinations={destinations}
                loading={loading}
                searchTerm={searchTerm}
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

      {/* FilterPanels */}
      <AnimatePresence>
        {filterPanels.map((panelId) => (
          <FilterPanel
            key={panelId}
            isOpenProp={true}
            onClose={() => closeFilterPanel(panelId)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

const WelcomeSection = ({ userName }) => (
  <motion.div variants={DASHBOARD_CONFIG.ANIMATION.ITEM_VARIANTS}>
    <h1 className="text-4xl font-extrabold bg-linear-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent py-2">
      Hello, {userName}
    </h1>
    <p className="text-gray-500 text-sm font-bold p-2 mb-4">Welcome back and explore the world</p>
    <div className="text-center my-10">
      <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-500 via-teal-500 to-indigo-500 bg-clip-text text-transparent">
        Best Destinations
      </h2>
    </div>


  </motion.div>
);


const DetailModal = ({ item, onClose }) => {
  if (!item) return null;

  // Destructure with proper fallbacks for your data structure
  const {
    name = 'Unnamed Destination',
    region = 'Region not specified',
    country = 'Country not specified',
    image_url = 'https://placehold.co/600x400/4CAF50/ffffff?text=No+Image',
    type = 'Destination',
    average_cost_per_day = 0,
    safety_rating = 0,
    best_time_to_visit = [],
    description = 'No description available for this destination.',
    currency = 'INR',
    visa_requirements = 'Information not available'
  } = item;

  // Calculate rating from safety_rating (scaled to 5)
  const calculateRating = (safety) => Math.min(5, (safety / 10) * 5);
  const rating = calculateRating(safety_rating);

  // Format currency symbol
  const getCurrencySymbol = (curr) => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return symbols[curr] || curr;
  };

  // Generate star rating display
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : i < rating
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gray-300'
          }`}
      />
    ));
  };

  // Format safety rating with color indicator
  const getSafetyColor = (rating) => {
    if (rating >= 8) return 'text-emerald-600 bg-emerald-50';
    if (rating >= 6) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
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
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="relative h-48 md:h-56 w-full shrink-0">
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400/4CAF50/ffffff?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {type}
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-transform hover:scale-110"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5">{name}</h2>
            <div className="flex items-center text-white/90">
              <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
              <span className="text-sm md:text-base truncate">{region}, {country}</span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Rating and Price */}
            <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center mb-3 md:mb-0">
                <div className="flex mr-2">
                  {renderStars(rating)}
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-700">
                    {rating.toFixed(1)} / 5.0
                  </div>
                  <div className="text-xs text-gray-500">Based on safety rating</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Average cost per day</div>
                <div className="text-2xl font-bold text-emerald-600">
                  {getCurrencySymbol(currency)} {average_cost_per_day?.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500"> / day</span>
                </div>
              </div>
            </div>

            {/* Safety Rating with visual indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Safety Rating</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSafetyColor(safety_rating)}`}>
                  {safety_rating?.toFixed(1)} / 10
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${safety_rating >= 8 ? 'bg-emerald-500' :
                      safety_rating >= 6 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${safety_rating * 10}%` }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                About {name}
              </h3>
              <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">
                {description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {best_time_to_visit?.length > 0 && (
                <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Best Time to Visit</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {best_time_to_visit.map((month, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-full"
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Wallet className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Cost Information</div>
                    <div className="font-semibold text-gray-900">
                      {getCurrencySymbol(currency)} {average_cost_per_day?.toLocaleString()} / day
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  All prices in {currency}
                </div>
              </div>

              <div className="bg-linear-to-br from-purple-50 to-violet-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Location</div>
                    <div className="font-semibold text-gray-900">{region}, {country}</div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Visa Requirements</div>
                    <div className="font-semibold text-gray-900">{visa_requirements}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-gray-400 text-center mb-6">
              Last updated: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        {/* Sticky Action Buttons */}
        <div className="p-6 border-t border-gray-100 bg-white lg:sticky bottom-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 p-2 md:p-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Plan My Visit
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 p-2 md:p-4 bg-white border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Save for Later
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
