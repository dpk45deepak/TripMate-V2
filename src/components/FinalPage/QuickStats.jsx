import { motion } from "framer-motion";
import icons from "../FinalPage/Icons.jsx";



// Enhanced Quick Stats Component
const QuickStats = ({ domesticCount, foreignCount, totalCount }) => {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Domestic</p>
            <p className="text-2xl font-bold">{domesticCount}</p>
          </div>
          <div className="w-10 h-10 bg-blue-400/30 rounded-full flex items-center justify-center">
            <icons.MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Foreign</p>
            <p className="text-2xl font-bold">{foreignCount}</p>
          </div>
          <div className="w-10 h-10 bg-green-400/30 rounded-full flex items-center justify-center">
            <icons.ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Total</p>
            <p className="text-2xl font-bold">{totalCount}</p>
          </div>
          <div className="w-10 h-10 bg-purple-400/30 rounded-full flex items-center justify-center">
            <icons.Star className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickStats;