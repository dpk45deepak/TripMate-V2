import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            axios.get(`${Backend_url}/auth/google/callback?code=${code}`, {
                withCredentials: true,
            })
                .then((res) => {
                    console.log("Login Success:", res.data);
                    navigate("/home");
                })
                .catch((err) => {
                    console.error("Google Login Failed", err);
                    navigate("/login");
                });
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen text-xl">
            Logging you in with Google...
        </div>
    );
};

export default GoogleCallback;
