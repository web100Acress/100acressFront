import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getApiBase } from '../config/apiBase';

import Sidebar from "./Sidebar";
import BackToTopButton from "../Pages/BackToTopButton";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import showToast from "../Utils/toastUtils";

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
  
  // Date range states for export
  const [exportDateRange, setExportDateRange] = useState({
    startDate: '',
    endDate: '',
    useDateRange: false
  });
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // all, verified, unverified
  const [filterProject, setFilterProject] = useState("");
  const [sortBy, setSortBy] = useState("date"); // date, name, project
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const navigate = useNavigate();
  const tokenRaw = localStorage.getItem("myToken") || "";
  const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");

  // Ref for the select all checkbox to handle indeterminate state
  const selectAllRef = useRef(null);

  // Effect to handle select all checkbox indeterminate state
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedIds.length > 0 && selectedIds.length < data.length;
    }
  }, [selectedIds, data.length]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = enquiryStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const fetchData = async (page = 1) => {
    setLoading(true);
    showToast.loading('Loading enquiries...', { id: 'loadEnquiries' });

    if (!token) {
      navigate("/");
      return;
    }
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
        showToast.error("Error While Fetching Data");
        console.error("Failed to fetch data");
      }

      const payload = response.data;
      let rows = [];
      if (Array.isArray(payload?.data)) rows = payload.data;
      else if (Array.isArray(payload?.users)) rows = payload.users;
      else if (Array.isArray(payload)) rows = payload;
      // Frontend-only filter: hide footer instant call leads from admin UI
      const filteredRows = rows.filter((r) => !(/footer\s*instant\s*call/i.test((r?.projectName || '').trim())));
      setData(filteredRows);
      setTotal(payload?.total || payload?.data?.[0]?.totalCount || 0);
      setCurrentPage(page);
      
      showToast.dismiss('loadEnquiries');
      showToast.success(`Loaded ${filteredRows.length} enquiries successfully!`);
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast.dismiss('loadEnquiries');
      showToast.error("Error fetching data. Please try again.");
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

  // Format date + time like: 02 September 2025, 11:22 AM
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
      showToast.success("Updated successfully");
      fetchData(currentPage);
    } catch (e) {
      console.error(e);
      showToast.error("Failed to update");
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
      showToast.success(`Deleted at ${deletedAt}`);
      fetchData(currentPage);
    } catch (e) {
      console.error(e);
      showToast.error("Failed to delete");
    }
  };

  const downloadExelFile = async () => {
    try {
      const base = getApiBase();

      // If specific items are selected, export only those
      if (selectedIds.length > 0) {
        showToast.info(`Exporting ${selectedIds.length} selected enquiries...`);
      } else {
        showToast.info('Exporting enquiries...');
      }

      // Prepare the request parameters
      const queryParams = new URLSearchParams();
      
      // Add selected IDs if any
      if (selectedIds.length > 0) {
        queryParams.append('selectedIds', selectedIds.join(','));
      }
      
      // Add deleted flag
      queryParams.append('includeDeleted', includeDeletedExport ? 1 : 0);
      
      // Add date range if enabled
      if (exportDateRange.useDateRange) {
        if (exportDateRange.startDate) {
          queryParams.append('startDate', exportDateRange.startDate);
        }
        if (exportDateRange.endDate) {
          queryParams.append('endDate', exportDateRange.endDate);
        }
      }

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
        console.error('Content-Length header is missing. Progress cannot be tracked.');
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

      // Generate filename based on export type
      let fileName = '';
      if (selectedIds.length > 0) {
        fileName = `selected_enquiries_${selectedIds.length}`;
      } else if (exportDateRange.useDateRange) {
        const start = exportDateRange.startDate || 'all';
        const end = exportDateRange.endDate || 'all';
        fileName = `enquiries_${start}_to_${end}`;
      } else {
        fileName = 'all_enquiries';
      }
      fileName += `_${new Date().toISOString().slice(0, 10)}.xlsx`;

      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadProgress(0);
      
      const exportCount = selectedIds.length > 0 ? selectedIds.length : 'filtered';
      showToast.success(`Successfully exported ${exportCount} enquiries!`);

      // Clear selection after successful download
      setSelectedIds([]);
      setShowDateRangeModal(false);

    } catch (error) {
      console.error('Error downloading the file:', error);
      showToast.error("Error downloading enquiries. Please try again.");
      setDownloadProgress(0);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-4 ml-[250px] transition-colors duration-300">
        <div className="enquiries-header" style={{ marginBottom: '1.5rem' }}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Name, Mobile, or Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchData(1); }}
              className="search-input"
            />
            <button className="search-button" onClick={() => fetchData(1)}>
              Search
            </button>
          </div>

          {/* Filtration Controls */}
          <div className="filtration-controls">
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {selectedIds.length > 0 && (
              <>
                <div className="selected-count">
                  {selectedIds.length} selected
                </div>
                <button
                  className="clear-selection-button"
                  onClick={() => setSelectedIds([])}
                >
                  Clear Selection
                </button>
              </>
            )}
            <div className="download-section">
            {downloadProgress > 0 ? (
              <div className="download-progress-container">
                <button className="download-button downloading" disabled>
                  <ClipLoader color="#ffffff" size={18} />
                  <span className="download-progress-text">Exporting... {downloadProgress}%</span>
                </button>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="export-buttons-container">
                <button
                  className={`export-button ${selectedIds.length > 0 ? 'export-selected' : 'export-date-range'}`}
                  onClick={() => setShowDateRangeModal(true)}
                  disabled={data.length === 0}
                >
                  <span className="button-icon">
                    {selectedIds.length > 0 ? '✓' : '📅'}
                  </span>
                  <span className="button-text">
                    {selectedIds.length > 0 ? `Selected (${selectedIds.length})` : 'Date Range'}
                  </span>
                  <span className="button-arrow">→</span>
                </button>
                
                <button
                  className="export-button export-all"
                  onClick={() => {
                    setExportDateRange({ startDate: '', endDate: '', useDateRange: false });
                    downloadExelFile();
                  }}
                  disabled={data.length === 0}
                >
                  <span className="button-icon">📊</span>
                  <span className="button-text">All Data</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
            )}
          </div>
          </div>

          {/* Date Range Modal */}
          {showDateRangeModal && (
            <div className="date-range-modal-overlay">
              <div className="date-range-modal">
                <div className="modal-header">
                  <h3>📊 Export Enquiries</h3>
                  <button 
                    className="modal-close-btn"
                    onClick={() => setShowDateRangeModal(false)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="date-range-form">
                  {/* Date Range Toggle */}
                  <div className="form-group toggle-group">
                    <div className="toggle-container">
                      <input
                        type="checkbox"
                        id="dateRangeToggle"
                        checked={exportDateRange.useDateRange}
                        onChange={(e) => setExportDateRange({
                          ...exportDateRange,
                          useDateRange: e.target.checked
                        })}
                      />
                      <label htmlFor="dateRangeToggle" className="toggle-label">
                        <span className="toggle-text">📅 Filter by Date Range</span>
                        <span className="toggle-description">Export enquiries from specific period</span>
                      </label>
                    </div>
                  </div>

                  {/* Date Fields */}
                  {exportDateRange.useDateRange && (
                    <div className="date-fields-container">
                      <div className="date-field-group">
                        <label className="date-label">
                          📅 From Date
                        </label>
                        <input
                          type="date"
                          className="date-input"
                          value={exportDateRange.startDate}
                          onChange={(e) => setExportDateRange({
                            ...exportDateRange,
                            startDate: e.target.value
                          })}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div className="date-field-group">
                        <label className="date-label">
                          📅 To Date
                        </label>
                        <input
                          type="date"
                          className="date-input"
                          value={exportDateRange.endDate}
                          onChange={(e) => setExportDateRange({
                            ...exportDateRange,
                            endDate: e.target.value
                          })}
                          max={new Date().toISOString().split('T')[0]}
                          min={exportDateRange.startDate}
                        />
                      </div>
                    </div>
                  )}

                  {/* Options */}
                  <div className="options-section">
                    <div className="form-group option-group">
                      <label className="option-label">
                        <input
                          type="checkbox"
                          checked={includeDeletedExport}
                          onChange={(e) => setIncludeDeletedExport(e.target.checked)}
                          className="option-checkbox"
                        />
                        <span className="option-text">
                          🗑️ Include Deleted Enquiries
                        </span>
                        <span className="option-description">
                          Export enquiries that have been deleted
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Export Summary */}
                  <div className="export-summary">
                    <div className="summary-item">
                      <span className="summary-label">Export Type:</span>
                      <span className="summary-value">
                        {selectedIds.length > 0 
                          ? `Selected (${selectedIds.length})` 
                          : exportDateRange.useDateRange 
                            ? 'Date Range Filtered' 
                            : 'All Enquiries'
                        }
                      </span>
                    </div>
                    {exportDateRange.useDateRange && (
                      <div className="summary-item">
                        <span className="summary-label">Date Range:</span>
                        <span className="summary-value">
                          {exportDateRange.startDate || 'Start'} - {exportDateRange.endDate || 'End'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-cancel"
                    onClick={() => setShowDateRangeModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-export"
                    onClick={downloadExelFile}
                  >
                    📥 Export Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="table-container" style={{ marginBottom: '1rem' }}>
          <table className="enquiries-table">
            <thead>
              <tr>
                <th className="table-header" style={{ width: '50px' }}>
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
                  />
                </th>
                {[
                  "Sr.No",
                  "Name",
                  "Mobile",
                  "Project Name",
                  "Email Received",
                  "Date",
                  ...(showDeleted ? ["Deleted At"] : []),
                  "Actions",
                ].map((header, index) => (
                  <th key={header} className="table-header" style={{
                    width: index === 0 ? '80px' :  // Sr.No
                          index === 1 ? '150px' :  // Name
                          index === 2 ? '120px' :  // Mobile
                          index === 3 ? '200px' :  // Project Name
                          index === 4 ? '100px' :  // Email Received
                          index === 5 ? '180px' :  // Date
                          showDeleted && index === 6 ? '180px' :  // Deleted At
                          index === (showDeleted ? 7 : 6) ? '100px' :  // Actions
                          'auto',
                    minWidth: '80px'
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {data.length !== 0 ? (
              <tbody className="table-body">
                {data
                  .filter((r) => !(/footer\s*instant\s*call/i.test((r?.projectName || '').trim())))
                  .map((item, index) => (
                  <tr key={index} className={`table-row ${selectedIds.includes(item._id) ? 'selected-row' : ''}`}>
                    <td className="table-cell">
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
                      />
                    </td>
                    <td className="table-cell" style={{ width: '80px', minWidth: '80px' }}>
                      {index + 1 + (currentPage - 1) * pageSize}
                    </td>
                    <td className="table-cell" style={{ width: '150px', minWidth: '120px' }}>
                      {item.name}
                    </td>
                    <td className="table-cell" style={{ width: '120px', minWidth: '100px' }}>
                      {item.mobile}
                    </td>
                    <td className="table-cell" style={{ width: '200px', minWidth: '150px' }}>
                      {item.projectName}
                    </td>
                    <td className="table-cell" style={{ width: '100px', minWidth: '80px' }}>
                      <span className={`email-badge ${item.emailReceived ? 'email-verified' : 'email-unverified'}`}>
                        {item.emailReceived ? 'True' : 'False'}
                      </span>
                    </td>
                    <td className="table-cell" style={{ width: '180px', minWidth: '150px' }}>
                      {formatDateTime(item.createdAt)}
                    </td>
                    {showDeleted && (
                      <td className="table-cell" style={{ width: '180px', minWidth: '150px' }}>
                        {item.deletedAt ? formatDateTime(item.deletedAt) : '-'}
                      </td>
                    )}
                    <td className="table-cell" style={{ width: '100px', minWidth: '80px' }}>
                      <button
                        className="pagination-button"
                        onClick={() => handleDelete(item)}
                        style={{ color: '#dc3545', borderColor: '#f1c0c4' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={showDeleted ? "10" : "9"} className="no-data-message">
                    {loading ? <p>Loading data...</p> : <p>No data available.</p>}
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <BackToTopButton />
        </div>
        <div className="pagination-container">
          <button
            className={`pagination-button ${currentPage === 1 ? "pagination-disabled" : ""}`}
            onClick={loadBack}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter(pageNum =>
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
            )
            .map((pageNum, idx, arr) => {
              if (idx > 0 && pageNum - arr[idx - 1] > 1) {
                return [<span key={`ellipsis-${pageNum}`}>...</span>, (
                  <button
                    key={pageNum}
                    onClick={() => handleClick(pageNum)}
                    disabled={currentPage === pageNum}
                    className={`pagination-button ${currentPage === pageNum ? "pagination-active" : ""}`}
                  >
                    {pageNum}
                  </button>
                )];
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handleClick(pageNum)}
                  disabled={currentPage === pageNum}
                  className={`pagination-button ${currentPage === pageNum ? "pagination-active" : ""}`}
                >
                  {pageNum}
                </button>
              );
            })
          }
          <button
            className={`pagination-button ${currentPage === totalPages ? "pagination-disabled" : ""}`}
            onClick={loadMore}
            disabled={currentPage === totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enquiries;

const enquiryStyles = `
/* Overall Layout */
.enquiries-main-content {
  flex: 1;
  min-width: 0;
  padding: 3rem 1.5rem; 
  margin-left: 250px; 
  background-color: #f0f2f5; 
  min-height: 100vh; 
  box-sizing: border-box; 
  font-family: 'Inter', sans-serif; 
  color: #344767; 
}

@media (max-width: 768px) {
  .enquiries-main-content {
    margin-left: 0; 
    padding: 2rem 1rem;
  }
}

/* Header and Controls */
.enquiries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem; 
  flex-wrap: wrap;
  gap: 1.5rem; 
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); 
  overflow: hidden;
  max-width: 450px; 
  flex-grow: 1;
  border: 1px solid #e0e0e0; 
}

.search-input {
  padding: 12px 18px; 
  border: none;
  border-bottom: 2px solid #ea5c5c; 
  color: #344767;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input::placeholder {
  color: #a0a8b3; 
}

.search-input:focus {
  border-color: #d63333; 
}

.search-button {
  background-color: #ea5c5c; 
  color: #ffffff;
  padding: 12px 22px; 
  border: none;
  border-radius: 0 12px 12px 0; 
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600; 
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: inset 0 0 0 rgba(0,0,0,0); 
}

.search-button:hover {
  background-color: #d63333; 
  transform: translateY(-1px); 
  box-shadow: 0 2px 5px rgba(234, 92, 92, 0.3);
}

.download-button {
  padding: 12px 24px; 
  border-radius: 12px; 
  border: none;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px; 
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
}

.download-ready {
  background-color: #4a7dff; 
  box-shadow: 0 4px 15px rgba(74, 125, 255, 0.3);
}

.download-ready:hover {
  background-color: #3b66df;
  box-shadow: 0 6px 20px rgba(74, 125, 255, 0.4);
  transform: translateY(-2px);
}

.download-selected {
  background-color: #28a745;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.download-selected:hover {
  background-color: #218838;
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
  transform: translateY(-2px);
}

.download-in-progress {
  background-color: #e0e0e0; 
  cursor: not-allowed;
{{ ... }}
  color: #888; 
  box-shadow: none;
}

.download-progress-text {
  font-weight: bold;
  color: #344767; 
}

/* Filtration Controls */
.filtration-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #344767;
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background-color: #ffffff;
  color: #344767;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #ea5c5c;
}

.filter-apply-button {
  padding: 0.5rem 1rem;
  background-color: #ea5c5c;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-apply-button:hover {
  background-color: #d63333;
}

.selected-count {
  padding: 0.5rem 1rem;
  background-color: #e6f7ff;
  color: #0f766e;
  border: 1px solid #99f6e4;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.clear-selection-button {
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-selection-button:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

.table-container {
  overflow-x: auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0;
  width: 100%;
}

.enquiries-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
  min-width: 1600px;
  font-size: 0.95rem;
}

.table-header {
  padding: 20px 32px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: #6c7a89;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background-color: #f6f9fc;
  border-bottom: 2px solid #e8eaf1;
  width: 100%;
}

.table-header:first-child {
  border-top-left-radius: 16px; 
}

.table-header:last-child {
  border-top-right-radius: 16px; 
}

.table-body .table-row:nth-child(even) { 
  background-color: #fdfdfd;
}

.table-body .table-row:hover {
  background-color: #e6f7ff; 
  transition: background-color 0.3s ease;
}

.table-body .table-row.selected-row {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
}

.table-body .table-row.selected-row:hover {
  background-color: #ffeaa7;
}

.table-cell {
  padding: 20px 32px;
  text-align: center;
  font-size: 0.95rem;
  color: #344767;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e8eaf1;
}

.table-body .table-row:last-child .table-cell {
  border-bottom: none; 
}

.no-data-message {
  text-align: center;
  padding: 30px; 
  color: #8898aa; 
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 500;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; 
  margin-top: 2rem; 
  padding-bottom: 3rem; 
}

.pagination-button {
  padding: 12px 18px; 
  border-radius: 10px; 
  border: 1px solid #dcdcdc; 
  background-color: #ffffff;
  color: #6c7a89; 
  font-size: 0.95rem; 
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); 
}

.pagination-button:hover:not(:disabled) {
  background-color: #f7f9fa; 
  border-color: #b0b8c0;
  color: #344767;
  transform: translateY(-1px); 
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.pagination-active {
  background-color: #ea5c5c; 
  color: #ffffff;
  border-color: #ea5c5c;
  font-weight: 700; 
  box-shadow: 0 4px 15px rgba(234, 92, 92, 0.4);
}

.pagination-active:hover {
  background-color: #d63333; 
  border-color: #d63333;
  color: #ffffff;
}

.pagination-disabled {
  background-color: #f5f5f5; 
  color: #b0b8c0; 
  cursor: not-allowed;
  opacity: 0.7; 
  border-color: #f5f5f5;
  box-shadow: none;
}

/* Email Verified Badges */
.email-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.email-verified {
  background: #e6fffa;
  color: #0f766e;
  border: 1px solid #99f6e4;
}
.email-unverified {
  background: #fff7ed;
  color: #b45309;
  border: 1px solid #fed7aa;
}

/* Export buttons container */
.export-buttons-container {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* Perfect Export Buttons */
.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid;
  position: relative;
  overflow: hidden;
  min-width: 140px;
  justify-content: space-between;
}

.export-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button-icon {
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.button-text {
  flex: 1;
  text-align: center;
  font-weight: 600;
}

.button-arrow {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.export-button:hover .button-arrow {
  transform: translateX(2px);
}

/* Date Range Button */
.export-date-range {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.export-date-range:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.export-date-range:active {
  transform: translateY(-1px);
}

/* Selected Button */
.export-selected {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-color: #f093fb;
  color: white;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
}

.export-selected:hover:not(:disabled) {
  background: linear-gradient(135deg, #e879f9 0%, #ec4899 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
}

.export-selected:active {
  transform: translateY(-1px);
}

/* All Data Button */
.export-all {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-color: #4facfe;
  color: white;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
}

.export-all:hover:not(:disabled) {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
}

.export-all:active {
  transform: translateY(-1px);
}

/* Progress Container */
.download-progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.download-button.downloading {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border: 2px solid #f97316;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.download-progress-text {
  font-size: 0.875rem;
  font-weight: 600;
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316 0%, #ea580c 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Button Shine Effect */
.export-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.export-button:hover::before {
  left: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .export-buttons-container {
    flex-direction: column;
    width: 100%;
  }
  
  .export-button {
    width: 100%;
    min-width: auto;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .button-text {
    flex: none;
  }
  
  .button-arrow {
    display: none;
  }
}

@media (max-width: 480px) {
  .export-button {
    padding: 0.625rem 1rem;
    font-size: 0.8rem;
  }
  
  .button-icon {
    width: 18px;
    height: 18px;
    font-size: 0.9rem;
  }
}

/* Date Range Modal Styles */
.date-range-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.date-range-modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 520px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.date-range-form {
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Toggle Group */
.toggle-group {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
}

.toggle-container {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.toggle-container input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #3b82f6;
  margin-top: 0.125rem;
}

.toggle-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
  margin: 0;
}

.toggle-text {
  font-weight: 500;
  color: #1f2937;
  font-size: 0.95rem;
}

.toggle-description {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Date Fields */
.date-fields-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.date-field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.date-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.date-input {
  padding: 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1f2937;
  background-color: white;
  transition: all 0.2s;
}

.date-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.date-input:hover {
  border-color: #9ca3af;
}

/* Options Section */
.options-section {
  background-color: #fefce8;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 1rem;
}

.option-group {
  margin: 0;
}

.option-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  margin: 0;
}

.option-checkbox {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: #f59e0b;
  margin-top: 0.125rem;
}

.option-text {
  font-weight: 500;
  color: #1f2937;
  font-size: 0.9rem;
}

.option-description {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Export Summary */
.export-summary {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.summary-item:not(:last-child) {
  border-bottom: 1px solid #e0f2fe;
}

.summary-label {
  font-weight: 500;
  color: #0c4a6e;
  font-size: 0.875rem;
}

.summary-value {
  font-weight: 600;
  color: #0369a1;
  font-size: 0.875rem;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1rem 2rem 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel,
.btn-export {
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
}

.btn-cancel {
  background-color: white;
  color: #6b7280;
  border-color: #d1d5db;
}

.btn-cancel:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.btn-export {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-export:hover {
  background-color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-export:active {
  transform: translateY(0);
}

.btn-export:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .date-range-modal {
    width: 95%;
    max-width: none;
    margin: 1rem;
  }
  
  .modal-header {
    padding: 1.25rem 1.5rem 1rem 1.5rem;
  }
  
  .date-range-form {
    padding: 1.25rem 1.5rem;
  }
  
  .date-fields-container {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .modal-actions {
    padding: 1rem 1.5rem 1.25rem 1.5rem;
    flex-direction: column-reverse;
  }
  
  .btn-cancel,
  .btn-export {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .export-buttons-container {
    flex-direction: column;
  }
  
  .export-buttons-container .download-button {
    width: 100%;
  }
}
`;