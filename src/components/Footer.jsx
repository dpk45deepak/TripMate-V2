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
    <footer className="relative bg-gray-900 text-gray-300 pt-16 pb-10 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-700/20 via-blue-700/20 to-indigo-800/20 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-4">
              GoBeyond
            </h3>
            <p className="mb-6 text-gray-400 leading-relaxed">
              Making your travel dreams come true with exceptional experiences
              around the world.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ icon: Icon, href, label, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  aria-label={label}
                  className={`p-2 rounded-full bg-gray-800/60 text-gray-300 transition-all duration-300 ${color}`}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Destinations</h4>
            <ul className="space-y-2">
              {["Beach", "Mountain", "City", "Cultural", "Adventure"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-300"
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
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Press", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                "Help Center",
                "FAQ",
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 GoBeyond Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
