import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "../Utils/toastUtils";
import "antd/dist/reset.css";
import { Input } from "antd";
import { AuthContext } from "../AuthContext";
import { Eye, EyeOff, X } from "lucide-react";
import api from "../config/apiClient";

const roles = ["Agent", "Owner", "Builder"];

function SignupForm({ inModal = false, onSwitchToLogin }) {
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

 useEffect(() => {
    // No custom styling - use default toast positioning
    return () => {
      // Cleanup if needed
    };
  }, []);
  const resetData = () => {
    setUserSignUp({
      name: "",
      mobile: "",
      password: "",
      cpassword: "",
      email: "",
    });
  };

  const { signup } = useContext(AuthContext);

  const handleHideUnHide = () => {
    setpasswordHide(!passwordHide);
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    // Validate email on change
    if (name === "email") {
      validateEmail(value);
    }

    // Validate mobile number on change
    if (name === "mobile") {
      validateMobile(value);
    }
    setUserSignUp({ ...userSignUp, [name]: value });

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

  const [responseMessage, setResponseMessage] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpiryTime, setOtpExpiryTime] = useState(0);

  useEffect(() => {
    if (!otpStep) return;
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [otpStep, resendCooldown]);

  useEffect(() => {
    if (!otpStep) return;
    if (otpExpiryTime <= 0) return;
    const t = setInterval(() => {
      setOtpExpiryTime((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [otpStep, otpExpiryTime]);

  const handleUserRegister = async () => {
    try {
      const response = await signup(userSignUp, resetData, setResponseMessage);
      
      // Check if response indicates OTP verification is needed
      if (response && response.requiresOTP) {
        // Start transition animation
        setIsTransitioning(true);
        
        setTimeout(() => {
          setUserEmail(response.email || userSignUp.email);
          setOtpStep(true);
          setOtp("");
          setIsTransitioning(false);
          setOtpExpiryTime(100); // 5 minutes expiry
          setResendCooldown(60); // 1 minute resend cooldown
          showToast.success(response.message || 'Registration successful! Please verify your email with OTP.', {
            position: 'top-center',
          });
        }, 300);
      } else {
        showToast.success('Registration successful!', {
          position: 'top-center',
        });
      }
    } catch (error) {
      showToast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otpSubmitting) return;
    const otpString = String(otp || "").trim();
    if (!/^\d{6}$/.test(otpString)) {
      showToast.error("Enter a valid 6-digit OTP");
      return;
    }
    if (!userEmail) {
      showToast.error("Email not found. Please register again.");
      return;
    }

    setOtpSubmitting(true);
    try {
      await api.post("/postPerson/otp", { email: userEmail, otp: otpString });
      showToast.success("Email verified successfully!", { position: "top-center" });
      setOtpStep(false);
      setTimeout(() => {
        if (typeof onSwitchToLogin === "function") {
          onSwitchToLogin();
        } else {
          history("/auth/signin/");
        }
      }, 500);
    } catch (error) {
      showToast.error(error?.response?.data?.message || "Incorrect OTP");
    } finally {
      setOtpSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendLoading || resendCooldown > 0) return;
    if (!userEmail) {
      showToast.error("Email not found. Please register again.");
      return;
    }

    setResendLoading(true);
    try {
      await api.post("/postPerson/verifyEmail", { email: userEmail });
      showToast.success("OTP sent again. Please check your email.", { position: 'top-center' });
      setResendCooldown(60);
      setOtpExpiryTime(300); // Reset expiry time on resend
    } catch (error) {
      showToast.error(error?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleUserSignIn = () => {
    if (typeof onSwitchToLogin === "function") {
      onSwitchToLogin();
      return;
    }
    history("/auth/signin/");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    validateEmail(userSignUp.email);
    validateMobile(userSignUp.mobile);

    if (emailError) {
      showToast.error(emailError);
      return;
    }
    else if (mobileError) {
      showToast.error(mobileError);
      return;
    }
    await handleUserRegister();
  };

  const handleSelectRole = (role) => {
    setUserSignUp((prev) => ({
      ...prev,
      role: role,
    }));
  };

  return (
    <>
      <div className={`relative ${otpStep ? "p-0.5 md:p-1" : "p-2 md:p-3"} ${inModal ? "w-full" : "max-sm:w-[90vw]"} transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>

        {/* Heading with Close Button */}
        <div className={otpStep ? "mb-0" : "mb-1.5"}>
          <div className="flex items-center justify-between">
            {!otpStep ? (
              <h2 className="text-[20px] md:text-[24px] font-extrabold text-[#e53935] font-sans tracking-tight">
                Create Your Account
              </h2>
            ) : (
              <div />
            )}
            {inModal && (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('closeAuthModal'))}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
          {!otpStep && (
            <div className="mt-0.5 flex justify-center">
              <span className="h-0.5 w-12 rounded-full bg-[#e53935]" />
            </div>
          )}
        </div>

        {!otpStep && !isTransitioning ? (
          <>
            <div className="my-1.5">
              <div className="flex flex-wrap gap-1.5">
                {roles.map((role) => (
                  <button
                    type="button"
                    key={role}
                    className={`px-3 py-1.5 rounded-full border transition-all duration-150 text-xs font-medium shadow-sm hover:shadow-md focus:outline-none ${userSignUp.role === role
                      ? "bg-[#e53935] text-white border-[#e53935]"
                      : "bg-white text-slate-700 border-slate-300 hover:border-[#e53935]/60 hover:text-[#e53935]"
                      }`}
                    onClick={() => handleSelectRole(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-1.5" onSubmit={handleClick}>
              <div className="flex gap-2 max-sm:flex-col">
                <div className="basis-1/2 flex flex-col">
                  <label htmlFor="name" className="text-xs font-medium text-slate-700 mb-0.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="basis-1/2 flex flex-col">
                  <label htmlFor="mobile" className="text-xs font-medium text-slate-700 mb-0.5">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter Your Number"
                    className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-xs font-medium text-slate-700 mb-0.5">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your gmail"
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="flex gap-2 max-sm:flex-col">
                <div className="basis-1/2 flex flex-col">
                  <label htmlFor="password" className="text-xs font-medium text-slate-700 mb-0.5">Password</label>
                  <div className="relative">
                    <input
                      type={passwordHide ? "password" : "text"}
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                      onChange={handleRegisterChange}
                    />
                    {passwordHide ? (
                      <EyeOff size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" onClick={handleHideUnHide} />
                    ) : (
                      <Eye size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 cursor-pointer" onClick={handleHideUnHide} />
                    )}
                  </div>
                </div>
                <div className="basis-1/2 flex flex-col">
                  <label htmlFor="cpassword" className="text-xs font-medium text-slate-700 mb-0.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={passwordHide ? "password" : "text"}
                      name="cpassword"
                      id="cpassword"
                      placeholder="Retype Password"
                      className="w-full border border-slate-300 rounded-lg px-3 py-1.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                      onChange={handleRegisterChange}
                    />
                    {passwordHide ? (
                      <EyeOff size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" onClick={handleHideUnHide} />
                    ) : (
                      <Eye size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 cursor-pointer" onClick={handleHideUnHide} />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#e53935] hover:bg-[#c62828] text-white font-bold rounded-lg py-2 mt-0.5 text-sm shadow-sm hover:shadow-md transition"
                onClick={handleClick}
              >
                Register
              </button>
            </form>

            <div className="text-center mt-1 text-xs text-slate-600">
              Already have an account?{" "}
              <button onClick={handleUserSignIn} className="text-[#e53935] font-semibold hover:underline">Login</button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3">
              <h3 className="text-base font-bold text-slate-800 text-center">Verify Your Email</h3>
              <p className="text-xs text-slate-500 text-center mt-1">OTP sent to <span className="font-semibold">{userEmail}</span></p>
            </div>

            <div className="mt-4 flex justify-center">
              <Input.OTP
                size="large"
                length={6}
                value={otp}
                onChange={(val) => setOtp(String(val || ""))}
                disabled={otpSubmitting}
              />
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpSubmitting || String(otp || "").length !== 6}
              className={`w-full rounded-lg py-2 mt-4 text-sm font-bold text-white transition ${otpSubmitting || String(otp || "").length !== 6
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-[#e53935] hover:bg-[#c62828]"
                }`}
            >
              {otpSubmitting ? "Verifying..." : "Verify & Continue"}
            </button>

            <div className="text-center mt-3 text-xs text-slate-600">
              {otpExpiryTime > 0 ? (
                <div className="space-y-1">
                  <div>OTP expires in <span className="font-semibold text-[#e53935]">{Math.floor(otpExpiryTime / 60)}:{(otpExpiryTime % 60).toString().padStart(2, '0')}</span></div>
                  <div>
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendLoading || resendCooldown > 0}
                      className="text-[#e53935] font-semibold hover:underline disabled:opacity-60"
                    >
                      {resendLoading
                        ? "Resending..."
                        : resendCooldown > 0
                          ? `Resend OTP in ${resendCooldown}s`
                          : "Resend OTP"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-red-500 font-semibold">OTP has expired</div>
                  <div>
                    Your OTP has expired.{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendLoading}
                      className="text-[#e53935] font-semibold hover:underline disabled:opacity-60"
                    >
                      {resendLoading ? "Resending..." : "Request new OTP"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SignupForm;
