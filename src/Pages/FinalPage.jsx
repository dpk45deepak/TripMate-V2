import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Centralized Backend API file
import BACKEND_API from "../Services/Backend";
import ListView from '../components/FinalPage/ListView.jsx';
import DetailView from '../components/FinalPage/DetailView.jsx';


// Main FinalPage component (keep your existing FinalPage component)
// The enhanced version includes all the new components and improvements

// Main FinalPage component
const FinalPage = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [domesticTrips, setDomesticTrips] = useState([]);
  const [foreignTrips, setForeignTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔁 Function to fetch both trip preferences
  const getTripPreferences = async () => {
    try {
      setLoading(true);
      setError("");

      const [domesticRes, foreignRes] = await Promise.all([
        BACKEND_API.getDomesticPreferences(),
        BACKEND_API.getForeignPreferences(),
      ]);

      // Handle both array responses and object responses with data property
      const domesticData = Array.isArray(domesticRes)
        ? domesticRes
        : domesticRes?.data || [];
      const foreignData = Array.isArray(foreignRes)
        ? foreignRes
        : foreignRes?.data || [];

      setDomesticTrips(domesticData);
      setForeignTrips(foreignData);

      // If no data is available, show a message
      if (domesticData.length === 0 && foreignData.length === 0) {
        setError("No trip data available. Please check back later.");
      }
    } catch (err) {
      console.error("Error fetching trip preferences:", err);
      setError("Failed to fetch trip preferences. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Fetch when component loads
  useEffect(() => {
    getTripPreferences();
  }, []);

  const handleSelect = (destination) => {
    setSelectedDestination(destination);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedDestination(null);
    window.scrollTo(0, 0);
  };

  const handleToggleFavorite = (destinationId) => {
    setFavorites((prev) =>
      prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 font-sans antialiased p-4">
      <AnimatePresence mode="wait">
        {selectedDestination ? (
          <DetailView
            key="detail"
            destination={selectedDestination}
            onBack={handleBack}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <ListView
            key="list"
            onSelect={handleSelect}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            domesticTrips={domesticTrips}
            foreignTrips={foreignTrips}
            loading={loading}
            error={error}
          />
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default FinalPage;
