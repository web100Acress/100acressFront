import React, { useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import axios from "axios";
import { Helmet } from "react-helmet";
const ContactUs = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    status: "",
  });

  const resetData = () => {
    setData({
      name: "",
      email: "",
      mobile: "",
      message: "",
      status: "",
    });
  };
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, message } = data;
    if (!name || !email || !mobile || !message) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const res = await axios.post(
        "https://api.100acress.com/contact_Insert",
        data
      );
      // console.log(res, "hvjn bgjhgjhbjbjhghbn fyughv ");
      alert("Data Submitted Successfully");
      resetData();
    } catch (error) {
      if (error.response) {
        console.log("Server Error:", error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <Helmet>
        <title>Contact Us | Reach Out to 100acress.com Experts Guidance</title>
        <meta
          name="description"
          content="Have questions or need assistance? Contact the 100acress.com team for support with property listings, buying, selling, or renting. We're here to help!"
        />
        <link
          rel="canonical"
          href="https://www.100acress.com/deendayal/plots/"
        />
      </Helmet>

      <div className="overflow-x-hidden">
        <div class="w-full">
          <img
            src="../../Images/contact.png"
            alt="About Us"
            class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
          />
          <img
            src="../../Images/contact.png"
            alt="About Us"
            class="w-full h-[9rem] sm:h-30 object-fit small-screen-image block sm:hidden"
          />
        </div>
        
        <div>
          <h1 className="text-center text-bold text-3xl mt-5">
            Buy, Sell, and Rent with 100acress
          </h1>
          <div className="flex items-center justify-center">
            <h2 className="text-center text-xl">
              Not sure who you want to speak with?
              <br />
              Just let us know what help you want and we will find the right
              person for you
            </h2>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-5/5 mx-auto my-10 flex flex-col items-center md:flex-row">
            <div className=" w-full md:w-4/5 h-full bg-[#012e29] shadow-xl text-white p-10">
              <span></span>
              <div className="mt-2 leading-7 text-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  onChange={handleData}
                  className="border-b-2 w-[80%] mb-3 p-1 border-b-white placeholder:text-white placeholder:opacity-80 text-lg bg-[#012e29] focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleData}
                  className="border-b-2 w-[80%] mb-3 p-1 border-b-white placeholder:text-white placeholder:opacity-80 text-lg bg-[#012e29] focus:outline-none"
                />
                <input
                  type="number"
                  name="mobile"
                  placeholder="Contact Number"
                  value={data.mobile}
                  onChange={handleData}
                  className="border-b-2 w-[80%] mb-3 p-1 border-b-white placeholder:text-white placeholder:opacity-80 text-lg bg-[#012e29] focus:outline-none"
                />
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message here..."
                  value={data.message}
                  onChange={handleData}
                  className="w-[80%] bg-[#012e29] border-2 border-white h-20 text-lg outline-none placeholder:text-white placeholder:opacity-80 py-1 px-2 mt-6 resize-none leading-6 duration-200 ease-in-out rounded-lg"
                ></textarea>
                <div className="mt-4">
                  <button
                    onClick={handleSubmitData}
                    className="block m-auto w-[60%] md:w-[50%] text-center border bg-[#012e29] rounded-full py-1 mt-6 text-lg font-bold tracking-wide uppercase text-white brightness-105 hover:bg-green-900"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className=" md:block  w-[70%] md:w-[40%] bg-red-600 items-center flex flex-col justify-center leading-7 space-y-8  h-full">
              <img
                src="../../Images/contactpageimage.png"
                alt=""
                className="object-cover h-full shadow-xl"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center bg-orange-100 mb-20 mx-5 my-5">
          <div class="flex flex-col justify-center w-full lg:w-[96%] space-y-10 lg:space-y-0 lg:space-x-10 max-w-7xl p-8 lg:p-14">
            <div class="flex flex-col justify-center items-center lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
              <div class="shadow-lg flex bg-[#012e29] flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
                  Sales
                </div>
                <div>
                  <p class="text-center text-white text-lg p-2">
                    We would love to talk about how we can work together.
                  </p>
                </div>
                <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-5 text-[#012e29] font-medium">
                  <a
                    href="tel:8500900100"
                    class="mx-2 text-[#012e29] text-lg font-bold"
                  >
                    Contact Sales
                  </a>
                </p>
              </div>

              <div class="bg-[#012e29] shadow-lg flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
                  Help &amp; Support
                </div>
                <p class="text-center text-white text-lg p-2">
                  We are here to help with any questions or code.
                </p>
                <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-5 text-[#012e29] font-medium">
                  <a
                    href="mailto:seo@100acress.com"
                    class="mx-2 text-[#012e29] text-lg font-bold"
                  >
                    Get Support
                  </a>
                </p>
              </div>
              <div class="bg-[#012e29] shadow-lg flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                {/* <div class="-mt-16">
          <ion-icon name="camera-outline" class="text-3xl md:text-5xl rounded-full p-4 bg-white text-cyan-400"></ion-icon>
        </div> */}
                <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
                  Media &amp; Press
                </div>
                <p class="text-center text-white text-lg p-2">
                  Get Stripe news, company info, and media resources.
                </p>
                <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-[18px] text-[#012e29] font-medium">
                  <a
                    href="mailto:seo@100acress.com"
                    class="mx-2 text-[#012e29] text-lg font-bold"
                  >
                    Visit Newsroom
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
