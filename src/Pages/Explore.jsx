import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// --- Updated Destination Data with real images & details ---
const destinations = [
    {
      id: 1,
      name: "Cape Town, South Africa",
      description:
        "Cape Town is known for its stunning coastal scenery, Table Mountain, and vibrant cultural scene.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDlT6tlAdHXl_S0wPkCyj7YuWpHL4gS2LnqQ&s",
      temperature: "20°C",
      rating: "4.7",
      features: ["Mountains", "Beaches", "Adventure", "Culture"],
      price: "$1,300",
    },
    {
      id: 2,
      name: "Santorini, Greece",
      description:
        "Santorini is one of the Cyclades islands in the Aegean Sea. Its whitewashed houses and sunsets are world-famous.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokKSBi8lwGX3NfsPOAjloQAIdWfOol2b6jA&s",
      temperature: "24°C",
      rating: "4.8",
      features: ["Beaches", "Volcanic", "Romantic", "Historic"],
      price: "$1,200",
    },
    {
      id: 3,
      name: "Paris, France",
      description:
        "Paris is famous for its café culture, the Eiffel Tower, the Louvre Museum, and architecture along the Seine.",
      image:
        "https://media.gettyimages.com/id/1952253409/photo/skyline-paris.jpg?s=612x612&w=gi&k=20&c=o4oU1qKDveiFAbBnMZB9ungwZpjfL6qNPt-j78SPFN4=",
      temperature: "16°C",
      rating: "4.6",
      features: ["Romantic", "Museums", "Architecture", "Food"],
      price: "$1,100",
    },
    {
      id: 4,
      name: "Dublin, Ireland",
      description:
        "Dublin is known for its literary history, vibrant nightlife, historic buildings, and friendly locals.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmJpC-KZUhbZYLpt8F4yEaXSHQZg5EUQV_Ag&s",
      temperature: "12°C",
      rating: "4.5",
      features: ["Historic", "Culture", "Pubs", "Scenic"],
      price: "$1,000",
    },
    {
      id: 5,
      name: "Queenstown, New Zealand",
      description:
        "Queenstown is famous for adventure sports, lakes, mountains, and breathtaking natural landscapes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17Sbmx0S72kyFXe28gtnDs_rrHapwkUT1l_nrFUeLtBxpPEEkxUdigEYhcd9YOQkRxW8&usqp=CAU",
      temperature: "14°C",
      rating: "4.9",
      features: ["Adventure", "Lakes", "Mountains", "Hiking"],
      price: "$1,400",
    },
    {
      id: 6,
      name: "Kyoto, Japan",
      description:
        "Kyoto is known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA7JeZ1Ihvt-D1wDn6c7y-2G1E5Zb3zJrJQg&s",
      temperature: "18°C",
      rating: "4.9",
      features: ["Temples", "Gardens", "Traditional", "Cultural"],
      price: "$1,500",
    },
    {
      id: 7,
      name: "Rome, Italy",
      description:
        "Rome is renowned for its ancient ruins, art, culture, and delicious Italian cuisine.",
      image:
        "https://www.shutterstock.com/image-photo/aerial-panoramic-cityscape-rome-italy-600nw-2248023259.jpg",
      temperature: "19°C",
      rating: "4.7",
      features: ["Historic", "Architecture", "Food", "Culture"],
      price: "$1,250",
    },
    {
      id: 8,
      name: "Rio de Janeiro, Brazil",
      description:
        "Rio is famous for its Copacabana and Ipanema beaches, Christ the Redeemer, and vibrant Carnival.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMpoVGndYkLIQL-FUeTtyo2YpHwHrPZDFPA&s",
      temperature: "27°C",
      rating: "4.6",
      features: ["Beaches", "Carnival", "Mountains", "Adventure"],
      price: "$1,350",
    },
    {
      id: 9,
      name: "Banff, Canada",
      description:
        "Banff is a resort town in the Canadian Rockies, known for stunning mountains, turquoise lakes, and outdoor adventures.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH703gfmuh99Ld29s6N_Y1I0g_y2q6FdKVWQ&s",
      temperature: "8°C",
      rating: "4.8",
      features: ["Mountains", "Lakes", "Hiking", "Skiing"],
      price: "$1,400",
    },
    {
      id: 10,
      name: "Dubai, UAE",
      description:
        "Dubai is known for its futuristic skyscrapers, luxury shopping, desert safaris, and artificial islands.",
      image:
        "https://c4.wallpaperflare.com/wallpaper/996/638/569/city-dubai-arabic-dream-burj-khalifa-united-arab-emirates-desktop-wallpaper-hd-2560%C3%971440-wallpaper-preview.jpg",
      temperature: "33°C",
      rating: "4.7",
      features: ["Luxury", "Shopping", "Desert", "Modern"],
      price: "$1,600",
    },
  ];
  

