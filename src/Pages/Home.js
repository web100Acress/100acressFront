// import React, { useContext } from "react";
// import Cities from "../Components/HomePageComponents/Cities";
// import FormHome from "../Components/HomePageComponents/FormHome";
// import WhyChoose from "../Components/HomePageComponents/WhyChoose";
// import SpacesAvailable from "../Components/HomePageComponents/Spaces";
// import SearchBar from "../Components/HomePageComponents/SearchBar";
// import styled from "styled-components";
// import OurServices from "../Components/HomePageComponents/ourServices";
// import Free from "../../src/Pages/Free";
// import { Helmet } from "react-helmet";
// import Nav from "../aadharhomes/Nav";
// import Footer from "../Components/Actual_Components/Footer";
// import { Link } from "react-router-dom";
// import { DataContext } from "../MyContext";
// import { ScaleLoader } from "react-spinners";
// import Snapshot from "./Snapshot";
// import Resale from "./Resale";
// import HomeBuilderCarousel from "./HomeBuilderCarousel";
// import BackToTopButton from "./BackToTopButton";
// import PossessionProperty from "../Components/PossessionProperty";
// const keyframes = `
//   @keyframes moveHorizontal {
//     from {
//       transform: translateX(0);
//     }
//     to {
//       transform: translateX(100%);
//     }
//   }
// `;
// function Home() {
//   const {
//     trendingProject,
//     featuredProject,
//     affordable,
//     upcoming,
//     city,
//     commercialProject,
//     typeScoPlots,
//     goaData,
//     dlfProject,
//   } = useContext(DataContext);

//   return (
//     <Wrapper className="section" style={{ overflowX: "hidden" }}>
//       <Nav />

//       <Helmet>
//         <meta
//           name="description"
//           content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
//         />
//         <title>
//           Property in Gurgaon, Buy Luxury Flats in Gurugram, Real Estate India
//         </title>
//         <link rel="canonical" href="https://www.100acress.com/" />
//       </Helmet>

//       <div className="h-screen w-full zoom  zoom-out element  md:h-60 lg:h-96 sm:h-24 p-8 box-border djqwUUJNCO 9999 mb-4 shadow-2xl">
//         <div className="mt-12 lg:pt-14 sm:pt-1 sm:h-6  md:pt-0 ">
//           <SearchBar />
//         </div>
//       </div>

//       <div className="">
//         {" "}
//         <h1
//           className="xjUWI"
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           Trending Properties
//           <Link to="/projects-in-gurugram/" target="_top">
//             <span
//               className="float-right text-white text-sm px-2 mx-4 rounded-full hidden md:flex bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All</span>
//             </span>
//           </Link>
//         </h1>
//         {
//           <section className="flex flex-col bg-white items-center pt-1 ">
//             <div className="grid max-w-md grid-cols-1  px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {trendingProject.map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4  transition hover:scale-105 overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>
//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium ">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>

//                         <ul className="m-0  flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>{" "}
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       <div className="bg-orange-100 py-3 ">
//         {" "}
//         <h1
//           className="xjUWI"
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           Upcoming Projects
//           <Link to="projects/upcoming-projects-in-gurgaon/" target="_top">
//             <span
//               className="float-right text-white text-sm px-2 mx-4 rounded-full hidden md:flex bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All </span>
//             </span>
//           </Link>
//         </h1>
//         {
//           <section className="flex flex-col items-center bg-orange-100">
//             <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {upcoming.map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit "
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>

//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>

//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       {/* dlf prject */}
//       <div className="bg-[#F83CB0] py-3 ">
//         {" "}
//         <h1
//           className="xjUWI"
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           <span className="text-white">DLF Super Luxury Homes #100crore </span>
//           <Link to={"/dlf-homes-projects/"} target="_top">
//             <span
//               className="float-right text-red-600 text-sm px-2 mx-4 rounded-full hidden md:flex bg-white"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="red" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All </span>
//             </span>
//           </Link>
//         </h1>
//         {
//           <section className="flex flex-col items-center bg-[#F83CB0]">
//             <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {dlfProject.map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit "
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>

