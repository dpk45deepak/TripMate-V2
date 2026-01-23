// src/components/ai/AISuggestions.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ThumbsUp, ThumbsDown, RefreshCw, Send } from 'lucide-react';

const AISuggestions = () => {
    const [suggestions, setSuggestions] = useState([
        {
            id: 1,
            title: "Sunset Cruise in Bali",
            description: "Private catamaran cruise with dinner and traditional dance performance",
            reason: "Based on your love for ocean views and cultural experiences",
            category: "Experience",
            price: "$120 per person",
            rating: 4.9,
            feedback: null
        },
        {
            id: 2,
            title: "Hidden Waterfall Trek",
            description: "Guided hike to a secluded waterfall with picnic lunch",
            reason: "Matches your adventure preference and fitness level",
            category: "Adventure",
            price: "$65 per person",
            rating: 4.7,
            feedback: null
        },
        {
            id: 3,
            title: "Cooking Class with Local Chef",
            description: "Learn to make authentic Balinese dishes in a traditional kitchen",
            reason: "You've shown interest in local cuisine and hands-on activities",
            category: "Food & Culture",
            price: "$85 per person",
            rating: 4.8,
            feedback: null
        }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const giveFeedback = (id, liked) => {
        setSuggestions(suggestions.map(s =>
            s.id === id ? { ...s, feedback: liked } : s
        ));
    };

    const regenerateSuggestions = () => {
        setLoading(true);
        // Simulate AI regenerating suggestions
        setTimeout(() => {
            setLoading(false);
            // In real app, this would fetch new suggestions from API
        }, 2000);
    };

    const requestCustomSuggestion = () => {
        if (!input.trim()) return;

        setLoading(true);
        // Simulate AI processing
        setTimeout(() => {
            const newSuggestion = {
                id: Date.now(),
                title: `Custom: ${input}`,
                description: "AI-generated suggestion based on your specific request",
                reason: "Custom request processing",
                category: "Custom",
                price: "Varies",
                rating: 4.5,
                feedback: null
            };

            setSuggestions([newSuggestion, ...suggestions]);
            setInput('');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">AI Suggestions</h2>
                        <p className="text-gray-600 text-sm">Personalized recommendations for your trip</p>
                    </div>
                </div>

                <button
                    onClick={regenerateSuggestions}
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
                >
                    <RefreshCw className="h-4 w-4" />
                    <span>Regenerate</span>
                </button>
            </div>

            {/* Custom Request */}
            <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm font-medium text-gray-700">Ask for specific suggestions:</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        AI-Powered
                    </span>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="E.g., 'romantic dinner spots' or 'budget activities'"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && requestCustomSuggestion()}
                    />
                    <button
                        onClick={requestCustomSuggestion}
                        disabled={loading || !input.trim()}
                        className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 disabled:opacity-50"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Suggestions List */}
            <div className="space-y-4">
                {suggestions.map((suggestion, idx) => (
                    <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="px-2 py-1 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full">
                                        {suggestion.category}
                                    </span>
                                    <div className="flex items-center text-amber-500 text-sm">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        <span>{suggestion.rating}</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-gray-900 text-lg mb-1">{suggestion.title}</h3>
                                <p className="text-gray-600 mb-2">{suggestion.description}</p>

                                <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        <span className="font-medium">Why we suggest this:</span> {suggestion.reason}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-gray-900">{suggestion.price}</span>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => giveFeedback(suggestion.id, true)}
                                            className={`p-2 rounded-lg ${suggestion.feedback === true
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <ThumbsUp className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => giveFeedback(suggestion.id, false)}
                                            className={`p-2 rounded-lg ${suggestion.feedback === false
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <ThumbsDown className="h-4 w-4" />
                                        </button>
                                        <button className="px-3 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:opacity-90">
                                            Add to Trip
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-flex items-center">
                        <div className="h-8 w-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mr-3" />
                        <span className="text-gray-600">AI is thinking...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AISuggestions;