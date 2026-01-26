// src/utils/ping.js
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const startBackendPing = () => {
  const ping = async () => {
    try {
      await axios.get(`${BACKEND_URL}/health`, { timeout: 10000 });
      console.log("✅ Backend is awake");
    } catch (err) {
      console.warn("⚠️ Backend ping failed:", err.message);
    }
  };

  // First ping on load
  ping();

  // Ping every 5 minutes to prevent sleep
  setInterval(ping, 5 * 60 * 1000);
};

export default startBackendPing;