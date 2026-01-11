import React from "react";

const LocationCategoryMobile = ({ 
  sellProperty, 
  handleChangeValue, 
  selectedState, 
  selectedCity, 
  handleChangeStateValue, 
  handleChangeCityValue, 
  states, 
  cities 
}) => {
  return (
    <div className="block md:hidden px-4 pb-6 pt-4 bg-white rounded-2xl shadow-sm space-y-5">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-[16px] font-bold text-gray-900">
          Where is your property located?
        </p>
        {/* <p className="text-[12px] text-gray-600 leading-tight">
          Right information brings the right buyers
        </p> */}
      </div>

      {/* State / City */}
      <div className="space-y-3">
        <select
          value={selectedState}
          onChange={handleChangeStateValue}
          name="state"
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>

        {/* {selectedState && (
          <select
            value={selectedCity}
            name="city"
            onChange={handleChangeCityValue}
            className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 animate-in fade-in slide-in-from-top-1 duration-300"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        )} */}
      </div>

      {/* Property Info */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Property Name"
          name="propertyName"
          value={sellProperty.propertyName}
          onChange={handleChangeValue}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />

        <textarea
          placeholder="Complete Address"
          name="address"
          value={sellProperty.address}
          onChange={handleChangeValue}
          rows={3}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none resize-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      </div>
    </div>
  );
};

export default LocationCategoryMobile;
