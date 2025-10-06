import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // modern icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-3 px-6 md:px-20 lg:px-50 flex items-center justify-between rounded-none md:rounded-xl rounded-xl my-1">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
          TripMate
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-10 font-medium text-gray-600">
        <a
          href="/home"
          className="relative text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full"
        >
          Home
        </a>
        <a href="/explore" className="hover:text-blue-600 transition-colors">
          Explore
        </a>
        <a href="/itinerary" className="hover:text-blue-600 transition-colors">
          Itinerary
        </a>
        <a href="/profile" className="hover:text-blue-600 transition-colors">
          Profile
        </a>
      </nav>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors">
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-md rounded-b-xl md:hidden flex flex-col space-y-4 px-10 py-4 font-medium text-gray-700 z-50">
          <a href="/home" className=" text-blue-500 hover:text-blue-600">
            Home
          </a>
          <a href="/explore" className="hover:text-blue-600">
            Explore
          </a>
          <a href="/itinerary" className="hover:text-blue-600">
            Itinerary
          </a>
          <a href="/profile" className="hover:text-blue-600">
            Profile
          </a>
          <hr className="border-gray-200" />
          <button className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
