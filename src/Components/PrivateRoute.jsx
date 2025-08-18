import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { flushSync } from "react-dom";
import axios from "axios";

const PrivateRoute = () => {
  const token = localStorage.getItem("myToken");
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Admin Verification on Component Mount or token change
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!token) return navigate("/");
      try {
        // Let axios interceptor attach the token and baseURL
        const { data } = await axios.get("/auth/isAdmin");
        flushSync(() => {
          setIsAdmin(data?.success === true);
        });
        if (data?.success !== true) {
          navigate("/userdashboard");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        flushSync(() => setIsAdmin(false));
        navigate("/userdashboard");
      }
    };
    verifyAdmin();
  }, [token, navigate, setIsAdmin]);

  return isAdmin ? <Outlet /> : null; // Show outlet if admin
};

export default PrivateRoute;

