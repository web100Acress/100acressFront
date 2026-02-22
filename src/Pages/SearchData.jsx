import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../config/apiClient";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { FiHeart, FiMapPin, FiHome, FiCalendar, FiCheck, FiX, FiFilter, FiChevronDown } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BiArea } from "react-icons/bi";

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
  const [sortBy, setSortBy] = useState(""); // price_low_high | price_high_low
  const [likedProperties, setLikedProperties] = useState(new Set()); // Track liked properties

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

        // Use proper search endpoints for production
        const searchTerm = key.toLowerCase().trim();
        console.log('🔍 Production Search - Search term:', searchTerm);
        console.log('🔍 Production Search - Environment:', import.meta.env.MODE);
        
        // Try search endpoints first
        const searchEndpoints = [
          { name: 'rental', url: `/property/rent/search/${encodeURIComponent(searchTerm)}` },
          { name: 'sale', url: `/property/buy/search/${encodeURIComponent(searchTerm)}` },
          { name: 'project', url: `/project/search/${encodeURIComponent(searchTerm)}` }
        ];

        console.log('🔍 Production Search - Attempting endpoints:', searchEndpoints.map(e => e.url));
        
        const [rentSearchResult, saleSearchResult, projectSearchResult] = await Promise.allSettled([
          api.get(searchEndpoints[0].url).catch(err => {
            console.log(`❌ Rental search failed:`, err.response?.status || err.message);
            return { status: 'rejected', reason: err };
          }),
          api.get(searchEndpoints[1].url).catch(err => {
            console.log(`❌ Sale search failed:`, err.response?.status || err.message);
            return { status: 'rejected', reason: err };
          }),
          api.get(searchEndpoints[2].url).catch(err => {
            console.log(`❌ Project search failed:`, err.response?.status || err.message);
            return { status: 'rejected', reason: err };
          })
        ]);

        console.log('🔍 Production Search Results:', {
          rent: { 
            status: rentSearchResult.status,
            error: rentSearchResult.status === 'rejected' ? rentSearchResult.reason?.response?.status || rentSearchResult.reason?.message : null
          },
          sale: { 
            status: saleSearchResult.status,
            error: saleSearchResult.status === 'rejected' ? saleSearchResult.reason?.response?.status || saleSearchResult.reason?.message : null
          },
          projects: { 
            status: projectSearchResult.status,
            error: projectSearchResult.status === 'rejected' ? projectSearchResult.reason?.response?.status || projectSearchResult.reason?.message : null
          }
        });

        let localRentArr = [];
        let localBuyArr = [];
        let localSearchArr = [];
        let useFallback = false;

        // Check if any search endpoints succeeded
        const hasSuccessfulSearch = 
          rentSearchResult.status === 'fulfilled' || 
          saleSearchResult.status === 'fulfilled' || 
          projectSearchResult.status === 'fulfilled';

        if (hasSuccessfulSearch) {
          console.log('🔍 Production Search - Using search endpoint results');
          
          // Use successful search endpoint results
          localRentArr = rentSearchResult.status === "fulfilled"
            ? (rentSearchResult.value?.data?.rentaldata || []).map((item) => ({
                ...item,
                sourceType: "rent",
                type: 'rental'
              }))
            : [];

          localBuyArr = saleSearchResult.status === "fulfilled"
            ? (saleSearchResult.value?.data?.ResaleData || saleSearchResult.value?.data?.saledata || saleSearchResult.value?.data?.buydata || []).map((item) => ({
                ...item,
                sourceType: "buy",
                type: 'sale'
              }))
            : [];

          localSearchArr = projectSearchResult.status === "fulfilled"
            ? (projectSearchResult.value?.data?.data || []).map((item) => ({
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
        } else {
          // All search endpoints failed - use fallback method
          console.log('🔍 Production Search - All search endpoints failed, using fallback method (client-side search)');
          useFallback = true;
          
          // Fallback to fetching all data and client-side filtering
          const [rentResult, saleResult, projectsResult] = await Promise.allSettled([
            api.get("/property/rent/viewall"),
            api.get("/property/buy/ViewAll"),
            api.get("/project/viewAll/data")
          ]);

          localRentArr = rentResult.status === "fulfilled"
            ? (rentResult.value?.data?.rentaldata || []).map((item) => ({
                ...item,
                sourceType: "rent",
                type: 'rental'
              }))
            : [];

          localBuyArr = saleResult.status === "fulfilled"
            ? (saleResult.value?.data?.ResaleData || saleResult.value?.data?.saledata || saleResult.value?.data?.buydata || []).map((item) => ({
                ...item,
                sourceType: "buy",
                type: 'sale'
              }))
            : [];

          localSearchArr = projectsResult.status === "fulfilled"
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
        }

        // Apply client-side filtering only when using fallback method
        if (useFallback) {
          const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
          
          const matchesSearch = (searchableText) => {
            const text = searchableText.toLowerCase();
            return searchWords.some(word => text.includes(word));
          };

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
          return matchesSearch(searchableText);
        });

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
          return matchesSearch(searchableText);
        });

        localSearchArr = localSearchArr.filter((item) => {
          const searchableText = [
            item.projectName,
            item.builderName,
            item.type,
            item.projectAddress,
            item.city,
            item.state,
            item.descripation,
            item.description
          ].filter(Boolean).join(' ');
          return matchesSearch(searchableText);
        });

        } // End of fallback filtering block

        // Check if we have any results from the search
        const searchResultsCount = localSearchArr.length + localRentArr.length + localBuyArr.length;
        
        // Only set fallback mode if there are no results
        if (searchResultsCount === 0) {
          setIsFallbackMode(true);
          useFallback = true; // Mark as using fallback
        } else {
          setIsFallbackMode(false);
          useFallback = false;
        }

        console.log('🔍 Production Search - Client-side search results:', {
          rentals: localRentArr.length,
          sales: localBuyArr.length,
          projects: localSearchArr.length
        });

        console.log('🔍 Production Search - Final results:', {
          rentals: localRentArr.length,
          sales: localBuyArr.length,
          projects: localSearchArr.length,
          fallback: useFallback
        });

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
    const dataset = isFallbackMode ? (searchData || []) : (combinedSearchData || []);
    const cities = dataset
      .map((item) => item.city || item?.postProperty?.city)
      .filter(Boolean);
    return Array.from(new Set(cities));
  }, [searchData, combinedSearchData, isFallbackMode]);

  // Toggle wishlist/like
  const toggleLike = (propertyId) => {
    setLikedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  // Compute filtered + sorted items for grid
  const displayedItems = useMemo(() => {
    const base = isFallbackMode ? (filteredFallbackProjects || []) : (combinedSearchData || []);

    // helpers
    const priceOf = (p) => p?.minPrice ?? p?.price ?? 0;
    const matchType = (p) => {
      if (!projectType) return true;
      const sel = projectType.toString().toLowerCase();
      const source = (p?.sourceType || "").toString().toLowerCase(); // 'rent' | 'buy' | 'project'
      const t1 = (p?.type || "").toString().toLowerCase();
      const t2 = (p?.propertyType || p?.postProperty?.propertyType || "").toString().toLowerCase();
      const t3 = (p?.category || p?.postProperty?.category || "").toString().toLowerCase();

      // If user selected the transaction type
      if (["project", "rent", "buy", "rental", "resale"].includes(sel)) {
        if (sel === "rental") return source === "rent";
        if (sel === "resale") return source === "buy";
        return source === sel; // project | rent | buy
      }

      // Otherwise, match against property types
      const blob = `${t1} ${t2} ${t3}`;
      return blob.includes(sel);
    };
    const matchCity = (p) => {
      if (!primeLocation) return true;
      const c = (p?.city || p?.postProperty?.city || "").toString().toLowerCase();
      return c === primeLocation.toString().toLowerCase();
    };
    const matchPrice = (p) => {
      if (!priceRange) return true;
      const [minStr, maxStr] = String(priceRange).split("-");
      const min = Number(minStr) || 0;
      const max = maxStr === undefined || maxStr === "" ? Infinity : Number(maxStr);
      const val = Number(priceOf(p)) || 0;
      return val >= min && val <= max;
    };

    let out = base.filter((p) => matchType(p) && matchCity(p) && matchPrice(p));

    if (sortBy === "price_low_high") {
      out = [...out].sort((a, b) => (priceOf(a) || 0) - (priceOf(b) || 0));
    } else if (sortBy === "price_high_low") {
      out = [...out].sort((a, b) => (priceOf(b) || 0) - (priceOf(a) || 0));
    }
    return out;
  }, [isFallbackMode, filteredFallbackProjects, combinedSearchData, projectType, primeLocation, priceRange, sortBy]);

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="w-full h-40 bg-gray-200"></div>
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        <div className="h-7 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)" }}>
      <Helmet>
        <title>Search Results | Premium Real Estate Properties</title>
        <meta name="description" content="Discover premium properties matching your search" />
      </Helmet>
      
      {/* Sticky Filter Bar - disabled old (fallback-only) bar */}
      {false && isFallbackMode && (
        <div className="sticky top-[60px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" style={{ paddingTop: "20px" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          {/* Filter Title & Toggle */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FiFilter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Modern Filter Pills */}
          <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap gap-3 items-center`}>
            {/* Search Input */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by project or city"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                />
              </div>
            </div>
            {/* Location Dropdown */}
            <div className="relative group">
              <select
                className="appearance-none pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                value={primeLocation}
                onChange={(e) => setPrimeLocation(e.target.value)}
              >
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <option value="">📍 Location</option>
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
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {/* Status Dropdown */}
            <div className="relative group">
              <select
                className="appearance-none pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
              >
                <option value=""> Status</option>
                <option value="ready to move">Ready to Move</option>
                <option value="under construction">Under Construction</option>
                <option value="upcoming">Upcoming</option>
                <option value="new launch">New Launch</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {/* Type Dropdown */}
            <div className="relative group">
              <select
                className="appearance-none pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="">🏘️ Type</option>
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
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {/* Price Dropdown */}
            <div className="relative group">
              <select
                className="appearance-none pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">💰 Budget</option>
                <option value="0-5000000">Up to 50 Lakh</option>
                <option value="5000000-10000000">50 Lakh - 1 Cr</option>
                <option value="10000000-20000000">1 Cr - 2 Cr</option>
                <option value="20000000-50000000">2 Cr - 5 Cr</option>
                <option value="50000000-100000000">5 Cr - 10 Cr</option>
                <option value="100000000-">10 Cr +</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            
            {/* Search Button */}
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm whitespace-nowrap"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setShowFilters(false);
                }
              }}
            >
              Apply Filters
            </button>
          </div>
          
          {/* Applied Filters Tags */}
          {(cityFilter || primeLocation || projectStatus || projectType || priceRange) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {cityFilter && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200">
                  {cityFilter}
                  <button onClick={() => setCityFilter("")} className="hover:text-red-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {primeLocation && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  {primeLocation}
                  <button onClick={() => setPrimeLocation("")} className="hover:text-blue-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {projectStatus && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                  {projectStatus}
                  <button onClick={() => setProjectStatus("")} className="hover:text-green-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {projectType && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {projectType}
                  <button onClick={() => setProjectType("")} className="hover:text-purple-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {priceRange && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                  Budget Filter
                  <button onClick={() => setPriceRange("")} className="hover:text-amber-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setCityFilter("");
                  setPrimeLocation("");
                  setProjectStatus("");
                  setProjectType("");
                  setPriceRange("");
                }}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
        </div>
      )}

      {/* Search Results Header for Non-Fallback Mode */}
      {!isFallbackMode && key1 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100" style={{ paddingTop: "80px" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Search Results for <span className="text-red-600">"{key1}"</span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Banner with Count */}
      {!isFallbackMode && key1 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FiFilter className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Found {displayedItems.length} Properties
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Matching your search for "{key1}"
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {displayedItems.length} Results
                </span>
                {key2 && typeof key2 === 'string' && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {key2}
                  </span>
                )}
                {key2 && typeof key2 === 'object' && key2.city && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {key2.city}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Property Grid */}
      {/* Mobile Floating Filter Button - Bottom Right */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-24 right-6 z-50 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300"
        aria-label="Toggle Filters"
      >
        {showFilters ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiFilter className="w-6 h-6" />
        )}
      </button>

      {/* New Compact Sticky Filter Bar (always visible) */}
      <div className="sticky top-[82px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
        <div className="py-4 md:py-4 max-w-7xl mx-auto px-4 lg:px-8">
          {/* Filter Controls */}
          <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row flex-wrap gap-4 md:gap-x-6 md:gap-y-4 items-stretch md:items-center justify-center`}>
            {/* Type */}
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 w-full md:w-auto group">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] group-hover:text-red-500 transition-colors">Type</span>
              <div className="relative">
                <select
                  aria-label="Type"
                  className="appearance-none w-full md:min-w-[160px] pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer hover:border-red-200"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <optgroup label="Transaction">
                    <option value="project">Project</option>
                    <option value="rental">Rental</option>
                    <option value="resale">Resale</option>
                  </optgroup>
                  <optgroup label="Property Type">
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="sco">SCO</option>
                  </optgroup>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500 transition-colors" />
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 w-full md:w-auto group">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] group-hover:text-red-500 transition-colors">Sort</span>
              <div className="relative">
                <select
                  aria-label="Sort"
                  className="appearance-none w-full md:min-w-[160px] pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer hover:border-red-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500 transition-colors" />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 w-full md:w-auto group">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] group-hover:text-red-500 transition-colors">Price</span>
              <div className="relative">
                <select
                  aria-label="Price"
                  className="appearance-none w-full md:min-w-[160px] pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer hover:border-red-200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="0-5000000">Up to 50 Lakh</option>
                  <option value="5000000-10000000">50 Lakh - 1 Cr</option>
                  <option value="10000000-20000000">1 Cr - 2 Cr</option>
                  <option value="20000000-50000000">2 Cr - 5 Cr</option>
                  <option value="50000000-100000000">5 Cr - 10 Cr</option>
                  <option value="100000000-">10 Cr +</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500 transition-colors" />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col md:flex-row md:items-center gap-2.5 w-full md:w-auto group">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] group-hover:text-red-500 transition-colors">City</span>
              <div className="relative">
                <select
                  aria-label="City"
                  className="appearance-none w-full md:min-w-[160px] pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white/70 shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all cursor-pointer hover:border-red-200"
                  value={primeLocation}
                  onChange={(e) => setPrimeLocation(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-red-500 transition-colors" />
              </div>
            </div>

            {/* Clear Filters */}
            {(projectType || priceRange || primeLocation || sortBy) && (
              <button
                onClick={() => { 
                  setProjectType(""); 
                  setPriceRange(""); 
                  setPrimeLocation(""); 
                  setSortBy(""); 
                }}
                className="text-xs font-bold text-red-500 hover:text-red-600 transition-all uppercase tracking-widest px-4 py-2 hover:bg-red-50 rounded-lg"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8" style={{ paddingTop: isFallbackMode ? "48px" : "48px" }}>

        {/* Property Cards Grid */}
        {fallbackLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedItems.map((property, index) => {
              const propertyName = property.propertyName || property.projectName || property.postProperty?.propertyName || "Property";
              const imageUrl = property.thumbnailImage?.url || property.frontImage?.cdn_url || property.frontImage?.url || property.postProperty?.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
              const city = property.city || property.postProperty?.city || "Location";
              const state = property.state || property.postProperty?.state || "";
              const minPrice = property.minPrice || property.price || 0;
              const maxPrice = property.maxPrice || property.price || 0;
              const projectUrl = property.project_url || "#";
              const propertyType = property.sourceType || "project";
              const bhkConfig = property.bhkType || property.configuration || "";
              const area = property.projectAddress || property.address || property.postProperty?.address || "";
              const propertyId = property._id || property.id || `${propertyName}-${index}`;
              const isLiked = likedProperties.has(propertyId);
              
              // Build URL based on property type
              let detailUrl = "#";
              if (propertyType === "rent") {
                detailUrl = `/rental-properties/${propertyName.replace(/\s+/g, '-')}/${property._id || property.id}/`;
              } else if (propertyType === "buy") {
                detailUrl = `/buy-properties/${propertyName.replace(/\s+/g, '-')}/${property._id || property.id}/`;
              } else {
                detailUrl = `/${projectUrl}/`;
              }

              return (
                <div
                  key={index}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Container */}
                  <Link to={detailUrl} className="block relative h-40 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={propertyName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* RERA Badge */}
                    <div className="absolute top-3 left-3 z-[3]">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-gray-200 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#dc2626" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        <span className="text-[9px] font-bold text-red-600 tracking-wide">
                          {propertyType === 'rent' ? 'RENTAL' :
                           propertyType === 'buy' ? 'RESALE' :
                           'RERA'}
                        </span>
                      </div>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLike(propertyId);
                      }}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-sm"
                    >
                      {isLiked ? (
                        <FiHeart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      ) : (
                        <FiHeart className="w-3.5 h-3.5 text-gray-600" />
                      )}
                    </button>
                  </Link>

                  {/* Content */}
                  <div className="p-3">
                    {/* Property Name */}
                    <Link to={detailUrl}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 hover:text-red-600 transition-colors line-clamp-1">
                        {propertyName}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="mb-2">
                      {propertyType === 'rent' ? (
                        // For rental properties - show with per month
                        minPrice > 0 ? (
                          <p className="text-base font-bold text-red-600">
                            ₹{minPrice.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-600">/month</span>
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-gray-600">Price on Request</p>
                        )
                      ) : propertyType === 'buy' ? (
                        // For resale properties - show original format
                        minPrice > 0 ? (
                          <p className="text-base font-bold text-red-600">
                            ₹{minPrice.toLocaleString('en-IN')}
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-gray-600">Price on Request</p>
                        )
                      ) : (
                        // For new projects - show in Cr format
                        minPrice > 0 ? (
                          <p className="text-base font-bold text-red-600">
                            ₹{minPrice}{maxPrice && maxPrice !== minPrice ? ` - ₹${maxPrice}` : ''}Cr
                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-gray-600">Price on Request</p>
                        )
                      )}
                    </div>

                    {/* Location */}
                    <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                      {area || `${city}${state ? ', ' + state : ''}`}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={detailUrl}
                        className="flex-1 inline-flex items-center justify-center px-3 py-1.5 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600 transition-all duration-200"
                      >
                        Explore
                      </Link>
                      <button
                        className="inline-flex items-center justify-center w-9 h-9 aspect-square leading-none box-border border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-all duration-200 shrink-0 outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `tel:+918595394908`;
                        }}
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </button>
                      <a
                        href={`https://wa.me/918500900100?text=${encodeURIComponent(`Hi, I'm interested in ${propertyName}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-11 h-11 aspect-square leading-none box-border border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-all duration-200 shrink-0 outline-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BsWhatsapp className="w-4 h-4 text-green-600" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FiHome className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-sm text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={() => {
                setCityFilter("");
                setPrimeLocation("");
                setProjectStatus("");
                setProjectType("");
                setPriceRange("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md font-semibold text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918500900100?text=Hi,%20I%20want%20to%20know%20about%20properties"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <BsWhatsapp className="w-7 h-7" />
      </a>

      <Footer />
    </div>
  );
};

export default SearchData;
