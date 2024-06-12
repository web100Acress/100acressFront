

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Nav from "../../aadharhomes/Nav";
// import Footer from "./Footer";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BuyPropViewCard = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [toOpen, setToOpen] = useState(false);
//   const [show, setShow] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [drop1, setDrop1] = useState(false);
//   const [drop2, setDrop2] = useState(false);
//   const [drop3, setDrop3] = useState(false);
//   const [drop4, setDrop4] = useState(false);
//   const [drop, setDrop] = useState(false);
//   const [position, setPosition] = useState("down");
//   const [position1, setPosition1] = useState("down");
//   const [position2, setPosition2] = useState("down");
//   const [position3, setPosition3] = useState("down");
//   const [position4, setPosition4] = useState("down");
//   const [minPos, setMinPos] = useState("down");
//   const [maxPos, setMaxPos] = useState("down");
//   const [buyData, setBuyData] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [minPriceDrop, setMinPriceDrop] = useState(false);
//   const [maxPriceDrop, setMaxPriceDrop] = useState(false);

//   const toggle5 = () => {
//     setDrop2(!drop2);
//     setPosition2(position2 === "down" ? "up" : "down");
//   };

//   const toggleMinPrice = () => {
//     setMinPriceDrop(!minPriceDrop);
//     setMinPos(minPos === "down" ? "up" : "down");
//   };

