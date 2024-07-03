import React from "react";
const ProjectSearching = () => {
  return (
<div class="flex items-center px-4 lg:px-14 bg-gray-200 pt-3 justify-center">
  <div class="w-full lg:w-full">
    <div class="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-1 sm:grid-cols-2 gap-4 pt-6 mb-4">
      <div class="relative">
        <input
          type="text"
          class="border-[1px] border-red-500 outline-none p-2 pr-6 w-full"
          placeholder="Project"
        />
        <i class="fas fa-search text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
      </div>

      <div class="relative">
        <input
          type="text"
          class="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
          placeholder="Prime Locations"
        />
        <i class="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
      </div>

      <div class="relative">
        <input
          type="text"
          class="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
          placeholder="Types"
        />
        <i class="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
      </div>

      <div class="relative lg:col-span-2">
        <input
          type="text"
          class="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
          placeholder="City"
        />
        <i class="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
      </div>

      <div class="relative">
        <input
          type="text"
          class="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
          placeholder="Price"
        />
        <i class="fas fa-chevron-down text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"></i>
      </div>

      <button class="p-2 lg:col-span-1 bg-black text-white text-xl">
        Search
      </button>
    </div>
  </div>
</div>

  
  );
};

export default ProjectSearching;
