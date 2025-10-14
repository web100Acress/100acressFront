import React, { useEffect, useMemo, useState } from "react";

export default function PriceTrendsCityPicker({
  compareMode,
  setCompareMode,
  selectedCities,
  setSelectedCities,
  cityQuery,
  setCityQuery,
  visibleCities,
  cityImages,
  pickerLoading,
  onChooseCity,
  cityCategories = [], // Dynamic city categories from admin API
}) {
  const toggleCitySelect = (city) => {
    // Handle both object and string formats
    const cname = typeof city === "object" ? city.name : city;
    setSelectedCities((list) =>
      list.includes(cname) ? list.filter((c) => c !== cname) : [...list, cname]
    );
  };

  // Enhanced function to get city banner from dynamic data or fallback to static images
  const getCityBanner = (cname) => {
    // First try to find the city in the dynamic categories to get its banner
    for (const category of cityCategories) {
      const cityData = (category.cities || []).find((city) => {
        if (typeof city === "object") {
          return city.name === cname;
        } else {
          return city === cname;
        }
      });
      if (cityData && typeof cityData === "object" && cityData.banner?.url) {
        return cityData.banner.url;
      }
    }

    // Fallback to static cityImages prop if dynamic data not available
    return cityImages[cname] || null;
  };

  // Enhanced responsive breakpoints for better screen ratio support
  const [perPage, setPerPage] = useState(12);
  const [expanded, setExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");
  const [gridCols, setGridCols] = useState(6);
  const [bannerData, setBannerData] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  // Fetch banner data on component mount
  useEffect(() => {
    const fetchBannerData = async () => {
      setBannerLoading(true);
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // 👈 agar token nahi hai to empty headers bhejenge

        const response = await fetch(
          `${base}/api/admin/insights-price-trends-banners`,
          { headers }
        );

        if (response.ok) {
          const result = await response.json();
          const activeBanner = (result.banners || []).find(
            (banner) =>
              (banner.slug || "").includes("insights-price-trends") &&
              banner.active !== false
          );
          setBannerData(activeBanner);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setBannerLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      // Account for sidebar width (260px) on larger screens
      const availableWidth = width >= 768 ? width - 260 : width;

      if (availableWidth < 320) {
        setScreenSize("xs");
        setPerPage(4); // 1x4 grid
        setGridCols(1);
      } else if (availableWidth < 480) {
        setScreenSize("xs");
        setPerPage(6); // 2x3 grid
        setGridCols(2);
      } else if (availableWidth < 640) {
        setScreenSize("sm");
        setPerPage(9); // 3x3 grid
        setGridCols(3);
      } else if (availableWidth < 768) {
        setScreenSize("md");
        setPerPage(12); // 4x3 grid
        setGridCols(4);
      } else if (availableWidth < 1024) {
        setScreenSize("lg");
        setPerPage(15); // 5x3 grid
        setGridCols(5);
      } else if (availableWidth < 1280) {
        setScreenSize("xl");
        setPerPage(18); // 6x3 grid
        setGridCols(6);
      } else {
        setScreenSize("2xl");
        setPerPage(24); // 6x4 grid
        setGridCols(6);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const displayedCities = useMemo(() => {
    if (expanded) return visibleCities;
    // Handle both object and string formats when slicing
    if (Array.isArray(visibleCities)) {
      return visibleCities.slice(0, perPage);
    }
    return [];
  }, [expanded, perPage, visibleCities]);

  // Quick filter chips for popular cities - dynamically generated from visibleCities
  const popularChips = useMemo(() => {
    if (!Array.isArray(visibleCities) || visibleCities.length === 0) return [];
    // Get first 12 cities as popular chips, handling both string and object formats
    return visibleCities.slice(0, 12).map((city) => {
      return typeof city === "object" ? city.name : city;
    });
  }, [visibleCities]);

  const [selectedStory, setSelectedStory] = useState(null);

  // Render function for city cards
  const renderCard = (city) => {
    // Handle both object and string formats for backward compatibility
    const cname = typeof city === "object" ? city.name : city;
    const imageUrl = getCityBanner(cname);
    const hasError = imageErrors[cname];
    const isSelected = compareMode && selectedCities.includes(cname);
    const isHovered = hoveredCard === cname;

    return (
      <div
        key={cname}
        className={`group relative transition-all duration-300 ease-out transform ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        onMouseEnter={() => setHoveredCard(cname)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <button
          onClick={() =>
            compareMode ? toggleCitySelect(cname) : onChooseCity(cname, false)
          }
          className={`relative w-full bg-white border-2 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 text-left shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 group-hover:border-blue-300 ${
            isSelected
              ? "border-blue-500 ring-2 sm:ring-4 ring-blue-100 shadow-blue-200"
              : "border-gray-200 hover:border-gray-300"
          }`}
          aria-label={`Select ${cname}`}
          title={`Property Rates in ${cname}`}
        >
          {/* Enhanced image container with better styling */}
          <div className="relative inline-flex w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner ring-2 sm:ring-4 ring-white">
            {!hasError && imageUrl ? (
              <img
                key={imageUrl}
                alt={cname}
                loading="lazy"
                src={imageUrl}
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [cname]: true }))
                }
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                <span className="text-sm text-center p-2 font-medium">
                  {cname}
                </span>
              </div>
            )}

            {/* Enhanced selection indicator */}
            {isSelected && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced text content */}
          <div className="text-center space-y-1 sm:space-y-2">
            <h3 className="font-bold text-sm sm:text-lg lg:text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
              {cname}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Property Rates & Trends
            </p>
          </div>

          {/* Enhanced compare mode UI */}
          {compareMode && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 px-2 py-1 sm:px-3 sm:py-2 rounded-full">
              <input
                type="checkbox"
                readOnly
                checked={isSelected}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className="font-medium text-[10px] sm:text-xs">
                Select for comparison
              </span>
            </div>
          )}

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pl-4 md:pl-[276px] lg:pl-[276px] xl:pl-[276px]">
        {/* Header removed as requested */}
        <div className="mb-2 sm:mb-4" />

        {/* Decorative divider (search removed for cleaner layout) */}
        <div className="mb-4 sm:mb-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Static Banner Display */}
        <div className="mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Properties Banner"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex items-center justify-center">
              <div className="px-6 sm:px-8 lg:px-12 text-white text-center max-w-4xl">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 tracking-wide leading-tight">
                  Discover Your
                  <span className="block font-extrabold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mt-3">
                    Dream Property
                  </span>
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl opacity-95 font-medium leading-relaxed max-w-2xl mx-auto">
                  Unlock exclusive luxury homes across India's premier
                  destinations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities with Compare toggle (rounded box) */}
        <div className="mb-6 sm:mb-8 bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-3 sm:p-4">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {popularChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setCityQuery(chip)}
                className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border-2 border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                aria-label={`Filter by ${chip}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Loading State */}
        {pickerLoading ? (
          <div className="space-y-8">
            <div
              className={`grid gap-4 sm:gap-6 ${
                gridCols === 1
                  ? "grid-cols-1"
                  : gridCols === 2
                  ? "grid-cols-2"
                  : gridCols === 3
                  ? "grid-cols-3"
                  : gridCols === 4
                  ? "grid-cols-4"
                  : gridCols === 5
                  ? "grid-cols-5"
                  : "grid-cols-6"
              }`}
            >
              {Array.from({ length: perPage }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-3xl p-4 sm:p-6 shadow-lg animate-pulse"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-200 mx-auto mb-4" />
                  <div className="h-4 sm:h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            <div className="mt-6">

              
              {/* 6 Instagram Story Type Cards */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Property Stories
                  </h2>
                </div>

                <div className="relative">
                  <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 scrollbar-hide justify-start min-h-[200px]">
                    {[
                      {
                        id: "residential",
                        title: "RESIDENTIAL",
                        subtitle: "Find Your Home",

                        bgImage:
                          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "commercial",
                        title: "COMMERCIAL",
                        subtitle: "Business Spaces",

                        bgImage:
                          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "industrial",
                        title: "INDUSTRIAL",
                        subtitle: "Industrial Properties",

                        bgImage:
                          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "price",
                        title: "PRICE TRENDS",
                        subtitle: "Market Insights here",

                        bgImage:
                          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "analytics",
                        title: "ANALYTICS",
                        subtitle: "Data Driven Decisions",

                        bgImage:
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "investment",
                        title: "INVESTMENT",
                        subtitle: "Smart Investments",

                        bgImage:
                          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "luxury",
                        title: "LUXURY",
                        subtitle: "Premium Properties",

                        bgImage:
                          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80",
                      },
                      {
                        id: "luxury",
                        title: "LUXURY",
                        subtitle: "Premium Properties",

                        bgImage:
                          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80",
                      },
                    ].map((story, index) => (
                      <div
                        key={`${story.id}-${index}`}
                        onClick={() => setSelectedStory(story.id)}
                        className={`flex-shrink-0 cursor-pointer group ${index >= 5 ? 'opacity-60 scale-90' : ''}`}
                      >
                        <div className={`relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-gray-200 hover:border-purple-300 overflow-hidden w-40 sm:w-44 ${index >= 5 ? 'mr-8' : ''}`}>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
                          ></div>

                          {/* Circle Story Image */}
                          <div className="relative w-20 h-20 sm:w-20 sm:h-20 mx-auto">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 relative bg-white ring-4 ring-purple-100 group-hover:ring-purple-300">
                              <img
                                src={story.bgImage}
                                alt={story.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 group-hover:to-black/30 transition-all duration-300" />
                              {/* Animated pulse ring */}
                              <div
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${story.color} opacity-0 group-hover:opacity-60 animate-ping`}
                                style={{ animationDuration: "2s" }}
                              />
                            </div>
                          </div>

                          {/* Story Title - Below Circle */}
                          <div className="mt-5 text-center relative z-10">
                            <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 leading-tight">
                              {story.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700 mt-1.5 leading-tight font-medium">
                              {story.subtitle}
                            </p>

                            {/* Animated underline */}
                            <div
                              className={`w-0 group-hover:w-12 h-0.5 bg-gradient-to-r ${story.color} mx-auto mt-2 transition-all duration-500 rounded-full`}
                            ></div>
                          </div>

                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Next Button - Show More Stories */}
                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-300 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 z-10">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* end */}



              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                    Popular Cities
                  </h2>
                  <label
                    className={`${
                      compareMode
                        ? "bg-blue-50 text-blue-700 border-blue-300 shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700"
                    } inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 transition-all cursor-pointer ml-4`}
                  >
                    <input
                      type="checkbox"
                      checked={compareMode}
                      onChange={(e) => {
                        setCompareMode(e.target.checked);
                        setSelectedCities([]);
                      }}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a1 1 0 011 1v8h2l-3 4-3-4h2V4a1 1 0 011-1zm10 14a1 1 0 01-1-1V8h-2l3-4 3 4h-2v8a1 1 0 01-1 1z" />
                    </svg>
                    <span>Compare cities</span>
                    {compareMode && (
                      <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs bg-blue-100 text-blue-700 border border-blue-200">
                        {selectedCities.length}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Instagram Story Type Component */}
            </div>

            {/* Dynamic City Categories from Admin API */}
            {cityCategories.map((category, index) => (
              <section key={category.id || index}>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div
                    className="w-1 h-6 sm:h-8 rounded-full"
                    style={{ backgroundColor: category.color || "#3B82F6" }}
                  ></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    {category.name || category.title}
                  </h2>
                </div>
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    gridCols === 1
                      ? "grid-cols-1"
                      : gridCols === 2
                      ? "grid-cols-2"
                      : gridCols === 3
                      ? "grid-cols-3"
                      : gridCols === 4
                      ? "grid-cols-4"
                      : gridCols === 5
                      ? "grid-cols-5"
                      : "grid-cols-6"
                  }`}
                >
                  {(category.cities || []).map(renderCard)}
                </div>
              </section>
            ))}

            {/* Fallback for uncategorized cities */}
            {cityCategories.length === 0 &&
              displayedCities &&
              displayedCities.length > 0 && (
                <section>
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full"></div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                      All Cities
                    </h2>
                  </div>
                  <div
                    className={`grid gap-4 sm:gap-6 ${
                      gridCols === 1
                        ? "grid-cols-1"
                        : gridCols === 2
                        ? "grid-cols-2"
                        : gridCols === 3
                        ? "grid-cols-3"
                        : gridCols === 4
                        ? "grid-cols-4"
                        : gridCols === 5
                        ? "grid-cols-5"
                        : "grid-cols-6"
                    }`}
                  >
                    {displayedCities.map(renderCard)}
                  </div>
                </section>
              )}
          </div>
        )}

        {/* Enhanced View More/Less Buttons */}
        {!pickerLoading && visibleCities && !expanded && (
          <div className="flex items-center justify-center mt-12">
            <button
              onClick={() => setExpanded(true)}
              className="px-8 py-4 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View More Cities
            </button>
          </div>
        )}

        {!pickerLoading &&
          expanded &&
          visibleCities &&
          visibleCities.length > perPage && (
            <div className="flex items-center justify-center mt-12">
              <button
                onClick={() => setExpanded(false)}
                className="px-8 py-4 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Show Less
              </button>
            </div>
          )}

        {/* Enhanced Sticky Compare Action */}
        {compareMode && (
          <>
            {/* Mobile sticky bottom bar */}
            <div className="fixed bottom-4 left-2 right-2 sm:left-4 sm:right-4 md:hidden z-50">
              <div className="flex items-center justify-between gap-3 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Selected:{" "}
                    <span className="font-bold text-blue-600 text-sm sm:text-lg">
                      {selectedCities.length}
                    </span>
                  </span>
                </div>
                <button
                  disabled={selectedCities.length < 2}
                  onClick={() => {
                    onChooseCity(null, true);
                  }}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    selectedCities.length < 2
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  Compare
                </button>
              </div>
            </div>

            {/* Tablet/Desktop floating panel */}
            <div className="hidden md:flex fixed bottom-6 right-4 lg:right-8 z-50">
              <div className="flex items-center gap-4 lg:gap-6 bg-white border-2 border-gray-200 shadow-2xl rounded-2xl pl-6 lg:pl-8 pr-3 lg:pr-4 py-3 lg:py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-2 lg:w-3 h-2 lg:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs lg:text-sm font-medium text-gray-700">
                    Selected:{" "}
                    <span className="font-bold text-blue-600 text-sm lg:text-lg">
                      {selectedCities.length}
                    </span>
                  </span>
                </div>
                <button
                  disabled={selectedCities.length < 2}
                  onClick={() => {
                    onChooseCity(null, true);
                  }}
                  className={`px-4 py-2 lg:px-6 lg:py-3 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 ${
                    selectedCities.length < 2
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <span className="hidden lg:inline">Compare Cities</span>
                  <span className="lg:hidden">Compare</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Story Modal */}
        {selectedStory && (
          <div
            className="fixed inset-0 bg-red-950 bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Story Card - Instagram Style */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* Story Header */}
                <div className="relative h-96 overflow-hidden">
                  {/* Story Image Background */}
                  <div className="absolute inset-0">
                    {selectedStory === "residential" && (
                      <img
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
                        alt="Residential"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {selectedStory === "commercial" && (
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                        alt="Commercial"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {selectedStory === "industrial" && (
                      <img
                        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
                        alt="Industrial"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {selectedStory === "price" && (
                      <img
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
                        alt="Price Trends"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {selectedStory === "analytics" && (
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                        alt="Analytics"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                  </div>

                  {/* Top Header Bar */}
                  <div className="relative z-10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-2xl">
                            {selectedStory === "residential" && "🏠"}
                            {selectedStory === "commercial" && "🏢"}
                            {selectedStory === "industrial" && "🏭"}
                            {selectedStory === "price" && "💰"}
                            {selectedStory === "analytics" && "📊"}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">
                            PropertyHub
                          </h3>
                          <p className="text-gray-300 text-xs">2 hours ago</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStory(null)}
                        className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
                        >
                          <div
                            className={`h-full bg-white ${
                              i === 1 ? "w-full" : "w-0"
                            } transition-all duration-3000`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Story Title - Center Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        {selectedStory === "residential" && "RESIDENTIAL"}
                        {selectedStory === "commercial" && "COMMERCIAL"}
                        {selectedStory === "industrial" && "INDUSTRIAL"}
                        {selectedStory === "price" && "PRICE TRENDS"}
                        {selectedStory === "analytics" && "ANALYTICS"}
                      </h2>
                      <p className="text-xl text-white/90 drop-shadow-lg">
                        {selectedStory === "residential" &&
                          "Find Your Dream Home"}
                        {selectedStory === "commercial" && "Business Spaces"}
                        {selectedStory === "industrial" &&
                          "Industrial Properties"}
                        {selectedStory === "price" && "Market Insights"}
                        {selectedStory === "analytics" &&
                          "Data Driven Decisions"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Content - Bottom Card */}
                <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                          alt="Profile"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 text-xs group-hover:text-blue-700 transition-colors leading-tight">
                          {selectedStory === "residential" && "Visite Profile"}
                          {selectedStory === "commercial" && "Visite Profile"}
                          {selectedStory === "industrial" && "Visite Profile"}
                          {selectedStory === "price" && "View Price Analysis"}
                          {selectedStory === "analytics" && "View Analytics Report"}
                        </h4>
                      </div>
                    </button>

                    <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80"
                          alt="Listings"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 text-xs group-hover:text-green-700 transition-colors leading-tight">
                          {selectedStory === "residential" && "View Listing"}
                          {selectedStory === "commercial" && "View Listing"}
                          {selectedStory === "industrial" && "View Listing"}
                          {selectedStory === "price" && "View Listing"}
                          {selectedStory === "analytics" && "View Listing"}
                        </h4>
                      </div>
                    </button>
                  </div>

                  {/* Contact Icons - WhatsApp & Call (Centered Below Both Buttons) */}
                  <div className="flex items-center justify-center gap-3 pt-3 mt-3 border-t border-gray-200">
                    <button
                      onClick={(e) => handleWhatsAppClick(e, project)}
                      className="bg-[#e9f7f0] text-[#249f62] py-2 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 hover:bg-green-50"
                    >
                      <svg className="w-5 h-5 fill-[#249f62]" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690"/>
                      </svg>
                      WhatsApp
                    </button>

                    <button
                      onClick={(e) => handleCallClick(e, project)}
                      className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
