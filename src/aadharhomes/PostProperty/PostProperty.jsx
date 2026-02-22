import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, ConfigProvider } from "antd";
import "antd/dist/reset.css";

import Footer from "../../Components/Actual_Components/Footer";
import axios from "axios";
import { getApiBase } from "../../config/apiBase";
import { State, City } from "country-state-city";
import { Helmet } from "react-helmet";
import toastUtils from "../../Utils/toastUtils";
import { useNavigate } from "react-router-dom";

// Import categories
import BasicInfoCategory from './categories/BasicInfoCategory';
import LocationCategory from './categories/LocationCategory';
import PropertyDetailsCategory from './categories/PropertyDetailsCategory';
import GalleryCategory from './categories/GalleryCategory';
import BasicInfoCategoryMobile from './categories/BasicInfoCategory.mobile';
import LocationCategoryMobile from './categories/LocationCategory.mobile';
import PropertyDetailsCategoryMobile from './categories/PropertyDetailsCategory.mobile';
import GalleryCategoryMobile from './categories/GalleryCategory.mobile';

const steps = [
  { id: "1", title: "Basic Info" },
  { id: "2", title: "Location" },
  { id: "3", title: "Property Details" },   
  { id: "4", title: "Gallery Section" },
];

const POST_PROPERTY_DRAFT_KEY = 'postPropertyDraft';
const POST_PROPERTY_AFTER_LOGIN_KEY = 'postPropertyAfterLogin';
const POST_PROPERTY_DRAFT_SAVE_KEY = 'postPropertyDraftAutoSave';

// Returns { valid: boolean, missingFields: string[] } for step validation
const getStepValidation = (step, sellProperty, selectedState, selectedCity, fileData) => {
  const missing = [];
  switch (step) {
    case 0:
      if (!sellProperty.propertyLooking) missing.push('Sell or Rent option');
      if (!sellProperty.selectoption || sellProperty.selectoption === 'Select Property Type') missing.push('Property Category');
      if (!sellProperty.propertyType) missing.push('Property Type / Sub-type');
      break;
    case 1:
      if (!selectedState) missing.push('State');
      if (!selectedCity || selectedCity === 'Select City') missing.push('City');
      if (!(sellProperty.propertyName || '').trim()) missing.push('Property Name');
      if (!(sellProperty.address || '').trim()) missing.push('Full Address');
      break;
    case 2: {
      const isCommercial = sellProperty.selectoption === 'Commercial';
      if (!isCommercial) {
        if (sellProperty.bedrooms === '' || sellProperty.bedrooms === undefined) missing.push('Bedrooms');
        if (sellProperty.bathrooms === '' || sellProperty.bathrooms === undefined) missing.push('Bathrooms');
      }
      if (!(sellProperty.price || '').trim()) missing.push('Expected Price');
      if (!sellProperty.priceunits) missing.push('Price Unit (Lakhs/Crores)');
      if (!(sellProperty.area || '').trim()) missing.push('Property Area');
      if (!sellProperty.areaUnit) missing.push('Area Unit');
      if (!sellProperty.furnishing) missing.push('Furnishing');
      if (!(sellProperty.builtYear || '').trim()) missing.push('Built Year');
      if (!sellProperty.availableDate) missing.push('Available Date');
      if (!(sellProperty.landMark || '').trim()) missing.push('Landmark');
      if (!sellProperty.type) missing.push('Property Status');
      if (!(sellProperty.descripation || '').trim()) missing.push('Description');
      break;
    }
    case 3:
      if (!fileData.frontImage || !(fileData.frontImage instanceof File)) missing.push('Front Image');
      if (!fileData.otherImage || fileData.otherImage.length === 0) missing.push('Additional Images (at least 1)');
      break;
    default:
      break;
  }
  return { valid: missing.length === 0, missingFields: missing };
};

