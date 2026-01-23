// src/components/common/EmptyState.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Compass, Search } from 'lucide-react';

const EmptyState = ({
    title = "Nothing here yet",
    description = "Get started by creating your first item",
    icon: Icon = Compass,
    action,
    actionLabel = "Create New"
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 px-4"
        >
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-linear-to-r from-blue-50 to-purple-50 mb-6">
                <Icon className="h-10 w-10 text-blue-500" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">{description}</p>

            {action && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action}
                    className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    {actionLabel}
                </motion.button>
            )}
        </motion.div>
    );
};

export default EmptyState;