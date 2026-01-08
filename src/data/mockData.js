// src/data/mockData.js
export const mockData = {
    itinerary: [
        {
            day: 1,
            morning: [
                {
                    id: 1,
                    title: "Arrival at Ngurah Rai Airport",
                    type: "travel",
                    time: "3 hours",
                    cost: 120,
                    location: "Denpasar Airport"
                },
                {
                    id: 2,
                    title: "Check-in at Resort",
                    type: "relaxation",
                    time: "1 hour",
                    cost: 0,
                    location: "Ubud Resort"
                }
            ],
            afternoon: [
                {
                    id: 3,
                    title: "Visit Ubud Monkey Forest",
                    type: "sightseeing",
                    time: "2 hours",
                    cost: 40,
                    location: "Ubud Monkey Forest"
                }
            ],
            evening: [
                {
                    id: 4,
                    title: "Dinner at Local Warung",
                    type: "food",
                    time: "1.5 hours",
                    cost: 25,
                    location: "Ubud Town"
                }
            ]
        },
        {
            day: 2,
            morning: [
                {
                    id: 5,
                    title: "Sunrise at Mount Batur",
                    type: "adventure",
                    time: "4 hours",
                    cost: 75,
                    location: "Mount Batur"
                }
            ],
            afternoon: [
                {
                    id: 6,
                    title: "Hot Spring Relaxation",
                    type: "relaxation",
                    time: "2 hours",
                    cost: 35,
                    location: "Toyabungkah Hot Spring"
                }
            ],
            evening: [
                {
                    id: 7,
                    title: "Balinese Cooking Class",
                    type: "food",
                    time: "3 hours",
                    cost: 50,
                    location: "Local Kitchen"
                }
            ]
        }
    ],
    stats: {
        totalDays: 10,
        totalActivities: 24,
        totalBudget: 5000
    },
    aiSuggestions: [
        {
            id: 1,
            title: "Waterfall Trekking Tour",
            description: "Explore hidden waterfalls with local guide",
            duration: "4-5 hours",
            cost: 65,
            location: "Tegenungan Waterfall"
        },
        {
            id: 2,
            title: "Traditional Balinese Spa",
            description: "Full body massage and flower bath experience",
            duration: "2 hours",
            cost: 45,
            location: "Ubud Spa Center"
        },
        {
            id: 3,
            title: "Snorkeling at Blue Lagoon",
            description: "Crystal clear waters with tropical fish",
            duration: "3 hours",
            cost: 55,
            location: "Padangbai Beach"
        }
    ],
    budgetBreakdown: {
        travel: 1500,
        hotel: 1750,
        food: 1000,
        activities: 750
    },
    duration: 10
};