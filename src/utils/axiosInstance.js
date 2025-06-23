import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://capstone-project-backend-1-wrcb.onrender.com",
  withCredentials: true, // ✅ Always send cookies
});

export default axiosInstance;
