// src/utils/ping.js
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Function to ping backend when frontend loads
export const pingBackend = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}`, {
      timeout: 100000, // 10 min
    });
    console.log("Backend pinged Successfully!! ✅");
  } catch (error) {
    console.warn("⚠️ Backend ping failed, retrying in 10 min...", error.message);
    // Retry once after 60 minutes
    setTimeout(() => pingBackend(), 600000);
  }
};