//   const toggleMaxPrice = () => {
//     setMaxPriceDrop(!maxPriceDrop);
//     setMaxPos(maxPos === "down" ? "up" : "down");
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(
//         "https://api.100acress.com/property/buy/ViewAll"
//       );
//       setBuyData(res.data.collectdata);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const toggle = () => {
//     setDrop(!drop);
//     setPosition(position === "down" ? "up" : "down");
//   };

//   const toggle1 = () => {
//     setDrop1(!drop1);
//     setPosition1(position1 === "down" ? "up" : "down");
//   };

//   const toggle2 = () => {
//     setDrop2(!drop2);
//     setPosition2(position2 === "down" ? "up" : "down");
//   };

//   const toggle3 = () => {
//     setDrop3(!drop3);
//     setPosition3(position3 === "down" ? "up" : "down");
//   };
//   const toggle4 = () => {
//     setDrop4(!drop4);
//     setPosition4(position4 === "down" ? "up" : "down");
//   };
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const openDropdown = () => {
//     setToOpen(!toOpen);
//   };
//   const showDropdown = () => {
//     setShow(!show);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const onScroll = () => {
//         if (window.scrollY > 120) {
//           setIsVisible(true);
//         } else {
//           setIsVisible(false);
//         }
//       };
//       window.addEventListener("scroll", onScroll);
//       return () => window.removeEventListener("scroll", onScroll);
//     }, 15000);
//     return () => clearTimeout(timer);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <Wrapper className="Section">
//         <Nav />

//         <nav className="navbar d-lg-none d-xl-none d-xxl-none">
//           <div className="container-fluid">
//             <div className="">
//               <ul className="w-full md:w-[740px] mb-0 mb-lg-0 shadow-none flex flex-wrap justify-center space-x-2 pl-0">
//                 <li className="flex-1 mb-2 relative d-none d-sm-block">
//                   <button
//                     type="button"
//                     className="w-full btn btn-outline-danger"
//                     aria-expanded={isOpen}
//                     onClick={toggleDropdown}
//                   >
//                     Property Type
//                   </button>
//                   {isOpen && (
//                     <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
//                       <a
//                        
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Independent Floor
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Apartment
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Builder Floor
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Plot
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Residential
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Studio
//                       </a>
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Villas
//                       </a>
//                     </div>
//                   )}
//                 </li>
//                 <li className="flex-1 mb-2 relative d-none d-sm-block">
//                   <button
//                     type="button"
//                     className="w-full btn btn-outline-danger"
//                     aria-expanded={toOpen}
//                     onClick={openDropdown}
//                   >
//                     Area
//                   </button>
//                   {toOpen && (
//                     <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         1 BHK
//                       </a>
//                     </div>
//                   )}
//                 </li>
//                 <li className="flex-1 mb-2 relative d-none d-sm-block">
//                   <button
//                     type="button"
//                     className="w-full btn btn-outline-danger"
//                     aria-expanded={show}
//                     onClick={showDropdown}
//                   >
//                     City
//                   </button>
//                   {show && (
//                     <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
//                       <a
//                         href="#"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Gurugram
//                       </a>
//                     </div>
//                   )}
//                 </li>
//               </ul>

//               <div>
//                 <button
//                   className="text-white bg-black py-2 rounded-md px-4 md:hidden lg:block"
//                   onClick={toggleSidebar}
//                 >
//                   Clear Filters
//                 </button>
//                 <div
//                   className={`fixed top-0 left-0 w-64 h-full bg-white text-black z-10  p-4 transform ${
//                     isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//                   } transition-transform duration-300 ease-in-out`}
//                 >
//                   <div className="mt-4">
//                     <button
//                       className="text-white bg-red-500 py-1 px-2 rounded mt-4 fixed top-0 right-6"
//                       onClick={toggleSidebar}
//                     >
//                       ✖
//                     </button>
//                   </div>

//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle}>
//                       PROPERTY TYPE
//                       <i
//                         className={`fa-solid fa-chevron-${position} pr-2 text-black`}
//                       ></i>
//                     </div>
//                     {drop && (
//                       <div className="">
//                         <li className="" style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="independent_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value="independent_house"
//                           />
//                           <label
//                             for="independent_house"
//                             className="filter ml-2 text-lg"
//                           >
//                             {" "}
//                             Independent Floor
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="aparment_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value="aparment_house"
//                           />
//                           <label for="aparment_house" className="filter ml-2">
//                             {" "}
//                             Aparment
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="builder_floor"
//                             name="property_type"
//                             className="filter-choice"
//                             value="builder_floor"
//                           />
//                           <label for="builder_floor" className="filter ml-2">
//                             {" "}
//                             Builder Floor
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id=" plot_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value=" plot_house"
//                           />
//                           <label for=" plot_house" className="filter ml-2">
//                             {" "}
//                             Plot
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id=" residencial_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value=" residencial_house"
//                           />
//                           <label
//                             for=" residencial_house"
//                             className="filter ml-2"
//                           >
//                             {" "}
//                             Residential
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id=" studio_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value=" studio_house"
//                           />
//                           <label for=" studio_house" className="filter ml-2">
//                             {" "}
//                             Studio
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id=" villas_house"
//                             name="property_type"
//                             className="filter-choice"
//                             value=" villas_house"
//                           />
//                           <label for=" villas_house" className="filter ml-2">
//                             {" "}
//                             Villas
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>
//                   {/* <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle1}>
//                       BHK TYPE
//                       <i
//                         className={`fa-solid fa-chevron-${position1} pr-2`}
//                       ></i>
//                     </div>
//                     {drop1 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="oneBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="oneBhk"
//                           />
//                           <label for="oneBhk" className="filter ml-2">
//                             {" "}
//                             1 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="onefiveBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="onefiveBhk"
//                           />
//                           <label for="onefiveBhk" className="filter ml-2">
//                             {" "}
//                             1.5 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="twoBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="twoBhk"
//                           />
//                           <label for="twoBhk" className="filter ml-2">
//                             {" "}
//                             2 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="twofiveBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="twofiveBhk"
//                           />
//                           <label for="twofiveBhk" className="filter ml-2">
//                             {" "}
//                             2.5 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="threeBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="threeBhk"
//                           />
//                           <label for="threeBhk" className="filter ml-2">
//                             {" "}
//                             3 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="threefiveBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="threefiveBhk"
//                           />
//                           <label for="threefiveBhk" className="filter ml-2">
//                             {" "}
//                             3.5 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="fourBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="fourBhk"
//                           />
//                           <label for="fourBhk" className="filter ml-2">
//                             {" "}
//                             4 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="fourfiveBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="fourfiveBhk"
//                           />
//                           <label for="fourfiveBhk" className="filter ml-2">
//                             {" "}
//                             4.5 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="fiveBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="fiveBhk"
//                           />
//                           <label for="fiveBhk" className="filter ml-2">
//                             {" "}
//                             5 BHK
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="duplex"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="duplex"
//                           />
//                           <label for="duplex" className="filter ml-2">
//                             {" "}
//                             Duplex
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle2}>
//                       Area
//                       <i
//                         className={`fa-solid fa-chevron-${position2} pr-2 text-black`}
//                       ></i>
//                     </div>
//                     {drop2 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="2024"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="2024"
//                           />
//                           <label
//                             for="2024"
//                             className="filter ml-2"
//                             style={{ fontSize: "16" }}
//                           >
//                             {" "}
//                             under ₹50 Lac
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="rera"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="rera"
//                           />
//                           <label
//                             for="rera"
//                             className="filter ml-2"
//                             style={{ fontSize: "16" }}
//                           >
//                             {" "}
//                             ₹50 Lac - ₹1 Cr
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="readtToMoveIn"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="readtToMoveIn"
//                           />
//                           <label
//                             for="readtToMoveIn"
//                             className="filter ml-2"
//                             style={{ fontSize: "16" }}
//                           >
//                             {" "}
//                             ₹1 Cr - ₹2.5 Cr
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="underConstruction"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="underConstruction"
//                           />
//                           <label
//                             for="underConstruction"
//                             className="filter ml-2"
//                             style={{ fontSize: "16" }}
//                           >
//                             {" "}
//                             ₹2.5 Cr - ₹5 Cr
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="underConstruction"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="underConstruction"
//                           />
//                           <label
//                             for="underConstruction"
//                             className="filter ml-2"
//                             style={{ fontSize: "16" }}
//                           >
//                             {" "}
//                             Above ₹5 Cr
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle3}>
//                       City
//                       <i
//                         className={`fa-solid fa-chevron-${position3} pr-2 text-black`}
//                       ></i>
//                     </div>
//                     {drop3 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="2024"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="2024"
//                           />
//                           <label for="2024" className="filter ml-2">
//                             {" "}
//                             2024
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="rera"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="rera"
//                           />
//                           <label for="rera" className="filter ml-2">
//                             {" "}
//                             RERA Ceritified Projects
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="readtToMoveIn"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="readtToMoveIn"
//                           />
//                           <label for="readtToMoveIn" className="filter ml-2">
//                             {" "}
//                             Ready to move in
//                           </label>
//                         </li>
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="underConstruction"
//                             name="possession_type"
//                             className="filter-choice"
//                             value="underConstruction"
//                           />
//                           <label
//                             for="underConstruction"
//                             className="filter ml-2"
//                           >
//                             {" "}
//                             Under Construction
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div> */}
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle4}>
//                       Area
//                       <i
//                         className={`fa-solid fa-chevron-${position4} pr-2`}
//                       ></i>
//                     </div>
//                     {drop4 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="oneBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="oneBhk"
//                           />
//                           <label for="oneBhk" className="filter ml-2">
//                             {" "}
//                             4 BHK
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle1}>
//                       City
//                       <i
//                         className={`fa-solid fa-chevron-${position1} pr-2`}
//                       ></i>
//                     </div>
//                     {drop1 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="oneBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="oneBhk"
//                           />
//                           <label for="oneBhk" className="filter ml-2">
//                             {" "}
//                             Gurugram
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>

