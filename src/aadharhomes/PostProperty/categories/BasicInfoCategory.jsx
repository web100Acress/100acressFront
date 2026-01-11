import React from "react";
import { Home, Key, Building2, ChevronDown, Sparkles } from "lucide-react";

const BasicInfoCategory = ({ 
  sellProperty, 
  handleChangeValue, 
  handleOptionClick, 
  propertyType, 
  subTypes,
  parsedAgentData 
}) => {
  return (
    <div className="space-y-7 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl">
      <div className="text-center mb-2">
        {/* <div className="inline-flex items-center justify-center gap-2 mb-3 bg-gradient-to-r from-red-100 to-rose-100 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-red-600" />
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Welcome</p>
        </div> */}
        <p className="text-3xl font-bold text-gray-900 mb-1">Hi, <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">{parsedAgentData ? parsedAgentData.name : 'Agent'}</span></p>
        <p className="text-sm text-gray-600 mb-1">Let's list your property</p>
      </div>
      
      <div className="space-y-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
        {/* <p className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">Choose an option</p> */}
        <div className="flex gap-2 pt-1">
          <button
            className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-102 flex flex-col items-center justify-center gap-1.5 text-sm border-2 ${
              sellProperty.propertyLooking === "Sell" 
                ? "bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-lg shadow-red-600/20 border-red-600 hover:shadow-xl hover:shadow-red-600/30" 
                : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 border-gray-300 hover:border-red-400 hover:shadow-md"
            }`}
            onClick={() => handleOptionClick("Sell")}
          >
            <Home className="w-5 h-5" />
            <span>Sell Property</span>
          </button>
          <button
            className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-102 flex flex-col items-center justify-center gap-1.5 text-sm border-2 ${
              sellProperty.propertyLooking === "rent" 
                ? "bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-lg shadow-red-600/20 border-red-600 hover:shadow-xl hover:shadow-red-600/30" 
                : "bg-white text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 border-gray-300 hover:border-red-400 hover:shadow-md"
            }`}
            onClick={() => handleOptionClick("rent")}
          >
            <Key className="w-5 h-5" />
            <span>Rent/Lease</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2.5 pb-2">
          <div className="p-2 bg-gradient-to-br from-red-100 to-rose-100 rounded-lg">
            <Building2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            {/* <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">Property Details</p> */}
            <p className="text-lg font-bold text-gray-900">What kind of property?</p>
          </div>
        </div>

        <div className="space-y-3 pt-0">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="relative group">
              <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Property Type</label>
              <select
                className={`h-12 w-full rounded-lg bg-white border-2 px-4 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold ${
                  sellProperty?.selectoption 
                    ? "border-red-500 ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-white shadow-md" 
                    : "border-gray-300 hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                }`}
                name="selectoption"
                value={sellProperty?.selectoption}
                onChange={handleChangeValue}
              >
                <option value="" className="text-gray-500">Select Property Type</option>
                {propertyType.map((type, index) => (
                  <option key={index} value={type} className="text-gray-900">{type}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-9 pointer-events-none group-hover:text-red-500 transition-colors duration-200" />
            </div>

            {sellProperty.selectoption && (
              <div className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-xs font-semibold text-gray-700 mb-2 ml-1 uppercase tracking-wider">Property Sub-type</label>
                <select
                  className={`h-12 w-full rounded-lg bg-white border-2 px-4 outline-none transition-all duration-200 text-gray-900 text-sm appearance-none cursor-pointer font-semibold ${
                    sellProperty.propertyType
                      ? "border-red-500 ring-2 ring-red-200 bg-gradient-to-br from-red-50 to-white shadow-md" 
                      : "border-gray-300 hover:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  }`}
                  name="propertyType"
                  value={sellProperty.propertyType}
                  onChange={handleChangeValue}
                >
                  <option value="" className="text-gray-500">Select Sub-type</option>
                  {subTypes[sellProperty?.selectoption]?.map((subType, index) => (
                    <option key={index} value={subType} className="text-gray-900">{subType}</option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-9 pointer-events-none group-hover:text-red-500 transition-colors duration-200" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoCategory;