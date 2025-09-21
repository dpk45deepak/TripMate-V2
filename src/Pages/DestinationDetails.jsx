// pages/DestinationDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DestinationDetails = () => {
  useParams();

  // Sample destination data - in a real app, this would come from an API
  const destination = {
    id: 1,
    name: 'Paris, France',
    country: 'France',
    region: 'Île-de-France',
    type: 'cultural',
    description: 'Paris, France\'s capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    budget: '$$$',
    rating: 4.8,
    bestTime: 'April to June',
    cost: 'Medium to High',
    visaRequirements: 'Visa not required for stays up to 90 days for most nationalities',
    safety: 'Generally safe, but beware of pickpockets in tourist areas',
    activities: ['Eiffel Tower Visit', 'Louvre Museum', 'Seine River Cruise', 'Notre-Dame Cathedral', 'Montmartre District']
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover" />
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{destination.name}</h1>
              <p className="text-gray-600">{destination.region}, {destination.country}</p>
            </div>
            <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {destination.rating}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700">{destination.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Travel Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Best Time to Visit:</span>
                  <span className="ml-2 text-gray-600">{destination.bestTime}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Cost Level:</span>
                  <span className="ml-2 text-gray-600">{destination.cost}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Visa Requirements:</span>
                  <span className="ml-2 text-gray-600">{destination.visaRequirements}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Safety:</span>
                  <span className="ml-2 text-gray-600">{destination.safety}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Popular Activities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {destination.activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700">{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/recommendations"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;