// --- Destinations Section Component ---
const DestinationsSection = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % destinations.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <motion.div
                key={destinations[active].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={destinations[active].image}
                    alt="background"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>

            {/* Main Content Container with White Border */}
            <motion.div
                className="relative z-20 w-[95%] max-w-6xl rounded-xl py-8 px-20 flex flex-col lg:flex-row items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    borderImage: "linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)) 1",
                    borderRadius: '35px'
                }}
            >
                {/* Left Side - Main Content */}
                <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Explore the World with <span className="text-blue-300">Confidence</span>
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Your trusted partner in unforgettable travel experiences. Let us take you to breathtaking 
                            destinations with ease and comfort.
                        </p>
                    </motion.div>

                    {/* Destination Details */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={destinations[active].id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.7 }}
                        >
                            <DestinationDetail destination={destinations[active]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side - Cards Container */}
                <div className="lg:w-1/2 flex flex-col items-end">
                    {/* Cards Label */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-4 self-start lg:self-end"
                    >
                        <h3 className="text-2xl font-bold text-white bg-black/30 px-4 py-2 rounded-full">
                            Popular Destinations
                        </h3>
                    </motion.div>

                    {/* Horizontal Cards Scroll */}
                    <motion.div
                        className="flex space-x-6 overflow-x-auto pb-6 w-full max-w-2xl scrollbar-hide"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            damping: 20,
                            delay: 0.6
                        }}
                        style={{ 
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={dest.id}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-shrink-0"
                            >
                                <DestinationCard 
                                    destination={dest} 
                                    isActive={i === active}
                                    onClick={() => setActive(i)} 
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Navigation Dots */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex space-x-3 mt-4 self-center lg:self-end"
                    >
                        {destinations.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    i === active ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                className="absolute top-10 left-10 text-white/10 text-6xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                ✈
            </motion.div>
            <motion.div
                className="absolute bottom-10 right-10 text-white/10 text-4xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                🌴
            </motion.div>
        </section>
    );
};

// Updated DestinationCard component to match the style
const DestinationCard = ({ destination, isActive, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className={`relative w-64 h-80 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
                isActive ? 'ring-4 ring-blue-400 shadow-2xl' : 'ring-2 ring-white/30 shadow-lg'
            }`}
            onClick={onClick}
        >
            <div className="relative h-full">
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-lg mb-1">{destination.name.split(',')[0]}</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-300 font-bold">{destination.price}</span>
                        <div className="flex items-center">
                            <i className="fas fa-star text-yellow-400 mr-1"></i>
                            <span className="text-white text-sm">{destination.rating}</span>
                        </div>
                    </div>
                </div>
                
                {/* Temperature Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white font-semibold text-sm">{destination.temperature}</span>
                </div>
            </div>
        </motion.div>
    );
};

// Updated DestinationDetail component
const DestinationDetail = ({ destination }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
            <h2 className="text-3xl font-bold text-white mb-3">{destination.name}</h2>
            <p className="text-white/90 mb-4 leading-relaxed">{destination.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {destination.features.map((feature, index) => (
                    <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        {feature}
                    </span>
                ))}
            </div>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors w-full"
            >
                Book Now - {destination.price}
            </motion.button>
        </motion.div>
    );
};

// --- Main App Component ---
const App = () => (
    <div className="App h-screen">
        <DestinationsSection />
    </div>
);

export default App;
