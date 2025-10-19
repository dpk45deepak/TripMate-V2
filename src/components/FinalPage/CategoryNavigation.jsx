
import icons from '../FinalPage/Icons.jsx'
import { motion } from 'framer-motion'


// Enhanced Category Navigation
const CategoryNavigation = ({ activeCategory, onCategoryChange }) => {
    const categories = [
        { id: "all", name: "All Trips", icon: icons.Star, count: 0 },
        { id: "domestic", name: "Domestic", icon: icons.MapPin, count: 0 },
        { id: "foreign", name: "Foreign", icon: icons.ArrowRight, count: 0 },
        { id: "featured", name: "Featured", icon: icons.Heart, count: 0 },
        { id: "trending", name: "Trending", icon: icons.Users, count: 0 },
    ];

    return (
        <div className="flex overflow-x-auto space-x-3 pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${activeCategory === category.id
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                            : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onCategoryChange(category.id)}
                >
                    <category.icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                    {category.count > 0 && (
                        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                            {category.count}
                        </span>
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryNavigation;