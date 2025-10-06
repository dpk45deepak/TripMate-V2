import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const destination = searchParams.get("destination");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const rooms = searchParams.get("rooms");

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Check-in:</strong> {checkInDate}</p>
        <p><strong>Check-out:</strong> {checkOutDate}</p>
        <p><strong>Adults:</strong> {adults}</p>
        <p><strong>Children:</strong> {children}</p>
        <p><strong>Rooms:</strong> {rooms}</p>
      </div>
    </div>
  );
}