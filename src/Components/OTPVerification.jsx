import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (otp.length === 6) handleCompleteAction();
  }, [otp]);

  const handleCompleteAction = async () => {
    // Check for otp length
    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
      return;
    }
    // Check for valid otp
    let isNotNumber = otp.some((num) => isNaN(num));
    if (isNotNumber) {
      toast.error("Please enter a valid OTP", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
      return;
    }

    //Conver the otp into string
    let otpArray = otp.map((num) => parseInt(num));
    let otpString = otpArray.join("");
    try {
      toast.info("Verifying OTP...", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
      //send the otp
      const res = await axios.post("/postPerson/otp", { otp: otpString });
      toast.success("OTP Verified. You can now login.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
      let agentData = localStorage.getItem("agentData");
      let agentDataJson = JSON.parse(agentData);
      //Update the email verifed to true in agenDataJson

      agentDataJson.emailVerified = true;
      localStorage.setItem("agentData", JSON.stringify(agentDataJson));

      navigate("/userdashboard/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Incorrect OTP. Please try again.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
    }
  };

  const handleClick = () => {
    handleCompleteAction();
  };

  const onInput = (value) => {
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCompleteAction();
  };

  return (
    <>
      <ToastContainer />
      <form
        className="mt-14 bg-white rounded shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center items-center my-5">
          <div className="text-2xl font-semibold text-center mt-5">
            Verify You Email address to access account.
          </div>
          <div className="text-2xl my-5">Please Enter OTP</div>
          <Input.OTP size="large" onInput={onInput} />
          <button
            type="submit"
            className="my-4 px-4 py-2 bg-primaryRed text-white rounded"
          >
            Submit OTP
          </button>
        </div>
      </form>
    </>
  );
}

export default OTPVerification;
