import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import logoImage from "../../Images/100acress.png";
import axios from "axios";
const Footer = () => {
  const [data, setData] = useState({
    name: "",
    mobile: "",
  });
  const resetData = () => {
    setData({
      name: "",
      mobile: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile } = data;
    if (!name || !mobile) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await axios.post("https://api.100acress.com/contact_Insert", data);
      alert("Data submit successfully");
      resetData();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Server request:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmitData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <>
      <div className="w-full divide-y divide-gray-200 bg-red-600">
        <div className="flex flex-wrap py-3">
          <div className="w-full sm:w-6/12 lg:w-3/12 text-white px-6 py-2 text-center text-sm">
            <img src={logoImage} className="mx-auto" alt="Logo" />
            <p className="text-md my-3 mt-2 text-justify font-normal">
              100acress.com Real Estate Company specializes in providing premier
              property solutions tailored to meet your needs.
            </p>

            <div className="my-3 text-left ">
              <i className="fa-solid fa-phone">
                <span className="ml-6 text-md font-normal">
                  +91 8500-900-100
                </span>
              </i>
            </div>
            <div className="my-2 text-left ">
              <i className="fa-solid fa-message">
                <span className="ml-6 font-normal">seo@100acress.com</span>
              </i>
            </div>
          </div>

          <div className="w-full sm:w-6/12 lg:w-2/12 text-white px-6 py-3 text-start text-2xl">
            100acress
            <div className="mt-2">
              <li className="list-none text-white text-sm my-1">
                <Link
                  to="/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Home
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/contact-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Contact
                </Link>
              </li>

              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/blog/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  {" "}
                  Blog
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/career-with-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Career
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/about-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  About
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 ">
                <Link
                  to="/terms-and-conditions/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  {" "}
                  Terms & Conditions
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/news-and-articals/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  News & Articles
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/privacy-policy/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Privacy & Policy
                </Link>
              </li>
            </div>
          </div>

          <div className="w-full sm:w-6/12 lg:w-2/12 text-white px-6 py-3 text-left text-2xl">
            Popular Cities
            <div className="mt-2 mr-0">
              <li className="list-none text-white text-sm my-1">
                <Link
                  to={"/projects-in-gurugram/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Gurugram
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/project-in-noida/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Noida{" "}
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/project-in-delhi/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Delhi
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/project-in-goa/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Goa
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="#"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Ayodhya
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="#"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Mumbai
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/project-in-panipat/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Panipat
                </Link>
              </li>
            </div>
          </div>

          <div className="w-full sm:w-6/12 lg:w-2/12 text-white px-6 py-3 text-left text-2xl">
            Services
            <div className="mt-2">
              <li className="list-none text-white text-sm my-1 ">
                <Link
                  to="/contact-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Real Estate Consulting
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/contact-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Legal Advice
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/contact-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Interior Design
                </Link>
              </li>
              <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to="/contact-us/"
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Home Loan
                </Link>
              </li>
            </div>
          </div>

          <div className="w-full sm:w-6/12 lg:w-3/12 text-white px-0 py-3 text-center text-xl">
            Instant Callback
            <div className="flex flex-col mx-4 my-2 items-center">
              <div className="relative w-full my-2">
                <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                <input
                  type="name"
                  name="name"
                  className="w-full pl-10 pr-5 py-2 text-sm placeholder-black text-black transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={handleSubmitData}
                  required
                />
              </div>

              <div className="relative w-full my-2">
                <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                <input
                  type="number"
                  name="mobile"
                  className="w-full pl-10 pr-5 py-2 text-sm placeholder-black text-black transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Mobile Number"
                  value={data.mobile}
                  onChange={handleSubmitData}
                  required
                />
              </div>
              <button
                className="w-full text-white bg-black font-normal py-1 mt-1 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <nav
              aria-label="Footer Navigation"
              className="flex justify-center space-x-3 mt-4 text-start"
            >
              <Link
                to="https://www.facebook.com/100Acress"
                target="_blank"
                className="flex items-center justify-center text-white bg-blue-400 w-7 h-7 rounded-full"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                to="https://twitter.com/100acressdotcom"
                target="_blank"
                className="flex items-center justify-center text-white bg-black w-7 h-7 rounded-full"
              >
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </Link>
              <Link
                to="https://www.instagram.com/official100acress/"
                target="_blank"
                className="flex items-center justify-center text-white w-7 h-7 rounded-full bg-[#c32aa3]"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                to="https://www.linkedin.com/company/100acress/"
                target="_blank"
                className="flex items-center justify-center text-white bg-blue-700 w-7 h-7 rounded-full"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                to="https://www.youtube.com/@100acress"
                target="_blank"
                className="flex items-center justify-center text-red-600 rounded-full bg-white w-7 h-7"
              >
                <FaYoutube size={20} />
              </Link>
              <Link
                to="https://wa.me/918500900100"
                target="_blank"
                className="flex items-center justify-center text-white rounded-full bg-green-500 w-7 h-7"
              >
                <FaWhatsapp size={20} />
              </Link>
              <a
                href="tel:+918500900100"
                className="flex items-center justify-center text-white rounded-full bg-blue-500 w-7 h-7"
              >
                <IoCall size={20} className="text-white" />
              </a>
            </nav>
          </div>
        </div>

        <div className="w-full px-2 py-3 bg-red-600">
          <p className="text-center text-sm text-white mb-0">
            Copyright © 2024,{" "}
            <Link className="text-reset" to="https://100acress.com/">
              100acress.com.
            </Link>{" "}
            All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
