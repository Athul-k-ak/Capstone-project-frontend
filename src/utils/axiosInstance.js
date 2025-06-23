import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://capstone-project-backend-2-hd6q.onrender.com",
  withCredentials: true, // ✅ Always send cookies
});

export default axiosInstance;
