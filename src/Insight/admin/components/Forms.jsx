import React from 'react';

export default function Forms({
  showCityForm,
  setShowCityForm,
  showPriceTrendsForm,
  setShowPriceTrendsForm,
  editingCity,
  setEditingCity,
  editingPriceTrend,
  setEditingPriceTrend,
  cityForm,
  setCityForm,
  priceTrendsForm,
  setPriceTrendsForm,
  availableCities,
  addCity,
  updateCity,
  addPriceTrend,
  updatePriceTrend,
  resetCityForm,
  resetPriceTrendsForm
}) {
  return (
    <>
      {/* City Management Form */}
      {showCityForm && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingCity ? 'Edit City' : 'Add New City'}
              </h2>
              <button
                onClick={() => { setShowCityForm(false); setEditingCity(null); resetCityForm(); }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); editingCity ? updateCity() : addCity(); }} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter city name"
                value={cityForm.name}
                onChange={e => setCityForm({...cityForm, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={cityForm.category}
                onChange={e => setCityForm({...cityForm, category: e.target.value})}
              >
                <option value="ncr">NCR</option>
                <option value="metro">Metro Cities</option>
                <option value="other">Other Cities</option>

              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Banner Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
                {cityForm.bannerPreview ? (
                  <div className="mb-4">
                    <img
                      src={cityForm.bannerPreview}
                      alt="Banner preview"
                      className="max-w-full max-h-32 mx-auto rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setCityForm({
                        ...cityForm,
                        bannerFile: file,
                        bannerPreview: URL.createObjectURL(file)
                      });
                    }
                  }}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {cityForm.bannerFile ? 'Change Image' : 'Upload Image'}
                </label>
                {cityForm.bannerFile && (
                  <button
                    type="button"
                    onClick={() => setCityForm({...cityForm, bannerFile: null, bannerPreview: ''})}
                    className="ml-2 text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Upload a banner image for this city (max 5MB)</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Localities (comma separated)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter localities separated by commas (e.g., Locality 1, Locality 2, Locality 3)"
                rows={3}
                value={cityForm.localities}
                onChange={e => setCityForm({...cityForm, localities: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm shadow-sm">
                {editingCity ? 'Update City' : 'Add City'}
              </button>
              <button
                type="button"
                onClick={() => { setShowCityForm(false); setEditingCity(null); resetCityForm(); }}
                className="px-3 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Price Trends Management Form */}
      {showPriceTrendsForm && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {editingPriceTrend ? 'Edit Price Trend' : 'Add New Price Trend'}
              </h2>
              <button
                onClick={() => { setShowPriceTrendsForm(false); setEditingPriceTrend(null); resetPriceTrendsForm(); }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); editingPriceTrend ? updatePriceTrend() : addPriceTrend(); }} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Area/Locality</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Enter area or locality name"
                value={priceTrendsForm.area}
                onChange={e => setPriceTrendsForm({...priceTrendsForm, area: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={priceTrendsForm.city}
                onChange={e => setPriceTrendsForm({...priceTrendsForm, city: e.target.value})}
              >
                <option value="">Select a city...</option>
                {availableCities.map(city => (
                  <option key={city._id || city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Property Price</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="e.g., ₹25,000/sq.ft"
                value={priceTrendsForm.price}
                onChange={e => setPriceTrendsForm({...priceTrendsForm, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Rental Yield</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="e.g., ₹45/sq.ft"
                value={priceTrendsForm.rental}
                onChange={e => setPriceTrendsForm({...priceTrendsForm, rental: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Trend</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={priceTrendsForm.trend}
                onChange={e => setPriceTrendsForm({...priceTrendsForm, trend: e.target.value})}
              >
                <option value="up">📈 Up (+)</option>
                <option value="down">📉 Down (-)</option>
                <option value="stable">➡️ Stable (±)</option>
              </select>
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm shadow-sm">
                {editingPriceTrend ? 'Update' : 'Add'} Price Trend
              </button>
              <button
                type="button"
                onClick={() => { setShowPriceTrendsForm(false); setEditingPriceTrend(null); resetPriceTrendsForm(); }}
                className="px-3 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
