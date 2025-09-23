import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    // Array of background images
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpMpoVGndYkLIQL-FUeTtyo2YpHwHrPZDFPA&s",
        "https://c4.wallpaperflare.com/wallpaper/498/721/291/queenstown-new-zealand-lake-wakatipu-bay-mountains-city-wallpaper-preview.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DeK5eg7rIsud2-ISqrr8foS5dgeP5-rsy4oNifNbpg6z_xxkedFYGoapjzbQMr_Ohf0&usqp=CAU",
        "https://lp-cms-production.imgix.net/2024-11/Shutterstock2028905879.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Auto change image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

        // Text animation variants
        const textVariants = {
            hidden: { opacity: 0, y: 30 },
            visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
            }
        };

    return (
        <section className="relative w-full mx-auto rounded-0 md:rounded-2xl h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white rounded-xl overflow-hidden">
            {/* Background images */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                />
            </AnimatePresence>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-0 md:rounded-2xl"></div>
            <div className="absolute inset-0 bg-black/20 rounded-0 md:rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-10 pb-32 md:pt-40 md:pb-20">
                <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-2xl leading-tight"
                >
                    Your Adventure Travel Experts<br className="hidden sm:block" /> In the World!
                </motion.h1>

                <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 drop-shadow-lg text-gray-200 max-w-3xl mx-auto"
                >
                    Discover amazing destinations with our expert guides
                </motion.p>
            </div>

            {/* Mobile bottom gradient */}
            {isMobile && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-0 md:rounded-2xl"></div>
            )}

            {/* Image indicator dots */}
            <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}