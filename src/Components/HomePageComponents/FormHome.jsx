import React, { useState } from "react";
import axios from "axios";
import { ConsultIcon } from "../../Assets/icons";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const FormHome = () => {
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
        "/contact_Insert",
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
    <div className="max-w-[1250px] mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
      <div className="text-center md:text-start mb-5">
        <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Consult a Property Expert
        </p>
        <p className="mt-2 text-base text-gray-600">
          We’re here to help you find your dream property.
        </p>
      </div>

      <div
        className="flex flex-wrap rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Left Section (Icon) */}
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center h-80 md:h-96"
        >
          <ConsultIcon />
        </div>
        {/* Right Section (Form) */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="w-full md:w-2/3 p-6 sm:p-10 bg-white"
        >
          <form className="space-y-6" onSubmit={handleInquirySubmitData}>
            {responseFillData && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 transition-all duration-300">
                {responseFillData}
              </div>
            )}
            {/* Input fields */}
            <div className="relative">
              <i className="fa-solid fa-user text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 text-lg"></i>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={handleInquiryDataChange}
                value={formDataInquiry.name}
                className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-inner bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-600 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative flex-1">
                <i className="fa-solid fa-envelope text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 text-lg"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleInquiryDataChange}
                  value={formDataInquiry.email}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-inner bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-600 transition-all duration-300"
                  required
                />
              </div>
              <div className="relative flex-1">
                <i className="fa-solid fa-phone text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 text-lg"></i>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Phone No"
                  onChange={handleInquiryDataChange}
                  value={formDataInquiry.mobile}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-inner bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-600 transition-all duration-300"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <i className="fa-solid fa-comment text-gray-400 absolute left-4 top-4 text-lg"></i>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message"
                onChange={handleInquiryDataChange}
                value={formDataInquiry.message}
                className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-inner bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-orange-600 transition-all duration-300"
                required
              />
            </div>
            <div className="flex justify-start pt-2">
              <button
                type="submit"
                className={`w-full md:w-auto py-3 px-8 rounded-full font-bold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 
                  ${isSubmitting
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormHome;