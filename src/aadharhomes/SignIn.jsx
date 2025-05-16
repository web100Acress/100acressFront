import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../AuthContext";
import { Helmet } from "react-helmet";
import {message} from "antd"


export default function SignIn() {
  const history = useNavigate();
  const { login } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  
  const [userLogin, setuserLogin] = useState({
    password: "",
    email: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setuserLogin({ ...userLogin, [name]: value });
  };

  const handleUserLogin = async () => {
    try {
      await login(userLogin,messageApi);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSignUp = () => {
    history("/auth/signup/");
  };

  const handleForgetUserPassword = () => {
    history("/forgetpassword");
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleUserLogin();
  };
  const { email, password } = userLogin;
  const [passwordHide, setPasswordHide] = useState(true);

  const handleHideUnHide = () => {
    setPasswordHide(!passwordHide);
  };

  return (
    <>
      <Helmet>
        <title>Sell Your Property in Gurgaon | 100acress.com</title>
        <meta
          name="description"
          content="List your property for sale on 100acress.com. Reach potential buyers and sell your property online hassle-free. Trusted platform for property sellers. List now!"
        />
        <link rel="canonical" href="https://www.100acress.com/auth/signin/" />
      </Helmet>

        {contextHolder}
        <div className="bg-white shadow-xl rounded-2xl mt-14 p-4 my-8 max-sm:w-[85vw]">
        <div className="text-3xl font-Gluten text-primaryRed font-semibold my-4 text-center">Login to your account</div>
        
                <form className="space-y-4" onSubmit={handleClick}>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="username@email.com"
                      className="border px-1 py-2 rounded"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="flex flex-col relative space-y-1">
                    <label htmlFor="password">Enter Password</label>
                    <input
                      type={`${passwordHide ? "password" : "text"}`}
                      name="password"
                      id="password"
                      placeholder="**********"
                      className="border px-1 py-2 rounded"
                      onChange={handleLoginChange}
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
                  <div className="text-primaryRed underline text-end cursor-pointer" onClick={handleForgetUserPassword}>Forgot Password ?</div>
                  <button
                    type="submit"
                    className="bg-primaryRed text-white text-center w-full rounded px-4 py-2 hover:bg-red-500"
                    onClick={handleClick}
                  >
                    Login
                  </button>
                </form>
                <div className="mt-10 text-center">Don't have an account? <div className="text-primaryRed underline  inline-block cursor-pointer" onClick={handleUserSignUp}>Register</div></div>
                </div>
    </>
  );
}
