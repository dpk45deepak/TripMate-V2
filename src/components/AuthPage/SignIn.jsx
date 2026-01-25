import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, use } from "react";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

// Authentication
import BACKEND_API from '../../Services/Backend';
import AuthContext from "../../Context/AuthContext";
import useToast from '../../hooks/useToast';

export default function AuthenticationForm() {

  const toast = useToast();

  // Global Context
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if(errorMsg){
      toast.info(errorMsg);
    }
  }, [errorMsg]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      await BACKEND_API.Auth.SignIn(credentials);
      // console log success
      toast.success("Sign in successful! Welcome back!");
      // Set Global Context an navigate user
      const userResponse = await BACKEND_API.Users.GetProfile();
      updateUser(userResponse.data);
    } catch (error) {
      console.error("Login/Signin failed: ❌ ", error.response?.data || error.msg);
      setErrorMsg(error.response?.data?.msg || "Invalid credentials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      // Implement Social Login
      window.location.href = `${BACKEND_URL}/auth/google`;
      // Set Global Context an navigate user
      const userResponse = await BACKEND_API.Users.GetProfile();
      updateUser(userResponse.data);
      toast.success("Social login successful! Welcome back!");
    } catch (error) {
      console.error('OAuth error:', error);
      setErrorMsg('Failed to initiate Google sign in');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/home"); // already signed in
  }, [user]);
return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-linear-to-br from-blue-100 via-white to-cyan-100 font-sans overflow-hidden px-6 py-10">
      {/* Right Login Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-8 w-full max-w-md border border-gray-200 text-center"
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="relative">
            <div className="w-10 h-10 bg-linear-to-br from-teal-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl lg:text-2xl font-black bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              TripMate
            </span>
            <span className="text-xs text-gray-500 font-medium -mt-1 hidden sm:block">
              Travel Smart
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold bg-linear-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6 text-center">
          Sign In to Continue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 transition-all duration-300 shadow-lg ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={() =>{
          handleSocialLogin("Google")
          }}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};