//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>

//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       {/* Goa */}

//       <div className="py-3 " style={{ backgroundColor: "#00314f" }}>
//         {" "}
//         <h3
//           className="xjUWI text-white "
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           Projects in Goa
//           <Link to={"/project-in-goa/"} target="_top">
//             <span
//               className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All </span>
//             </span>
//           </Link>
//         </h3>
//         {
//           <section
//             className="flex flex-col pt-2
//            items-center"
//           >
//             <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {goaData.slice(0, 4).map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>

//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>
//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       <div className="bg-orange-100 py-3 ">
//         {" "}
//         <h1
//           className="xjUWI"
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           SCO Plots in Gurugram
//           <Link to="/sco/plots/" target="_top">
//             <span
//               className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All </span>
//             </span>
//           </Link>
//         </h1>
//         {
//           <section className="flex flex-col items-center bg-orange-100">
//             <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {typeScoPlots.map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit "
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>

//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>
//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       <SpacesAvailable />
//       <div className="py-3 " style={{ backgroundColor: "#00314f" }}>
//         {" "}
//         <h3
//           className="xjUWI text-white "
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           Commercial Projects in Delhi NCR
//           <Link to={"/projects/commerial/"} target="_top">
//             <span
//               className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span style={{ marginLeft: "8px" }}>View All </span>
//             </span>
//           </Link>
//         </h3>
//         {
//           <section
//             className="flex flex-col pt-4
//            items-center"
//           >
//             <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {commercialProject.slice(0, 4).map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>

//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>
//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       <h2
//         className="xjUWI"
//         style={{
//           fontSize: "xx-large",
//           margin: "10px 40px 5px 60px",
//           fontWeight: "600",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//       >
//         Featured Projects
//         <Link to="/projects-in-gurugram/" target="_top">
//           <span
//             className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//             style={{ alignItems: "center", margin: "16px" }}
//           >
//             <ScaleLoader color="#FFFFFF" height={20} width={3} />
//             <style>{keyframes}</style>
//             <span className="hidden sm:block" style={{ marginLeft: "8px" }}>
//               View All{" "}
//             </span>
//           </span>
//         </Link>
//       </h2>

//       {
//         <section className="flex flex-col  items-center">
//           <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//             {featuredProject.map((item, index) => {
//               const pUrl = item.project_url;
//               return (
//                 <Link to={`/${pUrl}/`} target="_top">
//                   <article
//                     key={index}
//                     className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                   >
//                     <div>
//                       <img
//                         src={item.frontImage.url}
//                         alt="property In Gurugram"
//                         className="w-full h-48 object-fit"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <div className="pb-2">
//                         <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                           {item.projectName}
//                         </span>
//                         <br />
//                         <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                           {item.city}, {item.state}
//                         </span>
//                       </div>

//                       <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                         <li className="mr-4 flex items-center text-left">
//                           <li className="text-left">
//                             <span className="text-[13px] text-gray-400">
//                               {item.projectAddress}
//                             </span>
//                             <p className="m-0 text-sm font-medium">
//                               {item.type}
//                             </p>
//                           </li>
//                         </li>
//                       </ul>
//                       <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                         <li className="text-left">
//                           <span className="text-sm font-extrabold text-red-600">
//                             <span className="text-xl">₹ </span>
//                             {item.minPrice}
//                             {" - "}
//                             {item.maxPrice} Cr
//                           </span>
//                         </li>

//                         <li className="text-left">
//                           <button
//                             type="button"
//                             className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                           >
//                             View Details
//                           </button>
//                         </li>
//                       </ul>
//                     </div>
//                   </article>
//                 </Link>
//               );
//             })}
//           </div>
//         </section>
//       }