//                   <div
//                     className="fi_acc"
//                     style={{ borderBottom: "1px solid #d9d9d9" }}
//                   >
//                     <div className="fi_head" onClick={toggle5}>
//                       PRICE
//                       <i
//                         className={`fa-solid fa-chevron-${position2} pr-2 text-black`}
//                       ></i>
//                     </div>
//                     {drop2 && (
//                       <div className="">
//                         <li
//                           style={{ listStyle: "none" }}
//                           onClick={toggleMinPrice}
//                         >
//                           <span
//                             className="filter ml-2 font-bold"
//                             style={{ fontSize: "16px", cursor: "pointer" }}
//                           >
//                             Minimum Price
//                             <i
//                               className={`fa-solid fa-chevron-${minPos} pr-2 ml-3 text-black`}
//                               style={{ fontSize: "12px" }}
//                             ></i>
//                           </span>
//                         </li>
//                         {minPriceDrop && (
//                           <div className="ml-4">
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="minUnder50Lac"
//                                 name="min_price"
//                                 className="filter-choice"
//                                 value="minUnder50Lac"
//                               />
//                               <label
//                                 htmlFor="minUnder50Lac"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 under ₹50 Lac
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="min50LacTo1Cr"
//                                 name="min_price"
//                                 className="filter-choice"
//                                 value="min50LacTo1Cr"
//                               />
//                               <label
//                                 htmlFor="min50LacTo1Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹50 Lac - ₹1 Cr
//                               </label>
//                             </li>
//                           </div>
//                         )}
//                         <li
//                           style={{ listStyle: "none" }}
//                           onClick={toggleMaxPrice}
//                         >
//                           <span
//                             className="filter ml-2 font-bold"
//                             style={{ fontSize: "16px", cursor: "pointer" }}
//                           >
//                             Maximum Price
//                             <i
//                               className={`fa-solid fa-chevron-${maxPos} pr-2 ml-2 text-black`}
//                               style={{ fontSize: "12px" }}
//                             ></i>
//                           </span>
//                         </li>
//                         {maxPriceDrop && (
//                           <div className="ml-4">
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="max1CrTo2_5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="max1CrTo2_5Cr"
//                               />
//                               <label
//                                 htmlFor="max1CrTo2_5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹1 Cr - ₹2.5 Cr
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="max2_5CrTo5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="max2_5CrTo5Cr"
//                               />
//                               <label
//                                 htmlFor="max2_5CrTo5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹2.5 Cr - ₹5 Cr
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="maxAbove5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="maxAbove5Cr"
//                               />
//                               <label
//                                 htmlFor="maxAbove5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 Above ₹5 Cr
//                               </label>
//                             </li>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-3 col-md-4 col-sm-6 d-none d-lg-block">
//               <div className="d-flex flex-wrap">
//                 <div className="li_options w-100 position-relative">
//                   <div className="fi_space md:p-1 sm:p-1 ">
//                     <button type="button" className="theme_btn">
//                       Clear Filters
//                     </button>
//                   </div>

//                   <div className="fi_acc">
//                     <div className="fi_head">
//                       PROPERTY TYPE
//                       <i
//                         className={`fa-solid fa-chevron-up pr-2 text-black`}
//                       ></i>
//                     </div>

//                     <div className="">
//                       <li className="" style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id="independent_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value="independent_house"
//                         />
//                         <label
//                           for="independent_house"
//                           className="filter ml-2 text-lg"
//                         >
//                           {" "}
//                           Independent Floor
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id="aparment_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value="aparment_house"
//                         />
//                         <label for="aparment_house" className="filter ml-2">
//                           {" "}
//                           Aparment
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id="builder_floor"
//                           name="property_type"
//                           className="filter-choice"
//                           value="builder_floor"
//                         />
//                         <label for="builder_floor" className="filter ml-2">
//                           {" "}
//                           Builder Floor
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id=" plot_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value=" plot_house"
//                         />
//                         <label for=" plot_house" className="filter ml-2">
//                           {" "}
//                           Plot
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id=" residencial_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value=" residencial_house"
//                         />
//                         <label for=" residencial_house" className="filter ml-2">
//                           {" "}
//                           Residential
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id=" studio_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value=" studio_house"
//                         />
//                         <label for=" studio_house" className="filter ml-2">
//                           {" "}
//                           Studio
//                         </label>
//                       </li>
//                       <li style={{ listStyle: "none" }}>
//                         <input
//                           type="checkbox"
//                           id=" villas_house"
//                           name="property_type"
//                           className="filter-choice"
//                           value=" villas_house"
//                         />
//                         <label for=" villas_house" className="filter ml-2">
//                           {" "}
//                           Villas
//                         </label>
//                       </li>
//                     </div>
//                   </div>
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle4}>
//                       Area
//                       <i
//                         className={`fa-solid fa-chevron-${position4} pr-2`}
//                       ></i>
//                     </div>
//                     {drop4 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="oneBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="oneBhk"
//                           />
//                           <label for="oneBhk" className="filter ml-2">
//                             {" "}
//                             4 BHK
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>
//                   <div className="fi_acc">
//                     <div className="fi_head" onClick={toggle1}>
//                       City
//                       <i
//                         className={`fa-solid fa-chevron-${position1} pr-2`}
//                       ></i>
//                     </div>
//                     {drop1 && (
//                       <div className="">
//                         <li style={{ listStyle: "none" }}>
//                           <input
//                             type="checkbox"
//                             id="oneBhk"
//                             name="bhk_type"
//                             className="filter-choice"
//                             value="oneBhk"
//                           />
//                           <label for="oneBhk" className="filter ml-2">
//                             {" "}
//                             Gurugram
//                           </label>
//                         </li>
//                       </div>
//                     )}
//                   </div>

