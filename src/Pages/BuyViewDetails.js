
import React, { useState, useEffect, useContext, useRef } from "react";
import { styled } from "styled-components";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DataContext } from "../MyContext";
import { GrPrevious, GrNext } from "react-icons/gr";
import { ScaleLoader } from "react-spinners";

const BuyViewDetails = () => {
  const sliderRef = useRef(null);
  const slideRefs = useRef(null);
  const setting = {
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

  const set = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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
  const keyframes = `
  @keyframes moveHorizontal {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;
  const [rentViewDetails, setRentViewDetails] = useState({
    descripation: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [getContact, setGetContact] = useState("");
  const [buyData, setBuyData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const openModal = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = "auto"; 
  };

  const { frontImage, otherImage, amenities } = rentViewDetails;

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/property/view/${id}`
        );

        if (res.data.data) {
          setRentViewDetails(res.data.data);
        } else {
          setRentViewDetails(res.data.postData.postProperty[0]);
        }
        console.log(
          res.data.postData.postProperty[0],
          "res.data.postData.postProperty[0]"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [rentViewDetails]);

  const [agentFrom1, setAgentForm1] = useState({
    custName: "",
    custEmail: "",
    custNumber: "",
  });

  const handleChangeAgentForm1 = (e) => {
    const { name, value } = e.target;
    setAgentForm1({ ...agentFrom1, [name]: value });
  };

  const handleSubmitAgentForm1 = (e) => {
    e.preventDefault();
    const { custEmail, custNumber } = agentFrom1;
    if (custEmail && custNumber) {
      axios
        .post("https://api.100acress.com/postEnquiry", {
          ...agentFrom1,
          propertyAddress: rentViewDetails.city,
          agentEmail: rentViewDetails.email,
          agentNumber: rentViewDetails.number,
        })

        .then((response) => {
          alert("Data Submitted Successfully");
          resetData1();
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          if (error.response) {
            alert(`Server responded with an error: ${error.response.status}`);
          } else if (error.request) {
            alert("No response received from the server");
          } else {
            alert(`Error setting up the request: ${error.message}`);
          }
        });
    } else {
      alert("Please fill the data");
    }
    setShowContact(true);
  };

  const [agentFrom, setAgentForm] = useState({
    agentEmail: "",
    agentNumber: "",
    custName: "",
    custEmail: "",
    custNumber: "",
    propertyAddress: "",
  });

  const resetData1 = () => {
    setAgentForm1({
      agentEmail: "",
      agentNumber: "",
      custName: "",
      custEmail: "",
      custNumber: "",
      propertyAddress: "",
    });
  };

  const [userForm, setUserForm] = useState({
    custName: "",
    custEmail: "",
    custNumber: "",
  });

  const resetUser = () => {
    setUserForm({
      custName: "",
      custEmail: "",
      custNumber: "",
    });
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();

    const { custName, custNumber } = userForm;

    if (custNumber && custName) {
      try {
        const response = await axios.post(
          "https://api.100acress.com/postEnquiry",
          {
            ...userForm,
            propertyAddress: rentViewDetails.address,
          }
        );

        alert(response.data.message);
        resetUser();
      } catch (error) {
        console.error("Registration failed:", error);

        if (error.response) {
          alert(`Server responded with an error: ${error.response.status}`);
        } else if (error.request) {
          alert("No response received from the server");
        } else {
          alert(`Error setting up the request: ${error.message}`);
        }
      }
    } else {
      alert("Please fill the data");
    }
  };

  const [userForm1, setUserForm1] = useState({
    custName: "",
    custEmail: "",
    custNumber: "",
  });

  const handleUserFormChange1 = (e) => {
    const { name, value } = e.target;
    setUserForm1({ ...userForm1, [name]: value });
  };

  const handleSubmitFormData1 = async (e) => {
    e.preventDefault();
    const { custName, custNumber } = userForm1;
    if (custNumber && custName) {
      try {
        const response = await axios.post(
          "https://api.100acress.com/postEnquiry",
          {
            ...userForm1,
            propertyAddress: rentViewDetails.address,
          }
        );

        alert(response.data.message);
        resetUser1();
      } catch (error) {
        console.error("Registration failed:", error);

        if (error.response) {
          alert(`Server responded with an error: ${error.response.status}`);
        } else if (error.request) {
          alert("No response received from the server");
        } else {
          alert(`Error setting up the request: ${error.message}`);
        }
      }
    } else {
      alert("Please fill the data");
    }
    setShowContact(true);
  };

  const resetUser1 = () => {
    setUserForm1({
      custName: "",
      custEmail: "",
      custNumber: "",
    });
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/property/buy/ViewAll"
      );
      setBuyData(res.data.collectdata, "abcdefghijklmn");
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { trendingProject, upcoming } = useContext(DataContext);
  console.log(trendingProject);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <Wrapper>
        <div className="blog-single gray-bg">
          <div className="mx-10">
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <article className="article">
                  <div className="article-img">
                    {frontImage && frontImage.url && (
                      <div>
                        <img
                          src={frontImage.url}
                          alt="FrontView"
                          className="w-full h-80 object-fit"
                        />
                      </div>
                    )}
                  </div>

                  <div className="article-title">
                    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 w-full pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        Property Name:
                      </span>
                      <span className="text-gray-600 text-md sm:ml-2 mt-1 sm:mt-0">
                        {rentViewDetails.propertyName}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 w-full pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        Address:
                      </span>
                      <span className="text-md sm:ml-2 mt-1 sm:mt-0">
                        {rentViewDetails.address}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row border-b border-gray-100 pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        Amenities:
                      </span>
                      <div className="flex flex-wrap mt-1 sm:mt-0 sm:ml-2">
                        {amenities &&
                          Array.isArray(amenities) &&
                          amenities.length > 0 &&
                          amenities.map((amenity, index) => (
                            <div className="my-1 mx-1" key={index}>
                              <p className="text-md text-black">{amenity}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 w-full pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        Property Type:
                      </span>
                      <span className="sm:ml-2 mt-1 sm:mt-0">
                        {rentViewDetails.propertyType}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 w-full pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        State:
                      </span>
                      <span className="sm:ml-2 mt-1 sm:mt-0">
                        {rentViewDetails.state}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 w-full pb-2 mt-2">
                      <span className="text-lg text-red-500 min-w-[120px]">
                        Built Year:
                      </span>
                      <span className="sm:ml-2 mt-1 sm:mt-0">
                        {rentViewDetails.builtYear}
                      </span>
                    </div>
                  </div>
                </article>

                {/* change in description text */}
                <article className="article">
                  <span className="text-lg text-red-500 min-w-[120px] ">
                    Description:
                  </span>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-100 w-full pb-2 mt-1">
                    <span className="text-md font-medium ml-[108px] mt-[-28px]">
                      {isExpanded || !rentViewDetails.descripation
                        ? rentViewDetails.descripation
                        : `${rentViewDetails.descripation.slice(0, 120)}...`}
                      {rentViewDetails.descripation && (
                        <button
                          className="text-red-600 "
                          onClick={toggleDescription}
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </span>
                  </div>
                </article>

             {/* updated slider with open image */}

                <article className="article  ">
                  <span className="text-lg text-red-500 m-0 ml-1 pb-2 flex items-center">
                    Other Images:
                  </span>
                  <div className="relative">
                    {otherImage &&
                      Array.isArray(otherImage) &&
                      otherImage.length > 0 && (
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
                      {otherImage &&
                        Array.isArray(otherImage) &&
                        otherImage.length > 0 &&
                        otherImage.map((image, index) => (
                          <div key={index} className="p-2">
                            <img
                              src={image.url}
                              alt={`Image ${index + 1}`}
                              className="w-full  object-cover md:h-[400px] sm:h-[300px] mt-6 cursor-pointer"
                              onClick={() => openModal(image.url)}
                            />
                          </div>
                        ))}
                    </Slider>
                  </div>
                </article>

                {isModalOpen && (
                  <div className="fixed inset-0 pt-10 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="relative">
                      <button
                        onClick={closeModal}
                        className="absolute top-2 right-2 text-black text-xl bg-white px-3 py-2 rounded-full z-10"
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

                {rentViewDetails.email ? (
                  <> </>
                ) : (
                  <>
                    {showForm && (
                      <div className="article-comment">
                        <h4 className="text-lg  text-red-500 m-0">
                          Contact Us{" "}
                        </h4>
                        <form id="contact-form">
                          <div className="row pt-3">
                            <div className="widget widget-tags">
                              <div className="widget-body">
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <input
                                        name="custName"
                                        value={userForm.custName}
                                        onChange={handleUserFormChange}
                                        placeholder="Name *"
                                        className="form-control"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-12 pt-2">
                                    <div className="form-group">
                                      <input
                                        name="custEmail"
                                        value={userForm.custEmail}
                                        onChange={handleUserFormChange}
                                        placeholder="Email *"
                                        className="form-control"
                                        type="email"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12 pt-2">
                                    <div className="form-group">
                                      <input
                                        name="custNumber"
                                        value={userForm.custNumber}
                                        onChange={handleUserFormChange}
                                        placeholder="Mobile *"
                                        className="form-control"
                                        type="text"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12 pt-2 ">
                                    <div className="form-group">
                                      <input
                                        name="projectName"
                                        id="projectName"
                                        placeholder="Project Name *"
                                        className="form-control"
                                        type="hidden"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12 pt-2  ">
                                    <div className="form-group">
                                      <input
                                        name="addresss"
                                        id="address"
                                        placeholder="Address *"
                                        className="form-control"
                                        type="hidden"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-12 pt-2">
                                    <div className="send">
                                      <button
                                        className="px-btn theme bg-red-500 text-red-500"
                                        onClick={handleSubmitFormData}
                                      >
                                        <span className="text-red-500">
                                          Submit
                                        </span>{" "}
                                        <i className="arrow text-red-500" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="col-lg-4 m-15 px-tb blog-aside">
                <div className="widget widget-author">
                  <div className="widget-title">
                    <p>
                      <span className="text-red-500">Price:</span>{" "}
                      {rentViewDetails.price}
                    </p>
                  </div>

                  <div className="widget-title ">
                    <p>
                      <div className="flex justify-center items-center">
                        <div className="text-red-500 font-semibold text-xl text-center">
                          {rentViewDetails.role} {"-"}{" "}
                          {rentViewDetails.agentName}
                        </div>
                      </div>

                      <div
                        style={{ color: "red", textAlign: "left" }}
                        className="flex justify-center items-center pt-2"
                      >
                        {" "}
                        {getContact.length !== null ? (
                          <>
                            {showContact && rentViewDetails.number
                              ? rentViewDetails.number
                              : "+91-97xx-xx-xx89"}
                          </>
                        ) : (
                          <> {"+91-XXXX"} </>
                        )}
                      </div>

                      <div className="flex justify-center items-center pt-2">
                        <button
                          onClick={() => setShowForm(true)}
                          className="bg-red-500 px-2 py-2 rounded-full text-center text-white w-60 "
                        >
                          Get Phone Number
                        </button>
                      </div>
                    </p>
                  </div>

                  {rentViewDetails.email ? (
                    <>
                      {showForm && (
                        <div className=" widget-tags">
                          <div className="widget-title text-center items-center">
                            <p className="text-red-500">
                              Fill out form only one - time{" "}
                            </p>
                            <span>After get the contact number </span>
                          </div>
                          <div className="widget-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    name="custName"
                                    value={agentFrom1.custName}
                                    required
                                    onChange={handleChangeAgentForm1}
                                    placeholder="Name *"
                                    className="form-control"
                                    type="text"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="custNumber"
                                    value={agentFrom1.custNumber}
                                    onChange={handleChangeAgentForm1}
                                    required
                                    placeholder="Number *"
                                    className="form-control"
                                    type="text"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="custEmail"
                                    value={agentFrom1.custEmail}
                                    onChange={handleChangeAgentForm1}
                                    placeholder="Email *"
                                    className="form-control"
                                    type="email"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="propertyAddress"
                                    value={agentFrom1.propertyAddress}
                                    onChange={handleChangeAgentForm1}
                                    placeholder="Property Address *"
                                    className="form-control"
                                    type="hidden"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="agentEmail"
                                    value={agentFrom1.agentEmail}
                                    onChange={handleChangeAgentForm1}
                                    placeholder="Agent Email *"
                                    className="form-control"
                                    type="hidden"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="agentNumber"
                                    value={agentFrom1.agentNumber}
                                    onChange={handleChangeAgentForm1}
                                    placeholder="Agent Number *"
                                    className="form-control"
                                    type="hidden"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="send">
                                  <button
                                    className="px-btn theme bg-red-500 text-red-500"
                                    onClick={(event) => {
                                      handleSubmitAgentForm1(event);
                                    }}
                                  >
                                    <span className="text-red-500">Submit</span>{" "}
                                    <i className="arrow text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {showForm && (
                        <div className="widget widget-tags">
                          <div className="widget-title">
                            <h3>Contact</h3>
                          </div>
                          <div className="widget-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    name="custName"
                                    value={setUserForm.custName}
                                    onChange={handleUserFormChange1}
                                    placeholder="Name *"
                                    className="form-control"
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="custEmail"
                                    value={setUserForm1.custEmail}
                                    onChange={handleUserFormChange1}
                                    placeholder="Email *"
                                    className="form-control"
                                    type="email"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="custNumber"
                                    value={setAgentForm1.custNumber}
                                    onChange={handleUserFormChange1}
                                    placeholder="Mobile *"
                                    className="form-control"
                                    type="text"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="projectName"
                                    placeholder="Project Name *"
                                    className="form-control"
                                    type="hidden"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="form-group">
                                  <input
                                    name="addresss"
                                    placeholder="Address *"
                                    className="form-control"
                                    type="hidden"
                                  />
                                </div>
                              </div>

                              <div className="col-md-12 pt-2">
                                <div className="send">
                                  <button
                                    className="px-btn theme bg-red-500 text-red-500"
                                    onClick={handleSubmitFormData1}
                                  >
                                    <span className="text-red-500">
                                      Submit{" "}
                                    </span>{" "}
                                    <i className="arrow text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="widget-title">
                    <p>
                      <span className="text-red-500">Available Date:</span>{" "}
                      {rentViewDetails.availableDate}
                    </p>
                  </div>

                  <div className="widget-title">
                    <p>
                      <span className="text-red-500">Landmark:</span>{" "}
                      {rentViewDetails.landmark}
                    </p>
                  </div>

                  <div className="widget-title">
                    <p className="text-lg text-justify">
                      Let us create unique opportunities to help make any
                      disability into an ability.
                    </p>
                  </div>
                </div>

                <div className="widget widget-post ">
                  <div className="widget-title">
                    <p className="text-lg text-red-500 mb-0">
                      Trending Properties
                    </p>
                  </div>
                  {trendingProject.slice(0, 5).map((item, index) => {
                    return (
                      <Link to={`/${item.project_url}/`} target="_top">
                        <div
                          className="flex items-center pt-3 hover:bg-gray-100"
                          key={index}
                        >
                          <img
                            className="rounded-full w-20 h-20 p-2 transition hover:scale-105"
                            src={item.frontImage && item.frontImage.url}
                            alt="frontImage"
                          />
                          <div className="ml-4 ">
                            <p className="text-sm font-medium mb-2 hover:text-red-600  duration-500">
                              {item.projectName}
                            </p>
                            <p className="text-sm font-medium hover:text-red-600  duration-500">
                              {item.projectAddress}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="p-4 shadow-2xl bg-white rounded-md mt-1">
                  <div className="flex flex-col justify-between items-center w-full bg-white h-auto rounded-xl">
                    <div className="md:mr-4 w-full">
                      <p className="text-left text-xl my-2 px-2 flex">
                        Post your Property for{" "}
                        <em className="font-damion font-serif text-3xl flex ml-1">
                          Free!
                        </em>
                      </p>
                    </div>
                    <Link to="/SignIn" target="_top">
                      <div className="w-full flex justify-center px-2 py-2 ">
                        <button className="text-black px-3 bg-blue-300 py-2 rounded-full flex items-center justify-center">
                          Post Property
                          <span className="text-white text-sm px-2 mx-2 rounded-full bg-red-600 flex items-center ml-2">
                            <ScaleLoader
                              color="#FFFFFF"
                              height={20}
                              width={3}
                            />
                            <style>{keyframes}</style>
                            <span style={{ marginLeft: "8px" }}>Free</span>
                          </span>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className=" ">
                <article className="article mt-2">
                  <span className="text-lg text-red-500 m-0 ml-1 pb-2 flex items-center ">
                    Similar Property Images
                  </span>
                  <div className="relative ">
                    {otherImage &&
                      Array.isArray(otherImage) &&
                      otherImage.length > 0 && (
                        <>
                          <button
                            onClick={() => sliderRef.current.slickPrev()}
                            className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
                          >
                            <GrPrevious />
                          </button>
                          <button
                            onClick={() => sliderRef.current.slickNext()}
                            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
                          >
                            <GrNext />
                          </button>
                        </>
                      )}
                    <Slider ref={sliderRef} {...setting}>
                      {buyData.length > 0 ? (
                        buyData
                          .filter(
                            (item) =>
                              item.postProperty && item.postProperty.length > 0
                          )
                          .map((item, index) => (
                            <React.Fragment key={index}>
                              {item.postProperty
                                .slice(0, 1)
                                .map((nestedItem, nestedIndex) => (
                                  <div
                                    key={nestedIndex}
                                    className=" bg-orange-100 mx-3 mt-4 mb-4 shadow-md"
                                  >
                                    <div className="row ">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-12 m-0">
                                        {nestedItem.frontImage &&
                                        nestedItem.frontImage.url ? (
                                          <img
                                            src={nestedItem.frontImage.url}
                                            alt="frontImage"
                                            className="object-cover h-48 w-full "
                                          />
                                        ) : (
                                          <span>Image not available</span>
                                        )}
                                      </div>
                                      <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                        <div className="p-2 h-full flex flex-col justify-between">
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
                                            <Link
                                              to={
                                                nestedItem.propertyName &&
                                                nestedItem._id
                                                  ? `/buy-properties/${nestedItem.propertyName.replace(
                                                      /\s+/g,
                                                      "-"
                                                    )}/${nestedItem._id}/`
                                                  : "#"
                                              }
                                              target="_top"
                                            >
                                              <button
                                                type="button"
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-4 py-2 text-center m-0"
                                              >
                                                View Details
                                              </button>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </React.Fragment> 
                          ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </Slider>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default BuyViewDetails;

const Wrapper = styled.section`
  body {
    margin-top: 20px;
  }
  .blog-listing {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .gray-bg {
    background-color: #f5f5f5;
  }

  .blog-grid {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .blog-grid .blog-img {
    position: relative;
  }
  .blog-grid .blog-img .date {
    position: absolute;
    background: #fc5356;
    color: #ffffff;
    padding: 8px 15px;
    left: 10px;
    top: 10px;
    border-radius: 4px;
  }
  .blog-grid .blog-img .date span {
    font-size: 22px;
    display: block;
    line-height: 22px;
    font-weight: 700;
  }
  .blog-grid .blog-img .date label {
    font-size: 14px;
    margin: 0;
  }
  .blog-grid .blog-info {
    padding: 20px;
  }
  .blog-grid .blog-info h5 {
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 10px;
  }
  .blog-grid .blog-info h5 a {
    color: #20247b;
  }
  .blog-grid .blog-info p {
    margin: 0;
  }
  .blog-grid .blog-info .btn-bar {
    margin-top: 20px;
  }

  /* Blog Sidebar
-------------------*/
  .blog-aside .widget {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .blog-aside .widget-body {
    padding: 15px;
  }
  .blog-aside .widget-title {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .blog-aside .widget-title h3 {
    font-size: 20px;
    font-weight: 700;
    color: #fc5356;
    margin: 0;
  }
  .blog-aside .widget-author .media {
    margin-bottom: 15px;
  }
  .blog-aside .widget-author p {
    font-size: 16px;
    margin: 0;
  }
  .blog-aside .widget-author .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }
  .blog-aside .widget-author h6 {
    font-weight: 600;
    color: #20247b;
    font-size: 22px;
    margin: 0;
    padding-left: 20px;
  }
  .blog-aside .post-aside {
    margin-bottom: 15px;
  }
  .blog-aside .post-aside .post-aside-title h5 {
    margin: 0;
  }
  .blog-aside .post-aside .post-aside-title a {
    font-size: 18px;
    color: #20247b;
    font-weight: 600;
  }
  .blog-aside .post-aside .post-aside-meta {
    padding-bottom: 10px;
  }
  .blog-aside .post-aside .post-aside-meta a {
    color: #6f8ba4;
    font-size: 12px;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 10px;
  }
  .blog-aside .latest-post-aside + .latest-post-aside {
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;
  }
  .blog-aside .latest-post-aside .lpa-right {
    width: 90px;
  }
  .blog-aside .latest-post-aside .lpa-right img {
    border-radius: 3px;
  }
  .blog-aside .latest-post-aside .lpa-left {
    padding-right: 15px;
  }
  .blog-aside .latest-post-aside .lpa-title h5 {
    margin: 0;
    font-size: 15px;
  }
  .blog-aside .latest-post-aside .lpa-title a {
    color: #20247b;
    font-weight: 600;
  }
  .blog-aside .latest-post-aside .lpa-meta a {
    color: #6f8ba4;
    font-size: 12px;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 10px;
  }

  .tag-cloud a {
    padding: 4px 15px;
    font-size: 13px;
    color: #ffffff;
    background: #20247b;
    border-radius: 3px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
  .tag-cloud a:hover {
    background: #fc5356;
  }

  .blog-single {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .article {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    padding: 15px;
    margin: 15px 0 30px;
  }
  .article .article-title {
    padding: 10px 0 10px;
  }
  .article .article-title h6 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .article .article-title h6 a {
    text-transform: uppercase;
    color: #fc5356;
    border-bottom: 1px solid #fc5356;
  }
  .article .article-title h2 {
    color: #20247b;
    font-weight: 600;
  }
  .article .article-title .media {
    padding-top: 15px;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 20px;
  }
  .article .article-title .media .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
  }
  .article .article-title .media .media-body {
    padding-left: 8px;
  }
  .article .article-title .media .media-body label {
    font-weight: 600;
    color: #fc5356;
    margin: 0;
  }
  .article .article-title .media .media-body span {
    display: block;
    font-size: 12px;
  }
  .article .article-content h1,
  .article .article-content h2,
  .article .article-content h3,
  .article .article-content h4,
  .article .article-content h5,
  .article .article-content h6 {
    color: #20247b;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .article .article-content blockquote {
    max-width: 600px;
    padding: 15px 0 30px 0;
    margin: 0;
  }
  .article .article-content blockquote p {
    font-size: 20px;
    font-weight: 500;
    color: #fc5356;
    margin: 0;
  }
  .article .article-content blockquote .blockquote-footer {
    color: #20247b;
    font-size: 16px;
  }
  .article .article-content blockquote .blockquote-footer cite {
    font-weight: 600;
  }
  .article .tag-cloud {
    padding-top: 10px;
  }

  .article-comment {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    padding: 20px;
  }
  .article-comment h4 {
    font-weight: 700;
    margin-bottom: 25px;
    font-size: 22px;
  }
  img {
    max-width: 100%;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }

  /* Contact Us
---------------------*/
  .contact-name {
    margin-bottom: 30px;
  }
  .contact-name h5 {
    font-size: 22px;
    color: #20247b;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .contact-name p {
    font-size: 18px;
    margin: 0;
  }

  .social-share a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    margin-right: 10px;
  }
  .social-share .dribbble {
    box-shadow: 0 8px 30px -4px rgba(234, 76, 137, 0.5);
    background-color: #ea4c89;
  }
  .social-share .behance {
    box-shadow: 0 8px 30px -4px rgba(0, 103, 255, 0.5);
    background-color: #0067ff;
  }
  .social-share .linkedin {
    box-shadow: 0 8px 30px -4px rgba(1, 119, 172, 0.5);
    background-color: #0177ac;
  }

  .contact-form .form-control {
    border: none;
    border-bottom: 1px solid #20247b;
    background: transparent;
    border-radius: 0;
    padding-left: 0;
    box-shadow: none !important;
  }
  .contact-form .form-control:focus {
    border-bottom: 1px solid #fc5356;
  }
  .contact-form .form-control.invalid {
    border-bottom: 1px solid #ff0000;
  }
  .contact-form .send {
    margin-top: 20px;
  }
  @media (max-width: 767px) {
    .contact-form .send {
      margin-bottom: 20px;
    }
  }

  .section-title h2 {
    font-weight: 700;
    color: #20247b;
    font-size: 45px;
    margin: 0 0 15px;
    border-left: 5px solid #fc5356;
    padding-left: 15px;
  }
  .section-title {
    padding-bottom: 45px;
  }
  .contact-form .send {
    margin-top: 20px;
  }
  .px-btn {
    padding: 0 50px 0 20px;
    line-height: 60px;
    position: relative;
    display: inline-block;
    color: #20247b;
    background: none;
    border: none;
  }
  .px-btn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 30px;
    background: transparent;
    border: 1px solid rgba(252, 83, 86, 0.6);
    border-right: 1px solid transparent;
    -moz-transition: ease all 0.35s;
    -o-transition: ease all 0.35s;
    -webkit-transition: ease all 0.35s;
    transition: ease all 0.35s;
    width: 60px;
    height: 60px;
  }
  .px-btn .arrow {
    width: 13px;
    height: 2px;
    background: currentColor;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 25px;
  }
  .px-btn .arrow:after {
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-top: 2px solid currentColor;
    content: "";
    position: absolute;
    top: -3px;
    right: 0;
    display: inline-block;
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
