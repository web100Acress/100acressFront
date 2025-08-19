import React, { useState, useEffect, useRef } from "react";
import { Steps, Spin, Button, message, Modal } from "antd";
import "antd/dist/reset.css";
const { Step } = Steps;
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { State, City } from "country-state-city";
import { Helmet } from "react-helmet";


const steps = [
  { id: "1", title: "Basic Info" },
  { id: "2", title: "Location" },
  { id: "3", title: "Property Details" },
  { id: "4", title: "Gallery Section" },
];

const NewSellProperty = () => {
  const agentData = localStorage.getItem("agentData");
  const [modal, contextHolder] = Modal.useModal();
  const [current, setCurrent] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [contentAnimKey, setContentAnimKey] = useState(0); // triggers step content animation
  const [responseMessage, setResponeMessage] = useState("");
  const [contentVisible, setContentVisible] = useState(false);
  const [modalWidth, setModalWidth] = useState(600);
  const stepsSectionRef = useRef(null);
  const parsedAgentData = JSON.parse(agentData);
  const sellerId = parsedAgentData._id;
  const propertyType = ["Commercial", "Residential"];

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
  };

  const [sellProperty, setSellProperty] = useState({
    propertyType: "",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    price: "",
    priceunits: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    selectoption: "",
    subType: "",
    propertyLooking: "Sell",
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("City");

  const countryCode = "IN";
  const states = State.getStatesOfCountry(countryCode);

  const getStateCode = (selectedStateName) => {
    const stateObj = State.getStatesOfCountry(countryCode).find(
      (state) => state.name.toLowerCase() === selectedStateName.toLowerCase()
    );
    return stateObj?.isoCode || "";
  };

  const stateCode = getStateCode(selectedState);
  const cities = selectedState
    ? City.getCitiesOfState(countryCode, stateCode)
    : [];

  const handleChangeStateValue = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSellProperty((prevState) => ({
      ...prevState,
      state: stateName,
    }));
  };

  const handleChangeCityValue = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSellProperty((prevState) => ({
      ...prevState,
      city: cityName,
    }));
  };

  const countDown = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
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
      descripation: "",
      landMark: "",
      amenities: [],
      builtYear: "",
      furnishing: "",
      type: "",
      availableDate: "",
      selectoption: "Select Property Type",
      subType: "",
      propertyLooking: "Sell",
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
    if ((name === "price" || name === "area") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }
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
        subType: "",
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
  const [isLoading, setIsLoading] = useState(false);

  const submitSellPropertyDetails = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateStep(current)) {
      message.error("Please fill all required fields before proceeding.");
      return;
    }

    const apiEndpoint = `/postPerson/propertyInsert/${sellerId}`;
    const formDataAPI = new FormData();

    for (const key in sellProperty) {
      formDataAPI.append(key, sellProperty[key]);
    }

    for (let i = 0; i < otherImageLength; i++) {
      formDataAPI.append("otherImage", fileData.otherImage[i]);
    }

    formDataAPI.append("frontImage", fileData.frontImage);

    const modalInstance = Modal.confirm({
      title: "Submitting Your Property",
      content: "Hang tight! We’re just sending your details...",
      closable: false,
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { style: { display: 'none' } },
    });

    try {
      setIsLoading(true);
      const response = await axios.post(apiEndpoint, formDataAPI);
      if (response.status === 200) {
        modalInstance.destroy();
        message.success("Submitted Successfully, Under Review");
        resetData();
        resetImageData();
        setCurrent(0);
      } else {
        modalInstance.destroy();
        message.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      modalInstance.destroy();
      message.error("There was an error submitting the form. Please try again.");
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

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return (
          sellProperty.propertyLooking !== "" &&
          sellProperty.selectoption !== "" &&
          sellProperty.propertyType !== ""
        );

      case 1:
        return (
          selectedState !== "" &&
          selectedCity !== "" &&
          sellProperty.propertyName.trim() !== "" &&
          sellProperty.address.trim() !== ""
        );

      case 2:
      const isCommercial = sellProperty.selectoption === "Commercial";
      return (
        (isCommercial || (sellProperty.bedrooms !== "" && sellProperty.bathrooms !== "")) &&
        sellProperty.price.trim() !== "" &&
        sellProperty.priceunits !== "" &&
        sellProperty.area.trim() !== "" &&
        sellProperty.areaUnit !== "" &&
        sellProperty.furnishing !== "" &&
        sellProperty.builtYear.trim() !== "" &&
        sellProperty.landMark.trim() !== "" &&
        sellProperty.descripation.trim() !== ""
      );

      case 3:
        return (
          fileData.frontImage !== null &&
          fileData.otherImage.length > 0
        );

      default:
        return true;
    }
  };

  const next = () => {
    if (validateStep(current)) {
      setCurrent(current + 1);
      setContentAnimKey((k) => k + 1);
    } else {
      message.error("Please fill all required fields before proceeding.");
    }
  };
  const prev = () => {
    setCurrent(current - 1);
    setContentAnimKey((k) => k + 1);
  };

  // Animate step content mount
  useEffect(() => {
    setContentVisible(false);
    const id = requestAnimationFrame(() => setContentVisible(true));
    return () => cancelAnimationFrame(id);
  }, [contentAnimKey, current]);

  // Responsive modal width
  useEffect(() => {
    const updateWidth = () => setModalWidth(Math.min(600, window.innerWidth - 32));
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="text-2xl mb-0">Welcome back {parsedAgentData.name}, </p>
            <p className="text-xl text-gray-400">List your Property</p>
            <p className="text-xl text-black">I am looking to:</p>
            <button
              className={`mr-1 px-4 py-2 border rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${sellProperty.propertyLooking === "Sell" ? "bg-red-600 text-white shadow-md" : "bg-white text-black hover:bg-red-50"}`}
              onClick={() => handleOptionClick("Sell")}
            >
              Sell
            </button>
            <button
              className={`ml-1 px-4 py-2 border rounded-3xl cursor-pointer transition-transform duration-200 hover:scale-[1.03] ${sellProperty.propertyLooking === "rent" ? "bg-red-600 text-white shadow-md" : "bg-white text-black hover:bg-red-50"}`}
              onClick={() => handleOptionClick("rent")}
            >
              Rent/Lease
            </button>
            <div className="mt-4">

              <p>What kind of property do you have ?</p>
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className={`h-10 w-full rounded-md bg-white border px-3 outline-none text-black`}
                  name="selectoption"
                  value={sellProperty?.selectoption}
                  onChange={handleChangeValue}
                  required
                >
                  <option className="hidden" value="" >Select Property Type</option>
                  {propertyType.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>

                {sellProperty.selectoption !== "" && (
                  <select
                    className={`h-10 w-full rounded-md bg-white border px-3 outline-none text-black`}
                    name="propertyType"
                    value={sellProperty.propertyType}
                    onChange={handleChangeValue}
                    required
                  >
                    <option className="hidden" value="">Property Sub-type</option>
                    {subTypes[sellProperty?.selectoption]?.map((subType, index) => (
                      <option key={index} value={subType}>{subType}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

          </div>
        );

      case 1:
        return (
          <div>
            <p className="text-2xl">Where is you property Located ? </p>
            <p className="text-gray-400">Right information brings right buyers</p>
            <div className="grid gap-3 md:grid-cols-2 mt-4">
              <select
                value={selectedState}
                onChange={handleChangeStateValue}
                name="state"
                className="h-10 w-full rounded-md text-black bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>{state.name}</option>
                ))}
              </select>

              {selectedState && (
                <select
                  value={selectedCity}
                  name="city"
                  onChange={handleChangeCityValue}
                  className="h-10 w-full text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                >
                  <option value="Select City">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                  ))}
                </select>
              )}
            </div>
            <input
              type="text"
              placeholder="Property Name"
              name="propertyName"
              value={sellProperty.propertyName}
              onChange={handleChangeValue}
              className="h-10 w-full mt-4 placeholder:text-black rounded-md bg-white border px-3 outline-none"
            />

            <input
              type="text"
              placeholder="Address"
              name="address"
              value={sellProperty.address}
              onChange={handleChangeValue}
              className="h-20 w-full mt-4  placeholder:top-0 placeholder:text-black rounded-md bg-white border px-3 outline-none"
            />
          </div>

        );

      case 2:
        return (
          <div>
            <p className="text-2xl">Tell us about your property </p>
            <p className="text-gray-400">The More Accurate the Info, the Better the Buyer.</p>

            <div className="grid gap-3 md:grid-cols-2 mt-4">


               {sellProperty.selectoption !== "Commercial" && (
          <>
            <select
              name="bedrooms"
              value={sellProperty.bedrooms}
              onChange={handleChangeValue}
              className=" h-10 rounded-md bg-white border px-2 outline-none"
            >
              <option className="hidden" value="">No of Bedrooms</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>

            </select>
            <select
              name="bathrooms"
              value={sellProperty.bathrooms}
              onChange={handleChangeValue}
              className="h-10 rounded-md bg-white border px-2 outline-none"
            >
              <option className="hidden" value="">No of Bathrooms</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </>
        )}
              
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Area"
                  name="area"
                  value={sellProperty.area}
                  onChange={handleChangeValue}
                  className="h-10 w-1/2 placeholder:text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                />
                <select
                  name="areaUnit"
                  value={sellProperty.areaUnit}
                  onChange={handleChangeValue}
                  className="ml-2 h-10 w-1/2 rounded-md bg-white border px-2 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                >
                  <option className="hidden" value="">Units</option>
                  <option value="sqft">Sqft</option>
                  <option value="sqrd">Sqyd</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={sellProperty.price}
                  onChange={handleChangeValue}
                  className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                />
                <select
                  name="priceunits"
                  value={sellProperty.priceunits}
                  onChange={handleChangeValue}
                  className="h-10 ml-2 rounded-md bg-white border px-2 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                >
                  <option className="hidden" value="">Units</option>
                  <option value="lakhs">Lakhs</option>
                  <option value="crores">Crores</option>
                </select>
              </div>
              <select
                className="h-10 w-full rounded-md text-black border px-2 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
                value={sellProperty.furnishing}
                onChange={handleProjectfurnishing}
              >
                <option className="hidden" value="">Furnishing</option>
                <option value="Fullyfurnishing">Furnished</option>
                <option value="Semifurnishing">Semi-furnish</option>
                <option value="UnFurnishing">Un-furnish</option>
              </select>
              <input
                type="text"
                placeholder="Built year"
                name="builtYear"
                value={sellProperty.builtYear}
                onChange={handleChangeValue}
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
              />
              <input
                type="text"
                placeholder="Landmark"
                name="landMark"
                value={sellProperty.landMark}
                onChange={handleChangeValue}
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
              />
              <input
                type="text"
                placeholder="Amenities"
                name="amenities"
                value={sellProperty.amenities.join(",")}
                onChange={handleChangeValueAmenities}
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
              />
            </div>
            <input
              type="text"
              placeholder="Property Description"
              name="descripation"
              value={sellProperty.descripation}
              onChange={handleChangeValue}
              className="h-10 w-full mt-4 placeholder:text-black rounded-md bg-white border px-3 outline-none col-span-2 transition-shadow focus:shadow-[0_0_0_3px_rgba(220,38,38,0.2)]"
            />

          </div>
        );

      case 3:
        return (
          <div>
            <p className="text-2xl">Let’s see your property! </p>
            <p className="text-gray-400">Powerful Images Attract the Right Audience.</p>
            <div className="grid gap-3 md:grid-cols-2 mt-4">

              <div>
                <label htmlFor="frontImage" className="text-black mx-3">
                  Upload Front Images:
                </label>
                <input
                  type="file"
                  name="frontImage"
                  onChange={(e) => handleFileChange(e, "frontImage")}
                  accept="image/*"
                  className="h-10 w-full rounded-md bg-white border text-black px-3 outline-none pt-1"
                />
              </div>
              <div>
                <label htmlFor="otherImage" className="text-black mx-3">
                  Upload Other Images:
                </label>
                <input
                  type="file"
                  multiple
                  name="otherImage"
                  onChange={handleOtherImageChange}
                  accept="image/*"
                  id="otherImage"
                  className="h-10 w-full rounded-md bg-white border text-black px-3 outline-none pt-1"
                />
              </div>
              {responseMessage && (
                <p className="text-sm text-red-600">{responseMessage}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Safe area for fixed navbar on small screens */}
      <div className="block md:hidden" style={{ height: '64px' }} aria-hidden />
      <Helmet>
        <meta
          name="description"
          content="Post Free Property Listing at 100acress.com. Rent, sell, or rent hassle-free. Reach potential buyers easily with our Trusted platform for property listing."
        />
        <title>Post Free Property Listing | Rent/Sell at 100acress.com</title>
      </Helmet>

      <section className="py-10 md:py-14 text-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col lg:flex-row gap-8 md:gap-12 px-4 md:px-1">
          {/* Left: Hero copy + Illustration */}
          <div className="flex-1 lg:pt-12">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight whitespace-nowrap">
              Post your property
            </h1>
            <h2 className="mt-1 text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              get the best prices
            </h2>
            <p className="hidden md:block text-base md:text-lg text-gray-600 mt-4 md:mt-6 max-w-xl">
              100acress is the best place to sell your property. We provide trusted advisory and mediation services so you can reach the right buyers—fast.
            </p>

            {/* Minimal inline illustration */}
            <div className="mt-8 hidden md:block">
              <svg viewBox="0 0 400 180" className="w-full max-w-md text-red-500/20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="70" width="120" height="80" rx="12" fill="currentColor" className="opacity-20"/>
                <rect x="150" y="40" width="100" height="110" rx="12" fill="currentColor" className="opacity-20"/>
                <rect x="270" y="60" width="120" height="90" rx="12" fill="currentColor" className="opacity-20"/>
                <path d="M20 150 C 80 120, 140 120, 200 150 S 340 180, 380 140" stroke="currentColor" strokeWidth="4" className="opacity-30"/>
              </svg>
            </div>

            <div className="lg:pt-10">
              <button
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-6 md:px-8 py-3 md:py-4 text-white font-semibold shadow-md shadow-red-600/20 transition-transform duration-200 hover:scale-[1.03]"
                onClick={() => {
                  stepsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                How It Works
              </button>
            </div>

            <Modal
              open={showSteps}
              onCancel={() => setShowSteps(false)}
              footer={null}
              centered
              width={modalWidth}
            >
              <div className="px-2 py-2">
                <h5 className="text-red-500 font-semibold text-lg mb-3">
                  Steps to Post Your Property for Free
                </h5>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Step 1:</span>
                    <span className="ml-2 text-red-500 font-semibold">
                      Post Your Property for Free
                    </span>
                    <p className="text-justify text-sm text-gray-600">
                      Please first check the options if you are a selling or renting owner, then select the appropriate choice.
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Step 2:</span>
                    <span className="ml-2 text-red-500 font-semibold">Select Property Type</span>
                    <p className="text-justify text-sm text-gray-600">
                      Please choose between Commercial or Residential property.
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Step 3:</span>
                    <span className="ml-2 text-red-500 font-semibold">Enter Details of Your Property</span>
                    <p className="text-justify text-sm text-gray-600">
                      Afterward, input all details such as property name, address, city, state, price, area, description, landmark, amenities, built year, and furnishing.
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Step 4:</span>
                    <span className="ml-2 text-red-500 font-semibold">Upload Images of Your Property</span>
                    <p className="text-justify text-sm text-gray-600">
                      Please upload one image for the front view and three to four additional images.
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Step 5:</span>
                    <span className="ml-2 text-red-500 font-semibold">Submit Your Property Information</span>
                    <p className="text-justify text-sm text-gray-600">
                      Submit the form after filling up the fields.
                    </p>
                  </div>
                </div>
              </div>
            </Modal>

          </div>
          <div className="flex gap-4 md:gap-6 min-h-fit mt-2">
            <div className="hidden lg:block w-fit bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mt-3 md:mt-6">
              <Steps
                className="custom-step-red"
                progressDot={(dot, { status }) => (
                  <span
                    className="w-3 h-3 rounded-full inline-block transition-transform"
                    style={{
                      background: status === "process" ? "linear-gradient(90deg,#dc2626,#fb923c)" : "#ef4444",
                      transform: status === "process" ? "scale(1.2)" : "scale(1)",
                      boxShadow: status === "process" ? "0 0 0 3px rgba(220,38,38,0.25)" : "none",
                      transition: "all 200ms ease"
                    }}
                  />
                )}
                direction="vertical"
                current={current}
                size="small"
              >
                {steps.map((item, index) => (
                  <Step
                    className="mt-8 w-24 lg:w-28 sm:mt-6 text-xs sm:text-xs"
                    key={item.id}
                    title={
                      <span className={index === current ? "font-semibold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent" : ""}>
                        {item.title}
                      </span>
                    }
                    icon={
                      <span
                        className={`flex items-center justify-center rounded-full w-6 h-6 text-xs font-medium ${index === current ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                        style={{ lineHeight: 1 }}
                      >
                        {index + 1}
                      </span>
                    }
                  />
                ))}
              </Steps>

            </div>

            {/* Right: Form card */}
            <div className="flex-1 flex flex-col bg-white border border-gray-100 rounded-2xl p-5 md:p-7 shadow-lg shadow-gray-200/60 transition-all mt-3 md:mt-6">
              {/* Mobile top stepper */}
              <div className="lg:hidden mb-3">
                <Steps size="small" current={current}>
                  {steps.map((s, index) => (
                    <Step
                      key={s.id}
                      title={s.title}
                      icon={
                        <span
                          className={`flex items-center justify-center rounded-full w-6 h-6 text-xs font-medium ${index === current ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                          style={{ lineHeight: 1 }}
                        >
                          {index + 1}
                        </span>
                      }
                    />
                  ))}
                </Steps>
              </div>
              {/* Top progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-500"
                  style={{ width: `${((current + 1) / steps.length) * 100}%` }}
                />
              </div>

              {/* Animated step content wrapper */}
              <div
                key={contentAnimKey}
                className={`flex-1 transform transition-all duration-300 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                {renderStepContent(current)}
              </div>

              <div className="sticky bottom-0 bg-white/90 backdrop-blur py-3 md:py-4 mt-2 md:mt-4 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center border-t-0 md:border-t border-gray-200 z-10" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
                {current > 0 && <Button style={{
                  backgroundColor: '#dc2626',
                  borderColor: '#dc2626',
                  color: 'white',
                  borderRadius: '9999px',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#450a0a';
                    e.currentTarget.style.borderColor = '#450a0a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc2626';
                    e.currentTarget.style.borderColor = '#dc2626';
                  }} onClick={prev}>Previous</Button>}
                {current < 3 ? (
                  <Button className="group" type="primary" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                    borderRadius: '9999px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    boxShadow: '0 8px 18px rgba(220,38,38,0.18)'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#450a0a';
                      e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={next}>
                    <span className="inline-flex items-center gap-2">
                      Next
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </Button>
                ) : (
                  <Button type="primary" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                    borderRadius: '9999px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    boxShadow: '0 8px 18px rgba(220,38,38,0.18)'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#450a0a';
                      e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={submitSellPropertyDetails}>
                    <span className="inline-flex items-center gap-2">
                      Submit
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works cards - below page content */}
      <section ref={stepsSectionRef} className="py-10 md:py-14 bg-white" style={{ scrollMarginTop: '96px' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Steps to <span className="text-red-600">Post Your Property for Free</span></h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Card 1 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">1</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 1: <span className="text-red-600">Post Your Property for Free</span></h4>
              <p className="mt-2 text-sm text-gray-600">Choose whether you are selling or renting first, then pick the appropriate option to continue.</p>
            </div>

            {/* Card 2 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">2</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 2: <span className="text-red-600">Select Property Type</span></h4>
              <p className="mt-2 text-sm text-gray-600">Pick between <strong>Commercial</strong> or <strong>Residential</strong> to tailor the form for your property.</p>
            </div>

            {/* Card 3 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">3</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 3: <span className="text-red-600">Enter Details</span> of Your Property</h4>
              <p className="mt-2 text-sm text-gray-600">Provide name, address, city, state, <strong className="text-red-600 font-semibold">price</strong>, area, amenities, furnishing, and description.</p>
            </div>

            {/* Card 4 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">4</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 4: <span className="text-red-600">Upload Images</span> of Your Property</h4>
              <p className="mt-2 text-sm text-gray-600">Add a front image and three to four additional images to attract potential buyers.</p>
            </div>

            {/* Card 5 */}
            <div className="relative group rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
              <div className="absolute -top-3 -left-3">
                <div className="rounded-full bg-red-600 text-white text-xs font-bold px-3 py-1 shadow-md">5</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Step 5: <span className="text-red-600">Submit</span> Your Property Information</h4>
              <p className="mt-2 text-sm text-gray-600">Review your details and click <span className="text-red-600 font-semibold">Submit</span> to finish.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewSellProperty;
