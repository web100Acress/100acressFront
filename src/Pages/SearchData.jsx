import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import api from "../config/apiClient";
import CustomSkeleton from "../Utils/CustomSkeleton";
import Footer from "../Components/Actual_Components/Footer";
import CommonInside from "../Utils/CommonInside";

const SearchData = () => {
  const location = useLocation();
  // Safely extract and parse the encoded search payload from the URL
  const encodedFormData = (location.pathname.split("/searchdata/")[1] || "").trim();
  let decodedFormData = {};
  try {
    decodedFormData = encodedFormData ? JSON.parse(decodeURIComponent(encodedFormData)) : {};
  } catch (e) {
    decodedFormData = {};
  }

  function getFormDataValues({ query, location, collectionName }) {
    return {
      key1: query,
      key2: location,
      key3: collectionName,
    };
  }

  const { key1, key2, key3 } = getFormDataValues(decodedFormData);
  // Build a clean search key. Prefer explicit text query; do not append undefined.
  const key = [
    typeof key1 === 'string' ? key1 : '',
    typeof key2 === 'string' ? key2 : ''
  ].filter(Boolean).join(' ').trim();

  localStorage.setItem("myKey", key);
  const [searchData, setSearchData] = useState([]);
  const [buySearchData, setBuySearchData] = useState([]);
  const [rentSearchData, setRentSearchData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [primeLocation, setPrimeLocation] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility
  const [fallbackLoading, setFallbackLoading] = useState(false);

  const isEmptySearch = !key1 && !key2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEmptySearch) {
          const allProjectsRes = await api.get(
            "/project/viewAll/data"
          );
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
          return;
        }

        // Always fetch from all endpoints for comprehensive search
        const [rentResult, saleResult, projectsResult] = await Promise.allSettled([
          api.get("/property/rent/viewall"),
          api.get("/property/buy/ViewAll"), // Note: capital V for buy endpoint
          api.get("/project/viewAll/data")
        ]);

        console.log('API Results:', {
          rent: rentResult,
          sale: saleResult,
          projects: projectsResult
        });

        let localRentArr = rentResult.status === "fulfilled"
          ? (rentResult.value?.data?.rentaldata || []).map((item) => ({
              ...item,
              sourceType: "rent",
              type: 'rental'
            }))
          : [];

        let localBuyArr = saleResult.status === "fulfilled"
          ? (saleResult.value?.data?.ResaleData || saleResult.value?.data?.saledata || saleResult.value?.data?.buydata || []).map((item) => ({
              ...item,
              sourceType: "buy",
              type: 'sale'
            }))
          : [];

        let localSearchArr = projectsResult.status === "fulfilled"
          ? (projectsResult.value?.data?.data || []).map((item) => ({
              projectName: item.projectName,
              project_url: item.project_url,
              frontImage: item.frontImage,
              price: item.price,
              type: item.type,
              projectAddress: item.projectAddress,
              city: item.city,
              state: item.state,
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
              sourceType: "project",
            }))
          : [];

        console.log('Processed data:', {
          rentals: localRentArr.length,
          sales: localBuyArr.length,
          projects: localSearchArr.length
        });

        // Filter results based on search term
        const searchTerm = key.toLowerCase().trim();

        if (searchTerm) {
          // Split search term into individual words for more flexible matching
          const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);

          // Helper function to calculate relevance score
          const calculateRelevance = (item, searchableText) => {
            const text = searchableText.toLowerCase();
            let score = 0;
            
            // Get property name for exact match checking (check multiple possible fields)
            const propertyName = (
              item.propertyName || 
              item.projectName || 
              item.postProperty?.propertyName || 
              ''
            ).toLowerCase();
            
            // Exact match gets highest score
            if (propertyName === searchTerm) {
              score += 1000;
            }
            // Starts with search term gets high score
            else if (propertyName.startsWith(searchTerm)) {
              score += 500;
            }
            // Contains exact phrase gets medium-high score
            else if (text.includes(searchTerm)) {
              score += 250;
            }
            // All words match gets medium score
            else if (searchWords.every(word => text.includes(word))) {
              score += 100;
            }
            // Some words match gets lower score
            else if (searchWords.some(word => text.includes(word))) {
              score += 50;
            }
            
            return score;
          };

          // Helper function to check if any search word matches the searchable text
          const matchesSearch = (searchableText) => {
            const text = searchableText.toLowerCase();
            return searchWords.some(word => text.includes(word));
          };

          // Filter and score rental properties
          localRentArr = localRentArr.filter((item) => {
            const searchableText = [
              item.propertyName,
              item.projectName,
              item.postProperty?.propertyName,
              item.builderName,
              item.type,
              item.propertyType,
              item.address,
              item.projectAddress,
              item.postProperty?.address,
              item.city,
              item.postProperty?.city,
              item.state,
              item.postProperty?.state,
              item.descripation,
              item.description,
              item.title,
              item.name
            ].filter(Boolean).join(' ');
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

          // Filter and score sale properties
          localBuyArr = localBuyArr.filter((item) => {
            const searchableText = [
              item.propertyName,
              item.projectName,
              item.postProperty?.propertyName,
              item.builderName,
              item.type,
              item.propertyType,
              item.address,
              item.projectAddress,
              item.postProperty?.address,
              item.city,
              item.postProperty?.city,
              item.state,
              item.postProperty?.state,
              item.descripation,
              item.description,
              item.title,
              item.name
            ].filter(Boolean).join(' ');
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

          // Filter and score projects
          localSearchArr = localSearchArr.filter((item) => {
            const searchableText = [
              item.projectName,
              item.builderName,
              item.type,
              item.projectAddress,
              item.city,
              item.state,
              item.project_discripation,
              item.description,
              item.title,
              item.name
            ].filter(Boolean).join(' ');
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));
        }

        setSearchData(localSearchArr);
        setRentSearchData(localRentArr);
        setBuySearchData(localBuyArr);

        const isAllEmpty =
          (Array.isArray(localSearchArr) ? localSearchArr.length : 0) === 0 &&
          (Array.isArray(localRentArr) ? localRentArr.length : 0) === 0 &&
          (Array.isArray(localBuyArr) ? localBuyArr.length : 0) === 0;

        // Check if we have any results from the search
        const totalResults = localSearchArr.length + localRentArr.length + localBuyArr.length;
        
        // Only trigger fallback if there are absolutely no results AND we have a search query
        // OR if it's an empty search (no query at all)
        const shouldUseFallback = (totalResults === 0 && key1 && key1.trim()) || (!key1 || !key1.trim());

        if (shouldUseFallback && (!key1 || !key1.trim())) {
          // Empty search - show all projects
          setFallbackLoading(true);
          const allProjectsRes = await api.get("/project/viewAll/data");
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
          setFallbackLoading(false);
        } else if (shouldUseFallback && key1 && key1.trim()) {
          // Search query with no results - try fallback search through all projects
          setFallbackLoading(true);
          const allProjectsRes = await api.get("/project/viewAll/data");
          let allProjectsArr = (allProjectsRes.data.data || []);

          // Client-side search filter
          const searchTerm = key1.toLowerCase();
          const filteredProjects = allProjectsArr.filter((item) => {
            return (
              (item.projectName && item.projectName.toLowerCase().includes(searchTerm)) ||
              (item.builderName && item.builderName.toLowerCase().includes(searchTerm)) ||
              (item.type && item.type.toLowerCase().includes(searchTerm)) ||
              (item.projectAddress && item.projectAddress.toLowerCase().includes(searchTerm)) ||
              (item.city && item.city.toLowerCase().includes(searchTerm)) ||
              (item.state && item.state.toLowerCase().includes(searchTerm)) ||
              (item.project_discripation && item.project_discripation.toLowerCase().includes(searchTerm))
            );
          });

          if (filteredProjects.length > 0) {
            // Show filtered results
            const mappedProjects = filteredProjects.map((item) => ({
              projectName: item.projectName,
              project_url: item.project_url,
              frontImage: item.frontImage,
              price: item.price,
              type: item.type,
              projectAddress: item.projectAddress,
              city: item.city,
              state: item.state,
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
              sourceType: "project",
            }));
            setBuySearchData([]);
            setRentSearchData([]);
            setSearchData(mappedProjects);
            setIsFallbackMode(true);
          } else {
            // No results at all - show random projects
            let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
              projectName: item.projectName,
              project_url: item.project_url,
              frontImage: item.frontImage,
              price: item.price,
              type: item.type,
              projectAddress: item.projectAddress,
              city: item.city,
              state: item.state,
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
              sourceType: "project",
            }));
            allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
            setBuySearchData([]);
            setRentSearchData([]);
            setSearchData(allProjectsArr);
            setIsFallbackMode(true);
          }
          setFallbackLoading(false);
        } else {
          // We have search results - show them (projects, rent, and buy properties)
          setIsFallbackMode(false);
        }
      } catch (error) {
        // Any error should trigger fallback mode (show all projects)
        console.log('Search error, triggering fallback:', error.message);
        setFallbackLoading(true);
        try {
          const allProjectsRes = await api.get("/project/viewAll/data");
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          // Shuffle the array to show random projects
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          // Show empty state with message
          setSearchData([]);
          setIsFallbackMode(true);
        }
        setFallbackLoading(false);
      }
    };
    // EHFBHEDB
    fetchData();
  }, [key, key3, isEmptySearch]);

  const combinedSearchData = useMemo(() => {
    const combined = [
      ...(searchData || []),
      ...(rentSearchData || []),
      ...(buySearchData || []),
    ];
    
    // Sort by relevance score if available (from search filtering)
    return combined.sort((a, b) => {
      const scoreA = a._relevanceScore || 0;
      const scoreB = b._relevanceScore || 0;
      return scoreB - scoreA;
    });
  }, [searchData, rentSearchData, buySearchData]);

  const filteredFallbackProjects = useMemo(() => {
    let data = searchData;
    if (!isFallbackMode) return data;
    
    // Store original data as fallback
    const originalData = [...data];
    
    if (cityFilter) {
      data = data.filter(
        (item) =>
          item.city &&
          item.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (primeLocation) {
      data = data.filter(
        (item) =>
          item.city && item.city.toLowerCase() === primeLocation.toLowerCase()
      );
    }
    if (projectStatus) {
      data = data.filter(
        (item) =>
          item.status &&
          item.status.toLowerCase() === projectStatus.toLowerCase()
      );
    }
    if (projectType) {
      data = data.filter(
        (item) =>
          item.type && item.type.toLowerCase() === projectType.toLowerCase()
      );
    }
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      data = data.filter((item) => {
        const price = Number(item.price) || Number(item.minPrice) || 0;
        return (!min || price >= min) && (!max || price <= max);
      });
    }
    
    // If filtering results in empty array, return original data to ensure something is always shown
    return data.length > 0 ? data : originalData;
  }, [
    searchData,
    cityFilter,
    primeLocation,
    projectStatus,
    projectType,
    priceRange,
    isFallbackMode,
  ]);

  const cityOptions = useMemo(() => {
    if (!isFallbackMode) return [];
    const cities = (searchData || []).map((item) => item.city).filter(Boolean);
    return Array.from(new Set(cities));
  }, [searchData, isFallbackMode]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {isFallbackMode && (
        <div className="sticky top-20 z-30 bg-white/90 shadow-lg rounded-2xl px-4 py-4 mb-4 backdrop-blur-md border border-gray-200 w-full max-w-7xl mx-auto">
          {/* Show/Hide Filter Button for Mobile */}
          <div className="md:hidden flex justify-center mb-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-red-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-red-600 transition shadow-md"
            >
              {showFilters ? "Close Filters" : "Show Filters"}
            </button>
          </div>

          {/* Enhanced Filter Container */}
          <div
            className={`${
              showFilters ? "grid" : "hidden"
            } md:grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-4 items-center justify-items-center w-full transition-all duration-300`}
          >
            {/* Project/City Search */}
            <div className="w-full">
              <label className="hidden md:block text-xs font-semibold text-gray-600 mb-2">Project/City</label>
              <input
                type="text"
                placeholder="Search by Project or City"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            {/* Prime Location */}
            <div className="w-full">
              <label className="hidden md:block text-xs font-semibold text-gray-600 mb-2">Prime Location</label>
              <select
                className="border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm w-full shadow-sm"
                value={primeLocation}
                onChange={(e) => setPrimeLocation(e.target.value)}
              >
                <option value="">Prime Location</option>
                {/* Example cities, replace/add as needed */}
                <option value="gurugram">Gurugram</option>
                <option value="delhi">Delhi</option>
                <option value="noida">Noida</option>
                <option value="goa">Goa</option>
                <option value="mumbai">Mumbai</option>
                <option value="panipat">Panipat</option>
                <option value="kasauli">Kasauli</option>
                <option value="panchkula">Panchkula</option>
                <option value="jalandhar">Jalandhar</option>
                <option value="ayodhya">Ayodhya</option>
                <option value="dubai">Dubai</option>
              </select>
            </div>
            {/* Project Status */}
            <div className="w-full">
              <label className="hidden md:block text-xs font-semibold text-gray-600 mb-2">Project Status</label>
              <select
                className="border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm w-full shadow-sm"
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
              >
                <option value="">Project Status</option>
                <option value="ready to move">Ready to Move</option>
                <option value="under construction">Under Construction</option>
                <option value="upcoming">Upcoming</option>
                <option value="new launch">New Launch</option>
              </select>
            </div>
            {/* Project Type */}
            <div className="w-full">
              <label className="hidden md:block text-xs font-semibold text-gray-600 mb-2">Project Type</label>
              <select
                className="border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm w-full shadow-sm"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="">Project Type</option>
                <option value="sco">SCO</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="deen dayal residential">
                  Deen Dayal Residential
                </option>
                <option value="independent">Independent</option>
                <option value="builder affordable">Builder Affordable</option>
                <option value="villas">Villas</option>
                <option value="farmhouse">Farmhouse</option>
              </select>
            </div>
            {/* Price Range */}
            <div className="w-full col-span-2 md:col-span-1">
              <label className="hidden md:block text-xs font-semibold text-gray-600 mb-2">Price Range</label>
              <select
                className="border border-gray-300 bg-white rounded-xl px-4 py-2 text-sm w-full shadow-sm"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Price</option>
                <option value="0-5000000">Up to 50 Lakh</option>
                <option value="5000000-10000000">50 Lakh - 1 Cr</option>
                <option value="10000000-20000000">1 Cr - 2 Cr</option>
                <option value="20000000-50000000">2 Cr - 5 Cr</option>
                <option value="50000000-100000000">5 Cr - 10 Cr</option>
                <option value="100000000-">10 Cr +</option>
              </select>
            </div>
            {/* Search Button */}
            <div className="w-full col-span-2 md:col-span-1 flex justify-center items-end">
              <button
                className="bg-black text-white font-bold px-8 py-2 rounded-xl hover:bg-red-600 transition shadow-md w-full md:w-auto"
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setShowFilters(false);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rendering searchData if available (filtered in fallback mode) */}
      {fallbackLoading ? (
        <CustomSkeleton />
      ) : combinedSearchData?.length > 0 ||
        (isFallbackMode && filteredFallbackProjects.length > 0) ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
            title={isFallbackMode ? "All Projects" : `Results For ${key1}`}
            Actualdata={
              isFallbackMode ? filteredFallbackProjects : combinedSearchData
            }
            suppressEmptyMessage={isFallbackMode}
          />
        </section>
      ) : (
        <CustomSkeleton />
      )}

      <Footer />
    </div>
  );
};

export default SearchData;
