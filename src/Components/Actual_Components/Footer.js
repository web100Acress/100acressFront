import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className="bg-red-600 h-90">
        <div className="mx-auto grid text-gray-50 lg:grid-cols-12 px-4">
          <div className="flex flex-col lg:flex-row items-start border-slate-500 py-2 px-2 lg:col-span-12 xl:pl-32 2xl:pl-40">
            <div className="pt-4 text-sm leading-6 tracking-wide lg:w-1/2 lg:pr-8 lg:col-span-6">
              <p className="font-bold text-xl text-white text-justify">About 100acress.com</p>
              <p className='text-md text-justify'>
                100acress.com RERA Registered Gurgaon Fastest Growing Property Website dedicated to
                providing advisory and mediation services for discovering, renting, buying, selling,
                and financing residential apartments or commercial properties in Gurgaon. We are the
                management platform that extends its function beyond the purchase, sale, or rental of
                properties. Our aim is to be a one-stop solution for all apartment needs, from finding
                a best property in Gurgaon to managing and connecting with the apartment complex.
              </p>

            </div>

            <div className="mt-4 lg:mt-0 lg:ml-8 lg:w-1/2 lg:col-span-6">
              <nav>
                <p className="font-bold text-xl pr-2 text-white ">Useful Links</p>

                <p className="space-x-2 text-md text-justify">
                  <span className="hover:underline "><Link className=''style={{color:'white'}}>Property in Gurugram</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Property in Delhi</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Property in Noida</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Property in Goa</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Affordable Homes in Gurugram</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>M3M India Projects</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Raheja Developers Projects</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Max Estate Projects</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Krisumi Projects</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Luxury Flats</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Builder Floors</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>SCO Plots in Gurugram</Link></span> |
                  <span className=" hover:underline"><Link className=''style={{color:'white'}}>Deen Dayal Plots</Link></span>
                </p>

              </nav>
            </div>

          </div>
          <div className='lg:w-1/2' >
            <nav
              aria-label="Footer Navigation "
              className="flex flex-wrap  px-3 sm:py-4 sm:px-8 lg:col-span-8 
            lg:border-t-0 xl:flex-nowrap xl:space-x-16 xl:pl-32 2xl:pl-40"
            >
              <li className="flex space-x-3">
                <Link
                  to="https://www.facebook.com/100Acress"
                  className="flex items-center justify-center text-white bg-blue-400 w-10 h-10 rounded-full"
                >
                  <FaFacebook size={20} />

                </Link>
                <Link
                  to="https://twitter.com/100acressdotcom"
                  className="flex items-center justify-center text-white bg-black w-10 h-10 rounded-full "
                >
                  <i className="fa-brands fa-x-twitter text-sm" ></i>
                </Link>

                <Link
                  to="https://www.instagram.com/100acress_com/"
                  className="flex items-center justify-center text-white w-10 h-10 rounded-full bg-[#c32aa3]"
                >
                  <FaInstagram size={20} />

                </Link>
                <Link
                  to="https://www.linkedin.com/company/100acress/"
                  className="flex justify-center items-center text-white bg-blue-700 w-10 h-10 rounded-full"
                >
                  <FaLinkedin size={20} />
                </Link>
                <Link
                  to="https://www.youtube.com/c/100Acress"
                  className="flex items-center justify-center text-red-600 rounded-full bg-white w-10 h-10"
                >
                  <FaYoutube size={20} />
                </Link>
              </li>
            </nav>
          </div>

          <div
            aria-label="Footer Navigation"
            className="flex flex-wrap h-full rounded-xl pt-2 lg:col-span-12 lg:border-t-0 xl:flex-nowrap xl:space-r-16"
          >
            <ul className="mt-2 pl-0 text-md h-6 flex-grow flex flex-col sm:flex-row md:mt-0 sm:items-center">
              <div className="flex flex-row sm:flex-row sm:justify-center flex-wrap">

                <li className=" sm:mb-0">
                  <Link to="/" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Home
                  </Link>
                </li>
                <li className=" sm:mb-0">
                  <Link to="#" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    About Us
                  </Link>
                </li>
                <li className=" sm:mb-0">
                  <Link to="/blog" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Blog
                  </Link>
                </li>

                <li className=" sm:mb-0">
                  <Link to="/contactus" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Contact Us
                  </Link>
                </li>
                <li className=" sm:mb-0">
                  <Link to="/privacy" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Privacy
                  </Link>
                </li>
                <li className=" sm:mb-0">
                  <Link to="/careerwithus" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Careers With Us
                  </Link>
                </li>
                <li className=" sm:mb-0">
                  <Link to="/termsandconditions" className="text-left px-1 text-md hover:underline" style={{color:'white'}}>
                    Terms And Conditions
                  </Link>
                </li>
              </div>
            </ul>
          </div>

          <div className="border-t border-white px-2 mt-2 py-2  lg:col-span-12">
            <p className="text-left text-sm text-white">
              Copyright © 2024,{" "}
              <Link className="text-reset" to="https://100acress.com/">

                100acress.com.{" "}
              </Link>
              All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer;

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaYoutube,
// } from "react-icons/fa";
// export default function Footer() {
   

