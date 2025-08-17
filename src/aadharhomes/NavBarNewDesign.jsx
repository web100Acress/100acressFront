import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import SearchBar from "../Components/HomePageComponents/SearchBar";

const NavLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <Text color="#EE1C25" fontWeight="semibold" fontSize="lg" mx={3}>
        {children}
      </Text>
    </Link>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("white")} px={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ base: "block", md: "block", lg: "none", xl: "none" }} 
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"} flex={1}>
            <Box display={{ base: "block", md: "block", lg: "block" }}>
              <Link to={"/"}>
                <Image
                  maxW={["160px", "200px"]}
                  minW={["50px", "70px"]}
                  width={["xs", "sm", "md", "lg"]}
                  src="../../Images/logo.png"
                  alt="100acress"
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              color={"#EE1C25"}
              paddingTop={5}
              display={{ base: "none", lg: "flex" }} // Show on larger screens
            >
              <NavLink to="/rental-properties/best-rental-property-in-gurugram/">
                Rent
              </NavLink>
              <NavLink to="/buy-properties/best-resale-property-in-gurugram/">
                Buy
              </NavLink>
              <NavLink to="/postproperty/">Sell</NavLink>
              <NavLink to="/projects-in-gurugram/">Projects</NavLink>
            </HStack>
          </HStack>

          <Flex alignItems={"center"} paddingTop={1}>
            <Button
              textColor={"#e53e3e"}
              bg={"white"}
              size={"sm"}
              border="2px solid #e53e3e"
              _hover={{ boxShadow: '0 0 0 3px rgba(229,62,62,0.15)', bg: 'white' }}
              mr={{ base: 2, md: 4 }}
              ml={{ base: 2, md: 0 }}
            >
              <Link textDecoration="none" _hover={{ color: "#e53e3e" }}>
                FREE
              </Link>
              <Text as="span" />
              <Text as="span" fontSize="sm">
                /Post Property
              </Text>
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                marginLeft={-3}
                _hover={{}} // Prevent hover effects on MenuButton
              >
                <Avatar
                  className="w-16 h-10 rounded-full"
                  src={"../../Images/avtar.webp"}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Navigation links for mobile view */}
        {isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              <NavLink to="/rental-properties/best-rental-property-in-gurugram/">
                Rent
              </NavLink>
              <NavLink to="/buy-properties/best-resale-property-in-gurugram/">
                Buy
              </NavLink>
              <NavLink to="/postproperty/">Sell</NavLink>
              <NavLink to="/projects-in-gurugram/">Projects</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box position="relative" width="100%" height="300px" overflow="hidden">
      <Image
        src={isMobile ? '../../Images/emaarmobile.png' : '../../Images/emaar.png'}
        alt="Emaar Banner"
        objectFit="cover"
        layout="fill"
      />
    </Box>
    </>
  );
}
