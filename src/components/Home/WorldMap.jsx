import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';

const WorldMapSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-xl"
  >
    <div className="max-w-6xl mx-auto text-center">
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3">
        Explore The Beauty Of The World
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-10">
        Choose the destination you want to discover.
      </p>

      {/* Map Container */}
      <div className="relative p-3 sm:p-4 rounded-3xl bg-gray-50 shadow-2xl">
        <div
          className="relative w-full h-64 sm:h-80 md:h-[28rem] flex items-center justify-center bg-cover bg-center rounded-2xl overflow-hidden"
          style={{
            backgroundImage:
              "url('https://www.shutterstock.com/image-photo/aerial-view-paris-eiffel-tower-260nw-1298528866.jpg')",
          }}
        >
          {/* Map Pins */}
          <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500 fill-red-500" />
            <span className="text-xs sm:text-sm md:text-base text-white mt-1">Asia</span>
          </div>

          <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 fill-blue-500" />
            <span className="text-xs sm:text-sm md:text-base text-white font-semibold mt-1">
              Europe
            </span>
          </div>

          <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 fill-green-500" />
            <span className="text-xs sm:text-sm md:text-base text-white font-semibold mt-1">
              America
            </span>
          </div>

          {/* Trip Card Overlay */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-full -translate-y-1/2 bg-white p-2 sm:p-3 rounded-xl shadow-lg w-24 sm:w-28 md:w-36 text-xs sm:text-sm">
            <img
              src="https://t4.ftcdn.net/jpg/02/14/74/11/360_F_214741146_jApjeGkU3GSPSpLhzyMsupP7frpAh1XH.jpg"
              className="rounded-lg mb-1"
              alt="Trip"
            />
            Trip to Paris
          </div>
        </div>

        {/* Floating Search Button */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-xl">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
        </div>
      </div>
    </div>
  </motion.section>
);

export default WorldMapSection;
