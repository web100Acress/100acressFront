import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { getApiBase } from "../config/apiBase";

// SearchData uses centralized API configuration
const searchApi = axios.create({
  baseURL: getApiBase(),
  timeout: 30000,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
});

console.log('SearchData using API base:', getApiBase());
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { FiHeart, FiMapPin, FiHome, FiCalendar, FiCheck, FiX, FiFilter, FiChevronDown } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BiArea } from "react-icons/bi";

const SearchData = () => {
  console.log('SearchData component mounting...');
  
  // Add global error handler for this component
  useEffect(() => {
    const handleError = (event) => {
      console.error('Unhandled error in SearchData:', event.error);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  const location = useLocation();
  // Safely extract and parse the encoded search payload from the URL
  const encodedFormData = (location.pathname.split("/searchdata/")[1] || "").trim();
  console.log('URL pathname:', location.pathname);
  console.log('Encoded form data:', encodedFormData);
  
  let decodedFormData = {};
  try {
    decodedFormData = encodedFormData ? JSON.parse(decodeURIComponent(encodedFormData)) : {};
    console.log('Decoded form data:', decodedFormData);
  } catch (e) {
    console.error('Error parsing form data:', e);
    decodedFormData = {};
  }

  // Parse payload - supports navbar format { query, location: "", collectionName }
  // and hero/searchbar format { query, location: {lat,lng}|string, collectionName, ... }
  function getFormDataValues(payload) {
    const query = typeof payload?.query === 'string' ? payload.query : '';
    const loc = payload?.location;
    const locationStr = typeof loc === 'string' ? loc : '';
    const collectionName = payload?.collectionName ?? '';
    return {
      key1: query,
      key2: locationStr,
      key3: collectionName,
    };
  }

  const { key1, key2, key3 } = getFormDataValues(decodedFormData);
  console.log('Extracted form values:', { key1, key2, key3 });
  
  // Build search key - same logic as navbar (query is primary, location string if any)
  const key = [
    typeof key1 === 'string' ? key1 : '',
    typeof key2 === 'string' ? key2 : ''
  ].filter(Boolean).join(' ').trim();

  console.log('Final search key:', key);
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
  
  // Infinite scroll states
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [allSearchData, setAllSearchData] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(20); // Initial display count

  const isEmptySearch = !key1 && !key2;

  // Infinite scroll handler
  const handleScroll = () => {
    if (isLoading || !hasMore) return;
    
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 1000) { // Load 1000px before bottom
      loadMoreProperties();
    }
  };

  const loadMoreProperties = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextCount = Math.min(displayedCount + 20, allSearchData.length);
    
    setTimeout(() => {
      setDisplayedCount(nextCount);
      setSearchData(allSearchData.slice(0, nextCount));
      setIsLoading(false);
      
      if (nextCount >= allSearchData.length) {
        setHasMore(false);
      }
    }, 500); // Simulate loading delay
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, displayedCount, allSearchData]);

  useEffect(() => {
    console.log('SearchData useEffect triggered:', {
      key,
      key1,
      key2,
      key3,
      isEmptySearch
    });
    
    let isMounted = true;
    const fetchData = async () => {
      console.log('fetchData function called');
      console.log('Current API Base URL:', searchApi.defaults.baseURL);
      console.log('Search parameters:', { key, key1, key2, key3, isEmptySearch });
      
      try {
        if (isEmptySearch) {
          console.log('Empty search detected, fetching all projects...');
          // Fetch all projects with pagination to get complete data
          let allProjectsArr = [];
          let page = 1;
          let hasMore = true;
          
          while (hasMore && page <= 10) { // Limit to 10 pages for safety
            try {
              const allProjectsRes = await searchApi.get(
                `/project/viewAll/data?page=${page}&limit=100`
              );
              
              const pageData = allProjectsRes.data.data || [];
              if (pageData.length === 0) {
                hasMore = false;
              } else {
                allProjectsArr = allProjectsArr.concat(pageData);
                console.log(`Fetched page ${page}: ${pageData.length} projects`);
                page++;
                hasMore = pageData.length === 100; // Continue if we got a full page
              }
            } catch (error) {
              console.error(`Error fetching page ${page}:`, error);
              hasMore = false;
            }
          }
          
          console.log('All projects API response total:', allProjectsArr.length);
          
          let processedProjects = allProjectsArr.map((item) => ({
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
          
          console.log('Processed all projects:', processedProjects.length);
          processedProjects = processedProjects.sort(() => Math.random() - 0.5);
          
          console.log('Setting state for empty search...');
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(processedProjects);
          setIsFallbackMode(true);
          console.log('Empty search state update completed');
          return;
        }

        console.log('Non-empty search, fetching from all endpoints...');

        // Fetch projects with pagination for comprehensive search - Get 200+ properties
        let projectsData = [];
        try {
          // Fetch first page quickly for initial display
          const firstPageRes = await searchApi.get(`/project/viewAll/data?page=1&limit=100`);
          const firstPageData = firstPageRes.data.data || [];
          projectsData = projectsData.concat(firstPageData);
          console.log(`Quick load: ${firstPageData.length} projects ready for display`);
          
          // Continue fetching to reach 200+ properties
          let page = 2;
          let hasMore = true;
          while (hasMore && page <= 10) { // Fetch up to 10 pages = 1000 properties
            const projectsPageRes = await searchApi.get(`/project/viewAll/data?page=${page}&limit=100`);
            const pageData = projectsPageRes.data.data || [];
            if (pageData.length === 0) {
              hasMore = false;
            } else {
              projectsData = projectsData.concat(pageData);
              console.log(`Background fetch page ${page}: ${pageData.length} projects (Total: ${projectsData.length})`);
              page++;
              hasMore = pageData.length === 100;
              
              // Stop if we have enough properties (200+ exact matches will be filtered later)
              if (projectsData.length >= 1000) break;
            }
          }
          console.log(`Complete fetch: ${projectsData.length} total projects for search`);
        } catch (error) {
          console.error('Error fetching projects for search:', error);
        }

        // Always fetch from all endpoints for comprehensive search
        const [rentResult, saleResult] = await Promise.allSettled([
          searchApi.get("/property/rent/viewall"),
          searchApi.get("/property/buy/ViewAll"), // Note: capital V for buy endpoint
        ]);

        console.log('API Results:', {
          rent: rentResult,
          sale: saleResult,
          projects: { status: 'fulfilled', data: { data: projectsData } }
        });

        // Debug: Log raw API responses
        if (rentResult.status === "fulfilled") {
          console.log('Rent API Raw Response:', rentResult.value?.data);
          console.log('Rent Data Path:', rentResult.value?.data?.rentaldata);
        } else {
          console.error('Rent API Error:', rentResult.reason);
        }

        if (saleResult.status === "fulfilled") {
          console.log('Sale API Raw Response:', saleResult.value?.data);
          console.log('Sale Data Paths:', {
            ResaleData: saleResult.value?.data?.ResaleData,
            saledata: saleResult.value?.data?.saledata,
            buydata: saleResult.value?.data?.buydata
          });
        } else {
          console.error('Sale API Error:', saleResult.reason);
        }

        console.log('Projects Data:', projectsData.length, 'items');

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

        let localSearchArr = projectsData.map((item) => ({
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

        console.log('Processed data:', {
          rentals: localRentArr.length,
          sales: localBuyArr.length,
          projects: localSearchArr.length
        });

        // Filter results based on search term - Enhanced for comprehensive matching
        const searchTerm = key.toLowerCase().trim();
        
        // Split search term into individual words for more flexible matching
        const searchWords = searchTerm ? searchTerm.split(/\s+/).filter(word => word.length > 0) : [];
        
        // Extract numbers from search term for price/area matching
        const searchNumbers = searchTerm.match(/\d+/g) || [];
        
        // Helper function to create comprehensive searchable text
        const createSearchableText = (item) => {
          const fields = [
            item.projectName || item.propertyName || '',
            item.projectAddress || item.address || '',
            item.city || '',
            item.state || '',
            item.builderName || item.developer || '',
            item.type || item.propertyType || '',
            item.project_Status || item.status || '',
            item.project_url || '',
            item.description || item.project_discripation || '',
            item.AboutDeveloper || '',
            item.Amenities || '',
            item.projectReraNo || '',
            // Include numbers for price/area matching
            (item.minPrice || '').toString(),
            (item.maxPrice || '').toString(),
            (item.totalLandArea || '').toString(),
            (item.totalUnit || '').toString(),
            (item.bhkType || '').toString(),
            // Include location details
            item.sector || item.location || '',
            item.pincode || ''
          ];
          
          return fields.join(' ').toLowerCase();
        };

        // Helper function to calculate enhanced relevance score
        const calculateRelevance = (item, searchableText) => {
          const text = searchableText;
          let score = 0;
          
          // Get property name for exact match checking
          const propertyName = (
            item.propertyName || 
            item.projectName || 
            item.postProperty?.propertyName || 
            ''
          ).toLowerCase();
          
          // Exact match gets highest score
          if (propertyName === searchTerm) {
            score += 2000;
          }
          // Starts with search term gets high score
          else if (propertyName.startsWith(searchTerm)) {
            score += 1000;
          }
          // Contains exact phrase gets medium-high score
          else if (text.includes(searchTerm)) {
            score += 500;
          }
          
          // Bonus for matching individual words in order
          if (searchWords.length > 1) {
            const consecutiveMatches = searchWords.filter((word, index) => 
              text.includes(word) && (index === 0 || text.includes(searchWords[index - 1]))
            ).length;
            score += consecutiveMatches * 100;
          }
          
          // All words match gets medium score
          else if (searchWords.every(word => text.includes(word))) {
            score += 250;
          }
          // Some words match gets lower score
          else if (searchWords.some(word => text.includes(word))) {
            score += 100;
          }
          
          // Bonus for matching numbers (price, area, etc.)
          if (searchNumbers.length > 0) {
            const itemNumbers = (text.match(/\d+/g) || []).map(n => parseInt(n));
            const numberMatches = searchNumbers.filter(searchNum => 
              itemNumbers.some(itemNum => Math.abs(itemNum - parseInt(searchNum)) <= 100)
            ).length;
            score += numberMatches * 50;
          }
          
          // Bonus for city/state matching
          if (item.city && searchTerm.includes(item.city.toLowerCase())) {
            score += 150;
          }
          if (item.state && searchTerm.includes(item.state.toLowerCase())) {
            score += 100;
          }
          
          // Bonus for builder/developer matching
          if (item.builderName && text.includes(item.builderName.toLowerCase())) {
            score += 75;
          }
          
          return score;
        };

        // Helper function to check if any search word matches the searchable text
        const matchesSearch = (searchableText) => {
          const text = searchableText.toLowerCase();
          return searchWords.some(word => text.includes(word));
        };

        if (searchTerm) {
          // Enhanced filtering for rental properties with comprehensive matching
          localRentArr = localRentArr.filter((item) => {
            const searchableText = createSearchableText(item);
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

          // Enhanced filtering for sale properties with comprehensive matching
          localBuyArr = localBuyArr.filter((item) => {
            const searchableText = createSearchableText(item);
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

          // Enhanced filtering for projects with comprehensive matching
          localSearchArr = localSearchArr.filter((item) => {
            const searchableText = createSearchableText(item);
            const matches = matchesSearch(searchableText);
            if (matches) {
              item._relevanceScore = calculateRelevance(item, searchableText);
            }
            return matches;
          }).sort((a, b) => (b._relevanceScore || 0) - (a._relevanceScore || 0));

          // Check if we have exact keyword matches (high relevance scores)
          const hasExactMatches = 
            localSearchArr.some(item => (item._relevanceScore || 0) >= 1000) ||
            localRentArr.some(item => (item._relevanceScore || 0) >= 1000) ||
            localBuyArr.some(item => (item._relevanceScore || 0) >= 1000);

          console.log(`🔍 Keyword Match Check: ${hasExactMatches ? 'EXACT MATCHES FOUND - Showing all results' : 'No exact matches - Showing exactly 200 results'}`);

          if (!hasExactMatches) {
            // No exact matches - show exactly 200 results (mandatory)
            const totalExactMatches = localSearchArr.length + localBuyArr.length + localRentArr.length;
            
            if (totalExactMatches === 0) {
              // No matches at all - show top 200 projects by default
              localSearchArr = projectsData.slice(0, 200).map((item) => ({
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
                _relevanceScore: 1, // Low score for default results
              }));
              console.log(`📊 No matches found - Showing top 200 projects by default`);
            } else {
              // Some matches but not exact - pad results to reach exactly 200
              const needed = 200 - totalExactMatches;
              const additionalProjects = projectsData
                .filter(item => !localSearchArr.some(match => 
                  (match.projectName || match.propertyName) === (item.projectName || item.propertyName)
                ))
                .slice(0, needed)
                .map((item) => ({
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
                  _relevanceScore: 1, // Low score for filler results
                }));
              
              localSearchArr = [...localSearchArr, ...additionalProjects];
              console.log(`📊 Padding results: ${totalExactMatches} matches + ${additionalProjects.length} filler = ${localSearchArr.length + localBuyArr.length + localRentArr.length} total`);
            }
          } else {
            // Show all matching properties/projects when keywords match
            console.log(`🎯 Showing all matches: ${localSearchArr.length} projects, ${localBuyArr.length} sales, ${localRentArr.length} rentals`);
          }

          // Add related projects based on city, builder, and type - Enhanced for 200+ properties
          const addRelatedProjects = (mainResults, allProjects, limit = 50) => {
            if (mainResults.length === 0) return [];
            
            const mainCities = [...new Set(mainResults.map(item => item.city).filter(Boolean))];
            const mainBuilders = [...new Set(mainResults.map(item => item.builderName).filter(Boolean))];
            const mainTypes = [...new Set(mainResults.map(item => item.type).filter(Boolean))];
            const mainStates = [...new Set(mainResults.map(item => item.state).filter(Boolean))];
            const mainPriceRanges = mainResults.map(item => {
              const avgPrice = ((item.minPrice || 0) + (item.maxPrice || 0)) / 2;
              return avgPrice > 0 ? Math.floor(avgPrice / 2) * 2 : null; // Group by 2Cr ranges
            }).filter(Boolean);
            
            const related = allProjects
              .filter(item => {
                // Exclude already shown projects
                const isAlreadyShown = mainResults.some(main => 
                  (main.projectName || main.propertyName) === (item.projectName || item.propertyName)
                );
                if (isAlreadyShown) return false;
                
                let relevanceScore = 0;
                
                // High relevance: Same city and builder
                if (item.city && mainCities.includes(item.city) && 
                    item.builderName && mainBuilders.includes(item.builderName)) {
                  relevanceScore += 100;
                }
                // High relevance: Same city and type
                else if (item.city && mainCities.includes(item.city) && 
                         item.type && mainTypes.includes(item.type)) {
                  relevanceScore += 80;
                }
                // Medium relevance: Same city
                else if (item.city && mainCities.includes(item.city)) {
                  relevanceScore += 60;
                }
                // Medium relevance: Same builder
                else if (item.builderName && mainBuilders.includes(item.builderName)) {
                  relevanceScore += 50;
                }
                // Medium relevance: Same type
                else if (item.type && mainTypes.includes(item.type)) {
                  relevanceScore += 40;
                }
                // Low relevance: Same state
                else if (item.state && mainStates.includes(item.state)) {
                  relevanceScore += 30;
                }
                // Low relevance: Similar price range
                else if (mainPriceRanges.length > 0) {
                  const itemAvgPrice = ((item.minPrice || 0) + (item.maxPrice || 0)) / 2;
                  const itemPriceRange = itemAvgPrice > 0 ? Math.floor(itemAvgPrice / 2) * 2 : null;
                  if (itemPriceRange && mainPriceRanges.includes(itemPriceRange)) {
                    relevanceScore += 20;
                  }
                }
                
                // Only include if it has some relevance
                if (relevanceScore > 0) {
                  item._relatedRelevanceScore = relevanceScore;
                  return true;
                }
                
                return false;
              })
              .map(item => {
                item._relevanceScore = Math.max(item._relatedRelevanceScore || 10, 10); // Ensure minimum score
                item._isRelated = true;
                return item;
              })
              .sort((a, b) => (b._relatedRelevanceScore || 0) - (a._relatedRelevanceScore || 0))
              .slice(0, limit);
            
            return related;
          };

          // Add related projects to each category - unlimited when exact matches found
          const relatedRentals = hasExactMatches ? 
            addRelatedProjects(localRentArr, localRentArr, 999) : 
            addRelatedProjects(localRentArr, localRentArr, 30);
          const relatedSales = hasExactMatches ? 
            addRelatedProjects(localBuyArr, localBuyArr, 999) : 
            addRelatedProjects(localBuyArr, localBuyArr, 30);
          const relatedProjects = hasExactMatches ? 
            addRelatedProjects(localSearchArr, localSearchArr, 999) : 
            addRelatedProjects(localSearchArr, localSearchArr, 80);

          // Also add cross-category related projects
          const addCrossCategoryRelated = (mainResults, otherCategoryProjects, limit = 20) => {
            if (mainResults.length === 0) return [];
            
            const mainCities = [...new Set(mainResults.map(item => item.city).filter(Boolean))];
            const mainBuilders = [...new Set(mainResults.map(item => item.builderName || item.developer).filter(Boolean))];
            
            return otherCategoryProjects
              .filter(item => {
                const isAlreadyShown = mainResults.some(main => 
                  (main.projectName || main.propertyName) === (item.projectName || item.propertyName)
                );
                if (isAlreadyShown) return false;
                
                return (
                  (item.city && mainCities.includes(item.city)) ||
                  (item.builderName && mainBuilders.includes(item.builderName)) ||
                  (item.developer && mainBuilders.includes(item.developer))
                );
              })
              .map(item => {
                item._relevanceScore = 5; // Lower score for cross-category
                item._isRelated = true;
                item._isCrossCategory = true;
                return item;
              })
              .slice(0, limit);
          };

          // Add cross-category suggestions - unlimited when exact matches found
          const crossCategoryRentals = addCrossCategoryRelated(localSearchArr, localRentArr, hasExactMatches ? 999 : 15);
          const crossCategorySales = addCrossCategoryRelated(localSearchArr, localBuyArr, hasExactMatches ? 999 : 15);
          const crossCategoryProjects = addCrossCategoryRelated(localRentArr, localSearchArr, hasExactMatches ? 999 : 10);

          // Combine all results - Exact matches first, then related
          let allCombinedResults = [
            ...localSearchArr.filter(item => !item._isRelated), // Exact matches first
            ...relatedProjects, // Then related projects
            ...crossCategorySales // Then cross-category
          ];

          // If exact matches found but total results are still limited, add more projects
          if (hasExactMatches && allCombinedResults.length < 100) {
            const additionalProjects = projectsData
              .filter(item => !allCombinedResults.some(result => 
                (result.projectName || result.propertyName) === (item.projectName || item.propertyName)
              ))
              .slice(0, 200 - allCombinedResults.length)
              .map((item) => ({
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
                _relevanceScore: 1, // Low score for additional projects
                _isRelated: true,
              }));
            
            allCombinedResults = [...allCombinedResults, ...additionalProjects];
            console.log(`📈 Added ${additionalProjects.length} more projects to reach ${allCombinedResults.length} total results`);
          }

          console.log('Combined results:', {
            exactMatches: localSearchArr.filter(item => !item._isRelated).length,
            relatedProjects: relatedProjects.length,
            crossCategory: crossCategorySales.length,
            total: allCombinedResults.length
          });

          // Set up infinite scroll data
          setAllSearchData(allCombinedResults);
          setDisplayedCount(Math.min(20, allCombinedResults.length));
          setSearchData(allCombinedResults.slice(0, 20));
          setHasMore(allCombinedResults.length > 20);
          
          // Show summary in console for debugging
          console.log(`🎯 Search Results: ${localSearchArr.filter(item => !item._isRelated).length} exact matches + ${relatedProjects.length + crossCategorySales.length} related properties = ${allCombinedResults.length} total`);
          
          // Update other categories with combined results
          localRentArr = [...localRentArr.filter(item => !item._isRelated), ...relatedRentals, ...crossCategoryProjects];
          localBuyArr = [...localBuyArr.filter(item => !item._isRelated), ...relatedSales, ...crossCategoryRentals];
        }

        // Only update other categories, searchData is handled by infinite scroll
        setBuySearchData(localBuyArr);
        setRentSearchData(localRentArr);
        console.log('Search Results Summary:', {
          searchTerm,
          searchWords,
          totalBeforeFilter: {
            rentals: rentResult.status === "fulfilled" ? (rentResult.value?.data?.rentaldata || []).length : 0,
            sales: saleResult.status === "fulfilled" ? (saleResult.value?.data?.ResaleData || saleResult.value?.data?.saledata || saleResult.value?.data?.buydata || []).length : 0,
            projects: projectsData.length
          },
          totalAfterFilter: {
            rentals: localRentArr.length,
            sales: localBuyArr.length,
            projects: localSearchArr.length
          },
          relatedResults: {
            rentals: localRentArr.filter(item => item._isRelated).length,
            sales: localBuyArr.filter(item => item._isRelated).length,
            projects: localSearchArr.filter(item => item._isRelated).length,
            crossCategory: [...localRentArr, ...localBuyArr, ...localSearchArr].filter(item => item._isCrossCategory).length
          },
          isEmptySearch
        });

        // Check if any data was found
        if (localRentArr.length === 0 && localBuyArr.length === 0 && localSearchArr.length === 0) {
          console.warn('No search results found for:', {
            searchTerm,
            searchWords,
            originalQuery: key1,
            originalLocation: key2,
            collectionName: key3
          });
        } else {
          console.log('Search results found:', {
            rentals: localRentArr.map(item => ({
              name: item.propertyName || item.projectName,
              sourceType: item.sourceType,
              relevanceScore: item.relevanceScore
            })).slice(0, 3),
            sales: localBuyArr.map(item => ({
              name: item.propertyName || item.projectName,
              sourceType: item.sourceType,
              relevanceScore: item.relevanceScore
            })).slice(0, 3),
            projects: localSearchArr.map(item => ({
              name: item.projectName,
              sourceType: item.sourceType,
              relevanceScore: item.relevanceScore
            })).slice(0, 3)
          });
        }

        console.log('About to update state with search results:', {
          rentals: localRentArr.length,
          sales: localBuyArr.length,
          projects: localSearchArr.length,
          isFallbackMode: false
        });

        setSearchData(localSearchArr);
        setRentSearchData(localRentArr);
        setBuySearchData(localBuyArr);
        setIsFallbackMode(false);
        
        console.log('State update completed');

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
          const allProjectsRes = await searchApi.get("/project/viewAll/data");
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
          const allProjectsRes = await searchApi.get("/project/viewAll/data");
          let allProjectsArr = (allProjectsRes.data.data || []);

          // Score by relevance: exact first, then all-words, then some-words; never empty - fallback to random
          const searchTerm = key1.toLowerCase().trim();
          const searchWords = searchTerm.split(/\s+/).filter(w => w.length > 0);
          const getSearchableText = (item) => [
            item.projectName,
            item.builderName,
            item.type,
            item.projectAddress,
            item.city,
            item.state,
            item.project_discripation,
            item.description,
            item.title,
            item.name,
          ].filter(Boolean).join(' ').toLowerCase();
          const scoreProject = (item) => {
            const text = getSearchableText(item);
            const name = (item.projectName || '').toLowerCase();
            if (name === searchTerm) return 1000;
            if (name.startsWith(searchTerm)) return 500;
            if (text.includes(searchTerm)) return 250;
            if (searchWords.every(w => text.includes(w))) return 100;
            if (searchWords.some(w => text.includes(w))) return 50;
            return 0;
          };
          const scored = allProjectsArr.map((item) => ({ item, score: scoreProject(item) }));
          const matched = scored.filter(({ score }) => score > 0).sort((a, b) => b.score - a.score);
          const toShow = matched.length > 0
            ? matched.map(({ item }) => ({
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
            : allProjectsArr.map((item) => ({
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
              })).sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(toShow);
          setIsFallbackMode(true);
          setFallbackLoading(false);
        } else {
          // We have search results - show them (projects, rent, and buy properties)
          setIsFallbackMode(false);
        }
      } catch (error) {
        // Any error should trigger fallback mode (show all projects)
        console.error('Search error, triggering fallback:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          response: error.response?.data,
          status: error.response?.status
        });
        
        setFallbackLoading(true);
        try {
          const allProjectsRes = await searchApi.get("/project/viewAll/data");
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
    // Separate by source type for prioritization
    const projects = (searchData || []).filter(item => item.sourceType === 'project');
    const resale = (buySearchData || []).filter(item => item.sourceType === 'buy');
    const rentals = (rentSearchData || []).filter(item => item.sourceType === 'rent');
    
    // Combine in priority order: Projects → Resale → Rentals
    const combined = [
      ...projects,
      ...resale,
      ...rentals
    ];
    
    // Sort by relevance score within each category
    const sorted = combined.sort((a, b) => {
      const scoreA = a._relevanceScore || 0;
      const scoreB = b._relevanceScore || 0;
      
      // First sort by source type priority
      const priorityOrder = { 'project': 3, 'buy': 2, 'rent': 1 };
      const priorityA = priorityOrder[a.sourceType] || 0;
      const priorityB = priorityOrder[b.sourceType] || 0;
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Higher priority first
      }
      
      // Then sort by relevance score within same category
      return scoreB - scoreA;
    });
    
    // Log priority breakdown
    const projectCount = sorted.filter(item => item.sourceType === 'project').length;
    const resaleCount = sorted.filter(item => item.sourceType === 'buy').length;
    const rentalCount = sorted.filter(item => item.sourceType === 'rent').length;
    
    console.log(`🏆 Priority Order: ${projectCount} Projects → ${resaleCount} Resale → ${rentalCount} Rentals`);
    
    return sorted;
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
                <option value="">🏗️ Status</option>
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

      {/* Mobile Floating Filter Button - Bottom Right */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-24 right-6 z-50 w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300 mb-36"
        aria-label="Toggle Filters"
      >
        {showFilters ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiFilter className="w-6 h-6" />
        )}
      </button>

      {/* New Compact Sticky Filter Bar (always visible) */}
      <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="py-3 h md:max-w-7xl md:mx-auto md:px-4">
          {/* Filter Controls */}
          <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row md:flex-wrap gap-3 md:items-center md:justify-center px-4 md:px-0`}>
            {/* Type */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-700 md:text-gray-600">Type</span>
              <select
                aria-label="Type"
                className="w-full md:min-w-[180px] md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
            </div>

            {/* Sort */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-700 md:text-gray-600">Sort</span>
              <select
                aria-label="Sort"
                className="w-full md:min-w-[170px] md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-700 md:text-gray-600">Price</span>
              <select
                aria-label="Price"
                className="w-full md:min-w-[200px] md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
            </div>

            {/* City */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-700 md:text-gray-600">City</span>
              <select
                aria-label="City"
                className="w-full md:min-w-[180px] md:w-auto px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={primeLocation}
                onChange={(e) => setPrimeLocation(e.target.value)}
              >
                <option value="">All Cities</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Clear */}
            {(projectType || priceRange || primeLocation || sortBy) && (
              <button
                onClick={() => { setProjectType(""); setPriceRange(""); setPrimeLocation(""); setSortBy(""); }}
                className="text-sm text-gray-600 underline w-full md:w-auto text-center md:text-left mt-2 md:mt-0"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{ paddingTop: isFallbackMode ? "48px" : "48px" }}>

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

                    {/* Related Property Badge */}
                    {property._isRelated && (
                      <div className="absolute top-3 left-3 z-[3] ml-20">
                        {/* <div className={`${property._isCrossCategory ? 'bg-blue-500' : 'bg-green-500'} text-white rounded-full px-2 py-1 shadow-md border border-white/20 flex items-center gap-1`}>
                          <FiFilter className="w-2.5 h-2.5" />
                          <span className="text-[8px] font-bold">
                            {property._isCrossCategory ? 'RELATED' : 'SIMILAR'}
                          </span>
                        </div> */}
                      </div>
                    )}

                    {/* Priority Type Badge */}
                    <div className="absolute top-3 right-12 z-[3]">
                      {/* <div className={`${
                        propertyType === 'project' ? 'bg-purple-600' : 
                        propertyType === 'buy' ? 'bg-orange-500' : 
                        'bg-blue-600'
                      } text-white rounded-full px-2 py-1 shadow-md border border-white/20 flex items-center gap-1`}>
                        <span className="text-[7px] font-bold">
                          {propertyType === 'project' ? 'PROJECT' : 
                           propertyType === 'buy' ? 'RESALE' : 
                           'RENTAL'}
                        </span>
                      </div> */}
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
          
          {/* Loading Indicator for Infinite Scroll */}
          {isLoading && hasMore && (
            <div className="flex justify-center items-center py-8">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <p className="text-sm text-gray-600 font-medium">Loading more properties...</p>
              </div>
            </div>
          )}
          
          {/* End of Results Indicator */}
          {!hasMore && allSearchData.length > 20 && (
            <div className="text-center py-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {Math.min(displayedCount, allSearchData.length)} of {allSearchData.length} properties
              </p>
            </div>
          )}
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