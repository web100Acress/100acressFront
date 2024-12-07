import { Button, message } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format, isValid, parseISO } from "date-fns";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { 
  PhoneIcon,
  AcresIcon, 
  ArrowIcon, 
  CalenderIcon, 
  PriceIcon, 
  TowerIcon, 
  LocationSmallIcon, 
  SHAREIcon, 
  FavouriteIcon, 
  LineIcon, 
  WhiteLineIcon, 
  ShareFrameIcon, 
  ForwardIcon, 
  BackwardIcon 
} from '../../Assets/icons';
import { DataContext } from '../../MyContext';
import Slider from "react-slick";
import Dynamicsvg from './Dynamicsvg';

const NewBanner = () => {
  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [builderName, setBuilderName] = useState([]);
  const { project } = useContext(DataContext);
  const slideRefs = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [userButtonText, setUserButtonText] = useState("Raise a Enquiry ");
  const [userResponseMessage, setUserResponseMessage] = useState("");
  const [instantcallbackmodal, setInstantCallbackmodal] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading2, setIsLoading2] = useState(false);
  const [sideButtonText, setSideButtonText] = useState("Submit");
  const [sideResponseMessage, setSideResponseMessage] = useState("");
  const [isModalOpenFloor, setIsModalOpenFloor] = useState(false);
  const [selectedImagefloor, setSelectedImagefloor] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [PopUpbuttonText, setPopUpButtonText] = useState("Submit");
  const [PopUpresponseMessage, setPopUpResponseMessage] = useState("");


  const set = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full space-x-2 mt-4${i === currentIndex
          ? "bg-gray-800 h-2 w-5"
          : "bg-gray-400 h-3 w-3"
          }`}
      ></button>
    ),
    afterChange: (index) => setCurrentIndex(index),
  };



  const {
    frontImage,
    BhK_Details,
    project_floorplan_Image,
    Amenities,
    projectRedefine_Business,
    projectRedefine_Connectivity,
    projectRedefine_Education,
    projectRedefine_Entertainment,
    highlight,
    projectGallery,
  } = projectViewDetails || {};


  const sliderImages = project_floorplan_Image || [];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 365);
  const expirationDate = tomorrow.toISOString().split("T")[0];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.100acress.com/projectView/${pUrl}`
      );
      setProjectViewDetails(response?.data?.dataview[0]);
      setBuilderName(response.data?.dataview[0]?.builderName)
    } catch (error) {
      console.error('Error fetching Project Data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  let description = projectViewDetails?.project_discripation || "";

  let builderdescription = projectViewDetails?.AboutDeveloper || "";

  const linkRegex =
    /<a\s+href="([^"]+)"\s+style="color:black"\s*target="_blank"\s*><\/a>/;

  const linkText = projectViewDetails.projectName;

  description = description.replace(linkRegex, (match, p1) => {
    return `<a href="${p1}" style="color:black" target="_blank">${linkText}</a>`;
  });

  const formatDate = (isoString) => {
    if (!isoString) {
      return "No date provided";
    }
    const date = parseISO(isoString);
    if (!isValid(date)) {
      return "Invalid date";
    }
    return format(date, "MMMM dd, yyyy");
  };


  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [sideDetails, setSideDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [popDetails, setPopDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const openModalfloor = (image) => {
    setSelectedImagefloor(image);
    setIsModalOpenFloor(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModalfloor = () => {
    setIsModalOpenFloor(false);
    setSelectedImagefloor(null);
    document.body.style.overflow = "auto"; // Restore background scroll
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };



  const handleShowInstantcallBack = () => {
    setInstantCallbackmodal(true);
  }

  const handleCloseInstantcallBack = () => {
    setInstantCallbackmodal(false);
  }

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const handlePopChange = (e) => {
    const { name, value } = e.target;
    setPopDetails({ ...popDetails, [name]: value });
  };

  const popSubmitDetails = async (e) => {
    e.preventDefault();
    if (isLoading1) {
      return;
    }

    const { mobile } = popDetails;

    if (mobile) {
      setPopUpButtonText("Submitting...");
      try {
        setIsLoading1(true);
        await axios.post("https://api.100acress.com/userInsert", {
          ...popDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setPopUpResponseMessage("Data submitted successfully");
        resetData1();
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading1(false);
        setPopUpButtonText("Submit");
      }
    } else {
      setPopUpResponseMessage("Please fill in the data");
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, []);


  const handleShare = (project) => {

    console.log("test the data", project)
    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  const resetData = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const resetData2 = () => {
    setSideDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const resetData1 = () => {
    setSideDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const userSubmitDetails = (e) => {
    e.preventDefault();

    if (isLoading2) {
      return;
    }

    const { mobile } = userDetails;

    if (mobile) {
      setIsLoading2(true);
      setUserButtonText("Submitting...");
      axios
        .post("https://api.100acress.com/userInsert", {
          ...userDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        })
        .then((res) => {
          // setSideResponseMessage("Data submitted successfully");
          message.success("Data submitted successfully");
          resetData();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          // Set loading state to false and reset the button text when the API call is complete (success or error)
          setUserButtonText("Submit");
        });
    } else {
      message.error("Please fill in the details");
    }
  };

  const SideSubmitDetails = async (e) => {
    e.preventDefault();
    if (isLoading2) {
      return;
    }
    const { mobile } = sideDetails;

    if (mobile) {
      setIsLoading2(true);
      setSideButtonText("Submitting...");
      try {
        await axios.post("https://api.100acress.com/userInsert", {
          ...sideDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setInstantCallbackmodal(false)
        message.success("Data submitted successfully");
        resetData2();
        setSideButtonText("Submit");
      } catch (error) {
        console.error("Error:", error.message);
        setSideResponseMessage("Error: " + error.message);
        setSideButtonText("Submit");
      } finally {
        setIsLoading2(false);
      }
    } else {
      message.error("Please fill in the data");
    }
  };


  const Gallery = ({ images }) => {
    const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
    const [modalImage, setModalImage] = useState(null);


    const openModal = (image) => {
      setModalImage(image);
      setIsModalOpenGallery(true);
    };

    const closeModal = () => {
      setIsModalOpenGallery(false);
      setModalImage(null);
    };

    return (
      <div className="p-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Display Images */}
          {images?.map((image, index) => (
            <div
              key={index}
              className="relative"
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt={projectViewDetails.projectName}
                className="w-full h-auto rounded-lg object-cover transition-transform duration-200 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpenGallery && (
          <div className="fixed inset-0 pt-20 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-2 rounded-full z-10"
              >
                &times;
              </button>
              <img
                src={modalImage.url}
                alt={projectViewDetails.projectName}
                className="max-w-[80vw] max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    );
  };


  const filterProjectsByBuilder = () => {
    const normalizedBuilderName =
      typeof builderName === "string" ? builderName.trim().toLowerCase() : "";

    return project.filter(
      (p) => p.builderName.trim().toLowerCase() === normalizedBuilderName
    );
  };

  const filteredProjects = filterProjectsByBuilder();

  const projectsToShow = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <>
    {false && <div
                  style={{ maxHeight: '25rem', maxWidth: '30rem', justifyContent: 'center', alignItems: 'center' }}
                  className="absolute bottom-64 right-20 bg-[#000000] bg-opacity-70 text-white py-2 z-[100] text-left p-2 pl-4 rounded-lg mr-10 p-4"
                >
                  <h1 className="text-5xl font-bold mt-10">{projectViewDetails.projectName}</h1>
                  <h5>{projectViewDetails?.builderName}</h5>
                  <p className="text-xs">
                    <LocationSmallIcon />
                    {projectViewDetails?.projectAddress}
                  </p>
                  <h2 className="font-abril text-xl" >
                    ₹{' '}
                    {projectViewDetails.minPrice < 1 ? (
                      <span>{projectViewDetails.minPrice * 100} L</span>
                    ) : (
                      <span>{projectViewDetails.minPrice} Cr</span>
                    )}
                    {' '} - {projectViewDetails.maxPrice} Cr
                  </h2>
                  <div className="flex items-center justify-between p-1 mt-10">
                    <div className="flex items-center">
                      <FavouriteIcon className="pr-4" />
                      <SHAREIcon className="pr-4" />
                    </div>
                    <Button className="ml-auto text-white">Book Free Site Visit</Button>
                  </div>
                </div>}
      <div>
        <Wrapper className="section" style={{ overflow: "hidden", overflowX: "hidden" }}>
          <Helmet>
            <title>{projectViewDetails.meta_title}</title>
            <meta
              name="description"
              content={projectViewDetails.meta_description}
            />
            <link
              rel="canonical"
              href={`https://www.100acress.com/${projectViewDetails.project_url}/`}
            />
            <script type="application/ld+json">
              {`
              {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "${projectViewDetails.projectName}",
                "description": "${projectViewDetails.meta_description}",
                "startDate": "${today.toISOString().split("T")[0]}",
                "endDate": "${expirationDate}",
                ${projectViewDetails.frontImage && projectViewDetails.frontImage.url
                  ? `"image": "${projectViewDetails.frontImage.url}",`
                  : ""
                }
                "location": {
                  "name": "${projectViewDetails.projectAddress} ${projectViewDetails.city
                }",
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "${projectViewDetails.city}",
                    "streetAddress": "${projectViewDetails.projectAddress}"
                  }
                }
              }
              `}
            </script>
          </Helmet>
          <>

            {/* Navbar */}
            <div
              className="px-4"
              style={{
                position: "fixed",
                top: -4,
                left: 0,
                right: 0,
                padding: "5px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <img
                src={projectViewDetails?.logo?.url}
                style={{ height: "40px", width: "200px" }}
                alt={projectViewDetails.projectName}
                loading="lazy"
              />
              <div className="flex items-center justify-end space-x-4 w-full">
                <Button
                  onClick={handleShowInstantcallBack}
                  className="mr-0 mt-0 hidden sm:block"
                >
                  Get a Callback
                </Button>
                <a className="animate-fadeInRight " href={`tel:${projectViewDetails?.mobileNumber || "9811750130"}`}>
                  <button className="bg-[#263238] py-1 px-3 rounded-lg text-white text-base flex items-center">
                    <PhoneIcon />{" "}
                    {projectViewDetails?.mobileNumber || " 9811750130"}
                  </button>
                </a>
              </div>

              <span className="text-[#012e29] text-sm pt-2 md:text-2xl lg:hidden block text-right">
                <Link
                  to={`tel:${projectViewDetails.mobileNumber ? projectViewDetails.mobileNumber : "9811750130"}`}
                ></Link>
              </span>
            </div>


            {/* sideform */}
            <div>
              <div className="sticky-quote-cta">
                <a
                  className="text-white"
                  onClick={handleShowInstantcallBack}
                  style={{ backgroundColor: "#263238", padding: "10px" }}
                >
                  Download Brochure
                </a>
                {instantcallbackmodal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-t-2xl bg-[#263238] shadow-lg max-w-lg">
                      <div className="bg-radial-custom px-5 py-2 text-center text-white relative">
                        <p className="font-serif text-xl mb-0 text-center font-semibold tracking-wider">
                          Instant Callback
                        </p>
                        <button
                          className="text-white text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={handleCloseInstantcallBack}
                        >
                          ✖
                        </button>
                      </div>

                      <div className="space-y-4 px-8 py-4 rounded-t-2xl">
                        <div className="relative"  >
                          <i
                            className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"

                          ></i>
                          <input
                            className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-red outline-none placeholder-transparent focus:bg-[#263238]"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChangeSide}
                            value={sideDetails.name}
                            required
                          />
                          <span
                            className="absolute left-7 -top-3 px-2 bg-[#263238] text-grey-500 text-base transition-all duration-300 transform scale-75 
                            peer-valid:text-white
                            pointer-events-none peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-[#D0D0D0]"
                          >
                            Name
                          </span>
                        </div>




                        <div className="relative">
                          <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"></i>
                          <input
                            className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-[#707070] outline-none placeholder-transparent focus:bg-[#263238]"
                            type="number"
                            name="mobile"
                            placeholder="Enter your Mobile No"
                            required
                            value={sideDetails.mobile}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers and ensure length is between 9 and 10 digits
                              if (/^\d*$/.test(value) && value.length <= 10) {
                                handleChangeSide(e);
                              }
                            }}
                          />
                          <span
                            className="absolute left-7 -top-3 px-2 bg-[#263238] text-gray-700 text-base transition-all duration-300 transform scale-75 
                            pointer-events-none peer-valid:text-white peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-white"
                          >
                            Contact No
                          </span>
                        </div>


                        <div className="relative">
                          <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"></i>
                          <input
                            className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-[#707070] outline-none placeholder-transparent focus:bg-[#263238]"
                            type="email"
                            name="email"
                            placeholder="Email (Optional)"
                            onChange={handleChangeSide}
                            value={sideDetails.email}
                          />
                          <span
                            className="absolute left-7 -top-3 px-2 bg-[#263238] text-grey-500 text-base transition-all duration-300 transform scale-75 
                            pointer-events-none peer-valid:text-white peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-white"
                          >
                            Email (Optional)
                          </span>
                        </div>

                        {sideResponseMessage && (
                          <p className="text-grey text-[12px] mb-0">
                            {sideResponseMessage}
                          </p>
                        )}

                        <div className="flex justify-center">
                          <button
                            className="group mt-2 w-full md:w-auto rounded-md bg-[#263238] px-10 py-2 font-semibold text-white border border-gray-600 outline-none relative overflow-hidden transition-all duration-500 hover:pr-10 flex items-center justify-center"
                            onClick={SideSubmitDetails}
                          >
                            <span className="relative inline-block transition-all px-3 duration-500">
                              {sideButtonText}
                            </span>
                            <span className="absolute top-1/2 -translate-y-1/2 right-0 opacity-0 transition-all duration-500 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0">
                              <ForwardIcon />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Popup form */}
            <div className="relative">
              {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                  <div className="relative sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-t-2xl bg-[#263238] shadow-lg max-w-lg">
                    <div className="bg-radial-custom px-5 py-2 text-center text-white relative">
                      <p className="font-serif text-xl mb-0 text-center font-semibold tracking-wider">
                        Instant Callback
                      </p>
                      <button
                        className="text-white text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPopup(false)}
                      >
                        ✖
                      </button>
                    </div>

                    <div className="space-y-4 px-8 py-4 rounded-t-2xl">
                      <div className="relative"  >
                        <i
                          className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"

                        ></i>
                        <input
                          className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-red outline-none placeholder-transparent focus:bg-[#263238]"
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                          onChange={handlePopChange}
                          value={popDetails.name}
                        />
                        <span
                          className="absolute left-7 -top-3 px-2 bg-[#263238] text-grey-500 text-base transition-all duration-300 transform scale-75 
                    peer-valid:text-white
                    pointer-events-none peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-[#D0D0D0]"
                        >
                          Name
                        </span>
                      </div>




                      <div className="relative">
                        <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"></i>
                        <input
                          className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-[#707070] outline-none placeholder-transparent focus:bg-[#263238]"
                          type="number"
                          name="mobile"
                          placeholder="Enter your Mobile No"
                          required
                          value={popDetails.mobile}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only numbers and ensure length is between 9 and 10 digits
                            if (/^\d*$/.test(value) && value.length <= 10) {
                              handlePopChange(e);
                            }
                          }}
                        />
                        <span
                          className="absolute left-7 -top-3 px-2 bg-[#263238] text-gray-700 text-base transition-all duration-300 transform scale-75 
                    pointer-events-none peer-valid:text-white peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-white"
                        >
                          Contact No
                        </span>
                      </div>


                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-base"></i>
                        <input
                          className="peer w-full pl-10 py-2 rounded-lg bg-[#263238] text-white focus:ring-1 focus:ring-blue-500 border border-[#707070] outline-none placeholder-transparent focus:bg-[#263238]"
                          type="email"
                          name="email"
                          placeholder="Email (Optional)"
                          onChange={handlePopChange}
                          value={popDetails.email}
                        />
                        <span
                          className="absolute left-7 -top-3 px-2 bg-[#263238] text-grey-500 text-base transition-all duration-300 transform scale-75 
                    pointer-events-none peer-valid:text-white peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#B8B8B8] peer-focus:-top-2 peer-focus:bg-[#263238] peer-focus:text-white"
                        >
                          Email (Optional)
                        </span>
                      </div>

                      {PopUpresponseMessage && (
                        <p className="text-grey text-[12px] mb-0">
                          {PopUpresponseMessage}
                        </p>
                      )}
                      <div className="flex justify-center">
                          <button
                            className="group mt-2 w-full md:w-auto rounded-md bg-[#263238] px-10 py-2 font-semibold text-white border border-gray-600 outline-none relative overflow-hidden transition-all duration-500 hover:pr-10 flex items-center justify-center"
                            onClick={popSubmitDetails}
                          >
                            <span className="relative inline-block transition-all px-3 duration-500">
                              {PopUpbuttonText}
                            </span>
                            <span className="absolute top-1/2 -translate-y-1/2 right-0 opacity-0 transition-all duration-500 transform translate-x-5 group-hover:opacity-100 group-hover:translate-x-0">
                              <ForwardIcon />
                            </span>
                          </button>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>


            {/* mainImage */}
            <div className="w-full mt-0 lg:mt-16 md:mt-10 sm:mt-24 bg-cover bg-no-repeat text-center">
              <div className="w-full relative overflow-hidden object-fit">
                <div className="flex justify-center">
                  {frontImage?.url && (
                    <img
                      className="img-fluid max-w-full h-auto"
                      src={frontImage.url}
                      alt={projectViewDetails.projectName}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-[#263238]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1">
                <section
                  className="text-white p-4 rounded-md flex justify-center items-center"
                >
                  <AcresIcon className="mr-2" />
                  <div className='mt-2'>
                    <span className="text-2xl font-customFont" style={{ fontFamily: "Abril Fatface" }}>{projectViewDetails.totalLandArea} Acres</span>
                    <h6 className='text-sm'>Land Area</h6>
                  </div>
                </section>
                <section
                  className="text-white p-4 rounded-md flex justify-center items-center"
                >
                  <CalenderIcon className="mr-2" />
                  <div className='mt-2'>
                    <span style={{ fontFamily: "Abril Fatface" }} className="text-2xl">{projectViewDetails.towerNumber} Tower -{" "}
                      {projectViewDetails.totalUnit} Unit</span>
                    <h6 className='text-xs'>About Project</h6>
                  </div>
                </section>
                <section
                  className="text-white p-4 rounded-md flex justify-center items-center"
                >
                  <PriceIcon className="mr-2" />
                  <div className='mt-2'>
                    <span className="text-2xl " style={{ fontFamily: "Abril Fatface" }}>{projectViewDetails.minPrice < 1 ? (
                      <span>{projectViewDetails.minPrice * 100} L{" "}</span>
                    ) : (
                      <span style={{ fontFamily: "Abril Fatface" }}>{projectViewDetails.minPrice} Cr {" "}</span>
                    )}
                      - {projectViewDetails.maxPrice} Cr</span>
                    <h6 className='text-sm'>Price</h6>
                  </div>
                </section>
                <section
                  className="text-white p-4 rounded-md flex justify-center items-center"
                >
                  <TowerIcon className="mr-2" />
                  <div className='mt-2'>
                    <span className="text-2xl" style={{ fontFamily: "Abril Fatface" }}>
                      {formatDate(projectViewDetails.possessionDate)}
                    </span>
                    <h6 className='text-sm'>Possession</h6>
                  </div>
                </section>
              </div>
            </div>

            {/* about project */}
            <div className="pt-0 h-auto md:h-screen">
              <div className="flex flex-col md:flex-row justify-center items-stretch rounded h-full">
                {/* Image Section */}
                <div className="w-full md:w-1/2 overflow-hidden flex items-center">
                  {projectViewDetails?.highlightImage?.url && (
                    <img
                      src={projectViewDetails.highlightImage.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-64 sm:h-80 md:h-screen object-cover animate-fadeInLeft"
                    />
                  )}
                </div>

                {/* Text Section */}
                <div
                  className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start"
                >
                  <span className="lg:text-3xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <LineIcon />
                    </span>
                    About Project
                  </span>

                  <h2
                    className="mt-2 text-4xl sm:text-5xl md:text-6xl font-abril"
                    style={{ fontFamily: "Abril Fatface" }}
                  >
                    {projectViewDetails.projectName}
                  </h2>

                  <div
                    className="text-justify text-gray-700 mt-5 md:mt-8 lg:mt-12 xl:mt-16 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg overflow-y-auto"
                  >
                    <div className="leading-relaxed ">
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* higthlight? */}
            <div className="pt-0 h-auto md:h-screen">
              <div className="flex flex-col md:flex-row justify-center items-stretch rounded h-full">


                {/* Text Section */}
                <div
                  className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start"
                >
                  <span className="lg:text-3xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <LineIcon />
                    </span>
                    Highlights
                  </span>

                  <h2
                    style={{ fontFamily: "Abril Fatface" }}
                    className=" font-abril mt-2 text-4xl sm:text-5xl md:text-6xl "
                  >
                    Highlights of {projectViewDetails.projectName}
                  </h2>

                  <div className="mt-5 md:mt-20 overflow-y-auto">
                    {highlight &&
                      Array.isArray(highlight) &&
                      highlight.length > 0 &&
                      highlight.map((item, index) => (
                        <ul
                          className="list-disc"
                          style={{ listStyleType: "circle" }}
                          key={index}
                        >
                          <li className="mb-2 text-black text-sm sm:text-base">
                            {item.highlight_Point}
                          </li>
                        </ul>
                      ))}
                  </div>
                </div>
                {/* Image Section */}
                <div className="w-full md:w-1/2 overflow-hidden flex items-center">
                  {projectViewDetails?.highlightImage?.url && (
                    <img
                      src={projectViewDetails.highlightImage.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-64 sm:h-64 md:h-screen object-cover"
                    />
                  )}
                </div>
              </div>
            </div>


            {/* How much */}

            <div className="p-2 pt-1 mt-2 pb-0 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/1 sm:w-full pl-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-xl md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}How Much
                      </span>
                      <div><h2 class="lg:text-5xl md:text-3xl sm:text-base text-justify text-black-600" style={{ fontFamily: "Abril Fatface" }}>
                        <h3 className='text-5xl pt-2' style={{ fontFamily: "Abril Fatface" }}>
                          {projectViewDetails?.projectName} Size and Price
                        </h3><span>
                        </span>
                      </h2>
                      </div>

                    </div>
                  </div>
                  <div className="mt-4 mx-4">
                    <div className="flex flex-col w-full border-black border border-black-700">
                      <div className="flex flex-shrink-0 bg-[#263238] text-white ">
                        <div className="flex items-center justify-center flex-grow w-0 h-10 p-2 border-b  border-black">
                          <span>Unit Type</span>
                        </div>
                        <div className="flex items-center justify-center flex-grow w-0 h-10 p-2 border-b  border-black">
                          <span>Unit Size</span>
                        </div>

                        <div className="flex items-center justify-center flex-grow w-0 h-10 p-2 border-b  border-black">
                          <span>Unit Price</span>
                        </div>
                      </div>

                      <div className="overflow-auto">
                        {BhK_Details &&
                          Array.isArray(BhK_Details) &&
                          BhK_Details.length > 0 &&
                          BhK_Details.map((item, index) => (
                            <>
                              <div className="flex flex-shrink-0" key={index}>
                                <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto border border-black p-6">
                                  <span className="m-2"> {item.bhk_type}</span>
                                </div>

                                <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto p-6 border border-black">
                                  <span>{item.bhk_Area}</span>
                                </div>

                                <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto p-6 border border-black">
                                  <span>{item.price}</span>
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Floor Plan */}

            <div className="p-2 pt-2 mt-4 pb-0 h-fit">
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/1 sm:w-full pl-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-xl md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        Floor Plan
                      </span>
                      <div>
                        <h2
                          className="lg:text-5xl md:text-3xl sm:text-base text-justify text-black-600"
                          style={{ fontFamily: "Abril Fatface" }}
                        >
                          <h3
                            className="text-5xl pt-2"
                            style={{ fontFamily: "Abril Fatface" }}
                          >
                            {projectViewDetails?.projectName} Floor Plan
                          </h3>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //floor plan? */}
            <div className='h-[350px]'>
              <article className="article h-[300px]">
                <div className="relative">
                  {sliderImages &&
                    Array.isArray(sliderImages) &&
                    sliderImages.length > 0 && (
                      <>
                        <button
                          onClick={() => slideRefs.current.slickPrev()}
                          className="absolute top-1/2 lg:top-1/2 sm:top-1/2 left-5 transform -translate-y-1/2 bg-white text-gray-500 p-2 rounded-full z-10"
                        >
                          <ForwardIcon />
                        </button>
                        <button
                          onClick={() => slideRefs.current.slickNext()}
                          className="absolute top-1/2 lg:top-1/2 sm:top-1/2 right-5 transform -translate-y-1/2 text-gray-700 bg-white p-2 rounded-full z-10"
                        >
                          <BackwardIcon />
                        </button>
                      </>
                    )}
                  <Slider ref={slideRefs} {...set}>
                    {sliderImages &&
                      Array.isArray(sliderImages) &&
                      sliderImages.length > 0 &&
                      sliderImages.map((image, index) => (
                        <div key={index} className="p-2">
                          <img
                            src={image.url}
                            alt={`${projectViewDetails.projectName} floorPlans ${index + 1}`}
                            className="w-full h-[300px] object-fit md:h-[200px] sm:h-[350px] mt-6 cursor-pointer rounded-t-lg"
                            onClick={() => openModalfloor(image.url)}
                          />
                          <div className="bg-[#263238] text-white w-full text-center py-2 rounded-b-lg">
                            <h2 className="text-xl font-bold">
                              {BhK_Details[index]?.bhk_type || BhK_Details[0]?.bhk_type}
                            </h2>
                            <p className="text-sm">{BhK_Details[index]?.bhk_Area || BhK_Details[0]?.bhk_Area}</p>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </article>

              {isModalOpenFloor && (
                <div className="fixed inset-0 pt-20 bg-black bg-opacity-75 flex justify-center items-center z-50">
                  <div className="relative">
                    <button
                      onClick={closeModalfloor}
                      className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-2 rounded-full z-10"
                    >
                      &times;
                    </button>
                    <img
                      src={selectedImagefloor}
                      alt={projectViewDetails.projectName}
                      className="max-w-[80vw] max-h-[80vh] object-contain"
                    />
                  </div>
                </div>
              )}

              <style jsx>{`
    .relative {
      margin: 0;
      padding: 0;
    }

    .p-0 {
      padding: 0;
    }

    img {
      display: block;
    }

    @media (max-width: 768px) {
      .absolute {
        top: 50%;
      }

      .left-5 {
        left: 2%;
      }

      .right-5 {
        right: 2%;
      }
    }

    @media (max-width: 640px) {
      .absolute {
        top: 50%;
      }

      .left-5 {
        left: 1%;
      }

      .right-5 {
        right: 1%;
      }
    }
  `}</style>
            </div>



            {/* Gallery */}
            <div className="p-2 mt-4 pb-0 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/1 sm:w-full pl-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-xl md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Gallery
                      </span>
                      <div><h2 class="lg:text-5xl md:text-3xl sm:text-base text-justify text-black-600" style={{ fontFamily: "Abril Fatface" }}>
                        <h3 className='text-5xl pt-2' style={{ fontFamily: "Abril Fatface" }}>
                          {projectViewDetails?.projectName} Images
                        </h3><span>

                        </span>
                      </h2>
                      </div>
                      <Gallery images={projectGallery} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* project Facilities */}

            <div className="p-2 pl-2 mt-2 pb-2 h-fit mb-4" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/1 sm:w-full pl-4 text-black flex flex-col justify-center items-start" >
                      <span className="lg:text-xl md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Project Facilities
                      </span>
                      <div><h2 class="lg:text-5xl md:text-3xl sm:text-base text-justify text-black-600" style={{ fontFamily: "Abril Fatface" }}>
                        <h3 className='text-5xl pt-2' style={{ fontFamily: "Abril Fatface" }}>
                          {projectViewDetails?.projectName} Ameniteis
                        </h3><span>

                        </span>
                      </h2>
                      </div>
                      <section className="w-full mb-2">
                        <div className="pt-4 rounded-lg relative" >

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                            {Amenities?.map((project, idx) => {
                              const groupIndex = Math.floor(idx / 4);
                              const isEvenGroup = groupIndex % 2 === 0;
                              const backgroundColor =
                                isEvenGroup
                                  ? idx % 2 === 0
                                    ? '#e8e8e8'
                                    : '#4F8BA9'
                                  : idx % 2 === 0
                                    ? '#4F8BA9'
                                    : '#e8e8e8';


                              const Textcolor =
                                isEvenGroup
                                  ? idx % 2 === 0
                                    ? '#263238'
                                    : '#e8e8e8'
                                  : idx % 2 === 0
                                    ? '#e8e8e8'
                                    : '#263238';

                              return (
                                <div
                                  key={idx}
                                  className="relative m-auto w-full p-2 max-w-lg flex flex-col overflow-y-auto rounded-lg border border-gray-200 transition-transform duration-200 hover:scale-105 overflow-hidden  "
                                  style={{
                                    backgroundColor: backgroundColor,
                                    color: Textcolor,
                                  }}
                                >
                                  <div className="flex-grow flex justify-end">
                                    <Dynamicsvg text={project} />
                                  </div>
                                  <span
                                    className="text-3xl h-20 flex items-end"
                                    style={{
                                      fontFamily: 'Abril Fatface',
                                    }}
                                  >
                                    {project}
                                  </span>
                                </div>


                              );
                            })}
                          </div>

                          {filteredProjects.length > 4 && (
                            <div className="flex justify-end mt-2">
                              {/* Center the button */}
                              {/* <button
                                onClick={() => setShowAllProjects((prev) => !prev)}
                                className="rounded-md bg-[#012E29] px-4 py-2 text-white text-sm sm:text-base transition duration-200"
                              >
                                {showAllProjects ? 'View Less' : 'View More'}
                              </button> */}
                            </div>
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* we build the best */}
            <div className="pt-0 h-auto md:h-screen">
              <div className="flex flex-col md:flex-row justify-center items-stretch rounded h-full">
                {/* Image Section */}
                <div className="w-full md:w-1/2 overflow-hidden flex items-center">
                  {projectViewDetails?.project_locationImage?.url && (
                    <img
                      src={projectViewDetails.project_locationImage.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-[calc(70vh)] sm:h-[calc(80vh)] md:h-screen object-fit"
                    />
                  )}
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start" >
                  <span className="lg:text-3xl md:text-2xl sm:text-base text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <LineIcon />
                    </span>
                    Location Map
                  </span>

                  <div className="mt-4">
                    <h2
                      style={{ fontFamily: "Abril Fatface" }}
                      className="text-4xl sm:text-5xl md:text-6xl"
                    >
                      Connectivity of
                    </h2>
                    <h2
                      style={{ fontFamily: "Abril Fatface" }}
                      className="mt-2 text-5xl sm:text-6xl md:text-7xl"
                    >
                      {projectViewDetails.projectName}
                    </h2>
                  </div>

                  <div className="mt-10 md:mt-20">
                    {/* Lists */}
                    {projectRedefine_Connectivity?.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
                        {projectRedefine_Connectivity.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {projectRedefine_Entertainment
                      ?.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
                          {projectRedefine_Entertainment
                            .map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      )}
                    {projectRedefine_Business
                      ?.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
                          {projectRedefine_Business
                            .map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      )}
                    {projectRedefine_Education?.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg">
                        {projectRedefine_Education.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}

                  </div>
                </div>
              </div>
            </div>

            {/* Master plan */}
            <div className="p-0 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-2xl md:text-base sm:text-base text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />
                        </span>
                        Site Plan
                      </span>

                      <div className="mt-4">
                        <h2
                          style={{ fontFamily: "Abril Fatface" }}
                          className="text-4xl sm:text-5xl md:text-6xl"
                        >
                          Master Plan of
                        </h2>
                        <h2
                          style={{ fontFamily: "Abril Fatface" }}
                          className="mt-2 text-5xl sm:text-6xl md:text-7xl"
                        >
                          {projectViewDetails.projectName}
                        </h2>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 overflow-hidden flex items-center ">
                      {projectViewDetails?.highlightImage?.url && (
                        <img
                          src={projectViewDetails.highlightImage.url}
                          alt={`${projectViewDetails.projectName}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Builder */}
            <div className="p-6 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    
                    <div className="w-full md:w-1/1 sm:w-full p-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-2xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Builder
                      </span>
                      <div>
                        <h2 style={{ fontFamily: "Abril Fatface" }} class="lg:text-5xl md:text-2xl sm:text-base text-justify text-black-600">
                          About {projectViewDetails.builderName}
                        </h2>
                        <div className="text-justify text-gray-700 m-0 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg pt-0">
                          <p className="leading-relaxed mt-4">
                            <div dangerouslySetInnerHTML={{ __html: builderdescription }} />
                          </p>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </div>

            {/* Related property */}

            <div className="p-6 pb-2 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/1 sm:w-full pl-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-xl md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Others
                      </span>
                      <div><h2 class="lg:text-5xl md:text-3xl sm:text-base text-justify text-black-600" style={{ fontFamily: "Abril Fatface" }}>
                        Properties by {projectViewDetails?.projectName}
                      </h2>
                      </div>
                      <section className="w-full  mb-2">
                        <div className="pt-4 rounded-lg relative">
                          {/* Background color and padding */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
                            {projectsToShow.map((project, idx) => (
                              <div
                                key={idx}
                                className="relative m-auto w-full p-3 max-w-lg flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-200 hover:scale-105"
                              >
                                <span className="relative flex h-40 overflow-hidden rounded-t-lg cursor-pointer">
                                  <Link to={`/${project.project_url}/`} target="blank">
                                    <img
                                      className="object-cover w-full h-full"
                                      src={project.frontImage && project.frontImage.url} alt={projectViewDetails.projectName}
                                    />
                                  </Link>
                                  <div className="absolute top-2 right-2"
                                    onClick={() => handleShare(project)}                    >
                                    <ShareFrameIcon />
                                  </div>
                                </span>

                                <div className="p-2">
                                  <div className="mt-2 flex items-start justify-between">
                                    {/* Left section for project name and price */}
                                    <div className="flex flex-col items-start">
                                      <h5 className="tracking-tight text-center text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-gray-700 mb-0">
                                        {project.projectName}
                                      </h5>
                                      <h5 className="tracking-tight text-center text-sm sm:text-base md:text-lg lg:text-xs xl:text-xs text-gray-700 mb-0">
                                        {project.city}, {project.state}
                                      </h5>
                                      <span className="text-xl font-bold text-gray-900 text-center">
                                        <span className="mr-1">₹</span>
                                        {project.minPrice < 1 ? (
                                          <span>{project.minPrice * 100} L</span>
                                        ) : (
                                          <span>{project.minPrice} Cr </span>
                                        )}
                                        - {project.maxPrice} Cr
                                      </span>
                                    </div>

                                    {/* Right section for the arrow icon */}
                                    <span className="bg-[#012E29] h-auto px-1 mt-3 py-1 rounded-md flex justify-center items-center">
                                      <Link to={`/${project.project_url}/`} target="blank">
                                        <ArrowIcon />
                                      </Link>
                                    </span>
                                  </div>

                                </div>
                              </div>
                            ))}
                          </div>

                          {filteredProjects.length > 4 && (
                            <div className="flex justify-end mt-2">
                              {" "}
                              {/* Center the button */}
                              {/* <button
                                onClick={() => setShowAllProjects((prev) => !prev)}
                                className="rounded-md bg-[#012E29] px-4 py-2 text-white text-sm sm:text-base transition duration-200" // Use relative positioning
                              >
                                {showAllProjects ? "View Less" : "View More"}
                              </button> */}
                            </div>
                          )}
                        </div>
                      </section>

                    </div>



                  </div>
                </div>
              </div>
            </div>

            {/* contact us */}

            <section className="bg-[#263238] text-white py-10 px-5 sm:px-10">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col justify-center space-y-4">
                  <span className="lg:text-xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <WhiteLineIcon />{" "}
                    </span>
                    {" "}Contact
                  </span>
                  <h3 className="text-4xl sm:text-5xl" style={{ fontFamily: "Abril Fatface" }}>Make an Enquiry</h3>
                  <p className="text-lg flex items-center space-x-2">
                    <a
                      href="tel:+918527134491"
                      className="flex items-center justify-center text-white text-3xl"
                    >
                      <span className="text-2xl"><PhoneIcon /></span>
                      <span className="text-2xl">+91 8527-134-491</span>
                    </a>
                  </p>
                </div>

                {/* Right Section - Form */}
                <div className="p-8 rounded-lg shadow-lg">
                  <form className="space-y-5">
                    <div>
                      <label htmlFor="name" className="sr-only">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={userDetails.name}
                        required
                        placeholder="Enter Your Name*"
                        className="w-full px-4 py-3 rounded-lg bg-[#263238] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/5">
                        <label htmlFor="country-code" className="sr-only">Country Code</label>
                        <input
                          type="text"
                          id="country-code"
                          value="+91"
                          disabled
                          className="w-full px-4 py-3 rounded-lg bg-[#263238] text-white border border-gray-600 outline-none"
                        />
                      </div>
                      <div className="w-4/5">
                        <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                        <input
                          type="text"
                          name="mobile"
                          value={userDetails.mobile}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only numbers and ensure length is between 9 and 10 digits
                            if (/^\d*$/.test(value) && value.length <= 10) {
                              handleChange(e);
                            }
                          }}
                          required
                          placeholder="Contact Number*"
                          className="w-full px-4 py-3 rounded-lg bg-[#263238] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                        />

                        {userDetails.mobile && userDetails.mobile.length < 10 && (
                          <p className="text-red-500 text-sm">Mobile number must be at least 10 digits.</p>
                        )}


                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        value={userDetails.email}
                        onChange={(e) => {
                          const { name, value } = e.target;

                          // Update the userDetails state
                          setUserDetails((prev) => ({ ...prev, [name]: value }));

                          // Email validation logic
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
                          if (!emailRegex.test(value) && value !== "") {
                            setEmailError("Invalid email address"); // Display error if invalid
                          } else {
                            setEmailError(""); // Clear error if valid
                          }
                        }}
                        placeholder="Enter Your Email*"
                        className="w-full px-4 py-3 rounded-lg bg-[#263238] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                      />

                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                    </div>

                    {userResponseMessage && (
                      <p className="text-white text-[12px] ">{userResponseMessage}</p>
                    )}
                    <button
                      onClick={userSubmitDetails}
                      className="w-full bg-white hover:bg-blue-600 text-[#263238] font-semibold py-3 rounded-lg transition duration-200"
                    >
                      {userButtonText} <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </section>

          </>
        </Wrapper>

      </div>
    </>
  );
};

export default NewBanner;

const Wrapper = styled.section`
  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-90deg) translate(0, -20px);
    -webkit-transform: rotate(-90deg) translate(0, -20px);
    transform: rotate(-90deg) translate(0, -20px);
    position: relative;
    right: -85px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
  }

  .Carousel {
    max-height: 600px; /* Set your desired maximum height */
  }

  @media screen and (max-width: 768px) {
    .Carousel {
      max-height: 300px; /* Adjust for smaller screens */
    }
  }

  .pdf-dwn a {
    color: #000;
    text-decoration: none;
  }

  .pdf-dwn .dwn-text:hover {
    color: #fff;
    text-decoration: none;
    border: 2px solid #fbea08;
    background-color: #f5070b;
    transition: all 1s ease-in-out;
  }

  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-90deg) translate(0, -20px);
    -webkit-transform: rotate(-90deg) translate(0, -20px);
    transform: rotate(-90deg) translate(0, -20px);
    position: relative;
    right: -85px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
  }

  //Whtsapp Icon CSS

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 20px;
    right: 8px;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #47c355; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }
`;