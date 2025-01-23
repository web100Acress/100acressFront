import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minRangeValue, setMinRangeValue] = useState("1Cr");
  const [maxRangeValue, setMaxRangeValue] = useState("8Cr");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    "Independent Floor",
    "Apartment",
    "Builder Floor",
    "Plot",
    "Residential",
    "Studio",
    "Villas",
  ];
  const areas = ["4 BHK"];
  const cities = ["Gurugram"];

  const handleCheckboxChange = (e, setSelectedState) => {
    const { value, checked } = e.target;
    setSelectedState((prevState) =>
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

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/property/viewAll");
      setBuyData(res.data.collectdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                    Area
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
                <button
                  className="text-white bg-black py-2 rounded-md px-4 md:hidden lg:block"
                  onClick={toggleSidebar}
                >
                  Clear Filters
                </button>
                <div
                  className={`fixed top-0 left-0 w-64 h-full bg-white text-black z-10  p-4 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out`}
                >
                  <div className="mt-4">
                    <button
                      className="text-white bg-red-500 py-1 px-2 rounded mt-4 fixed top-0 right-6"
                      onClick={toggleSidebar}
                    >
                      ✖
                    </button>
                  </div>

                  <div className="fi_acc">
                    {" "}
                    <div className="fi_head" onClick={toggle}>
                      Property Type
                      <i
                        className={`fa-solid fa-chevron-${position} pr-2 text-black text-sm`}
                      ></i>
                    </div>
                    {drop && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                        <li className="" style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="independent_house"
                            name="property_type"
                            className="filter-choice"
                            value="independent_house"
                          />
                          <label
                            for="independent_house"
                            className="filter ml-2 text-lg"
                          >
                            {" "}
                            Independent Floor
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="aparment_house"
                            name="property_type"
                            className="filter-choice"
                            value="aparment_house"
                          />
                          <label for="aparment_house" className="filter ml-2">
                            {" "}
                            Apartment
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="builder_floor"
                            name="property_type"
                            className="filter-choice"
                            value="builder_floor"
                          />
                          <label for="builder_floor" className="filter ml-2">
                            {" "}
                            Builder Floor
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" plot_house"
                            name="property_type"
                            className="filter-choice"
                            value=" plot_house"
                          />
                          <label for=" plot_house" className="filter ml-2">
                            {" "}
                            Plot
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" residencial_house"
                            name="property_type"
                            className="filter-choice"
                            value=" residencial_house"
                          />
                          <label
                            for=" residencial_house"
                            className="filter ml-2"
                          >
                            {" "}
                            Residential
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" studio_house"
                            name="property_type"
                            className="filter-choice"
                            value=" studio_house"
                          />
                          <label for=" studio_house" className="filter ml-2">
                            {" "}
                            Studio
                          </label>
                        </li>
                        <li className="mb-3" style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" villas_house"
                            name="property_type"
                            className="filter-choice"
                            value=" villas_house"
                          />
                          <label for=" villas_house" className="filter ml-2">
                            {" "}
                            Villas
                          </label>
                        </li>
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle4}>
                      Area
                      <i
                        className={`fa-solid fa-chevron-${position4} pr-2 text-sm`}
                      ></i>
                    </div>
                    {drop4 && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                        <li className="mb-3" style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            4 BHK
                          </label>
                        </li>
                      </div>
                    )}
                  </div>
                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle1}>
                      City
                      <i
                        className={`fa-solid fa-chevron-${position1} pr-2 text-sm`}
                      ></i>
                    </div>
                    {drop1 && (
                      <div
                        className=""
                        style={{ borderBottom: "1px solid #d9d9d9" }}
                      >
                        <li className="mb-3" style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            Gurugram
                          </label>
                        </li>
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <span className="fi_head" onClick={toggle5}>
                      Price Criteria
                      <i
                        className={`fa-solid fa-chevron-${position5} pr-2 text-black text-sm`}
                      ></i>
                    </span>
                    {drop5 && (
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
                      Area
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
                    <h3 className="title mt-4">Projects in Gurugram</h3>

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
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 sm:gap-12 lg:grid-cols-1 xl:grid-cols-2 xl:gap-16">
                    {buyData.length > 0 ? (
                      buyData.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.postProperty && item.postProperty.length > 0
                            ? item.postProperty.map(
                                (nestedItem, nestedIndex) => (
                                  <div key={nestedIndex} className="shadow-lg">
                                    <Link
                                      to={
                                        nestedItem.propertyName &&
                                        nestedItem._id
                                          ? `/rental-properties/${nestedItem.propertyName.replace(
                                              /\s+/g,
                                              "-"
                                            )}/${nestedItem._id}/`
                                          : "#"
                                      }
                                      target="_top"
                                    >
                                      <div className="row rounded-lg">
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                          {nestedItem.frontImage &&
                                          nestedItem.frontImage.url ? (
                                            <img
                                              src={nestedItem.frontImage.url}
                                              alt="frontImage"
                                              className="object-fit h-48 w-full rounded-l-lg"
                                            />
                                          ) : (
                                            <span>Image not available</span>
                                          )}
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                          <div className="p-4 h-full flex flex-col justify-between">
                                            <div>
                                              <p className="text-md mb-1 ">
                                                {nestedItem.propertyName}
                                              </p>
                                              <p className="text-md mb-2 text-gray-600">
                                                Location: {nestedItem.city},
                                                {nestedItem.state}
                                              </p>
                                              <p className="text-md mb-0">
                                                ₹ {nestedItem.price}
                                              </p>
                                            </div>
                                            <div className="flex justify-end mt-auto">
                                              <button
                                                type="button"
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-4 py-2 text-center m-0"
                                              >
                                                View Details
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                )
                              )
                            : null}
                        </React.Fragment>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
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
