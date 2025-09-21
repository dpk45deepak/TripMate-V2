// pages/Recommendations.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Recommendations = () => {
  const [savedTrips, setSavedTrips] = useState([]);

  // Sample recommendations data
  const recommendations = [
    {
      id: 1,
      destination: 'Paris, France',
      duration: '7 days',
      cost: '$2,400',
      match: 95,
      reasons: ['Matches your preference for cultural destinations', 'Fits your budget range', 'Excellent accessibility options'],
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      destination: 'Kyoto, Japan',
      duration: '10 days',
      cost: '$3,200',
      match: 88,
      reasons: ['Rich cultural experiences', 'Beautiful temples and gardens', 'Excellent public transportation'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      destination: 'Swiss Alps, Switzerland',
      duration: '5 days',
      cost: '$2,800',
      match: 82,
      reasons: ['Breathtaking mountain scenery', 'Wellness and spa options', 'Fresh mountain air good for health'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const saveRecommendation = (id) => {
    if (!savedTrips.includes(id)) {
      setSavedTrips([...savedTrips, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Personalized Recommendations</h1>
      <p className="text-gray-600 mb-8">Based on your preferences, health considerations, and budget.</p>

      <div className="space-y-6">
        {recommendations.map(recommendation => (
          <div key={recommendation.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full md:w-64 object-cover" src={recommendation.image} alt={recommendation.destination} />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{recommendation.destination}</h2>
                    <div className="mt-1 flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">{recommendation.match}% match</p>
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {recommendation.cost}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">Why recommended:</h3>
                  <ul className="mt-2 space-y-1">
                    {recommendation.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-sm text-gray-600">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Duration:</span> {recommendation.duration}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to="/itinerary"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Itinerary
                    </Link>
                    <button
                      onClick={() => saveRecommendation(recommendation.id)}
                      disabled={savedTrips.includes(recommendation.id)}
                      className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${savedTrips.includes(recommendation.id) ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {savedTrips.includes(recommendation.id) ? 'Saved' : 'Save Trip'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/destinations"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Explore More Destinations
        </Link>
      </div>
    </div>
  );
};

export default Recommendations;