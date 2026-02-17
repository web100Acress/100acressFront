import React, { useCallback, useEffect, useState, useMemo, memo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Sidebar from "./Sidebar";
import axios from "axios";
import { getApiBase } from '../config/apiBase';
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { PaginationControls } from "../Components/Blog_Components/Blog/create/desktop/BlogManagement"; 
import { Modal } from "antd";
import showToast from "../Utils/toastUtils";

// --- Memoized Property Row for Performance ---
const PropertyRow = memo(({ property, onDelete }) => (
  <tr className="group border-b border-slate-100 hover:bg-indigo-50/50 transition-all duration-200">
    <td className="p-4 align-middle">
      <div className="w-24 h-16 rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
        <LazyLoadImage
          src={property?.frontImage?.url || "https://via.placeholder.com/150x100?text=No+Image"}
          alt={property?.propertyName || "Property"}
          effect="blur"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </td>
    <td className="p-4 align-middle">
      <div className="font-bold text-slate-800 text-sm md:text-base leading-tight">
        {property.propertyName || property.projectName || 'N/A'}
      </div>
      <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
        {[property.selectoption, property.propertyType].filter(Boolean).join(' • ') || 'N/A'}
      </div>
    </td>
    <td className="p-4 align-middle text-green-600 font-bold whitespace-nowrap">
      {property?.price ? (
        <>
          ₹{Number(property.price).toLocaleString('en-IN')}
          {property?.priceunits && (
            <span className="text-slate-400 text-[10px] ml-1 font-normal">({property.priceunits})</span>
          )}
        </>
      ) : 'N/A'}
    </td>
    <td className="p-4 align-middle text-sm text-slate-500 max-w-[200px] truncate">
      {property?.address || 'N/A'}
    </td>
    <td className="p-4 align-middle">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
        property?.propertyLooking?.toLowerCase() === 'rent' 
        ? 'bg-blue-100 text-blue-700' 
        : 'bg-emerald-100 text-emerald-700'
      }`}>
        {property?.propertyLooking || 'N/A'}
      </span>
    </td>
    <td className="p-4 align-middle text-sm font-medium text-slate-600">
      {property?.name || 'N/A'}
    </td>
    <td className="p-4 align-middle text-right">
      <div className="flex items-center justify-end space-x-2">
        <Link 
          to={`/Admin/viewproperty/viewdetails/${property._id}`} 
          className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </Link>
        <Link 
          to={`/Admin/viewproperty/editdetails/${property._id}`} 
          className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit size={18} />
        </Link>
        <button
          onClick={() => onDelete(property._id)}
          className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </td>
  </tr>
));

const AllListedProperties = () => {
  // Logic Fix: memoize token to prevent frequent disk reads
  const token = useMemo(() => {
    const raw = localStorage.getItem("myToken") || "";
    return raw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
  }, []);

  const [allListedProperty, setAllListedProperty] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState('verified');
  
  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const base = getApiBase();
      const res = await axios.get(
        `${base}/postPerson/view/allListedProperty/?page=${currentPage}&limit=${pageLimit}&verify=${isVerified}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          timeout: 12000
        }
      );
      
      if (res.status >= 200 && res.status < 300) {
        const root = res.data;
        const list = Array.isArray(root?.data?.[0]?.data) ? root.data[0].data : root.data || [];
        const pages = root?.data?.[0]?.totalPages || root.totalPages || 0;
        
        setAllListedProperty(list);
        setTotalPages(pages);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      showToast.error("Failed to load properties.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageLimit, isVerified, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleConfirmDelete = async () => {
    if (!propertyToDelete) return;
    setConfirmLoading(true);
    try {
      const base = getApiBase();
      const res = await axios.delete(`${base}/postPerson/propertyDelete/${propertyToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.status === 200) {
        showToast.success("Property deleted successfully");
        setOpenModal(false);
        fetchData();
      }
    } catch (err) {
      showToast.error(err.response?.data?.message || "Deletion failed");
    } finally {
      setConfirmLoading(false);
      setPropertyToDelete(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Sidebar />
      
      {/* Main Container: Aligned with Sidebar width */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8 transition-all">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              Properties Listed
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage and monitor all property listings.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={isVerified}
              onChange={(e) => { setIsVerified(e.target.value); setCurrentPage(1); }}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold"
            >
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>

            <select
              value={pageLimit}
              onChange={(e) => { setPageLimit(Number(e.target.value)); setCurrentPage(1); }}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-widest font-bold">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name & Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Address</th>
                  <th className="p-4 text-center">Intent</th>
                  <th className="p-4">Posted By</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-24">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Oval height={45} width={45} color="#4f46e5" secondaryColor="#e2e8f0" />
                        <span className="text-slate-400 font-medium animate-pulse text-sm">Loading listings...</span>
                      </div>
                    </td>
                  </tr>
                ) : allListedProperty.length > 0 ? (
                  allListedProperty.map((property) => (
                    <PropertyRow 
                      key={property._id} 
                      property={property} 
                      onDelete={(id) => { setPropertyToDelete(id); setOpenModal(true); }} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="text-slate-400 font-medium">No properties found.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 0 && (
            <div className="p-5 bg-slate-50/50 border-t border-slate-100 flex justify-center">
              <PaginationControls
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </main>

      {/* Modern Deletion Modal */}
      <Modal
        title={<span className="text-slate-800 font-bold text-xl">Delete Property</span>}
        open={openModal}
        onOk={handleConfirmDelete}
        confirmLoading={confirmLoading}
        onCancel={() => setOpenModal(false)}
        okText="Yes, Delete it"
        cancelText="Cancel"
        okButtonProps={{ 
          danger: true, 
          className: "bg-rose-600 hover:bg-rose-700 rounded-xl px-6 h-10 border-none shadow-lg shadow-rose-200 font-semibold" 
        }}
        cancelButtonProps={{ 
          className: "rounded-xl px-6 h-10 font-semibold border-slate-200 text-slate-600" 
        }}
      >
        <div className="py-4 text-slate-600 leading-relaxed">
          Are you sure you want to delete this property? This action is irreversible and the listing will be removed permanently.
        </div>
      </Modal>
    </div>
  );
};

export default AllListedProperties;