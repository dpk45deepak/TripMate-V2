import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Target, Shield, DollarSign, Heart, Star, 
  MapPin, Search, Globe, Calendar, Users, ChevronLeft, ChevronRight 
} from "lucide-react";

import Header from "../components/LandingPage/Header";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import TypingText from "../components/TypingText";

// Animated section component with enhanced options
const AnimatedSection = ({ 
  children, 
  direction = "up", 
  duration = 0.8, 
  delay = 0.2,
  className = "",
  amount = 0.3
}) => {
    const variants = {
        hidden: { 
            opacity: 0, 
            y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
            x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0,
            scale: 1,
            transition: { 
              duration, 
              delay, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1
            } 
        }
    };
    
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Enhanced Testimonials section with carousel
const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      location: "New York, USA",
      quote: "An unforgettable trip to the Swiss Alps! Every detail was perfectly organized. I can't wait for my next adventure with them.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Maria Garcia",
      location: "Madrid, Spain",
      quote: "The cultural tour of Japan was a dream come true. The guides were so knowledgeable and friendly. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
    },
    {
      name: "David Smith",
      location: "London, UK",
      quote: "I never thought a guided tour could be this much fun. The Amazon rainforest expedition was both thrilling and educational.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Sarah Chen",
      location: "Singapore",
      quote: "The Bali retreat exceeded all my expectations. Perfect balance of adventure and relaxation. Will definitely book again!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from adventurous souls who have explored the world with us
          </p>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-md">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-3">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current w-5 h-5" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-lg italic mb-6">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1">
                      <MapPin size={16} />
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Features section
const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Handpicked Experiences",
      description: "Carefully curated destinations and activities selected by travel experts with decades of experience."
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Book with confidence using our secure platform and verified partners with 24/7 customer support."
    },
    {
      icon: DollarSign,
      title: "Best Value Guarantee",
      description: "Get the most value for your money with our competitive pricing and no hidden fees policy."
    },
    {
      icon: Heart,
      title: "Loved by Travelers",
      description: "Join thousands of satisfied travelers who trust our services with a 98% customer satisfaction rate."
    },
    {
      icon: Globe,
      title: "Global Destinations",
      description: "Access to unique locations across all 7 continents with local guides and authentic experiences."
    },
    {
      icon: Users,
      title: "Group & Solo Options",
      description: "Flexible travel options for solo adventurers, couples, families, and private groups."
    }
  ];

  return (
    <section className="py-20 md:px-60 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making your travel experiences unforgettable, with attention to every detail
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <AnimatedSection 
              key={index} 
              direction="up" 
              delay={index * 0.1}
              className="group"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-transparent group-hover:border-purple-100"
              >
                <div className="bg-purple-100 inline-flex p-3 rounded-lg mb-4 group-hover:bg-purple-200 transition-colors">
                  <feature.icon className="text-purple-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};


// Main Landing Page
const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800 font-sans overflow-hidden">
      <Header />
      <main>
        <HeroSection />        
        <FeaturesSection />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;