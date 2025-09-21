// pages/ItineraryPlanner.js
import React, { useState } from 'react';

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState([
    {
      day: 1,
      date: '2023-07-01',
      activities: [
        { id: 1, time: '09:00', name: 'Arrival at Charles de Gaulle Airport', location: 'Paris, France', cost: 0 },
        { id: 2, time: '11:00', name: 'Check-in at hotel', location: 'Hotel Eiffel Tower', cost: 150 },
        { id: 3, time: '14:00', name: 'Eiffel Tower Visit', location: 'Champ de Mars', cost: 25 },
      ]
    },
    {
      day: 2,
      date: '2023-07-02',
      activities: [
        { id: 4, time: '10:00', name: 'Louvre Museum', location: 'Rue de Rivoli', cost: 17 },
        { id: 5, time: '14:00', name: 'Seine River Cruise', location: 'Port de la Bourdonnais', cost: 15 },
      ]
    },
    {
      day: 3,
      date: '2023-07-03',
      activities: [
        { id: 6, time: '09:00', name: 'Notre-Dame Cathedral', location: 'Île de la Cité', cost: 0 },
        { id: 7, time: '13:00', name: 'Montmartre District', location: '18th arrondissement', cost: 10 },
      ]
    }
  ]);

  const [totalCost, setTotalCost] = useState(217); // Sum of all activity costs

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: Date.now(),
      time: '12:00',
      name: 'New Activity',
      location: '',
      cost: 0
    };
    
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.push(newActivity);
    setItinerary(newItinerary);
  };

  const updateActivity = (dayIndex, activityIndex, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities[activityIndex][field] = value;
    setItinerary(newItinerary);
    
    // Recalculate total cost
    const newTotalCost = newItinerary.reduce((total, day) => {
      return total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0);
    }, 0);
    setTotalCost(newTotalCost);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Itinerary Planner</h1>
      <p className="text-gray-600 mb-8">Plan your perfect trip day by day.</p>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Paris, France - 7 Days</h2>
          <div className="text-lg font-medium text-blue-600">
            Total Estimated Cost: ${totalCost}
          </div>
        </div>

        <div className="space-y-8">
          {itinerary.map((day, dayIndex) => (
            <div key={day.day} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Day {day.day} - {day.date}</h3>
                <button
                  onClick={() => addActivity(dayIndex)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Activity
                </button>
              </div>

              <div className="space-y-4">
                {day.activities.map((activity, activityIndex) => (
                  <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <input
                      type="time"
                      value={activity.time}
                      onChange={(e) => updateActivity(dayIndex, activityIndex, 'time', e.target.value)}
                      className="mr-4 p-2 border border-gray-300 rounded"
                    />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={activity.name}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded mb-2"
                          placeholder="Activity name"
                        />
                        <input
                          type="text"
                          value={activity.location}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'location', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Location"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">$</span>
                        <input
                          type="number"
                          value={activity.cost}
                          onChange={(e) => updateActivity(dayIndex, activityIndex, 'cost', parseInt(e.target.value) || 0)}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Cost"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Draft
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Finalize Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
