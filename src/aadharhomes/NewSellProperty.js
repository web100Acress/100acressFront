import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { State, City } from "country-state-city";

const stateCodeMapping = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chandigarh": "CH",
  "Chhattisgarh": "CT",
  "Delhi": "DL",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jammu and Kashmir": "JK",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Ladakh": "LA",
  "Lakshadweep": "LD",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OR",
  "Puducherry": "PY",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TG",
  "Tripura": "TR",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UT",
  "West Bengal": "WB"
};


const NewSellProperty = () => {
  const storedSellerId = localStorage.getItem("mySellerId");
  const [showSteps, setShowSteps] = useState(false);
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
      "Residential Land",
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

  const [selectedState, setSelectedState] = useState("Haryana");
  const [selectedCity, setSelectedCity] = useState("City");

  const countryCode = "IN";
  const states = State.getStatesOfCountry(countryCode);
  const getStateCode = (selectedState) => {
    if (typeof selectedState !== 'string') {
      throw new Error(`Selected state is not a valid string: ${selectedState}`);
    }
  
    const formattedStateName = selectedState
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const stateCode = stateCodeMapping[formattedStateName];
  
    if (stateCode) {
      return stateCode;
    } else {
      throw new Error(`State code not found for state: ${selectedState}`);
    }
  };
  
  const stateCode = getStateCode(selectedState);
  const cities = selectedState
    ? City.getCitiesOfState(countryCode, stateCode)
    : [];

  const handleChangeStateValue = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSellProperty(prevState => ({
      ...prevState,
      state: stateName, 
    }));
  };

  const handleChangeCityValue = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSellProperty(prevState => ({
      ...prevState,
      city: cityName,
    }));
  };

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

  // const resetData1 = () =>{
  //   setSelectedState({
  //     state:"",
  //   })

  //   setSelectedCity({
  //     city:"",
  //   })
  // }

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
  //     formDataAPI.append(`otherImage_${i}`, fileData.otherImage[i]);
  //   }

  //   formDataAPI.append("frontImage", fileData.frontImage);

  //   try {
  //     const response = await axios.post(apiEndpoint, formDataAPI);
  //     alert("Submit Successfully, Under Review");
  //     resetData();
  //     resetImageData();
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };
  const [isLoading, setIsLoading] = useState(false);

  const submitSellPropertyDetails = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

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
      setIsLoading(true);
      const response = await axios.post(apiEndpoint, formDataAPI);
      alert("Submit Successfully, Under Review");
      resetData();
      resetImageData();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
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

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <section className=" py-12 text-gray-800 ">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div className="max-w-xl px-4 lg:pr-24 lg:pt-20">
            <h3 className="lg:text-5xl md:text-3xl  font-semibold">
              Post your property
            </h3>
            <h3 className=" mb-3 lg:text-5xl md:text-3xl font-semibold text-red-600 ">
              get the best prices
            </h3>
            <p className="mb-3 text-lg text-gray-600 text-justify lg:w-3/4 hidden md:block">
              100acress is the best place to sell your property, we are
              dedicated to providing advisory and mediation services for all
              your needs. you can expect us every time. All that is for you!
            </p>

            <div className="flex flex-col space-x-2 sm:flex-row space-y-4 sm:space-y-0 ml-[-10px] lg:pt-12">
              <button
                className="rounded-full text-white text-md sm:text-lg md:text-md font-normal px-3 sm:px-6 py-2 sm:py-4 bg-red-600 "
                onClick={() => setShowSteps(!showSteps)}
              >
                How It Works
              </button>
            </div>

            {showSteps && (
              <div className="fixed inset-0 hidden sm:block md:block lg:flex items-center  justify-center bg-gray-800 bg-opacity-75 ">
                <div className="shadow-2xl rounded-xl px-4 py-4 bg-white relative w-1/2 h-70">
                  <button
                    className="text-red-400 text-2xl absolute right-6 top-5 cursor-pointer"
                    onClick={() => setShowSteps(false)}
                  >
                    ✖
                  </button>
                  <h5 className="text-red-400">
                    Steps given Below to post your property Free
                  </h5>
                  <span className="mt-2">Step 1:</span>
                  <span className="ml-4 text-red-400">
                    Post Your Property for Free
                  </span>
                  <p className="text-justify">
                    Please first check the options if you are a selling or
                    renting owner, then select the appropriate choice.
                  </p>

                  <span className="mt-2">Step 2:</span>
                  <span className="ml-4 text-red-400">
                    Select Property Type
                  </span>
                  <p className="text-justify">
                    Please choose between Commercial or Residential property.
                  </p>

                  <span>Step 3:</span>
                  <span className="ml-4 text-red-400">
                    Enter Details of Your Property
                  </span>
                  <p className="text-justify">
                    Afterward, input all details such as property name, address,
                    city, state, price, area, description, landmark, amenities,
                    built year and furnishing. Get access to buyer/tenant
                    contact details and connect easily.
                  </p>

                  <span>Step 4:</span>
                  <span className="ml-4 text-red-400">
                    Upload Images of Your Property
                  </span>
                  <p className="text-justify">
                    Please upload one image for the front view and three to four
                    additional images.
                  </p>

                  <span>Step 5:</span>
                  <span className="ml-4 text-red-400">
                    Submit Your Property Information
                  </span>
                  <p className="text-justify">
                    Submit the form after filling up the fields.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 mb-8 max-w-3/4    lg:mt-0 shadow-lg rounded-lg py-2   px-4">
            <RadioGroup
              onChange={(value) => handleOptionClick(value)}
              value={sellProperty.propertyLooking}
              className="m-2"
              defaultValue="2"
            >
              <p className="text-2xl  text-black">
                You're looking to<span>....</span>
              </p>

              <Stack spacing={5} direction="row" color="black">
                <Radio colorScheme="blue" value="Sell" size="lg">
                  Sell
                </Radio>
                <Radio colorScheme="blue" value="rent" size="lg">
                  Rent/Lease
                </Radio>
              </Stack>
            </RadioGroup>

            <div className="p-1 sm:p-8">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <select
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-black"
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
                    className="mt-2 h-10 w-full rounded-md bg-white border px-3 outline-none text-black"
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
                    value={selectedState}
                    onChange={handleChangeStateValue}
                    name="state"
                    className="mt-2 h-10 w-full rounded-md text-black bg-white border px-3 outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  {selectedState && (
                    <div>
                      <select
                        value={selectedCity}
                        name="city"
                        onChange={handleChangeCityValue}
                        className="mt-2 h-10 w-full text-black rounded-md bg-white border px-3 outline-none"
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
                  className="mt-3 h-10 w-full placeholder:text-black  rounded-md bg-white  border px-3 outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={sellProperty.address}
                  onChange={handleChangeValue}
                  className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
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
                    className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Area"
                    name="area"
                    value={sellProperty.area}
                    onChange={handleChangeValue}
                    className="mt-3 h-10 w-1/2 placeholder:text-black rounded-md bg-white border px-3 outline-none"
                  />

                  <select
                    name="areaUnit"
                    value={sellProperty.areaUnit}
                    onChange={handleChangeValue}
                    className="mt-3 ml-2 h-10 w-1/2 rounded-md bg-white border px-2 outline-none"
                  >
                    <option value="sqft">Sqft</option>
                    <option value="sqrd">Sqyd</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Property Description"
                  name="description"
                  value={sellProperty.description}
                  onChange={handleChangeValue}
                  className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
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
                    className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
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
                    className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
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
                    className="mt-3 h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
                  />
                </div>
                <div>
                  <select
                    className="mt-3 h-10 w-full placeholder:text-black rounded-md text-black border px-3 outline-none"
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

              <div className="grid gap-3 md:grid-cols-2 text-black pt-1">
                <div>
                  <label htmlFor="frontImage" className=" text-black mx-3 ">
                    Upload Front Images:
                  </label>
                  <input
                    type="file"
                    name="frontImage"
                    onChange={(e) => handleFileChange(e, "frontImage")}
                    accept="image/*"
                    className="mt-1 h-10 w-full rounded-md bg-white border text-black px-3 outline-none pt-1"
                  />
                </div>

                <div>
                  <label htmlFor="otherImage" className=" text-black mx-3 ">
                    Upload Other Images:
                  </label>
                  <input
                    type="file"
                    multiple
                    name="otherImage"
                    onChange={handleOtherImageChange}
                    accept="image/*"
                    id="otherImage"
                    className="mt-1 h-10 w-full rounded-md bg-white border text-black px-3 outline-none pt-1 mb-3"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  className="rounded-lg text-white px-4 text-md sm:text-lg md:text-md  font-normal  sm:px-6 py-1 sm:py-4 bg-red-600 hover:bg-red-700"
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
