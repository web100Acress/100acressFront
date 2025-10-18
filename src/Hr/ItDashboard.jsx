import React, { useState, useEffect } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";

const ItDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

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

      const response = await api.get("/postPerson/view/allusers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.data || []);
      alert(`Loaded ${response.data.data?.length || 0} users successfully`);
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

    setFilteredUsers(filtered);
  };

  const handleAuthorize = async (userId, currentStatus) => {
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

      await api.post(`/api/hr/user/${userId}/status`, requestData);

      alert(
        `User ${
          newStatus === "authorized" ? "authorized" : "unauthorized"
        } successfully`
      );
      fetchAllUsers();
    } catch (error) {
      console.error("API Error:", error.response?.data);
      alert(error.response?.data?.message || "Failed to update user status");
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

  const getRoleColor = (role) => {
    const roleColors = {
      admin: "red",
      hr: "green",
      it: "blue",
      seller: "orange",
      builder: "purple",
      agent: "cyan",
      user: "default",
    };
    return roleColors[role?.toLowerCase()] || "default";
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10 ml-0 md:ml-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              👥 All Users Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and authorize all system users from one place
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="text-blue-500 text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Authorized</p>
                  <p className="text-3xl font-bold text-green-600">{stats.authorized}</p>
                </div>
                <div className="text-green-500 text-4xl">✅</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Unauthorized</p>
                  <p className="text-3xl font-bold text-red-600">{stats.unauthorized}</p>
                </div>
                <div className="text-red-500 text-4xl">❌</div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-lg shadow-xl border-0 p-6">
            {/* Filters */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, email, or mobile"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-md"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                  </div>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <option value="all">All Status</option>
                  <option value="authorized">✅ Authorized</option>
                  <option value="unauthorized">❌ Unauthorized</option>
                </select>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-shadow"
                >
                  <option value="all">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>
                      {role?.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Showing {filteredUsers.length} of {users.length} users
                </span>
                <span>
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-blue-600 font-mono">
                            {user.email || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-green-600 font-medium">
                            {user.mobile || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : user.role === "hr"
                                ? "bg-green-100 text-green-800"
                                : user.role === "it"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "seller"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role?.toUpperCase() || "USER"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "authorized"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status === "authorized" ? "✅ Authorized" : "❌ Unauthorized"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleAuthorize(user._id, user.status)}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                              user.status === "authorized"
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {user.status === "authorized" ? "Revoke" : "Authorize"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={fetchAllUsers}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItDashboard;
