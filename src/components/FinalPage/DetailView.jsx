import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import icons from "../FinalPage/Icons.jsx";
import WeatherWidget from '../FinalPage/WeatherWidget.jsx'
import CurrencyConverter from "../FinalPage/CurrencyConverter.jsx";
import DestinationCard from '../FinalPage/DestinationCard.jsx';

// Enhanced Detail View Component
const DetailView = ({
    destination,
    onBack,
    favorites,
    onToggleFavorite,
    similarTrips = [],
    onSelect,
}) => {
    if (!destination) return null;

    const d = destination.details;
    const [currentImage, setCurrentImage] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isBookingSticky, setIsBookingSticky] = useState(false);

    // Enhanced images array with more variety
    const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjdmE4KbyzYU8FCWH-vlKi19CA8te9uGERg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDBfiqPZuCrPhBhQ1IFUMge0Atj-lkaOiLA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv0c1QjBUt__3Cyj8EYFVg2PhEVAoKMhHJjg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2FuzbQRZbjHCtbpEDhl6k_p0HNrkfHj-A-Q&s"
    ];


    // Sample reviews data
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "2 weeks ago",
            comment:
                "Absolutely breathtaking experience! The guides were knowledgeable and the scenery was beyond expectations.",
            avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            id: 2,
            name: "Mike Chen",
            rating: 4,
            date: "1 month ago",
            comment:
                "Great adventure with amazing views. The accommodation was comfortable and food was delicious.",
            avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
    ];

    // Sticky booking widget effect
    useEffect(() => {
        const handleScroll = () => {
            const bookingWidget = document.getElementById("booking-widget");
            if (bookingWidget) {
                const rect = bookingWidget.getBoundingClientRect();
                setIsBookingSticky(rect.top <= 100);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Enhanced IconText component
    const IconText = ({ icon: Icon, text, subtext, color = "teal" }) => (
        <div className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`p-3 bg-${color}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <div className="flex-1">
                <p className="font-semibold text-gray-900 text-lg">{text}</p>
                {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
            </div>
        </div>
    );

    // Review Stars Component
    const ReviewStars = ({ rating }) => (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <icons.Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );

    // Navigation Tabs Component
    const DetailTabs = () => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex overflow-x-auto border-b border-gray-200">
                {["overview", "itinerary", "reviews", "location", "photos"].map(
                    (tab) => (
                        <button
                            key={tab}
                            className={`flex-1 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    )
                )}
            </div>

            <div className="p-6">
                {activeTab === "overview" && (
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {d.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                                    Trip Highlights
                                </h3>
                                <ul className="space-y-3">
                                    {d.highlights?.map((highlight, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                                    What's Included
                                </h3>
                                <ul className="space-y-3">
                                    {d.included?.map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Customer Reviews
                                </h3>
                                <div className="flex items-center mt-2">
                                    <ReviewStars rating={d.rating} />
                                    <span className="ml-2 text-gray-600">
                                        {d.rating} out of 5
                                    </span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-600">{d.reviews} reviews</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                                Write a Review
                            </button>
                        </div>

                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {review.name}
                                                </h4>
                                                <ReviewStars rating={review.rating} />
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "location" && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">Location & Map</h3>
                        <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                            <div className="text-center">
                                <icons.MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">Interactive map of {d.location}</p>
                                <button className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                                    View Full Map
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Getting There
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Nearest airport: {d.location} International Airport
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Best Time to Visit
                                </h4>
                                <p className="text-sm text-gray-600">{d.season} season</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "photos" && (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`aspect-square rounded-lg overflow-hidden ${currentImage === index
                                            ? "ring-2 ring-indigo-500 ring-offset-2"
                                            : ""
                                        }`}
                                    onClick={() => setCurrentImage(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`${destination.title} ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Sticky Booking Widget Component
    const StickyBookingWidget = () => (
        <motion.div
            id="booking-widget"
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 ${isBookingSticky ? "fixed top-4 z-40 w-[380px]" : "relative"
                }`}
            initial={isBookingSticky ? { scale: 0.95, opacity: 0 } : false}
            animate={isBookingSticky ? { scale: 1, opacity: 1 } : false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Book This Trip</h3>
                        <p className="text-2xl font-extrabold text-teal-600 mt-1">
                            ₹{d.price?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">per person</p>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                        <icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold text-gray-900">{d.rating}</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Next available:</span>
                        <span className="font-medium text-gray-900">{d.dates}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">{d.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Group size:</span>
                        <span className="font-medium text-gray-900">{d.people} people</span>
                    </div>
                </div>

                <motion.button
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBookingModal(true)}
                >
                    Book Now
                    <icons.ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>

                <p className="text-xs text-center text-gray-400 mt-3">
                    Free cancellation up to 30 days before travel
                </p>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50"
            layoutId={`card-${destination.id}`}
        >
            {/* Compact Mobile Header */}
            <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={onBack}
                    >
                        <icons.ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-900 truncate max-w-xs text-center">
                        {destination.title}
                    </h1>
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => onToggleFavorite(destination.id)}
                    >
                        <icons.Heart
                            className={`w-6 h-6 ${favorites.includes(destination.id)
                                    ? "fill-red-500 stroke-red-500 text-red-500"
                                    : "text-gray-600"
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Desktop Header */}
                <div className="absolute top-0 left-0 w-full p-6 hidden lg:flex justify-between items-center">
                    <motion.button
                        onClick={onBack}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all group"
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <icons.ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </motion.button>

                    <div className="flex items-center space-x-3">
                        <motion.button
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-600 hover:text-red-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onToggleFavorite(destination.id)}
                        >
                            <icons.Heart
                                className={`w-6 h-6 ${favorites.includes(destination.id)
                                        ? "fill-red-500 stroke-red-500"
                                        : ""
                                    }`}
                            />
                        </motion.button>
                        <motion.button
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-600 hover:text-blue-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <icons.ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${currentImage === index
                                    ? "bg-white scale-125"
                                    : "bg-white/50 hover:bg-white/70"
                                }`}
                            onClick={() => setCurrentImage(index)}
                        />
                    ))}
                </div>

                {/* Image Thumbnails */}
                <div className="absolute bottom-6 right-6 hidden lg:flex space-x-2">
                    {images.slice(0, 4).map((image, index) => (
                        <button
                            key={index}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImage === index
                                    ? "border-white scale-110"
                                    : "border-white/30 hover:border-white/50"
                                }`}
                            onClick={() => setCurrentImage(index)}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Hero Content */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {destination.flag} {destination.country}
                            </span>
                            <span className="bg-teal-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {d.difficulty}
                            </span>
                            <span className="bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                                {d.duration}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                            {destination.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-lg">
                            <div className="flex items-center">
                                <icons.Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
                                <span className="font-bold">{d.rating}</span>
                                <span className="text-white/80 ml-1">
                                    ({d.reviews} reviews)
                                </span>
                            </div>
                            <div className="flex items-center">
                                <icons.MapPin className="w-5 h-5 mr-2 text-white/80" />
                                <span>{d.location}</span>
                            </div>
                            <div className="flex items-center">
                                <icons.Users className="w-5 h-5 mr-2 text-white/80" />
                                <span>{d.people} people max</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Facts Grid */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <IconText
                                icon={icons.Calendar}
                                text={d.dates}
                                subtext="Travel Dates"
                                color="blue"
                            />
                            <IconText
                                icon={icons.MapPin}
                                text={d.distance}
                                subtext="Distance"
                                color="green"
                            />
                            <IconText
                                icon={icons.Users}
                                text={`${d.people} people`}
                                subtext="Group Size"
                                color="purple"
                            />
                            <IconText
                                icon={icons.IndianRupee}
                                text={`₹${d.price?.toLocaleString()}`}
                                subtext="Per person"
                                color="teal"
                            />
                        </motion.div>

                        {/* Weather Widget */}
                        <WeatherWidget
                            location={d.location}
                            country={destination.country}
                        />

                        {/* Tabbed Content */}
                        <DetailTabs />

                        {/* Amenities Section */}
                        <motion.section
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-indigo-800 mb-6">
                                Amenities & Services
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {d.amenities?.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                    >
                                        <icons.Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                                        <span className="text-gray-800 font-medium">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Similar Trips Section */}
                        {similarTrips.length > 0 && (
                            <section className="mt-12">
                                <h2 className="text-2xl font-bold text-indigo-900 mb-6">
                                    Similar Adventures
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {similarTrips.slice(0, 4).map((trip) => (
                                        <DestinationCard
                                            key={trip.id}
                                            destination={trip}
                                            onSelect={onSelect}
                                            layout="list"
                                            isFavorite={favorites.includes(trip.id)}
                                            onToggleFavorite={onToggleFavorite}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Booking Widget */}
                    <div className="lg:col-span-1">
                        <div
                            className={`${isBookingSticky ? "lg:h-0 lg:overflow-hidden" : "space-y-6"
                                }`}
                        >
                            {/* Currency Converter */}
                            <CurrencyConverter
                                basePrice={d.price}
                                country={destination.country}
                                location={d.location}
                            />

                            {/* Hotel Card */}
                            <motion.div
                                className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3 className="text-xl font-bold text-indigo-800 mb-4">
                                    Accommodation
                                </h3>
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                        alt={d.hotel}
                                        className="w-16 h-16 rounded-xl object-cover shadow-md"
                                    />
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">
                                            {d.hotel}
                                        </h4>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            <icons.Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                            {d.rating} ({d.reviews} reviews)
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Price per person</span>
                                        <span className="text-2xl font-extrabold text-teal-600">
                                            ₹{d.price?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Taxes & fees</span>
                                        <span>Included</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Trip Details Card */}
                            <motion.div
                                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Difficulty</span>
                                        <span className="font-semibold">{d.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Best Season</span>
                                        <span className="font-semibold">{d.season}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Altitude</span>
                                        <span className="font-semibold">{d.altitude}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Trip Type</span>
                                        <span className="font-semibold">
                                            {destination.type === "domestic" ? "Domestic" : "Foreign"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center transition-all hover:shadow-xl hover:shadow-teal-300/60"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowBookingModal(true)}
                            >
                                Book Your Trip Now
                                <icons.ArrowRight className="w-5 h-5 ml-2" />
                            </motion.button>

                            <p className="text-xs text-center text-gray-400">
                                Secure payment via Google Pay, Apple Pay, and major cards.
                            </p>
                        </div>

                        {/* Sticky Booking Widget */}
                        <div className="hidden lg:block">
                            <StickyBookingWidget />
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Booking Modal */}
            <AnimatePresence>
                {showBookingModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={() => setShowBookingModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-indigo-900">
                                    Book Your Adventure
                                </h3>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    onClick={() => setShowBookingModal(false)}
                                >
                                    <icons.ArrowLeft className="w-6 h-6 transform rotate-180" />
                                </button>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Complete your booking for {destination.title}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Travel Dates
                                    </label>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white">
                                        <option>Select dates</option>
                                        <option>May 10 - May 17, 2024</option>
                                        <option>Jun 14 - Jun 21, 2024</option>
                                        <option>Jul 12 - Jul 19, 2024</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Travelers
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        defaultValue="1"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Total</span>
                                        <span className="text-2xl font-bold text-teal-600">
                                            ₹{d.price?.toLocaleString()}
                                        </span>
                                    </div>

                                    <button className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
 
export default DetailView;