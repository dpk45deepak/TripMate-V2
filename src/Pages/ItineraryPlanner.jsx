// File: TripItineraryPlanner.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

// Custom Button component
function Button({ children, onClick, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Custom Card component
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 ${className}`}>{children}</div>
  );
}

function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default function TripItineraryPlanner() {
  const [itinerary, setItinerary] = useState([]);
  const [day, setDay] = useState(1);
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const addActivity = () => {
    if (activity.trim() !== "") {
      const newItem = { day, activity, location, time, notes };
      setItinerary([...itinerary, newItem]);
      setActivity("");
      setLocation("");
      setTime("");
      setNotes("");
    }
  };

  const groupedItinerary = itinerary.reduce((acc, item) => {
    acc[item.day] = acc[item.day] ? [...acc[item.day], item] : [item];
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Trip Itinerary Planner
      </motion.h1>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <input
            type="number"
            min="1"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Day"
          />
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter activity"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Location"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Additional notes"
          rows="2"
        />
        <Button onClick={addActivity} className="w-full md:w-auto">
          Add Activity
        </Button>

        <div className="mt-8">
          {Object.keys(groupedItinerary).length === 0 ? (
            <p className="text-center text-gray-500">No activities planned yet. Start adding your itinerary!</p>
          ) : (
            Object.keys(groupedItinerary).map((day) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">Day {day}</h2>
                <div className="grid gap-4">
                  {groupedItinerary[day].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all border-l-4 border-blue-400">
                        <CardContent>
                          <h3 className="text-lg font-semibold text-gray-800">{item.activity}</h3>
                          {item.location && <p className="text-gray-600">📍 {item.location}</p>}
                          {item.time && <p className="text-gray-600">⏰ {item.time}</p>}
                          {item.notes && <p className="text-gray-500 italic">✏️ {item.notes}</p>}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}