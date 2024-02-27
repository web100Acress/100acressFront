import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { RadioGroup, Radio } from "@chakra-ui/react";
import { event } from "jquery";
const { Country, State, City } = require("country-state-city");
const NewSellProperty = () => {
  const storedSellerId = localStorage.getItem("mySellerId");
  const sellerId = JSON.parse(storedSellerId);

  const propertyType = ["Select Property Type", "Commercial", "Residential"];

  const subTypes = {
    Commercial: [
      "Office",
      "Retail",
      "Industrial",
      "Plot / Land",
      "Storage",
      "Hospitality",
      "Other",
    ],
    Residential: [
      "Flat/Apartment",
      "Independent House / Villa",
      "Independent / Builder Floor",
      "1 RK/ Studio Apartment",
      "Serviced Apartment",
      "Farmhouse",
      "Other",
    ],
    // Add more subtypes as needed
  };

  const [sellProperty, setSellProperty] = useState({
    propertyType: "",
    propertyName: "",
    address: "",
    city: "DefaultCityValue",
    state: "DefaultStateValue",
    price: "",
    area: "",
    description: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    selectoption: "Select Property Type",
    subType: "",
  });

  

  const resetData = () => {
    setSellProperty({
      propertyType: "",
      propertyName: "",
      address: "",
      city: "",
      state: "",
      price: "",
      area: "",
      description: "",
      landMark: "",
      amenities: [],
      builtYear: "",
      furnishing: "",
      type: "",
      availableDate: "",
      selectoption: "Select Property Type",
      subType: "",
    });
  };

  const resetImageData = () => {
    setFileData({
      frontImage: "",
      otherImage: [],
    });
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    if (name === "selectoption") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        propertyType: "",
        subType: "",
      });
    } else if (name === "propertyType") {
      setSellProperty({
        ...sellProperty,
        [name]: value,
        subType: "", // Reset subType when propertyType changes
      });
    } else {
      setSellProperty({
        ...sellProperty,
        [name]: value,
      });
    }
  };

  const [fileData, setFileData] = useState({
    frontImage: "",
    otherImage: [],
  });

  const otherImageLength = fileData.otherImage.length;

  // const submitSellPropertyDetails = async (e) => {
  //   e.preventDefault();
  //   const apiEndpoint = `https://api.100acress.com/postPerson/propertyInsert/${sellerId}`;

  //   const formDataAPI = new FormData();

  //   for (const key in sellProperty) {
  //     formDataAPI.append(key, sellProperty[key]);
  //   }
  //   for (let i = 0; i < otherImageLength; i++) {
  //     formDataAPI.append("otherImage", fileData.otherImage[i]);
  //   }

  //   formDataAPI.append("frontImage", fileData.frontImage);

  //   try {
  //     const response = await axios.post(apiEndpoint, formDataAPI);
  //     alert("Property posted")
  //     setSellProperty({
  //       propertyType: null,
  //       propertyName: null,
  //       address: null,
  //       city: null,
  //       state: null,
  //       price: null,
  //       area: null,
  //       description: null,
  //       landmark: null,
  //       amenities: null,
  //       builtyear: null,
  //       furnishing: null,
  //       type: null,
  //       availabledate: null,
  //       selectoption: null,
  //       subType: null,
  //     });

  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };
  console.log(sellerId,"sellerId")
  const submitSellPropertyDetails = async (e) => {
    e.preventDefault();
    const apiEndpoint = `https://api.100acress.com/postPerson/propertyInsert/${sellerId}`;

    const formDataAPI = new FormData();

    for (const key in sellProperty) {
      formDataAPI.append(key, sellProperty[key]);
    }

    for (let i = 0; i < otherImageLength; i++) {
      formDataAPI.append(`otherImage_${i}`, fileData.otherImage[i]);
    }

    formDataAPI.append("frontImage", fileData.frontImage);
    
    try {
      const response = await axios.post(apiEndpoint, formDataAPI);
      
      alert("Submit Successfully, Under Review");
      resetData();
      resetImageData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChangeValueAmenities = (event) => {
    if (event.target.name === "amenities") {
      const amenitiesArray = event.target.value.split(",");
      setSellProperty((prevState) => ({
        ...prevState,
        amenities: amenitiesArray,
      }));
    } else {
      setSellProperty((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleOptionClick = (option) => {
    setSellProperty({
      ...sellProperty,
      propertyLooking: option,
    });
  };

  const handleFileChange = (e, key) => {
    const newFileData = { ...fileData };
    newFileData[key] = e.target.files[0];
    setFileData(newFileData);
  };

  const handleOtherImageChange = (e) => {
    var files = e.target.files;
    if (files) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        updatedOtherImage.push(files[i]);
      }
      setFileData({
        ...fileData,
        otherImage: updatedOtherImage,
      });
    } else {
      console.error("No files selected");
    }
  };

  const handleProjectfurnishing = (event) => {
    setSellProperty({ ...sellProperty, furnishing: event.target.value });
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Get states of a country (e.g., India)
  const countryCode = "IN";
  const states = State.getStatesOfCountry(countryCode);

  // Get cities of a state (e.g., Rajasthan)
  const stateCode = "RA";
  const cities = selectedState
    ? City.getCitiesOfState(countryCode, selectedState)
    : [];

  const handleChangeStateValue = (event) => {
    setSelectedState(event.target.value);
    setSellProperty({ ...sellProperty, state: event.target.value });
  };

  const handleChangeCityValue = (event) => {
    setSellProperty({ ...sellProperty, city: event.target.value });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <section className=" py-12 text-gray-800 ">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div className="max-w-xl px-4 lg:pr-24 lg:pt-20">
            <h3 className="lg:text-5xl md:text-3xl  font-semibold">
              Post your property
            </h3>
            <h3 className=" mb-3 lg:text-5xl md:text-3xl font-semibold text-red-400 ">
              get the best prices
            </h3>
            <p className="mb-3 text-lg text-gray-600 text-justify lg:w-3/4 hidden md:block">
              100acress is the best place to sell your property, we are
              dedicated to providing advisory and mediation services for all
              your needs. you can expect us every time. All that is for you!
            </p>
            <div className="flex flex-col space-x-2 sm:flex-row space-y-4 sm:space-y-0 ml-[-10px] lg:pt-12">
              <button className="rounded-full text-white text-md sm:text-lg md:text-md font-normal px-3 sm:px-6 py-2 sm:py-4 bg-red-400 hover:bg-red-500">
                Get started
              </button>
              <button className="rounded-full text-md sm:text-lg md:text-md font-normal text-white px-3 sm:px-6 py-2 sm:py-4 bg-gray-400 hover:bg-gray-500">
                How It Works
              </button>
            </div>
          </div>

          <div className="mt-8 mb-8 max-w-3/4  shadow-2xl sm:rounded-lg sm:shadow-lg lg:mt-0  bg-red-400 px-1">
            {/* <div className="m-2">
              <p className="text-2xl mx-2 text-white">
                You're looking to<span>....</span>
              </p>

              <p>
                <span
                  className={`mx-2 px-3 py-1 rounded-2xl text-white border-2 hover:bg-red-600 hover:text-white ${
                    sellProperty.propertyLooking === "Sell"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleOptionClick("Sell")}
                >
                  Sell
                </span>{" "}
                <span
                  className={`px-3 text-white py-1 rounded-2xl border-2 hover:bg-red-600 hover:text-white ${
                    sellProperty.propertyLooking === "rent"
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                  onClick={() => handleOptionClick("rent")}
                >
                  Rent/Lease
                </span>{" "}
              </p>
            </div> */}
            <RadioGroup
              onChange={(value) => handleOptionClick(value)}
              value={sellProperty.propertyLooking}
              className="m-2"
            >
              <p className="text-2xl mx-2 text-white">
                You're looking to<span>....</span>
              </p>

              <p>
                <Radio
                  value="Sell"
                  className={`mx-2 bg-white `}
                  colorScheme="blue"
                  size="lg"
                  text="white"
                  spacing={-1}
                >
                  Sell
                </Radio>{" "}
                <Radio
                  value="rent"
                  className={`bg-white `}
                  colorScheme="blue"
                  size="lg"
                  spacing={1}
                >
                  Rent/Lease
                </Radio>
              </p>
            </RadioGroup>

            <div className="p-1 sm:p-8">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <select
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-gray-500"
                    name="selectoption"
                    value={sellProperty.selectoption}
                    onChange={handleChangeValue}
                  >
                    {propertyType.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {sellProperty.selectoption !== "Select Property Type" && (
                  <select
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-gray-500"
                    name="propertyType"
                    value={sellProperty.propertyType}
                    onChange={handleChangeValue}
                  >
                    {subTypes[sellProperty.selectoption].map(
                      (subType, index) => (
                        <option key={index} value={subType}>
                          {subType}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <select
                    value={sellProperty.state}
                    onChange={handleChangeStateValue}
                    className="mt-2 h-10 w-full rounded-md text-gray-500 bg-white border px-3 outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  {selectedState && (
                    <div>
                      <select
                        value={sellProperty.city}
                        onChange={handleChangeCityValue}
                        className="mt-2 h-10 w-full text-gray-500 rounded-md bg-white border px-3 outline-none"
                      >
                        <option value="Select City">Select City</option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Property Name"
                  name="propertyName"
                  value={sellProperty.propertyName}
                  onChange={handleChangeValue}
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={sellProperty.address}
                  onChange={handleChangeValue}
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={sellProperty.price}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Area"
                    name="area"
                    value={sellProperty.area}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={sellProperty.description}
                  onChange={handleChangeValue}
                  className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Landmark"
                    name="landMark"
                    value={sellProperty.landMark}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Amenities"
                    multiple
                    name="amenities"
                    value={sellProperty.amenities.join(",")}
                    onChange={handleChangeValueAmenities}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Built year"
                    name="builtYear"
                    value={sellProperty.builtYear}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <select
                    className="mt-2 h-10 w-full rounded-md text-gray-500 border px-3 outline-none"
                    value={sellProperty.furnishing}
                    onChange={handleProjectfurnishing}
                  >
                    <option value="">Furnish</option>
                    <option value="Semifurnishing">Semi furnish</option>
                    <option value="Fullyfurnishing">Fully furnish</option>
                    <option value="UnFurnishing">Un furnish</option>
                  </select>
                </div>
              </div>

              {/* <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={sellProperty.type}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Available date"
                    name="availableDate"
                    value={sellProperty.availableDate}
                    onChange={handleChangeValue}
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none"
                  />
                </div>
              </div> */}

              <div className="grid gap-3 md:grid-cols-2 text-gray-500">
                <div>
                  <label htmlFor="frontImage" className=" text-white mx-3 ">
                    Upload Front Images:
                  </label>
                  <input
                    type="file"
                    name="frontImage"
                    onChange={(e) => handleFileChange(e, "frontImage")}
                    accept="image/*"
                    className="mt-2 h-10 w-full rounded-md bg-white border text-gray-500 px-3 outline-none pt-1"
                  />
                </div>

                <div>
                  <label htmlFor="otherImage" className=" text-white mx-3 ">
                    Upload Other Images:
                  </label>
                  <input
                    type="file"
                    multiple
                    name="otherImage"
                    onChange={handleOtherImageChange}
                    accept="image/*"
                    id="otherImage"
                    className="mt-2 h-10 w-full rounded-md bg-white border text-gray-500 px-3 outline-none pt-1 mb-3"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="rounded-lg text-white text-md sm:text-lg md:text-md border-2 font-normal px-2 sm:px-6 py-1 sm:py-4 bg-red-400 hover:bg-red-500"
                  onClick={submitSellPropertyDetails}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewSellProperty;
