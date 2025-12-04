import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSpaceDashboard, MdAnalytics, MdPeople, MdTrendingUp, MdAttachMoney } from "react-icons/md";
import { FaProjectDiagram, FaUserTie, FaPhone, FaChartLine, FaHome, FaRegUserCircle, FaBuilding } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImage from "/Images/100logo.jpg";
import { getApiBase } from "../config/apiBase";

const SalesHeadSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('salesHeadDarkMode') === 'true');
  const [userData, setUserData] = useState(null);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [resaleEnquiriesCount, setResaleEnquiriesCount] = useState(0);
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      // Get auth token
      const authToken = localStorage.getItem('myToken');
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      // Fetch properties count
      const propertiesResponse = await axios.get(`${getApiBase()}/project/viewAll/data`, { headers });
      setPropertiesCount(propertiesResponse.data?.data?.length || 0);

      // Fetch enquiries count
      const enquiriesResponse = await axios.get(`${getApiBase()}/contact/viewAll`, { headers });
      setEnquiriesCount(enquiriesResponse.data?.data?.length || 0);

      // Fetch resale enquiries count
      const resaleResponse = await axios.get(`${getApiBase()}/property/buy/ViewAll`, { headers });
      setResaleEnquiriesCount(resaleResponse.data?.data?.length || 0);

      // Skip users count as it requires admin privileges
      setRegisteredUsersCount(0);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

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
    
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('salesHeadDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('salesHeadDarkMode', 'false');
    }
  }, [darkMode]);

  const showLogoutToast = () => {
    toast.success("Logging out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const HandleUserLogout = async () => {
    try {
      showLogoutToast();
      await axios.get("/postPerson/logout");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("agentData");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body { font-family: 'Roboto', sans-serif; }
        .sidebar-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        .sidebar-nav-list {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: calc(100vh - 280px);
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
        className={`sidebar-wrapper fixed top-0 left-0 h-screen w-[280px] bg-gradient-to-br from-[#232526]/90 to-[#414345]/90 backdrop-blur-xl shadow-2xl border-r border-gray-200/20 z-50 transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:block lg:translate-x-0`}
      >
        {/* Brand/Logo Section */}
        <div className="sidebar-brand flex items-center justify-between px-6 py-6 border-b border-gray-200/10 dark:border-gray-700/30 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Logo" className="w-16 h-16 rounded-full shadow-lg border-2 border-white/40 bg-white/80 object-contain p-1" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg">Sales Head</span>
              {userData && userData.name && (
                <span className="text-sm font-medium text-gray-300 dark:text-gray-400 mt-1">
                  Welcome, {userData.name}
                </span>
              )}
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <div className="sidebar-nav-list gap-1 px-2 py-4 pr-1">
          <Link to="/sales-head/dashboard" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/sales-head/dashboard") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdSpaceDashboard className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Dashboard</span>
          </Link>

          {/* <Link to="/sales-head/listed-projects" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/sales-head/listed-projects") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaProjectDiagram className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Listed Projects</span>
            {propertiesCount > 0 && (
              <span className="ml-auto bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {propertiesCount}
              </span>
            )}
          </Link> */}

          <Link to="/sales-head/resale-enquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/sales-head/resale-enquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaHome className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Resale Enquiries</span>
            {resaleEnquiriesCount > 0 && (
              <span className="ml-auto bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                {resaleEnquiriesCount}
              </span>
            )}
          </Link>

          <Link to="/sales-head/listed-properties" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/sales-head/listed-properties") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaBuilding className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Listed Properties</span>
          </Link>

          <Link to="/sales-head/registered-users" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/sales-head/registered-users") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaRegUserCircle className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200 flex-shrink-0" />
            <span>Registered Users</span>
          </Link>
        </div>

        {/* Dark Mode & Logout - Fixed at Bottom */}
        <div className="px-2 pb-2 flex flex-col gap-2 flex-shrink-0 border-t border-gray-200/10 dark:border-gray-700/30 pt-2 mt-auto">
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

export default SalesHeadSidebar;
