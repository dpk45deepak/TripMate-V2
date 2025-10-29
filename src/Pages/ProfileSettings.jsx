import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// tostify
 import "react-toastify/dist/ReactToastify.css";

// Backend API and logic
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
    Shield,
    Bell,
    Save,
    ArrowLeft,
    Sparkles,
    CheckCircle,
    X,
    Plus,
    Trash2,
    Waves,
    Mountain,
    Building2,
    Compass,
    Landmark,
    Palette,
    Utensils,
    PawPrint,
    HeartPulse,
    ShoppingBag,
    Moon,
    Car,
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

export const DESTINATION_CATEGORIES = [
    { name: "Beach", icon: Waves, color: "from-amber-400 to-orange-500" },
    { name: "Mountain", icon: Mountain, color: "from-emerald-500 to-teal-600" },
    { name: "City", icon: Building2, color: "from-blue-500 to-indigo-600" },
    { name: "Adventure", icon: Compass, color: "from-red-500 to-pink-600" },
    { name: "Historical", icon: Landmark, color: "from-amber-600 to-orange-700" },
    { name: "Cultural", icon: Palette, color: "from-purple-500 to-pink-600" },
    { name: "Food & Drink", icon: Utensils, color: "from-rose-500 to-red-600" },
    { name: "Wildlife", icon: PawPrint, color: "from-green-500 to-emerald-600" },
    { name: "Wellness", icon: HeartPulse, color: "from-teal-500 to-cyan-600" },
    { name: "Shopping", icon: ShoppingBag, color: "from-fuchsia-500 to-purple-600" },
    { name: "Nightlife", icon: Moon, color: "from-violet-500 to-purple-700" },
    { name: "Road Trip", icon: Car, color: "from-sky-500 to-blue-600" },
];

const BUDGET_OPTIONS = [
    { value: "Under 50K", label: "Budget Friendly", color: "from-green-500 to-emerald-600" },
    { value: "50K - 100K", label: "Comfort", color: "from-blue-500 to-cyan-600" },
    { value: "100K - 250K", label: "Premium", color: "from-purple-500 to-fuchsia-600" },
    { value: "250K - 500K", label: "Luxury", color: "from-amber-500 to-orange-600" },
    { value: "Above 500K", label: "Ultra Luxury", color: "from-rose-500 to-pink-600" },
];

export default function ProfileSettings() {

    const { user: currentUser, updateUser } = useContext(AuthContext);
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
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        if (currentUser) {
            // Format the date to YYYY-MM-DD if it exists
            const formatDate = (dateString) => {
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            setFormData({
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
                notifications: currentUser.notifications !== false,
                newsletter: currentUser.newsletter !== false,
                theme: currentUser.theme || "light"
            });

            setPreviewImage(
                currentUser.profileImage
                    ? `${currentUser.profileImage}`
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



    const suggestNextStep = (formData) => {
        if (!formData.displayName) return "your name";
        if (!formData.profileImage || previewImage.includes('encrypted-tbn0.gstatic.com')) return "a profile picture";
        if (!formData.bio) return "a bio";
        if (!formData.location) return "your location";
        if (!formData.dateOfBirth) return "your date of birth";
        if (!formData.phone) return "your phone number";
        if (!formData.favoriteDestinations || formData.favoriteDestinations.length < 3) {
            return "at least 3 favorite destinations";
        }
        if (!formData.budget) return "your travel budget";
        return "more details";
    };

    // Calculate profile completion percentage
    const calculateProfileCompletion = (formData) => {
        const fields = [
            { key: 'displayName', weight: 15 },
            { key: 'email', weight: 10 },
            { key: 'bio', weight: 10 },
            { key: 'location', weight: 10 },
            { key: 'budget', weight: 10 },
            { key: 'phone', weight: 10 },
            { key: 'dateOfBirth', weight: 10 },
            { key: 'profileImage', weight: 15 },
            { key: 'favoriteDestinations', minLength: 3, weight: 10 },
        ];

        let completion = 0;

        fields.forEach(field => {
            const value = formData[field.key];

            if (field.key === 'favoriteDestinations') {
                if (value && value.length >= (field.minLength || 1)) {
                    completion += field.weight;
                }
            } else if (field.key === 'profileImage') {
                if (previewImage && !previewImage.includes('encrypted-tbn0.gstatic.com')) {
                    completion += field.weight;
                }
            } else if (value && value.toString().trim() !== '') {
                completion += field.weight;
            }
        });

        return Math.min(completion, 100);
    };

    // Update completion when form data or preview image changes
    useEffect(() => {
        setCompletion(calculateProfileCompletion(formData));
    }, [formData, previewImage]);

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

            // Prepare the profile data
            const profileData = {
                username: formData.displayName,
                email: formData.email,
                bio: formData.bio,
                // favoriteDestinations: formData.favoriteDestinations,
                location: formData.location,
                budget: formData.budget,
                website: formData.website,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                notificationsEnabled: formData.notifications,
                newsletterEnabled: formData.newsletter,
                themePreference: formData.theme
            };

            // Handle profile image upload if a new one was selected
            if (formData.profileImage && typeof formData.profileImage !== 'string') {
                const imageFormData = new FormData();
                imageFormData.append('profileImage', formData.profileImage);

                // Upload the image first
                const imageResponse = await BACKEND_API.Users.UpdateProfileImage(imageFormData);
                if (imageResponse.data.profileImage) {
                    profileData.profileImage = imageResponse.data.profileImage;
                }
            }

            // Update the profile data
            const response = await BACKEND_API.Users.UpdateProfile(currentUser?.id || currentUser?._id, profileData);

            // Update the user context with new data
            if (response.data) {
                // This assumes your AuthContext has a way to update the user
                // You might need to adjust this based on your AuthContext implementation
                updateUser(response.data.user);
                console.log("Response after updating user: ", response.data);
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            const errorMessage = error.response?.data?.message || "Failed to update profile. Please try again.";
            toast.error(errorMessage);

            // Handle token expiration or unauthorized
            if (error.response?.status === 401) {
                // The interceptor in Backend.js should handle token refresh
                // If we get here, refresh might have failed
                toast.error("Your session has expired. Please log in again.");
                // Redirect to login or handle as per your auth flow
            }
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
                                        <span className="text-sm font-medium text-teal-600">{completion}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600"
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${completion}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>
                                    {completion < 100 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Complete more fields to reach 100%. Add {suggestNextStep(formData)} to increase your score.
                                        </p>
                                    )}
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
                                                        className={`p-3 rounded-xl border-2 transition-all text-blue-400 duration-200 ${formData.favoriteDestinations.includes(category.name)
                                                            ? `border-transparent bg-gradient-to-r ${category.color} text-white shadow-lg`
                                                            : "border-gray-200 bg-white hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <div className="text-2xl mb-1 flex items-center justify-center">
                                                            {React.createElement(category.icon, { className: "w-6 h-6" })}
                                                        </div>
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