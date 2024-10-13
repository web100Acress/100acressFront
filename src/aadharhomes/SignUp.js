import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import Footer from "../Components/Actual_Components/Footer";
import Free from "../../src/Pages/Free";
import Navbar from "./Navbar";

const avatars = [
  {
    name: "Ashish Bhadauriya",
    url: "../../Images/ashish.jpg",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Simran Karnwal",
    url: "../../Images/sim.PNG",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function SignUp() {
  const history = useNavigate();
  const toast = useToast();
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    email: "",
    role: "propertyOwner",
  });

  const resetData = () => {
    setUserSignUp({
      name: "",
      mobile: "",
      password: "",
      cpassword: "",
      email: "",
    });
  };

  const [passwordHide, setpasswordHide] = useState(true);

  const handleHideUnHide = () => {
    setpasswordHide(!passwordHide);
  };

  // const handleRegisterChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserSignUp({ ...userSignUp, [name]: value });
  // };



  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({ ...userSignUp, [name]: value });

    // Validate email on change
    if (name === 'email') {
      validateEmail(value);
    }

    // Validate mobile number on change
    if (name === 'mobile') {
      validateMobile(value);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  }

  const validateMobile = (mobile) => {
    // Check if the mobile number has exactly 10 digits
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number.');
    } else {
      setMobileError('');
    }
  };

  const [buttonText] = useState("Create your Account");

  const [responseMessage, setResponseMessage] = useState("");

  const handleUserRegister = () => {
    const { name, mobile, password, cpassword, email } = userSignUp;

    if (name && mobile && email && password && password === cpassword) {
      axios
        .post("https://api.100acress.com/postPerson/register", userSignUp)
        .then((response) => {
          // setResponseMessage("Your account is created, Please Sign in");
          history("/signin");
          resetData();

          // Show the toast notification
          toast({
            description: "Your account is created, Please LogIn",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    } else {
      setResponseMessage("Please fill all fields");
    }
  };

  const handleUserSignIn = () => {
    history("/signin");
  };

  const handleClick = () => {
    // showToastMessage();
    handleUserRegister();
  };

  const avatarSize = useBreakpointValue({ base: "md", md: "lg" });
  const { name, mobile, password, cpassword } = userSignUp;
  return (
    <>
      <Navbar />
      <Box position={"relative"}>
        {name !== "" &&
          mobile !== "" &&
          password !== "" &&
          cpassword !== "" && <ToastContainer />}
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 10 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Welcome to{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.500)"
                bgClip="text"
              >
                100acress
              </Text>
              <span color="white" bgColor="red">
                .com
              </span>
            </Heading>
            <Text
              mt={"-40px"}
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "md" }}
            >
              We’re India's most trust worthy real estate Dealer and we are
              looking for amazing investors and buyers just like you! Become a
              part of our team and skyrocket your life!
            </Text>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup mt={"-10%"}>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={avatarSize}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient: "linear(to-bl, red.400,pink.400)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                mt={"-10%"}
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                mt={"-10%"}
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg", lg: "2xl" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={useBreakpointValue({ base: "54px", md: "70px" })}
                minHeight={useBreakpointValue({ base: "54px", md: "70px" })}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, orange.400,yellow.400)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                YOU
              </Flex>
            </Stack>
          </Stack>

          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8, lg: 4 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow="2xl"
          >
            <Stack spacing={4}></Stack>
            <Box as={"form"}>
              <form>
                <Stack spacing={2}>
                  {/* We are working here */}

                  <Stack direction="row" isRequired spacing={4}>
                    <RadioGroup
                      onChange={(value) =>
                        setUserSignUp({ ...userSignUp, role: value })
                      }
                      value={userSignUp.role}
                      isRequired
                      className="m-2"
                      defaultValue="2"
                    >
                      <Stack spacing={5} direction="row" color="black">
                        <Radio
                          colorScheme="red"
                          value="Agent"
                          size="lg"
                          isRequired
                        >
                          Agent
                        </Radio>
                        <Radio
                          colorScheme="red"
                          value="Owner"
                          size="lg"
                          isRequired
                        >
                          Owner
                        </Radio>
                        <Radio
                          colorScheme="red"
                          value="Developer"
                          size="lg"
                          isRequired
                        >
                          Developer
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Stack>

                  <FormControl mt={4} isInvalid={!!emailError}>
                    <Input
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={userSignUp.email}
                      onChange={handleRegisterChange}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{ color: "gray.500" }}
                    />
                    <FormErrorMessage>{emailError}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4}>
                    <Input
                      placeholder="Full Name"
                      name="name"
                      type="text"
                      onChange={handleRegisterChange}
                      value={userSignUp.name}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{ color: "gray.500" }}
                    />
                  </FormControl>

                  {/* <FormControl mt={4}>
                    <Input
                      placeholder="+91 ____"
                      name="mobile"
                      type="tel"
                      required
                      onChange={handleRegisterChange}
                      value={userSignUp.mobile}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{ color: "gray.500" }}
                      pattern="^[0-9]{10,}$"
                      title="Please enter a valid numeric mobile number with at least 10 digits"
                    />
                  </FormControl> */}

<FormControl mt={4} isInvalid={!!mobileError}>
      <Input
        placeholder="+91 ____"
        name="mobile"
        type="tel"
        required
        onChange={handleRegisterChange}
        value={userSignUp.mobile}
        bg={"gray.100"}
        border={0}
        color={"gray.500"}
        _placeholder={{ color: "gray.500" }}
        pattern="[0-9]{10}"
        title="Please enter a valid 10-digit mobile number"
      />
      <FormErrorMessage>{mobileError}</FormErrorMessage>
    </FormControl>

                  <FormControl mt={4}>
                    <InputGroup>
                      <Input
                        placeholder="Enter password"
                        name="password"
                        type={passwordHide ? "password" : "text"}
                        onChange={handleRegisterChange}
                        value={userSignUp.password}
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{ color: "gray.500" }}
                      />
                      <InputRightElement>
                        {passwordHide ? (
                          <FaEyeSlash onClick={handleHideUnHide} />
                        ) : (
                          <FaEye onClick={handleHideUnHide} />
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl mt={4}>
                    <Input
                      placeholder="Confirm password"
                      name="cpassword"
                      type="password"
                      onChange={handleRegisterChange}
                      value={userSignUp.cpassword}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{ color: "gray.500" }}
                    />
                  </FormControl>

                  {responseMessage && (
                    <p className="mb-0 text-red-600 text-sm ">
                      {responseMessage}
                    </p>
                  )}
                </Stack>

                <Button
                  fontFamily={"heading"}
                  onClick={handleClick}
                  mt={4}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                >
                  {buttonText}
                </Button>

                <Button
                  onClick={handleUserSignIn}
                  fontFamily={"heading"}
                  bg={"gray.200"}
                  color={"gray.800"}
                  mt={6}
                  w={"full"}
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Free />
      <Footer />
    </>
  );
}
