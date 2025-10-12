import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftIcon,
  BellIcon,
  HeartIcon,
  GlobeAltIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon, // New icon for mobile menu
  HomeIcon, // New icon for bottom nav
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon as ChatBubbleSolid,
  HeartIcon as HeartSolid,
  GlobeAltIcon as GlobeSolid,
  HomeIcon as HomeSolid,
  PlusCircleIcon as PlusCircleSolid,
} from "@heroicons/react/24/solid";

// Global Context
import { AuthContext } from "../Context/AuthContext";

export default function TravelApp() {
  // Use Context
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("Chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);

  const sidebarItems = [
    {
      icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
      label: "Chat",
      solidIcon: <ChatBubbleSolid className="w-5 h-5" />,
    },
    {
      icon: <BellIcon className="w-5 h-5" />,
      label: "Notification",
      solidIcon: <BellIcon className="w-5 h-5" />,
    },
    {
      icon: <HeartIcon className="w-5 h-5" />,
      label: "Favourites",
      solidIcon: <HeartSolid className="w-5 h-5" />,
    },
    {
      icon: <GlobeAltIcon className="w-5 h-5" />,
      label: "Explore",
      solidIcon: <GlobeSolid className="w-5 h-5" />,
    },
    {
      icon: <PlusCircleIcon className="w-5 h-5" />,
      label: "Create a Trip",
      solidIcon: <PlusCircleSolid className="w-5 h-5" />,
    },
  ];

  // A simplified version for the bottom mobile navigation
  const mobileNavItems = [
    {
      label: "Chat",
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
      solidIcon: <ChatBubbleSolid className="w-6 h-6" />,
    },
    {
      label: "Explore",
      icon: <GlobeAltIcon className="w-6 h-6" />,
      solidIcon: <GlobeSolid className="w-6 h-6" />,
    },
    {
      label: "Create a Trip",
      icon: <PlusCircleIcon className="w-6 h-6" />,
      solidIcon: <PlusCircleSolid className="w-6 h-6" />,
    },
    {
      label: "Favourites",
      icon: <HeartIcon className="w-6 h-6" />,
      solidIcon: <HeartSolid className="w-6 h-6" />,
    },
  ];

  const quickActions = [
    {
      label: "Discover place",
      color: "bg-purple-100 text-purple-600",
      icon: "🔍",
    },
    {
      label: "Flight booking",
      color: "bg-green-100 text-green-600",
      icon: "✈️",
    },
    {
      label: "Best Restaurant",
      color: "bg-pink-100 text-pink-600",
      icon: "🍴",
    },
    { label: "Best Hotel", color: "bg-yellow-100 text-yellow-600", icon: "🏨" },
  ];

  const cards = [
    {
      id: 1,
      title: "Queensland, NewZealand",
      img: "https://c4.wallpaperflare.com/wallpaper/498/721/291/queenstown-new-zealand-lake-wakatipu-bay-mountains-city-wallpaper-preview.jpg",
      rating: 4.6,
      price: "$1,200",
      description: "Adventure capital of the world",
    },
    {
      id: 2,
      title: "Cape Town Adventure, South Africa",
      img: "https://cdn.craft.cloud/101e4579-0e19-46b6-95c6-7eb27e4afc41/assets/uploads/Guides/cape-town-frommers.jpg",
      rating: 4.5,
      price: "$980",
      description: "Table Mountain and coastal beauty",
    },
  ];

  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
      return newFavorites;
    });
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Mobile Header and Menu Button */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          TripMate.ai
        </h1>
        <button>
          <Bars3Icon className="w-7 h-7 text-gray-700" />
        </button>
      </div>

      {/* Sidebar - Conditionally rendered for mobile */}
      <AnimatePresence>
        {window.innerWidth >= 1024 && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`hidden md:block
              w-64 p-6 border-r bg-white/80 backdrop-blur-lg shadow-lg flex-col gap-6
              fixed lg:sticky top-0 h-screen z-40
            `}
          >
            {/* Close button for mobile */}
            <button className="absolute top-4 right-4 lg:hidden p-2 rounded-full hover:bg-gray-100 transition">
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>

            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TripMate.ai
            </motion.h1>

            <div className="relative my-4">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              {sidebarItems.map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    activeTab === item.label
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-blue-70 hover:text-blue-500"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-auto md:mt-50 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
              <div className="flex items-center gap-3">
                <img
                  src={`https://placehold.co/40x40/008080/ffffff?text=${user.email
                    .toString()[0]
                    .toUpperCase()}`}
                  alt="Jemmy Max"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-bold">
                    {" "}
                    {user.username
                      ? user.username
                      : user.email.includes(".")
                      ? user.email.split(".")[0]
                      : user.email.split("@")[0]}
                  </p>
                  <p className="text-xs opacity-90">
                    @
                    {user.username
                      ? user.username
                      : user.email.includes(".")
                      ? user.email.split(".")[0]
                      : user.email.split("@")[0]}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 lg:mb-0">
        {/* Chat Section */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col gap-6 h-screen">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Where to today,
              {user.nothing ? user.username : " "}
              {user.username
                ? user.username
                : user.email.includes(".")
                ? user.email.split(".")[0]
                : user.email.split("@")[0]}
              ?
            </h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <img
                  src={`https://placehold.co/40x40/008080/ffffff?text=${user.email
                    .toString()[0]
                    .toUpperCase()}`}
                  alt=
                  {user.username
                    ? user.username
                    : user.email.includes(".")
                    ? user.email.split(".")[0]
                    : user.email.split("@")[0]}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-gray-700 border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <span className="font-semibold">TripMate AI</span>
              </div>
              Hey Elon! Ready for your next adventure? 🌍 I'm here to help you
              plan the perfect trip. Ask me anything about destinations,
              flights, or accommodations!
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="self-end p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl max-w-sm lg:max-w-md text-white shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={`https://placehold.co/40x40/008080/ffffff?text=${user.email
                    .toString()[0]
                    .toUpperCase()}`}
                  alt={
                    user.username
                      ? user.username
                      : user.email.includes(".")
                      ? user.email.split(".")[0]
                      : user.email.split("@")[0]
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="font-semibold">You</span>
              </div>
              What's the best island in Hawaii for a family vacation? Include a
              comparison of all the islands.
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-600 mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-xl font-medium shadow-lg transition-all flex items-center gap-2 text-sm lg:text-base ${action.color}`}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-auto relative">
            <input
              type="text"
              placeholder="Ask TripMate about your next destination..."
              className="w-full p-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <ChatBubbleLeftIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-6">
          {/* Promo Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="Travel"
              className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div>
                <h3 className="text-white text-xl font-bold mb-1">
                  Travel Differently
                </h3>
                <p className="text-white/80 text-sm">
                  Explore unique experiences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recommended Destinations */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Recommended Destinations
              </h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {filteredCards.length} results
              </span>
            </div>

            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 cursor-pointer group"
                    >
                      <div className="relative">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="h-32 w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <button
                          onClick={() => toggleFavorite(card.id)}
                          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition"
                        >
                          {favorites.has(card.id) ? (
                            <HeartSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
                          <span className="text-xs">⭐ {card.rating}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {card.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-600">
                            {card.price}
                          </span>
                          <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition">
                            Explore
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No destinations found.
                  </p>
                )}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg shadow-lg flex justify-around items-center z-50">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className="flex flex-col items-center justify-center p-2 text-xs transition-all duration-300"
          >
            <span
              className={
                activeTab === item.label ? "text-blue-500" : "text-gray-400"
              }
            >
              {activeTab === item.label ? item.solidIcon : item.icon}
            </span>
            <span
              className={`font-medium mt-1 ${
                activeTab === item.label ? "text-blue-500" : "text-gray-600"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3"
          >
            <HeartSolid className="w-5 h-5" />
            <span>Added to favorites!</span>
            <button onClick={() => setShowNotification(false)} className="ml-2">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
