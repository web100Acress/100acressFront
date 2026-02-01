import React, { useState, useEffect } from "react";
import { MdSpaceDashboard, MdInsights } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { SiBloglovin } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { AiFillPropertySafety } from "react-icons/ai";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHome, FaYoutube, FaAws } from "react-icons/fa";
import { MdImage, MdCategory, MdCloudUpload } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidGraduation } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Building } from "lucide-react";
import axios from "axios";
import showToast from "../utils/toastUtils";
import logoImage from "/Images/100logo.jpg";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const agentData = localStorage.getItem("agentData");
    if (agentData) {
      try {
        const parsedData = JSON.parse(agentData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing agent data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('adminDarkMode', 'true');
      console.log('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('adminDarkMode', 'false');
      console.log('Dark mode disabled');
    }
  }, [darkMode]);

  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown);
  };

  const handleLinkClick = (option) => {
    console.log(`Navigating to: ${option}`);
  };

  const showLogoutToast = () => {
    showToast.success("Logging out!");
  };

  const HandleUserLogout = async () => {
    try {
      showLogoutToast();
      await axios.get("/postPerson/logout");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
      showToast.error("Logout failed. Please try again.");
    }
  };

  // Hide sidebar if in Sales Head section
  if (location.pathname.startsWith('/sales-head')) {
    return null;
  }

  return (
    <div className="">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body { font-family: 'Roboto', sans-serif; }
        .sidebar-wrapper {
          display: flex;
          flex-direction: column;
        }
        .sidebar-nav-list {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .sidebar-nav-list::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-nav-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .sidebar-nav-list::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .sidebar-nav-list::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
      `}</style>
      <div
        className={`sidebar-wrapper fixed top-0 left-0 h-screen w-[240px] bg-gradient-to-br from-[#232526]/90 to-[#414345]/90 backdrop-blur-xl shadow-2xl border-r border-gray-200/20 z-50 transition-all duration-300 hidden lg:flex dark:bg-gradient-to-br dark:from-[#181a1b]/95 dark:to-[#232526]/95`}
      >
        {/* Brand/Logo Section */}
        <div className="sidebar-brand flex items-center gap-2 px-6 py-6 border-b border-gray-200/10 dark:border-gray-700/30 flex-shrink-0">
          <img src={logoImage} alt="Logo" className="w-16 h-16 rounded-full shadow-lg border-2 border-white/40 bg-white/80 object-contain p-1" />
          <div className="flex flex-col">
            {userData && userData.name && (
              <span className="text-sm font-medium text-gray-300 dark:text-gray-400 mt-1">
                Welcome, {userData.name}
              </span>
            )}
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="sidebar-nav-list gap-1 px-2 py-4 pr-1">
          <Link to="/Admin/dashboard" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/dashboard") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdSpaceDashboard className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Dashboard</span>
          </Link>

          <Link to="/Admin/enquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/enquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <GoProjectSymlink className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Project Enquiries</span>
          </Link>

          <Link to="/Admin/OtherEnquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/OtherEnquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <GoProjectSymlink className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Other Enquiries</span>
          </Link>

          <Link to="/Admin/Projects/property" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/Projects/property") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaDiagramProject className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Listed Projects</span>
          </Link>

          <Link to="/Admin/project-order-manager" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/project-order-manager") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaDiagramProject className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Project Order Manager</span>
          </Link>

          <Link to="/Admin/jobposting" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/jobposting") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <BiSolidGraduation className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Job Postings</span>
          </Link>

          <Link to="/Admin/resale-enquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/resale-enquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaHome className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Resale Enquiries</span>
          </Link>

          <Link to="/Admin/all-listed-properties" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/all-listed-properties") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaHome className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Listed Properties</span>
          </Link>

          <Link to="/admin/s3-manager" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-green-500/80 hover:to-teal-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/admin/s3-manager") ? "bg-gradient-to-r from-green-500/80 to-teal-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaAws className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>S3 Manager</span>
          </Link>

          <Link to="/admin/contact-cards" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-500/80 hover:to-red-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/admin/contact-cards") ? "bg-gradient-to-r from-orange-500/80 to-red-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <Building className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Contact Cards</span>
          </Link>

          <Link to="/admin/sitemap-management" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-500/80 hover:to-blue-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/admin/sitemap-management") ? "bg-gradient-to-r from-indigo-500/80 to-blue-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdCloudUpload className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Sitemap Management</span>
          </Link>

          <Link to="/Admin/blog" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/blog") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <SiBloglovin className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Blog Posts</span>
          </Link>

          <Link to="/Admin/shorts" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/shorts") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaYoutube className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Shorts Settings</span>
          </Link>

          <Link to="/Admin/unified-banner-management" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/unified-banner-management") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdImage className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Banner Management</span>
          </Link>

          <Link to="/Admin/project-order-management" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/project-order-management") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdCategory className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Project Order Management</span>
          </Link>

          <Link to="/Admin/user" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/user") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaRegUserCircle className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Registered User</span>
          </Link>
        </div>

        {/* Dark Mode & Logout - Fixed at Bottom */}
        <div className="px-2 pb-2 flex flex-col gap-2 flex-shrink-0 border-t border-gray-200/10 dark:border-gray-700/30 pt-2">
          <button
            onClick={() => {
              console.log('Dark mode toggle clicked, current state:', darkMode);
              setDarkMode((prev) => !prev);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-200/80 to-gray-400/80 text-gray-800 font-semibold text-base shadow hover:from-gray-300 hover:to-gray-500 transition-all duration-200 dark:bg-gradient-to-r dark:from-gray-700/80 dark:to-gray-900/80 dark:text-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-950"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>

          <button onClick={HandleUserLogout} className="logout-btn group flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white font-semibold text-base shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-200 dark:from-red-700/80 dark:to-pink-800/80 dark:hover:from-red-800 dark:hover:to-pink-900">
            <RiLogoutCircleRLine className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;