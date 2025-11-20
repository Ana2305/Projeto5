// src/services/api.js
import axios from "axios";

// 🔴 URL fixa do backend – sem localhost, sem env
const API_URL = "https://ilonnac-backend.onrender.com";

// esse log é pra gente ter certeza ABSOLUTA de que esse build foi pro ar
console.log("### BUILD v5 API_URL:", API_URL);

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
