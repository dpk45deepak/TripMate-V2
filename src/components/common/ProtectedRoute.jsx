import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen bg-linear-to-br from-black/10 via-white/10 to-black/10 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-14 h-14 border-4 border-blue-400/30 rounded-full"></div>
                        <div className="absolute inset-0 w-14 h-14 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm text-blue-600 font-medium tracking-wide animate-pulse">
                        Checking your session...
                    </p>
                </div>
            </div>

        );

    // If not logged in and trying to access protected pages
    if (!user && !(location.pathname === "/" ||
        location.pathname === "/signin" ||
        location.pathname === "/signup")) {
        return <Navigate to="/signin" replace />;
    }

    // If logged in and trying to access signin or signup
    if (
        user &&
        (location.pathname === "/" ||
            location.pathname === "/signin" ||
            location.pathname === "/signup")
    ) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;
