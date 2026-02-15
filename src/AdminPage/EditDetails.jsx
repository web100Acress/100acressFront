import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import api from "../config/apiClient";

import { Switch } from "antd";
import { FaCheck, FaXmark, FaRegImage, FaRegBuilding, FaCouch } from "react-icons/fa6";
import { FaRupeeSign, FaMapMarkerAlt, FaLayerGroup, FaRegDotCircle, FaRegCalendar, FaRegClock, FaEdit, FaListAlt } from "react-icons/fa";
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment } from "react-icons/md";
import showToast from "../Utils/toastUtils";

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
    priceunits: "",
    area: "",
    areaUnit: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    propertyLooking: "Sell",
    selectoption: "",
    subType: "",
    verify: "unverified",
  });

  const [infoOpen, setInfoOpen] = useState(true);

  const { id } = useParams();

  // Derive category (Commercial/Residential) from propertyType when selectoption missing
  const getCategoryFromPropertyType = (propertyType) => {
    if (!propertyType || typeof propertyType !== "string") return "";
    const commercial = ["Office", "Retail", "Industrial", "Plot / Land", "Storage", "Hospitality", "Other"];
    const residential = ["Flat/Apartment", "Independent House / Villa", "Independent / Builder Floor", "1 RK/ Studio Apartment", "Serviced Apartment", "Farmhouse", "Other"];
    const t = propertyType.trim();
    if (commercial.includes(t)) return "Commercial";
    if (residential.includes(t)) return "Residential";
    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/postPerson/propertyoneEdit/${id}`);
        const data = res?.data?.data;
        const list = Array.isArray(data?.postProperty) ? data.postProperty : [];
        const payload = list.length > 0 ? list[0] : {};
        const rawSelectoption = payload.selectoption || getCategoryFromPropertyType(payload.propertyType) || "";
        const rawPriceunits = (payload.priceunits || "").toString().trim().toLowerCase();
        const priceunits = rawPriceunits === "lakhs" || rawPriceunits === "crores" ? rawPriceunits : (payload.priceunits || "");
        const areaUnit = payload.areaUnit || payload.areaunit || "";
        setValues(prev => ({
          ...prev,
          ...payload,
          selectoption: rawSelectoption === "Commercial" || rawSelectoption === "Residential" ? rawSelectoption : getCategoryFromPropertyType(payload.propertyType) || "",
          priceunits,
          areaUnit,
          otherImage: Array.isArray(payload?.otherImage) ? payload.otherImage : [],
          frontImage: payload?.frontImage && typeof payload.frontImage === "object" && payload.frontImage !== null
            ? payload.frontImage
            : typeof payload?.frontImage === "string" && payload.frontImage
              ? { url: payload.frontImage }
              : prev.frontImage,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const previewImage = document.getElementById("previewImage");
        if (previewImage) previewImage.src = e.target.result;
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
        otherImage: [...updatedImages],
      });
    }
  }

  const handleUpdateUser = async () => {
    try {
      showToast.loading("Updating Data...", { id: "loadingUpdateProperty" });
      const formData = new FormData();

      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === 'frontImage' || key === 'otherImage') continue;
          formData.append(key, values[key]);
        }
      }

      if (values.frontImage && values.frontImage.file) {
        formData.append("frontImage", values.frontImage.file);
      }
      
      if (values.otherImage && Array.isArray(values.otherImage)) {
        values.otherImage.forEach((item) => {
          if (item && item.file) {
            formData.append(`otherImage`, item.file);
          }
        });
      }

      const response = await api.post(
        `/postPerson/propertyoneUpdate/${id}`,
        formData,
        {
          headers: { 'Content-Type' : 'multipart/form-data' }
        }
      );

      if (response.status === 200) {
        showToast.dismiss("loadingUpdateProperty");
        showToast.success("Data Updated Successfully");
      } else {
        showToast.dismiss("loadingUpdateProperty");
        showToast.error("Failed to update property");
      }
    } catch (error) {
      showToast.dismiss("loadingUpdateProperty");
      showToast.error("Failed to update property");
      console.error("Error updating property:", error);
    }
  };

  const handleVerifyToggle = (checked) => {
    setValues((prevValues) => ({
      ...prevValues,
      verify: checked ? "verified" : "unverified",
    }));
  };

  return (
    <>
      <Sidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="w-full space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <MdHome className="text-3xl text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800">Edit Property Details</h1>
            </div>

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
              <span className={`ml-3 font-semibold ${values.verify === "verified" ? "text-green-600" : "text-red-600"}`}>
                {values.verify === "verified" ? "Verified" : "Unverified"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 flex items-center gap-2"><MdImage />Other Images</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  {values.otherImage && Array.isArray(values.otherImage) && values.otherImage.length > 0 ? (
                    values.otherImage.map((image, index) => (
                      <img key={index} src={image.url || image} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">No Other Images</span>
                  )}
                </div>
                <input type="file" name="otherImage" multiple accept="image/*" onChange={handleOtherImageFileChange} className="mt-2" />
              </div>
            </div>

            <section className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <button
                className="w-full flex items-center gap-2 px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                onClick={() => setInfoOpen((open) => !open)}
                type="button"
              >
                <MdInfo className="text-2xl text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800 flex-1 text-left">Property Information</h2>
                {infoOpen ? <MdHome /> : <FaEdit />}
              </button>

              <div className={`transition-all duration-300 ${infoOpen ? 'opacity-100 p-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Name</label>
                    <input type="text" value={values.propertyName} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, propertyName: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Category</label>
                    <select value={values.selectoption} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, selectoption: e.target.value })}>
                      <option value="">Select Category</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Type (Sub-type)</label>
                    <input type="text" value={values.propertyType} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, propertyType: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />Address</label>
                    <input type="text" value={values.address} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, address: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />City</label>
                    <input type="text" value={values.city} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, city: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />State</label>
                    <input type="text" value={values.state} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, state: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdAttachMoney className="mr-1" />Price</label>
                    <input type="text" value={values.price} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, price: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdAttachMoney className="mr-1" />Price Unit</label>
                    <select value={(values.priceunits || "").toString().toLowerCase()} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, priceunits: e.target.value })}>
                      <option value="">Select Unit</option>
                      <option value="lakhs">Lakhs</option>
                      <option value="crores">Crores</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Area</label>
                    <input type="text" value={values.area} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, area: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Area Unit</label>
                    <select value={values.areaUnit || ""} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, areaUnit: e.target.value })}>
                      <option value="">Select Unit</option>
                      <option value="sqft">Sqft</option>
                      <option value="sqyd">Sqyd</option>
                      <option value="sqmt">Sqmt</option>
                      <option value="acre">Acre</option>
                      <option value="kanal">Kanal</option>
                      <option value="marla">Marla</option>
                      <option value="gaj">Gaj</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />LandMark</label>
                    <input type="text" value={values.landMark} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, landMark: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Built Year</label>
                    <input type="text" value={values.builtYear} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, builtYear: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Furnishing</label>
                    <select value={values.furnishing} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, furnishing: e.target.value })}>
                      <option value="">Select Furnishing</option>
                      <option value="Fullyfurnishing">Fully Furnished</option>
                      <option value="Semifurnishing">Semi-Furnished</option>
                      <option value="UnFurnishing">Unfurnished</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Property Status</label>
                    <select value={values.type} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, type: e.target.value })}>
                      <option value="">Select Status</option>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Available From</label>
                    <input type="date" value={values.availableDate} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, availableDate: e.target.value })} />
                  </div>

                  <div>
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Listed For</label>
                    <select value={values.propertyLooking} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" onChange={e => setValues({ ...values, propertyLooking: e.target.value })}>
                      <option value="Sell">Sell</option>
                      <option value="rent">Rent/Lease</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Amenities</label>
                    <input type="text" value={Array.isArray(values.amenities) ? values.amenities.join(", ") : values.amenities} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800" placeholder="Gym, Pool, etc." onChange={e => setValues({ ...values, amenities: e.target.value.split(",").map(s => s.trim()) })} />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className="text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Project Description</label>
                    <textarea value={values.descripation} rows={4} className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 resize-none" onChange={e => setValues({ ...values, descripation: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 p-6 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
                <button type="button" onClick={handleUpdateUser} className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-base px-8 py-3 shadow-lg transition-all duration-300 transform hover:scale-105">
                  <MdHome className="animate-pulse" /> Update Property
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