import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { PaginationControls } from "../Components/Blog_Components/BlogManagement"; // Assuming this path is correct and the component is structured to receive classes
import { Modal, message } from "antd"; // Import message from antd

const AllListedProperties = () => {
  const token = localStorage.getItem("myToken");
  const [allListedProperty, setAllListedProperty] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you want to delete this Property?');
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [isVerified, setIsVerified] = useState('verified');

  const [messageApi, contextHolder] = message.useMessage();

  // Effect to inject styles into the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = allListedPropertiesStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up styles on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.100acress.com/postPerson/view/allListedProperty/?page=${currentPage}&limit=${pageLimit}&verify=${isVerified}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (res.status >= 200 && res.status < 300) {
        console.log("PropertyData: ", res.data.data?.[0].data);
        setAllListedProperty(res.data.data?.[0].data || []);
        setTotalPages(res.data.data?.[0].totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(error || error.message);
      messageApi.error("Failed to fetch properties. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageLimit, isVerified, token, messageApi]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = async () => {
    setModalText('Deleting...');
    setConfirmLoading(true);
    const result = await handleDeleteProperty(propertyToDelete);
    if (result.success) {
      messageApi.success("Property deleted successfully!");
      setAllListedProperty(prevProperties => prevProperties.filter(property => property._id !== propertyToDelete));
      setModalText('Do you want to delete this Property?');
      setConfirmLoading(false);
      setOpenModal(false);
    } else {
      messageApi.error(`Error deleting Property: ${result.message}`);
      setModalText('Error deleting Property.');
      setConfirmLoading(false);
      setOpenModal(false);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
    setPropertyToDelete(null);
    setModalText('Do you want to delete this Property?');
  };

  const handleDeleteProperty = async (id) => {
    try {
      const res = await axios.delete(
        `https://api.100acress.com/postPerson/propertyDelete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
      );
      if (res.status >= 200 && res.status < 300) {
        return {
          success: true,
          message: "Property deleted successfully",
        }
      } else {
        return {
          success: false,
          message: res.data?.message || "Unknown error",
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      }
    }
  };

  const handleDeleteButtonClicked = (id) => {
    showModal();
    setPropertyToDelete(id);
    setModalText('Do you want to delete this Property?');
  };


  return (
    <>
      <Sidebar />
      <div className="all-listed-properties-main-content">
        {contextHolder} {/* For Ant Design messages */}
        <div className="properties-header">
          <h1 className="properties-title">Properties Listed</h1>
          <div className="filter-controls">
            <select
              value={pageLimit}
              onChange={(e) => {
                setPageLimit(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when limit changes
              }}
              className="select-dropdown"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <select
              value={isVerified}
              onChange={(e) => {
                setIsVerified(e.target.value);
                setCurrentPage(1); // Reset to first page when verification status changes
              }}
              className="select-dropdown"
            >
              <option value={'verified'}>Verified</option>
              <option value={'unverified'}>Unverified</option>
            </select>
          </div>
        </div>

        <Modal
          title="Confirm Deletion"
          open={openModal}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Delete"
          cancelText="Cancel"
          maskClosable={false} // Prevent closing by clicking outside
          className="delete-modal" // Custom class for modal styling
        >
          <p className="modal-text">{modalText}</p>
        </Modal>

        <div className="table-container-wrapper">
          <div className="table-scroll-area">
            <table className="properties-table">
              <thead className="table-header-group">
                <tr>
                  <th scope="col" className="table-header image-col">Front Image</th>
                  <th scope="col" className="table-header name-col">Property Name</th>
                  <th scope="col" className="table-header price-col">Price</th>
                  <th scope="col" className="table-header address-col">Address</th>
                  <th scope="col" className="table-header type-col">Rent/Sale</th>
                  <th scope="col" className="table-header postedby-col">Posted By</th>
                  <th scope="col" className="table-header actions-col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="loading-state-cell">
                      <Oval
                        height={50}
                        width={50}
                        color="#6c5ce7" // Match primary color for loader
                        ariaLabel="loading-indicator"
                        wrapperClass="loader-spinner-wrapper"
                        visible={true}
                      />
                      <p>Loading properties...</p>
                    </td>
                  </tr>
                ) : allListedProperty.length > 0 ? (
                  allListedProperty.map((property) => (
                    <tr key={property._id} className="table-row">
                      <td className="table-cell image-cell">
                        <div className="property-image-wrapper">
                          <img
                            src={property?.frontImage?.url || "https://via.placeholder.com/150x100?text=No+Image"} // Placeholder for no image
                            alt={property?.propertyName || "Property Image"}
                            className="property-image"
                          />
                        </div>
                      </td>
                      <td className="table-cell name-cell">
                        <div className="property-name-text">
                          {property.propertyName}
                        </div>
                        <div className="property-type-text">
                          {property.propertyType}
                        </div>
                      </td>
                      <td className="table-cell price-cell">{property?.price ? `₹${Number(property.price).toLocaleString('en-IN')}` : 'N/A'}</td> {/* Format price */}
                      <td className="table-cell address-cell">
                        {property?.address || 'N/A'}
                      </td>
                      <td className="table-cell property-looking-cell">
                        <span className={`status-badge ${property?.propertyLooking?.toLowerCase()}`}>
                          {property?.propertyLooking || 'N/A'}
                        </span>
                      </td>
                      <td className="table-cell posted-by-cell">
                        {property?.name || 'N/A'}
                      </td>
                      <td className="table-cell actions-cell">
                        <div className="actions-buttons-container">
                          <Link to={`/Admin/viewproperty/viewdetails/${property._id}`} title="View Details">
                            <button className="action-button view-button">
                              <Eye size={18} />
                            </button>
                          </Link>
                          <Link to={`/Admin/viewproperty/editdetails/${property._id}`} title="Edit Property">
                            <button className="action-button edit-button">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button
                            className="action-button delete-button"
                            title="Delete Property"
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
                    <td colSpan={7} className="no-data-message">
                      No properties found. Adjust filters or try again.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="pagination-controls-container">
              <PaginationControls
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllListedProperties;

// --- Embedded CSS Styles ---
const allListedPropertiesStyles = `
/* Overall Layout */
.all-listed-properties-main-content {
  flex: 1;
  min-width: 0;
  padding: 3.5rem 2.5rem; /* Increased padding for spaciousness */
  margin-left: 250px; /* Aligns with Sidebar width */
  background: linear-gradient(135deg, #eef2f7 0%, #dce4ee 100%); /* Subtle cool gradient */
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif; /* A slightly softer, modern font */
  color: #2c3e50; /* Deep charcoal for text */
  transition: all 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .all-listed-properties-main-content {
    margin-left: 0;
    padding: 2.5rem 1.5rem;
  }
}

/* Header and Controls */
.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem; /* More vertical space */
  flex-wrap: wrap;
  gap: 1.5rem;
}

.properties-title {
  font-size: 2.5rem; /* Larger, more prominent title */
  font-weight: 700;
  color: #34495e; /* Darker, more impactful color */
  letter-spacing: -0.02em;
}

.filter-controls {
  display: flex;
  gap: 1.2rem; /* Spacing between select boxes */
  flex-wrap: wrap;
}

.select-dropdown {
  padding: 12px 18px;
  border-radius: 10px; /* Rounded corners for dropdowns */
  border: 1px solid #d4dbe8;
  background-color: #ffffff;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Soft shadow */
  appearance: none; /* Remove default arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c5ce7'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E"); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
}

.select-dropdown:hover {
  border-color: #aeb8c6;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.select-dropdown:focus {
  outline: none;
  border-color: #6c5ce7;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
}

/* Modal Styling (Ant Design override) */
.delete-modal .ant-modal-content {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 25px;
}

.delete-modal .ant-modal-header {
  border-bottom: none;
  padding: 15px 24px 0;
}

.delete-modal .ant-modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #34495e;
  text-align: center;
}

.delete-modal .ant-modal-body {
  padding: 20px 24px;
}

.delete-modal .modal-text {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
}

.delete-modal .ant-modal-footer {
  border-top: none;
  padding: 10px 24px 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.delete-modal .ant-btn {
  border-radius: 8px;
  height: 45px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.delete-modal .ant-btn-default { /* Cancel button */
  background-color: #eceff1;
  color: #607d8b;
  border-color: #eceff1;
}

.delete-modal .ant-btn-default:hover {
  background-color: #cfd8dc;
  color: #455a64;
  border-color: #cfd8dc;
  transform: translateY(-2px);
}

.delete-modal .ant-btn-primary { /* OK/Delete button */
  background-color: #e74c3c;
  border-color: #e74c3c;
}

.delete-modal .ant-btn-primary:hover {
  background-color: #c0392b;
  border-color: #c0392b;
  transform: translateY(-2px);
}

/* Table Styling */
.table-container-wrapper {
  background-color: #ffffff;
  border-radius: 22px; /* Even larger, more prominent rounded corners */
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.15); /* Deeper, more spread-out shadow */
  margin-bottom: 3rem;
  border: 1px solid #e0e6ed;
  overflow: hidden; /* Ensures rounded corners are visible */
}

.table-scroll-area {
  overflow-x: auto; /* Allows horizontal scrolling for table */
}

.properties-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1100px; /* Ensure ample width for content */
  font-size: 0.98rem;
}

.table-header-group {
  background: linear-gradient(90deg, #f7f9fb 0%, #eef3f8 100%); /* Very subtle header gradient */
}

.table-header {
  padding: 20px 25px; /* Generous padding */
  text-align: left; /* Align headers to left, except actions */
  font-size: 0.92rem; /* Slightly larger header font */
  font-weight: 700;
  color: #617790; /* Muted steel blue */
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 2px solid #e5e9f2;
  position: sticky;
  top: 0;
  z-index: 1;
}

.table-header.actions-col {
    text-align: right; /* Align actions header to right */
}


.table-header:first-child {
  border-top-left-radius: 22px;
}

.table-header:last-child {
  border-top-right-radius: 22px;
}

.table-body .table-row:nth-child(even) {
  background-color: #fbfcfe; /* Very light, almost white stripe */
}

.table-body .table-row:hover {
  background-color: #e6f7ff; /* Clear, bright blue on hover */
  transition: background-color 0.3s ease, transform 0.1s ease;
  transform: scale(1.005);
  box-shadow: inset 0 0 0 1px rgba(108, 92, 231, 0.1); /* Subtle inner shadow on hover */
}

.table-cell {
  padding: 18px 25px; /* Increased padding */
  text-align: left; /* Align cells to left */
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

/* Specific Column Styling */
.image-col { width: 15%; }
.name-col { width: 20%; }
.price-col { width: 15%; }
.address-col { width: 25%; }
.type-col { width: 10%; }
.postedby-col { width: 10%; }
.actions-col { width: 15%; text-align: right; } /* Align actions column to right */

.property-image-wrapper {
  width: 120px; /* Fixed width for image container */
  height: 80px; /* Fixed height */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  margin-right: 15px; /* Space between image and text */
  flex-shrink: 0;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers area without distortion */
  display: block;
}

.property-name-text {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 5px;
  white-space: normal; /* Allow wrap for name */
  word-wrap: break-word;
}

.property-type-text {
  color: #7f8c8d;
  font-size: 0.85rem;
  white-space: normal;
  word-wrap: break-word;
}

.price-cell {
    font-weight: 600;
    color: #4CAF50; /* Green for price */
}

.address-cell {
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  max-width: 250px; /* Control address column width */
}

.status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
}

.status-badge.rent {
    background-color: #e0f2f7; /* Light blue */
    color: #2196f3; /* Blue */
}

.status-badge.sale {
    background-color: #e8f5e9; /* Light green */
    color: #4CAF50; /* Green */
}

.actions-buttons-container {
  display: flex;
  justify-content: flex-end; /* Align action buttons to the right */
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}

.action-button svg {
  stroke-width: 2.2px; /* Make icons a bit bolder */
}

.view-button {
  background-color: #e0f2f7; /* Light blue */
  color: #2196f3; /* Blue */
}
.view-button:hover {
  background-color: #bbdefb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
}

.edit-button {
  background-color: #fff3e0; /* Light orange */
  color: #ff9800; /* Orange */
}
.edit-button:hover {
  background-color: #ffe0b2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.2);
}

.delete-button {
  background-color: #ffebee; /* Light red */
  color: #f44336; /* Red */
}
.delete-button:hover {
  background-color: #ffcdd2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.2);
}


.loading-state-cell, .no-data-message {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 500;
  background-color: #ffffff;
  border-radius: 0 0 22px 22px;
  color: #8898aa;
}

.loader-spinner-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
}

/* Pagination - Enhanced Styling */
.pagination-controls-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  background-color: #ffffff;
  border-top: 1px solid #e5e9f2;
  border-radius: 0 0 22px 22px;
  gap: 0.75rem; /* Smoother spacing between buttons */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  box-shadow: inset 0 8px 15px rgba(0, 0, 0, 0.03); /* Subtle inner shadow for the footer area */
}

/* Targeting common button styles within PaginationControls */
/* IMPORTANT: These styles assume PaginationControls renders <button> elements directly. */
/* If PaginationControls renders different elements, update these selectors accordingly. */
.pagination-controls-container button {
  padding: 10px 16px;
  border-radius: 10px; /* Slightly more rounded buttons */
  border: 1px solid #d4dbe8; /* Soft border for a clean look */
  background-color: #ffffff;
  color: #5a6d80; /* Muted text color for normal buttons */
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); /* Smoother transition effect */
  box-shadow: 0 3px 10px rgba(0,0,0,0.06); /* Subtle shadow for depth */
  min-width: 40px; /* Ensure a minimum width for number buttons */
  height: 40px; /* Ensure a consistent height for all buttons */
  display: flex; /* Use flex to center text/icons if any */
  justify-content: center;
  align-items: center;
  text-decoration: none; /* Ensure no underline if it's a Link or similar */
}

.pagination-controls-container button:hover:not(:disabled) {
  background-color: #f0f4f7; /* Lighter background on hover */
  border-color: #aeb8c6;
  color: #2c3e50; /* Darker text on hover */
  transform: translateY(-2px); /* Lift effect on hover */
  box-shadow: 0 6px 15px rgba(0,0,0,0.1); /* More pronounced shadow on hover */
}

/* Styling for the active/current page button */
/* Assuming PaginationControls applies an 'active-page' class to the current page button */
.pagination-controls-container button.active-page {
  background: linear-gradient(45deg, #6c5ce7 0%, #5b4ddf 100%); /* Vibrant purple gradient for active page */
  color: #ffffff; /* White text for contrast */
  border-color: #6c5ce7;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.45); /* Stronger shadow for the active button */
  transform: scale(1.05); /* Slightly larger active button to make it stand out */
}

.pagination-controls-container button.active-page:hover {
  background: linear-gradient(45deg, #5b4ddf 0%, #4a3ec4 100%);
  border-color: #5b4ddf;
  color: #ffffff;
  transform: scale(1.08) translateY(-2px); /* More pronounced active hover effect */
}

/* Styling for disabled buttons (Previous/Next when at limits) */
.pagination-controls-container button:disabled {
  background-color: #fcfdfe; /* Very light background for disabled */
  color: #c0c8d3; /* Light gray text */
  cursor: not-allowed; /* Indicate non-clickable */
  opacity: 0.7; /* Slightly transparent */
  border-color: #e0e5ed;
  box-shadow: none; /* No shadow when disabled */
  transform: none; /* No transform effect */
}

/* Styling for the page info text (e.g., "Page 1 of 26") */
/* If PaginationControls renders this as a <span> with a specific class, apply styles here */
.pagination-controls-container .page-info {
    font-size: 1rem;
    color: #34495e;
    font-weight: 600;
    margin: 0 10px; /* Space around the text */
    white-space: nowrap; /* Prevent wrapping */
    display: flex; /* Ensure centering if text is short */
    align-items: center;
}

/* Responsive adjustments for pagination on smaller screens */
@media (max-width: 480px) {
  .pagination-controls-container {
    gap: 0.5rem; /* Smaller gap on very small screens */
    padding: 15px;
  }
  .pagination-controls-container button {
    padding: 8px 12px;
    font-size: 0.85rem;
    min-width: 35px;
    height: 35px;
  }
  .pagination-controls-container .page-info {
    font-size: 0.9rem;
    margin: 0 5px;
  }
}
`;