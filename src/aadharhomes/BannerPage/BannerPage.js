import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Glide from "@glidejs/glide";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const BannerPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const openImage = (imageUrl) => {
    setImageUrl(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const pop = {
    /* Modal container */
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      // left: 0,
      // top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      padding: "0px",
      border: "none",
    },
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "0%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      width: "70%",
      marginTop: "0px",
      height: "80%",
      backgroundColor: "red",
    },
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

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { pUrl } = useParams();
  const sliderRef = React.createRef();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const settings1 = {
    showStatus: false,
    dots: false,
    infinite: true,
    showThumbs: false,
    autoPlay: true,
    interval: 1000,
    speed: 500,
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const resetData = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/projectView/${pUrl}`
        );
        setProjectViewDetails(res.data.dataview[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [projectViewDetails]);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const userSubmitDetails = (e) => {
    e.preventDefault();
    const { mobile } = userDetails;

    if (mobile) {
      axios
        .post("https://api.100acress.com/userInsert", {
          ...userDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        })
        .then((res) => {
          alert("Data submitted");
          resetData();
        })

        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in the data");
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

  const popSubmitDetails = (e) => {
    e.preventDefault();
    const { mobile } = popDetails;

    if (mobile) {
      axios
        .post("https://api.100acress.com/userInsert", {
          ...popDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        })
        .then((res) => {
          alert("Data submitted");
          resetData();
        })

        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in the data");
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

  return (
    <Wrapper
      className="section"
      style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential & Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>{projectViewDetails.meta_title}</title>
        <meta
          name="description"
          content={projectViewDetails.meta_description}
        />
      </Helmet>

      <>
        <header className="fixed shadow-2xl top-0 z-50 text-slate-700 flex flex-col overflow-hidden px-4 lg:flex-row lg:items-center bg-white w-full">
          <a className="flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900">
            <img
              src={projectViewDetails?.logo?.url}
              style={{ height: "40px", width: "200px" }}
              alt="project logo"
              loading="lazy"
            />
          </a>

          <input
            type="checkbox"
            className="peer hidden"
            id="navbar-open"
            checked={isNavOpen}
            onChange={toggleNav}
          />
          <label
            className="absolute top-3 right-5 cursor-pointer lg:hidden"
            htmlFor="navbar-open"
          >
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </label>

          <nav
            aria-label="Header Navigation"
            className={`${
              isNavOpen ? " justify-end" : "max-h-0"
            } w-full flex flex-col  transition-all lg:ml-24 lg:max-h-full lg:flex-row`}
          >
            <ul className="flex justify-end w-full mx-auto  ">
              <li className="lg:ml-10 md:ml-4 ">
                <a
                  href="tel:+919811750130"
                  className="rounded text-gray-700 lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                >
                  <span class="text-blue-700 text-3xl sm:text-xl lg:text-3xl md:text-2xl sm:pt-2 md:m-2 text-right hidden lg:inline-block">
                    <i class="fa-solid fa-phone"></i> 9811750130
                  </span>

                  <span class="text-blue-700 text-xl pt-2 md:text-2xl lg:hidden block text-right">
                    <i class="fa-solid fa-phone"></i> 9811750130
                  </span>
                </a>
              </li>
            </ul>
            <hr className="w-full pt-1 lg:hidden" />
          </nav>
        </header>

        <div className="w-full mt-16 relative overflow-hidden bg-cover bg-no-repeat text-center">
          <div className="w-full  overflow-hidden  object-fit">
            <div className="d-flex justify-content-center">
              {frontImage?.url && (
                <img
                  className="img-fluid max-width-100 max-height-100 h-auto w-full"
                  src={frontImage.url}
                  alt="front Image"
                />
              )}
            </div>
          </div>
        </div>

        {/* //PopUp Form */}

        <div className="relative  ">
          {showPopup && (
            <div className="relative">
              {/* Popup */}
              {showPopup && (
                <div className="fixed top-50 left-0 w-full h-full flex items-center justify-center transform -translate-y-1/2  ">
                  <div className="absolute top-0 left-0 w-full h-full  bg-opacity-50 p-5 xs:overflow-hidden" />
                  <div className="relative  ">
                    <button
                      className="absolute top-0 right-0  text-black rounded-lg"
                      onClick={() => setShowPopup(false)}
                    >
                      <i className="fa-solid fa-xmark text-4xl"></i>
                    </button>
                    <form className=" rounded-lg px-6 py-5 w-96 shadow-md bg-white xs:px-3 ">
                      <div className="mb-2">
                        <h2 class="text-xl font-semibold text-black ">
                          GET A CALLBACK
                        </h2>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          onChange={handlePopChange}
                          value={popDetails.name}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handlePopChange}
                          value={popDetails.email}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          class="appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          rows="2"
                          placeholder="Enter your mobile"
                          name="mobile"
                          onChange={handlePopChange}
                          value={popDetails.mobile}
                        ></input>
                      </div>
                      <div class="flex justify-center">
                        <button
                          class="bg-black  text-white font-bold py-2 px-[150px] rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={popSubmitDetails}
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <h1 className="-mx-4 px-4 pt-4 pb-6  font-semibold text-center text-gray-700  sm:text-lg lg:text-3xl">
          {projectViewDetails.projectName} - {projectViewDetails.projectAddress}
          , <span class="font-bold">{projectViewDetails.city}</span>
        </h1>

        <div className=" text-justify text-gray-700 m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl pt-0 mt-1">
          <span className="leading-relaxed">
            {projectViewDetails.project_discripation}
          </span>
        </div>

        <div class="w-48 cursor-pointer mx-3">
          {projectViewDetails?.project_Brochure?.url && (
            <a href={projectViewDetails.project_Brochure.url} target="_blank">
              <p class="border-2 border-blue-500 hover:bg-blue-800 hover:text-white rounded-xl px-2 py-2 text-center text-lg">
                Download Brochure
              </p>
            </a>
          )}
        </div>

        {/* Extra Code */}

        <div className="pt-3">
          <div className="flex justify-center items-center rounded h-auto bg-[#F1F1FE]">
            <div
              className="text-black w-full overflow-hidden"
              style={{ maxHeight: "500px" }}
            >
              <div className="flex flex-col md:flex-row">
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

                <div className="md:block w-1/2 overflow-hidden hidden sm:block max-h-screen">
                  {projectViewDetails?.highlightImage?.url && (
                    <img
                      src={projectViewDetails.highlightImage.url}
                      alt="expertImage"
                      className="w-full h-full object-fit"
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
                      <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
                        <span> {item.bhk_type}</span>
                      </div>

                      <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
                        <span>{item.bhk_Area}</span>
                      </div>

                      <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b  border-black">
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

          <div className="pt-8 mb-6">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType="desktop"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {Array.isArray(sliderImages) &&
                sliderImages.length > 0 &&
                sliderImages.map((item, index) => (
                  <div key={index} className="slider-item">
                    <div onClick={() => openImage(item.url)}>
                      <img src={item.url} alt={`Image ${index + 1}`} />
                    </div>
                  </div>
                ))}
              <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <span className="close">&times;</span>
                <div
                  onClick={() => closeModal()}
                  className="modal"
                  style={pop.modal}
                >
                  <div className="modal-content">
                    <img src={imageUrl} alt="Image 1" />
                  </div>
                </div>
              </Modal>
            </Carousel>
          </div>
        </div>

        {/*Gallery Slider container */}

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
          deviceType="desktop" // assuming you're not passing the device type as a prop
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {console.log(projectGallery, "projectGallery")}
          {projectGallery &&
            Array.isArray(projectGallery) &&
            projectGallery.length > 0 &&
            projectGallery.map((item, index) => (
              <div key={index}>
                {item && (
                  <img
                    src={item.url}
                    alt={`Image ${index}`}
                    className="w-screen max-h-40vh object-fit"
                  />
                )}
              </div>
            ))}
        </Carousel>

        <div
          className="text-center  text-gray-600 pt-2 font-semibold mt-2 lg:pt-4 md:pt-3  text-sm sm:text-base md:text-lg lg:text-3xl sm:pt-0 px-3 h-6"
          style={{ backgroundColor: "#f7f1ec" }}
        >
          <h3 className="leading-relaxed font-bold">
            {projectViewDetails.projectName} Amenities
          </h3>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-6 gap-2 px-4 pt-8"
          style={{ backgroundColor: "#f7f1ec" }}
        >
          {Amenities &&
            Array.isArray(Amenities) &&
            Amenities.length > 0 &&
            Amenities.map((item, index) => (
              <div
                key={index}
                className="uppercase p-4 m-4  text-black text-center border-[#d9a253]  rounded-lg border-2 hover:bg-[#d9a253]"
              >
                {" "}
                {item}
              </div>
            ))}
        </div>

        <div className="flex flex-col items-center justify-center mt-2 md:mt-8 lg:h-32 sm:h-28 shadow-xl">
          <span className="font-semibold lg:text-xl md:text-xl sm:text-base text-gray-600 text-center mb-2">
            CALL NOW TO SPEAK TO AN EXPERT
          </span>
          <a
            href="tel:+918527134491"
            className="font-semibold lg:text-3xl md:text-xl sm:text-base text-gray-600"
          >
            <i className="fa-solid fa-phone mb-2"></i> +91 8527134491
          </a>
        </div>

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
                        alt="expertImage"
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
              className="w-full max-h-screen object-fit"
              alt="Project Master Plan"
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
            At <b>{projectViewDetails.projectName}</b>,{" "}
            {projectViewDetails.AboutDeveloper}
          </span>
        </div>

        <div className="sm:h-auto lg:h-[400px] xl:h-[430px] w-full sm:w-auto bg-[#012e29]">
          <p className="text-center pt-4 text-white m-2 md:m-4 lg:m-6 xl:m-10 sm:text-sm   md:text-lg lg:text-2xl  lg:pt-2 mt-2">
            Make an Enquiry
          </p>
          <form className="mx-auto max-w-2xl h-auto p-4">
            <div className="lg:pt-2 mb-5 border-b border-white">
              <input
                row="6"
                type="text"
                name="name"
                onChange={handleChange}
                value={userDetails.name}
                required
                placeholder="Enter Your Name*"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              ></input>
            </div>

            <div className="mb-5 relative border-b border-white">
              <input
                type="text"
                name="email"
                row="6"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter Your Email*"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>

            <div className="mb-5  border-b border-white">
              <input
                type="text"
                name="mobile"
                value={userDetails.mobile}
                onChange={handleChange}
                required
                placeholder="Contact Number*"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>

            {/* <div className="flex justify-center md:mt-2 p-4">
              <strong className="text-white text-center">
                Rera No. {projectViewDetails.projectReraNo}
              </strong>
            </div> */}

            <div className="flex justify-center">
              <button
                onClick={userSubmitDetails}
                className="inline-flex gap-1  text-white bg-[#012e29] border focus:outline-none px-3 py-2 rounded"
              >
                Submit <i className="fa-solid fa-arrow-right pt-1 "></i>
              </button>
            </div>
          </form>
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
`;
