// src/components/AnimatedTravelBackground.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Plane,
    Camera,
    Map,
    Sun,
    Luggage,
    Shirt,
    Umbrella,
    Mountain,
    Compass,
    Ship,
    Footprints,
    Tent,
    Cloud,
    Globe,
    Bus,
    Landmark,
    Wallet,
    ShoppingBag,
} from "lucide-react";

const icons = [
    Plane,
    Camera,
    Map,
    Sun,
    Luggage,
    Shirt,
    Umbrella,
    Mountain,
    Compass,
    Ship,
    Footprints,
    Tent,
    Cloud,
    Globe,
    Bus,
    Landmark,
    Wallet,
    ShoppingBag,
];

// Soft pastel random color generator
const randomColor = () => {
    const colors = [
        "#60A5FA", // blue
        "#34D399", // green
        "#FBBF24", // yellow
        "#F472B6", // pink
        "#A78BFA", // violet
        "#F87171", // red
        "#2DD4BF", // teal
        "#FACC15", // amber
        "#818CF8", // indigo
        "#FB7185", // rose
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const AnimatedTravelBackground = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const randomPositions = icons.map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 120 + 80, // 🔥 80–200px (double size)
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 10, // 10–25s
            color: randomColor(),
        }));
        setPositions(randomPositions);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((Icon, i) => (
                <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: [0, -60, 0],
                        opacity: [0.2, 0.7, 0.2],
                        rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                        duration: positions[i]?.duration || 15,
                        delay: positions[i]?.delay || 0,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute"
                    style={{
                        top: `${positions[i]?.top}%`,
                        left: `${positions[i]?.left}%`,
                        fontSize: `${positions[i]?.size}px`,
                        color: positions[i]?.color,
                    }}
                >
                    <Icon strokeWidth={3.2} />
                </motion.div>
            ))}

            {/* Soft gradient overlay for visual depth */}
            <div className="absolute inset-0 bg-transparent" />
        </div>
    );
};

export default AnimatedTravelBackground;
