import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, AlertTriangle, Info, ThumbsUp } from 'lucide-react';

export default function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Message',
      message: 'You have a new message from Sarah',
      time: '2m ago',
      read: false,
      type: 'message'
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your booking for Green Safari has been confirmed',
      time: '1h ago',
      read: true,
      type: 'success'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Your payment of $450 has been received',
      time: '3h ago',
      read: true,
      type: 'payment'
    },
    {
      id: 4,
      title: 'Trip Reminder',
      message: 'Your trip to Green Valley starts in 2 days',
      time: '1d ago',
      read: false,
      type: 'reminder'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <ThumbsUp className="w-4 h-4 text-green-500" />;
      case 'message':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'payment':
        return <Check className="w-4 h-4 text-purple-500" />;
      case 'reminder':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {unreadCount} New
                </span>
              )}
              <button 
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all as read
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {notification.message}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete notification
                          setNotifications(notifications.filter(n => n.id !== notification.id));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">No new notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-center">
            <a href="/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              View all notifications
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
