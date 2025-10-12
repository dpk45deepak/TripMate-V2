// ✅ Centralized Backend API's file
import axios from "axios";

// 🔗 Base backend URL — change this to your Render backend URL
const BASE_URL = "https://tripsbcknd.onrender.com";
// const BASE_URL = "http://localhost:8082";

// 🧠 Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // prevent long waits if server sleeps
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Optional: attach token (for authenticated routes)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Define all backend requests here (centralized)

export const BACKEND_API = {
  // Trip Preferences
  getDomesticPreferences: () => api.get("/preference/domestic-trips"),
  getForeignPreferences: () => api.get("/preference/foreign-trips"),

  // Authentication
  Auth: {
    SignUp: (data) => api.post("/user/register", data),
    SignIn: (data) => api.post("/user/login", data),
    VerifyToken: () => api.get("/user/verify"),
  },

};

export default BACKEND_API;
