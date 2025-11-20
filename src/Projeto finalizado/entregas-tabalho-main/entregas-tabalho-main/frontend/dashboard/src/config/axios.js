import axios from "axios";

// Em prod: usa REACT_APP_API_URL
// Em dev: cai no http://127.0.0.1:5000
const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

console.log("API_URL em runtime:", API_URL); // <-- pode deixar isso temporário pra ver no console

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
