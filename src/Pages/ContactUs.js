// import React, { useState } from "react";
// import Footer from "../Components/Actual_Components/Footer";
// import Nav from "../aadharhomes/Nav";
// import axios from "axios";
// import { Helmet } from "react-helmet";
// const ContactUs = () => {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     message: "",
//     status: "",
//   });

//   const resetData = () => {
//     setData({
//       name: "",
//       email: "",
//       mobile: "",
//       message: "",
//       status: "",
//     });
//   };
//   const handleData = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmitData = async (e) => {
//     e.preventDefault();
//     const { name, email, mobile, message } = data;
//     if (!name || !email || !mobile || !message) {
//       alert("Please fill out all fields");
//       return;
//     }
//     try {
//      await axios.post(
//         "https://api.100acress.com/contact_Insert",
//         data
//       );
//       alert("Data Submitted Successfully");
//       resetData();
//     } catch (error) {
//       if (error.response) {
//         console.log("Server Error:", error.response.data);
//       } else if (error.request) {
//         console.log("Request Error:", error.request);
//       } else {
//         console.log("Error:", error.message);
//       }
//     }
//   };
//   return (
//     <div style={{ overflowX: "hidden" }}>
//       <Nav />
      
//       <Helmet>
//         <title>Contact Us | Reach Out to 100acress.com Experts Guidance</title>
//         <meta
//           name="description"
//           content="Have questions or need assistance? Contact the 100acress.com team for support with property listings, buying, selling, or renting. We're here to help!"
//         />
//         <link
//           rel="canonical"
//           href="https://www.100acress.com/contact-us/"
//         />
//       </Helmet>

//       <div className="overflow-x-hidden">
//         <div class="w-full">
//           <img
//             src="../../Images/contact.png"
//             alt="About Us"
//             class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
//           />
//           <img
//             src="../../Images/contactmobile.png"
//             alt="About Us"
//             class="w-full h-[9rem] sm:h-30 object-fit small-screen-image block sm:hidden"
//           />
//         </div>
//         <div>
//           <h1 className="text-center text-bold text-3xl mt-5">
//             Buy, Sell, and Rent with 100acress
//           </h1>
//           <div className="flex items-center justify-center">
//             <h2 className="text-center text-xl">
//               Not sure who you want to speak with?
//               <br />
//               Just let us know what help you want and we will find the right
//               person for you
//             </h2>
//           </div>
//         </div>
//         <div className="flex -mb-3 items-center justify-center px-12 py-4">
//           <div
//             className="bg-red-600 text-gray-500 w-full overflow-hidden rounded-md"
//             style={{ maxWidth: 1300 }}
//           >
//             <div className="md:flex w-full h-auto md:h-80 ">
//               <div className="hidden lg:block w-full md:w-1/2">
//                 <div style={{ height: "100%", overflow: "hidden" }}>
//                   <img
//                     src="../../Images/contact-us.webp"
//                     alt="expertImage"
//                     className="object-fit w-full h-full"
//                   />
//                 </div>
//               </div>
//               <div className="w-full xl:w-1/2 lg:w-1/2 md:w-full py-4 lg:px-5 md:px-2 sm:px-2 xs-px-2 ">
//                 <div className="py-10">
//                   <div className="flex flex-wrap -mx-2 ">
//                     <div className="w-full md:w-1/2 px-2 mb-3">
//                       <div className="flex px-2">
//                         <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                           <i className="fa-solid fa-user text-gray-400 text-lg" />
//                         </div>
//                         <input
//                           type="text"
//                           className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2 outline-none focus:border-red-600 rounded-md"
//                           placeholder="First Name"
//                           value={data.name}
//                           name="name"
//                           onChange={handleData}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full md:w-1/2 px-2 mb-3 ">
//                       <div className="flex px-2">
//                         <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                           <i className="fa-solid fa-phone text-gray-400 text-lg" />
//                         </div>
//                         <input
//                           type="number"
//                           className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                           placeholder="Mobile"
//                           value={data.mobile}
//                           name="mobile"
//                           onChange={handleData}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex mb-3 px-2">
//                     <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                       <i className="fa-solid fa-envelope text-gray-400 text-lg" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                       placeholder="Email"
//                       value={data.email}
//                       name="email"
//                       onChange={handleData}
//                     />
//                   </div>
//                   <div className="flex px-2">
//                     <div className="w-10 z-10 pl-1 text-center pointer-events-none pt-2">
//                       <i className="fa-solid fa-message text-gray-400 text-lg mt-1"></i>
//                     </div>
//                     <textarea
//                       type="message"
//                       className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                       placeholder="Message "
//                       style={{ height: "100px" }}
//                       name="message"
//                       value={data.message}
//                       onChange={handleData}
//                     />
//                   </div>

//                   <div className="flex justify-center items-center mt-3">
//                     <button
//                       onClick={handleSubmitData}
//                       className="block px-5 bg-white hover:bg-red-300 focus:bg-red-500 text-red rounded-lg py-2 font-semibold"
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="flex justify-center bg-grey-100 mb-20 mx-5 my-[4.5rem]">
//           <div class="flex flex-col justify-center w-full lg:w-[100%] space-y-4 lg:space-y-0 lg:space-x-10 max-w-7xl lg:p-1">
//             <div class="flex flex-col justify-center items-center lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
//               <div class="shadow-lg flex bg-black hover:bg-slate-200  flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
//                 <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
//                   Sales
//                 </div>
//                 <div>
//                   <p class="text-center text-white text-lg p-2">
//                     We would love to talk about how we can work together.
//                   </p>
//                 </div>
//                 <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-5 text-[#012e29] font-medium">
//                   <a
//                     href="tel:+8500-900-100"
//                     class="mx-2 text-red-600 text-lg font-bold"
//                   >
//                     {" "}
//                     Contact Sales
//                   </a>
//                 </p>
//               </div>
//               <div class="bg-black shadow-lg flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
//                 <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
//                   Help &amp; Support
//                 </div>
//                 <p class="text-center text-white text-lg p-2">
//                   We are here to help with any questions or code
//                 </p>
//                 <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-5 text-[#012e29] font-medium">
//                   <a
//                     href="mailto:seo@100acress.com"
//                     class="mx-2 text-red-600 text-lg font-bold"
//                   >
//                     Get Support
//                   </a>
//                 </p>
//               </div>
//               <div class="bg-black shadow-lg flex flex-col justify-center rounded-lg items-center py-4 w-[90%] lg:w-[80%] xl:w-[30rem]">
//                 <div class="font-semibold text-white text-xl lg:text-2xl mb-4 md:mb-6">
//                   Media &amp; Press
//                 </div>
//                 <p class="text-center text-white text-lg p-2">
//                   Get Stripe news, company info, and media resources.
//                 </p>
//                 <p class="text-center text-sm px-6 bg-white py-2 rounded-3xl p-[18px] text-[#012e29] font-medium">
//                   <a
//                     href="mailto:seo@100acress.com"
//                     class="mx-2 text-red-600 text-lg font-bold"
//                   >
//                     Visit Newsroom
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import axios from "axios";
import { Helmet } from "react-helmet";
import Navbar from "../aadharhomes/Navbar";
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
     <Navbar/>
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
            alt="Contact Us"
            class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
          />
          <img
            src="../../Images/contactmobile.png"
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
              src="../../Images/tele.png"
              alt="Image"
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
                    href="mailto:seo@100acress.com"
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
                    href="mailto:seo@100acress.com"
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