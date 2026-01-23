// src/components/maps/DistanceCalculator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Route, Car, Train, Plane, Footprints } from 'lucide-react';

const DistanceCalculator = ({ onCalculate }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [travelMode, setTravelMode] = useState('driving');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const travelModes = [
        { id: 'driving', label: 'Car', icon: Car, color: 'text-blue-500' },
        { id: 'transit', label: 'Transit', icon: Train, color: 'text-green-500' },
        { id: 'walking', label: 'Walk', icon: Footprints, color: 'text-purple-500' },
        { id: 'flying', label: 'Flight', icon: Plane, color: 'text-red-500' }
    ];

    const calculateDistance = async () => {
        if (!origin.trim() || !destination.trim()) return;

        setLoading(true);

        // Mock calculation - replace with real API
        setTimeout(() => {
            const mockResults = {
                distance: '250 km',
                duration: '3 hours 15 min',
                cost: {
                    driving: '$45.00',
                    transit: '$18.50',
                    flying: '$120.00'
                },
                co2: '32.5 kg'
            };

            setResults(mockResults);
            setLoading(false);
            onCalculate?.(mockResults);
        }, 1500);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Route className="h-6 w-6 mr-2 text-blue-500" />
                Distance Calculator
            </h2>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Enter starting point"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        To
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Travel Modes */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Travel Mode</p>
                <div className="grid grid-cols-4 gap-2">
                    {travelModes.map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => setTravelMode(mode.id)}
                            className={`p-3 rounded-xl border-2 flex flex-col items-center transition-all ${travelMode === mode.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <mode.icon className={`h-5 w-5 mb-2 ${mode.color}`} />
                            <span className="text-sm font-medium">{mode.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Calculate Button */}
            <button
                onClick={calculateDistance}
                disabled={loading || !origin.trim() || !destination.trim()}
                className="w-full py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {loading ? 'Calculating...' : 'Calculate Distance & Cost'}
            </button>

            {/* Results */}
            {results && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl"
                >
                    <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{results.distance}</p>
                            <p className="text-sm text-gray-500">Distance</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{results.duration}</p>
                            <p className="text-sm text-gray-500">Duration</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{results.cost[travelMode]}</p>
                            <p className="text-sm text-gray-500">Estimated Cost</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{results.co2}</p>
                            <p className="text-sm text-gray-500">CO₂ Emissions</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DistanceCalculator;