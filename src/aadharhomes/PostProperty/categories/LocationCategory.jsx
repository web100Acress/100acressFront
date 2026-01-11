import React from "react";
import { MapPin, Home, MapPinned } from "lucide-react";

const LocationCategory = ({ 
  sellProperty, 
  handleChangeValue, 
  selectedState, 
  selectedCity, 
  handleChangeStateValue, 
  handleChangeCityValue, 
  states = [],
  cities = []
}) => {
  return (
    <div className="space-y-3 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Where is your property located?
        </h2>
        <p className="text-sm text-gray-500 font-medium">Accurate location details attract the right buyers</p>
      </div>

      {/* State & Property Name Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* State Select */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            Select State
          </label>
          <select
            value={selectedState}
            onChange={handleChangeStateValue}
            name="state"
            className={`h-10 w-full rounded-xl bg-white border-2 px-4 py-2 outline-none transition-all duration-300 text-gray-900 font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md ${
              selectedState
                ? "border-red-500 ring-2 ring-red-100 shadow-lg" 
                : "border-gray-200 hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23dc2626' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px'
            }}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
        </div>

        {/* Property Name */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Home className="w-4 h-4 text-red-500" />
            Property Name
          </label>
          <input
            type="text"
            placeholder="e.g., Sunset Apartment, Dream Villa"
            name="propertyName"
            value={sellProperty.propertyName}
            onChange={handleChangeValue}
            className={`h-10 w-full rounded-xl bg-white border-2 px-4 py-2 outline-none transition-all duration-300 placeholder-gray-400 text-gray-900 font-medium shadow-sm hover:shadow-md ${
              sellProperty.propertyName
                ? "border-red-500 ring-2 ring-red-100 shadow-lg" 
                : "border-gray-200 hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            }`}
          />
        </div>
      </div>

      {/* City Select */}
      {/* {selectedState && (
        <div className="group animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPinned className="w-4 h-4 text-red-500" />
            Select City
          </label>
          <select
            value={selectedCity}
            name="city"
            onChange={handleChangeCityValue}
            className={`h-10 w-full rounded-xl bg-white border-2 px-4 py-2 outline-none transition-all duration-300 text-gray-900 font-medium appearance-none cursor-pointer shadow-sm hover:shadow-md ${
              selectedCity && selectedCity !== "Select City"
                ? "border-red-500 ring-2 ring-red-100 shadow-lg" 
                : "border-gray-200 hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23dc2626' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              paddingRight: '40px'
            }}
          >
            <option value="Select City">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
      )} */}

      {/* Property Details */}
      <div className="space-y-3 pt-2">
        {/* Address */}
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
            <MapPinned className="w-4 h-4 text-red-500" />
            Complete Address
          </label>
          <textarea
            placeholder="Enter full address including street, area, landmark..."
            name="address"
            value={sellProperty.address}
            onChange={handleChangeValue}
            rows={3}
            className={`w-full px-4 py-2 rounded-xl bg-white border-2 outline-none transition-all duration-300 placeholder-gray-400 text-gray-900 font-medium resize-none shadow-sm hover:shadow-md ${
              sellProperty.address
                ? "border-red-500 ring-2 ring-red-100 shadow-lg" 
                : "border-gray-200 hover:border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            }`}
          />
          {/* {sellProperty.address && (
            <p className="text-xs text-gray-500 mt-2">
              {sellProperty.address.length} characters • Good detail level
            </p>
          )} */}
        </div>
      </div>

      {/* Progress Indicator */}
      {/* <div className="pt-2 border-t border-gray-200">
        <div className="flex gap-2">
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${selectedState ? "bg-red-500" : "bg-gray-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${selectedCity && selectedCity !== "Select City" ? "bg-red-500" : "bg-gray-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${sellProperty.propertyName ? "bg-red-500" : "bg-gray-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${sellProperty.address ? "bg-red-500" : "bg-gray-200"}`}></div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          {[selectedState, selectedCity && selectedCity !== "Select City", sellProperty.propertyName, sellProperty.address].filter(Boolean).length} of 4 fields completed
        </p>
      </div> */}
    </div>
  );
};

export default LocationCategory;