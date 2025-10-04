import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Icons (using lucide-react equivalents)
import { MapPin, Search } from 'lucide-react';


const WorldMapSection = () => (
    <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gray-100 rounded-xl"
    >
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                Explore The Beauty Of The World
            </h2>
            <p className="text-gray-600 mb-10">Choose the destination you want to discover.</p>
            
            <div className="relative p-4 rounded-3xl bg-gray-50 shadow-2xl">
                {/* World Map Placeholder (Using a simple image/SVG idea) */}
                <div className="relative w-full h-80 flex items-center justify-center bg-cover bg-center rounded-2xl overflow-hidden" 
                     style={{ backgroundImage: "url('https://www.shutterstock.com/image-photo/aerial-view-paris-eiffel-tower-260nw-1298528866.jpg')" }}>
                    
                    {/* Placeholder destination pins */}
                    <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                        <MapPin className="w-12 h-12 text-red-500 fill-red-500" />
                        <span className="text-lg text-white mt-1">Asia</span>
                    </div>
                    <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                        <MapPin className="w-12 h-12 text-blue-500 fill-blue-500" />
                        <span className="text-lg text-white font-semibold mt-1">Europe</span>
                    </div>
                    <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
                        <MapPin className="w-12 h-12 text-green-500 fill-green-500" />
                        <span className="text-lg text-white font-semibold mt-1">America</span>
                    </div>

                    {/* Card overlays on map */}
                    <div className="absolute top-1/3 left-1/2 transform -translate-x-full -translate-y-1/2 bg-white p-2 rounded-xl shadow-lg w-28 text-sm">
                        <img src="https://t4.ftcdn.net/jpg/02/14/74/11/360_F_214741146_jApjeGkU3GSPSpLhzyMsupP7frpAh1XH.jpg" className="rounded-lg mb-1" alt="Trip" />
                        Trip to Paris
                    </div>
                </div>

                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-xl">
                    <Search className="w-6 h-6 text-green-600" />
                </div>
            </div>
        </div>
    </motion.section>
);

export default WorldMapSection;