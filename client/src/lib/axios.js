import axios from "axios";
import { isTokenExpired } from "../utils/tokenCheck";

let logoutCallback = null;

export const setLogoutHandler = (fn) => {
  logoutCallback = fn;
};

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const publicClient = axios.create({
  baseURL: BASE_URL,
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("access_token");
        if (logoutCallback) logoutCallback();
        throw new axios.Cancel("Session expired, please log in again.");
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance, publicClient };
