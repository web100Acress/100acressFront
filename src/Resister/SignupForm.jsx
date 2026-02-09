import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import showToast from "../Utils/toastUtils";
import "antd/dist/reset.css";
import { AuthContext } from "../AuthContext";
import { Eye, EyeOff, X } from "lucide-react";

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

  // Remove custom toast positioning to use default appearance (same as LoginForm)
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

  const handleUserRegister = async () => {
    try {
      await signup(userSignUp, resetData, setResponseMessage);
    } catch (error) {
      showToast.error(error.message || "Registration failed. Please try again.");
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
      <div className={`relative p-2 md:p-3 ${inModal ? "w-full" : "max-sm:w-[90vw]"}`}>

        {/* Heading with Close Button */}
        <div className="mb-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] md:text-[24px] font-extrabold text-[#e53935] font-sans tracking-tight">
              Create Your Account
            </h2>
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
          <div className="mt-0.5 flex justify-center">
            <span className="h-0.5 w-12 rounded-full bg-[#e53935]" />
          </div>
        </div>

        {/* Role Selector */}
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

        {/* Form */}
        <form className="space-y-1.5" onSubmit={handleClick}>
          <div className="flex gap-2 max-sm:flex-col">
            {/* Name */}
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
            {/* Mobile */}
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

          {/* Email */}
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

          {/* Passwords */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#e53935] hover:bg-[#c62828] text-white font-bold rounded-lg py-2 mt-0.5 text-sm shadow-sm hover:shadow-md transition"
            onClick={handleClick}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-1 text-xs text-slate-600">
          Already have an account?{" "}
          <button onClick={handleUserSignIn} className="text-[#e53935] font-semibold hover:underline">Login</button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
