import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/authSlice";
import AppRoutes from "./routes/AppRoutes";
import axios from "./utils/axiosInstance";
import Cookies from "js-cookie"; // ✅

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token"); // ✅ read token from cookie

      if (!token) {
        dispatch(clearUser());
        return;
      }

      try {
        const res = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(
          setUser({
            user: {
              id: res.data.id,
              name: res.data.name,
              email: res.data.email,
              role: res.data.role,
              profilePic: res.data.profileImage || "",
            },
            token,
          })
        );
      } catch (error) {
        console.error("User not authenticated:", error.response?.data || error.message);
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
