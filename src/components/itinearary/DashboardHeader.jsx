// src/components/DashboardHeader.jsx
import React, { useState } from 'react';
import {
    MapPin,
    Sparkles,
    Wallet,
    Bot,
    Calendar,
    ChevronDown,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navItems = [
        { icon: MapPin, label: 'Itinerary', active: true },
        { icon: Sparkles, label: 'Suggestions' },
        { icon: Wallet, label: 'Budget' },
        { icon: Bot, label: 'AI Assistant' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="lg:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <div className="flex items-center">
                                    {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6" />
              </div> */}
                                    <span className="ml-3 text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                        TripMate
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.label}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                                    ? 'bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700 border border-cyan-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </motion.button>
                        ))}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="hidden md:block relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg hover:bg-gray-100">
                            <Bell size={22} className="text-gray-600" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50"
                            >
                                <div className="h-9 w-9 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    JS
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="font-medium text-gray-900">John Smith</p>
                                    <p className="text-xs text-gray-500">Traveler</p>
                                </div>
                                <ChevronDown size={20} className="text-gray-500" />
                            </button>

                            <AnimatePresence>
                                {userMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="
                                                    absolute right-0 mt-3 w-52
                                                    rounded-2xl
                                                    bg-white/80
                                                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                                                    border border-blue-100
                                                    overflow-hidden
                                                "
                                    >
                                        {[
                                            { label: "Profile", icon: "👤" },
                                            { label: "My Trips", icon: "🧳" },
                                            { label: "Settings", icon: "⚙️" },
                                            { label: "Logout", icon: "🚪" },
                                        ].map((item, idx) => (
                                            <button
                                                key={item.label}
                                                className="
        group w-full flex items-center gap-3
        px-5 py-3 text-sm font-medium
        text-gray-700
        hover:bg-blue-50/60
        transition-all duration-200
      "
                                            >
                                                <span className="text-base">{item.icon}</span>
                                                <span className="group-hover:translate-x-0.5 transition-transform">
                                                    {item.label}
                                                </span>

                                                {/* divider */}
                                                {idx !== 3 && (
                                                    <span className="absolute left-4 right-4 bottom-0 h-px bg-blue-100/60" />
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>

                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t border-gray-200 mt-4 py-4"
                        >
                            <div className="space-y-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.label}
                                        className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${item.active
                                            ? 'bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default DashboardHeader;