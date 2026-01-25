// src/components/itinerary/AddMemoriesForm.jsx
import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Image, Video, MapPin, Calendar, Tag, Globe, Sparkles, Camera } from 'lucide-react';
import { BACKEND_API } from '../../../../Services/Backend';
import AuthContext from '../../../../Context/AuthContext';
import useCloudinaryUpload from '../../../../hooks/useCloudinaryUpload';
import useToast from '../../../../hooks/useToast';

export const AddMemoryForm = ({ onClose, onSubmit }) => {

    const toast = useToast();

    const { user } = useContext(AuthContext);
    const { upload, uploading: cloudinaryUploading } = useCloudinaryUpload();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        mood: 'happy',
        tripId: '',
        privacy: 'private',
        mediaUrls: [], // Changed from mediaFile to mediaUrls for multiple files
        mediaType: 'photo',
        travelers: [],
        tripName: ''
    });

    const [tagInput, setTagInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const moods = [
        { id: 'happy', emoji: '😊', label: 'Happy' },
        { id: 'excited', emoji: '🎉', label: 'Excited' },
        { id: 'peaceful', emoji: '😌', label: 'Peaceful' },
        { id: 'adventurous', emoji: '🏔️', label: 'Adventurous' },
        { id: 'romantic', emoji: '❤️', label: 'Romantic' },
        { id: 'inspired', emoji: '✨', label: 'Inspired' },
        { id: 'relaxed', emoji: '😎', label: 'Relaxed' }
    ];

    // In real app, fetch from backend
    const trips = [
        { id: 'bali-2024', name: 'Bali Adventure 2024' },
        { id: 'japan-2024', name: 'Japan Cherry Blossom' },
        { id: 'europe-2023', name: 'Europe Tour 2023' }
    ];

    const memoryTypes = [
        { id: 'photo', label: 'Photo', icon: Image },
        { id: 'video', label: 'Video', icon: Video },
        { id: 'food', label: 'Food', icon: Camera },
        { id: 'adventure', label: 'Adventure', icon: Camera },
        { id: 'culture', label: 'Culture', icon: Camera },
        { id: 'social', label: 'Social', icon: Camera }
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.description.length > 2000) newErrors.description = 'Description must be less than 2000 characters';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (uploadedFiles.length === 0) newErrors.media = 'At least one media file is required';
        if (uploadedFiles.length > 10) newErrors.media = 'Maximum 10 files allowed';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);

        // Validate file types and sizes
        const validFiles = files.filter(file => {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    media: `Invalid file type: ${file.type}. Supported: images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM)`
                }));
                return false;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    media: `File ${file.name} is too large (max 10MB)`
                }));
                return false;
            }

            return true;
        });

        if (validFiles.length === 0) return;

        try {
            // Create local previews
            const newPreviews = await Promise.all(
                validFiles.map(file => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve({
                            url: reader.result,
                            type: file.type.startsWith('video/') ? 'video' : 'image',
                            file
                        });
                        reader.readAsDataURL(file);
                    });
                })
            );

            setPreviewUrls(prev => [...prev, ...newPreviews]);
            setUploadedFiles(prev => [...prev, ...validFiles]);
            setErrors(prev => ({ ...prev, media: null }));

        } catch (error) {
            console.error('Error creating previews:', error);
            setErrors(prev => ({
                ...prev,
                media: 'Error processing files'
            }));
        }
    };

    const removeFile = (index) => {
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const tag = tagInput.trim().toLowerCase();

            if (!formData.tags.includes(tag) && formData.tags.length < 10) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag]
                }));
                setErrors(prev => ({ ...prev, tags: null }));
            } else if (formData.tags.length >= 10) {
                setErrors(prev => ({ ...prev, tags: 'Maximum 10 tags allowed' }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTripChange = (tripId) => {
        const trip = trips.find(t => t.id === tripId);
        setFormData(prev => ({
            ...prev,
            tripId,
            tripName: trip ? trip.name : ''
        }));
    };

    const uploadMediaToCloudinary = async () => {
        const uploadedUrls = [];

        for (const file of uploadedFiles) {
            try {
                const folder = `memories/${user?.id || 'anonymous'}`;
                const result = await upload(file, folder);

                if (result?.secure_url) {
                    uploadedUrls.push({
                        url: result.secure_url,
                        type: file.type.startsWith('video/') ? 'video' : 'image',
                        publicId: result.public_id,
                        format: result.format
                    });
                }
            } catch (error) {
                console.error('Failed to upload file:', error);
                throw new Error(`Failed to upload ${file.name}: ${error.message}`);
            }
        }

        return uploadedUrls;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload media to Cloudinary
            let mediaUrls = [];
            if (uploadedFiles.length > 0) {
                mediaUrls = await uploadMediaToCloudinary();
            }

            // 2. Prepare memory data for backend
            const memoryData = {
                userId: user?._id,
                title: formData.title,
                tripId: formData.tripId,
                description: formData.description,
                location: formData.location,
                date: formData.date,
                tags: formData.tags,
                mood: formData.mood,
                tripName: formData.tripName,
                privacy: formData.privacy,
                type: formData.mediaType,
                images: mediaUrls.filter(m => m.type === 'image').map(m => m.url),
                videos: mediaUrls.filter(m => m.type === 'video').map(m => m.url),
                travelers: formData.travelers,
                userName: user?.username || 'You'
            };

            // 3. Submit to backend
            const response = await BACKEND_API.Memories.Create(memoryData);

            if (response.status == 201) {
                // Call onSubmit with the created memory
                onSubmit(response.data.data);
                toast.success('Memory added successfully!');
                onClose();
            } else {
                throw new Error(response.data?.message || 'Failed to create memory');
            }

        } catch (error) {
            console.error('Error submitting memory:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Failed to save memory. Please try again.'
            }));
        } finally {
            setIsSubmitting(false);
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
                className="relative w-full max-w-5xl max-h-[90vh] bg-white backdrop-blur-xl rounded-3xl border border-teal-500 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-linear-to-r from-blue-500 via-teal-500 to-indigo-500 p-6 shrink-0">
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                            disabled={isSubmitting}
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

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Media Upload */}
                        <div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Media Upload *
                                </label>

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="image/*,video/*"
                                        className="hidden"
                                        multiple
                                        disabled={cloudinaryUploading || isSubmitting}
                                    />

                                    {previewUrls.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-4">
                                            {previewUrls.map((preview, index) => (
                                                <div key={index} className="relative group">
                                                    {preview.type === 'video' ? (
                                                        <video
                                                            src={preview.url}
                                                            className="w-full h-32 object-cover rounded-xl"
                                                            controls
                                                        />
                                                    ) : (
                                                        <img
                                                            src={preview.url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="w-full h-32 object-cover rounded-xl"
                                                        />
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        disabled={isSubmitting}
                                                    >
                                                        <X size={16} className="text-white" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mx-auto mb-4 w-16 h-16 bg-linear-to-r from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center">
                                                <Upload size={24} className="text-blue-600" />
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-gray-500 text-sm">Images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM) up to 10MB each</p>
                                            <p className="text-gray-400 text-xs mt-1">Maximum 10 files</p>
                                        </>
                                    )}
                                </div>

                                {errors.media && (
                                    <p className="text-red-500 text-sm mt-2">{errors.media}</p>
                                )}

                                {/* Memory Type */}
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Memory Type
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {memoryTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, mediaType: type.id })}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${formData.mediaType === type.id
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                    }`}
                                                disabled={isSubmitting}
                                            >
                                                <type.icon size={16} />
                                                <span className="text-sm font-medium">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mood Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    How did you feel?
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {moods.map((mood) => (
                                        <button
                                            key={mood.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, mood: mood.id })}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.mood === mood.id
                                                ? 'border-teal-500 bg-teal-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            disabled={isSubmitting}
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
                            {/* Title */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Give your memory a title..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    maxLength={100}
                                    disabled={isSubmitting}
                                />
                                <div className="flex justify-between mt-1">
                                    <div className="text-sm text-red-500">{errors.title}</div>
                                    <div className="text-sm text-gray-500">
                                        {formData.title.length}/100
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe this moment in detail..."
                                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    maxLength={2000}
                                    disabled={isSubmitting}
                                />
                                <div className="flex justify-between mt-1">
                                    <div className="text-sm text-red-500">{errors.description}</div>
                                    <div className="text-sm text-gray-500">
                                        {formData.description.length}/2000
                                    </div>
                                </div>
                            </div>

                            {/* Location & Date */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin size={14} className="inline mr-1" />
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Where was this?"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={isSubmitting}
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar size={14} className="inline mr-1" />
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        max={new Date().toISOString().split('T')[0]}
                                        disabled={isSubmitting}
                                    />
                                    {errors.date && (
                                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                    )}
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
                                                disabled={isSubmitting}
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
                                    placeholder="Type and press Enter to add tags (max 10)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    disabled={isSubmitting || formData.tags.length >= 10}
                                />
                                {errors.tags && (
                                    <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                    {formData.tags.length}/10 tags
                                </p>
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
                                        onChange={(e) => handleTripChange(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Select a trip (optional)</option>
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
                                        disabled={isSubmitting}
                                    >
                                        <option value="private">Private</option>
                                        <option value="friends">Friends Only</option>
                                        <option value="public">Public</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                            <p className="text-red-600 text-sm">{errors.submit}</p>
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || cloudinaryUploading}
                            className="px-8 py-3 bg-linear-to-r from-blue-500 to-teal-500 text-white font-medium rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {(isSubmitting || cloudinaryUploading) ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {cloudinaryUploading ? 'Uploading...' : 'Saving Memory...'}
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