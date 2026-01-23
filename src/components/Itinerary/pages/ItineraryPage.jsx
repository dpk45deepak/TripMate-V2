// src/pages/ItineraryPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Calendar, MapPin, Users, DollarSign,
    Clock, Share2, Download, Printer, Edit2, MoreVertical,
    Heart, MessageCircle, Navigation, CheckCircle, Globe
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import ActivityTimeline from '../components/itinerary/ActivityTimeline';
import ModernCard from '../components/common/ModernCard';
import AnimatedButton from '../components/common/AnimatedButton';

const ItineraryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(1);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setItinerary({
                id: 1,
                title: 'Bali Adventure Trip',
                location: 'Bali, Indonesia',
                duration: '7 days',
                dates: 'Dec 15-22, 2024',
                travelers: 2,
                budget: 2500,
                status: 'upcoming',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                description: 'Perfect blend of beaches, culture, and adventure in paradise',

                stats: {
                    activities: 18,
                    distance: '120 km',
                    avgDailyCost: '$357',
                    co2Saved: '45 kg'
                },

                days: [
                    {
                        day: 1,
                        date: 'Dec 15, 2024',
                        location: 'Denpasar',
                        budget: 350,
                        activities: [
                            {
                                id: 1,
                                title: 'Arrival & Check-in',
                                description: 'Arrive at Ngurah Rai Airport and transfer to hotel',
                                time: '14:00',
                                duration: '2 hours',
                                type: 'transport',
                                location: 'Airport to Hotel',
                                cost: 25,
                                notes: 'Pre-booked airport transfer',
                                icon: '✈️'
                            },
                            {
                                id: 2,
                                title: 'Explore Kuta Beach',
                                description: 'Relax at the famous beach and watch sunset',
                                time: '17:00',
                                duration: '3 hours',
                                type: 'relaxation',
                                location: 'Kuta Beach',
                                cost: 15,
                                notes: 'Perfect for sunset photos',
                                icon: '🏖️'
                            },
                            {
                                id: 3,
                                title: 'Welcome Dinner',
                                description: 'Traditional Balinese dinner at local restaurant',
                                time: '20:00',
                                duration: '2 hours',
                                type: 'food',
                                location: 'Warung Babi Guling',
                                cost: 30,
                                notes: 'Try the famous suckling pig',
                                icon: '🍽️'
                            }
                        ]
                    },
                    {
                        day: 2,
                        date: 'Dec 16, 2024',
                        location: 'Ubud',
                        budget: 280,
                        activities: [
                            {
                                id: 4,
                                title: 'Tegalalang Rice Terrace',
                                description: 'Morning walk through beautiful rice fields',
                                time: '09:00',
                                duration: '3 hours',
                                type: 'sightseeing',
                                location: 'Tegalalang',
                                cost: 10,
                                notes: 'Best lighting in the morning',
                                icon: '🌾'
                            }
                        ]
                    }
                ],

                expenses: [
                    { category: 'Flights', amount: 800, percentage: 32, color: 'from-blue-500 to-cyan-500' },
                    { category: 'Accommodation', amount: 700, percentage: 28, color: 'from-purple-500 to-pink-500' },
                    { category: 'Food', amount: 500, percentage: 20, color: 'from-amber-500 to-orange-500' },
                    { category: 'Activities', amount: 400, percentage: 16, color: 'from-green-500 to-emerald-500' },
                    { category: 'Transport', amount: 100, percentage: 4, color: 'from-gray-500 to-gray-600' }
                ],

                notes: [
                    'Book temple visits in advance',
                    'Carry cash for local markets',
                    'Pack mosquito repellent',
                    'Learn basic Balinese phrases',
                    'Dress modestly for temple visits'
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="h-16 w-16 border-4 border-gray-200 rounded-full" />
                        <div className="absolute top-0 left-0 h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading your itinerary...</p>
                </div>
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50/30 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <div className="p-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Globe className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Itinerary not found</h2>
                    <p className="text-gray-600 mb-6">The itinerary you're looking for doesn't exist or has been removed.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                        Back to Dashboard
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-blue-50/30">
            {/* Enhanced Hero Section */}
            <div className="relative h-125 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={itinerary.image}
                        alt={itinerary.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
                </div>

                <div className="absolute inset-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/')}
                            className="absolute top-8 left-8 group flex items-center space-x-3 text-white hover:text-gray-200"
                        >
                            <div className="p-2.5 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 transition-all">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="font-medium">Back to Trips</span>
                        </motion.button>

                        {/* Header Actions */}
                        <div className="absolute top-8 right-8 flex items-center space-x-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setLiked(!liked)}
                                className={`p-3 backdrop-blur-sm rounded-xl transition-all ${liked
                                    ? 'bg-linear-to-r from-pink-500 to-rose-500 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                            >
                                <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30"
                            >
                                <Share2 size={20} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30"
                            >
                                <MoreVertical size={20} />
                            </motion.button>
                        </div>

                        {/* Trip Info */}
                        <div className="text-white">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                    {itinerary.status}
                                </span>
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                                    {itinerary.duration}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                {itinerary.title}
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">Destination</p>
                                        <p className="font-semibold">{itinerary.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2.5 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">Dates</p>
                                        <p className="font-semibold">{itinerary.dates}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2.5 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">Travelers</p>
                                        <p className="font-semibold">{itinerary.travelers} person{itinerary.travelers > 1 ? 's' : ''}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="p-2.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">Total Budget</p>
                                        <p className="font-semibold">${itinerary.budget.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Itinerary Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <AnimatedButton
                                onClick={() => navigate(`/edit/${id}`)}
                                icon={Edit2}
                                variant="primary"
                                className="bg-linear-to-r from-blue-500 to-purple-600"
                            >
                                Edit Itinerary
                            </AnimatedButton>

                            <AnimatedButton
                                onClick={() => window.print()}
                                icon={Printer}
                                variant="outline"
                            >
                                Print
                            </AnimatedButton>

                            <AnimatedButton
                                onClick={() => {/* Export logic */ }}
                                icon={Download}
                                variant="outline"
                            >
                                Export
                            </AnimatedButton>

                            <AnimatedButton
                                onClick={() => {/* Share logic */ }}
                                icon={Share2}
                                variant="outline"
                            >
                                Share
                            </AnimatedButton>
                        </div>

                        {/* Description */}
                        <ModernCard className="bg-white/80 backdrop-blur-sm">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl">
                                    <Navigation className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                                        About This Trip
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">{itinerary.description}</p>
                                </div>
                            </div>
                        </ModernCard>

                        {/* Day Selector */}
                        <ModernCard className="bg-white/80 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    Daily Itinerary
                                </h2>
                                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                    {itinerary.days.length} days
                                </span>
                            </div>

                            <div className="flex overflow-x-auto pb-6 space-x-3">
                                {itinerary.days.map(day => (
                                    <motion.button
                                        key={day.day}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setActiveDay(day.day)}
                                        className={`shrink-0 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${activeDay === day.day
                                            ? 'border-transparent bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="text-center min-w-30">
                                            <p className="font-semibold text-lg">Day {day.day}</p>
                                            <p className="text-sm mt-1 opacity-90">{day.date}</p>
                                            <div className="mt-2 text-xs px-2 py-1 bg-gray-100 rounded-full">
                                                {day.activities.length} activities
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </ModernCard>

                        {/* Activities for Selected Day */}
                        {itinerary.days.find(d => d.day === activeDay) && (
                            <ModernCard className="bg-white/80 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                            Day {activeDay} - {itinerary.days.find(d => d.day === activeDay).location}
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            {itinerary.days.find(d => d.day === activeDay).date}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Daily Budget</p>
                                        <p className="text-2xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            ${itinerary.days.find(d => d.day === activeDay).budget}
                                        </p>
                                    </div>
                                </div>

                                <ActivityTimeline
                                    activities={itinerary.days.find(d => d.day === activeDay).activities}
                                />
                            </ModernCard>
                        )}
                    </div>

                    {/* Right Column - Stats & Info */}
                    <div className="space-y-8">

                        {/* Quick Stats */}
                        <ModernCard className="bg-white/80 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                Trip Stats
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-5 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl">
                                    <p className="text-3xl font-bold text-gray-900">{itinerary.stats.activities}</p>
                                    <p className="text-sm text-gray-500 mt-1">Activities</p>
                                </div>
                                <div className="text-center p-5 bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl">
                                    <p className="text-3xl font-bold text-gray-900">{itinerary.stats.distance}</p>
                                    <p className="text-sm text-gray-500 mt-1">Distance</p>
                                </div>
                                <div className="text-center p-5 bg-linear-to-br from-amber-50 to-orange-100 rounded-2xl">
                                    <p className="text-3xl font-bold text-gray-900">{itinerary.stats.avgDailyCost}</p>
                                    <p className="text-sm text-gray-500 mt-1">Avg Daily Cost</p>
                                </div>
                                <div className="text-center p-5 bg-linear-to-br from-purple-50 to-pink-100 rounded-2xl">
                                    <p className="text-3xl font-bold text-gray-900">{itinerary.stats.co2Saved}</p>
                                    <p className="text-sm text-gray-500 mt-1">CO₂ Saved</p>
                                </div>
                            </div>
                        </ModernCard>

                        {/* Budget Breakdown */}
                        <ModernCard className="bg-white/80 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                                Budget Breakdown
                            </h2>
                            <div className="space-y-5">
                                {itinerary.expenses.map((expense, idx) => (
                                    <div key={expense.category} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">{expense.category}</span>
                                            <span className="font-semibold text-gray-900">${expense.amount}</span>
                                        </div>
                                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`absolute h-full bg-linear-to-r ${expense.color} rounded-full`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${expense.percentage}%` }}
                                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-gray-600">
                                                {expense.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ModernCard>

                        {/* Travel Notes */}
                        <ModernCard className="bg-linear-to-br from-blue-50/50 to-purple-50/50 border border-blue-100/50">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl">
                                    <CheckCircle className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Travel Notes</h3>
                                    <p className="text-sm text-gray-500">Important reminders</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {itinerary.notes.map((note, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start space-x-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl"
                                    >
                                        <div className="h-6 w-6 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm shrink-0">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-700">{note}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </ModernCard>

                        {/* Chat Assistant */}
                        <ModernCard className="bg-linear-to-br from-purple-50/50 to-pink-50/50 border border-purple-100/50">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl">
                                    <MessageCircle className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                                    <p className="text-sm text-gray-500">Chat with our AI assistant</p>
                                </div>
                            </div>

                            <AnimatedButton
                                fullWidth
                                variant="primary"
                                className="bg-linear-to-r from-purple-500 to-pink-600"
                                onClick={() => {/* Open chat */ }}
                            >
                                <MessageCircle size={20} />
                                Open AI Assistant
                            </AnimatedButton>
                        </ModernCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryPage;