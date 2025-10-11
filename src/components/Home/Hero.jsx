import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from './Navbar';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  Heart,
  Play,
  Pause,
  Plane,
  Menu,
  X
} from "lucide-react";

// Sample destinations data
const destinations = [
  {
    id: 1,
    title: "Tropical Beach",
    image: "https://img.freepik.com/free-photo/nature-landscape-with-starry-clear-sky_23-2151683193.jpg?semt=ais_hybrid&w=740&q=80",
    background: "https://img.freepik.com/free-photo/nature-landscape-with-starry-clear-sky_23-2151683193.jpg?semt=ais_hybrid&w=740&q=80",
    description: "Beautiful sandy beaches with crystal clear waters",
    location: "Maldives",
    rating: 4.8,
    price: "$1,200",
    duration: "7 days",
    travelers: "2-4 people",
    featured: true
  },
  {
    id: 2,
    title: "Mountain Resort",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUecRLy8zm4mJZQ0pW2rksj_h6uVizn-lYA9WoJBOldiEyjCP4N9SlYXHMWHOhb4G7B64&usqp=CAU",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxWaRnRbtw3BReZuu0R2uhfIR-SI7lV0im58xogHk8VWQxdvwIph9P2acOhrxDQukyFps&usqp=CAU",
    description: "Majestic mountains with breathtaking views",
    location: "Swiss Alps",
    rating: 4.9,
    price: "$980",
    duration: "5 days",
    travelers: "1-6 people",
    featured: false
  },
  {
    id: 3,
    title: "Food Tour",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiDwdchisfpkpgbGcWmffHvLY1TclrWvHrjA&s",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiDwdchisfpkpgbGcWmffHvLY1TclrWvHrjA&s",
    description: "Culinary adventures through local cuisine",
    location: "Italy",
    rating: 4.7,
    price: "$750",
    duration: "4 days",
    travelers: "2-8 people",
    featured: true
  },
  {
    id: 4,
    title: "City Break",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgh3IMJ4X_Ns5N8lwlH2D9RmXYhM3jdApSPpZZaq-_FYG0BHvQvwp0VJp9UDtj7eboLU&usqp=CAU",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgh3IMJ4X_Ns5N8lwlH2D9RmXYhM3jdApSPpZZaq-_FYG0BHvQvwp0VJp9UDtj7eboLU&usqp=CAU",
    description: "Urban exploration in vibrant cities",
    location: "Melbourne",
    rating: 4.6,
    price: "$890",
    duration: "6 days",
    travelers: "1-2 people",
    featured: false
  }
];

export default function TravelUI() {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentBackground, setCurrentBackground] = useState(destinations[0].background);
  const [nextBackground, setNextBackground] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bookingData, setBookingData] = useState({ dates: "", travelers: 1, name: "", email: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || (activeFilter === "featured" && dest.featured);
    return matchesSearch && matchesFilter;
  });

  const changeBackground = (newBackground) => {
    if (newBackground === currentBackground) return;
    setIsTransitioning(true);
    setNextBackground(newBackground);
    setTimeout(() => {
      setCurrentBackground(newBackground);
      setNextBackground("");
      setIsTransitioning(false);
    }, 800);
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isAutoPlaying && filteredDestinations.length > 0) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = currentIndex === filteredDestinations.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        changeBackground(filteredDestinations[nextIndex].background);
      }, 4000);
    }
  };

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, currentIndex, filteredDestinations.length]);

  const nextSlide = () => {
    const nextIndex = currentIndex === filteredDestinations.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    changeBackground(filteredDestinations[nextIndex].background);
    resetAutoPlay();
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? filteredDestinations.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    changeBackground(filteredDestinations[prevIndex].background);
    resetAutoPlay();
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    resetAutoPlay();
  };

  const scrollToCard = (index) => {
    setCurrentIndex(index);
    changeBackground(filteredDestinations[index].background);
    resetAutoPlay();
    if (carouselRef.current) {
      carouselRef.current.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const viewDestinationDetails = (destination) => {
    setSelectedDestination(destination);
    setIsAutoPlaying(false);
  };

  const closeDetails = () => {
    setSelectedDestination(null);
    setIsAutoPlaying(true);
  };

  const handleBookingChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookNow = () => {
    alert(`Booking confirmed for ${selectedDestination.title}! We'll contact you at ${bookingData.email}.`);
    setSelectedDestination(null);
    setBookingData({ dates: "", travelers: 1, name: "", email: "" });
  };

  // Touch swipe for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };

  const cardVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center md:pt-10 justify-start bg-cover bg-center overflow-x-hidden pb-20"
      style={{ backgroundImage: `url(${currentBackground})` }}
    >
      {nextBackground && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${nextBackground})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
      <motion.div className="absolute inset-0 bg-black/40 z-10" />

      {/* Navbar */}
      <div>
        <Navbar isMobile={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Carousel & Hero */}
      <div className="relative z-20 mt-20 w-full max-w-[1200px] px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center">

          {/* Left Hero */}
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {filteredDestinations[currentIndex]?.title || "The New"} <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {filteredDestinations[currentIndex]?.location || "Horizon"}
              </span>
            </h1>
            <p className="mt-2 text-gray-200 text-sm sm:text-base">
              {filteredDestinations[currentIndex]?.description}
            </p>
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg shadow" onClick={() => viewDestinationDetails(filteredDestinations[currentIndex])}>
                <MapPin size={18} /> Book Trip
              </button>
              <button className="px-4 py-2 border border-white rounded-lg hover:bg-white/10">Learn More</button>
            </div>
          </div>

          {/* Right Carousel */}
          <div
            className="flex overflow-x-auto gap-4 py-2 md:px-10 scrollbar-hide snap-x snap-mandatory"
            ref={carouselRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {filteredDestinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                className={`min-w-[240px] sm:min-w-[260px] bg-white/10 backdrop-blur-sm rounded-xl p-3 cursor-pointer snap-start ${idx === currentIndex ? 'scale-105 ring-2 ring-cyan-400' : 'scale-100'}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => scrollToCard(idx)}
              >
                <img src={dest.image} className="w-full h-36 sm:h-40 object-cover rounded-lg" />
                <div className="mt-2 flex justify-between items-center text-xs text-gray-300">
                  <span>{dest.title}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400" />
                    {dest.rating}
                  </div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-300">
                  <span>{dest.duration}</span>
                  <span>{dest.travelers}</span>
                </div>
              </motion.div>
            ))}
            </div>
            </div>
            {/* Bottom CTA */}
            <motion.div
                    className="mt-4 sm:mt-12 pt-4 sm:pt-2 md:pt-14 border-t border-white/20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">Ready to start your journey?</p>
                    <motion.button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto transition-all text-sm sm:text-base"
                        onClick={() => navigate('/final')}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(6, 182, 212, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Plane size={18} />
                        Book Your Adventure Today
                    </motion.button>
          </motion.div>
      </div>
    </motion.div>
  );
}
