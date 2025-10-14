import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FaUsers, FaSignOutAlt } from 'react-icons/fa';

const RoleBasedHeader = () => {
  const { isAdmin, isHr, agentData } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('myToken');
    localStorage.removeItem('agentData');
    localStorage.removeItem('userRole');
    localStorage.removeItem('firstName');
    localStorage.removeItem('mySellerId');
    window.location.href = '/';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              100Acress
            </Link>
          </div>

          {/* Role-based Navigation */}
          <div className="flex items-center space-x-6">
            {isAdmin && (
              <Link
                to="/admin/user"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Panel
              </Link>
            )}

            {isHr && (
              <Link
                to="/hr/dashboard"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <FaUsers className="mr-2" />
                HR Department
              </Link>
            )}

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Welcome, </span>
                <span className="font-medium text-gray-900">
                  {agentData?.name || localStorage.getItem('firstName') || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-md transition-colors"
                title="Logout"
              >
                <FaSignOutAlt className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedHeader;
