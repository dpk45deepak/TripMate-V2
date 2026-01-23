// AddMemoryForm.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image, Video, MapPin, Calendar, Tag, Globe, Sparkles, Camera } from 'lucide-react';

export const AddMemoryForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        caption: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        mediaType: 'image',
        mediaFile: null,
        tags: [],
        mood: 'happy',
        tripId: '',
        privacy: 'private'
    });

    const [tagInput, setTagInput] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const moods = [
        { id: 'happy', emoji: '😊', label: 'Happy' },
        { id: 'excited', emoji: '🎉', label: 'Excited' },
        { id: 'peaceful', emoji: '😌', label: 'Peaceful' },
        { id: 'adventurous', emoji: '🏔️', label: 'Adventurous' },
        { id: 'romantic', emoji: '❤️', label: 'Romantic' }
    ];

    const trips = [
        { id: '1', name: 'Kyoto, Japan - March 2024' },
        { id: '2', name: 'Santorini, Greece - June 2024' },
        { id: '3', name: 'Swiss Alps - December 2024' }
    ];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, mediaFile: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim().toLowerCase())) {
                setFormData({
                    ...formData,
                    tags: [...formData.tags, tagInput.trim().toLowerCase()]
                });
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const memoryData = {
                ...formData,
                id: Date.now(),
                likes: 0,
                isLiked: false
            };

            onSubmit(memoryData);
            onClose();
        } catch (error) {
            console.error('Error submitting memory:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >

            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="
                    relative w-full
                    max-w-5xl
                    bg-white backdrop-blur-xl
                    rounded-3xl
                    border border-teal-500
                    overflow-hidden
                    py-10
                    "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative bg-linear-to-r from-blue-500 via-teal-500 to-indigo-500 p-6">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Add Memory</h2>
                            <p className="text-white/90 text-sm">Capture moments from your adventure</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Media Upload */}
                        <div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Media Upload
                                </label>

                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="image/*,video/*"
                                        className="hidden"
                                    />

                                    {previewUrl ? (
                                        <div className="relative">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-48 object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewUrl(null);
                                                    setFormData({ ...formData, mediaFile: null });
                                                }}
                                                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80"
                                            >
                                                <X size={16} className="text-white" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mx-auto mb-4 w-16 h-16 bg-linear-to-r from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center">
                                                <Upload size={24} className="text-blue-600" />
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-gray-500 text-sm">PNG, JPG, GIF, MP4 up to 10MB</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    {['image', 'video', 'text'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, mediaType: type })}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${formData.mediaType === type
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                }`}
                                        >
                                            {type === 'image' && <Image size={18} />}
                                            {type === 'video' && <Video size={18} />}
                                            {type === 'text' && <Camera size={18} />}
                                            <span className="capitalize font-medium">{type}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mood Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    How did you feel?
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {moods.map((mood) => (
                                        <button
                                            key={mood.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, mood: mood.id })}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.mood === mood.id
                                                    ? 'border-teal-500 bg-teal-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <span className="text-2xl mb-1">{mood.emoji}</span>
                                            <span className="text-xs font-medium text-gray-700">{mood.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form Fields */}
                        <div>
                            {/* Caption */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Memory Caption
                                </label>
                                <textarea
                                    value={formData.caption}
                                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                    placeholder="Describe this moment..."
                                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    maxLength={500}
                                />
                                <div className="text-right text-sm text-gray-500 mt-1">
                                    {formData.caption.length}/500
                                </div>
                            </div>

                            {/* Location & Date */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin size={14} className="inline mr-1" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Where was this?"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar size={14} className="inline mr-1" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Tag size={14} className="inline mr-1" />
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="hover:text-blue-900"
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleAddTag}
                                    placeholder="Type and press Enter to add tags"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Trip Selection & Privacy */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Globe size={14} className="inline mr-1" />
                                        Associated Trip
                                    </label>
                                    <select
                                        value={formData.tripId}
                                        onChange={(e) => setFormData({ ...formData, tripId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a trip</option>
                                        {trips.map(trip => (
                                            <option key={trip.id} value={trip.id}>{trip.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Privacy
                                    </label>
                                    <select
                                        value={formData.privacy}
                                        onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="private">Private</option>
                                        <option value="friends">Friends Only</option>
                                        <option value="public">Public</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="px-8 py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-medium rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isUploading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving Memory...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Save Memory
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};