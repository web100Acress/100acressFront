import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiMic,
  FiMapPin,
  FiChevronRight,
  FiChevronLeft,
  FiCrosshair,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import SmallBannerSection from "./SmallBannerSection";
import { useMediaQuery } from "@chakra-ui/react";
import api from "../../config/apiClient";

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
  const [latitude, setLatitude] = useState(28.6139); // Default to Delhi/NCR coordinates
  const [longitude, setLongitude] = useState(77.209);

  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  const trendingSearches = [
    "Luxury Apartment in Mumbai",
    "Villas in Bangalore",
    "Plots in Hyderabad",
    "Commercial Space in Delhi",
    "New Launch in Pune",
  ];

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.warn(
            "Unable to get location, using default coordinates:",
            error
          );
          // Keep default Delhi/NCR coordinates
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 } // 5 minutes cache
      );
    }
  }, []);

  // Enhanced number conversion system with advanced features
  const numberWords = {
    // Basic numbers
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",

    // Teens
    ten: "10",
    eleven: "11",
    twelve: "12",
    thirteen: "13",
    fourteen: "14",
    fifteen: "15",
    sixteen: "16",
    seventeen: "17",
    eighteen: "18",
    nineteen: "19",

    // Tens
    twenty: "20",
    thirty: "30",
    forty: "40",
    fifty: "50",
    sixty: "60",
    seventy: "70",
    eighty: "80",
    ninety: "90",

    // Large numbers
    hundred: "100",
    thousand: "1000",
    lakh: "100000",
    crore: "10000000",

    // Common abbreviations
    k: "1000",
    thou: "1000",
    grand: "1000",
    m: "1000000",
    mil: "1000000",
    million: "1000000",
    cr: "10000000",
    c: "10000000",
    crores: "10000000",
    l: "100000",
    lac: "100000",
    lakhs: "100000",
    b: "1000000000",
    bil: "1000000000",
    billion: "1000000000",
  };

  const numberDigits = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
    100: "hundred",
    1000: "thousand",
    100000: "lakh",
    10000000: "crore",
    1000000: "million",
    1000000000: "billion",
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
          if (
            nextWord &&
            numberWords[nextWord] &&
            parseInt(numberWords[nextWord]) < 10
          ) {
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
      /\b(\d+(?:\.\d+)?)\s*(b|bil|billion)\b/gi,
    ];

    abbrPatterns.forEach((pattern) => {
      const matches = originalQuery.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const expanded = match.replace(pattern, (m, num, abbr) => {
            const multiplier = numberWords[abbr.toLowerCase()] || "1";
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
      if (combinedNumber !== "0") {
        formats.add(combinedNumber);
        // Also add the reverse (digits to words)
        if (numberDigits[combinedNumber]) {
          formats.add(numberDigits[combinedNumber]);
        }
      }
    }

    // Check each word individually
    words.forEach((word) => {
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
      /\b(\w+)\s+(\d+)\b/gi,
    ];

    mixedPatterns.forEach((pattern) => {
      const matches = originalQuery.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          // Extract numbers and convert them
          const numberMatches = match.match(/\b\d+\b/g);
          if (numberMatches) {
            numberMatches.forEach((num) => {
              if (numberDigits[num]) {
                const wordVersion = match.replace(num, numberDigits[num]);
                formats.add(wordVersion);
              }
            });
          }

          // Extract words and convert them
          const wordMatches = match.match(
            /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\b/gi
          );
          if (wordMatches) {
            wordMatches.forEach((word) => {
              if (numberWords[word.toLowerCase()]) {
                const digitVersion = match.replace(
                  new RegExp(`\\b${word}\\b`, "gi"),
                  numberWords[word.toLowerCase()]
                );
                formats.add(digitVersion);
              }
            });
          }
        });
      }
    });

    return Array.from(formats);
  };

  // Enhanced search function with fuzzy matching and fallback
  const performAdvancedSearch = async (query) => {
    const allFormats = getNumberFormats(query);

    // Also add fuzzy matches (prefix/suffix matching)
    const fuzzyMatches = [];
    Object.keys(numberWords).forEach((word) => {
      if (
        word.includes(query.toLowerCase()) ||
        query.toLowerCase().includes(word)
      ) {
        fuzzyMatches.push(numberWords[word]);
      }
    });

    Object.keys(numberDigits).forEach((digit) => {
      if (
        digit.includes(query.toLowerCase()) ||
        query.toLowerCase().includes(digit)
      ) {
        fuzzyMatches.push(numberDigits[digit]);
      }
    });

    const allSearchTerms = [...new Set([...allFormats, ...fuzzyMatches])];

    const searchPromises = allSearchTerms.map((format) =>
      api
        .get(`/search/suggestions/${encodeURIComponent(format)}`)
        .then((response) => ({ format, data: response.data.suggestions || [] }))
        .catch(() => ({ format, data: [] }))
    );

    return Promise.all(searchPromises).then((results) => {
      const combinedSuggestions = new Map();

      results.forEach(({ format, data }) => {
        data.forEach((suggestion) => {
          const key = `${suggestion.type}-${suggestion.text}`;
          if (
            !combinedSuggestions.has(key) ||
            format === query.toLowerCase() || // Prioritize original format
            combinedSuggestions.get(key).format !== query.toLowerCase()
          ) {
            combinedSuggestions.set(key, { ...suggestion, format });
          }
        });
      });

      return Array.from(combinedSuggestions.values());
    });
  };

  // Load previous searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem("previousSearches");
    if (storedSearches) {
      setPreviousSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save search to localStorage
  const saveSearchToLocalStorage = (query) => {
    if (!query.trim()) return;

    const updatedSearches = [
      query,
      ...previousSearches.filter((s) => s !== query),
    ].slice(0, 10); // Keep only latest 10 unique searches
    setPreviousSearches(updatedSearches);
    localStorage.setItem("previousSearches", JSON.stringify(updatedSearches));
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

      // If no suggestions found, add smart property suggestions as fallback
      if (combinedSuggestions.length === 0) {
        const smartSuggestions = generatePropertySuggestions(query);
        const fallbackSuggestions = smartSuggestions.map((suggestion) => ({
          text: suggestion,
          type: "smart",
          url: null,
        }));
        setSuggestions([...combinedSuggestions, ...fallbackSuggestions]);
      } else {
        setSuggestions(combinedSuggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      // Fallback to smart suggestions if API fails
      const smartSuggestions = generatePropertySuggestions(query);
      const fallbackSuggestions = smartSuggestions.map((suggestion) => ({
        text: suggestion,
        type: "smart",
        url: null,
      }));
      setSuggestions(fallbackSuggestions);
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
        window.open(
          window.location.origin +
            "/buy-properties/best-resale-property-in-gurugram/",
          "_blank"
        );
        break;

      case "New Launch":
        window.open(
          window.location.origin + "/projects-in-newlaunch/",
          "_blank"
        );
        break;

      case "Commercial":
        window.open(window.location.origin + "/projects/commercial/", "_blank");
        break;

      case "Plots":
        window.open(window.location.origin + "/plots-in-gurugram/", "_blank");
        break;

      case "SCO":
        window.open(window.location.origin + "/sco/plots/", "_blank");
        break;
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // DISABLED: Builder redirect - always do project search instead
    // if (handleBuilderRedirect(searchQuery)) {
    //   return; // Builder redirect handled
    // }

    // Regular property search logic - always search for projects
    const allFormats = getNumberFormats(searchQuery);
    allFormats.forEach((format) => {
      saveSearchToLocalStorage(format);
    });

    const searchData = {
      location: { lat: latitude, lng: longitude },
      query: searchQuery,
      collectionName: activeLink,
      nearby: true,
    };
    const key = encodeURIComponent(JSON.stringify(searchData));
    // Always redirect to search page - it will handle project search and fallbacks
    window.location.href = `/searchdata/${key}`;
  };

  const handleSuggestionClick = (suggestion) => {
    // Hide suggestions dropdown
    setShowSuggestions(false);

    // DISABLED: Builder redirect - always do project search instead
    // Check if suggestion text is a builder name and redirect to builder page
    // const suggestionText = suggestion.text || suggestion;
    // if (handleBuilderRedirect(suggestionText)) {
    //   return; // Builder redirect handled
    // }

    // Always treat suggestions as search queries for projects
    const suggestionText = suggestion.text || suggestion;

    // Save both formats of the suggestion to localStorage
    const allFormats = getNumberFormats(suggestionText);
    allFormats.forEach((format) => {
      saveSearchToLocalStorage(format);
    });

    // Navigate to search results page
    const searchData = {
      location: { lat: latitude, lng: longitude },
      query: suggestionText,
      collectionName: activeLink,
      nearby: true,
    };
    const key = encodeURIComponent(JSON.stringify(searchData));
    window.location.href = `/searchdata/${key}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
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
        console.warn("Unable to retrieve location:", error?.message || error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Builder mapping for redirecting to builder pages
  const builderMapping = {
    dlf: "/builders/dlf/",
    emaar: "/builders/emaar/",
    unitech: "/builders/unitech/",
    vatika: "/builders/vatika/",
    m3m: "/builders/m3m/",
    supertech: "/builders/supertech/",
    godrej: "/builders/godrej/",
    tata: "/builders/tata/",
    sobha: "/builders/sobha/",
    paras: "/builders/paras/",
    bptp: "/builders/bptp/",
    eldeco: "/builders/eldeco/",
    ansal: "/builders/ansal/",
    raheja: "/builders/raheja/",
    vipul: "/builders/vipul/",
    "signature global": "/builders/signature-global/",
    signature: "/builders/signature-global/",
    orris: "/builders/orris/",
    conscient: "/builders/conscient/",
    saya: "/builders/saya/",
    mahindra: "/builders/mahindra/",
    mittal: "/builders/mittal/",
    omaxe: "/builders/omaxe/",
    ramprastha: "/builders/ramprastha/",
    suncity: "/builders/suncity/",
    tulip: "/builders/tulip/",
    umang: "/builders/umang/",
    spaze: "/builders/spaze/",
    pioneer: "/builders/pioneer/",
    krisumi: "/builders/krisumi/",
    silverglades: "/builders/silverglades/",
    alpha: "/builders/alpha/",
    aipl: "/builders/aipl/",
    maple: "/builders/maple/",
    "central park": "/builders/central-park/",
    "good earth": "/builders/good-earth/",
    "emaar mgf": "/builders/emaar/",
    jmd: "/builders/jmd/",
    m2k: "/builders/m2k/",
    mgf: "/builders/mgf/",
    puri: "/builders/puri/",
    pyramid: "/builders/pyramid/",
    sahara: "/builders/sahara/",
    "ss group": "/builders/ss-group/",
    "the hemisphere": "/builders/the-hemisphere/",
    whiteland: "/builders/whiteland/",
  };

  // Function to detect if search query is a builder name
  const detectBuilderSearch = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    return (
      builderMapping[lowerQuery] ||
      Object.keys(builderMapping).find((builder) =>
        lowerQuery.includes(builder)
      )
    );
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
    resale: [
      "resale properties in gurugram",
      "resale flats in gurugram",
      "resale apartments in gurugram",
    ],
    rental: [
      "rental properties in gurugram",
      "rent properties in gurugram",
      "rental flats in gurugram",
    ],
    rent: [
      "rent properties in gurugram",
      "rental properties in gurugram",
      "rent flats in gurugram",
    ],
    buy: [
      "buy properties in gurugram",
      "buy flats in gurugram",
      "buy apartments in gurugram",
    ],
    purchase: ["purchase properties in gurugram", "buy properties in gurugram"],
    properties: [
      "properties in gurugram",
      "flats in gurugram",
      "apartments in gurugram",
    ],
    flats: [
      "flats in gurugram",
      "apartments in gurugram",
      "properties in gurugram",
    ],
    apartments: [
      "apartments in gurugram",
      "flats in gurugram",
      "properties in gurugram",
    ],
    plots: [
      "plots in gurugram",
      "plot for sale in gurugram",
      "land in gurugram",
    ],
    villas: [
      "villas in gurugram",
      "independent houses in gurugram",
      "bunglows in gurugram",
    ],
    commercial: [
      "commercial properties in gurugram",
      "office space in gurugram",
      "shops in gurugram",
    ],
    office: ["office space in gurugram", "commercial properties in gurugram"],
    shop: ["shops in gurugram", "commercial properties in gurugram"],

    // Additional property types
    studio: ["studio apartments in gurugram", "studio flats in gurugram"],
    "1bhk": ["1bhk flats in gurugram", "1 bedroom apartments in gurugram"],
    "2bhk": ["2bhk flats in gurugram", "2 bedroom apartments in gurugram"],
    "3bhk": ["3bhk flats in gurugram", "3 bedroom apartments in gurugram"],
    "4bhk": ["4bhk flats in gurugram", "4 bedroom apartments in gurugram"],
    "5bhk": ["5bhk flats in gurugram", "5 bedroom apartments in gurugram"],
    penthouse: ["penthouse in gurugram", "luxury penthouse in gurugram"],
    duplex: ["duplex in gurugram", "duplex apartments in gurugram"],
    "builder floor": [
      "builder floor in gurugram",
      "builder floors in gurugram",
    ],
    "independent house": [
      "independent house in gurugram",
      "houses in gurugram",
    ],
    farmhouse: ["farmhouse in gurugram", "farmhouses in gurugram"],
    warehouse: ["warehouse in gurugram", "warehouses in gurugram"],
    showroom: ["showroom in gurugram", "showrooms in gurugram"],
    retail: ["retail space in gurugram", "retail shops in gurugram"],
    industrial: [
      "industrial property in gurugram",
      "industrial space in gurugram",
    ],
    godown: ["godown in gurugram", "godowns in gurugram"],
    "co-working": [
      "co-working space in gurugram",
      "coworking space in gurugram",
    ],
    "serviced apartment": [
      "serviced apartments in gurugram",
      "service apartments in gurugram",
    ],

    // Price-related keywords
    budget: ["budget properties in gurugram", "budget flats in gurugram"],
    affordable: [
      "affordable properties in gurugram",
      "affordable housing in gurugram",
    ],
    luxury: ["luxury properties in gurugram", "luxury apartments in gurugram"],
    premium: [
      "premium properties in gurugram",
      "premium apartments in gurugram",
    ],
    cheap: ["cheap properties in gurugram", "cheap flats in gurugram"],
    "under 50 lakh": [
      "properties under 50 lakh in gurugram",
      "flats under 50 lakh in gurugram",
    ],
    "under 1 crore": [
      "properties under 1 crore in gurugram",
      "flats under 1 crore in gurugram",
    ],
    "under 2 crore": [
      "properties under 2 crore in gurugram",
      "flats under 2 crore in gurugram",
    ],

    // Feature-related keywords
    "ready to move": [
      "ready to move properties in gurugram",
      "ready to move flats in gurugram",
    ],
    "under construction": [
      "under construction properties in gurugram",
      "under construction flats in gurugram",
    ],
    "new launch": [
      "new launch projects in gurugram",
      "new launch properties in gurugram",
    ],
    "possession soon": [
      "possession soon properties in gurugram",
      "early possession flats in gurugram",
    ],
    "gated community": [
      "gated community properties in gurugram",
      "gated society flats in gurugram",
    ],
    society: ["society flats in gurugram", "housing society in gurugram"],
    township: [
      "township properties in gurugram",
      "integrated township in gurugram",
    ],
    "high rise": [
      "high rise apartments in gurugram",
      "high rise buildings in gurugram",
    ],
    "low rise": [
      "low rise apartments in gurugram",
      "low rise buildings in gurugram",
    ],

    // Amenities
    "swimming pool": [
      "properties with swimming pool in gurugram",
      "flats with pool in gurugram",
    ],
    gym: ["properties with gym in gurugram", "flats with gym in gurugram"],
    parking: [
      "properties with parking in gurugram",
      "flats with parking in gurugram",
    ],
    garden: [
      "properties with garden in gurugram",
      "flats with garden in gurugram",
    ],
    balcony: [
      "properties with balcony in gurugram",
      "flats with balcony in gurugram",
    ],
    terrace: [
      "properties with terrace in gurugram",
      "flats with terrace in gurugram",
    ],
    security: [
      "properties with security in gurugram",
      "secured flats in gurugram",
    ],
    lift: [
      "properties with lift in gurugram",
      "flats with elevator in gurugram",
    ],
    "power backup": [
      "properties with power backup in gurugram",
      "flats with generator in gurugram",
    ],

    // Investment keywords
    investment: [
      "investment properties in gurugram",
      "property investment in gurugram",
    ],
    "rental yield": [
      "high rental yield properties in gurugram",
      "rental income properties in gurugram",
    ],
    appreciation: [
      "high appreciation properties in gurugram",
      "property appreciation in gurugram",
    ],
    "capital gain": [
      "capital gain properties in gurugram",
      "investment for capital gain in gurugram",
    ],
  };

  const localities = [
    { name: "Sohna Road", link: "/property-in-gurugram/sohna-road/" },
    { name: "Golf Course Road", link: "/property-in-gurugram/golf-course/" },
    { name: "MG Road", link: "/property-in-gurugram/mg-road/" },
    {
      name: "Northern Peripheral Road",
      link: "/property-in-gurugram/northern-peripheral-road/",
    },
    {
      name: "Dwarka Expressway",
      link: "/property-in-gurugram/dwarka-expressway/",
    },
    { name: "New Gurgaon", link: "/property-in-gurugram/new-gurgaon/" },
    { name: "Sohna", link: "/property-in-gurugram/sohna/" },
    {
      name: "Southern Peripheral Road",
      link: "/property-in-gurugram/southern-peripheral-road/",
    },
    { name: "NH-48", link: "/property-in-gurugram/nh-48/" },
    {
      name: "Golf Course Extn Road",
      link: "/property-in-gurugram/golf-course-extn-road/",
    },
  ];

  // Location-based suggestions using existing localities
  const locationKeywords = {};
  localities.forEach((loc) => {
    const locationName = loc.name.toLowerCase();
    locationKeywords[locationName] = [
      `properties in ${loc.name}`,
      `flats in ${loc.name}`,
      `${loc.name} properties`,
    ];
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
    queryWords.forEach((word) => {
      // Property type partial matches
      Object.entries(propertyKeywords).forEach(([keyword, suggestionList]) => {
        if (keyword.startsWith(word) || word.startsWith(keyword)) {
          suggestions.push(...suggestionList);
        }
      });

      // Location partial matches
      Object.entries(locationKeywords).forEach(([location, suggestionList]) => {
        if (
          location.startsWith(word) ||
          word.startsWith(location.split(" ")[0])
        ) {
          suggestions.push(...suggestionList);
        }
      });
    });

    return [...new Set(suggestions)].slice(0, 5); // Limit to 5 suggestions
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== "undefined") {
        setItemsPerPage(window.innerWidth <= 640 ? 2 : 6);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
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
        className={`rounded-full mt-4 mr-2 ${
          i === currentImageIndex
            ? "bg-gray-800 h-2 w-5"
            : "bg-gray-400 h-3 w-3"
        }`}
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
        className={`rounded-full mt-4 mr-2 ${
          i === currentImageIndex
            ? "bg-gray-800 h-2 w-5"
            : "bg-gray-400 h-3 w-3"
        }`}
      ></button>
    ),
    afterChange: (index) => setCurrentImageIndex(index),
  };

  const [flickerIndex, setFlickerIndex] = useState(0);

  // Calculate visible localities based on current itemsPerPage and currentIndex
  const visibleLocalities = localities.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <Wrapper>
      <div className="w-full max-w-6xl mx-auto px-1 mt-2">
        {/* Main Search Container */}
        <div className="glass-container group w-full mx-auto p-6 rounded-3xl overflow-hidden border border-gray-100 -mt-4 sm:-mt-8 md:-mt-36 bg-white shadow-2xl">
          {/* Category Tabs */}
          <div className="tabs-container flex justify-center mb-1">
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              {["Buy", "Rent", "New Launch", "Commercial", "Plots", "SCO"].map(
                (linkName) => (
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
                )
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className={`search-bar flex items-center bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-full p-1 sm:p-0.5 shadow-lg transition-all duration-300 relative ${
              isFocused ? "ring-2 ring-white/50" : ""
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
                <span className="search-btn-text hidden sm:inline ml-2">
                  Search
                </span>
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
                    width: "100%",
                    left: "0",
                    right: "0",
                    marginTop: "0.5rem",
                    marginBottom: "1rem",
                    zIndex: 99999,
                    position: "absolute",
                  }}
                >
                  {/* Show previous searches when focused but no query */}
                  {searchQuery.length === 0 && previousSearches.length > 0 && (
                    <>
                      <div className="p-3 bg-gray-50 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-600">
                          Previous Searches
                        </div>
                      </div>
                      {previousSearches.slice(0, 2).map((search, index) => (
                        <div
                          key={`previous-${index}`}
                          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            const allFormats = getNumberFormats(search);
                            allFormats.forEach((format) => {
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
                              <div className="font-medium text-gray-900 truncate">
                                {search}
                              </div>
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
                            <div className="text-sm font-medium text-blue-600">
                              Smart Suggestions
                            </div>
                          </div>
                          {/* esme agar hme 4 smart suggestion me suggest krana hai to 4 ya manage kr saktev hai */}
                          {generatePropertySuggestions(searchQuery)
                            .slice(0, 3)
                            .map((suggestion, index) => (
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
                                    <div className="font-medium text-gray-900 truncate">
                                      {suggestion}
                                    </div>
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
                          {generatePropertySuggestions(searchQuery).length >
                            0 && (
                            <div className="p-3 bg-gray-50 border-b border-gray-200">
                              <div className="text-sm font-medium text-gray-600">
                                Search Results
                              </div>
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
                                  {suggestion.type === "project" && (
                                    <FiMapPin className="text-gray-400 w-4 h-4" />
                                  )}
                                  {suggestion.type === "buy" && (
                                    <span className="text-green-600 text-xs">
                                      🏠
                                    </span>
                                  )}
                                  {suggestion.type === "rent" && (
                                    <span className="text-blue-600 text-xs">
                                      🏢
                                    </span>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">
                                    {suggestion.text}
                                  </div>
                                  {suggestion.subtitle && (
                                    <div className="text-sm text-gray-500 mt-1 truncate">
                                      {suggestion.subtitle}
                                    </div>
                                  )}
                                  {suggestion.price && (
                                    <div className="text-sm font-semibold text-green-600 mt-1">
                                      ₹{suggestion.price}
                                    </div>
                                  )}
                                  {suggestion.description && (
                                    <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                                      {suggestion.description}
                                    </div>
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
                          <div className="mb-3">
                            No suggestions found for "{searchQuery}"
                          </div>
                          <button
                            onClick={() => {
                              setShowSuggestions(false);
                              handleSearch();
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          >
                            Search Anyway
                          </button>
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
      <div className="hidden md:block mt-8 lg:w-[1150px] lg:h-[155px] md:h-[155px] md:w-[700px] mx-auto">
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
      content: "";
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 60%
      );
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
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
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
    .flex-nowrap {
      flex-wrap: nowrap !important;
    }
    .nav-btn {
      width: 28px;
      height: 28px;
    }
    .trending-searches .flex {
      gap: 0.5rem;
    }
    .trending-searches .text-sm {
      font-size: 12px;
    }
    .top-localities-label {
      display: none;
    }

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
    .search-btn:hover {
      box-shadow: none !important;
      background: transparent !important;
    }
    .search-btn svg {
      color: #e53e3e !important;
    } /* unified red */
    .search-btn:hover svg {
      color: #cc2f3b !important;
    }

    /* Compact suggestions dropdown on mobile */
    .suggestions-dropdown {
      width: 95% !important; /* Even more compact on mobile */
      max-width: 400px !important;
      font-size: 14px; /* Smaller text on mobile */
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
    background: linear-gradient(
      135deg,
      rgba(255, 153, 51, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(19, 136, 8, 0.1) 100%
    );
    margin-left: 30px;
    margin-right: 30px;
    border: 1px solid rgba(255, 153, 51, 0.2);
  }

  .sjdmkls {
    font-family: "Playfair Display", serif;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 1.4;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .SDFEDVx {
    background: linear-gradient(
      135deg,
      rgba(255, 153, 51, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(19, 136, 8, 0.1) 100%
    );
    border: 1px solid rgba(255, 153, 51, 0.3);
  }

  .options {
    padding: 9px 30px;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .options:hover {
    color: #ff9933;
    background: linear-gradient(
      135deg,
      rgba(255, 153, 51, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(19, 136, 8, 0.1) 100%
    );
  }

  .options.active {
    font-size: 18px;
    color: #ff9933;
    background: linear-gradient(
      135deg,
      rgba(255, 153, 51, 0.2) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(19, 136, 8, 0.2) 100%
    );
  }

  .suggestor-wrapper {
    width: 90%;
  }

  .search-dropdown-wrapper {
    position: relative;
    z-index: 9999;
  }
`;
