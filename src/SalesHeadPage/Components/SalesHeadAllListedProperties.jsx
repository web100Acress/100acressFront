import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from "axios";
import { getApiBase } from '../../config/apiBase';
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";
import { Modal, message } from "antd";

// This is a copy of AllListedProperties content without the Sidebar
const SalesHeadAllListedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Fetch properties
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${getApiBase()}/project/viewAll/data`);
      setProperties(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      message.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Filter properties based on search term
  const filteredProperties = useMemo(() => {
    return properties.filter(property =>
      property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.state?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [properties, searchTerm]);

  // Pagination
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Handle delete
  const handleDelete = useCallback(async (propertyId) => {
    try {
      await axios.delete(`${getApiBase()}/project/Delete/${propertyId}`);
      message.success("Property deleted successfully");
      fetchProperties();
      setDeleteModalVisible(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error("Error deleting property:", error);
      message.error("Failed to delete property");
    }
  }, [fetchProperties]);

  // Memoized Property Row Component
  const PropertyRow = memo(({ property, onDelete }) => (
    <tr className="table-row">
      <td className="table-cell image-cell">
        <div className="property-image-wrapper">
          <LazyLoadImage
            src={property?.frontImage?.url || "https://via.placeholder.com/150x100?text=No+Image"}
            alt={property?.propertyName || "Property Image"}
            effect="blur"
            className="property-image"
            placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 100'%3E%3C/svg%3E"
          />
        </div>
      </td>
      <td className="table-cell name-cell">
        <div className="property-name-text">
          {property.propertyName}
        </div>
      </td>
      <td className="table-cell">{property.city}</td>
      <td className="table-cell">{property.state}</td>
      <td className="table-cell actions-cell">
        <div className="actions-wrapper">
          <Link to={`/sales-head/property/view/${property._id}`} className="action-button view-button">
            <Eye size={16} />
          </Link>
          <Link to={`/sales-head/property/edit/${property._id}`} className="action-button edit-button">
            <Edit size={16} />
          </Link>
          <button 
            onClick={() => {
              setPropertyToDelete(property);
              setDeleteModalVisible(true);
            }} 
            className="action-button delete-button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  ));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Oval color="#00BFFF" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Listed Properties</h1>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="table-header">Image</th>
              <th className="table-header">Property Name</th>
              <th className="table-header">City</th>
              <th className="table-header">State</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProperties.map((property) => (
              <PropertyRow 
                key={property._id} 
                property={property} 
                onDelete={() => handleDelete(property._id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Modal
        title="Delete Property"
        open={deleteModalVisible}
        onOk={() => handleDelete(propertyToDelete?._id)}
        onCancel={() => {
          setDeleteModalVisible(false);
          setPropertyToDelete(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete "{propertyToDelete?.propertyName}"?</p>
      </Modal>

      <style jsx>{`
        .table-row:hover {
          background-color: #f5f5f5;
        }
        .dark .table-row:hover {
          background-color: #374151;
        }
        .property-image {
          width: 100px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }
        .property-image-wrapper {
          width: 100px;
          height: 60px;
          overflow: hidden;
        }
        .table-cell {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .dark .table-cell {
          border-bottom-color: #374151;
        }
        .table-header {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        .dark .table-header {
          background-color: #1f2937;
          border-bottom-color: #374151;
        }
        .actions-wrapper {
          display: flex;
          gap: 8px;
        }
        .action-button {
          padding: 6px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .view-button {
          background-color: #3b82f6;
          color: white;
        }
        .view-button:hover {
          background-color: #2563eb;
        }
        .edit-button {
          background-color: #10b981;
          color: white;
        }
        .edit-button:hover {
          background-color: #059669;
        }
        .delete-button {
          background-color: #ef4444;
          color: white;
        }
        .delete-button:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default SalesHeadAllListedProperties;
