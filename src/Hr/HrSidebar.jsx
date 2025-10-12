import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';

const HrSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/hr/dashboard',
      icon: <FaTachometerAlt className="text-xl" />
    },
    {
      name: 'JobPosting',
      path: '/hr/jobposting',
      icon: <FaTachometerAlt className="text-xl" />
    },
    {
      name: 'Employee',
      path: '/hr/employee',
      icon: <FaTachometerAlt className="text-xl" />
    },
    {
      name: 'Leave',
      path: '/hr/leave',
      icon: <FaTachometerAlt className="text-xl" />
    },
   
    {
      name: 'Onboarding',
      path: '/hr/onboarding',
      icon: <FaTachometerAlt className="text-xl" />
    },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem('myToken');
    localStorage.removeItem('agentData');
    localStorage.removeItem('userRole');
    localStorage.removeItem('firstName');
    localStorage.removeItem('mySellerId');
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 border-r border-gray-700
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          <div className="px-4 py-4 border-b border-gray-700 bg-gray-800/50">
            <Link to="/hr/dashboard" className="flex items-center space-x-3 hover:bg-gray-700/50 rounded-lg p-2 transition-all duration-200 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25">
                <span className="text-white font-semibold text-lg">
                  {localStorage.getItem('firstName')?.charAt(0)?.toUpperCase() || 'H'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                  {JSON.parse(localStorage.getItem('agentData'))?.name || 'HR User'}
                </p>           
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                  ${location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <div className={`
                  p-2 rounded-md transition-all duration-200
                  ${location.pathname === item.path
                    ? 'text-white bg-white/20'
                    : 'text-gray-400 group-hover:text-white group-hover:bg-gray-700/50'
                  }
                `}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Logout Button - Fixed at bottom */}
          <div className="px-4 pb-6 mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-red-300 hover:bg-red-600/20 hover:text-red-300 transition-all duration-200 group border-t border-gray-700 pt-4"
            >
              <div className="p-2 rounded-md text-red-400 group-hover:text-white group-hover:bg-red-600/20 transition-all duration-200">
                <FaSignOutAlt className="text-xl" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HrSidebar;
