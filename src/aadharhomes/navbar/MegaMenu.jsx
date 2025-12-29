import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function MegaMenu({ isOpen, onClose, handlePriceClick }) {
  if (!isOpen) return null;
  return (
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
                  <Link to="/projects-in-alwar/">Projects in Alwar</Link>
                  <Link to="/projects-in-karnal/">Projects in Karnal</Link>
                  <Link to="/projects-in-jalandhar/">Projects in Jalandhar</Link>
                  <Link to="/projects-in-pushkar/">Projects in Pushkar</Link>
                  <Link to="/united-arab-emirates/" style={{ color: "#e53e3e", fontWeight: 600 }}>Projects in Dubai *</Link>
                </Flex>
              </Box>

              {/* Budget */}
              <Box minW="200px">
                <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Budget</Box>
                <Box h="1px" bg="#eaeaea" mb={3} />
                <Flex direction="column" gap={1} fontSize="14px">
                  <Link to="/projects/under-1-cr/" onClick={() => handlePriceClick(0, 1)}>Under ₹1 Cr</Link>
                  <Link to="/projects/1-5-cr/" onClick={() => handlePriceClick(1, 5)}>₹1 Cr - ₹5 Cr</Link>
                  <Link to="/projects/5-10-cr/" onClick={() => handlePriceClick(5, 10)}>₹5 Cr - ₹10 Cr</Link>
                  <Link to="/projects/10-20-cr/" onClick={() => handlePriceClick(10, 20)}>₹10 Cr - ₹20 Cr</Link>
                  <Link to="/projects/20-50-cr/" onClick={() => handlePriceClick(20, 50)}>₹20 Cr - ₹50 Cr</Link>
                  <Link to="/projects/above-50-cr/" onClick={() => handlePriceClick(50, Infinity)}>Above ₹50 Cr</Link>
                </Flex>
              </Box>

              {/* Project Status */}
              <Box minW="200px">
                <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Status</Box>
                <Box h="1px" bg="#eaeaea" mb={3} />
                <Flex direction="column" gap={1} fontSize="14px">
                  <Link to="/projects/upcoming/">Upcoming Projects</Link>
                  <Link to="/projects/newlaunch/">New Launch Projects</Link>
                  <Link to="/projects/underconstruction/">Under Construction</Link>
                  <Link to="/projects/ready-to-move/">Ready To Move</Link>
                </Flex>
              </Box>

              {/* Project Type */}
              <Box minW="200px">
                <Box fontWeight="700" color="#e53e3e" mb={2} textTransform="uppercase">Project Type</Box>
                <Box h="1px" bg="#eaeaea" mb={3} />
                <Flex direction="column" gap={1} fontSize="14px">
                  <Link to="/projects/sco-plots/">SCO Plots</Link>
                  <Link to="/projects/villas/">Luxury Villas</Link>
                  <Link to="/projects/plots/">Plots In Gurugram</Link>
                  <Link to="/projects/residential/">Residential Projects</Link>
                  <Link to="/projects/independent-floors/">Independent Floors</Link>
                  <Link to="/projects/commercial/">Commercial Projects</Link>
                  <Link to="/projects/senior-living/">Seniar living</Link>
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

              {/* Insights (highlighted button) */}
              <Box minW="200px" display="flex" alignItems="flex-start">
                <Link to="/analytics">
                  <Box
                    as="span"
                    bg="#e53e3e"
                    color="white"
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight="700"
                    boxShadow="0 6px 16px rgba(229,62,62,0.25)"
                    _hover={{ bg: '#c53030', boxShadow: '0 8px 20px rgba(197,48,48,0.35)' }}
                    _active={{ transform: 'translateY(1px)' }}
                  >
                    Insights
                  </Box>
                </Link>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
}
