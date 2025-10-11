import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Square, Calendar, Globe, Settings, Activity, Bell,
  Trash2, Plus, X, BarChart3, CheckCircle2, AlertCircle, Menu, Search
} from "lucide-react";

// Mock data for demonstration
const MOCK_LOGS = [
  { id: 1, timestamp: "2024-01-15 10:30:23", status: "success", responseTime: 245, url: "https://tripsbcknd.onrender.com/" },
  { id: 2, timestamp: "2024-01-15 10:29:23", status: "success", responseTime: 189, url: "https://tripsbcknd.onrender.com/" },
  { id: 3, timestamp: "2024-01-15 10:28:23", status: "error", responseTime: 0, url: "https://tripsbcknd.onrender.com/", error: "Timeout" },
  { id: 4, timestamp: "2024-01-15 10:27:23", status: "success", responseTime: 201, url: "https://tripsbcknd.onrender.com/" },
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function PingDashboard() {
  const [monitors, setMonitors] = useState([
    {
      id: 1,
      name: "Production API",
      url: "https://tripsbcknd.onrender.com/",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      startTime: "07:00",
      endTime: "23:00",
      interval: 60,
      active: false,
      lastStatus: "unknown"
    }
  ]);
  const [selectedMonitor, setSelectedMonitor] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [stats, setStats] = useState({
    uptime: "99.8%",
    avgResponseTime: "215ms",
    totalRequests: "12,847",
    errors: "23"
  });
  const [showAddMonitor, setShowAddMonitor] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newMonitor, setNewMonitor] = useState({
    name: "",
    url: "",
    days: [],
    startTime: "09:00",
    endTime: "18:00",
    interval: 60
  });

  const currentMonitor = monitors[selectedMonitor];
  const statusColor = currentMonitor?.lastStatus === "success" ? "text-green-500" : 
                     currentMonitor?.lastStatus === "error" ? "text-red-500" : "text-yellow-500";

  useEffect(() => {
    const handleResize = () => { if(window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ping Server Effect
  useEffect(() => {
    if (!currentMonitor) return;
    let intervalId;

    const pingServer = async () => {
      const now = new Date();
      const currentDay = DAYS_OF_WEEK[(now.getDay() + 6) % 7]; // Fix Sun=0
      const currentTime = now.toTimeString().substring(0,5); // HH:MM

      if (
        currentMonitor.days.includes(currentDay) &&
        currentTime >= currentMonitor.startTime &&
        currentTime <= currentMonitor.endTime
      ) {
        try {
          console.log("Pinging:", currentMonitor.url, "at", new Date().toLocaleTimeString());
          const start = Date.now();
          const res = await fetch(currentMonitor.url, { method: "GET" });
          const responseTime = Date.now() - start;
          const status = res.ok ? "success" : "error";

          setLogs(prev => [
            { id: prev.length + 1, timestamp: new Date().toISOString().replace('T',' ').substring(0,19), status, responseTime, url: currentMonitor.url },
            ...prev.slice(0, 9)
          ]);

          setMonitors(prev => prev.map((m, i) => i === selectedMonitor ? { ...m, lastStatus: status } : m));
        } catch (err) {
          setLogs(prev => [
            { id: prev.length + 1, timestamp: new Date().toISOString().replace('T',' ').substring(0,19), status: "error", responseTime: 0, url: currentMonitor.url, error: err.message },
            ...prev.slice(0, 9)
          ]);
          setMonitors(prev => prev.map((m, i) => i === selectedMonitor ? { ...m, lastStatus: "error" } : m));
        }
      }
    };

    if (isRunning) {
      pingServer();
      intervalId = setInterval(pingServer, currentMonitor.interval * 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, selectedMonitor, currentMonitor?.id, currentMonitor?.interval, currentMonitor?.days, currentMonitor?.startTime, currentMonitor?.endTime, currentMonitor?.url]);

  const togglePing = () => setIsRunning(!isRunning);

  const addMonitor = () => {
    if (newMonitor.name && newMonitor.url) {
      const monitor = { ...newMonitor, id: monitors.length + 1, active: false, lastStatus: "unknown" };
      setMonitors([...monitors, monitor]);
      setNewMonitor({ name:"", url:"", days:[], startTime:"09:00", endTime:"18:00", interval:60 });
      setShowAddMonitor(false);
    }
  };

  const toggleDay = (day) => {
    setNewMonitor(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d!==day) : [...prev.days, day]
    }));
  };

  const deleteMonitor = (index) => {
    if(monitors.length > 1){
      setMonitors(monitors.filter((_,i)=>i!==index));
      if(selectedMonitor === index) setSelectedMonitor(0);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PingMonitor</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Real-time service monitoring</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search monitors..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search monitors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span>Alerts</span>
                </button>
                <button className="flex-1 p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Monitor List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Monitors</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddMonitor(true)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {monitors.map((monitor, index) => (
                  <motion.div
                    key={monitor.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${selectedMonitor === index
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    onClick={() => {
                      setSelectedMonitor(index);
                      if (window.innerWidth < 1024) {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${monitor.lastStatus === "success" ? "bg-green-500" :
                            monitor.lastStatus === "error" ? "bg-red-500" : "bg-yellow-500"
                          }`} />
                        <span className="font-medium text-gray-900 truncate text-sm sm:text-base">{monitor.name}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteMonitor(index); }}
                        className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0 ml-2"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 truncate mt-1 pl-5">{monitor.url}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-2xl font-bold text-green-600">{stats.uptime}</p>
                  <p className="text-xs text-green-700 mt-1">Uptime</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}</p>
                  <p className="text-xs text-blue-700 mt-1">Avg Response</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-2xl font-bold text-gray-600">{stats.totalRequests}</p>
                  <p className="text-xs text-gray-700 mt-1">Total Requests</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
                  <p className="text-xs text-red-700 mt-1">Errors</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Control Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{currentMonitor?.name}</h2>
                  <p className="text-gray-600 flex items-center space-x-2 mt-1 text-sm sm:text-base">
                    <Globe className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{currentMonitor?.url}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-4 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${statusColor}`} />
                    <span className="text-sm text-gray-600 capitalize">{currentMonitor?.lastStatus}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePing}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base ${isRunning
                        ? "bg-red-500 hover:bg-red-600 shadow-sm"
                        : "bg-green-500 hover:bg-green-600 shadow-sm"
                      }`}
                  >
                    {isRunning ? (
                      <>
                        <Square className="w-4 h-4" />
                        <span className="hidden sm:inline">Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span className="hidden sm:inline">Start</span>
                      </>
                    )}
                    <span className="sm:hidden">{isRunning ? "Stop" : "Start"}</span>
                  </motion.button>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {/* Schedule Settings */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>Schedule</span>
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Active Days
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {DAYS_OF_WEEK.map(day => (
                        <motion.button
                          key={day}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setMonitors(prev => prev.map((monitor, index) =>
                              index === selectedMonitor
                                ? {
                                  ...monitor,
                                  days: monitor.days.includes(day)
                                    ? monitor.days.filter(d => d !== day)
                                    : [...monitor.days, day]
                                }
                                : monitor
                            ));
                          }}
                          className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 border ${currentMonitor?.days.includes(day)
                              ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                            }`}
                        >
                          {day}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={currentMonitor?.startTime}
                        onChange={(e) => {
                          setMonitors(prev => prev.map((monitor, index) =>
                            index === selectedMonitor
                              ? { ...monitor, startTime: e.target.value }
                              : monitor
                          ));
                        }}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={currentMonitor?.endTime}
                        onChange={(e) => {
                          setMonitors(prev => prev.map((monitor, index) =>
                            index === selectedMonitor
                              ? { ...monitor, endTime: e.target.value }
                              : monitor
                          ));
                        }}
                        className="w-full bg-white border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Monitoring Settings */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    <span>Settings</span>
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check Interval
                    </label>
                    <select
                      value={currentMonitor?.interval}
                      onChange={(e) => {
                        setMonitors(prev => prev.map((monitor, index) =>
                          index === selectedMonitor
                            ? { ...monitor, interval: parseInt(e.target.value) }
                            : monitor
                        ));
                      }}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                      <option value={600}>10 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target URL
                    </label>
                    <input
                      type="url"
                      value={currentMonitor?.url}
                      onChange={(e) => {
                        setMonitors(prev => prev.map((monitor, index) =>
                          index === selectedMonitor
                            ? { ...monitor, url: e.target.value }
                            : monitor
                        ));
                      }}
                      placeholder="https://example.com/health"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <span>Recent Activity</span>
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                      {log.status === "success" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{log.url}</p>
                        <p className="text-xs text-gray-600">{log.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className={`font-semibold text-sm sm:text-base ${log.status === "success" ? "text-green-600" : "text-red-600"
                        }`}>
                        {log.status === "success" ? `${log.responseTime}ms` : "Failed"}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">{log.status}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Monitor Modal */}
      <AnimatePresence>
        {showAddMonitor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddMonitor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md border border-gray-200 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Monitor</h3>
                <button
                  onClick={() => setShowAddMonitor(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monitor Name
                  </label>
                  <input
                    type="text"
                    value={newMonitor.name}
                    onChange={(e) => setNewMonitor(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Production API"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target URL
                  </label>
                  <input
                    type="url"
                    value={newMonitor.url}
                    onChange={(e) => setNewMonitor(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://api.example.com/health"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active Days
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {DAYS_OF_WEEK.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 border ${newMonitor.days.includes(day)
                            ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                          }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newMonitor.startTime}
                      onChange={(e) => setNewMonitor(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newMonitor.endTime}
                      onChange={(e) => setNewMonitor(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addMonitor}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Monitor</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}