import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../aadharhomes/navbar/Navbar"; // Correct path to Navbar component

const PublicRoute = () => {
  const token = localStorage.getItem("myToken");
  const location = useLocation();
  const path = location.pathname || "";

  // Only redirect if already authenticated AND trying to access /auth/*
  if (token && path.startsWith("/auth")) {
    return <Navigate to="/" replace />;
  }

  // --- existing navbar logic below ---
  let hideNavbar = false;

  // Hide navbar for contact card routes (/hi/:slug)
  if (path.startsWith('/hi/')) {
    hideNavbar = true;
  }

  // Hide navbar for real-estate-insights and insights pages (they use InsightHeader)
  if (
    path.startsWith('/real-estate-insights') ||
    path.startsWith('/insights') ||
    path.startsWith('/property-market-trends') ||
    path.startsWith('/loan-eligibility') ||
    path.startsWith('/location-intelligence') ||
    path.startsWith('/investment-insights') ||
    path.startsWith('/market-analytics') ||
    path.startsWith('/price-trends') ||
    path.startsWith('/insights-news') ||
    path.startsWith('/insights-guides') ||
    path.startsWith('/market-reports')
  ) {
    hideNavbar = true;
  }

  // Hide navbar for Dubai pages
  if (
    path === '/dubai' ||
    path === '/dubai/' ||
    path.startsWith('/dubai/') ||
    path === '/united-arab-emirates' ||
    path === '/united-arab-emirates/' ||
    path.startsWith('/united-arab-emirates/')
  ) {
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
      "united-arab-emirates",
      "projects-in-pushkar",
      "project-in-pune",
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

