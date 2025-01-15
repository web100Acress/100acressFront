
import React, { useState, useEffect, useContext, useRef } from "react";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../MyContext";
import {LocationIcon, HeartIcon, ShareIcon,PhoneIcon, CarParkingIcon, ForwardIcon, BackwardIcon, LcoationBiggerIcon, ArrowIcon} from "../Assets/icons";
import styled from "styled-components";



const Data = [
  {
    id: 1,
    imgSrc:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/q49dy9od7ygss5onqayf"
  },
  {
    id: 2,
    imgSrc:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/jw10kpxm1abeqkzpc5sc"
  },
  {
    id: 3,
    imgSrc:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/kiizf8kfmyccung3t5wd"
  },
  {
    id: 4,
    imgSrc:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uploads/1734154358265-front.jpg"
  },
  {
    id: 5,
    imgSrc:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/buvpotgrcv5pxuudvoxe"
  }
]; // Data for the slider

const RentViewDetails = () => {

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
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [getContact, setGetContact] = useState("");
  const [buyData, setBuyData] = useState("");


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
      setBuyData(res.data.collectdata);
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { trendingProject } = useContext(DataContext);
 
  return (
    <div style={{ overflowX: "hidden" }}>
      <Wrapper>

      
      <div className="block w-11/12 mx-auto mt-20 mb-8">

      <div className="grid grid-cols-2 border">
        <div className="border mt-auto">
          <div>
            <h3>4S The Aurrum</h3>
            <h6>4S Developers</h6>
            <p className="flex"><LocationIcon color="#C13B44"/><span>Sector 59, Golf Course Extn Road, Gurugram</span></p>
          </div>
        </div>
        <div className="flex justify-end border self-end">
            <div>
              <h5 className="text-end">₹2.3Cr -5.1Cr</h5>
              <div className="flex gap-4">
                <HeartIcon />
                <ShareIcon />
                <div className="bg-primaryRed text-white px-3 py-2 rounded"><PhoneIcon/>7760540078</div>
              </div>
            </div>
        </div>
      </div>

      <img className="rounded-lg my-2" src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/q49dy9od7ygss5onqayf" alt="Project name"/>
      
      <div className="grid grid-cols-3 gap-4">

        <div className="border col-span-2">
          <div>
            <h3>About Property</h3>
            <p>Gurugram's beating heart, the New Golf Course Road Extension, has blossomed into a thriving hub. This growing community offers a vibrant mix of attractions & amenities creating a harmonius balance between urban energy & neighborly charm. Discover a place where friendly neighborhoods seamlessly connect with the city's pulse, offering a lifestyle as diverse as it is dynamic.</p>
          </div>
          <div>
            <h3>Property Highlights</h3>
              <ul className="list-disc">
                <li>3 Side Open Residences</li>
                <li>Triple Height Lobby</li>
                <li>Spacious Sun Decks</li>
                <li>2 Private Elevators in Every Tower</li>
                <li>Ample Car Parking</li>
              </ul>
          </div>
          <div className="">
            <h3>Amenities</h3>
            <div className="flex flex-col justify-center items-center w-1/3 bg-white p-4 shadow rounded-lg" >
                <CarParkingIcon/>
                <span>Car Parking</span>
            </div>
          </div>
            <div>
              <div className="my-4 ">
              <h5 className="text-4xl">Other Images</h5>
                <ImageGallery images={Data}/>
              </div>
              <div className="my-4 relative">
                <h5 className="text-4xl">Similar Properties</h5>
                <Carousel images={Data}/>
              </div>
          </div>
        </div>
        <div className="col-span-1 ">
            <div className="shadow-md p-4 rounded-lg mb-4 border-[0.2px]">
              <h3>Know more about property</h3>
              <input type="text" name="fullName" placeholder="Full Name" className="w-full border p-2 my-2"/>
              <input type="number" name="mobileNumber" placeholder="Mobile Number" className="w-full border p-2 my-2"/>
              <input type="email" name="email" placeholder="Email address" className="w-full border p-2 my-2"/>
              <p>Fill out form only one - time. After get the contact number</p>
              <button className="block w-full px-5 py-2 bg-primaryRed text-white rounded-md">Get Details</button>
            </div>
            <div className="shadow-md p-4 rounded-lg my-4 border-[0.2px]">
                <h5>Post your Property for <span>FREE!</span></h5>
                <button className="block w-full px-5 py-2 bg-primaryRed text-white rounded-md">List Properties <span>FREE</span></button>
            </div>
        </div>

      </div>
      </div>
      </Wrapper>
      <Footer />
    </div>
  );
};



