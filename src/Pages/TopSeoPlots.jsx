import React from "react";
import { Link } from "react-router-dom";
import { EyeIcon } from "lucide-react";

const TopSeoPlots = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="mb-4 max-w-[1250px] mx-auto"
      style={{ fontFamily: 'Rubik, sans-serif' }}
    >
      <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
        <h2
          className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          Top SCO Plots in Gurugram
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-3"></div>
        <div className="absolute right-3 lg:right-6 xl:right-14 hidden sm:block">
          <Link to="/sco/plots/" target="_top">
            <span className="flex items-center text-white text-sm px-3 py-1.5 rounded-full bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
              <EyeIcon size={16} />
              <span className="ml-2">View All</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-3 gap-3 mt-3 ">
        <Link to={`/emaar-india-sco-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="https://d16gdc5rm7f21b.cloudfront.net/100acre/sco+plots/emaarsco.jpg"
              alt=""
              role="presentation"
              aria-hidden="true"
              className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              Emaar India
            </h3>
          </div>
        </Link>

        <Link to={`https://www.100acress.com/reach-sco-114/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="https://d16gdc5rm7f21b.cloudfront.net/100acre/sco+plots/reach.jpg"
              alt=""
              role="presentation"
              aria-hidden="true"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              Reach
            </h3>
          </div>
        </Link>

        <Link to={`/dlf-homes-sco-plots/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="https://d16gdc5rm7f21b.cloudfront.net/100acre/sco+plots/dlfsco.jpg"
              alt=""
              role="presentation"
              aria-hidden="true"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              DLF Limited
            </h3>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default TopSeoPlots;
