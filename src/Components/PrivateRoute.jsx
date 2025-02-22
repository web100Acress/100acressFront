import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { flushSync } from "react-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("myToken");
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // Admin Verification on Component Mount
  useEffect(() => {
    const verifyAdmin = async () => {

      if (!token) return navigate("/");

      try {
        const response = await fetch("https://api.100acress.com/auth/isAdmin", {
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
            setIsAdmin(data.success === true);
          });

        } else {
          console.log("Admin verification failed:", data.message);
          flushSync(() => {
            setIsAdmin(data.success === true);
          });
          navigate("/userdashboard");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        navigate("/userdashboard");
      }
    };

    verifyAdmin();
  });

  return isAdmin ? <Outlet /> : null; // Show outlet if admin
};

export default PrivateRoute;

