import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  PlusCircle,
  Thermometer,
  Cloud,
  Plane,
  MapPin,
  Backpack,
  Camera,
  Laptop,
  Shirt,
  Pill,
} from "lucide-react";

export default function TravelDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
    }),
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.5 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "70%",
      transition: { duration: 1.5, ease: "easeOut", delay: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6"
      >
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {["Discover", "Dashboard", "Your Trips", "Archive"].map((tab, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base ${
                tab === "Dashboard"
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 shadow"
              }`}
            >
              {tab}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-yellow-200 text-gray-800 font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <PlusCircle size={16} className="sm:w-4 sm:h-4" /> New Trip
          </motion.button>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300"
          />
        </div>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {/* Trip Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="col-span-1 xs:col-span-2 lg:col-span-2 xl:col-span-1 bg-gradient-to-br from-gray-800 to-gray-600 text-white rounded-xl p-4 sm:p-6 shadow relative"
        >
          <p className="font-bold text-base sm:text-lg">Hey Ashik! 👋</p>
          <h2 className="text-lg sm:text-xl font-bold mt-2 leading-tight">
            Welcome To Your Nepal Adventure!
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            “The mountains are calling and I must go.” — John Muir
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-3 py-1 bg-black/30 border border-white text-white text-xs rounded"
          >
            Nepal
          </motion.button>
        </motion.div>

        {/* Budget */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-white rounded-xl p-4 sm:p-6 shadow flex flex-col items-center justify-center"
        >
          <h3 className="font-bold mb-2 text-sm sm:text-base">Budget</h3>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="#e5e7eb" strokeWidth="8" fill="none" />
              <motion.circle
                cx="50%"
                cy="50%"
                r="40%"
                stroke="#047857"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251"
                strokeDashoffset="75"
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 75 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.p
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                className="font-bold text-green-700 text-sm sm:text-base"
              >
                <CountUp end={70} duration={2} suffix="%" />
              </motion.p>
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xs text-gray-600 mt-2"
          >
            $1,400 / $2,000
          </motion.p>
        </motion.div>

        {/* Expenses */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-white rounded-xl p-4 sm:p-6 shadow"
        >
          <h3 className="font-bold mb-2 text-sm sm:text-base">Expenses</h3>
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-xs sm:text-sm text-gray-700 space-y-2"
          >
            {[
              { icon: "✈️", text: "Air ticket", amount: 230 },
              { icon: "🚖", text: "Taxi rent", amount: 10 },
              { icon: "🍔", text: "King Burger", amount: 12 },
              { icon: "🥾", text: "Trekking gear", amount: 95 }
            ].map((expense, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex justify-between items-center"
              >
                <span>{expense.icon} {expense.text}</span>
                <span className="font-medium">${expense.amount}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-3 pt-2 border-t border-gray-200"
          >
            <div className="flex justify-between text-xs font-bold">
              <span>Total:</span>
              <span>$<CountUp end={347} duration={2} /></span>
            </div>
          </motion.div>
        </motion.div>

        {/* Readiness */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-yellow-200 rounded-xl p-4 sm:p-6 shadow flex flex-col justify-center items-center"
        >
          <h3 className="font-bold mb-2 text-sm sm:text-base">Readiness</h3>
          <motion.p 
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl font-bold"
          >
            <CountUp end={17} duration={2} />
          </motion.p>
          <p className="text-xs sm:text-sm text-gray-700">Days left</p>
        </motion.div>

        {/* Destinations */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-white rounded-xl p-4 sm:p-6 shadow"
        >
          <h3 className="font-bold mb-3 text-sm sm:text-base">Destinations</h3>
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="text-xs sm:text-sm space-y-2 text-gray-700"
          >
            {["Kathmandu", "Pokhara", "Chitwan", "Everest"].map((d, i) => (
              <motion.li 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-center gap-2"
              >
                <MapPin size={12} className="text-green-600" /> {d}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Weather */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-indigo-100 rounded-xl p-4 sm:p-6 shadow flex flex-col justify-center"
        >
          <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
            <Thermometer size={14} className="sm:w-4 sm:h-4" /> Kathmandu
          </h3>
          <motion.p
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-3xl font-bold"
          >
            <CountUp end={13} duration={2} suffix="°C" />
          </motion.p>
          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 mt-1">
            <Cloud size={12} className="sm:w-3 sm:h-3" /> Mostly cloudy
          </p>
        </motion.div>

        {/* Flight */}
        <motion.div
          custom={6}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-purple-700 text-white rounded-xl p-4 sm:p-6 shadow flex flex-col justify-between"
        >
          <h3 className="font-bold mb-3 text-sm sm:text-base">Flights</h3>
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs sm:text-sm"
            >
              12 May, 2:30 PM — Dhaka → Kathmandu
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xs sm:text-sm"
            >
              22 May, 9:30 AM — Kathmandu → Delhi
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 mt-3"
          >
            <Plane size={14} />
            <span className="text-xs">2 flights booked</span>
          </motion.div>
        </motion.div>

        {/* Packing List */}
        <motion.div
          custom={7}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="bg-black text-white rounded-xl p-4 sm:p-6 shadow"
        >
          <h3 className="font-bold mb-3 text-sm sm:text-base">Packing List</h3>
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="text-xs sm:text-sm space-y-2"
          >
            {[
              { icon: Backpack, text: "Backpack" },
              { icon: Camera, text: "Camera & GoPro" },
              { icon: Laptop, text: "Laptop & Charger" },
              { icon: Shirt, text: "Winter Jacket" },
              { icon: Pill, text: "Medical Aid" }
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-center gap-2"
              >
                <item.icon size={12} className="sm:w-3 sm:h-3" /> {item.text}
              </motion.li>
            ))}
          </motion.ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-3 py-2 sm:px-4 sm:py-2 bg-yellow-400 text-black rounded-lg text-xs sm:text-sm font-medium"
          >
            + New Reminder
          </motion.button>
        </motion.div>

        {/* Days & Activity */}
        <motion.div
          custom={8}
          variants={cardVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="col-span-1 xs:col-span-2 lg:col-span-2 xl:col-span-2 bg-white rounded-xl p-4 sm:p-6 shadow"
        >
          <h3 className="font-bold mb-3 text-sm sm:text-base">Days & Activity</h3>
          <motion.ul 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-xs sm:text-sm space-y-3 text-gray-700"
          >
            {[
              "Day 1: Arrival in Kathmandu — Check in & rest.",
              "Day 2: Kathmandu Sightseeing",
              "Day 3: Bhaktapur & Nagarkot",
              "Day 4: Travel to Pokhara",
              "Day 5: Pokhara Exploration"
            ].map((activity, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <span className="font-bold">{activity.split(":")[0]}:</span> {activity.split(":")[1]}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Additional Stats Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Items Packed", value: 23, max: 30 },
          { label: "Activities Planned", value: 8, max: 12 },
          { label: "Photos Taken", value: 156, max: 200 },
          { label: "Local Friends", value: 5, max: 10 }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg p-4 shadow text-center"
          >
            <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
            <p className="text-lg font-bold">
              <CountUp end={stat.value} duration={1.5} />
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <motion.div 
                className="bg-green-600 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stat.value/stat.max)*100}%` }}
                transition={{ duration: 1, delay: 1 + i * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}