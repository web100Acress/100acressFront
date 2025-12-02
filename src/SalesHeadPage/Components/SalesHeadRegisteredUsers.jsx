import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiBase } from "../../config/apiBase";
import SalesHeadSidebar from "../SalesHeadSidebar";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { MdPeople, MdSearch, MdVisibility } from "react-icons/md";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const UserAdmin = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState('all');
  const [verifyFilter, setVerifyFilter] = useState('all');
  const [updatingRole, setUpdatingRole] = useState({});
  const [verifyingEmail, setVerifyingEmail] = useState({});
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sourceFilter, setSourceFilter] = useState('all');

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const ROLE_OPTIONS = [
    { label: "User", value: "user" },
    { label: "BlogManagement", value: "blog" },
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
    { label: "Owner", value: "owner" },
    { label: "Builder", value: "builder" },
    { label: "HR", value: "hr" },
  ];

  const canonicalizeRole = (role) => {
    try {
      const s = (role || 'user').toString().trim().toLowerCase();
      const allowed = new Set(ROLE_OPTIONS.map(o => o.value));
      return allowed.has(s) ? s : 'user';
    } catch {
      return 'user';
    }
  };

  const getRoleClasses = (role) => {
    switch (canonicalizeRole(role)) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'hr':
        return 'bg-green-100 text-green-700 border-green-200';
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
        const base = getApiBase();
        const myToken = localStorage.getItem("myToken");
        const res = await axios.get(`${base}/postPerson/view/allusers/saleshead`, {
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        });
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

  const SOURCE_KEYS = ['source', 'signupSource', 'provider', 'origin'];
  const getSourceValue = (u) => {
    try {
      for (const k of SOURCE_KEYS) {
        const v = u && u[k];
        if (v !== undefined && v !== null && String(v).trim() !== '') {
          return String(v).trim();
        }
      }
      return 'unknown';
    } catch {
      return 'unknown';
    }
  };

  const getTimestampFromId = (id) => {
    if (!id) return 0;
    const hex = id.toString().substring(0, 8);
    return parseInt(hex, 16) * 1000;
  };

  const getCreatedAtMs = (item) => {
    if (item?.createdAt) {
      const d = new Date(item.createdAt);
      if (!isNaN(d.getTime())) return d.getTime();
    }
    return getTimestampFromId(item?._id);
  };

  const handleVerifyEmail = async (userId) => {
    const prev = viewAll;
    setViewAll((list) =>
      list.map((u) => (u._id === userId ? { ...u, emailVerified: true } : u))
    );
    setVerifyingEmail((m) => ({ ...m, [userId]: true }));

    try {
      const base = getApiBase();
      const myToken = localStorage.getItem("myToken");
      await axios.patch(
        `${base}/postPerson/users/${userId}/email-verified`,
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
      setViewAll(prev);
      alert("Failed to verify email. Please try again.");
    } finally {
      setVerifyingEmail((m) => ({ ...m, [userId]: false }));
    }
  };

  const sortedUsers = [...viewAll].sort(
    (a, b) => getCreatedAtMs(b) - getCreatedAtMs(a)
  );

  const deletedUsers = JSON.parse(localStorage.getItem("deletedUsers") || "[]");

  const filteredProjects = sortedUsers
    .filter((item) => !deletedUsers.includes(item._id))
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
      if (sourceFilter === 'all') return true;
      return getSourceValue(item) === sourceFilter;
    })
    .filter((item) => {
      if (!dateFrom && !dateTo) return true;
      const created = getCreatedAtMs(item);
      if (dateFrom) {
        const fromMs = new Date(dateFrom + 'T00:00:00').getTime();
        if (created < fromMs) return false;
      }
      if (dateTo) {
        const toMs = new Date(dateTo + 'T23:59:59').getTime();
        if (created > toMs) return false;
      }
      return true;
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

  const exportToCSV = () => {
    const rows = filteredProjects;
    const headers = [
      'S No',
      'Name',
      'Email',
      'Mobile',
      'Role',
      'Email Verified',
      'Created At',
      'User ID',
    ];
    const csv = [headers.join(',')]
      .concat(
        rows.map((u, idx) => {
          const vals = [
            (idx + 1).toString(),
            (u.name || '').replaceAll('"', '""'),
            (u.email || '').replaceAll('"', '""'),
            (u.mobile || '').toString().replaceAll('"', '""'),
            canonicalizeRole(u.role),
            u.emailVerified ? 'Yes' : 'No',
            formatLastModified(u.createdAt || getCreatedAtMs(u)),
            u._id || '',
          ];
          return vals
            .map((v) => `"${v}"`)
            .join(',');
        })
      )
      .join('\n');
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getRoleMeta = (role) => {
    const r = (role || "user").toLowerCase();
    switch (r) {
      case "admin":
        return { label: "Admin", classes: "bg-red-100 text-red-700" };
      case "hr":
        return { label: "HR", classes: "bg-green-100 text-green-700" };
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

  const handleRoleChange = async (userId, nextRole) => {
    const prev = viewAll;
    setViewAll((list) =>
      list.map((u) => (u._id === userId ? { ...u, role: nextRole } : u))
    );
    setUpdatingRole((m) => ({ ...m, [userId]: true }));

    try {
      const base = getApiBase();
      const myToken = localStorage.getItem("myToken");
      await axios.patch(
        `${base}/postPerson/users/${userId}/role`,
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
      setViewAll(prev);
      alert("Failed to update role. Please try again.");
    } finally {
      setUpdatingRole((m) => ({ ...m, [userId]: false }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SalesHeadSidebar />
      <div className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 lg:px-6 py-4 overflow-x-hidden">
        <div className="w-full space-y-4">
          {/* Header Controls */}
          <div className="flex flex-col gap-4 lg:gap-3">
            {/* Search Row */}
            <div className="relative w-full">
              <Tippy content={<span>Search by name, email or mobile</span>} animation="scale" theme="light-border">
                <input
                  type="text"
                  placeholder="Search by name, email or mobile..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white text-sm md:text-base"
                />
              </Tippy>
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
              {/* Role filter */}
              <select
                className="px-3 py-2 border-2 border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
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
                className="px-3 py-2 border-2 border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
                value={verifyFilter}
                onChange={(e)=>{ setVerifyFilter(e.target.value); setCurrentPage(1); }}
                title="Filter by email verification"
              >
                <option value="all">All</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>

              {/* Source filter */}
              {(() => {
                const options = Array.from(new Set(viewAll.map(getSourceValue))).filter(Boolean).sort();
                return (
                  <select
                    className="px-3 py-2 border-2 border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
                    value={sourceFilter}
                    onChange={(e)=>{ setSourceFilter(e.target.value); setCurrentPage(1); }}
                    title="Filter by source"
                  >
                    <option value="all">All Sources</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                );
              })()}

              {/* Date From */}
              <input
                type="date"
                className="px-3 py-2 border-2 border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
                value={dateFrom}
                onChange={(e)=>{ setDateFrom(e.target.value); setCurrentPage(1); }}
                title="Registered from date"
              />

              {/* Date To */}
              <input
                type="date"
                className="px-3 py-2 border-2 border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-white"
                value={dateTo}
                onChange={(e)=>{ setDateTo(e.target.value); setCurrentPage(1); }}
                title="Registered to date"
              />

              {/* Export CSV */}
              <button
                onClick={exportToCSV}
                className="px-3 md:px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs md:text-sm font-semibold transition transform hover:scale-105 shadow-md"
                title="Export filtered users to CSV"
              >
                📥 Export CSV
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">S No.</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Name</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Email</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Mobile</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Date</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Role</th>
                    <th className="px-3 md:px-4 py-4 text-left text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Verified</th>
                    <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentRows.map((item, index) => {
                    const serialNumber = indexOfFirstRow + index + 1;
                    const userId = item._id;
                    const meta = getRoleMeta(item.role);
                    return (
                      <tr
                        key={userId}
                        className="hover:bg-blue-50 transition-colors even:bg-gray-50"
                      >
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm font-medium text-gray-800">
                          {serialNumber}
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm text-gray-800">
                          <Tippy
                            content={item.name || 'No name'}
                            animation="scale"
                            theme="light"
                            placement="top"
                          >
                            <span className="cursor-help font-medium">
                              {truncateText(item.name || 'No name', 2)}
                            </span>
                          </Tippy>
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 font-medium rounded-lg text-xs">
                            {item.email}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 font-medium rounded-lg text-xs">
                            {item.mobile}
                          </span>
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm text-gray-700">
                          {formatLastModified(item.createdAt)}
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                          <select
                            className={`px-2 py-1 border-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-200 ${getRoleClasses(item.role)} ${
                              updatingRole[userId] ? "opacity-60 cursor-not-allowed" : ""
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
                            <span className="text-xs text-gray-500 ml-1">Saving...</span>
                          )}
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                                item.emailVerified
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {item.emailVerified ? '✓ Verified' : '✗ Unverified'}
                            </span>
                            {!item.emailVerified && (
                              <button
                                className={`px-2 py-1 text-xs rounded-lg font-semibold transition ${verifyingEmail[userId] ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                                onClick={() => handleVerifyEmail(userId)}
                                disabled={!!verifyingEmail[userId]}
                                title="Mark email as verified"
                              >
                                {verifyingEmail[userId] ? 'Verifying...' : 'Verify'}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-3 whitespace-nowrap text-center text-xs md:text-sm">
                          <Tippy
                            content={<span>View Property</span>}
                            animation="scale"
                            theme="light-border"
                          >
                            <Link to={`/Admin/viewproperty/${userId}`}>
                              <button className="inline-flex items-center gap-1 px-3 md:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md transition transform hover:scale-105 text-xs md:text-sm font-semibold">
                                <MdVisibility size={16} /> View
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
            <div className="flex justify-center items-center gap-2 flex-wrap py-6 px-4 bg-gray-50 border-t">
              {(() => {
                const totalPages = Math.ceil(filteredProjects.length / rowsPerPage) || 1;
                const windowSize = 5;
                const start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                const end = Math.min(totalPages, start + windowSize - 1);
                const pages = [];
                for (let p = Math.max(1, end - windowSize + 1); p <= end; p++) pages.push(p);
                return (
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm font-bold border-2 transition ${currentPage === 1 ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500'}`}
                    >
                      ← Prev
                    </button>
                    {pages.map((p) => (
                      <button
                        key={p}
                        onClick={() => paginate(p)}
                        className={`w-9 h-9 md:w-10 md:h-10 rounded-lg text-sm font-bold border-2 transition ${currentPage === p ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500'}`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm font-bold border-2 transition ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' : 'bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500'}`}
                    >
                      Next →
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;