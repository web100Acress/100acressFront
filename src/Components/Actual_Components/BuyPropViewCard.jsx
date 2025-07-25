import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { FilterIcon, PropertyIcon, RupeeIcon } from "../../Assets/icons";
import { use } from "react";
import { PaginationControls } from "../../Components/Blog_Components/BlogManagement";

const BuyPropViewCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop5, setDrop5] = useState(false);
  const [drop6, setDrop6] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop, setDrop] = useState(false);
  const [drop7, setDrop7] = useState(false);
  const [position, setPosition] = useState("down");
  const [position1, setPosition1] = useState("down");
  const [position2, setPosition2] = useState("down");
  const [position3, setPosition3] = useState("down");
  const [position4, setPosition4] = useState("down");
  const [position5, setPosition5] = useState("down");
  const [position6, setPosition6] = useState("down");
  const [position7, setPosition7] = useState("down");
  const [buyData, setBuyData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightbarOpen, setIsRightbarOpen] = useState(false);
  const [minRangeValue, setMinRangeValue] = useState("1Cr");
  const [maxRangeValue, setMaxRangeValue] = useState("8Cr");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeIndex, setActiveIndex] = useState('propertyType');
  const [selectedValues, setSelectedValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Accordion state for modal
  const [accordion, setAccordion] = useState({
    propertyType: true,
    unitType: false,
    city: false,
    price: false,
  });
  const toggleAccordion = (key) => setAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

  // Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered and searched data
  const filteredAndSearchedData = filterData.filter(property =>
    property.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const paginatedData = filteredAndSearchedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredAndSearchedData.length / itemsPerPage);


  const minPriceOptions = [
    "1Cr",
    "2Cr",
    "3Cr",
    "4Cr",
    "5Cr",
    "6Cr",
    "7Cr",
    "8Cr",
  ];
  const maxPriceOptions = [
    "1Cr",
    "2Cr",
    "3Cr",
    "4Cr",
    "5Cr",
    "6Cr",
    "7Cr",
    "8Cr",
  ];

  const handleMinRangeChange = (e) => {
    const value = `${e.target.value}Cr`;
    setMinPrice(value);
  };

  const handleMaxRangeChange = (e) => {
    const value = `${e.target.value}Cr`;
    setMaxPrice(value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
  };
  const propertyTypes = [
    "Independent/Builder Floor",
    "Flat/Apartment",
    "Plot / Land",
    "Residential",
    "Residential Land",
    "Office",
    "Independent House / Villa",
    "Commercial",
    "Retail",
    "Farmhouse",
  ];
  const areas = [
    "4 BHK",
    "3 BHK",
    "2 BHK",
    "1 BHK"
  ];
  const cities = [
    "Gurugram",
    "Gurgaon",
    "Delhi",
    "Noida",
    "Sohna",
    "Alwar",
    "Gorakhpur",
    "Naini Tal",
    "Ghaziabad",
    "Bahadurgarh",
    "Faridabad",
    "Sonipat",
    "South Delhi",
    "Jaipur",
    "Vadodara"
  ];

  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;

    setSelectedState((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );

    setSelectedValues((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );
  };

  const handleClearFilters = () => {
    setSelectedPropertyTypes([]);
    setSelectedAreas([]);
    setSelectedCities([]);
    setMinPrice("");
    setMaxPrice("");
    setMinRangeValue("1Cr");
    setMaxRangeValue("8Cr");
  };
  const removePropertyType = (propertyType) => {
    setSelectedPropertyTypes(
      selectedPropertyTypes.filter((item) => item !== propertyType)
    );
  };

  const removeArea = (area) => {
    setSelectedAreas(selectedAreas.filter((item) => item !== area));
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((item) => item !== city));
  };

  const removePrice = () => {
    setMinPrice(null);
    setMaxPrice(null);
  };
  const toggle5 = () => {
    setDrop5(!drop5);
    setPosition5(position5 === "down" ? "up" : "down");
  };
  const toggle7 = () => {
    setDrop7(!drop7);
    setPosition7(position7 === "down" ? "up" : "down");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRightbar = () => {
    setIsRightbarOpen(!isRightbarOpen); 
  };


  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/property/buy/ViewAll"
      );

      setBuyData(res.data.ResaleData);
      setFilterData(res.data.ResaleData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  useEffect(() => {
    updateFilteredData();
  }, [selectedPropertyTypes, selectedAreas, selectedCities]);
  
  function normalize(str) {
    return str.toLowerCase().replace(/\s+/g, "");
  }
  
  function updateFilteredData() {
    const filteredData = buyData.filter((data) => {
      const matchPropertyType =
        selectedPropertyTypes.length === 0 ||
        selectedPropertyTypes.some(
          (type) => normalize(type) === normalize(data.propertyType)
        );
  
      const matchArea =
        selectedAreas.length === 0 ||
        selectedAreas.some(
          (area) => normalize(area) === normalize(data.type)
        );
  
      const matchCity =
        selectedCities.length === 0 ||
        selectedCities.some(
          (city) => normalize(city) === normalize(data.city)
        );
  
      return matchPropertyType && matchArea && matchCity;
    });

    setFilterData(filteredData);
  }

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedPropertyTypes, selectedAreas, selectedCities]);

  const toggle = () => {
    setDrop(!drop);
    setPosition(position === "down" ? "up" : "down");
  };

  const toggle1 = () => {
    setDrop1(!drop1);
    setPosition1(position1 === "down" ? "up" : "down");
  };

  const toggle2 = () => {
    setDrop2(!drop2);
    setPosition2(position2 === "down" ? "up" : "down");
  };
  const toggle6 = () => {
    setDrop6(!drop6);
    setPosition6(position6 === "down" ? "up" : "down");
  };

  const toggle3 = () => {
    setDrop3(!drop3);
    setPosition3(position3 === "down" ? "up" : "down");
  };
  const toggle4 = () => {
    setDrop4(!drop4);
    setPosition4(position4 === "down" ? "up" : "down");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const openDropdown = () => {
    setToOpen(!toOpen);
  };
  const showDropdown = () => {
    setShow(!show);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const onScroll = () => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  console.log(buyData,"Resale data");
  
  // Ref for property grid
  const propertyGridRef = React.useRef(null);

  // Scroll to top of grid on page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      {/* Filter Button */}
      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all" onClick={() => setFilterModalOpen(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-fade-in"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setFilterModalOpen(false)}
              aria-label="Close Filters"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Filters</h2>
            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Property Type */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('propertyType')}>
                  Property Type
                  <span>{accordion.propertyType ? '−' : '+'}</span>
                </button>
                {accordion.propertyType && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={type}
                          checked={selectedPropertyTypes.includes(type)}
                          onChange={e => handleCheckboxChange(e, setSelectedPropertyTypes)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Unit Type */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('unitType')}>
                  Unit Type
                  <span>{accordion.unitType ? '−' : '+'}</span>
                </button>
                {accordion.unitType && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <label key={area} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={area}
                          checked={selectedAreas.includes(area)}
                          onChange={e => handleCheckboxChange(e, setSelectedAreas)}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* City */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('city')}>
                  City
                  <span>{accordion.city ? '−' : '+'}</span>
                </button>
                {accordion.city && (
                  <div className="pl-2 flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <label key={city} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          className="accent-red-500"
                          value={city}
                          checked={selectedCities.includes(city)}
                          onChange={e => handleCheckboxChange(e, setSelectedCities)}
                        />
                        {city}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {/* Price Criteria */}
              <div>
                <button className="w-full flex justify-between items-center py-2 font-semibold text-left" onClick={() => toggleAccordion('price')}>
                  Price Criteria
                  <span>{accordion.price ? '−' : '+'}</span>
                </button>
                {accordion.price && (
                  <div className="pl-2 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Min Price:</label>
                      <select
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="">Min Price</option>
                        {minPriceOptions.map((price) => (
                          <option key={price} value={price}>₹{price}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-sm">Max Price:</label>
                      <select
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="">Max Price</option>
                        {maxPriceOptions.map((price) => (
                          <option key={price} value={price}>₹{price}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Modal Actions */}
            <div className="flex justify-between mt-6 gap-2">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
                onClick={() => setFilterModalOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="flex flex-col items-center justify-center py-0 mb-3">
            <h2
              className="text-center font-sans font-bold text-3xl md:text-4xl tracking-tight text-[#111827] drop-shadow-sm relative"
              style={{ fontFamily: 'Poppins, Inter, Montserrat, sans-serif' }}
            >
              <span className="inline-block">
                Best Resale Properties
              </span>
              <span className="block mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-red-400 via-red-600 to-red-400 opacity-80 transition-all duration-300 group-hover:w-24"></span>
            </h2>
            <div className="text-center mt-2 mb-2 text-base md:text-lg font-medium text-gray-600">
              Premium Resale Properties — Value, Location, and Trust Redefined.
            </div>
          </div>
          {/* Search Bar + Filter Button Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 mb-6 w-full">
            <div className="relative w-full max-w-2xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                {/* Search Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by property name or city..."
                className="bg-white rounded-full pl-12 pr-4 py-2 shadow-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200 transition text-base"
              />
            </div>
            <button
              className="mt-2 md:mt-0 bg-red-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-600 transition flex items-center gap-2"
              onClick={() => setFilterModalOpen(true)}
              aria-label="Open Filters"
              type="button"
            >
              <FilterIcon className="inline-block" /> Filters
            </button>
          </div>
          {/* Filter Chips */}
          {(selectedPropertyTypes.length > 0 || selectedAreas.length > 0 || selectedCities.length > 0 || minPrice || maxPrice) && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {selectedPropertyTypes.map(type => (
                <span key={type} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fade-in">
                  {type}
                  <button onClick={() => removePropertyType(type)} className="ml-1 text-red-500 hover:text-red-700">×</button>
                </span>
              ))}
              {selectedAreas.map(area => (
                <span key={area} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fade-in">
                  {area}
                  <button onClick={() => removeArea(area)} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                </span>
              ))}
              {selectedCities.map(city => (
                <span key={city} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fade-in">
                  {city}
                  <button onClick={() => removeCity(city)} className="ml-1 text-green-500 hover:text-green-700">×</button>
                </span>
              ))}
              {(minPrice || maxPrice) && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 animate-fade-in">
                  ₹{minPrice || '0'} - ₹{maxPrice || 'Any'}
                  <button onClick={removePrice} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                </span>
              )}
              <button onClick={handleClearFilters} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs hover:bg-gray-200 ml-2">Clear All</button>
            </div>
          )}
          <section className="flex flex-col items-center bg-white mb-4 rounded-xl shadow-md p-4">
            {filteredAndSearchedData.length === 0 ? (
              <div><CustomSkeleton /></div>
            ) :  (
              <>
                <div ref={propertyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {paginatedData.map((property, idx) => (
                    <Link
                      key={property._id || idx}
                      to={property.propertyName && property._id
                        ? `/buy-properties/${property.propertyName.replace(/\s+/g, '-')}/${property._id}/`
                        : "#"}
                      target="_top"
                      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl hover:scale-105 duration-300 animate-fade-in group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
                      style={{ animationDelay: `${idx * 60}ms` }}
                      tabIndex={0}
                    >
                      <div className="overflow-hidden">
                        <img
                          src={property.frontImage?.url}
                          alt={property.propertyName}
                          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5 pb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{property.propertyName}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                          {/* Location pin icon */}
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-7.163-8-10a8 8 0 1116 0c0 2.837-3.582 10-8 10z' /></svg>
                          <span className="truncate">{property.city}, {property.state}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                          <PropertyIcon style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }} />
                          <span className="truncate">{property.propertyType || 'Property'}</span>
                        </div>
                        <div className="mt-auto flex flex-col gap-1 pb-0">
                          <span className="text-red-500 font-bold text-lg flex items-center gap-1">
                            <RupeeIcon /> {(() => {
                              if (!property.price) return '';
                              const priceNum = Number(property.price);
                              if (priceNum <= 150) {
                                return `${priceNum} Cr`;
                              } else {
                                return `${(priceNum / 10000000).toFixed(2)} Cr`;
                              }
                            })()}
                          </span>
                          <div
                            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md text-base font-semibold text-center transition mt-1 mb-0 cursor-pointer"
                            tabIndex={-1}
                          >
                            View Details
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <PaginationControls
                  currentPage={currentPage}
                  setCurrentPage={handlePageChange}
                  totalPages={totalPages}
                />
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default BuyPropViewCard;
const Wrapper = styled.section`
  box-sizing: border-box;
  font-family: DM Sans, sans-serif;

  .li_options {
    padding: 30px 0;
    border-right: 1px solid #d9d9d9;
  }
  .fi_space {
    padding: 0 30px;
    margin-bottom: 20px;
  }
  .theme_btn {
    position: relative;
    font-size: 16px;
    padding: 10px 30px 12px;
    display: inline-block;
    border-radius: 40px;
    border: 0;
    font-weight: 500;
    transition: 0.3s;
    cursor: pointer;
  }
  .li_options .fi_heading {
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #959595;
    padding: 0 30px;
    margin-bottom: 15px;
  }
  .li_options .fi_acc {
    padding: 0 30px;
  }
  .fi_head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-weight: 300;
    cursor: pointer;
    font-size: 17px;
    color: #000000;
  }
  .toggleIcon {
    font-size: 19px;
    line-height: 1;
  }
  .fi_options {
    list-style: none;
    padding-bottom: 10px;
  }
  .show {
    display: block;
  }
  .fi_options li {
    margin-right: 6px;
    margin-bottom: 7px;
    display: inline-block;
  }
  .fi_options li input {
    display: none;
  }
  .fi_options .filter {
    border: 1px solid #ccc;
    width: fit-content;
    padding: 8px 15px;
    color: #959595;
    border-radius: 30px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
  }
  label {
    margin-bottom: 0rem !important;
  }
  .li_options .fi_acc:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  .hide {
    display: none;
  }
  .li_items {
    width: 100%;
  }
  .li_head_row {
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #313131;
    margin-bottom: 30px;
  }
  .li_head_row .title {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    line-height: 24px;
  }
  .li_head_row .description {
    margin-bottom: 0;
    color: #535353;
    font-size: 16px;
    margin-top: 12px;
    line-height: 24px;
  }
  .li_head_row .sorting-filter select {
    padding: 8px 20px;
    border: 1px solid #d9d9d9;
    border-radius: 35px;
    outline: none;
    color: #828282;
  }
  .filter-choice:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }

  label {
    font-size: 14px;
  }
  @media only screen and (max-width: 570px) {
    .li_options {
      display: none;
    }
    .li_items {
      width: 100%;
    }
    .sorting-filter {
      display: none;
    }
  }
`;