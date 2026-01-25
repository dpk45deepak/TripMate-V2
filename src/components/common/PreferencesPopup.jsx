import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import FilterPanel from './FilterPanel';
import { toast } from 'react-toastify';
import AuthContext from '../../Context/AuthContext';

const PreferencesPopup = ({ onClose }) => {
    const [initialFilters, setInitialFilters] = useState({
        destinationTypes: [],
        climates: [],
        activities: [],
        duration: "",
        budget: { min: 0, max: 1000 },
    });
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserPreferences = async () => {
            try {
                if (user) {
                    setInitialFilters({
                        destinationTypes: user.favoriteCategories || [],
                        climates: [],
                        activities: [],
                        duration: "",
                        budget: { min: 0, max: 1000 },
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to load user preferences. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserPreferences();
    }, [user]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <p>Loading your preferences...</p>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <div>
                <div className="max-h-[80vh] overflow-y-auto p-4">
                    <FilterPanel
                        isOpen={true}
                        onClose={onClose}
                        initialFilters={initialFilters}
                        isPreferencesMode={true}
                    />
                </div>
            </div>
        </AnimatePresence>
    );
};

export default PreferencesPopup;
