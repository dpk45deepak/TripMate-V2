import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { MapPin, Calendar, Trash2, Upload, Image, Plus, Loader, X, Heart, Camera, Sparkles } from 'lucide-react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    date: '',
    location: '',
    caption: '',
    photo: null,
  });

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const res = await api.get('/memories');
      setMemories(res.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
      setMemories([]);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setNewMemory({ ...newMemory, photo: acceptedFiles[0] });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMemory.photo || !newMemory.date || !newMemory.location) {
      alert('Please fill in all required fields and select a photo.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('photo', newMemory.photo);
    formData.append('date', newMemory.date);
    formData.append('location', newMemory.location);
    formData.append('caption', newMemory.caption);

    try {
      await api.post('/memories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewMemory({ date: '', location: '', caption: '', photo: null });
      setShowForm(false);
      fetchMemories();
    } catch (error) {
      console.error('Error uploading memory:', error);
      alert('Error uploading memory. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this memory?')) return;
    try {
      await api.delete(`/memories/${id}`);
      setMemories(memories.filter((m) => m._id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
      alert('Error deleting memory. Please try again.');
    }
  };

  const resetForm = () => {
    setNewMemory({ date: '', location: '', caption: '', photo: null });
    setShowForm(false);
  };

  const formatMemoryDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-8 lg:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 border border-primary-200/50 rounded-full px-4 py-2 mb-4">
            <Heart className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Cherish Your Adventures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Travel Memories
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Capture and relive your favorite travel moments in a beautiful timeline
          </p>
        </motion.div>

        {/* Add Memory Button - Mobile FAB */}
        <div className="lg:hidden fixed bottom-6 right-6 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Upload Form - Desktop Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block glass rounded-3xl p-6 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-xl shadow-lg">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">New Memory</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                    value={newMemory.date}
                    onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Paris, France"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
                      value={newMemory.location}
                      onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Caption
                  </label>
                  <textarea
                    placeholder="Share your memory..."
                    rows="3"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none outline-none"
                    value={newMemory.caption}
                    onChange={(e) => setNewMemory({ ...newMemory, caption: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo *
                  </label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${isDragActive
                      ? 'border-primary-400 bg-primary-50 scale-105'
                      : newMemory.photo
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/30'
                      }`}
                  >
                    <input {...getInputProps()} />
                    {newMemory.photo ? (
                      <div className="text-green-600">
                        <Image className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-medium text-sm truncate">{newMemory.photo.name}</p>
                        <p className="text-xs text-green-500 mt-1">Click to replace</p>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <Upload className="w-10 h-10 mx-auto mb-2" />
                        <p className="text-sm font-medium">Upload Photo</p>
                        <p className="text-xs mt-1">Drag & drop or click</p>
                        <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !newMemory.photo || !newMemory.date || !newMemory.location}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add Memory
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            {/* Mobile Form Modal */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:hidden"
                  onClick={() => setShowForm(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold gradient-text">Add New Memory</h2>
                        <button
                          onClick={() => setShowForm(false)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                          <input
                            type="date"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            value={newMemory.date}
                            onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                          <input
                            type="text"
                            placeholder="Location"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                            value={newMemory.location}
                            onChange={(e) => setNewMemory({ ...newMemory, location: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Caption</label>
                          <textarea
                            placeholder="Caption..."
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none outline-none"
                            value={newMemory.caption}
                            onChange={(e) => setNewMemory({ ...newMemory, caption: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Photo *</label>
                          <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer ${isDragActive ? 'border-primary-400 bg-primary-50' : 'border-gray-300'
                            }`}>
                            <input {...getInputProps()} />
                            {newMemory.photo ? (
                              <p className="text-green-600 font-medium text-sm truncate">{newMemory.photo.name}</p>
                            ) : (
                              <div className="text-gray-500">
                                <Upload className="w-8 h-8 mx-auto mb-1" />
                                <p className="text-sm">Tap to upload photo</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={uploading || !newMemory.photo || !newMemory.date || !newMemory.location}
                            className="flex-1 bg-gradient-to-r from-primary-600 to-indigo-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {uploading ? (
                              <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              'Add Memory'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timeline Content */}
            <div className="relative">
              {/* Timeline Line */}
              {memories.length > 0 && (
                <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-300 via-indigo-300 to-primary-300 rounded-full"></div>
              )}

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center py-20"
                  >
                    <div className="text-center">
                      <Loader className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Loading your memories...</p>
                    </div>
                  </motion.div>
                ) : memories.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 glass rounded-3xl shadow-xl border border-white/20"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Camera className="w-20 h-20 mx-auto text-primary-300 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No Memories Yet</h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Start capturing your travel adventures and create a beautiful timeline</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Create First Memory
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                  >
                    {memories.map((memory, index) => (
                      <motion.div
                        key={memory._id || index}
                        variants={staggerItem}
                        className="relative pl-10 lg:pl-16"
                      >
                        {/* Timeline Dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="absolute left-2.5 lg:left-4 top-8 bg-white border-4 border-primary-500 rounded-full w-5 h-5 lg:w-6 lg:h-6 z-10 shadow-lg"
                        ></motion.div>

                        <motion.div
                          whileHover={{ y: -4, scale: 1.01 }}
                          className="glass rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="relative group">
                            <img
                              src={memory.photo}
                              alt={memory.caption || 'Travel memory'}
                              className="w-full h-56 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <button
                              onClick={() => handleDelete(memory._id)}
                              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-red-500 p-3 rounded-full text-red-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="p-6 lg:p-8">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                              <div className="space-y-3">
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span className="font-medium">{formatMemoryDate(memory.date)}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                                  <span className="font-bold text-lg text-primary-600">{memory.location}</span>
                                </div>
                              </div>
                            </div>

                            {memory.caption && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed italic">
                                  "{memory.caption}"
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;