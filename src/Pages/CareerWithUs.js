// import React, { useContext, useEffect, useState } from "react";
// import Nav from "../aadharhomes/Nav";
// import Footer from "../Components/Actual_Components/Footer";
// import { Link } from "react-router-dom";
// import { DiCssTricks } from "react-icons/di";
// import { RiBankCardFill } from "react-icons/ri";
// import { GrCloud } from "react-icons/gr";
// import { GrCommand } from "react-icons/gr";
// import { RiAdminFill } from "react-icons/ri";
// import axios from "axios";
// import { FaFacebook, FaLinkedin } from "react-icons/fa";
// import { DataContext } from "../MyContext";
// import { Helmet } from "react-helmet";
// const CareerWithUs = () => {
//   const [viewCareer, setViewCareer] = useState([]);
//   const [showform, setShowForm] = useState(false);
//   const { activityImage = [], highlightImage } = viewCareer;
//   const { jobPostingData } = useContext(DataContext);
//   console.log(jobPostingData, "jobPostingDatajobPostingData");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://api.100acress.com:3500/career/page/view`
//         );
//         setViewCareer(res.data.data[0]);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {}, [viewCareer]);
//   return (
//     <div style={{ overflowX: "hidden" }}>
//       <Nav />

//       <Helmet>
//         <meta
//           name="description"
//           content="Explore exciting career opportunities at 100acress.com. Join our dynamic team and grow with us. Browse job openings and apply now!"
//         />
//         <title>Join Our Team | Career opportunities at 100acress.com</title>
//         <link rel="canonical" href="https://www.100acress.com/careerwithus/" />
//       </Helmet>
//       <div className="overflow-x-hidden">
//         <section className="relative">
//           <div class="w-full">
//             <img
//               src="../../Images/career.png"
//               alt="contact Us"
//               class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
//             />
//             <img
//               src="../../Images/careermobile.png"
//               alt="contact Us"
//               class="w-full h-60 sm:h-30 object-fit small-screen-image block sm:hidden"
//             />
//           </div>
//         </section>
//         <div className="m-2 lg:m-10 md:m-8 sm:m-4 xs:m-2">
//           <div className="flex items-center justify-center text-center">
//             <div className="flex flex-wrap justify-center max-w-7xl">
//               <div className="flex p-2 m-2">
//                 <div className="flex-col-xl px-6 py-2">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {activityImage &&
//                       Array.isArray(activityImage) &&
//                       activityImage.length > 0 &&
//                       activityImage.map((item, index) => (
//                         <div
//                           key={index}
//                           className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
//                         >
//                           <img
//                             className="w-full h-full object-fit rounded-xl"
//                             src={item.url}
//                             alt={`Image-${index}`}
//                           />
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="text-xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl text-red-600 text-left px-6 lg:px-16 md:px-8 sm:px-6 xs:px-4 mt-2">
//             WHY 100ACRESS
//           </p>
//           <p className="px-6 lg:px-14 md:px-8 sm:px-6 xs:px-4 text-justify mb-0 ">
//             {viewCareer.whyAcress}
//           </p>
//           <div className="flex flex-wrap items-center px-6 lg:px-14 md:px-8 sm:px-6 xs:px-4 ">
//             <span className=" mt-2">Connect with us on: </span>
//             <div className="flex space-x-2 mt-2">
//               <div className="flex items-center rounded-full bg-gray-200 p-2 ml-3">
//                 <Link
//                   to="https://www.facebook.com/100Acress"
//                   className="hover:underline"
//                   style={{ color: "black" }}
//                 >
//                   <FaFacebook size={25} />
//                 </Link>
//                 <Link to="https://www.facebook.com/100Acress">
//                   <span
//                     className="ml-1 hidden sm:inline underline"
//                     style={{ color: "black" }}
//                   >
//                     Facebook
//                   </span>
//                 </Link>
//               </div>
//               <div className="flex items-center rounded-full bg-gray-200 p-2">
//                 <Link
//                   to="https://twitter.com/100acressdotcom"
//                   className="hover:underline"
//                   style={{ color: "black" }}
//                 >
//                   <div
//                     style={{
//                       borderRadius: "50%",
//                       backgroundColor: "black",
//                       padding: "0.5rem",
//                     }}
//                   >
//                     <i className="fa-brands fa-x-twitter text-sm text-white"></i>
//                   </div>
//                 </Link>
//                 <Link to="https://twitter.com/100acressdotcom">
//                   <span
//                     className="ml-1 hidden sm:inline underline"
//                     style={{ color: "black" }}
//                   >
//                     Twitter
//                   </span>
//                 </Link>
//               </div>
//               <div className="flex items-center rounded-full bg-gray-200 p-2">
//                 <Link
//                   to="https://www.linkedin.com/company/100acress/"
//                   className="hover:underline"
//                   style={{ color: "black" }}
//                 >
//                   <FaLinkedin size={25} />
//                 </Link>
//                 <Link to="https://www.linkedin.com/company/100acress/">
//                   <span
//                     className="ml-1 hidden sm:inline underline"
//                     style={{ color: "black" }}
//                   >
//                     Linkedin
//                   </span>
//                 </Link>
//               </div>
//             </div>
//             <span className="text mx-1 mt-2">
//               to know more about{" "}
//               <span className="">
//                 #YOU<strong>GREATER</strong>THAN<strong>YOU</strong>
//               </span>
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:px-8 md:px-8 sm:px-6 xs:px-4 py-8">
//             <div className="flex flex-col text-justify items-center ">
//               <div className="overflow-hidden m-4 rounded-xl bg-white ">
//                 <h3 className="text-xl font-bold mb-2">
//                   Driving Culture Through Values:
//                 </h3>

