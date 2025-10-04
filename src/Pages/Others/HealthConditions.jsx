// pages/HealthConditions.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HealthConditions = ({ user, setUser }) => {
  const [conditions, setConditions] = useState(user?.healthConditions?.conditions || []);
  const [currentCondition, setCurrentCondition] = useState('');
  const [severity, setSeverity] = useState('moderate');
  const [constraints, setConstraints] = useState(user?.healthConditions?.constraints || '');

  const navigate = useNavigate();

  const addCondition = () => {
    if (currentCondition.trim() !== '') {
      setConditions([...conditions, { name: currentCondition, severity }]);
      setCurrentCondition('');
      setSeverity('moderate');
    }
  };

  const removeCondition = (index) => {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    setConditions(newConditions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user health conditions
    setUser({
      ...user,
      healthConditions: {
        conditions,
        constraints
      },
      healthCompleted: true
    });
    navigate('/budget');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Information</h1>
      <p className="text-gray-600 mb-8">Share any health conditions to ensure safe and comfortable travel recommendations.</p>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={currentCondition}
              onChange={(e) => setCurrentCondition(e.target.value)}
              placeholder="Condition name"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
            <button
              type="button"
              onClick={addCondition}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {conditions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {conditions.map((condition, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{condition.name}</span>
                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${condition.severity === 'mild' ? 'bg-green-100 text-green-800' : condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {condition.severity}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCondition(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No conditions added yet.</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Travel Constraints</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            rows={3}
            placeholder="e.g., Cannot tolerate high altitudes, severe pollen allergies, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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

export default HealthConditions;