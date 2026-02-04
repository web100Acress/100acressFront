import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/apiClient";
import { showToast } from "../Utils/toastUtils"; // Import Ant Design message for modern notifications
import Sidebar from "./Sidebar";
import {
  MdInfo,
  MdLocationOn,
  MdAttachMoney,
  MdApartment,
  MdTitle,
  MdDescription,
  MdPerson,
  MdImage,
  MdBusiness,
  MdDateRange,
  MdOutlineNumbers,
  MdOutlinePhone,
  MdOutlineAttachMoney,
  MdOutlineInsertDriveFile,
  MdOutlineCloudUpload,
  MdOutlineCategory,
  MdStar,
  MdSchool,
  MdMovie,
  MdSearch,
  MdKeyboardArrowDown,
} from "react-icons/md";
import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useDropzone } from "react-dropzone";

// Extract YouTube video ID from URL
function extractYoutubeId(url) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

const InsertProject = () => {
  const navigate = useNavigate();
    // State for builders list and dropdown
  const [buildersList, setBuildersList] = useState([]);
  const [filteredBuilders, setFilteredBuilders] = useState([]);
  const [loadingBuilders, setLoadingBuilders] = useState(true);
  const [isBuilderDropdownOpen, setIsBuilderDropdownOpen] = useState(false);
  const [builderSearchTerm, setBuilderSearchTerm] = useState("");
  const [showCustomBuilderInput, setShowCustomBuilderInput] = useState(false);
  const [customBuilderName, setCustomBuilderName] = useState("");

  // State for states list and dropdown (similar to builders but for states)
  const [statesList, setStatesList] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [showCustomStateInput, setShowCustomStateInput] = useState(false);
  const [customStateName, setCustomStateName] = useState("");

  // State for cities list and dropdown (similar to builders but for cities)
  const [citiesList, setCitiesList] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [showCustomCityInput, setShowCustomCityInput] = useState(false);
  const [customCityName, setCustomCityName] = useState("");

  // Function to fetch states from backend
  const fetchStatesFromBackend = async () => {
    try {
      const { data } = await api.get("project/viewAll/data?sort=-createdAt");
      if (data?.data) {
        // Extract unique state names and sort them
        const uniqueStates = [...new Set(
          data.data
            .map(project => project.state)
            .filter(Boolean) // Remove any null/undefined values
        )].sort();
        setStatesList(uniqueStates);
        setFilteredStates(uniqueStates);
        return uniqueStates;
      }
      return [];
    } catch (error) {
      console.error("Error fetching states:", error);
      showToast.error(showToast.errorMessages.loadingError);
      return [];
    } finally {
      setLoadingStates(false);
    }
  };
  const fetchCitiesFromBackend = async () => {
    try {
      const { data } = await api.get("project/viewAll/data?sort=-createdAt");
      if (data?.data) {
        // Extract unique city names and sort them
        const uniqueCities = [...new Set(
          data.data
            .map(project => project.city)
            .filter(Boolean) // Remove any null/undefined values
        )].sort();
        setCitiesList(uniqueCities);
        setFilteredCities(uniqueCities);
        return uniqueCities;
      }
      return [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      showToast.error(showToast.errorMessages.loadingError);
      return [];
    } finally {
      setLoadingCities(false);
    }
  };

  // Function to fetch builders from backend
  const fetchBuildersFromBackend = async () => {
    try {
      const { data } = await api.get("project/viewAll/data?sort=-createdAt");
      if (data?.data) {
        // Extract unique builder names and sort them
        const uniqueBuilders = [...new Set(
          data.data
            .map(project => project.builderName)
            .filter(Boolean) // Remove any null/undefined values
        )].sort();
        setBuildersList(uniqueBuilders);
        setFilteredBuilders(uniqueBuilders);
        return uniqueBuilders;
      }
      return [];
    } catch (error) {
      console.error("Error fetching builders:", error);
      showToast.error(showToast.errorMessages.loadingError);
      return [];
    } finally {
      setLoadingBuilders(false);
    }
  };

  // Load builders, cities, and states on component mount
  useEffect(() => {
    fetchBuildersFromBackend();
    fetchCitiesFromBackend();
    fetchStatesFromBackend();
  }, []);

  const [editFromData, setEditFromData] = useState({
    projectName: "",
    state: "",
    country: "India",
    projectAddress: "",
    project_discripation: "",
    AboutDeveloper: "",
    builderName: "",
    projectRedefine_Connectivity: "", // Changed to string for input, will be split for array
    projectRedefine_Education: "", // Changed to string for input, will be split for array
    projectRedefine_Business: "", // Changed to string for input, will be split for array
    projectRedefine_Entertainment: "", // Changed to string for input, will be split for array
    Amenities: "", // Changed to string for input, will be split for array
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
    totalLandArea: "",
    totalUnit: "",
    towerNumber: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
    launchingDate: "",
    youtubeVideoUrl: "",
    youtubeVideoTitle: "",
    youtubeVideoDescription: "",
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
  const defaultProjectTypes = [
    "Commercial Property",
    "Residential Flats",
    "SCO Plots",
    "Deen Dayal Plots",
    "Residential Plots",
    "Independent Floors",
    "Builder Floors",
    "Affordable Homes",
    "Villas",
    "Farm Houses",
    "Industrial Plots",
    "Senior Living",
  ];
  const [projectTypes, setProjectTypes] = useState(defaultProjectTypes);
  const [customProjectType, setCustomProjectType] = useState("");

  // ensure existing type (when editing) is present in options
  useEffect(() => {
    if (editFromData?.type && !projectTypes.some((t) => t.toLowerCase() === editFromData.type.toLowerCase())) {
      setProjectTypes((prev) => [...prev, editFromData.type]);
    }
  }, [editFromData?.type, projectTypes]);

  const handleAddProjectType = () => {
    const value = customProjectType.trim();
    if (!value) {
      showToast.warning('Please enter a project type name');
      return;
    }
    const exists = projectTypes.find((t) => t.toLowerCase() === value.toLowerCase());
    if (exists) {
      setCustomProjectType("");
      setEditFromData((prev) => ({ ...prev, type: exists }));
      showToast.info(`Type "${exists}" already exists and is selected.`);
      return;
    }
    setProjectTypes((prev) => [...prev, value]);
    setEditFromData((prev) => ({ ...prev, type: value }));
    setCustomProjectType("");
    showToast.success(`Project type "${value}" added successfully!`);
  };


  // Filter states based on search term
  useEffect(() => {
    const filtered = statesList.filter((state) =>
      state.toLowerCase().includes(stateSearchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [stateSearchTerm, statesList]);

  // Handle state selection
  const handleStateSelect = (stateName) => {
    if (stateName === "Other") {
      setShowCustomStateInput(true);
      setStateSearchTerm("");
      setIsStateDropdownOpen(false);
    } else {
      setEditFromData((prev) => ({
        ...prev,
        state: stateName,
      }));
      setStateSearchTerm(stateName);
      setIsStateDropdownOpen(false);
      setShowCustomStateInput(false);
      setCustomStateName("");
    }
  };

  // Handle city selection
  const handleCitySelect = (cityName) => {
    setEditFromData((prev) => ({
      ...prev,
      city: cityName,
    }));
    setCitySearchTerm(cityName);
    setIsCityDropdownOpen(false);
  };

  

  // Handle state input change - allow direct typing of new states
  const handleStateInputChange = (e) => {
    const value = e.target.value;
    setStateSearchTerm(value);

    // If user types a new state name, set it directly
    if (value && !filteredStates.includes(value)) {
      setEditFromData((prev) => ({
        ...prev,
        state: value,
      }));
    }

    setIsStateDropdownOpen(true);
  };

  // Handle state input focus
  const handleStateInputFocus = () => {
    setIsStateDropdownOpen(true);
  };

  // Handle city input change - allow direct typing of new cities
  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCitySearchTerm(value);

    // If user types a new city name, set it directly
    if (value && !filteredCities.includes(value)) {
      setEditFromData((prev) => ({
        ...prev,
        city: value,
      }));
    }

    setIsCityDropdownOpen(true);
  };

  // Handle city input focus
  const handleCityInputFocus = () => {
    setIsCityDropdownOpen(true);
  };

  // Handle builder selection
  const handleBuilderSelect = (builderName) => {
    if (builderName === "Other") {
      setShowCustomBuilderInput(true);
      setBuilderSearchTerm("");
      setIsBuilderDropdownOpen(false);
    } else {
      setEditFromData((prev) => ({
        ...prev,
        builderName: builderName,
      }));
      setBuilderSearchTerm(builderName);
      setIsBuilderDropdownOpen(false);
      setShowCustomBuilderInput(false);
      setCustomBuilderName("");
    }
  };

  // Handle custom builder name input
  const handleCustomBuilderSubmit = async () => {
    if (customBuilderName.trim()) {
      try {
        // Show loading message
        showToast.loading('Adding new builder...', { id: 'addBuilder' });
        
        // Add builder to backend
        const response = await api.post('/api/builders', {
          name: customBuilderName.trim()
        });

        if (response.status === 200) {
          // Success - update local state
          setEditFromData((prev) => ({
            ...prev,
            builderName: customBuilderName.trim(),
          }));
          setBuilderSearchTerm(customBuilderName.trim());
          setShowCustomBuilderInput(false);

          // Refresh builders list from backend to get real-time updates
          const updatedBuilders = await fetchBuildersFromBackend();

          // Update filtered builders to include the new builder
          const filtered = updatedBuilders.filter((builder) =>
            builder.toLowerCase().includes(builderSearchTerm.toLowerCase())
          );
          setFilteredBuilders(filtered);

          // Clear input
          setCustomBuilderName("");

          // Success message
          showToast.dismiss('addBuilder');
          showToast.success('Builder added successfully and saved to database!');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error adding builder:", error);

        // Fallback: still update local state even if API fails
        setEditFromData((prev) => ({
          ...prev,
          builderName: customBuilderName.trim(),
        }));
        setBuilderSearchTerm(customBuilderName.trim());
        setShowCustomBuilderInput(false);

        // Add to local builders list for immediate availability
        const newBuilder = customBuilderName.trim();
        if (!buildersList.includes(newBuilder)) {
          buildersList.push(newBuilder);
          setFilteredBuilders([...buildersList]);
        }

        // Clear input
        setCustomBuilderName("");

        // Warning message
        showToast.dismiss('addBuilder');
        showToast.warning('Builder added locally. Backend builder management can be added later.');
      }
    }
  };

// Handle custom city name input
const handleCustomCitySubmit = async () => {
  if (customCityName.trim()) {
    try {
      // Show loading message
      showToast.loading('Adding new city...', { id: 'addCity' });
      // For now, just add locally since there's no city API endpoint
      // In the future, you could add a city API endpoint similar to builder
      const response = { status: 200 }; // Simulate success

      if (response.status === 200) {
        // Success - update local state
        setEditFromData((prev) => ({
          ...prev,
          city: customCityName.trim(),
        }));
        setCitySearchTerm(customCityName.trim());
        setShowCustomCityInput(false);

        // Add to local cities list for immediate availability
        if (!citiesList.includes(customCityName.trim())) {
          const newCitiesList = [...citiesList, customCityName.trim()].sort();
          setCitiesList(newCitiesList);
          setFilteredCities(newCitiesList.filter(city =>
            city.toLowerCase().includes(citySearchTerm.toLowerCase())
          ));
        }

        // Clear input
        setCustomCityName("");

        // Success message
        showToast.dismiss('addCity');
        showToast.success('City added successfully!');
      }
    } catch (error) {
      console.error("Error adding city:", error);

      // Fallback: still update local state even if API fails
      setEditFromData((prev) => ({
        ...prev,
        city: customCityName.trim(),
      }));
      setCitySearchTerm(customCityName.trim());
      setShowCustomCityInput(false);

      // Add to local cities list for immediate availability
      const newCity = customCityName.trim();
      if (!citiesList.includes(newCity)) {
        const newCitiesList = [...citiesList, newCity].sort();
        setCitiesList(newCitiesList);
        setFilteredCities(newCitiesList.filter(city =>
          city.toLowerCase().includes(citySearchTerm.toLowerCase())
        ));
      }

      // Clear input
      setCustomCityName("");

      // Warning message
      showToast.dismiss('addCity');
      showToast.warning('City added locally. Backend city management can be added later.');
    }
  }
};

// Handle custom state name input
const handleCustomStateSubmit = async () => {
  if (customStateName.trim()) {
    try {
      // Show loading message
      showToast.loading('Adding new state...', { id: 'addState' });
      // For now, just add locally since there's no state API endpoint
      // In the future, you could add a state API endpoint similar to builder
      const response = { status: 200 }; // Simulate success

      if (response.status === 200) {
        // Success - update local state
        setEditFromData((prev) => ({
          ...prev,
          state: customStateName.trim(),
        }));
        setStateSearchTerm(customStateName.trim());
        setShowCustomStateInput(false);

        // Add to local states list for immediate availability
        if (!statesList.includes(customStateName.trim())) {
          const newStatesList = [...statesList, customStateName.trim()].sort();
          setStatesList(newStatesList);
          setFilteredStates(newStatesList.filter(state =>
            state.toLowerCase().includes(stateSearchTerm.toLowerCase())
          ));
        }

        // Clear input
        setCustomStateName("");

        // Success message
        showToast.dismiss('addState');
        showToast.success('State added successfully!');
      }
    } catch (error) {
      console.error("Error adding state:", error);

      // Fallback: still update local state even if API fails
      setEditFromData((prev) => ({
        ...prev,
        state: customStateName.trim(),
      }));
      setStateSearchTerm(customStateName.trim());
      setShowCustomStateInput(false);

      // Add to local states list for immediate availability
      const newState = customStateName.trim();
      if (!statesList.includes(newState)) {
        const newStatesList = [...statesList, newState].sort();
        setStatesList(newStatesList);
        setFilteredStates(newStatesList.filter(state =>
          state.toLowerCase().includes(stateSearchTerm.toLowerCase())
        ));
      }

      // Clear input
      setCustomStateName("");

      // Warning message
      showToast.dismiss('addState');
      showToast.warning('State added locally. Backend state management can be added later.');
    }
  }
};

// Generic handler for all form inputs
const handleChangeProjectData = (e) => {
  const { name, value } = e.target;
  const fieldLabels = {
    projectOverview: 'Project Overview',
    type: 'Project Type',
    project_Status: 'Project Status',
    country: 'Country',
    luxury: 'Luxury',
    spotlight: 'Spotlight',
    totalLandArea: 'Total Land Area',
    totalUnit: 'Total Unit',
    towerNumber: 'Tower Number',
    launchingDate: 'Launching Date',
    mobileNumber: 'Mobile Number',
    possessionDate: 'Possession Date',
    minPrice: 'Minimum Price',
    maxPrice: 'Maximum Price',
    paymentPlan: 'Payment Plan',
    youtubeVideoUrl: 'YouTube Video URL',
    youtubeVideoTitle: 'YouTube Video Title',
    youtubeVideoDescription: 'YouTube Video Description',
    project_url: 'Project URL',
    meta_title: 'Meta Title',
    meta_description: 'Meta Description',
    projectReraNo: 'Project RERA No',
    project_discripation: 'Project Description',
    AboutDeveloper: 'About Developer',
    projectAddress: 'Project Address',
    projectName: 'Project Name',
    builderName: 'Builder Name',
    city: 'City',
    state: 'State'
  };
  
  const label = fieldLabels[name] || name;
  
  // Show toast for dropdown selections (select elements)
  if (e.target.tagName === 'SELECT') {
    if (value) {
      showToast.info(`${label} selected: ${value}`);
    } else {
      showToast.info(`${label} cleared`);
    }
  }
  
  setEditFromData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// Handler for single file changes
const handleSingleFileChange = (e, fieldName) => {
  const file = e.target.files[0];
  if (file) {
    const fieldLabels = {
      frontImage: 'Front Image',
      logo: 'Logo',
      thumbnailImage: 'Thumbnail Image',
      project_locationImage: 'Project Location Image',
      highlightImage: 'Highlight Image',
      projectMaster_plan: 'Master Plan',
      project_Brochure: 'Project Brochure'
    };
    
    const label = fieldLabels[fieldName] || fieldName;
    showToast.success(`${label} selected: ${file.name}`);
    
    setFileData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  }
};

// Handler for multiple file changes
const handleMultipleFilesChange = (e, fieldName) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    const fieldLabels = {
      project_floorplan_Image: 'Floor Plan Images',
      projectGallery: 'Gallery Images'
    };
    
    const label = fieldLabels[fieldName] || fieldName;
    showToast.success(`${label} selected: ${files.length} file(s)`);
    
    setFileData((prev) => ({
      ...prev,
      [fieldName]: files,
    }));
  }
};

// Reset form data function
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
    totalLandArea: "",
    totalUnit: "",
    towerNumber: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
    launchingDate: "",
    youtubeVideoUrl: "",
    youtubeVideoTitle: "",
    youtubeVideoDescription: "",
  });
  
  // Reset custom project type
  setCustomProjectType("");
};

// Reset image data function
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

const handleSubmitProject = async (e) => {
  e.preventDefault();
  setLoading(true);
  showToast.loading('Adding new project...', { id: 'insertProject' });

  const apiEndpoint = "project/Insert"; // Use direct backend path (no dev-only /api prefix)

  const formDataAPI = new FormData();

  // Get auth token from localStorage
  const token =
    localStorage.getItem("token") || localStorage.getItem("myToken");
  if (!token) {
    showToast.dismiss('insertProject');
    showToast.error('Please login first!');
    setLoading(false);
    return;
  }

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
      const items = editFromData[key]
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      items.forEach((item) => formDataAPI.append(key, item));
    } else {
      formDataAPI.append(key, editFromData[key]);
    }
  }

  // Append all single image files
  if (fileData.logo) formDataAPI.append("logo", fileData.logo);
  if (fileData.thumbnailImage)
    formDataAPI.append("thumbnailImage", fileData.thumbnailImage);
  if (fileData.project_locationImage)
    formDataAPI.append(
      "project_locationImage",
      fileData.project_locationImage
    );
  if (fileData.frontImage)
    formDataAPI.append("frontImage", fileData.frontImage);
  if (fileData.project_Brochure)
    formDataAPI.append("project_Brochure", fileData.project_Brochure);
  if (fileData.highlightImage)
    formDataAPI.append("highlightImage", fileData.highlightImage);
  if (fileData.projectMaster_plan)
    formDataAPI.append("projectMaster_plan", fileData.projectMaster_plan);

  // Append multiple image files
  fileData.project_floorplan_Image.forEach((file) => {
    formDataAPI.append("project_floorplan_Image", file);
  });
  fileData.projectGallery.forEach((file) => {
    formDataAPI.append("projectGallery", file);
  });

  try {
    const response = await api.post(apiEndpoint, formDataAPI, {
      // Let axios/browser set multipart boundary automatically; auth handled by api client
      withCredentials: true,
    });

    if (response.status === 200) {
      showToast.dismiss('insertProject');
      showToast.success('Project added successfully!');
      resetData();
      resetImageData();
      // Redirect to projects page after successful insertion
      setTimeout(() => {
        navigate('/Admin/Projects/property');
      }, 1500);
    } else {
      showToast.dismiss('insertProject');
      showToast.error('Failed to add project. Server returned an unexpected status.');
      console.error(
        "Failed to add project. Server response:",
        response.status,
        response.data
      );
    }
  } catch (error) {
    showToast.dismiss('insertProject');
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with a status code outside 2xx
      const { status, data } = error.response;
      console.error("Server Error:", status, data);

      if (status === 401) {
        errorMessage = "Session expired. Please login again.";
      } else if (status === 403) {
        errorMessage = "You do not have permission to perform this action";
      } else if (status === 404) {
        errorMessage = "API endpoint not found. Please check the URL.";
      } else if (status === 413) {
        errorMessage =
          "File size too large. Please reduce file size and try again.";
      } else if (status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (data && data.message) {
        errorMessage = data.message;
      } else {
        errorMessage = `Server error (${status})`;
      }

      // Log detailed error for debugging
      console.error("Error details:", {
        status,
        data,
        headers: error.response.headers,
        config: error.config,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
      errorMessage =
        "No response from server. Please check your network connection.";
    } else {
      // Error setting up the request
      console.error("Request Error:", error.message);
      errorMessage = `Request failed: ${error.message}`;
    }

    // Show error message to user
    showToast.error(errorMessage, { duration: 5000 });
  } finally {
    setLoading(false);
  }
};

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
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-gray-600 mb-2">{label}</span>
        {currentFile ? (
          currentFile.type && currentFile.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(currentFile)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mb-2"
            />
          ) : (
            <span className="text-xs text-gray-500">{currentFile.name}</span>
          )
        ) : (
          <span className="text-xs text-gray-400">
            Drag & drop or click to select
          </span>
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
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-gray-600 mb-2">{label}</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {currentFiles && currentFiles.length > 0 ? (
            currentFiles.map((file, idx) =>
              file.type && file.type.startsWith("image") ? (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <span key={idx} className="text-xs text-gray-500">
                  {file.name}
                </span>
              )
            )
          ) : (
            <span className="text-xs text-gray-400">
              Drag & drop or click to select
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 p-8 ml-64">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex items-center gap-2 justify-center">
            <MdBusiness className="text-3xl text-blue-500" /> Add New Project
          </h1>
          <p className="text-lg text-gray-600">
            Fill in the details to create a new project listing.
          </p>
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    Project Info
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {/* <div>
                    <Tippy
                      content={
                        <span>Project Overview (trending/featured/none)</span>
                      }
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="projectOverview"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineCategory /> Project Overview
                      </label>
                    </Tippy>
                    <select
                      id="projectOverview"
                      name="projectOverview"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                      value={editFromData.projectOverview}
                      onChange={handleChangeProjectData} // Generic handler
                    >
                      <option value="" disabled hidden>
                        Select Project Overview
                      </option>
                      <option value="trending">Trending</option>
                      <option value="featured">Featured</option>
                      <option value="none">None</option>
                    </select>
                  </div> */}

                  <div>
                    <Tippy
                      content={
                        <span>
                          Project Type (e.g., Commercial, Residential)
                        </span>
                      }
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="type"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdApartment /> Project Type
                      </label>
                    </Tippy>
                    <select
                      id="type"
                      name="type"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                      value={editFromData.type}
                      onChange={handleChangeProjectData} // Generic handler
                    >
                      <option value="" disabled hidden>
                        Select Project Type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={customProjectType}
                        onChange={(e) => setCustomProjectType(e.target.value)}
                        placeholder="Add custom type"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={handleAddProjectType}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap font-semibold shadow-sm inline-flex items-center justify-center min-w-[90px]"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <Tippy
                      content={
                        <span>Project Status (e.g., Under Construction)</span>
                      }
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="project_Status"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdInfo /> Project Status
                      </label>
                    </Tippy>
                    <select
                      id="project_Status"
                      name="project_Status"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                      value={editFromData.project_Status}
                      onChange={handleChangeProjectData} // Generic handler
                    >
                      <option value="" disabled hidden>
                        Select Project Status
                      </option>
                      <option value="underconstruction">
                        Under Construction
                      </option>
                      <option value="comingsoon">Coming Soon</option>
                      <option value="newlaunch">New Launch</option>
                      <option value="readytomove">Ready To Move</option>
                    </select>
                  </div>

                  <div>
                    <Tippy
                      content={<span>Project URL (slug)</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="project_url"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineInsertDriveFile /> Project URL
                      </label>
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    Location & Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="relative state-dropdown">
                    <Tippy
                      content={<span>State</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="state"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdLocationOn /> State
                      </label>
                    </Tippy>
                    <div className="relative">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="select state..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 pr-10"
                        value={stateSearchTerm}
                        onChange={handleStateInputChange}
                        onFocus={handleStateInputFocus}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsStateDropdownOpen(!isStateDropdownOpen)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <MdKeyboardArrowDown
                          className={`transition-transform ${
                            isStateDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {isStateDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 border-b border-gray-200">
                          <div className="relative">
                            <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search states..."
                              className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                              value={stateSearchTerm}
                              onChange={(e) =>
                                setStateSearchTerm(e.target.value)
                              }
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredStates.length > 0 ? (
                            filteredStates.map((state, index) => (
                              <button
                                key={index}
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                onClick={() => handleStateSelect(state)}
                              >
                                {state}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No states found
                            </div>
                          )}
                          {/* Other option */}
                          {/* <div className="border-t border-gray-200 mt-1">
                            <button
                              type="button"
                              className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-blue-600 font-medium"
                              onClick={() => handleStateSelect("Other")}
                            >
                              + Add New State
                            </button>
                          </div> */}
                        </div>
                      </div>
                    )}

                    {/* Custom State Input */}
                    {/* {showCustomStateInput && (
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <label className="block text-sm font-medium text-blue-800 mb-2">
                          Enter New State Name:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter state name..."
                            className="flex-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            value={customStateName}
                            onChange={(e) => setCustomStateName(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleCustomStateSubmit();
                              }
                            }}
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleCustomStateSubmit}
                            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                            disabled={!customStateName.trim()}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={handleCustomStateCancel}
                            className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="relative city-dropdown">
                    <Tippy
                      content={<span>City</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdLocationOn /> City
                      </label>
                    </Tippy>
                    <div className="relative">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="select city..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 pr-10"
                        value={citySearchTerm}
                        onChange={handleCityInputChange}
                        onFocus={handleCityInputFocus}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsCityDropdownOpen(!isCityDropdownOpen)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <MdKeyboardArrowDown
                          className={`transition-transform ${
                            isCityDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {isCityDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 border-b border-gray-200">
                          <div className="relative">
                            <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search cities..."
                              className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                              value={citySearchTerm}
                              onChange={(e) =>
                                setCitySearchTerm(e.target.value)
                              }
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredCities.length > 0 ? (
                            filteredCities.map((city, index) => (
                              <button
                                key={index}
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                onClick={() => handleCitySelect(city)}
                              >
                                {city}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              No cities found
                            </div>
                          )}
                          {/* Other option */}
                      
                        </div>
                      </div>
                    )}

                    {/* Custom City Input */}
                    
                  </div>
                  <div>
                    <Tippy
                      content={<span>Country</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="country"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdLocationOn /> Country
                      </label>
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
                    <Tippy
                      content={<span>Luxury Status</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="luxury"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdStar /> Luxury
                      </label>
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
                    <Tippy
                      content={<span>Spotlight Status</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="spotlight"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdStar /> Spotlight
                      </label>
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    Numeric Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy
                      content={<span>Total Land Area</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="totalLandArea"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineNumbers /> Total Land Area
                      </label>
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
                    <Tippy
                      content={<span>Total Units</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="totalUnit"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineNumbers /> Total Units
                      </label>
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
                    <Tippy
                      content={<span>Number of Towers</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="towerNumber"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineNumbers /> Towers
                      </label>
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
                    <Tippy
                      content={<span>Launching Date</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="launchingDate"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdDateRange /> Launching Date
                      </label>
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact & Pricing
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <Tippy
                      content={<span>Mobile Number</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlinePhone /> Mobile Number
                      </label>
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
                    <Tippy
                      content={<span>Possession Date</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="possessionDate"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdDateRange /> Possession Date
                      </label>
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
                    <Tippy
                      content={<span>Min Price</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="minPrice"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineAttachMoney /> Min Price (₹)
                      </label>
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
                    <Tippy
                      content={<span>Max Price</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="maxPrice"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdOutlineAttachMoney /> Max Price (₹)
                      </label>
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
                  <div>
                    <Tippy
                      content={<span>Payment Plan (text or URL)</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="paymentPlan"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdAttachMoney /> Payment Plan
                      </label>
                    </Tippy>
                    <input
                      type="text"
                      id="paymentPlan"
                      name="paymentPlan"
                      placeholder="e.g., 10:90 plan or https://..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                      value={editFromData.paymentPlan}
                      onChange={handleChangeProjectData}
                    />
                  </div>
                </div>
              </div>
              {/* YouTube Video Section */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mt-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
                  <MdMovie className="text-xl" />
                  Project Walkthrough Video
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Tippy
                      content={
                        <span>YouTube Video URL for project walkthrough</span>
                      }
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="youtubeVideoUrl"
                        className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdMovie /> YouTube Video URL
                      </label>
                    </Tippy>
                    <input
                      type="url"
                      id="youtubeVideoUrl"
                      name="youtubeVideoUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                      value={editFromData.youtubeVideoUrl}
                      onChange={handleChangeProjectData}
                    />
                    <p className="text-xs text-gray-500 mt-1 mb-2">
                      Add a YouTube video URL to show a project walkthrough on the project page
                    </p>
                    
                    {/* Video Preview */}
                    {editFromData.youtubeVideoUrl && extractYoutubeId(editFromData.youtubeVideoUrl) && (
                      <div className="mt-3 mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Video Preview:</h4>
                        <div className="aspect-w-16 aspect-h-9 w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${extractYoutubeId(editFromData.youtubeVideoUrl)}`}
                            title={editFromData.youtubeVideoTitle || 'YouTube video player'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-48 rounded-lg border border-gray-200"
                          ></iframe>
                        </div>
                        {editFromData.youtubeVideoTitle && (
                          <p className="text-sm font-medium text-gray-800 mt-2">{editFromData.youtubeVideoTitle}</p>
                        )}
                        {editFromData.youtubeVideoDescription && (
                          <p className="text-xs text-gray-600 mt-1">{editFromData.youtubeVideoDescription}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Tippy
                        content={<span>Optional title for the video</span>}
                        animation="scale"
                        theme="light-border"
                      >
                        <label
                          htmlFor="youtubeVideoTitle"
                          className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                        >
                          <MdTitle /> Video Title (Optional)
                        </label>
                      </Tippy>
                      <input
                        type="text"
                        id="youtubeVideoTitle"
                        name="youtubeVideoTitle"
                        placeholder="e.g., Project Walkthrough"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                        value={editFromData.youtubeVideoTitle}
                        onChange={handleChangeProjectData}
                      />
                    </div>
                    <div>
                      <Tippy
                        content={
                          <span>Optional description for the video</span>
                        }
                        animation="scale"
                        theme="light-border"
                      >
                        <label
                          htmlFor="youtubeVideoDescription"
                          className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"
                        >
                          <MdDescription /> Video Description (Optional)
                        </label>
                      </Tippy>
                      <input
                        type="text"
                        id="youtubeVideoDescription"
                        name="youtubeVideoDescription"
                        placeholder="Brief description of the video"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                        value={editFromData.youtubeVideoDescription}
                        onChange={handleChangeProjectData}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Tippy
                    content={<span>Project Name</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectName"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdTitle /> Project Name
                    </label>
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
                  <Tippy
                    content={<span>Project Address</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectAddress"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdLocationOn /> Project Address
                    </label>
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
                  <Tippy
                    content={<span>Project Description</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="project_discripation"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdDescription /> Project Description
                    </label>
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
                  <Tippy
                    content={<span>About Developer</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="AboutDeveloper"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdPerson /> About Developer
                    </label>
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
                <div className="relative builder-dropdown">
                  <Tippy
                    content={<span>Builder Name</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="builderName"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdPerson /> Builder Name
                    </label>
                  </Tippy>
                  <div className="relative">
                    <input
                      type="text"
                      id="builderName"
                      name="builderName"
                      placeholder="Search and select builder..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 pr-10"
                      value={builderSearchTerm}
                      onChange={(e) => {
                        setBuilderSearchTerm(e.target.value);
                        setIsBuilderDropdownOpen(true);
                      }}
                      onFocus={() => setIsBuilderDropdownOpen(true)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsBuilderDropdownOpen(!isBuilderDropdownOpen)
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <MdKeyboardArrowDown
                        className={`transition-transform ${
                          isBuilderDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dropdown */}
                  {isBuilderDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-gray-200">
                        <div className="relative">
                          <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search builders..."
                            className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                            value={builderSearchTerm}
                            onChange={(e) =>
                              setBuilderSearchTerm(e.target.value)
                            }
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredBuilders.length > 0 ? (
                          filteredBuilders.map((builder, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                              onClick={() => handleBuilderSelect(builder)}
                            >
                              {builder}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            No builders found
                          </div>
                        )}
                        {/* Other option */}
                        <div className="border-t border-gray-200 mt-1">
                          <button
                            type="button"
                            className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none text-blue-600 font-medium"
                            onClick={() => handleBuilderSelect("Other")}
                          >
                            + Add New Builder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Builder Input */}
                  {showCustomBuilderInput && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        Enter New Builder Name:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter builder name..."
                          className="flex-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                          value={customBuilderName}
                          onChange={(e) => setCustomBuilderName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleCustomBuilderSubmit();
                            }
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={handleCustomBuilderSubmit}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                          disabled={!customBuilderName.trim()}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCustomBuilderInput(false)}
                          className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Tippy
                    content={
                      <span>Connectivity (e.g., Metro Station, Highway)</span>
                    }
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectRedefine_Connectivity"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdBusiness /> Connectivity
                    </label>
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
                  <Tippy
                    content={
                      <span>Education (e.g., Schools, Universities)</span>
                    }
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectRedefine_Education"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdSchool /> Education
                    </label>
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
                  <Tippy
                    content={
                      <span>Business (e.g., Tech Parks, Business Hubs)</span>
                    }
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectRedefine_Business"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdBusiness /> Business
                    </label>
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
                  <Tippy
                    content={<span>Entertainment (e.g., Malls, Cinemas)</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectRedefine_Entertainment"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdMovie /> Entertainment
                    </label>
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
                  <Tippy
                    content={
                      <span>Amenities (e.g., Swimming Pool, Gym, Park)</span>
                    }
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="Amenities"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdOutlineCategory /> Amenities
                    </label>
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
                  <Tippy
                    content={<span>Banner Content Heading</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectBgContent"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdTitle /> Banner Content Heading
                    </label>
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
                  <Tippy
                    content={<span>Project RERA Number</span>}
                    animation="scale"
                    theme="light-border"
                  >
                    <label
                      htmlFor="projectReraNo"
                      className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                    >
                      <MdOutlineInsertDriveFile /> Project RERA Number
                    </label>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MdOutlineCloudUpload /> Upload Project Images & Documents
                </h3>
                {/* All File Uploads in a single grid: 3 columns per row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "logo"
                      )
                    }
                    label="Project Logo"
                    currentFile={fileData.logo}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "thumbnailImage"
                      )
                    }
                    label="Thumbnail Image"
                    currentFile={fileData.thumbnailImage}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "frontImage"
                      )
                    }
                    label="Front Image"
                    currentFile={fileData.frontImage}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "project_locationImage"
                      )
                    }
                    label="Project Location Image"
                    currentFile={fileData.project_locationImage}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "projectMaster_plan"
                      )
                    }
                    label="Project Master Plan"
                    currentFile={fileData.projectMaster_plan}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "project_Brochure"
                      )
                    }
                    label="Project Brochure"
                    currentFile={fileData.project_Brochure}
                  />
                  <FileDropzone
                    onDrop={(file) =>
                      handleSingleFileChange(
                        { target: { files: [file] } },
                        "highlightImage"
                      )
                    }
                    label="Highlight Image"
                    currentFile={fileData.highlightImage}
                  />
                  <MultiFileDropzone
                    onDrop={(files) =>
                      handleMultipleFilesChange(
                        { target: { files } },
                        "project_floorplan_Image"
                      )
                    }
                    label="Project Floor Plan Images"
                    currentFiles={fileData.project_floorplan_Image}
                  />
                  <MultiFileDropzone
                    onDrop={(files) =>
                      handleMultipleFilesChange(
                        { target: { files } },
                        "projectGallery"
                      )
                    }
                    label="Project Gallery Images"
                    currentFiles={fileData.projectGallery}
                  />
                </div>
              </div>

              {/* SEO Fields */}
              <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MdOutlineInsertDriveFile /> SEO Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Tippy
                      content={<span>Meta Title</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="meta_title"
                        className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdTitle /> Meta Title
                      </label>
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
                    <Tippy
                      content={<span>Meta Description</span>}
                      animation="scale"
                      theme="light-border"
                    >
                      <label
                        htmlFor="meta_description"
                        className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"
                      >
                        <MdDescription /> Meta Description
                      </label>
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
                  {loading ? "Adding Project..." : "Add Project"}
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview Card */}
          <div className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 w-full md:w-1/3 p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MdInfo className="text-blue-500" /> Live Preview
            </h2>
            <div className="space-y-4">
              <div>
                <span className="block text-gray-500 text-xs mb-1">
                  Project Name
                </span>
                <div className="text-lg font-semibold text-gray-900">
                  {editFromData.projectName || (
                    <span className="text-gray-400">(Not set)</span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">Type</span>
                  <div className="text-base text-gray-700">
                    {editFromData.type || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">
                    Status
                  </span>
                  <div className="text-base text-gray-700">
                    {editFromData.project_Status || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">City</span>
                  <div className="text-base text-gray-700">
                    {editFromData.city || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">
                    State
                  </span>
                  <div className="text-base text-gray-700">
                    {editFromData.state || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <span className="block text-gray-500 text-xs mb-1">
                    Min Price
                  </span>
                  <div className="text-base text-gray-700">
                    {editFromData.minPrice || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="block text-gray-500 text-xs mb-1">
                    Max Price
                  </span>
                  <div className="text-base text-gray-700">
                    {editFromData.maxPrice || (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <span className="block text-gray-500 text-xs mb-1">
                  Front Image
                </span>
                {fileData.frontImage ? (
                  <img
                    src={URL.createObjectURL(fileData.frontImage)}
                    alt="Front Preview"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div>
                <span className="block text-gray-500 text-xs mb-1">
                  Gallery Images
                </span>
                <div className="flex flex-wrap gap-2">
                  {fileData.projectGallery &&
                  fileData.projectGallery.length > 0 ? (
                    fileData.projectGallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`Gallery ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded border border-gray-200"
                      />
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
