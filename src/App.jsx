import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Video404 from "./components/Video404";

// Main Pages
import LandingPage from "./Pages/LandingPage";
import HomePage from './Pages/HomePage';
import Profile from './Pages/Profile';
import ProfileSettings from './Pages/ProfileSettings';
import Explore from "./Pages/Explore";
import NewPage from './Pages/FinalPage';

// Helpers
import ItineraryPlanner from "./Pages/ItineraryPlanner";
import SearchResults from "./Pages/SearchResults";

// Authentication
import SignIn from "./components/AuthPage/SignIn";
import SignUp from "./components/AuthPage/SignUp";

// Admin Pages (optional)
import AuthPage from './Pages/PingAuthPage';
import PingDashboard from './Pages/PingDashboard';

// Utils
import { pingBackend } from "./utils/ping";

// Auth Context
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  useEffect(() => {
    pingBackend();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/itinerary"
            element={
              <ProtectedRoute>
                <ItineraryPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/final"
            element={
              <ProtectedRoute>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            }
          />

          {/* Optional Admin Routes */}
          {/* <Route path="/ping" element={<AuthPage />} />
          <Route path="/ping-dashboard" element={<PingDashboard />} /> */}

          {/* 404 */}
          <Route
            path="*"
            element={<Video404 />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