//                   <div
//                     className="fi_acc"
//                     style={{ borderBottom: "1px solid #d9d9d9" }}
//                   >
//                     <div className="fi_head" onClick={toggle5}>
//                       PRICE
//                       <i
//                         className={`fa-solid fa-chevron-${position2} pr-2 text-black`}
//                       ></i>
//                     </div>
//                     {drop2 && (
//                       <div className="">
//                         <li
//                           style={{ listStyle: "none" }}
//                           onClick={toggleMinPrice}
//                         >
//                           <span
//                             className="filter ml-2 font-bold"
//                             style={{ fontSize: "16px", cursor: "pointer" }}
//                           >
//                             Minimum Price
//                             <i
//                               className={`fa-solid fa-chevron-${minPos} pr-2 ml-3 text-black`}
//                               style={{ fontSize: "12px" }}
//                             ></i>
//                           </span>
//                         </li>
//                         {minPriceDrop && (
//                           <div className="ml-4">
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="minUnder50Lac"
//                                 name="min_price"
//                                 className="filter-choice"
//                                 value="minUnder50Lac"
//                               />
//                               <label
//                                 htmlFor="minUnder50Lac"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 under ₹50 Lac
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="min50LacTo1Cr"
//                                 name="min_price"
//                                 className="filter-choice"
//                                 value="min50LacTo1Cr"
//                               />
//                               <label
//                                 htmlFor="min50LacTo1Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹50 Lac - ₹1 Cr
//                               </label>
//                             </li>
//                           </div>
//                         )}
//                         <li
//                           style={{ listStyle: "none" }}
//                           onClick={toggleMaxPrice}
//                         >
//                           <span
//                             className="filter ml-2 font-bold"
//                             style={{ fontSize: "16px", cursor: "pointer" }}
//                           >
//                             Maximum Price
//                             <i
//                               className={`fa-solid fa-chevron-${maxPos} pr-2 ml-2 text-black`}
//                               style={{ fontSize: "12px" }}
//                             ></i>
//                           </span>
//                         </li>
//                         {maxPriceDrop && (
//                           <div className="ml-4">
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="max1CrTo2_5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="max1CrTo2_5Cr"
//                               />
//                               <label
//                                 htmlFor="max1CrTo2_5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹1 Cr - ₹2.5 Cr
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="max2_5CrTo5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="max2_5CrTo5Cr"
//                               />
//                               <label
//                                 htmlFor="max2_5CrTo5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 ₹2.5 Cr - ₹5 Cr
//                               </label>
//                             </li>
//                             <li style={{ listStyle: "none" }}>
//                               <input
//                                 type="checkbox"
//                                 id="maxAbove5Cr"
//                                 name="max_price"
//                                 className="filter-choice"
//                                 value="maxAbove5Cr"
//                               />
//                               <label
//                                 htmlFor="maxAbove5Cr"
//                                 className="filter ml-2"
//                                 style={{ fontSize: "16px" }}
//                               >
//                                 Above ₹5 Cr
//                               </label>
//                             </li>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-9 col-md-12 col-sm-12">
//               <div className="li_items xl:px-8 lg:px-6 md:px-4 px-2">
//                 <div className="li_head_row">
//                   <div className="heading relative">
//                     <h3 className="title mt-4">Projects in Gurugram</h3>
//                     <div
//                       className={`fixed inset-x-0 flex justify-center z-10 ${
//                         isVisible ? "" : "hidden"
//                       }`}
//                       onClick={scrollToTop}
//                     >
//                       <button
//                         type="button"
//                         className="bg-black border-white text-white p-2 flex items-center mt-2 rounded-lg"
//                       >
//                         <i className="fa-solid fa-chevron-up pr-2 "></i>
//                         Back To Top
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 shadow-lg">
//                   {buyData.length > 0 ? (
//                     buyData.map((item, index) => (
//                       <React.Fragment key={index}>
//                         {item.postProperty && item.postProperty.length > 0 ? (
//                           item.postProperty.map((nestedItem, nestedIndex) => (
//                             <div key={nestedIndex}>
//                               <div className="row g-0  rounded-lg bg-white ">
//                                 <div className="col-lg-4 col-12">
//                                   {nestedItem.frontImage &&
//                                   nestedItem.frontImage.url ? (
//                                     <img
//                                       src={nestedItem.frontImage.url}
//                                       alt="frontImage"
//                                       className="w-full h-[178px] object-cover d-lg-block rounded-l-lg"
//                                     />
//                                   ) : (
//                                     <span>Image not available</span>
//                                   )}
//                                 </div>
//                                 <div className="col-lg-8 col-12">
//                                   <div className="p-3">
//                                     <p className="text-md mb-0">
//                                       {nestedItem.propertyName}
//                                     </p>
//                                     <p className="text-md mb-3">
//                                       Location: {nestedItem.city}
//                                     </p>
//                                     <div className="row">
//                                       <div className="col-md-6">
//                                         <p className="text-md mb-0">
//                                           ₹ {nestedItem.price}
//                                         </p>
//                                       </div>
//                                       <div className="col-md-6 d-flex justify-content-end">
//                                         <Link
//                                           to={
//                                             nestedItem.propertyName &&
//                                             nestedItem._id
//                                               ? `/buy-properties/${nestedItem.propertyName.replace(
//                                                   /\s+/g,
//                                                   "-"
//                                                 )}/${nestedItem._id}/`
//                                               : "#"
//                                           }
//                                         >
//                                           <button
//                                             type="button"
//                                             className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-3 py-1 text-center"
//                                             style={{ marginTop: "50px" }}
//                                           >
//                                             View Details
//                                           </button>
//                                         </Link>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <></>
//                         )}
//                       </React.Fragment>
//                     ))
//                   ) : (
//                     <p>Loading...</p>
//                   )}
//                 </div> */}

//                 {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4">
//   {buyData.length > 0 ? (
//     buyData.map((item, index) => (
//       <React.Fragment key={index}>
//         {item.postProperty && item.postProperty.length > 0 ? (
//           item.postProperty.map((nestedItem, nestedIndex) => (
//             <div key={nestedIndex} className="shadow-lg">
//               <div className="row g-0 rounded-lg bg-white h-[178px]">
//                 <div className="col-lg-4 col-12 h-full">
//                   {nestedItem.frontImage && nestedItem.frontImage.url ? (
//                     <img
//                       src={nestedItem.frontImage.url}
//                       alt="frontImage"
//                       className="w-full h-full object-cover d-lg-block rounded-l-lg"
//                     />
//                   ) : (
//                     <span>Image not available</span>
//                   )}
//                 </div>
//                 <div className="col-lg-8 col-12">
//                   <div className="p-4 flex flex-col justify-between h-full">
//                     <div>
//                       <p className="text-md mb-1 font-semibold">
//                         {nestedItem.propertyName}
//                       </p>
//                       <p className="text-md mb-2 text-gray-600">
//                         Location: {nestedItem.city}
//                       </p>
//                       <p className="text-md mb-0 font-semibold">
//                         ₹ {nestedItem.price}
//                       </p>
//                     </div>
//                     <div className="d-flex justify-content-end mt-auto">
//                       <Link
//                         to={
//                           nestedItem.propertyName && nestedItem._id
//                             ? `/buy-properties/${nestedItem.propertyName.replace(
//                                 /\s+/g,
//                                 "-"
//                               )}/${nestedItem._id}/`
//                             : "#"
//                         }
//                       >
//                         <button
//                           type="button"
//                           className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-4 w-32 py-2 text-center m-0"
//                         >
//                           View Details
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : null}
//       </React.Fragment>
//     ))
//   ) : (
//     <p>Loading...</p>
//   )}
// </div> */}

