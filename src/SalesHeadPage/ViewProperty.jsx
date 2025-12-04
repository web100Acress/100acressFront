import React, { useState, useEffect } from "react";
import SalesHeadSidebar from "./SalesHeadSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiBase } from '../config/apiBase';
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment, MdArrowBack } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ViewProperty = () => {
  const [viewDetails, setViewDetails] = useState({});
  const [infoOpen, setInfoOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    otherImage,
    Amenities
  } = viewDetails;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const base = getApiBase();
        const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '');
        
        // First, get all properties and find the specific one by ID
        const res = await axios.get(`${base}/project/viewAll/data`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const allProperties = res.data?.data || [];
        const foundProperty = allProperties.find(prop => prop._id === id);
        
        if (foundProperty) {
          setViewDetails(foundProperty);
        } else {
          console.error("Property not found");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <SalesHeadSidebar />
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading property details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SalesHeadSidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="w-full space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate('/sales-head/listed-properties')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <MdArrowBack className="text-xl" />
                Back to Properties
              </button>
              <div className="flex items-center gap-2">
                <MdHome className="text-3xl text-blue-500 animate-pulse" />
                <h1 className="text-3xl font-bold text-gray-800">Property Details</h1>
              </div>
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Image */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2">
                  <MdImage />Front Image
                </h3>
                <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                  {viewDetails.frontImage?.url || viewDetails.image?.url || viewDetails.projectImage?.url || viewDetails.image || viewDetails.projectImage ? (
                    <img 
                      src={viewDetails.frontImage?.url || viewDetails.image?.url || viewDetails.projectImage?.url || viewDetails.image || viewDetails.projectImage} 
                      alt="Property" 
                      className="max-h-full max-w-full object-contain" 
                    />
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Front Image</span>
                  )}
                </div>
              </div>
              
              {/* Other Images */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2">
                  <MdImage />Other Images
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {viewDetails.otherImage && Array.isArray(viewDetails.otherImage) && viewDetails.otherImage.length > 0 ? (
                    viewDetails.otherImage.map((image, index) => (
                      <img
                        key={index}
                        src={image.url || image}
                        alt={`Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    ))
                  ) : viewDetails.images && Array.isArray(viewDetails.images) && viewDetails.images.length > 0 ? (
                    viewDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url || image}
                        alt={`Image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Other Images</span>
                  )}
                </div>
              </div>
            </div>

            {/* Info Section (Collapsible) */}
            <section className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <button
                className="w-full flex items-center gap-2 px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onClick={() => setInfoOpen((open) => !open)}
                aria-expanded={infoOpen}
                aria-controls="property-info-section"
                type="button"
              >
                <Tippy content={<span>Property Information</span>} animation="scale" theme="light-border">
                  <span><MdInfo className="text-2xl text-blue-500" /></span>
                </Tippy>
                <h2 className="text-2xl font-bold text-gray-800 flex-1 text-left">Property Information</h2>
                {infoOpen ? (
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
              <div
                id="property-info-section"
                className={`transition-all duration-300 ${infoOpen ? 'max-h-[1000px] opacity-100 p-6' : 'max-h-0 opacity-0 p-0'}`}
                style={{ willChange: 'max-height, opacity, padding' }}
                aria-hidden={!infoOpen}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Tippy content={<span>Property Name</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdApartment className="mr-1" />Property Name
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.projectName || viewDetails.propertyName || viewDetails.name || viewDetails.title || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Property Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdApartment className="mr-1" />Property Type
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.type || viewDetails.propertyType || viewDetails.category || viewDetails.projectType || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Address</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdLocationOn className="mr-1" />Address
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.address || viewDetails.location || viewDetails.projectLocation || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdLocationOn className="mr-1" />City
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.city || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Price</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdAttachMoney className="mr-1" />Price
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.price || viewDetails.budget || viewDetails.amount || viewDetails.cost || viewDetails.projectBudget || viewDetails.totalPrice ? 
                        `₹${Number(viewDetails.price || viewDetails.budget || viewDetails.amount || viewDetails.cost || viewDetails.projectBudget || viewDetails.totalPrice).toLocaleString('en-IN')}` : 
                        <span className="text-gray-400 italic">N/A</span>
                      }
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Area</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdApartment className="mr-1" />Area
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.area || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdLocationOn className="mr-1" />State
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.state || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>LandMark</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdLocationOn className="mr-1" />LandMark
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.landMark || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Built Year</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Built Year
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.builtYear || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Furnishing</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Furnishing
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.furnishing || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Available Date</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Available Date
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.availableDate || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Select Property Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdApartment className="mr-1" />Select Property Type
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.propertyLooking || viewDetails.lookingFor || viewDetails.purpose || viewDetails.projectPurpose || viewDetails.listingType || viewDetails.transactionType || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdApartment className="mr-1" />Type
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.type || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Posted By</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Posted By
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.postedBy || viewDetails.createdBy || viewDetails.owner || viewDetails.seller || viewDetails.developerName || viewDetails.builderName || viewDetails.agentName || viewDetails.contactPerson || viewDetails.submittedBy || viewDetails.author || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Tippy content={<span>Project Description</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Project Description
                      </label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.description || viewDetails.projectDescription || viewDetails.about || <span className="text-gray-400 italic">N/A</span>}
                    </div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Tippy content={<span>Amenities</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center">
                        <MdInfo className="mr-1" />Amenities
                      </label>
                    </Tippy>
                    <div className="flex flex-wrap gap-2">
                      {viewDetails.Amenities && Array.isArray(viewDetails.Amenities) && viewDetails.Amenities.length > 0 ? 
                        viewDetails.Amenities.map((item, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm">
                            {item}
                          </span>
                        )) :
                        viewDetails.amenities && Array.isArray(viewDetails.amenities) && viewDetails.amenities.length > 0 ?
                        viewDetails.amenities.map((item, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm">
                            {item}
                          </span>
                        )) :
                        viewDetails.features && Array.isArray(viewDetails.features) && viewDetails.features.length > 0 ?
                        viewDetails.features.map((item, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm">
                            {item}
                          </span>
                        )) :
                        <span className="text-gray-400 italic">No Amenities</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProperty;
