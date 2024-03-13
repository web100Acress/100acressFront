import React, { useState, useEffect } from "react";
import axios from "axios";

function FormHome() {
  const [formDataInquiry, setFormDataInquiry] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status:""
  });

const resetData = () =>{
  setFormDataInquiry({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status:""
  })
}
  
const setImageHeight = () => {
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 768) {
    return containerHeight + "px";
  } else {
    return "auto";
  }
};

const [containerHeight, setContainerHeight] = useState(0);

useEffect(() => {
  const container = document.getElementById("form-container");
  if (container) {
    setContainerHeight(container.offsetHeight);
  }
}, []);

const [isLoading, setIsLoading] = useState(false);

const handleInquirySubmitData = async (e) => {
  e.preventDefault();

  if (isLoading) {
    return;
  }

  const { mobile } = formDataInquiry;
  setIsLoading(true);

  try {
    const res = await axios.post('https://api.100acress.com/contact_Insert', formDataInquiry);
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
  } finally {
    // Set loading state to false when the API call is complete (success or error)
    setIsLoading(false);
  }
};



  const handleInquiryDataChange = (e) =>{
    const {name, value} = e.target;
    setFormDataInquiry({...formDataInquiry, [name]:value})
  }

  return (

  //   <section className="font-sans">
  //   <div className="flex justify-center items-center bg-white px-10 ">
  //     <div className="text-white w-full bg-red-600  rounded-lg overflow-hidden">
  //       <div className="flex flex-col md:flex-row ">
  //         <div className="w-full h-5/6  md:w-1/2 p-4 ">
  //           <p className="fw-semibold text-lg lg:text-4xl text-white md:text-4xl sm:text-sm text-center">
  //             Let us find your Dream Property
  //           </p>
  //           <p className="fw-semibold text-xs lg:text-2xl md:text-lg text-white sm:text-xs text-center">
  //             Connect to Property Expert Now
  //           </p>
  //           <form className="my-2">
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //               <input
  //                 type="text"
  //                 name="name"
  //                 value={formDataInquiry.name}
  //                 onChange={handleInquiryDataChange}
  //                 required
  //                 placeholder="Name"
  //                 className="w-full text-white placeholder-white outline-none p-2 border-b-2 bg-red-600 border-white mobile-input"
  //               />
  //               <input
  //                 type="tel"
  //                 name="mobile"
  //                 placeholder="Mobile"
  //                 value={formDataInquiry.mobile}
  //                 onChange={handleInquiryDataChange}
  //                 required
  //                 className="w-full outline-none text-white placeholder-white p-2 border-b-2 bg-red-600 border-white mobile-input"
  //               />
  //             </div>
  //             <input
  //               type="email"
  //               name="email"
  //               placeholder="Email"
  //               value={formDataInquiry.email}
  //               onChange={handleInquiryDataChange}
  //               className="w-full text-white mt-4 outline-none p-2 placeholder-white  border-b-2 bg-red-600 border-white mobile-input"
  //             />
  //             <textarea
  //               name="message"
  //               placeholder="Enter Your Query"
  //               rows="2"
  //               value={formDataInquiry.message}
  //               onChange={handleInquiryDataChange}
  //               className="w-full p-2 outline-none border-b-2 placeholder-white mt-4 bg-red-600 border-white text-white mobile-input"
  //             ></textarea>
  //           </form>
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               paddingTop:"27px"
  //             }}
  //           >
  //             <button onClick={handleInquirySubmitData} className="rounded-lg text-white text-md sm:text-lg md:text-md border-2 pt-16 font-normal px-3 sm:px-6 py-1 sm:py-4 bg-red-600">
  //               Submit
  //             </button>
  //           </div>
  //         </div>

  //         <div className="hidden md:block w-1/2 overflow-hidden">
  //           <img
  //             src="../../Images/homepageexpert.jpg"
  //             alt="expertImage"
  //             className="w-full h-full object-fit bg-white "
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>

  <section className="font-sans mt-0">
  <div id="form-container" className="flex justify-center items-center bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
    <div className="text-white w-full max-w-6xl bg-red-600 rounded-lg overflow-hidden">
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
                className="w-full text-white placeholder-white outline-none p-2 border-b-2 bg-red-600 border-white mobile-input"
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
            src="../../Images/homepageexpert.jpg"
            alt="expertImage"
            className="w-full object-cover h-full "
            style={{ maxHeight: setImageHeight() }}
          />
        </div>
      </div>
    </div>
  </div>
</section>




  );
}

export default FormHome;