//   return (
//     <>
//     <div className="bg-red-600 h-100vh w-full d-flex flex-direction-column  text-white">
//       {/* <div className="container"> */}
//         <div className="row ">
//           <div className="col-lg-3 col-md-6 col-sm-12 mt-4  ">
//             <div className="">
//               <p className=" fw-bold mt-2 text-white items-center text-justify mx-10 ">100acress</p>
//               <div className="items-center text-justify mx-10 ">
//               <p className="mt-2 mb-1 text-white ">
//                 <Link to={'/'}  className="hover:text-white hover:underline  " target="_top" >
//                   Home
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to='/about' className="hover:text-white hover:underline "  target="_top"  >
//                   About Us
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link  className="hover:text-white hover:underline ">
//                   Blog
//                 </Link>
//               </p>

//               <p className="mb-1 text-white">
//                 <Link to="/contactus" className="hover:text-white hover:underline " target="_top">

//                   Contact Us
//                 </Link>
//               </p>

//               <p className="mb-1 text-white">
//                 <Link to="/privacy" className="hover:text-white hover:underline "  target="_top" >

//                   Privacy
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/careerwithus" className="hover:text-white hover:underline " target="_top">

//                   Careers with us
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/termsandconditions" className="hover:text-white hover:underline " target="_top">

//                   Terms And Conditions
//                 </Link>
//               </p>
            
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 col-sm-12 mt-4 px-2 ">
//             <div className="">
//               <p className="fw-bold mt-2 items-center text-justify mx-10">REAL ESTATE</p>
//               <div className="items-center text-justify mx-10">
//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   Residential Property
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   Commercial Property
//                 </Link>
//               </p>

//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   Floors in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   Plots in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   SCO in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
//                   Circle Rates
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="" className="text-reset text-white hover:text-white hover:underline " target="_blank">
//                   Gurgaon Master Plan in 2031
//                 </Link>
//               </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-3 col-md-6 col-sm-12 mt-4 px-2 ">
//             <div className="">
//               <p className="fw-bold mt-2 mx-10">CATEGORIES</p>
//               <div className="items-center text-justify mx-10">
//                 <p className=" mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline"   target="_top">
//                     New Projects
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
//                     Ready to Move Homes
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
//                     Projects Possession
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
//                     Best Sellers
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
//                     Property in Dubai
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
//                     Property in Goa
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white">
//                     Property in Delhi
//                   </Link>
//                 </p>

//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
//             <div className="">
//               <p className="fw-bold text-2xl mt-2 text-left mx-4">Social Us</p>

             
//                 <div className="flex mt-4 mx-2 lg:mx-1 md:mx-2 sm:mx-2" style={{justifyContent:'space-around'}}>
//                   <Link
//                     to="https://www.facebook.com/100Acress"
//                     className="flex items-center justify-center text-white bg-blue-500 w-10 h-10 rounded-full"

//                   >
//                     <FaFacebook size={20} />
//                   </Link>

//                   <Link
//                     to="https://twitter.com/100acressdotcom"
//                     className="flex items-center justify-center text-white bg-blue-400 w-10 h-10 rounded-full "

//                   >
//                     <i className="fa-brands fa-x-twitter text-sm" ></i>
//                   </Link>

//                   <Link
//                     to="https://www.instagram.com/100acress_com/"
//                     className="flex items-center justify-center text-white bg-purple-500 w-10 h-10 rounded-full"

//                   >
//                     <FaInstagram size={20} />
//                   </Link>

//                   <Link
//                     to="https://www.linkedin.com/company/100acress/"
//                     className="flex justify-center items-center text-white bg-blue-700 w-10 h-10 rounded-full"

//                   >
//                     <FaLinkedin size={20} />
//                   </Link>

//                   <Link
//                     to="https://www.youtube.com/c/100Acress"
//                     className="flex items-center justify-center text-white rounded-full bg-red-600 w-10 h-10"

//                   >
//                     <FaYoutube size={20} />
//                   </Link>
//                 </div>
             
//             </div>
//           </div>
//           <div className="text-center py-4">
//             Copyright © 2024,{" "}
//             <Link className="text-reset" to="https://100acress.com/">

//               100acress.com.{" "}
//             </Link>
//             All Rights Reserved
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//       </>

//   );
// }

