import React from "react";
import { Box, Flex, Button, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function InsightsMega({ isOpen, onClose }) {
  const TypeIcon = ({ name }) => {
    const common = { width: 4, height: 4, color: "#7fd5f0" };
    switch ((name || '').toLowerCase()) {
      case 'residential':
        return (
          <Box as="svg" viewBox="0 0 24 24" {...common} mr={2}>
            <path d="M3 10l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M5 10v10h14V10" fill="none" stroke="currentColor" strokeWidth="1.8"/>
          </Box>
        );
      case 'commercial':
        return (
          <Box as="svg" viewBox="0 0 24 24" {...common} mr={2}>
            <rect x="3" y="8" width="6" height="12" fill="none" stroke="currentColor" strokeWidth="1.6"/>
            <rect x="11" y="4" width="10" height="16" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          </Box>
        );
      case 'plots & land':
      case 'plots':
      case 'land':
        return (
          <Box as="svg" viewBox="0 0 24 24" {...common} mr={2}>
            <path d="M3 18l6-4 6 4 6-4" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M3 18h18" fill="none" stroke="currentColor" strokeWidth="1.8"/>
          </Box>
        );
      case 'luxury villas':
      case 'villas':
        return (
          <Box as="svg" viewBox="0 0 24 24" {...common} mr={2}>
            <path d="M3 11l9-5 9 5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M7 21V12h10v9" fill="none" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M9 21v-4h6v4" fill="none" stroke="currentColor" strokeWidth="1.8"/>
          </Box>
        );
      default:
        return (
          <Box as="svg" viewBox="0 0 24 24" {...common} mr={2}>
            <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          </Box>
        );
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Outside-click overlay below navbar */}
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
            <Box
              as={motion.div}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
              top={{ base: "56px", md: "64px" }}
              zIndex={9998}
              width={{ base: "95%", md: "860px" }}
              maxW="95vw"
            >
              <Box
                bg="#0c1a22"
                color="white"
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 7 }}
                rounded="lg"
                boxShadow="0 12px 28px rgba(0,0,0,0.35)"
              >
                <Grid templateColumns={{ base: "1fr", md: "1.35fr 1fr 1fr" }} gap={{ base: 6, md: 10 }} alignItems="start">
                  {/* Featured Insight */}
                  <Box flex="1" minW={{ base: "240px", md: "300px" }} maxW="340px">
                    <Box
                      fontSize="12px"
                      color="#58a6c3"
                      fontWeight="700"
                      textTransform="uppercase"
                      mb={3}
                    >
                      Featured Insight
                    </Box>
                    <Box
                      bg="#0e3242"
                      rounded="md"
                      overflow="hidden"
                      border="1px solid rgba(255,255,255,0.08)"
                      _hover={{ transform: "scale(1.02)", transition: "0.2s ease" }}
                    >
                      <Box
                        as="img"
                        src="https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=80"
                        alt="Featured real estate"
                        h="120px"
                        w="100%"
                        objectFit="cover"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80'; }}
                      />
                      <Box p={4}>
                        <Box
                          fontWeight="800"
                          letterSpacing="0.5px"
                          fontSize="12px"
                          color="#7fd5f0"
                          textTransform="uppercase"
                          mb={1}
                        >
                          Real estate
                        </Box>
                        <Box fontWeight="800" lineHeight="1.2" fontSize="15px" mb={1}>
                          India real estate outlook 2025
                        </Box>
                        <Box fontSize="12px" color="whiteAlpha.800">
                          AadharHomes Research
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Market and portfolio insights */}
                  <Box flex="1" minW={{ base: "200px", md: "220px" }}>
                    <Box
                      fontSize="12px"
                      color="#58a6c3"
                      fontWeight="700"
                      textTransform="uppercase"
                      mb={3}
                    >
                      Market & Portfolio
                    </Box>
                    <Flex direction="column" gap={2}>
                      {[
                        { name: "Investment outlook", path: "/real-estate-insights/investment-outlook" },
                        { name: "Global Investment Committee", path: "/real-estate-insights/global-committee" },
                        { name: "Asset allocation", path: "/real-estate-insights/asset-allocation" },
                        { name: "Responsible investing", path: "/real-estate-insights/responsible-investing" },
                        { name: "Subscribe to insights", path: "/subscribe/insights" },
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          style={{
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.85)",
                            transition: "0.2s",
                            display: "flex",
                            alignItems: "center"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#7fd5f0"}
                          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.85)"}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Button
                        as={Link}
                        to="/real-estate-insights"
                        variant="outline"
                        borderColor="whiteAlpha.400"
                        colorScheme="whiteAlpha"
                        size="sm"
                        mt={2}
                        w="fit-content"
                        _hover={{ bg: "whiteAlpha.200" }}
                      >
                        All insights
                      </Button>
                    </Flex>
                  </Box>

                  {/* Real estate types */}
                  <Box flex="1" minW={{ base: "200px", md: "220px" }}>
                    <Box
                      fontSize="12px"
                      color="#58a6c3"
                      fontWeight="700"
                      textTransform="uppercase"
                      mb={3}
                    >
                      Real estate types
                    </Box>
                    <Flex direction="column" gap={2}>
                      {[
                        { name: "Residential", path: "/property/residential/" },
                        { name: "Commercial", path: "/projects/commercial/" },
                        { name: "Plots & Land", path: "/plots-in-gurugram/" },
                        { name: "Luxury Villas", path: "/projects/villas/" }
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          style={{
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.85)",
                            transition: "0.2s",
                            display: "flex",
                            alignItems: "center"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#7fd5f0"}
                          onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.85)"}
                        >
                          <TypeIcon name={item.name} />
                          {item.name}
                        </Link>
                      ))}
                    </Flex>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
}
