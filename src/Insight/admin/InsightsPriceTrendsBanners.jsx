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
    const [refreshing, setRefreshing] = useState(false);

    // Form states for adding/editing data
    const [showCityForm, setShowCityForm] = useState(false);
    const [showPriceTrendsForm, setShowPriceTrendsForm] = useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const [editingPriceTrend, setEditingPriceTrend] = useState(null);

    // Price trends form state
    const [priceTrendsForm, setPriceTrendsForm] = useState({
      area: '',
      price: '',
      rental: '',
      trend: 'stable',
      city: ''
    });

    // Cities state for dropdown
    const [availableCities, setAvailableCities] = useState([]);

    // Load cities for dropdown when form opens
    const loadCitiesForDropdown = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        const citiesResponse = await fetch(`${base}/api/admin/cities`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();
          let cities = [];

          // Handle different possible response formats
          if (citiesData.success && citiesData.data) {
            if (citiesData.data.data && typeof citiesData.data.data === 'object') {
              Object.values(citiesData.data.data).forEach(categoryCities => {
                if (Array.isArray(categoryCities)) {
                  cities = cities.concat(categoryCities);
                }
              });
            } else if (Array.isArray(citiesData.data.data)) {
              cities = citiesData.data.data;
            }
          } else if (Array.isArray(citiesData.data)) {
            cities = citiesData.data;
          } else if (citiesData.data && typeof citiesData.data === 'object') {
            Object.values(citiesData.data).forEach(categoryCities => {
              if (Array.isArray(categoryCities)) {
                cities = cities.concat(categoryCities);
              }
            });
          }

          // Remove duplicates and format for dropdown
          const uniqueCities = cities.filter((city, index, self) =>
            index === self.findIndex(c => c.name === city.name)
          );

          setAvailableCities(uniqueCities);
        }
      } catch (error) {
        console.error('Error loading cities for dropdown:', error);
      }
    };

    // City form state
    const [cityForm, setCityForm] = useState({
      name: '',
      category: 'ncr',
      bannerFile: null,
      bannerPreview: '',
      localities: ''
    });

    // Navigation state
    const [viewMode, setViewMode] = useState('city-list'); // city-list, add-city, edit-city, price-trends, price-trends-form

    const token = localStorage.getItem("myToken");

    // Load data from API on component mount
    useEffect(() => {
      const loadData = async () => {
        try {
          const token = localStorage.getItem("myToken");
          const base = import.meta.env.VITE_API_BASE;

          console.log('Token:', token);
          console.log('API Base:', base);

          // Load cities data
          const citiesResponse = await fetch(`${base}/api/admin/cities`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          console.log('Cities response status:', citiesResponse.status);
          console.log('Cities response headers:', Object.fromEntries(citiesResponse.headers.entries()));

          if (citiesResponse.ok) {
            const citiesData = await citiesResponse.json();
            console.log('Cities API response:', citiesData);
            const citiesByCategory = { ncr: [], metro: [], other: [] };

            // Handle different possible response formats
            let cities = [];
            if (Array.isArray(citiesData.data)) {
              cities = citiesData.data;
              console.log('Cities data is array:', cities);
            } else if (citiesData.data && typeof citiesData.data === 'object') {
              console.log('Cities data is object:', citiesData.data);
              // If data is an object with categories (current backend format)
              Object.entries(citiesData.data).forEach(([category, categoryCities]) => {
                console.log(`Processing category ${category}:`, categoryCities);
                if (Array.isArray(categoryCities)) {
                  cities = cities.concat(categoryCities);
                }
              });
            } else if (citiesData.success && citiesData.data) {
              console.log('Cities data nested format:', citiesData.data);
              // Handle case where data might be nested differently
              cities = citiesData.data;
            } else if (Array.isArray(citiesData)) {
              console.log('Cities data is direct array:', citiesData);
              cities = citiesData;
            } else {
              console.log('Cities data unknown format, trying direct:', citiesData);
              cities = citiesData.cities || citiesData || [];
            }

            console.log('Final processed cities:', cities);

            if (!Array.isArray(cities)) {
              console.error('Cities is not an array:', cities);
              cities = [];
            }

            cities.forEach(city => {
              console.log('Processing city:', city);
              if (citiesByCategory[city.category]) {
                citiesByCategory[city.category].push({
                  id: city._id || city.id,
                  name: city.name,
                  banner: city.banner,
                  localities: city.localities || []
                });
              } else {
                console.warn(`Unknown category ${city.category} for city ${city.name}`);
              }
            });

            console.log('Final cities by category:', citiesByCategory);
            setCityData(citiesByCategory);
          } else {
            console.error('Cities API failed:', citiesResponse.status, citiesResponse.statusText);
            const errorText = await citiesResponse.text();
            console.error('Error response:', errorText);
          }

          // Load price trends data
          const priceTrendsResponse = await fetch(`${base}/api/admin/price-trends`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (priceTrendsResponse.ok) {
            const priceTrendsData = await priceTrendsResponse.json();
            console.log('Price trends API response:', priceTrendsData);
            setPriceTrendsData(priceTrendsData.data.map(trend => ({
              id: trend._id,
              area: trend.area,
              price: trend.price,
              rental: trend.rental,
              trend: trend.trend
            })));
          } else {
            console.error('Price trends API failed:', priceTrendsResponse.status);
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
            console.log('Cities API response:', citiesData);
            const citiesByCategory = { ncr: [], metro: [], other: [] };

            // Handle different possible response formats
            let cities = [];
            if (citiesData.success && citiesData.data) {
              console.log('API returned {success: true, data: ...} format');

              // If data.data is an object with categories (current backend format)
              if (citiesData.data.data && typeof citiesData.data.data === 'object') {
                console.log('Data.data is object with categories:', citiesData.data.data);
                Object.entries(citiesData.data.data).forEach(([category, categoryCities]) => {
                  console.log(`Processing category ${category}:`, categoryCities);
                  if (Array.isArray(categoryCities)) {
                    cities = cities.concat(categoryCities);
                  }
                });
              }
              // If data.data is a direct array
              else if (Array.isArray(citiesData.data.data)) {
                cities = citiesData.data.data;
                console.log('Data.data is direct array:', cities);
              }
              // If data.data is an object but not categorized
              else if (typeof citiesData.data.data === 'object') {
                cities = Object.values(citiesData.data.data).flat();
                console.log('Data.data is object, flattened:', cities);
              }
              // If data.data is something else
              else {
                cities = citiesData.data.data || [];
                console.log('Data.data fallback:', cities);
              }
            } else if (Array.isArray(citiesData.data)) {
              cities = citiesData.data;
              console.log('Cities data is array:', cities);
            } else if (citiesData.data && typeof citiesData.data === 'object') {
              console.log('Cities data is object:', citiesData.data);
              // If data is an object with categories (current backend format)
              Object.entries(citiesData.data).forEach(([category, categoryCities]) => {
                console.log(`Processing category ${category}:`, categoryCities);
                if (Array.isArray(categoryCities)) {
                  cities = cities.concat(categoryCities);
                }
              });
            } else if (Array.isArray(citiesData)) {
              console.log('Cities data is direct array:', citiesData);
              cities = citiesData;
            } else {
              console.log('Cities data unknown format, trying direct:', citiesData);
              cities = citiesData.cities || citiesData || [];
            }

            console.log('Final processed cities:', cities);

            if (!Array.isArray(cities)) {
              console.error('Cities is not an array:', cities);
              cities = [];
            }

            cities.forEach(city => {
              console.log('Processing city:', city);
              if (citiesByCategory[city.category]) {
                citiesByCategory[city.category].push({
                  id: city._id || city.id,
                  name: city.name,
                  banner: city.banner,
                  localities: city.localities || []
                });
              } else {
                console.warn(`Unknown category ${city.category} for city ${city.name}`);
              }
            });

            console.log('Final cities by category:', citiesByCategory);
            setCityData(citiesByCategory);
          } else {
            console.error('Cities API failed:', citiesResponse.status, citiesResponse.statusText);
            const errorText = await citiesResponse.text();
            console.error('Error response:', errorText);
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

        console.log('Adding city with data:', {
          name: cityForm.name,
          category: cityForm.category,
          localities: cityForm.localities,
          hasFile: !!cityForm.bannerFile
        });

        const formData = new FormData();
        formData.append('name', cityForm.name);
        formData.append('category', cityForm.category);
        formData.append('localities', cityForm.localities);

        if (cityForm.bannerFile) {
          formData.append('bannerImage', cityForm.bannerFile);
        }

        console.log('Making POST request to:', `${base}/api/admin/cities`);

        const response = await fetch(`${base}/api/admin/cities`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        console.log('Add city response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('City added successfully:', result);
          alert('City added successfully!');

          // Refresh data immediately
          console.log('Refreshing data after city addition...');
          await fetchAll();

          resetCityForm();
          setShowCityForm(false);
        } else {
          const errorData = await response.json();
          console.error('Failed to add city:', errorData);
          alert(`Failed to add city: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error adding city:', error);
        alert('Error adding city. Check console for details.');
      }
    };

    const editCity = async (city) => {
      console.log('Editing city:', city);
      console.log('City category:', city.category);

      // Ensure category has a valid value
      const validCategories = ['ncr', 'metro', 'other'];
      const category = validCategories.includes(city.category) ? city.category : 'ncr';

      setEditingCity(city);
      setCityForm({
        name: city.name || '',
        category: category,
        bannerFile: null,
        bannerPreview: city.banner?.url || '',
        localities: city.localities ? city.localities.join(', ') : ''
      });
      setShowCityForm(true);
    };

    const updateCity = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        // Validate form data
        const validCategories = ['ncr', 'metro', 'other'];
        const category = validCategories.includes(cityForm.category) ? cityForm.category : 'ncr';

        console.log('Updating city with data:', {
          name: cityForm.name,
          category: category,
          localities: cityForm.localities,
          hasFile: !!cityForm.bannerFile
        });

        const formData = new FormData();
        formData.append('name', cityForm.name || '');
        formData.append('category', category);
        formData.append('localities', cityForm.localities || '');

        if (cityForm.bannerFile) {
          formData.append('bannerImage', cityForm.bannerFile);
        }

        const response = await fetch(`${base}/api/admin/cities/${editingCity.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });

        console.log('Update city response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('City updated successfully:', result);
          alert('City updated successfully!');

          // Refresh data immediately
          console.log('Refreshing data after city update...');
          await fetchAll();

          resetCityForm();
          setEditingCity(null);
          setShowCityForm(false);
        } else {
          const errorData = await response.json();
          console.error('Failed to update city:', errorData);
          alert(`Failed to update city: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error updating city:', error);
        alert('Error updating city. Check console for details.');
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
            await fetchAll();
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
        bannerFile: null,
        bannerPreview: '',
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
            trend: priceTrendsForm.trend,
            city: priceTrendsForm.city
          })
        });

        if (response.ok) {
          await fetchAll();
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
        trend: trend.trend,
        city: trend.city || 'ncr'
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
            trend: priceTrendsForm.trend,
            city: priceTrendsForm.city
          })
        });

        if (response.ok) {
          await fetchAll();
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
            await fetchAll();
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
      const defaultCity = availableCities.length > 0 ? availableCities[0].name : '';
      setPriceTrendsForm({
        area: '',
        price: '',
        rental: '',
        trend: 'stable',
        city: defaultCity
      });
    };

    // Navigation functions
    const navigateToCityList = () => {
      setViewMode('city-list');
      setShowCityForm(false);
      setEditingCity(null);
      resetCityForm();
    };

    const navigateToAddCity = () => {
      setViewMode('add-city');
      setShowCityForm(true);
      setEditingCity(null);
      resetCityForm();
    };

    const navigateToEditCity = (city) => {
      setViewMode('edit-city');
      editCity(city);
    };

    const navigateToPriceTrends = () => {
      setViewMode('price-trends');
      setShowPriceTrendsForm(false);
      setEditingPriceTrend(null);
      resetPriceTrendsForm();
    };

    // Get all cities from all categories with debugging
    const getAllCities = () => {
      const allCities = Object.values(cityData).flat();
      console.log('getAllCities called - All cities:', allCities);
      console.log('getAllCities called - City data state:', cityData);
      console.log('getAllCities called - Object.values(cityData):', Object.values(cityData));
      console.log('getAllCities called - Flat result:', Object.values(cityData).flat());
      return allCities;
    };

    // Manual refresh function
    const handleRefresh = async () => {
      setRefreshing(true);
      console.log('Manual refresh triggered');
      await fetchAll();
      setRefreshing(false);
    };

    // Test API connection and data
    const testAPI = async () => {
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        console.log('Testing API connection...');
        console.log('Token:', token ? 'Present' : 'Missing');
        console.log('Base URL:', base);

        // Test basic connectivity
        const testResponse = await fetch(`${base}/api/admin/cities`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Test response status:', testResponse.status);
        console.log('Test response headers:', Object.fromEntries(testResponse.headers.entries()));

        if (testResponse.ok) {
          const data = await testResponse.json();
          console.log('Test API response:', data);

          // Try to extract cities from any possible format
          let cities = [];
          if (Array.isArray(data.data)) {
            cities = data.data;
            console.log('Data is array:', cities);
          } else if (data.data && typeof data.data === 'object') {
            Object.values(data.data).forEach(categoryCities => {
              if (Array.isArray(categoryCities)) {
                cities = cities.concat(categoryCities);
              }
            });
            console.log('Data is object, extracted cities:', cities);
          } else if (Array.isArray(data)) {
            cities = data;
            console.log('Direct array:', cities);
          } else if (data.cities && Array.isArray(data.cities)) {
            cities = data.cities;
            console.log('Data.cities array:', cities);
          }

          console.log('Extracted cities:', cities);
          console.log('Total cities found:', cities.length);

          if (cities.length > 0) {
            // Convert extracted cities to the format expected by the component
            const citiesByCategory = { ncr: [], metro: [], other: [] };

            cities.forEach(city => {
              console.log('Processing city for display:', city);
              console.log('City category:', city.category);
              console.log('City name:', city.name);

              if (citiesByCategory[city.category]) {
                citiesByCategory[city.category].push({
                  id: city._id || city.id,
                  name: city.name,
                  banner: city.banner,
                  localities: city.localities || []
                });
              } else {
                console.warn(`Unknown category ${city.category} for city ${city.name}`);
                // If category is not recognized, put it in 'other'
                citiesByCategory.other.push({
                  id: city._id || city.id,
                  name: city.name,
                  banner: city.banner,
                  localities: city.localities || []
                });
              }
            });

            console.log('Cities by category for display:', citiesByCategory);
            console.log('Total cities in ncr:', citiesByCategory.ncr.length);
            console.log('Total cities in metro:', citiesByCategory.metro.length);
            console.log('Total cities in other:', citiesByCategory.other.length);

            // Set the cities to the component state
            setCityData(citiesByCategory);

            alert(`API test successful! Found ${cities.length} cities. Cities are now displayed and will persist permanently.`);
          } else {
            alert('API connected but no cities found. Check console for data format.');
          }
        } else {
          const errorText = await testResponse.text();
          console.error('API test failed:', errorText);
          alert(`API test failed: ${testResponse.status} ${testResponse.statusText}`);
        }
      } catch (error) {
        console.error('API test error:', error);
        alert('API connection error. Check console for details.');
      }
    };

    // Add sample data for testing (temporary)
    const addSampleData = () => {
      const sampleCities = {
        ncr: [
          { id: '1', name: 'Delhi', category: 'ncr', banner: null, localities: ['Connaught Place', 'Karol Bagh'] },
          { id: '2', name: 'Gurgaon', category: 'ncr', banner: null, localities: ['DLF Phase 1', 'Sohna Road'] }
        ],
        metro: [
          { id: '3', name: 'Mumbai', category: 'metro', banner: null, localities: ['Bandra', 'Andheri'] }
        ],
        other: [
          { id: '4', name: 'Pune', category: 'other', banner: null, localities: ['Koregaon Park', 'Hinjawadi'] }
        ]
      };

      console.log('Adding sample data:', sampleCities);
      setCityData(sampleCities);
      console.log('Sample data added successfully');
      alert('Sample data added! Check the cities list.');
    };

    useEffect(() => {
      fetchAll();
    }, []);

    // Load cities when price trends form is opened
    useEffect(() => {
      if (showPriceTrendsForm && availableCities.length === 0) {
        loadCitiesForDropdown();
      }
    }, [showPriceTrendsForm, availableCities.length]);

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
        const token = localStorage.getItem("myToken");

        console.log('fetchAll called - Loading data from API...');

        // Load cities data (this is what we need)
        const citiesResponse = await fetch(`${base}/api/admin/cities`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();
          console.log('Cities API response:', citiesData);
          const citiesByCategory = { ncr: [], metro: [], other: [] };

          // Handle different possible response formats
          let cities = [];
          if (citiesData.success && citiesData.data) {
            console.log('API returned {success: true, data: ...} format');

            // If data.data is an object with categories (current backend format)
            if (citiesData.data.data && typeof citiesData.data.data === 'object') {
              console.log('Data.data is object with categories:', citiesData.data.data);
              Object.entries(citiesData.data.data).forEach(([category, categoryCities]) => {
                console.log(`Processing category ${category}:`, categoryCities);
                if (Array.isArray(categoryCities)) {
                  cities = cities.concat(categoryCities);
                }
              });
            }
            // If data.data is a direct array
            else if (Array.isArray(citiesData.data.data)) {
              cities = citiesData.data.data;
              console.log('Data.data is direct array:', cities);
            }
            // If data.data is an object but not categorized
            else if (typeof citiesData.data.data === 'object') {
              cities = Object.values(citiesData.data.data).flat();
              console.log('Data.data is object, flattened:', cities);
            }
            // If data.data is something else
            else {
              cities = citiesData.data.data || [];
              console.log('Data.data fallback:', cities);
            }
          } else if (Array.isArray(citiesData.data)) {
            cities = citiesData.data;
            console.log('Cities data is array:', cities);
          } else if (citiesData.data && typeof citiesData.data === 'object') {
            console.log('Cities data is object:', citiesData.data);
            // If data is an object with categories (current backend format)
            Object.entries(citiesData.data).forEach(([category, categoryCities]) => {
              console.log(`Processing category ${category}:`, categoryCities);
              if (Array.isArray(categoryCities)) {
                cities = cities.concat(categoryCities);
              }
            });
          } else if (Array.isArray(citiesData)) {
            console.log('Cities data is direct array:', citiesData);
            cities = citiesData;
          } else {
            console.log('Cities data unknown format, trying direct:', citiesData);
            cities = citiesData.cities || citiesData || [];
          }

          console.log('Final processed cities:', cities);
          console.log('Total cities found:', cities.length);

          if (!Array.isArray(cities)) {
            console.error('Cities is not an array:', cities);
            cities = [];
          }

          cities.forEach(city => {
            console.log('Processing city:', city);
            console.log('City category:', city.category);
            console.log('City name:', city.name);

            if (citiesByCategory[city.category]) {
              citiesByCategory[city.category].push({
                id: city._id || city.id,
                name: city.name,
                banner: city.banner,
                localities: city.localities || []
              });
            } else {
              console.warn(`Unknown category ${city.category} for city ${city.name}`);
              // If category is not recognized, put it in 'other'
              citiesByCategory.other.push({
                id: city._id || city.id,
                name: city.name,
                banner: city.banner,
                localities: city.localities || []
              });
            }
          });

          console.log('Final cities by category:', citiesByCategory);
          console.log('Total cities in ncr:', citiesByCategory.ncr.length);
          console.log('Total cities in metro:', citiesByCategory.metro.length);
          console.log('Total cities in other:', citiesByCategory.other.length);

          setCityData(citiesByCategory);
        } else {
          console.error('Cities API failed:', citiesResponse.status, citiesResponse.statusText);
          const errorText = await citiesResponse.text();
          console.error('Error response:', errorText);
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

        // Try to load banners data (optional, don't fail if not found)
        try {
          const [h, s] = await Promise.all([
            fetch(`${base}/api/admin/insights-price-trends-banners`, { headers: { Authorization: `Bearer ${token}` } }),
            fetch(`${base}/api/admin/insights-price-trends-small-banners`, { headers: { Authorization: `Bearer ${token}` } }),
          ]);
          const hj = await h.json().catch(() => ({ banners: [] }));
          const sj = await s.json().catch(() => ({ banners: [] }));
          setHero((hj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
          setSmall((sj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
        } catch (bannerError) {
          console.log('Banners endpoint not available, continuing without banners data');
        }
      } catch (error) {
        console.error('Error in fetchAll:', error);
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

          {/* Main Navigation Tabs */}
          <div className="mb-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => setViewMode('city-list')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'city-list' || viewMode === 'add-city' || viewMode === 'edit-city'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🏙️ City Management
                </button>
                <button
                  onClick={() => setViewMode('price-trends')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'price-trends' || viewMode === 'price-trends-form'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  📈 Price Trends
                </button>
              </div>
            </div>
          </div>

          {/* City Management Section */}
          {(viewMode === 'city-list' || viewMode === 'add-city' || viewMode === 'edit-city') && (
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
                  <h3 className="text-lg font-medium text-gray-800">All Cities ({getAllCities().length})</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={addSampleData}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      📊 Sample Data
                    </button>
                    <button
                      onClick={testAPI}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      🧪 Test API
                    </button>
                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg text-sm"
                    >
                      {refreshing ? '⟳' : '↻'} Refresh
                    </button>
                    <button
                      onClick={navigateToAddCity}
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
                                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">Image not available</div>';
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
          )}

          {/* Price Trends Section */}
          {viewMode === 'price-trends' && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Price Trends Management</h2>
                  <button
                    onClick={() => setShowPriceTrendsForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/>
                    </svg>
                    Add Price Trend
                  </button>
                </div>
              </div>
              <div className="p-4">
                {/* Price Trends Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 text-gray-600">Area</th>
                        <th className="text-left py-2 px-2 text-gray-600">City</th>
                        <th className="text-right py-2 px-2 text-gray-600">Property Price</th>
                        <th className="text-right py-2 px-2 text-gray-600">Rental Yield</th>
                        <th className="text-right py-2 px-2 text-gray-600">Trend</th>
                        <th className="text-right py-2 px-2 text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceTrendsData.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-8 text-center text-gray-500">
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
                        priceTrendsData.slice(0, showAllData ? priceTrendsData.length : 10).map((trend, index) => (
                          <tr key={trend.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-2 px-2 font-medium text-gray-900">{trend.area}</td>
                            <td className="py-2 px-2 text-gray-700">{trend.city}</td>
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
