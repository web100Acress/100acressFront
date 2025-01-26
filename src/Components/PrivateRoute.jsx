import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../MyContext";
import { AuthContext } from "../AuthContext";

const PrivateRoute = () => {
    const token = localStorage.getItem("myToken");
    const {admin} = useContext(DataContext);
    const {decodedTokenState} = useContext(AuthContext);

    if (!token) {
      return <Navigate to="/userdashboard" />;
    }
  
    // const userRole = JSON.parse(localStorage.getItem("userRole"));
    if(decodedTokenState){
      const userRole = decodedTokenState.role;
      if (userRole === "Admin") {
        return <Outlet />;
      } else {
        return <Navigate to="/" />;
      }
    }
  };
  

export default PrivateRoute;
