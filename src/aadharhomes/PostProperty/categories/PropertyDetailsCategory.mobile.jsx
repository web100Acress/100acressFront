import React from "react";

const PropertyDetailsCategoryMobile = ({ 
  sellProperty, 
  handleChangeValue, 
  handleChangeValueAmenities, 
  handleProjectfurnishing 
}) => {
  const isCommercial = sellProperty.selectoption === "Commercial";

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
              onChange={handleChangeValue}
              className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="">Bedrooms</option>
              {[0,1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <select
              name="bathrooms"
              value={sellProperty.bathrooms}
              onChange={handleChangeValue}
              className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            >
              <option value="">Bathrooms</option>
              {[0,1,2,3,4,5,6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}

        {/* Area */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Area"
            name="area"
            value={sellProperty.area}
            onChange={handleChangeValue}
            className="col-span-2 h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
          <select
            name="areaUnit"
            value={sellProperty.areaUnit}
            onChange={handleChangeValue}
            className="h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">Unit</option>
            <option value="sqft">Sqft</option>
            <option value="sqyd">Sqyd</option>
          </select>
        </div>

        {/* Price */}
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={sellProperty.price}
            onChange={handleChangeValue}
            className="col-span-2 h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
          <select
            name="priceunits"
            value={sellProperty.priceunits}
            onChange={handleChangeValue}
            className="h-12 rounded-xl border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            <option value="">Unit</option>
            <option value="lakhs">Lakhs</option>
            <option value="crores">Crores</option>
          </select>
        </div>

        {/* Furnishing */}
        <select
          value={sellProperty.furnishing}
          onChange={handleProjectfurnishing}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        >
          <option value="">Furnishing</option>
          <option value="Fullyfurnishing">Furnished</option>
          <option value="Semifurnishing">Semi-furnished</option>
          <option value="UnFurnishing">Unfurnished</option>
        </select>

        {/* Built Year */}
        <input
          type="text"
          placeholder="Built Year"
          name="builtYear"
          value={sellProperty.builtYear}
          onChange={handleChangeValue}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        {/* Landmark */}
        <input
          type="text"
          placeholder="Nearby Landmark"
          name="landMark"
          value={sellProperty.landMark}
          onChange={handleChangeValue}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

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
          onChange={handleChangeValue}
          rows={4}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      </div>
    </div>
  );
};

export default PropertyDetailsCategoryMobile;
