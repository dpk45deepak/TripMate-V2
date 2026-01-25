import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PricingSection = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
    className="py-20 px-4 bg-white rounded-xl"
  >
    <div className="max-w-6xl mx-auto text-center">
      {/* Section Title */}
      <h2 className="text-4xl sm:text-4xl font-extrabold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
        Choose The Plan That Suits You
      </h2>

      <p className="text-gray-600 mb-10">
        Many attractive offers by becoming a premium member.
      </p>

      {/* Toggle Switch */}
      <div className="flex justify-center mb-12">
        <div className="p-1 rounded-full bg-gray-100 flex space-x-2 font-semibold">
          <button className="py-2 px-6 rounded-full bg-blue-500 text-white shadow-md">
            Monthly
          </button>
          <button className="py-2 px-6 rounded-full text-gray-600 hover:bg-white transition-colors">
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Free",
            price: "0",
            features: [
              "Limited destinations",
              "Basic support",
              "Standard map views",
            ],
            recommended: false,
          },
          {
            title: "Premium",
            price: "5",
            features: [
              "Unlimited destinations",
              "24/7 Priority support",
              "3D Map Views",
              "Exclusive discounts",
            ],
            recommended: true,
          },
          {
            title: "Enterprise",
            price: "10",
            features: [
              "All Premium features",
              "Dedicated Account Manager",
              "Custom Reporting",
              "Team collaboration",
            ],
            recommended: false,
          },
        ].map((plan, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: index * 0.1,
            }}
            className={`p-8 rounded-3xl shadow-xl transition-all duration-300 ${
              plan.recommended
                ? "bg-white border-4 border-blue-500 shadow-blue-200"
                : "bg-white border border-gray-200"
            }`}
          >
            {plan.recommended && (
              <div className="text-sm text-center font-bold text-blue-700 bg-blue-100 py-1 rounded-full mb-4">
                Recommended
              </div>
            )}

            {/* Title with Gradient */}
            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
              {plan.title}
            </h3>

            <p className="text-gray-500 mb-6">Best for solo travelers.</p>

            {/* Price with Gradient */}
            <div className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-8">
              <span className="text-2xl align-top">$</span>
              {plan.price}
              <span className="text-lg font-medium text-gray-500">/mo</span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-3 mt-1 shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`w-full py-3 rounded-xl font-bold transition-colors ${
                plan.recommended
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default PricingSection;
