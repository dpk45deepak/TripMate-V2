import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Sparkles } from "lucide-react";

// Authentication
import BACKEND_API from '../../Services/Backend';
import AuthContext from "../../Context/AuthContext";
import useToast from "../../hooks/useToast";

export default function AuthenticationForm() {

  const toast = useToast();

  // Global Context
  const { user, updateUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (authStatus) {
      setAuthStatus(null);
    }
  };

// ✅ Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await BACKEND_API.Auth.SignUp(credentials);
      // console log success
      const userResponse = await BACKEND_API.Users.GetProfile();
      // Set Global Context an navigate user
      updateUser(userResponse.data);
      setAuthStatus("success");
      toast.success("Sign up successful! Welcome aboard!");
    } catch (error) {
      console.error("❌ SignUp failed:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.message || "Invalid credentials. Try again.");
      setAuthStatus("error");
      toast.info(error.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      console.log("Backend URL: ", BACKEND_URL);
    // implement social sign up logic here
      window.location.href = `${BACKEND_URL}/auth/google`;
      const userResponse = await BACKEND_API.Users.GetProfile();
      // Set Global Context an navigate user
      updateUser(userResponse.data);
      setAuthStatus("success");
      toast.success("Social sign up successful! Welcome aboard!");
    } catch (error) {
      console.error('OAuth error:', error);
      setErrorMsg('Failed to initiate Google sign up');
      setAuthStatus("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-gray-50 to-teal-100 px-6 py-12 overflow-hidden font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-200"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-teal-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-black bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                TripMate
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
                Travel Smart
              </span>
            </div>
          </div>
          </div>
          <h2 className="text-2xl font-extrabold bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent m-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Join us and start your travel journey</p>
        </div>

        {/* Alerts */}
        {authStatus === "error" && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700 text-sm">Something went wrong. Please try again.</span>
          </div>
        )}

        {authStatus === "success" && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-700 text-sm">Account created successfully! Redirecting...</span>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-teal-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-teal-500" size={20} />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-teal-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-teal-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter a strong password"
                required
                disabled={isLoading}
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-3 text-gray-500 hover:text-teal-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-lg text-white font-semibold shadow-md bg-linear-to-r from-blue-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 transition-all duration-300 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isLoading ? (
              <>
                <div className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign Up */}
        <button
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {/* Already have account */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-teal-600 hover:text-teal-800 font-medium">
            Sign in
          </Link>
        </p>

        {/* Terms */}
        <p className="text-gray-500 text-center mt-4 text-xs">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-teal-600 hover:text-teal-800 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-teal-600 hover:text-teal-800 underline">
            Privacy Policy
          </Link>.
        </p>
      </motion.div>
    </div>
  );
};