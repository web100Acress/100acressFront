import React, { useState } from "react";
import {
  Box,setIsProfileOpen,isProfileOpen,isDropdownOpen,
  Flex,setIsDropdownOpen,onClose,setShowLoginModal,
  IconButton,Image,ModalFooter,Spacer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer as ChakraSpacer, // Renamed Spacer to ChakraSpacer
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  HStack,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import logoImage from "../Images/100acress.png";
import { useDisclosure } from "@chakra-ui/react";

const PropertyBox = ({ text }) => (
  <Box bg="red" p={1} boxShadow="md" color="white" fontSize="sm" textAlign="center">
    <Text as="b">{text}</Text>
  </Box>
);

const Links = ["Home", "Rent", "Projects", "Buy"];
const linksObject = {
  Home: false,
  About: false,
  Projects: {
    "View all projects": false,
    "Glimpse of all projects": false,
  },
  Blog: false,
};

const handleProfileClick = () => {
  setIsProfileOpen(!isProfileOpen);
  setIsDropdownOpen(!isDropdownOpen);
  onClose(); // Close the main menu when clicking on the avatar
};

const handleLoginTextClick = () => {
  setShowLoginModal(true); // Set showLoginModal state to true to display the modal
};

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

const menuItems = [
  "LOGIN/ REGISTER",
  "User Name",
  "Modify Profile",
  "Change Password",
  "Recently Searched",
  "Recently View",
  "Logout",
];

const CustomSpacer = () => <Box width="80px" />; // Renamed Spacer to CustomSpacer

const NavLink = ({ children, dropdownLinks, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      position="relative"
      cursor="pointer"
      borderBottom="3px solid transparent"
      transition="border-bottom 0.3s"
      _hover={{ color: "white", borderBottom: "3px solid white", transition: "border-bottom 0.2s" }}
    >
      <Box
        as="b"
        px={2}
        rounded={"md"}
        cursor="pointer"
        onMouseEnter={() => setIsOpen(true)}
        onClick={dropdownLinks ? handleDropdown : onClick}
      >
        {children}
      </Box>
      {dropdownLinks && isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={0}
          zIndex={1}
          bg="white"
          p={2}
          borderColor="gray.200"
          whiteSpace="nowrap"
          onMouseLeave={() => setIsOpen(false)}
          rounded="md"
        >
          {dropdownLinks.map((link) => (
            <Box key={link} py={1} color="black" onClick={onClick}>
              {link}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const MenuListContainer = ({ isOpen }) => (
  <Box
    position="absolute"
    top="55px"
    right={0}
    zIndex={1}
    bg="white"
    p={2}
    borderColor="gray.200"
    whiteSpace="nowrap"
    rounded="md"
    display={isOpen ? "block" : "none"}
  >
    {menuItems.map((item, index) => (
      <MenuItem key={index} fontSize="sm" color={item === "LOGIN/ REGISTER" ? "red" : "black"}>
        {item}
      </MenuItem>
    ))}
  </Box>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseModal = () => {
    setShowLoginModal(false); 
  };

  const handleContinueClick = () => {
  };
   return (
    <Box>
      <Box bg="red" px={4}>
        <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton  size={"md"}
           icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="unstyled"  _hover={{ bg: "none" }}_active={{ bg: "none" }}
            _focus={{ boxShadow: "none" }} color="white"
          />
          <HStack spacing={8} alignItems={"center"} flex="1">
            <Box>
              <Image maxW={["100px", "200px"]} w="200px" src={logoImage} alt="100acress logo"
              />
            </Box>
            <HStack as={"nav"} spacing={4} color="white" direction="column"
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => {
                if (typeof linksObject[link] === "object") {
                  const dropdownLinks = Object.keys(linksObject[link]);
                  return (
                    <Link key={link} style={{ textDecoration: "none" }} to={`/${link}`}
                    >
                      <NavLink key={link} dropdownLinks={dropdownLinks}> {link}
                      </NavLink>
                    </Link>
                  );
                } else {
                  return (<Link key={link} style={{ textDecoration: "none" }} to={`/${link}`}
                    >
                      <NavLink key={link} onClick={onClose}>
                        {link}
                      </NavLink>
                    </Link>
                  );
                }
              })}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} ml="auto">
            <Button
              fontWeight="xl"
              color="red"
              bgColor="white"
              fontSize="sm"
              p={4}
              height="0.2px"
              width="170px"
              sx={{ borderRadius: "10px" }}

            >
              Post Property
              <CustomSpacer />
              <PropertyBox text="Free" fontSize="sm" />
            </Button>
            <CustomSpacer />
            <Menu>

              <MenuButton
                as={IconButton}
                size="sm"
                borderRadius="l"
                variant="unstyled"
                aria-label="Profile"
                icon={
                  <>
                    <Avatar bg="grey" boxSize='1.25em' w="35px" h="35px" />
                    <Badge
                      borderRadius='50%'
                      bg="red"
                      color="black"
                      fontSize="0.8em"
                      position="absolute"
                      top="-2px"
                      right="-2px"
                      px={1}
                    >

                    </Badge>
                  </>
                }
                onClick={handleProfileClick}
              />
              <IconButton
                icon={<ChevronDownIcon />}
                variant="unstyled"
                color="white"
                size="lg"
                aria-label="Toggle Dropdown"
                onClick={toggleDropdown}
                ml="-8px" // Adjust the margin to remove the gap
              />
              {isProfileOpen && <MenuListContainer isOpen={isDropdownOpen} />}
            </Menu> </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack color="white" as={"nav"} spacing={4}>
              {Links.map((link) => (
                <Link
                  key={link}
                  style={{ textDecoration: "none" }}
                  to={`/${link}`}
                >
                  <NavLink key={link}>{link}</NavLink>
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      <Flex justify="center" py={4}>
        <Text
          color="white"
          cursor="pointer"
          onClick={handleLoginTextClick} // Open the login/register modal on click
        >
          Login/Register
        </Text>
      </Flex>

      {/* Pop-up/modal for Login/Register */}
      <Modal isOpen={showLoginModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login/Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Input type="tel" placeholder="Enter your mobile number" />
            </FormControl>
            {/* Additional form fields can be added here */}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={handleContinueClick}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
