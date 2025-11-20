// src/services/api.js
import axios from "axios";

// 🔴 URL FIXA – SEM localhost, SEM process.env
const API_URL = "https://ilonnac-backend.onrender.com";

console.log("### API_URL EM RUNTIME (services/api):", API_URL);

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
