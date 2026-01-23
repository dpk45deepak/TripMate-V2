// src/components/weather/WeatherWidget.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, CloudRain, Sun, CloudSun, Wind,
    Thermometer, Droplets, Umbrella, Navigation
} from 'lucide-react';

const WeatherWidget = ({ location = "Current Location" }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState('celsius');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setWeather({
                temperature: { celsius: 22, fahrenheit: 72 },
                condition: 'Partly Cloudy',
                icon: 'partly-cloudy',
                humidity: 65,
                windSpeed: 12,
                precipitation: 10,
                feelsLike: { celsius: 24, fahrenheit: 75 },
                forecast: [
                    { day: 'Mon', high: 24, low: 18, condition: 'sunny' },
                    { day: 'Tue', high: 23, low: 17, condition: 'partly-cloudy' },
                    { day: 'Wed', high: 21, low: 16, condition: 'rainy' },
                    { day: 'Thu', high: 22, low: 17, condition: 'cloudy' },
                    { day: 'Fri', high: 25, low: 19, condition: 'sunny' }
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    const getWeatherIcon = (condition) => {
        const icons = {
            sunny: '☀️',
            'partly-cloudy': '⛅',
            cloudy: '☁️',
            rainy: '🌧️',
            stormy: '⛈️',
            snowy: '❄️'
        };
        return icons[condition] || '☀️';
    };

    if (loading) {
        return (
            <div className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="bg-linear-to-br from-blue-400 to-cyan-400 rounded-2xl shadow-xl overflow-hidden text-white">
            {/* Current Weather */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">{location}</h2>
                        <p className="opacity-90">Current Weather</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setUnit('celsius')}
                            className={`px-3 py-1 rounded-full text-sm ${unit === 'celsius' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}`}
                        >
                            °C
                        </button>
                        <button
                            onClick={() => setUnit('fahrenheit')}
                            className={`px-3 py-1 rounded-full text-sm ${unit === 'fahrenheit' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'}`}
                        >
                            °F
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-6xl font-bold mb-2">
                            {unit === 'celsius' ? weather.temperature.celsius : weather.temperature.fahrenheit}°
                        </div>
                        <p className="text-xl opacity-90">{weather.condition}</p>
                    </div>
                    <div className="text-8xl">
                        {getWeatherIcon(weather.icon)}
                    </div>
                </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white/10">
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Thermometer className="h-5 w-5" />
                    </div>
                    <p className="text-sm opacity-90">Feels Like</p>
                    <p className="text-lg font-semibold">
                        {unit === 'celsius' ? weather.feelsLike.celsius : weather.feelsLike.fahrenheit}°
                    </p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Droplets className="h-5 w-5" />
                    </div>
                    <p className="text-sm opacity-90">Humidity</p>
                    <p className="text-lg font-semibold">{weather.humidity}%</p>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Wind className="h-5 w-5" />
                    </div>
                    <p className="text-sm opacity-90">Wind</p>
                    <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
                </div>
            </div>

            {/* Forecast */}
            <div className="p-6 bg-white/5">
                <h3 className="font-semibold mb-4">5-Day Forecast</h3>
                <div className="grid grid-cols-5 gap-2">
                    {weather.forecast.map((day, idx) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                        >
                            <p className="font-medium">{day.day}</p>
                            <div className="text-2xl my-2">
                                {getWeatherIcon(day.condition)}
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold">{day.high}°</p>
                                <p className="opacity-75 text-sm">{day.low}°</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Weather Tips */}
            <div className="p-4 bg-white/10 border-t border-white/20">
                <div className="flex items-center space-x-3">
                    {weather.precipitation > 50 ? (
                        <>
                            <Umbrella className="h-5 w-5" />
                            <p className="text-sm">High chance of rain. Carry an umbrella!</p>
                        </>
                    ) : (
                        <>
                            <Sun className="h-5 w-5" />
                            <p className="text-sm">Great weather for outdoor activities!</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;