import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        const { user } = data;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
    };

    // console.log("User from AuthContext ✅", user);

    const updateUser = (user) => {
        // Normalize the ID field
        const normalizedUser = {
            ...user,
            id: user.id || user._id || user.userId, // pick whichever exists
        };

        // Remove unwanted keys
        delete normalizedUser._id;
        delete normalizedUser.userId;

        // Save to state and localStorage
        setUser(normalizedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext;