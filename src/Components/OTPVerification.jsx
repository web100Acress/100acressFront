import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/apiClient";
import { Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const hasSubmittedRef = useRef(false);

  const handleCompleteAction = async (otpValue) => {
    // Prevent multiple submissions
    if (isSubmitting || hasSubmittedRef.current) {
      return;
    }

    // Use the provided value or the state value
    const otpToVerify = otpValue || otp;

    // Check for otp length
    if (!otpToVerify || otpToVerify.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    // Check if OTP contains only numbers and ensure it's exactly 6 digits
    const otpString = String(otpToVerify).trim().replace(/\s+/g, '');
    
    // Validate OTP format
    if (!/^\d{6}$/.test(otpString)) {
      toast.error("Please enter a valid 6-digit numeric OTP", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
      hasSubmittedRef.current = false;
      return;
    }

    // Mark as submitting to prevent duplicate calls
    setIsSubmitting(true);
    hasSubmittedRef.current = true;
    
    try {
      toast.info("Verifying OTP...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Send the OTP to the backend as a string
      const res = await api.post("/postPerson/otp", { otp: otpString });
      
      toast.success("OTP Verified successfully! Redirecting...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Update agent data
      try {
        let agentData = localStorage.getItem("agentData");
        if (agentData) {
          let agentDataJson = JSON.parse(agentData);
          agentDataJson.emailVerified = true;
          localStorage.setItem("agentData", JSON.stringify(agentDataJson));
        }
      } catch (err) {
        console.error("Error updating agent data:", err);
      }

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/userdashboard/");
      }, 1500);
    } catch (error) {
      console.error("OTP verification failed:", error);
      hasSubmittedRef.current = false;
      setIsSubmitting(false);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Incorrect OTP. Please try again.";
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const onChange = (value) => {
    // Ant Design Input.OTP onChange returns a string
    const otpValue = String(value || "").trim();
    setOtp(otpValue);
    // Reset submission flag when OTP changes (allows retry after error)
    if (hasSubmittedRef.current) {
      hasSubmittedRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSubmitting && !hasSubmittedRef.current) {
      handleCompleteAction();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-14 bg-white rounded shadow-lg p-8 max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center my-5">
            <div className="text-2xl font-semibold text-center mt-5">
              Verify Your Email address to access account.
            </div>
            <div className="text-xl my-5 text-gray-600">Please Enter OTP</div>
            <Input.OTP 
              size="large" 
              length={6}
              onChange={onChange}
              value={otp}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || otp.length !== 6}
              className={`my-4 px-6 py-2 rounded text-white font-semibold transition-colors ${
                isSubmitting || otp.length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primaryRed hover:bg-red-700'
              }`}
            >
              {isSubmitting ? "Verifying..." : "Submit OTP"}
            </button>
            {otp.length === 6 && !isSubmitting && (
              <p className="text-sm text-green-600 mt-2">
                OTP entered. Click Submit to verify.
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default OTPVerification;