//       <div className="py-3" style={{ backgroundColor: "#00314f" }}>
//         {" "}
//         <h3
//           className="xjUWI text-white"
//           style={{
//             fontSize: "xx-large",
//             margin: "10px 40px 5px 60px",
//             fontWeight: "600",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           Projects in Delhi
//           <Link to={"/project-in-delhi/"} target="_top">
//             <span
//               className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//               style={{ alignItems: "center", margin: "16px" }}
//             >
//               <ScaleLoader color="#FFFFFF" height={20} width={3} />
//               <style>{keyframes}</style>
//               <span className="hidden sm:block" style={{ marginLeft: "8px" }}>
//                 View All{" "}
//               </span>
//             </span>
//           </Link>
//         </h3>
//         {
//           <section
//             className="flex flex-col pt-4
//            items-center"
//           >
//             <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//               {city.map((item, index) => {
//                 const pUrl = item.project_url;
//                 return (
//                   <Link to={`/${pUrl}/`} target="_top">
//                     <article
//                       key={index}
//                       className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                     >
//                       <div>
//                         <img
//                           src={item.frontImage.url}
//                           alt="property In Gurugram"
//                           className="w-full h-48 object-fit"
//                         />
//                       </div>
//                       <div className="p-4">
//                         <div className="pb-2">
//                           <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                             {item.projectName}
//                           </span>
//                           <br />
//                           <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                             {item.city}, {item.state}
//                           </span>
//                         </div>

//                         <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                           <li className="mr-4 flex items-center text-left">
//                             <li className="text-left">
//                               <span className="text-[13px] text-gray-400">
//                                 {item.projectAddress}
//                               </span>
//                               <p className="m-0 text-sm font-medium">
//                                 {item.type}
//                               </p>
//                             </li>
//                           </li>
//                         </ul>
//                         <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                           <li className="text-left">
//                             <span className="text-sm font-extrabold text-red-600">
//                               <span className="text-xl">₹ </span>
//                               {item.minPrice}
//                               {" - "}
//                               {item.maxPrice} Cr
//                             </span>
//                           </li>

//                           <li className="text-left">
//                             <button
//                               type="button"
//                               className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                             >
//                               View Details
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </article>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>
//         }
//       </div>

//       <Cities />
//       {/* <StarCarousel /> */}
//       <FormHome />

//       <div className="">
//         <div style={{ backgroundColor: "#00314f" }}>
//           {" "}
//           <h3
//             className="xjUWI text-white pt-3 "
//             style={{
//               fontSize: "xx-large",
//               margin: "10px 40px 5px 60px",
//               fontWeight: "600",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             Affordable Homes
//             <Link to={"/projects-in-gurugram/"} target="_top">
//               <span
//                 className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//                 style={{ alignItems: "center", margin: "16px" }}
//               >
//                 <ScaleLoader color="#FFFFFF" height={20} width={3} />
//                 <style>{keyframes}</style>
//                 <span className="hidden sm:block" style={{ marginLeft: "8px" }}>
//                   View All{" "}
//                 </span>
//               </span>
//             </Link>
//           </h3>
//           {
//             <section
//               className="flex flex-col pt-4
//            items-center"
//             >
//               <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
//                 {affordable.map((item, index) => {
//                   const pUrl = item.project_url;
//                   return (
//                     <Link to={`/${pUrl}/`} target="_top">
//                       <article
//                         key={index}
//                         className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
//                       >
//                         <div>
//                           <img
//                             src={item.frontImage.url}
//                             alt="property In Gurugrame"
//                             className="w-full h-48 object-fit"
//                           />
//                         </div>

//                         <div className="p-4">
//                           <div className="pb-2">
//                             <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
//                               {item.projectName}
//                             </span>
//                             <br />
//                             <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
//                               {item.city}, {item.state}
//                             </span>
//                           </div>
//                           <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
//                             <li className="mr-4 flex items-center text-left">
//                               <li className="text-left">
//                                 <span className="text-[13px] text-gray-400">
//                                   {item.projectAddress}
//                                 </span>
//                                 <p className="m-0 text-sm font-medium">
//                                   {item.type}
//                                 </p>
//                               </li>
//                             </li>
//                           </ul>
//                           <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
//                             <li className="text-left">
//                               <span className="text-sm font-extrabold text-red-600">
//                                 <span className="text-xl">₹ </span>
//                                 {item.minPrice}
//                                 {" - "}
//                                 {item.maxPrice} Cr
//                               </span>
//                             </li>

