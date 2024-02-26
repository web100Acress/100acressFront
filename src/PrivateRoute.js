import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const getRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  useEffect(() => {
    if (getRole !== "admin") {
      // Redirect to home route if user is not admin
      navigate('/');
    }
  }, [getRole, navigate]);

  if (getRole === "admin") {
    return <Outlet />;
  } else {
    // Return null if not admin (or you can return a different component/message)
    return null;
  }
}

export default PrivateRoute;
