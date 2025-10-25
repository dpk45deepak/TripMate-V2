// Helper function to convert backend data to frontend format
const convertBackendToFrontend = (backendData, type) => {
    if (!backendData) return [];
    
    // Convert single object to array if needed
    const dataArray = Array.isArray(backendData) ? backendData : [backendData];

    return dataArray.map(trip => {
        // Generate dynamic dates based on current date
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 7);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7); // Default 7-day trip

        const formattedDates = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

        // Get country flag based on country name
        const getFlagEmoji = (countryName) => {
            const flagEmojis = {
                'INDIA': '🇮🇳',
                'USA': '🇺🇸',
                'UNITED STATES': '🇺🇸',
                'UK': '🇬🇧',
                'UNITED KINGDOM': '🇬🇧',
                'JAPAN': '🇯🇵',
                'AUSTRALIA': '🇦🇺',
                'CANADA': '🇨🇦',
                'FRANCE': '🇫🇷',
                'GERMANY': '🇩🇪',
                'ITALY': '🇮🇹',
                'SPAIN': '🇪🇸',
                'THAILAND': '🇹🇭',
                'MALAYSIA': '🇲🇾',
                'SINGAPORE': '🇸🇬',
                'UAE': '🇦🇪',
                'QATAR': '🇶🇦',
                'SAUDI ARABIA': '🇸🇦',
                'RUSSIA': '🇷🇺',
                'CHINA': '🇨🇳',
                'SOUTH KOREA': '🇰🇷',
                'BRAZIL': '🇧🇷',
                'MEXICO': '🇲🇽',
                'TURKEY': '🇹🇷',
                'EGYPT': '🇪🇬',
                'SOUTH AFRICA': '🇿🇦'
            };
            return flagEmojis[countryName?.toUpperCase()] || '🌍';
        };

        // Generate random rating between 3.5 and 5.0
        const randomRating = (Math.random() * 1.5 + 3.5).toFixed(1);
        const randomReviews = Math.floor(Math.random() * 1000) + 50;

        return {
            id: trip._id || trip.id || Math.random().toString(36).substr(2, 9),
            country: trip.country || 'Unknown',
            flag: getFlagEmoji(trip.country),
            title: trip.name || 'Adventure Destination',
            image: trip.image_url || `https://source.unsplash.com/random/800x600/?${trip.name?.toLowerCase().replace(/\s+/g, ',') || 'travel'}`,
            type: type,
            details: {
                location: trip.region ? `${trip.region}, ${trip.country}` : trip.country || 'Unknown Location',
                rating: trip.rating || randomRating,
                reviews: randomReviews,
                price: trip.average_cost_per_day || Math.floor(Math.random() * 50000) + 10000,
                description: trip.description || `Experience the beauty of ${trip.name || 'this destination'}.`,
                amenities: ['Guided Tours', 'Accommodation', 'Meals', 'Transport'],
                duration: '7 days', // Default duration
                dates: formattedDates,
                people: Math.floor(Math.random() * 15) + 8, // Random number of people
                difficulty: trip.type || 'Moderate',
                season: trip.best_time_to_visit?.join(', ') || 'All Year',
                highlights: [
                    trip.name || 'Main Attraction',
                    'Local Culture Experience',
                    'Scenic Views',
                    'Adventure Activities'
                ],
                included: ['Accommodation', 'Meals', 'Expert Guides', 'Equipment Rental'],
                // Additional fields from the API
                visa_requirements: trip.visa_requirements || 'Check with local consulate',
                safety_rating: trip.safety_rating || 'Not Rated',
                best_time_to_visit: trip.best_time_to_visit || ['All Year'],
                currency: trip.currency || 'USD'
            }
        };
    });
};

export default convertBackendToFrontend;