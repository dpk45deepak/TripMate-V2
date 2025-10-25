import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "You have a new message from your friend.",
      type: "info",
    },
    {
      id: 2,
      title: "Trip Plan Approved",
      description: "Your travel destination has been confirmed!",
      type: "success",
    },
    {
      id: 3,
      title: "Server maintenance",
      description: "Scheduled maintenance at 10 PM tonight.",
      type: "warning",
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
      onClick={() => setOpen(!open)}
      className="relative p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 group">
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          3
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white shadow-xl rounded-2xl border border-indigo-100 z-50"
          >
            <div className="px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-indigo-700">
                Notifications
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-indigo-500 hover:text-indigo-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-indigo-50 transition"
                  >
                    {n.type === "success" ? (
                      <CheckCircle className="text-teal-500 mt-1" size={20} />
                    ) : n.type === "warning" ? (
                      <XCircle className="text-indigo-500 mt-1" size={20} />
                    ) : (
                      <Bell className="text-teal-400 mt-1" size={20} />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500">{n.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No new notifications
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-indigo-100 bg-indigo-50 text-center">
              <button
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                View all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
