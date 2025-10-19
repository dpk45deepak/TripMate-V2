// Helper function to convert backend data to frontend format
const convertBackendToFrontend = (backendData, type) => {
    if (!backendData) return [];

    return backendData.map(trip => {
    // Generate dynamic dates based on current date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (trip.days || 7));

    const formattedDates = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    // Get country flag based on location
    const getFlagEmoji = (countryCode) => {
    const flagEmojis = {
        'NORWAY': '🇳🇴',
        'AUSTRIA': '🇦🇹',
        'INDIA': '🇮🇳',
        'USA': '🇺🇸',
        'UK': '🇬🇧',
        'JAPAN': '🇯🇵',
        'AUSTRALIA': '🇦🇺',
        'CANADA': '🇨🇦'
    };
    return flagEmojis[countryCode] || '🏳️';
    };

    // Generate mock images based on location
    const getMockImage = (location, name) => {
    const imageMap = {
        'NORWAY': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'AUSTRIA': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'INDIA': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'HIMALAYAS': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'GOA': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    };
    return imageMap[location] || imageMap[name] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
    };

    return {
    id: trip._id || trip.id || Math.random().toString(36).substr(2, 9),
    country: trip.location || 'Unknown',
    flag: type === 'domestic' ? '🇮🇳' : getFlagEmoji(trip.location),
    title: trip.name || 'Adventure Trip',
    image: trip.image || getMockImage(trip.location, trip.name),
    type: type,
    details: {
        location: trip.location || 'Unknown Location',
        altitude: `${Math.floor(Math.random() * 4000) + 1000}m`,
        rating: trip.rating || (Math.random() * 1 + 4).toFixed(1),
        reviews: Math.floor(Math.random() * 1000) + 100,
        price: trip.budget || Math.floor(Math.random() * 50000) + 10000,
        description: `Experience the beauty of ${trip.location}. ${trip.activityLevel ? `This ${trip.activityLevel.toLowerCase()} level trip` : 'This amazing trip'} is perfect for ${trip.health === 'good' ? 'all ages' : 'moderate fitness levels'}. Best visited during ${trip.bestSeason || 'spring and autumn'}.`,
        amenities: ['Guided Tours', 'Accommodation', 'Meals', trip.transport || 'Transport'],
        hotel: `${trip.location} ${type === 'domestic' ? 'Heritage' : 'Premium'} Resort`,
        duration: `${trip.days || 7} days`,
        distance: `${Math.floor(Math.random() * 50) + 10} km`,
        dates: formattedDates,
        people: Math.floor(Math.random() * 15) + 8,
        difficulty: trip.activityLevel?.charAt(0).toUpperCase() + trip.activityLevel?.slice(1) || 'Moderate',
        season: trip.bestSeason?.charAt(0).toUpperCase() + trip.bestSeason?.slice(1) || 'All Year',
        highlights: [
        `${trip.location} Main Attraction`,
        'Local Culture Experience',
        'Scenic Views',
        'Adventure Activities'
        ],
        included: ['Accommodation', 'Meals', 'Expert Guides', 'Equipment Rental']
        }
        };
    });
};

export default convertBackendToFrontend;