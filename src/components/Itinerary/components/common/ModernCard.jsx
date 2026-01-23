// src/components/common/ModernCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ModernCard = ({
    children,
    className = "",
    hover = true,
    padding = true,
    onClick,
    gradient = false
}) => {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
            onClick={onClick}
            className={`
        rounded-2xl overflow-hidden
        ${gradient
                    ? 'bg-linear-to-br from-white to-gray-50'
                    : 'bg-white'
                }
        shadow-lg border border-gray-100
        ${padding ? 'p-6' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

export default ModernCard;