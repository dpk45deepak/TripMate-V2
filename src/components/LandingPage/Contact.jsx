import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section id="contact" className="relative bg-gradient-to-r from-teal-900 via-blue-900 to-indigo-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-6">
            Get in <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-200 mb-8">
            Have questions or ready to plan your dream trip? Reach out to us anytime.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="text-teal-400" />
              <span>support@gobeyond.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-400" />
              <span>+91 9643359747</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-400" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div>
            <label className="block text-sm mb-2">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Write your message"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-xl transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
