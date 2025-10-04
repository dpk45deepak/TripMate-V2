import React, { useState } from 'react';
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
  Calendar,
  Filter,
  Menu,
  X,
  ChevronRight,
  Sun,
  Cloud,
} from 'lucide-react';

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
  { id: 1, title: 'Green Safari', location: 'Green Mountain', rating: 4.9, image: 'https://placehold.co/400x250/08A63D/ffffff?text=Mountain+View', color: 'bg-green-600' },
  { id: 2, title: 'Night Camping', location: 'Lightning lake', rating: 4.8, image: 'https://placehold.co/400x250/2E2E6A/ffffff?text=Night+Sky', color: 'bg-indigo-700' },
  { id: 3, title: 'Mount Climbing', location: 'Green Valley', rating: 5.0, image: 'https://placehold.co/400x250/4CAF50/ffffff?text=Climbing', color: 'bg-emerald-500' },
];

const destinations = [
  { id: 10, title: 'Green wood forest', location: 'Tilangauna', rating: 4.5, price: '999', image: 'https://placehold.co/60x60/88AA77/ffffff?text=Forest' },
  { id: 11, title: 'Green Forest Camp', location: 'Chennai', rating: 4.0, price: '799', image: 'https://placehold.co/60x60/338866/ffffff?text=Camp' },
  { id: 12, title: 'Desert Festival', location: 'Rajeshthan', rating: 4.8, price: '899', image: 'https://placehold.co/60x60/CC9933/ffffff?text=Desert' },
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
  hidden: { x: -200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- Modal Component ---
const DetailModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.8 }}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
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


// --- Calendar Component ---
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

// --- Schedule Item Component ---
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
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  </motion.div>
);

// --- Main App Component ---
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard'); // State for active navigation
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [selectedItem, setSelectedItem] = useState(null); // State for modal detail

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Search filtering logic
  const filteredDestinations = destinations.filter(dest =>
    dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchedule = scheduleItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigation Links in Sidebar
  const NavLink = ({ name, icon: Icon, linkKey, currentActive, onClick }) => {
    const active = linkKey === currentActive;
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ x: active ? 0 : 5 }}
        onClick={() => onClick(linkKey)}
        className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all 
            ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <Icon className="w-5 h-5" />
        <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-700'}`}>{name}</span>
      </motion.div>
    );
  };

  // Discount Banner in Sidebar
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

  // Feature Card (Green Safari, Night Camping, etc.)
  const FeatureCard = ({ title, location, rating, image, color, onClick }) => (
    <motion.div
      variants={itemVariants}
      onClick={onClick} // Added click handler
      whileHover={{ scale: 1.02 }}
      className={`relative h-64 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col justify-end p-4 transition-all duration-300 ease-in-out hover:shadow-2xl`}
    >
      {/* Placeholder image layer */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Dark overlay for text readability */}
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

  // Destination Item (Small list)
  const DestinationItem = ({ title, location, rating, price, image }) => (
    <motion.div variants={itemVariants} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer mb-2">
      <div className="flex items-center space-x-3">
        <img src={image} alt={title} className="w-12 h-12 rounded-lg object-cover" />
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
        <div className="flex items-center text-xs text-yellow-600">
          <Star className="w-3 h-3 fill-yellow-500" />
          <span className="ml-1">{rating}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 lg:hidden bg-emerald-500 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <motion.div
        className="mx-auto w-full bg-white rounded-3xl shadow-2xl p-4 lg:p-8 overflow-hidden relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:grid lg:grid-cols-[250px_1fr_300px] gap-8 h-full">

          {/* --- 1. Sidebar (Desktop/Mobile) --- */}
          <AnimatePresence>
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.div
                key="sidebar"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`
                  absolute lg:relative top-0 left-0 h-screen w-64 lg:w-auto 
                  bg-white z-40 p-4 lg:p-0 lg:border-r-0
                  ${isSidebarOpen ? 'block border-r' : 'hidden'} lg:block
                  overflow-y-auto
                `}
              >
                <motion.h1 variants={itemVariants} className="text-2xl font-extrabold text-gray-900 mt-2 mb-8">
                  <h1 className="text-2xl font-extrabold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2 mb-8">
                    TripMate
                  </h1>
                </motion.h1>
                <nav className="space-y-2">
                  {navItems.map(item => (
                    <NavLink
                      key={item.key}
                      name={item.name}
                      icon={item.icon}
                      linkKey={item.key}
                      currentActive={activeNav}
                      onClick={setActiveNav}
                    />
                  ))}
                </nav>
                <DiscountBanner />
                <motion.div variants={itemVariants} className="mt-12 pt-4 border-t border-gray-200">
                  <NavLink
                    name="Log out"
                    icon={LogOut}
                    linkKey="logout"
                    currentActive={activeNav}
                    onClick={() => console.log('Logged out')}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- 2. Main Dashboard Content --- */}
          <div className="col-span-1 p-4 lg:p-0">
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-700 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2 mb-8 py-2">
                Hello, Deepak
              </h1>
              <p className="text-gray-500 text-sm">Welcome back and explore the world</p>
            </motion.div>

            {/* Search Bar and User Profile */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="relative flex-grow w-full">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations or schedule..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Search state handler
                  className="w-full p-3 pl-12 border border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 transition"
                />
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <img src="https://placehold.co/40x40/4CAF50/ffffff?text=JM" alt="User" className="w-10 h-10 rounded-full object-cover" />
                <div className="hidden sm:block">
                  <p className="font-semibold text-gray-800 text-sm">Jemmy Max</p>
                  <p className="text-xs text-gray-500">Traveler Enthusiast</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featureCards.map((card, index) => (
                <FeatureCard
                  key={index}
                  {...card}
                  onClick={() => setSelectedItem(card)} // Open Modal on click
                />
              ))}
            </motion.div>

            {/* Best Destination & Filters */}
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

            {/* Destination List Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest, index) => (
                  <DestinationItem key={index} {...dest} />
                ))
              ) : (
                <p className="text-gray-500 mt-4 text-sm col-span-2">No destinations match "{searchTerm}"</p>
              )}
            </motion.div>
          </div>

          {/* --- 3. Right Panel (Calendar and Schedule) --- */}
          <div className="col-span-1 lg:p-0 border-t lg:border-t-0 lg:border-l border-gray-100 mt-8 lg:mt-0 px-10">
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-sm text-gray-400 text-right">...</p> {/* Placeholder for more menu */}
            </motion.div>

            <CalendarDisplay />

            <motion.div variants={itemVariants} className="mb-4 p-4">
              <h3 className="text-xl font-semibold text-gray-800">My Schedule</h3>
            </motion.div>

            <motion.div
              className="space-y-3 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item, index) => (
                  <ScheduleItem key={index} {...item} />
                ))
              ) : (
                <p className="text-gray-500 mt-2 text-sm">No schedules match "{searchTerm}"</p>
              )}
            </motion.div>

            {/* Let's Explore Banner - Placed here for layout matching */}
            <motion.div variants={itemVariants} className="mt-8 bg-gray-900 rounded-xl shadow-lg p-6 text-white text-center relative overflow-hidden">
              {/* Image Placeholder */}
              <img src="https://placehold.co/100x100/4CAF50/ffffff?text=Traveler" alt="Traveler" className="absolute top-0 right-0 h-full w-1/3 object-cover opacity-30" />

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
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          ></div>
        )}
      </motion.div>

      {/* Detail Modal component, shown only when an item is selected */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
