import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    Search,
    Bell,
    User,
    Settings,
    LogOut,
    Globe,
    MapPin,
    Calendar,
    Heart,
    Sparkles,
    ChevronDown,
    Moon,
    Sun,
} from "lucide-react";

// Global Context
import AuthContext from "../../../Context/AuthContext";
import Nav_Search from '../../../components/HomePage/Nav_Search';
import FilterPanel from "../../common/FilterPanel";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    // Use Context
    const { user, logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [filterPanels, setFilterPanels] = useState([]);

    const navigate = useNavigate();

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const header = document.querySelector("header");
            if (isOpen && header && !header.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleDropdownClickOutside = (event) => {
            if (showDropdown && !event.target.closest(".profile-dropdown")) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleDropdownClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleDropdownClickOutside);
    }, [showDropdown]);

    const navItems = [
        { name: "Home", href: "/home", icon: Sparkles },
        { name: "Memories", href: "/itinerary/memories", icon: Heart },
        { name: "Planner", href: "/itinerary/planner", icon: MapPin },
        { name: "Profile", href: "/profile", icon: User },
    ];

    const handleNavClick = (itemName) => {
        setActiveLink(itemName.toLowerCase());
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const handleLogout = () => {
        console.log("Logging out...");
        logout();
        setShowDropdown(false);
    };

    // Function to open FilterPanel
    const openFilterPanel = () => {
        const newPanelId = Date.now().toString();
        setFilterPanels(prev => [...prev, newPanelId]);
        setShowDropdown(false); // Close dropdown when opening filter panel
    };

    // Function to close specific FilterPanel
    const closeFilterPanel = (panelId) => {
        setFilterPanels(prev => prev.filter(id => id !== panelId));
    };

    const openSettingPage = () => {
        console.log("Opening settings page...");
        navigate("/settings");
    };

    // Toggle theme function (placeholder)
    const toggleTheme = (isDark) => {
        console.log("Theme toggled to:", isDark ? "dark" : "light");
        // Implement your theme logic here
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
                : 'bg-white/80 backdrop-blur-lg'
                }`}
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo Section */}
                    <motion.div
                        className="flex items-center space-x-3 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => navigate("/home")}
                    >
                        <div className="relative">
                            <div className="p-2.5 bg-linear-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-linear-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                TripMate
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">Travel Smart</p>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleNavClick(item.name)}
                                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${activeLink === item.name.toLowerCase()
                                        ? 'bg-linear-to-r from-blue-50 to-cyan-50 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                    {activeLink === item.name.toLowerCase() && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"
                                        />
                                    )}
                                </motion.a>
                            );
                        })}
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">

                        {/* Search */}
                        <div className="hidden md:block relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                className="pl-10 pr-4 py-2.5 w-64 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative profile-dropdown">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                        <img
                                            src={`https://placehold.co/40x40/0000FF/ffffff?text=${user.username
                                                ?.toString()[0]
                                                .toUpperCase()}`}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full object-cover border-2 border-white"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-linear-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {user.username
                                                ? user?.username
                                                : user.email?.includes(".")
                                                    ? user.email?.split(".")[0]
                                                    : user.email?.split("@")[0]}
                                        </span>
                                        <span className="text-xs text-gray-500">Premium Member</span>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {user.username
                                                ? user.username
                                                : user.email?.includes(".")
                                                    ? user.email?.split(".")[0]
                                                    : user.email?.split("@")[0]}
                                        </p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>

                                    <div className="py-2">
                                        <a
                                            href="/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            <span>My Profile</span>
                                        </a>
                                        <a
                                            href="/settings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </a>
                                        <button
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left rounded-lg mx-2"
                                            onClick={openFilterPanel}
                                        >
                                            <Heart className="w-4 h-4" />
                                            <span>Favorites</span>
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-100 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors rounded-lg mx-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t border-gray-200 bg-white"
                        >
                            <div className="px-4 py-3 space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => {
                                                handleNavClick(item.name);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeLink === item.name.toLowerCase()
                                                ? 'bg-linear-to-r from-blue-50 to-cyan-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium">{item.name}</span>
                                        </a>
                                    );
                                })}

                                {/* Mobile Search */}
                                <div className="px-4 pt-2">
                                    <div className="relative">
                                        <Nav_Search />
                                    </div>
                                </div>

                                {/* Mobile User Section */}
                                <div className="pt-3 border-t border-gray-200 space-y-3">
                                    <div className="flex items-center space-x-3 px-4 py-2">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={`https://placehold.co/40x40/0000FF/ffffff?text=${user.username
                                                        ?.toString()[0]
                                                        ?.toUpperCase()}`}
                                                    alt="Profile"
                                                    className="w-9 h-9 rounded-full object-cover border-2 border-white"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-linear-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {user.username
                                                    ? user.username
                                                    : user.email?.includes(".")
                                                        ? user.email?.split(".")[0]
                                                        : user.email?.split("@")[0]}
                                            </p>
                                            <p className="text-xs text-gray-500">Premium Member</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            className="flex items-center justify-center space-x-2 px-3 py-2 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium"
                                            onClick={openSettingPage}
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </button>
                                        <button
                                            onClick={openFilterPanel}
                                            className="flex items-center justify-center space-x-2 px-3 py-2 text-pink-600 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors text-sm font-medium"
                                        >
                                            <Heart className="w-4 h-4" />
                                            <span>Favorites</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center justify-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium col-span-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
        </motion.header>
    );
}