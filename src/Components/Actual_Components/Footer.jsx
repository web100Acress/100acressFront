import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import logoImage from "../../Images/100acress.png";
import axios from "axios";
import { YouTubeIcon ,FacebookIcon , LinkedinIcon , InstagramIcon ,TwitterIcon, SendIcon } from "../../Assets/icons";
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
      <div className="w-full divide-y divide-gray-200" style={{ background: '#f8fafc' }}>
        <div className="flex flex-wrap py-3">
                     <div className="w-full sm:w-6/12 lg:w-3/12 text-black px-6 py-2 text-center text-sm">
             <Link to="/" target="_top">
               <img src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" className="mx-auto" alt="Logo" />
             </Link>
             <p className="text-md my-3 mt-2 text-justify font-normal text-black">
               100acress.com Real Estate Company specializes in providing premier
               property solutions tailored to meet your needs.
             </p>

             <div className="my-3 text-left">
               <a href="tel:+918500900100" className="flex items-center hover:text-black/80 transition-colors duration-200">
                 <i className="fa-solid fa-phone text-black/80"></i>
                 <span className="ml-6 text-md font-normal text-black">
                   +91 8500-900-100
                 </span>
               </a>
             </div>
             <div className="my-2 text-left ">
               <a
                 href="mailto:support@100acress.com"
                 className="flex items-center hover:text-black/80 transition-colors duration-200"
               >
                 <i className="fa-solid fa-message text-black/80"></i>
                 <span className="ml-6 font-normal text-black">support@100acress.com</span>
               </a>
             </div>
           </div>

                     <div className="w-full sm:w-6/12 lg:w-2/12 text-black px-6 py-3 text-start text-2xl font-semibold">
             100acress
             <div className="mt-2">
               <li className="list-none text-black text-sm my-1">
                                 <Link
                   to="/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Home
                 </Link>
              </li>
                             <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/contact-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Contact
                 </Link>
               </li>

               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/blog/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   {" "}
                   Blog
                 </Link>
               </li>
                             <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/career-with-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Career
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/about-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   About
                 </Link>
               </li>
                             <li className="list-none text-black text-sm my-1 ">
                 <Link
                   to="/terms-and-conditions/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   {" "}
                   Terms & Conditions
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/news-and-articals/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   News & Articles
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/privacy-policy/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Privacy & Policy
                 </Link>
               </li>
            </div>
          </div>

                     <div className="w-full sm:w-6/12 lg:w-2/12 text-[#1a1a1a] px-6 py-3 text-left text-2xl font-semibold">
             Popular Cities
             <div className="mt-2 mr-0">
               <li className="list-none text-[#2d2d2d] text-sm my-1">
                <Link
                  to={"/projects-in-gurugram/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Gurugram
                </Link>
              </li>
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-noida/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Noida{" "}
                </Link>
              </li>
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-delhi/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Delhi
                </Link>
              </li>
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-goa/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Goa
                </Link>
              </li>
              {/* <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/project-in-ayodhya/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Ayodhya
                </Link>
              </li> */}
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-mumbai/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Mumbai
                </Link>
              </li>
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-panipat/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Panipat
                </Link>
              </li>
              {/* <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/project-in-panchkula/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Panchkula
                </Link>
              </li> */}
              <li className="list-none text-[#2d2d2d] text-sm my-1 text-justify">
                <Link
                  to={"/project-in-kasauli/"}
                  className="hover:text-[#1a1a1a] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#2d2d2d" }}
                >
                  Project in Kasauli
                </Link>
              </li>
              {/* <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/projects-in-karnal/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Karnal
                </Link>
              </li> */}
              {/* <li className="list-none text-white text-sm my-1 text-justify">
                <Link
                  to={"/projects-in-jalandhar/"}
                  className=""
                  target="_top"
                  style={{ color: "white" }}
                >
                  Project in Jalandher
                </Link>
              </li> */}
              <li className="list-none text-[#1a1a1a] font-bold text-sm my-1 text-justify">
                <Link
                  to={"#"}
                  className="hover:text-[#000000] transition-colors duration-200"
                  target="_top"
                  style={{ color: "#1a1a1a" }}
                >
                  Project in Dubai
                </Link>
              </li>
            </div>
          </div>

                     <div className="w-full sm:w-6/12 lg:w-2/12 text-black px-6 py-3 text-left text-2xl font-semibold">
             Services
             <div className="mt-2">
               <li className="list-none text-black text-sm my-1 ">
                                 <Link
                   to="/contact-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Real Estate Consulting
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/contact-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Legal Advice
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/contact-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Interior Design
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/contact-us/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   Home Loan
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 text-justify">
                 <Link
                   to="/emi-calculator/"
                   className="hover:text-black transition-colors duration-200"
                   target="_top"
                   style={{ color: "#000000" }}
                 >
                   EMI Calculator
                 </Link>
               </li>
               <li className="list-none text-black text-sm my-1 truncate">
                 <Link
                   to="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/masterplan/gurgaon+master+plan.pdf"
                   className="hover:text-black transition-colors duration-200"
                   target="_blank"
                   style={{ color: "#000000" }}
                 >
                   Gurgaon Master Plan
                 </Link>
                 </li>
                  <li className="list-none text-black text-sm my-1 truncate">
                  <Link
                   to="/qr-generator"
                   className="hover:text-black transition-colors duration-200"
                   target="_blank"
                   style={{ color: "#000000" }}
                 >
                   Generate Your QR
                 </Link>
                {/*  <Link
                                              to="/qr-generator"
                                              className="block text-sm px-4 hover:text-red-600"
                                            >
                                              Generate Your QR
                                            </Link> */}
              </li>
            </div>
          </div>

                     <div className="w-full sm:w-6/12 lg:w-3/12 text-black px-0 py-3 text-center text-xl font-semibold">

    <div className="relative w-full my-2">
      <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-black/80 text-sm"></i>
      <input
        type="number"
        name="mobile"
        className="w-full pl-10 pr-5 py-2 text-sm border-2 border-red-600 placeholder-black/70 text-black transition-all ease-in duration-200 bg-white/90 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-red-600 hover:shadow-[0_4px_8px_rgba(229,62,62,0.2)]"
        placeholder="Mobile Number"
        value={data.mobile}
        onChange={handleSubmitData}
        required
      />
    </div>
    <button
      className="w-full text-red-600 bg-white font-medium py-2 mt-1 rounded-lg hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md"
      onClick={handleSubmit}
    >
      <SendIcon/>
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
      <FacebookIcon size={20} />
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
      <InstagramIcon size={20} />
    </Link>
    <Link
      to="https://www.linkedin.com/company/100acress/"
      target="_blank"
      className="flex items-center justify-center text-white bg-blue-700 w-7 h-7 rounded-full"
    >
      <LinkedinIcon size={20} />
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

<div className="w-full px-2 py-3" style={{ background: '#f1f5f9' }}>
  <p className="text-center text-sm text-black mb-0 font-medium">
    Copyright 2025,{" "}
    <Link className="text-black hover:text-black/80 transition-colors duration-200" to="https://100acress.com/">
      100acress.com.
    </Link>{" "}
    All Rights Reserved
  </p>
</div>

</>

);
};

export default Footer;