//                             <li className="text-left">
//                               <button
//                                 type="button"
//                                 className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
//                               >
//                                 View Details
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </article>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </section>
//           }
//         </div>
//       </div>

//       <h1
//         className="xjUWI text-md md:text-2xl lg:text-4xl xl:text-4xl"
//         style={{
//           // fontSize: "xx-large",
//           margin: "14px 40px 5px 60px",
//           fontWeight: "600",
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           marginBottom: "-40px",
//         }}
//       >
//         <span>
//           {" "}
//           Best Resale Property <span> For You</span>
//         </span>
//         <Link
//           to="/buy-properties/best-resale-property-in-gurugram/"
//           target="_top"
//         >
//           <span
//             className="float-right text-white md:flex text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
//             style={{ alignItems: "center", margin: "16px" }}
//           >
//             <ScaleLoader color="#FFFFFF" height={20} width={3} />
//             <style>{keyframes}</style>
//             <span style={{ marginLeft: "8px" }}>View All </span>
//           </span>
//         </Link>
//       </h1>
//       <Resale />

//       <h3
//         className="xjUWI "
//         style={{
//           fontSize: "xx-large",
//           margin: "30px 60px 0px 60px",
//           fontWeight: "600",
//         }}
//       >
//         Services We Offer
//       </h3>

//       <OurServices />
//       <WhyChoose />

//       <Snapshot />
//       <HomeBuilderCarousel />
//       <Free />

//       <div>
//         <div>
//           <a href="tel:8500900100" className="dd-m-whatsapp">
//             <span className="icon"></span>
//           </a>
//         </div>
//       </div>

//       <PossessionProperty />
//       <BackToTopButton />
//       <Footer />
//     </Wrapper>
//   );
// }

// export default Home;

// const Wrapper = styled.section`
//   .dd-m-whatsapp {
//     position: fixed;
//     z-index: 999;
//     bottom: 10px;
//     right: 10px;
//     width: 55px;
//     height: 55px;
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: -moz-box;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-box-align: center;
//     -webkit-align-items: center;
//     -moz-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     -webkit-box-pack: center;
//     -webkit-justify-content: center;
//     -moz-box-pack: center;
//     -ms-flex-pack: center;
//     justify-content: center;
//     -webkit-border-radius: 50%;
//     -moz-border-radius: 50%;
//     border-radius: 50%;
//     background-color: #25d366;
//     -webkit-transition: 0.3s all ease;
//     -o-transition: 0.3s all ease;
//     -moz-transition: 0.3s all ease;
//     transition: 0.3s all ease;
//     cursor: pointer;
//     text-decoration: none;
//     color: #25d366;
//     background-color: #2bb601; /* Change background color to blue */
//   }

//   .dd-m-whatsapp:hover {
//     -webkit-transform: translateY(-5px);
//     -moz-transform: translateY(-5px);
//     -ms-transform: translateY(-5px);
//     -o-transform: translateY(-5px);
//     transform: translateY(-5px);
//     -webkit-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
//     -moz-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
//     box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
//   }

//   .dd-m-whatsapp .icon {
//     width: 50%;
//     height: 50%;
//     display: block;
//     fill: blue; /* Change fill color to blue */
//     -webkit-transform: translateX(1px);
//     -moz-transform: translateX(1px);
//     -ms-transform: translateX(1px);
//     -o-transform: translateX(1px);
//     transform: translateX(1px);
//   }

//   .dd-m-whatsapp .icon {
//     width: 70%;
//     height: 70%;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.11A19.86 19.86 0 0 1 3.11 12.18 19.86 19.86 0 0 1 .82 3.92 2 2 0 0 1 2.82 2h3a2 2 0 0 1 2 1.72c.16 1.19.45 2.36.85 3.47a2 2 0 0 1-.45 2.11L6.24 10.24a16 16 0 0 0 7.52 7.52l1.95-1.95a2 2 0 0 1 2.11-.45c1.11.4 2.28.69 3.47.85A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E");
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: 70%;
//   }

