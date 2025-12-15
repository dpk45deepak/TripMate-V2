import React, { useState, useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AuthContext from "../../Context/AuthContext";

export default function ChatSection() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "Hey! Ready for your next adventure? 🌍 I'm here to help you plan the perfect trip. Whether you're looking for beaches, mountains, or culture — I've got you!",
      timestamp: new Date(),
    },
  ]);

  const quickActions = [
    {
      label: "Discover Places",
      icon: "🌍",
      color: "from-purple-500 via-purple-600 to-purple-700",
      description: "Find hidden gems",
    },
    {
      label: "Book Flights",
      icon: "✈️",
      color: "from-blue-500 via-cyan-500 to-blue-600",
      description: "Best deals",
    },
    {
      label: "Top Restaurants",
      icon: "🍽️",
      color: "from-pink-500 via-rose-500 to-red-500",
      description: "Local cuisine",
    },
    {
      label: "Luxury Stays",
      icon: "🏨",
      color: "from-amber-500 via-orange-500 to-yellow-500",
      description: "Premium hotels",
    },
  ];

  const getUserInitial = () => user?.username?.[0] || user?.email?.[0] || "U";

  const getUserDisplayName = () => {
    if (user?.username) return user.username;
    if (user?.email) return user.email.split("@")[0].split(".")[0];
    return "Traveler";
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const aiResponse =
        "That's an amazing choice! Let me pull up the best travel insights for you...";

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "ai",
          content: aiResponse,
          timestamp: new Date(),
        },
      ]);

      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (action) => {
    const quickMessage = {
      id: messages.length + 1,
      type: "user",
      content: `Tell me about ${action.label.toLowerCase()}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, quickMessage]);
  };

  return (
    <div className="bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-6 lg:p-8 flex flex-col gap-6 h-full relative overflow-hidden">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-2"
      >
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent p-2">
            Where to today,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {getUserDisplayName()}?
            </span>
          </h2>
          <p className="text-gray-700 mt-2 opacity-80 text-sm">
            Your AI Travel Companion ✦ Let’s plan something awesome
          </p>
        </div>

        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl">
          {getUserInitial()}
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-5 max-h-[450px]">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className={`p-5 rounded-3xl max-w-xl ${
              msg.type === "ai"
                ? "bg-gradient-to-r from-indigo-50/70 to-blue-50/70 border border-blue-100 text-gray-800 shadow-lg"
                : "bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-auto shadow-lg"
            }`}
          >
            {/* Message Header */}
            <div className="flex items-center gap-3 mb-2">
              {msg.type === "ai" ? (
                <>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">
                    AI
                  </div>
                  <span className="font-semibold text-sm opacity-80">
                    TripMate AI
                  </span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-white/20 text-white rounded-2xl flex items-center justify-center font-bold backdrop-blur">
                    {getUserInitial()}
                  </div>
                  <span className="font-semibold text-sm opacity-80">You</span>
                </>
              )}
            </div>

            {/* Content */}
            <p className="leading-relaxed text-[15px]">{msg.content}</p>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-gray-600"
          >
            <div className="w-10 h-10 bg-blue-500/80 text-white rounded-2xl flex items-center justify-center">
              AI
            </div>
            <div className="flex gap-1">
              <motion.span
                className="w-2 h-2 bg-gray-500 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
              <motion.span
                className="w-2 h-2 bg-gray-500 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              />
              <motion.span
                className="w-2 h-2 bg-gray-500 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              />
            </div>
          </motion.div>
        )}

        <div ref={messageEndRef}></div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3 text-lg">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleQuickAction(action)}
              className={`p-4 rounded-2xl shadow-lg bg-gradient-to-br ${action.color} text-white flex flex-col gap-1 items-center`}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-semibold text-sm">{action.label}</span>
              <span className="text-xs opacity-80">{action.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="relative mt-2">
        <input
          type="text"
          placeholder="Ask TripMate anything…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
          className="w-full p-4 pr-14 rounded-2xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition"
        >
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
