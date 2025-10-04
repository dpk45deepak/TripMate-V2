// pages/Destinations.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  // Sample destination data
  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      country: 'France',
      type: 'cultural',
      description: 'The City of Light, known for its art, fashion, gastronomy and culture.',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$$$',
      rating: 4.8,
      bestTime: 'Apr-Jun',
      cost: 'Medium-High'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      country: 'Japan',
      type: 'cultural',
      description: 'Famous for its numerous classical Buddhist temples, gardens, and traditional wooden houses.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$$',
      rating: 4.9,
      bestTime: 'Mar-May, Oct-Nov',
      cost: 'Medium'
    },
    {
      id: 3,
      name: 'Santorini, Greece',
      country: 'Greece',
      type: 'leisure',
      description: 'Known for its breathtaking sunsets, white-washed buildings, and crystal-clear waters.',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$$$',
      rating: 4.7,
      bestTime: 'Jun-Aug',
      cost: 'High'
    },
    {
      id: 4,
      name: 'Banff National Park, Canada',
      country: 'Canada',
      type: 'adventure',
      description: 'Canada\'s oldest national park, known for its stunning mountainous landscape.',
      image: 'https://images.unsplash.com/photo-1549209176-7ebc4b6f79ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$$',
      rating: 4.9,
      bestTime: 'Jun-Aug',
      cost: 'Medium'
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      country: 'Indonesia',
      type: 'leisure',
      description: 'Famous for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$',
      rating: 4.6,
      bestTime: 'Apr-Oct',
      cost: 'Low'
    },
    {
      id: 6,
      name: 'New York City, USA',
      country: 'USA',
      type: 'cultural',
      description: 'The most populous city in the United States, known for its cultural diversity.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      budget: '$$$',
      rating: 4.7,
      bestTime: 'Apr-Jun, Sep-Nov',
      cost: 'High'
    }
  ];

  const countries = [...new Set(destinations.map(d => d.country))];
  const types = [...new Set(destinations.map(d => d.type))];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || destination.type === selectedType;
    const matchesCountry = selectedCountry === 'all' || destination.country === selectedCountry;
    
    return matchesSearch && matchesType && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Destinations</h1>
      <p className="text-gray-600 mb-8">Discover amazing places to visit around the world.</p>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Destination Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                  <span className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {destination.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{destination.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-gray-700 font-medium">{destination.budget}</span>
                    <span className="text-gray-500 text-sm ml-2">• {destination.cost}</span>
                  </div>
                  <span className="text-sm text-gray-500">Best time: {destination.bestTime}</span>
                </div>
                <Link
                  to={`/destination/${destination.id}`}
                  className="mt-4 w-full block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No destinations found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default Destinations;