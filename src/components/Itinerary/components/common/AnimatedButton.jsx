// src/components/common/AnimatedButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    loading = false,
    disabled = false,
    fullWidth = false,
    className = ""
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
        outline: "border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 focus:ring-blue-400",
        danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-500"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-lg"
    };

    return (
        <motion.button
            whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
            whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
        >
            {loading ? (
                <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </div>
            ) : (
                <>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {children}
                </>
            )}
        </motion.button>
    );
};

export default AnimatedButton;