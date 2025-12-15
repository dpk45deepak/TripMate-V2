import { Link } from 'react-router-dom';
import { Camera, Map, Briefcase, Shield, Sparkles, ArrowRight, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, floatingAnimation } from '../../utils/animations';

const Main = () => {
    const features = [
        {
            id: 1,
            path: '/memories',
            title: 'Travel Memories',
            description: 'Create and relive beautiful timelines of your trips',
            icon: Camera,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            id: 2,
            path: '/itinerary',
            title: 'Smart Itinerary',
            description: 'Generate optimized daily plans automatically',
            icon: Map,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            id: 3,
            path: '/packing',
            title: 'Packing Assistant',
            description: 'Smart checklist based on weather and destination',
            icon: Briefcase,
            gradient: 'from-accent-500 to-teal-500',
            bgGradient: 'from-accent-50 to-teal-50',
            iconBg: 'bg-accent-100',
            iconColor: 'text-accent-600',
        },
    ];

    return (
        <div className="min-h-screen pb-12 bg-gradient-to-br from-blue-100 via-white to-indigo-200 rounded-xl
">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden py-12 lg:py-20"
            >
                {/* Floating background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ y: [-20, 20, -20] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-indigo-200/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ y: [20, -20, 20] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-accent-200/30 to-teal-200/30 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-indigo-500/10 border border-primary-200/50 rounded-full px-4 py-2 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-primary-600" />
                            <span className="text-sm font-medium text-primary-700">Your AI-Powered Travel Companion</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            {...fadeInUp}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        >
                            Welcome to{' '}
                            <span className="gradient-text inline-block">
                                TripMate
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeInUp}
                            transition={{ delay: 0.4 }}
                            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
                        >
                            Your All-in-One Travel Companion for <span className="font-semibold text-primary-600">Memorable Adventures</span>
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/itinerary">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>

                            <Link to="/safety">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:border-primary-300 transition-all duration-300"
                                >
                                    <Globe2 className="w-5 h-5" />
                                    <span>Explore Safety</span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Features Grid */}
            <motion.section
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-100px' }}
                className="container mx-auto px-4"
            >
                <motion.div variants={staggerItem} className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
                        Everything You Need for Your Trip
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Powerful tools to plan, organize, and enjoy your travels
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
                                variants={staggerItem}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                <Link to={feature.path} className="block h-full">
                                    <div className={`h-full p-6 bg-gradient-to-br ${feature.bgGradient} rounded-3xl border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                                        {/* Gradient overlay on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`relative z-10 w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                                        >
                                            <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                                        </motion.div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <h3 className={`text-xl font-bold mb-2 text-gray-800 group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>

                                        {/* Arrow indicator */}
                                        <motion.div
                                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ x: -10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <ArrowRight className={`w-5 h-5 ${feature.iconColor}`} />
                                        </motion.div>

                                        {/* Decorative elements */}
                                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-full blur-2xl`} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 mt-20"
            >
                <div className="glass rounded-3xl p-8 lg:p-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: 'Happy Travelers', value: '10K+', icon: '✈️' },
                            { label: 'Destinations', value: '150+', icon: '🌍' },
                            { label: 'Itineraries Created', value: '25K+', icon: '📍' },
                            { label: 'Success Rate', value: '99%', icon: '⭐' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Final CTA */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 mt-20 text-center"
            >
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-3xl p-12 lg:p-16 shadow-2xl">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="relative z-10">
                        <motion.div {...floatingAnimation}>
                            <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
                        </motion.div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to plan your next adventure?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of travelers who trust TripMate for their journeys
                        </p>
                        <Link to="/itinerary-plan">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <span>Start Planning Now</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Main;