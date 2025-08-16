/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BLOG, REGISTER, ROOT } from "../../lib/route";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Home from "../../Pages/Home";

function LoginMain() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSmallScreen, setIsSmallScreen] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    const clseBtn = document.getElementById("closeBtn");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
      clseBtn.style.color = "red";
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      clseBtn.style.color = "white";
    });
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 425);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const URLREGISTER = "https://one00acress.onrender.com/postPerson/register";
  const URLLOGIN = "https://one00acress.onrender.com/postPerson/verify_Login";

  const [formDataRegister, setFormDataRegister] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });
  function handleLoginChange(e) {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
    console.log();
  }
  function handleChange(e) {
    setFormDataRegister({
      ...formDataRegister,
      [e.target.name]: e.target.value,
    });
  }
  function submitRegister(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: URLREGISTER,
      data: formDataRegister,
    })
      .then((res) => {
        console.log(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
        } else {
          console.log(err.name);
          handleShow();
        }
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: URLLOGIN,
      data: formDataLogin,
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.name);
        handleShow();
      });
  }

  return (
    <Wrapper className='section'>
      <div className='container' id='container'>
        <Link to={ROOT}>
          <i
            class='fa fa-close'
            id='closeBtn'
            title='Close'
            style={{
              zIndex: "999",
              position: "absolute",
              right: "10px",
              top: "5px",
              fontSize: "24px",
              color: "white",
              cursor: "pointer",
            }}></i>
        </Link>
        <div className='form-container sign-up-container'>
          <form onSubmit={submitRegister}>
            <h1
              style={{
                fontSize: "30px",
                "@media screen and (max-width: 768px)": {
                  fontSize: "25px",
                },
              }}>
              Create Account
            </h1>
            <input
              type='text'
              
              required
              placeholder='Name'
              onChange={handleChange}
              name='name'
            />
            <input
              type='email'
              required
              placeholder='Email'
              onChange={handleChange}
              name='email'
            />
            <input
              type='number'
              required
              placeholder='Mobile No'
              onChange={handleChange}
              name='mobile'
            />

            <input
              type='password'
              required
              placeholder='Password'
              onChange={handleChange}
              name='password'
            />
            <input
              type='password'
              required
              placeholder='Confirm Password'
              onChange={handleChange}
              name='cpassword'
            />
            <button type='submit'>Sign Up</button>
          </form>
        </div>

        <div className='form-container sign-in-container '>
          <form onSubmit={submitLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleLoginChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleLoginChange}
            />
            <a href='#'>Forgot your password?</a>
            <button type='submit'>Sign In</button>

            {isSmallScreen && (
              <button id='signUp' className='d-sm-block  '>
                Sign Up
              </button>
            )}
          </form>
        </div>

        <div className='overlay-container d-none d-sm-block '>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className='ghost' id='signIn'>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className='ghost' id='signUp'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default LoginMain;
const Wrapper = styled.section`
  box-sizing: border-box;
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  h1 {
    font-weight: bold;
    margin: 0;
  }
  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    margin-top: 5px;
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 5px 0;
    width: 100%;
    border-radius: 12px;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 80%;
    height: auto;
    max-width: 80%;
    min-height: 80vh;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    // transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: auto;
    z-index: 2;
  }

  @media screen and (min-width: 375px) {
    .sign-in-container {
      left: 0;
      width: 100%;
      z-index: 2;
    }
  }
  @media screen and (min-width: 320px) {
    .sign-in-container {
      left: 0;
      width: 100%;
      z-index: 2;
    }
  }

  @media screen and (min-width: 425px) {
    .sign-in-container,
    .sign-up-container {
      width: 50%;
    }

    .sign-up-container {
      opacity: 0;
      z-index: 1;
      transform: translateX(0);
    }
  }

  @media screen and (max-width: 768px) {
    .sign-up-container input {
      padding: 5px;
    }
    .sign-up-container button {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left:20px;
      padding-right:20px;
    }
  }
  @media screen and (min-width: 425px) and (max-width: 768px) {
    .sign-in-container {
      left: 0;
      width: 100%;
      z-index: 2;
    }

    .sign-up-container {
      width: 50%;
    }
  }

  // @media screen and (min-width: 768px) and (max-width: 1024px) {
  //   .sign-in-container {
  //     left: 0;
  //     width: 50%;
  //     z-index: 2;
  //   }

  //   .sign-up-container {
  //     width: 50%;
  //   }
  // }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .sign-up-container {
      width: 50%;
      opacity: 0;
      z-index: 1;
      transform: translateX(0);
    }
    .sign-up-container input{
      padding:'5px
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    .container {
      max-width: 80%;
    }
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 15px 0;
  }

  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
`;
