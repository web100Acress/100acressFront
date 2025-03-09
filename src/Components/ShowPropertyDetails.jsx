import React, { useState, useEffect, useContext, useRef } from "react";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Skeleton } from "antd";
import { Link, useParams } from "react-router-dom";
import {
  ShareIcon,
  PhoneIcon,
  ForwardIcon,
  BackwardIcon,
  LcoationBiggerIcon,
  ArrowIcon,
} from "../Assets/icons";
import styled from "styled-components";
import Gallery from "../Components/Gallery";

const ShowPropertyDetails = ({ id }) => {
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
  const [rentViewDetails, setRentViewDetails] = useState();
  const [buyData, setBuyData] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const [GalleryImageData, setGalleryImageData] = useState([]);
  const [OpenGallery, setOpenGallery] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.100acress.com/property/view/${id}`
        );
        if (res.data.data) {
          setRentViewDetails(res.data.data);
          console.log(res.data.data, "res.data.data");
          setLoading(false);
        } else {
          setRentViewDetails(res.data.postData.postProperty[0]);
          setLoading(false);
          let ImagesData = res.data.postData.postProperty[0].otherImage.map(
            (image) => {
              return {
                url: image.url,
                thumbnail: image.url,
              };
            }
          );
          ImagesData.push({
            url: res.data.postData.postProperty[0].frontImage.url,
            thumbnail: res.data.postData.postProperty[0].frontImage.url,
          });
          setGalleryImageData(ImagesData);
          // console.log(ImagesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.propertyName,
          text: `Check out this project: ${project.propertyName}`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share functionality is not supported on this device/browser.");
    }
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
        const response = await axios.post("https://api.100acress.com/postEnquiry", {
          ...userForm,
          propertyAddress: rentViewDetails.address,
        });

        alert(response.data.message);
        setShowNumber(true);
        resetUser();
      } catch (error) {
        console.error("Registration failed:", error);
        setShowNumber(false);

        if (error.response) {
          alert(`Server responded with an error: ${error.response.status}`);
          setShowNumber(false);
        } else if (error.request) {
          alert("No response received from the server");
          setShowNumber(false);
        } else {
          alert(`Error setting up the request: ${error.message}`);
          setShowNumber(false);
        }
      }
    } else {
      alert("Please fill the data");
      setShowNumber(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/property/buy/ViewAll");
      console.log(res.data.collectdata, "All Buyable Property Information");
      setBuyData(res.data.collectdata);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div >
      <Wrapper>
        {loading ? (
          <Skeleton active />
        ) : (
          rentViewDetails && (
            <div className="block w-11/12 mx-auto mt-20 mb-8">
              {OpenGallery && (
                <Gallery
                  images={GalleryImageData}
                  OpenGallery={OpenGallery}
                  setOpenGallery={setOpenGallery}
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mt-auto">
                  <div>
                    <h3 className="text-2xl font-semibold capitalize">
                      {rentViewDetails.propertyName}
                    </h3>
                    <h6 className="text-base capitalize">
                      <span className="font-medium mr-2">
                        {rentViewDetails.propertyType}
                      </span>
                      <span>{rentViewDetails.area}</span>
                    </h6>
                    <p className="flex text-sm">
                      <LcoationBiggerIcon color="#C13B44" />
                      <span className="ml-2 text-primaryRed capitalize">
                        {rentViewDetails.address}, {rentViewDetails.city},{" "}
                        {rentViewDetails.state}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-start self-start md:justify-end md:self-end">
                  <div className="block w-full">
                    <h5 className="text-end text-2xl font-medium text-primaryRed">
                      &#8377;
                      {rentViewDetails.price}
                    </h5>
                    <div className="flex justify-between align-bottom items-end md:justify-end gap-4">
                      {/* <HeartIcon /> */}
                      <div
                        className="hover:cursor-pointer"
                        onClick={() => handleShare(rentViewDetails)}
                      >
                        <ShareIcon />
                      </div>
                      {showNumber ? (
                        <div className="bg-primaryRed  text-white p-2 rounded relative">
                          <a
                            className="text-base hover:text-white"
                            href={`tel:${rentViewDetails.number}`}
                          >
                            <PhoneIcon className="" />
                            <span className="mx-2">{rentViewDetails.number}</span>
                          </a>
                        </div>
                      ) : (
                        <div className="bg-primaryRed text-base  text-white px-3 py-2 rounded">
                          <PhoneIcon />
                          {rentViewDetails.number.slice(0, 2) +
                            "**********" +
                            rentViewDetails.number.slice(11)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3  my-2 gap-4 ">
                <div className="col-span-2  ">
                  <div class="grid grid-cols-4 grid-rows-3 gap-1 relative">
                    <div
                      className={`col-span-3 row-span-3  h-full ${
                        rentViewDetails.otherImage.length >= 4
                          ? "col-span-2"
                          : "col-span-4"
                      }`}
                    >
                      <img
                        className="col-span-2 row-span-3 rounded-lg object-cover w-full h-[50vh] md:h-[83vh] border"
                        src={rentViewDetails.frontImage.url}
                        alt="Project name"
                        loading="lazy"
                      />
                    </div>
                    {rentViewDetails.otherImage.length >= 4 &&
                      rentViewDetails.otherImage.slice(1, 4).map((image) => (
                        <img
                          key={image.url}
                          onClick={() => {
                            setOpenGallery(true);
                          }}
                          className="col-span-1 row-span-1 rounded-lg cursor-pointer object-cover w-full h-[15vh] md:h-[27vh] border "
                          src={image.url}
                          alt="Project name"
                          loading="lazy"
                        />
                      ))}
                    {rentViewDetails.otherImage.length >= 4 && (
                      <div
                        onClick={() => {
                          setOpenGallery(true);
                        }}
                        class="absolute text-white text-center flex items-center justify-center h-[16vh] md:h-[27vh] w-1/4 border rounded-lg bg-black/50 bottom-1 right-0 cursor-pointer "
                      >
                        {rentViewDetails.otherImage.length - 3} + Photos
                      </div>
                    )}
                  </div>
                  <div className="my-4">
                    <h3 className="text-2xl  capitalize">About Property</h3>
                    <p className="text-base">
                      {rentViewDetails.descripation
                        ? rentViewDetails.descripation
                        : "Please call us for further information"}
                    </p>
                  </div>
                  <div className="my-4 text-2xl  capitalize">
                    <h3>Property Highlights</h3>
                    <ul className="list-disc text-base capitalize ">
                      <li
                        className={`${rentViewDetails.area ? " " : "hidden"}`}
                      >
                        {rentViewDetails.area}
                      </li>
                      <li
                        className={`${
                          rentViewDetails.furnishing ? " " : "hidden"
                        }`}
                      >
                        {rentViewDetails.furnishing}
                      </li>
                      <li
                        className={`${
                          rentViewDetails.landMark ? " " : "hidden"
                        }`}
                      >
                        {rentViewDetails.landMark}
                      </li>
                      <li
                        className={`${rentViewDetails.type ? " " : "hidden"}`}
                      >
                        {rentViewDetails.type}
                      </li>
                    </ul>
                  </div>
                  {/* <div className="my-4">
                  <h3>Amenities</h3>
                  <div className="flex flex-col justify-center items-center w-1/3 bg-white my-4 p-4 shadow rounded-lg" >
                      <CarParkingIcon/>
                      <span>Car Parking</span>
                  </div>
                </div> */}
                  <div>
                    {rentViewDetails.otherImage.length <= 3 && (
                      <div className="my-4 ">
                        <h5
                          className={`text-2xl  capitalize ${
                            rentViewDetails.otherImage.length === 0
                              ? "hidden"
                              : ""
                          }`}
                        >
                          Other Images
                        </h5>
                        <ImageGalleryView images={rentViewDetails.otherImage} />
                      </div>
                    )}
                    <div className="my-4 relative">
                      <h5 className="text-2xl  capitalize">Similar Properties</h5>
                      <Carousel AllProjects={buyData} />
                    </div>
                  </div>
                </div>
                {/* Sidebar contact sticky */}
                <div className="col-span-1  ">
                  <div className="sticky top-16">
                    <div className="bg-white shadow-md p-4 rounded-lg mb-4 border-[0.2px]">
                      <h3 className="text-2xl " >Know more about property</h3>
                      <input
                        type="text"
                        name="custName"
                        placeholder="Full Name"
                        className="w-full border p-2 my-2 rounded-lg"
                        onChange={handleUserFormChange}
                      />
                      <input
                        type="number"
                        name="custNumber"
                        placeholder="Mobile Number"
                        className="w-full border p-2 my-2 rounded-lg"
                        onChange={handleUserFormChange}
                      />
                      <input
                        type="email"
                        name="custEmail"
                        placeholder="Email address"
                        className="w-full border p-2 my-2 rounded-lg"
                        onChange={handleUserFormChange}
                      />
                      <p className="text-sm text-primaryRed">
                        Fill out form only one - time. After get the contact
                        number
                      </p>
                      <button
                        className="block w-full px-5 py-2 text-base font-semibold bg-primaryRed text-white rounded-md"
                        onClick={handleSubmitFormData}
                      >
                        Get Details
                      </button>
                    </div>
                    <div className="shadow-md p-4 rounded-lg my-4 border-[0.2px]">
                      <h5 className="text-2xl ">
                        Post your Property for{" "}
                        <span className="text-2xl  text-primaryRed">FREE!</span>
                      </h5>
                      <Link to={"http://localhost:3000/postproperty/"}>
                        <button className="block w-full px-5 py-2 text-base  bg-primaryRed text-white rounded-md">
                          List Properties{" "}
                          <span className="bg-white text-xs  text-primaryRed p-1 mx-1 rounded">
                            FREE
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

// Other Images image gellery
const ImageGalleryView = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startx, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startx) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleOpenModal = (imgSrc) => {
    setIsModalOpen(true);
    setCurrentImage(imgSrc);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleShowAll = () => setShowAll((prevState) => !prevState);

  const imagesToRender = showAll ? images : images.slice(0, 3);

  return (
    <div>
      {/* Render the images */}
      <div
        className={`flex rounded-md gap-2 overflow-x-auto no-scrollbar scroll-smooth`}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {imagesToRender.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={`Image ${image.public_id}`}
            className="h-36 w-52 rounded-md object-cover"
            loading="lazy"
            onClick={() => handleOpenModal(image.url)}
            onDragStart={(e) => e.preventDefault()}
          />
        ))}
        {images.length > 3 && !showAll && (
          <div className="relative">
            <img
              src={images[3].url}
              alt={showAll ? "Show Less" : "Show More"}
              className="flex h-36 w-52 rounded-md basis-1/4 opacity-75 hover:opacity-100 cursor-pointer"
              loading="lazy"
            />
            <div
              className="absolute top-0 left-0 h-36 w-52 rounded bg-black/70 text-white flex items-center justify-center text-center"
              onClick={toggleShowAll}
            >
              +{images.length - 3} photos
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 pt-10 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-base bg-white px-3 py-2 rounded-full z-10"
              >
                &times;
              </button>
              <img
                src={currentImage}
                alt="Full View"
                className="max-w-[80vw] max-h-[80vh] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>

      {/* Button to toggle the view */}
    </div>
  );
};

// Carousel
const Carousel = ({ AllProjects }) => {
  
  const sliderRef = useRef();

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false, // Enables height adjustment
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="mr-2 absolute top-0 lg:top-0 sm:top-0 right-10 transform -translate-y-1 bg-white text-gray-700 p-2 rounded-full shadow-xl z-10"
      >
        <BackwardIcon />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="ml-2 absolute top-0 lg:top-0 sm:top-0 right-0 transform -translate-y-0 text-gray-700 bg-white p-2 rounded-full shadow-xl z-10"
      >
        <ForwardIcon />
      </button>
      <div className="">
        <Slider {...setting} ref={sliderRef}>
          {AllProjects.length > 0 &&
            AllProjects.filter(
              (item) => item.postProperty && item.postProperty.length > 0
            ).map((project) => (
              <>
                {project.postProperty.slice(0, 1).map((nestedItem) => (
                  <section className="">
                    <div className="w-full">
                      {/* const pUrl = item.project_url; */}
                      <Link
                        to={
                          nestedItem.propertyName && nestedItem._id
                            ? `/rental-properties/${nestedItem.propertyName.replace(
                                /\s+/g,
                                "-"
                              )}/${nestedItem._id}/`
                            : "#"
                        }
                        target="_top"
                      >
                        <article
                          key={nestedItem._id}
                          className="mx-2 transition overflow-hidden rounded-md  text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                          onDrag={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <div className="p-3 relative overflow-hidden">
                            <img
                              src={nestedItem.frontImage.url}
                              alt="property In Gurugram"
                              className="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-2 pt-0">
                            <span className="text-[15px]  text-black-600  hover:text-red-600 duration-500 ease-in-out">
                              {nestedItem.propertyName.length > 15
                                ? `${nestedItem.propertyName.slice(0, 15)}...`
                                : nestedItem.propertyName}
                            </span>

                            <ul className="m-0 p-0 flex text-white-600 justify-between px-0 pb-0">
                              <li className="text-left flex items-end gap-2">
                                {/* Icon */}
                                <span className="text-red-600 flex-shrink-0">
                                  <LcoationBiggerIcon />
                                </span>
                                {/* Text */}
                                <div className="text-sm font-thin truncate w-64 md:w-64 lg:w-32 ">
                                  <span className="text-sm text-white-600 hover:text-red-600 duration-500 ease-in-out block truncate">
                                    {nestedItem.address}
                                  </span>
                                  <span className="text-xs text-[#656565] block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                    {nestedItem.city},{nestedItem.state}
                                  </span>
                                </div>
                              </li>

                              <li className=" text-left flex item-center">
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1 py-1 text-center me-2"
                                >
                                  <ArrowIcon />
                                </button>
                              </li>
                            </ul>
                          </div>
                        </article>
                      </Link>
                    </div>
                  </section>
                ))}
              </>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default ShowPropertyDetails;

const Wrapper = styled.section`
  /* Override slick slider container styles */
  .slick-slider {
    height: auto !important;
  }

  .slick-list {
    overflow: hidden; /* Ensure no overflow issues */
    height: auto !important;
  }

  /* Adjust slides to fit content */
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align items at the top */
    height: auto !important;
  }

  /* Ensure the carousel adapts to content */
  .slick-track {
    display: flex;
    align-items: flex-start;
    height: auto !important;
  }
`;
