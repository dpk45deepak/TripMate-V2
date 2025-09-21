import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

const TripsCards = ({ trips }) => {
  return (
    <section id="trips" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Plan Your Journey in <span className="text-blue-600">Seconds</span>
          </h2>
          <p className="text-xl text-gray-600">
            Choose from our amazing collection of destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 group cursor-pointer"
            >
              <div className="overflow-hidden h-56">
                <motion.img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={trip.image}
                  alt={trip.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {trip.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {trip.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {trip.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {trip.people}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                  ₹ {trip.price}
                  </span>
                  <motion.a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Book Now
                    <ArrowRight size={16} className="ml-1" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripsCards;
