// ✅ Centralized Backend API's file
import axios from "axios";

// 🔗 Base backend URL — change this to your Render backend URL
const BASE_URL = "https://tripsbcknd.onrender.com/api";
// const BASE_URL = "http://localhost:8082/api";

// 🧠 Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // prevent long waits if server sleeps
  headers: {
    "Content-Type": "application/json",
  },
});

// 🧩 Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(`${BASE_URL}/users/refresh-token`, {
          refreshToken: refreshToken
        });

        const { token: newToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens
        localStorage.setItem('token', newToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Define all backend requests here (centralized)

export const BACKEND_API = {
  // Authentication
  Auth: {
    SignUp: (data) => api.post("/users/register", data),
    SignIn: (data) => api.post("/users/login", data),
    VerifyToken: () => api.get("/users/verify"),
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
