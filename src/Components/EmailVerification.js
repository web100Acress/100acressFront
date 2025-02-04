import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button
} from "@chakra-ui/react";
import { Input ,message} from 'antd';

function EmailVerification() {

  const [email, setEmail] = useState("");
  const history = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();
  
  
  const handleSendOTP = () => {
    if(email.length === 0){
      messageApi.open({
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
      return;
    }
    if(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
      messageApi.open({
        type: "loading",
        content: "Sending OTP...",
        duration: 3,
      });
      axios.post("https://api.100acress.com/postPerson/verifyEmail", { email: email })
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "OTP sent successfully",
          duration: 3,
        });
        history("/signup/otp-verification/");
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Error sending OTP",
          duration: 3,
        });
        console.log(err);
      });
    }
    else{
      messageApi.open({
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
    }
  }

  const handleClick = () => {
    handleSendOTP();
  }

  const onChange = (value) => {
      setEmail(value);
  };


  return (
    <>
      <Box as={"form"}>
        {contextHolder}
      <form className="">
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-semibold text-center">Verify Your Email address</div>
          <div className="text-2xl my-5" >Please Enter your Email to receive OTP</div>
          <Input type="email" size="large" placeholder="Enter your Email" onChange={(e) => onChange(e.target.value)} />
            <Button
              display={"block"}
              fontFamily={"heading"}
              onClick={handleClick}
              my={6}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              >
              Get OTP
            </Button>
              </div>
        </form>
      </Box>
    </>
  )
}

export default EmailVerification;