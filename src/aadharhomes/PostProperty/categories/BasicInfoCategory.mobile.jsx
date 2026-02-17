import React from "react";
import { Home, Key, Building2, ChevronDown, Sparkles } from "lucide-react";

const BasicInfoCategoryMobile = ({ 
  sellProperty, 
  handleChangeValue, 
  handleOptionClick, 
  propertyType, 
  subTypes,
  parsedAgentData 
}) => {
  return (
    <div className="block md:hidden px-4 pb-6 pt-4 bg-white rounded-2xl shadow-sm space-y-4">
      
      {/* Header */}
      <div className="text-center space-y-1">
        {/* <div className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-gray-700" />
          <span className="text-[11px] font-semibold text-gray-700 tracking-wide uppercase">
            Welcome
          </span>
        </div> */}

        <p className="text-[15px] font-bold text-gray-900">
          Hi, <span className="text-gray-700">{parsedAgentData?.name || "Agent"}</span>
        </p>

        <p className="text-[12px] text-gray-600 leading-tight">
          List your property & reach buyers faster
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wide">
          Choose Action
        </p>

        <button
          className={`h-12 w-full rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            sellProperty.propertyLooking === "Sell"
              ? "bg-gray-900 text-white shadow-md"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => handleOptionClick("Sell")}
        >
          <Home className="w-4 h-4" />
          Sell Property
        </button>

        <button
          className={`h-12 w-full rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            sellProperty.propertyLooking === "rent"
              ? "bg-gray-900 text-white shadow-md"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => handleOptionClick("rent")}
        >
          <Key className="w-4 h-4" />
          Rent / Lease
        </button>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-700" />
          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-800">
            Property Type
          </p>
        </div>

        {/* Main Type */}
        <div className="relative">
          <select
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm font-medium text-gray-900 outline-none focus:border-gray-900 mobile-select-fix"
            name="selectoption"
            value={sellProperty?.selectoption}
            onChange={handleChangeValue}
          >
            <option value="">Select Property Type</option>
            {propertyType.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
        </div>

        {/* Sub Type */}
        {sellProperty.selectoption && (
          <div className="relative animate-in fade-in slide-in-from-top-1 duration-300">
            <select
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm font-medium text-gray-900 outline-none focus:border-gray-900 mobile-select-fix"
              name="propertyType"
              value={sellProperty.propertyType}
              onChange={handleChangeValue}
            >
              <option value="">Select Sub-Type</option>
              {subTypes[sellProperty.selectoption]?.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>

            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoCategoryMobile;
