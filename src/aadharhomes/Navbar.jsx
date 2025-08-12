import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { maxprice, minprice } from "../Redux/slice/PriceBasedSlice";
import { Modal } from "antd";
import { useJwt } from "react-jwt";

const SpacerComponent = () => <Box width="60px" />;

export default function Navbar() {
  const history = useNavigate();
  const usertoken = JSON.parse(localStorage.getItem("myToken"));
  const { decodedToken } = useJwt(usertoken || "");
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [colorChange, setColorchange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeNavbarColor = () => {
    if (window.scrollY >= 150) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const handlePriceClick = (min, max) => {
    // setPriceRange({ min, max });
    dispatch(minprice(min));
    dispatch(maxprice(max))
  };

  const ShowLogOutMessage = () => {
    message.success("Logged Out Successfully !")
  };

  const HandleUserLogout = async () => {
    try {
      await axios.get("https://api.100acress.com/postPerson/logout");
      history("/");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      window.location.reload(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          bg="transparent"
          className="top-0 z-[9999] w-full"
          style={{ 
            position: "fixed", 
            scrollBehavior: "smooth",
            background: "transparent",
            boxShadow: "none",
            zIndex: 9999,
            borderBottom: "1px solid rgba(255,255,255,0.25)"
          }}
          px={{ base: 4, md: 4, lg: 7 }}
          py={1}
        >
          
          <Flex h={{ base: 14, md: 16 }} alignItems="center" justifyContent="space-between">
            
            {/* Left Section - Search Projects */}
            <Flex alignItems="center">
              <IconButton
                size="sm"
                icon={<HamburgerIcon />}
                aria-label="Search Projects"
                variant="ghost"
                color="#fff"
                onClick={onOpen}
                mr={2}
              />
              <Box 
                display={{ base: "none", md: "block" }}
                fontSize="14px"
                fontWeight="500"
                color="#fff"
                letterSpacing="0.5px"
                cursor="pointer"
                onClick={onOpen}
              >
                SEARCH PROJECTS
              </Box>
            </Flex>

            {/* Center Section - Logo */}
            <Flex flex={1} justifyContent="center">
              <Link to="/">
                <Image
                  src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp"
                  alt="100acress logo"
                  height={{ base: "44px", md: "52px", lg: "60px" }}
                  objectFit="contain"
                  draggable={false}
                />
              </Link>
            </Flex>

            {/* Right Section - Profile & List Property */}
            <Flex alignItems="center" gap={3}>
              <Menu>
                <MenuButton
                  as={Button}
                  onClick={showModal}
                  aria-label="Profile"
                  variant="ghost"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  px={2}
                >
                  <Flex align="center" gap={2}>
                    <Box
                      as="span"
                      border="1px solid rgba(255,255,255,0.7)"
                      borderRadius="full"
                      w="32px"
                      h="32px"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box as="span" lineHeight={0}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                          <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </Box>
                    </Box>
                    {!token && (
                      <Box as="span" color="#fff" fontSize="14px">Log in</Box>
                    )}
                  </Flex>
                </MenuButton>
                <Modal
                  title="User Menu"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={null}
                  centered
                >
                  {token ? (
                    <section style={{ margin: "-15px -15px -15px -15px" }}>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel} to="/userdashboard/">Dashboard</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel} to="/useredit/">Edit Profile</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel} to="/viewallproperty/">View All Property</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className=" text-red-500" onClick={ShowLogOutMessage}>LogOut</NavLink>
                      </MenuItem>
                    </section>
                  ) : (
                    <section style={{ margin: "-15px -15px -15px -15px" }}>
                      <MenuItem fontSize="sm" color={"red"}>
                        <NavLink className="" onClick={handleCancel} to="/auth/signin/">Login/</NavLink>
                        <NavLink className="" onClick={handleCancel} to="/auth/signup/">Register</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel}>Recently Searched</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel}>Shortlisted</NavLink>
                      </MenuItem>
                      <MenuItem fontSize="sm">
                        <NavLink className="" onClick={handleCancel}>Contacted</NavLink>
                      </MenuItem>
                    </section>
                  )}
                </Modal>
              </Menu>
              
              {token ? (
                <Link to="/postproperty/">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#e53e3e"
                    color="#e53e3e"
                    _hover={{
                      bg: "#e53e3e",
                      color: "white"
                    }}
                    fontWeight="600"
                    fontSize="14px"
                    letterSpacing="0.5px"
                    display={{ base: "none", sm: "block" }}
                  >
                    LIST PROPERTY
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signin/">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#e53e3e"
                    color="#e53e3e"
                    _hover={{
                      bg: "#e53e3e",
                      color: "white"
                    }}
                    fontWeight="600"
                    fontSize="14px"
                    letterSpacing="0.5px"
                    display={{ base: "none", sm: "block" }}
                  >
                    LIST PROPERTY
                  </Button>
                </Link>
              )}
            </Flex>
          </Flex>

          {isOpen && (
            <Box
              pb={4}
              display={{
                base: "flex",
                md: "none",
              }}
              flexDirection="column"
              alignItems="center"
            >
              <Box
                display={{ base: "flex", md: "none" }}
                flexDirection="column"
                alignItems="center"
                pb={4}
              >
                <Link to="/buy-properties/best-resale-property-in-gurugram/">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#e53e3e"
                    color="#e53e3e"
                    _hover={{
                      bg: "#e53e3e",
                      color: "white",
                    }}
                    fontWeight="600"
                    fontSize="14px"
                    letterSpacing="0.5px"
                    mb={2}
                  >
                    Resale
                  </Button>
                </Link>
                <Link to="/rental-properties/best-rental-property-in-gurugram/">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#e53e3e"
                    color="#e53e3e"
                    _hover={{
                      bg: "#e53e3e",
                      color: "white",
                    }}
                    fontWeight="600"
                    fontSize="14px"
                    letterSpacing="0.5px"
                    mb={2}
                  >
                    Rental
                  </Button>
                </Link>
                <Link to="/projects-in-gurugram/">
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="#e53e3e"
                    color="#e53e3e"
                    _hover={{
                      bg: "#e53e3e",
                      color: "white",
                    }}
                    fontWeight="600"
                    fontSize="14px"
                    letterSpacing="0.5px"
                    mb={2}
                  >
                    Projects
                  </Button>
                </Link>
              </Box>
            </Box>
          )}

          {/* Desktop Mega Menu for SEARCH PROJECTS */}
          {isOpen && (
            <Box display={{ base: "none", md: "block" }}>
              <Box
                position="absolute"
                left={0}
                right={0}
                top="56px"
                bg="white"
                boxShadow="0 10px 25px rgba(0,0,0,0.12)"
                borderRadius="md"
                zIndex={9998}
                onMouseLeave={onClose}
              >
                <Flex px={8} py={6} gap={12} wrap="nowrap">
                  {/* Popular Cities */}
                  <Box minW="220px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Popular Cities</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={2} fontSize="14px">
                      <Link to="/projects-in-gurugram/">Projects in Gurugram</Link>
                      <Link to="/project-in-delhi/">Projects in Delhi</Link>
                      <Link to="/project-in-noida/">Projects in Noida</Link>
                      <Link to="/project-in-goa/">Projects in Goa</Link>
                      <Link to="/project-in-ayodhya/">Projects in Ayodhya</Link>
                      <Link to="/project-in-mumbai/">Projects in Mumbai</Link>
                      <Link to="/project-in-panipat/">Projects in Panipat</Link>
                      <Link to="/project-in-panchkula/">Projects in Panchkula</Link>
                      <Link to="/project-in-kasauli/">Projects in Kasauli</Link>
                      <Link to="/projects-in-sonipat/">Projects in Sonipat</Link>
                      <Link to="/projects-in-karnal/">Projects in Karnal</Link>
                      <Link to="/projects-in-jalandhar/">Projects in Jalandhar</Link>
                      <Link to="/projects-in-pushkar/">Projects in Pushkar</Link>
                      <Link to="/projects-in-dubai/" style={{ color: "#e53e3e", fontWeight: 600 }}>Projects in Dubai *</Link>
                    </Flex>
                  </Box>

                  {/* Budget */}
                  <Box minW="220px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Budget</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={2} fontSize="14px">
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(0, 1)}>Under ₹1 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(1, 5)}>₹1 Cr - ₹5 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(5, 10)}>₹5 Cr - ₹10 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(10, 20)}>₹10 Cr - ₹20 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(20, 50)}>₹20 Cr - ₹50 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(50, Infinity)}>Above ₹50 Cr</Link>
                    </Flex>
                  </Box>

                  {/* Project Status */}
                  <Box minW="220px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Status</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={2} fontSize="14px">
                      <Link to="/projects/upcoming-projects-in-gurgaon/">Upcoming Projects</Link>
                      <Link to="/projects-in-newlaunch/">New Launch Projects</Link>
                      <Link to="/project-in-underconstruction/">Under Construction</Link>
                      <Link to="/projects-in-gurugram/property-ready-to-move/">Ready To Move</Link>
                    </Flex>
                  </Box>

                  {/* Project Type */}
                  <Box minW="220px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Type</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={2} fontSize="14px">
                      <Link to="#">SCO Plots</Link>
                      <Link to="#">Luxury Villas</Link>
                      <Link to="#">Plots In Gurugram</Link>
                      <Link to="#">Residential Projects</Link>
                      <Link to="#">Independent Floors</Link>
                      <Link to="#">Commercial Projects</Link>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
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