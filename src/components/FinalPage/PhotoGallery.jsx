import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = ({ initialPhotos, query }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [fetchedPhotos, setFetchedPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    // API Key and URL
    const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
    const fetchUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&category=places&pretty=true&per_page=20`;

    // generates the title for an image based on the tags
    function generateImageTitle(tags) {
        if (!tags) return "Beautiful Image";

        const stopWords = [
            "beautiful",
            "background",
            "wallpaper",
            "nature",
            "photo",
            "photography",
            "image",
            "flora",
            "botany"
        ];

        const cleaned = tags
            .split(",")
            .map(t => t.trim())
            .filter(t => !stopWords.some(sw => t.toLowerCase().includes(sw)));

        const selected = cleaned.slice(0, 3);

        return selected
            .map(word =>
                word
                    .split(" ")
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")
            )
            .join(" ");
    }



    // Fetch images from API
    useEffect(() => {
        const fetchImages = async () => {
            if (!fetchUrl) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Assuming the API returns an array of image objects
                // Adjust this based on the actual API response structure
                const images = Array.isArray(data.hits) ? data.hits : data.photos || data.images || data.results || [];

                // Format the images to match our structure
                const formattedImages = images.map((img, index) => ({
                    url: img.webformatURL || img.url || img.download_url || img.src || img.image_url || `https://picsum.photos/400/300?random=${index}`,
                    title: generateImageTitle(img.tags),
                    description: img.tags || 'Beautiful scenery'
                }));

                setFetchedPhotos(formattedImages);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError('Failed to load images. Please try again.');

                // Fallback to sample images if fetch fails
                const fallbackImages = Array.from({ length: 20 }, (_, i) => ({
                    url: `https://images.unsplash.com/photo-${150000 + i}?auto=format&fit=crop&w=400&h=300&q=80`,
                    title: `Sample Image ${i + 1}`,
                    description: 'Beautiful scenery from Unsplash'
                }));
                setFetchedPhotos(fallbackImages);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, [fetchUrl]);

    // Combine initial photos with fetched photos
    useEffect(() => {
        const allPhotos = Array.isArray(initialPhotos) ? [...initialPhotos] : initialPhotos;

        // Add fetched photos if we have them
        if (fetchedPhotos.length > 0) {
            // Avoid duplicates by checking URLs
            fetchedPhotos.forEach(fetchedPhoto => {
                if (!allPhotos.some(photo => photo.url === fetchedPhoto.url)) {
                    allPhotos.push(fetchedPhoto);
                }
            });
        }

        setPhotos(allPhotos);
    }, [initialPhotos, fetchedPhotos]);

    // Calculate pagination
    const totalPages = Math.ceil(photos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPhotos = photos.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of gallery
        document.getElementById('photo-gallery').scrollIntoView({ behavior: 'smooth' });
    };

    // Handle next/previous photo in modal
    const handleNextPhoto = () => {
        const currentIndex = photos.findIndex(photo => photo.url === selectedPhoto.url);
        const nextIndex = (currentIndex + 1) % photos.length;
        setSelectedPhoto(photos[nextIndex]);
    };

    const handlePrevPhoto = () => {
        const currentIndex = photos.findIndex(photo => photo.url === selectedPhoto.url);
        const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
        setSelectedPhoto(photos[prevIndex]);
    };

    return (
        <div id="photo-gallery" className="min-h-screen bg-linear-to-br from-blue-50 to-teal-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Photo Gallery</h1>
                    <p className="text-lg text-gray-600">A collection of beautiful images</p>
                    <div className="w-24 h-1.5 bg-linear-to-r from-teal-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
                </motion.div>

                {/* Stats and Filters */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                            <p className="text-gray-600 mt-1">{photos.length} photos available</p>
                        </div>

                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                                <span className="text-sm text-gray-700">Local Photos</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-700">Fetched Photos</span>
                            </div>
                        </div>
                    </div>

                    {/* Loading and Error States */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
                        >
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-3"></div>
                                <span className="text-blue-700">Loading images from API...</span>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-700">{error}</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Photo Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <AnimatePresence>
                            {currentPhotos.map((photo, index) => {
                                // Determine if it's a local or fetched photo for styling
                                const isLocalPhoto = initialPhotos.some(p => p.url === photo.url);

                                return (
                                    <motion.div
                                        key={photo.url}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                                        }}
                                        onClick={() => setSelectedPhoto(photo)}
                                        className={`relative rounded-2xl overflow-hidden cursor-pointer aspect-square group ${isLocalPhoto ? 'ring-2 ring-teal-400' : 'ring-2 ring-blue-400'
                                            }`}
                                    >
                                        <img
                                            src={photo.url}
                                            alt={photo.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />

                                        {/* Photo indicator */}
                                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${isLocalPhoto ? 'bg-teal-500' : 'bg-blue-500'}`}></div>

                                        {/* Overlay with title */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-bold text-lg truncate">{photo.title}</h3>
                                            <p className="text-white/80 text-sm truncate">{photo.description}</p>
                                        </div>

                                        {/* Quick view indicator */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Empty state */}
                    {photos.length === 0 && !isLoading && (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos available</h3>
                            <p className="text-gray-500">Add some photos or check your connection to load images.</p>
                        </div>
                    )}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-8 text-center"
                    >
                        <div className="md:flex items-center justify-between">
                            <div className="text-gray-600 m-2">
                                Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(endIndex, photos.length)}</span> of <span className="font-bold">{photos.length}</span> photos
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                >
                                    Previous
                                </button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === pageNum
                                                        ? 'bg-linear-to-r from-teal-500 to-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <>
                                            <span className="px-2 text-gray-400">...</span>
                                            <button
                                                onClick={() => handlePageChange(totalPages)}
                                                className={`w-10 h-10 rounded-lg font-medium transition ${currentPage === totalPages
                                                        ? 'bg-linear-to-r from-teal-500 to-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Photo Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden">
                                <img
                                    src={selectedPhoto.url}
                                    alt={selectedPhoto.title}
                                    className="w-full h-auto max-h-[70vh] object-contain bg-gray-900"
                                />

                                {/* Navigation Buttons */}
                                <button
                                    onClick={handlePrevPhoto}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={handleNextPhoto}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Photo Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                                    <h4 className="text-white font-bold text-2xl mb-2">{selectedPhoto.title}</h4>
                                    <p className="text-white/80">{selectedPhoto.description}</p>

                                    {/* Photo indicator in modal */}
                                    <div className="mt-4 flex items-center">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${initialPhotos.some(p => p.url === selectedPhoto.url) ? 'bg-teal-500' : 'bg-blue-500'
                                            }`}></div>
                                        <span className="text-white/60 text-sm">
                                            {initialPhotos.some(p => p.url === selectedPhoto.url) ? 'Local Photo' : 'Fetched Photo'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
                                {photos.map((photo) => (
                                    <div
                                        key={photo.url}
                                        onClick={() => setSelectedPhoto(photo)}
                                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedPhoto.url === photo.url
                                                ? 'ring-4 ring-teal-400 transform scale-105'
                                                : 'opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={photo.url}
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGallery;