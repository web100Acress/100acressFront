import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";

import {
  MonthlyVisitIcon,
  AwardsIcon,
  ResidentialProjectIcon,
  CommercialProjectIcon,
  ScoPlotsIcon,
  PlotnFloorIcon,
} from "../../Assets/icons";

function DesktopWhyChoose() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const monthlydata = [
    {
      title: "Residential Projects",
      count: 1600,
      suffix: "+",
      icon: <ResidentialProjectIcon />,
    },
    {
      title: "Commercial Projects",
      count: 900,
      suffix: "+",
      icon: <CommercialProjectIcon />,
    },
    { title: "SCO Plots", count: 90, suffix: "+", icon: <ScoPlotsIcon /> },
    {
      title: "Plots & Floors",
      count: 400,
      suffix: "+",
      icon: <PlotnFloorIcon />,
    },
    {
      title: "Monthly Visitors",
      count: 2.45,
      suffix: "L+",
      decimals: 2,
      icon: <MonthlyVisitIcon />,
    },
    { title: "Awards", count: 1000, suffix: "+", icon: <AwardsIcon /> },
  ];

  const paragraphText = `Why Choose 100acress.com for Real Estate in Gurgaon & Delhi NCR?
100acress is transforming property buying, selling, and renting by offering verified property listings for flats, villas, apartments, SCO plots, commercial spaces, and budget-friendly homes. Whether you're looking for affordable housing projects, under-construction apartments, ready-to-move flats, or investment properties, 100acress makes your journey simple, safe, and transparent. With a huge database of residential and commercial real estate projects in India, the platform ensures trusted builders, genuine deals, and expert guidance every step of the way.
`;

  return (
    <section className="font-sans px-6 lg:px-12 py-12 max-w-[1250px] mx-auto">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-gradient-to-r  to-white">
          <div className="flex flex-col items-center mb-4 mx-auto" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 leading-tight text-black text-center">
              Why 100acress.com?
            </h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
          </div>

          <div className="text-justify text-gray-700 leading-relaxed text-base">
            <p className="mb-6">
              {paragraphText}
            </p>
            <div className="mt-8 space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">
                Rajesh Aggarwal
              </h3>
              <p className="text-lg text-gray-600">
                Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {monthlydata.map((data, index) => (
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 150 + 200}
                key={index}
                className="relative bg-white p-6 rounded-2xl shadow-lg flex flex-col items-start justify-center
                           hover:shadow-2xl hover:shadow-[#FF9933]/40 border border-gray-100 hover:border-[#FF9933]/50
                           transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div
                  className="absolute -top-7 left-5 p-3 rounded-full bg-white backdrop-blur-sm
                             shadow-xl flex items-center justify-center"
                >
                  <div className="text-[#FF9933] text-3xl">{data.icon}</div>
                </div>
                <div className="mt-8 text-gray-900 font-extrabold text-4xl leading-none tracking-tight">
                  <CountUp
                    end={data.count}
                    duration={3}
                    decimals={data.decimals || 0}
                    suffix={data.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </div>
                <p className="mt-2 text-gray-600 text-sm md:text-base font-medium">
                  {data.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopWhyChoose;