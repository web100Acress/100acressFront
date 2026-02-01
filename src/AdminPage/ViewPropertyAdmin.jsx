import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../config/apiClient";
import { Modal, notification } from "antd";
import { Toaster } from 'react-hot-toast';
import showToast from "../Utils/toastUtils";
import { MdSearch, MdVisibility, MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ViewPropertyAdmin = () => {
  const [viewProperty, setViewAllProperty] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", mobile: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableOpen, setTableOpen] = useState(true);
  const [deletingUser, setDeletingUser] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredRows = viewProperty.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      (item.propertyName || '').toLowerCase().includes(lowerSearch) ||
      (item.propertyType || '').toLowerCase().includes(lowerSearch) ||
      (item.city || '').toLowerCase().includes(lowerSearch)
    );
  });

  const currentRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const paginate = (page) => setCurrentPage(page);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching data for user ID:', id);
        const token = localStorage.getItem("myToken");
        console.log('🔑 Token available:', token ? 'Yes' : 'No');

        if (!token) {
          showToast.error('Authentication token not found. Please login again.');
          return;
        }
        // api client will inject Authorization header automatically
        const config = { headers: { 'Content-Type': 'application/json' } };
        
        // Try multiple endpoints to find the working one
        const endpoints = [
          `/postPerson/propertyView/${id}`,
          `/postPerson/view/${id}`,
          `/user/view/${id}`,
          `/admin/user/${id}`
        ];
        
        let success = false;
        
        for (const endpoint of endpoints) {
          try {
            console.log(`🌐 Trying endpoint: ${endpoint}`);
            const res = await api.get(endpoint, config);
            console.log('✅ API Response:', res.data);
            
            const data = res.data?.data || res.data;
            if (data) {
              setUserDetails({
                name: data.name || "N/A",
                email: data.email || "N/A",
                mobile: data.mobile || "N/A",
              });
              setViewAllProperty(data.postProperty || data.properties || []);
              console.log('🔥 Showing success toast with centralized toast utility...');
              showToast.success(showToast.successMessages.dataLoaded);
              console.log('✅ Toast will disappear after 2 seconds');
              success = true;
              break;
            }
          } catch (endpointError) {
            console.log(`❌ Endpoint ${endpoint} failed:`, endpointError.response?.status);
            continue;
          }
        }
        
        if (!success) {
          // If all endpoints fail, show user data from URL params or create mock data
          console.log('📝 All endpoints failed, using fallback data');
          setUserDetails({
            name: "User Data Unavailable",
            email: "Please check backend connection",
            mobile: "N/A"
          });
          setViewAllProperty([]);
          showToast.warning(showToast.warningMessages.backendUnavailable);
        }
        
      } catch (error) {
        console.error("❌ Critical error fetching data:", error);
        showToast.error(showToast.errorMessages.loadingError);
      }
    };
    
    if (id) {
      fetchData();
    } else {
      showToast.error('User ID is missing from URL');
    }
  }, [id]);

  const handleDeleteProperty = async (propertyId) => {
    showToast.loading('Deleting property...', { id: 'deleteProp' });
    try {
      const res = await api.delete(`/postPerson/propertyDelete/${propertyId}`);
      if (res.status >= 200 && res.status < 300) {
        showToast.dismiss('deleteProp');
        showToast.success(showToast.successMessages.deleteSuccess);
        setViewAllProperty(prev => prev.filter(p => p._id !== propertyId));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      showToast.dismiss('deleteProp');
      showToast.error(showToast.errorMessages.deleteError);
    }
  };

  const handleDeleteUser = async () => {
    if (deletingUser) return; // guard against double-clicks

    // Use reliable native confirm to avoid popup/z-index issues
    const confirmed = window.confirm(
      `Are you sure you want to delete this user?\n\nUser: ${userDetails.name}\nEmail: ${userDetails.email}\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      showToast.info('Deletion cancelled.');
      return;
    }

    setDeletingUser(true);
    showToast.loading('Deleting user...', { id: 'deleteUser' });
    try {
      const token = localStorage.getItem('myToken');
      if (!token) {
        showToast.dismiss('deleteUser');
        notification.error({ message: 'Auth error', description: 'Authentication token not found. Please login again.', placement: 'topRight' });
        setDeletingUser(false);
        return;
      }

      // Delete from PostProperty users collection only (do not match by email/mobile)
      let deleteSuccess = false;
      try {
        const res = await api.delete(`/postPerson/deleteUser/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000,
        });
        deleteSuccess = res.status >= 200 && res.status < 300;
      } catch (endpointError) {
        console.log('❌ Delete failed:', endpointError.response?.status || endpointError.message);
        showToast.error(endpointError?.response?.data?.message || showToast.errorMessages.deleteError);
      }

      showToast.dismiss('deleteUser');
      if (deleteSuccess) {
        notification.success({ message: 'User deleted', description: 'The user was deleted successfully.', placement: 'topRight' });
        showToast.success(showToast.successMessages.deleteSuccess);
        navigate('/Admin/user');
      } else {
        notification.error({ message: 'Delete failed', description: 'Backend did not confirm deletion. Please try again or check server logs.', placement: 'topRight' });
        showToast.error(showToast.errorMessages.deleteError);
      }
    } catch (err) {
      console.error('❌ Critical delete error:', err);
      showToast.dismiss('deleteUser');
      notification.error({ message: 'Delete failed', description: 'Critical error during deletion. Please try again.', placement: 'topRight' });
      showToast.error(showToast.errorMessages.deleteError);
    } finally {
      setDeletingUser(false);
    }
  };

  return (
    <>
      <Toaster />
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-8 ml-64 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Search Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-lg">
                <Tippy content={<span>Search by name, type, city</span>} animation="scale">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 border rounded-full focus:ring-2 focus:ring-red-500"
                  />
                </Tippy>
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              </div>
              <Link to={`/Admin/postPerson/addproperty/${id}`}></Link>
            </div>

            {/* User Info */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 flex justify-between items-center">
              <div>
                <p><b>Name:</b> {userDetails.name}</p>
                <p><b>Mobile:</b> {userDetails.mobile}</p>
                <p><b>Email:</b> {userDetails.email}</p>
              </div>
              <button
                onClick={handleDeleteUser}
                disabled={deletingUser}
                className={`px-5 py-2 ${deletingUser ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white rounded-full shadow transition-colors duration-200`}
                title="Delete user (backend support may be limited)"
              >
                <MdDelete className="inline mr-1" /> Delete User
              </button>
            </div>

            {/* Property Table */}
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Properties Table</h2>
                <button onClick={() => setTableOpen(!tableOpen)} className="p-2">
                  {tableOpen ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                </button>
              </div>
              {tableOpen && (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2">#</th>
                          <th className="px-4 py-2">Type</th>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">City</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRows.map((item, index) => (
                          <tr key={item._id} className="even:bg-gray-50">
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{item.propertyType}</td>
                            <td className="px-4 py-2 text-center">{item.propertyName}</td>
                            <td className="px-4 py-2 text-center">{item.city}</td>
                            <td className="px-4 py-2 text-center space-x-2">
                              <Link to={`/Admin/viewproperty/viewdetails/${item._id}`}>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                              </Link>
                              <Link to={`/Admin/viewproperty/editdetails/${item._id}`}>
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                              </Link>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete this property?")) handleDeleteProperty(item._id);
                                }}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                              >Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-6 flex-wrap gap-2">
                    {Array.from({ length: Math.ceil(filteredRows.length / rowsPerPage) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded border ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>  
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPropertyAdmin;