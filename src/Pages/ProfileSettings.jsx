import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BACKEND_API from "../Services/Backend";
import AuthContext from "../Context/AuthContext";

import {
    Camera,
    User,
    Mail,
    MapPin,
    DollarSign,
    Heart,
    Globe,
    Calendar,
    Bell,
    Save,
    ArrowLeft,
    Sparkles,
    CheckCircle,
    Building2,
    Palette,
    HeartPulse,
    ShoppingBag,
    Moon,
    Car,
    Target,
    TrendingUp,
    Sunset,
    Sun,
    Navigation,
    Compass as CompassIcon,
    MountainSnow,
    Settings2,
    Crown,
    Trophy,
    Check,
    Smartphone,
    Gift,
    Coffee,
    TreePine,
    Castle,
    Plane,
    Shield,
    Edit3,
    Zap
} from "lucide-react";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export default function ModernProfileSettings() {
    const { user: currentUser, updateUser } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);
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
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [completion, setCompletion] = useState(0);

    // Modern destination categories
    const MODERN_CATEGORIES = [
        { name: "Beach", icon: Sunset, color: "from-amber-200 to-orange-300" },
        { name: "Mountain", icon: MountainSnow, color: "from-blue-100 to-cyan-200" },
        { name: "City", icon: Building2, color: "from-teal-100 to-blue-200" },
        { name: "Adventure", icon: Navigation, color: "from-green-100 to-emerald-200" },
        { name: "Historical", icon: Castle, color: "from-yellow-100 to-amber-200" },
        { name: "Cultural", icon: Palette, color: "from-fuchsia-100 to-rose-200" },
        { name: "Nature", icon: TreePine, color: "from-emerald-100 to-green-200" },
        { name: "Nightlife", icon: Moon, color: "from-indigo-100 to-blue-200" },
        { name: "Road Trip", icon: Car, color: "from-rose-100 to-blue-200" }
    ];

    const BUDGET_OPTIONS = [
        { value: "Under 50K", label: "Budget", color: "from-green-400 to-emerald-500", icon: DollarSign },
        { value: "50K - 100K", label: "Comfort", color: "from-blue-400 to-cyan-500", icon: DollarSign },
        { value: "100K - 250K", label: "Premium", color: "from-teal-400 to-fuchsia-500", icon: DollarSign },
        { value: "250K - 500K", label: "Luxury", color: "from-amber-400 to-orange-500", icon: Crown },
        { value: "Above 500K", label: "Ultra Luxury", color: "from-rose-400 to-blue-500", icon: Trophy }
    ];

    // Calculate profile completion
    const calculateProfileCompletion = () => {
        let score = 0;
        const total = 100;

        if (formData.displayName?.trim()) score += 15;
        if (formData.email?.trim()) score += 10;
        if (formData.bio?.trim()) score += 10;
        if (formData.location?.trim()) score += 10;
        if (formData.budget) score += 10;
        if (formData.phone?.trim()) score += 10;
        if (formData.dateOfBirth) score += 10;
        if (previewImage && !previewImage.includes('unsplash.com')) score += 15;
        if (formData.favoriteDestinations.length >= 3) score += 10;

        return Math.min(score, total);
    };

    useEffect(() => {
        if (currentUser) {
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            const userData = {
                displayName: currentUser.displayName || currentUser.username || "",
                email: currentUser.email || "",
                bio: currentUser.bio || "",
                favoriteDestinations: currentUser.favoriteDestinations || [],
                location: currentUser.location || "",
                budget: currentUser.budget || "",
                profileImage: null,
                website: currentUser.website || "",
                phone: currentUser.phone || "",
                dateOfBirth: formatDate(currentUser.dateOfBirth) || "",
                notifications: currentUser.notificationsEnabled !== false,
                newsletter: currentUser.newsletterEnabled !== false,
                theme: currentUser.themePreference || "light"
            };

            setFormData(userData);

            setPreviewImage(
                currentUser.profileImage
                    ? `${currentUser.profileImage}`
                    : currentUser.photoURL ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            );
        }
    }, [currentUser]);

    useEffect(() => {
        setCompletion(calculateProfileCompletion());
    }, [formData, previewImage]);

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

        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData(prev => ({ ...prev, profileImage: file }));
                setImageUploading(false);
                toast.success("Profile image updated!");
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error("Error uploading image");
            setImageUploading(false);
        }
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
        if (!formData.displayName?.trim()) newErrors.displayName = "Display name is required";
        if (!formData.email?.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.location?.trim()) newErrors.location = "Location is required";
        if (!formData.budget) newErrors.budget = "Budget selection is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setSaving(true);

            // Prepare profile data according to your backend expectations
            const profileData = {
                username: formData.displayName,
                email: formData.email,
                bio: formData.bio,
                favoriteDestinations: formData.favoriteDestinations,
                location: formData.location,
                budget: formData.budget,
                website: formData.website,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                notificationsEnabled: formData.notifications,
                newsletterEnabled: formData.newsletter,
                themePreference: formData.theme
            };

            let profileImageUrl = null;

            // Handle profile image upload if a new image was selected
            if (formData.profileImage && typeof formData.profileImage !== 'string') {
                try {
                    const imageFormData = new FormData();
                    imageFormData.append('profileImage', formData.profileImage);

                    const imageResponse = await BACKEND_API.Users.UpdateProfileImage(imageFormData);

                    if (imageResponse.data?.profileImage) {
                        profileImageUrl = imageResponse.data.profileImage;
                        profileData.profileImage = profileImageUrl;
                    }
                } catch (imageError) {
                    console.error("Error uploading profile image:", imageError);
                    toast.warning("Profile saved, but image upload failed");
                }
            }

            // Update user profile
            const response = await BACKEND_API.Users.UpdateProfile(
                currentUser?.id || currentUser?._id || currentUser?.userId,
                profileData
            );

            if (response.data?.user) {
                // Update user in context with new data
                const updatedUser = {
                    ...currentUser,
                    ...response.data.user,
                    profileImage: profileImageUrl || currentUser.profileImage
                };

                updateUser(updatedUser);
                toast.success("Profile updated successfully!");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            const errorMessage = error.response?.data?.message ||
                error.message ||
                "Failed to update profile. Please try again.";
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-blue-50/30 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-teal-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-linear-to-br from-blue-200 to-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="sticky top-0 z-50 px-6 py-4"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.history.back()}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 hover:bg-white/40 transition-all duration-300"
                                >
                                    <ArrowLeft className="w-4 h-4 text-gray-700 group-hover:text-teal-600 transition-colors" />
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-teal-600 transition-colors">Back</span>
                                </motion.button>

                                <div className="hidden md:flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                            Profile Settings
                                        </h1>
                                        <p className="text-xs text-gray-500">Customize your travel experience</p>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(13, 148, 136, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                disabled={saving}
                                className="group px-6 py-3 rounded-2xl bg-linear-to-r from-teal-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="relative">
                                    {saving ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                </div>
                                <span>{saving ? "Saving..." : "Save Changes"}</span>
                                {!saving && (
                                    <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.header>

                {/* Main Content - Dashboard Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        {/* Left Column - Profile & Stats */}
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.01 }}
                                className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl"
                            >
                                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-teal-500/10 to-blue-500/10"></div>
                                <div className="relative p-6">
                                    <div className="flex flex-col items-center">
                                        {/* Profile Image */}
                                        <motion.div
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="relative mb-6"
                                        >
                                            <div className="relative w-32 h-32 rounded-full p-1 bg-linear-to-r from-teal-500 to-blue-500">
                                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-gray-100">
                                                    {previewImage ? (
                                                        <img
                                                            src={previewImage}
                                                            alt="Profile"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-linear-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                                                            <User className="w-12 h-12 text-teal-400" />
                                                        </div>
                                                    )}
                                                    {imageUploading && (
                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                    )}
                                                </div>
                                                <label
                                                    htmlFor="profileImage"
                                                    className="absolute bottom-2 right-2 w-10 h-10 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                                                >
                                                    <Camera className="w-4 h-4 text-white" />
                                                    <input
                                                        type="file"
                                                        id="profileImage"
                                                        className="hidden"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                    />
                                                </label>
                                            </div>
                                        </motion.div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                            {formData.displayName || "Traveler"}
                                        </h2>
                                        <p className="text-gray-500 mb-4 flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {formData.email}
                                        </p>

                                        {/* Badges */}
                                        <div className="flex gap-2 mb-6">
                                            <div className="px-3 py-1 bg-linear-to-r from-teal-100 to-blue-100 text-teal-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Explorer
                                            </div>
                                            <div className="px-3 py-1 bg-linear-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                <CompassIcon className="w-3 h-3" />
                                                Adventurer
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                                        {[
                                            { label: "Trips", value: "24", icon: Plane, color: "text-teal-500" },
                                            { label: "Countries", value: "12", icon: Globe, color: "text-blue-500" },
                                            { label: "Level", value: "Gold", icon: Crown, color: "text-amber-500" }
                                        ].map((stat, index) => (
                                            <div key={index} className="text-center group">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                                    <stat.icon className={`w-3 h-3 ${stat.color}`} />
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Progress Card */}
                            <motion.div
                                variants={fadeInUp}
                                className="rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Profile Completion</h3>
                                    <span className="text-2xl font-bold bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                        {completion}%
                                    </span>
                                </div>

                                {/* Circular Progress */}
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="#E5E7EB"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            stroke="url(#progress-linear)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="251.2"
                                            strokeDashoffset={251.2 * (1 - completion / 100)}
                                        />
                                        <defs>
                                            <linearGradient id="progress-linear" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#0d9488" />
                                                <stop offset="100%" stopColor="#3b82f6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-900">{completion}%</div>
                                            <div className="text-xs text-gray-500">Complete</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { label: "Profile Info", done: formData.displayName && formData.email },
                                        { label: "Travel Preferences", done: formData.location && formData.budget },
                                        { label: "3+ Destinations", done: formData.favoriteDestinations.length >= 3 },
                                        { label: "Profile Photo", done: !previewImage.includes('unsplash.com') }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {item.done ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                                )}
                                                <span className={`text-sm ${item.done ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {item.label}
                                                </span>
                                            </div>
                                            {item.done ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Middle Column - Forms & Preferences */}
                        <div className="space-y-6">
                            {/* Personal Information Card */}
                            <motion.div
                                variants={fadeInUp}
                                className="rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                                        <p className="text-sm text-gray-500">Your basic details</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Display Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="displayName"
                                                    value={formData.displayName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.displayName ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200`}
                                                    placeholder="Your name"
                                                />
                                                <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                            {errors.displayName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.displayName}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200`}
                                                    placeholder="your@email.com"
                                                />
                                                <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 resize-none"
                                                placeholder="Tell us about your travel passions..."
                                                maxLength={200}
                                            />
                                            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                                                {formData.bio.length}/200
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                <Smartphone className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    name="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200"
                                                />
                                                <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Destination Categories Card */}
                            <motion.div
                                variants={fadeInUp}
                                className="rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-blue-500 flex items-center justify-center">
                                            <Heart className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Favorite Destinations</h3>
                                            <p className="text-sm text-gray-500">Select your travel interests</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-linear-to-r from-rose-100 to-blue-100 text-rose-700 rounded-full text-sm font-medium">
                                        {formData.favoriteDestinations.length} selected
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {MODERN_CATEGORIES.map((category, index) => {
                                        const isSelected = formData.favoriteDestinations.includes(category.name);

                                        return (
                                            <motion.button
                                                key={index}
                                                type="button"
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => toggleDestinationCategory(category.name)}
                                                className={`relative p-4 rounded-xl border transition-all duration-300 overflow-hidden ${isSelected
                                                    ? "border-transparent"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <div
                                                    className={`absolute inset-0 bg-linear-to-br ${category.color} ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-10"
                                                        } transition-opacity duration-300`}
                                                />
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <category.icon
                                                        className={`w-6 h-6 mb-2 ${isSelected ? "text-white" : "text-gray-600"
                                                            }`}
                                                    />
                                                    <span
                                                        className={`text-xs font-medium ${isSelected ? "text-white" : "text-gray-700"
                                                            }`}
                                                    >
                                                        {category.name}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="w-5 h-5 bg-linear-to-r from-rose-500 to-blue-500 rounded-full flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Settings & Preferences */}
                        <div className="space-y-6">
                            {/* Travel Preferences Card */}
                            <motion.div
                                variants={fadeInUp}
                                className="rounded-3xl p-6 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                        <CompassIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Travel Preferences</h3>
                                        <p className="text-sm text-gray-500">Your travel style & budget</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Location *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.location ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white/50 transition-all duration-200`}
                                                placeholder="Where are you based?"
                                            />
                                            <MapPin className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                                        </div>
                                        {errors.location && (
                                            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Travel Budget *
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {BUDGET_OPTIONS.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    type="button"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setFormData(prev => ({ ...prev, budget: option.value }))}
                                                    className={`p-3 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center ${formData.budget === option.value
                                                        ? `border-transparent bg-linear-to-r ${option.color} text-white shadow-lg`
                                                        : "border-gray-200 bg-white/50 hover:bg-white"
                                                        }`}
                                                >
                                                    <option.icon
                                                        className={`w-4 h-4 mb-1 ${formData.budget === option.value ? "text-white" : "text-gray-400"
                                                            }`}
                                                    />
                                                    <div className="text-xs font-medium">{option.value}</div>
                                                    <div className="text-xs opacity-80 mt-1">{option.label}</div>
                                                </motion.button>
                                            ))}
                                        </div>
                                        {errors.budget && (
                                            <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Settings Grid */}
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Notifications Card */}
                                    <motion.div
                                        variants={fadeInUp}
                                        className="rounded-3xl p-6 backdrop-blur-xl bg-white/40 shadow-xl border border-white/30"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                                                <Bell className="w-6 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                <p className="text-xs text-gray-500">Manage how we keep you updated</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Push */}
                                            <div className="flex flex-col text-center items-center justify-between p-4 rounded-2xl border border-white/30 bg-white/50 backdrop-blur-sm shadow-sm">
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">Push Notifications</div>
                                                    <div className="text-xs text-gray-500">Instant alerts on your phone</div>
                                                </div>

                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${formData.notifications
                                                            ? "bg-linear-to-r from-amber-500 to-orange-500"
                                                            : "bg-gray-300"
                                                        }`}
                                                    onClick={() =>
                                                        setFormData((prev) => ({ ...prev, notifications: !prev.notifications }))
                                                    }
                                                >
                                                    <motion.div
                                                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                                                        animate={{ x: formData.notifications ? 24 : 0 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                </motion.div>
                                            </div>

                                            {/* Email */}
                                            <div className="flex flex-col text-center items-center justify-between p-4 rounded-2xl border border-white/30 bg-white/50 backdrop-blur-sm shadow-sm">
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">Email Newsletter</div>
                                                    <div className="text-xs text-gray-500">Travel tips & exclusive deals</div>
                                                </div>

                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${formData.newsletter
                                                            ? "bg-linear-to-r from-amber-500 to-orange-500"
                                                            : "bg-gray-300"
                                                        }`}
                                                    onClick={() =>
                                                        setFormData((prev) => ({ ...prev, newsletter: !prev.newsletter }))
                                                    }
                                                >
                                                    <motion.div
                                                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"
                                                        animate={{ x: formData.newsletter ? 24 : 0 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Theme Card */}
                                    <motion.div
                                        variants={fadeInUp}
                                        className="rounded-3xl p-6 backdrop-blur-xl bg-white/40 shadow-xl border border-white/30"
                                    >
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-md">
                                                <Palette className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Theme</h3>
                                                <p className="text-xs text-gray-500">Choose your appearance</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {[
                                                { id: "light", name: "Light", icon: Sun, color: "from-amber-200 to-yellow-200" },
                                                { id: "dark", name: "Dark", icon: Moon, color: "from-gray-800 to-slate-900" },
                                                { id: "auto", name: "Auto", icon: Settings2, color: "from-cyan-200 to-blue-200" },
                                            ].map((theme) => {
                                                const isActive = formData.theme === theme.id;

                                                return (
                                                    <motion.button
                                                        key={theme.id}
                                                        type="button"
                                                        whileHover={{ y: -2, scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setFormData((prev) => ({ ...prev, theme: theme.id }))}
                                                        className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${isActive
                                                                ? "border-transparent bg-linear-to-r from-teal-100 to-blue-100 shadow-md"
                                                                : "border-gray-200 bg-white/60 hover:shadow-sm"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`w-9 h-9 rounded-xl bg-linear-to-br ${theme.color} flex items-center justify-center shadow`}
                                                            >
                                                                <theme.icon className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="font-medium text-sm text-gray-900">{theme.name}</span>
                                                        </div>

                                                        {isActive && (
                                                            <div className="w-5 h-5 bg-linear-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow">
                                                                <Check className="w-3 h-3 text-white" />
                                                            </div>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}