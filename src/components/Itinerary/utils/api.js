// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('authToken');

    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Itinerary APIs
export const itineraryAPI = {
    // Get all itineraries for user
    getAll: () => apiRequest('/itineraries'),

    // Get single itinerary
    getById: (id) => apiRequest(`/itineraries/${id}`),

    // Create new itinerary
    create: (data) => apiRequest('/itineraries', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Update itinerary
    update: (id, data) => apiRequest(`/itineraries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    // Delete itinerary
    delete: (id) => apiRequest(`/itineraries/${id}`, {
        method: 'DELETE',
    }),

    // Share itinerary
    share: (id, email) => apiRequest(`/itineraries/${id}/share`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    }),
};

// AI Suggestions APIs
export const aiAPI = {
    // Get AI suggestions for trip
    getSuggestions: (itineraryId) => apiRequest(`/ai/suggestions/${itineraryId}`),

    // Request custom AI suggestions
    requestCustom: (prompt) => apiRequest('/ai/custom', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
    }),

    // Get weather insights
    getWeatherInsights: (location, dates) => apiRequest('/ai/weather-insights', {
        method: 'POST',
        body: JSON.stringify({ location, dates }),
    }),

    // Chat with AI assistant
    chat: (message) => apiRequest('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
    }),
};

// Map & Location APIs
export const mapsAPI = {
    // Calculate route distance and cost
    calculateRoute: (origin, destination, mode) =>
        apiRequest('/maps/calculate-route', {
            method: 'POST',
            body: JSON.stringify({ origin, destination, mode }),
        }),

    // Get nearby places
    getNearbyPlaces: (location, type) =>
        apiRequest(`/maps/nearby?lat=${location.lat}&lng=${location.lng}&type=${type}`),

    // Get place details
    getPlaceDetails: (placeId) => apiRequest(`/maps/places/${placeId}`),

    // Geocode address
    geocode: (address) => apiRequest(`/maps/geocode?address=${encodeURIComponent(address)}`),
};

// Weather APIs
export const weatherAPI = {
    // Get current weather
    getCurrent: (location) => apiRequest(`/weather/current?location=${location}`),

    // Get forecast
    getForecast: (location, days = 5) =>
        apiRequest(`/weather/forecast?location=${location}&days=${days}`),

    // Get weather alerts
    getAlerts: (location) => apiRequest(`/weather/alerts?location=${location}`),
};

// Budget APIs
export const budgetAPI = {
    // Calculate trip budget
    calculateBudget: (data) => apiRequest('/budget/calculate', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Track expenses
    addExpense: (itineraryId, expense) =>
        apiRequest(`/budget/${itineraryId}/expenses`, {
            method: 'POST',
            body: JSON.stringify(expense),
        }),

    // Get budget analytics
    getAnalytics: (itineraryId) => apiRequest(`/budget/${itineraryId}/analytics`),
};

// Mock data for development
export const mockData = {
    itineraries: [
        {
            id: 1,
            title: 'Bali Adventure',
            location: 'Bali, Indonesia',
            duration: '7 days',
            budget: 2500,
            dates: 'Dec 15-22, 2024',
            travelers: 2,
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
            tags: ['Adventure', 'Beach', 'Culture'],
            progress: 75,
            status: 'upcoming'
        },
        // Add more mock itineraries...
    ],

    suggestions: [
        {
            id: 1,
            title: 'Sunset Dinner Cruise',
            description: 'Romantic dinner cruise with traditional dance',
            price: '$120',
            rating: 4.9,
            category: 'Experience'
        },
        // Add more suggestions...
    ]
};

// Export all APIs
export default {
    itineraryAPI,
    aiAPI,
    mapsAPI,
    weatherAPI,
    budgetAPI,
    mockData
};