import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
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
    const verifyAccess = async () => {
      if (!rawToken) {
        setLoading(false);
        navigate("/auth/signin", { replace: true });
        return;
      }
      try {
        // Sanitize token from localStorage: remove quotes and any leading 'Bearer '
        const cleaned = (rawToken || "").replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");

        // Check if admin
        const { data: adminData } = await axios.get("auth/isAdmin", {
          headers: cleaned ? { Authorization: `Bearer ${cleaned}` } : undefined,
        });

        flushSync(() => {
          setIsAdmin(adminData?.success === true);
        });

        // If not admin, redirect to user dashboard
        if (adminData?.success !== true) {
          navigate("/userdashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error("Admin access verification error:", error);
        flushSync(() => {
          setIsAdmin(false);
        });
        navigate("/");
        setLoading(false);
      }
    };
    verifyAccess();
  }, [rawToken, navigate, setIsAdmin]);

  if (loading) return <LoadingSpinner />;
  return isAdmin ? <Outlet /> : null; // Show outlet only if admin
};

export default PrivateRoute;

