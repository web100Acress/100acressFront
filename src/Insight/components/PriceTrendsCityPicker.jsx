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
}) {
  const toggleCitySelect = (cname) => {
    setSelectedCities((list) =>
      list.includes(cname) ? list.filter((c) => c !== cname) : [...list, cname]
    );
  };

  const getCityImage = (cname) => {
    // Use cityImages prop if available, otherwise show city name as fallback
    return cityImages[cname] || null;
  };

  // Enhanced responsive breakpoints for better screen ratio support
  const [perPage, setPerPage] = useState(12);
  const [expanded, setExpanded] = useState(false);
  const [screenSize, setScreenSize] = useState("lg");
  const [gridCols, setGridCols] = useState(6);

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
    return Array.isArray(visibleCities) ? visibleCities.slice(0, perPage) : [];
  }, [expanded, perPage, visibleCities]);

  // Quick filter chips for popular cities - dynamically generated from visibleCities
  const popularChips = useMemo(
    () => {
      if (!Array.isArray(visibleCities) || visibleCities.length === 0) return [];
      // Get first 12 cities as popular chips
      return visibleCities.slice(0, 12);
    },
    [visibleCities]
  );

  // Dynamic city categorization based on city names
  const ncrCities = useMemo(
    () => {
      if (!Array.isArray(displayedCities)) return [];
      return displayedCities.filter((city) => {
        const name = String(city).toLowerCase();
        return name.includes('gurgaon') || name.includes('gurugram') ||
               name.includes('noida') || name.includes('delhi') ||
               name.includes('ghaziabad') || name.includes('faridabad') ||
               name.includes('dwarka') || name.includes('greater noida');
      });
    },
    [displayedCities]
  );

  const metroCities = useMemo(
    () => {
      if (!Array.isArray(displayedCities)) return [];
      return displayedCities.filter((city) => {
        const name = String(city).toLowerCase();
        return name.includes('mumbai') || name.includes('thane') ||
               name.includes('navi mumbai') || name.includes('pune') ||
               name.includes('bengaluru') || name.includes('bangalore') ||
               name.includes('chennai') || name.includes('hyderabad') ||
               name.includes('kolkata') || name.includes('ahmedabad');
      });
    },
    [displayedCities]
  );

  const otherCities = useMemo(
    () =>
      (displayedCities || []).filter(
        (city) => {
          const name = String(city).toLowerCase();
          return !name.includes('gurgaon') && !name.includes('gurugram') &&
                 !name.includes('noida') && !name.includes('delhi') &&
                 !name.includes('mumbai') && !name.includes('thane') &&
                 !name.includes('navi mumbai') && !name.includes('pune') &&
                 !name.includes('bengaluru') && !name.includes('bangalore') &&
                 !name.includes('chennai') && !name.includes('hyderabad') &&
                 !name.includes('kolkata') && !name.includes('ahmedabad') &&
                 !name.includes('jaipur') && !name.includes('lucknow');
        }
      ),
    [displayedCities]
  );

  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderCard = (cname) => {
    const imageUrl = getCityImage(cname);
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
            {!hasError ? (
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
        {/* Header removed as requested */}
        <div className="mb-2 sm:mb-4" />

        {/* Decorative divider (search removed for cleaner layout) */}
        <div className="mb-4 sm:mb-6">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        {/* Popular Cities with Compare toggle (rounded box) */}
        <div className="mb-6 sm:mb-8 bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl shadow-sm p-3 sm:p-4">
          <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-gray-900">
              Popular Cities
            </h3>
            <label className={`${compareMode
              ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-700'} inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border-2 transition-all cursor-pointer`}>
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => {
                  setCompareMode(e.target.checked);
                  setSelectedCities([]);
                }}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a1 1 0 011 1v8h2l-3 4-3-4h2V4a1 1 0 011-1zm10 14a1 1 0 01-1-1V8h-2l3-4 3 4h-2v8a1 1 0 01-1 1z"/>
              </svg>
              <span>Compare cities</span>
              {compareMode && (
                <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs bg-blue-100 text-blue-700 border border-blue-200">
                  {selectedCities.length}
                </span>
              )}
            </label>
          </div>
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
            {/* NCR Cities Section */}
            {ncrCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Popular in NCR
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
                  {ncrCities.map(renderCard)}
                </div>
              </section>
            )}

            {/* Metro Cities Section */}
            {metroCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Metro Cities
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
                  {metroCities.map(renderCard)}
                </div>
              </section>
            )}

            {/* Other Cities Section */}
            {otherCities.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800 uppercase tracking-wider">
                    Other Cities
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
                  {otherCities.map(renderCard)}
                </div>
              </section>
            )}
          </div>
        )}{/* Enhanced View More/Less Buttons */}
        {!pickerLoading &&
          visibleCities &&
          !expanded && (
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
      </div>
    </div>
  );
}