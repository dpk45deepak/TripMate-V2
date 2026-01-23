// src/Pages/ItineraryPlanner.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardHeader from '../components/Itinerary/components/DashboardHeader';
import Dashboard from '../components/Itinerary/pages/Dashboard';
import MemoriesPage from '../components/Itinerary/pages/MemoriesPage';
import CreateItinerary from '../components/Itinerary/pages/CreateItinerary';
import TripPlanner from '../components/Itinerary/pages/TripPlanner';
import ItineraryPage from '../components/Itinerary/pages/ItineraryPage';

function ItineraryPlanner() {
  const location = useLocation();

  // Check if we're on a subpage that should hide the header
  const isSubPage = location.pathname.includes('/itinerary/') &&
    !location.pathname.endsWith('/itinerary');

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
      {!isSubPage && <DashboardHeader />}
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="create" element={<CreateItinerary />} />
        <Route path="memories" element={<MemoriesPage />} />
        <Route path="planner" element={<TripPlanner />} />
        <Route path=":id" element={<ItineraryPage />} />
      </Routes>
    </div>
  );
}

export default ItineraryPlanner;