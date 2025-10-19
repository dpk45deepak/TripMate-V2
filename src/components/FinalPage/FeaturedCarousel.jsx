import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import icons from "../FinalPage/Icons.jsx";

// New Featured Destinations Carousel
const FeaturedCarousel = ({
    destinations,
    onSelect,
    onToggleFavorite,
    favorites,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!destinations.length) return null;

    return (
        <div className="relative mb-8 rounded-2xl overflow-hidden">
            <div className="relative h-80 md:h-96">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={destinations[currentSlide].image}
                            alt={destinations[currentSlide].title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="max-w-3xl">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
                                        {destinations[currentSlide].flag}{" "}
                                        {destinations[currentSlide].country}
                                    </span>
                                    <span className="bg-teal-500 px-3 py-1 rounded-full text-sm font-medium">
                                        Featured
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                    {destinations[currentSlide].title}
                                </h2>

                                <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                                    {destinations[currentSlide].details.description}
                                </p>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex items-center">
                                        <icons.Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                        <span className="font-semibold">
                                            {destinations[currentSlide].details.rating}
                                        </span>
                                        <span className="text-gray-300 ml-1">
                                            ({destinations[currentSlide].details.reviews})
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <icons.Calendar className="w-5 h-5 mr-1 text-gray-300" />
                                        <span>{destinations[currentSlide].details.duration}</span>
                                    </div>
                                    <div className="text-xl font-bold text-teal-300">
                                        ₹
                                        {destinations[currentSlide].details.price?.toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <motion.button
                                        className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onSelect(destinations[currentSlide])}
                                    >
                                        Explore Now
                                    </motion.button>

                                    <motion.button
                                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() =>
                                            onToggleFavorite(destinations[currentSlide].id)
                                        }
                                    >
                                        <icons.Heart
                                            className={`w-5 h-5 ${favorites.includes(destinations[currentSlide].id)
                                                    ? "fill-red-500 stroke-red-500"
                                                    : ""
                                                }`}
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {destinations.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-white" : "bg-white/50"
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={() =>
                    setCurrentSlide((prev) =>
                        prev === 0 ? destinations.length - 1 : prev - 1
                    )
                }
            >
                <icons.ArrowLeft className="w-5 h-5" />
            </button>

            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={() =>
                    setCurrentSlide((prev) =>
                        prev === destinations.length - 1 ? 0 : prev + 1
                    )
                }
            >
                <icons.ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default FeaturedCarousel;