import { useEffect, useState, useRef } from "react";
import api from "../config/apiClient";
import { Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerification({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const hasSubmittedRef = useRef(false);

  const userEmail = email || localStorage.getItem("userEmail");

  /* 🔒 BLOCK ESC + BACK BUTTON */
  useEffect(() => {
    const blockKeys = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("keydown", blockKeys);
    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  /* ⏱️ RESEND TIMER */
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const handleResendOtp = async () => {
    if (resendLoading || resendCooldown > 0) return;

    if (!userEmail) {
      toast.error("Email not found. Please register again.", {
        position: "top-center",
      });
      return;
    }

    setResendLoading(true);
    try {
      await api.post("/postPerson/verifyEmail", { email: userEmail });
      toast.success("OTP sent again. Please check your email.", {
        position: "top-center",
      });
      setResendCooldown(60);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to resend OTP.",
        { position: "top-center" }
      );
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (isSubmitting || hasSubmittedRef.current) return;

    const otpString = String(otp).trim();

    if (!/^\d{6}$/.test(otpString)) {
      toast.error("Enter a valid 6-digit OTP", {
        position: "top-center",
      });
      return;
    }

    setIsSubmitting(true);
    hasSubmittedRef.current = true;

    try {
      toast.info("Verifying OTP...", { position: "top-center" });

      await api.post("/postPerson/otp", {
        email: userEmail,
        otp: otpString,
      });

      toast.success("Email verified successfully!", {
        position: "top-center",
      });

      // ✅ ONLY PLACE WHERE MODAL CLOSES
      setTimeout(() => {
        onVerified?.();
      }, 1200);
    } catch (error) {
      hasSubmittedRef.current = false;
      setIsSubmitting(false);

      toast.error(
        error?.response?.data?.message || "Incorrect OTP",
        { position: "top-center" }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"
        onClick={(e) => e.stopPropagation()} // ❌ outside close disabled
      >
        <div
          className="bg-white rounded-2xl shadow-2xl p-5 w-80 max-w-sm"
          onClick={(e) => e.stopPropagation()} // ❌ inside click safe
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            Verify Your Email
          </h1>

          <p className="text-center text-sm text-gray-500 mb-4">
            OTP sent to <b>{userEmail}</b>
          </p>

          <Input.OTP
            size="large"
            length={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              hasSubmittedRef.current = false;
              setIsSubmitting(false);
            }}
            disabled={isSubmitting}
          />

          <button
            onClick={handleVerifyOTP}
            disabled={isSubmitting || otp.length !== 6}
            className={`w-full mt-5 py-3 rounded-xl text-white font-semibold transition ${
              isSubmitting || otp.length !== 6
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify & Continue"}
          </button>

          <p className="text-center text-sm mt-4 text-gray-500">
            Didn’t receive OTP?{" "}
            <button
              onClick={handleResendOtp}
              disabled={resendLoading || resendCooldown > 0}
              className="text-red-600 font-semibold"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default OTPVerification;
