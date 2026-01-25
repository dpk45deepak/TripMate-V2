import { motion } from "framer-motion";
import { Plane, MapPin } from "lucide-react";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 z-50">
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <Plane className="w-16 h-16 text-indigo-600" />
            </motion.div>

            <motion.p
                className="mt-6 text-lg font-semibold text-indigo-700"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
            >
                Finding the best trips for you...
            </motion.p>

            <div className="mt-4 flex space-x-2">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="w-3 h-3 bg-indigo-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Loading;
