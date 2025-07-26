import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CustomSkeleton from "../../Utils/CustomSkeleton";
import { FilterIcon, PropertyIcon, RupeeIcon } from "../../Assets/icons";

const RentPropViewCard = () => {
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
 

  console.log(buyData, "buydata");

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
    "Industrial",
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
    "Noida",
    "Kharar",
    "Meerut",
    "Chikhli (Jalna)",
    "Hubballi",
    "Pudukkottai",
    "South West Delhi",
    "Central Delhi",
    "Hyderabad"];

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
  const toggle6 = () => {
    setDrop6(!drop6);
    setPosition6(position6 === "down" ? "up" : "down");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRightbar = () => {
    setIsRightbarOpen(!isRightbarOpen); 
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/property/rent/viewAll");
      
      setBuyData(res.data.rentaldata);
      setFilterData(res.data.rentaldata);
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
  
    console.log(filteredData, "Combined Filtered Data");
    setFilterData(filteredData);
  }
  


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

  return (
    <>
      {" "}
      <Wrapper className="Section mt-12">
        <Helmet>
          <title>Top-Rated Rental Properties in Gurugram: 100acress</title>
          <meta
            name="description"
            content="Explore top-rated rental properties in Gurugram. Choose from a variety of options that fit your budget and style. Connect with 100acress now!"
          />
          <meta property="og:title" content="Top-Rated Rental Properties in Gurugram: 100acress" />
          <meta property="og:site_name" content="100acress" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
          <meta property="og:url" content="https://www.100acress.com/rental-properties/best-rental-property-in-gurugram/" />
          <meta property="og:description" content="Explore top-rated rental properties in Gurugram. Choose from a variety of options that fit your budget and style. Connect with 100acress now!
"/>
          <meta property="og:keywords" content="Rental Properties in Gurugram" />
          <meta name="twitter:title" content="Top-Rated Rental Properties in Gurugram: 100acress" />
          <meta name="twitter:description" content="Explore top-rated rental properties in Gurugram. Choose from a variety of options that fit your budget and style. Connect with 100acress now!" />
          <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
          <meta name="twitter:card" content="summary" />

          <link
            rel="canonical"
            href="https://www.100acress.com/buy-properties/best-resale-property-in-gurugram/"
          />
        </Helmet>
        <nav className="navbar d-lg-none d-xl-none d-xxl-none">
          <div className="container-fluid">
            {/* on tablet screen */}
            <div className="">
              <ul className="w-full md:w-[740px] mb-0 mb-lg-0 shadow-none flex flex-wrap justify-center space-x-2 pl-0">
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                  >
                    Property Type
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Independent Floor
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Apartment
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Builder Floor
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Plot
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Residential
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Studio
                      </Link>
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Villas
                      </Link>
                    </div>
                  )}
                </li>
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={toOpen}
                    onClick={openDropdown}
                  >
                    Unit Type
                  </button>
                  {toOpen && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        1 BHK
                      </Link>
                    </div>
                  )}
                </li>
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={show}
                    onClick={showDropdown}
                  >
                    City
                  </button>
                  {show && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                        to=""
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Gurugram
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
              <div>
                {/* on mobile screen  */}
                <div className="w-[94vw] flex items-center justify-end p-2">
                <button
                    className="relative text-white bg-black py-2 rounded-md px-4 md:hidden lg:block sm:mt-9"
                    onClick={toggleSidebar}
                  >
                    {selectedValues.length > 0 && (
                      <span className="absolute left-0 top-0 size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primaryRed opacity-75"></span>
                        <span className="relative inline-flex size-3 rounded-full bg-primaryRed"></span>
                      </span>
                    )}
                    <FilterIcon/>
                  </button>
                </div>

               <div className="absolute w-[100vw] h-[100vh] flex items-center">
                <div
                  className={`fixed top-0 left-0 w-auto h-full bg-white text-black z-10  p-4 mt-[5vh] transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out`}
                >
                  <div className="w-full flex justify-start items-center gap-2 py-4 border-b-2">
                  <button
                      className="text-white bg-red-500 py-1 px-2 rounded mt-0"
                      onClick={toggleSidebar}
                    >
                      ✖
                    </button>
                    <h2 className="text-xl font-semibold mb-0">Filters</h2>
                   
                  </div>

                  <div
                          className={`py-2 fi_head cursor-pointer ${
                            activeIndex === "propertyType" ? "bg-red-300" : ""
                          }`}
                          onClick={() => {
                            toggle();
                            setActiveIndex("propertyType");
                          }}
                        >
                          Property Type
                  </div>


                  <div className="fi_acc">
                    <div className={`py-2 px-0 fi_head cursor-pointer ${
                            activeIndex === "area" ? "bg-red-300" : ""
                          }`} onClick={()=>{
                      toggle4();
                      setActiveIndex("area");
                    }}>
                      Unit Type
                    </div>
                  </div>

                  
                  <div className="fi_acc">
                    <div className={`py-2 px-0 fi_head cursor-pointer ${
                            activeIndex === "city" ? "bg-red-300" : ""
                          }`} onClick={()=>{
                      toggle1();
                      setActiveIndex("city");
                    }}>
                      City
                    </div>
                  </div>

                  <div className="fi_acc">
                    <span className={`py-2 px-0 fi_head cursor-pointer ${
                            activeIndex === "price" ? "bg-red-300" : ""
                          }`} onClick={()=>{
                      toggle5();
                      setActiveIndex("price");
                    }}>
                      Price Criteria
                    </span>
  
                  </div>
                </div>

                <div
                     className={`fixed top-0 right-0 w-[64%] h-full bg-white text-black z-10 border-l-2 mt-[5vh] p-4 transform ${
                      isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in sm:block`}
>
               
                  <div className="w-auto flex justify-start items-center gap-2 py-4">
          
                  {activeIndex === "propertyType" && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                        <div className="mb-3 mt-5">
                      {propertyTypes.map((type) => (
                        <li key={type} style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id={type.toLowerCase().replace(" ", "_")}
                            name="property_type"
                            className="filter-choice"
                            value={type}
                            checked={selectedPropertyTypes.includes(type)}
                            onChange={(e) =>
                              handleCheckboxChange(e, setSelectedPropertyTypes)
                            }
                          />
                          <label
                            htmlFor={type.toLowerCase().replace(" ", "_")}
                            className="filter ml-2 text-lg"
                          >
                            {type}
                          </label>
                        </li>
                      ))}
                    </div>
                      </div>
                    )}
               
                  
                  {activeIndex === "area" && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                       <div className="mb-2 mt-5">
                        {areas.map((area) => (
                          <li key={area} style={{ listStyle: "none" }}>
                            <input
                              type="checkbox"
                              id={area.toLowerCase().replace(" ", "_")}
                              name="area"
                              className="filter-choice"
                              value={area}
                              checked={selectedAreas.includes(area)}
                              onChange={(e) =>
                                handleCheckboxChange(e, setSelectedAreas)
                              }
                            />
                            <label
                              htmlFor={area.toLowerCase().replace(" ", "_")}
                              className="filter ml-2"
                            >
                              {area}
                            </label>
                          </li>
                        ))}
                      </div>
                      </div>
                    )}
                  

                    {activeIndex === "city" && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                        <div className="mb-2 mt-5">
                        {cities.map((city) => (
                          <li key={city} style={{ listStyle: "none" }}>
                            <input
                              type="checkbox"
                              id={city.toLowerCase().replace(" ", "_")}
                              name="city"
                              className="filter-choice"
                              value={city}
                              checked={selectedCities.includes(city)}
                              onChange={(e) =>
                                handleCheckboxChange(e, setSelectedCities)
                              }
                            />
                            <label
                              htmlFor={city.toLowerCase().replace(" ", "_")}
                              className="filter ml-2"
                            >
                              {city}
                            </label>
                          </li>
                        ))}
                      </div>
                      </div>
                    )}


                      {activeIndex ==="price" && (
                      <>
                      <div className="grid mt-5">
                        <div className="flex items-center mt-2">
                          <span className="font-medium">Min: ₹{minPrice}</span>
                          <input
                            className="accent-blue-900 mr-2 h-2 w-full appearance-none rounded-full bg-blue-100"
                            value={parseInt(minPrice)}
                            min="1"
                            max="8"
                            step="1"
                            type="range"
                            onChange={handleMinRangeChange}
                          />
                          <span className="font-medium">Max: ₹{maxPrice}</span>
                          <input
                            className="accent-blue-900 ml-2 h-2 w-full appearance-none rounded-full bg-blue-100"
                            value={parseInt(maxPrice)}
                            min="1"
                            max="8"
                            step="1"
                            type="range"
                            onChange={handleMaxRangeChange}
                          />
                        </div>

                        <div className="mt-4 d-flex">
                          <div className="mb-4 mx-2">
                            <label className="block text-gray-700">
                              Min Price:
                            </label>
                            <select
                              value={minPrice}
                              onChange={handleMinPriceChange}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Min Price</option>
                              {minPriceOptions.map((price) => (
                                <option key={price} value={price}>
                                  ₹{price}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mx-2">
                            <label className="block text-gray-700">
                              Max Price:
                            </label>
                            <select
                              value={maxPrice}
                              onChange={handleMaxPriceChange}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <div className="w-auto ml-[-10vw]">
                              <option value="">Max Price</option>
                              {maxPriceOptions.map((price) => (
                                <option key={price} value={price}>
                                  ₹{price}
                                </option>
                                
                              ))}
                              </div>
                            </select>
                          </div>
                        </div>
                        </div>
                      </>
                    )}   

<div className=" fixed top-[75vh] left-[40vw] w-6 grid items-center gap-2 py-4 border-b-2">
                  <button
                      className="text-white bg-red-500 py-1 px-2 rounded mt-0"
                      onClick={toggleSidebar}
                    >
                      Apply
                    </button>
                    </div>
                  </div>
                 </div>
</div>
              </div>
            </div>
          </div>
        </nav>
        {/* on larger screen  */}
        <div className="container-fluid bg-white">
          <div className="row ">
            <div className="col-lg-3 col-md-4 col-sm-6 d-none d-lg-block bg-white shadow-md">
              <div className="d-flex flex-wrap">
                <div className="li_options w-100 position-relative">
                  <div className="fi_space md:p-1 sm:p-1 flex justify-end text-red-600">
                    <button
                      type="button"
                      className="text-end"
                      onClick={handleClearFilters}
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="selected-filters mb-4">
                    {selectedPropertyTypes.length > 0 &&
                      selectedPropertyTypes.map((propertyType, index) => (
                        <div
                          key={index}
                          className="border-2 w-50 border-red-300 text-sm rounded-xl p-0 mb-2 flex justify-between items-center"
                        >
                          <span className="pl-4"> {propertyType}</span>
                          <button
                            onClick={() => removePropertyType(propertyType)}
                            className="mr-2 text-red-600 text-2xl"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    {selectedAreas.length > 0 &&
                      selectedAreas.map((area, index) => (
                        <div
                          key={index}
                          className="border-2 w-1/2 border-red-300 text-sm rounded-xl p-0 mb-2 flex justify-between items-center"
                        >
                          <span className="pl-4"> {area}</span>
                          <button
                            onClick={() => removeArea(area)}
                            className="mr-2 text-red-500 text-2xl"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    {selectedCities.length > 0 &&
                      selectedCities.map((city, index) => (
                        <div
                          key={index}
                          className="border-2 w-1/2 rounded-xl border-red-300 text-sm  p-0 mb-2 flex justify-between items-center"
                        >
                          <span className="pl-4"> {city}</span>
                          <button
                            onClick={() => removeCity(city)}
                            className="mr-2 text-red-500 text-2xl "
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    {(minPrice || maxPrice) && (
                      <div className="border-2 rounded-xl w-1/2 border-red-300 text-sm p-0 mb-2 flex justify-between items-center">
                        <span className="pl-4">
                          {" "}
                          ₹{minPrice} - ₹{maxPrice}
                        </span>
                        <button
                          onClick={removePrice}
                          className="mr-2 text-red-500 text-2xl"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle2}>
                      Property Type
                      <i
                        className={`fa-solid fa-chevron-up pr-2 text-black text-sm`}
                      ></i>
                    </div>

                    <div className="mb-3">
                      {propertyTypes.map((type) => (
                        <li key={type} style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id={type.toLowerCase().replace(" ", "_")}
                            name="property_type"
                            className="filter-choice"
                            value={type}
                            checked={selectedPropertyTypes.includes(type)}
                            onChange={(e) =>
                              handleCheckboxChange(e, setSelectedPropertyTypes)
                            }
                          />
                          <label
                            htmlFor={type.toLowerCase().replace(" ", "_")}
                            className="filter ml-2 text-lg"
                          >
                            {type}
                          </label>
                        </li>
                      ))}
                    </div>
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle3}>
                      Unit Type
                      <i
                        className={`fa-solid fa-chevron-${position3} pr-2 text-black text-sm`}
                      ></i>
                    </div>
                    {drop3 && (
                      <div className="mb-2">
                        {areas.map((area) => (
                          <li key={area} style={{ listStyle: "none" }}>
                            <input
                              type="checkbox"
                              id={area.toLowerCase().replace(" ", "_")}
                              name="area"
                              className="filter-choice"
                              value={area}
                              checked={selectedAreas.includes(area)}
                              onChange={(e) =>
                                handleCheckboxChange(e, setSelectedAreas)
                              }
                            />
                            <label
                              htmlFor={area.toLowerCase().replace(" ", "_")}
                              className="filter ml-2"
                            >
                              {area}
                            </label>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle6}>
                      City
                      <i
                        className={`fa-solid fa-chevron-${position6} pr-2 text-black text-sm`}
                      ></i>
                    </div>
                    {drop6 && (
                      <div className="mb-2">
                        {cities.map((city) => (
                          <li key={city} style={{ listStyle: "none" }}>
                            <input
                              type="checkbox"
                              id={city.toLowerCase().replace(" ", "_")}
                              name="city"
                              className="filter-choice"
                              value={city}
                              checked={selectedCities.includes(city)}
                              onChange={(e) =>
                                handleCheckboxChange(e, setSelectedCities)
                              }
                            />
                            <label
                              htmlFor={city.toLowerCase().replace(" ", "_")}
                              className="filter ml-2"
                            >
                              {city}
                            </label>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <span className="fi_head" onClick={toggle7}>
                      Price Criteria
                      <i
                        className={`fa-solid fa-chevron-${position7} pr-2 text-black text-sm`}
                      ></i>
                    </span>
                    {drop7 && (
                      <>
                        <div className="flex items-center mt-2">
                          <span className="font-medium">Min: ₹{minPrice}</span>
                          <input
                            className="accent-blue-900 mr-2 h-2 w-full appearance-none rounded-full bg-blue-100"
                            value={parseInt(minPrice)}
                            min="1"
                            max="8"
                            step="1"
                            type="range"
                            onChange={handleMinRangeChange}
                          />
                          <span className="font-medium">Max: ₹{maxPrice}</span>
                          <input
                            className="accent-blue-900 ml-2 h-2 w-full appearance-none rounded-full bg-blue-100"
                            value={parseInt(maxPrice)}
                            min="1"
                            max="8"
                            step="1"
                            type="range"
                            onChange={handleMaxRangeChange}
                          />
                        </div>

                        <div className="mt-4 d-flex">
                          <div className="mb-4 mx-2">
                            <label className="block text-gray-700">
                              Min Price:
                            </label>
                            <select
                              value={minPrice}
                              onChange={handleMinPriceChange}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Select Min Price</option>
                              {minPriceOptions.map((price) => (
                                <option key={price} value={price}>
                                  ₹{price}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="mx-2">
                            <label className="block text-gray-700">
                              Max Price:
                            </label>
                            <select
                              value={maxPrice}
                              onChange={handleMaxPriceChange}
                              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              <option value="">Select Max Price</option>
                              {maxPriceOptions.map((price) => (
                                <option key={price} value={price}>
                                  ₹{price}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="li_items xl:px-8 lg:px-6 md:px-4 px-2">
                <div className="li_head_row">
                  <div className="heading relative">
                    <h3 className="title mt-4">Best Rental Properties in Gurugram</h3>

                    <>
                      {isVisible && (
                        <div
                          className="fixed bottom-4 right-4 z-10"
                          onClick={scrollToTop}
                        >
                          <button className="bg-red-600 border-white text-white p-3 flex items-center rounded-full animate-bounce">
                            <i className="fa-solid fa-arrow-up transform rotate-360"></i>
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                </div>

                <section className="flex flex-col items-center bg-white mb-4">
                    {filterData.length === 0 ? (
                      <p><CustomSkeleton /></p>
                    ) :  
                        (
                    <div className="grid max-w-md  grid-cols-1 px-2 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-3 lg:grid-cols-3 sm:gap-4 lg:gap-4 w-full mb-4">
                      {filterData.map((properties, propertiesIndex) => (
                              <div key={propertiesIndex} className="shadow-lg rounded-lg">
                                <Link
                                  to={
                                    properties.propertyName &&
                                      properties._id
                                      ? `/rental-properties/${properties.propertyName.replace(
                                        /\s+/g,
                                        "-"
                                      )}/${properties._id}/`
                                      : "#"
                                  }
                                  target="_top"
                                >
                                  <div className="relative p-3 h-[500px] flex flex-col justify-between">
                                    <div>
                                      {properties.frontImage &&
                                        properties.frontImage.url ? (
                                        <img
                                          src={properties.frontImage.url}
                                          alt="frontImage"
                                          className="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                        />
                                      ) : (
                                        <span>Image not available</span>
                                      )}
                                    </div>
                                    <div className="pt-2 p-1 flex-1 flex flex-col justify-between">
                                      <div className="pb-2">
                                  <span className="text-sm font-semibold truncate hover:overflow-hidden text-ellipsis whitespace-nowrap hover:text-red-600 duration-500 ease-in-out">
                                    {properties.propertyName.length > 35
                                      ? `${properties.propertyName.slice(0, 35)}...`
                                      : properties.propertyName}
                                  </span>

                                        <br />
                                        <span className="text-sm text-gray-400 hover:text-red-600  duration-500 ease-in-out">
                                          {properties.city}, {properties.state}
                                        </span>
                                      </div>
                                      <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                                        <li className="mr-4 flex items-center text-left">
                                          <li className="text-left">
                                            <p className="m-0 text-sm font-medium ">
                                              <PropertyIcon />{" "}{properties.propertyType}
                                            </p>
                                            <span className="text-[10px] text-gray-600 block truncate text-sm hover:overflow-visible hover:white-space-normal hover:bg-white">
                                              {/* <LocationRedIcon />{" "}{item.projectAddress} */}
                                            </span>

                                          </li>
                                        </li>
                                      </ul>
                                      <ul className="m-0  flex list-none items-center justify-between px-0  pb-0">
                                        <li className="text-left">
                                          <span className="text-sm font-extrabold text-red-600">
                                            <span style={{display: 'flex', alignItems: 'center', color: 'red', fontWeight: 'bold'}}><RupeeIcon style={{marginRight: 4}} />{properties?.price}</span>
                                          </span>
                                        </li>
                                        <li className="text-left">
                                          <button
                                            type="button"
                                            className="bg-[#D32F2F] hover:bg-red-800 text-white px-7 py-2 rounded-full text-base font-bold shadow-lg transition-all duration-300 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2"
                                          >
                                            View Details
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            
                          ))}
                          </div>
                        )
                      }
                </section>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};
export default RentPropViewCard;
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
