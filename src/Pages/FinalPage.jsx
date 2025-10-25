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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  // 🔁 Function to fetch both trip preferences
  const getTripPreferences = async () => {
    try {
      setLoading(true);
      setError("");
      setDomesticTrips([]);
      setForeignTrips([]);

      // console.log('Fetching destinations from:', BACKEND_API.Destinations.GetDestinations.toString());

      // Fetch destinations from the backend
      let response;
      try {
        response = await BACKEND_API.Destinations.GetDestinations();
        // console.log('API Response:', response);
      } catch (err) {
        console.error('API Call Failed:', err);
        throw new Error(`Network error: ${err.message}`);
      }

      // Validate response structure
      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      // Check for the expected response structure
      const { success, data: responseData, count } = response.data;
      
      if (!success || !Array.isArray(responseData)) {
        console.error('Unexpected response format:', response.data);
        throw new Error('Unexpected response format from server');
      }

      const destinations = responseData || [];
      
      if (destinations.length === 0) {
        setError("No destinations found. Please try again later.");
        return;
      }

          // Process and validate each destination
      const validDestinations = Array.isArray(destinations) ? destinations.filter(dest => 
        dest && 
        typeof dest === 'object' && 
        dest.country && 
        typeof dest.country === 'string'
      ) : [];

      // Separate domestic and foreign trips based on country
      const domestic = validDestinations.filter(dest => 
        String(dest.country).toLowerCase() === 'india'
      );
      const foreign = validDestinations.filter(dest => 
        String(dest.country).toLowerCase() !== 'india'
      );

      setDomesticTrips(domestic || []);
      setForeignTrips(foreign || []);

      // Calculate total pages based on total destinations
      const totalItems = validDestinations.length;
      setTotalPages(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
      setCurrentPage(1); // Reset to first page when data changes

      // If no valid data is available after filtering
      if (validDestinations.length === 0) {
        setError("No valid trip data available. Please check back later.");
      }
    } catch (err) {
      console.error("Error in getTripPreferences:", err);
      setError(
        err.message.includes('Network error')
          ? "Unable to connect to the server. Please check your internet connection."
          : "Failed to load trip preferences. Please try again later."
      );
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
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
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
