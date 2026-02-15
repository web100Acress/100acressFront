import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiBase } from "../config/apiBase";
import Footer from "../Home/Footer/CrimsonEleganceFooter";
import Navbar from "../aadharhomes/navbar/Navbar";
import showToast from "../Utils/toastUtils";
import { MapPinned, MapPin, DollarSign, Ruler, FileText, Landmark, Sparkles, Calendar, Sofa, Info, ChevronDown, Building, Image as ImageIcon } from "lucide-react";

const UserEditProperty = () => {
  const propertyTypes = ["Select Property Type", "Commercial", "Residential"];
  const citiesList = [
    "Gurugram", "Delhi", "Noida", "Goa", "Ayodhya", "Mumbai", "Panipat", 
    "Panchkula", "Kasauli", "Sonipat", "Karnal", "Jalandhar", "Pushkar",
    "Ghaziabad", "Faridabad", "Greater Noida", "Sohna"
  ].sort();
  const navigate = useNavigate();
  const { state } = useLocation();
  const selected = state && state.property ? state.property : null;

  const [sellProperty, setSellProperty] = useState({
    propertyLooking: "",
    selectoption: "Select Property Type",
    propertyType: "",
    subType: "",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    price: "",
    priceunits: "",
    area: "",
    areaUnit: "",
    description: "",
    landmark: "",
    amenities: "",
    builtyear: "",
    furnishing: "",
    type: "",
    availabledate: "",
  });
  const [frontImageFile, setFrontImageFile] = useState(null);
  const [otherImageFiles, setOtherImageFiles] = useState([]);
  const [existingFrontImage, setExistingFrontImage] = useState(null);
  const [existingOtherImages, setExistingOtherImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selected) {
      const rawCategory = typeof selected.selectoption === "string" && selected.selectoption.trim() !== ""
        ? selected.selectoption.trim()
        : "";
      const derivedCategory = getCategoryFromSubType(selected.propertyType || selected.subType);
      const selectoptionValue =
        rawCategory === "Commercial" || rawCategory === "Residential"
          ? rawCategory
          : derivedCategory || "Select Property Type";

      const rawPropertyType =
        typeof selected.propertyType === "string" && selected.propertyType.trim() !== ""
          ? selected.propertyType.trim()
          : typeof selected.subType === "string" && selected.subType.trim() !== ""
            ? selected.subType.trim()
            : "";

      setSellProperty((prev) => ({
        ...prev,
        propertyLooking: selected.propertyLooking || selected.propertylooking || "",
        selectoption: selectoptionValue,
        propertyType: rawPropertyType,
        subType: typeof selected.subType === "string" && selected.subType.trim() !== "" ? selected.subType.trim() : "",
        propertyName: selected.projectName || selected.propertyName || selected.name || "",
        address: selected.address || selected.location || "",
        city: selected.city || "",
        state: selected.state || "",
        price: selected.price || selected.cost || "",
        priceunits: (() => {
          const u = (selected.priceunits || "").toString().trim().toLowerCase();
          return u === "lakhs" || u === "crores" ? u : "";
        })(),
        area: selected.area || selected.size || "",
        areaUnit: selected.areaUnit || "",
        description: selected.description || selected.descripation || selected.projectDescription || selected.details || "",
        landmark: selected.landMark || selected.landmark || selected.nearby || "",
        amenities: Array.isArray(selected.amenities) ? selected.amenities.join(", ") : (selected.amenities || ""),
        builtyear: getBuiltYearValue(selected),
        furnishing: selected.furnishing || selected.furnished || "",
        type: selected.type || "",
        availabledate: selected.availabledate || selected.availableDate || selected.dateAvailable || "",
      }));
      // Set existing images if present
      if (selected.frontImage) {
        setExistingFrontImage(selected.frontImage);
      }
      if (selected.otherImage && Array.isArray(selected.otherImage)) {
        setExistingOtherImages(selected.otherImage);
      } else if (selected.otherImage && typeof selected.otherImage === 'string') {
        setExistingOtherImages([selected.otherImage]);
      }
    }
  }, [selected]);

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
      "1 RK/ Studio Apartment",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
  };

  // Derive category (Commercial/Residential) from propertyType/subType when selectoption is missing
  const getCategoryFromSubType = (propertyTypeOrSubType) => {
    if (!propertyTypeOrSubType || typeof propertyTypeOrSubType !== "string") return "";
    const t = propertyTypeOrSubType.trim();
    if (subTypes.Commercial.includes(t)) return "Commercial";
    if (subTypes.Residential.includes(t)) return "Residential";
    return "";
  };

  const getBuiltYearValue = (obj) => {
    if (!obj) return "";
    const v =
      obj.builtyear ??
      obj.builtYear ??
      obj.yearBuilt ??
      obj.built_year;
    if (v === null || v === undefined) return "";
    if (typeof v === "number" && !Number.isNaN(v)) return String(v);
    if (typeof v === "string" && v.trim() !== "") return v.trim();
    if (v instanceof Date && !Number.isNaN(v.getFullYear())) return String(v.getFullYear());
    return "";
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setSellProperty((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "selectoption" && { propertyType: "", subType: "" }),
      ...(name === "propertyType" && { subType: "" }),
    }));
  };

  const handleFrontImageChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFrontImageFile(file);
    if (file) setExistingFrontImage(null);
  };

  const handleOtherImagesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setOtherImageFiles(files);
    if (files.length) setExistingOtherImages([]);
  };

  // Remove single existing other image
  const handleRemoveExistingOtherImage = (idx) => {
    setExistingOtherImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !selected._id) {
      showToast.error('No property selected for editing');
      navigate(-1);
      return;
    }
    // Validation
    const errors = {};
    if (!sellProperty.selectoption || sellProperty.selectoption === 'Select Property Type') {
      errors.selectoption = 'Property Category is required';
    }
    if (!sellProperty.propertyType) {
      errors.propertyType = 'Property Type is required';
    }
    const currentYear = new Date().getFullYear();
    if (!sellProperty.builtyear) {
      errors.builtyear = 'Built Year is required';
    } else if (isNaN(Number(sellProperty.builtyear))) {
      errors.builtyear = 'Built Year must be a number';
    } else if (Number(sellProperty.builtyear) < 1900 || Number(sellProperty.builtyear) > currentYear) {
      errors.builtyear = `Built Year must be between 1900 and ${currentYear}`;
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      showToast.error('Please fill all required fields');
      return;
    }
    try {
      showToast.loading('Updating property...', { id: 'updateProperty' });
      const base = getApiBase();
      const form = new FormData();
      // Text fields
      form.append('propertyLooking', sellProperty.propertyLooking || '');
      form.append('selectoption', sellProperty.selectoption || '');
      form.append('propertyType', sellProperty.propertyType || '');
      form.append('subType', sellProperty.propertyType || '');
      form.append('propertyName', sellProperty.propertyName || '');
      form.append('address', sellProperty.address || '');
      form.append('city', sellProperty.city || '');
      form.append('state', sellProperty.state || '');
      form.append('price', sellProperty.price || '');
      form.append('priceunits', sellProperty.priceunits || '');
      form.append('area', sellProperty.area || '');
      form.append('areaUnit', sellProperty.areaUnit || '');
      form.append('descripation', sellProperty.description || '');
      form.append('landMark', sellProperty.landmark || '');
      form.append('amenities', sellProperty.amenities || '');
      form.append('builtYear', sellProperty.builtyear || '');
      form.append('furnishing', sellProperty.furnishing || '');
      form.append('type', sellProperty.type || '');
      form.append('availableDate', sellProperty.availabledate || '');

      // Files
      if (frontImageFile) {
        form.append('frontImage', frontImageFile);
      }
      if (otherImageFiles && otherImageFiles.length) {
        otherImageFiles.forEach((f) => form.append('otherImage', f));
      }

      await axios.post(`${base}/postPerson/propertyoneUserUpdate/${selected._id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showToast.success('Property updated successfully!', { id: 'updateProperty' });

      // Notify other tabs
      try {
        const channel = new BroadcastChannel('property-updates');
        channel.postMessage('property:updated');
        channel.close();
      } catch {}
      try { window.localStorage.setItem('property-updated', String(Date.now())); } catch {}

      navigate(-1);
    } catch (err) {
      console.error('Update failed', err?.response || err);
      showToast.error('Failed to update property', { id: 'updateProperty' });
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      <Navbar />
      {/* The main section container is responsive with padding and max-width for different screen sizes */}
      <section className="pt-24 md:pt-28 pb-12">
        <div className="mx-auto flex max-w-sm sm:max-w-md lg:max-w-screen-xl flex-col rounded-lg lg:flex-row gap-8 lg:gap-12 p-4 md:p-8">
          {/* The left text and button section is hidden on small screens and shown on medium and larger ones */}
          <div className="max-w-xl lg:pr-12 lg:pt-16 hidden md:block">
            {/* Responsive text sizes with different font sizes for md and lg breakpoints */}
            <h3 className="lg:text-5xl md:text-3xl font-semibold text-slate-800 leading-tight">
              Edit your property,
              <br />
              <span className="text-red-500">update details anytime</span>
            </h3>
            <p className="mt-4 text-lg text-gray-600 text-justify">
              100acress is the best place to sell your property. We are dedicated to providing advisory and mediation services for all your needs. You can expect our help anytime. All that is for you!
            </p>
            {/* Buttons are arranged responsively, stacking on mobile and side-by-side on small screens and up */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <button className="rounded-full text-white text-md sm:text-lg font-normal px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors shadow-md">
                Get started
              </button>
              <button className="rounded-full text-md sm:text-lg font-normal text-gray-700 px-6 py-3 bg-white hover:bg-gray-200 transition-colors border border-gray-300 shadow-md">
                How It Works
              </button>
            </div>
          </div>
          
          {/* The main form container is responsive with a consistent look across devices */}
          <div className="w-full flex-1 rounded-lg shadow-2xl lg:mt-0 bg-white p-6 md:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Edit Property</h2>
            
            {/* The "Sell" and "Rent/Lease" buttons are responsive with dynamic styles */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setSellProperty((p) => ({ ...p, propertyLooking: 'Sell' }))}
                aria-pressed={sellProperty.propertyLooking === 'Sell'}
                className={`w-full sm:w-auto text-center px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  sellProperty.propertyLooking === "Sell" ? "bg-red-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Sell
              </button>
              <button
                onClick={() => setSellProperty((p) => ({ ...p, propertyLooking: 'rent' }))}
                aria-pressed={sellProperty.propertyLooking === 'rent'}
                className={`w-full sm:w-auto text-center px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  sellProperty.propertyLooking === "rent" ? "bg-red-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Rent/Lease
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Form fields are arranged in a responsive grid that stacks on mobile */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Building className="w-3 h-3 text-red-500" />
                    Property Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.selectoption ? 'border-red-500' : ''}`}
                    name="selectoption"
                    value={sellProperty.selectoption}
                    onChange={handleChangeValue}
                  >
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {formErrors.selectoption && <div className="text-xs text-red-500 mt-1">{formErrors.selectoption}</div>}
                </div>

                {sellProperty.selectoption !== "Select Property Type" && (
                  <div className="group">
                    <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                      <Building className="w-3 h-3 text-red-500" />
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.propertyType ? 'border-red-500' : ''}`}
                      name="propertyType"
                      value={sellProperty.propertyType}
                      onChange={handleChangeValue}
                    >
                      <option value="">Select Type</option>
                      {subTypes[sellProperty.selectoption]?.map((subType, index) => (
                        <option key={index} value={subType}>
                          {subType}
                        </option>
                      ))}
                    </select>
                    {formErrors.propertyType && <div className="text-xs text-red-500 mt-1">{formErrors.propertyType}</div>}
                  </div>
                )}
              </div>

              <div className="group">
                <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-red-500" />
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="Property Name"
                  name="propertyName"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.propertyName}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="group">
                <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.address}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <MapPinned className="w-3 h-3 text-red-500" />
                    City
                  </label>
                  <div className="relative">
                    <select
                      className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
                      name="city"
                      value={sellProperty.city}
                      onChange={handleChangeValue}
                    >
                      <option value="">Select City</option>
                      {citiesList.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-red-500" />
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={sellProperty.state}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-red-500" />
                    Expected Price
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Price"
                      name="price"
                      className="h-11 flex-1 rounded-md border border-gray-300 bg-gray-50 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-20"
                      value={sellProperty.price}
                      onChange={handleChangeValue}
                    />
                    <select
                      name="priceunits"
                      value={sellProperty.priceunits}
                      onChange={handleChangeValue}
                      className="h-11 w-28 rounded-md border border-gray-300 bg-gray-50 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Units</option>
                      <option value="lakhs">Lakhs</option>
                      <option value="crores">Crores</option>
                    </select>
                  </div>
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Ruler className="w-3 h-3 text-red-500" />
                    Property Area
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="Area"
                      name="area"
                      className="h-11 flex-1 rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-20"
                      value={sellProperty.area}
                      onChange={handleChangeValue}
                    />
                    <select
                      name="areaUnit"
                      value={sellProperty.areaUnit}
                      onChange={handleChangeValue}
                      className="h-11 w-28 rounded-md border border-gray-300 bg-gray-50 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Units</option>
                      <option value="sqft">Sqft</option>
                      <option value="sqyd">Sqyd</option>
                      <option value="sqmt">Sqmt</option>
                      <option value="acre">Acre</option>
                      <option value="kanal">Kanal</option>
                      <option value="marla">Marla</option>
                      <option value="gaj">Gaj</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                  <FileText className="w-3 h-3 text-red-500" />
                  Property Description
                </label>
                <textarea
                  placeholder="Description"
                  name="description"
                  className="h-28 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  value={sellProperty.description}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Landmark className="w-3 h-3 text-red-500" />
                    Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={sellProperty.landmark}
                    onChange={handleChangeValue}
                  />
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-red-500" />
                    Amenities
                  </label>
                  <input
                    type="text"
                    placeholder="Amenities (comma-separated)"
                    name="amenities"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={sellProperty.amenities}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-red-500" />
                    Built Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Built year"
                    name="builtyear"
                    className={`h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.builtyear ? 'border-red-500' : ''}`}
                    value={sellProperty.builtyear ?? ""}
                    onChange={handleChangeValue}
                  />
                  {formErrors.builtyear && <div className="text-xs text-red-500 mt-1">{formErrors.builtyear}</div>}
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Sofa className="w-3 h-3 text-red-500" />
                    Furnishing Status
                  </label>
                  <input
                    type="text"
                    placeholder="Furnishing"
                    name="furnishing"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={sellProperty.furnishing}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Info className="w-3 h-3 text-red-500" />
                    Property Status
                  </label>
                  <div className="relative">
                    <select
                      className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
                      name="type"
                      value={sellProperty.type}
                      onChange={handleChangeValue}
                    >
                      <option value="">Select Status</option>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
                <div className="group">
                  <label className="text-xs font-bold text-gray-700 uppercase mb-1 ml-1 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-red-500" />
                    Available Date
                  </label>
                  <input
                    type="date"
                    name="availabledate"
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={sellProperty.availabledate}
                    onChange={handleChangeValue}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="frontImage" className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-red-500" />
                    Upload Front Image
                  </label>
                  {existingFrontImage && typeof existingFrontImage === 'string' && (
                    <div className="mb-2 flex items-center gap-2">
                      <img src={existingFrontImage.startsWith('http') ? existingFrontImage : `${process.env.REACT_APP_API_URL || ''}${existingFrontImage}`} alt="Front" className="w-20 h-14 object-cover rounded border" />
                      <button type="button" className="text-xs text-red-500 underline" onClick={() => setExistingFrontImage(null)}>Remove</button>
                    </div>
                  )}
                  <input
                    type="file"
                    name="frontImage"
                    accept="image/*"
                    onChange={handleFrontImageChange}
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 pt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="otherImage" className="text-gray-700 font-medium mb-1 flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 text-red-500" />
                    Upload Other Images
                  </label>
                  {existingOtherImages && existingOtherImages.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {existingOtherImages.map((img, idx) => {
                        if (typeof img !== 'string') return null;
                        return (
                          <div key={idx} className="relative inline-block">
                            <img src={img.startsWith('http') ? img : `${process.env.REACT_APP_API_URL || ''}${img}`} alt={`Other ${idx+1}`} className="w-16 h-12 object-cover rounded border" />
                            <button type="button" className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full text-xs text-red-500 px-1" onClick={() => handleRemoveExistingOtherImage(idx)}>x</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    name="otherImage"
                    accept="image/*"
                    id="otherImage"
                    onChange={handleOtherImagesChange}
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 pt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button 
                  type="submit" 
                  className="w-full rounded-lg bg-red-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UserEditProperty;