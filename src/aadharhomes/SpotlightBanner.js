import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../MyContext";

const SpotlightBanner = () => {

  const [projectViewDetails , setProjectViewDetails] = useState();


  const {trendingProject} = useContext(DataContext);
  const thumbnails = [
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
    "https://via.placeholder.com/80",
  ];


  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-5 md:p-8 lg:flex lg:items-center">
        {/* Left Section: Image */}
        <div className="lg:w-1/2 mb-5 lg:mb-0">
          <img
            src="https://via.placeholder.com/500x700"
            alt="Property"
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Right Section: Content */}
        <div className="lg:w-1/2 lg:pl-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 md:mb-5">
          {projectViewDetails?.projectName}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
            Lorem ipsum dolor sit amet consectetur. Elementum at orci ut orci
            scelerisque. Leo faucibus adipiscing dolor sem sed eu netus
            facilisis bibendum. Tristique est mauris cursus varius viverra
            adipiscing.
          </p>

          {/* Info Section */}
          <div className="flex flex-wrap mb-6">
            <div className="w-1/3 text-center mb-4 md:mb-0">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">📍</span>
              </div>
              <p className="font-semibold mt-2 text-gray-800">GURUGRAM</p>
              <p className="text-gray-500 text-sm">Location</p>
            </div>

            <div className="w-1/3 text-center mb-4 md:mb-0">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">🏠</span>
              </div>
              <p className="font-semibold mt-2 text-gray-800">3 BHK</p>
              <p className="text-gray-500 text-sm">Size</p>
            </div>

            <div className="w-1/3 text-center">
              <div className="w-10 h-10 mx-auto flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-red-500 text-lg">💰</span>
              </div>
              <p className="font-semibold mt-2 text-gray-800">2 Cr - 4 Cr</p>
              <p className="text-gray-500 text-sm">Price</p>
            </div>
          </div>

          {/* Button */}
          <div>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition">
              Explore Now
            </button>
          </div>

          {/* Thumbnail Section */}
          <div className="flex items-center mt-6 gap-2 overflow-x-auto">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightBanner;
