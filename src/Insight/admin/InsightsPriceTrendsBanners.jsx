import React, { useEffect, useState } from "react";
import AdminInsightsSidebar from "../components/insightsidebar/AdminInsightsSidebar";
import { Link } from "react-router-dom";
import CityManagement from "./components/CityManagement";
// import PriceTrendsManagement from "./components/PriceTrendsManagement";
import Forms from "./components/Forms";

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

  // City form state
  const [cityForm, setCityForm] = useState({
    name: '',
    category: 'ncr',
    bannerFile: null,
    bannerPreview: '',
    localities: ''
  });

  // Navigation state
  const [viewMode, setViewMode] = useState('city-list');

  const token = localStorage.getItem("myToken");
  const base = import.meta.env.VITE_API_BASE;


  // Load data on component mount
  useEffect(() => {
    fetchAll().catch(() => {
      // If API fails, add sample data for testing
      console.log('API failed, adding sample data...');
      addSampleData();
    });
  }, []);

  // Listen for global city data refresh events
  useEffect(() => {
    const handleCityDataChanged = (event) => {
      console.log('InsightsPriceTrendsBanners received cityDataChanged event:', event.detail);
      // Refresh the data when we receive the event
      fetchAll();
    };

    window.addEventListener('cityDataChanged', handleCityDataChanged);
    return () => {
      window.removeEventListener('cityDataChanged', handleCityDataChanged);
    };
  }, []);

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

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load cities data
        const citiesResponse = await fetch(`${base}/api/admin/cities`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (citiesResponse.ok) {
          const citiesData = await citiesResponse.json();
          console.log('City API response:', citiesData);
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
        console.error('Error in fetchAll:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load cities when price trends form is opened
  useEffect(() => {
    if (showPriceTrendsForm && availableCities.length === 0) {
      loadCitiesForDropdown();
    }
  }, [showPriceTrendsForm, availableCities.length]);

  // City management functions
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

  const fetchAll = async () => {
    setLoading(true);
    try {

      const token = localStorage.getItem("myToken");
      const base = import.meta.env.VITE_API_BASE;

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

      // Load price trends data (commented out - endpoint doesn't exist)
      // const priceTrendsResponse = await fetch(`${base}/api/admin/price-trends`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (priceTrendsResponse.ok) {
      //   const priceTrendsData = await priceTrendsResponse.json();
      //   setPriceTrendsData(priceTrendsData.data.map(trend => ({
      //     id: trend._id,
      //     area: trend.area,
      //     price: trend.price,
      //     rental: trend.rental,
      //     trend: trend.trend
      //   })));
      // } else {
      //   console.error('Price trends API failed:', priceTrendsResponse.status);
      // }

      // Initialize empty price trends data since the API doesn't exist
      setPriceTrendsData([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
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
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === 'city-list' || viewMode === 'add-city' || viewMode === 'edit-city'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                🏙️ City Management
              </button>
              {/* <button
                onClick={() => setViewMode('price-trends')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === 'price-trends' || viewMode === 'price-trends-form'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                📈 Price Trends
              </button> */}
            </div>
          </div>
        </div>

        {/* City Management Section */}
        {(viewMode === 'city-list' || viewMode === 'add-city' || viewMode === 'edit-city') && (
          <CityManagement
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cityData={cityData}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            localityData={localityData}
            priceTrendsData={priceTrendsData}
            showAllData={showAllData}
            setShowAllData={setShowAllData}
            showPriceTrendsForm={showPriceTrendsForm}
            setShowPriceTrendsForm={setShowPriceTrendsForm}
            showCityForm={showCityForm}
            setShowCityForm={setShowCityForm}
            editingCity={editingCity}
            setEditingCity={setEditingCity}
            cityForm={cityForm}
            setCityForm={setCityForm}
            availableCities={availableCities}
            handleCityClick={handleCityClick}
            handleMoreClick={handleMoreClick}
            navigateToAddCity={navigateToAddCity}
            navigateToEditCity={navigateToEditCity}
            deleteCity={deleteCity}
            addCity={addCity}
            updateCity={updateCity}
            resetCityForm={resetCityForm}
            editPriceTrend={editPriceTrend}
            deletePriceTrend={deletePriceTrend}
          />
        )}

        {/* Price Trends Section */}
        {/* {viewMode === 'price-trends' && (
          <PriceTrendsManagement
            priceTrendsData={priceTrendsData}
            showAllData={showAllData}
            setShowAllData={setShowAllData}
            showPriceTrendsForm={showPriceTrendsForm}
            setShowPriceTrendsForm={setShowPriceTrendsForm}
            editPriceTrend={editPriceTrend}
            deletePriceTrend={deletePriceTrend}
          />
        )} */}

        {/* Forms */}
        <Forms
          showCityForm={showCityForm}
          setShowCityForm={setShowCityForm}
          showPriceTrendsForm={showPriceTrendsForm}
          setShowPriceTrendsForm={setShowPriceTrendsForm}
          editingCity={editingCity}
          setEditingCity={setEditingCity}
          editingPriceTrend={editingPriceTrend}
          setEditingPriceTrend={setEditingPriceTrend}
          cityForm={cityForm}
          setCityForm={setCityForm}
          priceTrendsForm={priceTrendsForm}
          setPriceTrendsForm={setPriceTrendsForm}
          availableCities={availableCities}
          addCity={addCity}
          updateCity={updateCity}
          addPriceTrend={addPriceTrend}
          updatePriceTrend={updatePriceTrend}
          resetCityForm={resetCityForm}
          resetPriceTrendsForm={resetPriceTrendsForm}
        />

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

function notifyBannersUpdated() {
  try {
    const k = 'banners:updated';
    localStorage.setItem(k, String(Date.now()));
    window.dispatchEvent(new Event(k));
  } catch { }
}

function Spinner({ light }) {
  return (
    <svg className={`animate-spin ${light ? 'text-white' : 'text-gray-400'} w-4 h-4`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );
}

