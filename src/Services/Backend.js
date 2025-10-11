// ✅ Centralised Backend API's file
import axios from "axios";

// 🔗 Base backend URL — change this to your Render backend URL
const BASE_URL = "https://tripsbcknd.onrender.com";

// 🧠 Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // prevent long waits if server sleeps
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Optional: attach token (for authenticated routes)
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ✅ Define all backend requests here (centralized)
export const BACKEND_API = {

  // Example: fetch destinations (GET)
  getDomesticPreferences: () => api.get('/preference/domestic-trips'),

  // Example: fetch destinations (GET)
  getForeignPreferences: () => api.get('/preference/foreign-trips'),

  // Example: fetch destinations (GET)
  getDestinations: () => api.get("/destinations"),

  // Example: fetch one destination by ID
  getDestinationById: (id) => api.get(`/destinations/${id}`),

  // Example: user login (POST)
  loginUser: (data) => api.post("/auth/login", data),

  // Example: user registration (POST)
  registerUser: (data) => api.post("/auth/register", data),

  // Example: place an order (POST)
  placeOrder: (data) => api.post("/orders", data),

  // Example: get user profile (GET)
  getProfile: () => api.get("/users/profile"),

  // Example: update user profile (PUT)
  updateProfile: (data) => api.put("/users/profile", data),

  // Example: delete destination (DELETE)
  deleteDestination: (id) => api.delete(`/destinations/${id}`),
};

export default BACKEND_API;
