import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./Pages/LandingPage";
import Dashboard from './Pages/Dashboard'
import ItineraryPlanner from "./Pages/ItineraryPlanner";
import Recommendations from "./Pages/Recommendations";
import SavedTrips from "./Pages/SavedTrips";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/itinerary" element={<ItineraryPlanner />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/saved-trips" element={<SavedTrips />} />

      {/* Auth pages */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Catch-all (optional) */}
      <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
