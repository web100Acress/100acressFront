import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiBase } from "../config/apiBase";
import LuxuryFooter from "../Components/Actual_Components/LuxuryFooter";

const UserEditProperty = () => {
  const propertyTypes = ["Select Property Type", "Commercial", "Residential"];
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
    area: "",
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

  useEffect(() => {
    if (selected) {
      setSellProperty((prev) => ({
        ...prev,
        propertyLooking: selected.propertyLooking || "",
        selectoption: selected.selectoption || "Select Property Type",
        propertyType: selected.propertyType || "",
        subType: selected.subType || "",
        propertyName: selected.projectName || selected.propertyName || "",
        address: selected.address || "",
        city: selected.city || "",
        state: selected.state || "",
        price: selected.price || "",
        area: selected.area || "",
        description: selected.description || selected.descripation || selected.projectDescription || "",
        landmark: selected.landMark || selected.landmark || "",
        amenities: Array.isArray(selected.amenities) ? selected.amenities.join(", ") : (selected.amenities || ""),
        builtyear: selected.builtyear || selected.builtYear || "",
        furnishing: selected.furnishing || "",
        type: selected.type || "",
        availabledate: selected.availabledate || selected.availableDate || "",
      }));
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
  };

  const handleOtherImagesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setOtherImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !selected._id) {
      navigate(-1);
      return;
    }
    try {
      const base = getApiBase();
      const form = new FormData();
      // Text fields
      form.append('propertyLooking', sellProperty.propertyLooking || '');
      form.append('selectoption', sellProperty.selectoption || '');
      form.append('propertyType', sellProperty.propertyType || '');
      form.append('subType', sellProperty.subType || '');
      form.append('projectName', sellProperty.propertyName || '');
      form.append('propertyName', sellProperty.propertyName || '');
      form.append('address', sellProperty.address || '');
      form.append('city', sellProperty.city || '');
      form.append('state', sellProperty.state || '');
      form.append('price', sellProperty.price || '');
      form.append('area', sellProperty.area || '');
      // Description under multiple common keys
      form.append('description', sellProperty.description || '');
      form.append('descripation', sellProperty.description || '');
      form.append('projectDescription', sellProperty.description || '');
      form.append('landMark', sellProperty.landmark || '');
      form.append('landmark', sellProperty.landmark || '');
      // Amenities as string, array, and JSON for compatibility
      const amenitiesStr = (sellProperty.amenities || '').trim();
      const amenitiesArr = amenitiesStr ? amenitiesStr.split(',').map(s => s.trim()).filter(Boolean) : [];
      form.append('amenities', amenitiesStr);
      if (amenitiesArr.length) {
        amenitiesArr.forEach(a => form.append('amenities[]', a));
        form.append('amenitiesJson', JSON.stringify(amenitiesArr));
      }
      // Built year and available date with alternative keys
      form.append('builtyear', sellProperty.builtyear || '');
      form.append('builtYear', sellProperty.builtyear || '');
      form.append('furnishing', sellProperty.furnishing || '');
      form.append('type', sellProperty.type || '');
      form.append('availabledate', sellProperty.availabledate || '');
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
      // Still navigate back to keep flow, or stay?
      navigate(-1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
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
                <select
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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

                {sellProperty.selectoption !== "Select Property Type" && (
                  <select
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    name="propertyType"
                    value={sellProperty.propertyType}
                    onChange={handleChangeValue}
                  >
                    {subTypes[sellProperty.selectoption]?.map((subType, index) => (
                      <option key={index} value={subType}>
                        {subType}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <input
                type="text"
                placeholder="Property Name"
                name="propertyName"
                className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={sellProperty.propertyName}
                onChange={handleChangeValue}
              />

              <input
                type="text"
                placeholder="Address"
                name="address"
                className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={sellProperty.address}
                onChange={handleChangeValue}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.city}
                  onChange={handleChangeValue}
                />
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.state}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.price}
                  onChange={handleChangeValue}
                />
                <input
                  type="text"
                  placeholder="Area"
                  name="area"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.area}
                  onChange={handleChangeValue}
                />
              </div>

              <textarea
                placeholder="Description"
                name="description"
                className="h-28 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                value={sellProperty.description}
                onChange={handleChangeValue}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Landmark"
                  name="landmark"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.landmark}
                  onChange={handleChangeValue}
                />
                <input
                  type="text"
                  placeholder="Amenities (comma-separated)"
                  name="amenities"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.amenities}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Built year"
                  name="builtyear"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.builtyear}
                  onChange={handleChangeValue}
                />
                <input
                  type="text"
                  placeholder="Furnishing"
                  name="furnishing"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.furnishing}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Type"
                  name="type"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.type}
                  onChange={handleChangeValue}
                />
                <input
                  type="text"
                  placeholder="Available date"
                  name="availabledate"
                  className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={sellProperty.availabledate}
                  onChange={handleChangeValue}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="frontImage" className="block text-gray-700 font-medium mb-1">
                    Upload Front Image
                  </label>
                  <input
                    type="file"
                    name="frontImage"
                    accept="image/*"
                    onChange={handleFrontImageChange}
                    className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 pt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label htmlFor="otherImage" className="block text-gray-700 font-medium mb-1">
                    Upload Other Images
                  </label>
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
      <LuxuryFooter />
    </div>
  );
};

export default UserEditProperty;