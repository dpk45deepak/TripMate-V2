import { Routes, Route } from "react-router-dom";
import "./App.css";

// Main Pages
import LandingPage from "./Pages/LandingPage";
import HomePage from './Pages/Home';
import Profile from './Pages/Profile'
import Explore from "./Pages/Explore";
import NewPage from './Pages/FinalPage';

// Helpers
import ItineraryPlanner from "./Pages/ItineraryPlanner";
import SearchResults from "./Pages/SearchResults";

// Authentication
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/itinerary" element={<ItineraryPlanner />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/final" element={<NewPage />} />
      <Route path="/search" element={<SearchResults />} />

      {/* Auth pages */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Catch-all (optional) */}
      <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
