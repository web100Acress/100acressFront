import React, { useState, useEffect } from "react";
import api from "../config/apiClient";
import Sidebar from "./Sidebar";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { MdPeople, MdSearch, MdVisibility } from "react-icons/md";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { API_ROUTES } from "../Redux/utils/Constant_Service";

const UserAdmin = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | role values
  const [verifyFilter, setVerifyFilter] = useState('all'); // 'all' | 'verified' | 'unverified'
  const [updatingRole, setUpdatingRole] = useState({}); // { [userId]: boolean }
  const [verifyingEmail, setVerifyingEmail] = useState({}); // { [userId]: boolean }

  // Available roles
  const ROLE_OPTIONS = [
    { label: "User", value: "user" },
    { label: "BlogManagement", value: "blog" },
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
    { label: "Owner", value: "owner" },
    { label: "Builder", value: "builder" },
  ];

  // Normalize any incoming role value to one of ROLE_OPTIONS values
  const canonicalizeRole = (role) => {
    try {
      const s = (role || 'user').toString().trim().toLowerCase();
      const allowed = new Set(ROLE_OPTIONS.map(o => o.value));
      return allowed.has(s) ? s : 'user';
    } catch {
      return 'user';
    }
  };

  // Role-based color classes for the select control
  const getRoleClasses = (role) => {
    switch (canonicalizeRole(role)) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'agent':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'builder':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'owner':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'blog':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'user':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myToken = localStorage.getItem("myToken");
        const res = await api.get("/postPerson/view/allusers", {
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        });
        // Canonicalize role values so UI select matches the actual role
        const normalized = (res.data && res.data.data ? res.data.data : []).map(u => ({
          ...u,
          role: canonicalizeRole(u.role),
        }));
        setViewAll(normalized);
      } catch (error) {
        console.log("❌ Failed to fetch users:", error);
      }
    };
    fetchData();
  }, []);

  // Helpers for date sorting
  const getTimestampFromId = (id) => {
    if (!id) return 0;
    const hex = id.toString().substring(0, 8);
    return parseInt(hex, 16) * 1000; // Convert to milliseconds
  };

  const getCreatedAtMs = (item) => {
    if (item?.createdAt) {
      const d = new Date(item.createdAt);
      if (!isNaN(d.getTime())) return d.getTime();
    }
    return getTimestampFromId(item?._id);
  };

  // Verify email (optimistic UI)
  const handleVerifyEmail = async (userId) => {
    // optimistic: set emailVerified true locally
    const prev = viewAll;
    setViewAll((list) =>
      list.map((u) => (u._id === userId ? { ...u, emailVerified: true } : u))
    );
    setVerifyingEmail((m) => ({ ...m, [userId]: true }));

    try {
      const myToken = localStorage.getItem("myToken");
      await api.patch(
        `/postPerson/users/${userId}/email-verified`,
        { emailVerified: true },
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("❌ Failed to verify email", err);
      // revert on error
      setViewAll(prev);
      alert("Failed to verify email. Please try again.");
    } finally {
      setVerifyingEmail((m) => ({ ...m, [userId]: false }));
    }
  };

  // Sort by newest first
  const sortedUsers = [...viewAll].sort(
    (a, b) => getCreatedAtMs(b) - getCreatedAtMs(a)
  );

  // Filter out deleted users (frontend simulation)
  const deletedUsers = JSON.parse(localStorage.getItem("deletedUsers") || "[]");

  const filteredProjects = sortedUsers
    .filter((item) => !deletedUsers.includes(item._id)) // Hide deleted users
    .filter((item) => {
      const q = (searchTerm || "").toLowerCase();
      if (!q) return true;
      const name = (item.name || "").toLowerCase();
      const email = (item.email || "").toLowerCase();
      const mobile = (item.mobile || "").toString().toLowerCase();
      return (
        name.includes(q) || email.includes(q) || mobile.includes(q)
      );
    })
    .filter((item) => {
      if (roleFilter === 'all') return true;
      return canonicalizeRole(item.role) === roleFilter;
    })
    .filter((item) => {
      if (verifyFilter === 'all') return true;
      return verifyFilter === 'verified' ? !!item.emailVerified : !item.emailVerified;
    });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // UI meta for role badges
  const getRoleMeta = (role) => {
    const r = (role || "user").toLowerCase();
    switch (r) {
      case "admin":
        return { label: "Admin", classes: "bg-red-100 text-red-700" };
      case "blog":
        return {
          label: "Content Writer",
          classes: "bg-indigo-100 text-indigo-700",
        };
      case "builder":
        return { label: "Builder", classes: "bg-yellow-100 text-yellow-700" };
      case "owner":
        return { label: "Owner", classes: "bg-orange-100 text-orange-700" };
      case "agent":
        return { label: "Agent", classes: "bg-emerald-100 text-emerald-700" };
      case "client":
        return { label: "Client", classes: "bg-blue-100 text-blue-700" };
      default:
        return { label: "User", classes: "bg-gray-100 text-gray-700" };
    }
  };

  const formatLastModified = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Update role (optimistic UI)
  const handleRoleChange = async (userId, nextRole) => {
    const prev = viewAll;
    // optimistic update
    setViewAll((list) =>
      list.map((u) => (u._id === userId ? { ...u, role: nextRole } : u))
    );
    setUpdatingRole((m) => ({ ...m, [userId]: true }));

    try {
      const myToken = localStorage.getItem("myToken");
      await api.patch(
        `/postPerson/users/${userId}/role`,
        { role: nextRole },
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.error("❌ Failed to update role", err);
      // revert on error
      setViewAll(prev);
      alert("Failed to update role. Please try again.");
    } finally {
      setUpdatingRole((m) => ({ ...m, [userId]: false }));
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        <div className="w-full space-y-4">
          {/* Header Controls: Search (left) and Filters (right) */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            {/* Left: Search */}
            <div className="relative w-full md:max-w-md">
              <Tippy content={<span>Search by name, email or mobile</span>} animation="scale" theme="light-border">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm text-base"
                />
              </Tippy>
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            </div>

            {/* Right: Filters */}
            <div className="flex items-center gap-3">
              {/* Role filter */}
              <select
                className="px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={roleFilter}
                onChange={(e)=>{ setRoleFilter(e.target.value); setCurrentPage(1); }}
                title="Filter by role"
              >
                <option value="all">All Roles</option>
                {ROLE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {/* Verified filter */}
              <select
                className="px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={verifyFilter}
                onChange={(e)=>{ setVerifyFilter(e.target.value); setCurrentPage(1); }}
                title="Filter by email verification"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-red-400 to-red-600 p-6 w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      S No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email Verified
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRows.map((item, index) => {
                    const serialNumber = indexOfFirstRow + index + 1;
                    const userId = item._id;
                    const meta = getRoleMeta(item.role);
                    return (
                      <tr
                        key={userId}
                        className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {serialNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full shadow-sm">
                            {item.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full shadow-sm">
                            {item.mobile}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {formatLastModified(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center">
                            <select
                              className={`px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${getRoleClasses(item.role)} ${
                                updatingRole[userId]
                                  ? "opacity-60 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={!!updatingRole[userId]}
                              value={canonicalizeRole(item.role)}
                              onChange={(e) =>
                                handleRoleChange(userId, e.target.value)
                              }
                              title="Change user role"
                            >
                              {ROLE_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            {updatingRole[userId] && (
                              <span className="ml-2 text-xs text-gray-500">Saving...</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                                item.emailVerified
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {item.emailVerified ? 'Verified' : 'Unverified'}
                            </span>
                            {!item.emailVerified && (
                              <button
                                className={`px-3 py-1 text-xs rounded-full ${verifyingEmail[userId] ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                                onClick={() => handleVerifyEmail(userId)}
                                disabled={!!verifyingEmail[userId]}
                                title="Mark email as verified"
                              >
                                {verifyingEmail[userId] ? 'Verifying...' : 'Verify'}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <Tippy
                            content={<span>View Property</span>}
                            animation="scale"
                            theme="light-border"
                          >
                            <Link to={`/Admin/viewproperty/${userId}`}>
                              <button className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:from-red-500 hover:to-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                <MdVisibility className="text-lg" /> View
                                Property
                              </button>
                            </Link>
                          </Tippy>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from(
                { length: Math.ceil(filteredProjects.length / rowsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      currentPage === index + 1
                        ? "bg-red-500 text-white border-red-500 shadow-md"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
