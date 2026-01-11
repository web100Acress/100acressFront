import React from "react";
import { Info, Bed, Bath, Ruler, DollarSign, Sofa, Calendar, Landmark, Sparkles, FileText, ChevronDown } from "lucide-react";

const PropertyDetailsCategory = ({ 
  sellProperty, 
  handleChangeValue, 
  handleChangeValueAmenities, 
  handleProjectfurnishing 
}) => {
  const isCommercial = sellProperty.selectoption === "Commercial";
  
  return (
    <div className="space-y-3 bg-gradient-to-br from-gray-50 to-white p-3 rounded-2xl">
      <div className="text-center mb-0.5">
        <p className="text-xl font-bold text-gray-900 mb-0.5">Tell us about your property</p>
        <p className="text-xs text-gray-600">Accurate details attract right buyers</p>
      </div>
      
      <div className="space-y-3">
        {/* Bedrooms & Bathrooms Section */}
        {!isCommercial && (
          <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <div className="p-1.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                <Bed className="w-4 h-4 text-blue-600n" />
              </div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Bedrooms & Bathrooms</p>
            </div>
            <div className="grid gap-2 pt-2 md:grid-cols-2">
              <div className="relative group">
                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1 uppercase tracking-wider">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={sellProperty.bedrooms}
                  onChange={handleChangeValue}
                  className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold ${
                    sellProperty.bedrooms
                      ? "border-gray-400 bg-gray-50" 
                      : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                  }`}
                >
                  <option value="">Select Bedrooms</option>
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Bedroom' : 'Bedrooms'}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-7 pointer-events-none group-hover:text-gray-500 transition-colors" />
              </div>
              
              <div className="relative group">
                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1 uppercase tracking-wider">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={sellProperty.bathrooms}
                  onChange={handleChangeValue}
                  className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold ${
                    sellProperty.bathrooms
                      ? "border-gray-400 bg-gray-50" 
                      : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                  }`}
                >
                  <option value="">Select Bathrooms</option>
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Bathroom' : 'Bathrooms'}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-7 pointer-events-none group-hover:text-gray-500 transition-colors" />
              </div>
            </div>
          </div>
        )}

        {/* Area Section */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <div className="p-1.5 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
              <Ruler className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Area Details</p>
          </div>
          <div className="pt-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1 uppercase tracking-wider">Property Size</label>
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder="Enter area"
                name="area"
                value={sellProperty.area}
                onChange={handleChangeValue}
                className={`h-9 flex-1 rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold ${
                  sellProperty.area
                    ? "border-gray-400 bg-gray-50" 
                    : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                }`}
              />
              <div className="relative group">
                <select
                  name="areaUnit"
                  value={sellProperty.areaUnit}
                  onChange={handleChangeValue}
                  className={`h-9 rounded-lg bg-white border-2 px-2 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold min-w-28 ${
                    sellProperty.areaUnit
                      ? "border-gray-400 bg-gray-50" 
                      : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                  }`}
                >
                  <option value="">Units</option>
                  <option value="sqft">Sqft</option>
                  <option value="sqrd">Sqyd</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none group-hover:text-gray-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <div className="p-1.5 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Price</p>
          </div>
          <div className="pt-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1 uppercase tracking-wider">Expected Price</label>
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder="Enter price"
                name="price"
                value={sellProperty.price}
                onChange={handleChangeValue}
                className={`h-9 flex-1 rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold ${
                  sellProperty.price
                    ? "border-gray-400 bg-gray-50" 
                    : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                }`}
              />
              <div className="relative group">
                <select
                  name="priceunits"
                  value={sellProperty.priceunits}
                  onChange={handleChangeValue}
                  className={`h-9 rounded-lg bg-white border-2 px-2 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold min-w-28 ${
                    sellProperty.priceunits
                      ? "border-gray-400 bg-gray-50" 
                      : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                  }`}
                >
                  <option value="">Units</option>
                  <option value="lakhs">Lakhs</option>
                  <option value="crores">Crores</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2 pointer-events-none group-hover:text-gray-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Furnishing & Built Year */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 pb-2 mb-1 border-b border-gray-200">
                <div className="p-1.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
                  <Sofa className="w-3 h-3 text-amber-600" />
                </div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Furnishing</label>
              </div>
              <div className="relative group">
                <select
                  value={sellProperty.furnishing}
                  onChange={handleProjectfurnishing}
                  className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold ${
                    sellProperty.furnishing
                      ? "border-gray-400 bg-gray-50" 
                      : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                  }`}
                >
                  <option value="">Select Furnishing</option>
                  <option value="Fullyfurnishing">Fully Furnished</option>
                  <option value="Semifurnishing">Semi-Furnished</option>
                  <option value="UnFurnishing">Unfurnished</option>
                </select>
                <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-2.5 pointer-events-none group-hover:text-gray-500 transition-colors" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 pb-2 mb-1 border-b border-gray-200">
                <div className="p-1.5 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg">
                  <Calendar className="w-3 h-3 text-orange-600" />
                </div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Built Year</label>
              </div>
              <input
                type="text"
                placeholder="e.g., 2015"
                name="builtYear"
                value={sellProperty.builtYear}
                onChange={handleChangeValue}
                className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold ${
                  sellProperty.builtYear
                    ? "border-gray-400 bg-gray-50" 
                    : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Landmark & Amenities */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="space-y-2">
            <div>
              <div className="flex items-center gap-2 pb-2 mb-1 border-b border-gray-200">
                <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-lg">
                  <Landmark className="w-3 h-3 text-indigo-600" />
                </div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Landmark/Area</label>
              </div>
              <input
                type="text"
                placeholder="e.g., Near Metro Station, Shopping Mall"
                name="landMark"
                value={sellProperty.landMark}
                onChange={handleChangeValue}
                className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold ${
                  sellProperty.landMark
                    ? "border-gray-400 bg-gray-50" 
                    : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                }`}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 pb-2 mb-1 border-b border-gray-200">
                <div className="p-1.5 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-lg">
                  <Sparkles className="w-3 h-3 text-cyan-600" />
                </div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Amenities</label>
              </div>
              <input
                type="text"
                placeholder="e.g., Gym, Pool, Parking, Garden"
                name="amenities"
                value={sellProperty.amenities.join(", ")}
                onChange={handleChangeValueAmenities}
                className={`h-9 w-full rounded-lg bg-white border-2 px-3 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold ${
                  sellProperty.amenities.length > 0
                    ? "border-gray-400 bg-gray-50" 
                    : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
                }`}
              />
              <p className="text-xs text-gray-500 mt-1 ml-1">Separate multiple items with commas</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 pb-2 mb-1 border-b border-gray-200">
            <div className="p-1.5 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg">
              <FileText className="w-3 h-3 text-rose-600" />
            </div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Description</label>
          </div>
          <textarea
            placeholder="Describe your property in detail... (highlights, special features, recent renovations, etc.)"
            name="descripation"
            value={sellProperty.descripation}
            onChange={handleChangeValue}
            rows={3}
            className={`w-full px-3 py-2 rounded-lg bg-white border-2 outline-none transition-all duration-200 placeholder-gray-400 text-gray-900 text-sm font-semibold resize-none ${
              sellProperty.descripation
                ? "border-gray-400 bg-gray-50" 
                : "border-gray-300 hover:border-gray-400 focus:border-gray-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCategory;