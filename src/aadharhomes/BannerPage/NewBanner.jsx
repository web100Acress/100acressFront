import { Button, Collapse, message } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  format, isValid, parseISO } from "date-fns";
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
  LineIcon,
  WhiteLineIcon,
  ShareFrameIcon,
  ForwardIcon,
  BackwardIcon,
  ScrollIcon,
} from '../../Assets/icons';
import { DataContext } from '../../MyContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dynamicsvg from './Dynamicsvg';
import Api_Service from '../../Redux/utils/Api_Service';
const NewBanner = () => {
  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [builderName, setBuilderName] = useState([]);
  const { project } = useContext(DataContext);
  const slideRefs = useRef(null);
  const gallerySlideRefs = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [userButtonText, setUserButtonText] = useState("Submit");
  const [instantcallbackmodal, setInstantCallbackmodal] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [sideButtonText, setSideButtonText] = useState("Submit");
  const [sideResponseMessage, setSideResponseMessage] = useState("");
  const [isModalOpenFloor, setIsModalOpenFloor] = useState(false);
  const [selectedImagefloor, setSelectedImagefloor] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [PopUpbuttonText, setPopUpButtonText] = useState("Submit");
  const [PopUpresponseMessage, setPopUpResponseMessage] = useState("");
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const [modalImageGallery, setModalImageGallery] = useState(null);
  const {getProjectbyBuilder} = Api_Service();
  const [builderProject, setBuilderProject] = useState([]); 
  const [error, setError] = useState(null);
  const query = projectViewDetails?.builderName ;
  const pUrlRef = useRef(pUrl);
  const navigate = useNavigate();


  function debouncedHandleSubmit(func,timeout=500){
    let timer;
    return function(...args){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        func.apply(this,args);
      },timeout);
    }
  }

  useEffect(() => {

    if (pUrlRef.current !== pUrl) {
      pUrlRef.current = pUrl; 
    }
  }, [pUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedResult = await getProjectbyBuilder(query, 0);
        setBuilderProject(fetchedResult);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [query]);

  // Handle carousel scroll events and auto-scroll
  useEffect(() => {
    const container = document.querySelector('.flex.overflow-x-auto');
    if (container && projectViewDetails?.projectGallery?.length > 1) {
      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const currentIndex = Math.round(scrollLeft / containerWidth);
        setGalleryCurrentIndex(currentIndex);
      };
      
      const handleUserInteraction = () => {
        setIsAutoScrolling(false);
        // Resume auto-scroll after 3 seconds of no interaction
        setTimeout(() => setIsAutoScrolling(true), 3000);
      };
      
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('touchstart', handleUserInteraction);
      container.addEventListener('mousedown', handleUserInteraction);
      
      // Auto-scroll functionality
      const autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
          const nextIndex = (galleryCurrentIndex + 1) % projectViewDetails.projectGallery.length;
          container.scrollTo({
            left: nextIndex * container.offsetWidth,
            behavior: 'smooth'
          });
          setGalleryCurrentIndex(nextIndex);
        }
      }, 2000); // 1 second interval
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('touchstart', handleUserInteraction);
        container.removeEventListener('mousedown', handleUserInteraction);
        clearInterval(autoScrollInterval);
      };
    }
  }, [projectViewDetails?.projectGallery, galleryCurrentIndex, isAutoScrolling]);


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

  const set = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, sliderImages.length),
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

  const gallerySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disabled autoplay for debugging
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
        className={`rounded-full space-x-2 mt-4${i === galleryCurrentIndex
          ? "bg-gray-800 h-2 w-5"
          : "bg-gray-400 h-3 w-3"
          }`}
      ></button>
    ),
    afterChange: (index) => setGalleryCurrentIndex(index),
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pUrl) {
          console.error('Url is undefined or empty.');
          return;
        }

        const response = await axios.get(
          `https://api.100acress.com/project/View/${pUrl}`
        );
        if(response.data.dataview.length === 0){
          navigate("/")
        }
        const projectData = response?.data?.dataview?.[0];
        if (projectData) {
          setProjectViewDetails(projectData);
          setBuilderName(projectData.builderName);

          const message = encodeURIComponent(
            `Hello, I am interested in ${projectData.projectName} ${projectData.city} ${projectData.state}.`
          );

          const whatsappLink = `https://wa.me/918527134491?text=${message}`;
          document.querySelector(".dd-m-whatsapp").href = whatsappLink;
        } else {
          console.error('No project data found.');
        }
      } catch (error) {
        console.error('Error fetching Project Data:', error);
      }
    };
    fetchData();
  }, [pUrl]);



  let description = projectViewDetails?.project_discripation || "";

  let builderdescription = projectViewDetails?.AboutDeveloper || "";

  const linkRegex =
    /<a\s+href="([^"]+)"\s+style="color:black"\s*target="_blank"\s*><\/a>/;

  const linkText = projectViewDetails?.projectName;

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
    return format(date, "MMM, yyyy");
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


  const openModalGallery = (image) => {
    setModalImageGallery(image);
    setIsModalOpenGallery(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalGallery = () => {
    setIsModalOpenGallery(false);
    setModalImageGallery(null);
    document.body.style.overflow = "auto";
  };

  const openModalfloor = (image) => {
    setSelectedImagefloor(image);
    setIsModalOpenFloor(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalfloor = () => {
    setIsModalOpenFloor(false);
    setSelectedImagefloor(null);
    document.body.style.overflow = "auto";
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

  const popSubmitDetails = useCallback( async (e) => {
    e.preventDefault();
    if (isLoading1) {
      return;
    }

    const { mobile } = popDetails;

    if (/^([+]\d{2})?\d{10}$/.test(mobile)) {
      setPopUpButtonText("Submitting...");
      message.success("Callback Requested Successfully");
      try {
        setIsLoading1(true);
        await axios.post("https://api.100acress.com/userInsert", {
          ...popDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setPopUpResponseMessage("Callback Requested Successfully");
        resetData1();
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading1(false);
        setPopUpButtonText("Submit");
      }
    } else {
      message.error("Please enter a valid mobile number");
      setPopUpResponseMessage("Please fill in the data");
    }
  }, [isLoading1, popDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

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

  const handleShare = (project) => {

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
      alert("Share functionality is not supported on this device/browser.");
    }
  };
  const userSubmitDetails = useCallback( (e) => {
    e.preventDefault();

    if (isLoading2) {
      return;
    }

    const { mobile } = userDetails;

    if (mobile) {
      setIsLoading2(true);
      setUserButtonText("Submitting...");
      if(/^([+]\d{2})?\d{10}$/.test(mobile)){
        message.success("Callback Requested Successfully");
        resetData();
        setUserButtonText("Submit");
        setIsLoading2(false);
        axios
        .post("https://api.100acress.com/userInsert", {
          ...userDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        })
        .then((res) => {
          // setSideResponseMessage("Callback Requested Successfully");
          message.success("Callback Requested Successfully");
          resetData();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          setUserButtonText("Submit");
        });
      }
      message.error("Please enter a valid mobile number");
      setIsLoading2(false);
      setUserButtonText("Submit");
    } else {
      message.error("Please fill in the details");
    }
  },[isLoading2, userDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

  const SideSubmitDetails = useCallback( async (e) => {
    e.preventDefault();
    if (isLoading2) {
      return;
    }
    const { mobile } = sideDetails;

    if (/^([+]\d{2})?\d{10}$/.test(mobile)) {
      setIsLoading2(true);
      setSideButtonText("Submitting...");
      message.success("Callback Requested Successfully");
      resetData2();
      setIsLoading2(false);
      setSideButtonText("Submit");

      try {
        await axios.post("https://api.100acress.com/userInsert", {
          ...sideDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setInstantCallbackmodal(false)
        message.success("Callback Requested Successfully");
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
  },[isLoading2, sideDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

  const debouncedPopSubmit = useCallback(
    debouncedHandleSubmit(popSubmitDetails, 500),
    [popSubmitDetails]
  );
  
  const debouncedSideSubmit = useCallback(
    debouncedHandleSubmit(SideSubmitDetails, 500),
    [SideSubmitDetails]
  );

  const filterProjectsByBuilder = () => {
    const normalizedBuilderName =
      typeof builderName === "string" ? builderName.trim().toLowerCase() : "";

    return project.filter(
      (p) => p.builderName.trim().toLowerCase() === normalizedBuilderName
    );
  };

  const filteredProjects = filterProjectsByBuilder();
  const projectsToShow = showAllProjects
    ? builderProject
    : builderProject.slice(0, 4);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timeOutId);
  }, []);

  const text = [
    {
      title: `What is the exact Location of ${projectViewDetails?.projectName}`,
      content: `${projectViewDetails?.projectName} is strategically located in  ${projectViewDetails?.projectAddress}, ${projectViewDetails?.city}. A well-connected and rapidly developing ${projectViewDetails?.projectOverview} hub .`,
    },
    {
      title: `What is the expected possession date for  ${projectViewDetails?.projectName} ${projectViewDetails.city} `,
      content: `${projectViewDetails.projectName} is a ${projectViewDetails?.project_Status} project with possession scheduled for ${formatDate(projectViewDetails?.possessionDate)}.`,
    },
    {
      title: `How can I verify the RERA approval status of ${projectViewDetails?.projectName}`,
      content: `You can verify the RERA registration status of ${projectViewDetails?.projectName} by visiting the official state RERA website. The project is registered under RERA with the number ${projectViewDetails?.projectReraNo}.`,
    },
    {
      title: `Who is the developer of ${projectViewDetails?.projectName} ${projectViewDetails.city}`,
      content: `${projectViewDetails?.projectName} is developed by ${projectViewDetails?.builderName}, a renowned real estate developer known for delivering premium residential and commercial projects across India.`,
    },
    {
      title: `What types of BHK units are available in  ${projectViewDetails?.projectName} ${projectViewDetails?.projectAddress}`,
      content: ` ${projectViewDetails?.projectName} offers thoughtfully designed ${projectViewDetails.BhK_Details?.map((data)=>(` ${data.bhk_type}`))} ${projectViewDetails?.projectOverview !== "none" ? ` ${projectViewDetails.projectOverview} floors` : ""} units, catering to moder lifestyle needs.`,  
    },

  ]
  
;

const items =text.map((item, index) => ({
  key: index + 1,
  label: ` ${item.title} ?`,
  children: <p>{item.content}</p>,
}))

  return (
      <div>
        <Wrapper className="section" style={{ overflow: "hidden", overflowX: "hidden" }}>
          <Helmet>
            <title>{projectViewDetails?.meta_title}</title>
            <meta
              name="description"
              content={projectViewDetails.meta_description}
            />
            <meta property="og:title" content={projectViewDetails?.meta_title} />
            <meta property="og:site_name" content="100acress.com" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={projectViewDetails?.frontImage?.url} />
            <meta property="og:url" content="https://www.100acress.com/" />
            <meta property="og:description" content={projectViewDetails.meta_description} />
            <meta name="twitter:title" content={projectViewDetails?.meta_title} />
            <meta name="twitter:description" content={projectViewDetails.meta_description} />
            <meta property="twitter:url" content="https://www.100acress.com/" />
            <meta property="twitter:image" content={projectViewDetails?.frontImage?.url} />
            <meta name="twitter:card" content="summary"></meta>
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
                paddingTop: "10px",
                paddingBottom: '10px'
              }}
            >
              <img
                src={projectViewDetails?.logo?.url}
                style={{ height: "40px", width: "200px" }}
                alt={projectViewDetails.projectName}
                loading="lazy"
              />

              {/* "#e8e8e8"
                                    : "#4F8BA9" */}
              <div className="flex items-center justify-end space-x-4 w-full">
                <button
                  onClick={handleShowInstantcallBack}
                  className="mr-0 mt-0 hidden sm:block border border-gray-600 px-3 py-1 rounded-lg"
                >
                  Get a Callback
                </button>
                <a className="animate-fadeInRight " href={`tel:${projectViewDetails?.mobileNumber || "9811750130"}`}>
                  <button className="bg-[#4F8BA9] py-0 px-3 rounded-lg text-white text-2xl flex items-center">
                    <PhoneIcon className="mr-2" />
                    {projectViewDetails?.mobileNumber || '\u00A0' + "9811750130"}
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
                    <div className="relative w-[19rem] sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-t-2xl bg-[#263238] shadow-lg max-w-lg">
                      <div className="bg-radial-custom px-5 py-2 text-center text-white relative">
                        <p className="font-serif text-xl mb-0 text-center font-semibold tracking-wider">
                          Instant Callback
                        </p>
                        <button
                          className="text-gray-800 text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
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
                            type="tel"
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
                        <p className='text-xs text-gray-300'> * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>


                        {sideResponseMessage && (
                          <p className="text-grey text-[12px] mb-0">
                            {sideResponseMessage}
                          </p>
                        )}

                        <div className="flex justify-center">
                          <button
                            className="group mt-2 w-full md:w-auto rounded-md bg-[#263238] px-10 py-2 font-semibold text-white border border-gray-600 outline-none relative overflow-hidden transition-all duration-500 hover:pr-10 flex items-center justify-center"
                            onClick={debouncedSideSubmit}
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
                  <div className="relative w-[19rem] sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-2xl bg-[#263238] shadow-lg max-w-lg">
                    <div className="bg-radial-custom px-5 py-2 text-center text-white relative">
                      <p className="font-serif text-xl mb-0 text-center font-semibold tracking-wider">
                        Instant Callback
                      </p>
                      <button
                        className="text-gray-800 text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
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
                          type="tel"
                          name="mobile"
                          placeholder="Enter your Mobile No"
                          required
                          value={popDetails.mobile}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only numbers and ensure length is between 9 and 10 digits
                            handlePopChange(e);
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
                      <p className='text-xs text-gray-300'> * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>

                      {PopUpresponseMessage && (
                        <p className="text-grey text-[12px] mb-0">
                          {PopUpresponseMessage}
                        </p>
                      )}
                      <div className="flex justify-center">
                        <button
                          className="group mt-2 w-full md:w-auto rounded-md bg-[#263238] px-10 py-2 font-semibold text-white border border-gray-600 outline-none relative overflow-hidden transition-all duration-500 hover:pr-10 flex items-center justify-center"
                          onClick={debouncedPopSubmit}
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

{/* successulll updated */}
            {/* mainImage */}
            <div className="w-full mt-8 md:mt-12 lg:mt-14 bg-cover bg-no-repeat text-center">
              <div className="w-full relative overflow-hidden object-cover">
                {frontImage?.url && (
                  <img
                    className="w-full object-contain"
                    src={frontImage.url}
                    alt={projectViewDetails.projectName}
                  />
                )}
                {/* New Div Positioned Below the Image on Mobile */}
                <div
                  className="absolute top-2/4 right-[70px] transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-6 rounded-lg shadow-lg z-[20] hidden lg:block md:block "
                >
                  <h1 className="text-2xl mb-2 font-AbrialFatFace">
                    {projectViewDetails.projectName}
                  </h1>
                  <p className="text-sm font-medium flex mb-4 text-center justify-center">
                    <LocationSmallIcon className="mr-2" />
                    {projectViewDetails?.projectAddress}, {projectViewDetails?.city}
                  </p>
                  <ul className="list-disc text-left " style={{ listStyleType: "none" }}>
                    {projectViewDetails.type === "Residential Flats" && <li className="relative pl-6 before:absolute before:content-['✔'] before:-left-4 before:text-green-500">{projectViewDetails.towerNumber} Towers</li>}
                    <li className="relative pl-6 before:absolute before:content-['✔'] before:-left-4 before:text-green-500"> {projectViewDetails.totalUnit} Units</li>
                    <li className="relative pl-6 before:absolute before:content-['✔'] before:-left-4 before:text-green-500">{projectViewDetails.totalLandArea} Acres of Land</li>
                    {projectViewDetails.paymentPlan && (
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:-left-4 before:text-green-500">Payment Plan {projectViewDetails.paymentPlan}</li>
                    )}

                  </ul>
                  <button onClick={handleShowInstantcallBack} className="bg-white text-black text-xl py-2 px-4 rounded shadow hover:bg-gray-100 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
                    Schedule Site Visit
                  </button>
                </div>
                {/* <div
                    className="absolute top-2/4 right-[70px] transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-6 rounded-lg shadow-lg z-[20] hidden lg:block"
                  >
                    <h1
                      
                      className="text-xl mb-2 text-center"
                    >
                      {projectViewDetails.projectName}
                    </h1>
                    <p className="text-sm font-medium flex justify-center items-center mb-4 text-center">
                      <LocationSmallIcon className="mr-2" />
                      {projectViewDetails?.projectAddress}, {projectViewDetails?.city}
                    </p>
                    <ul className="space-y-2 text-left">
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:left-0 before:text-green-500">
                        {projectViewDetails.totalLandArea} Acres
                      </li>
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:left-0 before:text-green-500">
                        {projectViewDetails.towerNumber} Tower - {projectViewDetails.totalUnit} Unit
                      </li>
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:left-0 before:text-green-500">
                        {projectViewDetails.BhK_Details[0].bhk_Area} to{" "}
                        {
                          projectViewDetails.BhK_Details[
                            projectViewDetails.BhK_Details.length - 1
                          ].bhk_Area
                        }{" "}
                        Unit Size
                      </li>
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:left-0 before:text-green-500">
                        {projectViewDetails.BhK_Details[0].bhk_type} to{" "}
                        {
                          projectViewDetails.BhK_Details[
                            projectViewDetails.BhK_Details.length - 1
                          ].bhk_type
                        }{" "}
                        Unit type
                      </li>
                      <li className="relative pl-6 before:absolute before:content-['✔'] before:left-0 before:text-green-500">
                        {formatDate(projectViewDetails.possessionDate)}
                      </li>
                    </ul>
                    <button
                      onClick={handleShowInstantcallBack}
                      className="bg-white text-black font-medium py-2 px-4 rounded shadow hover:bg-gray-100"
                    >
                      Schedule Site Visit
                    </button>
                  </div> */}

                {/* New Div Below the Image on Mobile */}
                <div className="lg:hidden md:hidden mt-0 bg-black bg-opacity-80 text-white p-4 shadow-lg">
                  <h1 className="text-2xl font-AbrialFatFace mb-2">
                    {projectViewDetails.projectName}
                  </h1>
                  <p className="text-sm font-medium flex mb-4 text-center justify-center">
                    <LocationSmallIcon className="mr-2" />
                    {projectViewDetails?.projectAddress}, {projectViewDetails?.city}
                  </p>
                  <ul className="list-disc text-left" style={{ listStyleType: "none" }}>

                  </ul>
                  <button onClick={handleShowInstantcallBack} className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 bg-white text-black font-medium py-2 px-4 rounded shadow hover:bg-gray-100">
                    Schedule Site Visit
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-[#4F8BA9]">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
                {/* Acres Section */}
                <section className="text-white px-4 py-1 rounded-md flex justify-center items-center flex-col">
                  <AcresIcon className="mr-2" />
                  <div className='mt-2 text-center'>
                    <span className="text-2xl font-AbrialFatFace">
                      {projectViewDetails.totalLandArea} Acres
                    </span>
                    <h6 className='text-sm'>Land Area</h6>
                  </div>
                </section>

                {/* Possession Section */}
                <section className="text-white px-4 py-1 rounded-md flex justify-center items-center flex-col">
                  <TowerIcon className="mr-2" />
                  <div className='mt-2 text-center'>
                    <span className="text-2xl font-AbrialFatFace" >
                      {formatDate(projectViewDetails.possessionDate)}
                    </span>
                    <h6 className='text-sm'>Possession</h6>
                  </div>
                </section>

                {/* About Project Section */}
                <section className="text-white px-4 py-1 rounded-md flex justify-center items-center flex-col">
                  <CalenderIcon className="mr-2" />
                  <div className='mt-2 text-center'>
                    <span className="text-2xl font-AbrialFatFace">
                      {projectViewDetails.type === "Residential Flats" && `${projectViewDetails.towerNumber} Tower -`}{" "}
                      {projectViewDetails.totalUnit} Unit
                    </span>
                    <h6 className='text-xs'>About Project</h6>
                  </div>
                </section>

                {/* Price Section */}
                <section className=" text-white px-4 py-1 rounded-md flex justify-center items-center flex-col">
                  <PriceIcon className="mr-2" />
                  <div className='mt-2 text-center'>
                  {
                    !projectViewDetails?.minPrice || !projectViewDetails?.maxPrice ? <span className='font-AbrialFatFace text-2xl'>
                      Call For Price
                    </span> : (
                      <span className="text-2xl font-AbrialFatFace" >
                        {projectViewDetails.minPrice < 1 ? (
                          <span style={{ fontFamily: "Abril Fatface" }}>{(projectViewDetails?.minPrice * 100).toFixed()} L{" "}</span>
                        ) : (
                          <span className='font-AbrialFatFace' >{projectViewDetails.minPrice} Cr {" "}</span>
                        )}
                        - {projectViewDetails.maxPrice} Cr
                      </span>
                    )
                  }

                  <h6 className='text-sm'>Price</h6>
                </div>
              </section>


              </div>
            </div>


            {/* about project */}
            <div className="pt-0 h-auto md:h-screen">
              <div className="flex flex-col md:flex-row justify-center items-stretch h-auto">
                {/* Image Section */}
                <div className="w-full md:w-1/2 overflow-hidden flex items-center">
                  {projectViewDetails?.highlightImage?.url && (
                    <img
                      src={projectViewDetails?.projectGallery[0]?.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-[50vh] sm:h-[60vh] md:h-full object-cover rounded-tr-[70px] rounded-bl-[50px]"
                    />
                  )}
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start">
                  <span className="lg:text-lg md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <LineIcon />
                    </span>
                    About Project
                  </span>

                  <h2
                    className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                    
                  >
                    {projectViewDetails.projectName}
                  </h2>

                  <div className="text-justify text-gray-700 mt-3 md:mt-5 lg:mt-8 xl:mt-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl overflow-y-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px]">
                    <div className="leading-relaxed">
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* higthlight? */}
            <div className="pt-1 h-auto md:h-screen">
              <div className="flex flex-col md:flex-row justify-center items-stretch h-auto">
                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 text-black flex flex-col justify-center items-start">
                  <span className="lg:text-lg md:text-xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <LineIcon />
                    </span>
                    Highlights
                  </span>

                  <h2
                    className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                    
                  >
                    {projectViewDetails.projectName}
                  </h2>

                  <div className="text-justify text-gray-700 mt-3 md:mt-5 lg:mt-8 xl:mt-10 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl overflow-y-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px]">
                    {/* Highlights List */}
                    {highlight &&
                      Array.isArray(highlight) &&
                      highlight.length > 0 &&
                      highlight.map((item, index) => (
                        <ul className="list-disc" style={{ listStyleType: "circle" }} key={index}>
                          <li className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                            {item.highlight_Point}
                          </li>
                        </ul>
                      ))}
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex items-center overflow-hidden">
                  {projectViewDetails?.highlightImage?.url && (
                    <img
                      src={projectViewDetails?.highlightImage?.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-[50vh] sm:h-[60vh] md:h-[60vh] object-cover rounded-tr-[40px] md:rounded-tr-[70px] rounded-bl-[30px] md:rounded-bl-[50px]"
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
                      <h4
                        
                        className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                      >
                        {projectViewDetails.projectName}
                        <span className="block font-AbrialFatFace sm:inline"> Size & Price</span>
                      </h4>


                    </div>
                  </div>
                  <div className="mt-4 mx-4">
                    <div className="flex flex-col w-full border-black border border-black-700">
                      <div className="flex flex-shrink-0 bg-[#4F8BA9] text-white ">
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
                                  <Button className="w-20 sm:w-32" onClick={handleShowInstantcallBack}>Get Details</Button>
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

           { projectViewDetails.project_floorplan_Image?.length !== 0 && ( <>
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
                        <h4
                          
                          className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                        >
                          {projectViewDetails.projectName}
                          <span className="block font-AbrialFatFace sm:inline"> Floor Plan</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          
            <div className='pl-6 h-fit'>
              <article className="article">
                <div className="relative">
                  {sliderImages &&
                    Array.isArray(sliderImages) &&
                    sliderImages.length > 0 && (
                      <>
                        <button
                          onClick={() => slideRefs.current.slickPrev()}
                          className="absolute top-1/2 lg:top-1/2 sm:top-1/2 left-5 transform -translate-y-1/2 bg-white text-gray-500 p-2 rounded-full z-10"
                        >
                          <BackwardIcon />
                        </button>
                        <button
                          onClick={() => slideRefs.current.slickNext()}
                          className="absolute top-1/2 lg:top-1/2 sm:top-1/2 right-5 transform -translate-y-1/2 text-gray-700 bg-white p-2 rounded-full z-10"
                        >
                          <ForwardIcon />
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
                            className="w-full h-auto max-h-[450px] object-fit mt-6 cursor-pointer rounded-lg"
                            onClick={() => openModalfloor(image.url)}
                          />
                          <div className="bg-[#4F8BA9] text-white w-full text-center py-2 rounded-b-lg">
                            <h4 className="text-xl font-bold">
                              {BhK_Details[index]?.bhk_type || BhK_Details[0]?.bhk_type}
                            </h4>
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
            
            </>)}



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
                      <h4
                        
                        className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                      >
                        {projectViewDetails.projectName}
                        <span className="block font-AbrialFatFace sm:inline"> Images</span>
                      </h4>

                      <div className="pt-4 p-2 max-w-screen-xxl mx-auto">

                        
                        {/* Mobile Carousel View */}
                        <div className="md:hidden">
                          {projectViewDetails?.projectGallery && Array.isArray(projectViewDetails.projectGallery) && projectViewDetails.projectGallery.length > 0 ? (
                            <div className="relative">
                              <button
                                onClick={() => {
                                  const container = document.querySelector('.flex.overflow-x-auto');
                                  if (container) {
                                    const prevIndex = galleryCurrentIndex === 0 
                                      ? projectViewDetails.projectGallery.length - 1 
                                      : galleryCurrentIndex - 1;
                                    container.scrollTo({
                                      left: prevIndex * container.offsetWidth,
                                      behavior: 'smooth'
                                    });
                                    setGalleryCurrentIndex(prevIndex);
                                  }
                                }}
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-500 p-2 rounded-full z-10 shadow-lg hover:bg-gray-100 transition-colors"
                              >
                                <BackwardIcon />
                              </button>
                              <button
                                onClick={() => {
                                  const container = document.querySelector('.flex.overflow-x-auto');
                                  if (container) {
                                    const nextIndex = (galleryCurrentIndex + 1) % projectViewDetails.projectGallery.length;
                                    container.scrollTo({
                                      left: nextIndex * container.offsetWidth,
                                      behavior: 'smooth'
                                    });
                                    setGalleryCurrentIndex(nextIndex);
                                  }
                                }}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 bg-white p-2 rounded-full z-10 shadow-lg hover:bg-gray-100 transition-colors"
                              >
                                <ForwardIcon />
                              </button>
                              {/* Simple Carousel Implementation */}
                              <div className="relative">
                                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                                  {projectViewDetails.projectGallery.map((image, index) => (
                                    <div key={index} className="flex-shrink-0 w-full snap-start p-2">
                                      <img
                                        src={image?.url}
                                        alt={`${projectViewDetails?.projectName || 'Project'} gallery ${index + 1}`}
                                        className="w-full h-auto max-h-[400px] object-cover rounded-lg cursor-pointer"
                                        onClick={() => openModalGallery(image?.url)}
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Navigation Dots */}
                                <div className="flex justify-center mt-4 space-x-1">
                                  {projectViewDetails.projectGallery.map((_, index) => (
                                    <button
                                      key={index}
                                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                        index === galleryCurrentIndex ? 'bg-gray-800' : 'bg-gray-300'
                                      }`}
                                      onClick={() => {
                                        const container = document.querySelector('.flex.overflow-x-auto');
                                        if (container) {
                                          container.scrollTo({
                                            left: index * container.offsetWidth,
                                            behavior: 'smooth'
                                          });
                                        }
                                        setGalleryCurrentIndex(index);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <p>No gallery images available</p>
                            </div>
                          )}
                        </div>

                        {/* Desktop Grid View */}
                        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {/* Display Images */}
                          {projectViewDetails?.projectGallery?.map((image, index) => (
                            <div
                              key={index}
                              className="relative"
                            >
                              <img
                                src={image?.url || image}
                                alt={projectViewDetails?.projectName || 'Project'}
                                className="w-full h-auto rounded-lg object-cover transition-transform duration-200 hover:scale-105"
                                onClick={() => openModalGallery(image?.url || image)}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Modal */}
                        {isModalOpenGallery && (
                          <div className="fixed inset-0 pt-20 bg-black bg-opacity-75 flex justify-center items-center z-50">
                            <div className="relative">
                              <button
                                onClick={closeModalGallery}
                                className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-2 rounded-full z-10"
                              >
                                &times;
                              </button>
                              <img
                                src={modalImageGallery}
                                alt={projectViewDetails.projectName}
                                className="max-w-[80vw] max-h-[80vh] object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
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
                      <h4
                        
                        className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                      >
                        {projectViewDetails.projectName}
                        <span className="block font-AbrialFatFace sm:inline"> Amenities</span>
                      </h4>
                      <section className="w-full mb-2">
                        <div className="pt-4 p-2 rounded-lg relative">
                          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                            {/* Preprocess Amenities */}
                            {(Amenities &&
                              Amenities.flatMap((item, idx) =>
                                idx === 0 && typeof item === "string"
                                  ? item.split(",").map((subItem) => subItem.trim())
                                  : item
                              )
                            )?.map((project, idx) => {
                              const groupIndex = Math.floor(idx / 6);
                              const isEvenGroup = groupIndex % 2 === 0;
                              const backgroundColor =
                                isEvenGroup
                                  ? idx % 2 === 0
                                    ? "#e8e8e8"
                                    : "#4F8BA9"
                                  : idx % 2 === 0
                                    ? "#4F8BA9"
                                    : "#e8e8e8";

                              const Textcolor =
                                isEvenGroup
                                  ? idx % 2 === 0
                                    ? "#263238"
                                    : "#e8e8e8"
                                  : idx % 2 === 0
                                    ? "#e8e8e8"
                                    : "#263238";

                              return (
                                <div
                                  key={idx}
                                  className="relative m-auto w-full p-2 max-w-lg flex flex-col rounded-lg border border-gray-200 transition-transform duration-200 hover:scale-105 overflow-hidden"
                                  style={{
                                    backgroundColor: backgroundColor,
                                    color: Textcolor,
                                  }}
                                >
                                  <div className="flex-grow flex justify-end">
                                    <Dynamicsvg text={project} />
                                  </div>
                                  <span
                                    className="text-2xl sm:text-2xl md:text-2xl h-20 flex items-end font-AbrialFatFace"
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

            <div className="p-0 h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="text-justify text-gray-700 pl-6 m-0 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg pt-0">
                      {projectViewDetails?.project_locationImage?.url && (
                        <img
                          src={projectViewDetails.project_locationImage.url}
                          alt={`${projectViewDetails.projectName}`}
                        />
                      )}
                    </div>
                    <div className="w-full md:w-1/2 pl-4  text-black flex flex-col justify-center items-start">
                      <span className="lg:text-2xl md:text-base sm:text-base text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />
                        </span>
                        Location Map
                      </span>
                      <div className="mt-0">
                        {/* <h4
                      
                      className="mt-2 text-4xl sm:text-5xl md:text-5xl"
                    >
                      {projectViewDetails.projectName}
                    </h4> */}
                        <h4
                          
                          className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                        >
                          {projectViewDetails.projectName}
                        </h4>
                        <div className="mt-3 md:mt-3 h-auto overflow-y-auto">
                          {/* Lists */}
                          {projectRedefine_Connectivity?.length > 0 && (
                            <ul className="list-disc list-inside text-sm sm:text-base md:text-lg">
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
                </div>
              </div>
            </div>

            {/* Master Plan */}
            <div className="h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">

                    <div className="w-full md:w-1/1 sm:w-full p-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-2xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Site Plan
                      </span>
                      <div>
                        <h4
                          
                          className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                        >
                          Master Plan of {projectViewDetails.projectName}
                        </h4>
                        <div className="text-justify text-gray-700 m-0 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-sm md:text-base lg:text-lg xl:text-lg pt-0">
                          {projectViewDetails?.projectMaster_plan?.url && (
                            <img
                              src={projectViewDetails.projectMaster_plan.url}
                              alt={`${projectViewDetails.projectName}`}
                            />
                          )}
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </div>

            {/* Builder */}

            <div className="h-fit" >
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
                      <h4
                        
                        className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                      >
                        About {projectViewDetails.builderName}
                      </h4>

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

            <div className="h-fit" >
               <div className="flex flex-justify-center items-stretch rounded h-auto">
                 <div className="text-black w-full flex flex-col">
                   <div className="flex flex-col md:flex-row h-full">
 
                     <div className="w-full md:w-1/1 sm:w-full p-4 text-black flex flex-col justify-center items-start">
                       <span className="lg:text-2xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                         <span className="flex items-center justify-center p-1">
                           <LineIcon />{" "}
                         </span>
                         {" "}F.A.Q
                       </span>
                       <h4
                         
                         className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                       >
                         About {projectViewDetails.projectName}
                       </h4>
 
 
                       <div className='p-8 h-fit w-full '>
                         <Collapse items={items} />
                       </div>
 
                     </div>
 
 
 
                   </div>
                 </div>
               </div>
             </div>

            {/* Related property */}

            <div className="h-fit" >
              <div className="flex flex-justify-center items-stretch rounded h-auto">
                <div className="text-black w-full flex flex-col">
                  <div className="flex flex-col md:flex-row h-full">

                    <div className="w-full md:w-1/1 sm:w-full p-4 text-black flex flex-col justify-center items-start">
                      <span className="lg:text-2xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                        <span className="flex items-center justify-center p-1">
                          <LineIcon />{" "}
                        </span>
                        {" "}Others
                      </span>
                      <h4
                        
                        className="mt-1 text-2xl sm:text-2xl md:text-4xl font-AbrialFatFace"
                      >
                        Properties by {projectViewDetails.builderName}
                      </h4>


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
                                      <h5 className="tracking-tight font-bold text-center text-sm sm:text-base md:text-sm lg:text-sm xl:text-sm text-gray-700 mb-0">
                                        {project.projectName}
                                      </h5>
                                      <h5 className="tracking-tight text-center text-sm sm:text-base md:text-lg lg:text-xs xl:text-xs text-gray-700 mb-0">
                                        {project.city}, {project.state}
                                      </h5>
                                      {
                                        !project?.minPrice && !project?.maxPrice ? <span className="text-lg font-bold text-gray-900 text-center">₹ Reveal Soon</span> :(
                                          <span className="text-lg font-bold text-gray-900 text-center">
                                          <span className="mr-1">₹</span>
                                          {project.minPrice < 1 ? (
                                            <span>{(project.minPrice * 100).toFixed(2)} L</span>
                                          ) : (
                                            <span>{project.minPrice} Cr </span>
                                          )}
                                          - {project.maxPrice} Cr
                                        </span>

                                        )
                                      }
                                     
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

                          {builderProject.length > 4 && (
                            <div className="flex justify-end mt-2">
                              {" "}
                              {/* Center the button */}
                              <button
                                onClick={() => setShowAllProjects((prev) => !prev)}
                                className="rounded-md mt-2 px-4 justify-center py-2 bg-[#263238] text-white text-sm sm:text-base ml-auto mr-auto transition duration-200"
                              >
                                {showAllProjects ? "View Less" : "View More"}
                                <span className='ml-4'>

                                  <ScrollIcon />
                                </span>
                              </button>
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

            <section className="bg-[#4F8BA9] text-white py-10 px-5 sm:px-10">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="flex flex-col justify-center space-y-4">
                  <span className="lg:text-xl md:text-2xl sm:text-base text-justify text-black-600 flex items-center justify-start space-x-2">
                    <span className="flex items-center justify-center p-1">
                      <WhiteLineIcon />{" "}
                    </span>
                    {" "}Contact
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-AbrialFatFace">Make an Enquiry</h3>
                  <p className="text-lg flex items-center space-x-2">
                    <a
                      href={`tel:${projectViewDetails?.mobileNumber  === 9811750130 ? "8527134491" : "8500900100" }`}
                      className="flex items-center justify-center text-white text-3xl"
                    >
                     <span className="text-2xl"><PhoneIcon /></span>
                      <span className="text-2xl"> &nbsp; {`${projectViewDetails?.mobileNumber  === 9811750130 ? "+91 8527-134-491" : "+91 8500 900 100" }`}</span>
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
                        className="w-full px-4 py-3 rounded-lg bg-[#4F8BA9] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                      <input
                        type="tel"
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
                        className="w-full px-4 py-3 rounded-lg bg-[#4F8BA9] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                      />

                      {userDetails.mobile && userDetails.mobile.length < 10 && (
                        <p className="text-red-500 text-sm">Mobile number must be at least 10 digits.</p>
                      )}


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
                        className="w-full px-4 py-3 rounded-lg bg-[#4F8BA9] text-white focus:ring-2 focus:ring-blue-500 border border-gray-600 outline-none"
                      />

                      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                    </div>
                    <p className='text-xs text-gray-300'> * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>
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
            <div>
              <a
                href="#"
                class="dd-m-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </div>
            <div>
              <div>

                <a href={`tel:${projectViewDetails?.mobileNumber || '9811750130'}`} class="dd-m-phone">
                  <i class="fa-solid fa-phone"></i>
                </a>

              </div>
            </div>

          </>
        </Wrapper>

        {/* Sticky Schedule Site Visit button for mobile only */}
        <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden block w-full">
          <button
            className="w-full bg-gradient-to-r from-[#4F8BA9] to-[#357ca5] text-white text-base font-semibold py-2 shadow-xl rounded-t-2xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 active:scale-95"
            onClick={handleShowInstantcallBack}
            style={{ boxShadow: '0 -2px 16px 0 rgba(79,139,169,0.18)' }}
          >
            {/* Calendar icon for 'Schedule Site Visit' */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Schedule Site Visit
          </button>
        </div>
      </div>
    
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

  /* Gallery Slider Styles */
  .gallery-slider {
    .slick-slider {
      margin: 0;
      padding: 0;
    }
    
    .slick-list {
      margin: 0;
      padding: 0;
    }
    
    .slick-slide {
      padding: 0 8px;
    }
    
    .slick-dots {
      bottom: -30px;
    }
    
    .slick-dots li button:before {
      font-size: 12px;
    }
  }

  /* Custom Carousel Styles */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .snap-x {
    scroll-snap-type: x mandatory;
  }
  
  .snap-start {
    scroll-snap-align: start;
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
    transform: rotate(-270deg) translate(0, -20px);
    position: relative;
    right: -42px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -32px;
    cursor: pointer;
  }
      .dd-m-phone {
    position: fixed;
    z-index: 999;
    bottom: 40px; // was 10px, moved up
    right: 8px;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #007bff; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-phone:hover {
    transform: rotate(0.3turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
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


  //Whtsapp Icon CSS

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 90px; // was 70px, moved up
    right: 8px;
    width: 45px;
    height: 45px;
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
   transform: rotate(0.9turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }
`;