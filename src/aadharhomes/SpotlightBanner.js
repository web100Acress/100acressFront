import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../MyContext";
import {
  SpotlightHomeIcon,
  SpotlightLocationIcon,
  SpotlightPriceIcon,
} from "../Assets/icons";
import { Link } from "react-router-dom";

const SpotlightBanner = () => {
  const { spotlightProject } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const currentProject = spotlightProject[currentIndex];
  const otherProjects = spotlightProject.filter((_, index) => index !== currentIndex);
  const pUrl = currentProject?.project_url;


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === spotlightProject.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(timer);
  }, [spotlightProject]);

  if (!spotlightProject || spotlightProject.length === 0) {
    return <p className="text-gray-500">No spotlight projects available</p>;
  }


  return (
    <div className="rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-3" >
        <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-3xl">
          Spotlight Banner
        </h1>
      </div>
      <div className="max-w-7xl mx-auto bg-white rounded-lg p-0 md:p-8 lg:flex lg:items-center lg:gap-2 lg:h-96">

        {/* Left Section: Image */}
        <div className="lg:w-1/3 p-8 xl:pl-5 lg:pl-5 lg:mb-0 sm:p-4 md:p-2 lg:p-0 xl:p-0">
          <div className="relative">

            {/* Image */}
            <Link to={`/${pUrl}/`} target="_top">
              <img
                src={currentProject?.frontImage?.url}
                alt={currentProject?.projectName}
                className="relative w-full h-80 object-cover rounded-lg animate-fadeInLeft"
              />
            </Link>
          </div>
        </div>


        {/* Right Section: Project Details */}
        <div className="lg:w-2/3 lg:pl-2 lg:flex lg:flex-col p-4 sm:p-4  lg:justify-center">
          <h2 className="text-2xl md:text-2xl text-gray-800 mb-2 md:mb-0">
            {currentProject?.projectName || "Default Project Name"}
          </h2>
          <p className="text-gray-600 text-sm md:text-sm leading-relaxed mb-2">
            {truncateText(currentProject.project_discripation || "Default description for the project. Lorem ipsum dolor sit amet consectetur...", 55)}
          </p>

          {/* Info Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 mb-3">
            {/* Location Section */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">
                  <SpotlightLocationIcon />
                </span>
              </div>
              <p className="font-semibold mt-2 mb-0 text-gray-800">{currentProject?.city}</p>
              <p className="text-gray-500 text-xs">Location</p>
            </div>

            {/* Size Section */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">
                  <SpotlightHomeIcon />
                </span>
              </div>
              <p className="font-semibold mt-2 mb-0 text-gray-800">
                {currentProject?.BhK_Details.length === 1
                  ? currentProject?.BhK_Details[0]?.bhk_type
                  : `${currentProject?.BhK_Details[0]?.bhk_type} - ${currentProject?.BhK_Details[currentProject?.BhK_Details.length - 1]?.bhk_type}`}
              </p>
              <p className="text-gray-500 text-xs">Unit type</p>
            </div>

            {/* Price Section */}
            <div className="text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">
                  <SpotlightPriceIcon />
                </span>
              </div>
              <p className="font-semibold mt-2 mb-0 text-gray-800">
                {currentProject?.minPrice} - {currentProject?.maxPrice} Cr
              </p>
              <p className="text-gray-500 text-xs">Price</p>
            </div>

            {/* Explore Now Section */}
            <div className="text-center flex flex-col justify-center">
              <Link to={`/${pUrl}/`} target="blank">
                <button className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 drip-effect">
                  Explore Now
                </button>
              </Link>
            </div>
            {/* <div class="loader">
              <div class="loader-bg">
              <Link to={`/${pUrl}/`} target="blank">
                <button>Explore Now</button>
              </Link>
              </div>
              <div class="drops">
                <div class="drop1"></div>
                <div class="drop2"></div>
              </div>
            </div> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="liquid">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
                </filter>
              </defs>
            </svg> */}
          </div>


          {/* Thumbnail Section */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {currentProject.projectGallery.map((thumb, index) => (
              <img
                key={index}
                src={thumb.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 rounded-lg object-cover animate-fadeInRight"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightBanner;