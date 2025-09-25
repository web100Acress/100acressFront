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
  addCity,
  updateCity,
  resetCityForm,
  onCityAdded, // Callback to refresh parent data
}) => {
  const [localities, setLocalities] = useState([
    {
      locality: '',
      zone: 'East',
      rate: '',
      change5y: '',
      yield: ''
    }
  ]);

  // Update localities when editing city changes
  useEffect(() => {
    if (editingCity && editingCity.localities && editingCity.localities.length > 0) {
      console.log('Setting localities from editing city:', editingCity.localities);
      setLocalities(editingCity.localities.map(loc => ({
        locality: loc.locality || '',
        zone: loc.zone || 'East',
        rate: loc.rate || '',
        change5y: loc.change5y || '',
        yield: loc.yield || ''
      })));
    } else if (!editingCity) {
      // Reset to default when not editing
      setLocalities([{
        locality: '',
        zone: 'East',
        rate: '',
        change5y: '',
        yield: ''
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
        yield: ''
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
          yield: parseFloat(loc.yield) || 0
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
          yield: ''
        }]);

        // Also save localities to the analytics API for PriceTrends
        try {
          const analyticsPromises = localitiesData.map(async (locality) => {
            const analyticsData = {
              city: cityForm.name,
              locality: locality.locality,
              zone: locality.zone,
              rate: locality.rate,
              change5y: locality.change5y,
              yield: locality.yield,
              type: 'Apartment' // Default type
            };

            console.log('Saving to analytics API:', analyticsData);

            const analyticsResponse = await fetch(`${base}/analytics/price-trends/localities`, {
              method: editingCity ? 'PUT' : 'POST', // Use PUT for updates, POST for new
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(analyticsData)
            });

            if (analyticsResponse.ok) {
              console.log('Analytics locality saved successfully:', locality.locality);
            } else {
              console.error('Failed to save analytics locality:', locality.locality, analyticsResponse.status);
            }
          });

          // Wait for all analytics saves to complete
          await Promise.all(analyticsPromises);
          console.log('All localities saved to analytics API');
        } catch (analyticsError) {
          console.error('Error saving to analytics API:', analyticsError);
          // Don't fail the whole operation if analytics save fails
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

  return (
    <>
      {showCityForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
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
                      yield: ''
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
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter city name"
                      value={cityForm.name}
                      onChange={e => setCityForm({ ...cityForm, name: e.target.value })}
                      required
                    />
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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
                      yield: ''
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
    bannerFile: null,
    bannerPreview: '',
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch cities from API
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

  const resetCityForm = () => {
    setCityForm({
      name: '',
      category: 'ncr', // Always use valid category
      bannerFile: null,
      bannerPreview: '',
    });
  };

  // Load cities on component mount
  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100 min-h-screen">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="container mx-auto p-4 md:p-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">City Management</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchCities}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg shadow-sm"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
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

        {/* --- */}

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
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => {
                          setEditingCity(city);
                          setCityForm({
                            name: city.name,
                            category: city.category,
                            bannerFile: null, // We don't have the file, just the preview
                            bannerPreview: city.banner?.url || '',
                          });
                          setShowCityForm(true);
                        }}
                        className="text-gray-500 hover:text-indigo-600 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
          addCity={addCity}
          updateCity={updateCity}
          resetCityForm={resetCityForm}
          onCityAdded={fetchCities} // Pass the refresh function
        />

      </div>
    </div>
  );
}
