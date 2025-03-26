import React, { useState,useEffect } from "react";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { HandShakeIcon, HeadPhoneIcon, PlayButtonIcon } from "../Assets/icons";
const ContactUs = () => {
  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

  const [responseFillData, setResponsefillData] = useState("");
  const [formValidationErrors, setFormValidationErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validateField = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "name":
        if (!value) {
          errorMessage = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = "Please enter a valid full name";
        }
        break;
      case "email":
        if (!value) {
          errorMessage = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "mobile":
        if (!value) {
          errorMessage = "Mobile number is required";
        } else if (!/^\d{10}$/.test(value)) {
          errorMessage = "Please enter a valid 10-digit mobile number";
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  useEffect(() => {
    const { name, mobile, email } = formDataInquiry;
    const noErrors = Object.values(formValidationErrors).every(error => error === "");
    if ((!name || !mobile || !email ) || !noErrors) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [formDataInquiry, formValidationErrors]);

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormDataInquiry(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate and set error
    const errorMessage = validateField(name, value);
    setFormValidationErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

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
    
    if (!name || !email || !mobile) {
      setResponsefillData("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(
        "/api/contact_Insert",
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


  return (
    <div className="overflow-x-hidden">
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
      <main className="block w-11/12 mx-auto mt-20 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:basis-1/2">
            <div className="">
              <h1 className="text-primaryRed text-5xl mb-4" style={{fontFamily:"'Gluten', serif"}}>Buy, Sell, and Rent with 100acress</h1>
              <p style={{fontFamily:"Inter"}} className="text-primaryRed text-xl mt-2">Not sure who you want to speak with?</p>
              <p style={{fontFamily:"Inter"}} className="text-primaryRed text-xl -mt-1">Just let us know what help you want and we will find the right person for you.</p>
            </div>
            <div className="mt-20 flex flex-col lg:flex-row justify-around gap-4">
              <div className="p-2 text-center flex flex-col lg:w-full items-center justify-center border-[0.5px] border-gray-100 shadow-md rounded-2xl">
                <HandShakeIcon />
                <h3 className="text-lg">Sales</h3>
                <p className="text-sm">We would love to talk about how we can work together</p>
                <button className="bg-primaryRed hover:bg-red-700 text-white text-sm px-4 py-1 rounded-3xl">Contact Sales</button>
              </div>
              <div className="p-2  text-center flex flex-col  lg:w-full items-center justify-center border-[0.5px] border-gray-100 shadow-md rounded-2xl">
                <HeadPhoneIcon />
                <h3 className="text-lg">Help & Support</h3>
                <p className="text-sm">We are here to help with any questions or code</p>
                <button className="bg-primaryRed hover:bg-red-700 text-white text-sm px-4 py-1 rounded-3xl">Get Support</button>
              </div>
              <div className="p-2  text-center flex flex-col lg:w-full items-center justify-center border-[0.5px] border-gray-100 shadow-md rounded-2xl">
                <PlayButtonIcon />
                <h3 className="text-lg">Media & Press</h3>
                <p className="text-sm">Get Stripe news, company info, and media resources</p>
                <button className="bg-primaryRed hover:bg-red-700 text-white text-sm px-4 py-1 rounded-3xl">Visit Newsroom</button>
              </div>
            </div>
          </div>
          <div className="lg:basis-1/2 lg:flex w-full lg:justify-end align-center">
          <div className="border-2 border-gray-200 px-6 py-2 rounded-lg shadow-lg">
            <form action="" className="space-y-2">
              <h3 style={{fontFamily:"Inter"}} className="font-semibold mt-2 mb-4">Consult a Property Expert Now</h3>
              <div>
                <label className="text-sm" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  onChange={handleInquiryDataChange}
                  className="w-full border border-gray-200  rounded-md p-1 placeholder:text-xs placeholder:text-gray-300"
                  value={formDataInquiry.name}
                />
                {formValidationErrors.name && (
                    <p className="text-red-500 text-xs">{formValidationErrors.name}</p>
                  )}
              </div>
              <div>
                <label className="text-sm" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleInquiryDataChange}
                  className="w-full border border-gray-200 rounded-md p-1 placeholder:text-xs placeholder:text-gray-300"
                  value={formDataInquiry.email}
                />
                {formValidationErrors.email && (
                    <p className="text-red-500 text-xs">{formValidationErrors.email}</p>
                  )}
              </div>
              <div>
                <label className="text-sm" htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter your mobile number"
                  onChange={handleInquiryDataChange}
                  className="w-full border border-gray-200 rounded-md p-1 placeholder:text-xs placeholder:text-gray-300"
                  value={formDataInquiry.mobile}
                />
                {formValidationErrors.mobile && (
                    <p className="text-red-500 text-xs">{formValidationErrors.mobile}</p>
                  )}
              </div>
              <div>
                <label className="text-sm" htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                  onChange={handleInquiryDataChange}
                  className="w-full border border-gray-200 rounded-md p-1 placeholder:text-xs placeholder:text-gray-300"
                  value={formDataInquiry.message}
                ></textarea>
                {formValidationErrors.message && (
                    <p className="text-red-500 text-xs">{formValidationErrors.message}</p>
                  )}
              </div>

              <button
                  type="submit"
                  onClick={handleInquirySubmitData}
                  disabled={!isFormValid || isSubmitting}
                  className={`block w-full p-2 rounded-md mt-4 ${
                    !isFormValid || isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primaryRed hover:bg-red-700'
                  } text-white`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {responseFillData && (
                  <p className="text-sm text-center text-primaryRed mt-2">
                    {responseFillData}
                  </p>
                )}
            </form>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
