import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
  const [tableOpen, setTableOpen] = useState(true);
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
        const res = await axios.get(`https://api.100acress.com/postPerson/propertyView/${id}`);
        const data = res.data?.data;
        if (data) {
          setUserDetails({
            name: data.name || "N/A",
            email: data.email || "N/A",
            mobile: data.mobile || "N/A",
          });
          setViewAllProperty(data.postProperty || []);
        } else {
          messageApi.open({ type: 'warning', content: 'User or property data not found.', duration: 3 });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        messageApi.open({ type: 'error', content: 'Failed to load data.', duration: 3 });
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteProperty = async (propertyId) => {
    messageApi.open({ key: 'deleteProp', type: 'loading', content: 'Deleting property...' });
    try {
      const res = await axios.delete(`https://api.100acress.com/postPerson/propertyDelete/${propertyId}`);
      if (res.status >= 200 && res.status < 300) {
        messageApi.destroy('deleteProp');
        messageApi.success('Property deleted');
        setViewAllProperty(prev => prev.filter(p => p._id !== propertyId));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      messageApi.destroy('deleteProp');
      messageApi.error('Error deleting property');
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("Delete user and all properties?")) return;
    messageApi.open({ key: 'deleteUser', type: 'loading', content: 'Deleting user...' });
    try {
      const token = localStorage.getItem("myToken");
      const res = await axios.delete(`https://api.100acress.com/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status >= 200 && res.status < 300) {
        messageApi.destroy('deleteUser');
        messageApi.success('User deleted');
        navigate("/Admin/user");
      } else {
        throw new Error();
      }
    } catch (err) {
      messageApi.destroy('deleteUser');
      messageApi.error('Error deleting user');
    }
  };

  return (
    <>
      {contextHolder}
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
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow"
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
