import React from "react";
const ProjectSearching = () => {
  return (
    <div className="flex items-center px-14 lg:px-14 bg-gray-200 pt-3 justify-center">
    <div className="w-full lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 gap-4 pt-6 mb-4">
        <div className="relative">
          <input
            type="text"   
            className="border-[1px] border-red-500 outline-none p-2 pr-6 w-full"
            placeholder="Project"
          />
          <i className="fas fa-search text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative">
          <input
            type="text"
            className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
            placeholder="Prime Locations"
          />
          <i className="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative sm:col-span-1">
          <input
            type="text"
            className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
            placeholder="Types"
          />
          <i className="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
        <div className="relative sm:col-span-1">
          <input
            type="text"
            className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
            placeholder="Price"
          />
          <i className="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
        <button className="p-2 lg:col-span-1 bg-black text-white text-xl">
          Search
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ProjectSearching;
