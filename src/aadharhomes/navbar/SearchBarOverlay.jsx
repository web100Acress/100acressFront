import React from "react";
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, IconButton, Flex } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";

export default function SearchBarOverlay({
  isSearchOpen,
  setIsSearchOpen,
  currentPlaceholder,
  formData,
  handleSearchInput,
  handleSearchKeyDown,
  submitSearch,
}) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      transform={isSearchOpen ? "translate(-50%, -50%)" : "translate(-50%, -50%)"}
      opacity={isSearchOpen ? 1 : 0}
      transition="transform 300ms ease, opacity 250ms ease"
      pointerEvents={isSearchOpen ? "auto" : "none"}
      w={{ base: "74vw", md: "min(600px, 60vw)" }}
      zIndex={10003}
    >
      <InputGroup
        bg="white"
        borderRadius="9999px"
        boxShadow="0 10px 30px rgba(0,0,0,0.15)"
        border="1px solid rgba(0,0,0,0.06)"
        overflow="hidden"
      >
        <Input
          h={{ base: "44px", md: "48px" }}
          pl={{ base: "16px", md: "20px" }}
          pr={{ base: "112px", md: "126px" }}
          placeholder={currentPlaceholder}
          _placeholder={{ color: "gray.500" }}
          borderRadius="9999px"
          border="transparent"
          focusBorderColor="#e53e3e"
          bg="white"
          value={formData.query}
          onChange={handleSearchInput}
          onKeyDown={handleSearchKeyDown}
        />
        <InputRightElement h={{ base: "44px", md: "48px" }} width={{ base: "116px", md: "130px" }} pr="2" zIndex={2}>
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="Submit search"
              size="sm"
              borderRadius="full"
              colorScheme="red"
              bg="#e53e3e"
              _hover={{ bg: "#cc2f3b" }}
              icon={<SearchIcon boxSize={4} />}
              onClick={submitSearch}
            />
            <IconButton
              aria-label="Close search"
              size="sm"
              variant="ghost"
              icon={<CloseIcon boxSize="0.7em" />}
              onClick={() => setIsSearchOpen(false)}
            />
          </Flex>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
