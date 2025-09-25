import React from 'react';

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
  const [showAddCityModal, setShowAddCityModal] = useState(false);

  const handleAddCityClick = () => {
    setShowAddCityModal(true);
  };

  const handleCloseModal = () => {
    setShowAddCityModal(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* City Tabs */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-4">
          {['ncr', 'metro', 'other'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab === 'ncr' ? 'Popular in NCR' : tab === 'metro' ? 'Metro Cities' : 'Other Cities'}
            </button>
          ))}
        </div>
      </div>

      {/* City Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            {activeTab === 'ncr' ? 'Popular in NCR' : activeTab === 'metro' ? 'Metro Cities' : 'Other Cities'} ({getAllCities().length})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleAddCityClick}
              className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
              </svg>
              Add City
            </button>
          </div>
        </div>
        {(() => {
          const cities = getAllCities();
          console.log('Rendering cities - cities.length:', cities.length);
          console.log('Rendering cities - cities:', cities);
          console.log('City data state:', cityData);

          if (cities.length === 0) {
            console.log('Rendering empty state - no cities');
            return (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cities added yet</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first city to any category.</p>
                <button
                  onClick={navigateToAddCity}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                  </svg>
                  Add Your First City
                </button>
              </div>
            );
          } else {
            console.log('Rendering cities grid - cities:', cities);
            return (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCityClick(city)}
                    className={`cursor-pointer rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105 bg-white ${
                      selectedCity?.id === city.id
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                      {city.banner?.url ? (
                        <img
                          src={city.banner.url}
                          alt={city.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">Image not available</div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 text-xs">
                          <div className="text-center">
                            <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <div>No Image</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (city.category || 'other') === 'ncr' ? 'bg-blue-100 text-blue-700' :
                          (city.category || 'other') === 'metro' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {(city.category || 'other').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{city.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{city.localities?.length || 0} localities</p>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); navigateToEditCity(city); }}
                          className="flex-1 text-xs text-indigo-600 hover:text-indigo-700 py-1 px-2 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteCity(city.id); }}
                          className="flex-1 text-xs text-red-600 hover:text-red-700 py-1 px-2 rounded bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        })()}
      </div>

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
