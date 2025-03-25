import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { flushSync } from "react-dom";

const SeoPrivateRoute = () => {
  const token = localStorage.getItem("myToken");
  const { isContentWriter, setIsContentWriter } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyContentWriter = async () => {

      if (!token) return navigate("/");

      try {
        const response = await fetch("/api/auth/isContentWriter", {
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
            setIsContentWriter(data.success === true);
          });
          navigate("/userdashboard");
        }
      } catch (error) {
        console.error("Admin verification error:", error);
        navigate("/userdashboard");
      }
    };

    verifyContentWriter();
  });

  return isContentWriter ?
   <Outlet /> : null; // Show outlet if admin
};

export default SeoPrivateRoute;

