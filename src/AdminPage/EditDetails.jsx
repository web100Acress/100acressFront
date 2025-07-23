import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Switch,message } from "antd";
import { FaCheck, FaXmark} from "react-icons/fa6";
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment, MdEdit } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};


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

  const [messageApi, contextHolder] = message.useMessage();
  const [infoOpen, setInfoOpen] = useState(true);

  // Validation state
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/postPerson/propertyoneEdit/${id}`
        );
        console.log("Property Details",res.data.data.postProperty[0]);
        setValues(res.data.data.postProperty[0]);
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

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!values.propertyName) newErrors.propertyName = 'Property Name is required';
    if (!values.propertyType) newErrors.propertyType = 'Property Type is required';
    if (!values.address) newErrors.address = 'Address is required';
    if (!values.city) newErrors.city = 'City is required';
    if (!values.state) newErrors.state = 'State is required';
    if (!values.price) newErrors.price = 'Price is required';
    if (!values.area) newErrors.area = 'Area is required';
    if (!values.descripation) newErrors.descripation = 'Description is required';
    return newErrors;
  };

  const handleUpdateUser = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      messageApi.open({
        key: "loadingUpdateProperty",
        type: "loading",
        content: "Updating Data...",
      })
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
      const myToken = localStorage.getItem("myToken");
      const response = await axios.post(
        `https://api.100acress.com/postPerson/propertyoneUpdate/${id}`,
        formData,
        {
          headers: {
            'Content-Type' : 'multipart/form-data',
            Authorization: `Bearer ${myToken}`
          }
        }
      );
      if (response.status === 200) {
          messageApi.destroy("loadingUpdateProperty");

          console.log("Response Data: ",response.data)

          messageApi.open({
            key: "successUpdateProperty",
            type: "success",
            content: "Data Updated Successfully",
          });
      } else {
        messageApi.destroy("loadingUpdateProperty");
        messageApi.open({
          key: "errorUpdateProperty",
          type: "error",
          content: "Failed to update user",
        });
      }
    } catch (error) {
      messageApi.destroy("loadingUpdateProperty");
      messageApi.open({
        key: "errorUpdateProperty",
        type: "error",
        content: "Failed to update user",
      });
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
      {contextHolder}
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-8 ml-64 overflow-auto font-sans">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8">
              <MdEdit className="text-3xl text-blue-500 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800">Edit Property Details</h1>
            </div>
            {/* Images Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="flex flex-wrap gap-2 justify-center">
                  {values.otherImage && Array.isArray(values.otherImage) && values.otherImage.length > 0 ? (
                    values.otherImage.map((image, index) => (
                      <img
                        key={index}
                        src={image ? image.url : ""}
                        alt="OtherImages"
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        id="previewOtherImage"
                      />
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
                <Tippy content={<span>Edit Property Information</span>} animation="scale" theme="light-border">
                  <span><MdInfo className="text-2xl text-blue-500" /></span>
                </Tippy>
                <h2 className="text-2xl font-bold text-gray-800 flex-1 text-left">Edit Property Information</h2>
                {infoOpen ? (
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                ) : (
                  <svg className="w-6 h-6 inline-block transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                )}
              </button>
              <div
                id="property-info-section"
                className={`transition-all duration-300 ${infoOpen ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0'}`}
                style={{ willChange: 'max-height, opacity, padding' }}
                aria-hidden={!infoOpen}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Property Name */}
                  <div>
                    <Tippy content={<span>Property Name</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Name</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.propertyName}
                      className={`w-full rounded-lg border ${errors.propertyName ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      name="propertyName"
                      onChange={(e) => setValues({ ...values, propertyName: e.target.value })}
                    />
                    {errors.propertyName && <span className="text-red-500 text-xs">{errors.propertyName}</span>}
                  </div>
                  {/* Property Type */}
                  <div>
                    <Tippy content={<span>Property Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Property Type</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.propertyType}
                      className={`w-full rounded-lg border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      name="propertyType"
                      onChange={(e) => setValues({ ...values, propertyType: e.target.value })}
                    />
                    {errors.propertyType && <span className="text-red-500 text-xs">{errors.propertyType}</span>}
                  </div>
                  {/* Address */}
                  <div>
                    <Tippy content={<span>Address</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />Address</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.address}
                      className={`w-full rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      name="address"
                      onChange={(e) => setValues({ ...values, address: e.target.value })}
                    />
                    {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
                  </div>
                  {/* City */}
                  <div>
                    <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />City</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.city}
                      className={`w-full rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      name="city"
                      onChange={(e) => setValues({ ...values, city: e.target.value })}
                    />
                    {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
                  </div>
                  {/* State */}
                  <div>
                    <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />State</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.state}
                      name="state"
                      className={`w-full rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      onChange={(e) => setValues({ ...values, state: e.target.value })}
                    />
                    {errors.state && <span className="text-red-500 text-xs">{errors.state}</span>}
                  </div>
                  {/* Price */}
                  <div>
                    <Tippy content={<span>Price</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdAttachMoney className="mr-1" />Price</label>
                    </Tippy>
                    <input
                      type="text"
                      name="price"
                      value={values.price}
                      className={`w-full rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      onChange={(e) => setValues({ ...values, price: e.target.value })}
                    />
                    {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
                  </div>
                  {/* Area */}
                  <div>
                    <Tippy content={<span>Area</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Area</label>
                    </Tippy>
                    <input
                      type="text"
                      name="area"
                      value={values.area}
                      className={`w-full rounded-lg border ${errors.area ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      onChange={(e) => setValues({ ...values, area: e.target.value })}
                    />
                    {errors.area && <span className="text-red-500 text-xs">{errors.area}</span>}
                  </div>
                  {/* Project Description */}
                  <div className="md:col-span-2">
                    <Tippy content={<span>Project Description</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Project Description</label>
                    </Tippy>
                    <input
                      type="text"
                      name="descripation"
                      value={values.descripation}
                      className={`w-full rounded-lg border ${errors.descripation ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      onChange={(e) => setValues({ ...values, descripation: e.target.value })}
                    />
                    {errors.descripation && <span className="text-red-500 text-xs">{errors.descripation}</span>}
                  </div>
                  {/* Landmark */}
                  <div>
                    <Tippy content={<span>Landmark</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdLocationOn className="mr-1" />Landmark</label>
                    </Tippy>
                    <input
                      type="text"
                      name="landMark"
                      value={values.landMark}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, landMark: e.target.value })}
                    />
                  </div>
                  {/* Built Year */}
                  <div>
                    <Tippy content={<span>Built Year</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Built Year</label>
                    </Tippy>
                    <input
                      type="text"
                      name="builtYear"
                      value={values.builtYear}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, builtYear: e.target.value })}
                    />
                  </div>
                  {/* Amenities */}
                  <div className="md:col-span-2">
                    <Tippy content={<span>Amenities (comma separated)</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Amenities</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.amenities}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, amenities: e.target.value })}
                    />
                  </div>
                  {/* Furnishing */}
                  <div>
                    <Tippy content={<span>Furnishing</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Furnishing</label>
                    </Tippy>
                    <input
                      type="text"
                      name="furnishing"
                      value={values.furnishing}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, furnishing: e.target.value })}
                    />
                  </div>
                  {/* Type */}
                  <div>
                    <Tippy content={<span>Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Type</label>
                    </Tippy>
                    <input
                      type="text"
                      value={values.type}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, type: e.target.value })}
                    />
                  </div>
                  {/* Available Date */}
                  <div>
                    <Tippy content={<span>Available Date</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdInfo className="mr-1" />Available Date</label>
                    </Tippy>
                    <input
                      type="text"
                      name="availableDate"
                      value={values.availableDate}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, availableDate: e.target.value })}
                    />
                  </div>
                  {/* Select Property Type */}
                  <div>
                    <Tippy content={<span>Select Property Type</span>} animation="scale" theme="light-border">
                      <label className="block text-red-700 font-semibold mb-2 flex items-center"><MdApartment className="mr-1" />Select Property Type</label>
                    </Tippy>
                    <input
                      type="text"
                      name="propertyLooking"
                      value={values.propertyLooking}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      onChange={(e) => setValues({ ...values, propertyLooking: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {/* Update Button: Always visible, outside collapsible */}
              <div className="flex justify-end mt-8 px-8 pb-8">
                <button
                  type="button"
                  onClick={handleUpdateUser}
                  className="flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-8 py-3 shadow-lg transition-all"
                >
                  <MdEdit className="text-xl" /> Update
                </button>
              </div>
            </section>
            {/* Multi-step form placeholder */}
            {/* <div className="flex items-center justify-center gap-4 mt-8">
              <span className="w-4 h-4 rounded-full bg-blue-500"></span>
              <span className="w-4 h-4 rounded-full bg-gray-300"></span>
              <span className="w-4 h-4 rounded-full bg-gray-300"></span>
              <span className="ml-4 text-gray-500">Step 1 of 3</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDetails;
