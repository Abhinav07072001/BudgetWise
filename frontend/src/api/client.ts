// import axios from "axios";

// export const api = axios.create({
//   baseURL:  "https://budgetwise-api-r18v.onrender.com", // backend
//   withCredentials: true,             // allow cookies
// });
import axios from "axios";

export const api = axios.create({
  baseURL: "https://budgetwise-api-r18v.onrender.com", // ✅ your backend URL
  withCredentials: true, // allow cookies
});

// ✅ Automatically attach JWT from localStorage to all outgoing requests
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
