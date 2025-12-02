import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getApiBase } from '../config/apiBase';

import SalesHeadSidebar from "./SalesHeadSidebar";
import BackToTopButton from "../Pages/BackToTopButton";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Enquiries = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 1000;
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [includeDeletedExport, setIncludeDeletedExport] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const tokenRaw = localStorage.getItem("myToken") || "";
  const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");

  const selectAllRef = useRef(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedIds.length > 0 && selectedIds.length < data.length;
    }
  }, [selectedIds, data.length]);

  const fetchData = async (page = 1) => {
    setLoading(true);

    try {
      const base = getApiBase();
      const response = await axios.get(
        `${base}/userViewAll?limit=${pageSize}&page=${page}&search=${encodeURIComponent(search)}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          }
        }
      );

      if (response.status !== 200) {
        messageApi.open({
          type: "error",
          content: "Error While Fetching Data",
          duration: 2,
        });
        console.error("Failed to fetch data");
      }

      const payload = response.data;
      let rows = [];
      if (Array.isArray(payload?.data)) rows = payload.data;
      else if (Array.isArray(payload?.users)) rows = payload.users;
      else if (Array.isArray(payload)) rows = payload;
      
      const filteredRows = rows.filter((r) => !(/footer\s*instant\s*call/i.test((r?.projectName || '').trim())));
      setData(filteredRows);
      setTotal(payload?.total || payload?.data?.[0]?.totalCount || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
      messageApi.open({
        type: "error",
        content: "Error fetching data. Please try again.",
        duration: 2,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleClick = (pageNumber) => {
    fetchData(pageNumber);
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1);
    }
  };

  const loadBack = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  const formatDateTime = (dt) => {
    try {
      return new Date(dt).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    } catch (_) {
      return dt || '';
    }
  };

  const updateEnquiry = async (id, payload) => {
    try {
      const base = getApiBase();
      await axios.post(`${base}/userUpdate/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      messageApi.success("Updated successfully");
      fetchData(currentPage);
    } catch (e) {
      console.error(e);
      messageApi.error("Failed to update");
      throw e;
    }
  };

  const handleDelete = async (item) => {
    try {
      const confirmed = window.confirm(`Delete enquiry for ${item.name || item.mobile}?`);
      if (!confirmed) return;
      const base = getApiBase();
      const res = await axios.delete(`${base}/userdataDelete/delete/${item._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      const deletedAt = new Date().toLocaleString();
      messageApi.success(`Deleted at ${deletedAt}`);
      fetchData(currentPage);
    } catch (e) {
      console.error(e);
      messageApi.error("Failed to delete");
    }
  };

  const downloadExelFile = async () => {
    try {
      const base = getApiBase();

      if (selectedIds.length > 0) {
        messageApi.info(`Exporting ${selectedIds.length} selected enquiries...`);
      } else {
        messageApi.info('Exporting all enquiries...');
        setSelectedIds([]);
        return;
      }

      const queryParams = new URLSearchParams({
        includeDeleted: includeDeletedExport ? 1 : 0,
        selectedIds: selectedIds.join(',')
      });

      const response = await fetch(`${base}/userViewAll/dowloadData?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': token ? `Bearer ${token}` : undefined,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const contentLength = response.headers.get('Content-Length');
      const contentDisposition = response.headers.get('Content-Disposition');

      if (!contentLength) {
        console.error('Content-Length header is missing.');
        return;
      }

      const total = parseInt(contentLength, 10);
      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        const progress = Math.round((receivedLength / total) * 100);
        setDownloadProgress(progress);
      }

      const blob = new Blob(chunks, { type: response.headers.get('Content-Type') });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `selected_enquiries_${selectedIds.length}_${new Date().toISOString().slice(0, 10)}.xlsx`;

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadProgress(0);
      messageApi.success(`Successfully exported ${selectedIds.length} selected enquiries!`);
      setSelectedIds([]);

    } catch (error) {
      console.error('Error downloading the file:', error);
      messageApi.open({
        type: "error",
        content: "Error downloading selected enquiries. Please try again.",
        duration: 3,
      });
      setDownloadProgress(0);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SalesHeadSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 lg:px-6 py-4 overflow-x-hidden">
        {contextHolder}
        
        {/* Header Section */}
        <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6">
          {/* Search & Export Row */}
          <div className="flex flex-col lg:flex-row gap-3 w-full items-stretch lg:items-center">
            <div className="flex gap-2 flex-1 min-h-12">
              <input
                type="text"
                placeholder="Search by Name, Mobile, or Project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') fetchData(1); }}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm md:text-base focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition bg-gray-50"
              />
              <button 
                onClick={() => fetchData(1)}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-md"
              >
                Search
              </button>
            </div>

            {/* Export Button */}
            {downloadProgress > 0 ? (
              <button className="px-6 md:px-8 py-3 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 min-h-12 font-semibold">
                <ClipLoader color="#C13B44" size={18} />
                <span>{downloadProgress}%</span>
              </button>
            ) : (
              <button
                onClick={downloadExelFile}
                disabled={data.length === 0}
                className={`px-6 md:px-8 py-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-md min-h-12 whitespace-nowrap ${
                  selectedIds.length > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {selectedIds.length > 0 ? `📥 Export (${selectedIds.length})` : '📥 Export All'}
              </button>
            )}
          </div>

          {/* Selection Info Row */}
          {selectedIds.length > 0 && (
            <div className="flex gap-3 items-center mt-4 pt-4 border-t border-gray-200 flex-wrap">
              <div className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 text-teal-700 border-2 border-cyan-300 rounded-lg text-sm font-semibold">
                ✓ {selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
              </div>
              <button
                onClick={() => setSelectedIds([])}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-300 rounded-lg text-sm font-semibold transition"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="w-12 px-2 md:px-4 py-4 text-center">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(data.map(item => item._id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="cursor-pointer w-5 h-5 accent-red-500"
                  />
                </th>
                {["Sr.No", "Name", "Mobile", "Project Name", "Email Received", "Date", ...(showDeleted ? ["Deleted At"] : []), "Actions"].map((header) => (
                  <th key={header} className="px-2 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length !== 0 ? (
                data.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b transition ${
                      selectedIds.includes(item._id) 
                        ? 'bg-yellow-50 border-l-4 border-l-yellow-400' 
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    <td className="w-12 px-2 md:px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, item._id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== item._id));
                          }
                        }}
                        className="cursor-pointer w-5 h-5 accent-red-500"
                      />
                    </td>
                    <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm font-medium text-gray-800">{index + 1 + (currentPage - 1) * pageSize}</td>
                    <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm text-gray-700 truncate font-medium">{item.name}</td>
                    <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm text-gray-700 truncate">{item.mobile}</td>
                    <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm text-gray-700 truncate">{item.projectName}</td>
                    <td className="px-2 md:px-4 py-4 text-center">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold transition ${
                        item.emailReceived
                          ? 'bg-gradient-to-r from-cyan-100 to-blue-100 text-teal-700 border-2 border-cyan-400'
                          : 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 border-2 border-orange-400'
                      }`}>
                        {item.emailReceived ? '✓ True' : '✗ False'}
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm whitespace-nowrap truncate text-gray-700">{formatDateTime(item.createdAt)}</td>
                    {showDeleted && (
                      <td className="px-2 md:px-4 py-4 text-center text-xs md:text-sm whitespace-nowrap truncate text-gray-700">{item.deletedAt ? formatDateTime(item.deletedAt) : '—'}</td>
                    )}
                    <td className="px-2 md:px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-3 py-1 text-xs md:text-sm text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 hover:border-red-500 transition font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showDeleted ? "10" : "9"} className="px-4 py-12 text-center text-gray-500 italic text-sm md:text-base">
                    {loading ? "⏳ Loading data..." : "📭 No data available."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <BackToTopButton />
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 flex-wrap py-8 px-4">
          <button
            onClick={loadBack}
            disabled={currentPage === 1 || loading}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:shadow-md'
            }`}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(pageNum =>
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
            )
            .map((pageNum, idx, arr) => {
              if (idx > 0 && pageNum - arr[idx - 1] > 1) {
                return [
                  <span key={`ellipsis-${pageNum}`} className="px-2 text-gray-400 font-bold text-lg">...</span>,
                  <button
                    key={pageNum}
                    onClick={() => handleClick(pageNum)}
                    className={`px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                ];
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handleClick(pageNum)}
                  className={`px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })
          }

          <button
            onClick={loadMore}
            disabled={currentPage === totalPages || loading}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:shadow-md'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;