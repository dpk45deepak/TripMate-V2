// src/utils/ping.js
import axios from "axios";

// const BACKEND_URL = "https://tripsbcknd.onrender.com";
const BACKEND_URL = "http://localhost:8082";

// Function to ping backend when frontend loads
export const pingBackend = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api`, {
      timeout: 100000, // 10 min
    });
    console.log("Backend awake: ✅ ", response.data);
  } catch (error) {
    console.warn("⚠️ Backend ping failed, retrying in 10 min...", error.message);
    // Retry once after 10 seconds
    setTimeout(() => pingBackend(), 600000);
  }
};
