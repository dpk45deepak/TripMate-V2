import { toast } from "react-toastify";

const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
};

const useToast = () => {
    const success = (message, options = {}) =>
        toast.success(message, { ...defaultOptions, ...options });

    const error = (message, options = {}) =>
        toast.error(message, { ...defaultOptions, ...options });

    const info = (message, options = {}) =>
        toast.info(message, { ...defaultOptions, ...options });

    const warning = (message, options = {}) =>
        toast.warn(message, { ...defaultOptions, ...options });

    const loading = (message = "Loading...") =>
        toast.loading(message, { position: "top-center" });

    const update = (toastId, type, message) => {
        toast.update(toastId, {
            render: message,
            type,
            isLoading: false,
            autoClose: 3000,
        });
    };

    return {
        success,
        error,
        info,
        warning,
        loading,
        update,
    };
};

export default useToast;