import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
    Camera,
    User,
    Mail,
    MapPin,
    DollarSign,
    Heart,
    Globe,
    Calendar,
    Shield,
    Bell,
    Palette,
    Save,
    ArrowLeft,
    Sparkles,
    CheckCircle,
    X,
    Plus,
    Trash2
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            duration: 0.6
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const DESTINATION_CATEGORIES = [
    { name: "Beach", icon: "🏖️", color: "from-amber-400 to-orange-500" },
    { name: "Mountain", icon: "⛰️", color: "from-emerald-500 to-teal-600" },
    { name: "City", icon: "🏙️", color: "from-blue-500 to-indigo-600" },
    { name: "Adventure", icon: "🧗", color: "from-red-500 to-pink-600" },
    { name: "Historical", icon: "🏛️", color: "from-amber-600 to-orange-700" },
    { name: "Cultural", icon: "🎭", color: "from-purple-500 to-pink-600" },
    { name: "Food & Drink", icon: "🍜", color: "from-rose-500 to-red-600" },
    { name: "Wildlife", icon: "🐘", color: "from-green-500 to-emerald-600" },
    { name: "Wellness", icon: "🧘", color: "from-teal-500 to-cyan-600" },
    { name: "Shopping", icon: "🛍️", color: "from-fuchsia-500 to-purple-600" },
    { name: "Nightlife", icon: "🌃", color: "from-violet-500 to-purple-700" },
    { name: "Road Trip", icon: "🚗", color: "from-sky-500 to-blue-600" },
];

const BUDGET_OPTIONS = [
    { value: "Under 50K", label: "Budget Friendly", color: "from-green-500 to-emerald-600" },
    { value: "50K - 100K", label: "Comfort", color: "from-blue-500 to-cyan-600" },
    { value: "100K - 250K", label: "Premium", color: "from-purple-500 to-fuchsia-600" },
    { value: "250K - 500K", label: "Luxury", color: "from-amber-500 to-orange-600" },
    { value: "Above 500K", label: "Ultra Luxury", color: "from-rose-500 to-pink-600" },
];

const API_URL = "http://localhost:3001/api";

