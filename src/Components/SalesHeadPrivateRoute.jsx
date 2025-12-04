import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import SalesHeadLayout from "../SalesHeadPage/SalesHeadLayout";

const SalesHeadPrivateRoute = () => {
  const { isSalesHead, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isSalesHead) {
    return <Navigate to="/userdashboard/" replace />;
  }

  return <SalesHeadLayout />;
};

export default SalesHeadPrivateRoute;
