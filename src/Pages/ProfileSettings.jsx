import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const DESTINATION_CATEGORIES = [
    "Beach", "Mountain", "City", "Adventure", "Historical",
    "Cultural", "Food & Drink", "Wildlife", "Wellness",
    "Shopping", "Nightlife", "Road Trip",
];

const BUDGET_OPTIONS = [
    "Under 50K",
    "50K - 100K",
    "100K - 250K",
    "250K - 500K",
    "Above 500K",
];

const API_URL = "http://localhost:3001/api";

export default function ProfileSettings() {
    const { user: currentUser, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        bio: "",
        profileImage: null,
        favoriteDestinations: [],
        location: "",
        budget: "",
    });
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser) {
            setFormData({
                displayName: currentUser.displayName || "",
                email: currentUser.email || "",
                bio: currentUser.bio || "",
                favoriteDestinations: currentUser.favoriteDestinations || [],
                location: currentUser.location || "",
                budget: currentUser.budget || "",
                profileImage: null,
            });

            setPreviewImage(
                currentUser.profileImage
                    ? `${API_URL}/${currentUser.profileImage}`
                    : currentUser.photoURL ||
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            );
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/"))
            return setErrors((prev) => ({
                ...prev,
                profileImage: "Please upload a valid image file",
            }));

        if (file.size > 2 * 1024 * 1024)
            return setErrors((prev) => ({
                ...prev,
                profileImage: "Image size should be less than 2MB",
            }));

        setFormData((prev) => ({ ...prev, profileImage: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
    };

    const toggleDestinationCategory = (category) => {
        setFormData((prev) => {
            const selected = prev.favoriteDestinations.includes(category)
                ? prev.favoriteDestinations.filter((c) => c !== category)
                : [...prev.favoriteDestinations, category];
            return { ...prev, favoriteDestinations: selected };
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.displayName.trim()) newErrors.displayName = "Display name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.budget) newErrors.budget = "Budget selection is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const data = new FormData();
            data.append("displayName", formData.displayName);
            data.append("email", formData.email);
            data.append("bio", formData.bio);
            data.append("location", formData.location);
            data.append("budget", formData.budget);
            data.append("favoriteDestinations", JSON.stringify(formData.favoriteDestinations));
            if (formData.profileImage) data.append("profileImage", formData.profileImage);

            const res = await axios.put(`${API_URL}/users/update-profile`, data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (res.data.success) toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-indigo-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 via-blue-700 to-indigo-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white tracking-wide">
                        Profile Settings
                    </h1>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200"
                    >
                        ← Back
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                {/* Profile Picture Card */}
                <motion.div
                    className="lg:col-span-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-blue-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="p-6 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-indigo-500 shadow-xl">
                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <label
                                htmlFor="profileImage"
                                className="absolute bottom-2 right-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white p-2 rounded-full cursor-pointer hover:opacity-90 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M4 5a2 2 0 00-2 2v8..." />
                                </svg>
                                <input type="file" id="profileImage" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{formData.displayName || "Your Name"}</h2>
                        <p className="text-teal-600">{formData.email || "user@example.com"}</p>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="lg:col-span-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-teal-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Personal Info */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Display Name *</label>
                                        <input
                                            type="text"
                                            name="displayName"
                                            value={formData.displayName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location & Budget */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                    Travel Preferences
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location *</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50"
                                            placeholder="e.g. New Delhi, India"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Budget *</label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-gray-50"
                                        >
                                            <option value="">Select Your Budget Range</option>
                                            {BUDGET_OPTIONS.map((opt, idx) => (
                                                <option key={idx} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-4 border-t border-gray-100 pt-6">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 text-white font-medium rounded-lg bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
