import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons from Lucide React
// We assume lucide-react is available in the environment.
const Menu = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>;
const ArrowLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Search = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const Sun = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const Calendar = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>;
const MapPin = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Star = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const Check = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const DollarSign = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1h12"/><path d="M12 23h12"/><path d="M12 5v14"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>;
const ArrowRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;

// Mock data for destinations
const destinations = [
  {
    id: 1,
    country: 'NORWAY',
    flag: '🇳🇴',
    title: 'The Nature Out of Power',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvWxxzhBPGPHLBvVMXWKRgZ5Rte-m065M1w&s',
    details: {
      location: 'Sogn og Fjordane',
      altitude: '1,500m',
      rating: 4.8,
      reviews: 1200,
      price: 349,
      description: 'Experience the raw, untamed beauty of Norway\'s western fjords. Kayak through glassy waters, hike majestic trails, and witness the Northern Lights.',
      amenities: ['Private Cabins', 'Guided Hikes', 'Sauna Access', 'Fjord Cruise'],
      hotel: 'Fjord View Retreat',
      duration: '7 days',
      distance: '25 km',
      dates: 'May 10 - May 17',
      people: 12
    }
  },
  {
    id: 2,
    country: 'AUSTRIA',
    flag: '🇦🇹',
    title: 'Tyrolean Alps Discovery',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxzkBw4NCWc1_W-BW1XuIinjulN965Pmep_A&s',
    details: {
      location: 'Tyrol Region',
      altitude: '2,565m',
      rating: 4.9,
      reviews: 910,
      price: 488,
      description: 'Discover the magic of the Austrian Mountains. Perfect for summer hiking and winter skiing, the Alps offer breathtaking views and charming village stays.',
      amenities: ['Mountain Lodge', 'Ski Pass Included', 'Thermal Spa', 'Local Cuisine Workshop'],
      hotel: 'Hotel Royal',
      duration: '5 days',
      distance: '10 km',
      dates: 'Jun 20 - Jun 25',
      people: 18
    }
  },
  {
    id: 3,
    country: 'BELGIUM',
    flag: '🇧🇪',
    title: 'Peaceful Nature Retreat',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3WJhjvsjnANzG7-iAoMWBOq8mxmZnBRCeg&s',
    details: {
      location: 'Ardennes Forest',
      altitude: '300m',
      rating: 4.5,
      reviews: 550,
      price: 210,
      description: 'A tranquil getaway in the heart of the Ardennes. Enjoy cycling, nature photography, and local breweries.',
      amenities: ['Bike Rental', 'Gourmet Meals', 'Stargazing Tour', 'River Kayaking'],
      hotel: 'Ardennes Lodge',
      duration: '4 days',
      distance: '8 km',
      dates: 'Apr 22 - Apr 26',
      people: 8
    }
  },
];

// --- Sub-Components ---

// Card for the list view
const DestinationCard = ({ destination, onSelect, large = false }) => {
  const { flag, country, title, image, details } = destination;
  
  const content = large ? (
    // Large, main card style (like the original first screen's featured card)
    <div className="flex flex-col h-full">
      <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg">
        <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3WJhjvsjnANzG7-iAoMWBOq8mxmZnBRCeg&s'; }} />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <p className="text-sm font-semibold text-indigo-500 mb-1">{flag} {country}</p>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{title}</h2>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex text-sm space-x-4 text-gray-600">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-teal-500" /> {details.dates}</div>
          </div>
          <motion.div
            className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </div>
  ) : (
    // Smaller, horizontal card style (like the original bottom cards)
    <div className="flex-shrink-0 w-64 md:w-80 h-32 bg-white rounded-xl shadow-md overflow-hidden flex cursor-pointer">
      <div className="w-1/3 h-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3WJhjvsjnANzG7-iAoMWBOq8mxmZnBRCeg&s'; }} />
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div className='flex items-center justify-between'>
            <p className="text-xs font-semibold text-indigo-500">{flag} {country}</p>
            <Star className='w-4 h-4 text-yellow-400 fill-yellow-400'/>
        </div>
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 mr-1 text-teal-400" /> {details.dates.split(' - ')[0]}...
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      className={large ? "col-span-1" : ""}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(destination)}
    >
      {content}
    </motion.div>
  );
};


// Main view for displaying the list of destinations
const ListView = ({ onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto"
        >
            {/* Header and Weather */}
            <div className="flex justify-between items-center text-gray-900">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-light">Hello, <span className="font-bold text-indigo-600">Traveler!</span> 👋</h1>
                </div>
                <div className="flex items-center p-2 rounded-xl bg-white shadow-md text-teal-600 font-semibold">
                    <Sun className="w-5 h-5 mr-1" />
                    <span className="text-sm">Weather: 19°C</span>
                </div>
            </div>

            {/* Featured Destination Title (similar to original) */}
            <div className="space-y-1">
                <p className="text-lg font-light text-gray-500">Must-See Adventure</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-indigo-900">Global Destinations</h2>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search destinations, tours..."
                    className="w-full p-4 pl-12 bg-white border border-indigo-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Large Featured Card (First item in data) */}
                <div className="lg:col-span-2">
                    <DestinationCard destination={destinations[0]} onSelect={onSelect} large />
                </div>
                
                {/* Sidebar/Extra Content (Placeholder for original's second card) */}
                <motion.div
                    className="bg-indigo-700 p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center lg:col-span-1 min-h-[200px]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                    <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 mb-3" />
                    <h3 className="text-xl font-bold text-white">Your Next Adventure Awaits</h3>
                    <p className="text-indigo-200 text-sm">Explore curated trips hand-picked by our experts.</p>
                </motion.div>
            </div>
            
            {/* Horizontal Scroll Cards (Mocking the bottom section) */}
            <h3 className="text-2xl font-bold text-indigo-900 pt-4">Other Popular Trips</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                <DestinationCard destination={destinations[1]} onSelect={onSelect} />
                <DestinationCard destination={destinations[2]} onSelect={onSelect} />
                <DestinationCard destination={destinations[0]} onSelect={onSelect} />
                <DestinationCard destination={destinations[1]} onSelect={onSelect} />
            </div>

        </motion.div>
    );
};