//                 <section className="flex flex-col items-center bg-white">
//                   <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 sm:gap-12 lg:grid-cols-1 xl:grid-cols-2 xl:gap-16">
//                     {buyData.length > 0 ? (
//                       buyData.map((item, index) => (
//                         <React.Fragment key={index}>
//                           {item.postProperty && item.postProperty.length > 0
//                             ? item.postProperty.map(
//                                 (nestedItem, nestedIndex) => (
//                                   <div key={nestedIndex} className="shadow-lg">
//                                     <div className="row rounded-lg">
//                                       <div className="col-lg-4 col-md-4 col-sm-12 col-12">
//                                         {nestedItem.frontImage &&
//                                         nestedItem.frontImage.url ? (
//                                           <img
//                                             src={nestedItem.frontImage.url}
//                                             alt="frontImage"
//                                             className="object-fit h-48 w-full rounded-l-lg"
//                                           />
//                                         ) : (
//                                           <span>Image not available</span>
//                                         )}
//                                       </div>
//                                       <div className="col-lg-8 col-md-8 col-sm-12 col-12">
//                                         <div className="p-4 h-full flex flex-col justify-between">
//                                           <div>
//                                             <p className="text-md mb-1 font-semibold">
//                                               {nestedItem.propertyName}
//                                             </p>
//                                             <p className="text-md mb-2 text-gray-600">
//                                               Location: {nestedItem.city}
//                                             </p>
//                                             <p className="text-md mb-0 font-semibold">
//                                               ₹ {nestedItem.price}
//                                             </p>
//                                           </div>
//                                           <div className="flex justify-end mt-auto">
//                                             <Link
//                                               to={
//                                                 nestedItem.propertyName &&
//                                                 nestedItem._id
//                                                   ? `/buy-properties/${nestedItem.propertyName.replace(
//                                                       /\s+/g,
//                                                       "-"
//                                                     )}/${nestedItem._id}/`
//                                                   : "#"
//                                               }
//                                             >
//                                               <button
//                                                 type="button"
//                                                 className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-4 py-2 text-center m-0"
//                                               >
//                                                 View Details
//                                               </button>
//                                             </Link>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )
//                               )
//                             : null}
//                         </React.Fragment>
//                       ))
//                     ) : (
//                       <p>Loading...</p>
//                     )}
//                   </div>
//                 </section>

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </Wrapper>
//       <Footer />
//     </>
//   );
// };
// export default BuyPropViewCard;
// const Wrapper = styled.section`
//   box-sizing: border-box;
//   font-family: DM Sans, sans-serif;
//   .li_options {
//     padding: 30px 0;
//     border-right: 1px solid #d9d9d9;
//   }
//   .fi_space {
//     padding: 0 30px;
//     margin-bottom: 20px;
//   }
//   .theme_btn {
//     position: relative;
//     background-color: #313131;
//     font-size: 16px;
//     color: #fff;
//     padding: 10px 30px 12px;
//     display: inline-block;
//     border-radius: 40px;
//     border: 0;
//     font-weight: 500;
//     transition: 0.3s;
//     cursor: pointer;
//   }
//   .li_options .fi_heading {
//     font-family: DM Sans;
//     font-size: 12px;
//     font-weight: 500;
//     line-height: 16px;
//     color: #959595;
//     padding: 0 30px;
//     margin-bottom: 15px;
//   }
//   .li_options .fi_acc {
//     padding: 0 30px;
//   }
//   .fi_head {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 0;
//     font-weight: 600;
//     cursor: pointer;
//     font-size: 17px;
//     color: #000000;
//   }
//   .toggleIcon {
//     font-size: 19px;
//     line-height: 1;
//   }
//   .fi_options {
//     list-style: none;
//     padding-bottom: 10px;
//   }
//   .show {
//     display: block;
//   }
//   .fi_options li {
//     margin-right: 6px;
//     margin-bottom: 7px;
//     display: inline-block;
//   }
//   .fi_options li input {
//     display: none;
//   }
//   .fi_options .filter {
//     border: 1px solid #ccc;
//     width: fit-content;
//     padding: 8px 15px;
//     color: #959595;
//     border-radius: 30px;
//     font-size: 13px;
//     display: inline-block;
//     cursor: pointer;
//   }
//   label {
//     margin-bottom: 0rem !important;
//   }
//   .li_options .fi_acc:not(:last-child) {
//     border-bottom: 1px solid #d9d9d9;
//   }
//   .hide {
//     display: none;
//   }
//   .li_items {
//     width: 100%;
//     // padding: 12px;
//   }
//   .li_head_row {
//     // display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-between;
//     color: #313131;
//     margin-bottom: 30px;
//   }
//   .li_head_row .title {
//     font-size: 20px;
//     font-weight: 600;
//     margin: 0;
//     line-height: 24px;
//   }
//   .li_head_row .description {
//     margin-bottom: 0;
//     color: #535353;
//     font-size: 16px;
//     margin-top: 12px;
//     line-height: 24px;
//   }
//   .li_head_row .sorting-filter select {
//     padding: 8px 20px;
//     border: 1px solid #d9d9d9;
//     border-radius: 35px;
//     outline: none;
//     color: #828282;
//   }
//   .filter-choice:checked + label {
//     color: #e5652e;
//     border-color: #e5652e;
//     background: rgba(255, 99, 71, 0.2);
//   }

