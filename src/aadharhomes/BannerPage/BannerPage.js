import React, { useEffect, useState, useRef, useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GrPrevious, GrNext } from "react-icons/gr";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format, isValid, parseISO } from "date-fns";

import { DataContext } from "../../MyContext";
const BannerPage = () => {
  //Side Form
  const { project } = useContext(DataContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleShow = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const gallery = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [builderName, setBuilderName] = useState([]);

  const slideRefs = useRef(null);

  const set = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const resetData = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const resetData1 = () => {
    setPopDetails({
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api.100acress.com/projectView/${pUrl}`
      );
      setProjectViewDetails(res.data.dataview[0]);
      setBuilderName(res.data.dataview[0].builderName);
      // Construct the WhatsApp link with the dynamic data
      const message = encodeURIComponent(
        `Hello, I am interested in ${res.data.dataview[0].projectName} ${res.data.dataview[0].city} ${res.data.dataview[0].state}.`
      );      
      const whatsappLink = `https://wa.me/918500900100?text=${message}`;
      // Update the href attribute of the anchor tag
      document.querySelector(".dd-m-whatsapp").href = whatsappLink;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {}, [projectViewDetails]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [userButtonText, setUserButtonText] = useState("Submit");
  const [userResponseMessage, setUserResponseMessage] = useState("");
  const userSubmitDetails = (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const { mobile } = userDetails;

    if (mobile) {
      setIsLoading(true);
      setUserButtonText("Submitting...");
      axios
        .post("https://api.100acress.com/userInsert", {
          ...userDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        })
        .then((res) => {
          setUserResponseMessage("Data submitted successfully");
          resetData();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          // Set loading state to false and reset the button text when the API call is complete (success or error)
          setIsLoading(false);
          setUserButtonText("Submit");
        });
    } else {
      setUserResponseMessage("Please fill in the data");
    }
  };

  const [popDetails, setPopDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handlePopChange = (e) => {
    const { name, value } = e.target;
    setPopDetails({ ...popDetails, [name]: value });
  };

  const [isLoading1, setIsLoading1] = useState(false);
  const [PopUpbuttonText, setPopUpButtonText] = useState("Submit");
  const [PopUpresponseMessage, setPopUpResponseMessage] = useState("");
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

  const [isLoading2, setIsLoading2] = useState(false);
  const [sideButtonText, setSideButtonText] = useState("Submit");
  const [sideResponseMessage, setSideResponseMessage] = useState("");

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
        setSideResponseMessage("Data submitted successfully");
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
      setSideResponseMessage("Please fill in the data");
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, []);

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
  } = projectViewDetails;
  const sliderImages = project_floorplan_Image || [];

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 365);
  const expirationDate = tomorrow.toISOString().split("T")[0];

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = "auto"; // Restore background scroll
  };

  let description = projectViewDetails?.project_discripation || "";

  // Regular expression to find <a> tags with a URL
  const linkRegex =
    /<a\s+href="([^"]+)"\s+style="color:black"\s*target="_blank"\s*><\/a>/;

  // Define the link text you want to insert
  const linkText = projectViewDetails.projectName;

  // Replace the placeholder <a> tags with a new <a> tag containing the link text
  description = description.replace(linkRegex, (match, p1) => {
    return `<a href="${p1}" style="color:black" target="_blank">${linkText}</a>`;
  });

  const filterProjectsByBuilder = () => {
    const normalizedBuilderName =
      typeof builderName === "string" ? builderName.trim().toLowerCase() : "";

    return project.filter(
      (p) => p.builderName.trim().toLowerCase() === normalizedBuilderName
    );
  };

  const filteredProjects = filterProjectsByBuilder();
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projectsToShow = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  return (
    <Wrapper
      className="section"
      style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
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
      ${
        projectViewDetails.frontImage && projectViewDetails.frontImage.url
          ? `"image": "${projectViewDetails.frontImage.url}",`
          : ""
      }
      "location": {
        "name": "${projectViewDetails.projectAddress} ${
            projectViewDetails.city
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

          <span className="text-[#012e29] text-3xl sm:text-xl lg:text-3xl md:text-2xl sm:pt-2 md:m-2 text-right hidden lg:inline-block">
            <Link
              to={`tel:${
                projectViewDetails.mobileNumber
                  ? projectViewDetails.mobileNumber
                  : "+919811750130"
              }`}
            >
              <i className="fa-solid fa-phone"></i>{" "}
              {projectViewDetails.mobileNumber
                ? projectViewDetails.mobileNumber
                : "9811750130"}
            </Link>
          </span>

          <span className="text-[#012e29] text-lg pt-2 md:text-2xl lg:hidden block text-right">
            <Link
              to={`tel:${
                projectViewDetails.mobileNumber
                  ? projectViewDetails.mobileNumber
                  : "9811750130"
              }`}
            >
              <i className="fa-solid fa-phone"></i>
              {projectViewDetails.mobileNumber
                ? projectViewDetails.mobileNumber
                : "9811750130"}
            </Link>
          </span>
        </div>

        <div className="w-full mt-0 lg:mt-16 md:mt-10 sm:mt-24  bg-cover bg-no-repeat text-center">
          <div className="w-full overflow-hidden object-fit">
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

        {/* //PopUp Form */}

        <div className="relative">
          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-2xl bg-white shadow-lg max-w-lg">
                <div className="bg-[#012e29] px-10 py-3 text-center text-white relative">
                  <p className="font-serif text-xl mb-0 font-semibold tracking-wider">
                    Instant Callback
                  </p>
                  <button
                    className="text-white text-2xl absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  >
                    ✖
                  </button>
                </div>
                <div className="space-y-4 px-8 py-4">
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white px-6 py-1 placeholder-black outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={handlePopChange}
                      value={popDetails.name}
                    />
                  </div>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white placeholder-black px-6 py-1 outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={handlePopChange}
                      value={popDetails.email}
                    />
                  </div>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white placeholder-black px-6 py-1 outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="number"
                      name="mobile"
                      placeholder="Enter your Mobile"
                      onChange={handlePopChange}
                      value={popDetails.mobile}
                    />
                  </div>
                  {PopUpresponseMessage && (
                    <p className="text-[#012e29] text-[12px] mb-0">
                      {PopUpresponseMessage}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <button
                      className="mt-2 w-full rounded-md bg-[#012e29] px-10 py-2 font-semibold text-white"
                      onClick={popSubmitDetails}
                    >
                      {PopUpbuttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <h1 className="-mx-4 px-4 pt-4 pb-6  font-semibold text-center text-gray-700  sm:text-lg lg:text-3xl">
          {projectViewDetails.projectName} - {projectViewDetails.projectAddress}
          , <span className="font-bold">{projectViewDetails.city}</span>
        </h1>

        <div className=" text-justify text-gray-700 m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl pt-0 mt-1">
          <p className="leading-relaxed">
            {/* {projectViewDetails.project_discripation} */}
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </p>
        </div>

        {/* New Data  Design */}

        <div className="bg-[#eee] h-auto flex justify-center p-6 m-0 mb-3">
          <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 lg:gap-24 sm:gap-6 md:gap-8 p-6">
            <div className="flex flex-col">
              <span className="text-center font-normal ">Land Area</span>
              <span className="text-center font-semibold text-xl uppercase">
                {projectViewDetails.totalLandArea} Acres
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-center font-normal ">About Project</span>
              {projectViewDetails.type === "Residential Flats" ? (
                <>
                  <span className="text-center font-semibold text-xl uppercase">
                    {projectViewDetails.towerNumber} Tower -{" "}
                    {projectViewDetails.totalUnit} Unit
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span className="text-center font-semibold text-xl uppercase">
                    {projectViewDetails.totalUnit} Unit
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-center font-normal">Price</span>
              <span className="text-center font-semibold text-xl uppercase">
                {projectViewDetails.minPrice < 1 ? (
                  <span>{projectViewDetails.minPrice * 100} L</span>
                ) : (
                  <span>{projectViewDetails.minPrice} Cr</span>
                )}
                - {projectViewDetails.maxPrice} Cr
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-center font-normal ">Possession</span>
              <span className="text-center font-semibold text-xl uppercase">
                {formatDate(projectViewDetails.possessionDate)}
              </span>
            </div>

            {/* <div className="flex flex-col">
              <span className="text-center font-normal">ONGOING</span>
              <span className="text-center font-semibold text-xl uppercase">{projectViewDetails.project_Status}</span>
            </div> */}
          </div>
        </div>

        {/* Side Form  */}

        <div>
          <div className="sticky-quote-cta">
            <a
              className="text-white"
              onClick={handleShow}
              style={{ backgroundColor: "#012e29", padding: "18px" }}
            >
              Download Brochure
            </a>
          </div>

          {modalIsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-2xl bg-white shadow-lg max-w-lg">
                <div className="bg-[#012e29] px-10 py-3 text-center text-white relative">
                  <p className="font-serif text-xl mb-0 text-center font-semibold tracking-wider">
                    Instant Callback
                  </p>
                  <button
                    className="text-white text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleClose}
                  >
                    ✖
                  </button>
                </div>

                <div className="space-y-4 px-8 py-4">
                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white px-6 py-1 placeholder-black outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={handleChangeSide}
                      value={sideDetails.name}
                    />
                  </div>

                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white placeholder-black px-6 py-1 outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={handleChangeSide}
                      value={sideDetails.email}
                    />
                  </div>

                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                    <input
                      className="w-full pl-10 rounded-md border bg-white placeholder-black px-6 py-1 outline-none ring-green-900 border-green-900 focus:ring-1"
                      type="number"
                      name="mobile"
                      placeholder="Enter your Mobile"
                      onChange={handleChangeSide}
                      value={sideDetails.mobile}
                    />
                  </div>

                  {sideResponseMessage && (
                    <p className="text-[#012e29] text-[12px] mb-0">
                      {sideResponseMessage}
                    </p>
                  )}

                  <div className="flex justify-center">
                    <button
                      className="mt-2 w-full md:w-auto rounded-md bg-[#012e29] px-10 py-2 font-semibold text-white"
                      onClick={SideSubmitDetails}
                    >
                      {sideButtonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3">
          <div className="flex justify-center items-stretch rounded h-auto bg-[#F1F1FE]">
            <div className="text-black w-full flex flex-col">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 sm:w-full p-4 text-black">
                  <span class="lg:text-3xl md:text-2xl sm:text-base text-justify text-gray-600 font-semibold">
                    Highlights of {projectViewDetails.projectName}
                  </span>
                  <div className="mt-4">
                    {highlight &&
                      Array.isArray(highlight) &&
                      highlight.length > 0 &&
                      highlight.map((item, index) => (
                        <ul
                          className="list-disc"
                          style={{ listStyleType: "circle" }}
                          key={index}
                        >
                          <li className="mb-2 text-black">
                            {item.highlight_Point}
                          </li>
                        </ul>
                      ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2 overflow-hidden flex items-center">
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

        <div className="text-center pt-4">
          <h2 className="font-semibold lg:text-3xl mx-4 md:text-xl sm:text-base text-gray-600">
            {projectViewDetails.projectName} Sizes & Prices
          </h2>
        </div>

        <div className="pt-4 mx-4">
          <div className="flex flex-col w-full border-black ">
            <div className="flex flex-shrink-0 bg-gray-600 text-white ">
              <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
                <span>Unit Type</span>
              </div>
              <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
                <span>Unit Size</span>
              </div>

              <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
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
                      <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto px-2 border-b  border-black">
                        <span> {item.bhk_type}</span>
                      </div>

                      <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto px-2 border-b  border-black">
                        <span>{item.bhk_Area}</span>
                      </div>

                      <div className="flex items-center justify-center flex-grow w-0 lg:h-10 sm:h-auto px-2 border-b  border-black">
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center pt-4">
            <h2 className="font-semibold mx-4 lg:text-3xl md:text-xl sm:text-base text-gray-600">
              {projectViewDetails.projectName} Floor Plan
            </h2>
          </div>
          {/* //floor plan? */}

          <article className="article h-80 mb-5">
            <div className="relative">
              {sliderImages &&
                Array.isArray(sliderImages) &&
                sliderImages.length > 0 && (
                  <>
                    <button
                      onClick={() => slideRefs.current.slickPrev()}
                      className="absolute top-1/2 lg:top-1/2 sm:top-1/2 left-5 transform -translate-y-1/2 bg-white text-gray-500 p-2 rounded-full z-10"
                    >
                      <GrPrevious />
                    </button>
                    <button
                      onClick={() => slideRefs.current.slickNext()}
                      className="absolute top-1/2 lg:top-1/2 sm:top-1/2 right-5 transform -translate-y-1/2 text-gray-700 bg-white p-2 rounded-full z-10"
                    >
                      <GrNext />
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
                        alt={`Image ${index + 1}`}
                        className="w-full h-auto object-cover md:h-[400px] sm:h-[300px] mt-6 cursor-pointer"
                        onClick={() => openModal(image.url)}
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </article>

          {isModalOpen && (
            <div className="fixed inset-0 pt-20 bg-black bg-opacity-75 flex justify-center items-center z-50">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white text-xl bg-gray-800 p-2 rounded-full z-10"
                >
                  &times;
                </button>
                <img
                  src={currentImage}
                  alt="Full View"
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

        {/*Gallery Slider container */}

        <div>
          <style jsx>{`
            .carousel-container .react-multiple-carousel__arrow {
              z-index: 100; /* Adjust the value as needed */
            }
          `}</style>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={gallery}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType="desktop"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {/* Check if projectGallery exists and is an array */}
            {Array.isArray(projectGallery) && projectGallery.length > 0 ? (
              projectGallery.map((item, index) => (
                <div key={index}>
                  {item && (
                    <img
                      src={item.url}
                      alt={`${projectViewDetails.projectName} ${index}`}
                      className="w-screen max-h-40vh object-fit z-10"
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No images available</p> // Fallback content if projectGallery is empty or undefined
            )}
          </Carousel>
        </div>

        <div
          className="text-center  text-gray-600 pt-2 font-semibold mt-2 lg:pt-4 md:pt-3  text-sm sm:text-base md:text-lg lg:text-3xl sm:pt-0 px-3 h-6"
          // style={{ backgroundColor: "#f7f1ec" }}
        >
          <h3 className="leading-relaxed font-bold">
            {projectViewDetails.projectName} Amenities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4 pt-8">
          {Amenities &&
            Array.isArray(Amenities) &&
            Amenities.length > 0 &&
            Amenities.map((item, index) => (
              <div
                key={index}
                className="group uppercase p-3 m-4 text-black text-center border-[#012e29] rounded-lg border-2 transition-colors duration-300 hover:bg-[#012e29]"
              >
                <span className="group-hover:text-white">{item}</span>
              </div>
            ))}
        </div>

        {/* <div className="flex flex-col items-center justify-center mt-2 md:mt-8 lg:h-32 sm:h-28 shadow-xl">
          <span className="font-semibold lg:text-xl md:text-xl sm:text-base text-gray-600 text-center mb-2">
            CALL NOW
          </span>
          <Link
            to="tel:+918527134491"
            className="font-semibold lg:text-3xl md:text-xl sm:text-base text-gray-600"
          >
            <i className="fa-solid fa-phone mb-2"></i> +91 8527134491
          </Link>
        </div> */}

        <div className="">
          <div className="h-auto bg-[#F1F1FE]">
            <div className="flex justify-center items-center rounded">
              <div className="text-black w-full overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-1/2 w-full overflow-hidden"
                    style={{ maxHeight: "500px" }}
                  >
                    {projectViewDetails.project_locationImage?.url && (
                      <img
                        src={projectViewDetails.project_locationImage.url}
                        alt={`${projectViewDetails.projectName}`}
                        className="w-full h-full object-fit"
                      />
                    )}
                  </div>

                  <div className="w-full md:w-1/2 p-4 text-black">
                    <span className=" text-gray-600 font-semibold lg:text-2xl md:text-xl">
                      Connectivity of {projectViewDetails.projectName}
                    </span>
                    <div className="mt-4">
                      <ul
                        className="list-disc"
                        style={{ listStyleType: "circle" }}
                      >
                        {projectRedefine_Connectivity &&
                          Array.isArray(projectRedefine_Connectivity) &&
                          projectRedefine_Connectivity.length > 0 &&
                          projectRedefine_Connectivity.map((item, index) => (
                            <li className="text-lg" key={index}>
                              {item}
                            </li>
                          ))}
                      </ul>

                      <ul
                        className="list-disc"
                        style={{ listStyleType: "circle" }}
                      >
                        {projectRedefine_Entertainment &&
                          Array.isArray(projectRedefine_Entertainment) &&
                          projectRedefine_Entertainment.length > 0 &&
                          projectRedefine_Entertainment.map((item, index) => (
                            <li className="text-lg" key={index}>
                              {item}
                            </li>
                          ))}
                      </ul>
                      <ul
                        className="list-disc"
                        style={{ listStyleType: "circle" }}
                      >
                        {projectRedefine_Education &&
                          Array.isArray(projectRedefine_Education) &&
                          projectRedefine_Education.length > 0 &&
                          projectRedefine_Education.map((item, index) => (
                            <li className="text-lg" key={index}>
                              {item}
                            </li>
                          ))}
                      </ul>
                      <ul
                        className="list-disc"
                        style={{ listStyleType: "circle" }}
                      >
                        {projectRedefine_Business &&
                          Array.isArray(projectRedefine_Business) &&
                          projectRedefine_Business.length > 0 &&
                          projectRedefine_Business.map((item, index) => (
                            <li className="text-lg" key={index}>
                              {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Plan */}

        <div className="text-center pt-4">
          <h2 className="font-semibold mx-4 lg:text-3xl md:text-xl sm:text-base text-gray-600">
            {projectViewDetails.projectName} Master Plan
          </h2>
        </div>

        <div className="pt-4">
          {projectViewDetails.projectMaster_plan?.url && (
            <img
              src={projectViewDetails.projectMaster_plan.url}
              className="w-full max-h-auto object-fit"
              alt={`${projectViewDetails.projectName}`}
            />
          )}
        </div>

        <div className="text-center pt-4">
          <strong className=" text-justify lg:text-3xl sm:text-sm md:text-sm font-extrabold lg:p-8 sm:p-0 text-gray-600">
            About {projectViewDetails.builderName}
          </strong>
        </div>

        <div className=" text-justify  text-gray-700 m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl pt-0 mt-4">
          <span className="leading-relaxed">
            {projectViewDetails.AboutDeveloper}
          </span>
        </div>

        {/* <RelatedProject/> */}

        <section className="w-full px-4 mb-4 bg-gray-200 py-10">
          <div className="p-6 rounded-lg relative">
            {/* Background color and padding */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectsToShow.map((project, idx) => (
                <div
                  key={idx}
                  className="relative m-auto w-full max-w-lg flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-200 hover:scale-105"
                >
                  <span className="relative flex h-40 overflow-hidden rounded-t-lg">
                    <img
                      className="object-fit w-full h-full"
                      src={project.frontImage && project.frontImage.url}
                      alt="Product image"
                    />
                  </span>
                  <div className="p-2">
                    <h5 className="tracking-tight text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-700">
                      {project.projectName}
                    </h5>
                    <div className="mt-2 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 text-center">
                        <span className="mr-1">₹</span>
                        {project.minPrice < 1 ? (
                          <span>{project.minPrice * 100} L</span>
                        ) : (
                          <span>{project.minPrice} Cr </span>
                        )}
                        - {project.maxPrice} Cr
                      </span>
                    </div>
                    <Link
                      to={`/${project.project_url}/`} target="_black"
                      className="mt-2 flex items-center justify-center w-full rounded-md bg-[#012E29] px-4 py-2 text-sm text-white focus:ring-4 hover:bg-[#013b35] transition duration-200"
                    >
                      View More Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length > 4 && (
              <div className="flex justify-end mt-2">
                {" "}
                {/* Center the button */}
                <button
                  onClick={() => setShowAllProjects((prev) => !prev)}
                  className="rounded-md bg-[#012E29] px-4 py-2 text-white text-sm sm:text-base transition duration-200" // Use relative positioning
                >
                  {showAllProjects ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="sm:h-auto lg:h-[200px] xl:h-[300px] w-full sm:w-auto bg-[#012e29] px-5 py-6 sm:py-0 flex flex-col justify-between">
          <div>
            <p className="text-center text-white text-lg lg:text-xl xl:text-2xl mt-3">
              Make an Enquiry
            </p>
            <div className="text-center mt-2">
              <a
                href="tel:+918527134491"
                className="flex items-center justify-center text-white text-3xl"
              >
                <i className="fa-solid fa-phone text-white text-2xl"></i>
                <span className="pl-2">8527-134-491</span>
              </a>
            </div>
            <form className="max-w-full mt-8">
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex items-center mb-4 sm:mb-0 border-b border-white w-full sm:w-1/3">
                  <i className="fa-solid fa-user mb-2 text-white text-md mr-2"></i>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={userDetails.name}
                    required
                    placeholder="Enter Your Name*"
                    className="appearance-none bg-transparent mb-1 border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>

                <div className="flex items-center mb-4 sm:mb-0 border-b border-white w-full sm:w-1/3">
                  <i className="fa-solid fa-envelope mb-2 text-white text-md mr-2"></i>
                  <input
                    type="text"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email*"
                    className="appearance-none bg-transparent mb-1 border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>

                <div className="flex items-center mb-4 sm:mb-0 border-b border-white w-full sm:w-1/3">
                  <i className="fa-solid fa-phone text-white text-md mr-2 mb-2"></i>
                  <input
                    type="text"
                    name="mobile"
                    value={userDetails.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Contact Number*"
                    className="appearance-none mb-1 bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>

              {userResponseMessage && (
                <p className="text-white text-[12px] ">{userResponseMessage}</p>
              )}

              <div className="flex justify-center pt-4 my-2">
                <button
                  onClick={userSubmitDetails}
                  className="fixed-button inline-flex items-center gap-1 text-white bg-[#012e29] border focus:outline-none px-3 py-2 rounded"
                >
                  {userButtonText} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="w-full py-3 text-[#012e29]  mt-auto">
            <p className="text-center text-sm mb-0">
              Copyright © 2024, All Rights Reserved
            </p>
          </div>
        </div>

        {/* <div>
          <a
            href="https://wa.me/918500900100"
            class="dd-m-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div> */}

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
      </>
    </Wrapper>
  );
};

export default BannerPage;

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
