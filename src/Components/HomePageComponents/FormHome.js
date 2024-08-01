// import React, { useState } from "react";
// import axios from "axios";
// const FormHome = () => {
//   const [formDataInquiry, setFormDataInquiry] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     message: "",
//     status: "",
//   });

//   const resetData = () => {
//     setFormDataInquiry({
//       name: "",
//       mobile: "",
//       email: "",
//       message: "",
//       status: "",
//     });
//   };

//   const [buttonText, setButtonText] = useState('Submit');
//   const [responseMessage, setResponseMessage] = useState('')


//   const handleInquirySubmitData = async (e) => {
//     e.preventDefault();
//     const { name, email, mobile, message } = formDataInquiry;
//     if (!name || !email || !mobile || !message) {
//       setResponseMessage("Please fill out all fields.");
//       return;
//     }
//     setButtonText('Submitting...')
//     try {
//        await axios.post(
//         "https://api.100acress.com/contact_Insert",
//         formDataInquiry
//       );
//       setResponseMessage('Data submitted successfully')
//       resetData();
//       setButtonText('Submit')
//     } catch (error) {
//       if (error.response) {
//         console.error("Server error:", error.response.data);
//       } else if (error.request) {
//         console.error("Request error:", error.request);
//       } else {
//         console.error("Error:", error.message);
//       }
//     }
//     setButtonText('Submit')
//   };

//   const handleInquiryDataChange = (e) => {
//     const { name, value } = e.target;
//     setFormDataInquiry({ ...formDataInquiry, [name]: value });
//   };

//   return (
    
//     <div className="flex -mb-3 items-center justify-center px-12 py-12 bg-[#f5f5f5] shadow-2xl ">
//       <div
//         className="bg-red-600 text-gray-500 w-full overflow-hidden"
//         style={{ maxWidth: 1300 }}
//       >
//         <div className="md:flex w-full h-auto md:h-80 ">
//           <div className="hidden lg:block w-full md:w-1/2">
//             <div style={{ height: "100%", overflow: "hidden" }}>
//               <img
//                 src="../../Images/Formcontact.jpg"
//                 alt="expertImage"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>

//           <div className="w-full xl:w-1/2 lg:w-1/2 md:w-full py-4 lg:px-5 md:px-2 sm:px-2 xs-px-2">
//             <div className="text-center">
//               <p className="font-bold  text-sm lg:text-2xl md:text-xl sm:text-xl xs:text-sm text-white mt-2 mb-3">
//                 Connect to Property Expert Now
//               </p>
//             </div>
//             <div>
//               <div className="flex flex-wrap -mx-2 ">
//                 <div className="w-full md:w-1/2 px-2 mb-3">
//                   <div className="flex px-2">
//                     <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                       <i className="fa-solid fa-user text-gray-400 text-lg" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2 outline-none focus:border-red-600 rounded-md"
//                       placeholder="First Name"
//                       value={formDataInquiry.name}
//                       name="name"
//                       onChange={handleInquiryDataChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full md:w-1/2 px-2 mb-3 ">
//                   <div className="flex px-2">
//                     <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                       <i className="fa-solid fa-phone text-gray-400 text-lg" />
//                     </div>
//                     <input
//                       type="number"
//                       className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                       placeholder="Mobile"
//                       value={formDataInquiry.mobile}
//                       name="mobile"
//                       onChange={handleInquiryDataChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex mb-3 px-2">
//                 <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
//                   <i className="fa-solid fa-envelope text-gray-400 text-lg" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                   placeholder="Email"
//                   value={formDataInquiry.email}
//                   name="email"
//                   onChange={handleInquiryDataChange}
//                 />
//               </div>
//               <div className="flex px-2">
//                 <div className="w-10 z-10 pl-1 text-center pointer-events-none pt-2">
//                   <i className="fa-solid fa-message text-gray-400 text-lg mt-1"></i>
//                 </div>
//                 <textarea
//                   type="message"
//                   className="w-full -ml-10 pl-10 pr-3 py-2 border-b-2  outline-none focus:border-red-600 rounded-md"
//                   placeholder="Message "
//                   style={{ height: "100px" }}
//                   name="message"
//                   value={formDataInquiry.message}
//                   onChange={handleInquiryDataChange}
//                 />
//               </div>
              
//               {responseMessage && <p className="text-white font-extralight mx-2 text-[12px]">{responseMessage}</p>}

//               <div className="flex justify-center items-center mt-3">
//                 <button
//                   onClick={handleInquirySubmitData}
//                   className="block px-5 bg-white hover:bg-red-300 focus:bg-red-500 text-red rounded-lg py-2 font-semibold"
//                 >
//                  {buttonText}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormHome;



import React, { useState } from "react";
import axios from "axios";

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

    setIsSubmitting(true); // Set submitting status to true
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
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/3 bg-white flex items-center justify-center h-80 md:h-96 hidden md:block">
        <img
          src="../../../Images/FormImage.png"
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
                isSubmitting ? 'bg-green-600 text-white' : 'bg-white text-red-600 hover:bg-red-700'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormHome;