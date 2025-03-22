import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { Input ,message} from 'antd';

function EmailVerification() {

  const [email, setEmail] = useState("");
  const history = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();
  
  
  const handleSendOTP = () => {
    if(email.length === 0){
      messageApi.open({
        key:"EmailVerificationOTPError",
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
      return;
    }
    if(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){

      messageApi.open({
        key:"EmailVerificationOTPLoading",
        type: "loading",
        content: "Sending OTP...",
        duration: 3,
      });

      axios.post("/api/postPerson/verifyEmail", { email: email })
      .then((res) => {

        messageApi.destroy("EmailVerificationOTPLoading");
        messageApi.open({
          key:"OtpSent",
          type: "success",
          content: "OTP sent successfully",
          duration: 3,
        });
        history("/auth/signup/otp-verification/");

      })
      .catch((err) => {
        
        if(err.response.status === 409){

          messageApi.destroy("EmailVerificationOTPLoading");
          messageApi.open({
            key:"OtpAlreadySent",
            type: "loading",
            content: "Otp already sent. Redirecting to OTP verification page",
            duration: 1,
          }).then(() => {            
            history("/auth/signup/otp-verification/");
            return;
          })
        }
        else{
          messageApi.open({
            key:"EmailVerificationOTPError",
            type: "error",
            content: "Error sending OTP",
            duration: 3,
          });
        }
      });
    }
    else{
      messageApi.open({
        key:"EmailVerificationOTPError",
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    handleSendOTP();
  }

  const onChange = (value) => {
      setEmail(value);
  };


  return (
    <>
        {contextHolder}
      <form className="mt-14 bg-white rounded shadow-lg" onSubmit={handleClick}>
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-semibold text-center mt-10">Verify Your Email address</div>
          <div className="text-2xl my-5" >Please Enter your Email to receive OTP</div>
          <Input type="email" size="large" placeholder="Enter your Email" onChange={(e) => onChange(e.target.value)} className="w-1/2" />
            <button
              className="my-4 px-4 py-2 bg-primaryRed text-white rounded"
              onClick={handleClick}
              >
              Get OTP
            </button>
              </div>
        </form>
    </>
  )
}

export default EmailVerification;