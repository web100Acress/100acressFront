import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Tippy from '@tippyjs/react';
import { Link } from "react-router-dom";
import { MdPeople, MdSearch, MdVisibility } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const UserAdmin = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myToken = localStorage.getItem("myToken");
        const res = await axios.get(
          "https://api.100acress.com/postPerson/view/allusers",
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setViewAll(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = viewAll.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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
    <>
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-8 ml-64 overflow-auto font-sans">
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
              {/* <div className="flex items-center gap-2 mb-8">
                <MdPeople className="text-3xl text-blue-500 animate-pulse" />
                <h1 className="text-3xl font-bold text-gray-800">Registered Users</h1>
              </div> */}
            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-lg">
                <Tippy content={<span>Search by name</span>} animation="scale" theme="light-border">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm text-base"
                  />
                </Tippy>
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              </div>
            </div>
            {/* User Table Card */}
            <div className="bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-red-400 to-red-600 p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S No.</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mobile Number</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRows.map((item, index) => {
                      const serialNumber = indexOfFirstRow + index + 1;
                      const userId = item._id;
                      return (
                        <tr key={index} className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{serialNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full shadow-sm">{item.email}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full shadow-sm">{item.mobile}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatLastModified(item.createdAt)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <Tippy content={<span>View Property</span>} animation="scale" theme="light-border">
                              <Link to={`/Admin/viewproperty/${userId}`}>
                                <button className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:from-red-500 hover:to-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                  <MdVisibility className="text-lg" /> View Property
                                </button>
                              </Link>
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
                  { length: Math.ceil(filteredProjects.length / rowsPerPage) },
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
    </>
  );
};

export default UserAdmin;