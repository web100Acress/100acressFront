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
import Nav from "./Nav";
import Free from "../../src/Pages/Free";
import ClipLoader from "react-spinners/ClipLoader";
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

  const [onlyEmail, setOnlyEmail] = useState({
    email: "",
  });

  const [userSignUp, setUserSignUp] = useState({
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
    email: "",
    role: "propertyOwner",
  });

  const [checkOtp, setCheckOtp] = useState({
    otp: "",
  });

  const [otpVerified, setOtpVerified] = useState(false);
  const [emailVerifid, setEmailVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [verificationOtp, setVerificationOtp] = useState("");
  let [loading, setLoading] = useState(false);
  const handleChangeOnlyEmail = (e) => {
    const { name, value } = e.target;
    setOnlyEmail({ ...onlyEmail, [name]: value });
  };

  const handleCheckOtp = (e) => {
    const { name, value } = e.target;
    setCheckOtp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const VerifyEmailCheck = async () => {
    const { email } = onlyEmail;
    if (!email) {
      setVerificationStatus("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.100acress.com/postPerson/verifyEmail",
        onlyEmail
      ); 
      setEmailVerified(true);
      setLoading(false);
      if (res.status === 200) {
        setUserSignUp((prevState) => ({
          ...prevState,
          email: onlyEmail.email,
        }));

        toast({
          description: "OTP sent successfully. Check your email!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        // Assuming 409 is the status code for already registered email
        
        toast({
          description:
            "Email already registered. Please enter a different email.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        console.log(error);
      }
    }finally {
      setLoading(false);
    }
  };

  const VerifyOtp = async () => {
    const { otp } = checkOtp;

    if (!otp) {
      setVerificationOtp("Please enter OTP!");
      return;
    }
    try {
      const res = await axios.post(
        "https://api.100acress.com/postPerson/otp",
        checkOtp
      );

      if (res.status === 200) {
        toast({
          description: "OTP verified successfully!",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setOtpVerified(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast({
          description: "Incorrect OTP. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        console.log(error);
      }
    }
  };

  const resetData = () => {
    setUserSignUp({
      name: "",
      mobile: "",
      password: "",
      cpassword: "",
      email: onlyEmail.email,
    });
  };

  const [passwordHide, setpasswordHide] = useState(true);

  const handleHideUnHide = () => {
    setpasswordHide(!passwordHide);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({ ...userSignUp, [name]: value });
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
      <Nav />
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
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            boxShadow="2xl"
          >
            <Stack spacing={4}></Stack>
            <Box as={"form"}>
              <form>
                <Stack spacing={2}>
                  {/* We are working here */}
                  <Flex direction="column" align="center" justify="center">
                    <Text
                      bgGradient="linear(to-r, red.400, pink.500)"
                      bgClip="text"
                      fontWeight="bold"
                      textAlign="center"
                      className="text-md xl:text-xl lg:text-lg md:text-sm sm:text-lg"
                    >
                      Please Fill The Form To Verify Your Email
                    </Text>
                  </Flex>

                  <FormControl>
                    <InputGroup>
                      <Input
                        placeholder="Email@provider.com"
                        name="email"
                        type="email"
                        value={onlyEmail.email}
                        onChange={handleChangeOnlyEmail}
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />

                      <InputRightElement width="auto">
                        <Button
                          size="xs"
                          bgGradient="linear(to-r, red.400, pink.400)"
                          color="white"
                          _hover={{
                            bgGradient: "linear(to-r, red.400, pink.400)",
                          }}
                          onClick={VerifyEmailCheck}
                          className="lg:mr-4 mr-1 sm:mr-1"
                        >
                          {loading ? (
                            <ClipLoader
                              color="white"
                              loading={loading}
                              size={30}
                              className="text-blue-200"
                            />
                          ) : (
                            "Send OTP"
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {verificationStatus && (
                      <p className="text-sm italic text-red-600 -mb-6">
                        {verificationStatus}
                      </p>
                    )}
                    <FormHelperText color={"green.500"}></FormHelperText>
                  </FormControl>

                  {emailVerifid && (
                    <>
                      <FormControl mt={4}>
                        <InputGroup>
                          <Input
                            placeholder="Enter OTP"
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            _placeholder={{ color: "gray.500" }}
                            name="otp"
                            value={checkOtp.otp}
                            onChange={handleCheckOtp}
                            width="100%"
                          />
                          <InputRightElement width="auto">
                            <Button
                              size="xs"
                              bgGradient="linear(to-r, green.400, teal.400)"
                              color="white"
                              _hover={{
                                bgGradient: "linear(to-r, green.400, teal.400)",
                              }}
                              onClick={VerifyOtp}
                              className="lg:mr-4 sm:mr-1"
                            >
                              Verify OTP
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        {verificationOtp && (
                          <p className="text-sm italic text-red-600 -mb-6">
                            {verificationOtp}
                          </p>
                        )}
                        <FormHelperText color={"green.500"}></FormHelperText>
                      </FormControl>
                    </>
                  )}

                  {/* We are working here End */}
                  {otpVerified && (
                    <>
                      <Stack direction="row" isRequired spacing={4} mt={4}>
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

                      <FormControl mt={4}>
                        <Input
                          placeholder="Email"
                          name="email"
                          type="text"
                          value={userSignUp.email}
                          bg={"gray.100"}
                          border={0}
                          color={"gray.500"}
                          _placeholder={{ color: "gray.500" }}
                          className="hidden"
                        />
                      </FormControl>
                      <FormControl mt={-3}>
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

                      <FormControl mt={4}>
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
                    </>
                  )}

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
