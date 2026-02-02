import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, Eye, Download, Filter, ChevronDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AuthContext from "../../Context/AuthContext";
import BACKEND_API from "../../Services/Backend";

const History = () => {
    const { user } = useContext(AuthContext);
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'bookings', 'searches', 'views'
    const [dateRange, setDateRange] = useState('all'); // 'all', 'today', 'week', 'month'
    const [showFilters, setShowFilters] = useState(false);

    React.useEffect(() => {
        const fetchHistory = async () => {
            if (!user?._id) return;

            try {
                setLoading(true);
                const response = await BACKEND_API.History.getUserHistory(user._id);
                setHistoryItems(response.data || []);
            } catch (error) {
                console.error('Error fetching history:', error);
                setHistoryItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    const filteredHistory = useMemo(() => {
        let filtered = [...historyItems];

        // Apply type filter
        if (filter !== 'all') {
            filtered = filtered.filter(item => item.type === filter);
        }

        // Apply date filter
        const now = new Date();
        switch (dateRange) {
            case 'today':
                filtered = filtered.filter(item => {
                    const itemDate = new Date(item.timestamp);
                    return itemDate.toDateString() === now.toDateString();
                });
                break;
            case 'week':
                const weekAgo = new Date(now.setDate(now.getDate() - 7));
                filtered = filtered.filter(item => new Date(item.timestamp) >= weekAgo);
                break;
            case 'month':
                const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                filtered = filtered.filter(item => new Date(item.timestamp) >= monthAgo);
                break;
        }

        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [historyItems, filter, dateRange]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' };
            case 'cancelled':
                return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' };
            case 'pending':
                return { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' };
            default:
                return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity History</h1>
                    <p className="text-gray-600">Track your bookings, searches, and views</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Activities</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{historyItems.length}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50">
                                <Clock className="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Bookings</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {historyItems.filter(item => item.type === 'booking').length}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-50">
                                <Calendar className="w-6 h-6 text-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Recent Searches</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                    {historyItems.filter(item => item.type === 'search').length}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50">
                                <Eye className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>

                            <div className="flex space-x-2">
                                {['all', 'booking', 'search', 'view'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilter(type)}
                                        className={`px-3 py-1 rounded-full text-sm ${filter === type
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Period:</span>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                            </select>
                        </div>
                    </div>

                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-200"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                        <option>All Types</option>
                                        <option>Hotel Booking</option>
                                        <option>Flight Booking</option>
                                        <option>Destination View</option>
                                        <option>Search Query</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                        <option>All Status</option>
                                        <option>Completed</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                                        <option>Most Recent</option>
                                        <option>Oldest First</option>
                                        <option>Price: High to Low</option>
                                        <option>Price: Low to High</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* History Items */}
                {filteredHistory.length === 0 ? (
                    <EmptyHistory />
                ) : (
                    <div className="space-y-4">
                        {filteredHistory.map((item) => (
                            <HistoryItem key={item._id} item={item} getStatusIcon={getStatusIcon} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const HistoryItem = ({ item, getStatusIcon }) => {
    const StatusIcon = getStatusIcon(item.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${StatusIcon.bg}`}>
                        <StatusIcon.icon className={`w-5 h-5 ${StatusIcon.color}`} />
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(item.timestamp).toLocaleString()}
                            {item.location && (
                                <>
                                    <span className="mx-2">•</span>
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {item.location}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        {item.price && (
                            <p className="font-semibold text-gray-900">Rs. {item.price.toLocaleString()}</p>
                        )}
                        <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Download className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {item.details && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                    {item.details}
                </div>
            )}
        </motion.div>
    );
};

const EmptyHistory = () => (
    <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
        <p className="text-gray-500 mb-6">
            Your activity history will appear here as you explore and book
        </p>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
            Start Exploring
        </button>
    </div>
);

export default History;