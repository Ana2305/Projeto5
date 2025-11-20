// src/axios.js
import axios from "axios";

// URL fixa do backend no Render
const API_URL = "https://ilonnac-backend.onrender.com";

console.log("API_URL em runtime:", API_URL);

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