// Completion percentage for admin tracking (0–100)
const getCompletionPercentage = (sellProperty, selectedState, selectedCity, fileData) => {
  let total = 0;
  let filled = 0;
  const add = (val, weight = 1) => {
    total += weight;
    if (val !== undefined && val !== null && val !== '' && (typeof val !== 'string' || val.trim() !== '')) filled += weight;
  };
  const addArr = (arr, weight = 1) => {
    total += weight;
    if (Array.isArray(arr) && arr.length > 0) filled += weight;
  };
  add(sellProperty.propertyLooking);
  add(sellProperty.selectoption);
  add(sellProperty.propertyType);
  add(selectedState);
  add(selectedCity);
  add(sellProperty.propertyName);
  add(sellProperty.address);
  add(sellProperty.price);
  add(sellProperty.priceunits);
  add(sellProperty.area);
  add(sellProperty.areaUnit);
  add(sellProperty.furnishing);
  add(sellProperty.builtYear);
  add(sellProperty.availableDate);
  add(sellProperty.landMark);
  add(sellProperty.type);
  add(sellProperty.descripation, 2);
  addArr(sellProperty.amenities);
  if (sellProperty.selectoption !== 'Commercial') {
    add(sellProperty.bedrooms);
    add(sellProperty.bathrooms);
  }
  const hasFront = fileData.frontImage instanceof File;
  const hasOther = (fileData.otherImage && fileData.otherImage.length > 0 && fileData.otherImage.some(img => img instanceof File)) || (fileData.otherImageCount > 0);
  add(hasFront ? 1 : 0);
  add(hasOther ? 1 : 0);
  return total === 0 ? 0 : Math.round((filled / total) * 100);
};

