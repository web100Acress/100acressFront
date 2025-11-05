import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, RupeeIcon, PropertyIcon } from "../Assets/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import CustomSkeleton from "../Utils/CustomSkeleton";
import Api_service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";
import Footer from "../Components/Actual_Components/Footer";
import FAQSection from "../Components/Actual_Components/FAQSection";
import { resaleFAQs } from "../Data/resaleFAQs";

// Import Google Fonts (Rubik - matching home page)
const fontLink = document.createElement('link');
fontLink.href = "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const FILTERS = [
  { label: "Property Type", key: "propertyType", options: ["Independent/Builder Floor", "Flat/Apartment", "Plot / Land", "Residential", "Residential Land", "Office", "Independent House / Villa", "Commercial", "Retail", "Farmhouse"] },
  { label: "Unit Type", key: "unitType", options: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"] },
  { label: "City", key: "city", options: ["Gurugram", "Delhi", "Noida", "Faridabad"] },
  { label: "Price Criteria", key: "priceRange", options: ["< 50L", "50L-1Cr", "1Cr-2Cr", "> 2Cr"] },
];

const priceRangeMatch = (price, range) => {
  if (!price) return false;
  if (typeof price === 'string') price = parseInt(price.replace(/[^\d]/g, ''));
  switch (range) {
    case '< 50L': return price < 5000000;
    case '50L-1Cr': return price >= 5000000 && price < 10000000;
    case '1Cr-2Cr': return price >= 10000000 && price < 20000000;
    case '> 2Cr': return price >= 20000000;
    default: return true;
  }
};

