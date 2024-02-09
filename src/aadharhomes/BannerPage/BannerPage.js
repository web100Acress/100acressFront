import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BannerPage = () => {
  const sliderRef = React.createRef();
  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableHeight: false,
  };

  const resetData = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://acre.onrender.com/projectView/${pUrl}`
        );
        setProjectViewDetails(res.data.dataview[0]);
        console.log(res, "Response");
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
        .post("https://acre.onrender.com/userInsert", {
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
        .post("https://acre.onrender.com/userInsert", {
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
  } = projectViewDetails;

  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <>
        <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-2 lg:flex-row lg:items-center">
          <div>
            <a
              class="  flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900"
              to="#"
            >
              <img
                src={projectViewDetails?.logo?.url}
                style={{ height: "40px", width: "200px" }}
                alt="project logo"
                loading="lazy"
              />
            </a>
          </div>

          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute top-3 right-5 cursor-pointer lg:hidden"
            for="navbar-open"
          >
            <svg
              className="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>

          <nav
            aria-label="Header Navigation"
            className="peer-checked:pt-8  peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center transition-all lg:ml-24 lg:max-h-full lg:flex-row"
          >
            <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
              <li className="lg:mr-12  lg:pt-3">
                <Link
                  className="rounded  text-gray-700  lg:text-lg md:text-xs sm:text-sm transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  to="#"
                >
                  Overview
                </Link>
              </li>
              <li className="lg:mr-12 lg:pt-3">
                <Link
                  className="rounded text-gray-700   lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  to="#"
                >
                  Location
                </Link>
              </li>
              <li className="lg:mr-12 lg:pt-3">
                <Link
                  className="rounded text-gray-700  lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  to="#"
                >
                  Experience
                </Link>
              </li>
              <li className="lg:mr-12 lg:pt-3">
                <Link
                  className="rounded text-gray-700  lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  to="#"
                >
                  FloorPlan
                </Link>
              </li>
              <li className="lg:mr-12 lg:pt-3">
                <Link
                  className="rounded text-gray-700  lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  to="#"
                >
                  Amenties
                </Link>
              </li>
              <li className="lg:mr-10 hidden md:block lg:pt-3">
                <Link className="rounded text-gray-700 lg:text-lg md:text-xs transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2">
                  <span className="text-blue-700 ">+91 </span>9811750130
                </Link>
              </li>
            </ul>
            <hr className="mt-4 w-full lg:hidden" />
          </nav>
        </header>

        <div className="h-[32rem] w-full relative overflow-hidden bg-cover bg-no-repeat p-12 text-center">
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed object-fit "
            style={{
              backgroundImage: frontImage ? `url(${frontImage.url})` : "",
              backgroundPosition: "center",
              backgroundSize: "cover",
              opacity: "0.8",
            }}
          >
            {/* <div className="flex h-full items-center justify-center">
              <div className="relative">
                <h2 className="mb-4 text-sm lg:text-4xl md:text-2xl sm:text-sm font-extrabold text-white">
                  {projectViewDetails.projectBgContent}
                </h2>
                <h4 className="mb-6 text-sm lg:text-3xl md:text-xl sm:text-sm font-extrabold text-[#ffc067]">
                  {projectViewDetails.projectName}
                </h4>
              </div>
            </div> */}
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
                    <form className=" rounded-lg px-6 py-3 w-96 shadow-md bg-white xs:px-3 ">
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

        <div
          className="lg:flex sm:text-center lg:mx-20 lg:flex-col lg:items-center"
          style={{ marginLeft: "38px", paddingTop: "28px" }}
          id="overview"
        >
          <h3 className="w-full lg:w-3/4 lg:mx-4 sm:mx-2 text-2xl lg:text-4xl font-semibold text-[#012e29]">
            {projectViewDetails.projectName} -{" "}
            {projectViewDetails.projectAddress}, {projectViewDetails.city}
          </h3>
        </div>

        <div className="text-center text-black font-semibold m-4 md:m-8 lg:m-10 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pt-0">
          <span className="pr-12">
            Your dream home right across an iconic{" "}
            {projectViewDetails.projectName}
          </span>
        </div>

        <div className=" lg:text-justify md:text-center  text-gray-700 m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl pt-0 mt-4">
          <span className="leading-relaxed">
            {projectViewDetails.project_discripation}
          </span>
        </div>

        {/* <div className="sticky-quote-cta ">
        <a onClick={handleShow}>For any Queries</a>
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
          <strong className="text-black font-semibold  not-italic lg:text-2xl ml-2 sm:text-sm text-justify ">
            ENQUIRE NOW
          </strong>

          <button onClick={handleClose}>
            <i class="fa-regular fa-rectangle-xmark lg:text-3xl sm:text-xl lg:ml-72 sm:ml:2"></i>
          </button>

          <form className="px-2 pt-2 ">
            <input
              type="text"
              name="name"
              id="validationCustom01"
              placeholder="Full Name"
              required
              className="mb-2 me-2 w-100 p-2 px-3 "
              style={{
                outline: "none",
                border: "1px solid #ced4da",
                color: "#495057",
                borderRadius: "0.25rem",
              }}
            />
            <input
              className="mb-2 me-2 w-100 p-2 px-3"
              type="number"
              name="mobile"
              min={0}
              id="validationCustom02"
              placeholder="Mobile Number"
              onKeyPress={(e) => {
                if (e.target.value.length > 9) {
                  e.preventDefault();
                }
              }}
              required
              style={{
                outline: "none",
                border: "1px solid #ced4da",
                color: "#495057",
                borderRadius: "0.25rem",
              }}
            />
            <input
              type="email"
              name="email"
              id="validationCustom03"
              placeholder="Email Address"
              className="mb-2 me-2 w-100 p-2 px-3"
              style={{
                outline: "none",
                border: "1px solid #ced4da",
                color: "#495057",
                borderRadius: "0.25rem",
              }}
            />
            <button type="submit" className="btn btn-danger font-semibold">
              Submit
            </button>
          </form>
        </ReactModal>
      </div> */}

        <div className="text-center pt-4">
          <strong className="font-semibold text-2xl md:text-xl sm:text-base text-[#012e29]">
            {projectViewDetails.projectName} Sizes & Prices
          </strong>
        </div>

        <div className="flex flex-col w-full   border-black pt-4">
          <div className="flex flex-shrink-0 bg-black text-white">
            <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Unit Size</span>
            </div>
            <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
              <span>Unit Type</span>
            </div>
            <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
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
                    <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                      <span>{item.bhk_Area} Sq.ft</span>
                    </div>
                    <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                      <span> {item.bhk_type}</span>
                    </div>
                    <div className="flex items-center justify-center flex-grow w-0 h-10 px-2 border-b border-l border-black">
                      <span>{item.price}</span>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>

        <div className="text-center   text-black font-semibold m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl mt-4">
          <span className="leading-relaxed">
            {projectViewDetails.projectName} Floor Plan
          </span>
        </div>

        <div className="relative mb-2 max-w-screen-lg max-h-screen-lg mx-auto lg:mx-4 xl:mx-8 sm:w-full lg:pt-1 sm:pt-0 overflow-hidden">
          <Slider ref={sliderRef} {...settings} className="overflow-hidden">
            {project_floorplan_Image &&
              Array.isArray(project_floorplan_Image) &&
              project_floorplan_Image.length > 0 &&
              project_floorplan_Image.map((item, index) => (
                <div
                  key={index}
                  className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                >
                  <img
                    className="w-full h-full object-fit rounded-xl"
                    src={item.url}
                    alt={`floorPlan-${index}`}
                  />
                </div>
              ))}
          </Slider>

          <div className="pt-4 absolute inset-y-0 left-0 flex items-center">
            <button
              className="text-black text-4xl lg:text-6xl focus:outline-none"
              onClick={goToPrev}
            >
              <i className="fa-solid fa-circle-arrow-left"></i>
            </button>
          </div>

          <div className="pt-4 absolute inset-y-0 right-0 flex items-center">
            <button
              className="text-black text-4xl lg:text-6xl focus:outline-none"
              onClick={goToNext}
            >
              <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
          </div>
        </div>

        {/* <div className="px-5 mb-0 lg:pt-3">
          <div className="grid  md:pt-3 lg:grid-cols-4 sm:pt-1 sm:grid-cols-1 md:grid-cols-2 sm:mx-2 gap-3 m-2 sm:m-2 md:m-4 lg:m-4">
            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg bg-[#f1eadf]">
              <div className="mx-4 pb-2">
                <p className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                  BUSINESS AND COMMERCIAL
                </p>

                {projectRedefine_Business &&
                  Array.isArray(projectRedefine_Business) &&
                  projectRedefine_Business.length > 0 &&
                  projectRedefine_Business.map((item, index) => (
                    <table className="w-full">
                      <tr>
                        <td>{item}</td>
                      </tr>
                    </table>
                  ))}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg ">
              <div className="mx-4 pb-2">
                <h3 className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                  Connectivity
                </h3>
                {projectRedefine_Connectivity &&
                  Array.isArray(projectRedefine_Connectivity) &&
                  projectRedefine_Connectivity.length > 0 &&
                  projectRedefine_Connectivity.map((item, index) => (
                    <table className="w-full">
                      <tr>
                        <td>{item}</td>
                      </tr>
                    </table>
                  ))}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg">
              <div className="mx-4 pb-2">
                <h3 className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                  EDUCATION AND HEALTHCARE
                </h3>
                {projectRedefine_Education &&
                  Array.isArray(projectRedefine_Education) &&
                  projectRedefine_Education.length > 0 &&
                  projectRedefine_Education.map((item, index) => (
                    <table className="w-full">
                      <tr>
                        <td>{item}</td>
                      </tr>
                    </table>
                  ))}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg">
              <div className="mx-4 pb-2">
                <h3 className="m-0 text-sm  lg:pt-3 sm:pt-1 font-semibold text-center">
                  ENTERTAINMENT GALORE
                </h3>
                {projectRedefine_Entertainment &&
                  Array.isArray(projectRedefine_Entertainment) &&
                  projectRedefine_Entertainment.length > 0 &&
                  projectRedefine_Entertainment.map((item, index) => (
                    <table className="w-full">
                      <tr>
                        <td>{item}</td>
                      </tr>
                    </table>
                  ))}
              </div>
            </div>
          </div>
        </div> */}

        <div className="px-5 mb-0 lg:pt-3">
          <div className="grid  md:pt-3 lg:grid-cols-4 sm:pt-1 sm:grid-cols-1 md:grid-cols-2 sm:mx-2 gap-3 m-2 sm:m-2 md:m-4 lg:m-4">
            {/* ... (other divs) */}

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg bg-[#f1eadf] overflow-hidden">
              <div className="mx-4 pb-2">
                <p className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                  BUSINESS AND COMMERCIAL
                </p>

                {projectRedefine_Business &&
                  Array.isArray(projectRedefine_Business) &&
                  projectRedefine_Business.length > 0 && (
                    <table className="w-full">
                      <tbody>
                        {projectRedefine_Business.map((item, index) => (
                          <tr key={index}>
                            <td>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg bg-[#f1eadf] overflow-hidden">
              <div className="mx-4 pb-2">
                <p className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                Connectivity
                </p>

                {projectRedefine_Connectivity &&
                  Array.isArray(projectRedefine_Connectivity) &&
                  projectRedefine_Connectivity.length > 0 && (
                    <table className="w-full">
                      <tbody>
                        {projectRedefine_Connectivity.map((item, index) => (
                          <tr key={index}>
                            <td>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg bg-[#f1eadf] overflow-hidden">
              <div className="mx-4 pb-2">
                <p className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                EDUCATION AND HEALTHCARE
                </p>

                {projectRedefine_Education &&
                  Array.isArray(projectRedefine_Education) &&
                  projectRedefine_Education.length > 0 && (
                    <table className="w-full">
                      <tbody>
                        {projectRedefine_Education.map((item, index) => (
                          <tr key={index}>
                            <td>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>

            <div className="border-2 lg:mx-2 md:mx-2 border-[#d9a253] lg:w-full lg:h-[300] sm:h-[100] sm:w-full md:w-[200] md:h-[200] rounded-lg bg-[#f1eadf] overflow-hidden">
              <div className="mx-4 pb-2">
                <p className="m-0 text-sm lg:pt-3 sm:pt-1 font-semibold text-center">
                ENTERTAINMENT GALORE
                </p>

                {projectRedefine_Entertainment &&
                  Array.isArray(projectRedefine_Entertainment) &&
                  projectRedefine_Entertainment.length > 0 && (
                    <table className="w-full">
                      <tbody>
                        {projectRedefine_Entertainment.map((item, index) => (
                          <tr key={index}>
                            <td>{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>

            {/* ... (other divs) */}
          </div>
        </div>

        <div className="text-center text-[#012e29] font-semibold mt-2 lg:pt-4 md:pt-3  text-sm sm:text-base md:text-lg lg:text-3xl sm:pt-0 px-3">
          <p className="leading-relaxed">
            {projectViewDetails.projectName} Amenities
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 px-4 pt-4 "
          id="amenities"
        >
          {Amenities &&
            Array.isArray(Amenities) &&
            Amenities.length > 0 &&
            Amenities.map((item, index) => (
              <div
                key={index}
                className="uppercase p-4 m-4  text-center border-[#d9a253]  rounded-lg border-2 hover:bg-[#d9a253]"
              >
                {" "}
                {item}
              </div>
            ))}
        </div>

        <div className="max-w-full">
          <img
            src={projectViewDetails?.project_locationImage?.url}
            alt="location image"
            className="w-screen h-screen"
          />
        </div>

        <div className="text-center pt-4">
          <strong className=" text-justify lg:text-3xl sm:text-sm font-extrabold lg:p-8 sm:p-0 text-[#012e29]">
            About {projectViewDetails.builderName}
          </strong>
        </div>

        <div class="flex items-center justify-center pt-2" id="about">
          {/* <img
            class="object-cover object-center rounded-xl w-24 h-auto"
            src={projectViewDetails?.logo?.url}
            alt="logo"
          /> */}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 mx-4 pt-2 lg:mx-0">
          <div className="lg:w-full sm:w-full text-justify mb-8 lg:mb-0 ">
            <p>
              At <b>{projectViewDetails.projectName}</b>,{" "}
              {projectViewDetails.AboutDeveloper}
            </p>
          </div>
        </div>

        <div className="sm:h-auto lg:h-[400px] xl:h-[450px] w-full sm:w-auto bg-[#012e29]">
          <div className="text-center text-white m-4 md:m-8 lg:m-12 xl:m-20 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl lg:pt-4 mt-4"></div>
          <form className="mx-auto max-w-2xl h-auto">
            <div className="lg:pt-6 mb-5 border-b border-white">
              <input
                row="6"
                type="text"
                name="name"
                onChange={handleChange}
                value={userDetails.name}
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

            {/* <div>
              <input
                placeholder="Project Name*"
                name="projectName"
                value={projectViewDetails.projectName}
                onChange={handleChange}
                type="hidden"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>

            <div>
              <input
                placeholder="Project Address*"
                name="address"
                onChange={handleChange}
                value={projectViewDetails.projectAddress}
               
                type="hidden"
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div> */}

            <div className="flex justify-center md:mt-2 p-4">
              <strong className="text-white text-center">
                Rera No. {projectViewDetails.projectReraNo}
              </strong>
            </div>
            <div className="flex justify-center ">
              <button
                onClick={userSubmitDetails}
                className="inline-flex gap-1  text-white bg-[#012e29] border focus:outline-none px-3 py-2 rounded"
              >
                Make an Inquiry{" "}
                <i className="fa-solid fa-arrow-right pt-1 "></i>
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
`;
