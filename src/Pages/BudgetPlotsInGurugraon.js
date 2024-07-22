import React from "react";

const BudgetPlotsInGurugraon = () => {
  return (
    <>
      <div className="flex items-center mx-6 lg:mx-6 xl:mx-14 md:mx-6 mt-2">
        <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl mt-2 sm:text-left   ">
          Budget Plots in Gurugram
        </h1>
      </div>
      <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 mx-11 gap-3 pb-5 pt-2">
        <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
          <img
            src="../../Images/bptp.jpg"
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
            BPTP
          </h3>
        </div>

        <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
          <img
            src="../../Images/Orris.webp"
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
            ORRIS
          </h3>
        </div>

        <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
          <img
            src="../../Images/jms.jpg"
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
            JMS
          </h3>
        </div>

        <div className="relative border border-gray-200 rounded-lg dark:border-neutral-700 overflow-hidden group">
          <img
            src="../../Images/rof.webp"
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center text-3xl">
            ROF
          </h3>
        </div>
      </div>
    </>
  );
};

export default BudgetPlotsInGurugraon;
