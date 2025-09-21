import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function AuthenticationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Authentication logic would be implemented here
    console.log("Authentication attempt:", credentials);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Social login logic would be implemented here
    console.log(`Social login attempt with ${provider}`);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-gray-100 p-6">
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-teal-800 mb-2">
            SignIn
          </h2>
          <p className="text-gray-600 text-sm">Enter your credentials to access the system</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-teal-700">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-teal-500" />
              </div>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="username@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-teal-700">Password</label>
              <Link to="/password-recovery" className="text-sm text-teal-600 hover:text-teal-800 transition-colors">
                Recovery Options
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-teal-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-teal-500" />
                ) : (
                  <Eye className="h-5 w-5 text-teal-500" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-3.5 rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 text-white font-medium shadow-md hover:from-teal-700 hover:to-teal-600 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </div>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-gray-500 text-sm">Alternative Methods</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="text-center flex justify-center align-center mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            className="py-2.5 px-4 rounded-lg bg-white text-gray-700 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-gray-600 text-center mt-8 text-sm">
          Need system access?{" "}
          <Link to="/signup" className="text-teal-600 font-medium hover:text-teal-800 transition-colors">
            Request Account
          </Link>
        </p>
      </div>
    </div>
  );
}