import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../aadharhomes/Navbar"; // Adjust the path to your Navbar component

const PublicRoute = () => {
    const location = useLocation();
    const path = location.pathname || "";

    // Hide navbar on Projects pages (e.g., /project-in-*, /projects-in-*, /projects/*, /project/*)
    let hideNavbar =
      /^\/(project|projects)-in-/i.test(path) ||
      /^\/projects\//i.test(path) ||
      /^\/project\//i.test(path);

    // Additionally, hide on dynamic project detail route: "/:pUrl/" (single slug at root)
    // We whitelist known top-level routes to avoid hiding on non-project pages like /about-us/, /blog/, etc.
    if (!hideNavbar) {
      const segments = path.split("/").filter(Boolean);
      const isSingleSlugRoot = segments.length === 1; // e.g., "/experion-the-trillion/"
      const first = segments[0] || "";
      const whitelist = new Set([
        "", // home
        "auth",
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
