import { motion } from "framer-motion";

const BestDeals = ({ deals, setActiveDeal }) => {
  return (
    <section id="deals" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Best Deals of <span className="text-blue-600">2025</span> - Limited Time Offers!
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${deal.gradient} text-white p-8 rounded-3xl text-center transform transition-all duration-300 cursor-pointer relative overflow-hidden group h-96 flex flex-col justify-between`}
              whileHover={{ y: -5 }}
              onHoverStart={() => setActiveDeal(index)}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 transform -rotate-45 scale-150 group-hover:rotate-45 transition-transform duration-1000"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">{deal.title}</h3>
                <div className="space-y-3 mb-8">
                  {deal.features.map((feature, fIndex) => (
                    <p key={fIndex} className="text-lg">
                      {feature}
                    </p>
                  ))}
                </div>
              </div>

              <motion.button
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 relative z-10 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {deal.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
