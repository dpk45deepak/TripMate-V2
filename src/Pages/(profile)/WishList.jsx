import React, { useState, useContext, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, Shield, Calendar, Trash2, ShoppingBag, Clock, ChevronRight } from 'lucide-react';
import AuthContext from "../../Context/AuthContext";
import BACKEND_API from "../../Services/Backend";

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'hotels', 'destinations', 'activities'
    const [sortBy, setSortBy] = useState('added'); // 'added', 'price', 'rating'

    // Fetch wishlist data
    React.useEffect(() => {
        const fetchWishlist = async () => {
            if (!user?._id) return;

            try {
                setLoading(true);
                const response = await BACKEND_API.Wishlist.getUserWishlist(user._id);
                setWishlistItems(response.data || []);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
                setWishlistItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);

    const filteredItems = useMemo(() => {
        let filtered = [...wishlistItems];

        // Apply type filter
        if (filter !== 'all') {
            filtered = filtered.filter(item => item.type === filter);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return (b.price || 0) - (a.price || 0);
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'added':
                default:
                    return new Date(b.addedDate || 0) - new Date(a.addedDate || 0);
            }
        });

        return filtered;
    }, [wishlistItems, filter, sortBy]);

    const removeFromWishlist = async (itemId) => {
        try {
            await BACKEND_API.Wishlist.removeFromWishlist(user._id, itemId);
            setWishlistItems(prev => prev.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const addToCart = async (item) => {
        try {
            await BACKEND_API.Cart.addToCart(user._id, {
                itemId: item._id,
                type: item.type,
                title: item.title,
                price: item.price,
                image: item.image
            });
            alert('Added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                    <p className="text-gray-600">Your saved destinations and experiences</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Items"
                        value={wishlistItems.length}
                        icon={Heart}
                        color="emerald"
                    />
                    <StatCard
                        title="Destinations"
                        value={wishlistItems.filter(item => item.type === 'destination').length}
                        icon={MapPin}
                        color="blue"
                    />
                    <StatCard
                        title="Hotels"
                        value={wishlistItems.filter(item => item.type === 'hotel').length}
                        icon={ShoppingBag}
                        color="purple"
                    />
                    <StatCard
                        title="Activities"
                        value={wishlistItems.filter(item => item.type === 'activity').length}
                        icon={Clock}
                        color="amber"
                    />
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex space-x-2">
                            {['all', 'destination', 'hotel', 'activity'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === type
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="added">Recently Added</option>
                                <option value="price">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>

                            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                                Share Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                {/* Wishlist Items */}
                {filteredItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <WishlistItem
                                key={item._id}
                                item={item}
                                onRemove={removeFromWishlist}
                                onAddToCart={addToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`p-2 rounded-lg bg-${color}-50`}>
                <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
        </div>
    </div>
);

const WishlistItem = ({ item, onRemove, onAddToCart }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
        <div className="relative">
            <img
                src={item.image || 'https://placehold.co/400x250/4CAF50/ffffff?text=No+Image'}
                alt={item.title}
                className="w-full h-48 object-cover"
            />
            <button
                onClick={() => onRemove(item._id)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                aria-label="Remove from wishlist"
            >
                <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {item.type}
                </span>
            </div>
        </div>

        <div className="p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{item.title}</h3>
                <div className="flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                    <Star className="w-3 h-3 fill-emerald-500 text-emerald-500 mr-1" />
                    {item.rating?.toFixed(1) || 'N/A'}
                </div>
            </div>

            <div className="text-sm text-gray-600 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                <span className="line-clamp-1">{item.location}</span>
            </div>

            <div className="flex items-center justify-between mb-3">
                <div className="text-sm">
                    <span className="font-bold text-gray-900">Rs. {item.price?.toLocaleString() || 'N/A'}</span>
                    <span className="text-gray-500"> / {item.perUnit || 'night'}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <Shield className="w-3 h-3 mr-1 text-green-500" />
                    {item.safety_rating?.toFixed(1) || 'N/A'}
                </div>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => onAddToCart(item)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                    Book Now
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </motion.div>
);

const EmptyWishlist = () => (
    <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-6">
            Start adding destinations, hotels, and activities you love
        </p>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
            Explore Destinations
        </button>
    </div>
);

export default Wishlist;