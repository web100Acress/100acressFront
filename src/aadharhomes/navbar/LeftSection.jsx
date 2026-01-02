import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, Text, SimpleGrid } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Custom rounded hamburger icon
const RoundedHamburgerIcon = ({ boxSize = 5, color = "currentColor" }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={boxSize} color={color} display="block">
    <path d="M4 6h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M4 18h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </Box>
);

export default function LeftSection({
  colorChange,
  isSearchOpen,
  isHome,
  onToggle,
  CITY_OPTIONS,
  CityIcons,
  handleCitySelect,
  handlePriceClick,
  hideResale = false,
  hideRental = false,
  hideProjectType = false,
  hideProjectStatus = false,
  hideBudget = false,
  hideCity = false,
  showHamburgerOnDesktop = false,
  forceHamburger = false,
  onOpenInsights,
  onCloseInsights,
  isInsightsOpen,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation handler to force page refresh
  const handleNavigation = (path, priceClickHandler = null, shouldCloseDrawer = false) => {
    // Close any open menus
    setIsBudgetOpen(false);
    setIsTypeOpen(false);
    setIsStatusOpen(false);
    setIsCityOpen(false);
    
    // Close drawer if needed (for mobile navigation)
    if (shouldCloseDrawer) {
      closeDrawer();
    }
    
    // Call price handler if provided
    if (priceClickHandler) {
      priceClickHandler();
    }
    
    // Navigate to the path
    navigate(path);
    
    // Force a small delay then scroll to top to ensure proper rendering
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  // Controlled open states for hover-driven menus
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  
  // Track screen width for responsive behavior
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // Small close-delay timers for smoother hover-out
  const cityTimer = useRef(null);
  const budgetTimer = useRef(null);
  const statusTimer = useRef(null);
  const typeTimer = useRef(null);
  const insightsTimer = useRef(null);

  const clearTimer = (ref) => { if (ref.current) { clearTimeout(ref.current); ref.current = null; } };
  const closeWithDelay = (ref, closer, delay = 140) => {
    clearTimer(ref);
    ref.current = setTimeout(() => { closer(false); ref.current = null; }, delay);
  };
  const closeFnWithDelay = (ref, fn, delay = 140) => {
    clearTimer(ref);
    ref.current = setTimeout(() => { try { fn(); } finally { ref.current = null; } }, delay);
  };

  const menuMotion = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  };
  useEffect(() => {
    // Prevent page (body) from scrolling when drawer is open to avoid double scrollbars
    try {
      if (isDrawerOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    } catch {}
    return () => {
      try { document.body.classList.remove('mobile-menu-open'); } catch {}
    };
  }, [isDrawerOpen]);
  useEffect(() => {
    // Close drawer on route change
    if (isDrawerOpen) closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  useEffect(() => {
    // Track screen width for responsive behavior
    const handleResize = () => {
      // Show hamburger when Project Status is hidden (1600px breakpoint)
      setIsSmallScreen(window.innerWidth <= 1600);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Flex
      alignItems="center"
      gap={{ base: 0, md: 0.5 }}
      order={{ base: 1, md: 2 }}
      flex={{ base: "initial", md: 1 }}
      justifyContent={{ base: "flex-start", md: forceHamburger ? "flex-start" : "center" }}
      ml={{ base: 0, md: forceHamburger ? 0 : 3, lg: forceHamburger ? 0 : 6 }}
      pl={{ base: 0, md: forceHamburger ? 0 : 3 }}
      borderLeft={{ base: 'none', md: 'none' }}
      opacity={{ base: 1, md: isSearchOpen ? 0 : 1 }}
      transition="opacity 250ms ease"
      pointerEvents={{ base: "auto", md: isSearchOpen ? 'none' : 'auto' }}
      display={{ base: 'flex', md: isSearchOpen ? 'none' : 'flex' }}
    >
      {/* Hamburger -> Left Drawer */}
      <IconButton
        size="sm"
        icon={<RoundedHamburgerIcon boxSize={7} />}
        aria-label="Menu"
        variant="ghost"
        color={isHome ? "white" : (!colorChange ? "red" : "white")}
        mr={0}
        onClick={() => (isDrawerOpen ? closeDrawer() : openDrawer())}
        display={{ base: "inline-flex", md: (forceHamburger || showHamburgerOnDesktop || isSmallScreen) ? "inline-flex" : "none" }}
      />

      {isDrawerOpen && (
        <>
          <div
            onClick={closeDrawer}
            className="mobile-menu-overlay"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Explore"
            onClick={(e) => e.stopPropagation()}
            className="mobile-menu-drawer"
          >
            <div
              className="mobile-menu-header"
            >
              <div className="mobile-menu-brand">
                <img
                  src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/red-logo.webp"
                  alt="100acress"
                  className="mobile-menu-logo"
                  loading="lazy"
                />
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close"
                className="mobile-menu-close"
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-content">
              <div className="mobile-menu-section">
              {(forceHamburger || hideCity) && (
                <>
                  <div className="mobile-menu-heading">City</div>
                  <div className="mobile-menu-grid">
                    {CITY_OPTIONS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className="mobile-menu-tile"
                        onClick={() => {
                          handleCitySelect(c);
                          closeDrawer();
                        }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                  <div className="mobile-menu-sep" />
                </>
              )}

              {(forceHamburger || hideBudget) && (
                <>
                  <div className="mobile-menu-heading">Budget</div>
                  <div className="mobile-menu-grid">
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/under-1-cr/", () => handlePriceClick(0, 1), true)}>Under ₹1 Cr</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/1-5-cr/", () => handlePriceClick(1, 5), true)}>₹1 Cr - ₹5 Cr</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/5-10-cr/", () => handlePriceClick(5, 10), true)}>₹5 Cr - ₹10 Cr</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/10-20-cr/", () => handlePriceClick(10, 20), true)}>₹10 Cr - ₹20 Cr</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/20-50-cr/", () => handlePriceClick(20, 50), true)}>₹20 Cr - ₹50 Cr</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/above-50-cr/", () => handlePriceClick(50, Infinity), true)}>Above ₹50 Cr</button>
                  </div>
                  <div className="mobile-menu-sep" />
                </>
              )}

              {(forceHamburger || hideProjectStatus || isSmallScreen) && (
                <>
                  <div className="mobile-menu-heading">Project Status</div>
                  <div className="mobile-menu-grid">
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/upcoming/", null, true)}>Upcoming Projects</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/newlaunch/", null, true)}>New Launch Projects</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/underconstruction/", null, true)}>Under Construction</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/ready-to-move/", null, true)}>Ready To Move</button>
                  </div>
                  <div className="mobile-menu-sep" />
                </>
              )}

              {(forceHamburger || hideProjectType || isSmallScreen) && (
                <>
                  <div className="mobile-menu-heading">Project Type</div>
                  <div className="mobile-menu-grid">
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/sco-plots/", null, true)}>SCO Plots</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/villas/", null, true)}>Luxury Villas</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/plots/", null, true)}>Plots In Gurugram</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/residential/", null, true)}>Residential Projects</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/independent-floors/", null, true)}>Independent Floors</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/commercial/", null, true)}>Commercial Projects</button>
                       <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/farmhouse/", null, true)}>Farm Houses</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/industrial-projects/", null, true)}>Industrial Projects</button>
                    <button type="button" className="mobile-menu-tile" onClick={() => handleNavigation("/projects/senior-living/", null, true)}>Senior Living</button>
                  </div>
                  <div className="mobile-menu-sep" />
                </>
              )}

              {(forceHamburger || hideRental) && (
                <>
                  <div className="mobile-menu-heading">Rental</div>
                  <button type="button" className="mobile-menu-tile" onClick={() => { closeDrawer(); navigate('/rental-properties/best-rental-property-in-gurugram/'); }}>
                    View Rental Properties
                  </button>
                  <div className="mobile-menu-sep" />
                </>
              )}

              {(forceHamburger || hideResale) && (
                <>
                  <div className="mobile-menu-heading">Resale</div>
                  <button type="button" className="mobile-menu-tile" onClick={() => { closeDrawer(); navigate('/buy-properties/best-resale-property-in-gurugram/'); }}>
                    View Resale Properties
                  </button>
                  <button type="button" className="mobile-menu-primary" onClick={() => { closeDrawer(); navigate('/united-arab-emirates'); }}>
                    Dubai
                  </button>
                
                   <button type="button" className="mobile-menu-primary" onClick={() => { closeDrawer(); navigate('/property-market-trends'); }} style={{ background: '#3B82F6', borderColor: 'rgba(59, 130, 246, 0.25)', boxShadow: '0 12px 26px rgba(59, 130, 246, 0.25)', marginTop: '10px' }}>
                    Insights
                  </button>
                </>
              )}
           
            <Box h={{ base: 16, md: 0 }} />
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Hidden desktop text trigger (kept for parity) */}
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

      {/* City selector (desktop/tablet) */}
      <Menu placement="bottom-start" isOpen={isCityOpen}>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          bg="transparent"
          color={isHome ? "white" : (!colorChange ? "red" : "white")}
          _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }}
          _active={{ bg: "transparent" }}
          px={0}
          fontWeight="600"
          fontSize="16px"
          letterSpacing="0.5px"
          display={{ base: "none", md: (forceHamburger || hideCity) ? "none" : "inline-flex" }}
          lineHeight="1"
          alignSelf="center"
          alignItems="center"
          height="auto"
          minH="unset"
          pr={2}
          mr={0}
          borderRight={{ base: 'none', md: 'none' }}
          borderRadius={0}
          py={0}
          onMouseEnter={() => { clearTimer(cityTimer); setIsCityOpen(true); }}
          onMouseLeave={() => closeWithDelay(cityTimer, setIsCityOpen)}
        >
          <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
            <Text lineHeight="1" color={isHome ? "white" : (!colorChange ? "red" : "white")} fontSize="16px" m={0} p={0}>City</Text>
            <ChevronDownIcon boxSize="1em" color={isHome ? "white" : (!colorChange ? "red" : "white")} m={0} p={0} />
          </Flex>
        </MenuButton>
        <MenuList
          as={motion.div}
          p={3}
          minW="320px"
          initial={menuMotion.initial}
          animate={menuMotion.animate}
          onMouseEnter={() => { clearTimer(cityTimer); setIsCityOpen(true); }}
          onMouseLeave={() => closeWithDelay(cityTimer, setIsCityOpen)}
        >
          <Box fontWeight="700" fontSize="12px" color={isHome ? "white" : (!colorChange ? "red" : "white")} textTransform="uppercase" mb={2}>Top Cities</Box>
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

      {/* Budget */}
      <Menu placement="bottom-start" isOpen={isBudgetOpen}>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          bg="transparent"
          color={isHome ? "white" : (!colorChange ? "red" : "white")}
          _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }}
          _active={{ bg: "transparent" }}
          px={1}
          fontWeight="600"
          fontSize="16px"
          letterSpacing="0.5px"
          display={{ base: "none", md: (forceHamburger || hideBudget) ? "none" : "inline-flex" }}
          pr={2}
          mr={0}
          borderRight={{ base: 'none', md: 'none' }}
          borderRadius={0}
          lineHeight="1"
          alignSelf="center"
          alignItems="center"
          height="auto"
          minH="unset"
          py={0}
          onMouseEnter={() => { clearTimer(budgetTimer); setIsBudgetOpen(true); }}
          onMouseLeave={() => closeWithDelay(budgetTimer, setIsBudgetOpen)}
        >
          <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
            <Text color={isHome ? "white" : (!colorChange ? "red" : "white")} lineHeight="1" fontSize="16px" m={0} p={0}>Budget</Text>
            <ChevronDownIcon boxSize="1em" color={isHome ? "white" : (!colorChange ? "red" : "white")} m={0} p={0} />
          </Flex>
        </MenuButton>
        <MenuList
          as={motion.div}
          p={2}
          minW="220px"
          initial={menuMotion.initial}
          animate={menuMotion.animate}
          onMouseEnter={() => { clearTimer(budgetTimer); setIsBudgetOpen(true); }}
          onMouseLeave={() => closeWithDelay(budgetTimer, setIsBudgetOpen)}
        >
          <MenuItem onClick={() => handleNavigation("/projects/under-1-cr/", () => handlePriceClick(0, 1))}>Under ₹1 Cr</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/1-5-cr", () => handlePriceClick(1, 5))}>₹1 Cr - ₹5 Cr</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/5-10-cr", () => handlePriceClick(5, 10))}>₹5 Cr - ₹10 Cr</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/10-20-cr", () => handlePriceClick(10, 20))}>₹10 Cr - ₹20 Cr</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/20-50-cr", () => handlePriceClick(20, 50))}>₹20 Cr - ₹50 Cr</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/above-50-cr", () => handlePriceClick(50, Infinity))}>Above ₹50 Cr</MenuItem>
        </MenuList>
      </Menu>

      {/* Project Status */}
      <Menu placement="bottom-start" isOpen={isStatusOpen}>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          bg="transparent"
          color={isHome ? "white" : (!colorChange ? "red" : "white")}
          _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }}
          _active={{ bg: "transparent" }}
          px={1}
          fontWeight="600"
          fontSize="16px"
          letterSpacing="0.5px"
          display={{ base: "none", md: (forceHamburger || hideProjectStatus) ? "none" : "inline-flex" }}
          sx={{
            // Hide on high zoom ratios (150% and above) or smaller screens
            '@media (max-width: 1600px)': {
              display: 'none'
            }
          }}
          pr={2}
          mr={0}
          borderRight={{ base: 'none', md: 'none' }}
          borderRadius={0}
          lineHeight="1"
          alignSelf="center"
          alignItems="center"
          height="auto"
          minH="unset"
          py={0}
          onMouseEnter={() => { clearTimer(statusTimer); setIsStatusOpen(true); }}
          onMouseLeave={() => closeWithDelay(statusTimer, setIsStatusOpen)}
        >
          <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
            <Text color={isHome ? "white" : (!colorChange ? "red" : "white")} lineHeight="1" fontSize="16px" m={0} p={0}>Project Status</Text>
            <ChevronDownIcon boxSize="1em" color={isHome ? "white" : (!colorChange ? "red" : "white")} m={0} p={0} />
          </Flex>
        </MenuButton>
        <MenuList
          as={motion.div}
          p={2}
          minW="240px"
          initial={menuMotion.initial}
          animate={menuMotion.animate}
          onMouseEnter={() => { clearTimer(statusTimer); setIsStatusOpen(true); }}
          onMouseLeave={() => closeWithDelay(statusTimer, setIsStatusOpen)}
        >
          <MenuItem onClick={() => handleNavigation("/projects/upcoming/")}>Upcoming Projects</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/newlaunch/")}>New Launch Projects</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/underconstruction/")}>Under Construction</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/ready-to-move/")}>Ready To Move</MenuItem>
        </MenuList>
      </Menu>

      {/* Project Type */}
      <Menu placement="bottom-start" isOpen={isTypeOpen}>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          bg="transparent"
          color={isHome ? "white" : (!colorChange ? "red" : "white")}
          _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }}
          _active={{ bg: "transparent" }}
          px={1}
          fontWeight="600"
          fontSize="16px"
          letterSpacing="0.5px"
          display={{ base: "none", md: (forceHamburger || hideProjectType) ? "none" : "inline-flex" }}
          sx={{
            // Hide on high zoom ratios (150% and above) or smaller screens
            '@media (max-width: 1400px)': {
              display: 'none'
            }
          }}
          lineHeight="1"
          alignSelf="center"
          alignItems="center"
          height="auto"
          minH="unset"
          py={0}
          onMouseEnter={() => { clearTimer(typeTimer); setIsTypeOpen(true); }}
          onMouseLeave={() => closeWithDelay(typeTimer, setIsTypeOpen)}
        >
          <Flex alignItems="center" gap={0} lineHeight="1" display="inline-flex" sx={{ 'svg': { display: 'inline-block', verticalAlign: 'middle' } }}>
            <Text color={isHome ? "white" : (!colorChange ? "red" : "white")} lineHeight="1" fontSize="16px" m={0} p={0}>Project Type</Text>
            <ChevronDownIcon boxSize="1em" color={isHome ? "white" : (!colorChange ? "red" : "white")} m={0} p={0} />
          </Flex>
        </MenuButton>
        <MenuList
          as={motion.div}
          p={2}
          minW="240px"
          initial={menuMotion.initial}
          animate={menuMotion.animate}
          onMouseEnter={() => { clearTimer(typeTimer); setIsTypeOpen(true); }}
          onMouseLeave={() => closeWithDelay(typeTimer, setIsTypeOpen)}
        >
          <MenuItem onClick={() => handleNavigation("/projects/sco-plots/")}>SCO Plots</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/villas/")}>Luxury Villas</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/plots/")}>Plots In Gurugram</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/residential/")}>Residential Projects</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/independent-floors/")}>Independent Floors</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/commercial/")}>Commercial Projects</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/farmhouse/")}>FarmHouses</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/industrial-plots/")}>Industrial Plots</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/affordable-homes/")}>Affordable Homes</MenuItem>
          <MenuItem onClick={() => handleNavigation("/projects/senior-living/")}>Senior Living</MenuItem>
        </MenuList>
      </Menu>
            
      {/* Quick links */}
      <Link to="/rental-properties/best-rental-property-in-gurugram/">
        <Button size="sm" variant="ghost" bg="transparent" color={isHome ? "white" : (!colorChange ? "red" : "white")} _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }} px={1} fontWeight="600" fontSize="16px" display={{ base: "none", md: forceHamburger || hideRental ? "none" : "inline-flex" }}>
          Rental
        </Button>
      </Link>
      <Link to="/buy-properties/best-resale-property-in-gurugram/">
        <Button size="sm" variant="ghost" bg="transparent" color={isHome ? "white" : (!colorChange ? "red" : "white")} _hover={{ bg: "transparent", color: isHome ? "white" : (!colorChange ? "red" : "white") }} px={1} fontWeight="600" fontSize="16px" display={{ base: "none", md: forceHamburger || hideResale ? "none" : "inline-flex" }}>
          Resale
        </Button>
      </Link>
      {/* Dubai (highlighted button) */}
      <Box
        as={motion.div}
        position="relative"
        display={{ base: "none", md: "inline-block" }}
        ml={{ base: 0, md: 1.5 }}
        zIndex={2}
        initial={{ opacity: 0, y: -6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -1, scale: 1.02 }}
      >
        <Box
          as={motion.div}
          position="absolute"
          top="-10px"
          right="-6px"
          px={2.5}
          py={0.5}
          bg="#E53935"
          color={isHome ? "white" : (!colorChange ? "red" : "white")}
          fontSize="8px"
          fontWeight="600"
          letterSpacing="0.7px"
          borderRadius="999px"
          textTransform="uppercase"
          boxShadow="0 6px 16px rgba(229,57,53,0.5)"
          zIndex={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          initial={{ opacity: 0, y: -4, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: [0.9, 1.06, 1] }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          NEW
        </Box>
        <Link to="/united-arab-emirates/">
          <Button
            variant="solid"
            bgGradient="linear(to-r, #D4A235, #B8860B)"
            color={isHome ? "white" : (!colorChange ? "red" : "white")}
            _hover={{ bgGradient: "linear(to-r, #D9AE47, #C39317)", boxShadow: "0 10px 26px rgba(0,0,0,0.22)", transform: "translateY(-1px)" }}
            _active={{ bgGradient: "linear(to-r, #B8860B, #8B6508)", boxShadow: "0 6px 18px rgba(0,0,0,0.3)", transform: "translateY(0)" }}
            px={4}
            py={1.5}
            height="24px"
            lineHeight="1"
            fontSize="13px"
            fontWeight="800"
            borderRadius="999px"
            borderWidth="1px"
            borderColor="rgba(255,255,255,0.9)"
            boxShadow="0 8px 22px rgba(0,0,0,0.2)"
            display={{ base: "none", md: "inline-flex" }}
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
          >
            <Box
              as={motion.div}
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              rounded="999px"
              bgGradient="linear(to-r, rgba(229,57,53,0) 0%, rgba(229,57,53,0.6) 50%, rgba(229,57,53,0) 100%)"
              initial={{ x: "110%" }}
              animate={{ x: "-110%" }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              style={{ transform: "translateX(50%)" }}
              zIndex={3}
            />
            <Box position="relative" zIndex={4}>DUBAI</Box>
          </Button>
        </Link>
      </Box>
     
    </Flex>
  );
}

