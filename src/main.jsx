import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="bg-gradient-to-br from-gray-50 to-blue-50z">
      <App />
    </div>
    </BrowserRouter>
  </React.StrictMode>
);
