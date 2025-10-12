import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if (!user) return <Navigate to="/signin" replace />;

    return children;
};

export default ProtectedRoute;