// Detailed view for a single, selected destination
const DetailView = ({ destination, onBack }) => {
    if (!destination) return null;
    const d = destination.details;

    const IconText = ({ icon: Icon, text }) => (
        <div className="flex items-center text-gray-600 text-sm font-medium">
            <Icon className="w-4 h-4 mr-1 text-teal-500" />
            <span>{text}</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto pb-10"
        >
            {/* Hero Image Section (Responsive) */}
            <div className="relative h-[300px] md:h-[450px] overflow-hidden rounded-b-3xl shadow-2xl">
                <img 
                    src={destination.image} 
                    alt={destination.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/185764/ffffff?text=Image+Unavailable'; }}
                />
                
                {/* Overlay Header and Back Button */}
                <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center">
                    <motion.button
                        onClick={onBack}
                        className="p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg text-indigo-600 hover:bg-white transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </motion.button>
                    <div className="flex items-center p-2 rounded-xl bg-white/70 backdrop-blur-sm shadow-lg text-teal-600 font-semibold">
                        <Sun className="w-5 h-5 mr-1" />
                        <span className="text-sm">Weather: 19°C</span>
                    </div>
                </div>

                {/* Bottom Overlay Info Card */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white/80 backdrop-blur-md rounded-t-3xl shadow-xl border-t border-indigo-100"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-lg font-semibold text-gray-500">{destination.flag} {destination.country}</p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900 leading-tight mt-1">
                                {destination.title}
                            </h1>
                        </div>
                        <motion.div 
                            className="p-2 bg-yellow-400 rounded-full shadow-md cursor-pointer"
                            whileHover={{ rotate: 15 }}
                            whileTap={{ scale: 0.8 }}
                        >
                            <Star className="w-6 h-6 text-white fill-white" />
                        </motion.div>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="flex space-x-6 mt-4 pt-3 border-t border-indigo-100">
                        <IconText icon={Calendar} text={d.dates} />
                        <IconText icon={MapPin} text={`${d.distance} away`} />
                        <IconText icon={Star} text={`${d.rating} (${d.reviews} reviews)`} />
                    </div>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8">
                
                {/* Left Column: Description and Amenities */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4">The Journey</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {d.description} Located at an altitude of <span className="font-semibold text-teal-600">{d.altitude}</span>, this destination is a haven for those seeking both adventure and tranquility. The journey spans <span className="font-semibold text-teal-600">{d.duration}</span> and has a current group size of {d.people} people.
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4">What's Included</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {d.amenities.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex items-center p-3 bg-indigo-50 rounded-lg shadow-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Check className="w-5 h-5 text-teal-600 mr-3" />
                                    <span className="text-gray-800 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Hotel and Booking Widget */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Hotel Card */}
                    <motion.div 
                        className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-indigo-800 mb-4">Accommodation</h3>
                        <div className="flex items-center space-x-4">
                            <img 
                                src="https://placehold.co/80x80/295fa3/ffffff?text=Hotel" 
                                alt="Hotel Royal" 
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">{d.hotel}</h4>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                                    {d.rating} ({d.reviews} reviews)
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-2xl font-extrabold text-teal-600 flex items-end">
                                <DollarSign className="w-6 h-6 mr-1" />{d.price} <span className="text-base font-medium text-gray-500">/ night</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                        className="w-full py-4 bg-teal-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-300/50 flex items-center justify-center transition-colors hover:bg-teal-600"
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(52, 211, 163, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Book Your Trip Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>

                    <p className="text-xs text-center text-gray-400">Secure payment via Google Pay, Apple Pay, and major cards.</p>
                </div>
            </div>
        </motion.div>
    );
};


// Main App component
const App = () => {
    const [selectedDestination, setSelectedDestination] = useState(null);

    const handleSelect = (destination) => {
        setSelectedDestination(destination);
        // Optional: Scroll to top on selection for better mobile experience
        window.scrollTo(0, 0); 
    };

    const handleBack = () => {
        setSelectedDestination(null);
        // Optional: Scroll to top on back
        window.scrollTo(0, 0); 
    };

    return (
        // Main container with light background color
        <div className="min-h-screen bg-indigo-50 font-sans antialiased p-4">

            {/* View Switching Logic using AnimatePresence */}
            <AnimatePresence mode="wait">
                {selectedDestination ? (
                    <DetailView key="detail" destination={selectedDestination} onBack={handleBack} />
                ) : (
                    <ListView key="list" onSelect={handleSelect} />
                )}
            </AnimatePresence>

            {/* Tailwind utility class for hiding scrollbar on the horizontal scroll container */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default App;
