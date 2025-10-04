import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, } from 'lucide-react';


// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const DUMMY_REVIEWS = [
    { name: "Thomas Jordan", title: "Frequent Traveler", text: "We have always been careful about the quality of service, and Travigo doesn't disappoint.", avatar: "https://placehold.co/40x40/f44336/ffffff?text=TJ" },
    { name: "Nicole Welson", title: "Travel Writer", text: "The service and booking process were seamless. The recommendations were spot on!", avatar: "https://placehold.co/40x40/2196f3/ffffff?text=NW" },
    { name: "Jimmy Wilson", title: "Adventure Seeker", text: "Easy booking, great deals, and unforgettable experiences. Highly recommended!", avatar: "https://placehold.co/40x40/4caf50/ffffff?text=JW" },
  ];
  

const CustomerReviewSection = () => (
    <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.3 }}
        className="py-20 px-4"
    >
        <div className="max-w-6xl mx-auto">
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-2">
                What Our Customer Say?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 text-center mb-12">
                Some testimonials from those who go traveling using our services.
            </motion.p>
            
            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8">
                {DUMMY_REVIEWS.map((review, index) => (
                    <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative"
                    >
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mb-4" />
                        <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                        <div className="flex items-center space-x-4">
                            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-green-500" />
                            <div>
                                <p className="font-bold text-gray-900">{review.name}</p>
                                <p className="text-sm text-green-600">{review.title}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </motion.section>
);

export default CustomerReviewSection;