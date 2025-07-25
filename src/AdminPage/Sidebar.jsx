import React, { useState, useEffect } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { SiBloglovin } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { AiFillPropertySafety } from "react-icons/ai";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidGraduation }  from "react-icons/bi"; // Corrected import syntax for BiSolidGraduation
import { RiLogoutCircleRLine } from "react-icons/ri";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Assuming you'll have a toggle in a Header component or similar
  const [showContactDropdown, setShowContactDropdown] = useState(false); // Renamed for clarity
  const navigate = useNavigate(); // Renamed history to navigate for consistency with react-router-dom v6
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('adminDarkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('adminDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('adminDarkMode', 'false');
    }
  }, [darkMode]);

  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown);
  };

  const handleLinkClick = (option) => {
    console.log(`Navigating to: ${option}`);
    // In a real app, you might close the sidebar here if it's on mobile
    // setSidebarOpen(false);
  };

  const showLogoutToast = () => {
    toast.success("Logging out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500, // Increased autoClose slightly
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const HandleUserLogout = async () => {
    try {
      showLogoutToast(); // Show toast immediately
      await axios.get("https://api.100acress.com/postPerson/logout");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      setTimeout(() => {
        navigate("/"); // Navigate after toast has a chance to show
      }, 1500); // Match toast autoClose time
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
      `}</style>
      <div
        className={`sidebar-wrapper fixed top-0 left-0 h-screen w-[250px] bg-gradient-to-br from-[#232526]/90 to-[#414345]/90 backdrop-blur-xl shadow-2xl border-r border-gray-200/20 flex flex-col justify-between z-50 transition-all duration-300 dark:bg-gradient-to-br dark:from-[#181a1b]/95 dark:to-[#232526]/95`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          background: 'rgba(44, 62, 80, 0.85)',
        }}
      >
        {/* Brand/Logo Section */}
        <div className="sidebar-brand flex items-center gap-2 px-6 py-6 border-b border-gray-200/10 dark:border-gray-700/30">
          <img src="https://instagram.fdel27-6.fna.fbcdn.net/v/t51.2885-19/468910235_1105544217867275_5246324212179295865_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby41MjUuYzIifQ&_nc_ht=instagram.fdel27-6.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2QEu4hBS5pdurvYmGdgSFWZ6hkNzmiOg6f8HET699wQXIBHz5p9QMnuf4HFaZ93_slZZeuphUR8y53AQEoDJQCo7&_nc_ohc=eMmHXNAQAy0Q7kNvwHFBBiS&_nc_gid=4vd4uVelMWvETb8vAJB3tg&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfRJG3PdyNcg2Yc7BqyR6xEiNNXSBTPKEP8k5PLrWTSxIg&oe=688AA186&_nc_sid=8b3546" alt="Logo" className="w-12 h-12 rounded-full shadow-lg border-2 border-white/40 bg-white/80 object-contain bg-white p-1" />
          <span className="text-lg font-extrabold tracking-wide text-white drop-shadow-lg whitespace-nowrap dark:text-gray-100">100Acress.com </span>
        </div>
        {/* Navigation */}
        <div className="sidebar-nav-list flex-1 flex flex-col gap-1 px-2 py-4 overflow-y-auto">
          <Link to="/Admin/dashboard" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/dashboard") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <MdSpaceDashboard className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Dashboard</span>
          </Link>
          <Link to="/Admin/enquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/enquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <GoProjectSymlink className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Project Enquiries</span>
          </Link>
          <Link to="/Admin/Projects/property" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/Projects/property") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaDiagramProject className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Listed Projects</span>
          </Link>
          <Link to="/Admin/resale-enquiries" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/resale-enquiries") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaHome className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Resale Enquiries</span>
          </Link>
          <Link to="/Admin/all-listed-properties" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/all-listed-properties") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaHome className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Listed Properties</span>
          </Link>
          {/* Contact Us Dropdown */}
          {/* <a href="#" onClick={toggleContactDropdown} className="sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white text-gray-200 font-medium text-base cursor-pointer select-none dark:text-gray-300 dark:hover:text-white dark:hover:bg-gradient-to-r dark:hover:from-blue-700/80 dark:hover:to-purple-700/80">
            <AiFillPropertySafety className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Contact Us</span>
            <svg className={`ml-auto w-4 h-4 transition-transform duration-200 ${showContactDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </a> */}
          {/* {showContactDropdown && (
            <div className="dropdown-container bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-lg shadow-inner ml-4 my-1 py-1 flex flex-col gap-1 animate-fade-in dark:from-gray-900/90 dark:to-gray-800/90">
              <Link to="#" onClick={() => handleLinkClick("Contact User")}
                className="dropdown-item flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-blue-500/70 hover:text-white transition-all duration-150 text-sm dark:text-gray-400 dark:hover:text-white dark:hover:bg-blue-700/70">
                <span>Contact User</span>
              </Link>
              <Link to="#" onClick={() => handleLinkClick("User Property")}
                className="dropdown-item flex items-center gap-2 px-3 py-2 rounded-md text-gray-300 hover:bg-blue-500/70 hover:text-white transition-all duration-150 text-sm dark:text-gray-400 dark:hover:text-white dark:hover:bg-blue-700/70">
                <span>User Property</span>
              </Link>
            </div>
          )} */}
          <Link to="/Admin/blog" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/blog") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <SiBloglovin className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Blog Posts</span>
          </Link>
          <Link to="/Admin/user" className={`sidebar-nav-item group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-500/80 hover:to-purple-500/80 hover:text-white font-medium text-base ${location.pathname.startsWith("/Admin/user") ? "bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white" : "text-gray-200 dark:text-gray-300"}`}>
            <FaRegUserCircle className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Resistered User</span>
          </Link>
        </div>
        {/* Dark Mode Toggle Button */}
        <div className="px-2 pb-2 flex flex-col gap-2">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-200/80 to-gray-400/80 text-gray-800 font-semibold text-base shadow hover:from-gray-300 hover:to-gray-500 transition-all duration-200 dark:bg-gradient-to-r dark:from-gray-700/80 dark:to-gray-900/80 dark:text-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-950"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          {/* Logout Button at Bottom */}
          <button onClick={HandleUserLogout} className="logout-btn group flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white font-semibold text-base shadow-md hover:from-red-600 hover:to-pink-600 transition-all duration-200 dark:from-red-700/80 dark:to-pink-800/80 dark:hover:from-red-800 dark:hover:to-pink-900">
            <RiLogoutCircleRLine className="icon text-xl group-hover:scale-110 group-hover:text-white transition-transform duration-200" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;