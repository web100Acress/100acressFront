import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import api from "../config/apiClient";
import { MdOutlineDeleteOutline, MdInfo, MdAttachMoney, MdDateRange, MdBarChart, MdDescription, MdStar, MdCheckCircle, MdUpdate } from "react-icons/md";
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

const ProjectEdit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [builderOptions, setBuilderOptions] = useState([]);
  const [values, setValues] = useState({
    thumbnailImage: "",
    otherImage: [],
    project_floorplan_Image: [],
    projectGallery: [],
    highlightImage: "",
    project_locationImage: "",
    logo: "",
    projectName: "",
    builderName: "",
    projectAddress: "",
    city: "",
    paymentPlan:"",
    state: "",
    country: "",
    luxury: false,
    spotlight: false,
    projectOverview: "",
    projectRedefine_Business: "",
    projectRedefine_Connectivity: "",
    projectRedefine_Education: "",
    projectRedefine_Entertainment: "",
    projectReraNo: "",
    AboutDeveloper: "",
    type: "",
    project_url: "",
    meta_title: "",
    meta_description: "",
    project_Status: "",
    launchingDate: "",
    totalLandArea: "",
    totalUnit: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
    Amenities:"",
    project_Brochure: "" });

  // City and State dropdown states
  const [citiesList, setCitiesList] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState("");

  const [statesList, setStatesList] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [stateSearchTerm, setStateSearchTerm] = useState("");

  const { id } = useParams();

  // Safely derive arrays from values to avoid destructuring errors
  const project_floorplan_Image = Array.isArray(values?.project_floorplan_Image)
    ? values.project_floorplan_Image
    : [];
  const projectGallery = Array.isArray(values?.projectGallery)
    ? values.projectGallery
    : [];
  const floorPlanLength = project_floorplan_Image.length;
  const projectGalleryLength = projectGallery.length;

  // Fetch project data when id changes
  useEffect(() => {
    fetchData();
  }, [id]);

  // Load cities and states on component mount
  useEffect(() => {
    fetchCitiesFromBackend();
    fetchStatesFromBackend();
  }, []);

  // Initialize city search term when values.city changes
  useEffect(() => {
    if (values.city) {
      setCitySearchTerm(values.city);
    }
  }, [values.city]);

  // Initialize state search term when values.state changes
  useEffect(() => {
    if (values.state) {
      setStateSearchTerm(values.state);
    }
  }, [values.state]);

  // Fetch all project types for dropdown
  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const res = await api.get('/project/viewAll/data?sort=-createdAt');
        if (res.data?.data) {
          // Extract unique project types and sort them
          const uniqueTypes = [...new Set(
            res.data.data
              .map(project => project.type)
              .filter(Boolean) // Remove any null/undefined values
          )].sort();
          // Add "Industrial Plots" if not already present
          if (!uniqueTypes.includes('Industrial Plots')) {
            uniqueTypes.push('Industrial Plots');
          }

          // Sort the final list
          uniqueTypes.sort();

          setProjectTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching project types:", error);
        // Fallback: set default project types including Industrial Plots
        setProjectTypes(['Industrial Plots']);
      }
    };
    fetchProjectTypes();
  }, []);

  // Fetch all project statuses for dropdown
  useEffect(() => {
    const fetchProjectStatuses = async () => {
      try {
        const res = await api.get('/project/viewAll/data?sort=-createdAt');
        if (res.data?.data) {
          // Extract unique project statuses and sort them
          const uniqueStatuses = [...new Set(
            res.data.data
              .map(project => project.project_Status)
              .filter(Boolean) // Remove any null/undefined values
          )].sort();

          setStatusOptions(uniqueStatuses);
        }
      } catch (error) {
        console.error("Error fetching project statuses:", error);
        // Fallback: set default project statuses
        setStatusOptions(['newlaunch', 'readytomove', 'underconstruction']);
      }
    };
    fetchProjectStatuses();
  }, []);

  // Fetch all project builders for dropdown
  useEffect(() => {
    const fetchProjectBuilders = async () => {
      try {
        const res = await api.get('/project/viewAll/data?sort=-createdAt');
        if (res.data?.data) {
          // Extract unique builder names and sort them
          const uniqueBuilders = [...new Set(
            res.data.data
              .map(project => project.builderName)
              .filter(Boolean) // Remove any null/undefined values
          )].sort();

          setBuilderOptions(uniqueBuilders);
        }
      } catch (error) {
        console.error("Error fetching project builders:", error);
        // Fallback: set empty array
        setBuilderOptions([]);
      }
    };
    fetchProjectBuilders();
  }, []);

  // Function to fetch project data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/project/Edit/${id}`);
      if (res.status === 200 && res.data.dataedit) {
        // Ensure all required fields are initialized
        const projectData = {
          frontImage: {},
          thumbnailImage: {},
          project_floorplan_Image: [],
          projectGallery: [],
          highlightImage: '',
          project_locationImage: '',
          logo: '',
          type: '',
          builderName: '',
          projectAddress: '',
          city: '',
          paymentPlan: '',
          state: '',
          country: '',
          luxury: false,
          spotlight: false,
          projectOverview: '',
          projectRedefine_Business: '',
          projectRedefine_Connectivity: '',
          projectRedefine_Education: '',
          projectRedefine_Entertainment: '',
          projectReraNo: '',
          AboutDeveloper: '',
          project_url: '',
          meta_title: '',
          meta_description: '',
          project_Status: '',
          launchingDate: '',
          totalLandArea: '',
          totalUnit: '',
          towerNumber: '',
          mobileNumber: '',
          possessionDate: '',
          minPrice: '',
          maxPrice: '',
          Amenities: '',
          project_Brochure: '',
          ...res.data.dataedit // This will override defaults with API data
        };
        setValues(projectData);
      } else if (res.status >= 400 && res.status < 500) {
        // Handle client errors
        console.error('Client error:', res);
      } else if (res.status >= 500) {
        alert("Server error. Please try again later.");
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      alert("Failed to load project data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch cities from backend
  const fetchCitiesFromBackend = async () => {
    try {
      setLoadingCities(true);

      // Fetch from multiple sources to get comprehensive city list
      const [projectsResponse, propertiesResponse] = await Promise.allSettled([
        api.get("project/viewAll/data?sort=-createdAt&limit=1000"),
        api.get("postPerson/propertyoneEdit/all?limit=1000")
      ]);

      let allCities = [];

      // Extract cities from projects
      if (projectsResponse.status === 'fulfilled' && projectsResponse.value?.data?.data) {
        const projectCities = projectsResponse.value.data.data
          .map(project => project.city)
          .filter(Boolean);
        allCities.push(...projectCities);
      }

      // Extract cities from properties
      if (propertiesResponse.status === 'fulfilled' && propertiesResponse.value?.data?.data) {
        const propertyCities = propertiesResponse.value.data.data
          .map(property => property.city)
          .filter(Boolean);
        allCities.push(...propertyCities);
      }

      // Get unique cities and sort them
      const uniqueCities = [...new Set(allCities)].sort();

      console.log(`Fetched ${uniqueCities.length} unique cities from backend`);
      setCitiesList(uniqueCities);
      setFilteredCities(uniqueCities);
      return uniqueCities;

    } catch (error) {
      console.error("Error fetching cities:", error);
      // Fallback to just projects if properties API fails
      try {
        const { data } = await api.get("project/viewAll/data?sort=-createdAt");
        if (data?.data) {
          const uniqueCities = [...new Set(
            data.data.map(project => project.city).filter(Boolean)
          )].sort();
          setCitiesList(uniqueCities);
          setFilteredCities(uniqueCities);
          return uniqueCities;
        }
      } catch (fallbackError) {
        console.error("Fallback city fetch also failed:", fallbackError);
      }
      return [];
    } finally {
      setLoadingCities(false);
    }
  };

  // Function to fetch states from backend
  const fetchStatesFromBackend = async () => {
    try {
      setLoadingStates(true);

      // Fetch from multiple sources to get comprehensive state list
      const [projectsResponse, propertiesResponse] = await Promise.allSettled([
        api.get("project/viewAll/data?sort=-createdAt&limit=1000"),
        api.get("postPerson/propertyoneEdit/all?limit=1000")
      ]);

      let allStates = [];

      // Extract states from projects
      if (projectsResponse.status === 'fulfilled' && projectsResponse.value?.data?.data) {
        const projectStates = projectsResponse.value.data.data
          .map(project => project.state)
          .filter(Boolean);
        allStates.push(...projectStates);
      }

      // Extract states from properties
      if (propertiesResponse.status === 'fulfilled' && propertiesResponse.value?.data?.data) {
        const propertyStates = propertiesResponse.value.data.data
          .map(property => property.state)
          .filter(Boolean);
        allStates.push(...propertyStates);
      }

      // Get unique states and sort them
      const uniqueStates = [...new Set(allStates)].sort();

      console.log(`Fetched ${uniqueStates.length} unique states from backend`);
      setStatesList(uniqueStates);
      setFilteredStates(uniqueStates);
      return uniqueStates;

    } catch (error) {
      console.error("Error fetching states:", error);
      // Fallback to just projects if properties API fails
      try {
        const { data } = await api.get("project/viewAll/data?sort=-createdAt");
        if (data?.data) {
          const uniqueStates = [...new Set(
            data.data.map(project => project.state).filter(Boolean)
          )].sort();
          setStatesList(uniqueStates);
          setFilteredStates(uniqueStates);
          return uniqueStates;
        }
      } catch (fallbackError) {
        console.error("Fallback state fetch also failed:", fallbackError);
      }
      return [];
    } finally {
      setLoadingStates(false);
    }
  };

  // Filter cities based on search term
  useEffect(() => {
    const filtered = citiesList.filter((city) =>
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [citySearchTerm, citiesList]);

  // Filter states based on search term
  useEffect(() => {
    const filtered = statesList.filter((state) =>
      state.toLowerCase().includes(stateSearchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [stateSearchTerm, statesList]);

  // Handle city selection
  const handleCitySelect = (cityName) => {
    setValues((prev) => ({
      ...prev,
      city: cityName,
    }));
    setCitySearchTerm(cityName);
    setIsCityDropdownOpen(false);
  };

  // Handle state selection
  const handleStateSelect = (stateName) => {
    setValues((prev) => ({
      ...prev,
      state: stateName,
    }));
    setStateSearchTerm(stateName);
    setIsStateDropdownOpen(false);
  };

  // Handle city input change - allow direct typing of new cities
  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCitySearchTerm(value);

    // If user types a new city name, set it directly
    if (value && !filteredCities.includes(value)) {
      setValues((prev) => ({
        ...prev,
        city: value,
      }));
    }

    setIsCityDropdownOpen(true);
  };

  // Handle state input change - allow direct typing of new states
  const handleStateInputChange = (e) => {
    const value = e.target.value;
    setStateSearchTerm(value);

    // If user types a new state name, set it directly
    if (value && !filteredStates.includes(value)) {
      setValues((prev) => ({
        ...prev,
        state: value,
      }));
    }

    setIsStateDropdownOpen(true);
  };

  // Handle city input focus
  const handleCityInputFocus = () => {
    setIsCityDropdownOpen(true);
  };

  // Handle state input focus
  const handleStateInputFocus = () => {
    setIsStateDropdownOpen(true);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCityDropdownOpen && !event.target.closest(".city-dropdown")) {
        setIsCityDropdownOpen(false);
      }
      if (isStateDropdownOpen && !event.target.closest(".state-dropdown")) {
        setIsStateDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCityDropdownOpen, isStateDropdownOpen]);

  const handleFileChange = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleThumbnailImageChange = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setValues((prevValues) => ({
          ...prevValues,
          thumbnailImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleBrochureChange = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      setValues((prevValues) => ({
        ...prevValues,
        project_Brochure: {
          file: input.files[0],
          url: URL.createObjectURL(input.files[0]),
        },
      }));
    }
  };

  // const handleUpdateUser = async () => {
  //   try {
  //     const fromData = new FormData();

  //     // Append all key-value pairs from values
  //     for (const key in values) {
  //       if (values[key] !== undefined && values[key] !== null) {
  //         fromData.append(key, values[key]);
  //       }
  //     }

  //     // Append floor plan images if they exist
  //     if (values.project_floorplan_Image && Array.isArray(values.project_floorplan_Image)) {
  //       for (let i = 0; i < floorPlanLength; i++) {
  //         if (values.project_floorplan_Image[i] && values.project_floorplan_Image[i].file) {
  //           fromData.append('project_floorplan_Image', values.project_floorplan_Image[i].file);
  //         }
  //       }
  //     }

  //     // Append project gallery images if they exist
  //     if (values.projectGallery && Array.isArray(values.projectGallery)) {
  //       for (let i = 0; i < projectGalleryLength; i++) {
  //         if (values.projectGallery[i] && values.projectGallery[i].file) {
  //           fromData.append('projectGallery', values.projectGallery[i].file);
  //         }
  //       }
  //     }

  //     // Append front image if it exists
  //     if (values.frontImage && values.frontImage.file) {
  //       fromData.append('frontImage', values.frontImage.file);
  //     }

  //     // Append project master plan image if it exists
  //     if (values.projectMaster_plan && values.projectMaster_plan.file) {
  //       fromData.append('projectMaster_plan', values.projectMaster_plan.file);
  //     }

  //     const response = await axios.post(
  //       `/project/Update/${id}`,
  //       fromData
  //     );

  //     if (response.status === 200) {
  //       alert("Data updated successfully");
  //     } else {
  //       console.error("Failed to update user");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };



  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      // Append scalar/text fields explicitly to avoid sending objects where files are expected
      const scalarKeys = [
        'projectName','builderName','projectAddress','city','state','country','paymentPlan',
        'luxury','spotlight','projectOverview','projectRedefine_Business','projectRedefine_Connectivity',
        'projectRedefine_Education','projectRedefine_Entertainment','projectReraNo','AboutDeveloper','type',
        'project_url','meta_title','meta_description','project_Status','launchingDate','totalLandArea',
        'totalUnit','towerNumber','mobileNumber','possessionDate','minPrice','maxPrice','Amenities',
        'project_discripation'
      ];
      scalarKeys.forEach((key) => {
        const val = values[key];
        if (val !== undefined && val !== null && typeof val !== 'object') {
          formData.append(key, val);
          console.log(`Appending ${key}: ${val}`); // Debug: Log what's being sent
        } else if (val === undefined || val === null) {
          console.log(`Skipping ${key}: value is undefined or null`);
        } else {
          console.log(`Skipping ${key}: value is object type`, typeof val);
        }
      });

      // Helper: append single file if it's a File object or an object with .file
      const appendMaybeFile = (field, value) => {
        if (!value) return;
        if (value instanceof File) {
          formData.append(field, value);
          console.log(`Appending ${field} (File)`, value);
        } else if (value && value.file instanceof File) {
          formData.append(field, value.file);
          console.log(`Appending ${field} (.file)`, value.file);
        }
      };

      // Single-file fields as per backend routes/Project.route.js
      appendMaybeFile('frontImage', values.frontImage);
      appendMaybeFile('thumbnailImage', values.thumbnailImage);
      appendMaybeFile('project_locationImage', values.project_locationImage);
      appendMaybeFile('highlightImage', values.highlightImage);
      appendMaybeFile('projectMaster_plan', values.projectMaster_plan);
      appendMaybeFile('logo', values.logo);
      appendMaybeFile('project_Brochure', values.project_Brochure);

      // Multi-file fields
      if (Array.isArray(values.project_floorplan_Image)) {
        values.project_floorplan_Image.forEach((item, index) => {
          if (item instanceof File) {
            formData.append('project_floorplan_Image', item);
            console.log(`Appending floorplan[${index}] (File)`, item);
          } else if (item && item.file instanceof File) {
            formData.append('project_floorplan_Image', item.file);
            console.log(`Appending floorplan[${index}] (.file)`, item.file);
          }
        });
      }
      if (Array.isArray(values.projectGallery)) {
        values.projectGallery.forEach((item, index) => {
          if (item instanceof File) {
            formData.append('projectGallery', item);
            console.log(`Appending projectGallery[${index}] (File)`, item);
          } else if (item && item.file instanceof File) {
            formData.append('projectGallery', item.file);
            console.log(`Appending projectGallery[${index}] (.file)`, item.file);
          }
        });
      }

      // Submit; api client will set Authorization and proper multipart headers
      const response = await api.post(`/project/Update/${id}`, formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Data updated successfully");

        // Trigger refresh in Projects component if it's open
        if (window.location.pathname === '/admin/projects' || window.location.pathname.startsWith('/admin/Projects')) {
          // Send message to parent window to refresh data
          window.postMessage({ type: 'PROJECT_UPDATED', projectId: id }, '*');
        }

      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this user.");
          alert("You are not authorized to delete this user.");
        } else {
          console.error("An error occurred while deleting user:", error.response.status);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error in request setup:", error.message);
      }
     }
  };



  const handleDeleteFloorPlanImage = async (index) => {
    const IndexNumber = index;
    try {
      const response = await api.delete(
        `/floorImage/${id}/${IndexNumber}`,
        {}
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete floor plan image. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this image.");
          alert("You are not authorized to delete this image.");
        } else {
          console.error("An error occurred while deleting floor plan image:", error.response.status);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const handleDeleteGalleryImage = async (index) => {
    const IndexNumber = index;
    try {
      const response = await api.delete(
        `/galleryImage/${id}/${IndexNumber}`,
        {}
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete gallery image. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this image.");
          alert("You are not authorized to delete this image.");
        } else {
          console.error("An error occurred while deleting gallery image:", error.response.status);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const deleteFloorPlanImage = (index) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this floor plan image?"
    );
    if (confirmDeletion) {
      handleDeleteFloorPlanImage(index);
    }
  };

  const deleteGalleryImage = (index) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );
    if (confirmDeletion) {
      handleDeleteGalleryImage(index);
    }
  };

  const groupedSections = [
    {
      icon: <MdInfo className="text-2xl text-blue-500 mr-2" />, title: "Basic Info", fields: [
        { label: "Property Name", name: "projectName", icon: <MdInfo className="inline mr-1" /> },
        { label: "Project Type", name: "type", icon: <MdInfo className="inline mr-1" />, select: true, options: projectTypes || [] },
        { label: "Project Status", name: "project_Status", icon: <MdInfo className="inline mr-1" />, select: true, options: statusOptions },
        { label: "Project URL", name: "project_url", icon: <MdInfo className="inline mr-1" />, placeholder: "project-name" },
        { label: "Builder Name", name: "builderName", icon: <MdInfo className="inline mr-1" />, select: true, options: builderOptions },
        { label: "Address", name: "projectAddress", icon: <MdInfo className="inline mr-1" /> },
        { label: "City", name: "city", icon: <MdInfo className="inline mr-1" /> },
        { label: "State", name: "state", icon: <MdInfo className="inline mr-1" /> },
        { label: "Country", name: "country", icon: <MdInfo className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdAttachMoney className="text-2xl text-green-500 mr-2" />, title: "Pricing & Dates", fields: [
        { label: "Minimum Price", name: "minPrice", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Maximum Price", name: "maxPrice", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Payment Plan", name: "paymentPlan", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Launching Date", name: "launchingDate", icon: <MdDateRange className="inline mr-1" /> },
        { label: "Possession Date", name: "possessionDate", icon: <MdDateRange className="inline mr-1" /> },
        { label: "Project Rera No", name: "projectReraNo", icon: <MdCheckCircle className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdBarChart className="text-2xl text-purple-500 mr-2" />, title: "Project Stats", fields: [
        { label: "Total Land Area", name: "totalLandArea", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Total Unit", name: "totalUnit", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Tower Number", name: "towerNumber", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Mobile Number", name: "mobileNumber", icon: <MdBarChart className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdDescription className="text-2xl text-orange-500 mr-2" />, title: "Descriptions", fields: [
        { label: "Project Overview", name: "projectOverview", icon: <MdDescription className="inline mr-1" /> },
        { label: "Project Description", name: "project_discripation", icon: <MdDescription className="inline mr-1" />, textarea: true },
        { label: "About Developer", name: "AboutDeveloper", icon: <MdDescription className="inline mr-1" /> },
        { label: "Meta Title", name: "meta_title", icon: <MdDescription className="inline mr-1" /> },
        { label: "Meta Description", name: "meta_description", icon: <MdDescription className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdStar className="text-2xl text-yellow-500 mr-2" />, title: "Features", fields: [
        { label: "Luxury", name: "luxury", icon: <MdStar className="inline mr-1" />, select: true, options: ["True", "False"] },
        { label: "Spotlight", name: "spotlight", icon: <MdStar className="inline mr-1" />, select: true, options: ["True", "False"] },
        { label: "Amenities", name: "Amenities", icon: <MdStar className="inline mr-1" />, textarea: true },
        { label: "Project Redefine Business", name: "projectRedefine_Business", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Connectivity", name: "projectRedefine_Connectivity", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Education", name: "projectRedefine_Education", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Entertainment", name: "projectRedefine_Entertainment", icon: <MdStar className="inline mr-1" /> },
      ]
    },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
        <div className="w-full space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
            Edit Project
          </h1>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Front Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Front Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.frontImage && values.frontImage.url ? (
                  <img src={values.frontImage.url} alt="frontImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Front Image</span>
                )}
              </div>
              <input type="file" onChange={handleFileChange} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Thumbnail Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Thumbnail Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.thumbnailImage && values.thumbnailImage.url ? (
                  <img src={values.thumbnailImage.url} alt="thumbnailImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Thumbnail Image</span>
                )}
              </div>
              <input type="file" onChange={handleThumbnailImageChange} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Project Location Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Location Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.project_locationImage && values.project_locationImage.url ? (
                  <img src={values.project_locationImage.url} alt="location" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Location Image</span>
                )}
              </div>
              <input type="file" name="project_locationImage" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, project_locationImage: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Logo Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Logo Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.logo && values.logo.url ? (
                  <img src={values.logo.url} alt="logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Logo Image</span>
                )}
              </div>
              <input type="file" name="logo" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, logo: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Highlight Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Highlight Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.highlightImage && values.highlightImage.url ? (
                  <img src={values.highlightImage.url} alt="highlightImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Highlight Image</span>
                )}
              </div>
              <input type="file" name="highlightImage" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, highlightImage: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Project Brochure */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Master Plan</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.projectMaster_plan && values.projectMaster_plan.url ? (
                  <img src={values.projectMaster_plan.url} alt="masterplan" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Master Plan</span>
                )}
              </div>
              <input type="file" name="projectMaster_plan" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, projectMaster_plan: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
          </div>

          {/* Project Brochure */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Brochure</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.project_Brochure && values.project_Brochure.url ? (
                  <iframe src={values.project_Brochure.url} alt="brochure" className="max-h-full max-w-full" style={{ width: '100%', height: '100%' }} />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Brochure</span>
                )}
              </div>
              <input type="file" accept="application/pdf" name="project_Brochure" onChange={handleBrochureChange} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
          </div>

          {/* Floor Plan Images */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200">Project FloorPlan Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {project_floorplan_Image && Array.isArray(project_floorplan_Image) && project_floorplan_Image.length > 0 &&
                          project_floorplan_Image.map((image, index) => (
                  <article key={index} className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md group cursor-pointer">
                    <MdOutlineDeleteOutline onClick={() => deleteFloorPlanImage(index)} size={30} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-10" />
                    <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </article>
                          ))}
              <input type="file" name="project_floorplan_Image" accept="image/*" onChange={(e) => {
                            const files = Array.from(e.target.files);
                const updatedImages = files.map((file) => ({ url: URL.createObjectURL(file), file }));
                setValues({ ...values, project_floorplan_Image: [...(project_floorplan_Image || []), ...updatedImages] });
              }} multiple className="mt-2 col-span-full dark:bg-gray-900 dark:text-white" />
                      </div>
                    </section>

          {/* Project Gallery Images */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200">Project Gallery Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projectGallery && Array.isArray(projectGallery) && projectGallery.length > 0 &&
                          projectGallery.map((image, index) => (
                  <article key={index} className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md group cursor-pointer">
                    <MdOutlineDeleteOutline onClick={() => deleteGalleryImage(index)} size={30} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-10" />
                    <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </article>
                          ))}
              <input type="file" name="projectGallery" accept="image/*" onChange={(e) => {
                            const files = Array.from(e.target.files);
                const updatedImages = files.map((file) => ({ url: URL.createObjectURL(file), file }));
                setValues({ ...values, projectGallery: [...(projectGallery || []), ...updatedImages] });
              }} multiple className="mt-2 col-span-full dark:bg-gray-900 dark:text-white" />
                      </div>
                    </section>

          {/* Project Details Form */}
          <section className="space-y-8">
            {groupedSections.map((section, idx) => (
              <div key={section.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-blue-400 to-purple-400 p-8 hover:shadow-3xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {section.fields.map(field => {
                    console.log('Rendering field:', field.name, 'Value:', values[field.name]);
                    return (
                    <div key={field.name}>
                      <label className="block text-red-700 font-semibold mb-2 flex items-center">{field.icon}{field.label}</label>
                      {field.select ? (
                        <select name={field.name} value={values[field.name] || ''} onChange={e => setValues({ ...values, [field.name]: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white">
                          <option value="">Select {field.label}</option>
                          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : field.name === 'city' ? (
                        /* City Dropdown */
                        <div className="relative city-dropdown">
                          <Tippy content={<span>City</span>} animation="scale" theme="light-border">
                            <div className="relative">
                              <input
                                type="text"
                                value={citySearchTerm}
                                onChange={handleCityInputChange}
                                onFocus={handleCityInputFocus}
                                placeholder="Type or select city"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 pr-10"
                                autoComplete="off"
                              />
                              <button
                                type="button"
                                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </Tippy>

                          {/* Dropdown */}
                          {isCityDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                              {loadingCities ? (
                                <div className="px-4 py-2 text-gray-500">Loading cities...</div>
                              ) : filteredCities.length > 0 ? (
                                <>
                                  {filteredCities.map((city, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleCitySelect(city)}
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                    >
                                      {city}
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <div className="px-4 py-2 text-gray-500">No cities found</div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : field.name === 'state' ? (
                        /* State Dropdown */
                        <div className="relative state-dropdown">
                          <Tippy content={<span>State</span>} animation="scale" theme="light-border">
                            <div className="relative">
                              <input
                                type="text"
                                value={stateSearchTerm}
                                onChange={handleStateInputChange}
                                onFocus={handleStateInputFocus}
                                placeholder="Type or select state"
                                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 pr-10"
                                autoComplete="off"
                              />
                              <button
                                type="button"
                                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </Tippy>

                          {/* Dropdown */}
                          {isStateDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                              {loadingStates ? (
                                <div className="px-4 py-2 text-gray-500">Loading states...</div>
                              ) : filteredStates.length > 0 ? (
                                <>
                                  {filteredStates.map((state, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleStateSelect(state)}
                                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                    >
                                      {state}
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <div className="px-4 py-2 text-gray-500">No states found</div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : field.textarea ? (
                        <textarea name={field.name} value={values[field.name] || ''} onChange={e => setValues({ ...values, [field.name]: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                      ) : (
                        <input 
                          type="text" 
                          name={field.name} 
                          value={values[field.name] || ''} 
                          onChange={e => setValues({ ...values, [field.name]: e.target.value })} 
                          placeholder={field.placeholder || ''}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white" 
                        />
                      )}
                    </div>
                  )})}
                </div>
                {idx < groupedSections.length - 1 && <hr className="my-8 border-t-2 border-dashed border-gray-200" />}
              </div>
            ))}
            <div className="flex justify-end mt-8">
              <button type="button" onClick={async () => { setLoading(true); await handleUpdateUser(); setLoading(false); }} className="flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-8 py-3 shadow-lg transition-all disabled:opacity-60" disabled={loading}>
                <MdUpdate className="text-2xl" />
                {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Update"}
            </button>
          </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
