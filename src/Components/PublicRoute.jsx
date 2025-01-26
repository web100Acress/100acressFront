import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../aadharhomes/Navbar"; // Adjust the path to your Navbar component

const PublicRoute = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
};

export default PublicRoute;
