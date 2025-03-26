import React, { useState } from "react";
import axios from "axios";
import { ConsultIcon } from "../../Assets/icons";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init()

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
    <div className="" >
    <div className="text-start ml-10">
          <p className=" text-xl lg:text-2xl md:text-2xl sm:text-xl xs:text-xl text-gray-700 mb-4 mt-2">
          Consult a Property Expert Now
          </p>
    </div>
  
    <div className="flex flex-wrap m-4 rounded-lg shadow-lg">
    <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="w-full md:w-1/3 bg-white flex items-center justify-center rounded-lg h-80 md:h-96 hidden md:flex"
        >
          <ConsultIcon />
        </div>
      <div  data-aos="zoom-in" data-aos-delay="200" className="w-full md:w-2/3  pt-10 p-4">
        
        <form className="space-y-4 p-5" onSubmit={handleInquirySubmitData}>
          {responseFillData && (
            <div className="bg-red-100 text-red-600 p-4 rounded-md">
              {responseFillData}
            </div>
          )}
        
          <div className="relative ">
              <i className="fa-solid fa-user text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                onChange={handleInquiryDataChange}
                value={formDataInquiry.name}
                className="block w-full pl-10 pr-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <i className="fa-solid fa-envelope text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                onChange={handleInquiryDataChange}
                value={formDataInquiry.email}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          <div className="relative flex-1">
            <i className="fa-solid fa-phone text-gray-400 text-md absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            <input
              type="number"
              name="mobile"
              placeholder="Phone No"
              onChange={handleInquiryDataChange}
              value={formDataInquiry.mobile}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          </div>
          

          <div className="relative">
            <i className="fa-solid fa-comment text-gray-400 text-md absolute left-3 top-[24%] transform -translate-y-1/2"></i>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Your Message"
              onChange={handleInquiryDataChange}
              value={formDataInquiry.message}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex justify-start mt-4">
            <button
              type="submit"
              className={`py-2 px-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                isSubmitting ? 'bg-green-600 text-white' : 'bg-[#C13B44] text-[#FFFFFF] hover:bg-red-700'
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