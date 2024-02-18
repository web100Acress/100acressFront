
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
//       <div className="container">
//         <div className="row ">
//           <div className="col-lg-3 col-md-6 col-sm-12 mt-4  ">
//             <div className="">
//               <p className=" fw-bold mt-2 text-white items-center text-justify mx-10 ">100acress</p>
//               <div className="items-center text-justify mx-10 ">
//               <p className="mt-2 mb-1 text-white ">
//                 <Link to={'/'} target="blank" className="hover:text-white hover:underline "  >
//                   Home
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to='/aboutus' className="hover:text-white" >
//                   About Us
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to='/blog' className="hover:text-white" >
//                   Blog
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/contactus" className="hover:text-white" >

//                   Contact Us
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/termsandconditions" className="hover:text-white" >

//                   Terms And Conditions
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/privacy" className="hover:text-white" >

//                   Privacy
//                 </Link>
//               </p>
//               <p className="mb-1 text-white">
//                 <Link to="/carrerswithus" className="hover:text-white">

//                   Careers with us
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
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   Residential Property
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   Commercial Property
//                 </Link>
//               </p>

//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   Floors in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   Plots in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   SCO in Gurgaon
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="#!" className="text-reset text-white hover:text-white">
//                   Circle Rates
//                 </Link>
//               </p>
//               <p className="mb-1">
//                 {" "}
//                 <Link to="#!" className="text-reset text-white hover:text-white">
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
//                   <Link to="#!" className="text-white hover:text-white ">
//                     New Projects
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white">
//                     Ready to Move Homes
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white">
//                     Projects Possession
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white">
//                     Best Sellers
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white">
//                     Property in Dubai
//                   </Link>
//                 </p>
//                 <p className="mb-1">
//                   <Link to="#!" className="text-white hover:text-white">
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
//               <p className="fw-bold text-2xl mt-2 text-center ">Follow Us</p>

             
//                 <div className="flex mt-4 mx-2 " style={{justifyContent:'space-around'}}>
//                   <a
//                     href="#"
//                     className="flex items-center justify-center text-white bg-blue-500 w-10 h-10 rounded-full"

//                   >
//                     <FaFacebook size={20} />
//                   </a>

//                   <a
//                     href="#"
//                     className="flex items-center justify-center text-white bg-blue-400 w-10 h-10 rounded-full "

//                   >
//                     <i className="fa-brands fa-x-twitter text-sm" ></i>
//                   </a>

//                   <a
//                     href="#"
//                     className="flex items-center justify-center text-white bg-purple-500 w-10 h-10 rounded-full"

//                   >
//                     <FaInstagram size={20} />
//                   </a>

//                   <a
//                     href="#"
//                     className="flex justify-center items-center text-white bg-blue-700 w-10 h-10 rounded-full"

//                   >
//                     <FaLinkedin size={20} />
//                   </a>

//                   <a
//                     href="#"
//                     className="flex items-center justify-center text-white rounded-full bg-red-600 w-10 h-10"

//                   >
//                     <FaYoutube size={20} />
//                   </a>
//                 </div>
             
//             </div>
//           </div>
//           <div className="text-center py-4">
//             Copyright © 2024,
//             <a className="text-reset" href="https://100acress.com/">

//               100acress.com.{" "}
//             </a>
//             All Rights Reserved
//           </div>
//         </div>
//       </div>
//       </div>
//       </>

