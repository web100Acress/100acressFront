import React from "react";
import { Box, Flex, IconButton, Button, Menu, MenuButton, MenuItem, MenuList, Text, SimpleGrid } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

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
}) {
  return (
    <Flex
      alignItems="center"
      gap={{ base: 1, md: 3 }}
      order={{ base: 1, md: 2 }}
      flex={{ base: "initial", md: 1 }}
      justifyContent={{ base: "flex-start", md: forceHamburger ? "flex-start" : "center" }}
      ml={{ base: 0, md: forceHamburger ? 0 : 3, lg: forceHamburger ? 0 : 6 }}
      pl={{ base: 0, md: forceHamburger ? 0 : 3 }}
      borderLeft={{ base: 'none', md: forceHamburger ? 'none' : '1px solid #f1f1f1' }}
      opacity={{ base: 1, md: isSearchOpen ? 0 : 1 }}
      transition="opacity 250ms ease"
      pointerEvents={{ base: "auto", md: isSearchOpen ? 'none' : 'auto' }}
      display={{ base: 'flex', md: isSearchOpen ? 'none' : 'flex' }}
    >
      {/* Mobile/compact-tablet/desktop-compact hamburger menu */}
      <Menu placement="bottom-start">
        <MenuButton
          as={IconButton}
          size="sm"
          icon={<RoundedHamburgerIcon boxSize={7} />}
          aria-label="Menu"
          variant="ghost"
          color="#111"
          mr={2}
          display={{ base: "inline-flex", md: (forceHamburger || showHamburgerOnDesktop) ? "inline-flex" : "none" }}
        />
        <MenuList p={3} minW={{ base: '260px', md: '340px' }}>
          {(forceHamburger || hideCity) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={2}>City</Box>
              <SimpleGrid columns={3} spacing={2} mb={3}>
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
              <Box h="1px" bg="#eee" my={2} />
            </>
          )}

          {(forceHamburger || hideBudget) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={1}>Budget</Box>
              <Box>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(0, 1)}>Under ₹1 Cr</MenuItem>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(1, 5)}>₹1 Cr - ₹5 Cr</MenuItem>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(5, 10)}>₹5 Cr - ₹10 Cr</MenuItem>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(10, 20)}>₹10 Cr - ₹20 Cr</MenuItem>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(20, 50)}>₹20 Cr - ₹50 Cr</MenuItem>
                <MenuItem as={Link} to="/budget-properties/" onClick={() => handlePriceClick(50, Infinity)}>Above ₹50 Cr</MenuItem>
              </Box>
              <Box h="1px" bg="#eee" my={2} />
            </>
          )}

          {(forceHamburger || hideProjectStatus) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={1}>Project Status</Box>
              <Box>
                <MenuItem as={Link} to="/projects/upcoming-projects-in-gurgaon/">Upcoming Projects</MenuItem>
                <MenuItem as={Link} to="/projects-in-newlaunch/">New Launch Projects</MenuItem>
                <MenuItem as={Link} to="/project-in-underconstruction/">Under Construction</MenuItem>
                <MenuItem as={Link} to="/projects-in-gurugram/property-ready-to-move/">Ready To Move</MenuItem>
              </Box>
              <Box h="1px" bg="#eee" my={2} />
            </>
          )}

          {(forceHamburger || hideProjectType) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={1}>Project Type</Box>
              <Box>
                <MenuItem as={Link} to="/sco/plots/">SCO Plots</MenuItem>
                <MenuItem as={Link} to="/projects/villas/">Luxury Villas</MenuItem>
                <MenuItem as={Link} to="/plots-in-gurugram/">Plots In Gurugram</MenuItem>
                <MenuItem as={Link} to="/property/residential/">Residential Projects</MenuItem>
                <MenuItem as={Link} to="/projects/independentfloors/">Independent Floors</MenuItem>
                <MenuItem as={Link} to="/projects/commercial/">Commercial Projects</MenuItem>
              </Box>
              <Box h="1px" bg="#eee" my={2} />
            </>
          )}

          {(forceHamburger || hideRental) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={1}>Rental</Box>
              <MenuItem as={Link} to="/rental-properties/best-rental-property-in-gurugram/">View Rental Properties</MenuItem>
              <Box h="1px" bg="#eee" my={2} />
            </>
          )}

          {(forceHamburger || hideResale) && (
            <>
              <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={1}>Resale</Box>
              <MenuItem as={Link} to="/buy-properties/best-resale-property-in-gurugram/">View Resale Properties</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>

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
          display={{ base: "none", md: (forceHamburger || hideCity) ? "none" : "inline-flex" }}
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
          <Box fontWeight="700" fontSize="12px" color="#e53e3e" textTransform="uppercase" mb={2}>Top Cities</Box>
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
          display={{ base: "none", md: (forceHamburger || hideBudget) ? "none" : "inline-flex" }}
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

      {/* Project Status */}
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
          display={{ base: "none", md: (forceHamburger || hideProjectStatus) ? "none" : "inline-flex" }}
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

      {/* Project Type */}
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
          display={{ base: "none", md: (forceHamburger || hideProjectType) ? "none" : "inline-flex" }}
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

      {/* Divider */}
      <Box as="span" display={{ base: "none", md: (forceHamburger || showHamburgerOnDesktop) ? "none" : (colorChange ? "none" : "inline-block") }} w="1px" h="18px" bg="#eaeaea" mx={2} />

      {/* Quick links */}
      <Link to="/rental-properties/best-rental-property-in-gurugram/">
        <Button size="sm" variant="ghost" bg="transparent" color={colorChange ? "white" : "#e53e3e"} _hover={{ bg: "transparent", color: colorChange ? "white" : "#e53e3e" }} px={3} fontWeight="600" fontSize="16px" display={{ base: "none", md: forceHamburger || hideRental ? "none" : "inline-flex" }}>
          Rental
        </Button>
      </Link>
      <Link to="/buy-properties/best-resale-property-in-gurugram/">
        <Button size="sm" variant="ghost" bg="transparent" color={colorChange ? "white" : "#e53e3e"} _hover={{ bg: "transparent", color: colorChange ? "white" : "#e53e3e" }} px={3} fontWeight="600" fontSize="16px" display={{ base: "none", md: forceHamburger || hideResale ? "none" : "inline-flex" }}>
          Resale
        </Button>
      </Link>
    </Flex>
  );
}
