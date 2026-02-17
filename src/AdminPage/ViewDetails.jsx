import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getApiBase } from "../config/apiBase";
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const ViewDetails = () => {
  const { id } = useParams();
  const [viewDetails, setViewDetails] = useState({});
  const [infoOpen, setInfoOpen] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setFetchError(null);
        const base = getApiBase();
        const res = await axios.get(`${base}/postPerson/propertyoneView/${id}`);
        const prop = res?.data?.data?.postProperty?.[0] || {};
        setViewDetails(prop);
      } catch (error) {
        console.error("ViewDetails fetch error:", error);
        setFetchError(error?.message || "Failed to load property");
      }
    };
    fetchData();
  }, [id]);

  const otherImage = viewDetails.otherImage;
  const amenitiesList = Array.isArray(viewDetails.amenities) ? viewDetails.amenities : (Array.isArray(viewDetails.Amenities) ? viewDetails.Amenities : []);
  
  const imgUrl = (img) => (img && typeof img === "object" && img.url) ? img.url : (typeof img === "string" ? img : null);

  const getCategoryDisplay = () => {
    if (viewDetails.selectoption && (viewDetails.selectoption === "Commercial" || viewDetails.selectoption === "Residential")) return viewDetails.selectoption;
    const pt = viewDetails.propertyType || "";
    const commercial = ["Office", "Retail", "Industrial", "Plot / Land", "Storage", "Hospitality", "Other"];
    const residential = ["Flat/Apartment", "Independent House / Villa", "Independent / Builder Floor", "1 RK/ Studio Apartment", "Serviced Apartment", "Farmhouse", "Other"];
    if (commercial.includes(pt)) return "Commercial";
    if (residential.includes(pt)) return "Residential";
    return null;
  };
  const categoryDisplay = viewDetails.selectoption || getCategoryDisplay();

  return (
    <>
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="w-full space-y-6">
            {fetchError && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700">{fetchError}</div>
            )}
            <div className="flex items-center gap-2 mb-4">
              <MdHome className="text-3xl text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800">Property Details</h1>
            </div>

            {/* User activity / Draft & completion (for admin) */}
            {(viewDetails.completionPercentage != null || viewDetails.listingStatus || viewDetails.isDisabled || viewDetails.lastStatusUpdatedAt) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-amber-900 mb-3">User activity & form status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  {viewDetails.completionPercentage != null && (
                    <div>
                      <span className="text-amber-700 font-medium">Form completion when submitted:</span>
                      <span className="ml-2 font-bold text-amber-900">{viewDetails.completionPercentage}%</span>
                      {viewDetails.completionPercentage < 100 && <span className="block text-amber-700">(partial / draft-like)</span>}
                    </div>
                  )}
                  {viewDetails.listingStatus && (
                    <div>
                      <span className="text-amber-700 font-medium">Listing status (user):</span>
                      <span className="ml-2 capitalize">{viewDetails.listingStatus}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-amber-700 font-medium">Hidden from listing:</span>
                    <span className="ml-2">{viewDetails.isDisabled ? "Yes" : "No"}</span>
                  </div>
                  {viewDetails.lastStatusUpdatedAt && (
                    <div>
                      <span className="text-amber-700 font-medium">Last status updated:</span>
                      <span className="ml-2">{new Date(viewDetails.lastStatusUpdatedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Image */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2"><MdImage />Front Image</h3>
                <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                  {(viewDetails.frontImage && (viewDetails.frontImage.url || typeof viewDetails.frontImage === "string")) ? (
                    <img src={typeof viewDetails.frontImage === "string" ? viewDetails.frontImage : viewDetails.frontImage.url} alt="frontImage" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Front Image</span>
                  )}
                </div>
              </div>
              {/* Other Images */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2"><MdImage />Other Images</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {otherImage && Array.isArray(otherImage) && otherImage.length > 0 ? (
                    otherImage.map((image, index) => {
                      const url = imgUrl(image);
                      return url ? (
                        <img key={index} src={url} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                      ) : null;
                    })
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
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                ) : (
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
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
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Name</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.propertyName || viewDetails.projectName || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Property Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Category</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{categoryDisplay || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Property Sub-type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Type</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.propertyType || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Address</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />Address</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.address || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />City</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.city || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Price</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdAttachMoney className="mr-1" />Price</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.price ? `₹${Number(viewDetails.price).toLocaleString("en-IN")}` : <span className="text-gray-400 italic">N/A</span>}
                      {viewDetails.priceunits && <span className="ml-1 text-gray-600">({viewDetails.priceunits})</span>}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>Area</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Area</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">
                      {viewDetails.area != null && viewDetails.area !== "" ? viewDetails.area : <span className="text-gray-400 italic">N/A</span>}
                      {viewDetails.areaUnit ? <span className="ml-1 text-gray-600">({viewDetails.areaUnit})</span> : null}
                    </div>
                  </div>
                  <div>
                    <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />State</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.state || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>LandMark</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />LandMark</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.landMark || viewDetails.landmark || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Built Year</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Built Year</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.builtYear || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Furnishing</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Furnishing</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.furnishing || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Available Date</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Available Date</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.availableDate || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Select Property Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Select Property Type</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.propertyLooking || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div>
                    <Tippy content={<span>Type</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Type</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800">{viewDetails.type || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Tippy content={<span>Project Description</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Project Description</label>
                    </Tippy>
                    <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 whitespace-pre-wrap">{viewDetails.descripation || <span className="text-gray-400 italic">N/A</span>}</div>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Tippy content={<span>Amenities</span>} animation="scale" theme="light-border">
                      <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Amenities</label>
                    </Tippy>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesList.length > 0 ? amenitiesList.map((item, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm">{item}</span>
                      )) : <span className="text-gray-400 italic">No Amenities</span>}
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

export default ViewDetails;
