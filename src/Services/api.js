import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vite proxy will handle this
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
