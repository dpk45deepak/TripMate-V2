import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="bg-gradient-to-br from-gray-50 to-blue-50z">
      <App />
    </div>
  </React.StrictMode>
);
