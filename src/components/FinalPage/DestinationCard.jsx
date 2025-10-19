import { useState } from "react";
import { motion } from "framer-motion";
import icons from "./Icons";


// Enhanced Destination Card with Grid Layout
const DestinationCard = ({
    destination,
    onSelect,
    layout = "grid",
    isFavorite,
    onToggleFavorite,
}) => {
    const { flag, country, title, image, details } = destination;
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (layout === "list") {
        return (
            <motion.div
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
                whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(destination)}
            >
                <div className="flex h-32">
                    <div className="w-1/3 relative overflow-hidden">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse" />
                        )}
                        <img
                            src={image}
                            alt={title}
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                            onLoad={handleImageLoad}
                        />
                        <div className="absolute top-2 left-2">
                            <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                {flag} {country}
                            </div>
                        </div>
                    </div>

                    <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                    {title}
                                </h3>
                                <motion.button
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleFavorite(destination.id);
                                    }}
                                >
                                    <icons.Heart
                                        className={`w-4 h-4 ${isFavorite ? "fill-red-500 stroke-red-500" : ""
                                            }`}
                                    />
                                </motion.button>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <div className="flex items-center">
                                    <icons.Calendar className="w-3 h-3 mr-1 text-teal-500" />
                                    {details.duration}
                                </div>
                                <div className="flex items-center">
                                    <icons.Users className="w-3 h-3 mr-1 text-blue-500" />
                                    {details.people} people
                                </div>
                                <div className="flex items-center">
                                    <icons.Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                                    {details.rating}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-lg font-bold text-teal-600">
                                ₹{details.price?.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                                {details.dates.split(" - ")[0]}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid layout (default)
    return (
        <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
            whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(destination)}
            layoutId={`card-${destination.id}`}
        >
            <div className="relative h-48 overflow-hidden">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-teal-100 animate-pulse flex items-center justify-center">
                        <icons.Star className="w-8 h-8 text-indigo-300" />
                    </div>
                )}
                <img
                    src={image}
                    alt={title}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    onLoad={handleImageLoad}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex space-x-2">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                        {flag} {country}
                    </div>
                    <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {details.difficulty}
                    </div>
                </div>

                {/* Favorite button */}
                <motion.button
                    className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(destination.id);
                    }}
                >
                    <icons.Heart
                        className={`w-4 h-4 ${isFavorite ? "fill-red-500 stroke-red-500" : ""
                            }`}
                    />
                </motion.button>

                {/* Bottom info */}
                <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-bold text-lg leading-tight">
                            {title}
                        </h3>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                            <icons.Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-white text-sm font-bold">
                                {details.rating}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-white/90 text-sm">
                        <div className="flex items-center">
                            <icons.MapPin className="w-3 h-3 mr-1" />
                            {details.distance}
                        </div>
                        <div className="font-bold text-white">
                            ₹{details.price?.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                        <icons.Calendar className="w-4 h-4 mr-1 text-teal-500" />
                        <span>{details.dates}</span>
                    </div>
                    <div className="flex items-center">
                        <icons.Users className="w-4 h-4 mr-1 text-blue-500" />
                        <span>{details.people}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                        {details.amenities?.slice(0, 3).map((amenity, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs"
                            >
                                {amenity}
                            </span>
                        ))}
                        {details.amenities?.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                                +{details.amenities.length - 3}
                            </span>
                        )}
                    </div>

                    <motion.div
                        className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 20px rgba(52, 211, 153, 0.5)",
                        }}
                    >
                        <icons.ArrowRight className="w-4 h-4" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;