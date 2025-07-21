import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { message } from "antd"; // Assuming Ant Design message is available
import { ClipLoader } from "react-spinners"; // Assuming react-spinners is installed for loading indicator

const ResaleEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const itemsPerPage = 10;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = resaleEnquiriesStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const fetchEnquiriesData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.100acress.com/postEnq_view");
      console.log("Data: ", res.data.data); //
      setEnquiries(res.data.data); //
    } catch (error) {
      console.error("Error fetching resale enquiries:", error);
      messageApi.open({
        type: "error",
        content: "Failed to fetch resale enquiries. Please try again.",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiriesData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filter = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  // 🐛 FIX: Changed the filtering logic
  const filteredEnquiries = enquiries.filter((item) => {
    // Check if item and relevant properties exist before calling toLowerCase()
    const customerName = item.custName ? item.custName.toLowerCase() : '';
    const propertyAddress = item.propertyAddress ? item.propertyAddress.toLowerCase() : '';

    // You can add more fields here if needed for search
    return customerName.includes(search) || propertyAddress.includes(search);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEnquiries = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  const loadMore = () => {
    if (currentPage * itemsPerPage < filteredEnquiries.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const loadBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const downloadExcelFile = async () => {
    setDownloadProgress(1);
    try {
      const token = localStorage.getItem("myToken");
      const response = await fetch("https://api.100acress.com/postEnq_download",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const contentLength = response.headers.get('Content-Length');
      const contentDisposition = response.headers.get('Content-Disposition');

      if (!contentLength) {
        console.warn('Content-Length header is missing. Download progress may not be accurate.');
      }
      const total = parseInt(contentLength, 10) || 1;

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
        : 'resale_enquiries.xlsx';
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      messageApi.open({
        type: "success",
        content: "File downloaded successfully!",
        duration: 2,
      });
    } catch (error) {
      console.error('Error downloading the file:', error);
      messageApi.open({
        type: "error",
        content: "Error downloading file. Please try again.",
        duration: 3,
      });
    } finally {
      setDownloadProgress(0);
    }
  };


  return (
    <>
      <Sidebar />
      <div className="resale-enquiries-main-content">
        {contextHolder}
        <div className="resale-enquiries-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Customer Name or Address..."
              className="search-input"
              onChange={filter}
              value={search}
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
              onClick={downloadExcelFile}
            >
              Export to csv 📥
            </button>
          }
        </div>

        <div className="table-container">
          <table className="resale-enquiries-table">
            <thead>
              <tr>
                <th scope="col" className="table-header">Sr.No</th>
                <th scope="col" className="table-header">Agent Number</th>
                <th scope="col" className="table-header">Customer Name</th>
                <th scope="col" className="table-header">Customer Email</th>
                <th scope="col" className="table-header">Customer Number</th>
                <th scope="col" className="table-header">Property Address</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data-message">
                    <ClipLoader color="#6750A4" size={30} />
                    <p>Loading enquiries...</p>
                  </td>
                </tr>
              ) : selectedEnquiries.length > 0 ? (
                selectedEnquiries.map((item, index) => (
                  <tr key={item?._id} className="table-row">
                    <td className="table-cell">{startIndex + index + 1}</td>
                    <td className="table-cell">{item.agentNumber}</td>
                    <td className="table-cell">{item.custName}</td>
                    <td className="table-cell email-cell">{item.custEmail}</td>
                    <td className="table-cell">{item.custNumber}</td>
                    <td className="table-cell address-cell">{item.propertyAddress}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data-message">
                  No resale enquiries found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination-container">
            <button
              className={`pagination-button ${currentPage === 1 ? "pagination-disabled" : ""}`}
              onClick={loadBack}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? "pagination-active" : ""}`}
                disabled={loading}
              >
                {index + 1}
              </button>
            ))}
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
    </>
  );
};

export default ResaleEnquiries;

const resaleEnquiriesStyles = `
/* Overall Layout */
.resale-enquiries-main-content {
  flex: 1;
  min-width: 0;
  padding: 3.5rem 2.5rem;
  margin-left: 250px;
  background: linear-gradient(135deg, #eef2f7 0%, #dce4ee 100%);
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .resale-enquiries-main-content {
    margin-left: 0;
    padding: 2.5rem 1.5rem;
  }
}

/* Header and Controls */
.resale-enquiries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 550px;
  flex-grow: 1;
  border: 1px solid #d4dbe8;
}

.search-input {
  padding: 15px 22px;
  border: none;
  border-bottom: 3px solid #6c5ce7;
  color: #2c3e50;
  outline: none;
  flex-grow: 1;
  font-size: 1.08rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input::placeholder {
  color: #9ab0c4;
}

.search-input:focus {
  border-color: #5b4ddf;
  box-shadow: 0 0 0 4px rgba(108, 92, 231, 0.25);
}

.search-button {
  background: linear-gradient(45deg, #6c5ce7 0%, #5b4ddf 100%);
  color: #ffffff;
  padding: 15px 28px;
  border: none;
  border-radius: 0 15px 15px 0;
  cursor: pointer;
  font-size: 1.08rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 5px 20px rgba(108, 92, 231, 0.4);
}

.search-button:hover {
  background: linear-gradient(45deg, #5b4ddf 0%, #4a3ec4 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(108, 92, 231, 0.5);
}

.download-button {
  padding: 15px 30px;
  border-radius: 15px;
  border: none;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.download-ready {
  background: linear-gradient(45deg, #1abc9c 0%, #16a085 100%);
  box-shadow: 0 5px 20px rgba(26, 188, 156, 0.3);
}

.download-ready:hover {
  background: linear-gradient(45deg, #16a085 0%, #117d6b 100%);
  box-shadow: 0 8px 25px rgba(26, 188, 156, 0.4);
  transform: translateY(-3px);
}

.download-in-progress {
  background-color: #f0f4f7;
  cursor: not-allowed;
  color: #7f8c8d;
  box-shadow: none;
  animation: pulse-elegant 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
}

@keyframes pulse-elegant {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.01); opacity: 0.95; }
  100% { transform: scale(1); opacity: 1; }
}

.download-progress-text {
  font-weight: bold;
  color: #2c3e50;
}

/* Table Styling */
.table-container {
  overflow-x-auto;
  background-color: #ffffff;
  border-radius: 22px;
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.15);
  margin-bottom: 3rem;
  border: 1px solid #e0e6ed;
}

.resale-enquiries-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1000px;
  font-size: 0.98rem;
}

.table-header {
  padding: 20px 30px;
  text-align: center;
  font-size: 0.92rem;
  font-weight: 700;
  color: #617790;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: linear-gradient(90deg, #f7f9fb 0%, #eef3f8 100%);
  border-bottom: 2px solid #e5e9f2;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-header:first-child {
  border-top-left-radius: 22px;
}

.table-header:last-child {
  border-top-right-radius: 22px;
}

.table-body .table-row:nth-child(even) {
  background-color: #fbfcfe;
}

.table-body .table-row:hover {
  background-color: #e6f7ff;
  transition: background-color 0.3s ease, transform 0.1s ease;
  transform: scale(1.005);
  box-shadow: inset 0 0 0 1px rgba(108, 92, 231, 0.1);
}

.table-cell {
  padding: 18px 30px;
  text-align: center;
  font-size: 0.98rem;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e5e9f2;
}

.table-body .table-row:last-child .table-cell {
  border-bottom: none;
}

.email-cell, .address-cell {
  white-space: normal;
  word-wrap: break-word;
  max-width: 220px;
  line-height: 1.6;
}

.no-data-message {
  text-align: center;
  padding: 40px;
  color: #8898aa;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 0 0 22px 22px;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-bottom: 3.5rem;
}

.pagination-button {
  padding: 14px 22px;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  color: #617790;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
}

.pagination-button:hover:not(:disabled) {
  background-color: #f0f4f7;
  border-color: #b0c2d3;
  color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
}

.pagination-active {
  background: linear-gradient(45deg, #6c5ce7 0%, #5b4ddf 100%);
  color: #ffffff;
  border-color: #6c5ce7;
  font-weight: 700;
  box-shadow: 0 5px 18px rgba(108, 92, 231, 0.45);
}

.pagination-active:hover {
  background: linear-gradient(45deg, #5b4ddf 0%, #4a3ec4 100%);
  border-color: #5b4ddf;
  color: #ffffff;
}

.pagination-disabled {
  background-color: #fcfdfe;
  color: #c0c8d3;
  cursor: not-allowed;
  opacity: 0.8;
  border-color: #e0e5ed;
  box-shadow: none;
}
`;