const Resale = () => {
  const { getResaleProperties } = Api_service();
  const resalePropertydata = useSelector(store => store?.resaleproperty?.resale);
  const [showFilters, setShowFilters] = useState(false); // For mobile
  const [collapsed, setCollapsed] = useState(FILTERS.map(() => false));
  const [selectedFilters, setSelectedFilters] = useState({
    propertyType: [],
    unitType: [],
    city: [],
    priceRange: [],
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    if (resalePropertydata.length === 0) {
      getResaleProperties();
    }
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // Collapsible filter toggle (for mobile)
  const handleCollapse = idx => {
    setCollapsed(prev => prev.map((c, i) => (i === idx ? !c : c)));
  };

  // Responsive: close filters on mobile after selection
  const handleMobileFilter = () => setShowFilters(false);

  // Handle filter checkbox change
  const handleFilterChange = (key, option) => {
    setSelectedFilters(prev => {
      const arr = prev[key];
      if (arr.includes(option)) {
        return { ...prev, [key]: arr.filter(o => o !== option) };
      } else {
        return { ...prev, [key]: [...arr, option] };
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilters({
      propertyType: [],
      unitType: [],
      city: [],
      priceRange: [],
    });
  };

  // Filter logic
  let filteredProperties = (resalePropertydata || []).filter(property => {
    // Property Type
    if (selectedFilters.propertyType.length > 0 && property.propertyType && !selectedFilters.propertyType.includes(property.propertyType)) {
      return false;
    }
    // Unit Type
    if (selectedFilters.unitType.length > 0 && property.unitType && !selectedFilters.unitType.includes(property.unitType)) {
      return false;
    }
    // City
    if (selectedFilters.city.length > 0 && property.city && !selectedFilters.city.includes(property.city)) {
      return false;
    }
    // Price Range
    if (selectedFilters.priceRange.length > 0) {
      let match = false;
      for (const range of selectedFilters.priceRange) {
        if (priceRangeMatch(property.price, range)) {
          match = true;
          break;
        }
      }
      if (!match) return false;
    }
    // Search
    if (search && !property.propertyName?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort logic
  if (sort === "latest") {
    filteredProperties = filteredProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "priceLow") {
    filteredProperties = filteredProperties.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sort === "priceHigh") {
    filteredProperties = filteredProperties.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  // Count of active filters
  const activeFilterCount = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0);

  // Featured property (first in list)
  const featured = filteredProperties[0];
  const rest = filteredProperties.slice(1);

  return (
    <>
    <section
      className="bg-white min-h-screen py-6 lg:py-10"
      style={{ fontFamily: 'Rubik, sans-serif' }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">100acress Resale</h1>
        <div className="w-16 h-1 mx-auto bg-[#D32F2F] rounded mb-2"></div>
        <p className="text-gray-500 text-base md:text-lg">Find the best resale properties in top locations. Search, filter, and discover your next home or investment.</p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search resale properties..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-96 px-5 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-base bg-white"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="w-40 px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] text-base bg-white"
        >
          <option value="latest">Latest</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
        {/* Mobile filter button */}
        <button
          className="md:hidden bg-white border border-gray-300 shadow-lg rounded-full p-3 flex items-center gap-2 text-gray-700"
          onClick={() => setShowFilters(true)}
        >
          <span className="material-icons">filter_list</span>
          <span className="font-semibold">Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-[#D32F2F] text-white rounded-full px-2 py-0.5 text-xs font-bold">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-40 flex">
          <div className="bg-white w-72 h-full p-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">Filters</span>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 text-2xl">&times;</button>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-gray-700">Filter Options</span>
              <button
                className="text-xs text-red-600 font-semibold hover:underline px-2 py-1 rounded-lg"
                onClick={resetFilters}
                type="button"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-4">
              {FILTERS.map((filter, idx) => (
                <div key={filter.label} className="bg-gray-50 rounded-xl shadow-sm border border-gray-200">
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-gray-700 font-semibold focus:outline-none rounded-xl"
                    onClick={() => handleCollapse(idx)}
                    aria-expanded={!collapsed[idx]}
                    type="button"
                  >
                    <span>{filter.label}</span>
                    <span className={`transform transition-transform duration-200 ${collapsed[idx] ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 px-4 ${collapsed[idx] ? 'max-h-0 py-0' : 'max-h-40 py-2'}`}
                  >
                    <ul className="space-y-2">
                      {filter.options.map(option => (
                        <li key={option}>
                          <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 focus:ring-2 focus:ring-red-400"
                              checked={selectedFilters[filter.key].includes(option)}
                              onChange={() => handleFilterChange(filter.key, option)}
                            />
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-black bg-opacity-30" onClick={handleMobileFilter}></div>
        </div>
      )}

      {/* Featured Property Card */}
      {featured && (
        <div className="mx-auto max-w-5xl mb-10 flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          {featured.frontImage && (
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                src={featured.frontImage.url}
                alt="frontImage"
                className="object-cover w-full h-full max-h-80"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-[#D32F2F] text-white text-xs font-bold rounded-full px-3 py-1 mb-2">Featured</span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, Inter, Roboto, sans-serif' }}>
                {featured.propertyName}
              </h2>
              <p className="text-gray-500 text-base mb-2">{featured.address}</p>
              <p className="text-xs text-gray-400 mb-2 font-medium">{featured.propertyType || 'Property'}</p>
              <div className="text-[#D32F2F] font-bold text-xl flex items-center gap-1 mb-4">
                <RupeeIcon />
                {featured.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
              </div>
            </div>
            <div>
              <Link
                to={`/buy-properties/${featured.propertyName ? featured.propertyName.replace(/\s+/g, '-') : 'unknown'}/${featured._id}`}
                target="_top"
                className="inline-block bg-[#D32F2F] hover:bg-red-800 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Property Cards */}
      <div className="mx-auto max-w-screen-xl px-2 md:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {(!search && rest && rest.length > 0) || (search && rest && rest.length > 0) ? (
          rest.map((property) => (
            <Link
              key={property._id}
              to={`/buy-properties/${property.propertyName ? property.propertyName.replace(/\s+/g, '-') : 'unknown'}/${property._id}`}
              target="_top"
              className="block"
            >
              <article
                data-aos="zoom-in"
                data-aos-delay="100"
                className="rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden flex flex-col min-h-[320px]"
              >
                {property.frontImage && (
                  <div className="h-48 w-full overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={property.frontImage.url}
                      alt="frontImage"
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate hover:text-red-600" style={{ fontFamily: 'Poppins, Inter, Roboto, sans-serif' }}>
                      {property.propertyName?.split(" ").slice(0, 6).join(" ")}
                    </h3>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {property.address?.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 font-medium">
                      <PropertyIcon style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }} />
                      <span>{property.propertyType || 'Property'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-[#D32F2F] font-bold text-base flex items-center gap-1">
                      <RupeeIcon />
                      {property.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                    </div>
                    <button
                      className="bg-[#D32F2F] hover:bg-red-800 text-white px-7 py-2 rounded-full text-base font-bold shadow-lg transition-all duration-300 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : search ? (
          <div className="w-full text-center text-gray-500 py-10">No properties found for your search.</div>
        ) : (
          <CustomSkeleton />
        )}
      </div>
    </section>
    
    {/* FAQ Section */}
    <FAQSection faqs={resaleFAQs} type="resale" />
    
    <Footer />
    </>
  );
};

export default Resale;
