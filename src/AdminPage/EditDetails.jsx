import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import api from "../config/apiClient";

import { Switch } from "antd";
import { FaCheck, FaXmark, FaRegImage, FaRegBuilding, FaCouch } from "react-icons/fa6";
import { FaRupeeSign, FaMapMarkerAlt, FaLayerGroup, FaRegDotCircle, FaRegCalendar, FaRegClock, FaEdit, FaListAlt } from "react-icons/fa";
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment } from "react-icons/md";
import showToast from "../utils/toastUtils";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const EditDetails = () => {
  
  const [values, setValues] = useState({
    propertyType: "",
    propertyName: "",
    frontImage: "",
    otherImage: [],
    address: "",
    city: "",
    state: "",
    price: "",
    area: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    propertyLooking: "Select Property Type",
    subType: "",
    verify: "unverified",
  });

  const [infoOpen, setInfoOpen] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/postPerson/propertyoneEdit/${id}`);
        const data = res?.data?.data;
        const list = Array.isArray(data?.postProperty) ? data.postProperty : [];
        const payload = list.length > 0 ? list[0] : {};
        // Normalize potentially varying shapes
        const normalized = (prev => ({
          ...prev,
          ...payload,
          // Ensure arrays
          otherImage: Array.isArray(payload?.otherImage) ? payload.otherImage : [],
          // frontImage could be string URL or object with url
          frontImage: payload?.frontImage && typeof payload.frontImage === 'object'
            ? payload.frontImage
            : (typeof payload?.frontImage === 'string' && payload.frontImage
                ? { url: payload.frontImage }
                : prev.frontImage),
        }))(values);
        console.log("Property Details (normalized)", normalized);
        setValues(normalized);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const previewImage = document.getElementById("previewImage");
        previewImage.src = e.target.result;
        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },

        }))
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleOtherImageFileChange = (event)=>{
    const input = event.target;
    if (input.files && input.files[0]) {
      const files = Array.from(event.target.files);
      const updatedImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setValues({
        ...values,
        otherImage: [
          ...updatedImages,
        ],
      });

    }
  }

  const handleUpdateUser = async () => {
    try {
      showToast.loading("Updating Data...", { id: "loadingUpdateProperty" });
      const formData = new FormData();

      // Append all key-value pairs from values
      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      }

      //Append front image If exist
      if (values.frontImage && values.frontImage.file) {
        formData.append("frontImage", values.frontImage.file);
      }
      
      //Apend OtherImages If exist
      if (values.otherImage && Array.isArray(values.otherImage)) {
        values.otherImage.forEach((item, index) => {
          if (item && item.file) {
            formData.append(`otherImage`, item.file);
          }
        });
      }
      const response = await api.post(
        `/postPerson/propertyoneUpdate/${id}`,
        formData,
        {
          headers: {
            'Content-Type' : 'multipart/form-data',
          }
        }
      );
      if (response.status === 200) {
          showToast.dismiss("loadingUpdateProperty");

          console.log("Response Data: ",response.data)

          showToast.success("Data Updated Successfully");
      } else {
        showToast.dismiss("loadingUpdateProperty");
        showToast.error("Failed to update user");
      }
    } catch (error) {
      showToast.dismiss("loadingUpdateProperty");
      showToast.error("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const handleVerifyToggle = (checked) => {
    setValues((prevValues) => ({
      ...prevValues,
      verify: checked ? "verified" : "unverified", // Update verify state
    }));
  };


  return (
    <>
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <MdHome className="text-3xl text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800">Edit Property Details</h1>
            </div>
            {/* Verify Switch */}
            <div className="flex items-center mb-4">
              <Tippy content={<span>Toggle property verification</span>} animation="scale" theme="light-border">
            <Switch 
                  checked={values.verify === "verified"}
                  onChange={handleVerifyToggle}
                  checkedChildren={<FaCheck size={20} />}
                  unCheckedChildren={<FaXmark size={20} />}
              className="bg-[#808080]"
            />
              </Tippy>
              <span className={`ml-3 font-semibold ${values.verify === "verified" ? "text-green-600" : "text-red-600"}`}>{values.verify === "verified" ? "Verified" : "Unverified"}</span>
            </div>
            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Image */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2"><MdImage />Front Image</h3>
                <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                  {values.frontImage && values.frontImage.url ? (
                    <img src={values.frontImage.url} alt="frontImage" className="max-h-full max-w-full object-contain" id="previewImage" />
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Front Image</span>
                  )}
                </div>
                <input type="file" onChange={handleFileChange} className="mt-2" />
          </div>
              {/* Other Images */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2"><MdImage />Other Images</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {values.otherImage && Array.isArray(values.otherImage) && values.otherImage.length > 0 ? (
                          values.otherImage.map((image, index) => (
                      <img key={index} src={image.url} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Other Images</span>
                  )}
                </div>
                <input type="file" name="otherImage" multiple accept="image/*" onChange={handleOtherImageFileChange} className="mt-2" />
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
                  {/* Property Name */}
                  <div>
                    <Tippy content={<span>Property Name</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Name</label>
                    </Tippy>
                    <input type="text" value={values.propertyName} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" name="propertyName" onChange={e => setValues({ ...values, propertyName: e.target.value })} />
                  </div>
                  {/* Property Type */}
                  <div>
                    <Tippy content={<span>Property Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Type</label>
                    </Tippy>
                    <input type="text" value={values.propertyType} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" name="propertyType" onChange={e => setValues({ ...values, propertyType: e.target.value })} />
                  </div>
                  {/* Address */}
                  <div>
                    <Tippy content={<span>Address</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />Address</label>
                    </Tippy>
                    <input type="text" value={values.address} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" name="address" onChange={e => setValues({ ...values, address: e.target.value })} />
                  </div>
                  {/* City */}
                  <div>
                    <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />City</label>
                    </Tippy>
                    <input type="text" value={values.city} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" name="city" onChange={e => setValues({ ...values, city: e.target.value })} />
                  </div>
                  {/* Price */}
                  <div>
                    <Tippy content={<span>Price</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdAttachMoney className="mr-1" />Price</label>
                    </Tippy>
                    <input type="text" name="price" value={values.price} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, price: e.target.value })} />
                  </div>
                  {/* Area */}
                  <div>
                    <Tippy content={<span>Area</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Area</label>
                    </Tippy>
                    <input type="text" name="area" value={values.area} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, area: e.target.value })} />
                  </div>
                  {/* State */}
                  <div>
                    <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />State</label>
                    </Tippy>
                    <input type="text" value={values.state} name="state" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, state: e.target.value })} />
                  </div>
                  {/* LandMark */}
                  <div>
                    <Tippy content={<span>LandMark</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />LandMark</label>
                    </Tippy>
                    <input type="text" name="landMark" value={values.landMark} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, landMark: e.target.value })} />
                  </div>
                  {/* Built Year */}
                  <div>
                    <Tippy content={<span>Built Year</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Built Year</label>
                    </Tippy>
                    <input type="text" name="builtYear" value={values.builtYear} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, builtYear: e.target.value })} />
                  </div>
                  {/* Furnishing */}
                  <div>
                    <Tippy content={<span>Furnishing</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Furnishing</label>
                    </Tippy>
                    <input type="text" name="furnishing" value={values.furnishing} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, furnishing: e.target.value })} />
                  </div>
                  {/* Available Date */}
                  <div>
                    <Tippy content={<span>Available Date</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Available Date</label>
                    </Tippy>
                    <input type="text" name="availableDate" value={values.availableDate} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, availableDate: e.target.value })} />
                  </div>
                  {/* Select Property Type */}
                  <div>
                    <Tippy content={<span>Select Property Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Select Property Type</label>
                    </Tippy>
                    <input type="text" name="propertyLooking" value={values.propertyLooking} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, propertyLooking: e.target.value })} />
                  </div>
                  {/* Type */}
                  <div>
                    <Tippy content={<span>Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Type</label>
                    </Tippy>
                    <input type="text" value={values.type} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, type: e.target.value })} />
                  </div>
                  {/* Amenities */}
                  <div>
                    <Tippy content={<span>Amenities</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Amenities</label>
                    </Tippy>
                    <input type="text" value={values.amenities} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, amenities: e.target.value })} />
                  </div>
                  {/* Project Description */}
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Tippy content={<span>Project Description</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Project Description</label>
                    </Tippy>
                    <input type="text" name="descripation" value={values.descripation} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, descripation: e.target.value })} />
                  </div>
                </div>
              </div>
              {/* Update Button always visible at the bottom */}
              <div className="flex justify-end mt-8 p-6 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
                <button type="button" onClick={handleUpdateUser} className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-base px-8 py-3 shadow-lg transition-all duration-300 transform hover:scale-105">
                  <MdHome className="animate-pulse" /> Update
            </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;