import axios from "axios";

// let token = typeof window !== 'undefined' && localStorage.getItem("accessToken");
const API_URL = "http://localhost:5000/api";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30 * 1000, // 30s
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${
      typeof window !== "undefined" && localStorage.getItem("accessToken")
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response ? error.response : error)
);

export default axiosInstance;
