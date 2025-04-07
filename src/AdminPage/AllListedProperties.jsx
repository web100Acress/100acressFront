import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Eye,Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {Oval} from "react-loader-spinner";
import { PaginationControls } from "../Components/Blog_Components/BlogManagement";
import { Modal } from "antd";
const customStyle = {
  position: "absolute",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};
const AllListedProperties = () => {
  const token = localStorage.getItem("myToken");
  const [allListedProperty, setAllListedProperty] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [pageLimit, setPageLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [ error, setError ] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you Want to delete this Property?');
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [isVerified, setIsVerified] = useState('verified');

  const fetchData =  useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://localhost:3500/postPerson/view/allListedProperty/?page=${currentPage}&limit=${pageLimit}&verify=${isVerified}`,
        { 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          }
        }
      );
      if(res.status >= 200 || res.status < 300) {
        console.log("PropertyData: ", res.data.data[0].data);
        setAllListedProperty(res.data.data?.[0].data || []);
        setTotalPages(res.data.data?.[0].totalPages || 0);
        setIsLoading(false);
        
      }
    } catch (error) {
      setError(error || error.message);
      setIsLoading(false);
      console.log(error || error.message);
    }
    finally {
      setIsLoading(false);
    }
  }, [currentPage, pageLimit, sortField, isVerified]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showModal = () => {
    setOpenModal(true);
  };


  const handleOk = async() => {
    setModalText('Wait...');
    setConfirmLoading(true);
    const isDeleted = await handleDeleteProperty(propertyToDelete);
    if (isDeleted.success) {
      setModalText('Property deleted successfully.');
      setAllListedProperty(prevProperties => prevProperties.filter(property => property._id !== propertyToDelete));
      setConfirmLoading(false);
      setOpenModal(false);
    }
    else {
      setModalText('Error deleting Property.');
      setConfirmLoading(false);
      setOpenModal(false);
    }

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
    setPropertyToDelete(null);
  };

  const handleDeleteProperty = async (id) => {
    try {
      const res = await axios.delete(
        `https://api.100acress.com/postPerson/propertyDelete/${id}`
      );
      if (res.status >= 200 && res.status < 300) {
        return {
          success: true,
          message: "Property deleted successfully",
        }
      } else {
        return {
          success: false,
          message: "Error deleting property",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  };

  const handleDeleteButtonClicked = (id) => {
    showModal();
    setPropertyToDelete(id);
    setModalText('Do you Want to delete this Property?');
  };


  return (
    <>
      <Sidebar />
      <div className="" style={customStyle}>
      <div className="max-w-6xl  mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Properties Listed</h1>
        </div>
          <Modal
            title="Delete Property"
            open={openModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex space-x-4">
            <select 
              value={pageLimit} 
              onChange={(e) => setPageLimit(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <select 
              value={isVerified} 
              onChange={(e) => setIsVerified(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value={'verified'}>verified</option>
              <option value={'unverified'}>unverified</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              { isLoading === true ? (
                <Oval
                  height={50}
                  width={50}
                  color="#C13B44"
                  ariaLabel="loading-indicator"
                  wrapperStyle={{}}
                  wrapperClass="loading-indicator"
                  visible={true}
                />
              ) : (
                  <>
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      FrontImage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      // onClick={() => toggleSort("title")}
                    >
                      <div className="flex items-center gap-1">
                        Property Name
                        {/* {sortField === "title" &&
                          (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)} */}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      // onClick={() => toggleSort("date")}
                    >
                      <div className="flex items-center gap-1">
                        Address
                        {/* {sortField === "date" &&
                          (sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)} */}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rent/Sale
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allListedProperty.length > 0 ? (
                    allListedProperty.map((property) => (
                      <tr key={property._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-30 w-36 relative">
                              <img
                                src={property?.frontImage?.url || "/placeholder.svg"}
                                alt={property?.propertyName}
                                className="object-fill rounded"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer" 
                            
                          >
                            {property.propertyName}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">{property.propertyType}</div>
                        </td>
                        <td className="w-48 text-wrap px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property?.price} </td>
                        { property?.address ? <td className="w-48 px-6 py-4 text-wrap text-sm text-gray-500">
                        {property?.address}
                        </td> : <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>}
      
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property?.propertyLooking}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link to={`/Admin/viewproperty/viewdetails/${property._id}`}>
                              <button
                                className="text-primaryRed hover:text-blue-900"
                                
                                title="View"
                              >
                                <Eye size={18} />
                              </button>
                            </Link>
                            <Link to={`/Admin/viewproperty/editdetails/${property._id}`}>
                              <button
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                            </Link>

                            <button
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                              onClick={() => handleDeleteButtonClicked(property._id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No Properties found matching your search criteria.
                      </td>
                    </tr>
                  )}
                  <tfoot>
                    <tr>
                      {totalPages >= 1 && 
                        <>
                          <td className="px-6 py-4">
                              <PaginationControls
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                              />
                          </td>
                        </>
                      }

                    </tr>
                  </tfoot>
                </tbody>
                  </>
                )}
            </table>
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default AllListedProperties;
