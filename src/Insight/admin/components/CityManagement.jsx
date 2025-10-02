import React, { useEffect } from 'react';

export default function CityManagement({
  activeTab,
  setActiveTab,
  cityData,
  selectedCity,
  setSelectedCity,
  localityData,
  priceTrendsData,
  showAllData,
  setShowAllData,
  showPriceTrendsForm,
  setShowPriceTrendsForm,
  showCityForm,
  setShowCityForm,
  editingCity,
  setEditingCity,
  cityForm,
  setCityForm,
  availableCities,
  handleCityClick,
  handleMoreClick,
  navigateToAddCity,
  navigateToEditCity,
  deleteCity,
  addCity,
  updateCity,
  resetCityForm,
  editPriceTrend,
  deletePriceTrend
}) {
  const getAllCities = () => {
    if (!cityData || typeof cityData !== 'object') {
      console.log('City data is not available or not an object:', cityData);
      return [];
    }

    // Filter cities based on active tab
    let filteredCities = [];
    switch (activeTab) {
      case 'ncr':
        filteredCities = cityData.ncr || [];
        break;
      case 'metro':
        filteredCities = cityData.metro || [];
        break;
      case 'other':
        filteredCities = cityData.other || [];
        break;
      default:
        // If no specific tab, return all cities
        filteredCities = Object.values(cityData).flat();
    }

    console.log('Filtered cities for tab:', activeTab, 'Count:', filteredCities.length);
    return filteredCities;
  };

  // Listen for global city data refresh events
  useEffect(() => {
    const handleCityDataChanged = (event) => {
      console.log('CityManagement received cityDataChanged event:', event.detail);
      // The parent component should handle the actual refresh
      // This is just a notification that data might have changed
    };

    window.addEventListener('cityDataChanged', handleCityDataChanged);
    return () => {
      window.removeEventListener('cityDataChanged', handleCityDataChanged);
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
   

      {/* Selected City Details */}
      {selectedCity && (
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{selectedCity.name} - Market Analysis</h3>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Top Localities */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-800 mb-3">Top Localities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {localityData.map((locality, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-medium text-gray-900">{locality}</div>
                  <div className="text-xs text-gray-500 mt-1">Prime area</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Trends Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium text-gray-800">Price Trends & Rental Yields</h4>
              <div className="flex gap-2">
                <button
                  onClick={handleMoreClick}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  {showAllData ? 'Show Less' : 'More'} →
                </button>
                <button
                  onClick={() => setShowPriceTrendsForm(true)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                  </svg>
                  Add
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-600">Area</th>
                    <th className="text-right py-2 px-2 text-gray-600">Property Price</th>
                    <th className="text-right py-2 px-2 text-gray-600">Rental Yield</th>
                    <th className="text-right py-2 px-2 text-gray-600">Trend</th>
                    <th className="text-right py-2 px-2 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTrendsData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        <div className="text-gray-400 mb-4">
                          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-md font-medium text-gray-900 mb-2">No price trends added yet</h3>
                        <p className="text-gray-500 mb-4">Add your first price trend entry to see market data.</p>
                        <button
                          onClick={() => setShowPriceTrendsForm(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                          </svg>
                          Add Price Trend
                        </button>
                      </td>
                    </tr>
                  ) : (
                    priceTrendsData.slice(0, showAllData ? priceTrendsData.length : 6).map((trend, index) => (
                      <tr key={trend.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-2 font-medium text-gray-900">{trend.area}</td>
                        <td className="py-2 px-2 text-right text-gray-700">{trend.price}</td>
                        <td className="py-2 px-2 text-right text-gray-700">{trend.rental}</td>
                        <td className="py-2 px-2 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                            trend.trend === 'up'
                              ? 'bg-green-100 text-green-700'
                              : trend.trend === 'down'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {trend.trend === 'up' ? '📈' : trend.trend === 'down' ? '📉' : '➡️'}
                            {trend.trend === 'up' ? 'Up' : trend.trend === 'down' ? 'Down' : 'Stable'}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <div className="flex gap-1 justify-end">
                            <button
                              onClick={() => editPriceTrend(trend)}
                              className="text-xs text-indigo-600 hover:text-indigo-700"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePriceTrend(trend.id)}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}    
    </div>
  );
}
