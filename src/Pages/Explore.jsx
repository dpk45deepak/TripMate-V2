import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Added Landmark and replaced MountainSnow (which you used) with appropriate icons for clarity.
import { Map, Zap, Ship, MessageCircle, Twitter, Instagram, Facebook, BookOpen, Star, StarHalf, Sun, Waves, Anchor, Bird, Menu, X, Mountain, Castle, Wine, Landmark, Waves as Ocean, PawPrint, Bus, Heart } from 'lucide-react';

// --- MOCK DATA FOR ALL CITIES ---
const citiesData = {
    mexico: {
        id: 'mexico',
        name: "Mexico",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHzb3ASXhWVXTyVp3TuLh7VWVAna7qfVq9BGxws9-w0C5BRP5cmmM1aQP7lcV20ySLmA&usqp=CAU",
        introductoryText: "Snorkeling in tropical waters, climbing ancient pyramids, and exploring the hidden world of cenotes are just a few samples of what Mexico has to offer.",
        islandsData: [
            {
                id: 1,
                name: "Isla Mujeres",
                tagline: "Paradise Found: The Island of Women",
                description: "Snorkeling in tropical waters, climbing a pyramid, and exploring the breathtaking cliffside views at Punta Sur are just a few samples of what Isla Mujeres has to offer. Experience the tranquil, turquoise Caribbean waters.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThiEJyvqU9vUaSQhrOGibPL11a0yZBWes-9pygw1LgEtekO00guKBSUa0alY8LpFD6Btc&usqp=CAU",
                rating: 5,
                features: [
                    { icon: Sun, label: 'Beach Life' },
                    { icon: Waves, label: 'Snorkeling' },
                    { icon: Anchor, label: 'Yachting' },
                    { icon: Ship, label: 'Ferry Access' },
                ]
            },
            {
                id: 2,
                name: "Isla Holbox",
                tagline: "The Bohemian Gateway: A True Escape",
                description: "Located off the north coast of the Yucatán Peninsula, Holbox is car-free and famous for its unpaved roads and vibrant street art. It is best known for being a seasonal home to the majestic whale sharks.",
                image: "https://i.ytimg.com/vi/UByINB69_xo/maxresdefault.jpg",
                rating: 4.5,
                features: [
                    { icon: Bird, label: 'Flamingos' },
                    { icon: Ship, label: 'Whale Sharks' },
                    { icon: Zap, label: 'Bioluminescence' },
                    { icon: Map, label: 'Nature Reserve' },
                ]
            },
            {
                id: 3,
                name: "Cozumel",
                tagline: "Diver's Dream: World-Class Reefs",
                description: "Cozumel is a large, predominantly flat island off the eastern coast of Mexico's Yucatán Peninsula, renowned for its incredible coral reefs and crystal-clear visibility, making it a global hub for scuba diving.",
                image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/689520918.jpg?k=b3c606100a5c03a35c8f446d226f3ca9537fdda9d07aa18983f6a8bc383375b4&o=&hp=1",
                rating: 5,
                features: [
                    { icon: Waves, label: 'Scuba Dive' },
                    { icon: Anchor, label: 'Cruising' },
                    { icon: Sun, label: 'Great Weather' },
                    { icon: Ship, label: 'Port City' },
                ]
            }
        ]
    },
    paris: {
        id: 'paris',
        name: "Paris",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWdaiUG6E7JbwXyd-LLahQipbSFuTeJvF8w&s",
        introductoryText: "Experience the city of love with its iconic landmarks, world-class cuisine, and romantic ambiance that has captivated visitors for centuries.",
        islandsData: [
            {
                id: 1,
                name: "Eiffel Tower",
                tagline: "Iron Lady of Paris",
                description: "The most iconic landmark in Paris, offering breathtaking views of the city from its observation decks. A masterpiece of engineering and symbol of French ingenuity.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzprd-N295k5OgIpOlz1ZaiDoQnoirL5kWA&s",
                rating: 5,
                features: [
                    { icon: Landmark, label: 'Iconic View' }, // FIX: Changed '' to Landmark
                    { icon: Map, label: 'City Panorama' },
                    { icon: Zap, label: 'Light Shows' },
                    { icon: Heart, label: 'Romantic' }, // Changed Sun to Heart for Paris context
                ]
            },
            {
                id: 2,
                name: "Louvre Museum",
                tagline: "Art Lover's Paradise",
                description: "The world's largest art museum and historic monument in Paris. Home to thousands of works from antiquity to the 21st century, including the Mona Lisa.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACkFKjqoHqQBSB5y6W4mQbgr5R2blBT4xUg&s",
                rating: 4.5,
                features: [
                    { icon: Castle, label: 'Historic Palace' },
                    { icon: BookOpen, label: 'Art Masterpieces' },
                    { icon: Map, label: 'Grand Architecture' },
                    { icon: Wine, label: 'Cultural Hub' },
                ]
            },
            {
                id: 3,
                name: "Montmartre",
                tagline: "Bohemian Hilltop Village",
                description: "Historic district on a hill in Paris's 18th arrondissement, known for its artistic history, the white-domed Basilica of the Sacré-Cœur, and charming streets.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKmXX7Zzw-W9OVwIYiWkT6BF71V23pOR3XA&s",
                rating: 4.5,
                features: [
                    { icon: Mountain, label: 'Hilltop Views' },
                    { icon: MessageCircle, label: 'Artistic Spirit' },
                    { icon: Wine, label: 'Café Culture' },
                    { icon: Map, label: 'Historic Streets' },
                ]
            }
        ]
    },
    queensland: {
        id: 'queensland',
        name: "Queensland",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLz-e5YqtEjOmvESEgADhCAl7a2_dFXfuOCQ&s",
        introductoryText: "Discover Australia's sunshine state with its pristine beaches, ancient rainforests, and the world's largest coral reef system.",
        islandsData: [
            {
                id: 1,
                name: "Great Barrier Reef",
                tagline: "World's Largest Living Structure",
                description: "The world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. A UNESCO World Heritage site.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWmMZ_-k_4jY65VFXJMk2uuHoNcy7ZMrIXZg&s",
                rating: 5,
                features: [
                    { icon: Anchor, label: 'Coral Reefs' }, // FIX: Changed '' to Anchor
                    { icon: Waves, label: 'Marine Life' },
                    { icon: Sun, label: 'Tropical Waters' },
                    { icon: Ship, label: 'Island Hopping' },
                ]
            },
            {
                id: 2,
                name: "Whitsunday Islands",
                tagline: "74 Island Wonders",
                description: "A collection of 74 stunning islands in the Heart of the Great Barrier Reef, famous for white-sand beaches, crystal-clear waters, and luxury resorts.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwtlsuB0vY1pNLQ_98QTKO1jTL_exIoooLK82TL-vGHmwxof6r7Kw9qgfGJrXVLlfr-c&usqp=CAU",
                rating: 5,
                features: [
                    { icon: Sun, label: 'Whitehaven Beach' },
                    { icon: Waves, label: 'Sailing Paradise' },
                    { icon: Anchor, label: 'Luxury Resorts' },
                    { icon: Bird, label: 'Wildlife' },
                ]
            },
            {
                id: 3,
                name: "Daintree Rainforest",
                tagline: "Ancient Tropical Wonder",
                description: "The oldest surviving tropical rainforest in the world, estimated to be over 180 million years old. Home to an incredible diversity of plants and animals.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_gP4mSpFeTyMBDnFA9EHKGAzJd9mzVLtHg&s",
                rating: 4.5,
                features: [
                    { icon: Bird, label: 'Wildlife' }, // FIX: Changed '' to Bird
                    { icon: Mountain, label: 'Ancient Forest' },
                    { icon: Bird, label: 'Exotic Birds' },
                    { icon: Map, label: 'Eco Tours' },
                ]
            }
        ]
    },
    capetown: {
        id: 'capetown',
        name: "Cape Town",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6G42bq6RBc84dKGda7uGP5H3Nd_JYX1FtRQ&s",
        introductoryText: "Where mountains meet oceans in South Africa's Mother City, offering breathtaking landscapes, rich history, and vibrant culture.",
        islandsData: [
            {
                id: 1,
                name: "Table Mountain",
                tagline: "Flat-Topped Natural Wonder",
                description: "A flat-topped mountain forming a prominent landmark overlooking the city of Cape Town. Take the cable car or hike to the top for spectacular 360-degree views.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcG0tD-2YZefk35oIDTwVGSX00ZlxiU0w39kqmzfNlvPLUawbW8-HatJvfYUxq6k-lxI&usqp=CAU",
                rating: 5,
                features: [
                    { icon: Mountain, label: 'Mountain Views' }, // FIX: Replaced MountainSnow with Mountain
                    { icon: Map, label: 'Hiking Trails' },
                    { icon: Bird, label: 'Unique Flora' },
                    { icon: Zap, label: 'Cable Car' },
                ]
            },
            {
                id: 2,
                name: "Robben Island",
                tagline: "Island of Freedom",
                description: "A UNESCO World Heritage site known for being the prison where Nelson Mandela was held for 18 years. Now a symbol of the triumph of democracy over oppression.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJGLpv3gxXXN3a_3ryn_qm-NQ7aPyCG_BCw&s",
                rating: 4.5,
                features: [
                    { icon: BookOpen, label: 'Historic Tour' },
                    { icon: Map, label: 'UNESCO Site' },
                    { icon: Ship, label: 'Ferry Access' },
                    { icon: Anchor, label: 'Cultural Heritage' },
                ]
            },
            {
                id: 3,
                name: "Cape Peninsula",
                tagline: "Where Two Oceans Meet",
                description: "Experience the dramatic coastline where the Atlantic and Indian Oceans meet. Visit the Cape of Good Hope and see penguins at Boulders Beach.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFiqsnAaYLo0ibK7sd8YeV9vZ8qpEoFz41XA&s",
                rating: 5,
                features: [
                    { icon: Waves, label: 'Ocean Views' },
                    { icon: PawPrint, label: 'Penguin Colony' }, // FIX: Changed '' to PawPrint
                    { icon: Bus, label: 'Scenic Drive' }, // FIX: Changed '' to Bus
                    { icon: Map, label: 'Lighthouse' },
                ]
            }
        ]
    }
};

