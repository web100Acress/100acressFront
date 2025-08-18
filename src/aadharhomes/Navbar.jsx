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
  MenuList,
  Image,
  Text,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon, SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { maxprice, minprice } from "../Redux/slice/PriceBasedSlice";
// import { Modal } from "antd"; // removed old user menu modal
import AuthModal from "../Components/AuthModal";
import { useJwt } from "react-jwt";

const SpacerComponent = () => <Box width="60px" />;

export default function Navbar() {
  const history = useNavigate();
  const usertoken = JSON.parse(localStorage.getItem("myToken"));
  const { decodedToken } = useJwt(usertoken || "");
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [colorChange, setColorchange] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false); // removed old user menu modal state
  const [showAuth, setShowAuth] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Navbar Search state (reuse hero search technique)
  const [formData, setFormData] = useState({ location: "", query: "", collectionName: "" });
  const placeholders = [
    'Search "Villas"',
    'Search "3 BHK Ready To Move Flat For Sale In Gurgaon"',
    'Search "Best Properties"',
    'Search "Delhi NCR"',
    'Search "3 BHK Flats in Gurgaon"',
    'Search "Commercial Space For Sale In Gurgaon"',
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuOpen1, setMenuOpen1] = useState(false);
  const [isMenuOpen2, setMenuOpen2] = useState(false);

  // City filter state
  // Minimal inline SVG icon set (monochrome outline) for cities
  const CityIcons = {
    Gurugram: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="6" height="10" rx="1"/>
        <rect x="11" y="6" width="6" height="14" rx="1"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Delhi: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l5 5H7l5-5Z"/>
        <path d="M6 20V10h12v10"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Noida: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="4" height="12"/>
        <rect x="10" y="4" width="4" height="16"/>
        <rect x="16" y="10" width="4" height="10"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Goa: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c2 0 3-2 5-2s3 2 5 2 3-2 5-2"/>
        <path d="M2 20h20"/>
        <path d="M6 10l2-3 2 3"/>
      </svg>
    ),
    Ayodhya: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l4-4 4 4 4-4 4 4"/>
        <path d="M4 12v8h16v-8"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Mumbai: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="5" height="12"/>
        <rect x="9" y="4" width="6" height="16"/>
        <rect x="16" y="10" width="5" height="10"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Panipat: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20V8l6-3 6 3v12"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Panchkula: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V9l4-2 4 2v11"/>
        <path d="M12 20V9l4-2 4 2v11"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Kasauli: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-7 4 5 3-4 6 8"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Sonipat: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3"/>
        <path d="M5 20c1.5-3 4.5-4.5 7-4.5S17.5 17 19 20"/>
      </svg>
    ),
    Karnal: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="9" width="14" height="10" rx="1"/>
        <path d="M9 9V6h6v3"/>
      </svg>
    ),
    Jalandhar: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16"/>
        <path d="M6 20V8h12v12"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Pushkar: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5l3 3-3 3-3-3 3-3Z"/>
        <path d="M4 20v-6h16v6"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    Dubai: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 20V4l4-2 4 2v16"/>
        <path d="M2 20h20"/>
      </svg>
    ),
  };
  const CITY_OPTIONS = [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/project-in-delhi/" },
    { name: "Noida", path: "/project-in-noida/" },
    { name: "Goa", path: "/project-in-goa/" },
    { name: "Ayodhya", path: "/project-in-ayodhya/" },
    { name: "Mumbai", path: "/project-in-mumbai/" },
    { name: "Panipat", path: "/project-in-panipat/" },
    { name: "Panchkula", path: "/project-in-panchkula/" },
    { name: "Kasauli", path: "/project-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Jalandhar", path: "/projects-in-jalandhar/" },
    { name: "Pushkar", path: "/projects-in-pushkar/" },
    { name: "Dubai", path: "/projects-in-dubai/" },
  ];
  const [selectedCity, setSelectedCity] = useState(
    (typeof window !== 'undefined' && localStorage.getItem("selectedCity")) || ""
  );

  const handleCitySelect = (city) => {
    try {
      localStorage.setItem("selectedCity", city.name);
      setSelectedCity(city.name);
      history(city.path);
    } catch {}
  };

  const showModal = () => {
    // setIsModalOpen(true);
    setShowAuth(true); // open Auth modal instead of old user menu
  };

  // Optional: derive user role for extra options (normalized)
  const rawUserRole = (typeof window !== 'undefined' && localStorage.getItem("userRole")) || decodedToken?.role || "";
  const userRole = (rawUserRole || "").toString().trim().toLowerCase();

  // Derive first name ONLY from localStorage 'firstName' (desktop only)
  const lsFirstName = (typeof window !== 'undefined' && localStorage.getItem("firstName")) || "";
  let firstName = (lsFirstName || "").toString().trim().split(/\s+/)[0] || "";
  const roleWords = new Set(["admin", "super", "blog", "user", "moderator", "owner", "agent", "builder"]);
  if (roleWords.has(firstName.toLowerCase()) || firstName.toLowerCase() === userRole) {
    firstName = "";
  }
  if (firstName) {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  const handleDeleteAccount = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (!confirmed) return;
      // TODO: hook actual API when ready
      // await axios.delete("/account/delete");
      message.info("Account deletion flow is not enabled yet.");
    } catch (e) {
      message.error("Failed to process account deletion.");
    }
  };

  const handleCancel = () => {
    // setIsModalOpen(false);
    setShowAuth(false);
  };
  const changeNavbarColor = () => {
    // Fallback threshold if hero not found
    setColorchange(window.scrollY >= 150);
  };

  // Sticky detection using IntersectionObserver with scroll fallback
  useEffect(() => {
    const hero = document.querySelector('#hero, .hero, [data-hero]');
    let observer;
    if (hero && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // When hero is not intersecting (out of view), activate sticky style
          setColorchange(!entry.isIntersecting);
        },
        { root: null, threshold: 0 }
      );
      observer.observe(hero);
    } else {
      // Fallback to scroll listener
      window.addEventListener('scroll', changeNavbarColor);
      changeNavbarColor();
    }
    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);

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
      await axios.get("/postPerson/logout");
      history("/");
      localStorage.removeItem("myToken");
      localStorage.removeItem("mySellerId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("firstName");
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

  // Close mega menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Close search on Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen]);

  // Rotate placeholder like hero search
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const idx = placeholders.indexOf(prev);
        const next = (idx + 1) % placeholders.length;
        return placeholders[next];
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleSearchInput = (e) => {
    setFormData((s) => ({ ...s, query: e.target.value }));
  };
  const submitSearch = () => {
    const payload = { ...formData };
    history(`/searchdata/${encodeURIComponent(JSON.stringify(payload))}`);
    setIsSearchOpen(false);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitSearch();
    }
  };

  return (
    <Wrapper className="section">
      <Box>
        <Box
          bg={colorChange ? "#e60023" : "#ffffff"}
          className="top-0 z-[9999] w-full"
          style={{ 
            position: "fixed", 
            scrollBehavior: "smooth",
            background: colorChange ? "#e60023" : "#ffffff",
            boxShadow: colorChange ? "0 2px 10px rgba(0,0,0,0.15)" : "none",
            zIndex: 9999,
            borderBottom: colorChange ? "none" : "1px solid rgba(0,0,0,0.08)",
            transition: "background-color 300ms ease, box-shadow 300ms ease"
          }}
          px={{ base: 4, md: 4, lg: 7 }}
          py={1}
        >
          
          <Flex minH={{ base: 14, md: 16 }} alignItems="center" justifyContent="space-between">
            
            {/* Left Section - Search Projects + City Filter */}
            <Flex alignItems="center" gap={3} order={{ base: 1, md: 2 }} flex={{ base: "initial", md: 1 }} justifyContent={{ base: "flex-start", md: "center" }}
              opacity={{ base: 1, md: isSearchOpen ? 0 : 1 }}
              transition="opacity 250ms ease"
              pointerEvents={{ base: "auto", md: isSearchOpen ? 'none' : 'auto' }}
            >
              <IconButton
                size="sm"
                icon={<HamburgerIcon />}
                aria-label="Search Projects"
                variant="ghost"
                color="#111"
                onClick={onToggle}
                mr={2}
                display={{ base: "inline-flex", md: "none" }}
              />
              <Box 
                display={{ base: "none", md: "none" }}
                fontSize="14px"
                fontWeight="500"
                color="#111"
                letterSpacing="0.5px"
                cursor="pointer"
                onClick={onToggle}
                lineHeight="1"
              >
                SEARCH PROJECTS
              </Box>
              {/* City selector (desktop primary, mobile hidden) */}
              <Menu placement="bottom-start">
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#e53e3e"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#e53e3e" }}
                  _active={{ bg: "transparent" }}
                  px={0}
                  fontWeight="600"
                  fontSize="16px"
                  letterSpacing="0.5px"
                  display={{ base: "none", md: "inline-flex" }}
                  lineHeight="1"
                  alignSelf="center"
                  alignItems="center"
                  height="auto"
                  minH="unset"
                  pr={2}
                  mr={2}
                  borderRight={{ base: 'none', md: 'none' }}
                  borderRadius={0}
                  py={0}
                >
                  <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
                    <Text lineHeight="1" color={colorChange ? "white" : "#e53e3e"} fontSize="16px" m={0} p={0}>City</Text>
                    <ChevronDownIcon boxSize="1em" color={colorChange ? "white" : "#e53e3e"} m={0} p={0} />
                  </Flex>
                </MenuButton>
                <MenuList p={3} minW="320px">
                  <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={2}>
                    Top Cities
                  </Box>
                  <SimpleGrid columns={3} spacing={2}>
                    {CITY_OPTIONS.map((c) => (
                      <Button
                        key={c.name}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCitySelect(c)}
                        justifyContent="center"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        gap={1}
                        borderWidth="1px"
                        borderColor="#eaeaea"
                        _hover={{ bg: "gray.50" }}
                        py={3}
                      >
                        <Box color="#666">{CityIcons[c.name] || CityIcons.Delhi}</Box>
                        <Text fontSize="12px" color="#111">{c.name}</Text>
                      </Button>
                    ))}
                  </SimpleGrid>
                </MenuList>
              </Menu>

              {/* Budget dropdown */}
              <Menu placement="bottom-start">
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#111"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#111" }}
                  _active={{ bg: "transparent" }}
                  px={3}
                  fontWeight="600"
                  fontSize="16px"
                  letterSpacing="0.5px"
                  display={{ base: "none", md: "inline-flex" }}
                  pr={2}
                  mr={2}
                  borderRight={{ base: 'none', md: 'none' }}
                  borderRadius={0}
                  lineHeight="1"
                  alignSelf="center"
                  alignItems="center"
                  height="auto"
                  minH="unset"
                  py={0}
                >
                  <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
                    <Text color={colorChange ? "white" : "#e53e3e"} lineHeight="1" fontSize="16px" m={0} p={0}>Budget</Text>
                    <ChevronDownIcon boxSize="1em" color={colorChange ? "white" : "#e53e3e"} m={0} p={0} />
                  </Flex>
                </MenuButton>
                <MenuList p={2} minW="220px">
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(0, 1)}>Under ₹1 Cr</MenuItem>
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(1, 5)}>₹1 Cr - ₹5 Cr</MenuItem>
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(5, 10)}>₹5 Cr - ₹10 Cr</MenuItem>
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(10, 20)}>₹10 Cr - ₹20 Cr</MenuItem>
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(20, 50)}>₹20 Cr - ₹50 Cr</MenuItem>
                  <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(50, Infinity)}>Above ₹50 Cr</MenuItem>
                </MenuList>
              </Menu>

              {/* Project Status dropdown */}
              <Menu placement="bottom-start">
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#111"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#111" }}
                  _active={{ bg: "transparent" }}
                  px={3}
                  fontWeight="600"
                  fontSize="16px"
                  letterSpacing="0.5px"
                  display={{ base: "none", md: "inline-flex" }}
                  pr={2}
                  mr={2}
                  borderRight={{ base: 'none', md: 'none' }}
                  borderRadius={0}
                  lineHeight="1"
                  alignSelf="center"
                  alignItems="center"
                  height="auto"
                  minH="unset"
                  py={0}
                >
                  <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
                    <Text color={colorChange ? "white" : "#e53e3e"} lineHeight="1" fontSize="16px" m={0} p={0}>Project Status</Text>
                    <ChevronDownIcon boxSize="1em" color={colorChange ? "white" : "#e53e3e"} m={0} p={0} />
                  </Flex>
                </MenuButton>
                <MenuList p={2} minW="240px">
                  <MenuItem as={Link} to="/projects/upcoming-projects-in-gurgaon/">Upcoming Projects</MenuItem>
                  <MenuItem as={Link} to="/projects-in-newlaunch/">New Launch Projects</MenuItem>
                  <MenuItem as={Link} to="/project-in-underconstruction/">Under Construction</MenuItem>
                  <MenuItem as={Link} to="/projects-in-gurugram/property-ready-to-move/">Ready To Move</MenuItem>
                </MenuList>
              </Menu>

              {/* Project Type dropdown */}
              <Menu placement="bottom-start">
                <MenuButton
                  as={Button}
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#111"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#111" }}
                  _active={{ bg: "transparent" }}
                  px={3}
                  fontWeight="600"
                  fontSize="16px"
                  letterSpacing="0.5px"
                  display={{ base: "none", md: "inline-flex" }}
                  lineHeight="1"
                  alignSelf="center"
                  alignItems="center"
                  height="auto"
                  minH="unset"
                  py={0}
                >
                  <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
                    <Text color={colorChange ? "white" : "#e53e3e"} lineHeight="1" fontSize="16px" m={0} p={0}>Project Type</Text>
                    <ChevronDownIcon boxSize="1em" color={colorChange ? "white" : "#e53e3e"} m={0} p={0} />
                  </Flex>
                </MenuButton>
                <MenuList p={2} minW="240px">
                  <MenuItem as={Link} to="/sco/plots/">SCO Plots</MenuItem>
                  <MenuItem as={Link} to="/projects/villas/">Luxury Villas</MenuItem>
                  <MenuItem as={Link} to="/plots-in-gurugram/">Plots In Gurugram</MenuItem>
                  <MenuItem as={Link} to="/property/residential/">Residential Projects</MenuItem>
                  <MenuItem as={Link} to="/projects/independentfloors/">Independent Floors</MenuItem>
                  <MenuItem as={Link} to="/projects/commercial/">Commercial Projects</MenuItem>
                </MenuList>
              </Menu>
              {/* Divider between filters and quick links */}
              <Box
                as="span"
                display={{ base: "none", md: "inline-block" }}
                w="1px"
                h="18px"
                bg="#eaeaea"
                mx={2}
              />
              {/* Rental and Resale quick links (desktop only) */}
              <Link to="/rental-properties/best-rental-property-in-gurugram/">
                <Button
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#e53e3e"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#e53e3e" }}
                  px={3}
                  fontWeight="600"
                  fontSize="16px"
                  display={{ base: "none", md: "inline-flex" }}
                >
                  Rental
                </Button>
              </Link>
              <Link to="/buy-properties/best-resale-property-in-gurugram/">
                <Button
                  size="sm"
                  variant="ghost"
                  bg="transparent"
                  color={colorChange ? "white" : "#e53e3e"}
                  _hover={{ bg: "transparent", color: colorChange ? "white" : "#e53e3e" }}
                  px={3}
                  fontWeight="600"
                  fontSize="16px"
                  display={{ base: "none", md: "inline-flex" }}
                >
                  Resale
                </Button>
              </Link>
            </Flex>

            {/* Center Section - Logo (placed left on desktop via order) */}
            <Flex order={{ base: 2, md: 1 }} justifyContent={{ base: "center", md: "flex-start" }} flex={{ base: "initial", md: 1 }} position="relative" zIndex={10001}
              display={{ base: isSearchOpen ? 'none' : 'flex', md: 'flex' }}
            >
              <Link to="/">
                <Image
                  src={colorChange 
                    ? "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/lg.webp" 
                    : "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp"}
                  alt="100acress logo"
                  height={{ base: "44px", md: "52px", lg: "60px" }}
                  objectFit="contain"
                  draggable={false}
                  transition="opacity 200ms ease"
                />
              </Link>
            </Flex>

            {/* Right Section - Search, Profile & List Property */}
            <Flex alignItems="center" gap={2} order={{ base: 3, md: 3 }} justifyContent={{ base: "flex-end", md: "flex-end" }} flex={{ base: "initial", md: 1 }} position="relative" zIndex={10001} flexWrap="nowrap" whiteSpace="nowrap">
              {/* Search icon appears on sticky */}
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                size="sm"
                variant="ghost"
                color={colorChange ? "white" : "#111"}
                _hover={{ bg: "transparent", color: colorChange ? "whiteAlpha.800" : "#111" }}
                opacity={{ base: !isSearchOpen ? 1 : 0, md: colorChange && !isSearchOpen ? 1 : 0 }}
                transition="opacity 300ms ease"
                pointerEvents={{ base: !isSearchOpen ? "auto" : "none", md: colorChange && !isSearchOpen ? "auto" : "none" }}
                display={{ base: "inline-flex", sm: "inline-flex" }}
                onClick={() => setIsSearchOpen(true)}
              />
              <Box>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    aria-label="Profile"
                    variant="ghost"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    px={2}
                  >
                    <Flex align="center" gap={2}>
                      <Box
                        as="span"
                        border="1px solid rgba(0,0,0,0.35)"
                        borderRadius="full"
                        w="32px"
                        h="32px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box as="span" lineHeight={0}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </Box>
                      </Box>
                      {firstName && (
                        <Box
                          as="span"
                          color={colorChange ? "white" : "#111"}
                          fontSize="14px"
                          fontWeight="600"
                          display={{ base: "none", md: "inline" }}
                        >
                          {firstName}
                        </Box>
                      )}
                    </Flex>
                  </MenuButton>
                  <MenuList p={0} minW="220px">
                    <Box px={3} pt={2} pb={2} color="#666" fontSize="12px">
                      Signed in {userRole ? `as ${userRole}` : ""}
                    </Box>
                    <Box h="1px" bg="#eee" />
                    <MenuItem as={Link} to="/userdashboard/" fontSize="14px">View Profile</MenuItem>
                    <MenuItem as={Link} to="/useredit/" fontSize="14px">Edit Profile</MenuItem>
                    <MenuItem as={Link} to="/change-password/" fontSize="14px">Change Password</MenuItem>
                    {userRole === "admin" && (
                      <MenuItem as={Link} to="/admin/" fontSize="14px">Admin</MenuItem>
                    )}
                    {userRole === "blog" && (
                      <MenuItem as={Link} to="/blog/dashboard/" fontSize="14px">Blog</MenuItem>
                    )}
                    <Box h="1px" bg="#eee" />
                    <MenuItem onClick={handleDeleteAccount} fontSize="14px" color="#e53e3e">Delete Account</MenuItem>
                    <MenuItem onClick={() => { HandleUserLogout(); ShowLogOutMessage(); }} fontSize="14px">Log out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button
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
                        border="1px solid rgba(0,0,0,0.35)"
                        borderRadius="full"
                        w="32px"
                        h="32px"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box as="span" lineHeight={0}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </Box>
                      </Box>
                      <Box as="span" color={colorChange ? "white" : "#111"} fontSize="14px" display={{ base: "none", sm: "inline" }}>Log in</Box>
                  </Flex>
                </Button>
                {/* Auth modal for logged-out users */}
                <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="register" />
              </>
              )}
              
              {/* EMI Calculator button (visible on sm and above) */}
              {/* EMI Calculator button removed from Navbar; will be placed in Footer */}

              {token ? (
                <Link to="/postproperty/">
                  <Button
                    size="sm"
                    variant="solid"
                    bg="white"
                    color="#111"
                    border="2px solid #e53e3e"
                    boxShadow="sm"
                    _hover={{ boxShadow: '0 0 0 3px rgba(229,62,62,0.15)', bg: 'white' }}
                    fontWeight="700"
                    fontSize="14px"
                    letterSpacing="0.3px"
                    display={{ base: "none", lg: "inline-flex" }}
                    gap={3}
                    alignItems="center"
                    borderRadius="xl"
                    px={4}
                    py={2}
                    ml={{ base: 2, md: 3 }}
                  >
                    <Box as="span">Post property</Box>
                    <Box
                      as="span"
                      bg="#FACC15"
                      color="#e53e3e"
                      px={3}
                      py={0.5}
                      fontSize="11px"
                      fontWeight="800"
                      lineHeight={1}
                      style={{
                        clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)'
                      }}
                    >
                      FREE
                    </Box>
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signin/">
                  <Button
                    size="sm"
                    variant="solid"
                    bg="white"
                    color="#111"
                    border="2px solid #e53e3e"
                    boxShadow="sm"
                    _hover={{ boxShadow: '0 0 0 3px rgba(229,62,62,0.15)', bg: 'white' }}
                    fontWeight="700"
                    fontSize="14px"
                    letterSpacing="0.3px"
                    display={{ base: "none", lg: "inline-flex" }}
                    gap={3}
                    alignItems="center"
                    borderRadius="xl"
                    px={4}
                    py={2}
                    ml={{ base: 2, md: 3 }}
                  >
                    <Box as="span">Post property</Box>
                    <Box
                      as="span"
                      bg="#FACC15"
                      color="#e53e3e"
                      px={3}
                      py={0.5}
                      fontSize="11px"
                      fontWeight="800"
                      lineHeight={1}
                      style={{
                        clipPath: 'polygon(10px 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0% 50%)'
                      }}
                    >
                      FREE
                    </Box>
                  </Button>
                </Link>
              )}
              </Box>
            </Flex>

            {/* Centered Animated Search Bar */}
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform={isSearchOpen ? { base: "translate(-55%, -50%)", md: "translate(-50%, -50%)" } : { base: "translate(calc(-50% + 20%), -50%)", md: "translate(calc(-50% + 20%), -50%)" }}
              opacity={isSearchOpen ? 1 : 0}
              transition="transform 300ms ease, opacity 250ms ease"
              pointerEvents={isSearchOpen ? "auto" : "none"}
              w={{ base: "72vw", md: "min(680px, 70vw)" }}
              zIndex={10002}
            >
              <InputGroup bg="white" borderRadius="9999px" boxShadow="0 8px 24px rgba(0,0,0,0.18)">
                <InputLeftElement pointerEvents="none" h="42px">
                  <SearchIcon color="#e53e3e" />
                </InputLeftElement>
                <Input
                  h="42px"
                  pl="40px"
                  pr="88px"
                  placeholder={currentPlaceholder}
                  _placeholder={{ color: "gray.500" }}
                  borderRadius="9999px"
                  border="1px solid rgba(0,0,0,0.06)"
                  focusBorderColor="#e53e3e"
                  bg="white"
                  value={formData.query}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchKeyDown}
                />
                <InputRightElement h="42px" width="96px" pr="2" zIndex={2}>
                  <IconButton
                    aria-label="Submit search"
                    size="sm"
                    borderRadius="full"
                    colorScheme="red"
                    bg="#c13b44"
                    _hover={{ bg: "#aE333C" }}
                    icon={<SearchIcon />}
                    onClick={submitSearch}
                    zIndex={3}
                  />
                  <IconButton
                    aria-label="Close search"
                    size="sm"
                    variant="ghost"
                    icon={<CloseIcon boxSize="0.7em" />}
                    onClick={() => setIsSearchOpen(false)}
                    ml={1}
                    zIndex={3}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>

          {isOpen && (
            <Box
              pb={4}
              display={{
                base: "none",
                md: "none",
              }}
              flexDirection="column"
              alignItems="center"
            >
              <Box
                display={{ base: "none", md: "none" }}
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
            <>
              {/* Outside-click overlay (doesn't cover the fixed navbar) */}
              <Box
                position="fixed"
                left={0}
                right={0}
                top={{ base: "56px", md: "64px" }}
                bottom={0}
                bg="transparent"
                zIndex={9997}
                onClick={onClose}
              />
            <Box display={{ base: "block", md: "block" }}>
              {/* Full-width positioning wrapper, background kept transparent to avoid visible extra space */}
              <Box
                position="absolute"
                left={{ base: 0, md: 4, lg: 7 }}
                right={{ base: 0, md: "auto" }}
                top={{ base: "56px", md: "64px" }}
                bg="transparent"
                boxShadow="none"
                zIndex={9998}
                onMouseLeave={onClose}
                overflowX="hidden"
                maxH={{ base: "calc(100vh - 56px)", md: "auto" }}
                overflowY={{ base: "auto", md: "visible" }}
              >
                {/* Centered content container with constrained width */}
                <Box
                  bg="white"
                  boxShadow="0 10px 25px rgba(0,0,0,0.12)"
                  borderRadius="md"
                  maxW={{ base: "calc(100vw - 2rem)", lg: "calc(100vw - 4rem)" }}
                  w="fit-content"
                  mx={0}
                >
                  <Flex px={{ base: 4, md: 6 }} py={5} gap={{ base: 3, md: 6 }} wrap="wrap">
                  {/* Popular Cities */}
                  <Box minW="200px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Popular Cities</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={1} fontSize="14px">
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
                  <Box minW="200px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Budget</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={1} fontSize="14px">
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(0, 1)}>Under ₹1 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(1, 5)}>₹1 Cr - ₹5 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(5, 10)}>₹5 Cr - ₹10 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(10, 20)}>₹10 Cr - ₹20 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(20, 50)}>₹20 Cr - ₹50 Cr</Link>
                      <Link to="/budget-properties/" onClick={() => handlePriceClick(50, Infinity)}>Above ₹50 Cr</Link>
                    </Flex>
                  </Box>

                  {/* Project Status */}
                  <Box minW="200px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Status</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={1} fontSize="14px">
                      <Link to="/projects/upcoming-projects-in-gurgaon/">Upcoming Projects</Link>
                      <Link to="/projects-in-newlaunch/">New Launch Projects</Link>
                      <Link to="/project-in-underconstruction/">Under Construction</Link>
                      <Link to="/projects-in-gurugram/property-ready-to-move/">Ready To Move</Link>
                    </Flex>
                  </Box>

                  {/* Project Type */}
                  <Box minW="200px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Type</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={1} fontSize="14px">
                      <Link to="/sco/plots/">SCO Plots</Link>
                      <Link to="/projects/villas/">Luxury Villas</Link>
                      <Link to="/plots-in-gurugram/">Plots In Gurugram</Link>
                      <Link to="/property/residential/">Residential Projects</Link>
                      <Link to="/projects/independentfloors/">Independent Floors</Link>
                      <Link to="/projects/commercial/">Commercial Projects</Link>
                    </Flex>
                  </Box>
                  
                  {/* Resale & Rental */}
                  <Box minW="200px">
                    <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Resale & Rental</Box>
                    <Box h="1px" bg="#eaeaea" mb={3} />
                    <Flex direction="column" gap={1} fontSize="14px">
                      <Link to="/buy-properties/best-resale-property-in-gurugram/">Resale Properties</Link>
                      <Link to="/rental-properties/best-rental-property-in-gurugram/">Rental Properties</Link>
                    </Flex>
                  </Box>
                  </Flex>
                </Box>
              </Box>
            </Box>
            </>
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