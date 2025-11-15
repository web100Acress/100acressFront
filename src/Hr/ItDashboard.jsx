import React, { useState, useEffect } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { FaSearch, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ItDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [users, searchText, statusFilter, roleFilter]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("myToken") || localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        return;
      }

      const response = await api.get("/api/hr/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.mobile?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Sort by createdAt - newest first
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });

    setFilteredUsers(filtered);
  };

  const handleAuthorize = async (userId, currentStatus) => {
    setActionLoading(userId);
    try {
      const token =
        localStorage.getItem("myToken") || localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        return;
      }

      const validStatuses = ["authorized", "unauthorized"];
      const currentStatusValue = validStatuses.includes(currentStatus)
        ? currentStatus
        : "unauthorized";

      const newStatus =
        currentStatusValue === "authorized" ? "unauthorized" : "authorized";

      const requestData = { status: newStatus };

      await api.post(`/api/hr/user/${userId}/status`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllUsers();
    } catch (error) {
      console.error("API Error:", error.response?.data);
      alert(error.response?.data?.message || "Failed to update user status. Please check console for details.");
    } finally {
      setActionLoading(null);
    }
  };

  const getStats = () => {
    const total = users.length;
    const authorized = users.filter((u) => u.status === "authorized").length;
    const unauthorized = users.filter(
      (u) => u.status === "unauthorized" || !u.status
    ).length;
    return { total, authorized, unauthorized };
  };

  const stats = getStats();
  const uniqueRoles = [...new Set(users.map((u) => u.role).filter(Boolean))];

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      hr: "bg-green-100 text-green-800",
      it: "bg-blue-100 text-blue-800",
      seller: "bg-orange-100 text-orange-800",
      builder: "bg-purple-100 text-purple-800",
      agent: "bg-cyan-100 text-cyan-800",
    };
    return colors[role?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      
      <div className="flex-1 p-2 sm:p-4 lg:p-6 ml-0 md:-ml-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-2 tracking-tight text-center">
              Users Management
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 mx-auto"></div>
            <p className="text-gray-600 text-center">
              Manage and authorize all system users
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{stats.total}</p>
                </div>
                <FaUsers className="text-blue-400 text-3xl opacity-70" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Authorized</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.authorized}</p>
                </div>
                <FaCheckCircle className="text-green-400 text-3xl opacity-70" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Unauthorized</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{stats.unauthorized}</p>
                </div>
                <FaTimesCircle className="text-red-400 text-3xl opacity-70" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{marginTop: '0px'}}>
            {/* Filters */}
            <div className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="relative lg:col-span-2">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search name, email, mobile..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="all">All Status</option>
                  <option value="authorized">Authorized</option>
                  <option value="unauthorized">Unauthorized</option>
                </select>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="all">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role?.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500">
                <span>Showing {filteredUsers.length} of {users.length} users</span>
                <button
                  onClick={fetchAllUsers}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>

            {/* Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Mobile</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500 text-sm">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {user.name || "—"}
                        </td>
                        <td className="px-4 py-3 text-blue-600 text-xs">
                          {user.email || "—"}
                        </td>
                        <td className="px-4 py-3 text-green-600 font-medium text-sm">
                          {user.mobile || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {user.role?.toUpperCase() || "USER"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "authorized"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {user.status === "authorized" ? "Authorized" : "Unauthorized"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleAuthorize(user._id, user.status)}
                            disabled={actionLoading === user._id}
                            className={`px-3 py-1 text-xs font-medium rounded transition ${
                              user.status === "authorized"
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            } disabled:opacity-50`}
                          >
                            {actionLoading === user._id ? "..." : user.status === "authorized" ? "Revoke" : "Authorize"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className="lg:hidden divide-y divide-gray-200">
              {loading ? (
                <div className="p-6 text-center text-gray-500 text-sm">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">No users found</div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user._id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm truncate">{user.name || "—"}</h3>
                        <p className="text-xs text-blue-600 truncate">{user.email || "—"}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "authorized"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status === "authorized" ? "✓" : "✕"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mobile:</span>
                        <span className="text-green-600 font-medium">{user.mobile || "—"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role:</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                          {user.role?.toUpperCase() || "USER"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAuthorize(user._id, user.status)}
                      disabled={actionLoading === user._id}
                      className={`w-full px-3 py-2 text-xs font-medium rounded transition ${
                        user.status === "authorized"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } disabled:opacity-50`}
                    >
                      {actionLoading === user._id ? "Loading..." : user.status === "authorized" ? "Revoke Access" : "Authorize"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItDashboard;