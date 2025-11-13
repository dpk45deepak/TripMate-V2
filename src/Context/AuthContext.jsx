import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_API from "../Services/Backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from backend (no localStorage)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await BACKEND_API.Users.GetProfile();
                if (response?.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (data) => {
        const { user } = data;
        setUser(user);
        navigate("/home");
    };

    const logout = () => {
        setUser(null);
        navigate("/signin");
    };

    const updateUser = (userData) => {
        const normalizedUser = {
            ...userData,
            id: userData.id || userData._id || userData.userId,
        };

        delete normalizedUser._id;
        delete normalizedUser.userId;

        setUser(normalizedUser);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
