import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../aadharhomes/navbar/Navbar"; // Correct path to Navbar component

const PublicRoute = () => {
    const location = useLocation();
    const path = location.pathname || "";
    let hideNavbar = false;
    
    // Hide navbar for UAE pages (they have their own custom Header)
    if (path.startsWith("/United-Arab-Emirates") || path.startsWith("/United-Arab-Emirates/")) {
      hideNavbar = true;
    }
    
    if (!hideNavbar) {
      const segments = path.split("/").filter(Boolean);
      const isSingleSlugRoot = segments.length === 1;
      const first = segments[0] || "";
      const whitelist = new Set([
        "", // home
        "auth",
        "postproperty",
        "privacy-policy",
        "terms-and-conditions",
        "projects-in-gurugram",
        "budget-properties",
        "developers",
        "rental-properties",
        "buy-properties",
        "about-us",
        "property",
        "projects",
        "sco",
        "dlf-homes-sco-plots",
        "project-in-delhi",
        "project-in-noida",
        "project-in-panipat",
        "project-in-panchkula",
        "project-in-kasauli",
        "projects-in-sonipat",
        "projects-in-karnal",
        "projects-in-jalandhar",
        "project-in-ayodhya",
        "project-in-mumbai",
        "projects-in-dubai",
        "projects-in-pushkar",
        "qr-generator",
        "project-in-underconstruction",
        "projects-in-newlaunch",
        "project-in-goa",
        "plots-in-gurugram",
        "projects",
        "news-and-articals",
        "userdashboard",
        "useredit",
        "viewallproperty",
        "contact-us",
        "career-with-us",
        "blog",
      ]);
      if (isSingleSlugRoot && !whitelist.has(first)) {
        hideNavbar = true;
      }
    }

    return (
      <>
        {!hideNavbar && <Navbar />}
        <Outlet />
      </>
    );
};

export default PublicRoute;

