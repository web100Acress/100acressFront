import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiBase } from '../config/apiBase';

import Sidebar from "./Sidebar";
import BackToTopButton from "../Pages/BackToTopButton";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Enquiries = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 50;
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [total, setTotal] = useState(0);

  const { messageApi, contextHolder } = message.useMessage();
  const navigate = useNavigate();
  const tokenRaw = localStorage.getItem("myToken") || "";
  const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");

  // Effect to inject styles into the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = enquiryStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up styles on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []); // Run once on mount to inject styles

  const fetchData = async (page = 1) => {
    setLoading(true);

    if (!token) {
      navigate("/");
      return;
    }
    try {
      const base = getApiBase();
      const response = await axios.get(
        `${base}/userViewAll?limit=${pageSize}&page=${page}`,
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
      setData(rows);
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

  const downloadExelFile = async () => {
    try {
      const base = getApiBase();
      const response = await fetch(`${base}/userViewAll/dowloadData`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      const contentLength = response.headers.get('Content-Length');
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log("ContentLength", contentLength);
      console.log("ContentDisposition", contentDisposition);

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
        console.log(`Download progress: ${progress}%`);
        setDownloadProgress(progress); // Update progress every 1
      }

      const blob = new Blob(chunks, { type: response.headers.get('Content-Type') });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : 'download.xlsx';
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the Blob URL
      window.URL.revokeObjectURL(url);
      setDownloadProgress(0);
      console.log('File downloaded successfully.');

    } catch (error) {
      console.error('Error downloading the file:', error);
      messageApi.open({
        type: "error",
        content: "Error downloading file. Please try again.",
        duration: 2,
      });
      setDownloadProgress(0); // Reset progress
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        {contextHolder}
        <div className="enquiries-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Name, Mobile, or Project..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button className="search-button">
              Search
            </button>
          </div>
          {downloadProgress > 0 ?
            <button
              className="download-button download-in-progress"
            >
              <ClipLoader color="#C13B44" size={20} />
              <span className="download-progress-text">{downloadProgress}%</span>
            </button>
            :
            <button
              className="download-button download-ready"
              onClick={downloadExelFile}
            >
              Export to CSV📥
            </button>
          }
        </div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                {[
                  "Sr.No",
                  "Name",
                  "Mobile",
                  "Project Name",
                  "Status",
                  "Assign",
                  "Date",
                ].map((header) => (
                  <th key={header} className="table-header">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {data.length !== 0 ? (
              <tbody className="table-body">
                {data.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </td>
                    <td className="table-cell">
                      {item.name}
                    </td>
                    <td className="table-cell">
                      {item.mobile}
                    </td>
                    <td className="table-cell">
                      {item.projectName}
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge ${item.status ? 'status-complete' : 'status-pending'}`}>
                        {item.status ? "Complete" : "Pending"}
                      </span>
                    </td>
                    <td className="table-cell">
                      {item.assign}
                    </td>
                    <td className="table-cell">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7" className="no-data-message">
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
              // Add ellipsis if needed
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

// --- Embedded CSS Styles ---
const enquiryStyles = `
/* Overall Layout */
.enquiries-main-content {
  flex: 1;
  min-width: 0;
  padding: 3rem 1.5rem; /* Increased padding for more breathing room */
  margin-left: 250px; /* Aligns with Sidebar width, adjust if Sidebar changes */
  background-color: #f0f2f5; /* Softer, light grey background */
  min-height: 100vh; /* Ensure it takes full height */
  box-sizing: border-box; /* Include padding in element's total width and height */
  font-family: 'Inter', sans-serif; /* Modern, clean font */
  color: #344767; /* Deeper text color */
}

@media (max-width: 768px) {
  .enquiries-main-content {
    margin-left: 0; /* Remove margin on smaller screens if sidebar collapses */
    padding: 2rem 1rem;
  }
}

/* Header and Controls */
.enquiries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem; /* More space below header */
  flex-wrap: wrap;
  gap: 1.5rem; /* Increased gap */
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px; /* Softer rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* More subtle, spread-out shadow */
  overflow: hidden;
  max-width: 450px; /* Slightly wider search */
  flex-grow: 1;
  border: 1px solid #e0e0e0; /* Light border */
}

.search-input {
  padding: 12px 18px; /* More padding */
  border: none;
  border-bottom: 2px solid #ea5c5c; /* Modern red accent */
  color: #344767;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input::placeholder {
  color: #a0a8b3; /* Softer placeholder color */
}

.search-input:focus {
  border-color: #d63333; /* Darker red on focus */
}

.search-button {
  background-color: #ea5c5c; /* Red color */
  color: #ffffff;
  padding: 12px 22px; /* More padding */
  border: none;
  border-radius: 0 12px 12px 0; /* Only right corners */
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600; /* Bolder text */
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: inset 0 0 0 rgba(0,0,0,0); /* For consistent box-shadow transition */
}

.search-button:hover {
  background-color: #d63333; /* Darker red on hover */
  transform: translateY(-1px); /* Slight lift effect */
  box-shadow: 0 2px 5px rgba(234, 92, 92, 0.3);
}

.download-button {
  padding: 12px 24px; /* More padding */
  border-radius: 12px; /* Softer rounded corners */
  border: none;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px; /* More space between icon and text */
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Standard shadow */
}

.download-ready {
  background-color: #4a7dff; /* Modern blue */
  box-shadow: 0 4px 15px rgba(74, 125, 255, 0.3);
}

.download-ready:hover {
  background-color: #3b66df; /* Darker blue on hover */
  box-shadow: 0 6px 20px rgba(74, 125, 255, 0.4);
  transform: translateY(-2px); /* Slight lift */
}

.download-in-progress {
  background-color: #e0e0e0; /* Light grey, subtle disabled look */
  cursor: not-allowed;
  color: #888; /* Softer text color */
  box-shadow: none;
}

.download-progress-text {
  font-weight: bold;
  color: #344767; /* Match main text color */
}

/* Table Styling */
.table-container {
  overflow-x-auto;
  background-color: #ffffff;
  border-radius: 16px; /* Larger, more elegant border-radius */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12); /* Deeper, softer shadow */
  margin-bottom: 2rem;
  border: 1px solid #e0e0e0; /* Light border */
}

.enquiries-table {
  width: 100%;
  border-collapse: separate; /* Use separate to allow border-spacing */
  border-spacing: 0; /* Remove default spacing */
  min-width: 800px; /* Ensure ample width */
  font-size: 0.95rem; /* Slightly larger text */
}

.table-header {
  padding: 18px 24px; /* More padding */
  text-align: center;
  font-size: 0.85rem; /* Slightly smaller header font for elegance */
  font-weight: 700; /* Bolder */
  color: #6c7a89; /* Muted header text color */
  text-transform: uppercase;
  letter-spacing: 0.08em; /* Increased letter spacing */
  background-color: #f6f9fc; /* Very light, almost white header background */
  border-bottom: 2px solid #e8eaf1; /* Subtler border */
}

.table-header:first-child {
  border-top-left-radius: 16px; /* Match container radius */
}

.table-header:last-child {
  border-top-right-radius: 16px; /* Match container radius */
}

.table-body .table-row:nth-child(even) { /* Changed to even for slightly more visual break */
  background-color: #fdfdfd;
}

.table-body .table-row:hover {
  background-color: #e6f7ff; /* Lighter, more inviting blue on hover */
  transition: background-color 0.3s ease;
}

.table-cell {
  padding: 16px 24px; /* Increased padding */
  text-align: center;
  font-size: 0.95rem;
  color: #344767;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e8eaf1; /* Subtler border */
}

.table-body .table-row:last-child .table-cell {
  border-bottom: none; /* No border on last row's cells */
}

.no-data-message {
  text-align: center;
  padding: 30px; /* More vertical padding */
  color: #8898aa; /* Softer text color */
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 500;
}

/* Status Badges */
.status-badge {
  display: inline-flex; /* Use flex for vertical alignment if text wraps */
  align-items: center;
  justify-content: center;
  padding: 6px 14px; /* More padding */
  border-radius: 25px; /* Fully rounded pills */
  font-size: 0.85rem; /* Slightly larger font */
  font-weight: 700;
  text-transform: uppercase; /* Uppercase for status */
  letter-spacing: 0.03em;
  min-width: 90px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08); /* Small shadow for depth */
}

.status-complete {
  background-color: #e6ffe6; /* Very light green */
  color: #28a745; /* Vibrant green text */
  border: 1px solid #a3e6a3; /* Subtle border */
}

.status-pending {
  background-color: #fff0f5; /* Very light red/pink */
  color: #dc3545; /* Vibrant red text */
  border: 1px solid #f9c8c8; /* Subtle border */
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; /* Increased gap */
  margin-top: 2rem; /* More space above pagination */
  padding-bottom: 3rem; /* More space at the bottom */
}

.pagination-button {
  padding: 12px 18px; /* More padding */
  border-radius: 10px; /* Softer corners */
  border: 1px solid #dcdcdc; /* Light border */
  background-color: #ffffff;
  color: #6c7a89; /* Muted text color */
  font-size: 0.95rem; /* Slightly larger font */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); /* Subtle shadow */
}

.pagination-button:hover:not(:disabled) {
  background-color: #f7f9fa; /* Very light hover */
  border-color: #b0b8c0;
  color: #344767;
  transform: translateY(-1px); /* Slight lift */
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.pagination-active {
  background-color: #ea5c5c; /* Red for active page */
  color: #ffffff;
  border-color: #ea5c5c;
  font-weight: 700; /* Bolder active text */
  box-shadow: 0 4px 15px rgba(234, 92, 92, 0.4);
}

.pagination-active:hover {
  background-color: #d63333; /* Darker red on hover for active */
  border-color: #d63333;
  color: #ffffff;
}

.pagination-disabled {
  background-color: #f5f5f5; /* Lighter disabled background */
  color: #b0b8c0; /* Lighter disabled text */
  cursor: not-allowed;
  opacity: 0.7; /* Slightly more opaque */
  border-color: #f5f5f5;
  box-shadow: none;
}
`;