//   @media screen and (max-width: 600px) {
//     .xjUWI {
//       font-size: x-large;
//       margin: 30px 30px !important;
//     }
//     .djqwUUJNCO {
//       height: 17vh !important;
//       background-image: url("../../Images/P.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }

//   @media screen and (max-width: 425px) and (min-width: 425px) {
//     .xjUWI {
//       font-size: x-large;
//       margin: 10px 30px !important;
//     }
//     .djqwUUJNCO {
//       height: 60vh !important;
//       background-image: url("../../Images/P.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }

//   @media screen and (max-width: 375px) and (min-width: 375px) {
//     .xjUWI {
//       font-size: x-large;
//       margin: 10px 30px !important;
//     }
//     .djqwUUJNCO {
//       height: 20vh !important;
//       background-image: url("../../Images/P.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }

//   @media screen and (max-width: 425px) and (min-width: 425px) {
//     .xjUWI {
//       font-size: x-large;
//       margin: 10px 30px !important;
//     }
//     .djqwUUJNCO {
//       height: 60vh !important;
//       background-image: url("../../Images/P.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }

//   @media screen and (max-width: 1800px) and (min-width: 601px) {
//     .djqwUUJNCO {
//       background-image: url("../../Images/C.png");
//       background-repeat: no-repeat;
//       background-size: cover;
//       background-position: center;
//     }
//   }

//   .sticky-quote-cta {
//     height: auto;
//     position: fixed;
//     border-radius: 15px 0 15px 0;
//     right: 0;
//     top: 400px;
//     top: 40vh;
//     z-index: 10000;
//   }

//   .sticky-quote-cta a {
//     color: white;
//     text-decoration: none;
//     background: #333;
//     padding: 15px 20px 35px;
//     display: block;
//     font-weight: bold;
//     font-size: 15px;
//     border-radius: 5px;
//     -ms-transform: rotate(-90deg) translate(0, -20px);
//     -webkit-transform: rotate(-90deg) translate(0, -20px);
//     transform: rotate(-90deg) translate(0, -20px);
//     position: relative;
//     right: -85px;
//     transition: position 0.2s, right 0.2s;
//     background: rgb(251, 183, 39);
//     background: red;
//   }

//   .sticky-quote-cta a:hover {
//     right: -70px;
//     transition: position 0.2s, right 0.2s;
//     cursor: pointer;
//   }

//   .element {
//     transition: transform 0.5s ease-in-out;
//   }

//   .element:hover {
//     transform: scale(1.02);
//   }
// `;

// New COde

import React, { useContext } from "react";
import Cities from "../Components/HomePageComponents/Cities";
import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import Free from "../../src/Pages/Free";
import { Helmet } from "react-helmet";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../MyContext";
import { ScaleLoader } from "react-spinners";
import Snapshot from "./Snapshot";
import Resale from "./Resale";
import HomeBuilderCarousel from "./HomeBuilderCarousel";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
import TopSeoPlots from "./TopSeoPlots";
import Flag from "../Components/Flag";

