import axios from "axios";

const api = axios.create({
  // Tell Axios to always start requests with this base URL
  baseURL: "http://localhost:5001/api",
});

export default api;