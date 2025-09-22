import React, { useEffect, useState } from "react";
import AdminInsightsSidebar from "../components/AdminInsightsSidebar";
import { Link } from "react-router-dom";

const SLUG_PREFIX = "insights-price-trends";

export default function InsightsPriceTrendsBanners() {
  // Existing banner states
  const [hero, setHero] = useState([]);
  const [small, setSmall] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "", link: "", order: 0, desktopFile: null, mobileFile: null });

  // New price trends states
  const [activeTab, setActiveTab] = useState('ncr');
  const [cityData, setCityData] = useState({
    ncr: [],
    metro: [],
    other: []
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const [localityData, setLocalityData] = useState([]);
  const [priceTrendsData, setPriceTrendsData] = useState([]);
  const [showAllData, setShowAllData] = useState(false);

  // Form states for adding/editing data
  const [showCityForm, setShowCityForm] = useState(false);
  const [showPriceTrendsForm, setShowPriceTrendsForm] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [editingPriceTrend, setEditingPriceTrend] = useState(null);

  // City form state
  const [cityForm, setCityForm] = useState({
    name: '',
    category: 'ncr',
    banner: '',
    localities: ''
  });

  // Price trends form state
  const [priceTrendsForm, setPriceTrendsForm] = useState({
    area: '',
    price: '',
    rental: '',
    trend: ''
  });

  const token = localStorage.getItem("myToken");

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        // Load cities data
        const citiesResponse = await fetch(`${base}/api/admin/cities`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();
          const citiesByCategory = { ncr: [], metro: [], other: [] };
          citiesData.data.forEach(city => {
            if (citiesByCategory[city.category]) {
              citiesByCategory[city.category].push({
                id: city._id,
                name: city.name,
                banner: city.banner,
                localities: city.localities || []
              });
            }
          });
          setCityData(citiesByCategory);
        }

        // Load price trends data
        const priceTrendsResponse = await fetch(`${base}/api/admin/price-trends`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (priceTrendsResponse.ok) {
          const priceTrendsData = await priceTrendsResponse.json();
          setPriceTrendsData(priceTrendsData.data.map(trend => ({
            id: trend._id,
            area: trend.area,
            price: trend.price,
            rental: trend.rental,
            trend: trend.trend
          })));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Load data from API
  const loadDataFromAPI = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

      // Load cities data
      const citiesResponse = await fetch(`${base}/api/admin/cities`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (citiesResponse.ok) {
        const citiesData = await citiesResponse.json();
        const citiesByCategory = { ncr: [], metro: [], other: [] };
        citiesData.data.forEach(city => {
          if (citiesByCategory[city.category]) {
            citiesByCategory[city.category].push({
              id: city._id,
              name: city.name,
              banner: city.banner,
              localities: city.localities || []
            });
          }
        });
        setCityData(citiesByCategory);
      }

      // Load price trends data
      const priceTrendsResponse = await fetch(`${base}/api/admin/price-trends`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (priceTrendsResponse.ok) {
        const priceTrendsData = await priceTrendsResponse.json();
        setPriceTrendsData(priceTrendsData.data.map(trend => ({
          id: trend._id,
          area: trend.area,
          price: trend.price,
          rental: trend.rental,
          trend: trend.trend
        })));
      }
    } catch (error) {
      console.error('Error loading data from API:', error);
    }
  };

  const addCity = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${base}/api/admin/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: cityForm.name,
          category: cityForm.category,
          banner: cityForm.banner,
          localities: cityForm.localities
        })
      });

      if (response.ok) {
        const result = await response.json();
        await loadDataFromAPI();
        resetCityForm();
        setShowCityForm(false);
      } else {
        alert('Failed to add city');
      }
    } catch (error) {
      console.error('Error adding city:', error);
      alert('Error adding city');
    }
  };

  const editCity = async (city) => {
    setEditingCity(city);
    setCityForm({
      name: city.name,
      category: activeTab,
      banner: city.banner,
      localities: city.localities.join(', ')
    });
    setShowCityForm(true);
  };

  const updateCity = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${base}/api/admin/cities/${editingCity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: cityForm.name,
          category: cityForm.category,
          banner: cityForm.banner,
          localities: cityForm.localities
        })
      });

      if (response.ok) {
        await loadDataFromAPI();
        resetCityForm();
        setEditingCity(null);
        setShowCityForm(false);
      } else {
        alert('Failed to update city');
      }
    } catch (error) {
      console.error('Error updating city:', error);
      alert('Error updating city');
    }
  };

  const deleteCity = async (cityId) => {
    if (confirm('Delete this city?')) {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        const response = await fetch(`${base}/api/admin/cities/${cityId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          await loadDataFromAPI();
        } else {
          alert('Failed to delete city');
        }
      } catch (error) {
        console.error('Error deleting city:', error);
        alert('Error deleting city');
      }
    }
  };

  const resetCityForm = () => {
    setCityForm({
      name: '',
      category: 'ncr',
      banner: '',
      localities: ''
    });
  };

  // Price trends management functions
  const addPriceTrend = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${base}/api/admin/price-trends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          area: priceTrendsForm.area,
          price: priceTrendsForm.price,
          rental: priceTrendsForm.rental,
          trend: priceTrendsForm.trend
        })
      });

      if (response.ok) {
        await loadDataFromAPI();
        resetPriceTrendsForm();
        setShowPriceTrendsForm(false);
      } else {
        alert('Failed to add price trend');
      }
    } catch (error) {
      console.error('Error adding price trend:', error);
      alert('Error adding price trend');
    }
  };

  const editPriceTrend = async (trend) => {
    setEditingPriceTrend(trend);
    setPriceTrendsForm({
      area: trend.area,
      price: trend.price,
      rental: trend.rental,
      trend: trend.trend
    });
    setShowPriceTrendsForm(true);
  };

  const updatePriceTrend = async () => {
    try {
      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

      const response = await fetch(`${base}/api/admin/price-trends/${editingPriceTrend.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          area: priceTrendsForm.area,
          price: priceTrendsForm.price,
          rental: priceTrendsForm.rental,
          trend: priceTrendsForm.trend
        })
      });

      if (response.ok) {
        await loadDataFromAPI();
        resetPriceTrendsForm();
        setEditingPriceTrend(null);
        setShowPriceTrendsForm(false);
      } else {
        alert('Failed to update price trend');
      }
    } catch (error) {
      console.error('Error updating price trend:', error);
      alert('Error updating price trend');
    }
  };

  const deletePriceTrend = async (trendId) => {
    if (confirm('Delete this price trend entry?')) {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        const response = await fetch(`${base}/api/admin/price-trends/${trendId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          await loadDataFromAPI();
        } else {
          alert('Failed to delete price trend');
        }
      } catch (error) {
        console.error('Error deleting price trend:', error);
        alert('Error deleting price trend');
      }
    }
  };

  const resetPriceTrendsForm = () => {
    setPriceTrendsForm({
      area: '',
      price: '',
      rental: '',
      trend: ''
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const reset = () => setForm({ title: "", subtitle: "", link: "", order: 0, desktopFile: null, mobileFile: null });

  const uploadHero = async () => {
    const base = import.meta.env.VITE_API_BASE;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("slug", SLUG_PREFIX);
    fd.append("link", form.link);
    fd.append("order", String(form.order || 0));
    if (form.desktopFile) fd.append("bannerImage", form.desktopFile);
    const response = await fetch(`${base}/api/admin/insights-price-trends-banners/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const result = await response.json();
    return result;
  };

  const uploadSmall = async () => {
    const base = import.meta.env.VITE_API_BASE;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("slug", SLUG_PREFIX);
    fd.append("link", form.link);
    fd.append("order", String(form.order || 0));
    if (form.desktopFile) fd.append("desktopBannerImage", form.desktopFile);
    if (form.mobileFile) fd.append("mobileBannerImage", form.mobileFile);
    fd.append("position", "top");
    fd.append("size", "large");
    const response = await fetch(`${base}/api/admin/insights-price-trends-small-banners/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const result = await response.json();
    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const heroResult = await uploadHero();
      const smallResult = await uploadSmall();
      reset();
      await fetchAll();
      notifyBannersUpdated();
      alert("Uploaded");
    } catch {
      alert("Upload failed");
    }
  };

  const del = async (id, type) => {
    const base = import.meta.env.VITE_API_BASE;
    const url = type === 'hero'
      ? `${base}/api/admin/insights-price-trends-banners/${id}`
      : `${base}/api/admin/insights-price-trends-small-banners/${id}`;
    await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    await fetchAll();
    notifyBannersUpdated();
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setLocalityData(city.localities || []);
    // Filter price trends that match the city's localities
    const relevantTrends = priceTrendsData.filter(trend =>
      city.localities?.some(locality =>
        trend.area.toLowerCase().includes(locality.toLowerCase().split(' ')[0])
      )
    );
    setPriceTrendsData(relevantTrends.length > 0 ? relevantTrends : priceTrendsData.slice(0, 3));
    setShowAllData(false);
  };

  const handleMoreClick = () => {
    setShowAllData(!showAllData);
    if (!showAllData) {
      // Show extended data when "More" is clicked
      const extendedData = priceTrendsData.flatMap(trend => [
        trend,
        { ...trend, id: `${trend.id}_ext`, area: `${trend.area} Extended`, price: 'Updated Price', rental: 'Updated Rental' }
      ]);
      setPriceTrendsData(extendedData);
    } else {
      // Reset to original data when "Show Less" is clicked
      setPriceTrendsData(priceTrendsData);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_BASE;
      const [h, s] = await Promise.all([
        fetch(`${base}/api/admin/insights-price-trends-banners`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${base}/api/admin/insights-price-trends-small-banners`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const hj = await h.json().catch(() => ({ banners: [] }));
      const sj = await s.json().catch(() => ({ banners: [] }));
      setHero((hj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
      setSmall((sj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">IN</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Price Trends Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>
      <AdminInsightsSidebar />
      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">

        {/* Price Trends Display Section */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Price Trends & Analysis</h2>
            <p className="text-sm text-gray-600 mt-1">City-wise property price trends, rental yields, and market analysis</p>
          </div>

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
              <h3 className="text-lg font-medium text-gray-800">Cities in {activeTab === 'ncr' ? 'NCR' : activeTab === 'metro' ? 'Metro Cities' : 'Other Cities'}</h3>
              <button
                onClick={() => setShowCityForm(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                </svg>
                Add City
              </button>
            </div>
            {cityData[activeTab].length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cities added yet</h3>
                <p className="text-gray-500 mb-4">Get started by adding your first city to this category.</p>
                <button
                  onClick={() => setShowCityForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                  </svg>
                  Add Your First City
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cityData[activeTab].map((city) => (
                  <div
                    key={city.id}
                    onClick={() => handleCityClick(city)}
                    className={`cursor-pointer rounded-xl border-2 transition-all hover:shadow-md ${
                      selectedCity?.id === city.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-video bg-gray-100 rounded-t-xl flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Banner Image</span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900">{city.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{city.localities?.length || 0} localities</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); editCity(city); }}
                          className="text-xs text-indigo-600 hover:text-indigo-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteCity(city.id); }}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                trend.trend.startsWith('+')
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {trend.trend}
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
                <label className="block text-xs font-medium text-gray-600 mb-1">Banner URL</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter banner image URL"
                  value={cityForm.banner}
                  onChange={e => setCityForm({...cityForm, banner: e.target.value})}
                />
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
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="e.g., +12% or -5%"
                  value={priceTrendsForm.trend}
                  onChange={e => setPriceTrendsForm({...priceTrendsForm, trend: e.target.value})}
                />
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

        {/* Banner Upload Form */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Create banners</h2>
          </div>
          <form onSubmit={onSubmit} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="e.g. City-wide report"
                value={form.title}
                onChange={e => setForm({...form, title:e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="Short supporting text"
                value={form.subtitle}
                onChange={e => setForm({...form, subtitle:e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                placeholder="https://example.com"
                value={form.link}
                onChange={e => setForm({...form, link:e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Order</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                type="number"
                placeholder="0"
                value={form.order}
                onChange={e => setForm({...form, order:Number(e.target.value)||0})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Desktop Image (hero/small)</label>
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 text-xs text-gray-500 hover:border-indigo-300 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e => setForm({...form, desktopFile:e.target.files?.[0]||null})}/>
                {form.desktopFile ? <span className="truncate max-w-[220px]">{form.desktopFile.name}</span> : <span>Click to choose image</span>}
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Image (small)</label>
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 text-xs text-gray-500 hover:border-indigo-300 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e => setForm({...form, mobileFile:e.target.files?.[0]||null})}/>
                {form.mobileFile ? <span className="truncate max-w-[220px]">{form.mobileFile.name}</span> : <span>Click to choose image</span>}
              </label>
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                </svg>
                Upload
              </button>
              <button type="button" onClick={reset} className="px-3 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50">Reset</button>
            </div>
          </form>
        </div>

        {/* Existing Banner Lists */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Hero Banners</h3>
              {loading && <Spinner />}
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {hero.map(b => (
                <div key={b._id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5">
                  <img src={b.image?.cdn_url || b.image?.url} className="w-28 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{b.title}</div>
                    <div className="text-xs text-gray-500 truncate">{b.subtitle}</div>
                  </div>
                  <button onClick={() => { if(confirm('Delete this hero banner?')) del(b._id,'hero'); }} className="text-red-600 text-xs border border-red-200 hover:bg-red-50 rounded-lg px-2.5 py-1.5">Delete</button>
                </div>
              ))}
              {hero.length === 0 && !loading && <Empty text="No hero banners." />}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Small Banners</h3>
              {loading && <Spinner />}
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {small.map(b => (
                <div key={b._id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5">
                  <img src={b.desktopImage?.cdn_url || b.desktopImage?.url} className="w-28 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{b.title}</div>
                    <div className="text-xs text-gray-500 truncate">{b.subtitle}</div>
                  </div>
                  <button onClick={() => { if(confirm('Delete this small banner?')) del(b._id,'small'); }} className="text-red-600 text-xs border border-red-200 hover:bg-red-50 rounded-lg px-2.5 py-1.5">Delete</button>
                </div>
              ))}
              {small.length === 0 && !loading && <Empty text="No small banners." />}
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-gray-900/90 text-white px-3 py-1.5 text-xs shadow-lg">
              <Spinner light />
              Loading…
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function notifyBannersUpdated(){
  try {
    const k = 'banners:updated';
    localStorage.setItem(k, String(Date.now()));
    window.dispatchEvent(new Event(k));
  } catch {}
}

function Spinner({ light }){
  return (
    <svg className={`animate-spin ${light? 'text-white':'text-gray-400'} w-4 h-4`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );
}

function Empty({ text }){
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7z" stroke="currentColor"/></svg>
      {text}
    </div>
  );
}
