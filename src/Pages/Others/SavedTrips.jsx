// pages/SavedTrips.js
import React from 'react';
import { Link } from 'react-router-dom';

const SavedTrips = () => {
  // Sample saved trips data
  const savedTrips = [
    {
      id: 1,
      destination: 'Paris, France',
      duration: '7 days',
      cost: '$2,400',
      date: '2023-07-01',
      status: 'Planned',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      duration: '10 days',
      cost: '$3,800',
      date: '2023-09-15',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      destination: 'Santorini, Greece',
      duration: '5 days',
      cost: '$2,100',
      date: '2023-11-10',
      status: 'Planned',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Saved Trips</h1>
      <p className="text-gray-600 mb-8">Manage and review your planned and completed trips.</p>

      {savedTrips.length > 0 ? (
        <div className="space-y-6">
          {savedTrips.map(trip => (
            <div key={trip.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-48 w-full md:w-64 object-cover" src={trip.image} alt={trip.destination} />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{trip.destination}</h2>
                      <p className="text-sm text-gray-500 mt-1">Scheduled for {trip.date}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trip.status === 'Planned' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {trip.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-sm font-medium text-gray-900">{trip.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Cost</p>
                      <p className="text-sm font-medium text-gray-900">{trip.cost}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Link
                      to="/itinerary"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Itinerary
                    </Link>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Edit
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No trips saved yet</h3>
          <p className="mt-1 text-gray-500">Get started by exploring our recommendations.</p>
          <div className="mt-6">
            <Link
              to="/recommendations"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Recommendations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedTrips;