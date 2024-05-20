import React, { useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { SiBloglovin } from "react-icons/si";
import { GoProjectSymlink } from "react-icons/go";
import { AiFillPropertySafety } from "react-icons/ai";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidGraduation } from "react-icons/bi";
const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleClick = (option) => {
    console.log(`Option clicked: ${option}`);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex h-auto">
        <div
          className={`fixed top-0 left-0 h-full w-60 bg-black overflow-auto ${
            sidebarOpen ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <Link
              to="/Admin/dashboard"
              className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-1"
            >
              <MdSpaceDashboard className="icon fa-sm m-3.5" />
              <span className="text-lg font-semibold">Dashboard</span>
            </Link>
            <Link
              to="/Admin/enquiries"
              className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-1"
            >
              <GoProjectSymlink className="icon fa-sm m-3.5" />
              <span className="text-lg font-semibold">Enquiries</span>
            </Link>

            <Link
              to="/Admin/Projects/property"
              className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-0"
            >
              <FaDiagramProject className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Projects</span>
            </Link>
            <Link
              to="/Admin/rent"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <FaHome className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Rent</span>
            </Link>
            <Link
              to="/Admin/buy"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <GiFamilyHouse className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Buy</span>
            </Link>
            <Link
              to="/Admin/adminProperty"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <FaHome className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Properties</span>
            </Link>
            <Link
              to="/Admin/contact"
              onClick={() => {
                toggleDropdown();
              }}
              className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-0"
            >
              <AiFillPropertySafety className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Contact Us</span>
            </Link>

            {showDropdown && (
              <div className="bg-black">
                <Link
                  to="#"
                  onClick={() => toggleClick("contactuser")}
                  className="flex items-center text-white justify-end fa-xl p-3 hover:bg-gray-400"
                >
                  <span className="text-lg font-semibold m-3.5">
                    Contact User
                  </span>
                </Link>
                <Link
                  to="#"
                  onClick={() => toggleClick("contactuserproperty")}
                  className="flex items-center text-white justify-end fa-xl p-3  hover:bg-gray-400"
                >
                  <span className="text-lg font-semibold m-3.5">
                    User Property
                  </span>
                </Link>
              </div>
            )}
            <Link
              to="/Admin/blog"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <SiBloglovin className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">Blog</span>
            </Link>

            <Link
              to="/Admin/career"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <BiSolidGraduation size={25} className="icon fa-sm m-3.5 " />{" "}
              <span className="text-lg font-semibold">Career</span>
            </Link>

            <Link
              to="/Admin/user"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <FaRegUserCircle className="icon fa-sm m-3.5" />{" "}
              <span className="text-lg font-semibold">User</span>
            </Link>

            <Link
              to="/Admin/userdetails"
              className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0"
            >
              <FaRegUserCircle className="icon fa-sm m-3.5" />
              <span className="text-lg font-semibold"> User Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
