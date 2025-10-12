import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  // Use Context
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    { name: "Explore", href: "/explore", icon: Globe },
    { name: "Itinerary", href: "/itinerary", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
    // { name: "Ping", href: "/ping", icon: MapPin, badge: " " }
  ];

  const handleNavClick = (itemName) => {
    setActiveLink(itemName.toLowerCase());
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setShowDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-90 transition-all duration-500 md:px-16 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-gray-100 py-2"
          : "bg-transparent backdrop-blur-sm py-2 lg:bg-white/95 lg:backdrop-blur-none lg:border-none"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item.name)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
                    activeLink === item.name.toLowerCase()
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      activeLink === item.name.toLowerCase()
                        ? "text-blue-500"
                        : "text-teal-500"
                    }`}
                  />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                      {item.badge}
                    </span>
                  )}
                  {activeLink === item.name.toLowerCase() && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Section - Search, Notifications, Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search destinations..."
                className="pl-10 pr-4 py-2.5 w-64 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white hover:border-gray-300"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                alert("Dark Mode Toggle Clicked");
                setDarkMode(!darkMode);
                toggleTheme(!darkMode);
              }}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all hidden duration-300"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <img
                    src={`https://placehold.co/40x40/0000FF/ffffff?text=${user.email
                      .toString()[0]
                      .toUpperCase()}`}
                    alt="Jemmy Max"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-gray-900">
                    {user.name
                      ? user.name
                      : user.email.includes(".")
                      ? user.email.split(".")[0]
                      : user.email.split("@")[0]}
                  </span>
                  <span className="text-xs text-gray-500">Premium Member</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name
                        ? user.name
                        : user.email.includes(".")
                        ? user.email.split(".")[0]
                        : user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <a
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </a>
                    <a
                      href="/favorites"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Heart className="w-4 h-4" />
                      <span>Favorites</span>
                    </a>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[80vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 space-y-3">
            {/* Mobile Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.name)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      activeLink === item.name.toLowerCase()
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        activeLink === item.name.toLowerCase()
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile User Section */}
            <div className="pt-3 border-t border-gray-200 space-y-3">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name
                      ? user.name
                      : user.email.includes(".")
                      ? user.email.split(".")[0]
                      : user.email.split("@")[0]}
                  </p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 px-3 py-2 text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )} */}
    </header>
  );
}
