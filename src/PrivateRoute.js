import React from "react";
import { Route, Navigate } from "react-router-dom";
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            element
          ) : (
            <Navigate to="/SignIn" /> // Redirect to SignIn if not authenticated
          )
        }
      />
      );
    </div>
  );
};

export default PrivateRoute;
