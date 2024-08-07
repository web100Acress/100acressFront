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
  FormHelperText,
} from "@chakra-ui/react";
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
import Nav from "./Nav";
import Free from "../../src/Pages/Free";
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
  const [isValidEmail, setIsValidEmail] = useState(true); // Step 2

  // Step 3
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const history = useNavigate();

  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    role: "propertyOwner",
  });



  const resetData = () => {
    setUserSignUp({
      name: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: "",
    });
  };

  const [passwordHide, setpasswordHide] = useState(true);
  const handleHideUnHide = () => {
    setpasswordHide(!passwordHide);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setIsValidEmail(validateEmail(value));
    }

    setUserSignUp({ ...userSignUp, [name]: value });
  };


  const [buttonText, setButtonText] = useState('Create your Account');
  const [responseMessage, setResponseMessage] = useState('')
  const handleUserRegister = () => {
    const { name, email, mobile, password, cpassword } = userSignUp;
   
    if (name && email && mobile && password && password === cpassword) {
     
      axios
        .post("https://api.100acress.com/postPerson/register", userSignUp)
        
        .then((response) => {
          setResponseMessage("Your accout is created, Please Signin");
          history("/signin");
          resetData();
        })
        
        .catch((error) => {
          console.error("Registration failed:", error);
          if (error.response) {
            setResponseMessage("The email is already registered.");
          } else if (error.request) {
            setResponseMessage("No response received from the server");
          } else {
            setResponseMessage(`Error setting up the request: ${error.message}`);
          }
        });
    } else {
      setResponseMessage("Please filled all data");
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
  const { name, email, mobile, password, cpassword } = userSignUp;
  return (
    <>
      <Nav />
      <Box position={"relative"}>
        {name !== "" &&
          email !== "" &&
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
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow="2xl"
          >
            <Stack spacing={4}></Stack>
            <Box as={"form"}>
              <form>
                <Stack spacing={4}>
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

                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      name="name"
                      type="text"
                      onChange={handleRegisterChange}
                      value={userSignUp.name}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <Input
                      placeholder="Email@provider.com"
                      name="email"
                      type="email"
                      value={userSignUp.email}
                      onChange={handleRegisterChange}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    {!isValidEmail && (
                      <FormHelperText color="red.500">
                        Invalid email format
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl>
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
                      _placeholder={{
                        color: "gray.500",
                      }}
                      pattern="^[0-9]{10,}$"
                      title="Please enter a valid numeric mobile number with at least 10 digits"
                    />
                  </FormControl>

                  <FormControl>
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
                        _placeholder={{
                          color: "gray.500",
                        }}
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

                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      name="cpassword"
                      type="password"
                      onChange={handleRegisterChange}
                      value={userSignUp.cpassword}
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                  </FormControl>

                  {responseMessage && <p className="mb-0 text-red-600 text-sm ">{responseMessage}</p>}
                </Stack>

                <Button
                  fontFamily={"heading"}
                  onClick={handleClick}
                  mt={3}
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
                  mt={4}
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
