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

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Home Buyer",
      text:
        "100acress made my property search effortless. The team was responsive and guided me to the perfect home.",
      rating: 5,
    },
    {
      name: "Ananya Verma",
      role: "First-time Investor",
      text:
        "Great experience! Transparent process and professional advice helped me make a confident investment.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Seller",
      text:
        "From listing to closing, everything was smooth. My property sold faster than I expected!",
      rating: 4,
    },
  ];

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
      {/* Testimonials Section */}
      <div className="mb-10" data-aos="fade-up" data-aos-duration="1000">
        <div className="text-center mb-6">
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            What Our Clients Say
          </p>
          <p className="mt-2 text-base text-gray-600">
            Real experiences from buyers, sellers, and investors.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-4">
                {/* Star ratings */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i < t.rating ? "#F59E0B" : "#E5E7EB"}
                    className="h-5 w-5"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.804 2.037a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.804-2.037a1 1 0 00-1.176 0L6.613 16.284c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.977 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.072-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5">“{t.text}”</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <div className="text-2xl">🏡</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center md:text-start mb-5">
        <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Consult a Property Expert Now
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
          className="w-full md:w-1/3 bg-white-200 flex items-center justify-center h-80 md:h-96"
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