import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import apiClient from "../config/apiClient";
import showToast from "../Utils/toastUtils";
import { MdEdit, MdHome } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ProjectEditBHK = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook

  const [viewBHK, setViewBHK] = useState({ // Initialize with empty strings for properties
    bhk_type: "",
    price: "",
    bhk_Area: ""
  });
  const [formOpen, setFormOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`bhk_edit/${id}`);
        // Ensure data exists before setting state
        if (res.data?.data?.BhK_Details && res.data.data.BhK_Details.length > 0) {
          setViewBHK(res.data.data.BhK_Details[0]);
        } else {
          showToast.warning('BHK details not found.');
          // Optionally navigate back or to an error page if details are not found
          // navigate('/admin/projectsaddbhk');
        }
      } catch (error) {
        console.error("Error fetching BHK details:", error);
        showToast.error('Failed to load BHK details.');
      }
    };
    fetchData();
  }, [id]); // Depend on 'id' to re-fetch if it changes (though unlikely for edit)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setViewBHK({ ...viewBHK, [name]: value });
  };

  const submitBHKFromData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    showToast.loading('Updating BHK...', { id: 'updatingBHK' });

    try {
      const res = await apiClient.post(
        `bhk_update/${id}`,
        viewBHK
      );

      if (res.status >= 200 && res.status < 300) {
        showToast.dismiss('updatingBHK');
        showToast.success('BHK updated successfully!');
        // Optionally, navigate back to the BHK list or project view after successful update
        navigate(`/admin/projectsaddbhk/${viewBHK.project_id}`); // Assuming project_id is available in viewBHK
      } else {
        showToast.dismiss('updatingBHK');
        showToast.error('Failed to update BHK. Server returned an error.');
      }
    } catch (error) {
      showToast.dismiss('updatingBHK');
      showToast.error('An error occurred while updating BHK.');
      console.error('Error updating BHK data:', error.message);
    }
  };

  return (
    <>
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 p-8 ml-64 bg-gray-50 min-h-screen font-sans">
        <div className="max-w-xl mx-auto my-10 bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-blue-400 to-purple-400 overflow-hidden">
          {/* Form Header (Collapsible) */}
          <button
            className="w-full flex items-center gap-2 bg-red-600 rounded-t-xl px-6 py-4 text-center text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            onClick={() => setFormOpen((open) => !open)}
            aria-expanded={formOpen}
            aria-controls="edit-bhk-form-section"
            type="button"
            style={{ borderBottomLeftRadius: formOpen ? 0 : '0.75rem', borderBottomRightRadius: formOpen ? 0 : '0.75rem' }}
          >
            <MdEdit className={`text-2xl transition-transform duration-300 ${formOpen ? 'rotate-0' : 'rotate-90 scale-110 animate-pulse'}`} />
            <h2 className="font-serif text-2xl font-semibold tracking-wide flex-1 text-left">Edit Floor Plan</h2>
            {formOpen ? <span className="transition-transform duration-300"><svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></span> : <span className="transition-transform duration-300"><svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></span>}
          </button>
          <div
            id="edit-bhk-form-section"
            className={`transition-all duration-300 ${formOpen ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0'}`}
            style={{ willChange: 'max-height, opacity, padding' }}
            aria-hidden={!formOpen}
          >
            <form onSubmit={submitBHKFromData} className="space-y-5">
            <div>
              <label htmlFor="bhk_Area" className="sr-only">BHK Area</label>
                <Tippy content={<span>Enter the area for this BHK (e.g., 1200 sqft)</span>} animation="scale" theme="light-border">
              <input
                id="bhk_Area"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                type="text"
                placeholder="Add BHK Area (e.g., 1200 sqft)"
                name="bhk_Area"
                    value={viewBHK.bhk_Area || ""}
                onChange={handleInputChange}
                required
              />
                </Tippy>
            </div>
            <div>
              <label htmlFor="bhk_type" className="sr-only">BHK Type</label>
                <Tippy content={<span>Enter the type for this BHK (e.g., 2BHK)</span>} animation="scale" theme="light-border">
              <input
                id="bhk_type"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                type="text"
                placeholder="Add BHK Type (e.g., 2BHK)"
                name="bhk_type"
                value={viewBHK.bhk_type || ""}
                onChange={handleInputChange}
                required
              />
                </Tippy>
            </div>
            <div>
              <label htmlFor="price" className="sr-only">Price</label>
                <Tippy content={<span>Enter the price for this BHK (e.g., ₹50 Lacs)</span>} animation="scale" theme="light-border">
              <input
                id="price"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                type="text"
                placeholder="Price (e.g., ₹50 Lacs)"
                name="price"
                value={viewBHK.price || ""}
                onChange={handleInputChange}
                required
              />
                </Tippy>
            </div>

              <Tippy content={<span>Update BHK floor plan</span>} animation="scale" theme="light-border">
            <button
              type="submit"
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 font-semibold text-white shadow-md hover:from-red-600 hover:to-red-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
            >
                  <MdEdit className="text-xl group-hover:animate-bounce" /> Update
            </button>
              </Tippy>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEditBHK;