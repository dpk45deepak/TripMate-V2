// Footer.jsx
import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 rounded-t-3xl mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Powered By */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Powered By</h3>
          <p className="text-gray-400 text-sm">Usa turistor</p>
        </div>

        {/* Call Center */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Call center</h3>
          <p className="text-gray-400 text-sm">International call center</p>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 rounded-lg text-gray-900 flex-1"
            />
            <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white">
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-6 pt-4 pb-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <div className="flex space-x-4 text-gray-400 text-sm mb-2 md:mb-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
        </div>
        <p className="text-gray-500 text-sm mb-2 md:mb-0">© 2024 All Rights Reserved</p>
        <div className="flex space-x-4">
          <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
          <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
