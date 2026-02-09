import React, { useEffect, useState, useMemo } from 'react';
import PriceTrendsCityPicker from './Citypeaker/PriceTrendsCityPicker';

export default function PriceTrendsCityPickerContainer() {
  const [cities, setCities] = useState([]);
  const [cityImages, setCityImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Compare mode state
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cityQuery, setCityQuery] = useState('');

  // Fetch cities and city images on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

      // Fetch cities data
      const citiesResponse = await fetch(`${base}/api/cities/active`);
      if (!citiesResponse.ok) {
        throw new Error('Failed to fetch cities');
      }
      const citiesData = await citiesResponse.json();

      // Set cities (extract city names from the data)
      const cityNames = citiesData.data?.map(city => city.name) || [];
      setCities(cityNames);

      // Create city images mapping from banner URLs
      const imagesMap = {};
      citiesData.data?.forEach(city => {
        if (city.banner) {
          imagesMap[city.name] = city.banner;
        }
      });
      setCityImages(imagesMap);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter cities based on search query
  const visibleCities = useMemo(() => {
    if (!cityQuery.trim()) {
      return cities;
    }
    return cities.filter(city =>
      city.toLowerCase().includes(cityQuery.toLowerCase())
    );
  }, [cities, cityQuery]);

  const handleChooseCity = (cityName, isCompareMode) => {
    if (isCompareMode) {
      // Handle compare mode - this would navigate to comparison page
      console.log('Compare cities:', selectedCities);
      // You can implement navigation to comparison page here
    } else {
      // Handle single city selection - navigate to city details
      console.log('Selected city:', cityName);
      // You can implement navigation to city details page here
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">Error loading cities</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <PriceTrendsCityPicker
      compareMode={compareMode}
      setCompareMode={setCompareMode}
      selectedCities={selectedCities}
      setSelectedCities={setSelectedCities}
      cityQuery={cityQuery}
      setCityQuery={setCityQuery}
      visibleCities={visibleCities}
      cityImages={cityImages}
      pickerLoading={loading}
      onChooseCity={handleChooseCity}
    />
  );
}
