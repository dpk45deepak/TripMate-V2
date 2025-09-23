import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./Pages/LandingPage";
import Profile from './Pages/Profile'
import Explore from "./Pages/Explore";
import ItineraryPlanner from "./Pages/ItineraryPlanner";
import Recommendations from "./Pages/Recommendations";
import SavedTrips from "./Pages/SavedTrips";
import Preferences from "./Pages/Preferences";
import HomePage from './Pages/Home';
import Highlights from './components/Highlights';

import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/highlights" element={<Highlights />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/itinerary" element={<ItineraryPlanner />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/preferences" element={<Preferences />} />
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
