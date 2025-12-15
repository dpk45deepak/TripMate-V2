import React, { useState, useContext } from "react";
import MainSection from "../components/itinerary/Main";
import Sidebar from "../components/itinerary/Sidebar";
import ChatSection from "../components/itinerary/Chatting";
import ExploreSection from "../components/itinerary/ExploreSection";
import AuthContext from "../Context/AuthContext";

export default function TravelApp() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("Main");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <main
        className="
          flex-1
          p-1 lg:p-2
          transition-all duration-300
        "
      >
        {activeTab === "Main" && <MainSection />}
        {activeTab === "Chat" && <ChatSection />}
        {activeTab === "Explore" && (
          <ExploreSection
            searchQuery={searchQuery}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
}
