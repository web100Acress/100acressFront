import React, { useEffect, useState } from "react";
import SalesHeadSidebar from "../SalesHeadSidebar";
import axios from "axios";
import { message } from "antd";
import { ClipLoader } from "react-spinners";
import { getApiBase } from '../../config/apiBase';

const ResaleEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [agentNames, setAgentNames] = useState({});
  const [agentEmails, setAgentEmails] = useState({});

  const itemsPerPage = 10;
  const [messageApi, contextHolder] = message.useMessage();

  const fetchAgentDetails = async (agentId, agentNumber) => {
    if (!agentId && !agentNumber) {
      console.log('No agent ID or number provided');
      return null;
    }
    
    const cacheKey = agentId || agentNumber;
    if (agentNames[cacheKey]) {
      console.log(`Agent ${cacheKey} already in cache`);
      return agentNames[cacheKey];
    }
    
    console.log(`Fetching agent details for:`, { agentId, agentNumber });
    
    try {
      const base = getApiBase();
      const tokenRaw = localStorage.getItem("myToken") || "";
      const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      
      let response;
      if (agentId) {
        console.log(`Making API call to: ${base}/agent/getAgentById/${agentId}`);
        response = await axios.get(`${base}/agent/getAgentById/${agentId}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } else if (agentNumber) {
        console.log(`Making API call to: ${base}/agent/getByNumber/${agentNumber}`);
        response = await axios.get(`${base}/agent/getByNumber/${agentNumber}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      }
      
      console.log('API Response:', response?.data);
      
      if (response?.data?.name) {
        const agentName = response.data.name;
        console.log(`Found agent:`, agentName);
        setAgentNames(prev => ({
          ...prev,
          [cacheKey]: agentName
        }));
        return agentName;
      } else {
        console.log('No agent details found in response');
        return null;
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        },
        request: error.request ? 'Request was made but no response received' : 'No request was made',
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      setAgentNames(prev => ({
        ...prev,
        [cacheKey]: 'Agent not found'
      }));
      
      return null;
    }
  };
  
  const fetchAgentName = (agentNumber) => fetchAgentDetails(null, agentNumber);

  const getNameFromEmail = (email) => {
    if (!email) return null;
    const username = email.split('@')[0];
    const nameParts = username.split(/[.\-_]/);
    return nameParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };

  const getAgentDisplayName = (item) => {
    if (item.agentName) {
      return item.agentName;
    }
    
    const cacheKey = item.agentNumber || item.agentEmail;
    if (cacheKey && agentNames[cacheKey]) {
      return agentNames[cacheKey];
    }
    
    if (item.agentEmail) {
      return getNameFromEmail(item.agentEmail);
    }
    
    return item.agentNumber || 'N/A';
  };
  
  const fetchAgentByEmail = async (email, agentNumber) => {
    if (!email) return;
    
    if (agentNumber?.name) {
      setAgentNames(prev => ({
        ...prev,
        [agentNumber || email]: agentNumber.name
      }));
      return agentNumber.name;
    }
    
    const cacheKey = agentNumber || email;
    if (agentNames[cacheKey]) {
      return agentNames[cacheKey];
    }
    
    const emailName = email ? getNameFromEmail(email) : null;
    if (emailName) {
      setAgentNames(prev => ({
        ...prev,
        [cacheKey]: emailName
      }));
      return emailName;
    }
    
    try {
      const base = getApiBase();
      const tokenRaw = localStorage.getItem('myToken') || '';
      const token = tokenRaw.replace(/^"|"$/g, '');
      
      const response = await axios.get(`${base}/api/agents/by-email`, {
        params: { email },
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        timeout: 2000
      });
      
      if (response.data?.name) {
        setAgentNames(prev => ({
          ...prev,
          [cacheKey]: response.data.name
        }));
        return response.data.name;
      }
    } catch (error) {
      console.debug('Agent name fetch failed, using fallback:', error.message);
    }
    
    return null;
  };

  const fetchEnquiriesData = async () => {
    setLoading(true);
    try {
      const base = getApiBase();
      const tokenRaw = localStorage.getItem("myToken") || "";
      const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      const res = await axios.get(`${base}/postEnq_view`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      
      const payload = res.data;
      const list = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
        ? payload
        : [];
      const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      sorted.forEach(item => {
        if (item.agentEmail) {
          fetchAgentByEmail(item.agentEmail, item.agentNumber);
        }
      });
      
      setEnquiries(sorted);
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

  const filteredEnquiries = enquiries.filter((item) => {
    const customerName = item.custName ? item.custName.toLowerCase() : '';
    const propertyAddress = item.propertyAddress ? item.propertyAddress.toLowerCase() : '';

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
      const base = getApiBase();
      const raw = localStorage.getItem("myToken") || "";
      const token = raw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      const response = await fetch(`${base}/postEnq_download`,
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

  const handleDelete = async (item) => {
    try {
      const confirmDelete = window.confirm(`Delete resale enquiry for ${item?.custName || item?.custEmail || item?._id}?`);
      if (!confirmDelete) return;
      const base = getApiBase();
      const raw = localStorage.getItem("myToken") || "";
      const token = raw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      const res = await axios.delete(`${base}/postEnq_delete/${item._id}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.status === 200) {
        messageApi.success('Deleted successfully');
        fetchEnquiriesData();
      } else {
        throw new Error('Non-200 response');
      }
    } catch (e) {
      console.error(e);
      messageApi.error('Failed to delete');
    }
  };

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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SalesHeadSidebar />
      <div className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 lg:px-6 py-4 overflow-x-hidden">
        {contextHolder}
        
        {/* Header Section */}
        <div className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6">
          {/* Search & Export Row */}
          <div className="flex flex-col lg:flex-row gap-3 w-full items-stretch lg:items-center">
            <div className="flex gap-2 flex-1 min-h-12">
              <input
                type="text"
                placeholder="Search by Customer Name or Address..."
                value={search}
                onChange={filter}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-gray-50"
              />
              <button 
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-md"
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
                onClick={downloadExcelFile}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-md min-h-12 whitespace-nowrap rounded-lg"
              >
                📥 Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Sr.No</th>
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <div>Agent Details</div>
                  <div className="text-xs font-normal">Number, Name & Email</div>
                </th>
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">
                  <div>Customer Details</div>
                  <div className="text-xs font-normal">Number, Name & Email</div>
                </th>
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Property Address</th>
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Date</th>
                <th className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <ClipLoader color="#6750A4" size={30} />
                      <p className="text-gray-500 font-medium">Loading enquiries...</p>
                    </div>
                  </td>
                </tr>
              ) : selectedEnquiries.length > 0 ? (
                selectedEnquiries.map((item, index) => (
                  <tr 
                    key={item?._id} 
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="px-3 md:px-4 py-4 text-center text-xs md:text-sm font-medium text-gray-800">{startIndex + index + 1}</td>
                    
                    {/* Agent Details */}
                    <td className="px-3 md:px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-green-100 text-green-800 text-xs md:text-sm font-medium text-center">
                          👤 {getAgentDisplayName(item)}
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-800 text-xs md:text-sm font-medium text-center">
                          📱 {item.agentNumber || 'N/A'}
                        </div>
                        {item.agentEmail && (
                          <div className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-800 text-xs truncate text-center">
                            ✉️ {item.agentEmail}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Customer Details */}
                    <td className="px-3 md:px-4 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-pink-100 text-pink-800 text-xs md:text-sm font-medium text-center">
                          👤 {item.custName || 'N/A'}
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-cyan-100 text-cyan-800 text-xs md:text-sm font-medium text-center">
                          📱 {item.custNumber || 'N/A'}
                        </div>
                        {item.custEmail && (
                          <div className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs truncate text-center">
                            ✉️ {item.custEmail}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Property Address */}
                    <td className="px-3 md:px-4 py-4">
                      <div className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-800 text-xs md:text-sm text-center break-words">
                        🏠 {item.propertyAddress || 'No address'}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-3 md:px-4 py-4">
                      <div className="px-3 py-1.5 rounded-lg bg-teal-100 text-teal-800 text-xs md:text-sm font-medium text-center whitespace-nowrap">
                        📅 {formatDateTime(item.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 md:px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item)}
                        className="px-3 md:px-4 py-2 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 border border-red-700 rounded-lg transition font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-gray-500 italic text-sm md:text-base">
                    📭 No resale enquiries found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 flex-wrap py-8 px-4">
          <button
            onClick={loadBack}
            disabled={currentPage === 1 || loading}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500 hover:shadow-md'
            }`}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handleClick(pageNum)}
              disabled={loading}
              className={`px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={loadMore}
            disabled={currentPage === totalPages || loading}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-bold transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500 hover:shadow-md'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResaleEnquiries;