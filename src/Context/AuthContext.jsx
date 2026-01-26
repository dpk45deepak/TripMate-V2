import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_API from "../Services/Backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Load user from backend (no localStorage)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await BACKEND_API.Users.GetProfile();
                if (response?.data) {
                    console.log("User: ", user);
                    console.log("User: ", response);
                    setUser(response.data);
                    navigate("/home", { replace: true }); // auto go to home
                }
            } catch (error) {
                console.log("Not logged in");
                navigate("/", { replace: true }); // landing
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
    try {

        if (!userData) {
            console.error('No user data provided to updateUser');
            return;
        }

        const normalizedUser = {
            ...userData,
            id: userData.id || userData._id || userData.userId,
        };

        // Clean up the object
        if ('_id' in normalizedUser) delete normalizedUser._id;
        if ('userId' in normalizedUser) delete normalizedUser.userId;

        setUser(prevUser => {
            const updatedUser = { ...prevUser, ...normalizedUser };
            return updatedUser;
        });
    } catch (error) {
        console.error('Error in updateUser:', error);
    }
};

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
