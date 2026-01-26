import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen bg-transparent">
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
        );

    if (user == null) return <Navigate to="/signin" replace />;

    return children;
};

export default ProtectedRoute;
