// pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample data for demonstration
  const savedTrips = [
    { id: 1, destination: 'Paris, France', duration: '7 days', cost: '$2,400' },
    { id: 2, destination: 'Tokyo, Japan', duration: '10 days', cost: '$3,800' },
  ];

  const progress = [
    { name: 'Preferences', completed: false, href: '/preferences' },
    { name: 'Health Info', completed: false, href: '/health' },
    { name: 'Budget', completed: false, href: '/budget' },
  ];

  const completedCount = progress.filter(item => item.completed).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, User!</h1>
      <p className="text-gray-600 mb-8">Ready to plan your next adventure?</p>

      {/* Progress Tracker */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Setup Progress</h2>
        <p className="text-gray-600 mb-4">Complete your profile to get personalized recommendations</p>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{completedCount}/{progress.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(completedCount / progress.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {progress.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                {item.completed ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
              </div>
              <Link 
                to={item.href} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {item.completed ? 'Edit' : 'Setup'}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Saved Trips Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Saved Trips</h2>
            <Link to="/saved-trips" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {savedTrips.length > 0 ? (
            <div className="space-y-4">
              {savedTrips.map(trip => (
                <div key={trip.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <h3 className="font-medium text-gray-900">{trip.destination}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{trip.duration}</span>
                    <span>{trip.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h3 className="mt-4 text-sm font-medium text-gray-900">No trips saved yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by exploring destinations.</p>
              <div className="mt-6">
                <Link
                  to="/destinations"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Shortcut */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
          <p className="text-gray-600 mb-6">Based on your preferences, we think you&apos;ll love these destinations:</p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              {completedCount === progress.length 
                ? "We&apos;ve found some perfect matches for you!" 
                : "Complete your profile setup to get personalized recommendations."}
            </p>
          </div>
          
          <Link
            to={completedCount === progress.length ? "/recommendations" : "/preferences"}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {completedCount === progress.length ? "View Recommendations" : "Complete Setup"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