const NewSellProperty = () => {
  const agentData = localStorage.getItem("agentData");
  const [modal, modalContextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const toastCenterOptions = { style: { marginTop: '40vh' } };

  const [current, setCurrent] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [contentAnimKey, setContentAnimKey] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [modalWidth, setModalWidth] = useState(600);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const stepsSectionRef = useRef(null);
  const parsedAgentData = agentData ? JSON.parse(agentData) : null;
  const sellerId = parsedAgentData?._id;
  const propertyType = ["Commercial", "Residential"];

  // Restore draft after login and jump to the requested step
  useEffect(() => {
    try {
      const token = localStorage.getItem('myToken');
      const pending = localStorage.getItem(POST_PROPERTY_AFTER_LOGIN_KEY);
      const draftRaw = localStorage.getItem(POST_PROPERTY_DRAFT_KEY);
      if (!token || !pending || !draftRaw) return;

      const draft = JSON.parse(draftRaw);
      const pendingData = JSON.parse(pending);
      const targetStep = Number(pendingData?.targetStep);

      if (draft?.sellProperty) setSellProperty(draft.sellProperty);
      if (typeof draft?.selectedState === 'string') setSelectedState(draft.selectedState);
      if (typeof draft?.selectedCity === 'string') setSelectedCity(draft.selectedCity);

      if (!Number.isNaN(targetStep) && targetStep >= 0) {
        setCurrent(targetStep);
        setContentAnimKey((k) => k + 1);
      }

      localStorage.removeItem(POST_PROPERTY_AFTER_LOGIN_KEY);
      localStorage.removeItem(POST_PROPERTY_DRAFT_KEY);
    } catch (_) {
      // ignore restore errors
    }
  }, []);

  const subTypes = {
    Commercial: [
      "Office",
      "Retail",
      "Industrial",
      "Plot / Land",
      "Storage",
      "Hospitality",
      "Other",
    ],
    Residential: [
      "Flat/Apartment",
      "Independent House / Villa",
      "Independent / Builder Floor",
      "Residential Land",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
  };

  const [sellProperty, setSellProperty] = useState({
    propertyType: "",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    price: "",
    priceunits: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    areaUnit: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    selectoption: "",
    subType: "",
    propertyLooking: "Sell",
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countryCode = "IN";
  const states = State.getStatesOfCountry(countryCode);

  const getStateCode = (selectedStateName) => {
    const stateObj = State.getStatesOfCountry(countryCode).find(
      (state) => state.name.toLowerCase() === selectedStateName.toLowerCase()
    );
    return stateObj?.isoCode || "";
  };

  const citiesList = [
    "Gurugram", "Delhi", "Noida", "Goa", "Ayodhya", "Mumbai", "Panipat", 
    "Panchkula", "Kasauli", "Sonipat", "Karnal", "Jalandhar", "Pushkar",
    "Ghaziabad", "Faridabad", "Greater Noida", "Sohna"
  ].sort();

  const cities = citiesList.map(city => ({ name: city }));

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangeStateValue = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSellProperty((prevState) => ({
      ...prevState,
      state: stateName,
    }));
  };

  const handleChangeCityValue = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSellProperty((prevState) => ({
      ...prevState,
      city: cityName,
    }));
  };

  const resetData = () => {
    setSellProperty({
      propertyType: "",
      propertyName: "",
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
      selectoption: "",
      subType: "",
      propertyLooking: "Sell",
    });
  };

  const resetImageData = () => {
    setFileData({
      frontImage: "",
      otherImage: [],
    });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    
    if ((name === "price" || name === "area") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
    if (name === "selectoption") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        propertyType: "",
        subType: "",
      });
    } else if (name === "propertyType") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        subType: "",
      });
    } else {
      setSellProperty({
        ...sellProperty,
        [name]: value,
      });
    }
  };

  const [fileData, setFileData] = useState({
    frontImage: "",
    otherImage: [],
  });

  const otherImageLength = fileData.otherImage.length;
  const [isLoading, setIsLoading] = useState(false);

  const submitSellPropertyDetails = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (isLoading) return;

    if (current !== 3) {
      toastUtils.error('Please complete all steps before submitting.', toastCenterOptions);
      return;
    }

    // Temporarily bypass validation to test file upload
    // const validation = getStepValidation(3, sellProperty, selectedState, selectedCity, fileData);
    // if (!validation.valid) {
    //   const msg = validation.missingFields.length
    //     ? `Missing: ${validation.missingFields.join(', ')}`
    //     : 'Please add Front Image and at least one Additional Image.';
    //   toastUtils.error(msg, { ...toastCenterOptions, duration: 3500 });
    //   return;
    // }

    try {
      const apiEndpoint = `/postPerson/propertyInsert/${sellerId}`;
      console.log('Starting form submission for sellerId:', sellerId);
      console.log('Initial sellProperty:', sellProperty);
      console.log('Initial fileData:', fileData);
      
    const formDataAPI = new FormData();

    // Include ALL property fields, not just essential ones
    const allFields = {
      // Basic Info
      propertyName: sellProperty.propertyName || '',
      propertyLooking: sellProperty.propertyLooking || 'Sell',
      selectoption: sellProperty.selectoption || '',
      propertyType: sellProperty.propertyType || '',
      subType: sellProperty.propertyType || '', // subType same as propertyType
      
      // Location
      address: sellProperty.address || '',
      city: sellProperty.city || selectedCity || '',
      state: sellProperty.state || selectedState || '',
      landMark: sellProperty.landMark || '',
      
      // Property Details
      price: sellProperty.price || '',
      priceunits: sellProperty.priceunits || '',
      area: sellProperty.area || '',
      areaUnit: sellProperty.areaUnit || '',
      furnishing: sellProperty.furnishing || '',
      builtYear: sellProperty.builtYear || '',
      type: sellProperty.type || '', // Property Status (Ready to Move/New Launch)
      availableDate: sellProperty.availableDate || '',
      amenities: sellProperty.amenities || '',
      descripation: sellProperty.descripation || '',
      
      // Additional fields for residential
      bedrooms: sellProperty.bedrooms || '',
      bathrooms: sellProperty.bathrooms || '',
      balconies: sellProperty.balconies || '',
      floorNumber: sellProperty.floorNumber || '',
      totalFloors: sellProperty.totalFloors || '',
      parking: sellProperty.parking || '',
      
      // Additional fields for commercial
      commercialType: sellProperty.commercialType || '',
      suitableFor: sellProperty.suitableFor || '',
    };

    console.log('Sending all fields:', allFields);

    // Append all non-empty fields to FormData
    for (const key in allFields) {
      const val = allFields[key];
      if (val !== undefined && val !== null && val !== '') {
        formDataAPI.append(key, String(val));
        console.log(`Appended ${key}:`, val);
      }
    }

    // Always append files (even if empty) to match backend multer expectations
    console.log('File data before processing:', {
      frontImage: fileData.frontImage,
      frontImageType: typeof fileData.frontImage,
      frontImageIsFile: fileData.frontImage instanceof File,
      otherImage: fileData.otherImage,
      otherImageLength: fileData.otherImage.length
    });

    // Append other images - always send the field even if empty
    if (fileData.otherImage && fileData.otherImage.length > 0) {
      for (let i = 0; i < fileData.otherImage.length; i++) {
        const image = fileData.otherImage[i];
        if (image && image instanceof File) {
          console.log(`Appending otherImage[${i}]:`, image.name);
          formDataAPI.append("otherImage", image);
        }
      }
    }

    // Always append front image field (even if empty) - backend expects this field
    if (fileData.frontImage && fileData.frontImage instanceof File) {
      console.log(`Appending frontImage:`, fileData.frontImage.name);
      formDataAPI.append("frontImage", fileData.frontImage);
    }
    formDataAPI.append("completionPercentage", String(getCompletionPercentage(sellProperty, selectedState, selectedCity, fileData)));

    // Debug: Log FormData contents
    console.log('FormData contents being submitted:');
    for (let [key, value] of formDataAPI.entries()) {
      console.log(`${key}:`, value, typeof value);
    }
    console.log('Total FormData entries:', formDataAPI.entries().length);

    try {
      setIsLoading(true);
      toastUtils.info("Submitting your property...", toastCenterOptions);
      const base = getApiBase();
      const response = await axios.post(`${base}${apiEndpoint}`, formDataAPI, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toastUtils.success('Submitted successfully — under review', toastCenterOptions);
        try { localStorage.removeItem(POST_PROPERTY_DRAFT_SAVE_KEY); } catch (_) {}
        resetData();
        resetImageData();
        setCurrent(0);
        
        // Redirect to user dashboard property section
        setTimeout(() => {
          navigate('/userdashboard/');
        }, 1500);
      } else {
        toastUtils.error('Unexpected response from server.', toastCenterOptions);
      }
    } catch (axiosError) {
      console.error('Axios error:', axiosError);
      console.error('Error response:', axiosError.response?.data);
      const errorMessage = axiosError.response?.data?.message || "Failed to submit property. Please try again.";
      toastUtils.error(errorMessage, { ...toastCenterOptions, duration: 5000 });
    } finally {
      setIsLoading(false);
    }
    } catch (formDataError) {
      console.error('FormData processing error:', formDataError);
      toastUtils.error("Error preparing form data. Please check your inputs.", { ...toastCenterOptions, duration: 5000 });
      setIsLoading(false);
    }
  };

  const handleChangeValueAmenities = (event) => {
    if (event.target.name === "amenities") {
      const amenitiesArray = event.target.value.split(",");
      setSellProperty((prevState) => ({
        ...prevState,
        amenities: amenitiesArray,
      }));
    } else {
      setSellProperty((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleOptionClick = (option) => {
    setSellProperty({
      ...sellProperty,
      propertyLooking: option,
    });
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      const newFileData = { ...fileData };
      newFileData[key] = file;
      setFileData(newFileData);
    } else {
      // Handle case where no file is selected or invalid file
      const newFileData = { ...fileData };
      newFileData[key] = "";
      setFileData(newFileData);
    }
  };

  const handleOtherImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        if (files[i] instanceof File) {
          updatedOtherImage.push(files[i]);
        }
      }
      setFileData({
        ...fileData,
        otherImage: updatedOtherImage,
      });
    } else {
      // Handle case where no files are selected
      setFileData({
        ...fileData,
        otherImage: [],
      });
    }
  };

  const handleProjectfurnishing = (event) => {
    setSellProperty({ ...sellProperty, furnishing: event.target.value });
  };

  const validateStep = (step) => {
    const { valid } = getStepValidation(step, sellProperty, selectedState, selectedCity, fileData);
    return valid;
  };

  const saveDraftToStorage = (payload) => {
    try {
      const completion = getCompletionPercentage(
        payload.sellProperty,
        payload.selectedState,
        payload.selectedCity,
        payload.fileData ?? fileData
      );
      const toSave = {
        ...payload,
        savedAt: new Date().toISOString(),
        currentStep: current,
        completionPercentage: completion,
      };
      localStorage.setItem(POST_PROPERTY_DRAFT_SAVE_KEY, JSON.stringify(toSave));
    } catch (_) {}
  };

  const next = () => {
    const validation = getStepValidation(current, sellProperty, selectedState, selectedCity, fileData);
    if (validation.valid) {
      // Save draft when moving to next step (step data saved)
      saveDraftToStorage({
        sellProperty,
        selectedState,
        selectedCity,
        fileData: { frontImage: !!fileData.frontImage, otherImageCount: fileData.otherImage?.length ?? 0 },
      });

      // Login gate: after completing Location (step 1), require login before moving to step 2
      if (current === 1) {
        const token = localStorage.getItem('myToken');
        if (!token) {
          try {
            localStorage.setItem(
              POST_PROPERTY_DRAFT_KEY,
              JSON.stringify({
                sellProperty,
                selectedState,
                selectedCity,
              })
            );
            localStorage.setItem(
              POST_PROPERTY_AFTER_LOGIN_KEY,
              JSON.stringify({ targetStep: 2 })
            );
          } catch (_) {}

          toastUtils.info('Please login first to continue.', toastCenterOptions);

          try {
            if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
              window.dispatchEvent(new CustomEvent('showAuthModal'));
            } else if (typeof window !== 'undefined' && typeof window.showAuthModal === 'function') {
              window.showAuthModal();
            } else {
              window.location.href = '/auth/';
            }
          } catch (_) {
            window.location.href = '/auth/';
          }
          return;
        }
      }

      setCurrent(current + 1);
      setContentAnimKey((k) => k + 1);
      toastUtils.success(`Step ${current + 2} of 4 — Continue`, toastCenterOptions);
    } else {
      const msg = validation.missingFields.length
        ? `Missing: ${validation.missingFields.join(', ')}`
        : 'Please fill all required fields before proceeding.';
      toastUtils.error(msg, { ...toastCenterOptions, duration: 3500 });
    }
  };
  
  const prev = () => {
    setCurrent(current - 1);
    setContentAnimKey((k) => k + 1);
  };

  const renderStepIcon = (index) => {
    const isCompleted = index < current;
    const isActive = index === current;

    if (isCompleted) {
      return (
        <span
          className="flex items-center justify-center rounded-full w-7 h-7 text-xs font-bold bg-green-600 text-white"
          style={{ lineHeight: 1 }}
        >
          ✓
        </span>
      );
    }

    return (
      <span
        className={`flex items-center justify-center rounded-full w-7 h-7 text-xs font-bold ${
          isActive
            ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
            : 'bg-gray-200 text-gray-700'
        }`}
        style={{ lineHeight: 1 }}
      >
        {index + 1}
      </span>
    );
  };

  // Animate step content mount
  useEffect(() => {
    setContentVisible(false);
    const id = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(id);
  }, [contentAnimKey, current]);

  // Auto-save draft (debounced) for recovery and admin tracking
  useEffect(() => {
    const t = setTimeout(() => {
      saveDraftToStorage({
        sellProperty,
        selectedState,
        selectedCity,
        fileData: { frontImage: !!fileData.frontImage, otherImageCount: fileData.otherImage?.length ?? 0 },
      });
    }, 800);
    return () => clearTimeout(t);
  }, [sellProperty, selectedState, selectedCity, fileData.frontImage, fileData.otherImage?.length]);

  // Responsive modal width
  useEffect(() => {
    const updateWidth = () => setModalWidth(Math.min(isMobile ? 320 : 600, window.innerWidth - (isMobile ? 16 : 32)));
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isMobile]);

  const renderStepContent = (step) => {
    // Use mobile components on mobile, desktop on desktop
    if (isMobile) {
      switch (step) {
        case 0:
          return (
            <BasicInfoCategoryMobile 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              handleOptionClick={handleOptionClick}
              propertyType={propertyType}
              subTypes={subTypes}
              parsedAgentData={parsedAgentData}
            />
          );
        case 1:
          return (
            <LocationCategoryMobile 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              selectedState={selectedState}
              selectedCity={selectedCity}
              handleChangeStateValue={handleChangeStateValue}
              handleChangeCityValue={handleChangeCityValue}
              states={states}
              cities={cities}
            />
          );
        case 2:
          return (
            <PropertyDetailsCategoryMobile 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              handleChangeValueAmenities={handleChangeValueAmenities}
              handleProjectfurnishing={handleProjectfurnishing}
            />
          );
        case 3:
          return (
            <GalleryCategoryMobile 
              fileData={fileData}
              handleFileChange={handleFileChange}
              handleOtherImageChange={handleOtherImageChange}
            />
          );
        default:
          return null;
      }
    } else {
      switch (step) {
        case 0:
          return (
            <BasicInfoCategory 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              handleOptionClick={handleOptionClick}
              propertyType={propertyType}
              subTypes={subTypes}
              parsedAgentData={parsedAgentData}
            />
          );
        case 1:
          return (
            <LocationCategory 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              selectedState={selectedState}
              selectedCity={selectedCity}
              handleChangeStateValue={handleChangeStateValue}
              handleChangeCityValue={handleChangeCityValue}
              states={states}
              cities={cities}
            />
          );
        case 2:
          return (
            <PropertyDetailsCategory 
              sellProperty={sellProperty}
              handleChangeValue={handleChangeValue}
              handleChangeValueAmenities={handleChangeValueAmenities}
              handleProjectfurnishing={handleProjectfurnishing}
            />
          );
        case 3:
          return (
            <GalleryCategory 
              fileData={fileData}
              handleFileChange={handleFileChange}
              handleOtherImageChange={handleOtherImageChange}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {modalContextHolder}
      {/* Safe area for fixed navbar */}
      <div className="h-16 md:h-20" aria-hidden />
      <Helmet>
        <meta
          name="description"
          content="Post Free Property Listing at 100acress.com. Rent, sell, or rent hassle-free. Reach potential buyers easily with our Trusted platform for property listing."
        />
        <title>Post Free Property Listing | Rent/Sell at 100acress.com</title>
      </Helmet>

      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 pt-4 pb-3 md:pt-12 md:pb-5 text-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
            <div className="mx-auto flex max-w-7xl flex-col lg:flex-row lg:items-start gap-8 md:gap-12 px-4 md:px-1 relative z-10">
            {/* Left: Hero copy + Illustration - Desktop only */}
            <div className="hidden lg:block flex-1 lg:pt-12">
                <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-500 rounded-lg blur opacity-25"></div>
                <h1 className="relative text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Post your property
                </h1>
                </div>
                <h2 className="mt-2 text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                get best prices
                </h2>
                <p className="hidden md:block text-base md:text-lg text-gray-600 mt-4 md:mt-6 max-w-xl leading-relaxed">
                100acress is best place to sell your property. We provide trusted advisory and mediation services so you can reach right buyers—fast.
                </p>

                {/* Enhanced illustration - Desktop only */}
                <div className="mt-6 hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-2xl transform rotate-1"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <svg viewBox="0 0 400 180" className="w-full max-w-md text-red-500/30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="70" width="120" height="80" rx="12" fill="currentColor" className="opacity-20"/>
                    <rect x="150" y="40" width="100" height="110" rx="12" fill="currentColor" className="opacity-20"/>
                    <rect x="270" y="60" width="120" height="90" rx="12" fill="currentColor" className="opacity-20"/>
                    <path d="M20 150 C 80 120, 140 120, 200 150 S 340 180, 380 140" stroke="currentColor" strokeWidth="4" className="opacity-30"/>
                    <circle cx="70" cy="110" r="8" fill="#dc2626" className="animate-pulse"/>
                    <circle cx="200" cy="90" r="8" fill="#f97316" className="animate-pulse delay-75"/>
                    <circle cx="330" cy="105" r="8" fill="#dc2626" className="animate-pulse delay-150"/>
                    </svg>
                </div>
                </div>

                <div className="lg:pt-10">
                <button
                    className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-6 md:px-8 py-3 md:py-4 text-white font-semibold shadow-lg shadow-red-600/25 transition-all duration-300 hover:scale-105 hover:shadow-red-600/40 focus:outline-none focus:ring-4 focus:ring-red-600/30"
                    onClick={() => {
                    stepsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                    How It Works
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                </div>

                <Modal
                open={showSteps}
                onCancel={() => setShowSteps(false)}
                footer={null}
                centered
                width={modalWidth}
                >
                <div className="px-2 py-2">
                    <h5 className="text-red-500 font-semibold text-lg mb-3">
                    Steps to Post Your Property for Free
                    </h5>

                    <div className="space-y-4">
                    <div>
                        <span className="text-sm font-medium">Step 1:</span>
                        <span className="ml-2 text-red-500 font-semibold">
                        Post Your Property for Free
                        </span>
                        <p className="text-justify text-sm text-gray-600">
                        Please first check options if you are a selling or renting owner, then select appropriate choice.
                        </p>
                    </div>

                    <div>
                        <span className="text-sm font-medium">Step 2:</span>
                        <span className="ml-2 text-red-500 font-semibold">Select Property Type</span>
                        <p className="text-justify text-sm text-gray-600">
                        Please choose between Commercial or Residential property.
                        </p>
                    </div>

                    <div>
                        <span className="text-sm font-medium">Step 3:</span>
                        <span className="ml-2 text-red-500 font-semibold">Enter Details of Your Property</span>
                        <p className="text-justify text-sm text-gray-600">
                        Afterward, input all details such as property name, address, city, state, price, area, description, landmark, amenities, built year, and furnishing.
                        </p>
                    </div>

                    <div>
                        <span className="text-sm font-medium">Step 4:</span>
                        <span className="ml-2 text-red-500 font-semibold">Upload Images of Your Property</span>
                        <p className="text-justify text-sm text-gray-600">
                        Please upload one image for front view and three to four additional images.
                        </p>
                    </div>

                    <div>
                        <span className="text-sm font-medium">Step 5:</span>
                        <span className="ml-2 text-red-500 font-semibold">Submit Your Property Information</span>
                        <p className="text-justify text-sm text-gray-600">
                        Submit form after filling up fields.
                        </p>
                    </div>
                    </div>
                </div>
                </Modal>

            </div>

            {/* Right: Form card */}
            <div className="flex-1 flex flex-col bg-white border border-gray-100 rounded-2xl p-5 md:p-7 shadow-lg shadow-gray-200/60 transition-all mt-3 md:mt-6">
                {/* Progress: percentage + step labels + bar */}
                <div className="mb-4 md:mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</span>
                    <span className="text-sm font-bold text-red-600 tabular-nums">
                      {Math.round(((current + 1) / steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${((current + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    {steps.map((s, index) => (
                      <span
                        key={s.id}
                        className={`text-xs font-medium truncate max-w-[22%] ${index <= current ? 'text-red-600' : 'text-gray-400'}`}
                        title={s.title}
                      >
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile stepper (compact) */}
                <div className="lg:hidden mb-3">
                  <div className="flex items-center justify-between">
                    {steps.map((s, index) => (
                      <div key={s.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          {renderStepIcon(index)}
                          <span className="text-xs mt-1 text-gray-600 font-medium hidden xs:block">{s.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 ${index < current ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop stepper */}
                <div className="hidden lg:block mb-4">
                  <div className="flex items-center justify-between">
                    {steps.map((s, index) => (
                      <div key={s.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          {renderStepIcon(index)}
                          <span className="text-sm mt-2 text-gray-700 font-medium">{s.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`flex-1 h-1 mx-2 ${index < current ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated step content wrapper */}
                <div
                key={contentAnimKey}
                className={`flex-1 transform transition-all duration-300 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                >
                {renderStepContent(current)}
                </div>

                {/* Navigation buttons */}
                <div className="sticky bottom-0 bg-white/90 backdrop-blur py-2 md:py-3 mt-0 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center border-t-0 md:border-t border-gray-200 z-10" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
                {current > 0 && <Button style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                    borderRadius: '9999px',
                    paddingLeft: '18px',
                    paddingRight: '18px',
                }}
                    htmlType="button"
                    onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#450a0a';
                    e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                    e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={prev}>Previous</Button>}
                <Button
                  type="button"
                  htmlType="button"
                  onClick={() => {
                    saveDraftToStorage({
                      sellProperty,
                      selectedState,
                      selectedCity,
                      fileData: { frontImage: !!fileData.frontImage, otherImageCount: fileData.otherImage?.length ?? 0 },
                    });
                    toastUtils.success('Draft saved. You can continue later from dashboard.', toastCenterOptions);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#6b7280',
                    color: '#374151',
                    borderRadius: '9999px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                  }}
                >
                  Save as draft
                </Button>
                {current < 3 ? (
                    <Button className="group" type="primary" htmlType="button" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                    borderRadius: '9999px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    boxShadow: '0 8px 18px rgba(220,38,38,0.18)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#450a0a';
                        e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={next}>
                    <span className="inline-flex items-center gap-2">
                        Next
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                    </Button>
                ) : (
                    <Button type="primary" htmlType="button" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                  color: 'white',
                  borderRadius: '9999px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  boxShadow: '0 8px 18px rgba(220,38,38,0.18)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#450a0a';
                    e.currentTarget.style.borderColor = '#450a0a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                    e.currentTarget.style.borderColor = '#dc2626';
                  }} onClick={submitSellPropertyDetails}>
                  <span className="inline-flex items-center gap-2">
                    Submit
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works cards - below page content */}
      <section ref={stepsSectionRef} className="pt-3 pb-10 md:pt-5 md:pb-14 bg-white" style={{ scrollMarginTop: '96px' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Steps to <span className="text-red-600">Post Your Property for Free</span></h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Card 1 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">1</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 1: <span className="text-red-600">Post Your Property for Free</span></h4>
              <p className="mt-2 text-sm text-gray-600">Choose whether you are selling or renting first, then pick appropriate option to continue.</p>
            </div>

            {/* Card 2 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">2</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 2: <span className="text-red-600">Select Property Type</span></h4>
              <p className="mt-2 text-sm text-gray-600">Pick between <strong>Commercial</strong> or <strong>Residential</strong> to tailor form for your property.</p>
            </div>

            {/* Card 3 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">3</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 3: <span className="text-red-600">Enter Details</span> of Your Property</h4>
              <p className="mt-2 text-sm text-gray-600">Provide name, address, city, state, <strong className="text-red-600 font-semibold">price</strong>, area, amenities, furnishing, and description.</p>
            </div>

            {/* Card 4 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">4</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 4: <span className="text-red-600">Upload Images</span> of Your Property</h4>
              <p className="mt-2 text-sm text-gray-600">Add a front image and three to four additional images to attract potential buyers.</p>
            </div>

            {/* Card 5 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">5</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 5: <span className="text-red-600">Submit</span> Your Property Information</h4>
              <p className="mt-2 text-sm text-gray-600">Review your details and click <span className="text-red-600 font-semibold">Submit</span> to finish.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default NewSellProperty;
