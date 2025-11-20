// frontend/dashboard/src/services/api.js
import axios from "axios";

// URL fixa do backend no Render
const API_URL = "https://ilonnac-backend.onrender.com";

console.log("### API_URL (services/api.js):", API_URL);

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
