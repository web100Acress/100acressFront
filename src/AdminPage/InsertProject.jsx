import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { message } from "antd"; // Import Ant Design message for modern notifications
import { MdInfo, MdLocationOn, MdAttachMoney, MdApartment, MdTitle, MdDescription, MdPerson, MdImage, MdBusiness, MdDateRange, MdOutlineNumbers, MdOutlinePhone, MdOutlineAttachMoney, MdOutlineInsertDriveFile, MdOutlineCloudUpload, MdOutlineCategory, MdStar, MdSchool, MdMovie } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { useDropzone } from 'react-dropzone';

const InsertProject = () => {
  const [editFromData, setEditFromData] = useState({
    projectName: "",
    state: "",
    country: "India",
    projectAddress: "",
    project_discripation: "",
    AboutDeveloper: "",
    builderName: "",  
    projectRedefine_Connectivity: "", // Changed to string for input, will be split for array
    projectRedefine_Education: "",   // Changed to string for input, will be split for array
    projectRedefine_Business: "",    // Changed to string for input, will be split for array
    projectRedefine_Entertainment: "", // Changed to string for input, will be split for array
    Amenities: "",                   // Changed to string for input, will be split for array
    luxury: "False",
    spotlight: "False",
    paymentPlan: "",
    meta_title: "",
    meta_description: "",
    projectBgContent: "",
    projectReraNo: "",
    type: "",
    city: "",
    projectOverview: "",
    project_url: "",
    project_Status: "",
    totalLandArea: "",
    totalUnit: "",
    towerNumber: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
    launchingDate: "",
  });

  const [fileData, setFileData] = useState({
    frontImage: null,
    logo: null,
    thumbnailImage: null,
    project_locationImage: null,
    project_floorplan_Image: [], // Initialize as empty array for multiple files
    highlightImage: null,
    project_Brochure: null,
    projectGallery: [], // Initialize as empty array for multiple files
    projectMaster_plan: null,
  });

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message hook

  const resetData = () => {
    setEditFromData({
      projectName: "",
      state: "",
      country: "India",
      projectAddress: "",
      project_discripation: "",
      AboutDeveloper: "",
      builderName: "",
      projectRedefine_Connectivity: "",
      projectRedefine_Education: "",
      projectRedefine_Business: "",
      projectRedefine_Entertainment: "",
      Amenities: "",
      luxury: "False",
      spotlight: "False",
      paymentPlan: "",
      meta_title: "",
      meta_description: "",
      projectBgContent: "",
      projectReraNo: "",
      type: "",
      city: "",
      projectOverview: "",
      project_url: "",
      project_Status: "",
      totalLandArea: "",
      totalUnit: "",
      towerNumber: "",
      mobileNumber: "",
      possessionDate: "",
      minPrice: "",
      maxPrice: "",
      launchingDate: "",
    });
  };

  const resetImageData = () => {
    setFileData({
      frontImage: null,
      logo: null,
      thumbnailImage: null,
      project_locationImage: null,
      project_floorplan_Image: [],
      highlightImage: null,
      project_Brochure: null,
      projectGallery: [],
      projectMaster_plan: null,
    });
  };

  // Generic handler for all text and select inputs in editFromData
  const handleChangeProjectData = (e) => {
    setEditFromData({
      ...editFromData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for multiple file inputs (project_floorplan_Image, projectGallery)
  const handleMultipleFilesChange = (e, key) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFileData((prevFileData) => ({
      ...prevFileData,
      [key]: files,
    }));
  };

  // Handler for single file inputs
  const handleSingleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFileData((prevFileData) => ({
      ...prevFileData,
      [key]: file,
    }));
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    messageApi.open({
      key: "insertProject",
      type: 'loading',
      content: 'Adding new project...',
    });

    const apiEndpoint = "https://api.100acress.com/project/Insert";
    const formDataAPI = new FormData();

    // Append all text/select data from editFromData
    for (const key in editFromData) {
      if (
        key === "projectRedefine_Connectivity" ||
        key === "projectRedefine_Education" ||
        key === "projectRedefine_Business" ||
        key === "projectRedefine_Entertainment" ||
        key === "Amenities"
      ) {
        // For fields expected as arrays, split the string by comma and append each item
        const items = editFromData[key].split(',').map(item => item.trim()).filter(item => item !== '');
        items.forEach(item => formDataAPI.append(key, item));
      } else {
        formDataAPI.append(key, editFromData[key]);
      }
    }

    // Append all single image files
    if (fileData.logo) formDataAPI.append("logo", fileData.logo);
    if (fileData.thumbnailImage) formDataAPI.append("thumbnailImage", fileData.thumbnailImage);
    if (fileData.project_locationImage) formDataAPI.append("project_locationImage", fileData.project_locationImage);
    if (fileData.frontImage) formDataAPI.append("frontImage", fileData.frontImage);
    if (fileData.project_Brochure) formDataAPI.append("project_Brochure", fileData.project_Brochure);
    if (fileData.highlightImage) formDataAPI.append("highlightImage", fileData.highlightImage);
    if (fileData.projectMaster_plan) formDataAPI.append("projectMaster_plan", fileData.projectMaster_plan);

    // Append multiple image files
    fileData.project_floorplan_Image.forEach((file) => {
      formDataAPI.append("project_floorplan_Image", file);
    });
    fileData.projectGallery.forEach((file) => {
      formDataAPI.append("projectGallery", file);
    });

    // --- DEBUG LOGGING ---
    console.log("Submitting Project FormData:");
    for (let pair of formDataAPI.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0], "(File):", pair[1].name, pair[1].type, pair[1].size + " bytes");
      } else {
        console.log(pair[0], ":", pair[1]);
      }
    }
    // --- END DEBUG LOGGING ---

    try {
      const myToken = localStorage.getItem("myToken");
      const response = await axios.post(apiEndpoint, formDataAPI, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${myToken}`,
        },
      });

      if (response.status === 200) {
        messageApi.destroy("insertProject");
        messageApi.open({
          type: 'success',
          content: 'Project added successfully!',
          duration: 2,
        });
        resetData();
        resetImageData();
      } else {
        messageApi.destroy("insertProject");
        messageApi.open({
          type: 'error',
          content: 'Failed to add project. Server returned an unexpected status.',
          duration: 3,
        });
        console.error("Failed to add project. Server response:", response.status, response.data);
      }
    } catch (error) {
      messageApi.destroy("insertProject");
      if (error.response) {
        messageApi.open({
          type: 'error',
          content: `Error: ${error.response.data?.message || 'Server error.'}`,
          duration: 4,
        });
        console.error("Server Error:", error.response.status, error.response.data);
      } else if (error.request) {
        messageApi.open({
          type: 'error',
          content: 'No response from server. Check network connection.',
          duration: 4,
        });
        console.error("Network Error:", error.request);
      } else {
        messageApi.open({
          type: 'error',
          content: `Request Error: ${error.message}`,
          duration: 4,
        });
        console.error("Error setting up request:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper for file input display names
  const getFileName = (file) => file ? file.name : "No file chosen";
  const getMultipleFileNames = (files) =>
    files && files.length > 0 ? files.map(file => file.name).join(', ') : "No files chosen";

  // Helper Dropzone component for single file
  function FileDropzone({ onDrop, label, currentFile }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles[0]) {
          onDrop(acceptedFiles[0]);
        }
      },
      multiple: false,
      maxFiles: 1,
    });
    return (
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}> 
        <input {...getInputProps()} />
        <span className="text-gray-600 mb-2">{label}</span>
        {currentFile ? (
          currentFile.type && currentFile.type.startsWith('image') ? (
            <img src={URL.createObjectURL(currentFile)} alt="Preview" className="w-24 h-24 object-cover rounded mb-2" />
          ) : (
            <span className="text-xs text-gray-500">{currentFile.name}</span>
          )
        ) : (
          <span className="text-xs text-gray-400">Drag & drop or click to select</span>
        )}
      </div>
    );
  }
  // Helper Dropzone component for multiple files
  function MultiFileDropzone({ onDrop, label, currentFiles }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
          onDrop(acceptedFiles);
        }
      },
      multiple: true,
    });
    return (
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}> 
        <input {...getInputProps()} />
        <span className="text-gray-600 mb-2">{label}</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {currentFiles && currentFiles.length > 0 ? (
            currentFiles.map((file, idx) =>
              file.type && file.type.startsWith('image') ? (
                <img key={idx} src={URL.createObjectURL(file)} alt={`Preview ${idx + 1}`} className="w-12 h-12 object-cover rounded" />
              ) : (
                <span key={idx} className="text-xs text-gray-500">{file.name}</span>
              )
            )
          ) : (
            <span className="text-xs text-gray-400">Drag & drop or click to select</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      {contextHolder} {/* Ant Design message context holder */}

      {/* Main content area */}
      <div className="flex-1 p-8 ml-64">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center gap-2 justify-center"><MdBusiness className="text-3xl text-blue-500" /> Add New Project</h1>
          <p className="text-lg text-gray-600">Fill in the details to create a new project listing.</p>
        </div>

        {/* Responsive Form + Preview Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Project Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100 w-full md:w-2/3 mb-10 relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
            </div>
          )}
            <form className="space-y-12" onSubmit={handleSubmitProject}>
              {/* --- Project Info Section --- */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MdInfo className="text-2xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Project Info</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy content={<span>Project Overview (trending/featured/none)</span>} animation="scale" theme="light-border">
                      <label htmlFor="projectOverview" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineCategory /> Project Overview</label>
                    </Tippy>
                <select
                  id="projectOverview"
                  name="projectOverview"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.projectOverview}
                  onChange={handleChangeProjectData} // Generic handler
                >
                  <option value="" disabled hidden>Select Project Overview</option>
                  <option value="trending">Trending</option>
                  <option value="featured">Featured</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div>
                    <Tippy content={<span>Project Type (e.g., Commercial, Residential)</span>} animation="scale" theme="light-border">
                      <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdApartment /> Project Type</label>
                    </Tippy>
                <select
                  id="type"
                  name="type"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.type}
                  onChange={handleChangeProjectData} // Generic handler
                >
                  <option value="" disabled hidden>Select Project Type</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Residential Flats">Residential Flats</option>
                  <option value="SCO Plots">SCO Plots</option>
                  <option value="Deen Dayal Plots">Deen Dayal Plots</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Independent Floors">Independent Floors</option>
                  <option value="Builder Floors">Builder Floors</option>
                  <option value="Affordable Homes">Affordable Homes</option>
                  <option value="Villas">Villas</option>
                  <option value="Farm Houses">Farm House</option>
                </select>
              </div>

              <div>
                    <Tippy content={<span>Project Status (e.g., Under Construction)</span>} animation="scale" theme="light-border">
                      <label htmlFor="project_Status" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdInfo /> Project Status</label>
                    </Tippy>
                <select
                  id="project_Status"
                  name="project_Status"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.project_Status}
                  onChange={handleChangeProjectData} // Generic handler
                >
                  <option value="" disabled hidden>Select Project Status</option>
                  <option value="underconstruction">Under Construction</option>
                  <option value="comingsoon">Coming Soon</option>
                  <option value="newlaunch">New Launch</option>
                  <option value="readytomove">Ready To Move</option>
                </select>
            </div>

              <div>
                    <Tippy content={<span>Project URL (slug)</span>} animation="scale" theme="light-border">
                      <label htmlFor="project_url" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineInsertDriveFile /> Project URL</label>
                    </Tippy>
                <input
                  type="text"
                  id="project_url"
                  name="project_url"
                  placeholder="e.g., your-project-slug"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.project_url}
                  onChange={handleChangeProjectData}
                />
              </div>
                </div>
              </div>

              {/* --- Location Section --- */}
              <div>
                <div className="flex items-center gap-2 mb-4 mt-8">
                  <MdLocationOn className="text-2xl text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Location & Details</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                      <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdLocationOn /> State</label>
                    </Tippy>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="e.g., Haryana"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.state}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                      <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdLocationOn /> City</label>
                    </Tippy>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="e.g., Gurugram"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.city}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Country</span>} animation="scale" theme="light-border">
                      <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdLocationOn /> Country</label>
                    </Tippy>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="e.g., India"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.country}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Luxury Status</span>} animation="scale" theme="light-border">
                      <label htmlFor="luxury" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdStar /> Luxury</label>
                    </Tippy>
                <select
                  id="luxury"
                  name="luxury"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.luxury}
                  onChange={handleChangeProjectData} // Generic handler
                >
                  <option value="False">False</option>
                  <option value="True">True</option>
                </select>
              </div>
              <div>
                    <Tippy content={<span>Spotlight Status</span>} animation="scale" theme="light-border">
                      <label htmlFor="spotlight" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdStar /> Spotlight</label>
                    </Tippy>
                <select
                  id="spotlight"
                  name="spotlight"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.spotlight}
                  onChange={handleChangeProjectData} // Generic handler
                >
                  <option value="False">False</option>
                  <option value="True">True</option>
                </select>
              </div>
              </div>
            </div>

              {/* --- Numeric Details Section --- */}
              <div>
                <div className="flex items-center gap-2 mb-4 mt-8">
                  <MdOutlineNumbers className="text-2xl text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Numeric Details</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy content={<span>Total Land Area</span>} animation="scale" theme="light-border">
                      <label htmlFor="totalLandArea" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineNumbers /> Total Land Area</label>
                    </Tippy>
                <input
                  type="text"
                  id="totalLandArea"
                  name="totalLandArea"
                  placeholder="e.g., 10 Acres"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.totalLandArea}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Total Units</span>} animation="scale" theme="light-border">
                      <label htmlFor="totalUnit" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineNumbers /> Total Units</label>
                    </Tippy>
                <input
                  type="text"
                  id="totalUnit"
                  name="totalUnit"
                  placeholder="e.g., 500"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.totalUnit}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Number of Towers</span>} animation="scale" theme="light-border">
                      <label htmlFor="towerNumber" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineNumbers /> Towers</label>
                    </Tippy>
                <input
                  type="text"
                  id="towerNumber"
                  name="towerNumber"
                  placeholder="e.g., 5"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.towerNumber}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Launching Date</span>} animation="scale" theme="light-border">
                      <label htmlFor="launchingDate" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdDateRange /> Launching Date</label>
                    </Tippy>
                <input
                    type="date"
                  id="launchingDate"
                  name="launchingDate"
                    placeholder="e.g., 2024-12-17"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.launchingDate}
                  onChange={handleChangeProjectData}
                />
                  </div>
              </div>
            </div>

              {/* --- Contact & Price Section --- */}
              <div>
                <div className="flex items-center gap-2 mb-4 mt-8">
                  <MdOutlinePhone className="text-2xl text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Contact & Pricing</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy content={<span>Mobile Number</span>} animation="scale" theme="light-border">
                      <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlinePhone /> Mobile Number</label>
                    </Tippy>
                <input
                  type="number"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="e.g., 9876543210"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.mobileNumber}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Possession Date</span>} animation="scale" theme="light-border">
                      <label htmlFor="possessionDate" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdDateRange /> Possession Date</label>
                    </Tippy>
                <input
                    type="date"
                  id="possessionDate"
                  name="possessionDate"
                    placeholder="e.g., 2024-12-17"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.possessionDate}
                  onChange={handleChangeProjectData}
                />
              </div>
                <div>
                    <Tippy content={<span>Min Price</span>} animation="scale" theme="light-border">
                      <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineAttachMoney /> Min Price (₹)</label>
                    </Tippy>
                  <input
                    type="text"
                    id="minPrice"
                    name="minPrice"
                    placeholder="e.g., 50 Lacs"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                    value={editFromData.minPrice}
                    onChange={handleChangeProjectData}
                  />
                </div>
                <div>
                    <Tippy content={<span>Max Price</span>} animation="scale" theme="light-border">
                      <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdOutlineAttachMoney /> Max Price (₹)</label>
                    </Tippy>
                  <input
                    type="text"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="e.g., 1 Crore"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                    value={editFromData.maxPrice}
                    onChange={handleChangeProjectData}
                  />
                </div>
              </div>
            </div>

            {/* Main Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <Tippy content={<span>Project Name</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdTitle /> Project Name</label>
                  </Tippy>
              <input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Enter project name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectName}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Project Address</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectAddress" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdLocationOn /> Project Address</label>
                  </Tippy>
              <input
                type="text"
                id="projectAddress"
                name="projectAddress"
                placeholder="Enter full project address"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectAddress}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Project Description</span>} animation="scale" theme="light-border">
                    <label htmlFor="project_discripation" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdDescription /> Project Description</label>
                  </Tippy>
              <textarea
                id="project_discripation"
                name="project_discripation"
                rows={4}
                placeholder="Detailed description of the project"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 resize-y"
                value={editFromData.project_discripation}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>About Developer</span>} animation="scale" theme="light-border">
                    <label htmlFor="AboutDeveloper" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdPerson /> About Developer</label>
                  </Tippy>
              <textarea
                id="AboutDeveloper"
                name="AboutDeveloper"
                rows={4}
                placeholder="Information about the developer"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 resize-y"
                value={editFromData.AboutDeveloper}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Builder Name</span>} animation="scale" theme="light-border">
                    <label htmlFor="builderName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdPerson /> Builder Name</label>
                  </Tippy>
              <input
                type="text"
                id="builderName"
                name="builderName"
                placeholder="Enter builder's name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.builderName}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Connectivity (e.g., Metro Station, Highway)</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectRedefine_Connectivity" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdBusiness /> Connectivity</label>
                  </Tippy>
              <input
                type="text"
                id="projectRedefine_Connectivity"
                name="projectRedefine_Connectivity"
                placeholder="e.g., Metro Station, Highway"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectRedefine_Connectivity}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Education (e.g., Schools, Universities)</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectRedefine_Education" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdSchool /> Education</label>
                  </Tippy>
              <input
                type="text"
                id="projectRedefine_Education"
                name="projectRedefine_Education"
                placeholder="e.g., Schools, Universities"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectRedefine_Education}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Business (e.g., Tech Parks, Business Hubs)</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectRedefine_Business" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdBusiness /> Business</label>
                  </Tippy>
              <input
                type="text"
                id="projectRedefine_Business"
                name="projectRedefine_Business"
                placeholder="e.g., Tech Parks, Business Hubs"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectRedefine_Business}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Entertainment (e.g., Malls, Cinemas)</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectRedefine_Entertainment" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdMovie /> Entertainment</label>
                  </Tippy>
              <input
                type="text"
                id="projectRedefine_Entertainment"
                name="projectRedefine_Entertainment"
                placeholder="e.g., Malls, Cinemas"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectRedefine_Entertainment}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Amenities (e.g., Swimming Pool, Gym, Park)</span>} animation="scale" theme="light-border">
                    <label htmlFor="Amenities" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdOutlineCategory /> Amenities</label>
                  </Tippy>
              <input
                type="text"
                id="Amenities"
                name="Amenities"
                placeholder="e.g., Swimming Pool, Gym, Park"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.Amenities}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Banner Content Heading</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectBgContent" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdTitle /> Banner Content Heading</label>
                  </Tippy>
              <input
                type="text"
                id="projectBgContent"
                name="projectBgContent"
                placeholder="Catchy heading for banner"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectBgContent}
                onChange={handleChangeProjectData}
              />
            </div>
            <div>
                  <Tippy content={<span>Project RERA Number</span>} animation="scale" theme="light-border">
                    <label htmlFor="projectReraNo" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdOutlineInsertDriveFile /> Project RERA Number</label>
                  </Tippy>
              <input
                type="text"
                id="projectReraNo"
                name="projectReraNo"
                placeholder="Enter RERA registration number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                value={editFromData.projectReraNo}
                onChange={handleChangeProjectData}
              />
                </div>
            </div>

            {/* File Uploads Section */}
            <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><MdOutlineCloudUpload /> Upload Project Images & Documents</h3>
                {/* All File Uploads in a single grid: 3 columns per row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "logo")} label="Project Logo" currentFile={fileData.logo} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "thumbnailImage")} label="Thumbnail Image" currentFile={fileData.thumbnailImage} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "frontImage")} label="Front Image" currentFile={fileData.frontImage} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "project_locationImage")} label="Project Location Image" currentFile={fileData.project_locationImage} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "projectMaster_plan")} label="Project Master Plan" currentFile={fileData.projectMaster_plan} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "project_Brochure")} label="Project Brochure" currentFile={fileData.project_Brochure} />
                  <FileDropzone onDrop={(file) => handleSingleFileChange({ target: { files: [file] } }, "highlightImage")} label="Highlight Image" currentFile={fileData.highlightImage} />
                  <MultiFileDropzone onDrop={(files) => handleMultipleFilesChange({ target: { files } }, "project_floorplan_Image")} label="Project Floor Plan Images" currentFiles={fileData.project_floorplan_Image} />
                  <MultiFileDropzone onDrop={(files) => handleMultipleFilesChange({ target: { files } }, "projectGallery")} label="Project Gallery Images" currentFiles={fileData.projectGallery} />
                  </div>
            </div>

            {/* SEO Fields */}
            <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><MdOutlineInsertDriveFile /> SEO Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                    <Tippy content={<span>Meta Title</span>} animation="scale" theme="light-border">
                      <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdTitle /> Meta Title</label>
                    </Tippy>
                <input
                  type="text"
                  id="meta_title"
                  name="meta_title"
                  placeholder="Concise title for search engines"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                  value={editFromData.meta_title}
                  onChange={handleChangeProjectData}
                />
              </div>
              <div>
                    <Tippy content={<span>Meta Description</span>} animation="scale" theme="light-border">
                      <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><MdDescription /> Meta Description</label>
                    </Tippy>
                <textarea
                  id="meta_description"
                  name="meta_description"
                  rows={3}
                  placeholder="Brief description for search engines"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 resize-y"
                  value={editFromData.meta_description}
                  onChange={handleChangeProjectData}
                />
                  </div>
              </div>
            </div>

            {/* Submit Button */}
              <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Adding Project...' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>

          {/* Live Preview Card */}
          <div className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 w-full md:w-1/3 p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><MdInfo className="text-blue-500" /> Live Preview</h2>
            <div className="space-y-4">
              
              <div>
                <span className="block text-gray-500 text-xs mb-1">Project Name</span>
                <div className="text-lg font-semibold text-gray-900">{editFromData.projectName || <span className="text-gray-400">(Not set)</span>}</div>
              </div>
             
              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Type</span>
                  <div className="text-base text-gray-700">{editFromData.type || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Status</span>
                  <div className="text-base text-gray-700">{editFromData.project_Status || <span className="text-gray-400">-</span>}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">City</span>
                  <div className="text-base text-gray-700">{editFromData.city || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">State</span>
                  <div className="text-base text-gray-700">{editFromData.state || <span className="text-gray-400">-</span>}</div>
                </div>
              </div>
            
              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Min Price</span>
                  <div className="text-base text-gray-700">{editFromData.minPrice || <span className="text-gray-400">-</span>}</div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Max Price</span>
                  <div className="text-base text-gray-700">{editFromData.maxPrice || <span className="text-gray-400">-</span>}</div>
                </div>
              </div>
             
              <div>
                <span className="block text-gray-500 text-xs mb-1">Front Image</span>
                {fileData.frontImage ? (
                  <img src={URL.createObjectURL(fileData.frontImage)} alt="Front Preview" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-1">Gallery Images</span>
                <div className="flex flex-wrap gap-2">
                  {fileData.projectGallery && fileData.projectGallery.length > 0 ? (
                    fileData.projectGallery.map((img, idx) => (
                      <img key={idx} src={URL.createObjectURL(img)} alt={`Gallery ${idx + 1}`} className="w-16 h-16 object-cover rounded border border-gray-200" />
                    ))
                  ) : (
                    <span className="text-gray-400">No Images</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertProject;