import React, { useContext, useEffect, useState } from "react";

// import Footer from "../Actual_Components/Footer";
import { AuthContext } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CrimsonEleganceFooter from "../../Home/Footer/CrimsonEleganceFooter";
// import LikedProjectsSection from "./LikedProjectsSection";
import SuggestedProjects from "./SuggestedProjects";
import {
  hydrateFavoritesFromServer,
  subscribe,
  getFavorites,
  getFavoritesData,
} from "../../Utils/favorites";
import api from "../../config/apiClient";
// import axios from 'axios';
import LeaveForm from "../LeaveForm";
import showToast from "../../Utils/toastUtils";

const UserDashBoard = () => {
  const navigate = useNavigate();
  const { agentData, loading } = useContext(AuthContext);
  const [favIds, setFavIds] = useState(() => getFavorites());
  const [favData, setFavData] = useState(() => getFavoritesData());
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("myToken");
        if (!token) {
          navigate("/login");
          return;
        }

        // If agentData is not available, try to fetch it
        if (!agentData?._id) {
          const email = JSON.parse(localStorage.getItem("agentData"))?.email;
          if (email) {
            const response = await api.get(`/postPerson/Role/${email}`);
            if (response.data?.User) {
              setUserData(response.data.User);
            }
          }
        } else {
          setUserData(agentData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast.error("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    const testApiConnection = async () => {
      try {
        console.log("Testing API connection...");
        const testResponse = await api.get("/test");
        console.log("Test API response:", testResponse.data);

        // Also test the actual endpoint we need
        const email = JSON.parse(localStorage.getItem("agentData"))?.email;
        if (email) {
          console.log("Testing user data endpoint with email:", email);
          const userResponse = await api.get(`/postPerson/Role/${email}`);
          console.log("User data endpoint response:", userResponse.data);
        }
      } catch (error) {
        console.error("API test failed:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url,
        });
        showToast.error("API connection test failed");
      }
    };

    fetchUserData();
    testApiConnection();

    // Subscribe to favorites changes
    hydrateFavoritesFromServer();
    const unsub = subscribe((newIds) => {
      setFavIds(newIds || []);
      setFavData(getFavoritesData());
    });

    return unsub;
  }, [agentData, navigate]);

  // Use userData instead of agentData throughout the component
  const displayData = userData || agentData;

  const resolveUserId = () => {
    try {
      const raw = localStorage.getItem("mySellerId");
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return raw;
        }
      }
      return (displayData && displayData._id) || "";
    } catch {
      return (displayData && displayData._id) || "";
    }
  };

  const goUserEdit = () => {
    const id = resolveUserId();
    if (id) navigate(`/useredit/${id}`);
    else navigate("/userdashboard/");
  };

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
    const r = displayData?.role?.toString()?.toLowerCase();
    return roleMap[r] || displayData?.role || "User";
  })();

  let filteredRentProperties = [];
  let filteredSellProperties = [];
  let underReviewProperties = [];
  let publishedProperties = [];

  if (displayData?.postProperty) {
    filteredRentProperties = displayData.postProperty.filter(
      (property) => property.propertyLooking === "rent",
    );
    filteredSellProperties = displayData.postProperty.filter(
      (property) => property.propertyLooking === "Sell",
    );
    underReviewProperties = displayData.postProperty.filter(
      (property) => property.verify !== "verified",
    );
    publishedProperties = displayData.postProperty.filter(
      (property) => property.verify === "verified",
    );
  } else {
    console.log("agentData or agentData.postProperty is undefined.");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
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
                      value={displayData?.name || ""}
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
                      value={displayData?.email || ""}
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
                      value={displayData?.mobile || ""}
                      readOnly
                      className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200 text-base sm:text-lg"
                      placeholder="Mobile"
                    />
                  </div>
                </div>

                {/* Edit and Leave Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={goUserEdit}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit / Change Password
                  </button>
                  {displayData?.status === "authorized" && (
                    <button
                      onClick={() => setIsLeaveModalOpen(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Apply for Leave
                    </button>
                  )}
                </div>

                {/* Recent Properties Summary */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Recent Properties
                  </h3>
                  {displayData?.postProperty && displayData.postProperty.length > 0 ? (
                    <div className="space-y-3">
                      {displayData.postProperty.slice(0, 3).map((property, index) => (
                        <div key={property._id || index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-start space-x-3">
                            {/* Property Thumbnail */}
                            <div className="flex-shrink-0">
                              {property.frontImage ? (
                                <img 
                                  src={property.frontImage} 
                                  alt={property.propertyName || 'Property'}
                                  className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            
                            {/* Property Details */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {property.propertyName || 'Untitled Property'}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {property.city || 'No city'}, {property.state || 'No state'}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  property.verify === 'verified' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {property.verify === 'verified' ? 'Published' : 'Under Review'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {property.propertyLooking === 'Sell' ? 'For Sale' : 'For Rent'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Price */}
                            <div className="flex-shrink-0 text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                ₹{property.price || '0'} {property.priceunits || ''}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {property.area || '0'} {property.areaUnit || ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {displayData.postProperty.length > 3 && (
                        <button
                          onClick={() => navigate(`/userviewproperty/${resolveUserId()}`)}
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View all {displayData.postProperty.length} properties →
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">No properties posted yet</p>
                      <Link
                        to="/postproperty/"
                        className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Post your first property →
                      </Link>
                    </div>
                  )}
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
                    Overview of your property listings — click a card to view
                  </p>
                </div>

                {/* Stats Grid - Clickable */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                    <button
                      type="button"
                      onClick={() => navigate(`/userviewproperty/${resolveUserId()}`, { state: { filter: "all" } })}
                      className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Listing</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{displayData?.postProperty?.length || 0}</p>
                      <p className="text-xs text-blue-600 mt-1 opacity-0 group-hover:opacity-100">Click to view →</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/userviewproperty/${resolveUserId()}`, { state: { filter: "published" } })}
                      className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Published</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{publishedProperties.length}</p>
                      <p className="text-xs text-green-600 mt-1 opacity-0 group-hover:opacity-100">Click to view →</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/userviewproperty/${resolveUserId()}`, { state: { filter: "under_review" } })}
                      className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-yellow-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Under Review</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{underReviewProperties.length}</p>
                      <p className="text-xs text-yellow-600 mt-1 opacity-0 group-hover:opacity-100">Click to view →</p>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
                    <button
                      type="button"
                      onClick={() => navigate(`/userviewproperty/${resolveUserId()}`, { state: { filter: "sell" } })}
                      className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Sell Property</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{filteredSellProperties.length}</p>
                      <p className="text-xs text-purple-600 mt-1 opacity-0 group-hover:opacity-100">Click to view →</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(`/userviewproperty/${resolveUserId()}`, { state: { filter: "rent" } })}
                      className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2 12 12 0 01-7 10.7A12 12 0 015 11a2 2 0 012-2m0 0a2 2 0 012-2 12 12 0 017 10.7z" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Rent Property</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{filteredRentProperties.length}</p>
                      <p className="text-xs text-indigo-600 mt-1 opacity-0 group-hover:opacity-100">Click to view →</p>
                    </button>
                  </div>
                </div>

                {/* Draft hint + Action Buttons */}
                {(() => {
                  try {
                    const draft = localStorage.getItem("postPropertyDraftAutoSave");
                    const hasDraft = draft && JSON.parse(draft)?.sellProperty;
                    return hasDraft ? (
                      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm font-medium text-amber-800">
                              You have a saved draft
                            </span>
                          </div>
                          <Link 
                            to="/postproperty/" 
                            className="text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
                          >
                            Continue
                          </Link>
                        </div>
                        <div className="mt-2 text-xs text-amber-600">
                          Draft saved {(() => {
                            try {
                              const draftData = JSON.parse(draft);
                              const savedTime = new Date(draftData.savedAt);
                              const now = new Date();
                              const diffMs = now - savedTime;
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHours = Math.floor(diffMs / 3600000);
                              const diffDays = Math.floor(diffMs / 86400000);
                              
                              if (diffMins < 60) return `${diffMins} minutes ago`;
                              if (diffHours < 24) return `${diffHours} hours ago`;
                              return `${diffDays} days ago`;
                            } catch {
                              return 'recently';
                            }
                          })()}
                          {(() => {
                            try {
                              const draftData = JSON.parse(draft);
                              const completion = draftData.completionPercentage || 0;
                              return ` • ${completion}% complete`;
                            } catch {
                              return '';
                            }
                          })()}
                        </div>
                      </div>
                    ) : null;
                  } catch { return null; }
                })()}
                <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <Link
                    to="/postproperty/"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Post Property
                  </Link>

                  {/* Edit Properties Button */}
                  <button
                    onClick={() =>
                      navigate(`/userviewproperty/${resolveUserId()}`)
                    }
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Post Properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <LikedProjectsSection /> */}

      {/* Suggested Projects */}
      <SuggestedProjects />

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <hr className="border-gray-200" />
        </div>
      </div>

      {/* Leave Modal - Simple JSX Modal */}
      <LeaveForm
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      {/* Footer */}
      <CrimsonEleganceFooter />
    </div>
  );
};

export default UserDashBoard;
