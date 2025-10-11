import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Key, Eye, EyeOff, Mail, User } from "lucide-react";
import PingDashboard from "./PingDashboard";

// Mock biometric data - in real app, this would be handled by WebAuthn API
const BIOMETRIC_CREDENTIALS = [
  {
    id: "1",
    name: "Primary Fingerprint",
    type: "fingerprint",
    registered: true
  },
  {
    id: "2", 
    name: "Face ID",
    type: "face",
    registered: false
  }
];

export default function LoginPage() {
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState("password"); // "password", "biometric", "email"
  const [isLoading, setIsLoading] = useState(false);
  const [biometricError, setBiometricError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);

  const videoRef = useRef(null);

  // Enhanced password validation
  const handleLogin = async () => {
    if (loginAttempts >= 3) {
      alert("Too many failed attempts. Please try biometric authentication or wait 5 minutes.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (password === "dpkdpkdpk") {
      setAccess(true);
    } else {
      setLoginAttempts(prev => prev + 1);
      alert(`Wrong password! ${3 - loginAttempts} attempts remaining.`);
    }
    
    setIsLoading(false);
  };

  // Biometric authentication simulation
  const handleBiometricAuth = async () => {
    setIsLoading(true);
    setBiometricError("");

    try {
      // Simulate biometric authentication process
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 80% success rate simulation
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error("Biometric authentication failed. Please try again."));
          }
        }, 2000);
      });

      // Success - check if we have registered biometric credentials
      const hasBiometric = BIOMETRIC_CREDENTIALS.some(cred => cred.registered);
      
      if (hasBiometric) {
        setAccess(true);
      } else {
        setBiometricError("No biometric credentials registered. Please use password login.");
      }
    } catch (error) {
      setBiometricError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  // Register new biometric credential
  const handleRegisterBiometric = async () => {
    setIsLoading(true);
    
    // Simulate biometric registration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    alert("Biometric registration completed successfully!");
    BIOMETRIC_CREDENTIALS[0].registered = true;
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderAuthMethod = () => {
    switch (authMethod) {
      case "password":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-4"
          >
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="border border-gray-300 p-4 w-full rounded-xl pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Key size={20} />
                  <span>Unlock with Password</span>
                </div>
              )}
            </motion.button>

            {loginAttempts > 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center"
              >
                {3 - loginAttempts} attempt(s) remaining
              </motion.p>
            )}
          </motion.div>
        );

      case "biometric":
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-6"
          >
            {/* Biometric Animation */}
            <div className="flex justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Fingerprint size={40} className="text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 border-4 border-blue-400 border-t-transparent rounded-2xl"
                />
              </motion.div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Biometric Authentication
              </h3>
              <p className="text-sm text-gray-600">
                Use your fingerprint or face to unlock
              </p>
            </div>

            {BIOMETRIC_CREDENTIALS[0].registered ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBiometricAuth}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Fingerprint size={20} />
                    <span>Authenticate with Biometrics</span>
                  </div>
                )}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegisterBiometric}
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-4 rounded-xl font-bold w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registering...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Fingerprint size={20} />
                    <span>Register Biometric</span>
                  </div>
                )}
              </motion.button>
            )}

            {biometricError && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500 text-center p-3 bg-red-50 rounded-lg"
              >
                {biometricError}
              </motion.p>
            )}

            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">Registered Biometrics:</p>
              {BIOMETRIC_CREDENTIALS.map(cred => (
                <div key={cred.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{cred.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cred.registered 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cred.registered ? 'Registered' : 'Not Set Up'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!access) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 max-w-[90vw] relative z-10 border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Fingerprint className="text-white" size={28} />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Secure Access
            </h1>
            <p className="text-gray-600">Choose your authentication method</p>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex space-x-2 mb-6 p-2 bg-gray-100 rounded-2xl">
            {[
              { id: "password", label: "Pass", icon: Key },
              { id: "biometric", label: "Biometric", icon: Fingerprint },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setAuthMethod(method.id)}
                className={`flex items-center space-x-2 px-4  py-2 md:py-3 rounded-xl transition-all duration-300 flex-1 text-sm font-medium ${
                  authMethod === method.id
                    ? "bg-white shadow-lg text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <method.icon size={18} />
                <span>{method.label}</span>
              </button>
            ))}
          </div>

          {/* Auth Method Content */}
          <AnimatePresence mode="wait">
            {renderAuthMethod()}
          </AnimatePresence>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Secure Connection</p>
              <p className="text-xs text-green-600">End-to-end encrypted</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 text-center text-white/80 text-sm"
        >
          <p>🔒 Your security is our priority</p>
        </motion.div>
      </div>
    );
  }

  return <PingDashboard />;
}