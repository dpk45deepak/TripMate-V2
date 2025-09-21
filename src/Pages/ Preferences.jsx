// pages/Preferences.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preferences = ({ user, setUser }) => {
  const [preferences, setPreferences] = useState({
    climate: user?.preferences?.climate || '',
    tripType: user?.preferences?.tripType || '',
    accessibility: user?.preferences?.accessibility || [],
    dietary: user?.preferences?.dietary || []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setPreferences({
        ...preferences,
        [name]: [...preferences[name], value]
      });
    } else {
      setPreferences({
        ...preferences,
        [name]: preferences[name].filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user preferences
    setUser({
      ...user,
      preferences,
      preferencesCompleted: true
    });
    navigate('/health');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Travel Preferences</h1>
      <p className="text-gray-600 mb-8">Tell us what you like to personalize your travel experience.</p>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Climate</label>
          <select
            name="climate"
            value={preferences.climate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select climate preference</option>
            <option value="tropical">Tropical</option>
            <option value="dry">Dry</option>
            <option value="temperate">Temperate</option>
            <option value="continental">Continental</option>
            <option value="polar">Polar</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
          <select
            name="tripType"
            value={preferences.tripType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select trip type</option>
            <option value="adventure">Adventure</option>
            <option value="leisure">Leisure</option>
            <option value="cultural">Cultural</option>
            <option value="business">Business</option>
            <option value="romantic">Romantic</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Accessibility Needs</label>
          <div className="space-y-2">
            {['Wheelchair access', 'Visual impairment support', 'Hearing impairment support', 'Mobility assistance', 'None'].map(need => (
              <div key={need} className="flex items-center">
                <input
                  id={`accessibility-${need}`}
                  name="accessibility"
                  type="checkbox"
                  value={need}
                  checked={preferences.accessibility.includes(need)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`accessibility-${need}`} className="ml-2 block text-sm text-gray-700">
                  {need}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
          <div className="space-y-2">
            {['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut allergy', 'Seafood allergy', 'None'].map(diet => (
              <div key={diet} className="flex items-center">
                <input
                  id={`dietary-${diet}`}
                  name="dietary"
                  type="checkbox"
                  value={diet}
                  checked={preferences.dietary.includes(diet)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`dietary-${diet}`} className="ml-2 block text-sm text-gray-700">
                  {diet}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preferences;