// pages/BudgetSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetSetup = ({ user, setUser }) => {
  const [budget, setBudget] = useState(user?.budget || {
    currency: 'USD',
    min: 500,
    max: 3000,
    daily: 100
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget({
      ...budget,
      [name]: name === 'currency' ? value : Number(value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user budget
    setUser({
      ...user,
      budget,
      budgetCompleted: true
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Preferences</h1>
      <p className="text-gray-600 mb-8">Set your travel budget to get recommendations that fit your financial plan.</p>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            name="currency"
            value={budget.currency}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Budget Range: {budget.min} - {budget.max} {budget.currency}
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum</label>
              <input
                type="range"
                name="min"
                min="0"
                max="10000"
                step="100"
                value={budget.min}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum</label>
              <input
                type="range"
                name="max"
                min="0"
                max="10000"
                step="100"
                value={budget.max}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Daily Spend: {budget.daily} {budget.currency}
          </label>
          <input
            type="range"
            name="daily"
            min="10"
            max="500"
            step="10"
            value={budget.daily}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800">Budget Summary</h3>
          <p className="text-blue-700 text-sm mt-1">
            Your trips will be planned within {budget.min} - {budget.max} {budget.currency}, with an average daily spend of {budget.daily} {budget.currency}.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetSetup;