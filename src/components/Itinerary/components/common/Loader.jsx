// src/components/common/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 'md', fullScreen = false }) => {
    const sizes = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    const loader = (
        <div className="flex items-center justify-center">
            <div className="relative">
                <motion.div
                    className={`${sizes[size]} border-4 border-gray-200 rounded-full`}
                />
                <motion.div
                    className={`${sizes[size]} border-4 border-blue-500 border-t-transparent rounded-full absolute inset-0`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                    {loader}
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return loader;
};

export default Loader;