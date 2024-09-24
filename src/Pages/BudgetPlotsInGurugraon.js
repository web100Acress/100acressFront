import React from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

const BudgetPlotsInGurugraon = () => {
  return (
    <div className="mt-4 mb-4">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6">
        <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left">
          Budget Plots in Gurugram
        </h1>
        <div className="hidden sm:block">
          <Link to="/plots-in-gurugram/" target="_top">
          <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
            <ScaleLoader color="#FFFFFF" height={20} width={3} />
            <span className="ml-2">View All</span>
          </span>
          </Link>
        </div>
      </div>

      <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-11 gap-3 pb-5 pt-3 ">
        <Link to={`/signatureglobal-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/signatureimge.webp"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl text-center whitespace-nowrap">
              Signature  <br />
              <span className="block w-full">Sidhrawali Plots</span>
            </h3>
          </div>
        </Link>

        <Link to={`/bptp-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/bptp.jpg"
              className="w-full  h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
              BPTP Limited
            </h3>
          </div>
        </Link>

        <Link to={`/orris-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/Orris.webp"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
              ORRIS Group
            </h3>
          </div>
        </Link>

        <Link to={`/jms-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/jms.jpg"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-2xl">
              JMS Group
            </h3>
          </div>
        </Link>

        {/* <Link to={`/rof-plots-gurugram/`} target="_top">
          <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
            <img
              src="../../Images/rof.webp"
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
              ROF Group
            </h3>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default BudgetPlotsInGurugraon;
