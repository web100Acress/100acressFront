import React, { useEffect, useMemo, useState } from "react";

export default function PriceTrendsCityPickerMobile({
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

  // Mobile-optimized state - simpler breakpoints
  const [perPage, setPerPage] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const [gridCols, setGridCols] = useState(2);
  const [bannerData, setBannerData] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Fetch banner data on component mount
  useEffect(() => {
    const fetchBannerData = async () => {
      setBannerLoading(true);
      try {
        const token = localStorage.getItem("myToken");
        const base = import.meta.env.VITE_API_BASE;

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

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

  // Mobile-only responsive breakpoints (max 768px assumed)
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width < 360) {
        setPerPage(4);
        setGridCols(2);
      } else if (width < 480) {
        setPerPage(6);
        setGridCols(2);
      } else {
        setPerPage(9);
        setGridCols(3);
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const displayedCities = useMemo(() => {
    if (expanded) return visibleCities;
    if (Array.isArray(visibleCities)) {
      return visibleCities.slice(0, perPage);
    }
    return [];
  }, [expanded, perPage, visibleCities]);

  // Quick filter chips - limit to 8 for mobile
  const popularChips = useMemo(() => {
    if (!Array.isArray(visibleCities) || visibleCities.length === 0) return [];
    return visibleCities.slice(0, 8).map((city) => {
      return typeof city === "object" ? city.name : city;
    });
  }, [visibleCities]);

  const [selectedStory, setSelectedStory] = useState(null);

  // Mobile-optimized render function for city cards
  const renderCard = (city) => {
    const cname = typeof city === "object" ? city.name : city;
    const imageUrl = getCityBanner(cname);
    const hasError = imageErrors[cname];
    const isSelected = compareMode && selectedCities.includes(cname);

    return (
      <div key={cname} className="group relative">
        <button
          onClick={() =>
            compareMode ? toggleCitySelect(cname) : onChooseCity(cname, false)
          }
          className={`relative w-full bg-white border-2 rounded-xl p-3 text-left shadow-md active:scale-95 transition-all duration-200 flex flex-col items-center gap-2 ${isSelected
            ? "border-blue-500 ring-2 ring-blue-100 shadow-blue-200"
            : "border-gray-200"
            }`}
          aria-label={`Select ${cname}`}
          title={`Property Rates in ${cname}`}
        >
          {/* Mobile-optimized image container */}
          <div className="relative inline-flex w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner ring-2 ring-white">
            {!hasError && imageUrl ? (
              <img
                key={imageUrl}
                alt={cname}
                loading="lazy"
                src={imageUrl}
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [cname]: true }))
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                <span className="text-[10px] text-center p-1 font-medium">
                  {cname}
                </span>
              </div>
            )}

            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
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

          {/* Mobile-optimized text content */}
          <div className="text-center space-y-0.5">
            <h3 className="font-bold text-xs text-gray-900 leading-tight">
              {cname}
            </h3>
            <p className="text-[10px] text-gray-500 font-medium">
              Property Rates
            </p>
          </div>

          {/* Compact compare mode UI */}
          {compareMode && (
            <div className="flex items-center gap-1 text-[10px] text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
              <input
                type="checkbox"
                readOnly
                checked={isSelected}
                className="w-3 h-3 rounded text-blue-600"
              />
              <span className="font-medium">Compare</span>
            </div>
          )}
        </button>
      </div>
    );
  };

  // Story cards data
  const storyCards = [
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
      subtitle: "Industrial",
      bgImage:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "price",
      title: "PRICE TRENDS",
      subtitle: "Market Insights",
      bgImage:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "analytics",
      title: "ANALYTICS",
      subtitle: "Data Driven",
      bgImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "investment",
      title: "INVESTMENT",
      subtitle: "Smart Invest",
      bgImage:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Mobile-only: No sidebar offset */}
      <div className="w-full px-3 pt-6 pb-2">

        <div className="mb-4">
          <div className="relative overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Real Estate Analytics"
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex items-center">
              <div className="px-6 text-white text-left max-w-[80%]">
                <h2 className="text-xl font-bold mb-1 tracking-tight leading-tight">
                  Real Estate
                  <span className="block text-blue-400">Market Insights</span>
                </h2>
                <p className="text-[10px] opacity-90 font-medium leading-relaxed">
                  Explore property rate trends and investment analytics across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Chips - Horizontal Scroll for Mobile */}
        {popularChips.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-0.5">
              {popularChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setCityQuery(chip)}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[11px] font-semibold text-gray-700 active:bg-blue-50 active:border-blue-300 active:text-blue-700 transition-all shadow-sm"
                  aria-label={`Filter by ${chip}`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {pickerLoading ? (
          <div className="space-y-4">
            <div className={`grid gap-3 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {Array.from({ length: perPage }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm animate-pulse"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-200 mx-auto mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-1" />
                  <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Property Stories - Mobile optimized */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-base font-bold text-gray-800 uppercase tracking-wide">
                  Property Stories
                </h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {storyCards.map((story, index) => (
                  <div
                    key={`${story.id}-${index}`}
                    onClick={() => setSelectedStory(story.id)}
                    className="flex-shrink-0 cursor-pointer active:scale-95 transition-transform duration-150"
                  >
                    <div className="relative bg-white rounded-xl p-2 shadow-md border border-gray-100 w-24">
                      {/* Circle Story Image */}
                      <div className="relative w-14 h-14 mx-auto">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-purple-100">
                          <img
                            src={story.bgImage}
                            alt={story.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                        </div>
                      </div>

                      {/* Story Title */}
                      <div className="mt-2 text-center">
                        <h3 className="text-[10px] font-bold text-gray-800 leading-tight truncate">
                          {story.title}
                        </h3>
                        <p className="text-[9px] text-gray-500 mt-0.5 truncate">
                          {story.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Cities Header with Compare Toggle */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                  Popular Cities
                </h2>
                <label
                  className={`${compareMode
                    ? "bg-blue-50 text-blue-700 border-blue-300"
                    : "bg-white text-gray-600 border-gray-200"
                    } inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    checked={compareMode}
                    onChange={(e) => {
                      setCompareMode(e.target.checked);
                      setSelectedCities([]);
                    }}
                    className="w-3 h-3 rounded text-blue-600"
                  />
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a1 1 0 011 1v8h2l-3 4-3-4h2V4a1 1 0 011-1zm10 14a1 1 0 01-1-1V8h-2l3-4 3 4h-2v8a1 1 0 01-1 1z" />
                  </svg>
                  <span>Compare</span>
                  {compareMode && (
                    <span className="ml-0.5 inline-flex items-center justify-center px-1 py-0.5 rounded-full text-[9px] bg-blue-100 text-blue-700">
                      {selectedCities.length}
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* Dynamic City Categories from Admin API */}
            {cityCategories.map((category, index) => (
              <section key={category.id || index}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: category.color || "#3B82F6" }}
                  ></div>
                  <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    {category.name || category.title}
                  </h2>
                </div>
                <div className={`grid gap-3 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                  {(category.cities || []).map(renderCard)}
                </div>
              </section>
            ))}

            {/* Fallback for uncategorized cities */}
            {cityCategories.length === 0 &&
              displayedCities &&
              displayedCities.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full"></div>
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                      All Cities
                    </h2>
                  </div>
                  <div className={`grid gap-3 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {displayedCities.map(renderCard)}
                  </div>
                </section>
              )}
          </div>
        )}

        {/* View More/Less Buttons */}
        {!pickerLoading && visibleCities && !expanded && (
          <div className="flex items-center justify-center mt-6 mb-20">
            <button
              onClick={() => setExpanded(true)}
              className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white active:bg-gray-50 text-sm font-semibold text-gray-700 transition-all duration-150 shadow-sm"
            >
              View More Cities
            </button>
          </div>
        )}

        {!pickerLoading &&
          expanded &&
          visibleCities &&
          visibleCities.length > perPage && (
            <div className="flex items-center justify-center mt-6 mb-20">
              <button
                onClick={() => setExpanded(false)}
                className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white active:bg-gray-50 text-sm font-semibold text-gray-700 transition-all duration-150 shadow-sm"
              >
                Show Less
              </button>
            </div>
          )}

        {/* Mobile Sticky Compare Action Bar */}
        {compareMode && (
          <div className="fixed bottom-4 left-3 right-3 z-50">
            <div className="flex items-center justify-between gap-3 bg-white border border-gray-200 shadow-xl rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">
                  Selected:{" "}
                  <span className="font-bold text-blue-600 text-sm">
                    {selectedCities.length}
                  </span>
                </span>
              </div>
              <button
                disabled={selectedCities.length < 2}
                onClick={() => {
                  onChooseCity(null, true);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${selectedCities.length < 2
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white active:from-blue-700 active:to-indigo-700 shadow-md"
                  }`}
              >
                Compare
              </button>
            </div>
          </div>
        )}

        {/* Story Modal - Mobile optimized */}
        {selectedStory && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-3"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className="relative w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Story Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Story Header */}
                <div className="relative h-72 overflow-hidden">
                  {/* Story Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={storyCards.find((s) => s.id === selectedStory)?.bgImage || ""}
                      alt={selectedStory}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                  </div>

                  {/* Top Header Bar */}
                  <div className="relative z-10 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-lg">
                            {selectedStory === "residential" && "🏠"}
                            {selectedStory === "commercial" && "🏢"}
                            {selectedStory === "industrial" && "🏭"}
                            {selectedStory === "price" && "💰"}
                            {selectedStory === "analytics" && "📊"}
                            {selectedStory === "investment" && "📈"}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xs">
                            PropertyHub
                          </h3>
                          <p className="text-gray-300 text-[10px]">2 hours ago</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStory(null)}
                        className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-sm"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-0.5 flex-1 bg-white/30 rounded-full overflow-hidden"
                        >
                          <div
                            className={`h-full bg-white ${i === 1 ? "w-full" : "w-0"
                              } transition-all duration-3000`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Story Title - Center Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {storyCards.find((s) => s.id === selectedStory)?.title || ""}
                      </h2>
                      <p className="text-base text-white/90 drop-shadow-lg">
                        {storyCards.find((s) => s.id === selectedStory)?.subtitle || ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Content - Bottom Card */}
                <div className="bg-white rounded-t-2xl -mt-4 relative z-10 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 transition-all duration-150 active:from-blue-100">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 text-[10px] leading-tight">
                          Visit Profile
                        </h4>
                      </div>
                    </button>

                    <button className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 transition-all duration-150 active:from-green-100">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80"
                          alt="Listings"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 text-[10px] leading-tight">
                          View Listing
                        </h4>
                      </div>
                    </button>
                  </div>

                  {/* Contact Icons - WhatsApp & Call */}
                  <div className="flex items-center justify-center gap-3 pt-3 mt-3 border-t border-gray-200">
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#e9f7f0] text-[#249f62] py-2 px-4 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors duration-150 active:bg-green-100"
                    >
                      <svg className="w-4 h-4 fill-[#249f62]" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.690" />
                      </svg>
                      WhatsApp
                    </a>

                    <a
                      href="tel:+919999999999"
                      className="bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors duration-150 active:bg-blue-100"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      Call Now
                    </a>
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
