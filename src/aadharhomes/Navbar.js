import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  Image,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import logoImage from "../Images/100acress.png";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
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
      await axios.get("http://api.100acress.com:3500/postPerson/logout");
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

export default function Navbar() {
  // Filter Data budget wise
  const {  setPriceRange } = useContext(DataContext);

  const handlePriceClick = (min, max) => {
    setPriceRange({ min, max });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);



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

  const [token, setToken] = useState();

  const checkUserAuth = () => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <Wrapper className="section">
      <Box>
        <Box
          bg={"white"}
          className="top-0 z-50 w-full "
          px={{ base: 0, md: 4, lg: 7 }}
        >
          <Flex h={12} alignItems="center" justifyContent="space-between">
            <IconButton
              size={"md"}
              marginRight={2}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ lg: "none" }}
              onClick={isOpen ? onClose : onOpen}
              variant="unstyled"
              _hover={{ bg: "none" }}
              _active={{ bg: "none" }}
              _focus={{ boxShadow: "none" }}
              color="red"
            />

            <HStack
              spacing={isSmallerThan768 ? 0 : 8}
              alignItems="center"
              flex="1"
            >
              <Box marginLeft={"-18px"}>
                {" "}
                {/* Adjust values as needed */}
                <Link to={"/"}>
                  <Image
                    maxW={["160px", "200px"]}
                    minW={["50px", "70px"]}
                    width={["xs", "sm", "md", "lg"]}
                    src="../../Images/logo.png"
                    alt="100acress logo"
                    marginBottom={2}
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
                      <button className=" text-red-600 pt-1  text-sm  uppercase font-bold ">
                        Resale
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
                            className="block text-sm px-2 py-1  hover:text-red-600"
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
                            className="block text-sm px-2 py-1  hover:text-red-600"
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
                            className="block text-sm px-2  py-1  hover:text-red-600"
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
                      <button className="text-red-600 pt-1 text-sm font-bold uppercase ">
                        Rental
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
                            className="block text-sm px-4  hover:text-red-600"
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
                      className="text-red-600 hover:text-red-600  font-bold  uppercase pt-1  text-sm"
                    >
                      <span onClick={checkUserAuth}>List Property </span>
                    </Link>
                  ) : (
                    <Link
                      to={"/signin/"}
                      className="text-red-600 hover:text-red-600 font-bold uppercase pt-1 text-sm"
                    >
                      List Property
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
                      <button className="text-red-600 uppercase font-bold pt-1  text-sm ">
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
                            to="/project-in-ayodhya/"
                            className="block text-sm px-4   hover:text-red-600"
                          >
                            Projects in Ayodhya
                          </Link>

                          <Link
                            to={`/project-in-mumbai/`}
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

                          <Link
                            to={`/project-in-panchkula/`}
                            className="block text-sm px-4 py-1   hover:text-red-600"
                          >
                            Projects in Panchkula
                          </Link>

                          <Link
                            to={`/project-in-kasauli/`}
                            className="block text-sm px-4    hover:text-red-600"
                          >
                            Projects in Kasauli
                          </Link>

                          <Link
                            to=""
                            className="block text-sm px-4 py-1 font-semibold text-red-600 hover:text-red-600 hover:underline"
                          >
                            Projects in Dubai{" "}
                            <span className="font-bold text-sm text-red-600">
                              *
                            </span>
                          </Link>
                        </div>

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
                            className="block text-sm px-4  hover:text-red-600"
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
                            className="block text-sm px-4  hover:text-red-600"
                            onClick={() => handlePriceClick(20, 50)}
                          >
                            ₹20 Cr - ₹50 Cr
                          </Link>
                          <Link
                            to={`/projects-in-gurugram/budget`}
                            className="block text-sm px-4 py-1 hover:text-red-600"
                            onClick={() => handlePriceClick(50, Infinity)}
                          >
                            Above ₹50 Cr
                          </Link>
                        </div>
                        {/* I am Working here */}
                        <div className="w-48">
                          <Link className="block text-black text-lg px-4 py-1 hover:text-red-600">
                            Project Status
                            <hr className="mt-1" />
                          </Link>

                          <Link
                            to={"/projects/upcoming-projects-in-gurgaon/"}
                            className="block text-sm px-4  hover:text-red-600"
                          >
                            Upcoming Projects
                          </Link>

                          <Link
                            to={"/projects-in-newlaunch/"}
                            className="block text-sm px-4 py-1  hover:text-red-600"
                          >
                            New Launch Projects
                          </Link>

                          <Link
                            to={"/project-in-underconstruction/"}
                            className="block text-sm px-4  hover:text-red-600"
                          >
                            Under Construction
                          </Link>

                          <Link
                            to={"/projects-in-gurugram/property-ready-to-move/"}
                            className="block  py-1 text-sm px-4 hover:text-red-600"
                          >
                            Ready To Move
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </HStack>

            <Flex alignItems="center">
              <div
                className=""
                style={{
                  marginRight: window.innerWidth <= 768 ? "-80px" : "-80px",
                }}
              >
                {token ? (
                  <Link to="/postproperty/">
                    <button className=" flex  sm:p-1 sm:text-sm">
                      <strong
                        onClick={checkUserAuth}
                        className="text-red-600  mr-2"
                      >
                        List Property
                      </strong>
                      <Link className="d-inline">
                        <button
                          className="btn btn-danger p-0 text-bold"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "50px",
                            height: "20px",
                          }}
                        >
                          FREE
                        </button>
                      </Link>
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin/">
                    <button className=" flex pt-1  sm:text-sm">
                      <strong
                        onClick={checkUserAuth}
                        className="text-red-600 mr-2"
                      >
                        List Property
                      </strong>
                      <Link className="d-inline">
                        <button
                          className="btn btn-danger p-0 text-bold"
                          style={{
                            position: "relative",
                            overflow: "hidden",
                            width: "50px",
                            height: "20px",
                          }}
                        >
                          FREE
                        </button>
                      </Link>
                    </button>
                  </Link>
                )}
              </div>

              <SpacerComponent />

              <div className="flex gap-4 pt-1 justify-end">
                <Menu>
                  <MenuButton
                    as={Button}
                    borderRadius="l"
                    variant="unstyled"
                    aria-label="Profile"
                    onClick={handleAvatarClick}
                    style={{ backgroundColor: "transparent", border: "none" }} // Transparent background
                  >
                    {token ? (
                      <Button
                        className="font-bold w-23 outline-offset-2 underline"
                        style={{
                          color: "#DC4C64",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                       <i class="fa-solid fa-user  ml-5 text-xl"></i>
                      </Button>
                    ) : (
                      <Button
                        className="outline-offset-2 font-bold w-23"
                        style={{
                          color: "#DC4C64",
                          backgroundColor: "transparent",
                          border: "none",
                        }} // Ensure button is transparent
                      >
                        <i class="fa-solid fa-user ml-5 text-xl"></i>
                      </Button>
                    )}
                  </MenuButton>

                  <MenuListContainer
                    isOpen={isDropdownOpen}
                    onClose={onClose}
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
                  className="text-red-600  mx-3 text-sm pt-1 font-bold uppercase"
                >
                  Rental Property
                </Link>

                <Link
                  to={"/buy-properties/best-resale-property-in-gurugram/"}
                  className="text-red-600 pt-1  text-sm uppercase font-bold mx-3"
                >
                  Resale Property
                </Link>

                {token ? (
                  <Link
                    to={"/postproperty/"}
                    className="text-red-600 font-bold pt-1 uppercase text-sm mx-3 hover:bg-red-600 hover:opacity-80"
                  >
                    <span onClick={checkUserAuth}>List Property</span>
                  </Link>
                ) : (
                  <Link
                    to={"/signin/"}
                    className="text-red-600 font-bold text-sm pt-1 mx-3 uppercase hover:bg-red-600 hover:opacity-80"
                  >
                    List Property
                  </Link>
                )}

                <Link
                  to={"/projects-in-gurugram/"}
                  className="text-red-600  text-sm font-bold uppercase mx-3"
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
