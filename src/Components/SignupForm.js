import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  RadioGroup,
  Radio,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { message } from "antd";
import "antd/dist/reset.css";
import { AuthContext } from "../AuthContext";

function SignupForm() {
  const history = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordHide, setpasswordHide] = useState(true);
  const [loading, setLoading] = useState(false);
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
  const {signup} = useContext(AuthContext);

  const [messageApi,contextHolder] = message.useMessage();


  const handleHideUnHide = () => {
    setpasswordHide(!passwordHide);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({ ...userSignUp, [name]: value });

    // Validate email on change
    if (name === "email") {
      validateEmail(value);
    }

    // Validate mobile number on change
    if (name === "mobile") {
      validateMobile(value);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validateMobile = (mobile) => {
    // Check if the mobile number has exactly 10 digits
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileError("");
    }
  };

  const [buttonText] = useState("Create your Account");

  const [responseMessage, setResponseMessage] = useState("");

  const handleUserRegister = async () => {
    await signup(userSignUp, messageApi, resetData, setResponseMessage);
  };

  const handleUserSignIn = () => {
    history("/signin/");
  };

  const handleClick = () => {
    // showToastMessage();
    handleUserRegister();
  };
  
  return (
    <>
      {contextHolder}
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
                  <Radio colorScheme="red" value="Agent" size="lg" isRequired>
                    Agent
                  </Radio>
                  <Radio colorScheme="red" value="Owner" size="lg" isRequired>
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
              <p className="mb-0 text-red-600 text-sm ">{responseMessage}</p>
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
    </>
  );
}

export default SignupForm;
