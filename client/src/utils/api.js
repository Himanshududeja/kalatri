import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Attach JWT token to every request automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("kalatri_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("kalatri_token");
      localStorage.removeItem("kalatri_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;