import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { message } from "antd"; // Import Ant Design message for modern notifications
import { MdHome, MdSearch, MdVisibility, MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ViewPropertyAdmin = () => {
  const [viewProperty, setViewAllProperty] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Number of rows per page
  const [searchTerm, setSearchTerm] = useState("");
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message hook
  const [tableOpen, setTableOpen] = useState(true);

  // Calculate rows to display based on current page and search term
  const filteredRows = viewProperty.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    // Ensure properties exist and are strings before calling toLowerCase()
    return (
      (item.propertyName && typeof item.propertyName === "string" && item.propertyName.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.propertyType && typeof item.propertyType === "string" && item.propertyType.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.city && typeof item.city === "string" && item.city.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  const currentRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const { id } = useParams();
  // Fetch user details and their properties on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/postPerson/propertyView/${id}`
        );
        if (res.data && res.data.data) {
          setUserDetails({
            name: res.data.data?.name || "N/A",
            email: res.data.data?.email || "N/A",
            mobile: res.data.data?.mobile || "N/A",
          });
          setViewAllProperty(res.data.data.postProperty || []);
        } else {
          messageApi.open({
            type: 'warning',
            content: 'User or property data not found.',
            duration: 3,
          });
          setUserDetails({ name: "N/A", email: "N/A", mobile: "N/A" });
          setViewAllProperty([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        messageApi.open({
          type: 'error',
          content: 'Failed to load user and property data. Please try again.',
          duration: 3,
        });
        setUserDetails({ name: "N/A", email: "N/A", mobile: "N/A" });
        setViewAllProperty([]);
      }
    };

    fetchData();
  }, [id, messageApi]); // Depend on 'id' and 'messageApi'

  const handleDeleteUser = async (propertyId) => {
    messageApi.open({
      key: "deletingProperty",
      type: 'loading',
      content: 'Deleting property...',
    });

    try {
      const res = await axios.delete(
        `https://api.100acress.com/postPerson/propertyDelete/${propertyId}`
      );
      if (res.status >= 200 && res.status < 300) {
        messageApi.destroy('deletingProperty');
        messageApi.open({
          type: 'success',
          content: 'Property deleted successfully!',
          duration: 2,
        });
        // Update the state to remove the deleted property without full reload
        setViewAllProperty(prevProperties =>
          prevProperties.filter(item => item._id !== propertyId)
        );
      } else {
        messageApi.destroy('deletingProperty');
        messageApi.open({
          type: 'error',
          content: 'Failed to delete property. Server returned an error.',
          duration: 2,
        });
        console.error("Failed to delete property. Server returned an error.");
      }
    } catch (error) {
      messageApi.destroy('deletingProperty');
      messageApi.open({
        type: 'error',
        content: 'An error occurred while deleting property.',
        duration: 2,
      });
      console.error("An error occurred while deleting property:", error.message);
    }
  };

  const handleDeleteButtonClicked = (propertyId) => {
    // Replace window.confirm with a custom modal or Ant Design Modal.confirm if desired
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (confirmDelete) {
      handleDeleteUser(propertyId);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-8 ml-64 overflow-auto font-sans">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            {/* <div className="flex items-center gap-2 mb-8">
              <MdHome className="text-3xl text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800">User Properties</h1>
            </div> */}
            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-lg">
                <Tippy content={<span>Search by name, email, or mobile</span>} animation="scale" theme="light-border">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm text-base"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </Tippy>
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              </div>
              <div className="flex justify-end ml-6">
                <Link to={`/Admin/postPerson/addproperty/${id}`}>
                  {/* <button className="bg-blue-700 px-6 py-2 rounded-lg text-white ml-2 font-medium shadow-md hover:bg-blue-800 transition duration-200">Add New</button> */}
                </Link>
              </div>
            </div>
            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap items-center gap-8 mb-6 border-l-4 border-gradient-to-r from-red-400 to-red-600">
              <div className="flex flex-col gap-2">
                <span className="text-red-600 font-semibold">Name: <span className="text-gray-800 font-normal">{userDetails?.name}</span></span>
                <span className="text-red-600 font-semibold">Mobile: <span className="text-gray-800 font-normal">{userDetails?.mobile}</span></span>
                <span className="text-red-600 font-semibold">Email: <span className="text-gray-800 font-normal">{userDetails?.email}</span></span>
              </div>
            </div>
            {/* Property Table Card */}
            <div className="bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-red-400 to-red-600 p-6">
              {/* Collapsible Table Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Properties Table
                </h2>
                <Tippy content={<span>{tableOpen ? 'Collapse Table' : 'Expand Table'}</span>} animation="scale" theme="light-border">
                  <button
                    aria-label={tableOpen ? 'Collapse Table' : 'Expand Table'}
                    onClick={() => setTableOpen((prev) => !prev)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <span className={tableOpen ? 'rotate-0 transition-transform duration-300' : '-rotate-90 transition-transform duration-300'}>
                      {tableOpen ? <MdExpandLess size={28} /> : <MdExpandMore size={28} />}
                    </span>
                  </button>
                </Tippy>
              </div>
              {/* Collapsible Table Content */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${tableOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                aria-hidden={!tableOpen}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Sr.no</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Property type</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Property name</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentRows.map((item, index) => {
                        const userId = item._id;
                        return (
                          <tr key={index} className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                            <td className="px-2 py-1 text-center text-sm font-medium text-gray-900">{index + 1}</td>
                            <td className="px-2 py-1 text-center text-sm text-gray-800">{item.propertyType}</td>
                            <td className="px-2 py-1 text-center text-sm text-gray-800">{item.propertyName}</td>
                            <td className="px-2 py-1 text-center text-sm text-gray-800">{item.city}</td>
                            <td className="px-2 py-1 flex justify-center items-center gap-2">
                              <Tippy content={<span>View Details</span>} animation="scale" theme="light-border">
                                <Link to={`/Admin/viewproperty/viewdetails/${userId}`}>
                                  <button type="button" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <MdVisibility className="text-lg" /> View
                                  </button>
                                </Link>
                              </Tippy>
                              <Tippy content={<span>Edit Property</span>} animation="scale" theme="light-border">
                                <Link to={`/Admin/viewproperty/editdetails/${userId}`}>
                                  <button type="button" className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-400 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                    <MdEdit className="text-lg" /> Edit
                                  </button>
                                </Link>
                              </Tippy>
                              <Tippy content={<span>Delete Property</span>} animation="scale" theme="light-border">
                                <button type="button" onClick={() => handleDeleteButtonClicked(userId)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2">
                                  <MdDelete className="text-lg" /> Delete
                                </button>
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
                    { length: Math.ceil(viewProperty.length / rowsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${currentPage === index + 1 ? 'bg-red-500 text-white border-red-500 shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'}`}
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
      </div>
    </>
  );
};

export default ViewPropertyAdmin;