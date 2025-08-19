import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { flushSync } from "react-dom";

const SeoPrivateRoute = () => {
  const token = localStorage.getItem("myToken");
  const { isContentWriter, setIsContentWriter } = useContext(AuthContext);
  const navigate = useNavigate();
  // Toggle this to true when you want to strictly enforce ContentWriter auth
  const ENFORCE_SEO_AUTH = false;

  useEffect(() => {
    if (!ENFORCE_SEO_AUTH) return; // Skip verification when bypassing auth
    const verifyContentWriter = async () => {
      if (!token) return navigate("/");
      try {
        const response = await fetch("/auth/isContentWriter", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          // Update admin state synchronously
          flushSync(() => {
            setIsContentWriter(data.success === true);
          });
        } else {
          console.log("Admin verification failed:", data.message);
          flushSync(() => {
            setIsContentWriter(false);
          });
          navigate("/userdashboard");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        navigate("/userdashboard");
      }
    };
    verifyContentWriter();
    // Only re-run when token changes
  }, [ENFORCE_SEO_AUTH, token, navigate, setIsContentWriter]);

  // Temporarily bypass authentication for testing
  if (!ENFORCE_SEO_AUTH) return <Outlet />;

  // Original code (when authentication is enforced):
  return isContentWriter ? <Outlet /> : null;
};

export default SeoPrivateRoute;
