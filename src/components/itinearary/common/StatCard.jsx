// src/components/common/StatCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, color, change }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 shadow-lg"
        >
            <div className="flex items-center space-x-4">
                <div className={`p-3 bg-linear-to-r ${color} rounded-xl`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-500">{label}</p>
                    <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold text-gray-900">{value}</p>
                        {change && (
                            <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                                }`}>
                                {change}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;