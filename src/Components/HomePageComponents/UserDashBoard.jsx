import React, { useContext } from "react";

// import Footer from "../Actual_Components/Footer";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import LuxuryFooter from "../Actual_Components/LuxuryFooter";

const UserDashBoard = () => {
  const navigate = useNavigate();
  const { agentData, handleDeleteUser } = useContext(AuthContext);

  const resolveUserId = () => {
    try {
      const raw = localStorage.getItem("mySellerId");
      if (raw) {
        try { return JSON.parse(raw); } catch { return raw; }
      }
      return (agentData && agentData._id) || "";
    } catch {
      return (agentData && agentData._id) || "";
    }
  };

  const goUserEdit = () => {
    const id = resolveUserId();
    if (id) navigate(`/useredit/${id}`);
    else navigate('/userdashboard/');
  };

  const canManageBlogs =
    agentData &&
    typeof agentData.role === "string" &&
    ["contentwriter", "blog"].includes(agentData.role.toLowerCase());

  // Map raw role to a neat display label
  const roleMap = {
    builder: "Builder",
    contentwriter: "Content Writer",
    admin: "Admin",
    client: "Client",
    owner: "Owner",
    blog: "Content Writer",
  };
  const roleLabel = (() => {
    const r = agentData?.role?.toString()?.toLowerCase();
    return roleMap[r] || agentData?.role || "User";
  })();

  let filteredRentProperties = [];
  let filteredSellProperties = [];

  if (agentData && agentData.postProperty) {
    filteredRentProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "rent"
    );
    filteredSellProperties = agentData.postProperty.filter(
      (property) => property.propertyLooking === "Sell"
    );
  } else {
    console.log("agentData or agentData.postProperty is undefined.");
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ overflowX: "hidden" }}>
      {/* Main Container with proper padding for all devices */}
      <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-10">
        
        {/* Dashboard Card */}
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-4 md:mt-6">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
            
            {/* Left Section - User Info */}
            <div className="p-6 sm:p-8 lg:p-10 border-b xl:border-b-0 xl:border-r border-gray-200">
              <div className="space-y-6">
                
                {/* Role Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {roleLabel}
                </div>
                
                {/* User Information Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={agentData?.name || ''}
                      readOnly
                      className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200 text-base sm:text-lg"
                      placeholder="Name"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={agentData?.email || ''}
                      readOnly
                      className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200 text-base sm:text-lg"
                      placeholder="Email"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={agentData?.mobile || ''}
                      readOnly
                      className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200 text-base sm:text-lg"
                      placeholder="Mobile"
                    />
                  </div>
                </div>
                
                {/* Edit Button */}
                <div className="pt-4">
                  <button
                    onClick={goUserEdit}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit / Change Password
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Section - Property Status & Actions */}
            <div className="p-6 sm:p-8 lg:p-10 bg-gray-50">
              <div className="space-y-8">
                
                {/* Property Status Header */}
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Property Status
                  </h2>
                  <p className="text-sm text-gray-600">
                    Overview of your property listings
                  </p>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  {/* Total Listing */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Total Listing
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {agentData?.postProperty?.length || 0}
                    </p>
                  </div>
                  
                  {/* Sell Property */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Sell Property
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {filteredSellProperties.length}
                    </p>
                  </div>
                  
                  {/* Rent Property */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2 12 12 0 01-7 10.7A12 12 0 015 11a2 2 0 012-2m0 0a2 2 0 012-2 12 12 0 017 10.7z" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Rent Property
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {filteredRentProperties.length}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  {/* Blog Management Button (if applicable) */}
                  {canManageBlogs && (
                    <Link
                      to="/seo/blogs"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Go to Blog Panel
                    </Link>
                  )}
                  
                  {/* Post Property Button */}
                  <Link
                    to="/postproperty/"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post Property
                  </Link>
                  
                  {/* Edit Properties Button */}
                  <button
                    onClick={() => navigate(`/userviewproperty/${resolveUserId()}`)}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105 ${canManageBlogs ? 'sm:col-span-2' : ''}`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Post Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <hr className="border-gray-200" />
        </div>
      </div>
      
      {/* Footer */}
      <LuxuryFooter />
    </div>
  );
};

export default UserDashBoard;