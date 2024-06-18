import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
    const token = localStorage.getItem("myToken");
    if (!token) {
      return <Navigate to="/userdashboard" />;
    }
  
    const userRole = JSON.parse(localStorage.getItem("userRole"));
    
      if (userRole === "Admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };
  

export default PrivateRoute;
