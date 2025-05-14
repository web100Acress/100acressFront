import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/reset.css";
import { AuthContext } from "../AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const roles = ["Agent", "Owner", "Builder"];

function SignupForm() {
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
      <div className="bg-white space-y-2 shadow-xl rounded-2xl mt-14 p-4 my-8">
        <div className="text-primaryRed text-3xl font-Gluten text-center font-semibold">Register your Account</div>
        <div className="my-2 flex items-center max-sm:flex-col">
          <p className=" mr-4 my-2">Are you a:</p>
          <div className="flex flex-row gap-2 ">
            {roles.map((role) => (
              <div
                key={role}
                className={`w-full px-3 py-2  border rounded-3xl cursor-pointer hover:bg-primaryRed hover:text-white ${
                  userSignUp.role === role && "bg-primaryRed text-white"
                }`}
                onClick={() => handleSelectRole(role)}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
        <form className="space-y-2" onSubmit={handleClick}>
          <div className="flex space-x-1 max-sm:grid">
            <div className="basis-1/2 flex flex-col">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="border px-1 py-2 rounded"
                onChange={handleRegisterChange}
                />
            </div>
            <div className="basis-1/2 flex flex-col max-sm:mt-3">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                placeholder="+91 9876543210"
                className="border px-1 py-2 rounded"
                onChange={handleRegisterChange}
                />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="username@email.com"
              className="border px-1 py-2 rounded"
              onChange={handleRegisterChange}
            />
          </div>
          <div className="flex flex-col">
            
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password">Enter Password</label>
            <input
              type={`${passwordHide ? "password" : "text"}`}
              name="password"
              id="password"
              placeholder="**********"
              className="border px-1 py-2 rounded"
              onChange={handleRegisterChange}
            />
            {passwordHide ? (
              <FaEyeSlash
                className="absolute top-1/2 right-2"
                onClick={handleHideUnHide}
              />
            ) : (
              <FaEye
                className="absolute top-1/2 right-2"
                onClick={handleHideUnHide}
              />
            )}
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="cpassword">Re-Enter Password</label>
            <input
              type={`${passwordHide ? "password" : "text"}`}
              name="cpassword"
              id="cpassword"
              placeholder="**********"
              className="border px-1 py-2 rounded"
              onChange={handleRegisterChange}
            />
            {passwordHide ? (
              <FaEyeSlash
                className="absolute top-1/2 right-2"
                onClick={handleHideUnHide}
              />
            ) : (
              <FaEye
                className="absolute top-1/2 right-2"
                onClick={handleHideUnHide}
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-primaryRed text-white text-center w-full rounded px-4 py-2 hover:bg-red-500"
            onClick={handleClick}
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already Have a account?{" "}
          <p onClick={handleUserSignIn} className="text-primaryRed underline inline-block cursor-pointer">
            Login
          </p>
        </p>
      </div>
    </>
  );
}

export default SignupForm;
