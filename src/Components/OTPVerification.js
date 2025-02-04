import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button
} from "@chakra-ui/react";
import { Input ,message} from 'antd';

function OTPVerification() {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();
  
  useEffect(()=>{
    if(otp.length === 6) handleCompleteAction();
  },[otp])

  const handleCompleteAction = () => {
      // Check for otp length
      if(otp.length !== 6){
        messageApi.open({
          type: "error",
          content: "Please enter a valid OTP",
          duration: 3,
        });
        return;
      }
      // Check for valid otp
      let isNotNumber = otp.some((num) => isNaN(num));
      if (isNotNumber){
        messageApi.open({
          type: "error",
          content: "Please enter a valid OTP",
          duration: 3,
        });
        return;
      };

      //Conver the otp into string
      let otpArray = otp.map((num) => parseInt(num));
      let otpString = otpArray.join("");
      try {
        messageApi.open({
          type: "loading",
          content: "Verifying OTP...",
          duration: 2,
        })
        //send the otp
        axios.post("https://api.100acress.com/postPerson/otp", { otp: otpString })
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "OTP Verified. You can now login.",
            duration: 2,
          })
          let agentData = localStorage.getItem("agentData");
          let agentDataJson = JSON.parse(agentData);
          //Update the email verifed to true in agenDataJson

          agentDataJson.emailVerified = true;
          localStorage.setItem("agentData", JSON.stringify(agentDataJson));

          navigate("/userdashboard/");
        });
      } catch (error) {
        console.error("Registration failed:", error);
        messageApi.open({
          type: "error",
          content: "Registration failed. Please try again.",
          duration: 3,
        });
      }
  }

  const handleClick = () => {
    handleCompleteAction();
  }

  const onInput = (value) => {
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCompleteAction();
  };


  return (
    <>
      <Box as={"form"}>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-semibold text-center">Verify You Email address to access account.</div>
          <div className="text-2xl my-5" >Please Enter OTP</div>
          <Input.OTP size="large" onInput={onInput} />
            <Button
              type="submit"
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
              Enter OTP
            </Button>
              </div>
        </form>
      </Box>
    </>
  )
}

export default OTPVerification;