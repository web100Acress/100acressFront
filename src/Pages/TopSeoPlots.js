import React from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const TopSeoPlots = () => {
  return (
    <div className="mt-5  mb-0">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6">
        <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left">
          Top SCO Plots in Gurugram
        </h1>
        <div className="hidden sm:block">
          <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
            <ScaleLoader color="#FFFFFF" height={20} width={3} />
            <span className="ml-2">View All</span>
          </span>
        </div>
      </div>

      <div className="grid  lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-11 gap-3 pb-5 pt-4 ">
        <Link to={`/bptp-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/emaar.jpg"
              className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
              Emaar India
            </h3>
          </div>
        </Link>

        <Link to={`/orris-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/m3m.jpg"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
              M3M India
            </h3>
          </div>
        </Link>

        <Link to={`/jms-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/microtek.jpg"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
              Microtek Infra
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopSeoPlots;
