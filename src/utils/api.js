import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 🛡️ Add auth token + dynamic Content-Type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🟡 Don't force Content-Type if using FormData
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