// Other Images image gellery
const ImageGallery  = ({images})=>{
  const [showAll,setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isDragging,setIsDragging] = useState(false);
  const [startx,setStartX] = useState(0);
  const [scrollLeft,setScrollLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);


  const handleMouseDown = (e)=>{
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  }

  const handleMouseMove = (e)=>{
    if(!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x =  e.pageX - container.offsetLeft;
    const walk = (x - startx)*1.5;
    container.scrollLeft = scrollLeft - walk;
  }

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
      <div className={`flex rounded-md gap-2 overflow-x-auto no-scrollbar scroll-smooth`}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {imagesToRender.map((image) => (
          <img key={image.id} src={image.imgSrc} alt={`Image ${image.id}`} className="h-32 w-48 rounded-md"
          onClick={() => handleOpenModal(image.imgSrc)}
          onDragStart={(e) => e.preventDefault()}
          />
        ))}
              {images.length > 4 && !showAll && (
                <div className="relative">
                  <img
                    src={images[3].imgSrc}
                    alt={showAll ? 'Show Less' : 'Show More'} 
                    className="flex h-32 w-48 rounded-md basis-1/4 opacity-75 hover:opacity-100 cursor-pointer"
                    />
                  <div className="absolute top-0 left-0 h-32 w-48 rounded bg-black/70 text-white flex items-center justify-center text-center"
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
      </div>

      {/* Button to toggle the view */}

    </div>
  );
}

// Carousel
const Carousel = ({images})=>{

  const sliderRef = useRef();

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true, // Enables height adjustment
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

  return (
    <>
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute top-0 lg:top-0 sm:top-0 right-10 transform -translate-y-0 bg-white text-gray-500 p-2 rounded-full shadow-xl z-10"
      >
        <BackwardIcon />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute top-0 lg:top-0 sm:top-0 right-0 transform -translate-y-0 text-gray-700 bg-white p-2 rounded-full shadow-xl z-10"
      >
        <ForwardIcon />
      </button>
      <div className="">
        <Slider {...setting} ref={sliderRef} >
          {images.map((image) => (
          <section className="" >
            <div className="w-full">
                {/* const pUrl = item.project_url; */}
                    <Link  target="_top">
                      <article
                        key={image.id}
                        className="mx-2 transition overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                        onDrag={(e)=>{e.preventDefault()}}
                      >
                        <div className="p-3 relative overflow-hidden">
                          <img
                            src={image.imgSrc}
                            alt="property In Gurugram"
                            className="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                          />
                        </div>
                        <div className="p-2 pt-0">
                          <span className="text-[15px] font-semibold text-black-600 hover:text-red-600 duration-500 ease-in-out">
                            {"4S Aradhya Homes"}
                          </span>

                          <ul className="m-0 p-0 flex text-white-600 justify-between px-0 pb-0">
                            <li className="text-left flex items-end gap-2">
                              {/* Icon */}
                              <span className="text-red-600 flex-shrink-0">
                                <LcoationBiggerIcon />
                              </span>
                              {/* Text */}
                              <div className="text-sm font-thin truncate w-64 md:w-64 lg:w-32 xl:w-48">
                                <span className="text-sm text-white-600 hover:text-red-600 duration-500 ease-in-out block truncate">
                                  {"Gurugram, Haryana"}
                                </span>
                                <span className="text-xs text-[#656565] block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                  {"Gurugram, Haryana"}
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
        </Slider>
      </div>
    </>
  )
}



export default RentViewDetails;


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
  

`


