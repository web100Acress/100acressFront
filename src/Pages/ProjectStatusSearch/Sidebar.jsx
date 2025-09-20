import React from 'react';

export default function Sidebar({ 
  filters = {},
  onFilterChange,
  onSearch,
  view,
  setView,
  sort,
  setSort
}) {
  const filterOptions = {
    city: [
      { value: '', label: 'All Cities' },
      { value: 'Gurugram', label: 'Gurugram' },
      { value: 'Noida', label: 'Noida' },
      { value: 'Delhi', label: 'Delhi' },
      { value: 'Goa', label: 'Goa' },
      { value: 'Ayodhya', label: 'Ayodhya' },
      { value: 'Mumbai', label: 'Mumbai' },
      { value: 'Panchkula', label: 'Panchkula' },
      { value: 'Kasauli', label: 'Kasauli' },
      { value: 'Dubai', label: 'Dubai' },
    ],
    projectType: [
      { value: '', label: 'All Types' },
      { value: 'Commercial Property', label: 'Commercial Property' },
      { value: 'Residential Flats', label: 'Residential Flats' },
      { value: 'SCO Plots', label: 'SCO Plots' },
      { value: 'Deen Dayal Plots', label: 'Deen Dayal Plots' },
      { value: 'Residential Plots', label: 'Residential Plots' },
      { value: 'Independent Floors', label: 'Independent Floors' },
      { value: 'Builder Floors', label: 'Builder Floors' },
      { value: 'Affordable Homes', label: 'Affordable Homes' },
      { value: 'Villas', label: 'Villas' },
      { value: 'Farm Houses', label: 'Farm House' },
    ],
    price: [
      { value: '', label: 'All Prices' },
      { value: '0,1', label: 'Under 1 Cr' },
      { value: '1,5', label: '1 to 5 Cr' },
      { value: '5,10', label: '5 to 10 Cr' },
      { value: '10,20', label: '10 to 20 Cr' },
      { value: '20,50', label: '20 to 50 Cr' },
      { value: '50,Infinity', label: 'Above 50 Cr' },
    ]
  };

  const sorts = [
    { key: 'price', label: 'Price' },
    { key: 'newest', label: 'Newest' },
    { key: 'name', label: 'Name' },
  ];

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 h-screen overflow-y-auto sticky top-0 z-10 m-4">
      <div className="p-6">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">100</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Search & Filter</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Find your perfect property with our comprehensive search and filter options. 
            Discover the best projects in Gurgaon with modern amenities and great locations.
          </p>
        </div>
        
        {/* City Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={filters.city || ''}
            onChange={(e) => onFilterChange?.('city', e.target.value)}
          >
            {filterOptions.city.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={filters.location || ''}
            onChange={(e) => onFilterChange?.('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {/* Location options will be populated based on selected city */}
          </select>
        </div>

        {/* Project Type Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={filters.projectType || ''}
            onChange={(e) => onFilterChange?.('projectType', e.target.value)}
          >
            {filterOptions.projectType.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={filters.price || ''}
            onChange={(e) => onFilterChange?.('price', e.target.value)}
          >
            {filterOptions.price.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 text-sm font-medium text-gray-700 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={sort || 'newest'}
            onChange={(e) => setSort?.(e.target.value)}
          >
            {sorts.map(option => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">View</label>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView?.('grid')}
              className={`flex-1 p-2 rounded-md transition-all duration-200 ${view === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="Grid view"
            >
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setView?.('list')}
              className={`flex-1 p-2 rounded-md transition-all duration-200 ${view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              title="List view"
            >
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          🔎 Search Properties
        </button>

         {/* Clear Filters */}
         <button
           onClick={() => {
             onFilterChange?.('city', '');
             onFilterChange?.('location', '');
             onFilterChange?.('projectType', '');
             onFilterChange?.('price', '');
           }}
           className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
         >
           Clear All Filters
         </button>

         {/* Company Info */}
         <div className="mt-8 pt-6 border-t border-gray-200">
           <div className="space-y-2 text-sm text-gray-600">
             <div className="flex justify-between">
               <span className="font-medium">Founded:</span>
               <span>2020</span>
             </div>
             <div className="flex justify-between">
               <span className="font-medium">Headquarters:</span>
               <span>Gurugram, Haryana</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }
