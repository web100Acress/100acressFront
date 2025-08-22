import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { flushSync } from "react-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = () => {
  const rawToken = localStorage.getItem("myToken");
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Admin Verification on Component Mount or token change
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!rawToken) {
        setLoading(false);
        return navigate("/");
      }
      try {
        // Path-only: axiosSetup will prefix base ('/api' in dev)
        // Sanitize token from localStorage: remove quotes and any leading 'Bearer '
        const cleaned = (rawToken || "").replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
        const { data } = await axios.get("auth/isAdmin", {
          headers: cleaned ? { Authorization: `Bearer ${cleaned}` } : undefined,
        });
        flushSync(() => {
          setIsAdmin(data?.success === true);
        });
        if (data?.success !== true) {
          navigate("/userdashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error("Admin verification error:", error);
        flushSync(() => setIsAdmin(false));
        navigate("/userdashboard");
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [rawToken, navigate, setIsAdmin]);

  if (loading) return <LoadingSpinner />;
  return isAdmin ? <Outlet /> : null; // Show outlet if admin
};

export default PrivateRoute;