//   label {
//     font-size: 14px;
//   }
//   @media only screen and (max-width: 570px) {
//     .li_options {
//       display: none;
//     }
//     .li_items {
//       width: 100%;
//     }
//     .sorting-filter {
//       display: none;
//     }
//   }
// `;



















import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Nav from "../../aadharhomes/Nav";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const BuyPropViewCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop, setDrop] = useState(false);
  const [position, setPosition] = useState("down");
  const [position1, setPosition1] = useState("down");
  const [position2, setPosition2] = useState("down");
  const [position3, setPosition3] = useState("down");
  const [position4, setPosition4] = useState("down");
  const [minPos, setMinPos] = useState("down");
  const [maxPos, setMaxPos] = useState("down");
  const [buyData, setBuyData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [minPriceDrop, setMinPriceDrop] = useState(false);
  const [maxPriceDrop, setMaxPriceDrop] = useState(false);

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [minMaxValues, setMinMaxValues] = useState({ min: null, max: null });

  const toggle5 = () => {
    setDrop2(!drop2);
    setPosition2(position2 === "down" ? "up" : "down");
  };

  const toggleMinPrice = () => {
    setMinPriceDrop(!minPriceDrop);
    setMinPos(minPos === "down" ? "up" : "down");
  };

  const toggleMaxPrice = () => {
    setMaxPriceDrop(!maxPriceDrop);
    setMaxPos(maxPos === "down" ? "up" : "down");
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    let updatedPrices = [...selectedPrices];

    if (updatedPrices.includes(value)) {
      updatedPrices = updatedPrices.filter((price) => price !== value);
    } else {
      updatedPrices.push(value);
    }

    setSelectedPrices(updatedPrices);
    updateMinMaxValues(updatedPrices);
  };

  const updateMinMaxValues = (prices) => {
    let min = null;
    let max = null;

    if (prices.includes("max1CrTo2_5Cr")) {
      min = min === null ? 1 : Math.min(min, 1);
      max = Math.max(max || 0, 2.5);
    }
    if (prices.includes("max2_5CrTo5Cr")) {
      min = min === null ? 2.5 : Math.min(min, 2.5);
      max = Math.max(max || 0, 5);
    }
    if (prices.includes("maxAbove5Cr")) {
      min = min === null ? 5 : Math.min(min, 5);
      max = Math.max(max || 0, Infinity);
    }

    setMinMaxValues({ min, max });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/property/buy/ViewAll"
      );
      setBuyData(res.data.collectdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = () => {
    setDrop(!drop);
    setPosition(position === "down" ? "up" : "down");
  };

  const toggle1 = () => {
    setDrop1(!drop1);
    setPosition1(position1 === "down" ? "up" : "down");
  };

  const toggle2 = () => {
    setDrop2(!drop2);
    setPosition2(position2 === "down" ? "up" : "down");
  };

  const toggle3 = () => {
    setDrop3(!drop3);
    setPosition3(position3 === "down" ? "up" : "down");
  };
  const toggle4 = () => {
    setDrop4(!drop4);
    setPosition4(position4 === "down" ? "up" : "down");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const openDropdown = () => {
    setToOpen(!toOpen);
  };
  const showDropdown = () => {
    setShow(!show);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const onScroll = () => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Wrapper className="Section">
        <Nav />

        <nav className="navbar d-lg-none d-xl-none d-xxl-none">
          <div className="container-fluid">
            <div className="">
              <ul className="w-full md:w-[740px] mb-0 mb-lg-0 shadow-none flex flex-wrap justify-center space-x-2 pl-0">
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                  >
                    Property Type
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Independent Floor
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Apartment
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Builder Floor
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Plot
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Residential
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Studio
                      </Link>
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Villas
                      </Link>
                    </div>
                  )}
                </li>
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={toOpen}
                    onClick={openDropdown}
                  >
                    Area
                  </button>
                  {toOpen && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        1 BHK
                      </Link>
                    </div>
                  )}
                </li>
                <li className="flex-1 mb-2 relative d-none d-sm-block">
                  <button
                    type="button"
                    className="w-full btn btn-outline-danger"
                    aria-expanded={show}
                    onClick={showDropdown}
                  >
                    City
                  </button>
                  {show && (
                    <div className="absolute left-0 mt-2 w-56 z-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                      <Link
                       
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Gurugram
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
              {/* tablet screen layout */}
              <div>
                <button
                  className="text-white bg-black py-2 rounded-md px-4 md:hidden lg:block"
                  onClick={toggleSidebar}
                >
                  Clear Filters
                </button>
                <div
                  className={`fixed top-0 left-0 w-64 h-full bg-white text-black z-10  p-4 transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out`}
                >
                  <div className="mt-4">
                    <button
                      className="text-white bg-red-500 py-1 px-2 rounded mt-4 fixed top-0 right-6"
                      onClick={toggleSidebar}
                    >
                      ✖
                    </button>
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head"  onClick={toggle}>
                      Property Type
                      <i
                        className={`fa-solid fa-chevron-${position} pr-2 text-black text-sm`}
                      ></i>
                    </div>
                    {drop && (
                      <div className=""style={{ borderBottom: "1px solid #d9d9d9"}}>
                        <li className="" style={{ listStyle: "none",}}>
                          <input
                            type="checkbox"
                            id="independent_house"
                            name="property_type"
                            className="filter-choice"
                            value="independent_house"
                          />
                          <label
                            for="independent_house"
                            className="filter ml-2 text-lg"
                          >
                            {" "}
                            Independent Floor
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="aparment_house"
                            name="property_type"
                            className="filter-choice"
                            value="aparment_house"
                          />
                          <label for="aparment_house" className="filter ml-2">
                            {" "}
                            Apartment
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="builder_floor"
                            name="property_type"
                            className="filter-choice"
                            value="builder_floor"
                          />
                          <label for="builder_floor" className="filter ml-2">
                            {" "}
                            Builder Floor
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" plot_house"
                            name="property_type"
                            className="filter-choice"
                            value=" plot_house"
                          />
                          <label for=" plot_house" className="filter ml-2">
                            {" "}
                            Plot
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" residencial_house"
                            name="property_type"
                            className="filter-choice"
                            value=" residencial_house"
                          />
                          <label
                            for=" residencial_house"
                            className="filter ml-2"
                          >
                            {" "}
                            Residential
                          </label>
                        </li>
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" studio_house"
                            name="property_type"
                            className="filter-choice"
                            value=" studio_house"
                          />
                          <label for=" studio_house" className="filter ml-2">
                            {" "}
                            Studio
                          </label>
                        </li>
                        <li className="mb-3"style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id=" villas_house"
                            name="property_type"
                            className="filter-choice"
                            value=" villas_house"
                          />
                          <label for=" villas_house" className="filter ml-2">
                            {" "}
                            Villas
                          </label>
                        </li>
                      </div>
                    )}
                  </div>

                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle4}>
                      Area
                      <i
                        className={`fa-solid fa-chevron-${position4} pr-2 text-sm`}
                      ></i>
                    </div>
                    {drop4 && (
                      <div className="" style={{ borderBottom: "1px solid #d9d9d9"}}>
                        <li className="mb-3"style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            4 BHK
                          </label>
                        </li>
                      </div>
                    )}
                  </div>
                  <div className="fi_acc">
                    <div className="fi_head"  onClick={toggle1}>
                      City
                      <i
                        className={`fa-solid fa-chevron-${position1} pr-2 text-sm`}
                      ></i>
                    </div>
                    {drop1 && (
                      <div className=""style={{ borderBottom: "1px solid #d9d9d9"}}>
                        <li className="mb-3" style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            Gurugram
                          </label>
                        </li>
                      </div>
                    )}
                  </div>

                  <div
                    className="fi_acc"
                    style={{ borderBottom: "1px solid #d9d9d9" }}
                  >
                    <div className="fi_head"  onClick={toggle5}>
                      Price
                      <i
                        className={`fa-solid fa-chevron-${position2} pr-2 text-black text-sm`}
                      ></i>
                    </div>
                    {drop2 && (
                      <div className="">
                          <div className="ml-4 m-3">
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="max1CrTo2_5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="max1CrTo2_5Cr"
                              />
                              <label
                                htmlFor="max1CrTo2_5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                ₹1 Cr - ₹2.5 Cr
                              </label>
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="max2_5CrTo5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="max2_5CrTo5Cr"
                              />
                              <label
                                htmlFor="max2_5CrTo5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                ₹2.5 Cr - ₹5 Cr
                              </label>
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="maxAbove5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="maxAbove5Cr"
                              />
                              <label
                                htmlFor="maxAbove5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                Above ₹5 Cr
                              </label>
                            </li>
                          </div>
                  
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* on larger screen layout */}
        <div className="container-fluid bg-white">
          <div className="row ">
            <div className="col-lg-3 col-md-4 col-sm-6 d-none d-lg-block bg-white shadow-md ">
              <div className="d-flex flex-wrap">
                <div className="li_options w-100 position-relative">
                  <div className="fi_space md:p-1 sm:p-1 ">
                    <button type="button" className="theme_btn">
                      Clear Filters
                    </button>
                  </div>
                  <div className="fi_acc">
                    <div className="fi_head" >
                      Property Type
                      <i
                        className={`fa-solid fa-chevron-up pr-2 text-black text-xs`}
                      ></i>
                    </div>

                    <div className="mb-3">
                      <li className="" style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id="independent_house"
                          name="property_type"
                          className="filter-choice"
                          value="independent_house"
                        />
                        <label
                          for="independent_house"
                          className="filter ml-2 text-lg"
                        >
                          {" "}
                          Independent Floor
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id="aparment_house"
                          name="property_type"
                          className="filter-choice"
                          value="aparment_house"
                        />
                        <label for="aparment_house" className="filter ml-2">
                          {" "}
                          Apartment
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id="builder_floor"
                          name="property_type"
                          className="filter-choice"
                          value="builder_floor"
                        />
                        <label for="builder_floor" className="filter ml-2">
                          {" "}
                          Builder Floor
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id=" plot_house"
                          name="property_type"
                          className="filter-choice"
                          value=" plot_house"
                        />
                        <label for=" plot_house" className="filter ml-2">
                          {" "}
                          Plot
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id=" residencial_house"
                          name="property_type"
                          className="filter-choice"
                          value=" residencial_house"
                        />
                        <label for=" residencial_house" className="filter ml-2">
                          {" "}
                          Residential
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id=" studio_house"
                          name="property_type"
                          className="filter-choice"
                          value=" studio_house"
                        />
                        <label for=" studio_house" className="filter ml-2">
                          {" "}
                          Studio
                        </label>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <input
                          type="checkbox"
                          id=" villas_house"
                          name="property_type"
                          className="filter-choice"
                          value=" villas_house"
                        />
                        <label for=" villas_house" className="filter ml-2">
                          {" "}
                          Villas
                        </label>
                      </li>
                    </div>
                  </div>
                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle4}>
                      Area
                      <i
                        className={`fa-solid fa-chevron-${position4} pr-2 text-xs`}
                      ></i>
                    </div>
                    {drop4 && (
                      <div className="m-2">
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            4 BHK
                          </label>
                        </li>
                      </div>
                    )}
                  </div>
                  <div className="fi_acc">
                    <div className="fi_head" onClick={toggle1}>
                      City
                      <i
                        className={`fa-solid fa-chevron-${position1} pr-2 text-xs`}
                      ></i>
                    </div>
                    {drop1 && (
                      <div className="mb-2">
                        <li style={{ listStyle: "none" }}>
                          <input
                            type="checkbox"
                            id="oneBhk"
                            name="bhk_type"
                            className="filter-choice"
                            value="oneBhk"
                          />
                          <label for="oneBhk" className="filter ml-2">
                            {" "}
                            Gurugram
                          </label>
                        </li>
                      </div>
                    )}
                  </div>

                  <div
                    className="fi_acc"
                    style={{ borderBottom: "1px solid #d9d9d9" }}
                  >
                    <div className="fi_head" onClick={toggle5}>
                      Price
                      <i
                        className={`fa-solid fa-chevron-${position2} pr-2 text-black text-xs`}
                      ></i>
                    </div>
                    {drop2 && (
                      <div className="">
                       
                          <div className="ml-4 m-3">
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="max1CrTo2_5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="max1CrTo2_5Cr"
                              />
                              <label
                                htmlFor="max1CrTo2_5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                ₹1 Cr - ₹2.5 Cr
                              </label>
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="max2_5CrTo5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="max2_5CrTo5Cr"
                              />
                              <label
                                htmlFor="max2_5CrTo5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                ₹2.5 Cr - ₹5 Cr
                              </label>
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <input
                                type="checkbox"
                                id="maxAbove5Cr"
                                name="max_price"
                                className="filter-choice"
                                value="maxAbove5Cr"
                              />
                              <label
                                htmlFor="maxAbove5Cr"
                                className="filter ml-2"
                                style={{ fontSize: "16px" }}
                              >
                                Above ₹5 Cr
                              </label>
                            </li>
                          </div>
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="li_items xl:px-8 lg:px-6 md:px-4 px-2">
                <div className="li_head_row">
                  <div className="heading relative">
                    <h3 className="title mt-4">Projects in Gurugram</h3>

                    <>
                      {isVisible && (
                        <div
                          className="fixed bottom-4 right-4 z-10"
                          onClick={scrollToTop}
                        >
                          <button className="bg-red-600 border-white text-white p-3 flex items-center rounded-full animate-bounce">
                            <i className="fa-solid fa-arrow-up transform rotate-360"></i>
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                </div>


                <section className="flex flex-col items-center bg-white mb-4">
                  <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 sm:gap-12 lg:grid-cols-1 xl:grid-cols-2 xl:gap-16">
                    {buyData.length > 0 ? (
                      buyData.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.postProperty && item.postProperty.length > 0
                            ? item.postProperty.map(
                                (nestedItem, nestedIndex) => (
                                  <div key={nestedIndex} className="shadow-lg">
                                    <div className="row rounded-lg">
                                      <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        {nestedItem.frontImage &&
                                        nestedItem.frontImage.url ? (
                                          <img
                                            src={nestedItem.frontImage.url}
                                            alt="frontImage"
                                            className="object-fit h-48 w-full rounded-l-lg"
                                          />
                                        ) : (
                                          <span>Image not available</span>
                                        )}
                                      </div>
                                      <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                                        <div className="p-4 h-full flex flex-col justify-between">
                                          <div>
                                            <p className="text-md mb-1 ">
                                              {nestedItem.propertyName}
                                            </p>
                                            <p className="text-md mb-2 text-gray-600">
                                              Location: {nestedItem.city},
                                              {nestedItem.state}
                                            </p>
                                            <p className="text-md mb-0">
                                              ₹ {nestedItem.price}
                                            </p>
                                          </div>
                                          <div className="flex justify-end mt-auto">
                                          <Link
                                              to={
                                                nestedItem.propertyName &&
                                                nestedItem._id
                                                  ? `/buy-properties/${nestedItem.propertyName.replace(
                                                      /\s+/g,
                                                      "-"
                                                    )}/${nestedItem._id}/`
                                                  : "#"
                                              } target="_top"
                                            >
                                              <button
                                                type="button"
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg text-sm px-4 py-2 text-center m-0"
                                              >
                                                View Details
                                              </button>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            : null}
                        </React.Fragment>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};
export default BuyPropViewCard;
const Wrapper = styled.section`
  box-sizing: border-box;
  font-family: DM Sans, sans-serif;

  .li_options {
    padding: 30px 0;
    border-right: 1px solid #d9d9d9;
  }
  .fi_space {
    padding: 0 30px;
    margin-bottom: 20px;
  }
  .theme_btn {
    position: relative;
    background-color: #313131;
    font-size: 16px;
    color: #fff;
    padding: 10px 30px 12px;
    display: inline-block;
    border-radius: 40px;
    border: 0;
    font-weight: 500;
    transition: 0.3s;
    cursor: pointer;
  }
  .li_options .fi_heading {
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #959595;
    padding: 0 30px;
    margin-bottom: 15px;
  }
  .li_options .fi_acc {
    padding: 0 30px;
  }
  .fi_head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-weight: 300;
    cursor: pointer;
    font-size: 17px;
    color: #000000;
  }
  .toggleIcon {
    font-size: 19px;
    line-height: 1;
  }
  .fi_options {
    list-style: none;
    padding-bottom: 10px;
  }
  .show {
    display: block;
  }
  .fi_options li {
    margin-right: 6px;
    margin-bottom: 7px;
    display: inline-block;
  }
  .fi_options li input {
    display: none;
  }
  .fi_options .filter {
    border: 1px solid #ccc;
    width: fit-content;
    padding: 8px 15px;
    color: #959595;
    border-radius: 30px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
  }
  label {
    margin-bottom: 0rem !important;
  }
  .li_options .fi_acc:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  .hide {
    display: none;
  }
  .li_items {
    width: 100%;
    
  }
  .li_head_row {
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    color: #313131;
    margin-bottom: 30px;
  }
  .li_head_row .title {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    line-height: 24px;
  }
  .li_head_row .description {
    margin-bottom: 0;
    color: #535353;
    font-size: 16px;
    margin-top: 12px;
    line-height: 24px;
  }
  .li_head_row .sorting-filter select {
    padding: 8px 20px;
    border: 1px solid #d9d9d9;
    border-radius: 35px;
    outline: none;
    color: #828282;
  }
  .filter-choice:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }

  label {
    font-size: 14px;
  }
  @media only screen and (max-width: 570px) {
    .li_options {
      display: none;
    }
    .li_items {
      width: 100%;
    }
    .sorting-filter {
      display: none;
    }
  }
`;