// --- COMPONENTS ---

// Helper component for Star Rating
const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex space-x-0.5">
            {Array(fullStars).fill(0).map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />)}
            {hasHalfStar && <StarHalf key="half" className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />}
            {Array(emptyStars).fill(0).map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 fill-gray-500 stroke-gray-500" />)}
        </div>
    );
};

// Mobile Navigation Component
const MobileNav = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-teal-600/95 backdrop-blur-md lg:hidden"
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white p-2"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <a href="home" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Go Back</a>
                        <a href="profile" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Profile</a>
                        <a href="itinerary" className="text-2xl font-bold text-white hover:text-teal-200 transition" onClick={onClose}>Itinerary</a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Component for the sliding island content
const IslandCard = React.memo(({ island, isVisible }) => {
    const cardVariants = {
        initial: { y: "100%", opacity: 0 },
        in: { y: "0%", opacity: 1 },
        out: { y: "-100%", opacity: 0 },
    };

    if (!isVisible) return null;

    return (
        <motion.div
            key={island.id}
            variants={cardVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
        >
            {/* Image Section */}
            <div className="h-1/2 sm:h-2/3 relative mb-4 rounded-xl shadow-2xl overflow-hidden">
                <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x800/007bff/ffffff?text=Image+Unavailable"; }}
                />
            </div>

            {/* Content Section */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl text-white shadow-xl flex flex-col lg:flex-row justify-between flex-grow">
                <div className="lg:w-1/2 mb-4 lg:mb-0">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-teal-400">{island.name}</h3>
                    <p className="text-sm italic mb-3 sm:mb-4 text-gray-200">{island.tagline}</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-200">{island.description}</p>
                </div>

                <div className="lg:w-1/2 lg:pl-6 xl:pl-8">
                    <h4 className="text-lg font-semibold mb-2">Explore Features</h4>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                        {island.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                                <feature.icon className="w-4 h-4 text-teal-300 flex-shrink-0" />
                                <span className="text-gray-200 text-xs sm:text-sm">{feature.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
                        <div className="flex items-center">
                            <span className="text-sm text-gray-300 mr-2">Rating:</span>
                            <RatingStars rating={island.rating} />
                        </div>
                        <button className="flex items-center justify-center text-sm font-semibold px-4 py-2 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-lg shadow-teal-500/50 w-full xs:w-auto">
                            Book Now <span className="ml-2">&rsaquo;</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
IslandCard.displayName = 'IslandCard';

// City Selector Component
const CitySelector = ({ currentCity, onCityChange }) => {
    const cities = [
        { id: 'mexico', name: 'Mexico' },
        { id: 'paris', name: 'Paris' },
        { id: 'queensland', name: 'Queensland' },
        { id: 'capetown', name: 'Cape Town' }
    ];

    return (
        <div className="hidden flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2 flex space-x-2">
                {cities.map((city) => (
                    <button
                        key={city.id}
                        onClick={() => onCityChange(city.id)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${currentCity === city.id
                                ? 'bg-teal-500 text-white shadow-lg'
                                : 'text-white hover:bg-white/20'
                            }`}
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Main Explore Component
const Explore = () => {
    const [activeCity, setActiveCity] = useState('mexico');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isIntroAnimating, setIsIntroAnimating] = useState(true);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const currentCityData = citiesData[activeCity];
    const activeIsland = currentCityData.islandsData[activeIndex];

    // Reset active index when city changes
    useEffect(() => {
        setActiveIndex(0);
        // Restart the intro animation when the city changes
        setIsIntroAnimating(true);
        const timer = setTimeout(() => {
            setIsIntroAnimating(false);
        }, 2000); // 2 seconds delay for a smooth transition animation

        return () => clearTimeout(timer);
    }, [activeCity]);

    // Logic for Auto-Rotation
    useEffect(() => {
        if (isIntroAnimating || isMobileNavOpen) return;

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % currentCityData.islandsData.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [isIntroAnimating, isMobileNavOpen, currentCityData.islandsData.length]);

    // Handle Initial Intro Animation Finish (runs only on mount)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroAnimating(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Variant for the text on the left hero side
    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    // Variant for the main intro text
    const introVariants = {
        hidden: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.8, opacity: 0, y: -50, transition: { duration: 1, ease: "easeOut" } },
        appear: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut" } }
    };

    return (
        <div className='w-full min-h-screen p-2 sm:p-4 bg-gray-100'>
            {/* Mobile Navigation */}
            <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

            {/* Main Content Card */}
            <div className="relative w-full max-w-7xl mx-auto h-[90vh] min-h-[600px] max-h-[1200px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">

                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        key={activeCity + "bg"} // Added key to force re-render/transition on city change
                        src={currentCityData.backgroundImage}
                        alt={`${currentCityData.name} Background`}
                        className="w-full h-full object-cover transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* City Selector */}
                <div className="absolute hidden top-4 left-1/2 transform -translate-x-1/2 z-30">
                    <CitySelector currentCity={activeCity} onCityChange={setActiveCity} />
                </div>

                {/* Intro Splash Screen Animation */}
                <AnimatePresence mode="wait">
                    {isIntroAnimating && (
                        <motion.div
                            key={activeCity + "intro"} // Added key to trigger exit animation on city change
                            className="absolute inset-0 flex items-center justify-center z-50 bg-teal-500/80 backdrop-blur-sm"
                            variants={introVariants}
                            initial="appear"
                            exit="exit"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-5xl sm:text-7xl md:text-[10vw] font-extrabold text-white tracking-widest text-center px-4"
                            >
                                {currentCityData.name.toUpperCase()}
                            </motion.h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Overlay */}
                <motion.div
                    className={`absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row transition-opacity duration-1000 ${isIntroAnimating ? 'opacity-0' : 'opacity-100'}`}
                >
                    {/* Left Column - Hero Content & Socials */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between text-white z-10 pb-4 lg:pb-0">
                        {/* Nav and Logo */}
                        <div className="flex justify-between items-start">
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <h2 className="text-xl font-bold">{currentCityData.name} <span className="text-teal-400">Adventures</span></h2>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <motion.nav
                                className="space-x-6 hidden lg:flex text-sm font-medium"
                                initial={{ y: -20, opacity: 0 }}
                                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 1.2, duration: 0.5 }}
                            >
                                <a href="/home" className="hover:text-teal-400 transition">Go Back</a>
                                <a href="/itinerary" className="hover:text-teal-400 transition">Itinerary</a>
                                <a href="/profile" className="hover:text-teal-400 transition">Profile</a>
                            </motion.nav>

                            {/* Mobile Menu Button */}
                            <motion.button
                                initial={{ y: -20, opacity: 0 }}
                                animate={!isIntroAnimating ? { y: 0, opacity: 1 } : {}}
                                transition={{ delay: 1.2, duration: 0.5 }}
                                className="lg:hidden text-white p-2"
                                onClick={() => setIsMobileNavOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </motion.button>
                        </div>

                        {/* Hero Text */}
                        <div className="my-auto pt-4 lg:pt-0">
                            <motion.h1
                                key={activeCity + "title"} // Added key to trigger animation on city change
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tighter"
                                variants={textVariants}
                                initial="hidden"
                                animate={!isIntroAnimating ? "visible" : "hidden"}
                                transition={{ delay: 1.5, duration: 0.8 }}
                            >
                                Explore <br />
                                {currentCityData.name}
                            </motion.h1>

                            <motion.p
                                key={activeCity + "text"} // Added key to trigger animation on city change
                                className="mt-4 max-w-md text-sm sm:text-base text-gray-200"
                                variants={textVariants}
                                initial="hidden"
                                animate={!isIntroAnimating ? "visible" : "hidden"}
                                transition={{ delay: 1.8, duration: 0.8 }}
                            >
                                {currentCityData.introductoryText}
                            </motion.p>

                            <motion.button
                                className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-xl shadow-teal-500/50 w-full lg:w-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={!isIntroAnimating ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 2, duration: 0.6 }}
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Book Now
                            </motion.button>
                        </div>

                        {/* Social Icons */}
                        <motion.div
                            className="flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 mt-6 lg:mt-0"
                            initial={{ x: -20, opacity: 0 }}
                            animate={!isIntroAnimating ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 2.2, duration: 0.6 }}
                        >
                            <a href="#" aria-label="Facebook" className="hover:text-teal-400 transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" aria-label="Twitter" className="hover:text-teal-400 transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-teal-400 transition"><Instagram className="w-5 h-5" /></a>
                            <a href="#" aria-label="Message" className="hover:text-teal-400 transition"><MessageCircle className="w-5 h-5" /></a>
                        </motion.div>
                    </div>

                    {/* Right Column - Sliding Content */}
                    <div className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-4 xl:pl-8 z-20 flex-1 min-h-0">
                        <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-0">
                            <AnimatePresence mode="wait">
                                <IslandCard key={activeIsland.id} island={activeIsland} isVisible={!isIntroAnimating} />
                            </AnimatePresence>

                            {/* Navigation Dots */}
                            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 sm:space-y-3 p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
                                {currentCityData.islandsData.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-teal-400 w-3 h-3 sm:w-5 sm:h-5' : 'bg-gray-400 opacity-50 hover:opacity-100'
                                            }`}
                                        aria-label={`Go to ${currentCityData.islandsData[index].name}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Explore;