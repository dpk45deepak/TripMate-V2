// Centralized Backend API file (Cookie-based Auth)
import axios from "axios";

// Base backend URL — change when deploying
const BASE_URL = "https://tripsbcknd.onrender.com/api";
// const BASE_URL = "http://localhost:8082/api";

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // 🔥 Important: send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});


// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);


export const BACKEND_API = {

  // Authentication
  Auth: {
    SignUp: (data) => api.post("/auth/register", data),
    SignIn: (data) => api.post("/auth/login", data),
    VerifyToken: () => api.get("/auth/verify-email"),
  },

  // Destinations
  Destinations: {

    // Get all destinations to show on explore page with paging logic
    GetDestinations: () => api.get("/destinations"),

    // Get by type from:- ( adventure, nature_beauty, historical_and_cultural, city, beaches )
    GetDestinationByType: (type) => api.get(`/destinations/${type}`),
    GetDestinationById: (type, id) => api.get(`/destinations/${type}/${id}`),

    // Filter by name, country, region
    // eg. country = India
    getDestinationsByFilter: (filter, value) => api.get(`/destinations/filter?${filter}=${value}`),

    // Best Time to visit
    // eg. month = January
    getDestinationsByBestTimeToVisit: (month) => api.get(`/destinations/best-time-to-visit?month=${month}`),

    // Create, Update, Delete
    CreateDestination: (data) => api.post("/destinations", data),
    UpdateDestination: (id, data) => api.put(`/destinations/${id}`, data),
    DeleteDestination: (id) => api.delete(`/destinations/${id}`),
  },

  // Users
  Users: {
    // Get user profile
    GetProfile: () => api.get("/users/profile"),
    UpdateProfile: (userId, data) => api.post(`/users/${userId}/update-profile`, data),
    // refresh token
    RefreshToken: () => api.post("/users/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken")
    }),
    // Set user preferences
    SetFavouriteCategories: (data) => api.put(`/users/${data.userId}/favourite-categories`, data)

  },


  // Preferences (for backward compatibility)
  Preferences: {
    // This will be handled by the Users API
    GetUserPreferences: () => api.get("/users/profile"),
  },


  Recommend: {
    GetRecommendation: (userId) => api.get(`/recommendations/${userId}`),
    GetRecommendationWithType: (userId, type, value) => api.get(`/recommendations/${userId}/${type}/${value}`),
    GetRecommendationWithFilter: (userId, filter, value) => api.get(`/recommendations/${userId}/${filter}/${value}`),
    GetRecommendationWithBestTimeToVisit: (userId, month) => api.get(`/recommendations/${userId}/${month}`),
  }
};


export default BACKEND_API;
