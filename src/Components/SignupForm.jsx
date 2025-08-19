import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/reset.css";
import { AuthContext } from "../AuthContext";
import { Eye, EyeOff } from "lucide-react";

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

  const [messageApi, contextHolder] = message.useMessage();

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
    await signup(userSignUp, messageApi, resetData, setResponseMessage);
  };

  const handleUserSignIn = () => {
    if (typeof onSwitchToLogin === "function") {
      onSwitchToLogin();
      return;
    }
    history("/auth/signin/");
  };

  const handleClick = async(e) => {
    e.preventDefault();
    validateEmail(userSignUp.email);
    validateMobile(userSignUp.mobile);

    if(emailError){
      messageApi.error({
        content:emailError,
        duration:3,
      })
      return;
    }
    else if(mobileError){
      messageApi.error({
        content:mobileError,
        duration:3,
      })
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
      {contextHolder}
      <div className={`bg-white/95 shadow-[0_12px_32px_rgba(239,68,68,0.15)] rounded-2xl mt-8 p-6 md:p-8 my-6 ${inModal ? "w-full" : "max-sm:w-[90vw]"}`}>
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#e53935] font-sans tracking-tight">
            Create Your Account
          </h2>
          <div className="mt-2 flex justify-center">
            <span className="h-1 w-16 rounded-full bg-[#e53935]" />
          </div>
        </div>

        {/* Role Selector */}
        <div className="my-4">
          <p className="text-sm text-slate-600 mb-2">I am a</p>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                type="button"
                key={role}
                className={`px-4 py-2 rounded-full border transition-all duration-150 text-sm font-medium shadow-sm hover:shadow-md focus:outline-none ${
                  userSignUp.role === role
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
        <form className="space-y-3" onSubmit={handleClick}>
          <div className="flex gap-3 max-sm:flex-col">
            {/* Name */}
            <div className="basis-1/2 flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                onChange={handleRegisterChange}
              />
            </div>
            {/* Mobile */}
            <div className="basis-1/2 flex flex-col">
              <label htmlFor="mobile" className="text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                placeholder="+91 9876543210"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                onChange={handleRegisterChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="username@email.com"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
              onChange={handleRegisterChange}
            />
          </div>

          {/* Passwords */}
          <div className="flex gap-3 max-sm:flex-col">
            <div className="basis-1/2 flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordHide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="********"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                  onChange={handleRegisterChange}
                />
                {passwordHide ? (
                  <EyeOff size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" onClick={handleHideUnHide} />
                ) : (
                  <Eye size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 cursor-pointer" onClick={handleHideUnHide} />
                )}
              </div>
            </div>
            <div className="basis-1/2 flex flex-col">
              <label htmlFor="cpassword" className="text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={passwordHide ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  placeholder="********"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                  onChange={handleRegisterChange}
                />
                {passwordHide ? (
                  <EyeOff size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" onClick={handleHideUnHide} />
                ) : (
                  <Eye size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 cursor-pointer" onClick={handleHideUnHide} />
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#e53935] hover:bg-[#c62828] text-white font-bold rounded-lg py-2.5 mt-1 shadow-sm hover:shadow-md transition"
            onClick={handleClick}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-3 text-sm text-slate-600">
          Already have an account?{" "}
          <button onClick={handleUserSignIn} className="text-[#e53935] font-semibold hover:underline">Login</button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
