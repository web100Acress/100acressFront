import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  Image,
  AvatarBadge,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../Images/100acress.png";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { IoHeadsetOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { Ri24HoursLine } from "react-icons/ri";
import { DataContext } from "../MyContext";
const SpacerComponent = () => <Box width="60px" />;

const MenuListContainer = ({ isOpen }) => {
  const history = useNavigate();
  const showToastMessage = () => {
    toast.success("Logging out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const HandleUserLogout = async () => {
    try {
      await axios.get("https://api.100acress.com/postPerson/logout");
      history("/");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const token = localStorage.getItem("myToken");
  return (
    <>
      {token ? (
        <>
          <Box
            position="absolute"
            mt={{ base: "43px", md: "43px", sm: "43px" }}
            right={0}
            zIndex={1}
            bg="white"
            p={2}
            whiteSpace="nowrap"
            rounded="md"
            display={isOpen ? "block" : "none"}
          >
            <ToastContainer />

            <MenuItem fontSize="sm">
              <NavLink to={`/userdashboard/`}>View Profile</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Edit Profile</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Change Password</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Delete account</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm" onClick={() => HandleUserLogout({})}>
              <NavLink onClick={showToastMessage}>LogOut</NavLink>
            </MenuItem>
          </Box>{" "}
        </>
      ) : (
        <>
          <Box
            position="absolute"
            mt={{ base: "40px", md: "40px", sm: "40px" }}
            right={0}
            zIndex={1}
            bg="white"
            p={1}
            whiteSpace="nowrap"
            rounded="md"
            display={isOpen ? "block" : "none"}
          >
            <ToastContainer />

            <MenuItem fontSize="sm" color={"red"}>
              <NavLink to="/signin/">Login/</NavLink>
              <NavLink to="/signup/">Register</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Recently Searched</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Shortlisted</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink>Contacted</NavLink>
            </MenuItem>
          </Box>
        </>
      )}
    </>
  );
};

export default function Nav() {
  // Filter Data budget wise
  const {priceRange, setPriceRange} = useContext(DataContext);
  
  const handlePriceClick = (min, max) => {
    setPriceRange({ min, max });
  };
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);

  const [showHeadsetDropdown, setShowHeadsetDropdown] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const handleHeadMouseEnter = () => {
    setShowHeadsetDropdown(true);
  };

  const handleHeadMouseLeave = () => {
    setShowHeadsetDropdown(false);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHover2 = () => {
    setMenuOpen2(true);
  };

  const handleLeave2 = () => {
    setMenuOpen2(false);
  };

  const handleHover = () => {
    setMenuOpen(true);
  };

  const handleLeave = () => {
    setMenuOpen(false);
  };
  const handleHover1 = () => {
    setMenuOpen1(true);
  };

  const handleLeave1 = () => {
    setMenuOpen1(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginRegisterClick = () => {
    setShowLoginModal(true);
    onClose();
  };

  const [token, setToken] = useState();

  const checkUserAuth = () => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

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

  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

  const resetData = () => {
    setFormDataInquiry({
      name: "",
      mobile: "",
      email: "",
      message: "",
      status: "",
    });
  };
  const handleInquirySubmitData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, message } = formDataInquiry;
    if (!name || !email || !mobile || !message) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const res = await axios.post(
        "https://api.100acress.com/contact_Insert",
        formDataInquiry
      );
      alert("Data submitted successfully");
      resetData();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    setFormDataInquiry({ ...formDataInquiry, [name]: value });
  };

  return (
    <Wrapper className="section">
      <Box>
        {/* #c13335  #ab2727 #7a3351  #A10302 */}
        <Box bg="#ED2201" px={{ base: 0, md: 4, lg: 7 }}>
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
              variant="unstyled"
              _hover={{ bg: "none" }}
              _active={{ bg: "none" }}
              _focus={{ boxShadow: "none" }}
              color="white"
            />
            <HStack
              spacing={isSmallerThan768 ? 0 : 8}
              alignItems="center"
              flex="1"
            >
              <Box>
                <Link to={"/"}>
                  <Image
                    maxW={["160px", "200px"]}
                    minW={["50px", "70px"]}
                    width={["xs", "sm", "md", "lg"]}
                    src={logoImage}
                    alt="100acress logo"
                  />
                </Link>
              </Box>

              {!isSmallerThan768 && (
                <>
                  <div
                    className="relative group"
                    onMouseEnter={handleHover1}
                    onMouseLeave={handleLeave1}
                  >
                    <Link to="/buy-properties/best-resale-property-in-gurugram/">
                      <button className=" text-white font-semibold text-lg ">
                        Buy
                      </button>
                    </Link>
                    <div
                      className={`absolute bg-white py-2 text-gray-800 w-90 rounded-md shadow-lg z-10 ${
                        isMenuOpen1 ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex ">
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block px-4 py-1  text-black text-lg "
                          >
                            Popular Choices
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Ready to Move
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Owner Choices
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Budget Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Premium homes
                          </Link>
                          <Link
                            to="#"
                            className=" text-sm px-4  hover:text-red-600 flex items-center"
                          >
                            NewlyLaunched
                            <span className="flex border rounded-md text-white bg-red-600 py-0 px-1 ">
                              Free
                            </span>
                          </Link>
                        </div>

                        <div className="w-52 mb-4">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 "
                          >
                            Property Types <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Flats in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1  hover:text-red-600"
                          >
                            House For Sale in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Villa in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1  hover:text-red-600"
                          >
                            Plots in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Office Place in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:text-red-600"
                          >
                            Retail Space in Gurugram
                          </Link>
                        </div>
                        <div className="w-40">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-4 py-1  hover:text-red-600"
                          >
                            Budget
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            under ₹50 Lac
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            ₹50 Lac - ₹1 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            ₹1 Cr - ₹2.5 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            ₹2.5 Cr - ₹5 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Above ₹5 Cr
                          </Link>
                        </div>
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 "
                          >
                            Explore
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:text-red-600"
                          >
                            Localities in Gurugram
                          </Link>
                          <Link
                            to="/projects-in-gurugram/"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Projects in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Investment Hotspot
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Find an Agent
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative group "
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                  >
                    <Link to="/rental-properties/best-rental-property-in-gurugram/">
                      <button className="text-white font-semibold text-lg ">
                        Rent
                      </button>
                    </Link>
                    <div
                      className={`absolute  bg-white py-2 text-gray-800 w-90  rounded-md shadow-lg z-10 ${
                        isMenuOpen ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex">
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block px-4 py-1 text-black  text-lg "
                          >
                            Popular Choices
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Owner Properties
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Verified Properties
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Furnished Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Bachelor Friendly Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Immediately Available
                          </Link>
                        </div>

                        <div className="w-52">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 "
                          >
                            Property Types
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Flats for Rent in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1  hover:text-red-600"
                          >
                            House for Rent in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2   hover:text-red-600"
                          >
                            Villa for Rent in Gurugram
                          </Link>

                          <Link
                            to="#"
                            className="block text-sm px-2 py-1  hover:text-red-600"
                          >
                            Office Space in Gurugram
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:text-red-600"
                          >
                            Commercial Space in Gurugram
                          </Link>
                        </div>

                        <div className="w-40">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-4 py-1  hover:text-red-600"
                          >
                            Budget
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Under ₹50 Lac
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            ₹50 Lac - ₹1 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            ₹1 Cr - ₹2.5 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            ₹2.5 Cr - ₹5 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Above ₹5 Cr
                          </Link>
                        </div>
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block text-black text-lg px-4 py-1 "
                          >
                            Explore
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4  hover:text-red-600"
                          >
                            Localities
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Buy vs Rent
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Find an Agent
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Share Requirement
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Property Services
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Rent Agreement
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {token ? (
                    <Link
                      to={"/postproperty/"}
                      className="text-white font-semibold text-lg"
                    >
                      <span onClick={checkUserAuth}>Sell</span>
                    </Link>
                  ) : (
                    <Link
                      to={"/signin/"}
                      className="text-white font-semibold text-lg"
                    >
                      Sell
                    </Link>
                  )}

                  <div
                    className="relative group "
                    onMouseEnter={handleHover2}
                    onMouseLeave={handleLeave2}
                  >
                    <Link
                    // to={"/projects-in-gurugram/"}
                    >
                      <button className="text-white font-semibold text-lg ">
                        Projects
                      </button>
                    </Link>
                    <div
                      className={`absolute  bg-white py-2 text-gray-800 w-90  rounded-md shadow-lg z-10 ${
                        isMenuOpen2 ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex mb-3">
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block px-4 py-1 text-black  text-lg "
                          >
                            Popular Cities
                            <hr className="mt-1" />
                          </Link>

                          <Link
                            to={"/projects-in-gurugram/"}
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Projects in Gurugram
                          </Link>

                          <Link
                            to={"/project-in-delhi/"}
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Projects in Delhi
                          </Link>

                          <Link
                            to={`/project-in-noida/`}
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Projects in Noida
                          </Link>

                          <Link
                            to={`/project-in-goa/`}
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Projects in Goa
                          </Link>

                          <Link
                            to="#"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Projects in Ayodhya
                          </Link>

                          <Link
                            to="#"
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            Projects in Mumbai
                          </Link>

                          <Link
                            to={`/project-in-panipat/`}
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Projects in Panipat
                          </Link>
                        </div>
                        {/* I am Working here */}

                        <div className="w-40">
                          <Link
                            to="#"
                            className="block text-black text-lg px-4 py-1 hover:text-red-600"
                          >
                            Budget
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 hover:text-red-600"
                            onClick={() => handlePriceClick(0, 1)}
                          >
                            Under ₹1 Cr
                          </Link>
                          <Link
                             to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 py-1 hover:text-red-600"
                            onClick={() => handlePriceClick(1, 5)}
                          >
                            ₹1 Cr - ₹5 Cr
                          </Link>
                          <Link
                            to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 py-1 hover:text-red-600"
                            onClick={() => handlePriceClick(5, 10)}
                          >
                            ₹5 Cr - ₹10 Cr
                          </Link>
                          <Link
                             to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 py-1 hover:text-red-600"
                            onClick={() => handlePriceClick(10, 20)}
                          >
                            ₹10 Cr - ₹20 Cr
                          </Link>
                          <Link
                             to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 py-1 hover:text-red-600"
                            onClick={() => handlePriceClick(20, Infinity)}
                          >
                            Above ₹20 Cr
                          </Link>
                        </div>

                        
                      </div>
                    </div>
                  </div>
                </>
              )}
            </HStack>

            <Flex alignItems="center">
              <div className="" style={{ marginRight: "-40px" }}>
                {token ? (
                  <Link to="/postproperty/">
                    <button className="btn flex btn-light text-black btn-sm sm:p-1 sm:text-sm">
                      <strong
                        onClick={checkUserAuth}
                        className="text-red-600 mr-2"
                      >
                        Post Property
                      </strong>
                      <Link className="d-none d-xl-inline d-md-inline">
                        <button
                          className="btn btn-danger p-0 text-bold"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "50px",
                            height: "20px",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              animation: "moveHorizontal 1s linear infinite",
                              backdropFilter: "blur(5px)",
                              filter: "blur(5px)",
                            }}
                          >
                            <ScaleLoader color="#FFFFFF" />
                          </div>
                          FREE
                          <style>{keyframes}</style>
                        </button>
                      </Link>
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin/">
                    <button className="btn flex btn-light text-black btn-sm sm:p-1 sm:text-sm">
                      <strong
                        onClick={checkUserAuth}
                        className="text-red-600 mr-2"
                      >
                        Post Property
                      </strong>
                      <Link className="d-none d-xl-inline d-md-inline">
                        <button
                          className="btn btn-danger p-0 text-bold"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "50px",
                            height: "20px",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              animation: "moveHorizontal 1s linear infinite",
                              backdropFilter: "blur(5px)",
                              filter: "blur(5px)",
                            }}
                          >
                            <ScaleLoader color="#FFFFFF" />
                          </div>
                          FREE
                          <style>{keyframes}</style>
                        </button>
                      </Link>
                    </button>
                  </Link>
                )}
              </div>
              <SpacerComponent />

              <div className="flex gap-4 ">
                <div
                  className="relative group hidden md:block "
                  onMouseEnter={handleHeadMouseEnter}
                  onMouseLeave={handleHeadMouseLeave}
                >
                  <IoHeadsetOutline
                    size="32"
                    className="inline-block"
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "white",
                      padding: "4px",
                      marginRight: "-14px",
                      marginTop: "5px",
                    }}
                  />
                  <div
                    className={`absolute mt-1 right-[-80] bg-gray-100 p-3 shadow-md rounded-lg ${
                      showHeadsetDropdown ? "block" : "hidden"
                    }`}
                    style={{ zIndex: 10 }}
                  >
                    <div className="w-44 h-30 ">
                      <p className="font-bold text-gray-500 mb-0">Call Now</p>
                      <div className="flex items-center">
                        <Ri24HoursLine />
                        <p
                          className="text-sm ml-2 font-semibold text-gray-600"
                          style={{ marginBottom: "0px" }}
                        >
                          24 x 7
                        </p>
                      </div>
                      <span className="flex items-center pt-1  ">
                        <IoCall className="text-gray-600" />
                        <span className="text-sm font-semibold text-gray-600 ml-2">
                          +91 8500-900-100
                        </span>
                      </span>
                      <div className="flex justify-center ">
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded-lg"
                          style={{ marginTop: "14px" }}
                          onClick={() => setShowSteps(!showSteps)}
                        >
                          Request a Callback
                        </button>
                      </div>
                    </div>
                  </div>
                  {showSteps && (
                    <div className="fixed inset-0 hidden sm:block md:block lg:flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                      <div className="rounded-xl px-4 py-4 relative w-1/2 h-70">
                        <div>
                          <div className="flex justify-center homeFrom_modal ">
                            <div className="w-4/5 my-5 mx-auto flex flex-col items-center justify-center md:flex-row ">
                              <div className="border w-[70%] h-full bg-white text-black p-2 lg:p-10 md:p-10 sm:p-4 rounded-xl relative">
                                <button
                                  type="button"
                                  className="btn-close absolute top-2 right-2"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  onClick={() => setShowSteps(false)}
                                ></button>
                                <div className="my-4 leading-7 text-center">
                                  <input
                                    type="text"
                                    name="name"
                                    value={formDataInquiry.name}
                                    onChange={handleInquiryDataChange}
                                    placeholder="Full Name"
                                    className="border-b-2 w-[80%] mb-4 p-1 border-b-black placeholder:text-black text-sm text-black bg-white focus:outline-none"
                                  />
                                  <input
                                    type="email"
                                    name="email"
                                    value={formDataInquiry.email}
                                    onChange={handleInquiryDataChange}
                                    placeholder="Email Address"
                                    className="border-b-2 w-[80%] mb-4 p-1 border-b-black placeholder:text-black placeholder:opacity-80 text-sm bg-white  focus:outline-none"
                                  />
                                  <input
                                    type="number"
                                    name="mobile"
                                    value={formDataInquiry.mobile}
                                    onChange={handleInquiryDataChange}
                                    placeholder="Mobile"
                                    className="border-b-2 w-[80%] mb-4 p-1 border-b-black placeholder:text-black placeholder:opacity-80 text-sm  bg-white focus:outline-none"
                                  />
                                  <textarea
                                    id="message"
                                    name="message"
                                    value={formDataInquiry.message}
                                    onChange={handleInquiryDataChange}
                                    placeholder="Write us a message"
                                    className="w-[80%] bg-white border-b-2 border-b-black h-10 text-sm  placeholder:text-black placeholder:opacity-80  py-1 px-2 resize-none leading-6 duration-200 ease-in-out focus:outline-none"
                                    defaultValue={""}
                                  />
                                  <button
                                    className="block m-auto w-[60%] mt-4 md:w-[50%] text-center border bg-red-600 hover:bg-red-400 rounded-full py-1  text-lg font-bold tracking-wide uppercase text-white brightness-105"
                                    onClick={handleInquirySubmitData}
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Menu>
                  <MenuButton
                    as={Button}
                    borderRadius="l"
                    variant="unstyled"
                    aria-label="Profile"
                    onClick={handleAvatarClick}
                  >
                    {token ? (
                      <>
                        <Avatar
                          boxSize={{ base: "1.7em", md: "1.8em" }}
                          bgColor="white"
                          marginLeft={{ base: 0, md: "0" }}
                          icon={
                            <AvatarBadge
                              boxSize={{ base: "0", md: "0.8em", sm: "0.8em" }}
                              bg="green.500"
                              border="2px"
                              borderColor="white"
                              darkBorderColor="gray.800"
                              rounded="full"
                            />
                          }
                        >
                          <img
                            className="w-16 h-10 rounded-full "
                            src="../../Images/logoAvtar.png"
                            alt=""
                          />
                        </Avatar>
                      </>
                    ) : (
                      <>
                        <Avatar
                          boxSize={{ base: "1.7em", md: "1.8em" }}
                          bgColor="white"
                          marginLeft={{ base: 0, md: "0" }}
                          icon={
                            <AvatarBadge
                              boxSize={{ base: "0", md: "0.8em", sm: "0.8em" }}
                              bg="red.500"
                              border="2px"
                              borderColor="white"
                              darkBorderColor="gray.800"
                              rounded="full"
                            />
                          }
                        >
                          <img
                            className="w-16 h-10 rounded-full"
                            src="../../Images/logoAvtar.png"
                            alt="logoAvtar"
                          />
                        </Avatar>
                      </>
                    )}
                  </MenuButton>

                  <MenuListContainer
                    isOpen={isDropdownOpen}
                    onClose={onClose}
                    onLoginRegisterClick={handleLoginRegisterClick}
                  />
                </Menu>
              </div>
            </Flex>
          </Flex>

          {isOpen && (
            <Box
              pb={4}
              display={{
                base: "0em",
                sm: "30em",
                md: "48em",
                lg: "62em",
                xl: "80em",
              }}
            >
              <Stack color="white" as="nav" spacing={4}>
                <Link
                  to={"/rental-properties/best-rental-property-in-gurugram/"}
                  className="text-white font-semibold mx-3 text-lg"
                >
                  Rent
                </Link>

                <Link
                  to={"/buy-properties/best-resale-property-in-gurugram/"}
                  className="text-white font-semibold text-lg mx-3"
                >
                  Buy
                </Link>

                {token ? (
                  <Link
                    to={"/postproperty/"}
                    className="text-white font-semibold text-lg mx-3"
                  >
                    <span onClick={checkUserAuth}>Sell</span>
                  </Link>
                ) : (
                  <Link
                    to={"/signin/"}
                    className="text-white font-semibold text-lg mx-3"
                  >
                    Sell
                  </Link>
                )}

                <Link
                  to={"/projects-in-gurugram/"}
                  className="text-white font-semibold text-lg mx-3"
                >
                  Projects
                </Link>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .shimmer-container {
    position: relative;
    width: 200px;
    height: 40px;
    overflow: hidden;
    background-color: #800e0e; /* Background color for the shimmer effect */
  }

  /* Styling for the shimmer animation */
  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    ); /* Shimmer gradient */
    animation: shimmerAnimation 2s infinite; /* Animation properties */
  }

  /* Keyframes for the shimmer animation */
  @keyframes shimmerAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Basic text styling */
  .text {
    margin: 10px;
    font-size: 18px;
  }
`;
