import { motion } from "framer-motion";
import { Globe, Users, Award, Plane } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-10 h-10 text-teal-400" />,
    title: "Global Destinations",
    desc: "Handpicked locations across the world for unforgettable adventures.",
    bgC: "bg-teal-100",
  },
  {
    icon: <Users className="w-10 h-10 text-blue-400" />,
    title: "Expert Guides",
    desc: "Travel with experienced guides who make every trip special.",
    bgC: "bg-blue-100",
  },
  {
    icon: <Award className="w-10 h-10 text-indigo-400" />,
    title: "Trusted Quality",
    desc: "Award-winning service trusted by thousands of happy travelers.",
    bgC: "bg-indigo-100",
  },
  {
    icon: <Plane className="w-10 h-10 text-pink-400" />,
    title: "Seamless Travel",
    desc: "From flights to stays, we handle everything for a hassle-free journey.",
    bgC: "bg-pink-100",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="bg-gray-50 py-20 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent p-2"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Experience Travel the Right Way
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12">
          We go beyond just trips — we create experiences that last a lifetime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center ${feature.bgC}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
