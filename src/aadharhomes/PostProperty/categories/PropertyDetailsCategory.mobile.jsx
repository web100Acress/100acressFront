import React, { useState } from "react";

const PropertyDetailsCategoryMobile = ({ 
  sellProperty, 
  handleChangeValue, 
  handleChangeValueAmenities, 
  handleProjectfurnishing 
}) => {
  const isCommercial = sellProperty.selectoption === "Commercial";
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "area":
        if (!value.trim()) error = "Area is required";
        else if (isNaN(value) || parseFloat(value) <= 0) error = "Area must be a positive number";
        break;
      case "price":
        if (!value.trim()) error = "Price is required";
        else if (isNaN(value) || parseFloat(value) <= 0) error = "Price must be a positive number";
        break;
      case "builtYear":
        if (!value.trim()) error = "Built year is required";
        else if (isNaN(value) || parseInt(value) < 1800 || parseInt(value) > new Date().getFullYear() + 1) error = "Enter a valid year";
        break;
      case "bedrooms":
      case "bathrooms":
        if (!value) error = `${name === "bedrooms" ? "Bedrooms" : "Bathrooms"} is required`;
        break;
      case "areaUnit":
      case "priceunits":
      case "furnishing":
      case "availableDate":
      case "type":
        if (!value) error = "This field is required";
        break;
      case "landMark":
        if (!value.trim()) error = "Landmark is required";
        break;
      case "descripation":
        if (!value.trim()) error = "Description is required";
        else if (value.trim().length < 20) error = "Description must be at least 20 characters";
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChangeValue(e);
    validateField(name, value);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "furnishing") {
      handleProjectfurnishing(e);
    } else {
      handleChangeValue(e);
    }
    validateField(name, value);
  };

  return (
    <div className="block md:hidden px-4 pb-6 pt-4 bg-white rounded-2xl shadow-sm space-y-5">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-[16px] font-bold text-gray-900">
          Tell us about your property
        </p>
        {/* <p className="text-[12px] text-gray-600 leading-tight">
          Accurate details help buyers decide faster
        </p> */}
      </div>

      {/* Details */}
      <div className="space-y-3">

        {/* Bedrooms / Bathrooms */}
        {!isCommercial && (
          <div className="grid grid-cols-2 gap-3">
            <select
              name="bedrooms"
              value={sellProperty.bedrooms}
              onChange={handleSelectChange}
              className={`h-12 rounded-xl border bg-white px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
                errors.bedrooms ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"
              }`}
            >
              <option value="">Bedrooms</option>
              {[0,1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errors.bedrooms && (
              <p className="text-xs text-red-500 mt-1">{errors.bedrooms}</p>
            )}

            <select
              name="bathrooms"
              value={sellProperty.bathrooms}
              onChange={handleSelectChange}
              className={`h-12 rounded-xl border bg-white px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
                errors.bathrooms ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-red-500"
              }`}
            >
              <option value="">Bathrooms</option>
              {[0,1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errors.bathrooms && (
              <p className="text-xs text-red-500 mt-1">{errors.bathrooms}</p>
            )}
          </div>
        )}

        {/* Area */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Area"
            name="area"
            value={sellProperty.area}
            onChange={handleFieldChange}
            className={`col-span-2 h-12 rounded-xl border bg-white px-4 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-red-100 ${
              errors.area ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
            }`}
          />
          <select
            name="areaUnit"
            value={sellProperty.areaUnit}
            onChange={handleSelectChange}
            className={`h-12 rounded-xl border bg-white px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
              errors.areaUnit ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
            }`}
          >
            <option value="">Unit</option>
            <option value="sqft">Sqft</option>
            <option value="sqyd">Sqyd</option>
            <option value="sqm">Sqm</option>
            <option value="acre">Acre</option>
            <option value="gunta">Gunta</option>
            <option value="hectare">Hectare</option>
          </select>
        </div>
        {(errors.area || errors.areaUnit) && (
          <div className="space-y-1">
            {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
            {errors.areaUnit && <p className="text-xs text-red-500">{errors.areaUnit}</p>}
          </div>
        )}

        {/* Price */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={sellProperty.price}
            onChange={handleFieldChange}
            className={`col-span-2 h-12 rounded-xl border bg-white px-4 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-red-100 ${
              errors.price ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
            }`}
          />
          <select
            name="priceunits"
            value={sellProperty.priceunits}
            onChange={handleSelectChange}
            className={`h-12 rounded-xl border bg-white px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
              errors.priceunits ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
            }`}
          >
            <option value="">Unit</option>
            <option value="thousands">Thousands</option>
            <option value="lakhs">Lakhs</option>
            <option value="crores">Crores</option>
          </select>
        </div>
        {(errors.price || errors.priceunits) && (
          <div className="space-y-1">
            {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            {errors.priceunits && <p className="text-xs text-red-500">{errors.priceunits}</p>}
          </div>
        )}

        {/* Furnishing */}
        <select
          name="furnishing"
          value={sellProperty.furnishing}
          onChange={handleSelectChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
            errors.furnishing ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        >
          <option value="">Furnishing</option>
          <option value="Fullyfurnishing">Furnished</option>
          <option value="Semifurnishing">Semi-furnished</option>
          <option value="UnFurnishing">Unfurnished</option>
        </select>
        {errors.furnishing && (
          <p className="text-xs text-red-500 mt-1">{errors.furnishing}</p>
        )}

        {/* Available Date */}
        <input
          type="date"
          placeholder="Available Date"
          name="availableDate"
          value={sellProperty.availableDate}
          onChange={handleFieldChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-red-100 ${
            errors.availableDate ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        />
        {errors.availableDate && (
          <p className="text-xs text-red-500 mt-1">{errors.availableDate}</p>
        )}

        {/* Property Status */}
        <select
          name="type"
          value={sellProperty.type}
          onChange={handleSelectChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
            errors.type ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        >
          <option value="">Property Status</option>
          <option value="Ready to Move">Ready to Move</option>
          <option value="Under Construction">Under Construction</option>
        </select>
        {errors.type && (
          <p className="text-xs text-red-500 mt-1">{errors.type}</p>
        )}

        {/* Built Year */}
        <select
          name="builtYear"
          value={sellProperty.builtYear}
          onChange={handleSelectChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-red-100 mobile-select-fix ${
            errors.builtYear ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        >
          <option value="">Built Year</option>
          {(() => {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let y = currentYear + 1; y >= 1990; y--) years.push(y);
            return years.map((y) => <option key={y} value={String(y)}>{y}</option>);
          })()}
        </select>
        {errors.builtYear && (
          <p className="text-xs text-red-500 mt-1">{errors.builtYear}</p>
        )}

        {/* Landmark */}
        <input
          type="text"
          placeholder="Nearby Landmark"
          name="landMark"
          value={sellProperty.landMark}
          onChange={handleFieldChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-red-100 ${
            errors.landMark ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        />
        {errors.landMark && (
          <p className="text-xs text-red-500 mt-1">{errors.landMark}</p>
        )}

        {/* Amenities */}
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          name="amenities"
          value={sellProperty.amenities.join(",")}
          onChange={handleChangeValueAmenities}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        {/* Description */}
        <textarea
          placeholder="Property Description"
          name="descripation"
          value={sellProperty.descripation}
          onChange={handleFieldChange}
          rows={4}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-red-100 ${
            errors.descripation ? "border-red-500 focus:border-red-500 text-gray-900" : "border-gray-300 text-gray-900 focus:border-red-500"
          }`}
        />
        {errors.descripation && (
          <p className="text-xs text-red-500 mt-1">{errors.descripation}</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsCategoryMobile;