//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
export default function Footer() {
   

  return (
    <>
    <div className="bg-red-600 h-100vh w-full d-flex flex-direction-column  text-white">
      {/* <div className="container"> */}
        <div className="row ">
          <div className="col-lg-3 col-md-6 col-sm-12 mt-4  ">
            <div className="">
              <p className=" fw-bold mt-2 text-white items-center text-justify mx-10 ">100acress</p>
              <div className="items-center text-justify mx-10 ">
              <p className="mt-2 mb-1 text-white ">
                <Link to={'/'}  className="hover:text-white hover:underline  " target="_top" >
                  Home
                </Link>
              </p>
              <p className="mb-1 text-white">
                <Link to='/about' className="hover:text-white hover:underline "  target="_top"  >
                  About Us
                </Link>
              </p>
              <p className="mb-1 text-white">
                <Link  className="hover:text-white hover:underline ">
                  Blog
                </Link>
              </p>

              <p className="mb-1 text-white">
                <Link to="/contactus" className="hover:text-white hover:underline " target="_top">

                  Contact Us
                </Link>
              </p>

              <p className="mb-1 text-white">
                <Link to="/privacy" className="hover:text-white hover:underline "  target="_top" >

                  Privacy
                </Link>
              </p>
              <p className="mb-1 text-white">
                <Link to="/careerwithus" className="hover:text-white hover:underline " target="_top">

                  Careers with us
                </Link>
              </p>
              <p className="mb-1 text-white">
                <Link to="/termsandconditions" className="hover:text-white hover:underline " target="_top">

                  Terms And Conditions
                </Link>
              </p>
            
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mt-4 px-2 ">
            <div className="">
              <p className="fw-bold mt-2 items-center text-justify mx-10">REAL ESTATE</p>
              <div className="items-center text-justify mx-10">
              <p className="mb-1">
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  Residential Property
                </Link>
              </p>
              <p className="mb-1">
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  Commercial Property
                </Link>
              </p>

              <p className="mb-1">
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  Floors in Gurgaon
                </Link>
              </p>
              <p className="mb-1">
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  Plots in Gurgaon
                </Link>
              </p>
              <p className="mb-1">
                {" "}
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  SCO in Gurgaon
                </Link>
              </p>
              <p className="mb-1">
                {" "}
                <Link to="#!" className="text-reset text-white hover:text-white hover:underline " target="_top">
                  Circle Rates
                </Link>
              </p>
              <p className="mb-1">
                {" "}
                <Link to="" className="text-reset text-white hover:text-white hover:underline " target="_blank">
                  Gurgaon Master Plan in 2031
                </Link>
              </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mt-4 px-2 ">
            <div className="">
              <p className="fw-bold mt-2 mx-10">CATEGORIES</p>
              <div className="items-center text-justify mx-10">
                <p className=" mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline"   target="_top">
                    New Projects
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
                    Ready to Move Homes
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
                    Projects Possession
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
                    Best Sellers
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
                    Property in Dubai
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white hover:text-white hover:underline " target="_top">
                    Property in Goa
                  </Link>
                </p>
                <p className="mb-1">
                  <Link to="#!" className="text-white">
                    Property in Delhi
                  </Link>
                </p>

              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div className="">
              <p className="fw-bold text-2xl mt-2 text-left mx-4">Social Us</p>

             
                <div className="flex mt-4 mx-2 lg:mx-1 md:mx-2 sm:mx-2" style={{justifyContent:'space-around'}}>
                  <Link
                    to="https://www.facebook.com/100Acress"
                    className="flex items-center justify-center text-white bg-blue-500 w-10 h-10 rounded-full"

                  >
                    <FaFacebook size={20} />
                  </Link>

                  <Link
                    to="https://twitter.com/100acressdotcom"
                    className="flex items-center justify-center text-white bg-blue-400 w-10 h-10 rounded-full "

                  >
                    <i className="fa-brands fa-x-twitter text-sm" ></i>
                  </Link>

                  <Link
                    to="https://www.instagram.com/100acress_com/"
                    className="flex items-center justify-center text-white bg-purple-500 w-10 h-10 rounded-full"

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
                    className="flex items-center justify-center text-white rounded-full bg-red-600 w-10 h-10"

                  >
                    <FaYoutube size={20} />
                  </Link>
                </div>
             
            </div>
          </div>
          <div className="text-center py-4">
            Copyright © 2024,{" "}
            <Link className="text-reset" to="https://100acress.com/">

              100acress.com.{" "}
            </Link>
            All Rights Reserved
          </div>
        </div>
      </div>
      {/* </div> */}
      </>

  );
}

