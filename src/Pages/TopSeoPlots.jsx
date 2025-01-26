import React from "react";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";

const TopSeoPlots = () => {
  return (
    <div data-aos="fade-up"
    data-aos-duration="1000" className="mb-4">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6">
        <h1 className="text-xl pt-6 xl:text-4xl lg:text-3xl md:text-2xl sm:text-left">
          Top SCO Plots in Gurugram
        </h1>
        <div className="hidden sm:block">
          <Link to="/sco/plots/" target="_top">
          <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
            <EyeIcon /> 
           <span className="ml-2">View All</span>
          </span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-7 gap-3 mt-3 ">
        <Link to={`/emaar-india-sco-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/emaarsco.webp"
              alt="emaar"
              className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
              Emaar India
            </h3>
          </div>
        </Link>

        <Link to={`https://www.100acress.com/reach-sco-114/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/reach.webp"
              alt="m3m"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
             Reach
            </h3>
          </div>
        </Link>

        <Link to={`/dlf-homes-sco-plots/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/dlfsco.webp"
              alt="dlf"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl whitespace-nowrap overflow-hidden text-ellipsis">
             DLF Limited
            </h3>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default TopSeoPlots;
