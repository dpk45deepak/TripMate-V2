// Centralized Backend API file (Cookie-based Auth)
import axios from "axios";

// Base backend URL — change when deploying
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
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
    ContinueWithGoogle: () => api.get("/auth/google"),
    LogOut: (data) => api.post("/auth/logout", data),
    VerifyToken: () => api.get("/auth/verify-email"),
  },

  // Destinations
  Destinations: {
    GetDestinations: () => api.get("/destinations"),
    GetDestinationByType: (type) => api.get(`/destinations/${type}`),
    GetDestinationById: (type, id) => api.get(`/destinations/${type}/${id}`),
    getDestinationsByFilter: (filter, value) => api.get(`/destinations/filter?${filter}=${value}`),
    getDestinationsByBestTimeToVisit: (month) => api.get(`/destinations/best-time-to-visit?month=${month}`),
    CreateDestination: (data) => api.post("/destinations", data),
    UpdateDestination: (id, data) => api.put(`/destinations/${id}`, data),
    DeleteDestination: (id) => api.delete(`/destinations/${id}`),
  },

  // Users
  Users: {
    GetProfile: () => api.get("/users/profile"),
    UpdateProfile: (userId, data) => api.post(`/users/${userId}/update-profile`, data),
    RefreshToken: () => api.post("/users/refresh-token"),
    SetFavouriteCategories: (data) => api.put(`/users/${data.userId}/favourite-categories`, data)
  },


  // Preferences (for backward compatibility)
  Preferences: {
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
