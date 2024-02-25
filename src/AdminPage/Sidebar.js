import React, { useState } from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaDiagramProject } from 'react-icons/fa6';
import { SiBloglovin } from 'react-icons/si';
import { GoProjectSymlink } from 'react-icons/go';
import { AiFillPropertySafety } from 'react-icons/ai';
import { GiFamilyHouse } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import Header from './Header';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

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
    <div style={{overflowX:"hidden"}}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex h-screen">
        <div className={`w-64 bg-black overflow-auto ${sidebarOpen ? '' : 'hidden'}`}>
          <div className="flex flex-col mt-8 pb-5">
            <Link to="/Admin/dashboard"  className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-0">
              <MdSpaceDashboard className="icon fa-sm m-3" /> Dashboard
            </Link>
            <Link to="/Admin/enquiries"className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <GoProjectSymlink className="icon fa-sm m-3" /> Enquiries
            </Link>
            <Link to="/Admin/Projects" className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-0">
              <FaDiagramProject className="icon fa-sm m-3" /> Projects
            </Link>
            <Link to="/Admin/rent"className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <FaHome className="icon fa-sm m-3" /> Rent
            </Link> 
            <Link to="/Admin/buy" className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <GiFamilyHouse className="icon fa-sm m-3" /> Buy
            </Link>
            <Link to="/Admin/adminProperty"className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <FaHome className="icon fa-sm m-3" /> Properties
            </Link>
            <Link
              to="/Admin/contact"
              onClick={() => {
              toggleDropdown();
              }}
              className="flex items-center hover:bg-gray-400 text-white text-center fa-xl p-0"
            >
              <AiFillPropertySafety className="icon fa-sm m-3" /> Contact Us
            </Link>
            {showDropdown && (
              <div className='bg-black'>
                <Link to="#" onClick={() => toggleClick('contactuser')} className="flex items-center text-white justify-end fa-xl p-3 hover:bg-gray-400">
                  Contact User
                </Link>
                <Link to="#" onClick={() => toggleClick('contactuserproperty')} className="flex items-center text-white justify-end fa-xl p-3  hover:bg-gray-400">
                   User Property
                </Link>
              </div>
            )}
            <Link to="/Admin/blog"  className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <SiBloglovin className="icon fa-sm m-4" /> Blog
            </Link >

            <Link to="/Admin/user"  className="flex items-center hover:bg-gray-400  text-white text-center fa-xl p-0">
              <FaRegUserCircle  className="icon fa-sm m-4" /> User
            </Link >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;










