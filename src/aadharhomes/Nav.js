import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  Image,
  AvatarBadge,
  HStack,
  Spacer,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import logoImage from "../Images/100acress.png";
// import { useNavigate  } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { ScaleLoader } from "react-spinners";
const PropertyBox = ({ text }) => (
  <Box
    bg="red"
    p={[1, 2]}
    rounded={["full"]}
    color="white"
    margin={["1"]}
    fontSize={["md", "lg", "sm"]}
    textAlign="center"
    width={["100%", "100%", "none"]}
  >
    <Text as="b">{text}</Text>
  </Box>
);

const SpacerComponent = () => <Box width="60px" />;

const MenuListContainer = ({ isOpen, onClose }) => {
  const history = useNavigate();

  const showToastMessage = () => {
    toast.success("Logging out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };

  const HandleUserLogout = async () => {
    try {
      const response = await axios.get(
        "https://acre.onrender.com/postPerson/logout"
      );
      history("/");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      console.log(localStorage.removeItem("mySellerId"),"check");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const token = localStorage.getItem("myToken");
  // console.log(token, "dropdown");

  const { id } = useParams();

  return (
    <>
      {token ? (
        <>
          <Box
            position="absolute"
            mt={{ base: "212px", md: "234px", sm: "150px" }}
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
              <NavLink>Edit Profile</NavLink>
            </MenuItem>

            <MenuItem fontSize="sm">
              <NavLink to={`/userviewproperty/${id}`}>View Property</NavLink>
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
            mt={{ base: "200px", md: "190px", sm: "150px" }}
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
              <NavLink to="/SignIn">Login/</NavLink>
              <NavLink to="/SignUp">Register</NavLink>
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mobileNumber, setMobileNumber] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);

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

  const history = useNavigate();

  const [token, setToken] = useState();
  const checkUserAuth = () => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  };
  useEffect(() => {
    checkUserAuth();
  }, []);

  // const customCSS = {
  //   backgroundColor: "red",
  //   background: "linear-gradient(to bottom, #9baac2, #ff0000)",
  // };

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

  return (
    <Wrapper className="section">
      <Box>
        <Box bg="red" px={{ base: 0, md: 4, lg: 7 }}>
          <Flex h={14} alignItems="center" justifyContent="space-between">
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
               <Link to={'/'}>
               <Image
                  maxW={["100px", "200px"]}
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
                    <Link to="/buy">
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
                            className="block px-4 py-1  text-black text-lg hover:bg-gray-200"
                          >
                            Popular Choices
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4  hover:bg-gray-200 hover:text-red-600"
                          >
                            Ready to Move
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Owner Choices
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Budget Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Premium homes
                          </Link>
                          <Link
                            to="#"
                            className=" text-sm px-4 py-2 hover:bg-gray-200 hover:text-red-600 flex items-center"
                          >
                            NewlyLaunched
                            <span className="flex border rounded-md text-white bg-red-600 py-0 px-1 ">
                              Free
                            </span>
                          </Link>
                        </div>

                        <div className="w-52">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 hover:bg-gray-200"
                          >
                            Property Types <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:bg-gray-200 hover:text-red-600"
                          >
                            Flats in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            House For Sale in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Villa in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Plots in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Office Place in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Commercial Space in Faridabad
                          </Link>
                        </div>
                        <div className="w-40">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Budget
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4  hover:bg-gray-200 hover:text-red-600"
                          >
                            under ₹50 Lac
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            ₹50 Lac - ₹1 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            ₹1 Cr - ₹1.5 Cr
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Above ₹1.5 Cr
                          </Link>
                        </div>
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 hover:bg-gray-200"
                          >
                            Explore
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 hover:bg-gray-200 hover:text-red-600"
                          >
                            Localities in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Projects in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Investment Hotspot
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Find an Agent
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Residential Property Dubai
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
                    <Link to="/rent">
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
                            className="block px-4 py-1 text-black  text-lg hover:bg-gray-200"
                          >
                            Popular Choices
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4  hover:bg-gray-200 hover:text-red-600"
                          >
                            Owner Properties
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Verified Properties
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Furnished Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Bachelor Friendly Homes
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Immediately Available
                          </Link>
                        </div>

                        <div className="w-52">
                          <Link
                            to="#"
                            className="block text-black  text-lg px-2 py-1 hover:bg-gray-200"
                          >
                            Property Types
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:bg-gray-200 hover:text-red-600"
                          >
                            Flats for rent in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            House for rent in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Villa for rent in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            PG in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Office Space in Faridabad
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Commercial Space in Faridabad
                          </Link>
                        </div>

                        <div className="w-40">
                          <Link
                            to="#"
                            className="block text-black text-lg px-2 py-1 hover:bg-gray-200"
                          >
                            Budget
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2  hover:bg-gray-200 hover:text-red-600"
                          >
                            under ₹10000
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            ₹10000 - ₹15000
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            ₹15000 - ₹25000
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-2 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Above ₹25000
                          </Link>
                        </div>
                        <div className="w-48">
                          <Link
                            to="#"
                            className="block text-black text-lg px-4 py-1 hover:bg-gray-200"
                          >
                            Explore
                            <hr className="mt-1" />
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 hover:bg-gray-200 hover:text-red-600"
                          >
                            Localities
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Buy vs Rent
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Find an Agent
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Share Requirement
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Property Services
                          </Link>
                          <Link
                            to="#"
                            className="block text-sm px-4 py-1 hover:bg-gray-200 hover:text-red-600"
                          >
                            Rent Agreement
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {token ? (
                    <Link
                      to={"/postproperty"}
                      className="text-white font-semibold text-lg"
                    >
                      <span onClick={checkUserAuth}>Sell</span>
                    </Link>
                  ) : (
                    <Link
                      to={"/SignIn"}
                      className="text-white font-semibold text-lg"
                    >
                      Sell
                    </Link>
                  )}

                  <Link
                    to={"/projects"}
                    className="text-white font-semibold text-lg"
                  >
                    Projects
                  </Link>
                </>
              )}
            </HStack>
            {/* <Flex alignItems="center">
              <div className="" style={{ marginRight: "-69px" }}>
                {token ? (
                  <Link to="/postproperty">
                    <button className="btn flex btn-light text-black   btn-sm  sm:p-1 sm:text-sm ">
                      <strong onClick={checkUserAuth} className="text-red-600">
                        {" "}
                        Post Property{" "}
                      </strong>
                      <Link className="d-none d-xl-inline d-md-inline">
                        <button className="btn btn-danger p-0  ">Free</button>
                      </Link>
                    </button>
                  </Link>
                ) : (
                  <Link to="/SignIn">
                    <button className="btn flex btn-light text-black   btn-sm  sm:p-1 sm:text-sm ">
                      <strong onClick={checkUserAuth} className="text-red-600">
                        {" "}
                        Post Property{" "}
                      </strong>
                      <Link className="d-none d-xl-inline d-md-inline">
                        <button className="btn btn-danger p-0 ">Free</button>
                      </Link>
                    </button>
                  </Link>
                )}
              </div>

              <SpacerComponent />
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius="l"
                  variant="unstyled"
                  aria-label="Profile"
                  onMouseEnter={toggleDropdown}
                >
                  <Avatar
                    name="User"
                    boxSize="1.7em"
                    bgColor="white"
                    marginLeft={7}
                    icon={
                      <AvatarBadge
                        boxSize={{ base: "0", md: "1em", sm: "0.8em" }}
                        bg="green.500"
                      />
                    }
                  />
                </MenuButton>
                <IconButton
                  icon={<ChevronDownIcon color="white" boxSize="2em" />}
                  variant="unstyled"
                  aria-label="Toggle Dropdown"
                  onMouseEnter={toggleDropdown}
                />

                <MenuListContainer
                  isOpen={isDropdownOpen}
                  onClose={onClose}
                  onLoginRegisterClick={handleLoginRegisterClick}
                />
              </Menu>
            </Flex> */}

            <Flex alignItems="center">
              <div className="" style={{ marginRight: "-69px" }}>
                {token ? (
                  <Link to="/postproperty">
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
                  <Link to="/SignIn">
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
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius="l"
                  variant="unstyled"
                  aria-label="Profile"
                  onMouseEnter={toggleDropdown}
                >
                  <Avatar
                    name="User"
                    boxSize="1.7em"
                    bgColor="white"
                    marginLeft={7}
                    icon={
                      <AvatarBadge
                        boxSize={{ base: "0", md: "1em", sm: "0.8em" }}
                        bg="green.500"
                      />
                    }
                  />
                </MenuButton>
                <IconButton
                  icon={<ChevronDownIcon color="white" boxSize="2em" />}
                  variant="unstyled"
                  aria-label="Toggle Dropdown"
                  onMouseEnter={toggleDropdown}
                />

                <MenuListContainer
                  isOpen={isDropdownOpen}
                  onClose={onClose}
                  onLoginRegisterClick={handleLoginRegisterClick}
                />
              </Menu>
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
                {/* {Links.map((link) => (
                <Link
                  key={link}
                  style={{ textDecoration: "none" }}
                  to={`/${link}`}
                >
                  {link}
                </Link>
              ))} */}

                <Link
                  to={"/rent"}
                  className="text-white font-semibold mx-3 text-lg"
                >
                  Rent
                </Link>

                <Link
                  to={"/buy"}
                  className="text-white font-semibold text-lg mx-3"
                >
                  Buy
                </Link>
          

                {token ? <Link
                  to={"/postproperty"}
                  className="text-white font-semibold text-lg mx-3"
                >
                  <span onClick={checkUserAuth}>Sell</span>
                </Link> :      <Link
                  to={"/SignIn"}
                  className="text-white font-semibold text-lg mx-3"
                >
                  Sell
                </Link>}
               

                <Link
                  to={"/projects"}
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
