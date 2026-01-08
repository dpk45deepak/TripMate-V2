// src/App.jsx
import React, { useState } from 'react';
import DashboardHeader from '../components/itinearary/DashboardHeader';
import ItineraryTimeline from '../components/itinearary/ItineraryTimeline';
import TripOverview from '../components/itinearary/TripOverview';
import TripCustomizationPanel from '../components/itinearary/TripCustomizationPanel';
import BudgetOverview from '../components/itinearary/BudgetOverview';
import { mockData } from '../data/mockData';

function App() {
  const [tripData, setTripData] = useState(mockData);
  const [budget, setBudget] = useState(5000);
  const [selectedActivities, setSelectedActivities] = useState(['sightseeing', 'food']);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <DashboardHeader />

      <div className="max-w-7xl mx-auto mt-6">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Itinerary Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <ItineraryTimeline
              itinerary={tripData.itinerary}
              onUpdateItinerary={(updated) => setTripData({ ...tripData, itinerary: updated })}
            />

            {/* Bottom Chart Section */}
            <div className="mt-8">
              <BudgetOverview
                budget={budget}
                breakdown={tripData.budgetBreakdown}
              />
            </div>
          </div>

          {/* Right Column - Side Panels */}
          <div className="space-y-6">
            <TripOverview
              stats={tripData.stats}
              suggestions={tripData.aiSuggestions}
              budget={budget}
              onBudgetChange={setBudget}
            />

            <TripCustomizationPanel
              selectedActivities={selectedActivities}
              onActivitiesChange={setSelectedActivities}
              budget={budget}
              onBudgetChange={setBudget}
              tripDuration={tripData.duration}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;