export default function ProfileSettings() {
    const { user: currentUser, token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        bio: "",
        profileImage: null,
        favoriteDestinations: [],
        location: "",
        budget: "",
        website: "",
        phone: "",
        dateOfBirth: "",
        notifications: true,
        newsletter: true,
        theme: "light"
    });
    const [previewImage, setPreviewImage] = useState(" ");
    const [errors, setErrors] = useState({});
    const [imageUploading, setImageUploading] = useState(false);

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
                website: currentUser.website || "",
                phone: currentUser.phone || "",
                dateOfBirth: currentUser.dateOfBirth || "",
                notifications: currentUser.notifications !== false,
                newsletter: currentUser.newsletter !== false,
                theme: currentUser.theme || "light"
            });

            setPreviewImage(
                currentUser.profileImage
                    ? `${API_URL}/${currentUser.profileImage}`
                    : currentUser.photoURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9jZ2FzVxFkw-yBn7FM0dOJRzLD26gS5Ro1w&s"
            );
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return toast.error("Please upload a valid image file");
        }

        if (file.size > 5 * 1024 * 1024) {
            return toast.error("Image size should be less than 5MB");
        }

        setImageUploading(true);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setFormData((prev) => ({ ...prev, profileImage: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
        setImageUploading(false);
        toast.success("Profile image updated!");
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
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.budget) newErrors.budget = "Budget selection is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setSaving(true);
            const data = new FormData();
            data.append("displayName", formData.displayName);
            data.append("email", formData.email);
            data.append("bio", formData.bio);
            data.append("location", formData.location);
            data.append("budget", formData.budget);
            data.append("website", formData.website);
            data.append("phone", formData.phone);
            data.append("dateOfBirth", formData.dateOfBirth);
            data.append("notifications", formData.notifications);
            data.append("newsletter", formData.newsletter);
            data.append("theme", formData.theme);
            data.append("favoriteDestinations", JSON.stringify(formData.favoriteDestinations));
            if (formData.profileImage) data.append("profileImage", formData.profileImage);

            const res = await axios.put(`${API_URL}/users/update-profile`, data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>Profile updated successfully!</span>
                    </div>
                );
            }
        } catch (err) {
            toast.error(
                <div className="flex items-center space-x-2">
                    <X className="w-5 h-5 text-red-500" />
                    <span>Failed to update profile. Please try again.</span>
                </div>
            );
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "preferences", label: "Preferences", icon: Heart },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "appearance", label: "Appearance", icon: Palette },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.history.back()}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                            </motion.button>
                            <div className="hidden md:flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Profile Settings</h1>
                                    <p className="text-sm text-gray-500">Manage your account and preferences</p>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar Navigation */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-3"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6 sticky top-32">
                            <nav className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeTab === tab.id
                                                ? "bg-gradient-to-r from-teal-50 to-indigo-50 text-teal-700 border border-teal-200/50 shadow-sm"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                                    >
                                        <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-teal-600' : 'text-gray-400'}`} />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Stats */}
                            <div className="mt-8 pt-6 border-t border-gray-200/60">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Profile Completion</span>
                                        <span className="text-sm font-medium text-teal-600">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-teal-500 to-indigo-600 h-2 rounded-full w-4/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Profile Tab */}
                            {activeTab === "profile" && (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 xl:grid-cols-3 gap-6"
                                >
                                    {/* Profile Picture Card */}
                                    <motion.div variants={item} className="xl:col-span-1">
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <div className="text-center">
                                                <div className="relative inline-block mb-6">
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="relative"
                                                    >
                                                        <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl mx-auto">
                                                            <img
                                                                src={previewImage}
                                                                alt="Profile"
                                                                className="w-full h-full object-cover"
                                                            />
                                                            {imageUploading && (
                                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <label
                                                            htmlFor="profileImage"
                                                            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-2 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 shadow-lg"
                                                        >
                                                            <Camera className="w-4 h-4" />
                                                            <input
                                                                type="file"
                                                                id="profileImage"
                                                                className="hidden"
                                                                onChange={handleImageChange}
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                    </motion.div>
                                                </div>

                                                <h2 className="text-xl font-bold text-gray-900 mb-1">
                                                    {formData.displayName || "Your Name"}
                                                </h2>
                                                <p className="text-gray-500 mb-4">{formData.email}</p>

                                                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Member since 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Personal Information */}
                                    <motion.div variants={item} className="xl:col-span-2">
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                                <User className="w-5 h-5 text-teal-600" />
                                                <span>Personal Information</span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Display Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="displayName"
                                                        value={formData.displayName}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200"
                                                        placeholder="Enter your name"
                                                    />
                                                    {errors.displayName && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200"
                                                        placeholder="your@email.com"
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200"
                                                        placeholder="+1 (555) 123-4567"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200"
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Bio
                                                    </label>
                                                    <textarea
                                                        name="bio"
                                                        value={formData.bio}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200 resize-none"
                                                        placeholder="Tell us about yourself..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === "preferences" && (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-6"
                                >
                                    {/* Location & Budget */}
                                    <motion.div variants={item}>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                                <MapPin className="w-5 h-5 text-teal-600" />
                                                <span>Travel Preferences</span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Current Location *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        value={formData.location}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white transition-all duration-200"
                                                        placeholder="e.g., New Delhi, India"
                                                    />
                                                    {errors.location && (
                                                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                                        Travel Budget *
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {BUDGET_OPTIONS.map((option, index) => (
                                                            <motion.button
                                                                key={index}
                                                                type="button"
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${formData.budget === option.value
                                                                        ? `border-transparent bg-gradient-to-r ${option.color} text-white shadow-lg`
                                                                        : "border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50"
                                                                    }`}
                                                            >
                                                                <div className="text-sm font-medium">{option.value}</div>
                                                                <div className="text-xs opacity-80">{option.label}</div>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                    {errors.budget && (
                                                        <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Favorite Destinations */}
                                    <motion.div variants={item}>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                                <Heart className="w-5 h-5 text-rose-600" />
                                                <span>Favorite Destination Types</span>
                                            </h3>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                                {DESTINATION_CATEGORIES.map((category, index) => (
                                                    <motion.button
                                                        key={index}
                                                        type="button"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => toggleDestinationCategory(category.name)}
                                                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${formData.favoriteDestinations.includes(category.name)
                                                                ? `border-transparent bg-gradient-to-r ${category.color} text-white shadow-lg`
                                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <div className="text-2xl mb-1">{category.icon}</div>
                                                        <div className="text-xs font-medium">{category.name}</div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === "notifications" && (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-6"
                                >
                                    <motion.div variants={item}>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                                <Bell className="w-5 h-5 text-amber-600" />
                                                <span>Notification Preferences</span>
                                            </h3>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
                                                    <div>
                                                        <div className="font-medium text-gray-900">Push Notifications</div>
                                                        <div className="text-sm text-gray-500">Receive push notifications on your device</div>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="notifications"
                                                            checked={formData.notifications}
                                                            onChange={handleChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
                                                    <div>
                                                        <div className="font-medium text-gray-900">Email Newsletter</div>
                                                        <div className="text-sm text-gray-500">Receive travel tips and exclusive deals</div>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="newsletter"
                                                            checked={formData.newsletter}
                                                            onChange={handleChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {/* Appearance Tab */}
                            {activeTab === "appearance" && (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    className="space-y-6"
                                >
                                    <motion.div variants={item}>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/60 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                                                <Palette className="w-5 h-5 text-purple-600" />
                                                <span>Theme Preferences</span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { id: "light", name: "Light", desc: "Clean and bright" },
                                                    { id: "dark", name: "Dark", desc: "Easy on the eyes" },
                                                    { id: "auto", name: "Auto", desc: "Follow system" }
                                                ].map((theme) => (
                                                    <motion.button
                                                        key={theme.id}
                                                        type="button"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                                                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${formData.theme === theme.id
                                                                ? "border-teal-500 bg-teal-50 shadow-sm"
                                                                : "border-gray-200 bg-white hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <div className="font-medium text-gray-900">{theme.name}</div>
                                                        <div className="text-sm text-gray-500 mt-1">{theme.desc}</div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}