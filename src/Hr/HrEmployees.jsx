import React, { useState, useEffect } from "react";
import api from "../config/apiClient";
import { showToast } from "../Utils/toastUtils";
import HrSidebar from './HrSidebar';
import { MdSearch } from "react-icons/md";

const HrEmployees = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState('all');
  const [verifyFilter, setVerifyFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

  const getCreatedAtMs = (item) => {
    if (item?.createdAt) {
      const d = new Date(item.createdAt);
      if (!isNaN(d.getTime())) return d.getTime();
    }
    return parseInt(item?._id?.toString().substring(0, 8), 16) * 1000 || 0;
  };

  const sortedUsers = [...viewAll].sort(
    (a, b) => getCreatedAtMs(b) - getCreatedAtMs(a)
  );

  const filteredProjects = sortedUsers
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusUpdate = async (userId, currentStatus) => {
    try {
      const myToken = localStorage.getItem("myToken");
      if (!myToken) {
        showToast.error(showToast.errorMessages.authError);
        return;
      }

      console.log('HrEmployees handleStatusUpdate called with:', { userId, currentStatus });

      // Ensure we have a valid status value
      const validStatuses = ['authorized', 'unauthorized'];
      const currentStatusValue = validStatuses.includes(currentStatus) ? currentStatus : 'unauthorized';

      const newStatus = currentStatusValue === 'authorized' ? 'unauthorized' : 'authorized';
      console.log('Calculated newStatus:', newStatus, 'for user:', userId);

      const requestData = { status: newStatus };
      console.log('HrEmployees Request data:', requestData);

      await api.post(`/api/hr/user/${userId}/status`, requestData, {
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json",
        },
      });

      // Update the local state
      setViewAll(prev => prev.map(user => user._id === userId ? { ...user, status: newStatus } : user));
      showToast.success(`User ${newStatus} successfully`);
    } catch (error) {
      console.log("❌ Failed to update user status:", error);
      showToast.error(error.response?.data?.message || showToast.errorMessages.saveError);
    }
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <HrSidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        <div className="w-full space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by name, email or mobile"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm text-base"
              />
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            </div>

            <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
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

              <input
                type="date"
                className="px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={dateFrom}
                onChange={(e)=>{ setDateFrom(e.target.value); setCurrentPage(1); }}
                title="Registered from date"
              />

              <input
                type="date"
                className="px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={dateTo}
                onChange={(e)=>{ setDateTo(e.target.value); setCurrentPage(1); }}
                title="Registered to date"
              />
            </div>
          </div>

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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Authorized
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRows.map((item, index) => {
                    const serialNumber = indexOfFirstRow + index + 1;
                    const meta = getRoleMeta(item.role);
                    return (
                      <tr
                        key={item._id}
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
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${meta.classes}`}>
                            {meta.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                              item.emailVerified
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {item.emailVerified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                              item.status === 'authorized'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {item.status === 'authorized' ? 'Authorized' : 'Unauthorized'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <button
                            onClick={() => handleStatusUpdate(item._id, item.status)}
                            className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                              item.status === 'authorized'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {item.status === 'authorized' ? 'Unauthorize' : 'Authorize'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {(() => {
                const totalPages = Math.ceil(filteredProjects.length / rowsPerPage) || 1;
                const windowSize = 5;
                const start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                const end = Math.min(totalPages, start + windowSize - 1);
                const pages = [];
                for (let p = Math.max(1, end - windowSize + 1); p <= end; p++) pages.push(p);
                return (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                    >
                      Previous
                    </button>
                    {pages.map((p) => (
                      <button
                        key={p}
                        onClick={() => paginate(p)}
                        className={`w-10 h-10 rounded-lg font-semibold border ${currentPage === p ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                    >
                      Next
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

export default HrEmployees;
