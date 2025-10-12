import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { flushSync } from "react-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const HrPrivateRoute = () => {
  const rawToken = localStorage.getItem("myToken");
  const { isHr, setIsHr } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // HR Verification on Component Mount or token change
  useEffect(() => {
    const verifyHrAccess = async () => {
      if (!rawToken) {
        setLoading(false);
        return navigate("/");
      }
      try {
        // Sanitize token from localStorage: remove quotes and any leading 'Bearer '
        const cleaned = (rawToken || "").replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");

        // Check if HR
        const { data: hrData } = await axios.get("auth/isHr", {
          headers: cleaned ? { Authorization: `Bearer ${cleaned}` } : undefined,
        });

        flushSync(() => {
          setIsHr(hrData?.success === true);
        });

        // If not HR, redirect to user dashboard
        if (hrData?.success !== true) {
          navigate("/userdashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error("HR access verification error:", error);
        flushSync(() => {
          setIsHr(false);
        });
        navigate("/");
        setLoading(false);
      }
    };
    verifyHrAccess();
  }, [rawToken, navigate, setIsHr]);

  if (loading) return <LoadingSpinner />;
  return isHr ? <Outlet /> : null; // Show outlet only if HR
};

export default HrPrivateRoute;