//                 {viewCareer.driveCulture}
//               </div>
//             </div>

//             <div className="flex flex-col text-justify items-center">
//               <div className="overflow-hidden m-4 rounded-xl bg-white ">
//                 <h3 className="text-xl font-bold mb-2">
//                   With In House Growth Opportunities:
//                 </h3>

//                 {viewCareer.inHouse}
//               </div>
//             </div>

//             <div className="flex flex-col text-justify items-center">
//               <div className="overflow-hidden m-4 rounded-xl bg-white ">
//                 <h3 className="text-xl font-bold mb-2">Life@100ACRESS:</h3>

//                 {viewCareer.lifeAcress}
//               </div>
//             </div>
//           </div>
//         </div>

//         <p className="text-xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-xl text-red-600 text-left px-12 pt-4  mb-0 bg-gray-100">
//           100ACRESS HIGHLIGHTS
//         </p>

//         <div className="flex justify-center bg-gray-100">
//           <div className="flex flex-col md:flex-row space-y-2  items-center justify-center max-w-7xl w-full pt-2 pb-5">
//             <div className="w-full md:w-1/2 mx-2 h-96 overflow-hidden">
//               {highlightImage &&
//                 Array.isArray(highlightImage) &&
//                 highlightImage.length > 0 &&
//                 highlightImage.map((item, index) => (
//                   <div
//                     key={index}
//                     className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
//                   >
//                     <img
//                       className="w-full h-full object-fit rounded-xl"
//                       src={item.url}
//                       alt={`Image-${index}`}
//                     />
//                   </div>
//                 ))}
//             </div>
//             <div className="w-full md:w-1/2 mx-2 h-96 ">
//               <div className="flex flex-col space-y-2">
//                 <div className="h-48 w-full overflow-hidden">
//                   {highlightImage &&
//                     Array.isArray(highlightImage) &&
//                     highlightImage.length > 0 &&
//                     highlightImage.slice(0, 1).map((item, index) => (
//                       <div
//                         key={index}
//                         className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
//                       >
//                         <img
//                           className="w-full h-full object-fit rounded-xl"
//                           src={item.url}
//                           alt={`Image-${index}`}
//                         />
//                       </div>
//                     ))}
//                 </div>
//                 <div className="h-48 w-full flex space-x-1 p-2">
//                   <div className="h-full w-1/2 overflow-hidden  ">
//                     {highlightImage &&
//                       Array.isArray(highlightImage) &&
//                       highlightImage.length > 1 &&
//                       highlightImage.slice(1, 3).map((item, index) => (
//                         <div
//                           key={index}
//                           className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
//                         >
//                           <img
//                             className="w-full h-full object-fit rounded-xl"
//                             src={item.url}
//                             alt={`Image-${index}`}
//                           />
//                         </div>
//                       ))}
//                   </div>
//                   <div className="h-full w-1/2 overflow-hidden  ">
//                     {highlightImage &&
//                       Array.isArray(highlightImage) &&
//                       highlightImage.length > 3 &&
//                       highlightImage.slice(3, 5).map((item, index) => (
//                         <div
//                           key={index}
//                           className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
//                         >
//                           <img
//                             className="w-full h-full object-fit rounded-xl"
//                             src={item.url}
//                             alt={`Image-${index}`}
//                           />
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="container">
//           <div className="row">
//             <div className="col-md-4">
//               <div className="my-4">
//                 <h3 className="mt-4">Current Openings</h3>
//                 <div className="flex items-center">
//                   <DiCssTricks className="mr-2 my-3 " size={20} />
//                   <span className="text-xl ">All Openings (21)</span>
//                 </div>
//                 <hr className="mt-0" />
//                 <div className="flex items-center mt-0">
//                   <RiBankCardFill className="mr-2 my-3" size={20} />
//                   <span className="text-xl">Product (1)</span>
//                 </div>
//                 <hr className="mt-0" />
//                 <div className="flex items-center">
//                   <GrCloud className="mr-2 my-3" size={20} />
//                   <span className="text-xl">Sales (13)</span>
//                 </div>
//                 <hr className="mt-0" />
//                 <div className="flex items-center">
//                   <GrCommand className="mr-2 my-3" size={20} />
//                   <span className="text-xl">Technology (1)</span>
//                 </div>
//                 <hr className="mt-0" />
//                 <div className="flex items-center">
//                   <RiAdminFill className="mr-2 my-3" size={20} />
//                   <span className="text-xl">Others (6)</span>
//                 </div>
//                 <hr className="mt-0" />
//               </div>
//             </div>
//             <div className="col-md-8">
//               <div
//                 className="flex flex-col border-left border-2 border-gray px-4 my-4"
//                 style={{ borderBlockStart: "1px", borderBlockEnd: "1px" }}
//               >
//                 <h3 className="mb-4 mt-4 ml-5 ">All Openings</h3>
//                 <div className="flex flex-col h-96 overflow-y-auto">
//                   {jobPostingData.map((item, index) => {
//                     return (
//                       <div className="flex items-stretch" key={index}>
//                         <div className="flex-1 px-4 mb-4">
//                           <div className="bg-gray-50 hover:bg-gray-200 rounded-lg p-4 h-full">
//                             <p className="mb-2 text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs">
//                               Job Title:{" "}
//                               <span className="">{item.jobTitle}</span>
//                             </p>
//                             <p className="mb-2 flex justify-between items-center">
//                               <span className="text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs text-semibold">
//                                 Location:{" "}
//                                 <span className="text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs">
//                                   {item.jobLocation}
//                                 </span>
//                               </span>
//                               <span>
//                                 <div className="text-right">
//                                   <button
//                                     type="button"
//                                     className="text-white bg-red-600 font-medium rounded-lg text-xs lg:text-xl md:text-lg sm:text-sm xs:text-xs px-2 py-2"
//                                     onClick={() =>
//                                       setShowForm(
//                                         item._id === showform ? false : item._id
//                                       )
//                                     }
//                                   >
//                                     Know More
//                                   </button>
//                                 </div>
//                                 {showform === item._id && (
//                                   <>
//                                     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
//                                       <div className="px-4 py-4 bg-white w-full sm:w-full md:w-3/4 lg:w-1/2 h-96 overflow-y-auto flex flex-col items-center relative">
//                                         <button
//                                           className="text-red-400 text-xl absolute top-4 right-[1rem] md:right-8 lg:right-8 sm:right-6 cursor-pointer z-50"
//                                           onClick={() => setShowForm(false)}
//                                         >
//                                           ✖
//                                         </button>
//                                         <div className="ml-[-6rem]">
//                                           <strong>{item.jobTitle}</strong>
//                                         </div>
//                                         <p>
//                                           <strong>Experience Range:</strong>{" "}
//                                           {item.experience} Years
//                                           <br />
//                                           <strong>Location: </strong>
//                                           {item.jobLocation}
//                                         </p>
//                                         <div className="py-0">
//                                           <p className="text-lg">
//                                             <strong>Job brief</strong>
//                                           </p>
//                                           <p className="">{item.jobProfile}</p>
//                                           <p className="text-lg">
//                                             <strong>Responsibilities</strong>{" "}
//                                           </p>
//                                           <ul className="list-disc">
//                                             <li>{item.responsibility}.</li>
//                                           </ul>
//                                           <p className="text-lg">
//                                             <strong>
//                                               Requirements and skills
//                                             </strong>
//                                           </p>
//                                           <ul className="list-disc">
//                                             <li>{item.skill}</li>
//                                           </ul>
//                                           <br />
//                                           <div className="text-red-600">
//                                             <strong>
//                                               To apply for this job, email your
//                                               resume at{" "}
//                                             </strong>
//                                             <a
//                                               href={`mailto:hr@100acress.com?subject=CV - ${item.jobTitle}`}
//                                               className="text-black underline"
//                                             >
//                                               hr@100acress.com
//                                             </a>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </>
//                                 )}
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };
// export default CareerWithUs;