function Home() {
  const {
    trendingProject,
    featuredProject,
    affordable,
    upcoming,
    city,
    commercialProject,
    typeScoPlots,
    goaData,
    dlfProject,
  } = useContext(DataContext);

  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <Nav />
      {/* <Flag/> */}
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>
          Property in Gurgaon, Buy Luxury Flats in Gurugram, Real Estate India
        </title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      <div className="h-screen w-full zoom  zoom-out element  md:h-60 lg:h-96 sm:h-24 p-8 box-border djqwUUJNCO 9999 mb-4 shadow-2xl">
        <div className="mt-12 lg:pt-14 sm:pt-1 sm:h-6  md:pt-0 ">
          <SearchBar />
        </div>
      </div>

      <div className="">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left">
              Trending Properties in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="/projects-in-gurugram/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col bg-white items-center pt-1 ">
            <div className="grid max-w-md grid-cols-1  px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {trendingProject.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4  transition hover:scale-105 overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit"
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>
                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium ">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>

                        <ul className="m-0  flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <div className="bg-orange-100 py-3 ">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
              Upcoming Projects in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="projects/upcoming-projects-in-gurgaon/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-orange-100">
            <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {upcoming.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit "
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>

                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      {/* dlf prject */}
      <div className="bg-[#F83CB0] py-3 ">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white text-center sm:text-left">
              DLF Super Luxury Homes #100crore
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to={"/dlf-homes-projects/"} target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-white">
                <ScaleLoader color="red" height={20} width={3} />
                <span className="ml-2 text-red-600">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-[#F83CB0]">
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {dlfProject.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit "
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>

                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      {/* Goa */}

      <div className="py-3 " style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white sm:text-left">
              Projects in Goa
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to={"/project-in-goa/"} target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-2
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {goaData.slice(0, 4).map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit"
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>
                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <div className="bg-orange-100 py-3 ">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
              SCO Plots in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="/sco/plots/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-orange-100">
            <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {typeScoPlots.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit "
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>
                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <SpacesAvailable />
      <BudgetPlotsInGurugraon />

      <div style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="flex items-center  justify-between mx-6  lg:mx-6 xl:mx-14 md:mx-6 mt-0">
          <div className="flex items-center pt-3">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl pt-2 pb-0 text-white text-center sm:text-left ">
              Commercial Projects in Delhi NCR
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to={"/projects/commerial/"} target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-3
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {commercialProject.slice(0, 4).map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit"
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>
                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <TopSeoPlots />

      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 mb-0 pt-0">
        <div className="flex items-center">
          <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left ">
            Featured Projects
          </h1>
        </div>
        <div className="ml-2 hidden sm:block">
          <Link to="/projects-in-gurugram/" target="_top">
            <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <span className="ml-2">View All</span>
            </span>
          </Link>
        </div>
      </div>
      {
        <section className="flex flex-col pt-3 items-center">
          <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
            {featuredProject.map((item, index) => {
              const pUrl = item.project_url;
              return (
                <Link to={`/${pUrl}/`} target="_top">
                  <article
                    key={index}
                    className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                  >
                    <div>
                      <img
                        src={item.frontImage.url}
                        alt="property In Gurugram"
                        className="w-full h-48 object-fit"
                      />
                    </div>
                    <div className="p-4">
                      <div className="pb-2">
                        <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                          {item.projectName}
                        </span>
                        <br />
                        <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                          {item.city}, {item.state}
                        </span>
                      </div>

                      <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                        <li className="mr-4 flex items-center text-left">
                          <li className="text-left">
                            <span className="text-[13px] text-gray-400">
                              {item.projectAddress}
                            </span>
                            <p className="m-0 text-sm font-medium">
                              {item.type}
                            </p>
                          </li>
                        </li>
                      </ul>
                      <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                        <li className="text-left">
                          <span className="text-sm font-extrabold text-red-600">
                            <span className="text-xl">₹</span>
                            {item.minPrice < 1 ? (
                              <>{item.minPrice * 100} L</>
                            ) : (
                              <>{item.minPrice}</>
                            )}
                            {" - "}
                            {item.maxPrice} Cr
                          </span>
                        </li>

                        <li className="text-left">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                          >
                            View Details
                          </button>
                        </li>
                      </ul>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>
      }

      <div className="py-3" style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="" style={{ backgroundColor: "#00314f" }}>
          <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
            <div className="flex items-center">
              <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white text-center sm:text-left">
                Projects in Delhi
              </h1>
            </div>
            <div className="ml-2 hidden sm:block">
              <Link to={"/project-in-delhi/"} target="_top">
                <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                  <ScaleLoader color="#FFFFFF" height={20} width={3} />
                  <span className="ml-2">View All</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-2 
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {city.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit"
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>
                          <br />
                          <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>
                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹</span>
                              {item.minPrice < 1 ? (
                                <>{item.minPrice * 100} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <Cities />
      {/* <StarCarousel /> */}
      <FormHome />

      <div className="">
        <div style={{ backgroundColor: "#00314f" }}>
          {" "}
          <div className="" style={{ backgroundColor: "#00314f" }}>
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
              <div className="flex items-center">
                <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white text-center sm:text-left">
                  Affordable Homes
                </h1>
              </div>
              <div className="ml-2 hidden sm:block">
                <Link to={"/projects-in-gurugram/"} target="_top">
                  <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                    <ScaleLoader color="#FFFFFF" height={20} width={3} />
                    <span className="ml-2">View All</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {
            <section
              className="flex flex-col pt-3
           items-center"
            >
              <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                {affordable.map((item, index) => {
                  const pUrl = item.project_url;
                  return (
                    <Link to={`/${pUrl}/`} target="_top">
                      <article
                        key={index}
                        className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                      >
                        <div>
                          <img
                            src={item.frontImage.url}
                            alt="property In Gurugram"
                            className="w-full h-48 object-fit"
                          />
                        </div>

                        <div className="p-4">
                          <div className="pb-2">
                            <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                              {item.projectName}
                            </span>
                            <br />
                            <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                              {item.city}, {item.state}
                            </span>
                          </div>
                          <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                            <li className="mr-4 flex items-center text-left">
                              <li className="text-left">
                                <span className="text-[13px] text-gray-400">
                                  {item.projectAddress}
                                </span>
                                <p className="m-0 text-sm font-medium">
                                  {item.type}
                                </p>
                              </li>
                            </li>
                          </ul>
                          <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                            <li className="text-left">
                              <span className="text-sm font-extrabold text-red-600">
                                <span className="text-xl">₹</span>
                                {item.minPrice < 1 ? (
                                  <>{item.minPrice * 100} L</>
                                ) : (
                                  <>{item.minPrice}</>
                                )}
                                {" - "}
                                {item.maxPrice} Cr
                              </span>
                            </li>

                            <li className="text-left">
                              <button
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                              >
                                View Details
                              </button>
                            </li>
                          </ul>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </section>
          }
        </div>
      </div>

      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
        <div className="flex items-center">
          <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  sm:text-left">
            Best Resale Property <span> For You</span>
          </h1>
        </div>
        <div className="ml-2 hidden sm:block">
          <Link
            to="/buy-properties/best-resale-property-in-gurugram/"
            target="_top"
          >
            <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <span className="ml-2" style={{ marginLeft: "8px" }}>
                View All
              </span>
            </span>
          </Link>
        </div>
      </div>
      <Resale />

      <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left px-14 pt-1">
        Services We Offer
      </h1>
      <OurServices />
      <WhyChoose />

      <Snapshot />
      <HomeBuilderCarousel />
      <Free />
      <div>
        <div>
          <a href="tel:8500900100" class="dd-m-phone">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      </div>

      <div>
        <a
          href="https://wa.me/918500900100"
          class="dd-m-whatsapp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      <PossessionProperty />
      <BackToTopButton />
      <Footer />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  .dd-m-phone {
    position: fixed;
    z-index: 999;
    bottom: 10px;
    left: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #007bff; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-phone:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 70px;
    left: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #4ac557; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  @media screen and (max-width: 600px) {
    .xjUWI {
      font-size: x-large;
      margin: 30px 30px !important;
    }
    .djqwUUJNCO {
      height: 17vh !important;
      background-image: url("../../Images/RakhiM.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/RakhiM.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 375px) and (min-width: 375px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 20vh !important;
      background-image: url("../../Images/RakhiM.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/RakhiM.svg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 1800px) and (min-width: 601px) {
    .djqwUUJNCO {
      background-image: url("../../Images/Rakhi.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-90deg) translate(0, -20px);
    -webkit-transform: rotate(-90deg) translate(0, -20px);
    transform: rotate(-90deg) translate(0, -20px);
    position: relative;
    right: -85px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
  }

  .element {
    transition: transform 0.5s ease-in-out;
  }

  .element:hover {
    transform: scale(1.02);
  }
`;
