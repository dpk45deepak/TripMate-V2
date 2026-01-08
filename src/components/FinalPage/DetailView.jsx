import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import icons from "../FinalPage/Icons.jsx";
import WeatherWidget from '../FinalPage/WeatherWidget.jsx';
import CurrencyConverter from "../FinalPage/CurrencyConverter.jsx";
import DestinationCard from '../FinalPage/DestinationCard.jsx';
import AnimatedTravelBackground from "../../components/AnimatedTravelBackground.jsx";

// Enhanced Detail View Component
const DetailView = ({
    destination,
    onBack,
    favorites = [],
    onToggleFavorite,
    similarTrips = [],
    onSelect,
}) => {
    // State Management
    const [currentImage, setCurrentImage] = useState(0);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isBookingSticky, setIsBookingSticky] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [travelers, setTravelers] = useState(1);
    const [showAmenities, setShowAmenities] = useState(false);

    const bookingRef = useRef(null);
    const headerRef = useRef(null);

    // Fallback data structure
    const d = destination?.details || {
        description: "Experience an unforgettable adventure with breathtaking views and cultural immersion.",
        highlights: [
            "Guided hiking tours",
            "Local cuisine tasting",
            "Cultural village visits",
            "Photography sessions",
            "Wildlife spotting"
        ],
        included: [
            "Accommodation",
            "All meals",
            "Transportation",
            "Guide services",
            "Permits and fees"
        ],
        amenities: [
            "Free WiFi",
            "Breakfast included",
            "Swimming pool",
            "Spa services",
            "Airport transfer",
            "24/7 Support"
        ],
        rating: 4.8,
        reviews: 124,
        price: 24999,
        dates: "May 15 - 22, 2024",
        duration: "7 days",
        people: "12",
        difficulty: "Moderate",
        season: "Spring",
        altitude: "3,500m",
        location: "Mountain Region",
        distance: "150 km",
        hotel: "Premium Mountain Resort"
    };

    // Enhanced images array
    const images = [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    ];

    // Reviews data
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "2 weeks ago",
            comment: "Absolutely breathtaking experience! The guides were knowledgeable and the scenery was beyond expectations.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            id: 2,
            name: "Mike Chen",
            rating: 4,
            date: "1 month ago",
            comment: "Great adventure with amazing views. The accommodation was comfortable and food was delicious.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            id: 3,
            name: "Priya Sharma",
            rating: 5,
            date: "3 days ago",
            comment: "Life-changing experience! Highly recommend for anyone looking for adventure and cultural immersion.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        }
    ];

    // Sticky booking widget and header effects
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 100);

            if (bookingRef.current) {
                const rect = bookingRef.current.getBoundingClientRect();
                setIsBookingSticky(rect.top <= 100);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-advance images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Enhanced IconText Component
    const IconText = ({ icon: Icon, text, subtext, color = "teal" }) => (
        <motion.div
            className="flex items-start space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={`p-3 bg-${color}-50 rounded-lg flex-shrink-0`}>
                <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm md:text-base truncate">{text}</p>
                {subtext && <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{subtext}</p>}
            </div>
        </motion.div>
    );

    // Review Stars Component
    const ReviewStars = ({ rating, size = "sm" }) => {
        const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4";
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <icons.Star
                        key={star}
                        className={`${starSize} ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        );
    };

    // Navigation Tabs Component
    const DetailTabs = () => {
        const tabs = [
            { id: "overview", label: "Overview", icon: icons.Info },
            { id: "itinerary", label: "Itinerary", icon: icons.Calendar },
            { id: "reviews", label: "Reviews", icon: icons.Star },
            { id: "location", label: "Location", icon: icons.MapPin },
            { id: "photos", label: "Photos", icon: icons.Camera },
        ];

        return (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`flex items-center space-x-2 px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center min-w-[120px] ${activeTab === tab.id
                                ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="p-4 sm:p-6">
                    {activeTab === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                {d.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                                        Trip Highlights
                                    </h3>
                                    <ul className="space-y-3">
                                        {d.highlights?.map((highlight, index) => (
                                            <motion.li
                                                key={index}
                                                className="flex items-center text-gray-700"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                                <span>{highlight}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                                        What's Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {d.included?.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                className="flex items-center text-gray-700"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <icons.Check className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Customer Reviews
                                    </h3>
                                    <div className="flex items-center mt-2 flex-wrap gap-2">
                                        <ReviewStars rating={d.rating} size="lg" />
                                        <span className="ml-2 text-gray-600 font-medium">
                                            {d.rating} out of 5
                                        </span>
                                        <span className="text-gray-300 hidden sm:inline">•</span>
                                        <span className="text-gray-600">{d.reviews} reviews</span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors w-full sm:w-auto">
                                    Write a Review
                                </button>
                            </div>

                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <motion.div
                                        key={review.id}
                                        className="bg-gray-50 rounded-xl p-4 sm:p-6"
                                        whileHover={{ y: -2 }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-3">
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
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <ReviewStars rating={review.rating} />
                                                        <span className="text-sm text-gray-500">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "location" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Location & Map</h3>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-64 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <icons.MapPin className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                                    <p className="text-gray-700 font-medium">Interactive map of {d.location}</p>
                                    <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors">
                                        View Full Map
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        </motion.div>
                    )}

                    {activeTab === "photos" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Photo Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                {images.map((image, index) => (
                                    <motion.button
                                        key={index}
                                        className={`aspect-square rounded-lg overflow-hidden ${currentImage === index
                                            ? "ring-3 ring-indigo-500 ring-offset-2"
                                            : ""
                                            }`}
                                        onClick={() => setCurrentImage(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <img
                                            src={image}
                                            alt={`${destination?.title || 'Destination'} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        );
    };

    // Sticky Booking Widget Component
    const StickyBookingWidget = () => (
        <motion.div
            id="booking-widget"
            ref={bookingRef}
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${isBookingSticky ? "fixed top-4 z-50 w-[calc(100%-2rem)] max-w-sm" : "relative"
                }`}
            initial={isBookingSticky ? { scale: 0.95, opacity: 0 } : false}
            animate={isBookingSticky ? { scale: 1, opacity: 1 } : false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Book This Trip</h3>
                        <p className="text-2xl sm:text-3xl font-extrabold text-teal-600 mt-1">
                            ₹{(d.price || 0).toLocaleString()}
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
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center"
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

    // Sticky Header for Mobile
    const StickyHeader = () => (
        <motion.header
            ref={headerRef}
            initial={{ y: -100 }}
            animate={{ y: isScrolled ? 0 : -100 }}
            className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4"
        >
            <div className="flex items-center justify-between">
                <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={onBack}
                >
                    <icons.ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px] text-center">
                    {destination?.title || "Adventure Destination"}
                </h1>
                <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => onToggleFavorite?.(destination?.id)}
                >
                    <icons.Heart
                        className={`w-6 h-6 ${favorites?.includes(destination?.id)
                            ? "fill-red-500 stroke-red-500 text-red-500"
                            : "text-gray-600"
                            }`}
                    />
                </button>
            </div>
        </motion.header>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        >
            {/* Sticky Mobile Header */}
            <StickyHeader />

            {/* Hero Section */}
            <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                {/* Animated Background */}
                <AnimatedTravelBackground />

                {/* Hero Image */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={images[currentImage]}
                        alt={destination?.title || "Travel destination"}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                    />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Desktop Navigation */}
                <div className="absolute top-0 left-0 w-full p-4 sm:p-6 hidden lg:flex justify-between items-center z-10">
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
                            onClick={() => onToggleFavorite?.(destination?.id)}
                        >
                            <icons.Heart
                                className={`w-6 h-6 ${favorites?.includes(destination?.id)
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
                            <icons.Share2 className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Image Navigation */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${currentImage === index
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/70"
                                }`}
                            onClick={() => setCurrentImage(index)}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                            <span className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {destination?.flag || "🏔️"} {destination?.country || "Mountain Region"}
                            </span>
                            <span className="bg-teal-500/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {d.difficulty}
                            </span>
                            <span className="bg-purple-500/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                {d.duration}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                            {destination?.title || "Mountain Adventure Expedition"}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
                            <div className="flex items-center">
                                <icons.Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 mr-2" />
                                <span className="font-bold">{d.rating}</span>
                                <span className="text-white/80 ml-1">
                                    ({d.reviews} reviews)
                                </span>
                            </div>
                            <div className="flex items-center">
                                <icons.MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white/80" />
                                <span>{d.location}</span>
                            </div>
                            <div className="flex items-center">
                                <icons.Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white/80" />
                                <span>{d.people} people max</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Quick Facts Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
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
                        text={`₹${(d.price || 0).toLocaleString()}`}
                        subtext="Per person"
                        color="teal"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Weather Widget */}
                        <WeatherWidget
                            location={d.location}
                            country={destination?.country}
                        />

                        {/* Tabbed Content */}
                        <DetailTabs />

                        {/* Amenities Section */}
                        <motion.section
                            className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-indigo-800">
                                    Amenities & Services
                                </h2>
                                <button
                                    onClick={() => setShowAmenities(!showAmenities)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    {showAmenities ? "Show Less" : "Show All"}
                                </button>
                            </div>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 ${!showAmenities ? 'max-h-48 overflow-hidden' : ''}`}>
                                {d.amenities?.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center p-3 sm:p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.05 * index }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                    >
                                        <icons.Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                                        <span className="text-gray-800 font-medium text-sm sm:text-base">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Similar Trips */}
                        {similarTrips.length > 0 && (
                            <section className="pt-6 sm:pt-8 border-t border-gray-200">
                                <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-4 sm:mb-6">
                                    Similar Adventures
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {similarTrips.slice(0, 2).map((trip) => (
                                        <DestinationCard
                                            key={trip.id}
                                            destination={trip}
                                            onSelect={onSelect}
                                            layout="list"
                                            isFavorite={favorites?.includes(trip.id)}
                                            onToggleFavorite={onToggleFavorite}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                        {/* Currency Converter */}
                        <CurrencyConverter
                            basePrice={d.price}
                            country={destination?.country}
                            location={d.location}
                        />

                        {/* Hotel Card */}
                        <motion.div
                            className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-indigo-100"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-indigo-800 mb-4">
                                Accommodation
                            </h3>
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt={d.hotel}
                                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">
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
                                    <span className="text-xl sm:text-2xl font-extrabold text-teal-600">
                                        ₹{(d.price || 0).toLocaleString()}
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
                            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 rounded-2xl text-white shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Facts</h3>
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
                                        {destination?.type === "domestic" ? "Domestic" : "Foreign"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Button for Mobile */}
                        <div className="lg:hidden">
                            <motion.button
                                className="w-full py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowBookingModal(true)}
                            >
                                Book Your Trip Now
                                <icons.ArrowRight className="w-5 h-5 ml-2" />
                            </motion.button>
                            <p className="text-xs text-center text-gray-400 mt-3">
                                Secure payment via Google Pay, Apple Pay, and major cards.
                            </p>
                        </div>

                        {/* Sticky Booking Widget (Desktop) */}
                        <div className="hidden lg:block">
                            <StickyBookingWidget />
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed CTA for Mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent pt-8 pb-4 px-4 z-30">
                <motion.button
                    className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBookingModal(true)}
                >
                    Book Now - ₹{(d.price || 0).toLocaleString()}
                    <icons.ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
            </div>

            {/* Booking Modal */}
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
                            className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-indigo-900">
                                    Book Your Adventure
                                </h3>
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    onClick={() => setShowBookingModal(false)}
                                >
                                    <icons.X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-gray-600 mb-6">
                                Complete your booking for {destination?.title || "this adventure"}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Travel Dates
                                    </label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        <option value="">Select dates</option>
                                        <option>May 10 - May 17, 2024</option>
                                        <option>Jun 14 - Jun 21, 2024</option>
                                        <option>Jul 12 - Jul 19, 2024</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Travelers
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                        >
                                            <icons.Minus className="w-5 h-5" />
                                        </button>
                                        <span className="text-xl font-bold">{travelers}</span>
                                        <button
                                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                            onClick={() => setTravelers(travelers + 1)}
                                        >
                                            <icons.Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Price per person</span>
                                            <span className="font-medium">₹{(d.price || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Number of travelers</span>
                                            <span className="font-medium">{travelers}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                                            <span className="text-gray-900">Total</span>
                                            <span className="text-2xl text-teal-600">
                                                ₹{((d.price || 0) * travelers).toLocaleString()}
                                            </span>
                                        </div>
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

            {/* Custom CSS for scrollbar */}
            <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </motion.div>
    );
};

export default DetailView;