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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-10 border border-gray-100">
            {/* Icon/Logo Area */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primaryRed to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Verify Your Email
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                We've sent a 6-digit verification code to your email address. 
                Please enter it below to access your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input Section */}
              <div className="flex flex-col items-center space-y-4">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Enter OTP Code
                </label>
                
                <div className="otp-input-wrapper">
                  <Input.OTP 
                    size="large" 
                    length={6}
                    onChange={onChange}
                    value={otp}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Status Message */}
                {otp.length === 6 && !isSubmitting && (
                  <div className="flex items-center space-x-2 text-green-600 animate-fade-in">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-sm font-medium">Ready to verify</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || otp.length !== 6}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform ${
                  isSubmitting || otp.length !== 6
                    ? 'bg-gray-300 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-primaryRed to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                  </span>
                ) : (
                  'Verify & Continue'
                )}
              </button>

              {/* Help Text */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Didn't receive the code?{' '}
                  <button 
                    type="button" 
                    className="text-primaryRed hover:text-red-700 font-semibold hover:underline transition-colors"
                    onClick={() => toast.info("Resend feature coming soon!")}
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Protected by secure verification technology
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .otp-input-wrapper :global(.ant-input-otp) {
          gap: 12px;
        }

        .otp-input-wrapper :global(.ant-input) {
          width: 48px !important;
          height: 56px !important;
          font-size: 24px;
          font-weight: 600;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .otp-input-wrapper :global(.ant-input:focus) {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .otp-input-wrapper :global(.ant-input:disabled) {
          background-color: #f9fafb;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

export default OTPVerification;