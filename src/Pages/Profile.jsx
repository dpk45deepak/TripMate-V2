import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Ticket,
  Star,
  MessageSquare,
  Wallet,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  MapPin,
  Filter,
  Menu,
  X,
  ChevronRight,
  Sun,
  Cloud,
  Bell,
  User,
  Plus
} from 'lucide-react';

// Global Context
import AuthContext from "../Context/AuthContext";
import FilterPanel from "../components/FilterPanel";

// --- Static Data ---

const navItems = [
  { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { key: 'ticket', name: 'Ticket', icon: Ticket },
  { key: 'favorite', name: 'Favorite', icon: Star },
  { key: 'message', name: 'Message', icon: MessageSquare },
  { key: 'transaction', name: 'Transaction', icon: Wallet },
  { key: 'setting', name: 'Setting', icon: Settings },
];

const featureCards = [
  { id: 1, title: 'Green Safari', location: 'Green Mountain', rating: 4.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQroVTt14mdvCHXBrGHPzkm9ROZI5eJD_NH6w&s', color: 'bg-green-600' },
  { id: 2, title: 'Night Camping', location: 'Lightning lake', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT632_6m6XxAXxR_jPzJXeXv9lhdaam5Q7C7Q&s', color: 'bg-indigo-700' },
  { id: 3, title: 'Mount Climbing', location: 'Green Valley', rating: 5.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkDvj7r8rwNewrf4Olj8PpX6NzKsETsJTI4Q&s', color: 'bg-emerald-500' },
];

const destinations = [
  { id: 10, title: 'Green wood forest', location: 'Tilangauna', rating: 4.5, price: '999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLx7klwRMyT2UiLVrJSwxR_ZSbjZ1p3bU7DA&s' },
  { id: 11, title: 'Beauty of Beaches', location: 'Chennai', rating: 4.0, price: '799', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGsq2pWQK5wqczkL4u2DcwJDl1P-iQOi7zow&s' },
  { id: 12, title: 'Desert Festival', location: 'Rajeshthan', rating: 4.8, price: '899', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPgiXsbJGh5rEF5e3EECcMPV7h-g9FUl7pw&s' },
];

const scheduleItems = [
  { id: 20, title: 'Crooked Forest', date: '20 May - 23 May', weather: Cloud },
  { id: 21, title: 'Fem Waterfall', date: '22 May - 25 May', weather: Sun },
  { id: 22, title: 'Night Camping', date: '24 May - 28 May', weather: Cloud },
];

// --- Framer Motion Variants ---

const containerVariants = {
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
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sidebarVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

// --- Helper Components ---

const DashboardHeader = ({ searchTerm, setSearchTerm, toggleSidebar, iconLetter }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white sticky top-0 border-b border-gray-100 shadow-sm lg:shadow-none"
  >
    {/* Left Section: Menu Button and Title */}
    <div className="flex items-center justify-between w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 lg:hidden bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-all duration-200 active:scale-95"
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Title - Only visible on small screens */}
      <h1 className="text-2xl md:hidden font-extrabold bg-gradient-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Dashboard
      </h1>

      {/* Desktop Logo/Title - Hidden on mobile */}
      <div className="hidden lg:flex items-center space-x-2 ml-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">T</span>
        </div>
        <span className="md:text-sm font-extrabold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">TripMate</span>
      </div>
    </div>

    {/* Search Bar - Adaptive width */}
    <div className="relative w-full sm:flex-1 sm:max-w-2xl order-3 sm:order-2 mt-2 sm:mt-0">
      <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations, schedules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-11 pr-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white"
      />
      {/* Mobile search shortcut */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 sm:hidden">
        <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border border-gray-300">⌘</kbd>
      </div>
    </div>

    {/* Right Section: Profile and Actions */}
    <div className="flex items-center space-x-3 order-2 sm:order-3 w-full sm:w-auto justify-between sm:justify-end">
      {/* Notification and Quick Actions */}
      <div className="flex items-center space-x-2">
        {/* Notification Bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </motion.button>

        {/* Quick Add Button - Hidden on smallest screens */}
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

      {/* User Profile */}
      <div className="flex items-center space-x-2 cursor-pointer p-1.5 rounded-xl hover:bg-gray-50 transition-all active:scale-95">
        {/* Avatar with status indicator */}
        <div className="relative">
          <img
            src={`https://placehold.co/40x40/008080/ffffff?text=${iconLetter[0].toUpperCase()}`}
            alt="Jemmy Max"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></div>
        </div>

        {/* User Info - Hidden on very small screens */}
        <div className="hidden xs:block min-w-0 flex-1">
          <p className="font-semibold text-gray-800 text-sm truncate max-w-[80px] sm:max-w-[100px]">
            Jemmy Max
          </p>
          <p className="text-xs text-gray-500 truncate">Traveler</p>
        </div>

        {/* Dropdown Chevron - Hidden on mobile */}
        <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
      </div>
    </div>
  </motion.div>
);

const NavLink = ({ name, icon: Icon, linkKey, currentActive, onClick }) => {
  const active = linkKey === currentActive;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: active ? 0 : 5 }}
      onClick={() => onClick(linkKey)}
      className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200
        ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon className="w-5 h-5" />
      <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-700'}`}>{name}</span>
    </motion.div>
  );
};

const DetailModal = ({ item, onClose }) => {
  if (!item) return null;

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
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition z-10" aria-label="Close Modal">
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h2>
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4" />

        <div className="flex flex-wrap gap-4 text-gray-600 mb-4 border-b pb-4">
          <div className="flex items-center text-sm font-medium"><MapPin className="w-4 h-4 mr-1 text-emerald-500" /> {item.location}</div>
          <div className="flex items-center text-sm font-medium"><Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> {item.rating} Score</div>
          {item.price && <div className="font-extrabold text-lg text-emerald-600">${item.price}</div>}
        </div>

        <p className="text-gray-700 text-sm">
          This incredible destination offers a unique and unforgettable experience, blending lush landscapes with thrilling activities. Book your adventure now to enjoy the breathtaking views and exclusive discounts available this month!
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full p-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/50 hover:bg-emerald-600 transition"
        >
          Book Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const CalendarDisplay = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dates = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, null
  ];
  const specialDates = [21, 23, 24, 29, 30];

  return (
    <motion.div variants={itemVariants} className="p-4 rounded-xl shadow-lg bg-white mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">May 2025</h3>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {daysOfWeek.map(day => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}
        {dates.map((date, index) => (
          <div key={index} className={`p-1 rounded-full aspect-square flex items-center justify-center cursor-pointer
            ${date === 31 ? 'bg-emerald-500 text-white font-semibold' : ''}
            ${specialDates.includes(date) ? 'border border-emerald-400 text-gray-800 font-medium' : 'text-gray-600'}
            ${!date ? 'text-gray-300 pointer-events-none' : ''}
          `}>
            {date}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ScheduleItem = ({ title, date, weather: WeatherIcon }) => (
  <motion.div variants={itemVariants} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer mb-2">
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

export default function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterPanels, setFilterPanels] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavLinkClick = (key) => {
    setActiveNav(key);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const closeModal = () => setSelectedItem(null);

  const filteredDestinations = destinations.filter(dest =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchedule = scheduleItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // NEW: Function to open FilterPanel
  const openFilterPanel = () => {
    const newPanelId = Date.now().toString();
    setFilterPanels(prev => [...prev, newPanelId]);
  };

  // NEW: Function to close specific FilterPanel
  const closeFilterPanel = (panelId) => {
    setFilterPanels(prev => prev.filter(id => id !== panelId));
  };

  const FeatureCard = ({ id, title, location, rating, image, color, onClick }) => (
    <motion.div
      variants={itemVariants}
      onClick={() => onClick({ id, title, location, rating, image, color })}
      whileHover={{ scale: 1.02 }}
      className={`relative h-64 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all duration-300 ease-in-out hover:shadow-2xl`}
    >
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center space-x-2 text-sm mt-1">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1 mt-2">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
    </motion.div>
  );

  const DiscountBanner = () => (
    <motion.div variants={itemVariants} className="mt-8 p-4 bg-emerald-100 rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-emerald-200 opacity-20 transform -skew-y-3"></div>
      <div className="relative z-10">
        <h4 className="text-xl font-extrabold text-emerald-700">50% DISCOUNT</h4>
        <p className="text-xs text-emerald-600 mt-1">Get a discount on certain days and don't miss it.</p>
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

  const DestinationItem = ({ title, location, rating, price, image }) => (
    <motion.div variants={itemVariants} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer mb-2">
      <div className="flex items-center space-x-3">
        <img src={image} alt={title} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-800">Rs. {price}</p>
        <div className="flex items-center text-xs text-yellow-600 justify-end">
          <Star className="w-3 h-3 fill-yellow-500" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
    </motion.div>
  );

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
  };

  const handleItemClick = (key) => {
    if (key === "favorite") {
      console.log("Favorite clicked - opening FilterPanel");
      openFilterPanel(); // Open new FilterPanel instance
    }
    else if (key === "setting") {
      navigate("/settings");
    }
    else if (key === "ticket") {
      alert("Ticket functionality will be available soon");
    }
    else if (key === "transaction") {
      alert("Transaction functionality will be available soon");
    }
    else if (key === "message") {
      alert("Message functionality will be available soon");
    }
    else {
      handleNavLinkClick(key);
    }
  };

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:grid lg:grid-cols-[250px_1fr_300px] h-full min-h-screen">

          {/* Sidebar */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.div
                key="sidebar"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`
                  fixed lg:relative top-0 left-0 h-full w-64 
                  bg-white z-40 p-6 shadow-xl lg:shadow-none 
                  overflow-y-auto flex flex-col justify-between
                  ${isSidebarOpen ? 'block' : 'hidden'} lg:block
                `}
              >
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      TripMate
                    </h1>
                    <button onClick={toggleSidebar} className="lg:hidden p-1 rounded-full text-gray-700 hover:bg-gray-100" aria-label="Close Sidebar">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <nav className="space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleItemClick(item.key)}
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
                  <DiscountBanner />
                </div>

                <motion.div variants={itemVariants} className="mt-12 pt-4 border-t border-gray-200">
                  <NavLink
                    name="Log out"
                    icon={LogOut}
                    linkKey="logout"
                    currentActive={activeNav}
                    onClick={() => {
                      console.log('Logged out');
                      handleLogout();
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Dashboard Content */}
          <div className="col-span-1 flex flex-col overflow-y-auto">
            <DashboardHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              toggleSidebar={toggleSidebar}
              iconLetter={user.name ? user.name : user.email.includes('.') ? user.email.split('.')[0] : user.email.split('@')[0]}
            />

            <div className="p-4 sm:p-6 lg:p-8 flex-grow">
              <motion.div variants={itemVariants} className="mb-8 mt-4">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent py-2">
                  Hello,
                  {user.name ? user.name : user.email.includes('.') ? user.email.split('.')[0] : user.email.split('@')[0]}
                </h1>
                <p className="text-gray-500 text-sm">Welcome back and explore the world</p>
              </motion.div>

              <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                {featureCards.map((card) => (
                  <FeatureCard
                    key={card.id}
                    {...card}
                    onClick={setSelectedItem}
                  />
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-between items-center mb-4 mt-6">
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800">Best Destination</h3>
                  <p className="text-xs text-gray-500">
                    {filteredDestinations.length} Destination{filteredDestinations.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-emerald-500">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => (
                    <DestinationItem key={dest.id} {...dest} />
                  ))
                ) : (
                  <p className="text-gray-500 mt-4 text-sm col-span-2">No destinations match "{searchTerm}"</p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-1 p-4 lg:p-6 xl:p-8 border-t lg:border-t-0 lg:border-l border-gray-100 overflow-y-auto">
            <motion.div variants={itemVariants} className="mt-4 lg:mt-0">
              <p className="text-sm text-gray-400 text-right">...</p>
            </motion.div>

            <CalendarDisplay />

            <motion.div variants={itemVariants} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">My Schedule</h3>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item) => (
                  <ScheduleItem key={item.id} {...item} />
                ))
              ) : (
                <p className="text-gray-500 mt-2 text-sm">No schedules match "{searchTerm}"</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 bg-gray-900 rounded-xl shadow-lg p-6 text-white text-center relative overflow-hidden">
              <img src="https://placehold.co/100x100/4CAF50/ffffff?text=Traveler" alt="Traveler" className="absolute top-0 right-0 h-full w-1/3 object-cover opacity-30" loading="lazy" />
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
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* Multiple FilterPanels */}
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