import React, { useContext} from "react";

import Footer from "../Components/Actual_Components/Footer";

import { DataContext } from "../MyContext";

const CareerWithUs = () => {
  
  const {jobPostingData} = useContext(DataContext);

 
  return (
    <div style={{overflowX:"hidden"}}>
      <div className="overflow-x-hidden">
        <section className="relative">
        <div class="w-full">
          <img
            src="../../Images/career.webp"
            alt="About Us"
            class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
          />
          <img
            src="../../Images/careermobile.webp"
            alt="About Us"
            class="w-full h-60 sm:h-30 object-fit small-screen-image block sm:hidden"
          />
        </div>


        </section>
        <div className="bg-gray-100 border-2 text-center pt-2 pb-2">
          <h4 className="lg:text-2xl mt-4 text-red-600 sm:text:sm">
            WE ARE COMMITTED
          </h4>

          <p className="lg:text-xl px-4 text-sm text-justify text-gray-500 sm:mx-10 md:mx-16 lg:mx-20 xl:mx-24 2xl:mx-20 ">
            We aim to provide exceptional service, and user-friendly tools to
            get the desired results for our customers. We always look for
            ambitious, hard-working, and smart talented people for our company.
            If you have the zeal to achieve great milestones in your career,
            come join us!
          </p>
        </div>
        {/* <div className="bg-red-600 border-2 text-center pt-2 pb-2 text-white ">
          <h4 className="lg:text-2xl mt-4 sm:text:sm">WE ARE COMMITTED</h4>
          <p className="lg:text-xl px-4 sm:text:sm  text-justify sm:mx-10 md:mx-16 lg:mx-20 xl:mx-24 2xl:mx-20 ">
            We aim to provide exceptional service, and user-friendly tools to
            get the desired results for our customers. We always look for
            ambitious, hard-working, and smart talented people for our company.
            If you have the zeal to achieve great milestones in your career,
            come join us!
          </p>
        </div> */}
        <div className="bg-gray-100 pb-5">
          <div className="bg-gray-100  sm:mx-10 md:mx-16 lg:mx-20 xl:mx-24 2xl:mx-20 ">
            <h3 className="lg:text-2xl sm:text:sm text-center font-bold text-black py-3 pt-3">
              Open Positions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 px-8 ">
             {jobPostingData.map((data,index)=>{
              return(
                <div className=" bg-white text-gray-500 p-2 flex justify-between">
                <div className="flex-1 ">
                  <strong className="text-red-600  lg:text-xl sm:text-sm">
                  Job Title:  {data.jobTitle}
                  </strong>


                  <p className="lg:text-lg sm:text-xs ">
                     Experience: {data.experience}
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="lg:text-lg sm:text-xs justify-start mb-0">
                    Location: {data.jobLocation}
                  </p>
                  <p className=" lg:text-lg sm:text-xs justify-start mt-0">
                    Full Time | 1 Days Ago
                  </p>
                </div>
              </div>
              )
             })}
          
            </div>
          </div>
        </div>
        <div className="lg:text-xl   sm:text:sm text-justify  mt-10 p-2">
          <p className="text-center text-gray-500">
            If you looking for an opening check our current openings or write to
            us at hr@100acress.com
          </p>

          <div className=" d-flex justify-center text-justify lg:text-xl sm:text:sm">
            <p className="text-center p-2 text-gray-500 ">
              {" "}
              <i className="fa-solid fa-location-crosshairs mr-10 justify-center text-blue-500"></i>
              708, ILD Trade Center, Sector- 47, Subhash Chowk Gurgaon, Haryana
            </p>
          </div>

          <div className=" d-flex justify-center p-0 lg:text-lg sm:text:sm">
            <p>
              {" "}
              <i className="fa-regular fa-envelope-open mr-10 justify-center text-blue-500"></i>
              <span className="text-red-600">hr@100acress.com</span>
            </p>
          </div>

          <div className=" d-flex justify-center p-0 lg:text-lg sm:text:sm">
            <p>
              {" "}
              <i class="fa-solid fa-mobile-screen-button mr-10 justify-center text-blue-500"></i>
              <span className="text-red-600">+91-8500900100 </span>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export default CareerWithUs;