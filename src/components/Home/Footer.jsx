import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const socialIcons = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              TripMate
            </h3>
            <p className="mb-6 text-gray-400 text-sm leading-relaxed">
              Making your travel dreams come true with memorable experiences
              around the globe.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map(({ icon: Icon, href, label, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  aria-label={label}
                  className={`p-2 rounded-full bg-gray-800/70 text-gray-300 transition-colors duration-300 ${color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-between items-start gap-60 px-10 text-gray-300">
            {/* Destinations */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Destinations
              </h4>
              <ul className="space-y-2 text-sm">
                {["Beach", "Mountain", "City", "Cultural", "Adventure"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-teal-400 transition-colors duration-200"
                      >
                        {item} Tours
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                {["About Us", "Blog", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="hover:text-teal-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg w-auto font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                {["Help Center", "FAQ", "Terms of Service", "Privacy Policy"].map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-teal-400 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
          <p>© 2025 TripMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
