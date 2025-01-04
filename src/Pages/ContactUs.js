import React, { useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
const ContactUs = () => {
  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

  const [responseFillData, setResponsefillData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetData = () => {
    setFormDataInquiry({
      name: "",
      mobile: "",
      email: "",
      message: "",
      status: "",
    });
    setResponsefillData("");
    setIsSubmitting(false);
  };

  const handleInquirySubmitData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, message } = formDataInquiry;

    if (!name || !email || !mobile || !message) {
      setResponsefillData("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "https://api.100acress.com/contact_Insert",
        formDataInquiry
      );
      alert("Data submitted successfully");
      setResponsefillData("Submission successful!");
      resetData();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setResponsefillData("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    setFormDataInquiry({ ...formDataInquiry, [name]: value });
  };
  return (
    <div style={{ overflowX: "hidden" }}>
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

      <div className="overflow-x-hidden mt-14">
        <div class="w-full">
          <img
            src="../../Images/contact.webp"
            alt="Contact Us"
            class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
          />
          <img
            src="../../Images/contactmobile.webp"
            alt="Contact Us"
            class="w-full h-[9rem] sm:h-30 object-fit small-screen-image block sm:hidden"
          />
        </div>
      
        <div className="">
          <h1 className="text-center text-bold text-3xl pt-5">
            Buy, Sell, and Rent with 100acress
          </h1>
          <div className="flex items-center justify-center pb-5">
            <h2 className="text-center text-xl">
              Not sure who you want to speak with?
              <br />
              Just let us know what help you want and we will find the right
              person for you
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 bg-white flex items-center justify-center h-80 md:h-96 hidden md:block">
            <img
              src="../../Images/tele.webp"
              alt="tele"
              className="w-full h-full object-fit"
            />
          </div>
          <div className="w-full md:w-2/3 p-4 bg-red-600">
            <div className="text-center">
              <p className="font-bold text-xl lg:text-2xl md:text-2xl sm:text-xl xs:text-xl text-white mb-4 mt-2">
                Connect to Property Expert Now
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleInquirySubmitData}>
              {responseFillData && (
                <div className="bg-red-100 text-red-600 p-4 rounded-md">
                  {responseFillData}
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <i className="fa-solid fa-user text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={handleInquiryDataChange}
                    value={formDataInquiry.name}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="relative flex-1">
                  <i className="fa-solid fa-envelope text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInquiryDataChange}
                    value={formDataInquiry.email}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <i className="fa-solid fa-phone text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Contact"
                  onChange={handleInquiryDataChange}
                  value={formDataInquiry.mobile}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="relative">
                <i className="fa-solid fa-comment text-gray-400 text-md absolute left-3 top-[24%] transform -translate-y-1/2"></i>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Message"
                  onChange={handleInquiryDataChange}
                  value={formDataInquiry.message}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className={`py-2 px-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                    isSubmitting
                      ? "bg-green-600 text-white"
                      : "bg-white text-red-600 hover:bg-red-700"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center  pb-20 px-5 py-[4.5rem]">
          <div className="flex flex-col justify-center w-full lg:w-[100%] space-y-4 lg:space-y-0 lg:space-x-10 max-w-7xl lg:p-1">
            <div className="flex flex-col justify-center items-center lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
              <div className=" flex bg-blue-200 hover:bg-blue-300 flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                <div className="font-semibold text-black text-xl lg:text-2xl mb-4 md:mb-6">
                  Sales
                </div>
                <div>
                  <p className="text-center text-black text-lg p-2">
                    We would love to talk about how we can work together.
                  </p>
                </div>
                <p className="text-center text-sm px-6 bg-red-600 py-2 rounded-3xl p-5 text-[#012e29] font-medium">
                  <a
                    href="tel:+8500-900-100"
                    className="mx-2 text-white text-lg font-bold"
                  >
                    {" "}
                    Contact Sales
                  </a>
                </p>
              </div>
              <div className="  bg-blue-200 hover:bg-blue-300 flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                <div className="font-semibold text-black text-xl lg:text-2xl mb-4 md:mb-6">
                  Help &amp; Support
                </div>
                <p className="text-center text-black text-lg p-2">
                  We are here to help with any questions or code
                </p>
                <p className="text-center text-sm px-6 bg-red-600 py-2 rounded-3xl p-5 text-[#012e29] font-medium">
                  <a
                    href="mailto:support@100acress.com"
                    className="mx-2 text-white text-lg font-bold"
                  >
                    Get Support
                  </a>
                </p>
              </div>
              <div className="  bg-blue-200 hover:bg-blue-300 flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
                <div className="font-semibold text-black text-xl lg:text-2xl mb-4 md:mb-6">
                  Media &amp; Press
                </div>
                <p className="text-center text-black text-lg p-2">
                  Get Stripe news, company info, and media resources.
                </p>
                <p className="text-center text-sm px-6 bg-red-600 py-2 rounded-3xl p-[18px] text-[#012e29] font-medium">
                  <a
                    href="mailto:support@100acress.com"
                    className="mx-2 text-white text-lg font-bold"
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