import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiMic, FiMapPin, FiChevronRight, FiChevronLeft, FiCrosshair } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import SmallBannerSection from './SmallBannerSection';
import { useMediaQuery } from '@chakra-ui/react';
import api from '../../config/apiClient';

function SearchBar() {
  const [activeLink, setActiveLink] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  const trendingSearches = [
    "Luxury Apartment in Mumbai",
    "Villas in Bangalore",
    "Plots in Hyderabad",
    "Commercial Space in Delhi",
    "New Launch in Pune"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced number conversion system with advanced features
  const numberWords = {
    // Basic numbers
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',

    // Teens
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13', 'fourteen': '14',
    'fifteen': '15', 'sixteen': '16', 'seventeen': '17', 'eighteen': '18', 'nineteen': '19',

    // Tens
    'twenty': '20', 'thirty': '30', 'forty': '40', 'fifty': '50',
    'sixty': '60', 'seventy': '70', 'eighty': '80', 'ninety': '90',

    // Large numbers
    'hundred': '100', 'thousand': '1000', 'lakh': '100000', 'crore': '10000000',

    // Common abbreviations
    'k': '1000', 'thou': '1000', 'grand': '1000',
    'm': '1000000', 'mil': '1000000', 'million': '1000000',
    'cr': '10000000', 'c': '10000000', 'crores': '10000000',
    'l': '100000', 'lac': '100000', 'lakhs': '100000',
    'b': '1000000000', 'bil': '1000000000', 'billion': '1000000000'
  };

  const numberDigits = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine',
    '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen',
    '15': 'fifteen', '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen',
    '20': 'twenty', '30': 'thirty', '40': 'forty', '50': 'fifty',
    '60': 'sixty', '70': 'seventy', '80': 'eighty', '90': 'ninety',
    '100': 'hundred', '1000': 'thousand', '100000': 'lakh', '10000000': 'crore',
    '1000000': 'million', '1000000000': 'billion'
  };

  // Function to parse combined number words like "twenty one" → 21
  const parseCombinedNumber = (words) => {
    let total = 0;
    let current = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      const nextWord = words[i + 1]?.toLowerCase();

      if (numberWords[word]) {
        const value = parseInt(numberWords[word]);

        // Check for "hundred", "thousand", etc. patterns
        if (value === 100 && nextWord && numberWords[nextWord]) {
          // "two hundred" pattern
          if (current === 0) current = 1;
          total += current * 100;
          current = parseInt(numberWords[nextWord]) || 0;
          if (nextWord && parseInt(numberWords[nextWord]) < 100) {
            total += current;
            current = 0;
          }
          i++; // Skip next word as we processed it
        } else if (value >= 1000) {
          // "two thousand" pattern
          total += current * value;
          current = 0;
        } else if (value >= 10 && value < 100) {
          // "twenty one" pattern
          if (nextWord && numberWords[nextWord] && parseInt(numberWords[nextWord]) < 10) {
            total += value + parseInt(numberWords[nextWord]);
            i++; // Skip next word
          } else {
            total += value;
          }
        } else {
          // Single digit
          current += value;
        }
      }
    }

    return (total + current).toString();
  };

  // Enhanced function to get all formats of a number query
  const getNumberFormats = (query) => {
    const formats = new Set([query.toLowerCase()]);
    const originalQuery = query.toLowerCase();

    // Handle abbreviations first
    const abbrPatterns = [
      /\b(\d+(?:\.\d+)?)\s*(k|thou|grand|thousand)\b/gi,
      /\b(\d+(?:\.\d+)?)\s*(m|mil|million)\b/gi,
      /\b(\d+(?:\.\d+)?)\s*(cr|c|crores)\b/gi,
      /\b(\d+(?:\.\d+)?)\s*(l|lac|lakhs)\b/gi,
      /\b(\d+(?:\.\d+)?)\s*(b|bil|billion)\b/gi
    ];

    abbrPatterns.forEach(pattern => {
      const matches = originalQuery.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const expanded = match.replace(pattern, (m, num, abbr) => {
            const multiplier = numberWords[abbr.toLowerCase()] || '1';
            return (parseFloat(num) * parseInt(multiplier)).toString();
          });
          formats.add(expanded);
        });
      }
    });

    // Check if query is a direct number word
    if (numberWords[originalQuery]) {
      formats.add(numberWords[originalQuery]);
    }

    // Check if query is a direct number digit
    if (numberDigits[originalQuery]) {
      formats.add(numberDigits[originalQuery]);
    }

    // Handle combined number words
    const words = originalQuery.split(/\s+/);
    if (words.length > 1) {
      const combinedNumber = parseCombinedNumber(words);
      if (combinedNumber !== '0') {
        formats.add(combinedNumber);
        // Also add the reverse (digits to words)
        if (numberDigits[combinedNumber]) {
          formats.add(numberDigits[combinedNumber]);
        }
      }
    }

    // Check each word individually
    words.forEach(word => {
      if (numberWords[word]) {
        formats.add(numberWords[word]);
      }
      if (numberDigits[word]) {
        formats.add(numberDigits[word]);
      }
    });

    // Handle mixed patterns like "tower one", "one tower 42"
    const mixedPatterns = [
      /\b(tower|flat|apartment|house|building|property|room|bedroom|bathroom|bhk)\s+(\w+)\b/gi,
      /\b(\w+)\s+(tower|flat|apartment|house|building|property|room|bedroom|bathroom|bhk)\s*(\d+)?\b/gi,
      /\b(\w+)\s+(\d+)\b/gi
    ];

    mixedPatterns.forEach(pattern => {
      const matches = originalQuery.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Extract numbers and convert them
          const numberMatches = match.match(/\b\d+\b/g);
          if (numberMatches) {
            numberMatches.forEach(num => {
              if (numberDigits[num]) {
                const wordVersion = match.replace(num, numberDigits[num]);
                formats.add(wordVersion);
              }
            });
          }

          // Extract words and convert them
          const wordMatches = match.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\b/gi);
          if (wordMatches) {
            wordMatches.forEach(word => {
              if (numberWords[word.toLowerCase()]) {
                const digitVersion = match.replace(new RegExp(`\\b${word}\\b`, 'gi'), numberWords[word.toLowerCase()]);
                formats.add(digitVersion);
              }
            });
          }
        });
      }
    });

    return Array.from(formats);
  };

  // Enhanced search function with fuzzy matching
  const performAdvancedSearch = async (query) => {
    const allFormats = getNumberFormats(query);

    // Also add fuzzy matches (prefix/suffix matching)
    const fuzzyMatches = [];
    Object.keys(numberWords).forEach(word => {
      if (word.includes(query.toLowerCase()) || query.toLowerCase().includes(word)) {
        fuzzyMatches.push(numberWords[word]);
      }
    });

    Object.keys(numberDigits).forEach(digit => {
      if (digit.includes(query.toLowerCase()) || query.toLowerCase().includes(digit)) {
        fuzzyMatches.push(numberDigits[digit]);
      }
    });

    const allSearchTerms = [...new Set([...allFormats, ...fuzzyMatches])];

    const searchPromises = allSearchTerms.map(format =>
      api.get(`/search/suggestions/${encodeURIComponent(format)}`)
        .then(response => ({ format, data: response.data.suggestions || [] }))
        .catch(() => ({ format, data: [] }))
    );

    return Promise.all(searchPromises).then(results => {
      const combinedSuggestions = new Map();

      results.forEach(({ format, data }) => {
        data.forEach(suggestion => {
          const key = `${suggestion.type}-${suggestion.text}`;
          if (!combinedSuggestions.has(key) ||
              format === query.toLowerCase() || // Prioritize original format
              combinedSuggestions.get(key).format !== query.toLowerCase()) {
            combinedSuggestions.set(key, { ...suggestion, format });
          }
        });
      });

      return Array.from(combinedSuggestions.values());
    });
  };

  // Load previous searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem('previousSearches');
    if (storedSearches) {
      setPreviousSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save search to localStorage
  const saveSearchToLocalStorage = (query) => {
    if (!query.trim()) return;

    const updatedSearches = [query, ...previousSearches.filter(s => s !== query)].slice(0, 10); // Keep only latest 10 unique searches
    setPreviousSearches(updatedSearches);
    localStorage.setItem('previousSearches', JSON.stringify(updatedSearches));
  };

  // Fetch search suggestions as user types - Enhanced for advanced features
  const fetchSuggestions = async (query) => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      // Use the enhanced advanced search
      const combinedSuggestions = await performAdvancedSearch(query);
      setSuggestions(combinedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounced search suggestions
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery.trim());
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    switch (linkName) {
      case "Rent":
        window.open(window.location.origin + "/buy-properties/best-resale-property-in-gurugram/", '_blank');
        break;

        case "New Launch":
          window.open(window.location.origin + "/projects-in-newlaunch/", '_blank',);
          break;

        case "Commercial":
          window.open(window.location.origin + "/projects/commercial/", '_blank',);
          break;

        case "Plots":
          window.open(window.location.origin + "/plots-in-gurugram/", '_blank',);
          break;

        case "SCO":
          window.open(window.location.origin + "/sco/plots/", '_blank',);
          break;

    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // Check if search query is a builder name and redirect to builder page
    if (handleBuilderRedirect(searchQuery)) {
      return; // Builder redirect handled
    }

    // Regular property search logic
    const allFormats = getNumberFormats(searchQuery);
    allFormats.forEach(format => {
      saveSearchToLocalStorage(format);
    });

    const searchData = {
      location: { lat: latitude, lng: longitude },
      query: searchQuery,
      collectionName: activeLink,
      nearby: true,
    };
    const key = encodeURIComponent(JSON.stringify(searchData));
    window.location.href = `/searchdata/${key}`;
  };

  const handleSuggestionClick = (suggestion) => {
    // Hide suggestions dropdown
    setShowSuggestions(false);

    // Check if suggestion text is a builder name and redirect to builder page
    const suggestionText = suggestion.text || suggestion;
    if (handleBuilderRedirect(suggestionText)) {
      return; // Builder redirect handled
    }

    // Save both formats of the suggestion to localStorage
    const allFormats = getNumberFormats(suggestionText);
    allFormats.forEach(format => {
      saveSearchToLocalStorage(format);
    });

    // Navigate to the suggestion's URL
    if (suggestion.url) {
      window.location.href = suggestion.url;
    } else {
      // If no URL, update search query and perform search
      setSearchQuery(suggestionText);
      handleSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Optional: show coords in the input briefly
        setSearchQuery(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);

        // Navigate directly to results with current location so nearby properties show
        const searchData = {
          location: { lat: latitude, lng: longitude },
          query: "",
          collectionName: activeLink,
          nearby: true,
        };
        const key = encodeURIComponent(JSON.stringify(searchData));
        window.location.href = `/searchdata/${key}`;
      },
      (error) => {
        console.warn('Unable to retrieve location:', error?.message || error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Builder mapping for redirecting to builder pages
  const builderMapping = {
    'dlf': '/builders/dlf/',
    'emaar': '/builders/emaar/',
    'unitech': '/builders/unitech/',
    'vatika': '/builders/vatika/',
    'm3m': '/builders/m3m/',
    'supertech': '/builders/supertech/',
    'godrej': '/builders/godrej/',
    'tata': '/builders/tata/',
    'sobha': '/builders/sobha/',
    'paras': '/builders/paras/',
    'bptp': '/builders/bptp/',
    'eldeco': '/builders/eldeco/',
    'ansal': '/builders/ansal/',
    'raheja': '/builders/raheja/',
    'vipul': '/builders/vipul/',
    'signature global': '/builders/signature-global/',
    'signature': '/builders/signature-global/',
    'orris': '/builders/orris/',
    'conscient': '/builders/conscient/',
    'saya': '/builders/saya/',
    'mahindra': '/builders/mahindra/',
    'mittal': '/builders/mittal/',
    'omaxe': '/builders/omaxe/',
    'ramprastha': '/builders/ramprastha/',
    'suncity': '/builders/suncity/',
    'tulip': '/builders/tulip/',
    'umang': '/builders/umang/',
    'spaze': '/builders/spaze/',
    'pioneer': '/builders/pioneer/',
    'krisumi': '/builders/krisumi/',
    'silverglades': '/builders/silverglades/',
    'alpha': '/builders/alpha/',
    'aipl': '/builders/aipl/',
    'maple': '/builders/maple/',
    'central park': '/builders/central-park/',
    'good earth': '/builders/good-earth/',
    'emaar mgf': '/builders/emaar/',
    'jmd': '/builders/jmd/',
    'm2k': '/builders/m2k/',
    'mgf': '/builders/mgf/',
    'puri': '/builders/puri/',
    'pyramid': '/builders/pyramid/',
    'sahara': '/builders/sahara/',
    'ss group': '/builders/ss-group/',
    'the hemisphere': '/builders/the-hemisphere/',
    'whiteland': '/builders/whiteland/',
  };

  // Function to detect if search query is a builder name
  const detectBuilderSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    return builderMapping[lowerQuery] || Object.keys(builderMapping).find(builder => lowerQuery.includes(builder));
  };

  // Function to handle builder redirect
  const handleBuilderRedirect = (builderName) => {
    const builderKey = builderName.toLowerCase().trim();
    const builderPath = builderMapping[builderKey];

    if (builderPath) {
      window.location.href = builderPath;
      return true;
    }

    // Check if query contains builder name
    for (const [builder, path] of Object.entries(builderMapping)) {
      if (builderKey.includes(builder)) {
        window.location.href = path;
        return true;
      }
    }

    return false;
  };

  // Property-related keywords and their complete suggestions
  const propertyKeywords = {
    'resale': ['resale properties in gurugram', 'resale flats in gurugram', 'resale apartments in gurugram'],
    'rental': ['rental properties in gurugram', 'rent properties in gurugram', 'rental flats in gurugram'],
    'rent': ['rent properties in gurugram', 'rental properties in gurugram', 'rent flats in gurugram'],
    'buy': ['buy properties in gurugram', 'buy flats in gurugram', 'buy apartments in gurugram'],
    'purchase': ['purchase properties in gurugram', 'buy properties in gurugram'],
    'properties': ['properties in gurugram', 'flats in gurugram', 'apartments in gurugram'],
    'flats': ['flats in gurugram', 'apartments in gurugram', 'properties in gurugram'],
    'apartments': ['apartments in gurugram', 'flats in gurugram', 'properties in gurugram'],
    'plots': ['plots in gurugram', 'plot for sale in gurugram', 'land in gurugram'],
    'villas': ['villas in gurugram', 'independent houses in gurugram', 'bunglows in gurugram'],
    'commercial': ['commercial properties in gurugram', 'office space in gurugram', 'shops in gurugram'],
    'office': ['office space in gurugram', 'commercial properties in gurugram'],
    'shop': ['shops in gurugram', 'commercial properties in gurugram'],

    // Additional property types
    'studio': ['studio apartments in gurugram', 'studio flats in gurugram'],
    '1bhk': ['1bhk flats in gurugram', '1 bedroom apartments in gurugram'],
    '2bhk': ['2bhk flats in gurugram', '2 bedroom apartments in gurugram'],
    '3bhk': ['3bhk flats in gurugram', '3 bedroom apartments in gurugram'],
    '4bhk': ['4bhk flats in gurugram', '4 bedroom apartments in gurugram'],
    '5bhk': ['5bhk flats in gurugram', '5 bedroom apartments in gurugram'],
    'penthouse': ['penthouse in gurugram', 'luxury penthouse in gurugram'],
    'duplex': ['duplex in gurugram', 'duplex apartments in gurugram'],
    'builder floor': ['builder floor in gurugram', 'builder floors in gurugram'],
    'independent house': ['independent house in gurugram', 'houses in gurugram'],
    'farmhouse': ['farmhouse in gurugram', 'farmhouses in gurugram'],
    'warehouse': ['warehouse in gurugram', 'warehouses in gurugram'],
    'showroom': ['showroom in gurugram', 'showrooms in gurugram'],
    'retail': ['retail space in gurugram', 'retail shops in gurugram'],
    'industrial': ['industrial property in gurugram', 'industrial space in gurugram'],
    'godown': ['godown in gurugram', 'godowns in gurugram'],
    'co-working': ['co-working space in gurugram', 'coworking space in gurugram'],
    'serviced apartment': ['serviced apartments in gurugram', 'service apartments in gurugram'],

    // Price-related keywords
    'budget': ['budget properties in gurugram', 'budget flats in gurugram'],
    'affordable': ['affordable properties in gurugram', 'affordable housing in gurugram'],
    'luxury': ['luxury properties in gurugram', 'luxury apartments in gurugram'],
    'premium': ['premium properties in gurugram', 'premium apartments in gurugram'],
    'cheap': ['cheap properties in gurugram', 'cheap flats in gurugram'],
    'under 50 lakh': ['properties under 50 lakh in gurugram', 'flats under 50 lakh in gurugram'],
    'under 1 crore': ['properties under 1 crore in gurugram', 'flats under 1 crore in gurugram'],
    'under 2 crore': ['properties under 2 crore in gurugram', 'flats under 2 crore in gurugram'],

    // Feature-related keywords
    'ready to move': ['ready to move properties in gurugram', 'ready to move flats in gurugram'],
    'under construction': ['under construction properties in gurugram', 'under construction flats in gurugram'],
    'new launch': ['new launch projects in gurugram', 'new launch properties in gurugram'],
    'possession soon': ['possession soon properties in gurugram', 'early possession flats in gurugram'],
    'gated community': ['gated community properties in gurugram', 'gated society flats in gurugram'],
    'society': ['society flats in gurugram', 'housing society in gurugram'],
    'township': ['township properties in gurugram', 'integrated township in gurugram'],
    'high rise': ['high rise apartments in gurugram', 'high rise buildings in gurugram'],
    'low rise': ['low rise apartments in gurugram', 'low rise buildings in gurugram'],

    // Amenities
    'swimming pool': ['properties with swimming pool in gurugram', 'flats with pool in gurugram'],
    'gym': ['properties with gym in gurugram', 'flats with gym in gurugram'],
    'parking': ['properties with parking in gurugram', 'flats with parking in gurugram'],
    'garden': ['properties with garden in gurugram', 'flats with garden in gurugram'],
    'balcony': ['properties with balcony in gurugram', 'flats with balcony in gurugram'],
    'terrace': ['properties with terrace in gurugram', 'flats with terrace in gurugram'],
    'security': ['properties with security in gurugram', 'secured flats in gurugram'],
    'lift': ['properties with lift in gurugram', 'flats with elevator in gurugram'],
    'power backup': ['properties with power backup in gurugram', 'flats with generator in gurugram'],

    // Investment keywords
    'investment': ['investment properties in gurugram', 'property investment in gurugram'],
    'rental yield': ['high rental yield properties in gurugram', 'rental income properties in gurugram'],
    'appreciation': ['high appreciation properties in gurugram', 'property appreciation in gurugram'],
    'capital gain': ['capital gain properties in gurugram', 'investment for capital gain in gurugram'],
  };

  const localities = [
    { name: "Sohna Road", link: "/property-in-gurugram/sohna-road/" },
    { name: "Golf Course Road", link: "/property-in-gurugram/golf-course/" },
    { name: "MG Road", link: "/property-in-gurugram/mg-road/" },
    { name: "Northern Peripheral Road", link: "/property-in-gurugram/northern-peripheral-road/" },
    { name: "Dwarka Expressway", link: "/property-in-gurugram/dwarka-expressway/" },
    { name: "New Gurgaon", link: "/property-in-gurugram/new-gurgaon/" },
    { name: "Sohna", link: "/property-in-gurugram/sohna/" },
    { name: "Southern Peripheral Road", link: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "NH-48", link: "/property-in-gurugram/nh-48/" },
    { name: "Golf Course Extn Road", link: "/property-in-gurugram/golf-course-extn-road/" },

    // Sector-wise localities in Gurugram
    { name: "Sector 1", link: "/property-in-gurugram/sector-1/" },
    { name: "Sector 2", link: "/property-in-gurugram/sector-2/" },
    { name: "Sector 3", link: "/property-in-gurugram/sector-3/" },
    { name: "Sector 4", link: "/property-in-gurugram/sector-4/" },
    { name: "Sector 5", link: "/property-in-gurugram/sector-5/" },
    { name: "Sector 6", link: "/property-in-gurugram/sector-6/" },
    { name: "Sector 7", link: "/property-in-gurugram/sector-7/" },
    { name: "Sector 8", link: "/property-in-gurugram/sector-8/" },
    { name: "Sector 9", link: "/property-in-gurugram/sector-9/" },
    { name: "Sector 10", link: "/property-in-gurugram/sector-10/" },
    { name: "Sector 11", link: "/property-in-gurugram/sector-11/" },
    { name: "Sector 12", link: "/property-in-gurugram/sector-12/" },
    { name: "Sector 13", link: "/property-in-gurugram/sector-13/" },
    { name: "Sector 14", link: "/property-in-gurugram/sector-14/" },
    { name: "Sector 15", link: "/property-in-gurugram/sector-15/" },
    { name: "Sector 16", link: "/property-in-gurugram/sector-16/" },
    { name: "Sector 17", link: "/property-in-gurugram/sector-17/" },
    { name: "Sector 18", link: "/property-in-gurugram/sector-18/" },
    { name: "Sector 19", link: "/property-in-gurugram/sector-19/" },
    { name: "Sector 20", link: "/property-in-gurugram/sector-20/" },
    { name: "Sector 21", link: "/property-in-gurugram/sector-21/" },
    { name: "Sector 22", link: "/property-in-gurugram/sector-22/" },
    { name: "Sector 23", link: "/property-in-gurugram/sector-23/" },
    { name: "Sector 24", link: "/property-in-gurugram/sector-24/" },
    { name: "Sector 25", link: "/property-in-gurugram/sector-25/" },
    { name: "Sector 26", link: "/property-in-gurugram/sector-26/" },
    { name: "Sector 27", link: "/property-in-gurugram/sector-27/" },
    { name: "Sector 28", link: "/property-in-gurugram/sector-28/" },
    { name: "Sector 29", link: "/property-in-gurugram/sector-29/" },
    { name: "Sector 30", link: "/property-in-gurugram/sector-30/" },
    { name: "Sector 31", link: "/property-in-gurugram/sector-31/" },
    { name: "Sector 32", link: "/property-in-gurugram/sector-32/" },
    { name: "Sector 33", link: "/property-in-gurugram/sector-33/" },
    { name: "Sector 34", link: "/property-in-gurugram/sector-34/" },
    { name: "Sector 35", link: "/property-in-gurugram/sector-35/" },
    { name: "Sector 36", link: "/property-in-gurugram/sector-36/" },
    { name: "Sector 37", link: "/property-in-gurugram/sector-37/" },
    { name: "Sector 38", link: "/property-in-gurugram/sector-38/" },
    { name: "Sector 39", link: "/property-in-gurugram/sector-39/" },
    { name: "Sector 40", link: "/property-in-gurugram/sector-40/" },
    { name: "Sector 41", link: "/property-in-gurugram/sector-41/" },
    { name: "Sector 42", link: "/property-in-gurugram/sector-42/" },
    { name: "Sector 43", link: "/property-in-gurugram/sector-43/" },
    { name: "Sector 44", link: "/property-in-gurugram/sector-44/" },
    { name: "Sector 45", link: "/property-in-gurugram/sector-45/" },
    { name: "Sector 46", link: "/property-in-gurugram/sector-46/" },
    { name: "Sector 47", link: "/property-in-gurugram/sector-47/" },
    { name: "Sector 48", link: "/property-in-gurugram/sector-48/" },
    { name: "Sector 49", link: "/property-in-gurugram/sector-49/" },
    { name: "Sector 50", link: "/property-in-gurugram/sector-50/" },
    { name: "Sector 51", link: "/property-in-gurugram/sector-51/" },
    { name: "Sector 52", link: "/property-in-gurugram/sector-52/" },
    { name: "Sector 53", link: "/property-in-gurugram/sector-53/" },
    { name: "Sector 54", link: "/property-in-gurugram/sector-54/" },
    { name: "Sector 55", link: "/property-in-gurugram/sector-55/" },
    { name: "Sector 56", link: "/property-in-gurugram/sector-56/" },
    { name: "Sector 57", link: "/property-in-gurugram/sector-57/" },
    { name: "Sector 58", link: "/property-in-gurugram/sector-58/" },
    { name: "Sector 59", link: "/property-in-gurugram/sector-59/" },
    { name: "Sector 60", link: "/property-in-gurugram/sector-60/" },
    { name: "Sector 61", link: "/property-in-gurugram/sector-61/" },
    { name: "Sector 62", link: "/property-in-gurugram/sector-62/" },
    { name: "Sector 63", link: "/property-in-gurugram/sector-63/" },
    { name: "Sector 64", link: "/property-in-gurugram/sector-64/" },
    { name: "Sector 65", link: "/property-in-gurugram/sector-65/" },
    { name: "Sector 66", link: "/property-in-gurugram/sector-66/" },
    { name: "Sector 67", link: "/property-in-gurugram/sector-67/" },
    { name: "Sector 68", link: "/property-in-gurugram/sector-68/" },
    { name: "Sector 69", link: "/property-in-gurugram/sector-69/" },
    { name: "Sector 70", link: "/property-in-gurugram/sector-70/" },
    { name: "Sector 71", link: "/property-in-gurugram/sector-71/" },
    { name: "Sector 72", link: "/property-in-gurugram/sector-72/" },
    { name: "Sector 73", link: "/property-in-gurugram/sector-73/" },
    { name: "Sector 74", link: "/property-in-gurugram/sector-74/" },
    { name: "Sector 75", link: "/property-in-gurugram/sector-75/" },
    { name: "Sector 76", link: "/property-in-gurugram/sector-76/" },
    { name: "Sector 77", link: "/property-in-gurugram/sector-77/" },
    { name: "Sector 78", link: "/property-in-gurugram/sector-78/" },
    { name: "Sector 79", link: "/property-in-gurugram/sector-79/" },
    { name: "Sector 80", link: "/property-in-gurugram/sector-80/" },
    { name: "Sector 81", link: "/property-in-gurugram/sector-81/" },
    { name: "Sector 82", link: "/property-in-gurugram/sector-82/" },
    { name: "Sector 83", link: "/property-in-gurugram/sector-83/" },
    { name: "Sector 84", link: "/property-in-gurugram/sector-84/" },
    { name: "Sector 85", link: "/property-in-gurugram/sector-85/" },
    { name: "Sector 86", link: "/property-in-gurugram/sector-86/" },
    { name: "Sector 87", link: "/property-in-gurugram/sector-87/" },
    { name: "Sector 88", link: "/property-in-gurugram/sector-88/" },
    { name: "Sector 89", link: "/property-in-gurugram/sector-89/" },
    { name: "Sector 90", link: "/property-in-gurugram/sector-90/" },
    { name: "Sector 91", link: "/property-in-gurugram/sector-91/" },
    { name: "Sector 92", link: "/property-in-gurugram/sector-92/" },
    { name: "Sector 93", link: "/property-in-gurugram/sector-93/" },
    { name: "Sector 94", link: "/property-in-gurugram/sector-94/" },
    { name: "Sector 95", link: "/property-in-gurugram/sector-95/" },
    { name: "Sector 96", link: "/property-in-gurugram/sector-96/" },
    { name: "Sector 97", link: "/property-in-gurugram/sector-97/" },
    { name: "Sector 98", link: "/property-in-gurugram/sector-98/" },
    { name: "Sector 99", link: "/property-in-gurugram/sector-99/" },
    { name: "Sector 100", link: "/property-in-gurugram/sector-100/" },
    { name: "Sector 101", link: "/property-in-gurugram/sector-101/" },
    { name: "Sector 102", link: "/property-in-gurugram/sector-102/" },
    { name: "Sector 103", link: "/property-in-gurugram/sector-103/" },
    { name: "Sector 104", link: "/property-in-gurugram/sector-104/" },
    { name: "Sector 105", link: "/property-in-gurugram/sector-105/" },
    { name: "Sector 106", link: "/property-in-gurugram/sector-106/" },
    { name: "Sector 107", link: "/property-in-gurugram/sector-107/" },
    { name: "Sector 108", link: "/property-in-gurugram/sector-108/" },
    { name: "Sector 109", link: "/property-in-gurugram/sector-109/" },
    { name: "Sector 110", link: "/property-in-gurugram/sector-110/" },

    // Popular areas and colonies
    { name: "DLF Phase 1", link: "/property-in-gurugram/dlf-phase-1/" },
    { name: "DLF Phase 2", link: "/property-in-gurugram/dlf-phase-2/" },
    { name: "DLF Phase 3", link: "/property-in-gurugram/dlf-phase-3/" },
    { name: "DLF Phase 4", link: "/property-in-gurugram/dlf-phase-4/" },
    { name: "DLF Phase 5", link: "/property-in-gurugram/dlf-phase-5/" },
    { name: "Sushant Lok Phase 1", link: "/property-in-gurugram/sushant-lok-1/" },
    { name: "Sushant Lok Phase 2", link: "/property-in-gurugram/sushant-lok-2/" },
    { name: "Sushant Lok Phase 3", link: "/property-in-gurugram/sushant-lok-3/" },
    { name: "Palam Vihar", link: "/property-in-gurugram/palam-vihar/" },
    { name: "South City 1", link: "/property-in-gurugram/south-city-1/" },
    { name: "South City 2", link: "/property-in-gurugram/south-city-2/" },
    { name: "Greenwood City", link: "/property-in-gurugram/greenwood-city/" },
    { name: "Ardee City", link: "/property-in-gurugram/ardee-city/" },
    { name: "Rosewood City", link: "/property-in-gurugram/rosewood-city/" },
    { name: "Mayfield Garden", link: "/property-in-gurugram/mayfield-garden/" },
    { name: "Vipul World", link: "/property-in-gurugram/vipul-world/" },
    { name: "Vatika City", link: "/property-in-gurugram/vatika-city/" },
    { name: "Unitech Cyber Park", link: "/property-in-gurugram/unitech-cyber-park/" },
    { name: "Udyog Vihar", link: "/property-in-gurugram/udyog-vihar/" },
    { name: "Manesar", link: "/property-in-gurugram/manesar/" },
    { name: "IMT Manesar", link: "/property-in-gurugram/imt-manesar/" },
    { name: "Pataudi Road", link: "/property-in-gurugram/pataudi-road/" },
    { name: "Faridabad Road", link: "/property-in-gurugram/faridabad-road/" },
    { name: "Badshahpur", link: "/property-in-gurugram/badshahpur/" },
    { name: "Wazirabad", link: "/property-in-gurugram/wazirabad/" },
    { name: "Sikanderpur", link: "/property-in-gurugram/sikanderpur/" },
    { name: "Shikohpur", link: "/property-in-gurugram/shikohpur/" },
    { name: "Maruti Kunj", link: "/property-in-gurugram/maruti-kunj/" },
    { name: "Laxman Vihar", link: "/property-in-gurugram/laxman-vihar/" },
    { name: "Rajiv Nagar", link: "/property-in-gurugram/rajiv-nagar/" },
    { name: "Shivaji Nagar", link: "/property-in-gurugram/shivaji-nagar/" },
    { name: "Ashok Vihar", link: "/property-in-gurugram/ashok-vihar/" },
    { name: "Krishna Colony", link: "/property-in-gurugram/krishna-colony/" },
    { name: "Gurugram Village", link: "/property-in-gurugram/gurugram-village/" },
    { name: "Carterpuri", link: "/property-in-gurugram/carterpuri/" },
    { name: "Chakkarpur", link: "/property-in-gurugram/chakkarpur/" },
    { name: "Dundahera", link: "/property-in-gurugram/dundahera/" },
    { name: "Hailey Mandi", link: "/property-in-gurugram/hailey-mandi/" },
    { name: "IFFCO Chowk", link: "/property-in-gurugram/iffco-chowk/" },
    { name: "Jharsa", link: "/property-in-gurugram/jharsa/" },
    { name: "Kanhai", link: "/property-in-gurugram/kanhai/" },
    { name: "Khandsa", link: "/property-in-gurugram/khandsa/" },
    { name: "Narsinghpur", link: "/property-in-gurugram/narsinghpur/" },
    { name: "Nathupur", link: "/property-in-gurugram/nathupur/" },
    { name: "Sadar Bazaar", link: "/property-in-gurugram/sadar-bazaar/" },
    { name: "Saraswati Vihar", link: "/property-in-gurugram/saraswati-vihar/" },
    { name: "Shakti Nagar", link: "/property-in-gurugram/shakti-nagar/" },
    { name: "Sheetla Colony", link: "/property-in-gurugram/sheetla-colony/" },
    { name: "Surya Vihar", link: "/property-in-gurugram/surya-vihar/" },
    { name: "Urban Estate", link: "/property-in-gurugram/urban-estate/" },

    // Expressways and Highways
    { name: "Delhi Jaipur Highway", link: "/property-in-gurugram/delhi-jaipur-highway/" },
    { name: "KMP Expressway", link: "/property-in-gurugram/kmp-expressway/" },
    { name: "Gurgaon Faridabad Road", link: "/property-in-gurugram/gurgaon-faridabad-road/" },
    { name: "Basai Road", link: "/property-in-gurugram/basai-road/" },
    { name: "Bhangrola", link: "/property-in-gurugram/bhangrola/" },
    { name: "Bilaspur", link: "/property-in-gurugram/bilaspur/" },
    { name: "Fazilpur", link: "/property-in-gurugram/fazilpur/" },
    { name: "Garhi Harsaru", link: "/property-in-gurugram/garhi-harsaru/" },
    { name: "Ghasola", link: "/property-in-gurugram/ghasola/" },
    { name: "Harsaru", link: "/property-in-gurugram/harsaru/" },
    { name: "Inayatpur", link: "/property-in-gurugram/inayatpur/" },
    { name: "Islampur", link: "/property-in-gurugram/islampur/" },
    { name: "Jakhopur", link: "/property-in-gurugram/jakhopur/" },
    { name: "Jamalpur", link: "/property-in-gurugram/jamalpur/" },
    { name: "Joniawas", link: "/property-in-gurugram/joniawas/" },
    { name: "Kasan", link: "/property-in-gurugram/kasan/" },
    { name: "Kherki Daula", link: "/property-in-gurugram/kherki-daula/" },
    { name: "Khoh", link: "/property-in-gurugram/khoh/" },
    { name: "Meoka", link: "/property-in-gurugram/meoka/" },
    { name: "Mohammedpur", link: "/property-in-gurugram/mohammedpur/" },
    { name: "Nakhrola", link: "/property-in-gurugram/nakhrola/" },
    { name: "Naurangpur", link: "/property-in-gurugram/naurangpur/" },
    { name: "Nirvana Country", link: "/property-in-gurugram/nirvana-country/" },
    { name: "Palra", link: "/property-in-gurugram/palra/" },
    { name: "Pawala", link: "/property-in-gurugram/pawala/" },
    { name: "Rathiwas", link: "/property-in-gurugram/rathiwas/" },
    { name: "Sadhrana", link: "/property-in-gurugram/sadhrana/" },
    { name: "Sakatpur", link: "/property-in-gurugram/sakatpur/" },
    { name: "Sikohpur", link: "/property-in-gurugram/sikohpur/" },
    { name: "Sultanpur", link: "/property-in-gurugram/sultanpur/" },
    { name: "Tauru", link: "/property-in-gurugram/tauru/" },
    { name: "Tikli", link: "/property-in-gurugram/tikli/" },
    { name: "Wazirpur", link: "/property-in-gurugram/wazirpur/" },

    // Additional popular areas
    { name: "Ambience Island", link: "/property-in-gurugram/ambience-island/" },
    { name: "Central Park", link: "/property-in-gurugram/central-park/" },
    { name: "Essel Towers", link: "/property-in-gurugram/essel-towers/" },
    { name: "Global Business Park", link: "/property-in-gurugram/global-business-park/" },
    { name: "Huda City Centre", link: "/property-in-gurugram/huda-city-centre/" },
    { name: "Kingdom of Dreams", link: "/property-in-gurugram/kingdom-of-dreams/" },
    { name: "Leisure Valley Park", link: "/property-in-gurugram/leisure-valley-park/" },
    { name: "MGF Metropolitan Mall", link: "/property-in-gurugram/mgf-metropolitan-mall/" },
    { name: "Qutub Plaza", link: "/property-in-gurugram/qutub-plaza/" },
    { name: "Sector 23A", link: "/property-in-gurugram/sector-23a/" },
    { name: "Sector 38A", link: "/property-in-gurugram/sector-38a/" },
    { name: "Sector 39A", link: "/property-in-gurugram/sector-39a/" },
    { name: "Sun City", link: "/property-in-gurugram/sun-city/" },
    { name: "The Bristol Hotel", link: "/property-in-gurugram/the-bristol-hotel/" },
    { name: "Unitech Business Zone", link: "/property-in-gurugram/unitech-business-zone/" },
    { name: "Unitech Grande", link: "/property-in-gurugram/unitech-grande/" },
    { name: "Vipul Tech Square", link: "/property-in-gurugram/vipul-tech-square/" },

    // Additional Residential Areas (Part 1)
    { name: "Ansal Plaza", link: "/property-in-gurugram/ansal-plaza/" },
    { name: "Ansals Palam Vihar", link: "/property-in-gurugram/ansals-palam-vihar/" },
    { name: "Ashiana Apartment", link: "/property-in-gurugram/ashiana-apartment/" },
    { name: "Bhim Nagar", link: "/property-in-gurugram/bhim-nagar/" },
    { name: "BPTP Park Centra", link: "/property-in-gurugram/bptp-park-centra/" },
    { name: "Central Park Resorts", link: "/property-in-gurugram/central-park-resorts/" },
    { name: "DLF City Court", link: "/property-in-gurugram/dlf-city-court/" },
    { name: "DLF Garden City", link: "/property-in-gurugram/dlf-garden-city/" },
    { name: "DLF Park Place", link: "/property-in-gurugram/dlf-park-place/" },
    { name: "DLF Regal Gardens", link: "/property-in-gurugram/dlf-regal-gardens/" },
    { name: "Emaar MGF Palm Gardens", link: "/property-in-gurugram/emaar-mgf-palm-gardens/" },
    { name: "Eldeco Mansionz", link: "/property-in-gurugram/eldeco-mansionz/" },
    { name: "Essel Tower", link: "/property-in-gurugram/essel-tower/" },
    { name: "Garden Estate", link: "/property-in-gurugram/garden-estate/" },
    { name: "Huda Metro Station", link: "/property-in-gurugram/huda-metro-station/" },
    { name: "IFFCO Colony", link: "/property-in-gurugram/iffco-colony/" },
    { name: "Indiabulls Centrum Park", link: "/property-in-gurugram/indiabulls-centrum-park/" },
    { name: "IRIS Broadway", link: "/property-in-gurugram/iris-broadway/" },
    { name: "JMD Gardens", link: "/property-in-gurugram/jmd-gardens/" },
    { name: "JMD Megapolis", link: "/property-in-gurugram/jmd-megapolis/" },
    { name: "M2K Corporate Park", link: "/property-in-gurugram/m2k-corporate-park/" },
    { name: "MGF Megacity Mall", link: "/property-in-gurugram/mgf-megacity-mall/" },
    { name: "MGF Metropolis Mall", link: "/property-in-gurugram/mgf-metropolis-mall/" },
    { name: "Millennium City Centre", link: "/property-in-gurugram/millennium-city-centre/" },
    { name: "Omaxe City Centre", link: "/property-in-gurugram/omaxe-city-centre/" },
    { name: "Omaxe Mall", link: "/property-in-gurugram/omaxe-mall/" },
    { name: "Parsvnath City Mall", link: "/property-in-gurugram/parsvnath-city-mall/" },
    { name: "Raheja Mall", link: "/property-in-gurugram/raheja-mall/" },
    { name: "Sahara Mall", link: "/property-in-gurugram/sahara-mall/" },
    { name: "Sikandarpur Metro Station", link: "/property-in-gurugram/sikandarpur-metro-station/" },
    { name: "Signature Tower", link: "/property-in-gurugram/signature-tower/" },
    { name: "Spaze IT Park", link: "/property-in-gurugram/spaze-it-park/" },
    { name: "Spaze Platinum Tower", link: "/property-in-gurugram/spaze-platinum-tower/" },
    { name: "Supertech Araville", link: "/property-in-gurugram/supertech-araville/" },
    { name: "Tulip Violet", link: "/property-in-gurugram/tulip-violet/" },
    { name: "Unitech Arcadia", link: "/property-in-gurugram/unitech-arcadia/" },
    { name: "Unitech Business Park", link: "/property-in-gurugram/unitech-business-park/" },
    { name: "Unitech Gardens Galleria", link: "/property-in-gurugram/unitech-gardens-galleria/" },
    { name: "Unitech Harmony", link: "/property-in-gurugram/unitech-harmony/" },
    { name: "Unitech South Park", link: "/property-in-gurugram/unitech-south-park/" },
    { name: "Unitech Uniworld Gardens", link: "/property-in-gurugram/unitech-uniworld-gardens/" },
    { name: "Unitech Vistas", link: "/property-in-gurugram/unitech-vistas/" },
    { name: "Vipul Agora", link: "/property-in-gurugram/vipul-agora/" },
    { name: "Vipul Business Park", link: "/property-in-gurugram/vipul-business-park/" },
    { name: "Vipul Greens", link: "/property-in-gurugram/vipul-greens/" },
    { name: "Vipul Lavanya", link: "/property-in-gurugram/vipul-lavanya/" },
    { name: "Vipul Orchid Garden", link: "/property-in-gurugram/vipul-orchid-garden/" },
    { name: "Vipul Square", link: "/property-in-gurugram/vipul-square/" },
    { name: "Wembley Estate", link: "/property-in-gurugram/wembley-estate/" },

    // Additional Residential Areas (Part 2)
    { name: "Adarsh Nagar", link: "/property-in-gurugram/adarsh-nagar/" },
    { name: "Aggarwal Tower", link: "/property-in-gurugram/aggarwal-tower/" },
    { name: "AIPL Business Club", link: "/property-in-gurugram/aipl-business-club/" },
    { name: "AIPL Joy Square", link: "/property-in-gurugram/aipl-joy-square/" },
    { name: "Alpha International City", link: "/property-in-gurugram/alpha-international-city/" },
    { name: "Ansal API Corporate Park", link: "/property-in-gurugram/ansal-api-corporate-park/" },
    { name: "Ansal API Esencia", link: "/property-in-gurugram/ansal-api-esencia/" },
    { name: "Ansal API Shushant City", link: "/property-in-gurugram/ansal-api-shushant-city/" },
    { name: "Ansal Celebrity Homes", link: "/property-in-gurugram/ansal-celebrity-homes/" },
    { name: "Ansal Heights 86", link: "/property-in-gurugram/ansal-heights-86/" },
    { name: "Ansal Sushant City", link: "/property-in-gurugram/ansal-sushant-city/" },
    { name: "Ansal Sushant Lok 1", link: "/property-in-gurugram/ansal-sushant-lok-1/" },
    { name: "Apartment Complex Sector 15", link: "/property-in-gurugram/apartment-complex-sector-15/" },
    { name: "Aralias", link: "/property-in-gurugram/aralias/" },
    { name: "Ashok Garden", link: "/property-in-gurugram/ashok-garden/" },
    { name: "Avalon Gardens", link: "/property-in-gurugram/avalon-gardens/" },
    { name: "Bajghera", link: "/property-in-gurugram/bajghera/" },
    { name: "Belvedere Park", link: "/property-in-gurugram/belvedere-park/" },
    { name: "Beverly Park", link: "/property-in-gurugram/beverly-park/" },
    { name: "BPTP Amstoria", link: "/property-in-gurugram/bptp-amstoria/" },
    { name: "BPTP Discovery Park", link: "/property-in-gurugram/bptp-discovery-park/" },
    { name: "BPTP Freedom Park", link: "/property-in-gurugram/bptp-freedom-park/" },
    { name: "BPTP Park Elite Floors", link: "/property-in-gurugram/bptp-park-elite-floors/" },
    { name: "BPTP Park Generations", link: "/property-in-gurugram/bptp-park-generations/" },
    { name: "BPTP Park Serene", link: "/property-in-gurugram/bptp-park-serene/" },
    { name: "BPTP Princess Park", link: "/property-in-gurugram/bptp-princess-park/" },
    { name: "BPTP Spacio", link: "/property-in-gurugram/bptp-spacio/" },
    { name: "BPTP The Amaario", link: "/property-in-gurugram/bptp-the-amaario/" },
    { name: "BPTP Visionnaire Villas", link: "/property-in-gurugram/bptp-visionnaire-villas/" },
    { name: "Capital Residences", link: "/property-in-gurugram/capital-residences/" },
    { name: "Century City", link: "/property-in-gurugram/century-city/" },
    { name: "Chanderlok", link: "/property-in-gurugram/chanderlok/" },
    { name: "Chintels Paradiso", link: "/property-in-gurugram/chintels-paradiso/" },
    { name: "Conscient Heritage", link: "/property-in-gurugram/conscient-heritage/" },
    { name: "Conscient One", link: "/property-in-gurugram/conscient-one/" },
    { name: "Corona Optus", link: "/property-in-gurugram/corona-optus/" },
    { name: "Cosmos Executive Apartments", link: "/property-in-gurugram/cosmos-executive-apartments/" },
    { name: "Cosmos Magnolia", link: "/property-in-gurugram/cosmos-magnolia/" },
    { name: "Crescent Parc", link: "/property-in-gurugram/crescent-parc/" },
    { name: "D Mall", link: "/property-in-gurugram/d-mall/" },
    { name: "DLF Alameda", link: "/property-in-gurugram/dlf-alameda/" },
    { name: "DLF Arbour", link: "/property-in-gurugram/dlf-arbour/" },
    { name: "DLF Belvedere Park", link: "/property-in-gurugram/dlf-belvedere-park/" },
    { name: "DLF Beverly Park", link: "/property-in-gurugram/dlf-beverly-park/" },
    { name: "DLF Carlton Estate", link: "/property-in-gurugram/dlf-carlton-estate/" },
    { name: "DLF Chakkarpur", link: "/property-in-gurugram/dlf-chakkarpur/" },
    { name: "DLF Corporate Greens", link: "/property-in-gurugram/dlf-corporate-greens/" },
    { name: "DLF Crest", link: "/property-in-gurugram/dlf-crest/" },
    { name: "DLF Exclusive Floors", link: "/property-in-gurugram/dlf-exclusive-floors/" },
    { name: "DLF Express Greens", link: "/property-in-gurugram/dlf-express-greens/" },
    { name: "DLF Garden City Enclave", link: "/property-in-gurugram/dlf-garden-city-enclave/" },
    { name: "DLF Gardencity", link: "/property-in-gurugram/dlf-gardencity/" },
    { name: "DLF Icon", link: "/property-in-gurugram/dlf-icon/" },
    { name: "DLF Magnolias", link: "/property-in-gurugram/dlf-magnolias/" },
    { name: "DLF New Town Heights", link: "/property-in-gurugram/dlf-new-town-heights/" },
    { name: "DLF Park Place", link: "/property-in-gurugram/dlf-park-place/" },
    { name: "DLF Pinnacle", link: "/property-in-gurugram/dlf-pinnacle/" },
    { name: "DLF Queens Court", link: "/property-in-gurugram/dlf-queens-court/" },
    { name: "DLF Ridgewood Estate", link: "/property-in-gurugram/dlf-ridgewood-estate/" },
    { name: "DLF Royalton Tower", link: "/property-in-gurugram/dlf-royalty-tower/" },
    { name: "DLF Summit", link: "/property-in-gurugram/dlf-summit/" },
    { name: "DLF The Aralias", link: "/property-in-gurugram/dlf-the-aralias/" },
    { name: "DLF The Belaire", link: "/property-in-gurugram/dlf-the-belaire/" },
    { name: "DLF The Camellias", link: "/property-in-gurugram/dlf-the-camellias/" },
    { name: "DLF The Grove", link: "/property-in-gurugram/dlf-the-grove/" },
    { name: "DLF The Icon", link: "/property-in-gurugram/dlf-the-icon/" },
    { name: "DLF The Magnolias", link: "/property-in-gurugram/dlf-the-magnolias/" },
    { name: "DLF The Primus", link: "/property-in-gurugram/dlf-the-primus/" },
    { name: "DLF The Skycourt", link: "/property-in-gurugram/dlf-the-skycourt/" },
    { name: "DLF The Ultima", link: "/property-in-gurugram/dlf-the-ultima/" },
    { name: "DLF Trinity Towers", link: "/property-in-gurugram/dlf-trinity-towers/" },
    { name: "DLF Wellington Estate", link: "/property-in-gurugram/dlf-wellington-estate/" },
    { name: "Emaar Digital Greens", link: "/property-in-gurugram/emaar-digital-greens/" },
    { name: "Emaar Emerald Estate", link: "/property-in-gurugram/emaar-emerald-estate/" },
    { name: "Emaar Emerald Hills", link: "/property-in-gurugram/emaar-emerald-hills/" },
    { name: "Emaar Emerald Plaza", link: "/property-in-gurugram/emaar-emerald-plaza/" },
    { name: "Emaar Gurgaon Greens", link: "/property-in-gurugram/emaar-gurgaon-greens/" },
    { name: "Emaar Imperial Gardens", link: "/property-in-gurugram/emaar-imperial-gardens/" },
    { name: "Emaar MGF Commonwealth Games Village", link: "/property-in-gurugram/emaar-mgf-commonwealth-games-village/" },
    { name: "Emaar MGF The Enclave", link: "/property-in-gurugram/emaar-mgf-the-enclave/" },
    { name: "Emaar Palm Drive", link: "/property-in-gurugram/emaar-palm-drive/" },
    { name: "Emaar Palm Gardens", link: "/property-in-gurugram/emaar-palm-gardens/" },
    { name: "Emaar Palm Heights", link: "/property-in-gurugram/emaar-palm-heights/" },
    { name: "Emaar Palm Hills", link: "/property-in-gurugram/emaar-palm-hills/" },
    { name: "Emaar Palm Premiere", link: "/property-in-gurugram/emaar-palm-premiere/" },
    { name: "Emaar Palm Springs", link: "/property-in-gurugram/emaar-palm-springs/" },
    { name: "Emaar Palm Square", link: "/property-in-gurugram/emaar-palm-square/" },
    { name: "Emaar Palm Terraces", link: "/property-in-gurugram/emaar-palm-terraces/" },
    { name: "Emaar The Palm Square", link: "/property-in-gurugram/emaar-the-palm-square/" },
    { name: "Eldeco Accolade", link: "/property-in-gurugram/eldeco-accolade/" },
    { name: "Eldeco Aamantran", link: "/property-in-gurugram/eldeco-aamantran/" },
    { name: "Eldeco County", link: "/property-in-gurugram/eldeco-county/" },
    { name: "Eldeco Fairway", link: "/property-in-gurugram/eldeco-fairway/" },
    { name: "Eldeco Hillside", link: "/property-in-gurugram/eldeco-hillside/" },
    { name: "Eldeco Inspire", link: "/property-in-gurugram/eldeco-inspire/" },
    { name: "Eldeco Residency Greens", link: "/property-in-gurugram/eldeco-residency-greens/" },
    { name: "Eldeco Sohna", link: "/property-in-gurugram/eldeco-sohna/" },
    { name: "Eldeco The View", link: "/property-in-gurugram/eldeco-the-view/" },
    { name: "Essel Tower 2", link: "/property-in-gurugram/essel-tower-2/" },
    { name: "Express Trade Tower", link: "/property-in-gurugram/express-trade-tower/" },
    { name: "Fortune Towers", link: "/property-in-gurugram/fortune-towers/" },
    { name: "Global Foyer", link: "/property-in-gurugram/global-foyer/" },
    { name: "Good Earth City Centre", link: "/property-in-gurugram/good-earth-city-centre/" },
    { name: "Good Earth Malhar", link: "/property-in-gurugram/good-earth-malhar/" },
    { name: "Good Earth Nirvana Country", link: "/property-in-gurugram/good-earth-nirvana-country/" },
    { name: "Good Earth Orchid Blooms", link: "/property-in-gurugram/good-earth-orchid-blooms/" },
    { name: "Good Earth Palm Grove", link: "/property-in-gurugram/good-earth-palm-grove/" },
    { name: "Good Earth The Elite", link: "/property-in-gurugram/good-earth-the-elite/" },
    { name: "Green Court", link: "/property-in-gurugram/green-court/" },
    { name: "Green Field Colony", link: "/property-in-gurugram/green-field-colony/" },
    { name: "Green Heights", link: "/property-in-gurugram/green-heights/" },
    { name: "Green Park", link: "/property-in-gurugram/green-park/" },
    { name: "Green Valley", link: "/property-in-gurugram/green-valley/" },
    { name: "Green View", link: "/property-in-gurugram/green-view/" },
    { name: "Green Woods City", link: "/property-in-gurugram/green-woods-city/" },
    { name: "Gurgaon One", link: "/property-in-gurugram/gurgaon-one/" },
    { name: "Haldiram", link: "/property-in-gurugram/haldiram/" },
    { name: "Hamilton Court", link: "/property-in-gurugram/hamilton-court/" },
    { name: "Heritage City", link: "/property-in-gurugram/heritage-city/" },
    { name: "Huda City Center", link: "/property-in-gurugram/huda-city-center/" },
    { name: "Huda Gymkhana Club", link: "/property-in-gurugram/huda-gymkhana-club/" },
    { name: "Huda Market", link: "/property-in-gurugram/huda-market/" },
    { name: "Huda Metro", link: "/property-in-gurugram/huda-metro/" },
    { name: "Huda Plot", link: "/property-in-gurugram/huda-plot/" },
    { name: "Huda Sector 23", link: "/property-in-gurugram/huda-sector-23/" },
    { name: "IFFCO Chowk Metro", link: "/property-in-gurugram/iffco-chowk-metro/" },
    { name: "Indiabulls Centre", link: "/property-in-gurugram/indiabulls-centre/" },
    { name: "Indiabulls Cyber Park", link: "/property-in-gurugram/indiabulls-cyber-park/" },
    { name: "Indiabulls One", link: "/property-in-gurugram/indiabulls-one/" },
    { name: "Infinity Tower", link: "/property-in-gurugram/infinity-tower/" },
    { name: "Iris Tech Park", link: "/property-in-gurugram/iris-tech-park/" },
    { name: "JMD Empire Square", link: "/property-in-gurugram/jmd-empire-square/" },
    { name: "JMD Galleria", link: "/property-in-gurugram/jmd-galleria/" },
    { name: "JMD Imperial Court", link: "/property-in-gurugram/jmd-imperial-court/" },
    { name: "JMD Kohinoor Square", link: "/property-in-gurugram/jmd-kohinoor-square/" },
    { name: "JMD Pacific Square", link: "/property-in-gurugram/jmd-pacific-square/" },
    { name: "JMD Regent Arcade", link: "/property-in-gurugram/jmd-regent-arcade/" },
    { name: "JMD Regent Plaza", link: "/property-in-gurugram/jmd-regent-plaza/" },
    { name: "JMD Suburbio", link: "/property-in-gurugram/jmd-suburbio/" },
    { name: "JMD Tower", link: "/property-in-gurugram/jmd-tower/" },
    { name: "K Raheja Corp", link: "/property-in-gurugram/k-raheja-corp/" },
    { name: "Krisumi Waterfall Residences", link: "/property-in-gurugram/krisumi-waterfall-residences/" },
    { name: "Laxmi Garden", link: "/property-in-gurugram/laxmi-garden/" },
    { name: "Laxmi Narayan Temple", link: "/property-in-gurugram/laxmi-narayan-temple/" },
    { name: "Lotus Garden", link: "/property-in-gurugram/lotus-garden/" },
    { name: "M3M Broadway", link: "/property-in-gurugram/m3m-broadway/" },
    { name: "M3M City Hub", link: "/property-in-gurugram/m3m-city-hub/" },
    { name: "M3M Corner Walk", link: "/property-in-gurugram/m3m-corner-walk/" },
    { name: "M3M Cosmopolitan", link: "/property-in-gurugram/m3m-cosmopolitan/" },
    { name: "M3M Escala", link: "/property-in-gurugram/m3m-escala/" },
    { name: "M3M Golf Estate", link: "/property-in-gurugram/m3m-golf-estate/" },
    { name: "M3M Heights", link: "/property-in-gurugram/m3m-heights/" },
    { name: "M3M Icon", link: "/property-in-gurugram/m3m-icon/" },
    { name: "M3M Latitude", link: "/property-in-gurugram/m3m-latitude/" },
    { name: "M3M Merlin", link: "/property-in-gurugram/m3m-merlin/" },
    { name: "M3M My Den", link: "/property-in-gurugram/m3m-my-den/" },
    { name: "M3M Natura", link: "/property-in-gurugram/m3m-natura/" },
    { name: "M3M Panorama", link: "/property-in-gurugram/m3m-panorama/" },
    { name: "M3M Polo Suites", link: "/property-in-gurugram/m3m-polo-suites/" },
    { name: "M3M Sky Lofts", link: "/property-in-gurugram/m3m-sky-lofts/" },
    { name: "M3M Soulitude", link: "/property-in-gurugram/m3m-soulitude/" },
    { name: "M3M St Andrews", link: "/property-in-gurugram/m3m-st-andrews/" },
    { name: "M3M Tee Point", link: "/property-in-gurugram/m3m-tee-point/" },
    { name: "M3M The Line", link: "/property-in-gurugram/m3m-the-line/" },
    { name: "M3M Urbana", link: "/property-in-gurugram/m3m-urbana/" },
    { name: "M3M Woodshire", link: "/property-in-gurugram/m3m-woodshire/" },
    { name: "Mahindra Aura", link: "/property-in-gurugram/mahindra-aura/" },
    { name: "Mahindra Luminare", link: "/property-in-gurugram/mahindra-luminare/" },
    { name: "Malibu Town", link: "/property-in-gurugram/malibu-town/" },
    { name: "Maple Crescent", link: "/property-in-gurugram/maple-crescent/" },
    { name: "Maple Heights", link: "/property-in-gurugram/maple-heights/" },
    { name: "Maple High", link: "/property-in-gurugram/maple-high/" },
    { name: "Max Hospital", link: "/property-in-gurugram/max-hospital/" },
    { name: "Maxworth City", link: "/property-in-gurugram/maxworth-city/" },
    { name: "Medanta Hospital", link: "/property-in-gurugram/medanta-hospital/" },
    { name: "Medanta The Medicity", link: "/property-in-gurugram/medanta-the-medicity/" },
    { name: "MGF Downtown Mall", link: "/property-in-gurugram/mgf-downtown-mall/" },
    { name: "MGF E City", link: "/property-in-gurugram/mgf-e-city/" },
    { name: "MGF Imperial", link: "/property-in-gurugram/mgf-imperial/" },
    { name: "MGF Mall", link: "/property-in-gurugram/mgf-mall/" },
    { name: "MGF Metropolitan", link: "/property-in-gurugram/mgf-metropolitan/" },
    { name: "MGF Palm Springs Plaza", link: "/property-in-gurugram/mgf-palm-springs-plaza/" },
    { name: "MGF The Villas", link: "/property-in-gurugram/mgf-the-villas/" },
    { name: "Millenium Plaza", link: "/property-in-gurugram/millenium-plaza/" },
    { name: "Millennium Plaza", link: "/property-in-gurugram/millennium-plaza/" },
    { name: "Mittal Cosmos Executive", link: "/property-in-gurugram/mittal-cosmos-executive/" },
    { name: "Mittal Cosmos Royale Casa", link: "/property-in-gurugram/mittal-cosmos-royale-casa/" },
    { name: "Mittal Surya Vihar", link: "/property-in-gurugram/mittal-surya-vihar/" },
    { name: "Mittal Township", link: "/property-in-gurugram/mittal-township/" },
    { name: "Nagarjuna Apartment", link: "/property-in-gurugram/nagarjuna-apartment/" },
    { name: "New Colony", link: "/property-in-gurugram/new-colony/" },
    { name: "Nirvana Courtyard", link: "/property-in-gurugram/nirvana-courtyard/" },
    { name: "Nirvana Patio", link: "/property-in-gurugram/nirvana-patio/" },
    { name: "Oasis Palm Grove", link: "/property-in-gurugram/oasis-palm-grove/" },
    { name: "Omaxe Celebration Mall", link: "/property-in-gurugram/omaxe-celebration-mall/" },
    { name: "Omaxe City", link: "/property-in-gurugram/omaxe-city/" },
    { name: "Omaxe Forest Spa", link: "/property-in-gurugram/omaxe-forest-spa/" },
    { name: "Omaxe Grand", link: "/property-in-gurugram/omaxe-grand/" },
    { name: "Omaxe Gurgaon Mall", link: "/property-in-gurugram/omaxe-gurgaon-mall/" },
    { name: "Omaxe Hills", link: "/property-in-gurugram/omaxe-hills/" },
    { name: "Omaxe House", link: "/property-in-gurugram/omaxe-house/" },
    { name: "Omaxe Nile", link: "/property-in-gurugram/omaxe-nile/" },
    { name: "Omaxe Park Plaza", link: "/property-in-gurugram/omaxe-park-plaza/" },
    { name: "Omaxe Plaza", link: "/property-in-gurugram/omaxe-plaza/" },
    { name: "Omaxe The Nile", link: "/property-in-gurugram/omaxe-the-nile/" },
    { name: "Orchid Garden", link: "/property-in-gurugram/orchid-garden/" },
    { name: "Orchid Greens", link: "/property-in-gurugram/orchid-greens/" },
    { name: "Orchid Island", link: "/property-in-gurugram/orchid-island/" },
    { name: "Orchid Petals", link: "/property-in-gurugram/orchid-petals/" },
    { name: "Orris Aster Court", link: "/property-in-gurugram/orris-aster-court/" },
    { name: "Orris Carnation Residency", link: "/property-in-gurugram/orris-carnation-residency/" },
    { name: "Orris Floreal Towers", link: "/property-in-gurugram/orris-floreal-towers/" },
    { name: "Orris Market City", link: "/property-in-gurugram/orris-market-city/" },
    { name: "Palm Court", link: "/property-in-gurugram/palm-court/" },
    { name: "Palm Drive", link: "/property-in-gurugram/palm-drive/" },
    { name: "Palm Grove Heights", link: "/property-in-gurugram/palm-grove-heights/" },
    { name: "Palm Hills", link: "/property-in-gurugram/palm-hills/" },
    { name: "Palm Olympia", link: "/property-in-gurugram/palm-olympia/" },
    { name: "Palm Springs Court", link: "/property-in-gurugram/palm-springs-court/" },
    { name: "Palm Terrace", link: "/property-in-gurugram/palm-terrace/" },
    { name: "Paras Dews", link: "/property-in-gurugram/paras-dews/" },
    { name: "Paras Irene", link: "/property-in-gurugram/paras-irene/" },
    { name: "Paras Panorama", link: "/property-in-gurugram/paras-panorama/" },
    { name: "Paras Quartier", link: "/property-in-gurugram/paras-quartier/" },
    { name: "Paras Seasons", link: "/property-in-gurugram/paras-seasons/" },
    { name: "Paras Tierea", link: "/property-in-gurugram/paras-tierea/" },
    { name: "Paras Trinity", link: "/property-in-gurugram/paras-trinity/" },
    { name: "Parsvnath Exotica", link: "/property-in-gurugram/parsvnath-exotica/" },
    { name: "Parsvnath Green Ville", link: "/property-in-gurugram/parsvnath-green-ville/" },
    { name: "Parsvnath King Citi", link: "/property-in-gurugram/parsvnath-king-citi/" },
    { name: "Parsvnath Majestic Floors", link: "/property-in-gurugram/parsvnath-majestic-floors/" },
    { name: "Parsvnath Paramount", link: "/property-in-gurugram/parsvnath-paramount/" },
    { name: "Parsvnath Planet", link: "/property-in-gurugram/parsvnath-planet/" },
    { name: "Parsvnath Plaza", link: "/property-in-gurugram/parsvnath-plaza/" },
    { name: "Parsvnath Prestige", link: "/property-in-gurugram/parsvnath-prestige/" },
    { name: "Parsvnath Royale", link: "/property-in-gurugram/parsvnath-royale/" },
    { name: "Pioneer Park", link: "/property-in-gurugram/pioneer-park/" },
    { name: "Pioneer Urban Square", link: "/property-in-gurugram/pioneer-urban-square/" },
    { name: "Plaza Mall", link: "/property-in-gurugram/plaza-mall/" },
    { name: "Raheja Atlantis", link: "/property-in-gurugram/raheja-atlantis/" },
    { name: "Raheja Developers", link: "/property-in-gurugram/raheja-developers/" },
    { name: "Raheja Mall", link: "/property-in-gurugram/raheja-mall/" },
    { name: "Raheja Navodaya", link: "/property-in-gurugram/raheja-navodaya/" },
    { name: "Raheja Revanta", link: "/property-in-gurugram/raheja-revanta/" },
    { name: "Raheja Sampada", link: "/property-in-gurugram/raheja-sampada/" },
    { name: "Raheja Shilas", link: "/property-in-gurugram/raheja-shilas/" },
    { name: "Raheja Vedaanta", link: "/property-in-gurugram/raheja-vedaanta/" },
    { name: "Ramprastha City", link: "/property-in-gurugram/ramprastha-city/" },
    { name: "Ramprastha Edge Towers", link: "/property-in-gurugram/ramprastha-edge-towers/" },
    { name: "Ramprastha Primera", link: "/property-in-gurugram/ramprastha-primera/" },
    { name: "Ramprastha Rise", link: "/property-in-gurugram/ramprastha-rise/" },
    { name: "Ramprastha Skyz", link: "/property-in-gurugram/ramprastha-skyz/" },
    { name: "Ramprastha The Atrium", link: "/property-in-gurugram/ramprastha-the-atrium/" },
    { name: "Ramprastha The Edge", link: "/property-in-gurugram/ramprastha-the-edge/" },
    { name: "Ramprastha The View", link: "/property-in-gurugram/ramprastha-the-view/" },
    { name: "Regency Park I", link: "/property-in-gurugram/regency-park-i/" },
    { name: "Regency Park II", link: "/property-in-gurugram/regency-park-ii/" },
    { name: "Sahara Grace", link: "/property-in-gurugram/sahara-grace/" },
    { name: "Sahara Mall", link: "/property-in-gurugram/sahara-mall/" },
    { name: "Saya Gold Avenue", link: "/property-in-gurugram/saya-gold-avenue/" },
    { name: "Saya Zenith", link: "/property-in-gurugram/saya-zenith/" },
    { name: "Sector 23 Market", link: "/property-in-gurugram/sector-23-market/" },
    { name: "Sector 29 Market", link: "/property-in-gurugram/sector-29-market/" },
    { name: "Sector 31 Market", link: "/property-in-gurugram/sector-31-market/" },
    { name: "Sector 4 Market", link: "/property-in-gurugram/sector-4-market/" },
    { name: "Sector 46 Market", link: "/property-in-gurugram/sector-46-market/" },
    { name: "Sector 47 Market", link: "/property-in-gurugram/sector-47-market/" },
    { name: "Sector 50 Market", link: "/property-in-gurugram/sector-50-market/" },
    { name: "Sector 52 Market", link: "/property-in-gurugram/sector-52-market/" },
    { name: "Sector 53 Market", link: "/property-in-gurugram/sector-53-market/" },
    { name: "Sector 54 Market", link: "/property-in-gurugram/sector-54-market/" },
    { name: "Sector 55 Market", link: "/property-in-gurugram/sector-55-market/" },
    { name: "Sector 56 Market", link: "/property-in-gurugram/sector-56-market/" },
    { name: "Sector 57 Market", link: "/property-in-gurugram/sector-57-market/" },
    { name: "Sector 58 Market", link: "/property-in-gurugram/sector-58-market/" },
    { name: "Sector 59 Market", link: "/property-in-gurugram/sector-59-market/" },
    { name: "Sector 60 Market", link: "/property-in-gurugram/sector-60-market/" },
    { name: "Sector 61 Market", link: "/property-in-gurugram/sector-61-market/" },
    { name: "Sector 62 Market", link: "/property-in-gurugram/sector-62-market/" },
    { name: "Sector 63 Market", link: "/property-in-gurugram/sector-63-market/" },
    { name: "Sector 64 Market", link: "/property-in-gurugram/sector-64-market/" },
    { name: "Sector 65 Market", link: "/property-in-gurugram/sector-65-market/" },
    { name: "Sector 66 Market", link: "/property-in-gurugram/sector-66-market/" },
    { name: "Sector 67 Market", link: "/property-in-gurugram/sector-67-market/" },
    { name: "Sector 68 Market", link: "/property-in-gurugram/sector-68-market/" },
    { name: "Sector 69 Market", link: "/property-in-gurugram/sector-69-market/" },
    { name: "Sector 70 Market", link: "/property-in-gurugram/sector-70-market/" },
    { name: "Sector 71 Market", link: "/property-in-gurugram/sector-71-market/" },
    { name: "Sector 72 Market", link: "/property-in-gurugram/sector-72-market/" },
    { name: "Sector 73 Market", link: "/property-in-gurugram/sector-73-market/" },
    { name: "Sector 74 Market", link: "/property-in-gurugram/sector-74-market/" },
    { name: "Sector 75 Market", link: "/property-in-gurugram/sector-75-market/" },
    { name: "Sector 76 Market", link: "/property-in-gurugram/sector-76-market/" },
    { name: "Sector 77 Market", link: "/property-in-gurugram/sector-77-market/" },
    { name: "Sector 78 Market", link: "/property-in-gurugram/sector-78-market/" },
    { name: "Sector 79 Market", link: "/property-in-gurugram/sector-79-market/" },
    { name: "Sector 80 Market", link: "/property-in-gurugram/sector-80-market/" },
    { name: "Sector 81 Market", link: "/property-in-gurugram/sector-81-market/" },
    { name: "Sector 82 Market", link: "/property-in-gurugram/sector-82-market/" },
    { name: "Sector 83 Market", link: "/property-in-gurugram/sector-83-market/" },
    { name: "Sector 84 Market", link: "/property-in-gurugram/sector-84-market/" },
    { name: "Sector 85 Market", link: "/property-in-gurugram/sector-85-market/" },
    { name: "Sector 86 Market", link: "/property-in-gurugram/sector-86-market/" },
    { name: "Sector 87 Market", link: "/property-in-gurugram/sector-87-market/" },
    { name: "Sector 88 Market", link: "/property-in-gurugram/sector-88-market/" },
    { name: "Sector 89 Market", link: "/property-in-gurugram/sector-89-market/" },
    { name: "Sector 90 Market", link: "/property-in-gurugram/sector-90-market/" },
    { name: "Sector 91 Market", link: "/property-in-gurugram/sector-91-market/" },
    { name: "Sector 92 Market", link: "/property-in-gurugram/sector-92-market/" },
    { name: "Sector 93 Market", link: "/property-in-gurugram/sector-93-market/" },
    { name: "Sector 94 Market", link: "/property-in-gurugram/sector-94-market/" },
    { name: "Sector 95 Market", link: "/property-in-gurugram/sector-95-market/" },
    { name: "Sector 96 Market", link: "/property-in-gurugram/sector-96-market/" },
    { name: "Sector 97 Market", link: "/property-in-gurugram/sector-97-market/" },
    { name: "Sector 98 Market", link: "/property-in-gurugram/sector-98-market/" },
    { name: "Sector 99 Market", link: "/property-in-gurugram/sector-99-market/" },
    { name: "Sector 100 Market", link: "/property-in-gurugram/sector-100-market/" },
    { name: "Shivaji Park", link: "/property-in-gurugram/shivaji-park/" },
    { name: "Shree Ganesh Temple", link: "/property-in-gurugram/shree-ganesh-temple/" },
    { name: "Signature Global", link: "/property-in-gurugram/signature-global/" },
    { name: "Signature Global Andour Heights", link: "/property-in-gurugram/signature-global-andour-heights/" },
    { name: "Signature Global City", link: "/property-in-gurugram/signature-global-city/" },
    { name: "Signature Global Grand IVA", link: "/property-in-gurugram/signature-global-grand-iva/" },
    { name: "Signature Global Imperial", link: "/property-in-gurugram/signature-global-imperial/" },
    { name: "Signature Global Infinity Mall", link: "/property-in-gurugram/signature-global-infinity-mall/" },
    { name: "Signature Global Mall", link: "/property-in-gurugram/signature-global-mall/" },
    { name: "Signature Global Orchard Avenue", link: "/property-in-gurugram/signature-global-orchard-avenue/" },
    { name: "Signature Global Park", link: "/property-in-gurugram/signature-global-park/" },
    { name: "Signature Global Plaza", link: "/property-in-gurugram/signature-global-plaza/" },
    { name: "Signature Global Prime", link: "/property-in-gurugram/signature-global-prime/" },
    { name: "Signature Global Roselia", link: "/property-in-gurugram/signature-global-roselia/" },
    { name: "Signature Global Sector 63A", link: "/property-in-gurugram/signature-global-sector-63a/" },
    { name: "Signature Global Sector 79", link: "/property-in-gurugram/signature-global-sector-79/" },
    { name: "Signature Global Sector 81", link: "/property-in-gurugram/signature-global-sector-81/" },
    { name: "Signature Global Sector 85", link: "/property-in-gurugram/signature-global-sector-85/" },
    { name: "Signature Global Sector 89", link: "/property-in-gurugram/signature-global-sector-89/" },
    { name: "Signature Global Sector 92", link: "/property-in-gurugram/signature-global-sector-92/" },
    { name: "Signature Global Sector 93", link: "/property-in-gurugram/signature-global-sector-93/" },
    { name: "Signature Global Serenas", link: "/property-in-gurugram/signature-global-serenas/" },
    { name: "Signature Global Solera", link: "/property-in-gurugram/signature-global-solera/" },
    { name: "Signature Global Synera", link: "/property-in-gurugram/signature-global-synera/" },
    { name: "Signature Global The Millennia", link: "/property-in-gurugram/signature-global-the-millennia/" },
    { name: "Signature Global The Roselia", link: "/property-in-gurugram/signature-global-the-roselia/" },
    { name: "Signature Global Titanium", link: "/property-in-gurugram/signature-global-titanium/" },
    { name: "Signature Global Trade Tower", link: "/property-in-gurugram/signature-global-trade-tower/" },
    { name: "Silverglades Hightown Residences", link: "/property-in-gurugram/silverglades-hightown-residences/" },
    { name: "Sobha City", link: "/property-in-gurugram/sobha-city/" },
    { name: "Sobha Daffodil", link: "/property-in-gurugram/sobha-daffodil/" },
    { name: "Sobha International City", link: "/property-in-gurugram/sobha-international-city/" },
    { name: "Sobha Marvella", link: "/property-in-gurugram/sobha-marvella/" },
    { name: "Sobha Metrogreen", link: "/property-in-gurugram/sobha-metrogreen/" },
    { name: "Sobha New Launch", link: "/property-in-gurugram/sobha-new-launch/" },
    { name: "Sobha Smriti Apartments", link: "/property-in-gurugram/sobha-smriti-apartments/" },
    { name: "South City 1", link: "/property-in-gurugram/south-city-1/" },
    { name: "South City 2", link: "/property-in-gurugram/south-city-2/" },
    { name: "Southend Floors", link: "/property-in-gurugram/southend-floors/" },
    { name: "Spaze Arrow", link: "/property-in-gurugram/spaze-arrow/" },
    { name: "Spaze Boulevard", link: "/property-in-gurugram/spaze-boulevard/" },
    { name: "Spaze Business Park", link: "/property-in-gurugram/spaze-business-park/" },
    { name: "Spaze Corporate Avenue", link: "/property-in-gurugram/spaze-corporate-avenue/" },
    { name: "Spaze Edge", link: "/property-in-gurugram/spaze-edge/" },
    { name: "Spaze I Tech Park", link: "/property-in-gurugram/spaze-i-tech-park/" },
    { name: "Spaze Kalistaa", link: "/property-in-gurugram/spaze-kalistaa/" },
    { name: "Spaze Palazo", link: "/property-in-gurugram/spaze-palazo/" },
    { name: "Spaze Privy", link: "/property-in-gurugram/spaze-privy/" },
    { name: "Spaze Privy AT4", link: "/property-in-gurugram/spaze-privy-at4/" },
    { name: "Spaze Towers", link: "/property-in-gurugram/spaze-towers/" },
    { name: "Spaze Tristar", link: "/property-in-gurugram/spaze-tristar/" },
    { name: "Spaze V Square", link: "/property-in-gurugram/spaze-v-square/" },
    { name: "Spring Meadows", link: "/property-in-gurugram/spring-meadows/" },
    { name: "Suncity Avenue", link: "/property-in-gurugram/suncity-avenue/" },
    { name: "Suncity Business Tower", link: "/property-in-gurugram/suncity-business-tower/" },
    { name: "Suncity Essentia", link: "/property-in-gurugram/suncity-essentia/" },
    { name: "Suncity Heights", link: "/property-in-gurugram/suncity-heights/" },
    { name: "Suncity Platinum Towers", link: "/property-in-gurugram/suncity-platinum-towers/" },
    { name: "Suncity Project", link: "/property-in-gurugram/suncity-project/" },
    { name: "Suncity Success Tower", link: "/property-in-gurugram/suncity-success-tower/" },
    { name: "Suncity Township", link: "/property-in-gurugram/suncity-township/" },
    { name: "Suncity Vatsal Valley", link: "/property-in-gurugram/suncity-vatsal-valley/" },
    { name: "Supertech 99", link: "/property-in-gurugram/supertech-99/" },
    { name: "Supertech Azalia", link: "/property-in-gurugram/supertech-azalia/" },
    { name: "Supertech Basera", link: "/property-in-gurugram/supertech-basera/" },
    { name: "Supertech Cape Town", link: "/property-in-gurugram/supertech-cape-town/" },
    { name: "Supertech Emerald Court", link: "/property-in-gurugram/supertech-emerald-court/" },
    { name: "Supertech Fable Castle", link: "/property-in-gurugram/supertech-fable-castle/" },
    { name: "Supertech Hill Town", link: "/property-in-gurugram/supertech-hill-town/" },
    { name: "Supertech Hues", link: "/property-in-gurugram/supertech-hues/" },
    { name: "Supertech Limited Edition", link: "/property-in-gurugram/supertech-limited-edition/" },
    { name: "Supertech Livingston", link: "/property-in-gurugram/supertech-livingston/" },
    { name: "Supertech Monarch", link: "/property-in-gurugram/supertech-monarch/" },
    { name: "Supertech New Projects", link: "/property-in-gurugram/supertech-new-projects/" },
    { name: "Supertech North Eye", link: "/property-in-gurugram/supertech-north-eye/" },
    { name: "Supertech Scarlet Suites", link: "/property-in-gurugram/supertech-scarlet-suites/" },
    { name: "Supertech Supernova", link: "/property-in-gurugram/supertech-supernova/" },
    { name: "Taj City Centre", link: "/property-in-gurugram/taj-city-centre/" },
    { name: "Taj Expressway", link: "/property-in-gurugram/taj-expressway/" },
    { name: "Tulip Ace", link: "/property-in-gurugram/tulip-ace/" },
    { name: "Tulip Grand", link: "/property-in-gurugram/tulip-grand/" },
    { name: "Tulip Ivory", link: "/property-in-gurugram/tulip-ivory/" },
    { name: "Tulip Lemon", link: "/property-in-gurugram/tulip-lemon/" },
    { name: "Tulip Monsella", link: "/property-in-gurugram/tulip-monsella/" },
    { name: "Tulip Orange", link: "/property-in-gurugram/tulip-orange/" },
    { name: "Tulip Petals", link: "/property-in-gurugram/tulip-petals/" },
    { name: "Tulip Purple", link: "/property-in-gurugram/tulip-purple/" },
    { name: "Tulip White", link: "/property-in-gurugram/tulip-white/" },
    { name: "Tulip Yellow", link: "/property-in-gurugram/tulip-yellow/" },
    { name: "Umang Monsoon Breeze", link: "/property-in-gurugram/umang-monsoon-breeze/" },
    { name: "Umang Winter Hills", link: "/property-in-gurugram/umang-winter-hills/" },
    { name: "Unitech Air", link: "/property-in-gurugram/unitech-air/" },
    { name: "Unitech Aspen Greens", link: "/property-in-gurugram/unitech-aspen-greens/" },
    { name: "Unitech Aura", link: "/property-in-gurugram/unitech-aura/" },
    { name: "Unitech Builder Floors", link: "/property-in-gurugram/unitech-builder-floors/" },
    { name: "Unitech Cape Town", link: "/property-in-gurugram/unitech-cape-town/" },
    { name: "Unitech Close", link: "/property-in-gurugram/unitech-close/" },
    { name: "Unitech Commercial Tower", link: "/property-in-gurugram/unitech-commercial-tower/" },
    { name: "Unitech Cyber City", link: "/property-in-gurugram/unitech-cyber-city/" },
    { name: "Unitech Deerwood Chase", link: "/property-in-gurugram/unitech-deerwood-chase/" },
    { name: "Unitech Downtown", link: "/property-in-gurugram/unitech-downtown/" },
    { name: "Unitech Elan Town Centre", link: "/property-in-gurugram/unitech-elan-town-centre/" },
    { name: "Unitech Espace", link: "/property-in-gurugram/unitech-espace/" },
    { name: "Unitech Espace Premiere", link: "/property-in-gurugram/unitech-espace-premiere/" },
    { name: "Unitech Executive Club", link: "/property-in-gurugram/unitech-executive-club/" },
    { name: "Unitech Fresco", link: "/property-in-gurugram/unitech-fresco/" },
    { name: "Unitech Gardens", link: "/property-in-gurugram/unitech-gardens/" },
    { name: "Unitech Global Business Park", link: "/property-in-gurugram/unitech-global-business-park/" },
    { name: "Unitech Golf View", link: "/property-in-gurugram/unitech-golf-view/" },
    { name: "Unitech Habitat", link: "/property-in-gurugram/unitech-habitat/" },
    { name: "Unitech Heritage", link: "/property-in-gurugram/unitech-heritage/" },
    { name: "Unitech Horizon", link: "/property-in-gurugram/unitech-horizon/" },
    { name: "Unitech Infospace", link: "/property-in-gurugram/unitech-infospace/" },
    { name: "Unitech International Financial Services Centre", link: "/property-in-gurugram/unitech-international-financial-services-centre/" },
    { name: "Unitech Ivy Terraces", link: "/property-in-gurugram/unitech-ivy-terraces/" },
    { name: "Unitech Karma Lakelands", link: "/property-in-gurugram/unitech-karma-lakelands/" },
    { name: "Unitech Limited", link: "/property-in-gurugram/unitech-limited/" },
    { name: "Unitech Magic", link: "/property-in-gurugram/unitech-magic/" },
    { name: "Unitech Matrix Tower", link: "/property-in-gurugram/unitech-matrix-tower/" },
    { name: "Unitech Millennium Plaza", link: "/property-in-gurugram/unitech-millennium-plaza/" },
    { name: "Unitech Nirvana Birch Court", link: "/property-in-gurugram/unitech-nirvana-birch-court/" },
    { name: "Unitech Nirvana Cedar Crest", link: "/property-in-gurugram/unitech-nirvana-cedar-crest/" },
    { name: "Unitech Nirvana Country", link: "/property-in-gurugram/unitech-nirvana-country/" },
    { name: "Unitech Nirvana Pinewood Court", link: "/property-in-gurugram/unitech-nirvana-pinewood-court/" },
    { name: "Unitech Palm Villas", link: "/property-in-gurugram/unitech-palm-villas/" },
    { name: "Unitech Parkwood", link: "/property-in-gurugram/unitech-parkwood/" },
    { name: "Unitech Ramprastha", link: "/property-in-gurugram/unitech-ramprastha/" },
    { name: "Unitech Signature Tower", link: "/property-in-gurugram/unitech-signature-tower/" },
    { name: "Unitech South Park", link: "/property-in-gurugram/unitech-south-park/" },
    { name: "Unitech The Close", link: "/property-in-gurugram/unitech-the-close/" },
    { name: "Unitech The Downtown", link: "/property-in-gurugram/unitech-the-downtown/" },
    { name: "Unitech The Palms", link: "/property-in-gurugram/unitech-the-palms/" },
    { name: "Unitech The Residences", link: "/property-in-gurugram/unitech-the-residences/" },
    { name: "Unitech Trade Centre", link: "/property-in-gurugram/unitech-trade-centre/" },
    { name: "Unitech Unihomes", link: "/property-in-gurugram/unitech-unihomes/" },
    { name: "Unitech Universal Business Tower", link: "/property-in-gurugram/unitech-universal-business-tower/" },
    { name: "Unitech Verve", link: "/property-in-gurugram/unitech-verve/" },
    { name: "Unitech World Cyber Park", link: "/property-in-gurugram/unitech-world-cyber-park/" },
    { name: "Unitech World Spa", link: "/property-in-gurugram/unitech-world-spa/" },
    { name: "Universal Business Park", link: "/property-in-gurugram/universal-business-park/" },
    { name: "Universal Trade Tower", link: "/property-in-gurugram/universal-trade-tower/" },
    { name: "Urban Complex", link: "/property-in-gurugram/urban-complex/" },
    { name: "Urban Square", link: "/property-in-gurugram/urban-square/" },
    { name: "Vatika Atrium", link: "/property-in-gurugram/vatika-atrium/" },
    { name: "Vatika Boulevard", link: "/property-in-gurugram/vatika-boulevard/" },
    { name: "Vatika Business Centre", link: "/property-in-gurugram/vatika-business-centre/" },
    { name: "Vatika Business Park", link: "/property-in-gurugram/vatika-business-park/" },
    { name: "Vatika City Centre", link: "/property-in-gurugram/vatika-city-centre/" },
    { name: "Vatika City Point", link: "/property-in-gurugram/vatika-city-point/" },
    { name: "Vatika Corporate Tower", link: "/property-in-gurugram/vatika-corporate-tower/" },
    { name: "Vatika Emporium", link: "/property-in-gurugram/vatika-emporium/" },
    { name: "Vatika Express City", link: "/property-in-gurugram/vatika-express-city/" },
    { name: "Vatika First India Place", link: "/property-in-gurugram/vatika-first-india-place/" },
    { name: "Vatika Grand", link: "/property-in-gurugram/vatika-grand/" },
    { name: "Vatika High Street", link: "/property-in-gurugram/vatika-high-street/" },
    { name: "Vatika INXT", link: "/property-in-gurugram/vatika-inxt/" },
    { name: "Vatika India Next", link: "/property-in-gurugram/vatika-india-next/" },
    { name: "Vatika Infotech City", link: "/property-in-gurugram/vatika-infotech-city/" },
    { name: "Vatika Lifestyle Homes", link: "/property-in-gurugram/vatika-lifestyle-homes/" },
    { name: "Vatika Linear Homes", link: "/property-in-gurugram/vatika-linear-homes/" },
    { name: "Vatika Market Place", link: "/property-in-gurugram/vatika-market-place/" },
    { name: "Vatika Mindscapes", link: "/property-in-gurugram/vatika-mindscapes/" },
    { name: "Vatika Next", link: "/property-in-gurugram/vatika-next/" },
    { name: "Vatika One", link: "/property-in-gurugram/vatika-one/" },
    { name: "Vatika One On One", link: "/property-in-gurugram/vatika-one-on-one/" },
    { name: "Vatika Premium Floors", link: "/property-in-gurugram/vatika-premium-floors/" },
    { name: "Vatika Professional Point", link: "/property-in-gurugram/vatika-professional-point/" },
    { name: "Vatika Seven Elements", link: "/property-in-gurugram/vatika-seven-elements/" },
    { name: "Vatika Signature Villas", link: "/property-in-gurugram/vatika-signature-villas/" },
    { name: "Vatika Sovereign Apartments", link: "/property-in-gurugram/vatika-sovereign-apartments/" },
    { name: "Vatika Sovereign Next", link: "/property-in-gurugram/vatika-sovereign-next/" },
    { name: "Vatika Sovereign Park", link: "/property-in-gurugram/vatika-sovereign-park/" },
    { name: "Vatika Sovereign Towers", link: "/property-in-gurugram/vatika-sovereign-towers/" },
    { name: "Vatika The Seven Lamps", link: "/property-in-gurugram/vatika-the-seven-lamps/" },
    { name: "Vatika Towers", link: "/property-in-gurugram/vatika-towers/" },
    { name: "Vatika Triangle", link: "/property-in-gurugram/vatika-triangle/" },
    { name: "Vatika Turnpike", link: "/property-in-gurugram/vatika-turnpike/" },
    { name: "Vipul Aarohan", link: "/property-in-gurugram/vipul-aarohan/" },
    { name: "Vipul Aaron", link: "/property-in-gurugram/vipul-aaron/" },
    { name: "Vipul Ace City", link: "/property-in-gurugram/vipul-ace-city/" },
    { name: "Vipul Aranya", link: "/property-in-gurugram/vipul-aranya/" },
    { name: "Vipul Belmonte", link: "/property-in-gurugram/vipul-belmonte/" },
    { name: "Vipul Business Centre", link: "/property-in-gurugram/vipul-business-centre/" },
    { name: "Vipul Gardens", link: "/property-in-gurugram/vipul-gardens/" },
    { name: "Vipul Lavanya", link: "/property-in-gurugram/vipul-lavanya/" },
    { name: "Vipul Orchid", link: "/property-in-gurugram/vipul-orchid/" },
    { name: "Vipul Plaza", link: "/property-in-gurugram/vipul-plaza/" },
    { name: "Vipul Tatvam Villas", link: "/property-in-gurugram/vipul-tatvam-villas/" },
    { name: "Vipul The Front Line", link: "/property-in-gurugram/vipul-the-front-line/" },
    { name: "Vipul The Park", link: "/property-in-gurugram/vipul-the-park/" },
    { name: "Vipul The Sky Court", link: "/property-in-gurugram/vipul-the-sky-court/" },
    { name: "Vipul World Floors", link: "/property-in-gurugram/vipul-world-floors/" },
    { name: "Vipul World Square", link: "/property-in-gurugram/vipul-world-square/" },
    { name: "Wembley Estate", link: "/property-in-gurugram/wembley-estate/" },
    { name: "Westend Heights", link: "/property-in-gurugram/westend-heights/" },
    { name: "Westend Mall", link: "/property-in-gurugram/westend-mall/" },
  ];

  // Location-based suggestions using existing localities
  const locationKeywords = {};
  localities.forEach(loc => {
    const locationName = loc.name.toLowerCase();
    locationKeywords[locationName] = [`properties in ${loc.name}`, `flats in ${loc.name}`, `${loc.name} properties`];
  });

  // Generate smart property suggestions based on query
  const generatePropertySuggestions = (query) => {
    const suggestions = [];
    const lowerQuery = query.toLowerCase();

    // Check for property type matches
    Object.entries(propertyKeywords).forEach(([keyword, suggestionList]) => {
      if (lowerQuery.includes(keyword)) {
        suggestions.push(...suggestionList);
      }
    });

    // Check for location matches
    Object.entries(locationKeywords).forEach(([location, suggestionList]) => {
      if (lowerQuery.includes(location)) {
        suggestions.push(...suggestionList);
      }
    });

    // Check for partial matches in query words
    const queryWords = lowerQuery.split(/\s+/);
    queryWords.forEach(word => {
      // Property type partial matches
      Object.entries(propertyKeywords).forEach(([keyword, suggestionList]) => {
        if (keyword.startsWith(word) || word.startsWith(keyword)) {
          suggestions.push(...suggestionList);
        }
      });

      // Location partial matches
      Object.entries(locationKeywords).forEach(([location, suggestionList]) => {
        if (location.startsWith(word) || word.startsWith(location.split(' ')[0])) {
          suggestions.push(...suggestionList);
        }
      });
    });

    return [...new Set(suggestions)].slice(0, 5); // Limit to 5 suggestions
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        setItemsPerPage(window.innerWidth <= 640 ? 2 : 6);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < localities.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };
  const settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      customPaging: (i) => (
        <button
          className={`rounded-full mt-4 mr-2 ${i === currentImageIndex ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
        ></button>
      ),
      afterChange: (index) => setCurrentImageIndex(index),
    };

    const phonesettings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      customPaging: (i) => (
      <button
        className={`rounded-full mt-4 mr-2 ${i === currentImageIndex ? 'bg-gray-800 h-2 w-5' : 'bg-gray-400 h-3 w-3'}`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const [flickerIndex, setFlickerIndex] = useState(0);

  // Calculate visible localities based on current itemsPerPage and currentIndex
  const visibleLocalities = localities.slice(currentIndex, currentIndex + itemsPerPage);

    return (
      <Wrapper>
        <div className="w-full max-w-6xl mx-auto px-1 mt-2">
          {/* Main Search Container */}
          <div className="glass-container group w-full mx-auto p-6 rounded-3xl overflow-hidden border border-gray-100 -mt-4 sm:-mt-8 md:-mt-36 bg-white shadow-2xl">
          {/* Category Tabs */}
          <div className="tabs-container flex justify-center mb-1">
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              {["Buy", "Rent", "New Launch", "Commercial", "Plots", "SCO"].map((linkName) => (
                <button
                  key={linkName}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeLink === linkName
                      ? "bg-white text-black shadow-md"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                  onClick={() => handleLinkClick(linkName)}
                >
                  {linkName}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className={`search-bar flex items-center bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-full p-1 sm:p-0.5 shadow-lg transition-all duration-300 relative ${
              isFocused ? 'ring-2 ring-white/50' : ''
            }`}
          >
            <div className="flex items-center px-3 text-gray-500">
              <FiMapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => setIsFocused(false)}
              placeholder="Search by City, Locality, or Project"
              className="flex-1 py-2 sm:py-3 px-2 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="mobile-hidden p-2 mr-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Use current location"
              title="Use current location"
            >
              <FiCrosshair className="w-5 h-5" />
            </button>
            <button className="mobile-hidden p-2 mr-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
              <FiMic className="w-5 h-5" />
            </button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="search-btn flex items-center justify-center bg-[#e53e3e] hover:bg-[#cc2f3b] text-white px-4 py-3 sm:px-5 md:px-6 rounded-full font-medium transition-all duration-200 hover:shadow-lg text-sm sm:text-base min-w-[50px] h-[50px] sm:h-12 md:h-14 sm:min-w-[120px]"
                onClick={handleSearch}
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="search-btn-text hidden sm:inline ml-2">Search</span>
              </motion.button>
            </div>
          </div>

          {/* Suggestions Dropdown - Outside glass container */}
          <div className="search-dropdown-wrapper relative w-full z-[9999]">
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white bg-opacity-98 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden max-h-[500px] overflow-y-auto border border-gray-200/50"
                  style={{
                    width: '100%',
                    left: '0',
                    right: '0',
                    marginTop: '0.5rem',
                    marginBottom: '1rem',
                    zIndex: 99999,
                    position: 'absolute',
                    
                  }}
                >
              {/* Show previous searches when focused but no query */}
              {searchQuery.length === 0 && previousSearches.length > 0 && (
                <>
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-600">Previous Searches</div>
                  </div>
                  {previousSearches.slice(0, 2).map((search, index) => (
                    <div
                      key={`previous-${index}`}
                      className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        const allFormats = getNumberFormats(search);
                        allFormats.forEach(format => {
                          saveSearchToLocalStorage(format);
                        });
                        setSearchQuery(search);
                        setShowSuggestions(false);
                        handleSearch();
                      }}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <FiSearch className="text-gray-400 w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">{search}</div>
                        </div>
                        <FiChevronRight className="text-gray-400 w-4 h-4 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                  {previousSearches.length > 2 && (
                    <div className="p-3 bg-gray-50 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                        <span>View All Previous Searches</span>
                        <FiChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Show API suggestions when typing */}
              {searchQuery.length >= 1 && (
                <>
                  {/* Show smart property suggestions first */}
                  {generatePropertySuggestions(searchQuery).length > 0 && (
                    <>
                      <div className="p-3 bg-blue-50 border-b border-gray-200">
                        <div className="text-sm font-medium text-blue-600">Smart Suggestions</div>
                      </div>
                      {/* esme agar hme 4 smart suggestion me suggest krana hai to 4 ya manage kr saktev hai */}
                      {generatePropertySuggestions(searchQuery).slice(0, 3).map((suggestion, index) => (
                        <div
                          key={`smart-${index}`}
                          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                            handleSearch();
                          }}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 mr-3">
                              <FiMapPin className="text-blue-400 w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{suggestion}</div>
                            </div>
                            <FiChevronRight className="text-gray-400 w-4 h-4 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {isLoadingSuggestions ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto mb-2"></div>
                      Searching...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <>
                      {generatePropertySuggestions(searchQuery).length > 0 && (
                        <div className="p-3 bg-gray-50 border-b border-gray-200">
                          <div className="text-sm font-medium text-gray-600">Search Results</div>
                        </div>
                      )}
                          {/* esme agar hme 4 search result me suggest krana hai to 4 ya manage kr saktev hai */}
                      {suggestions.slice(0, 2).map((suggestion, index) => (
                        <div
                          key={`api-${index}`}
                          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3 mt-1">
                              {suggestion.type === 'project' && <FiMapPin className="text-gray-400 w-4 h-4" />}
                              {suggestion.type === 'buy' && <span className="text-green-600 text-xs">🏠</span>}
                              {suggestion.type === 'rent' && <span className="text-blue-600 text-xs">🏢</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{suggestion.text}</div>
                              {suggestion.subtitle && (
                                <div className="text-sm text-gray-500 mt-1 truncate">{suggestion.subtitle}</div>
                              )}
                              {suggestion.price && (
                                <div className="text-sm font-semibold text-green-600 mt-1">₹{suggestion.price}</div>
                              )}
                              {suggestion.description && (
                                <div className="text-xs text-gray-400 mt-1 line-clamp-2">{suggestion.description}</div>
                              )}
                            </div>
                            <FiChevronRight className="text-gray-400 w-4 h-4 mt-1 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                      {suggestions.length > 4 && (
                        <div className="p-3 bg-gray-50 border-t border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                            <span>View All Results</span>
                            <FiChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                    </>
                  ) : searchQuery.length >= 1 ? (
                    <div className="p-4 text-center text-gray-500">
                      No suggestions found for "{searchQuery}"
                    </div>
                  ) : null}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
          </div>
          {/* Top Localities (single row, overflow hidden, arrow navigation) */}
          <div className="trending-searches mt-6 relative">
            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                type="button"
                onClick={handlePrev}
                className="nav-btn h-9 w-9 md:h-10 md:w-10 flex items-center justify-center shrink-0 rounded-full bg-white shadow-sm hover:shadow border border-gray-200 text-gray-700 transition active:scale-[0.98]"
                aria-label="Previous"
              >
                <FiChevronLeft />
              </button>
              {/* Viewport */}
              <div className="relative flex-1 overflow-hidden">
                <div className="flex flex-nowrap gap-2 sm:gap-3 whitespace-nowrap">
                  {visibleLocalities.map((loc) => (
                    <a
                      key={loc.name}
                      href={loc.link}
                      className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm hover:bg-gray-50 transition shadow-sm max-w-[160px] sm:max-w-[220px] truncate"
                      title={loc.name}
                    >
                      <span className="truncate">{loc.name}</span>
                    </a>
                  ))}
                </div>
        </div>
              {/* Next */}
              <button
                type="button"
                onClick={handleNext}
                className="nav-btn h-9 w-9 md:h-10 md:w-10 flex items-center justify-center shrink-0 rounded-full bg-white shadow-sm hover:shadow border border-gray-200 text-gray-700 transition active:scale-[0.98]"
                aria-label="Next"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
          </div>
          </div>

          {/* Suggestions Dropdown - Positioned above trending searches */}
          

        {/* Desktop Banner */}
        <div className="hidden md:block mt-2 lg:w-[750px] lg:h-[132px] md:h-[132px] md:w-[650px] mx-auto">
          <div className="section pt-4 md:pt-6">
            <SmallBannerSection />
          </div>
        </div>

        {/* Mobile Banner */}
        <div className="block sm:hidden w-full max-w-[360px] h-[198px] mt-6 mx-auto">
          <div className="section">
            <SmallBannerSection />
          </div>
        </div>
      </Wrapper>
    );
  }

  export default SearchBar;

  const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
    }
  `;

  const Wrapper = styled.section`
    position: relative;
    z-index: 10;
    padding: 2rem 1rem;
    /* Removed section-level background and blur to avoid outer glass effect */
    width: 100%;
    box-sizing: border-box;
    overflow: visible !important;
    
    .glass-container {
      position: relative;
      overflow: visible !important;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
        transform: rotate(30deg);
        pointer-events: none;
      }
    }
    
    .search-btn {
      box-shadow: 0 4px 15px -5px rgba(239, 68, 68, 0.4);
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px -5px rgba(239, 68, 68, 0.6);
      }
      
      &.pulse {
        animation: ${pulse} 2s infinite;
      }
    }
    
    .suggestions-dropdown {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 99999 !important;
      margin-top: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      background: white;
      border-radius: 1rem;
    }

    /* Desktop-specific suggestions styling */
    @media (min-width: 769px) {
      .search-dropdown-wrapper {
        position: relative !important;
        z-index: 9999 !important;
        width: 100% !important;
        overflow: visible !important;
      }

      .suggestions-dropdown {
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 500px !important;
        margin: 0.5rem auto 0 auto !important;
        z-index: 99999 !important;
        background: rgba(255, 255, 255, 0.98) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }
    }
    
    @media (max-width: 768px) {
      padding: 1rem 0.5rem;
      
      /* Hide category tabs on mobile */
      .tabs-container {
        display: none;
      }

      /* Remove card look so it blends with background */
      .glass-container {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        border-radius: 0 !important;
        overflow: visible !important;
        margin-top: 0 !important;
      }
      
      .search-bar {
        /* Keep row layout on mobile to avoid tall circular block */
        flex-direction: row;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        
        input {
          width: 100%;
          margin: 0; /* no extra vertical spacing */
        }
      }

      /* Hide non-essential controls on small screens */
      .mobile-hidden {
        display: none;
      }

      /* Ensure at least 2–3 chips fit on one line */
      .flex-nowrap { flex-wrap: nowrap !important; }
      .nav-btn { width: 28px; height: 28px; }
      .trending-searches .flex { gap: 0.5rem; }
      .trending-searches .text-sm { font-size: 12px; }
      .top-localities-label { display: none; }

      /* Icon-only search button style on mobile */
      .search-btn {
        width: 48px;
        height: 48px;
        padding: 0 !important;
        background: transparent !important;
        background-image: none !important;
        color: inherit;
        box-shadow: none !important;
      }
      .search-btn:hover { box-shadow: none !important; background: transparent !important; }
      .search-btn svg { color: #e53e3e !important; } /* unified red */
      .search-btn:hover svg { color: #cc2f3b !important; }

      /* Compact suggestions dropdown on mobile */
      .suggestions-dropdown {
        width: 95% !important;  /* Even more compact on mobile */
        max-width: 400px !important;
        font-size: 14px;  /* Smaller text on mobile */
      }
    }
    
    @media (max-width: 480px) {
      .tabs-container button {
        padding: 0.5rem 0.75rem;
        font-size: 0.75rem;
      }
    }
    line-height: 1.5;
    font-weight: 400;

    div {
      box-sizing: border-box;
    }

    .qsbWrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    /* Tablet screens */
    @media screen and (max-width: 1024px) {
        .SJDMls {
          width: 80%; /* Adjust width for tablet */
        }
      }

      /* Medium screens */
      @media screen and (max-width: 900px) {
        .SJDMls {
          width: 90%; /* Adjust width for medium screens */
        }
      }

      /* Small screens and mobile */
      @media screen and (max-width: 770px) {
        .SJDMls {
          width: 100%;
          flex-wrap: wrap; /* Allow wrapping for better alignment */
          justify-content: center; /* Center the options */
          margin-bottom: 10px; /* Add margin at the bottom */
        }

        .options {
          padding: 9px 15px; /* Reduce padding on smaller screens */
          font-size: 14px; /* Smaller font size for better fit */
        }
      }

      /* Extra small screens (mobile) */
      @media screen and (max-width: 500px) {
        .SJDMls {
          display: flex; /* Show SJDMls on small screens */
          flex-wrap: wrap; /* Allow wrapping */
          justify-content: center; /* Center the options */

        }

        .options {
          font-size: 12px; /* Further reduce font size for extra small screens */
          padding: 8px 12px; /* Reduce padding for extra small screens */
        }

        .flex-nowrap {
          flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }
      }

      .SJDMls {
        display: flex;
        box-shadow: 0 25px 60px rgba(255, 153, 51, 0.3);
        width: auto;
        border-radius: 20px 20px 0px 0px;
        background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
        margin-left: 30px;
        margin-right: 30px;
        border: 1px solid rgba(255, 153, 51, 0.2);
      }
      
      .sjdmkls{
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      letter-spacing: 0.5px;
      line-height: 1.4;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      }

      .SDFEDVx {
        background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
        border: 1px solid rgba(255, 153, 51, 0.3);
      }

      .options {
        padding: 9px 30px;
        font-size: 16px;
        transition: color 0.3s ease;
      }

      .options:hover {
        color: #FF9933;
        background: linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(19, 136, 8, 0.1) 100%);
      }

      .options.active {
        font-size: 18px;
        color: #FF9933;
        background: linear-gradient(135deg, rgba(255, 153, 51, 0.2) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(19, 136, 8, 0.2) 100%);
      }

      .suggestor-wrapper {
        width: 90%;
      }


      .search-dropdown-wrapper {
    position: relative;
    z-index: 9999;
  }

    `;