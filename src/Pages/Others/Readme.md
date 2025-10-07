enhance it import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Added Landmark and replaced MountainSnow (which you used) with appropriate icons for clarity.
import { Map, Zap, Ship, MessageCircle, Twitter, Instagram, Facebook, BookOpen, Star, StarHalf, Sun, Waves, Anchor, Bird, Menu, X, Mountain, Castle, Wine, Landmark, Waves as Ocean, PawPrint, Bus, Heart } from 'lucide-react';

// --- MOCK DATA (KEPT AS IS) ---
const citiesData = {
    mexico: {
        id: 'mexico',
        name: "Mexico",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHzb3ASXhWVXTyVp3TuLh7VWVAna7qfVq9BGxws9-w0C5BRP5cmmM1aQP7lcV20ySLmA&usqp=CAU",
        introductoryText: "Snorkeling in tropical waters, climbing ancient pyramids, and exploring the hidden world of cenotes are just a few samples of what Mexico has to offer.",
        islandsData: [
            { id: 1, name: "Isla Mujeres", tagline: "Paradise Found: The Island of Women", description: "Snorkeling in tropical waters, climbing a pyramid, and exploring the breathtaking cliffside views at Punta Sur are just a few samples of what Isla Mujeres has to offer. Experience the tranquil, turquoise Caribbean waters.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThiEJyvqU9vUaSQhrOGibPL11a0yZBWes-9pygw1LgEtekO00guKBSUa0alY8LpFD6Btc&usqp=CAU", rating: 5, features: [{ icon: Sun, label: 'Beach Life' }, { icon: Waves, label: 'Snorkeling' }, { icon: Anchor, label: 'Yachting' }, { icon: Ship, label: 'Ferry Access' }, ] },
            { id: 2, name: "Isla Holbox", tagline: "The Bohemian Gateway: A True Escape", description: "Located off the north coast of the Yucatán Peninsula, Holbox is car-free and famous for its unpaved roads and vibrant street art. It is best known for being a seasonal home to the majestic whale sharks.", image: "https://i.ytimg.com/vi/UByINB69_xo/maxresdefault.jpg", rating: 4.5, features: [{ icon: Bird, label: 'Flamingos' }, { icon: Ship, label: 'Whale Sharks' }, { icon: Zap, label: 'Bioluminescence' }, { icon: Map, label: 'Nature Reserve' }, ] },
            { id: 3, name: "Cozumel", tagline: "Diver's Dream: World-Class Reefs", description: "Cozumel is a large, predominantly flat island off the eastern coast of Mexico's Yucatán Peninsula, renowned for its incredible coral reefs and crystal-clear visibility, making it a global hub for scuba diving.", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/689520918.jpg?k=b3c606100a5c03a35c8f446d226f3ca9537fdda9d07aa18983f6a8bc383375b4&o=&hp=1", rating: 5, features: [{ icon: Waves, label: 'Scuba Dive' }, { icon: Anchor, label: 'Cruising' }, { icon: Sun, label: 'Great Weather' }, { icon: Ship, label: 'Port City' }, ] }
        ]
    },
    paris: {
        id: 'paris',
        name: "Paris",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWdaiUG6E7JbwXyd-LLahQipbSFuTeJvF8w&s",
        introductoryText: "Experience the city of love with its iconic landmarks, world-class cuisine, and romantic ambiance that has captivated visitors for centuries.",
        islandsData: [
            { id: 1, name: "Eiffel Tower", tagline: "Iron Lady of Paris", description: "The most iconic landmark in Paris, offering breathtaking views of the city from its observation decks. A masterpiece of engineering and symbol of French ingenuity.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzprd-N295k5OgIpOlz1ZaiDoQnoirL5kWA&s", rating: 5, features: [{ icon: Landmark, label: 'Iconic View' }, { icon: Map, label: 'City Panorama' }, { icon: Zap, label: 'Light Shows' }, { icon: Heart, label: 'Romantic' }, ] },
            { id: 2, name: "Louvre Museum", tagline: "Art Lover's Paradise", description: "The world's largest art museum and historic monument in Paris. Home to thousands of works from antiquity to the 21st century, including the Mona Lisa.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRACkFKjqoHqQBSB5y6W4mQbgr5R2blBT4xUg&s", rating: 4.5, features: [{ icon: Castle, label: 'Historic Palace' }, { icon: BookOpen, label: 'Art Masterpieces' }, { icon: Map, label: 'Grand Architecture' }, { icon: Wine, label: 'Cultural Hub' }, ] },
            { id: 3, name: "Montmartre", tagline: "Bohemian Hilltop Village", description: "Historic district on a hill in Paris's 18th arrondissement, known for its artistic history, the white-domed Basilica of the Sacré-Cœur, and charming streets.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKmXX7Zzw-W9OVwIYiWkT6BF71V23pOR3XA&s", rating: 4.5, features: [{ icon: Mountain, label: 'Hilltop Views' }, { icon: MessageCircle, label: 'Artistic Spirit' }, { icon: Wine, label: 'Café Culture' }, { icon: Map, label: 'Historic Streets' }, ] }
        ]
    },
    queensland: {
        id: 'queensland',
        name: "Queensland",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLz-e5YqtEjOmvESEgADhCAl7a2_dFXfuOCQ&s",
        introductoryText: "Discover Australia's sunshine state with its pristine beaches, ancient rainforests, and the world's largest coral reef system.",
        islandsData: [
            { id: 1, name: "Great Barrier Reef", tagline: "World's Largest Living Structure", description: "The world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. A UNESCO World Heritage site.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWmMZ_-k_4jY65VFXJMk2uuHoNcy7ZMrIXZg&s", rating: 5, features: [{ icon: Anchor, label: 'Coral Reefs' }, { icon: Waves, label: 'Marine Life' }, { icon: Sun, label: 'Tropical Waters' }, { icon: Ship, label: 'Island Hopping' }, ] },
            { id: 2, name: "Whitsunday Islands", tagline: "74 Island Wonders", description: "A collection of 74 stunning islands in the Heart of the Great Barrier Reef, famous for white-sand beaches, crystal-clear waters, and luxury resorts.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwtlsuB0vY1pNLQ_98QTKO1jTL_exIoooLK82TL-vGHmwxof6r7Kw9qgfGJrXVLlfr-c&usqp=CAU", rating: 5, features: [{ icon: Sun, label: 'Whitehaven Beach' }, { icon: Waves, label: 'Sailing Paradise' }, { icon: Anchor, label: 'Luxury Resorts' }, { icon: Bird, label: 'Wildlife' }, ] },
            { id: 3, name: "Daintree Rainforest", tagline: "Ancient Tropical Wonder", description: "The oldest surviving tropical rainforest in the world, estimated to be over 180 million years old. Home to an incredible diversity of plants and animals.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3_gP4mSpFeTyMBDnFA9EHKGAzJd9mzVLtHg&s", rating: 4.5, features: [{ icon: Bird, label: 'Wildlife' }, { icon: Mountain, label: 'Ancient Forest' }, { icon: Bird, label: 'Exotic Birds' }, { icon: Map, label: 'Eco Tours' }, ] }
        ]
    },
    capetown: {
        id: 'capetown',
        name: "Cape Town",
        backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6G42bq6RBc84dKGda7uGP5H3Nd_JYX1FtRQ&s",
        introductoryText: "Where mountains meet oceans in South Africa's Mother City, offering breathtaking landscapes, rich history, and vibrant culture.",
        islandsData: [
            { id: 1, name: "Table Mountain", tagline: "Flat-Topped Natural Wonder", description: "A flat-topped mountain forming a prominent landmark overlooking the city of Cape Town. Take the cable car or hike to the top for spectacular 360-degree views.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHcG0tD-2YZefk35oIDTwVGSX00ZlxiU0w39kqmzfNlvPLUawbW8-HatJvfYUxq6k-lxI&usqp=CAU", rating: 5, features: [{ icon: Mountain, label: 'Mountain Views' }, { icon: Map, label: 'Hiking Trails' }, { icon: Bird, label: 'Unique Flora' }, { icon: Zap, label: 'Cable Car' }, ] },
            { id: 2, name: "Robben Island", tagline: "Island of Freedom", description: "A UNESCO World Heritage site known for being the prison where Nelson Mandela was held for 18 years. Now a symbol of the triumph of democracy over oppression.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJGLpv3gxXXN3a_3ryn_qm-NQ7aPyCG_BCw&s", rating: 4.5, features: [{ icon: BookOpen, label: 'Historic Tour' }, { icon: Map, label: 'UNESCO Site' }, { icon: Ship, label: 'Ferry Access' }, { icon: Anchor, label: 'Cultural Heritage' }, ] },
            { id: 3, name: "Cape Peninsula", tagline: "Where Two Oceans Meet", description: "Experience the dramatic coastline where the Atlantic and Indian Oceans meet. Visit the Cape of Good Hope and see penguins at Boulders Beach.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFiqsnAaYLo0ibK7sd8YeV9vZ8qpEoFz41XA&s", rating: 5, features: [{ icon: Waves, label: 'Ocean Views' }, { icon: PawPrint, label: 'Penguin Colony' }, { icon: Bus, label: 'Scenic Drive' }, { icon: Map, label: 'Lighthouse' }, ] }
        ]
    }
};

// --- COMPONENTS (Reused/Refined) ---

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

const MobileNav = ({ isOpen, onClose, cityIds, currentIndex, onNavigate }) => {
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
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-white p-2"
                            aria-label="Close menu"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <h3 className="text-xl font-bold text-teal-200 mb-4">Jump To:</h3>
                        {cityIds.map((id, index) => (
                            <button
                                key={id}
                                onClick={() => { onNavigate(index); onClose(); }}
                                className={`text-2xl font-bold transition ${currentIndex === index ? 'text-white underline' : 'text-teal-200 hover:text-white'}`}
                            >
                                {citiesData[id].name}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const IslandCard = React.memo(({ island }) => {
    const cardVariants = {
        initial: { y: "100%", opacity: 0 },
        in: { y: "0%", opacity: 1 },
        out: { y: "-100%", opacity: 0 },
    };

    return (
        <motion.div
            key={island.id}
            variants={cardVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Custom, smooth curve
            className="absolute top-0 left-0 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
        >
            {/* Image Section (unchanged) */}
            <div className="h-1/2 sm:h-2/3 relative mb-4 rounded-xl shadow-2xl overflow-hidden">
                <img
                    src={island.image}
                    alt={island.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x800/007bff/ffffff?text=Image+Unavailable"; }}
                />
            </div>

            {/* Content Section (unchanged) */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl text-white shadow-xl flex flex-col lg:flex-row justify-between flex-grow">
                <div className="lg:w-1/2 mb-4 lg:mb-0">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-teal-400">{island.name}</h3>
                    <p className="text-sm italic mb-3 sm:mb-4 text-gray-200">{island.tagline}</p>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-200">{island.description}</p>
                </div>
                <div className="lg:w-1/2 lg:pl-6 xl:pl-8">
                    <h4 className="text-lg font-semibold mb-2">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {island.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                                <feature.icon className="w-4 h-4 text-teal-300 flex-shrink-0" />
                                <span className="text-gray-200 text-xs">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className="text-sm text-gray-300 mr-2">Rating:</span>
                        <RatingStars rating={island.rating} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
});
IslandCard.displayName = 'IslandCard';

// Main Explore Component
const Explore = () => {
    const cityIds = Object.keys(citiesData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0); 
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    
    // Using a ref to track if we're currently animating to prevent jank
    const isTransitioningRef = useRef(false);

    const activeCityId = cityIds[currentIndex];
    const currentCityData = citiesData[activeCityId];
    const activeIsland = currentCityData.islandsData[activeIndex];

    const TRANSITION_DURATION = 1000; // 1000ms (1s)

    // --- FULL-PAGE SNAPPING LOGIC REFINED ---

    const handleNavigate = useCallback((newIndex) => {
        if (newIndex >= 0 && newIndex < cityIds.length && !isTransitioningRef.current) {
            isTransitioningRef.current = true;
            setCurrentIndex(newIndex);
            setActiveIndex(0); // Reset island index for the new city
            
            // Re-enable scrolling after the animation completes
            setTimeout(() => {
                isTransitioningRef.current = false;
            }, TRANSITION_DURATION); 
        }
    }, [cityIds.length]);

    // Simple scroll/wheel debounce mechanism
    const lastScrollTime = useRef(0);
    const DEBOUNCE_WAIT = TRANSITION_DURATION * 0.5; // Only allow input halfway through the animation

    // Handle scroll/wheel events
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleWheel = (e) => {
            e.preventDefault(); 
            
            if (isMobileNavOpen || isTransitioningRef.current) return;
            
            const now = Date.now();
            if (now - lastScrollTime.current < DEBOUNCE_WAIT) {
                return; // Ignore rapid events
            }
            lastScrollTime.current = now;

            const direction = e.deltaY > 0 ? 1 : -1;
            handleNavigate(currentIndex + direction);
        };

        const handleKeyDown = (e) => {
            if (isMobileNavOpen || isTransitioningRef.current) return;
            
            const now = Date.now();
            if (now - lastScrollTime.current < DEBOUNCE_WAIT) {
                return;
            }
            lastScrollTime.current = now;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                handleNavigate(currentIndex + 1);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                handleNavigate(currentIndex - 1);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; 
        };
    }, [currentIndex, isMobileNavOpen, handleNavigate, DEBOUNCE_WAIT]);

    // --- END FULL-PAGE SNAPPING LOGIC ---

    // Logic for Auto-Rotation (Now tied to the currently visible city)
    useEffect(() => {
        if (isMobileNavOpen || isTransitioningRef.current) return;

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const dataLength = currentCityData.islandsData.length;
                return (prevIndex + 1) % dataLength;
            });
        }, 8000);

        return () => clearInterval(interval);
    }, [isMobileNavOpen, currentCityData.islandsData.length, activeCityId]); // Depend on activeCityId to reset interval on page change

    // Variant for the main text elements
    const contentVariants = {
        exit: { opacity: 0, x: -50, transition: { duration: 0.5, ease: 'easeIn' } },
        enter: (delay = 0) => ({ 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay } 
        }),
    };

    // Style for the main container to shift all sections up/down
    const containerStyle = {
        transform: `translateY(-${currentIndex * 100}vh)`,
        // Smoother, more professional cubic-bezier curve (Ease-Out-Expo style)
        transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`, 
    };

    return (
        <div className='fixed inset-0 w-screen h-screen bg-gray-100 overflow-hidden'>
            
            {/* Mobile Navigation */}
            <MobileNav 
                isOpen={isMobileNavOpen} 
                onClose={() => setIsMobileNavOpen(false)} 
                cityIds={cityIds}
                currentIndex={currentIndex}
                onNavigate={handleNavigate}
            />

            {/* Scrolling Content Wrapper (Handles the main page slide) */}
            <div style={containerStyle}>
                {Object.values(citiesData).map((cityData, index) => {
                    const isCityActive = cityData.id === activeCityId;
                    const cityActiveIsland = cityData.islandsData[isCityActive ? activeIndex : 0]; 
                    const isActivePage = index === currentIndex;

                    return (
                        // Each city section is exactly 100vh tall
                        <div
                            key={cityData.id}
                            className="w-screen h-screen flex items-center justify-center p-2 sm:p-4 md:p-8"
                        >
                            <div className="relative w-full max-w-7xl mx-auto h-[90vh] min-h-[600px] max-h-[1200px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
                                
                                {/* Background Image (Enhanced with Framer Motion for crossfade) */}
                                <AnimatePresence initial={false}>
                                    {isActivePage && (
                                        <motion.div 
                                            key={cityData.id + "bg"}
                                            className="absolute inset-0 z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                                        >
                                            <img
                                                src={cityData.backgroundImage}
                                                alt={`${cityData.name} Background`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                {/* Fixed City Selector (Navigation Dots) */}
                                <motion.div 
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 hidden lg:flex flex-col space-y-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {cityIds.map((id, dotIndex) => (
                                        <button
                                            key={id}
                                            onClick={() => handleNavigate(dotIndex)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                dotIndex === currentIndex 
                                                    ? 'bg-teal-400 w-5 h-5 shadow-lg' 
                                                    : 'bg-white opacity-50 hover:opacity-100'
                                            }`}
                                            aria-label={`Go to ${cityData.name}`}
                                        />
                                    ))}
                                </motion.div>

                                {/* Main Content Overlay */}
                                <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row">
                                    <motion.div
                                        className="w-full lg:w-1/2 flex flex-col justify-between text-white z-10 pb-4 lg:pb-0"
                                        initial="exit"
                                        animate={isActivePage ? "enter" : "exit"}
                                        variants={contentVariants}
                                        custom={0.5} // Base delay for all elements in this container
                                    >
                                        {/* Nav and Logo */}
                                        <motion.div 
                                            className="flex justify-between items-start"
                                            variants={contentVariants}
                                            custom={0.8}
                                        >
                                            <h2 className="text-xl font-bold">{cityData.name} <span className="text-teal-400">Adventures</span></h2>
                                            
                                            {/* Desktop Placeholder Navigation */}
                                            <motion.nav
                                                className="space-x-6 hidden lg:flex text-sm font-medium"
                                                variants={contentVariants}
                                                custom={0.9}
                                            >
                                                <a href="#home" className="hover:text-teal-400 transition">Go Back</a>
                                                <a href="#itinerary" className="hover:text-teal-400 transition">Itinerary</a>
                                                <a href="#profile" className="hover:text-teal-400 transition">Profile</a>
                                            </motion.nav>

                                            {/* Mobile Menu Button */}
                                            <motion.button
                                                className="lg:hidden text-white p-2"
                                                onClick={() => setIsMobileNavOpen(true)}
                                                aria-label="Open menu"
                                                variants={contentVariants}
                                                custom={0.9}
                                            >
                                                <Menu className="w-6 h-6" />
                                            </motion.button>
                                        </motion.div>

                                        {/* Hero Text */}
                                        <div className="my-auto pt-4 lg:pt-0">
                                            <motion.h1
                                                key={cityData.id + "title"}
                                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tighter"
                                                variants={contentVariants}
                                                custom={1.1}
                                            >
                                                Explore <br />
                                                {cityData.name}
                                            </motion.h1>

                                            <motion.p
                                                key={cityData.id + "text"}
                                                className="mt-4 max-w-md text-sm sm:text-base text-gray-200"
                                                variants={contentVariants}
                                                custom={1.3}
                                            >
                                                {cityData.introductoryText}
                                            </motion.p>

                                            <motion.button
                                                className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 bg-teal-500 hover:bg-teal-600 transition duration-300 rounded-full shadow-xl shadow-teal-500/50 w-full lg:w-auto"
                                                variants={contentVariants}
                                                custom={1.5}
                                            >
                                                <BookOpen className="w-5 h-5 mr-2" />
                                                Book Now
                                            </motion.button>
                                        </div>

                                        {/* Social Icons */}
                                        <motion.div
                                            className="flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 mt-6 lg:mt-0"
                                            variants={contentVariants}
                                            custom={1.7}
                                        >
                                            <a href="#" aria-label="Facebook" className="hover:text-teal-400 transition"><Facebook className="w-5 h-5" /></a>
                                            <a href="#" aria-label="Twitter" className="hover:text-teal-400 transition"><Twitter className="w-5 h-5" /></a>
                                            <a href="#" aria-label="Instagram" className="hover:text-teal-400 transition"><Instagram className="w-5 h-5" /></a>
                                            <a href="#" aria-label="Message" className="hover:text-teal-400 transition"><MessageCircle className="w-5 h-5" /></a>
                                        </motion.div>
                                    </motion.div>

                                    {/* Right Column - Sliding Content */}
                                    <div className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pl-4 xl:pl-8 z-20 flex-1 min-h-0">
                                        <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-0">
                                            <AnimatePresence mode="wait">
                                                {isActivePage && (
                                                    <IslandCard key={cityActiveIsland.id} island={cityActiveIsland} />
                                                )}
                                            </AnimatePresence>

                                            {/* Island Navigation Dots */}
                                            {isActivePage && (
                                                <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-2 sm:space-y-3 p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-lg">
                                                    {cityData.islandsData.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setActiveIndex(index)}
                                                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                                                index === activeIndex ? 'bg-teal-400 w-3 h-3 sm:w-5 sm:h-5' : 'bg-gray-400 opacity-50 hover:opacity-100'
                                                            }`}
                                                            aria-label={`Go to ${cityData.islandsData[index].name}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Explore;