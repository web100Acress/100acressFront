import React, { useEffect, useState } from 'react';

// This is the corrected and complete Forms component
// It handles all the form logic for adding and updating cities and price trends.
const Forms = ({
  showCityForm,
  setShowCityForm,
  editingCity,
  setEditingCity,
  cityForm,
  setCityForm,
  availableCities,
  availableBuilders, // Add availableBuilders prop
  propertyTypeOptions, // Add propertyTypeOptions prop
  addCity,
  updateCity,
  resetCityForm,
  onCityAdded, // Callback to refresh parent data

  // Price Trends Props
  showPriceTrendForm,
  setShowPriceTrendForm,
  editingPriceTrend,
  setEditingPriceTrend,
  priceTrendForm,
  setPriceTrendForm,
  addPriceTrend,
  updatePriceTrend,
  resetPriceTrendForm,
  onPriceTrendAdded,
  availableCitiesForTrends, // Dynamic city list for price trends
}) => {
  const [localities, setLocalities] = useState([
    {
      locality: '',
      zone: 'East',
      rate: '',
      change5y: '',
      yield: '',
      projectUrl: ''
    }
  ]);

  // Update localities when editing city changes
  useEffect(() => {
    if (editingCity && editingCity.localities && editingCity.localities.length > 0) {
      console.log('Setting localities from editing city:', editingCity.localities);
      console.log('Editing city full data:', editingCity);
      setLocalities(editingCity.localities.map(loc => ({
        locality: loc.locality || '',
        zone: loc.zone || 'East',
        rate: String(loc.rate || ''),
        change5y: String(loc.change5y || ''),
        yield: String(loc.yield || ''),
        projectUrl: loc.projectUrl || ''
      })));
    } else if (!editingCity) {
      // Reset to default when not editing
      setLocalities([{
        locality: '',
        zone: 'East',
        rate: '',
        change5y: '',
        yield: '',
        projectUrl: ''
      }]);
    }
  }, [editingCity]);

  // Also validate and set category when editing city changes
  useEffect(() => {
    if (editingCity) {
      console.log('Editing city category:', editingCity.category);
      console.log('Editing city category type:', typeof editingCity.category);

      // Validate category
      const validCategories = ['ncr', 'metro', 'other'];
      const validCategory = validCategories.includes(editingCity.category) ? editingCity.category : 'ncr';

      console.log('Setting valid category:', validCategory);

      setCityForm(prev => ({
        ...prev,
        name: editingCity.name || '',
        category: validCategory,
        bannerFile: null,
        bannerPreview: editingCity.banner?.url || ''
      }));
    }
  }, [editingCity]);

  const addLocality = () => {
    setLocalities([
      ...localities,
      {
        locality: '',
        zone: 'East',
        rate: '',
        change5y: '',
        yield: '',
        projectUrl: ''
      }
    ]);
  };

  const updateLocality = (index, field, value) => {
    const updatedLocalities = [...localities];
    updatedLocalities[index][field] = value;
    setLocalities(updatedLocalities);
  };

  const removeLocality = (index) => {
    if (localities.length > 1) {
      setLocalities(localities.filter((_, i) => i !== index));
    }
  };

  const handleCitySubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      // Prepare localities data
      const localitiesData = localities
        .filter(loc => loc.locality.trim() !== '')
        .map(loc => ({
          locality: loc.locality,
          zone: loc.zone,
          rate: parseFloat(loc.rate) || 0,
          change5y: parseFloat(loc.change5y) || 0,
          yield: parseFloat(loc.yield) || 0,
          projectUrl: loc.projectUrl || ''
        }));

      console.log('Form data before sending:');
      console.log('Name:', cityForm.name);
      console.log('Category:', cityForm.category);
      console.log('Category type:', typeof cityForm.category);
      console.log('Localities:', localitiesData);

      // Validate category before sending
      const validCategories = ['ncr', 'metro', 'other'];
      const category = validCategories.includes(cityForm.category) ? cityForm.category : 'ncr';

      console.log('Final category being sent:', category);

      const formData = new FormData();
      formData.append('name', cityForm.name);
      formData.append('category', category); // Use validated category
      formData.append('localities', JSON.stringify(localitiesData));

      if (cityForm.bannerFile) {
        formData.append('bannerImage', cityForm.bannerFile);
      }

      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const url = editingCity
        ? `${base}/api/admin/cities/${editingCity.id}`
        : `${base}/api/admin/cities`;

      const response = await fetch(url, {
        method: editingCity ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('City saved successfully:', result);
        console.log('Full API response:', result);

        alert(editingCity ? 'City updated successfully!' : 'City added successfully!');

        // Reset form
        setShowCityForm(false);
        setEditingCity(null);
        resetCityForm();
        setLocalities([{
          locality: '',
          zone: 'East',
          rate: '',
          change5y: '',
          yield: '',
          projectUrl: ''
        }]);

        // Notify parent to refresh data
        if (onCityAdded) onCityAdded();

        // Also trigger a global refresh for other components that might be using city data
        try {
          // Dispatch a custom event that other components can listen to
          window.dispatchEvent(new CustomEvent('cityDataChanged', {
            detail: { action: 'refresh' }
          }));

          // If we're in the insights page, trigger a page refresh after a short delay
          if (window.location.pathname.includes('insights-price-trends') ||
              window.location.pathname.includes('admin')) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (e) {
          console.log('Could not dispatch global refresh event:', e);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to save city:', errorData);
        console.error('Error response:', errorData);
        alert(`Failed to save city: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving city:', error);
      alert('Error saving city. Check console for details.');
    }
  };

  // Price Trends Form Handlers
  const handlePriceTrendSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      console.log('Price trend form data:', priceTrendForm);

      const priceTrendData = {
        area: priceTrendForm.area,
        price: priceTrendForm.price,
        rental: priceTrendForm.rental,
        trend: priceTrendForm.trend,
        city: priceTrendForm.city,
        type: priceTrendForm.type || 'Apartment'
      };

      console.log('Sending price trend data:', priceTrendData);

      const url = editingPriceTrend
        ? `${base}/api/admin/price-trends/${editingPriceTrend.id}`
        : `${base}/api/admin/price-trends`;

      const response = await fetch(url, {
        method: editingPriceTrend ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(priceTrendData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Price trend saved successfully:', result);

        alert(editingPriceTrend ? 'Price trend updated successfully!' : 'Price trend added successfully!');

        // Reset form
        setShowPriceTrendForm(false);
        setEditingPriceTrend(null);
        resetPriceTrendForm();

        // Notify parent to refresh data
        if (onPriceTrendAdded) onPriceTrendAdded();

        // Trigger global refresh
        window.dispatchEvent(new CustomEvent('priceTrendDataChanged', {
          detail: { action: 'refresh' }
        }));

      } else {
        const errorData = await response.json();
        console.error('Failed to save price trend:', errorData);
        alert(`Failed to save price trend: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving price trend:', error);
      alert('Error saving price trend. Check console for details.');
    }
  };
  return (
    <>
      {/* City Form Modal */}
      {showCityForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-slate-200/50">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingCity ? 'Edit City with Price Trends' : 'Add New City with Price Trends'}
                </h2>
                <button
                  onClick={() => {
                    setShowCityForm(false);
                    setEditingCity(null);
                    resetCityForm();
                    setLocalities([{
                      locality: '',
                      zone: 'East',
                      rate: '',
                      change5y: '',
                      yield: '',
                      projectUrl: ''
                    }]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleCitySubmit} className="p-6 space-y-6">
              {/* City Basic Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4">City Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={cityForm.name}
                      onChange={e => setCityForm({ ...cityForm, name: e.target.value })}
                      required
                    >
                      <option value="">Select City</option>
                      {availableCitiesForTrends.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Builder Name</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={cityForm.builder || ''}
                      onChange={e => setCityForm({ ...cityForm, builder: e.target.value })}
                    >
                      <option value="">Select Builder (Optional)</option>
                      {availableBuilders.map(builder => (
                        <option key={builder} value={builder}>{builder}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={cityForm.propertyType || ''}
                      onChange={e => setCityForm({ ...cityForm, propertyType: e.target.value })}
                    >
                      <option value="">Select Property Type (Optional)</option>
                      {propertyTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={cityForm.category}
                      onChange={e => setCityForm({ ...cityForm, category: e.target.value })}
                    >
                      <option value="ncr">Popular in NCR</option>
                      <option value="metro">Metro Cities</option>
                      <option value="other">Other Cities</option>
                    </select>
                  </div>
                </div>

                {/* Banner Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
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
                        onClick={() => setCityForm({ ...cityForm, bannerFile: null, bannerPreview: '' })}
                        className="ml-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Upload a banner image for this city (max 5MB)</p>
                </div>
              </div>

              {/* Price Trends Data */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-semibold text-gray-800">Price Trends Data</h3>
                  <button
                    type="button"
                    onClick={addLocality}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Locality
                  </button>
                </div>
                <div className="space-y-4">
                  {localities.map((locality, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700">Locality {index + 1}</h4>
                        {localities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLocality(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Locality Name</label>
                          <input
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter locality"
                            value={locality.locality}
                            onChange={e => updateLocality(index, 'locality', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Zone</label>
                          <select
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={locality.zone}
                            onChange={e => updateLocality(index, 'zone', e.target.value)}
                          >
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="Central">Central</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Rate (₹/sq.ft)</label>
                          <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="15000"
                            value={locality.rate}
                            onChange={e => updateLocality(index, 'rate', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">5Y Change (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="12.5"
                            value={locality.change5y}
                            onChange={e => updateLocality(index, 'change5y', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Yield (%)</label>
                          <input
                            type="number"
                            step="0.1"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="3.2"
                            value={locality.yield}
                            onChange={e => updateLocality(index, 'yield', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Project URL</label>
                          <input
                            type="url"
                            className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="https://example.com/project"
                            value={locality.projectUrl}
                            onChange={e => updateLocality(index, 'projectUrl', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingCity ? 'Update City & Price Trends' : 'Add City & Price Trends'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCityForm(false);
                    setEditingCity(null);
                    resetCityForm();
                    setLocalities([{
                      locality: '',
                      zone: 'East',
                      rate: '',
                      change5y: '',
                      yield: '',
                      projectUrl: ''
                    }]);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Price Trends Form Modal */}
      {showPriceTrendForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {editingPriceTrend ? 'Edit Price Trend' : 'Add New Price Trend'}
                </h2>
                <button
                  onClick={() => {
                    setShowPriceTrendForm(false);
                    setEditingPriceTrend(null);
                    resetPriceTrendForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handlePriceTrendSubmit} className="p-6 space-y-6">
            
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-4">Price Trend Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area/Locality</label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter area or locality name"
                      value={priceTrendForm.area}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, area: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={priceTrendForm.city}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, city: e.target.value })}
                      required
                    >
                      <option value="">Select City</option>
                      {availableCitiesForTrends.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹/sq.ft)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="15000"
                      value={priceTrendForm.price}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rental Yield (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="3.2"
                      value={priceTrendForm.rental}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, rental: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trend</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={priceTrendForm.trend}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, trend: e.target.value })}
                      required
                    >
                      <option value="up">📈 Up</option>
                      <option value="down">📉 Down</option>
                      <option value="stable">➡️ Stable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={priceTrendForm.type}
                      onChange={e => setPriceTrendForm({ ...priceTrendForm, type: e.target.value })}
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                </div>
              </div>

        
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingPriceTrend ? 'Update Price Trend' : 'Add Price Trend'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPriceTrendForm(false);
                    setEditingPriceTrend(null);
                    resetPriceTrendForm();
                  }}
                  className="px-4 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// This is the main App component that shows the city list and uses the Forms component.
export default function App() {
  const [showCityForm, setShowCityForm] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [cityForm, setCityForm] = useState({
    name: '',
    category: 'ncr', // Ensure default valid category
    builder: '', // Add builder field
    propertyType: '', // Add property type field
    bannerFile: null,
    bannerPreview: '',
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableBuilders, setAvailableBuilders] = useState([]);
  const [availableCitiesForTrends, setAvailableCitiesForTrends] = useState([]);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState([]);

  // Function to fetch builders from projects data (same as Projects.jsx)
  const fetchBuilders = async () => {
    try {
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      // Fetch projects data to get builders (same as Projects.jsx)
      const response = await fetch(`${base}/project/viewAll/data?sort=-createdAt`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Projects API response for builders:', result);

        // Extract unique builder names from projects data (same logic as Projects.jsx)
        const projects = Array.isArray(result?.data) ? result.data : (Array.isArray(result) ? result : []);
        const builderNames = new Set();

        projects.forEach(project => {
          if (project?.builderName) {
            builderNames.add(project.builderName);
          }
        });

        // Convert to array and sort alphabetically
        const sortedBuilders = Array.from(builderNames).sort();
        console.log('Available builders from projects:', sortedBuilders);

        setAvailableBuilders(sortedBuilders);
      } else {
        console.error('Failed to fetch projects for builders');
        // Fallback to empty list if API fails
        setAvailableBuilders([]);
      }
    } catch (error) {
      console.error('Error fetching projects for builders:', error);
      setAvailableBuilders([]);
    }
  };

  // Function to fetch property types from projects data (same as Projects.jsx)
  const fetchPropertyTypes = async () => {
    try {
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      // Fetch projects data to get property types (same as Projects.jsx)
      const response = await fetch(`${base}/project/viewAll/data?sort=-createdAt`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Projects API response for property types:', result);

        // Extract unique property types from projects data (same logic as Projects.jsx)
        const projects = Array.isArray(result?.data) ? result.data : (Array.isArray(result) ? result : []);
        const propertyTypes = new Set();

        projects.forEach(project => {
          if (project?.type) {
            propertyTypes.add(project.type);
          }
        });

        // Convert to array and sort alphabetically
        const sortedTypes = Array.from(propertyTypes).sort();
        console.log('Available property types from projects:', sortedTypes);

        setPropertyTypeOptions(sortedTypes);
      } else {
        console.error('Failed to fetch projects for property types');
        // Fallback to hardcoded list if API fails
        setPropertyTypeOptions(['Apartment', 'Villa', 'Plot', 'Commercial', 'Office']);
      }
    } catch (error) {
      console.error('Error fetching projects for property types:', error);
      // Fallback to hardcoded list if API fails
      setPropertyTypeOptions(['Apartment', 'Villa', 'Plot', 'Commercial', 'Office']);
    }
  };
  const [showPriceTrendForm, setShowPriceTrendForm] = useState(false);
  const [editingPriceTrend, setEditingPriceTrend] = useState(null);
  const [priceTrendForm, setPriceTrendForm] = useState({
    area: '',
    price: '',
    rental: '',
    trend: 'stable',
    city: '',
    type: 'Apartment'
  });

  // Function to fetch cities for price trends dropdown
  const fetchCitiesForTrends = async () => {
    try {
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      // Fetch projects data to get cities (same as Projects.jsx)
      const response = await fetch(`${base}/project/viewAll/data?sort=-createdAt`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Projects API response for cities:', result);

        // Extract unique city names from projects data (same logic as Projects.jsx)
        const projects = Array.isArray(result?.data) ? result.data : (Array.isArray(result) ? result : []);
        const cityNames = new Set();

        projects.forEach(project => {
          if (project?.city) {
            cityNames.add(project.city);
          }
        });

        // Convert to array and sort alphabetically
        const sortedCities = Array.from(cityNames).sort();
        console.log('Available cities from projects:', sortedCities);

        setAvailableCitiesForTrends(sortedCities);
      } else {
        console.error('Failed to fetch projects for cities');
        // Fallback to hardcoded list if API fails
        setAvailableCitiesForTrends([
          'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad',
          'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'
        ]);
      }
    } catch (error) {
      console.error('Error fetching projects for cities:', error);
      // Fallback to hardcoded list if API fails
      setAvailableCitiesForTrends([
        'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad',
        'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'
      ]);
    }
  };
  const fetchCities = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('myToken');
      const base = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${base}/api/admin/cities`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API Response for cities:', result);
        console.log('Raw result.data:', result.data);

        // Transform the API response to match the expected format
        const categories = Object.entries(result.data).map(([categoryName, cities]) => ({
          id: categoryName,
          name: categoryName === 'ncr' ? 'Popular in NCR' :
                categoryName === 'metro' ? 'Metro Cities' : 'Other Cities',
          color: categoryName === 'ncr' ? '#3B82F6' :
                 categoryName === 'metro' ? '#10B981' : '#8B5CF6',
          cities: cities // Pass full city objects instead of just names
        }));

        console.log('Transformed categories:', categories);
        const allCities = categories.flatMap(category => category.cities || []);
        console.log('All cities flattened:', allCities);

        setCities(allCities);
      } else {
        console.error('Failed to fetch cities:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new city (placeholder - API call is handled in Forms component)
  const addCity = (newCity) => {
    console.log("New City Added:", newCity);
  };

  // Function to update an existing city (placeholder - API call is handled in Forms component)
  const updateCity = (updatedCity) => {
    console.log("City Updated:", updatedCity);
  };

  // Function to delete a city
  const deleteCity = async (cityId) => {
    if (window.confirm('Are you sure you want to delete this city? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('myToken');
        const base = import.meta.env.VITE_API_BASE;

        const response = await fetch(`${base}/api/admin/cities/${cityId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          console.log('City deleted successfully');
          fetchCities(); // Refresh the list
        } else {
          console.error('Failed to delete city');
          alert('Failed to delete city. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting city:', error);
        alert('Error deleting city. Check console for details.');
      }
    }
  };

  const resetCityForm = () => {
    setCityForm({
      name: '',
      category: 'ncr', // Always use valid category
      builder: '', // Reset builder field
      propertyType: '', // Reset property type field
      bannerFile: null,
      bannerPreview: '',
    });
  };

  // Price Trends Functions
  const addPriceTrend = (newPriceTrend) => {
    console.log("New Price Trend Added:", newPriceTrend);
  };

  const updatePriceTrend = (updatedPriceTrend) => {
    console.log("Price Trend Updated:", updatedPriceTrend);
  };

  const resetPriceTrendForm = () => {
    setPriceTrendForm({
      area: '',
      price: '',
      rental: '',
      trend: 'stable',
      city: '',
      type: 'Apartment'
    });
  };

  const onPriceTrendAdded = () => {
    console.log("Price trend added, refreshing data...");
    // Could add refresh logic here if needed
  };

  // Load cities and builders on component mount
  useEffect(() => {
    fetchCities();
    fetchCitiesForTrends();
    fetchBuilders();
    fetchPropertyTypes();
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="container mx-auto p-4 md:p-8">
        <header className="flex items-center justify-between mb-8">
          {/* <h1 className="text-3xl font-bold">City Management</h1> */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={fetchCities}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg shadow-sm"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button> */}
            <button
              onClick={() => {
                setShowCityForm(true);
                setEditingCity(null);
                resetCityForm();
              }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New City
            </button>
          </div>
        </header>

        {/* City List Display Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              All Cities ({cities.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-12">
              <svg className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-lg">Loading cities...</p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
              <p className="text-lg">No cities found.</p>
              <p className="text-sm mt-2">Add a new city to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map(city => {
                console.log('Rendering city:', city);
                console.log('City localities:', city.localities);
                return (
                  <div key={city.id} className="relative bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    {city.bannerPreview && (
                      <img src={city.bannerPreview} alt={`${city.name} banner`} className="w-full h-32 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800">{city.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{city.category}</p>
                      <p className="text-xs text-gray-400 mt-2">{city.localities?.length || 0} Localities</p>
                      {city.localities && city.localities.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-600">Localities:</p>
                          <ul className="text-xs text-gray-500">
                            {city.localities.slice(0, 3).map((loc, idx) => (
                              <li key={idx}>{loc.locality} - ₹{loc.rate}/sq.ft</li>
                            ))}
                            {city.localities.length > 3 && (
                              <li>...and {city.localities.length - 3} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => {
                          console.log('Edit button clicked for city:', city);
                          console.log('City localities:', city.localities);
                          setEditingCity(city);
                          setCityForm({
                            name: city.name,
                            category: city.category,
                            bannerFile: null, // We don't have the file, just the preview
                            bannerPreview: city.banner?.url || '',
                          });
                          setShowCityForm(true);
                        }}
                        className="text-gray-500 hover:text-indigo-600 p-2 rounded bg-white/80 hover:bg-white transition-colors"
                        title="Edit City"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteCity(city.id)}
                        className="text-gray-500 hover:text-red-600 p-2 rounded bg-white/80 hover:bg-white transition-colors"
                        title="Delete City"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Render the Forms component as a modal */}
        <Forms
          showCityForm={showCityForm}
          setShowCityForm={setShowCityForm}
          editingCity={editingCity}
          setEditingCity={setEditingCity}
          cityForm={cityForm}
          setCityForm={setCityForm}
          availableCities={cities} // Pass the cities state to the form
          availableBuilders={availableBuilders} // Pass the builders state to the form
          propertyTypeOptions={propertyTypeOptions} // Pass the property type options to the form
          addCity={addCity}
          updateCity={updateCity}
          resetCityForm={resetCityForm}
          onCityAdded={fetchCities} // Pass the refresh function

          // Price Trends Props
          showPriceTrendForm={showPriceTrendForm}
          setShowPriceTrendForm={setShowPriceTrendForm}
          editingPriceTrend={editingPriceTrend}
          setEditingPriceTrend={setEditingPriceTrend}
          priceTrendForm={priceTrendForm}
          setPriceTrendForm={setPriceTrendForm}
          addPriceTrend={addPriceTrend}
          updatePriceTrend={updatePriceTrend}
          resetPriceTrendForm={resetPriceTrendForm}
          onPriceTrendAdded={onPriceTrendAdded}
          availableCitiesForTrends={availableCitiesForTrends} // Pass dynamic city list for price trends
        />

      </div>
    </div>
  );
}
