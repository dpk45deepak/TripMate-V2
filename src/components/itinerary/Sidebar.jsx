import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  ChatBubbleLeftIcon,
  BellIcon,
  HomeIcon,
  HeartIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon as ChatBubbleSolid,
  HeartIcon as HeartSolid,
  GlobeAltIcon as GlobeSolid,
  PlusCircleIcon as PlusCircleSolid,
  BellIcon as BellSolid,
} from "@heroicons/react/24/solid";
import AuthContext from "../../Context/AuthContext";

export default function Sidebar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const { user } = useContext(AuthContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarItems = [
    {
      icon: <HomeIcon className="w-6 h-6" />,
      label: "Main",
      solidIcon: <HomeIcon className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
      label: "Chat",
      solidIcon: <ChatBubbleSolid className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      label: "Explore",
      solidIcon: <GlobeSolid className="w-6 h-6" />,
      color: "text-green-500",
    }
  ];

  const getUserInitial = () => {
    return user?.username?.[0] || user?.email?.[0] || "U";
  };

  const getUserDisplayName = () => {
    if (user?.username) return user.username;
    if (user?.email) {
      return user.email.split('@')[0].split('.')[0];
    }
    return "Traveler";
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-80 p-6 bg-white/80 backdrop-blur-lg shadow-xl flex-col gap-6 fixed lg:sticky top-0 h-screen z-30 ${
          isMobileOpen ? "flex" : "hidden lg:flex"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            TripMate.ai
          </motion.h1>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {sidebarItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.label);
                setIsMobileOpen(false);
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                activeTab === item.label
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {activeTab === item.label ? item.solidIcon : item.icon}
              <span className="font-semibold">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Premium Banner */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-white"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">👑</span>
            </div>
            <div>
              <p className="font-bold">Go Premium</p>
              <p className="text-xs opacity-90">Unlock exclusive features</p>
            </div>
          </div>
          <button className="w-full mt-3 py-2 bg-white text-orange-500 rounded-xl font-semibold hover:bg-gray-100 transition">
            Upgrade Now
          </button>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white mt-auto"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="font-bold text-white text-lg">
                {getUserInitial()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">
                {getUserDisplayName()}
              </p>
              <p className="text-white/80 text-sm">
                @{getUserDisplayName().toLowerCase()}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-xl transition">
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all z-40"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
}