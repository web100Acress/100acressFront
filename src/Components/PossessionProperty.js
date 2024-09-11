// import React, { useContext, useEffect } from "react";
// import { DataContext } from "../MyContext";
// import { Link } from "react-router-dom";
// const PossessionProperty = () => {

//   return (
//     <>
//     <p className="px-8 mb-0 text-xl text-black  lg:text-3xl md:text-2xl font-bold  sm:text-xl xs:text-xl text-left ">
//        Timing is Everything: Move In Now or Wait?
//         <br />
//         <span className="text-sm  pt-1 font-normal">
//           {" "}
//           find projects that fit your preferred possession timeline.
//         </span>
//       </p>

//       <div className="max-w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-4 mx-auto mb-4">  
      
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-6">
         
//           <Link to="/projects-in-gurugram/property-ready-to-move/" target="_top">
//             <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
//               <div className="p-0 md:p-5">
//                 <div className="relative">
//                   <img
//                     className="rounded-xl object-fit h-32 w-full"
//                     src="../../Images/p1.jpg"
//                     alt="ready to move"
//                   />
//                   <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
//                     <div className="p-0 w-full h-full flex flex-col justify-center">
//                       <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-xl lg:text-2xl tracking-tight text-white font-medium shadow-md">
//                         Ready to move
//                       </span>
//                       <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
//                         320+ Properties
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
          
//           <Link to={`/projects-in-gurugram/property-possession-in-2024/`} target="_top">
//             <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
//               <div className="p-0 md:p-5">
//                 <div className="relative">
//                   <img
//                     className="rounded-xl object-cover h-32 w-full"
//                     src="../../Images/p2.avif"
//                     alt="ready to move"
//                   />
//                   <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
//                     <div className="p-0 w-full h-full flex flex-col justify-center">
//                       <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-sm lg:text-2xl tracking-tight text-white font-medium shadow-md whitespace-nowrap">
//                         Possession in 2024
//                       </span>
//                       <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
//                         600+ Properties
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
         
//           <Link to={`/projects-in-gurugram/property-possession-in-2025/`} target="_top">
//             <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
//               <div className="p-0 md:p-5">
//                 <div className="relative">
//                   <img
//                     className="rounded-xl object-cover h-32 w-full"
//                     src="../../Images/p5.jpg"
//                     alt="Possession in 2025"
//                   />
//                   <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
//                     <div className="p-0 w-full h-full flex flex-col justify-center">
//                       <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-xl lg:text-2xl tracking-tight text-white font-medium shadow-md whitespace-nowrap">
//                         Possession in 2025
//                       </span>
//                       <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
//                         500+ Properties
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
          
//           <Link  to="/projects-in-gurugram/property-possession-after-2025/" target="_top">
//             <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
//               <div className="p-0 md:p-5">
//                 <div className="relative">
//                   <img
//                     className="rounded-xl object-cover h-32 w-full"
//                     src="../../Images/p3.jpg"
//                     alt="Possession in 2025"
//                   />
//                   <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
//                     <div className="p-0 w-full h-full flex flex-col justify-center">
//                       <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-sm lg:text-2xl tracking-tight text-white font-medium shadow-md whitespace-nowrap">
//                         Possession after{" "}
//                         <span>
//                           {" "}
//                           <br />
//                           2025
//                         </span>
//                       </span>

//                       <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
//                         800+ Properties
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>

//         </div>
      
//       </div>

//       {/* End Card Section */}
//     </>
//   );
// };

// export default PossessionProperty;


import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PossessionProperty = () => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <p className="px-8 mb-0 text-xl text-black lg:text-3xl md:text-2xl font-semibold sm:text-xl xs:text-xl text-left">
        Move in now, next year or later
        <br />
        <span className="text-sm font-normal">
          Find projects that fit your preferred possession timeline.
        </span>
      </p>

      <div className="block md:hidden h-[8rem]">
        <Slider {...carouselSettings}>
          {[{
            to: "/projects-in-gurugram/property-ready-to-move/",
            imgSrc: "../../Images/p1.jpg",
            title: "Ready to move",
            propertiesCount: "320+ Properties"
          }, {
            to: "/projects-in-gurugram/property-possession-in-2024/",
            imgSrc: "../../Images/p2.avif",
            title: "Possession in 2024",
            propertiesCount: "600+ Properties"
          }, {
            to: "/projects-in-gurugram/property-possession-in-2025/",
            imgSrc: "../../Images/p5.jpg",
            title: "Possession in 2025",
            propertiesCount: "500+ Properties"
          }, {
            to: "/projects-in-gurugram/property-possession-after-2025/",
            imgSrc: "../../Images/p3.jpg",
            title: "Possession after 2025",
            propertiesCount: "800+ Properties"
          }].map((item, index) => (
            <div key={index} className="max-w-full px-4  sm:px-6 lg:px-8  mx-auto ">
              <Link to={item.to} target="_top">
                <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="p-0 md:p-5">
                    <div className="relative">
                      <img
                        className="rounded-xl object-cover h-32 w-full"
                        src={item.imgSrc}
                        alt={item.title}
                      />
                      <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
                        <div className="p-0 w-full h-full flex flex-col justify-center">
                          <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-xl lg:text-2xl tracking-tight text-white font-medium shadow-md whitespace-nowrap">
                            {item.title}
                          </span>
                          <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
                            {item.propertiesCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
   
      <div className="px-4 py-4 sm:py-0 sm:px-4 lg:py-4 lg:px-8 mx-auto">
        <div className="hidden md:grid">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-6">
            {[{
              to: "/projects-in-gurugram/property-ready-to-move/",
              imgSrc: "../../Images/p1.jpg",
              title: "Ready to move",
              propertiesCount: "320+ Properties"
            }, {
              to: "/projects-in-gurugram/property-possession-in-2024/",
              imgSrc: "../../Images/p2.avif",
              title: "Possession in 2024",
              propertiesCount: "600+ Properties"
            }, {
              to: "/projects-in-gurugram/property-possession-in-2025/",
              imgSrc: "../../Images/p5.jpg",
              title: "Possession in 2025",
              propertiesCount: "500+ Properties"
            }, {
              to: "/projects-in-gurugram/property-possession-after-2025/",
              imgSrc: "../../Images/p3.jpg",
              title: "Possession after 2025",
              propertiesCount: "800+ Properties"
            }].map((item, index) => (
              <Link key={index} to={item.to} target="_top">
                <div className="group relative flex flex-col border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800">
                  <div className="p-0 md:p-5">
                    <div className="relative">
                      <img
                        className="rounded-xl object-cover h-32 w-full"
                        src={item.imgSrc}
                        alt={item.title}
                      />
                      <div className="absolute rounded-xl bg-black opacity-70 top-0 left-0 w-full h-full flex flex-col justify-center items-start p-3">
                        <div className="p-0 w-full h-full flex flex-col justify-center">
                          <span className="animate-bounce focus:animate-none hover:animate-none inline-block text-lg sm:text-xl lg:text-2xl tracking-tight text-white font-medium shadow-md whitespace-nowrap">
                            {item.title}
                          </span>
                          <span className="block text-sm sm:text-base lg:text-lg text-white font-semibold shadow-md">
                            {item.propertiesCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PossessionProperty;