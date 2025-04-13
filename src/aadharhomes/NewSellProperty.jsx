import React, { useState } from "react";
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
  const [responseMessage, setResponeMessage] = useState("");
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

  const [selectedState, setSelectedState] = useState("Haryana");
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
    if (name === "price" || name === "area" && !/^\d*$/.test(value)) {
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

  // const submitSellPropertyDetails = async (e) => {
  //   e.preventDefault();
  //   if (isLoading) return;

  //   if (!validateStep(current)) {
  //     message.error("Please fill all required fields before proceeding.");
  //     return;
  //   }
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
  //     setIsLoading(true);
  //     const response = await axios.post(apiEndpoint, formDataAPI);
  //     console.log(response, "response");

  //     if (response.status === 200) {
  //       message.success("Submit Successfully, Under Review");
  //       countDown();
  //       resetData();
  //       resetImageData();
  //       setIsLoading(false);
  //       setCurrent(0);
  //     } else {
  //       message.error("Unexpected response from server.");
  //       setIsLoading(false); 
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     message.error("There was an error submitting the form. Please try again.");
  //     setIsLoading(false);
  //   }   
  // };

  const submitSellPropertyDetails = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validateStep(current)) {
      message.error("Please fill all required fields before proceeding.");
      return;
    }

    const apiEndpoint = `https://api.100acress.com/postPerson/propertyInsert/${sellerId}`;
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
        return (
          sellProperty.bedrooms !== "" &&
          sellProperty.bathrooms !== "" &&
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
    } else {
      message.error("Please fill all required fields before proceeding.");
    }
  };
  const prev = () => setCurrent(current - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <p className="text-2xl mb-0">Welcome back {parsedAgentData.name}, </p>
            <p className="text-xl text-gray-400">List your Property</p>
            <p className="text-xl text-black">I am looking to:</p>
            <button
              className={`mr-1 px-4 py-1 border rounded-3xl cursor-pointer ${sellProperty.propertyLooking === "Sell" ? "bg-red-500 text-white" : "bg-white text-black"}`}
              onClick={() => handleOptionClick("Sell")}
            >
              Sell
            </button>
            <button
              className={`ml-1 px-4 py-1 border rounded-3xl cursor-pointer ${sellProperty.propertyLooking === "rent" ? "bg-red-500 text-white" : "bg-white text-black"}`}
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
                className="h-10 w-full rounded-md text-black bg-white border px-3 outline-none"
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
                  className="h-10 w-full text-black rounded-md bg-white border px-3 outline-none"
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


              <select
                name="bedrooms"
                value={sellProperty.bedrooms}
                onChange={handleChangeValue}
                className=" h-10 rounded-md bg-white border px-2 outline-none"
              >
                <option className="hidden" value="">No of Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select
                name="bathrooms"
                value={sellProperty.bathrooms}
                onChange={handleChangeValue}
                className="h-10 rounded-md bg-white border px-2 outline-none"
              >
                <option className="hidden" value="">No of Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={sellProperty.price}
                  onChange={handleChangeValue}
                  className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
                />
                <select
                  name="priceunits"
                  value={sellProperty.priceunits}
                  onChange={handleChangeValue}
                  className="h-10 ml-2 rounded-md bg-white border px-2 outline-none"
                >
                  <option className="hidden" value="">Units</option>
                  <option value="lakhs">Lakhs</option>
                  <option value="crores">Crores</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Area"
                  name="area"
                  value={sellProperty.area}
                  onChange={handleChangeValue}
                  className="h-10 w-1/2 placeholder:text-black rounded-md bg-white border px-3 outline-none"
                />
                <select
                  name="areaUnit"
                  value={sellProperty.areaUnit}
                  onChange={handleChangeValue}
                  className="ml-2 h-10 w-1/2 rounded-md bg-white border px-2 outline-none"
                >
                  <option className="hidden" value="">Units</option>
                  <option value="sqft">Sqft</option>
                  <option value="sqrd">Sqyd</option>
                </select>
              </div>
              <select
                className="h-10 w-full rounded-md text-black border px-2 outline-none"
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
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
              />
              <input
                type="text"
                placeholder="Landmark"
                name="landMark"
                value={sellProperty.landMark}
                onChange={handleChangeValue}
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
              />
              <input
                type="text"
                placeholder="Amenities"
                name="amenities"
                value={sellProperty.amenities.join(",")}
                onChange={handleChangeValueAmenities}
                className="h-10 w-full placeholder:text-black rounded-md bg-white border px-3 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Property Description"
              name="descripation"
              value={sellProperty.descripation}
              onChange={handleChangeValue}
              className="h-10 w-full mt-4 placeholder:text-black rounded-md bg-white border px-3 outline-none col-span-2"
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
      <Helmet>
        <meta
          name="description"
          content="Post Free Property Listing at 100acress.com. Rent, sell, or rent hassle-free. Reach potential buyers easily with our Trusted platform for property listing."
        />
        <title>Post Free Property Listing | Rent/Sell at 100acress.com</title>
      </Helmet>

      <section className=" py-12 text-gray-800 ">
        <div className="mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row mt-4">
          <div className="max-w-xl px-4 lg:pr-24 lg:pt-20">
            <h3 className="lg:text-5xl md:text-3xl  font-gluten">
              Post your property
            </h3>
            <h3 className=" mb-3 lg:text-5xl md:text-3xl font-semibold text-red-600 font-gluten">
              get the best prices
            </h3>
            <p className="text-lg text-gray-600 text-justify lg:w-3/4 hidden md:block mt-2 font-inter">
              100acress is the best place to sell your property, we are
              dedicated to providing advisory and mediation services for all
              your needs. you can expect us every time. All that is for you!
            </p>

            <div className="flex flex-col space-x-2 sm:flex-row space-y-4 sm:space-y-0 ml-[-10px] lg:pt-12">
              <button
                className="w-50 rounded-xl text-white text-md sm:text-lg md:text-md font-normal px-3 sm:px-6 py-2 sm:py-4 bg-red-600"
                onClick={() => setShowSteps(!showSteps)}
              >
                How It Works
              </button>
            </div>

            {showSteps && (
              <div className="sm:mt-50 mt-20 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="shadow-2xl rounded-xl px-6 py-6 bg-white relative w-11/12 sm:w-1/2 lg:w-1/3 h-auto">
                  <button
                    className="text-red-400 text-2xl absolute right-6 top-5 cursor-pointer"
                    onClick={() => setShowSteps(!showSteps)}
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
                    city, state, price, area, descripation, landmark, amenities,
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
          <div className="flex gap-2 min-h-fit">
            <div className="w-fit border bg-gray-100 border-gray-300 rounded-lg p-4 hidden lg:block">
              <Steps
                className="custom-step-red"
                progressDot={(dot, { status }) => (
                  <span
                    className="w-3 h-3 rounded-full bg-red-500 inline-block"
                    style={{
                      boxShadow: status === "process" ? "0 0 0 2px #ef4444" : "none",
                    }}
                  />
                )}
                direction="vertical"
                current={current}
                size="small"
              >
                {steps.map((item, index) => (
                  <Step
                    className="mt-10"
                    key={item.id}
                    title={item.title}
                    icon={<>{index + 1}</>}
                  />
                ))}
              </Steps>

            </div>

            <div className="flex-1 flex flex-col border-2 border-gray-200 rounded-lg p-4 hidden lg:flex">
              <div className="flex-1">{renderStepContent(current)}</div>

              <div className="sticky bottom-0 bg-white py-3 mt-4 flex justify-between border-t border-gray-300 z-50">
                {current > 0 && <Button style={{
                  backgroundColor: '#dc2626',
                  borderColor: '#dc2626',
                  color: 'white',
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
                  <Button type="primary" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#450a0a';
                      e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={next}>Next</Button>
                ) : (
                  <Button type="primary" style={{
                    backgroundColor: '#dc2626',
                    borderColor: '#dc2626',
                    color: 'white',
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#450a0a';
                      e.currentTarget.style.borderColor = '#450a0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.borderColor = '#dc2626';
                    }} onClick={submitSellPropertyDetails}>Submit</Button>
                )}
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
