import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../MyContext";
const PrivateRoute = () => {
    const token = localStorage.getItem("myToken");
    const {admin} = useContext(DataContext)
    if (!token) {
      return <Navigate to="/userdashboard" />;
    }
  
    const userRole = JSON.parse(localStorage.getItem("userRole"));
      if (userRole === "Admin" || userRole === admin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  };
  

export default PrivateRoute;
