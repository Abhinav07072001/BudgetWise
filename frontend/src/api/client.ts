import axios from "axios";

export const api = axios.create({
  baseURL:  "https://budgetwise-api-r18v.onrender.com", // backend
  withCredentials: true,             // allow cookies
});
