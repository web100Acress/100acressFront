import React, { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../config/apiClient";
import Sidebar from './Sidebar';

const PAGE_SIZE = 20;

const OtherEnquiries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rows, setRows] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");

  const fetchData = async (p = 1) => {
    try {
      setLoading(true);
      setError("");

      // Fetch from both contact and user endpoints
      const [contactRes, userRes] = await Promise.all([
        api.get(`contact/viewAll`),
        api.get(`userViewAll`)
      ]);

      const contactData = contactRes?.data?.data || [];
      const userData = userRes?.data?.data || [];

      // Add a type field to distinguish between data sources
      const contactDataWithType = contactData.map(item => ({ ...item, enquiryType: 'contact' }));
      const userDataWithType = userData.map(item => ({ ...item, enquiryType: 'user' }));

      // Combine both datasets
      const combinedData = [...contactDataWithType, ...userDataWithType];

      // Sort by createdAt in descending order (newest first)
      const sortedData = combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllData(sortedData);

      // Handle pagination on frontend since backend doesn't support it
      const startIndex = (p - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedData = sortedData.slice(startIndex, endIndex);

      setRows(paginatedData);
      setTotalPages(Math.ceil(sortedData.length / PAGE_SIZE));
      setPage(p);
    } catch (e) {
      console.error("Failed to load enquiries", e);
      setError("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const onPrev = () => { if (page > 1) fetchData(page - 1); };
  const onNext = () => { if (page < totalPages) fetchData(page + 1); };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;

    return rows.filter(r =>
      (r.name || "").toLowerCase().includes(term) ||
      (r.mobile || "").toLowerCase().includes(term) ||
      (r.email || "").toLowerCase().includes(term) ||
      (r.message || "").toLowerCase().includes(term) ||
      ((r.enquiryType === 'contact'
        ? (r.message && r.message.includes('footer_instant_call') ? 'Footer Instant Call' : 'Contact Form')
        : (r.projectName === 'Footer Instant Call' ? 'Footer Instant Call' : 'Project Enquiry')
      ) || "").toLowerCase().includes(term)
    );
  }, [rows, q]);

  const exportCSV = () => {
    const headers = ["SrNo", "Name", "Mobile", "Email", "Message", "Source", "Created At"];
    const dataToExport = filtered;

    const lines = [headers.join(",")];
    dataToExport.forEach((item, idx) => {
      const source = item.enquiryType === 'contact'
        ? (item.message && item.message.includes('footer_instant_call') ? 'Footer Instant Call' : 'Contact Form')
        : (item.projectName === 'Footer Instant Call' ? 'Footer Instant Call' : 'Project Enquiry');

      const row = [
        (page - 1) * PAGE_SIZE + idx + 1,
        JSON.stringify(item.name || ""),
        JSON.stringify(item.mobile || ""),
        JSON.stringify(item.email || ""),
        JSON.stringify(item.message || ""),
        JSON.stringify(source),
        JSON.stringify(new Date(item.createdAt).toLocaleString())
      ];
      lines.push(row.join(","));
    });

    const filename = `all-enquiries-page-${page}.csv`;
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteRow = async (id) => {
    if (!id) return;
    if (!window.confirm(`Delete this enquiry?`)) return;

    try {
      // Find the item to determine its type
      const item = rows.find(r => r._id === id);
      if (!item) return;

      if (item.enquiryType === 'contact') {
        await api.delete(`contact_delete/${id}/delete`);
      } else if (item.enquiryType === 'user') {
        await api.delete(`userdataDelete/delete/${id}`);
      }

      setRows(prev => prev.filter(r => r._id !== id));
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* Filter and Search Section - Simple horizontal layout */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    type="text"
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Status</option>
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Sources</option>
                    <option>Website</option>
                    <option>Phone</option>
                    <option>Email</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Category</option>
                    <option>General</option>
                    <option>Support</option>
                    <option>Sales</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>

                <button className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 hover:from-gray-700 hover:to-gray-800 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading enquiries...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Table Section */}
          {!loading && !error && (
            <>
              <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">No.</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Mobile</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[220px]">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider min-w-[250px]">Message</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((item, idx) => (
                        <tr key={item._id || idx} className="hover:bg-blue-50/50 transition-colors duration-150">
                          <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                            {(page - 1) * PAGE_SIZE + idx + 1}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {(item.name || 'U').charAt(0).toUpperCase()}
                              </div>
                              <span className="text-gray-900 font-semibold">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {item.mobile}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-700 max-w-[220px]">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="truncate" title={item.email}>{item.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            <div className="max-w-[250px] truncate" title={item.message}>
                              {item.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                item.enquiryType === 'contact'
                                  ? (item.message && item.message.includes('footer_instant_call')
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-gray-100 text-gray-800')
                                  : (item.projectName === 'Footer Instant Call'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-green-100 text-green-800')
                              }`}>
                                {item.enquiryType === 'contact'
                                  ? (item.message && item.message.includes('footer_instant_call')
                                      ? 'Footer Instant Call'
                                      : 'Contact Form')
                                  : (item.projectName === 'Footer Instant Call'
                                      ? 'Footer Instant Call'
                                      : 'Project Enquiry')
                                }
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">
                                {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(item.createdAt).toLocaleTimeString('en-IN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => deleteRow(item._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 font-medium text-sm"
                              title="Delete enquiry"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td className="px-6 py-16 text-center" colSpan={7}>
                            <div className="flex flex-col items-center justify-center">
                              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                              <p className="text-gray-500 font-medium text-lg">No enquiries found</p>
                              <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 px-2">
                <button 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all duration-200" 
                  onClick={onPrev} 
                  disabled={page <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg shadow-sm border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Page</span>
                  <span className="text-lg font-bold text-gray-900">{page}</span>
                  <span className="text-sm text-gray-400">of</span>
                  <span className="text-lg font-bold text-gray-900">{totalPages}</span>
                </div>
                <button 
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:from-gray-900 hover:to-black shadow-lg hover:shadow-xl transition-all duration-200" 
                  onClick={onNext} 
                  disabled={page >= totalPages}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherEnquiries;