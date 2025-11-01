import { useState, useEffect, useContext } from "react";
import icons from "./Icons";
import AuthContext from "../../Context/AuthContext";

// Enhanced Weather Widget Component
const WeatherWidget = ({ compact = false }) => {
    const { user } = useContext(AuthContext);

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Extract city and country from user.location
    const getLocationParts = () => {
        if (!user?.location) return { city: null, country: null };
        
        try {
            const parts = user.location.split(',').map(part => part.trim());
            const city = parts[0] || null;
            const country = parts[parts.length - 1] || null;
            
            return { city, country };
        } catch (err) {
            console.error("Error parsing location:", err);
            return { city: null, country: null };
        }
    };

    const { city, country } = getLocationParts();

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city || !country) {
                setError("Location not available");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                // In a real app, replace this with an actual weather API call
                // Example using OpenWeatherMap API:
                // const API_KEY = 'your_api_key_here';
                // const response = await fetch(
                //     `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
                // );
                // const data = await response.json();
                // setWeatherData([data]);

                // Mock data for demonstration
                const mockWeatherData = {
                    main: {
                        temp: Math.floor(Math.random() * 30) + 10, // Random temp between 10-40°C
                        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
                        feels_like: Math.floor(Math.random() * 5) + 20, // 20-25°C
                    },
                    weather: [
                        {
                            main: [
                                "Sunny",
                                "Cloudy",
                                "Rainy",
                                "Partly Cloudy",
                                "Thunderstorm",
                            ][Math.floor(Math.random() * 5)],
                            description: [
                                "Clear sky",
                                "Few clouds",
                                "Scattered clouds",
                                "Broken clouds",
                                "Shower rain",
                                "Rain",
                                "Thunderstorm",
                                "Snow",
                                "Mist",
                            ][Math.floor(Math.random() * 9)],
                            icon: "01d",
                        },
                    ],
                    wind: {
                        speed: (Math.random() * 10).toFixed(1),
                        deg: Math.floor(Math.random() * 360),
                    },
                    dt: Math.floor(Date.now() / 1000),
                    sys: {
                        country: country,
                        sunrise: Math.floor(Date.now() / 1000) - 3600 * 5, // 5 hours ago
                        sunset: Math.floor(Date.now() / 1000) + 3600 * 7, // 7 hours from now
                    },
                    name: city,
                };

                setWeatherData([mockWeatherData]);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                setError("Failed to load weather data");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, country]);

    // Format time for display
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (compact) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <icons.Cloud className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Weather</span>
                    </div>
                    {loading ? (
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    ) : weatherData ? (
                        <div className="flex items-center">
                            <span className="text-lg font-bold text-gray-800">
                                {Math.round(weatherData[0]?.main.temp)}°C
                            </span>
                            <span className="ml-1 text-sm text-gray-600 capitalize">
                                {weatherData[0]?.weather[0]?.description}
                            </span>
                        </div>
                    ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                    )}
                </div>
                {/* Added time display in compact mode */}
                <div className="mt-2 text-xs text-gray-500">
                    {formattedTime}
                </div>
            </div>
        );
    }

    // Full Weather Widget
    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold">
                        {city ? `${city}, ${country}` : "Location not available"}
                    </h3>
                    <p className="text-blue-100">
                        {formattedDate}
                    </p>
                    <p className="text-blue-100 font-semibold text-lg mt-1">
                        {formattedTime}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-bold">
                        {weatherData
                            ? `${Math.round(weatherData[0]?.main.temp)}°C`
                            : "--°C"}
                    </div>
                    <div className="text-blue-100 text-sm">
                        Feels like:{" "}
                        {weatherData
                            ? `${Math.round(weatherData[0]?.main.feels_like)}°C`
                            : "--°C"}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-center">
                    <div className="text-5xl mb-2">
                        {weatherData?.[0]?.weather?.[0]?.main === "Sunny"
                            ? "☀️"
                            : weatherData?.[0]?.weather?.[0]?.main === "Rainy"
                                ? "🌧️"
                                : weatherData?.[0]?.weather?.[0]?.main === "Cloudy"
                                    ? "☁️"
                                    : "🌤️"}
                    </div>
                    <div className="text-sm capitalize">
                        {weatherData?.[0]?.weather?.[0]?.description || "--"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                        <div className="text-blue-100">Humidity</div>
                        <div className="font-medium">
                            {weatherData?.[0]?.main?.humidity || "--"}%
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="text-blue-100">Wind</div>
                        <div className="font-medium">
                            {weatherData?.[0]?.wind?.speed
                                ? `${weatherData[0].wind.speed} m/s`
                                : "--"}
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="text-blue-100">Sunrise</div>
                        <div className="font-medium">
                            {weatherData?.[0]?.sys?.sunrise
                                ? new Date(
                                    weatherData[0].sys.sunrise * 1000
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "--:--"}
                        </div>
                    </div>
                    <div className="text-sm">
                        <div className="text-blue-100">Sunset</div>
                        <div className="font-medium">
                            {weatherData?.[0]?.sys?.sunset
                                ? new Date(weatherData[0].sys.sunset * 1000).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                )
                                : "--:--"}
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 text-red-100 text-sm bg-red-500/20 p-2 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;