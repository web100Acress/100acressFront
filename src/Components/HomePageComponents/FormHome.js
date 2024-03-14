import React, { useState, useEffect } from "react";
import axios from "axios";

function FormHome() {
  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: ""
  });

  const resetData = () => {
    setFormDataInquiry({
      name: "",
      mobile: "",
      email: "",
      message: "",
      status: ""
    });
  };

  const handleInquirySubmitData = async (e) => {
    e.preventDefault();

    const { name, email, mobile, message } = formDataInquiry;

    if (!name || !email || !mobile || !message) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const res = await axios.post(
        "https://api.100acress.com/contact_Insert",
        formDataInquiry
      );
      alert("Data submitted successfully");
      resetData();
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    setFormDataInquiry({ ...formDataInquiry, [name]: value });
  };

  return (
    <section className="">
      <div id="form-container" className="flex justify-center items-center bg-white py-10 px-8 xl:px-16 lg:px-10 sm:px-6 xs:px-4">
        <div className="text-white w-full max-w-7xl  bg-red-600 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-1/2 px-4 py-4">
              <p className="font-semibold text-lg lg:text-2xl text-white  md:text-2xl sm:text-base text-center">
                Let us find your Dream Property
              </p>
              <p className="font-semibold text-sm lg:text-lg text-white mb-2 md:text-lg sm:text-sm text-center">
                Connect to Property Expert Now
              </p>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formDataInquiry.name}
                    onChange={handleInquiryDataChange}
                    required
                    placeholder="Name"
                    className="w-full text-white placeholder-white outline-none px-2 border-b-2 bg-red-600 border-white mobile-input"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile"
                    value={formDataInquiry.mobile}
                    onChange={handleInquiryDataChange}
                    required
                    className="w-full text-white placeholder-white outline-none p-2 border-b-2 bg-red-600 border-white mobile-input"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formDataInquiry.email}
                  onChange={handleInquiryDataChange}
                  className="w-full text-white mt-2 placeholder-white outline-none p-2 border-b-2 bg-red-600 border-white mobile-input"
                />
                <textarea
                  name="message"
                  placeholder="Enter Your Query"
                  rows="2"
                  value={formDataInquiry.message}
                  onChange={handleInquiryDataChange}
                  className="w-full mt-2 placeholder-white outline-none p-2 border-b-2 bg-red-600 border-white text-white mobile-input"
                ></textarea>
              </form>
              <div className="flex justify-center items-center my-2">
                <button onClick={handleInquirySubmitData} className="rounded-lg text-white text-md sm:text-lg md:text-md border-2 font-normal px-4 py-2 bg-red-600">
                  Submit
                </button>
              </div>
            </div>
            <div className="hidden md:block w-full md:w-1/2">
              <img
                src="../../Images/Formcontact.png"
                alt="expertImage"
                className="w-full object-fit h-full "
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FormHome;